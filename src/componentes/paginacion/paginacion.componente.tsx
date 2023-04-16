import { MouseEventHandler } from 'react';
import './paginacion.css';

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */

interface Props {
    anterior: MouseEventHandler<HTMLButtonElement>
    siguiente: MouseEventHandler<HTMLButtonElement>
}
const Paginacion = ( {anterior, siguiente}: Props): JSX.Element => {

    return <div className="paginacion">
        <button disabled={false} onClick={anterior} className={"primary"}>Anterior</button>
        <button disabled={false} onClick={siguiente} className={"primary"}>Siguiente</button>
    </div>
}

export default Paginacion;