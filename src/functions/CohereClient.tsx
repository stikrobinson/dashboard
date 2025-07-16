import { CohereClientV2 } from 'cohere-ai';
import { useEffect } from 'react';

const cohere = new CohereClientV2({ token: import.meta.env.COHERE_TOKEN });

export const getCohereResponse = async () => {
  
  useEffect( () => {
    const getResponse = async () => {
        // Falta try catch
        const response = await cohere.chat({
        model: 'command-a-03-2025',
        messages: [
        {
            role: 'user',
            content: 'Escribe una recomendación de viaje a Ecuador',
        },
        ],
       });
       return response;
    }


  }, [])

};

