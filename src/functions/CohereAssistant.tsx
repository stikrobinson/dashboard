import { CohereClientV2 } from 'cohere-ai';
import { useState, useEffect } from 'react';
import type { OpenMeteoResponse } from "../types/DashboardTypes"

const cohere = new CohereClientV2({ token: import.meta.env.VITE_COHERE_TOKEN });

export default function getCohereResponse(cityInput: string, dataFetcherOutput: OpenMeteoResponse){
  
  const [respuesta, setRespuesta] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect( () => {
    const prompt = dataFetcherOutput !== null? `Escribe 6 recomendaciones útiles sobre para el clima de ${cityInput}, Ecuador si la temperatura es ${dataFetcherOutput!.current.temperature_2m} ${dataFetcherOutput!.current_units.temperature_2m}, con sensación térmica de ${dataFetcherOutput!.current.apparent_temperature} ${dataFetcherOutput!.current_units.apparent_temperature}, viento de ${dataFetcherOutput!.current.wind_speed_10m} ${dataFetcherOutput!.current_units.wind_speed_10m}, humedad relativa de ${dataFetcherOutput!.current.relative_humidity_2m} ${dataFetcherOutput!.current_units.relative_humidity_2m} y la la fecha y hora es ${dataFetcherOutput!.current.time}. Escribe solo la lista de recomendaciones. Usar la virgulilla (~) exclusivamente como viñeta para la lista y los dos puntos para separar el título con la descripción de la recomendación. La descripción debe empezar su primera letra con mayúscula. No menciones las estadísticas del clima dadas en el prompt.`: "";
    const getResponse = async () => {
        try{
          if(prompt === ""){
            setRespuesta("");
          }else if(localStorage.getItem(`${cityInput}_tips`)===null){
             setLoading(true)
             const response = await cohere.chat({
             model: 'command-a-03-2025',
             messages: [
             {
              role: 'user',
              content: prompt,
             },
             ],
            });
            localStorage.setItem(`${cityInput}_tips`, response!.message?.content?.[0].text || "");
            setRespuesta(response!.message?.content?.[0].text || "");
            
          }else{
            const tips = localStorage.getItem(`${cityInput}_tips`)!;
            setRespuesta(tips);
          }
          setError(null);
      }catch(err){
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error desconocido al obtener los datos.");
        }
        setRespuesta("");
      }finally{
        setLoading(false);
      }
    }
    getResponse();
  }, [dataFetcherOutput]);

  return { respuesta, loading, error };

};


