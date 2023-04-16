import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getPersonajes, getPersonajesFiltrados, setAnterior, setFavorito, setSiguiente } from "../redux/personajeSlice";
 
/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */
const PaginaInicio = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()
    const personajes = useSelector((state: RootState) => state.personajes.personajes);
    const name = useSelector((state: RootState) => state.personajes.name);
    const inputRef = useRef<HTMLInputElement>(null);
    const page = useSelector((state: RootState) => state.personajes.page);
    const favoritos = useSelector((state: RootState) => state.personajes.favoritos);

useEffect(() => {
    dispatch(getPersonajes(page))
    dispatch(getPersonajesFiltrados(name))
}, [page, dispatch, name])

const handleReset = (): void => {
    dispatch(getPersonajes(page))
    if (inputRef.current){
        inputRef.current.value = ''
    }
}

const anterior = (): void => {
    dispatch(setAnterior())
}
const siguiente = (): void => {
    dispatch(setSiguiente())
}

// favoritos
const setPersonajeFavorito = (id: number) => {
    const personajeId = favoritos.includes(id)
    const updatePersonajeId = personajeId ? favoritos.filter((favorito) => favorito !== id) : [...favoritos, id]
    dispatch(setFavorito(updatePersonajeId))
}

    return <div className="container">
        <div className="actions">
            <h3>Catálogo de Personajes</h3>
            <button className="danger" onClick={handleReset}>Limpiar filtros</button>
        </div>
        <Filtros input={inputRef}/>
        <Paginacion anterior={anterior} siguiente={siguiente} />
        <GrillaPersonajes personajes={personajes} onClick={setPersonajeFavorito} favoritos={favoritos} />
        <Paginacion anterior={anterior} siguiente={siguiente}/>
    </div>
}

export default PaginaInicio