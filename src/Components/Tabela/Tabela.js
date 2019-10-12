import React, {Component} from 'react';

const TableHead = () => {
    return (
        <thead>
            <tr>
                <th>Autores</th>
                <th>Livros</th>
                <th>Preços</th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const linhas = props.autores.map((linha) => {
        return (
            <tr key={linha.id} >
                <td>{linha.nome}</td>
                <td>{linha.livro}</td>
                <td>R$ {linha.preco}</td>
                <td><button 
                    onClick={ () => {props.removeAutor(linha.id)} }
                    className="waves-effect waves-light btn indigo" >
                        Remover
                </button></td>
            </tr>
        );
    })

    return (
        <tbody>
            {linhas}
        </tbody>
    );
}

class Tabela extends Component{
    render(){

        const {autores, removeAutor} = this.props;

        return (
            <table className="highlight centered">
                <TableHead />
                <TableBody autores={autores} removeAutor={removeAutor} />
            </table>

        );
    }
}

export default Tabela;