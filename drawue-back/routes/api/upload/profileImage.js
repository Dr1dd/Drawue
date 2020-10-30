const multer = require('multer');
const express = require('express');
const { User } = require('../../../models/user');
const { verifyToken } = require("../verifyToken");
const router = express();

const DIR = './public/uploads/profile-pics';

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
            console.log(file);
            if (!file) {
                res.status(400).send({'error': 'Failed to upload the file.'});
            }
            user.profilePic = file.filename;
            user.save().then(()=>{
                res.send(file.filename); 
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