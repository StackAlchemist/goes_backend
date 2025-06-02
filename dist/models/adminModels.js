"use strict";
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
adminSchema.pre("save", async function (next) {
    const admin = this;
    const salt = await bcrypt_1.default.genSalt(saltRounds);
    admin.password = await bcrypt_1.default.hash(admin.password, salt);
    next();
});
// Log after saving
adminSchema.post("save", function (doc, next) {
    console.log("user created", doc);
    next();
});
// Static login method
adminSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user)
        throw Error("User does not exist");
    const auth = await bcrypt_1.default.compare(password, user.password);
    if (!auth)
        throw Error("Wrong Credentials");
    return user;
};
// Export model with extended statics
const Admin = mongoose_1.default.model("Admin", adminSchema);
exports.default = Admin;
