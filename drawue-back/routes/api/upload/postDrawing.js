const multer = require('multer');
const express = require('express');
const { verifyToken } = require("../verifyToken");
const { User } = require('../../../models/user');
const { Drawings } = require('../../../models/drawing');
const router = express.Router();
var fs = require('fs');
var rug = require('random-username-generator');
const { isRef } = require('@hapi/joi');

const DIRTemp = './uploads/drawings/temp';
const DIR = './uploads/drawings';
rug.setAdjectives(['pic', 'random', 'gen', 'drawing', 'draw', 'drawer', 'drew', 'art', 'Artistic', 'image']);
rug.setSeperator('');
const maxFileSize = 5000000;
const maxNumOfPosts = 15;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIRTemp);
    },
    filename: (req, file, cb) => {
      var new_fileName = rug.generate();
      const fileName = Date.now()+new_fileName+'.png';
      cb(null, fileName)
    }
  });
const imageFilterHelper = function(req, file, cb) {
    // Accept images only
    if(file.size > maxFileSize){
        return cb(new Error('File size should not exceed 5MB'), false);
    }
    cb(null, true);
};
var upload = multer({
    storage: storage,
    fileFilter: imageFilterHelper,
});

const checkPostLimit = (req, res, next) =>{
  if(req.user){
   Drawings.countDocuments({userID: req.user._id}).exec((err, count) => {
     if(err){
      return res.status(400).send({'error':'An error occurred while trying to publish the drawing.'});
     }
     if(count <maxNumOfPosts) next();
     else return res.status(400).send({'error':'Maximum number ('+maxNumOfPosts+') of drawing posts has been reached.'});
   });
  }
  else return res.status(400).send({'error':'An error occurred while trying to publish the drawing.'});
};

router.post('/', [verifyToken, checkPostLimit, upload.single('file')], async (req, res) => {
  let resolution = req.body.resolution.toString();
    if(req.user){
        const file = req.file
        if (!file) {
            return res.status(400).send({'error': 'Failed to upload the file.'});
        }
        var filename = req.file.filename.toString();
        var path = DIR +'/'+ resolution +'/'+ filename;
        try {
          while (fs.existsSync(DIR +'/'+ resolution +'/'+ filename)) {
            var new_fileName = rug.generate();
            path = DIR +'/'+ resolution +'/'+ new_fileName;
          } 
        } catch(err) {
          console.error(err)
        }

      await uploadPostDrawing(path, filename, req, res);
    }
    else return res.status(401).send({'error':'User not logged on.'});
  }, (error, req, res, next) =>{
    res.status(400).send({'error': error.message})
});
async function uploadPostDrawing(path, filename, req, res) {
    let resolution = req.body.resolution.toString();
      fs.rename(DIRTemp +'/'+ filename, path, async function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({'error':'An error occurred while trying to publish the drawing.'});
        }
        await User.findOne({_id: req.user._id}, (user_err, user)=>{
          var tags = req.body.tags.split(",");
          if(user_err)  return res.status(400).send({'error':'An error occurred while trying to publish the drawing.'});
          let drawing = new Drawings({
              userID: req.user._id.toString(),
              username: user.username,
              title: req.body.title.toString(),
              description: req.body.description.toString(),
              drawing_path: resolution+'/'+file.filename.toString(),
              tags: tags,
          });
          saveDrawing(drawing, user, res, req);
        });
    });
}
function saveDrawing(drawing, user, res, req) {
  let resolution = req.body.resolution.toString();
  drawing.save()
    .then(()=>{
      if(user.drawing_counter == null || user.drawing_counter == undefined) user.drawing_counter = 1;
      else user.drawing_counter +=1;
      user.save()
        .then(() => {
          return res.status(200).send({'success': 'Your drawing has been successfully published!'});
        })
        .catch((user_save_error)=>{
          console.log(user_save_error);
        })
    })
    .catch((drawing_save_error)=>{
        fs.unlink(DIR +'/'+ resolution +'/'+ filename, (image_deletion_error) => {
            if (image_deletion_error) {
              console.error(image_deletion_error)
            }
          })
        console.log(drawing_save_error);
        return res.status(400).send({'error':'An error occurred while trying to publish the drawing.'});
    });
}
module.exports = router;