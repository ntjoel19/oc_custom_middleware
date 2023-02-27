const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

const axios = require("axios")

const User = require("../models/user")

dotenv.config();

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: "User créé !" }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "User non trouvé !" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWTPRIVATEKEY
                            ,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.me = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    

    axios.get('https://api.openclassrooms.com/me', 
    {
        headers : {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        }
    })
    .then((response) => {
        console.log(response.data)
        res.status(200).json(response.data)
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json({ error })
    });
}

exports.getMentorProfile = (req, res, next) => {
    //console.log(req)
}
