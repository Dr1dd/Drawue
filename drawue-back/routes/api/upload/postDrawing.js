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
    // if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    //     return cb(new Error('Only image files are allowed!'), false);
    // }
    // console.log(req);
    if(file.size >5000000){
        return cb(new Error('File size should not exceed 5MB'), false);
    }
    if(file)
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
     if(count <15) next();
     else return res.status(400).send({'error':'Maximum number (15) of drawing posts has been reached.'});
   });
  }
  else return res.status(400).send({'error':'An error occurred while trying to publish the drawing.'});
};

router.post('/', [verifyToken, checkPostLimit, upload.single('file')], async (req, res) => {
    if(req.user){
        const file = req.file
        if (!file) {
            return res.status(400).send({'error': 'Failed to upload the file.'});
        }
        var filename = req.file.filename;
        var path = DIR +'/'+ req.body.resolution +'/'+ filename;
        try {
          while (fs.existsSync(DIR +'/'+ req.body.resolution +'/'+ filename)) {
            var new_fileName = rug.generate();
            path = DIR +'/'+ req.body.resolution +'/'+ new_fileName;
          } 
        } catch(err) {
          console.error(err)
        }

        fs.rename(DIRTemp +'/'+ filename, path, async function (err) {
            if (err) {
                console.log(err);
                return res.status(400).send({'error':'An error occurred while trying to publish the drawing.'});
            }
            await User.findOne({_id: req.user._id}, (err, user)=>{
              var tags = req.body.tags.split(",");
              if(err)  return res.status(400).send({'error':'An error occurred while trying to publish the drawing.'});
                drawing = new Drawings({
                    userID: req.user._id,
                    username: user.username,
                    title: req.body.title,
                    description: req.body.description,
                    drawing_path: req.body.resolution+'/'+file.filename,
                    tags: tags,
                });
                drawing.save()
                    .then(()=>{
                      if(user.drawing_counter == null || user.drawing_counter == undefined) user.drawing_counter = 1;
                      else user.drawing_counter +=1;
                        user.save().then(()=>{
                          return res.status(200).send({'success': 'Your drawing has been successfully published!'});
                        })
                        .catch((err)=>{
                          console.log(err);
                        })
                    })
                    .catch((err)=>{
                        fs.unlink(DIR +'/'+ req.body.resolution +'/'+ filename, (err) => {
                            if (err) {
                              console.error(err)
                              return
                            }
                          })
                        console.log(err);
                        return res.status(400).send({'error':'An error occurred while trying to publish the drawing.'});
                    });
            });
        });
    }
    else return res.status(401).send({'error':'User not logged on.'});
  }, (error, req, res, next) =>{
    res.status(400).send({'error': error.message})
});
module.exports = router;