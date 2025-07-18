import { CohereClientV2 } from 'cohere-ai';
import { useState, useEffect } from 'react';
import type { DataFetcherOutput } from "./DataFetcher";

const cohere = new CohereClientV2({ token: import.meta.env.VITE_COHERE_TOKEN });

export default function getCohereResponse(cityInput: string, dataFetcherOutput: DataFetcherOutput){
  
  const [respuesta, setRespuesta] = useState<string>("error");

  useEffect( () => {
    const prompt = dataFetcherOutput.data !== null? `Escribe recomendaciones sobre para el clima de ${cityInput} si la temperatura es ${dataFetcherOutput.data!.current.temperature_2m} ${dataFetcherOutput.data!.current_units.temperature_2m}, con sensación térmica de ${dataFetcherOutput.data!.current.apparent_temperature} ${dataFetcherOutput.data!.current_units.apparent_temperature}, viento de ${dataFetcherOutput.data!.current.wind_speed_10m} ${dataFetcherOutput.data!.current_units.wind_speed_10m}, humedad relativa de ${dataFetcherOutput.data!.current.relative_humidity_2m} ${dataFetcherOutput.data!.current_units.relative_humidity_2m} y la la fecha y hora es ${dataFetcherOutput.data!.current.time}. Escribe solo la lista de recomendaciones.`: "";
    const getResponse = async () => {
        // Falta try catch
        const response = await cohere.chat({
        model: 'command-a-03-2025',
        messages: [
        {
            role: 'user',
            content: prompt,
        },
        ],
       });

       setRespuesta(response!.message?.content?.[0].text || "");
    }
    getResponse();
  }, [cityInput]);

  return respuesta;

};


