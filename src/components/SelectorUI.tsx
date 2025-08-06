import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { type SelectorUIProps } from '../types/SelectorProp'; 

export default function SelectorUI({cityInput, setCityInput}: SelectorUIProps) {

  // Función flecha para manejar el cambio
  const handleChange = (event: SelectChangeEvent<string>) => {
    setCityInput(event.target.value); // Actualiza el estado con la ciudad seleccionada
  };

  // Función para capitalizar la primera letra
  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1); 

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        value={cityInput} // Enlaza el valor con el estado
        onChange={handleChange}
      >
        <MenuItem disabled value="">
          <em>Seleccione una ciudad</em>
        </MenuItem>
        <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
        <MenuItem value={"quito"}>Quito</MenuItem>
        <MenuItem value={"manta"}>Manta</MenuItem>
        <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>
      {cityInput && (
        <p>
          Información del clima en{" "}
          <b>{capitalize(cityInput)}</b>
        </p>
      )}
    </FormControl>
  )
}