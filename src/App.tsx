import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <div>
        <h1>Bienvenido al Dashboard</h1>
      </div>
      <Grid container spacing={5} justifyContent="center" alignItems="center">
      <Grid>

         {/* Encabezado */}
         <Grid item xs={12} md={12}>
         {/* Encabezado */}
         </Grid>

         {/* Alertas */}
         <Grid item xs={12} md={12}>
         {/* Alertas */}
         </Grid>

         {/* Selector e Indicadores */}
         <Grid item container xs={12} md={12} spacing={2}>
            <Grid item xs={12} md={3}>
              {/* Selector */}
            </Grid>
            <Grid item xs={12} md={9}>
              {/* Indicadores */}
            </Grid>
         </Grid>

         {/* Gráfico y Tabla */}
         <Grid item container xs={12} md={12} spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            >
              {/* Gráfico */}
              <Box>Gráfica</Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            >
              {/* Tabla */}
              <Box>Tabla</Box>
            </Grid>
         </Grid>

         {/* Información adicional */}
         <Grid item xs={12} md={12}>
         {/* Información adicional */}
         </Grid>

      </Grid>
      </Grid>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    </>
  )
}

export default App
