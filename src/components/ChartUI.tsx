import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import DataFetcher from '../functions/DataFetcher';

export default function ChartUI() {
   const dataFetcherOutput = DataFetcher();

   const temperaturas = dataFetcherOutput.data?.hourly.temperature_2m || [];
   const viento = dataFetcherOutput.data?.hourly.wind_speed_10m || [];
   const horas = dataFetcherOutput.data?.hourly.time || [];
   return (
      <>
         <Typography variant="h5" component="div">
            Chart arrLabels vs arrValues1 & arrValues2
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