import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema<Users>({
  username: {
    type: String,
    required: [true, "Please provide a username."],
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
  },
});

export default mongoose.models.users ||
  mongoose.model<Users>("users", UserSchema);
