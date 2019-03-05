// The following constant has credentials for the AWS.
const awsCredentialConfig = {
    region: "ap-southeast-1",
    // The endpoint should point to the local or remote computer where DynamoDB (downloadable) is running.
    // endpoint: 'http://localhost:8000'
    // endpoint: 'https://dynamodb.us-east-1.amazonaws.com'
    /*
      accessKeyId and secretAccessKey defaults can be used while using the downloadable version of DynamoDB.
      For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    */
    // accessKeyId: "fake",
    // secretAccessKey: "fake"
};

module.exports = {
    getAWS_JSONCredentials: function () {
        return awsCredentialConfig;
    }
};