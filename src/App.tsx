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
import Typography from '@mui/material/Typography';
import LoadingUI from "./components/LoadingUI";
import convertirFecha from "./functions/convertirFecha";
import Alert from '@mui/material/Alert';


function App() {
  // Variable de estado para la ciudad seleccionada
  const [cityInput, setCityInput] = useState<string>("guayaquil");
  const dataFetcherOutput = DataFetcher(cityInput);
  const iaResponse = getCohereResponse(cityInput, dataFetcherOutput.data!);

  return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">
         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>
         

         {/* Alertas */}
         <Grid size={{ xs: 12, md: 12}} container justifyContent="space-between" alignItems="center">
            <p style={{fontWeight: "bold"}}>{convertirFecha(dataFetcherOutput.data?.current.time!)}</p>
            {dataFetcherOutput.data?.current.precipitation_probability!>50? <Alert severity="warning">Se preveen precipitaciones</Alert> : <AlertUI description="No se preveen precipitaciones"/>}
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
         <Grid container size={{ xs: 12, md: 12 }}>
            <Grid size={{ xs: 12, md: 12 }}>
                <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                Recomendaciones
                </Typography>
            </Grid>
                 {iaResponse.loading && <LoadingUI/>}
                 {(!iaResponse.loading && iaResponse.error) && <Alert variant="standard" severity="error"> {iaResponse.error} </Alert>}
                 {(!iaResponse.loading && iaResponse.respuesta) && (
                 <Grid container sx={{alignItems: "stretch"}}>
                    <RecomendacionesUI texto={iaResponse.respuesta}/>
                 </Grid>)}
         </Grid>
      </Grid>

      


  )
}


export default App;
