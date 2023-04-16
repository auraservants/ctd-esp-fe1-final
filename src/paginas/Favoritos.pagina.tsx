import { useDispatch, useSelector } from "react-redux";
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { AppDispatch, RootState } from "../redux/store";
import { setFavorito, unsetFavoritos } from "../redux/personajeSlice";


const PaginaFavoritos = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()
    const personajes = useSelector((state: RootState) => state.personajes.personajes);
    const favoritos = useSelector((state: RootState) => state.personajes.favoritos);

    /**
    Función que actualiza la lista de personajes favoritos
    @param {number} id - Id del personaje
    @returns {void}
    */
    const setPersonajeFavorito = (id: number) => {
        const personajeId = favoritos.includes(id)
        const updatePersonajeId = personajeId ? favoritos.filter((favorito) => favorito !== id) : [...favoritos, id]
        dispatch(setFavorito(updatePersonajeId))
    }

    const personajesFiltrados = personajes.filter(personajes => favoritos.includes(personajes.id))

    const unsetPersonajeFavorito = () => {
        dispatch(unsetFavoritos())
    }

    return <div className="container">
        <div className="actions">
            <h3>Personajes Favoritos</h3>
            <button className="danger" onClick={unsetPersonajeFavorito}>Eliminar todos</button>
        </div>
        {personajesFiltrados.length !== 0 ?
        <GrillaPersonajes personajes={personajesFiltrados} onClick={setPersonajeFavorito} favoritos={favoritos} />
        :
        <p>No hay personajes favoritos</p>
        }
        </div>
}

export default PaginaFavoritos
