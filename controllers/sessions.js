const Session = require("../models/sessions");

const axios = require("axios");



exports.getMentorStudents = (req, res, next) => {
    console.log("mentor students controller called")
}

exports.getMentorSessions = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    let headers
    console.log("items"+(req.query.range*10)+"-"+(req.query.range*10+19))
    if(req.query["life-cycle-status"]==="canceled,completed,late canceled,marked student as absent"){
        headers = {
            "range" : "items="+(req.query.range*10)+"-"+(req.query.range*10+19),
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        }
    } else {
        headers = {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        } 
    }
    
    axios.get(`https://api.openclassrooms.com/users/${req.params.mentorId}/sessions?actor=${req.query.actor}&life-cycle-status=${req.query["life-cycle-status"]}${req.query.after ? '&after=' + req.query.after : ""}${req.query.before ? '&before=' + req.query.before : ""}${req.query.sort? '&sort='+req.query.sort : ''}`,
        {
            headers: headers
        })
        .then((response) => {

            const newSession = new Session({
                sessions: [
                    ...response.data
                ]
            });
            newSession.save()
                .then(() => {
                    res.status(200).json(response.data)
                })
                .catch(error => res.status(400).json({ error }));

        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error })
        });


}

exports.getEvents = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];
    

    axios.get(`https://api.openclassrooms.com/users/${req.params.mentorId}/events`, 
    {
        headers : {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        }
    })
    .then((response) => {
        res.status(200).json(response.data)
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json({ error })
    });
}