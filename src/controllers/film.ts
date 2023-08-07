import { Request, Response } from "express";
import { IFilm } from "../interfaces/film";
import FilmModel from "../service/film";
class FilmController {
  async insert(req: Request, res: Response) {
    try {
      const film: IFilm = {
        title: req.body.title,
        episode_id: req.body.episode_id,
        opening_crawl: req.body.opening_crawl,
        director: req.body.director,
        producer: req.body.producer,
        release_date: req.body.release_date,
        characters: req.body.characters,
        planets: req.body.planets,
        starships: req.body.starships,
        vehicles: req.body.vehicles,
        species: req.body.species,
        created: new Date(),
        edited: new Date(),
      };
      const data = await FilmModel.insertFilm(film);

      res.status(200).json({ succes: "OK", data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const film: IFilm = {
        title: req.body.title,
        episode_id: req.body.episode_id,
        opening_crawl: req.body.opening_crawl,
        director: req.body.director,
        producer: req.body.producer,
        release_date: req.body.release_date,
        characters: req.body.characters,
        planets: req.body.planets,
        starships: req.body.starships,
        vehicles: req.body.vehicles,
        species: req.body.species,
        created: undefined,
        edited: new Date(),
      };
      const data = await FilmModel.updateFilm(id, film);

      res.status(200).json({ succes: "OK", data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const args = {
        query: req.query,
      };
      const data = await FilmModel.getAllFilms(args);
      res
        .status(200)
        .json({ succes: "OK", counts: data?.totalFilms, data: data?.films });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await FilmModel.findFilm(id);

      res.status(200).json({ succes: "OK", data });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  }

  async deleteOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await FilmModel.deleteById(id);

      res.status(200).json({ succes: "OK", deleted: "succes" });
    } catch (error: any) {
      res.status(500).json({ message: error });
    }
  }
}

export const FilmCtrl = new FilmController();
