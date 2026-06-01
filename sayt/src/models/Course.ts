import { Schema, model, models } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    fee: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Course = models.Course || model("Course", courseSchema);
