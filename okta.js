const OktaJwtVerifier = require('@okta/jwt-verifier');
const AuthPolicy = require('./AuthPolicy.js');
const oktaConfig = require('./okta-config.js');

const oktaJwtVerifier = new OktaJwtVerifier({ issuer: oktaConfig.issuer, clientId: oktaConfig.clientId});
module.exports = async function(authToken, methodArn, principalId){
const promise = new Promise((resolve, reject) => {
	oktaJwtVerifier.verifyAccessToken((authToken.split(" "))[1], oktaConfig.expectedAud).then( jwt => {
    console.log("Token Verified");
    console.log(JSON.stringify(jwt.claims, null, 4));
    const authPolicy = AuthPolicy(principalId, methodArn, 'Allow');
    resolve(authPolicy);
})
.catch( err => {
  console.log("Token Verification Failed: " + err.message);
  const authPolicy = AuthPolicy(principalId, methodArn, 'Deny');
  resolve(authPolicy)
});
})
  return promise;
}