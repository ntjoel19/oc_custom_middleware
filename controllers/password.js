const passwordSchema = require("../models/password");

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(
        400,
        "Le mot de passe doit comprendre 6 caractères dont un chiffre, sans espaces",
        {
            "content-type": "application/json",
        }
        );
        res.end("Le mot de passe ne correspond pas.");
    } else {
        next();
    }
};