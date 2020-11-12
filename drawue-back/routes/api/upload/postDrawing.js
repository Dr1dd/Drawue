const multer = require('multer');
const express = require('express');
const { verifyToken } = require("../verifyToken");
const { Drawings } = require('../../../models/drawing');
const router = express.Router();
var fs = require('fs');

const DIRTemp = './uploads/drawings/temp';
const DIR = './uploads/drawings';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIRTemp);
    },
    filename: (req, file, cb) => {
      const fileName = Date.now()+file.originalname.toLowerCase().split(' ').join('-')+'.png';
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
router.post('/', [verifyToken, upload.single('file')], async (req, res) => {
    if(req.user){
        const file = req.file
        if (!file) {
            return res.status(400).send({'error': 'Failed to upload the file.'});
        }
        var filename = req.file.filename;

        fs.rename(DIRTemp +'/'+ filename, DIR +'/'+ req.body.resolution +'/'+ filename, function (err) {
            if (err) {
                console.log(err);
                return res.status(400).send({'error':'An error occurred while trying to publish the drawing.'});
            }
            drawing = new Drawings({
                userID: req.user._id,
                title: req.body.title,
                description: req.body.description,
                drawing_path: file.filename,
                tags: req.body.tags,
            });
            drawing.save()
                .then(()=>{
                    return res.status(200).send({'success': 'Your drawing has been successfully published!'});
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
    }
    else return res.status(401).send({'error':'User not logged on.'});
  }, (error, req, res, next) =>{
    res.status(400).send({'error': error.message})
});
module.exports = router;