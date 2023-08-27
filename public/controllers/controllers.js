"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const birthdays_js_1 = __importDefault(require("../models/birthdays.js"));
const moment_1 = __importDefault(require("moment"));
let viewAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield birthdays_js_1.default.find();
        res.status(200).json(result).end();
    }
    catch (err) {
        console.error(err);
    }
    ;
    return;
});
let viewOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.Person;
    if (!name) {
        res.status(400).send('No name given!').end();
        return;
    }
    ;
    try {
        let result = yield birthdays_js_1.default.findOne({ Person: name });
        if (result) {
            res.status(200).json(result).end();
        }
        else {
            res.status(404).send('No such entry found.').end();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
    ;
    return;
});
let addOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.Person;
    let bday = req.body.Birthday;
    if (!name && !bday) {
        res.status(400).send('Complete data is not given!').end();
        return;
    }
    else if (!(0, moment_1.default)(bday, 'YYYY-MM-DD').isValid()) {
        res.status(400).send('Birthday must be in YYYY-MM-DD format!').end();
        return;
    }
    ;
    try {
        const entry = new birthdays_js_1.default(req.body);
        let result = yield entry.save();
        res.status(201).send('Added to the database: ' + result).end();
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
    ;
    return;
});
let deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.Person;
    if (!name) {
        res.status(400).send('No name given!').end();
        return;
    }
    ;
    try {
        let result = yield birthdays_js_1.default.findOne({ Person: name });
        if (result) {
            let deleted = yield birthdays_js_1.default.findOneAndDelete({ Person: name });
            res.status(200).send('Deleted this entry: ' + deleted).end();
        }
        else {
            res.status(404).send('No such entry found.').end();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
    ;
    return;
});
let updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.body.Person;
    let bday = req.body.Birthday;
    if (!name && !bday) {
        res.status(400).send('Complete data is not given!').end();
        return;
    }
    else if (!(0, moment_1.default)(bday, 'YYYY-MM-DD').isValid()) {
        res.status(400).send('Birthday must be in YYYY-MM-DD format!').end();
        return;
    }
    ;
    try {
        let result = yield birthdays_js_1.default.findOne({ Person: name });
        if (result) {
            let old = yield birthdays_js_1.default.findOneAndUpdate({ Person: name }, { Birthday: bday });
            let updated = yield birthdays_js_1.default.findOne({ Person: name });
            res.status(200).send('Updated this entry: ' + old + ' with ' + updated).end();
        }
        else {
            res.status(404).send('No such entry found.').end();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
    ;
    return;
});
let closestOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield birthdays_js_1.default.find();
        let closestBday = new Date();
        closestBday.setTime(0);
        let closest = '';
        let today = new Date();
        result.forEach(function (element) {
            let Bday = new Date(element.Birthday);
            let diff1 = Math.abs(today.getTime() - closestBday.getTime());
            let diff2 = Math.abs(today.getTime() - Bday.getTime());
            if (diff2 < diff1) {
                closestBday = Bday;
                closest = element.Birthday;
            }
        });
        let closestName = yield birthdays_js_1.default.findOne({ Birthday: closest });
        res.status(200).json(closestName).end();
    }
    catch (err) {
        console.error(err);
        res.status(500).end();
    }
    ;
    return;
});
let birthdayController = { viewAll, viewOne, deleteOne, addOne, updateOne, closestOne };
exports.default = birthdayController;
