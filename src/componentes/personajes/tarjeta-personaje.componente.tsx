import { useDispatch } from 'react-redux';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { setFavorito } from '../../redux/personajeSlice';
import { AppDispatch } from '../../redux/store';
import { Personaje } from '../../types/personajeType';
import PropTypes from 'prop-types';


interface Props {
    personaje: Personaje
}

const TarjetaPersonaje  = ({ personaje }: Props): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()

    // id: number
    const handleFavorito = () => {
        dispatch(setFavorito(personaje.id))
    }

    return (
        <div className="tarjeta-personaje">
            <img src={personaje.image} alt={personaje.name}/>
            <div className="tarjeta-personaje-body">
                <span>{personaje.name}</span>
                <BotonFavorito esFavorito={personaje.esFavorito} onClick={handleFavorito}/>
            </div>
    </div>
    )
}

export default TarjetaPersonaje;

TarjetaPersonaje.propTypes = {
    personaje: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        esFavorito: PropTypes.bool.isRequired
    }).isRequired
};