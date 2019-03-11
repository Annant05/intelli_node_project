const cmd = require('node-cmd');
const AWS = require('aws-sdk');

const config = require('../config/config');
// AWS.config.update({region: "ap-south-1 ", endpoint: 'https://dynamodb.ap-south-1.amazonaws.com'});
AWS.config.update(config.getAWS_JSONCredentials());

const dynamodb = new AWS.DynamoDB();
const aws_s3 = new AWS.S3();


const basicDynamoTableFunctions = {
    listTables: function () {
        const params = {};
        dynamodb.listTables(params, (err, data) => {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        });
    }
};


async function startOfflineDynamoDB() {
    await cmd.get(
        'chdir',
        (err, data, stderr) => {
            console.log('the current working dir is : ', data);
            let command = data.replace("\r\n", "") + "\\tools\\dynamo_offline\\server_start.bat";
            cmd.run(command);
        }
    );
}


const usersTable = {
    TABLE_NAME: config.TABLE_USERS,
    createUsersTable: async function () {
        const params = {
            TableName: this.TABLE_NAME,
            AttributeDefinitions: [
                {
                    AttributeName: "uid",  // Primary key
                    AttributeType: "S"
                },

            ],
            KeySchema: [
                {
                    AttributeName: "uid",
                    KeyType: "HASH"
                },

            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };

        await dynamodb.createTable(params, (err, data) => {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);
        });

        console.log("The table are listed \n");
        basicDynamoTableFunctions.listTables();
    }
};

const devicesTable = {
    TABLE_NAME: config.TABLE_DEVICES,
    createDevicesTable: async function () {
        const params = {
            TableName: this.TABLE_NAME,
            AttributeDefinitions: [
                {
                    AttributeName: "device_uid",  // Primary key
                    AttributeType: "S"
                },

            ],
            KeySchema: [
                {
                    AttributeName: "device_uid",
                    KeyType: "HASH"
                },

            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };

        await dynamodb.createTable(params, (err, data) => {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);
        });

        console.log("The table are listed \n");
        basicDynamoTableFunctions.listTables();
    }
};


const s3Storage = {
    BUCKET_NAME: config.BUCKET_NAME,
    createS3Bucket: async function createS3BucketToStoreImages() {
        let params = {
            Bucket: this.BUCKET_NAME,
            ACL: "public-read"
        };

        await aws_s3.createBucket(params, function (err, data) {

            console.log("called Function createBucket ");

            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
            /*
            data = {
             Location: "/examplebucket"
            }
            */
        });
    }

};


//

// devicesTable.createDevicesTable();
// usersTable.createUsersTable();

// s3Storage.createS3Bucket();

// startOfflineDynamoDB().then(basicDynamoTableFunctions.listTables()); // start dynamodb offline
// studentTable.createUsersTable().then(basicDynamoTableFunctions.listTables());


