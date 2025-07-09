import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import DataFetcher from '../functions/DataFetcher';

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
      headerName: 'Temperatura',
      width: 150,
   },
   {
      field: 'viento',
      headerName: 'Viento',
      width: 150,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 160,
      valueGetter: (_, row) => `${row.hora || ''} ${row.temperatura || ''} ${row.viento || ''}`,
   },
];

export default function TableUI() {
   const dataFetcherOutput = DataFetcher();
    
   const temperaturas = dataFetcherOutput.data?.hourly.temperature_2m || [];
   const viento = dataFetcherOutput.data?.hourly.wind_speed_10m || [];
   const horas = dataFetcherOutput.data?.hourly.time || [];
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