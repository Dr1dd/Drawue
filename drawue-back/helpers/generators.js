
const { User } = require('../models/user');

function generatePassword(length) {
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
return retVal;
}
function generateUniqueUsername(proposedName) {
    return User
      .findOne({username: proposedName})
      .then(function(account) {
        if (account) {
          proposedName +=  "1";
          return generateUniqueUsername(proposedName); // <== return statement here
        }
        return proposedName;
      })
      .catch(function(err) {
        throw err;
      });
 }
exports.generatePassword = generatePassword;
exports.generateUsername = generateUniqueUsername;