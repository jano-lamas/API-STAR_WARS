import mongoose, { Schema } from "mongoose";
import { IFilmDocument } from "../../interfaces/film";

const filmSchema = new mongoose.Schema<IFilmDocument>({
  title: { type: String, unique: true, required: true },
  episode_id: { type: Number, unique: true, required: true },
  opening_crawl: { type: String, required: true },
  director: { type: String, required: true },
  producer: { type: String, required: true },
  release_date: { type: Date, required: true },
  characters: [{ type: String, required: true }],
  planets: [{ type: String, required: true }],
  starships: [{ type: String, required: true }],
  vehicles: [{ type: String, required: true }],
  species: [{ type: String, required: true }],
  created: { type: Date, required: true },
  edited: { type: Date, required: true },
});

export const filmModel = mongoose.model<IFilmDocument>("Film", filmSchema);
