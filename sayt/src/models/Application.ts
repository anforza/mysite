import { Schema, model, models } from "mongoose";

const applicationSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    program: { type: String, required: true },
    documentUrl: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Application = models.Application || model("Application", applicationSchema);
