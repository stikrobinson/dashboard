const diasSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const mesesAnio = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export default function convertirFecha(fecha: string){
    if(!fecha){
        return "";
    }
    const soloFecha = new Date(fecha);
    const dia = diasSemana[soloFecha.getDay()];
    const mes = mesesAnio[soloFecha.getMonth()];
    const anio = soloFecha.getFullYear();
    const conversion = `${dia}, ${soloFecha.getDate()} de ${mes} de ${anio}`;
    return conversion;
}