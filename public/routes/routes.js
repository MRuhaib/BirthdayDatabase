"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_js_1 = __importDefault(require("../controllers/controllers.js"));
const router = express_1.default.Router();
//to get all entries:
router.get('/all', controllers_js_1.default.viewAll);
//to get a specific entry:
router.get('/one', controllers_js_1.default.viewOne);
//to add an entry:
router.post('/add', controllers_js_1.default.addOne);
//to delete an entry:
router.delete('/delete', controllers_js_1.default.deleteOne);
//to update an entry:
router.patch('/update', controllers_js_1.default.updateOne);
//to get the closest birthday:
router.get('/closest', controllers_js_1.default.closestOne);
exports.default = router;
