import { Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
 
interface RecomedacionesUIProps {
     texto: string;
}

export default function RecomedacionesUI(props: RecomedacionesUIProps){
    const lista = props.texto.slice(2).replace(/\*/g, "").split("-").map( (elemento) => {
            const division = elemento.split(":").map( elemento => elemento.trim());
            return <Grid size={{ xs: 12, md: 6}}>
            <Alert sx={{textAlign: "left"}} variant="outlined" severity="info">
                <AlertTitle sx={{fontWeight: "bold"}}>{division[0]}</AlertTitle>
                {division[1]}
            </Alert>
            </Grid>
    });
    return <>{lista}</>;
}
