const oktaValidate = require('./okta')

exports.handler =  async function(event, context) {
   console.log("AuthEvent: \n" + JSON.stringify(event, null, 4));
   console.log("LambdaContext: \n" + JSON.stringify(context, null, 4));
   return oktaValidate(event.authorizationToken, event.methodArn, "123456789");
};