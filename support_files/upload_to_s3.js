const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../config/config');
AWS.config.update(config.getAWS_JSONCredentials());
const s3 = new AWS.S3();

const BUCKET_NAME = "gyankriti2019";

// test code
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// });


const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, 'images/' + file.originalname);
        }
    })
});


const uploadFunctions = {
    uploadImagesToS3: async function uploadImageFilesToS3(req, res, statusCallback) {
        let imagesUpload = upload.fields([
            {name: 'input_student_image', maxCount: 1},
            {name: 'input_father_image', maxCount: 1},
            {name: 'input_mother_image', maxCount: 1}
        ]);

        try {
            imagesUpload(req, res, (err) => {
                console.log("Calling imagesUpload Function");
                if (err) {
                    // An error occurred when uploading
                    console.log("err saving files :post" + JSON.stringify(err));
                } else {
                    console.log("images saved successfully");
                    statusCallback(true);
                }
                // Everything went fine
                console.log(JSON.stringify(req.body));
            });

        } catch (e) {
            console.log("exception e : " + e);
            statusCallback(false);
        }
    }

};

module.exports = uploadFunctions;