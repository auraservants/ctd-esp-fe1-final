import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";


const PaginaFavoritos = (): JSX.Element => {

    return <div className="container">
        <div className="actions">
            <h3>Personajes Favoritos</h3>
            <button className="danger">Test Button</button>
        </div>
        <GrillaPersonajes tipo="favoritos" />
        </div>
}

export default PaginaFavoritos