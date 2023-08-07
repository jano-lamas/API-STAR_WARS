import { getFilms } from "../api-starWars/endpoints";
import { filmModel } from "../bd/models/film";

const updatedb = async () => {
  try {
    const films = await getFilms();

    const bulkOps = films.map((film: any) => ({
      updateOne: {
        filter: { title: film.title },
        update: film,
        upsert: true,
      },
    }));

    const result = await filmModel.bulkWrite(bulkOps);
    console.log("database update", result);
  } catch (err) {
    console.error(err);
  }
};

export default updatedb;
