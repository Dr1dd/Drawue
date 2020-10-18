const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 40,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 256
    },
    emailConfirmed: {
        type: Boolean
    },
},{ timestamps: true }));
 
function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(8).max(254).required().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                    err.message = "Username field should not be empty!";
                    break;
                case "any.required":
                  err.message = "Username field is required!";
                  break;
                case "string.min":
                  err.message = `Username should have at least ${err.context.limit} characters!`;
                  break;
                case "string.max":
                  err.message = `Username field should not exceed ${err.context.limit} characters!`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        email: Joi.string().min(8).max(40).required().email().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                    err.message = "Email field should not be empty!";
                    break;
                case "any.required":
                  err.message = "Email field is required!";
                  break;
                case "string.min":
                  err.message = `Email should have at least ${err.context.limit} characters!`;
                  break;
                case "string.max":
                  err.message = `Email field should not exceed ${err.context.limit} characters!`;
                  break;
                case "string.email":
                  err.message = "Email input should be formatted as email";
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        password: Joi.string().min(6).max(256).required().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case "any.empty":
                    err.message = "Password field should not be empty!";
                    break;
                case "any.required":
                  err.message = "Password field is required!";
                  break;
                case "string.min":
                  err.message = `Password should have at least ${err.context.limit} characters!`;
                  break;
                case "string.max":
                  err.message = `Password field should not exceed ${err.context.limit} characters!`;
                  break;
                default:
                  break;
              }
            });
            return errors;
          }),
        rememberUser: Joi.boolean()
    });
    return schema.validate(user);
}
function validateLogin(user){
  const schema = Joi.object({
    username_email: Joi.string().min(8).max(254).required().error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "any.empty":
                err.message = "Username field should not be empty!";
                break;
            case "any.required":
              err.message = "Username field is required!";
              break;
            case "string.min":
              err.message = `Username should have at least ${err.context.limit} characters!`;
              break;
            case "string.max":
              err.message = `Username field should not exceed ${err.context.limit} characters!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    password: Joi.string().min(6).max(256).required().error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "any.empty":
                err.message = "Password field should not be empty!";
                break;
            case "any.required":
              err.message = "Password field is required!";
              break;
            case "string.min":
              err.message = `Password should have at least ${err.context.limit} characters!`;
              break;
            case "string.max":
              err.message = `Password field should not exceed ${err.context.limit} characters!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
});
return schema.validate(user);

}
function validatePassword(password){
  const schema = {
    password: Joi.string().min(6).max(255).required().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
              err.message = "Password field should not be empty!";
              break;
          case "any.required":
            err.message = "Password field is required!";
            break;
          case "string.min":
            err.message = `Password should have at least ${err.context.limit} characters!`;
            break;
          case "string.max":
            err.message = `Password field should not exceed ${err.context.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  };
  return Joi.validate(password, schema);
}
function validateEmail(email){
  const schema = {
    email: Joi.string().min(8).max(254).required().email().error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case "any.empty":
              err.message = "Email field should not be empty!";
              break;
          case "any.required":
            err.message = "Email field is required!";
            break;
          case "string.min":
            err.message = `Email should have at least ${err.context.limit} characters!`;
            break;
          case "string.max":
            err.message = `Email field should not exceed ${err.context.limit} characters!`;
            break;
          case "string.email":
            err.message = "Email input should be formatted as email";
          break;
          default:
            break;
        }
      });
      return errors;
    }),
  };
  return Joi.validate(email, schema);
}
 
exports.User = User;
exports.validate = validateUser;
exports.validateLogin = validateLogin;
exports.validatePassword = validatePassword;
exports.validateEmail = validateEmail;