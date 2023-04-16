import './filtros.css';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import {FC, RefObject} from "react";
import { AppDispatch, RootState } from '../../redux/store';
import { getPersonajesFiltrados } from '../../redux/personajeSlice';
import PropTypes from 'prop-types';

interface Props {
    input: RefObject<HTMLInputElement>
}
const Filtros: FC<Props> = ( {input} ) => {
    const dispatch = useDispatch<AppDispatch>()

    return(
        <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
            <input type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre"
            onChange={(e) => dispatch((getPersonajesFiltrados(e.target.value)))} ref={input}/>
        </div>
    )  
}

export default Filtros;

Filtros.propTypes = {
    input: PropTypes.shape({
        current: PropTypes.instanceOf(HTMLInputElement).isRequired,
    }).isRequired,
};