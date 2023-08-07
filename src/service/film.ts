import { IFilm } from "../interfaces/film";
import { filmModel } from "../bd/models/film";
import ValidateData from "../utils/validateData";

class FilmModel {
  /**
   * @param IFilm
   * @returns film
   */
  async insertFilm(film: IFilm) {
    try {
      const existingFilm = await filmModel.findOne({
        $or: [{ title: film.title }, { episode_id: film.episode_id }],
      });

      if (existingFilm) {
        throw new Error(
          `already exists a film with the title or episode number`
        );
      }

      // validamos a travez la api si existen los datos
      film.characters = await ValidateData.validateCharacter(film.characters);
      film.planets = await ValidateData.validatePlanets(film.planets);
      film.starships = await ValidateData.validateStarships(film.starships);
      film.vehicles = await ValidateData.validateVehicles(film.vehicles);
      film.species = await ValidateData.validateSpecies(film.species);

      const newFilm = await filmModel.create(film);
      return newFilm;
    } catch (error: any) {
      throw error.message;
    }
  }

  /**
   * @param documentId
   * @param IFilm
   * @returns film
   */
  async updateFilm(documentId: string, film: IFilm) {
    try {
      const existingFilm = await filmModel.findById(documentId);

      if (!existingFilm) {
        throw new Error(`Film not found with id: ${documentId}`);
      }

      // validamos a travez la api si existen los datos
      film.characters = await ValidateData.validateCharacter(film.characters);
      film.planets = await ValidateData.validatePlanets(film.planets);
      film.starships = await ValidateData.validateStarships(film.starships);
      film.vehicles = await ValidateData.validateVehicles(film.vehicles);
      film.species = await ValidateData.validateSpecies(film.species);

      const updatedDocument = await filmModel.findByIdAndUpdate(
        documentId,
        { $set: film },
        { new: true }
      );

      return updatedDocument;
    } catch (error: any) {
      throw error.message;
    }
  }

  /**
   * @param args[query]
   * @returns films
   */
  async getAllFilms(args: any) {
    try {
      const query: any = {};
      if (args.query.title) {
        query.title = { $regex: args.query.title, $options: "i" };
      }
      if (args.query.director) {
        query.director = { $regex: args.query.director, $options: "i" };
      }
      if (args.query.characters) {
        query.characters = { $in: [args.query.characters] };
      }
      const order = args.query.order === "desc" ? -1 : 1;

      const page = args.query.page || 1;
      const perPage = args.query.perPage || 10;

      const [films, totalFilms] = await Promise.all([
        filmModel
          .find(query, { _id: 1, title: 1, director: 1 })
          .sort({ title: order })
          .skip((page - 1) * perPage)
          .limit(perPage),
        filmModel.countDocuments(query),
      ]);

      return { films, totalFilms };
    } catch (error: any) {
      throw error.message;
    }
  }

  /**
   * @param documentId
   * @returns film
   */
  async findFilm(documentId: string) {
    try {
      const response = await filmModel.findById({ _id: documentId });

      if (!response)
        throw new Error(`film with id: ${documentId} not found`);

      return response;
    } catch (error: any) {
      throw error.message;
    }
  }

  /**
   * @param documentId
   * @returns
   */
  async deleteById(documentId: string) {
    try {
      const response = await filmModel.deleteOne({ _id: documentId });

      if (response.deletedCount === 0)
        throw new Error(`film with id: ${documentId} not found`);

      return response;
    } catch (error: any) {
      throw error.message;
    }
  }
}

export default new FilmModel();
