import { Schema, model, models } from "mongoose";

const newsSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const News = models.News || model("News", newsSchema);
