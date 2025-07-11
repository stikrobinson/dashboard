import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import DataFetcher from '../functions/DataFetcher';
import type { FetcherProps } from '../types/FetchProp';


export default function ChartUI({cityInput}: FetcherProps) {
   const dataFetcherOutput = DataFetcher(cityInput);

   const temperaturas = dataFetcherOutput.data?.hourly.temperature_2m || [];
   const viento = dataFetcherOutput.data?.hourly.wind_speed_10m || [];
   const horas = dataFetcherOutput.data?.hourly.time || [];
   return (
      <>
         <Typography variant="h5" component="div">
            Gráfico de Horas vs Temperatura y Viento
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: temperaturas, label: 'Temperatura' },
               { data: viento, label: 'Viento'},
            ]}
            xAxis={[{ scaleType: 'point', data: horas }]}
         />
      </>
   );
}