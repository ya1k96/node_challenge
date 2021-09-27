//bulkSend.js
var SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SIB_API_KEY;

const sendEmail = (senderEmail, senderName, toEmail, toName, subject) => {
   return new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
   {
      "subject": subject,
      "sender":{ "email": senderEmail, "name": senderName},
      'replyTo' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
      'to' : [{'name': toName, 'email': toEmail}],
      'htmlContent' : '<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>',
      'params' : {'bodyMessage':'Made just for you!'}
    }
   );   
}

module.exports = sendEmail;