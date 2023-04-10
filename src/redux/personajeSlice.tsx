import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Personaje } from "../types/personajeType";


/**
 * Funcion asincronica que obtiene los personajes de la API.
 * @function
 * @async
 * @name getPersonajes
 * @param {string} name - Nombre del personaje a buscar.
 * @returns {Promise<Personaje[]>} - Lista de objetos Personaje.
 * @throws {Error} - Si la respuesta de la API no es exitosa.
 */

export const getPersonajes = createAsyncThunk('personajes/getPersonajes', async (name?: string) => {
    const url = name ? `https://rickandmortyapi.com/api/character/?name=${name}` : 'https://rickandmortyapi.com/api/character'
    const response = await fetch(url);
    if (!response.ok){
        throw new Error('No se encontro tu busqueda')
    } 
    const data = await response.json();
    return data.results as Personaje[];
})


export interface PersonajeState {
    personajes: Personaje[]
    status: 'loading' | 'succeeded' | 'failed'
    error: string | null
    filtrados: Personaje[]
    busqueda: string
    favoritos: Personaje[]
}


const initialState: PersonajeState = {
    personajes: [],
    status: 'loading',
    error: null,
    filtrados: [],
    busqueda: '',
    favoritos: []
} as PersonajeState


// slice de personajes
export const personajeSlice = createSlice({
    name: "personajes",
    initialState,
    reducers: {
        setBusqueda: (state, action: PayloadAction<string>) => {
            state.busqueda = action.payload
        },
        setFavorito: (state, action: PayloadAction<number>) => {
            const personaje = state.personajes.find(p => p.id === action.payload)
            if (personaje) {
                personaje.esFavorito = !personaje.esFavorito
                if (personaje.esFavorito) {
                    state.favoritos.push(personaje)
                } else {
                    state.favoritos = state.favoritos.filter(p => p.id !== personaje.id)
                }
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getPersonajes.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        builder.addCase(getPersonajes.fulfilled, (state, action: PayloadAction<Personaje[]>) => {
            state.status = 'succeeded'
            state.personajes = action.payload
            // filtro
            if (state.busqueda !== ''){
                state.filtrados = state.personajes.filter((personaje) => 
                    personaje.name.toLowerCase().includes(state.busqueda.toLowerCase()))
            } else {
                state.filtrados = state.personajes
                // dudosa solucion del error // 
                state.error = ''
            }
        })
        builder.addCase(getPersonajes.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message ?? 'Error en la carga de personajes'
        })
    },
    
})


export const { setBusqueda, setFavorito } = personajeSlice.actions
export default personajeSlice.reducer


