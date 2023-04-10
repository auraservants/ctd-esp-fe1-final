import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { Personaje } from '../../types/personajeType';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PropTypes from 'prop-types';


interface Props {
  tipo: 'personajes' | 'favoritos';
}

const GrillaPersonajes = ({ tipo }: Props): JSX.Element => {

  /**
   * Selecciona los personajes del estado según el tipo.
   * @param {Object} state Estado de la app.
   * @param {string} state.personajes.personajes Lista de personajes.
   * @param {string} state.personajes.favoritos Lista de personajes favoritos.
   * @returns {Array} Lista de personajes seleccionados.
   */
  const personajes = useSelector((state: RootState) => {
    if (tipo === 'favoritos') {
      return state.personajes.favoritos;
    } else {
      return state.personajes.personajes;
    }
  });

  const isLoading = useSelector((state: RootState) => state.personajes.status === 'loading');
  const error = useSelector((state: RootState) => state.personajes.error);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (personajes.length === 0) {
    return <div>No se ha agregado ningun personaje a favoritos.</div>;
  }

    return (
      <div className="grilla-personajes">
        {personajes && personajes.map((personaje: Personaje) => (
          <TarjetaPersonaje personaje={personaje} key={personaje.id}  />
        ))}
      </div>
    );
}

export default GrillaPersonajes;

GrillaPersonajes.propTypes = {
  tipo: PropTypes.oneOf(['personajes', 'favoritos']).isRequired,
};