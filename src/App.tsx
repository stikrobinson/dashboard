import IndicatorUI from './components/IndicatorUI';
import './App.css'
import { Grid } from '@mui/material';
import SelectorUI from './assets/selectorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

function App() {
  const dataFetcherOutput = DataFetcher();

  return (
      <Grid container spacing={5} justifyContent="center" alignItems="center">
         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Encabezado</Grid>

         {/* Alertas */}
         <Grid size={{ xs: 12, md: 12}}>Elemento: Alertas</Grid>

         {/* Selector */}
          <Grid size={{ xs: 12, md: 3  }}>
                <SelectorUI/>
          </Grid>

         {/* Indicadores */}
         <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>
        

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

         {/* Gráfico */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }}>
            <ChartUI />
         </Grid>
                        
         {/* Tabla */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
            <TableUI />
         </Grid>
    
            {/* Información de la ubicación */}
         {/* Información adicional */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      </Grid>

      


  )
}


export default App;
