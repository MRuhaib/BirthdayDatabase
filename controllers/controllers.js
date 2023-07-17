const Birthday = require('../models/birthdays.js');
const moment = require('moment');

let viewAll = async (req, res)=>{
    try{
        let result = await Birthday.find();
        res.status(200).json(result).end();
    } catch(err) {
        console.error(err);
    };
    return;
};

let viewOne = async (req, res)=>{
    let name = req.body.Person;
    if(!name){
        res.status(400).send('No name given!').end();
        return;
    };
    try{
        let result = await Birthday.findOne({Person: name});
        if (result){
            res.status(200).json(result).end();
        } else {
            res.status(404).send('No such entry found.').end();
        }        
    } catch(err) {
        console.error(err);
        res.status(500).end();
    };
    return;
};

let addOne = async (req, res)=>{
    let name = req.body.Person;
    let bday = req.body.Birthday;
    if(!name && !bday){
        res.status(400).send('Complete data is not given!').end();
        return;
    } else if (!moment(bday, 'YYYY-MM-DD').isValid()){
        res.status(400).send('Birthday must be in YYYY-MM-DD format!').end();
        return;
    };
    try{
        const entry = new Birthday(req.body);
        let result = await entry.save();
        res.status(201).send('Added to the database: ' + result).end();
    } catch(err){
        console.error(err);
        res.status(500).end();
    };
    return;
};

let deleteOne = async (req, res)=>{
    let name = req.body.Person;
    if(!name){
        res.status(400).send('No name given!').end();
        return;
    };
    try{
        let result = await Birthday.findOne({Person: name});
        if (result){
            let deleted = await Birthday.findOneAndDelete({Person: name});
            res.status(200).send('Deleted this entry: ' + deleted).end();
        } else {
            res.status(404).send('No such entry found.').end();
        }        
    } catch(err) {
        console.error(err);
        res.status(500).end();
    };
    return;
};

let updateOne = async (req, res)=>{
    let name = req.body.Person;
    let bday = req.body.Birthday;
    if(!name && !bday){
        res.status(400).send('Complete data is not given!').end();
        return;
    } else if (!moment(bday, 'YYYY-MM-DD').isValid()){
        res.status(400).send('Birthday must be in YYYY-MM-DD format!').end();
        return;
    };
    try{
        let result = await Birthday.findOne({Person: name});
        if (result){
            let old = await Birthday.findOneAndUpdate({Person: name}, {Birthday: bday});
            let updated = await Birthday.findOne({Person: name});
            res.status(200).send('Updated this entry: ' + old + ' with ' + updated).end();
        } else {
            res.status(404).send('No such entry found.').end();
        }        
    } catch(err) {
        console.error(err);
        res.status(500).end();
    };
    return;
};

let closestOne = async (req, res)=>{
    try{
        let result = await Birthday.find();
        let closestBday = Infinity;
        let closest = ''
        let today = new Date();
        result.forEach(function(element){
            let Bday = new Date(element.Birthday)
            let diff1 = Math.abs(today - closestBday)
            let diff2 = Math.abs(today - Bday)
            if(diff2 < diff1){
                closestBday = Bday;
                closest = element.Birthday
            }
        })
        let closestName = await Birthday.findOne({Birthday: closest});
        res.status(200).json(closestName).end();
    } catch(err) {
        console.error(err);
        res.status(500).end();
    };
    return;
};

module.exports = {viewAll, viewOne, deleteOne, addOne, updateOne, closestOne}