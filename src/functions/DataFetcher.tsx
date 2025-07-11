import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';4

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

interface Coordenadas {
  latitude: number;
  longitude: number;
}

const ciudades: Record<string, Coordenadas> = {
  guayaquil: { latitude: -2.1962, longitude: -79.8862 },
  quito:     { latitude: -0.2298, longitude: -78.525 },
  cuenca:    { latitude: -2.9005, longitude: -79.0045 },
  manta:     { latitude: -0.9494, longitude: -80.7314 },
};

export default function DataFetcher(cityInput: string) : DataFetcherOutput {
    let latitude = ciudades[cityInput]?.latitude || 0;
    let longitude = ciudades[cityInput]?.longitude || 0;
    
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        // Reemplace con su URL de la API de Open-Meteo obtenida en actividades previas
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago&forecast_days=1`
        const fetchData = async () => {

            try {

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const result: OpenMeteoResponse = await response.json();
                setData(result);

            } catch (err: any) {

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }

            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [cityInput]); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}
