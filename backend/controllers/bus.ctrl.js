import { buses } from "../data/buses.js";

export const getAllBuses = (req, res) => {
  res.status(200).json(buses);
};
