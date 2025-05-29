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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = require("validator");
const adminSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator_1.isEmail, "please enter a valid email"],
    },
    password: { type: String, required: true },
});
const saltRounds = 10;
// Hash password before saving
adminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = this;
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        admin.password = yield bcrypt_1.default.hash(admin.password, salt);
        next();
    });
});
// Log after saving
adminSchema.post("save", function (doc, next) {
    console.log("user created", doc);
    next();
});
// Static login method
adminSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email });
        if (!user)
            throw Error("User does not exist");
        const auth = yield bcrypt_1.default.compare(password, user.password);
        if (!auth)
            throw Error("Wrong Credentials");
        return user;
    });
};
// Export model with extended statics
const Admin = mongoose_1.default.model("Admin", adminSchema);
exports.default = Admin;
