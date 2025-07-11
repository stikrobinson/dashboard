import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { FetcherProps } from '../types/FetchProp';


function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      hora: label,
      temperatura: arrValues1[index],
      viento: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'hora',
      headerName: 'Hora',
      width: 150,
   },
   {
      field: 'temperatura',
      headerName: 'Temperatura (2m) [°C]',
      width: 150,
   },
   {
      field: 'viento',
      headerName: 'Viento (10m) [km/h]',
      width: 150,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 160,
      valueGetter: (_, row) => `${row.hora || ''} ${row.temperatura + " °C"|| ''} ${row.viento +" km/h" || ''}`,
   },
];

export default function TableUI({output}: FetcherProps) {    
   const temperaturas = output.data?.hourly.temperature_2m || [];
   const viento = output.data?.hourly.wind_speed_10m || [];
   const horas = output.data?.hourly.time || [];
   const rows = combineArrays(horas, temperaturas, viento);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}