'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    console.log(event);
    const data = JSON.parse(event.body); // extracting data from the event body

    console.log(data);
    const params = {
        TableName: 'Users',
        Item: {
            id: data.myobId,
            gitHubUsername: data.gitHubUsername,
            codeSchoolUsername: data.codeSchoolUsername,
            codeWarsUsername: data.codeWarsUsername
        }
    };

    dynamoDb.put(params, (error, result) => {
        if (error){
             console.error(error);
            callback (new Error ('Couldn\'t create the username item.'));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };
        callback(null, response);
    })
};