import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
