import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import { Personaje } from '../../types/personajeType';
import PropTypes from 'prop-types';

interface Props {
    personaje: Personaje
    onClick: () => void
    esFavorito: boolean
}

const TarjetaPersonaje  = ({ personaje, onClick, esFavorito }: Props): JSX.Element => {

    return (
        <div className="tarjeta-personaje">
            <img src={personaje.image} alt={personaje.name}/>
            <div className="tarjeta-personaje-body">
                <span>{personaje.name}</span>
                <BotonFavorito esFavorito={esFavorito} onClick={onClick}/>
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