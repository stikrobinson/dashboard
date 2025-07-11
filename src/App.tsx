import IndicatorUI from './components/IndicatorUI';
import './App.css'
import { Grid } from '@mui/material';
import SelectorUI from './components/SelectorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import { useState } from 'react';

function App() {
  // Variable de estado para la ciudad seleccionada
  const [cityInput, setCityInput] = useState<string>("guayaquil");
  //const = DataFetcher(cityInput);
    const { data, loading, error } = DataFetcher(cityInput);

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

                 {loading && <p>Cargando datos...</p>}
                 {error && <p>Error: {error}</p>}
                 {data && (
                 <>

                     {/* Indicadores con datos obtenidos */}

                     <Grid size={{ xs: 12, md: 3 }} >
                         <IndicatorUI
                             title='Temperatura (2m)'
                             description={data.current.temperature_2m + " " + data.current_units.temperature_2m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura aparente'
                             description={data.current.apparent_temperature + " " + data.current_units.apparent_temperature} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Velocidad del viento'
                             description={data.current.wind_speed_10m + " " + data.current_units.wind_speed_10m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Humedad relativa'
                             description={data.current.relative_humidity_2m + " " + data.current_units.relative_humidity_2m} />
                     </Grid>

                 </>
                 )}
        </Grid>

         {/* Gráfico */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }}>
                <ChartUI cityInput={cityInput}/>
         </Grid>
                        

         {/* Tabla */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                <TableUI cityInput={cityInput}/>
         </Grid>

    
     {/* Información de la ubicación */}
         {/* Información adicional */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      </Grid>

      


  )
}


export default App;
