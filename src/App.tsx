import IndicatorUI from './components/IndicatorUI';
import './App.css'
import { Grid } from '@mui/material';
import SelectorUI from './components/SelectorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import RecomendacionesUI from "./components/RecomendacionesUI";
import { useState } from 'react';
import getCohereResponse from "./functions/CohereAssistant";

function App() {
  // Variable de estado para la ciudad seleccionada
  const [cityInput, setCityInput] = useState<string>("guayaquil");
  const dataFetcherOutput = DataFetcher(cityInput);
  const respuesta: string = getCohereResponse(cityInput, dataFetcherOutput);

  return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">
         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>
         

         {/* Alertas */}
         <Grid size={{ xs: 12, md: 12}} container justifyContent="right" alignItems="center">
                <AlertUI description="No se preveen lluvias"/>
         </Grid>

         {/* Selector */}
          <Grid size={{ xs: 12, md: 3  }}>
                <SelectorUI cityInput = {cityInput} setCityInput={setCityInput} />
          </Grid>

         {/* Indicadores */}
         <Grid container size={{ xs: 12, md: 9 }}>
        

                {/* Renderizado condicional de los datos obtenidos */}

                 {dataFetcherOutput.loading && <p>Cargando datos...</p>}
                 {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
                 {dataFetcherOutput.data && (
                 <>

                     {/* Indicadores con datos obtenidos */}

                     <Grid size={{ xs: 12, md: 3 }} >
                         <IndicatorUI
                             title='Temperatura (2m)'
                             description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura aparente'
                             description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Velocidad del viento'
                             description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Humedad relativa'
                             description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
                     </Grid>

                 </>
                 )}
        </Grid>

         {/* Gráfico */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }}>
                <ChartUI output={dataFetcherOutput}/>
         </Grid>
                        

         {/* Tabla */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                <TableUI output={dataFetcherOutput}/>
         </Grid>

    
     {/* Información de la ubicación */}
         {/* Información adicional */}
         <Grid container size={{ xs: 12, md: 12 }}><RecomendacionesUI texto={respuesta}/></Grid>

      </Grid>

      


  )
}


export default App;
