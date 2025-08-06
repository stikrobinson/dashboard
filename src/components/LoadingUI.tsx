import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';

export default function RecomedacionesUI(){
    const lista = [];
    for(let i = 0; i<6; i++){
        lista.push(<Grid size={{ xs: 12, md: 6}}>
            <Skeleton height={75} variant="rectangular"/>
        </Grid>)
    }
    return <>{lista}</>;
}