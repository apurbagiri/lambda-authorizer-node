
module.exports = function(principalId, methodArn, effect) {
   var authResponse = {};
   
   authResponse.principalId = principalId;
   if (effect && methodArn) {
       var policyDocument = {};
       policyDocument.Version = '2012-10-17'; 
       policyDocument.Statement = [];
       var statementOne = {};
       statementOne.Action = 'execute-api:Invoke'; 
       statementOne.Effect = effect;
       statementOne.Resource = methodArn;
       policyDocument.Statement[0] = statementOne;
       authResponse.policyDocument = policyDocument;
   }
   
   authResponse.context = {
       "stringKey": "stringval",
       "numberKey": 123,
       "booleanKey": true
   };
   return authResponse;
 }