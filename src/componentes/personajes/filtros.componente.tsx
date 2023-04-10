import './filtros.css';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import {useEffect, useState} from "react";
import { AppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { getPersonajes, setBusqueda } from '../../redux/personajeSlice';
import PropTypes from 'prop-types';

const Filtros = (): JSX.Element => {
    const [filtro, setFiltro] = useState("")
    const dispatch = useDispatch<AppDispatch>()
    const busqueda = useSelector((state: RootState) => state.personajes.busqueda)

    /**
     * Función que actualiza el estado del filtro y llama a la acción setBusqueda de Redux
     * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio de entrada de texto del usuario
     * @return {void}
     */
    const handleFiltro = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value)
        dispatch(setBusqueda(event.target.value))
    }

    /**
     * Función que reinicia el estado del filtro y llama a la acción setBusqueda de Redux para borrarla
     * @return {void}
     */
    const handleReset = () => {
        setFiltro('')
        dispatch(setBusqueda(''))
    }

    useEffect(() => {
        dispatch(getPersonajes(busqueda));
    }, [dispatch, busqueda]);

    return(
        <div className="filtros">
        <label htmlFor="nombre">Filtrar por nombre:</label>
        <div className="filtros-container">
            <input type="text" placeholder="Rick, Morty, Beth, Alien, ...etc" name="nombre" value={filtro}
            onChange={handleFiltro} />
            <button className="danger" onClick={handleReset}>Limpiar filtros</button>
        </div>
        </div>
    )  
}

export default Filtros;

Filtros.propTypes = {
    filtro: PropTypes.string,
    handleFiltro: PropTypes.func,
    handleReset: PropTypes.func,
};