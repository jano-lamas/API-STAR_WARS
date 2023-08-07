import {
  findPeople,
  findPlanets,
  findSpecies,
  findStarships,
  findVehicles,
} from "../api-starWars/endpoints";

class ValidateData {
  async validateCharacter(ids: string[]) {
    try {
      let people: string[] = [];
      for (const id of ids) {
        const character = await findPeople(id);
        if (character.success === false) {
          throw new Error(`character with id: ${id} not found.`);
        }
        people.push(`https://swapi.dev/api/people/${id}/`);
      }
      return people;
    } catch (error) {
      throw error;
    }
  }
  async validatePlanets(ids: string[]) {
    try {
      let planets: string[] = [];
      for (const id of ids) {
        const planet = await findPlanets(id);
        if (planet.success === false) {
          throw new Error(`planet whit id: ${id}  not found.`);
        }
        planets.push(`https://swapi.dev/api/planets/${id}/`);
      }
      return planets;
    } catch (error) {
      throw error;
    }
  }
  async validateStarships(ids: string[]) {
    let starships: string[] = [];
    for (const id of ids) {
      const starship = await findStarships(id);
      if (starship.success === false) {
        throw new Error(`starship whit id: ${id}  not found.`);
      }
      starships.push(`https://swapi.dev/api/starships${id}/`);
    }
    return starships;
  }
  async validateVehicles(ids: string[]) {
    let vehicles: string[] = [];
    for (const id of ids) {
      const vehicle = await findVehicles(id);
      if (vehicle.success === false) {
        throw new Error(`vehicle whit id: ${id}  not found.`);
      }
      vehicles.push(`https://swapi.dev/api/vehicles/${id}/`);
    }
    return vehicles;
  }
  async validateSpecies(ids: string[]) {
    let species: string[] = [];
    for (const id of ids) {
      const specie = await findSpecies(id);
      if (specie.success === false) {
        throw new Error(`specie whit id: ${id}  not found.`);
      }
      species.push(`https://swapi.dev/api/species/${id}/`);
    }
    return species;
  }
}

export default new ValidateData();
