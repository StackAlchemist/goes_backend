import mongoose, { Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { isEmail } from "validator";

// Interface for Admin document
interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
}

// Interface for Admin model statics
interface AdminModel extends Model<IAdmin> {
  login(email: string, password: string): Promise<IAdmin>;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: { type: String, required: true },
});

const saltRounds = 10;

// Hash password before saving
adminSchema.pre("save", async function (next) {
  const admin = this as IAdmin;
  const salt = await bcrypt.genSalt(saltRounds);
  admin.password = await bcrypt.hash(admin.password, salt);
  next();
});

// Log after saving
adminSchema.post("save", function (doc, next) {
  console.log("user created", doc);
  next();
});

// Static login method
adminSchema.statics.login = async function (
  email: string,
  password: string
): Promise<IAdmin> {
  const user = await this.findOne({ email });
  if (!user) throw Error("User does not exist");

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) throw Error("Wrong Credentials");

  return user;
};

// Export model with extended statics
const Admin = mongoose.model<IAdmin, AdminModel>("Admin", adminSchema);
export default Admin;
