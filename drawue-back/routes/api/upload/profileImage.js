const multer = require('multer');
const express = require('express');
const { User } = require('../../../models/user');
const { verifyToken } = require("../verifyToken");
const sharp = require('sharp');
var fs = require('fs');
const router = express();

const DIR = './uploads/profile-pics';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now()+file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});
const imageFilterHelper = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    if(file)
    cb(null, true);
};
var upload = multer({
    storage: storage,
    fileFilter: imageFilterHelper,
  });
router.post('/', [verifyToken, upload.single('file')], async (req, res, next) => {
    if(req.user){
        let user = await User.findOne({_id: req.user._id});
        if (!user) {
            return res.status(400).send('Please try to login again.');
        }
        else{
            const file = req.file
            if (!file) {
                res.status(400).send({'error': 'Failed to upload the file.'});
            }
            var oldFileName = user.profilePic;
            user.profilePic = 're'+file.filename;

            if (fs.existsSync('./uploads/profile-pics/'+file.filename)) {
                await sharp('./uploads/profile-pics/'+file.filename).resize(
                    {
                        fit: sharp.fit.contain,
                        background: { r: 255, g: 255, b: 255 },
                        width: 125,
                        height: 125
                    }
                    ) 
                    .png({quality : 90}).toFile('./uploads/profile-pics/re'+file.filename)
                
                    fs.unlink('./uploads/profile-pics/'+file.filename, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    });
                        console.log(oldFileName);
                    if (fs.existsSync('./uploads/profile-pics/'+oldFileName)){
                        fs.unlink('./uploads/profile-pics/'+oldFileName, (err) => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            });
                    }
              }
            
            user.save().then(()=>{
                res.send('re'+file.filename); 
            }).catch(()=>{
                res.status(400).status({"error": 'Failed to set profile picture path'});
            });
        }
    }
    else{
        return res.status(400).send('Session not found. Please try to re-login.');
    }
});
module.exports = router;