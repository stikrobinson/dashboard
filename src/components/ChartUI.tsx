import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { FetcherProps } from '../types/FetchProp';


export default function ChartUI({output}: FetcherProps) {

   const temperaturas = output.data?.hourly.temperature_2m || [];
   const viento = output.data?.hourly.wind_speed_10m || [];
   const horas = output.data?.hourly.time || [];
   return (
      <>
         <Typography variant="h5" component="div">
            Gráfico de Horas vs Temperatura (2m) y Viento (10m)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: temperaturas, label: 'Temperatura (°C)' },
               { data: viento, label: 'Viento (km/h)'},
            ]}
            xAxis={[{ scaleType: 'point', data: horas }]}
         />
      </>
   );
}