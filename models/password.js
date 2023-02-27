var passwordValidator = require("password-validator");

var passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(6) // Min 6 caractères
  .is()
  .max(100) // Max 100 caractères
  .has()
  .uppercase() //avoir uppercase letters
  .has()
  .lowercase() //avoir lowercase letters
  .has()
  .digits(1) //avoir 1 chiffre
  .has()
  .not()
  .spaces() //pas d'espace
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

module.exports = passwordSchema;
