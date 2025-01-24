import axiosInstance from "./axios";

export const getHistoricalEvents = async (month, day) => {
  try {
    const response = await axiosInstance.get(
      `historicalevents?month=${month}&day=${day}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
