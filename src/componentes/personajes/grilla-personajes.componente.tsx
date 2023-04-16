import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { Personaje } from '../../types/personajeType';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PropTypes from 'prop-types';
interface Props {
  personajes: Personaje[]
  onClick: (id: number) => void
  favoritos: number[]
}

const GrillaPersonajes = ({ personajes, onClick, favoritos }: Props): JSX.Element => {

  const isLoading = useSelector((state: RootState) => state.personajes.status === 'loading');
  const error = useSelector((state: RootState) => state.personajes.error);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

    return (
      <div className="grilla-personajes">
        {personajes?.map((personaje) => (
          <TarjetaPersonaje personaje={personaje} key={personaje.id} onClick={() => onClick(personaje.id)}
          esFavorito={favoritos.some((favorito) => favorito === personaje.id)} />
        ))}
      </div>
    );
}

export default GrillaPersonajes;

GrillaPersonajes.propTypes = {
  personajes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  favoritos: PropTypes.arrayOf(PropTypes.number).isRequired,
};

