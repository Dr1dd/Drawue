const multer = require('multer');
const express = require('express');
const { User } = require('../../../models/user');
const { verifyToken } = require("../verifyToken");
const sharp = require('sharp');
var fs = require('fs');
const router = express();

const DIR = './uploads/profile-pics';
const maxFileSize = 5000000;

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
        return cb(new Error('Only image files are allowed!'), false);
    }
    if(file.size > maxFileSize){
        return cb(new Error('File size should not exceed 5MB'), false);
    }
    cb(null, true);
};
var upload = multer({
    storage: storage,
    fileFilter: imageFilterHelper,
  });
router.post('/', [verifyToken, upload.single('file')], async (req, res) => {
    if(req.fileValidationError) return res.status(400).send({'error': req.fileValidationError});
    if(req.user){
        let user = await User.findOne({_id: req.user._id});
        await saveAndUploadProfilePic(user, res, req);
    }
    else{
        return res.status(400).send('Session not found. Please try to re-login.');
    }

},
(error, req, res, next) => {
    res.status(400).send({error: error.message});
    });
async function saveAndUploadProfilePic(user, res, req) {
     if (!user) {
        return res.status(400).send({'error':'Please try to login again.'});
    }
    else{
        const file = req.file
        if (!file) {
            res.status(400).send({'error': 'Failed to upload the file.'});
        }
        var oldFileName = user.profilePic;
        user.profilePic = 're'+file.filename;

        if (fs.existsSync('./uploads/profile-pics/'+file.filename)) {
            await replaceFile(file, oldFileName);
        }
        
        saveUserProfilePicURL(user, file, res);
    }
}
function saveUserProfilePicURL(user, file, res) {
    user.save().then(()=>{
        res.send('re'+file.filename); 
    }).catch(()=>{
        user.profilePic = 'default-user.png';
        user.save();
        res.status(400).status({"error": 'Failed to set profile picture path'});
    });
}
async function replaceFile(file, oldFileName) {
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
        }
    });
    if (fs.existsSync('./uploads/profile-pics/'+oldFileName)){
        if(oldFileName!="default-user.png"){
            fs.unlink('./uploads/profile-pics/'+oldFileName, (file_err) => {
                if (file_err) {
                    console.error(file_err)
                }
            });
        }
    }
}
module.exports = router;