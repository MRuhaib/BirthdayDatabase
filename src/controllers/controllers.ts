import { Request, Response } from "express";
import Birthday from '../models/birthdays.js';
import moment from 'moment';

let viewAll = async (req: Request, res: Response)=>{
    try{
        let result:object[] = await Birthday.find();
        res.status(200).json(result).end();
    } catch(err) {
        console.error(err);
    };
    return;
};

let viewOne = async (req: Request, res: Response)=>{
    let name:string|null = req.body.Person;
    if(!name){
        res.status(400).send('No name given!').end();
        return;
    };
    try{
        let result:string|null = await Birthday.findOne({Person: name});
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

let addOne = async (req: Request, res: Response)=>{
    let name:string|null = req.body.Person;
    let bday:string|null = req.body.Birthday;
    if(!name && !bday){
        res.status(400).send('Complete data is not given!').end();
        return;
    } else if (!moment(bday, 'YYYY-MM-DD').isValid()){
        res.status(400).send('Birthday must be in YYYY-MM-DD format!').end();
        return;
    };
    try{
        const entry = new Birthday(req.body);
        let result:object|null = await entry.save();
        res.status(201).send('Added to the database: ' + result).end();
    } catch(err){
        console.error(err);
        res.status(500).end();
    };
    return;
};

let deleteOne = async (req: Request, res: Response)=>{
    let name:string|null = req.body.Person;
    if(!name){
        res.status(400).send('No name given!').end();
        return;
    };
    try{
        let result:object|null = await Birthday.findOne({Person: name});
        if (result){
            let deleted:object|null = await Birthday.findOneAndDelete({Person: name});
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

let updateOne = async (req: Request, res: Response)=>{
    let name:string|null = req.body.Person;
    let bday:string|null = req.body.Birthday;
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
            let old:object|null = await Birthday.findOneAndUpdate({Person: name}, {Birthday: bday});
            let updated:object|null = await Birthday.findOne({Person: name});
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

let closestOne = async (req: Request, res: Response)=>{
    try{
        let result:object[] = await Birthday.find();
        let closestBday : Date = new Date();
        closestBday.setTime(0);
        let closest:string = '';
        let today = new Date();
        result.forEach(function(element:any){
            let Bday = new Date(element.Birthday)
            let diff1:number = Math.abs(today.getTime() - closestBday.getTime())
            let diff2:number = Math.abs(today.getTime() - Bday.getTime())
            if(diff2 < diff1){
                closestBday = Bday;
                closest = element.Birthday
            }
        })
        let closestName:string|null = await Birthday.findOne({Birthday: closest});
        res.status(200).json(closestName).end();
    } catch(err) {
        console.error(err);
        res.status(500).end();
    };
    return;
};

let birthdayController = {viewAll, viewOne, deleteOne, addOne, updateOne, closestOne};

export default birthdayController;