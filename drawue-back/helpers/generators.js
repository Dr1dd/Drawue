
const { User } = require('../models/user');

function generatePseudoPassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var password_value = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password_value += charset.charAt(Math.floor(Math.random() * n));
    }
return password_value;
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
exports.generatePassword = generatePseudoPassword;
exports.generateUsername = generateUniqueUsername;