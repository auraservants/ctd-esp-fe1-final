import { configureStore} from "@reduxjs/toolkit";
import personajeReducer from "./personajeSlice";


const store = configureStore({
    reducer: {
        personajes: personajeReducer
    },
});




// Tipamos el hook useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;