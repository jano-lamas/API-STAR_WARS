import axios from "axios";

export const getFilms = async () => {
  try {
    const response = await axios.get("https://swapi.dev/api/films/");
    return response?.data.results;
  } catch (err: any) {
    throw err;
  }
};

interface IResponseData {
  success: boolean;
  data?: any;
  error?: string;
}

export const findPeople = async (id: string): Promise<IResponseData> => {
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${id}`);
    return { success: true, data: response?.data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const findPlanets = async (id: string): Promise<IResponseData> => {
  try {
    const response = await axios.get(`https://swapi.dev/api/planets/${id}`);
    return { success: true, data: response?.data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const findStarships = async (id: string): Promise<IResponseData> => {
  try {
    const response = await axios.get(`https://swapi.dev/api/starships/${id}`);
    return { success: true, data: response?.data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const findVehicles = async (id: string): Promise<IResponseData> => {
  try {
    const response = await axios.get(`https://swapi.dev/api/vehicles/${id}`);
    return { success: true, data: response?.data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

export const findSpecies = async (id: string): Promise<IResponseData> => {
  try {
    const response = await axios.get(`https://swapi.dev/api/species/${id}`);
    return { success: true, data: response?.data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};
