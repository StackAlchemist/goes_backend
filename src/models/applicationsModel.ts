import mongoose from "mongoose";

const applicationsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Applications = mongoose.model("Applications", applicationsSchema);

export default Applications;