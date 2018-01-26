'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getUser = (event, context, callback) => {
    console.log(event);
    console.log("Here is the id" + event.pathParameters.id);
    const params = {
        TableName: 'Users',
        Key:{
            id: event.pathParameters.id
        },
    };

    dynamoDb.get(params, (error, result) => {   // scan = loops over all the items in the tables- affects performance
        console.log(error);
        console.log(result);
        if (error){
            const error = {
                statusCode: error.statusCode || 501,
                body: "Couldn't get User"

            };
            callback (null, error);
        }

        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(result.Item)
        };
        callback(null, response);

    });

};