import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import PaginaInicio from "./paginas/Inicio.pagina";
import PaginaFavoritos from "./paginas/Favoritos.pagina";
import PaginaDetalle from "./paginas/Detalle.pagina";
import Encabezado from "./componentes/layout/encabezado.componente";
import { Provider } from 'react-redux';
import store from './redux/store';

function App(): JSX.Element {
  return (
    <div className="App">
      <Provider store={store}>
        <Encabezado />
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="favoritos" element={<PaginaFavoritos />} />
          <Route path="detalle" element={<PaginaDetalle />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
