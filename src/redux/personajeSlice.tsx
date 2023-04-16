import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Personaje } from "../types/personajeType";


/**
 * Funcion asincronica que obtiene los personajes de la API.
 * @function
 * @async
 * @name getPersonajes
 * @param {number} page - Numero de pagina.
 * @returns {Promise<Object>} - Una promesa que trae los datos recibidos de la api.
 * @throws {Error} - Si la respuesta de la API no es exitosa.
 */

export const getPersonajes = createAsyncThunk('personajes/getPersonajes', async (page: number) => {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`
    const response = await fetch(url);
    if (!response.ok){
        throw new Error('No pudimos cargar la informacion')
    } 
    const data = await response.json();
    return data;
})

/**
 * Funcion asincronica que filtra los personajes de la API.
 * @function
 * @async
 * @name getPersonajesFiltrados
 * @param {string} name - Nombre del personaje a filtrar.
 * @returns {Promise<Object>} - Una promesa que trae los datos recibidos de la api.
 * @throws {Error} - Si la respuesta de la API no es exitosa o no hay ningun match de personajes.
 */
export const getPersonajesFiltrados = createAsyncThunk('personajes/getPersonajesFiltrados', async (name: string) => {
    const url = `https://rickandmortyapi.com/api/character/?name=${name}`
    const response = await fetch(url)
    if(response.ok){
        const data = await response.json()
        return data
    } else {
        throw new Error('No se encontro tu personaje')
    }
})

export interface PersonajeState {
    personajes: Personaje[]
    status: 'loading' | 'succeeded' | 'failed'
    error: string | null
    name: string
    page: number
    favoritos: number[]
}


const initialState: PersonajeState = {
    personajes: [],
    status: 'loading',
    error: null,
    name: '',
    page: 1,
    favoritos: []
} as PersonajeState


// slice de personajes
export const personajeSlice = createSlice({
    name: "personajes",
    initialState,
    reducers: {
        setFavorito: (state, action) => {
            state.favoritos = action.payload
        },
        unsetFavoritos: (state) => {
            state.favoritos = []
        },
        setAnterior: (state) => {
            state.page -= 1
        },
        setSiguiente: (state) => {
            state.page += 1
        }
    },
    extraReducers: builder => {
        builder.addCase(getPersonajes.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        builder.addCase(getPersonajes.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.personajes = action.payload.results
        })
        builder.addCase(getPersonajes.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message ?? 'Error en la carga de personajes'
        })
        builder.addCase(getPersonajesFiltrados.pending, (state) => {
            state.status = 'loading'
            state.error = ''
        })
        builder.addCase(getPersonajesFiltrados.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.personajes = action.payload.results
        })
        builder.addCase(getPersonajesFiltrados.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message ?? 'Error en el filtro de personajes'
        })
    },
    
})


export const { setFavorito, unsetFavoritos, setAnterior, setSiguiente} = personajeSlice.actions
export default personajeSlice.reducer


