import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "rider" | "driver" | "admin";
  // Driver-only fields
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  licensePlate?: string;
  driverStatus?: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName:     { type: String, required: true, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:        { type: String, required: true, trim: true },
    password:     { type: String, required: true, minlength: 8 },
    role:         { type: String, enum: ["rider", "driver", "admin"], default: "rider" },
    // Driver fields
    vehicleMake:  { type: String },
    vehicleModel: { type: String },
    vehicleYear:  { type: String },
    vehicleColor: { type: String },
    licensePlate: { type: String },
    driverStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

/* Prevent model re-compilation on hot reload */
const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export default User;
