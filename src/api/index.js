import axios from "axios";

//in this get places i am passing the response data from the fetched api from the rapid api and giving the dynamic values to the params to get the real restaurants around a particular area 

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'X-RapidAPI-Key': 'bda9b25fb1mshc1d0e4d8f98694dp124e97jsn3c764097f8a3',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};