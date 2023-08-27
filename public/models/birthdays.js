"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const BDSchema = new Schema({
    Person: {
        type: String,
        required: true
    },
    Birthday: {
        type: String,
        required: true
    }
});
let Birthday = mongoose_1.default.model('Birthday', BDSchema);
exports.default = Birthday;
