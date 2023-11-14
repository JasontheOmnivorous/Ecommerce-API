import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";

interface UserType {
  name: string;
  email: string;
  photo?: string;
  password: string;
  passwordConfirm: string | undefined;
}

const userSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
    required: [true, "Username required."],
    minlength: [5, "Username must be longer than or equal to 5 characters."],
    maxlength: [20, "Username must be shorter than or equal to 20 characters."],
  },
  email: {
    type: String,
    required: [true, "Email required."],
    unique: [true, "This email already exists."],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Password required."],
    minlength: [10, "Password must be longer than or equal to 10 characters."],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please reconfirm the password."],
    // validate if the reconfirmed pw is the same with input pw
    validate: {
      validator: function (this: UserType, val: string): boolean {
        return val === this.password;
      },
      message: "Passwords are not the same.", // if false, send this message to global error handler
    },
  },
});

// use mongoDB's presave hook middleware to hash and encrypt input password before saving it into the DB
userSchema.pre("save", async function (next) {
  if (!this.isModified()) return next();

  // hash the password with CPU usage of 12 (the more, the better and the more time it takes)
  this.password = await bcrypt.hash(this.password, 12);
  // make it undefined, because we already validate pw during input
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
