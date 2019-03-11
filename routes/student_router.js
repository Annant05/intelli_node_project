/* declaration of the required base classes of node.js start */

const express = require('express');
const router = express.Router();

// const bodyParser = require("body-parser");  // used body-parser to get data from all the field in form
// const fs = require('fs');
// const path = require('path');

//test code


const dynamoStudent = require('../support_files/db_dynamo_student');
const s3storageStudent = require('../support_files/upload_to_s3');

// const fileDir = path.join(__dirname, '../views\\student\\');


/* END: Declaration node.js */


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Render Index page for student section
router.get('/', (req, res) => {
    console.log("\nGET: 'student/student_index'  Web-Page");
    res.render('student/student_index', {TITLE: "Gyankriti"});


});
//Do not tamper with the above get request


/* START: Testing Function Section */


router.get('/upload-test', (req, res) => {
    console.log("\nGET: 'student/upload_test'  Web-Page");
    res.render('student/upload_test', {TITLE: "Upload Test"});
});

router.post('/student-info', async (req, res) => {
    console.log("\nPOST: 'student/student-info' = Send a student information using  key.");

    console.log("get information using identifier_key : ", req.body.identifier_key);

    try {
        await dynamoStudent.getAdmissionUsingKey(req.body.identifier_key, (admissionObject, isSuccess) => {

            console.log("isSuccess in receiving data from getAdmissionUsingKey : ", isSuccess);

            if (isSuccess) {
                res.send({body: {admissionObject: admissionObject, isSuccess: isSuccess}});
            } else {
                res.send({body: {admissionObject: null, isSuccess: isSuccess}});
            }
        });

    } catch (e) {
        console.log("exception e : " + e);
    }
});


/* END: Testing Function Section */


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* START: Production section / Finalized function definitions */


// receiving data from client
router.get('/new-admission', (req, res) => {
    console.log("\nGET: 'student/new_admission'  Web-Page");
    res.render('student/new_admission', {TITLE: "New Admission"});
});


router.post('/new-admission', async (req, res) => {
    console.log("\nPOST: 'student/new_admission' = Received  New Admission data from AJAX call.");

    const admissionJsonObject = req.body.new_admission_data;
    try {
        // console.log(JSON.stringify(req.body.new_admission_data));
        await dynamoStudent.newAdmission(admissionJsonObject, (isSaved) => {
            console.log("is Data Saved to the dynamodb 'admissions' table:  " + isSaved);
            res.send({success: isSaved});
            // res.cookie('student_name', admissionJsonObject.student_first_name + " " + admissionJsonObject.student_last_name,
            //     {
            //         maxAge: 900000,
            //         httpOnly: true
            //     });
        });

    } catch (e) {
        console.log("exception e : " + e);
        res.send({success: false});
    }
});


router.post('/upload-images', async (req, res) => {
    console.log("\nPOST: 'student/upload-images' = Received  image files from AJAX call.");
    try {
        await s3storageStudent.uploadImagesToS3(req, res, (isSaved) => {
            console.log(`student/upload-images response : ${isSaved}`);
            res.send({success: isSaved})
        });
    } catch (e) {
        console.log("exception e : " + e);
        res.send({success: false});
    }
});


// part 2 of new admission
router.get('/gyankriti-information', (req, res) => {
    console.log("\nGET: 'student/gyankriti_information'  Web-Page");

    // res.cookie('student_name', "Annant Gupta",
    //     {
    //         maxAge: 900000,
    //         httpOnly: true
    //     });

    res.render('student/gyankriti_information', {TITLE: "Gyankriti Information"});

});


router.post('/gyankriti-information', async (req, res) => {
    console.log("\nPOST: 'student/gyankriti-information' = Add data to gyankriti_students table and /update admission status to complete using  key.");

    const studentJsonObject = req.body.gyankriti_student_data;
    try {
        // console.log(JSON.stringify(req.body.new_admission_data));
        await dynamoStudent.addGyankritiInformation(studentJsonObject, (isSaved) => {
            console.log("is Data Saved to the dynamodb 'gyankriti_students' table:  " + isSaved);

            if (isSaved) {
                dynamoStudent.updateAdmissionStatus(studentJsonObject.identifier_key, studentJsonObject.gyankriti_enrollment, (isSaved) => {
                    res.send({success: isSaved});
                })
            }
        });

    } catch (e) {
        console.log("exception e : " + e);
        res.send({success: false});
    }

});


// sending data from server
router.get('/gyankriti-students', (req, res) => {
    console.log("\nGET: 'student/gyankriti-students'  Web-Page");
    res.render('student/gyankriti_students', {TITLE: "Gyankriti Students"});
});


router.post('/gyankriti-students', async (req, res) => {
    console.log("\nPOST: 'student/gyankriti-students' = Send students information.");

    try {
        await dynamoStudent.getCurrentAdmissions((admissionsObject, isSuccess) => {

            console.log("isSuccess in receiving data from getCurrentAdmissions : ", isSuccess);

            if (isSuccess) {
                res.send({body: {admissionsObject: admissionsObject, isSuccess: isSuccess}});
            } else {
                res.send({body: {admissionsObject: null, isSuccess: isSuccess}});
            }
        });

    } catch (e) {
        console.log("exception e : " + e);
    }
});

// get method to display the full info of a student.
router.get('/full-info/:rollNo/:suffix', async (req, res) => {

    console.log(`\nGET: '/search/full-info/${req.params.rollNo}/${req.params.suffix}'  Web-Page`);

    const gyankriti_enrollment = `${req.params.rollNo}/${req.params.suffix}`;

    try {
        await dynamoStudent.getAdmissionUsingEnrollment(gyankriti_enrollment, (admissionsObject, isSuccess) => {

            console.log("isSuccess in receiving data from getAdmissionUsingEnrollment : ", isSuccess);

            if (isSuccess) {
                console.log(JSON.stringify(admissionsObject.Items[0]));
                res.end(JSON.stringify(admissionsObject.Items[0]));
                // res.end({body: {admissionsObject: admissionsObject, isSuccess: isSuccess}});
            } else {
                res.end("There is an error ");
                // res.end({body: {admissionsObject: null, isSuccess: isSuccess}});
            }
        });

    } catch (e) {
        console.log("exception e : " + e);
    }

    // res.end(`${req.params.rollNo}/${req.params.suffix}`);
});


/* END: Production section / Finalized function definitions */
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*  END: get and post method block */


/*  module export block start  */
module.exports = router;
/*  END: Export block  */


