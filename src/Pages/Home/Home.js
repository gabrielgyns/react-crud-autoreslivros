import React, {Component, Fragment}  from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';

import Header from './../../Components/Header/Header';
import Tabela from '../../Components/Tabela/Tabela';
import Form from './../../Components/Formulario/Formulario';
import {PopUp} from '../../utils/PopUp';
import {ApiService} from '../../utils/ApiService';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      autores: [],
    };
  }
  
  removeAutor = id =>{
    const { autores } = this.state;
  
    const autoresAtualizado = autores.filter(autor =>{
      return autor.id !== id
    });
  
    ApiService.RemoveAutor(id)
      .then(res => {
          if(res.message === 'deleted') {
            this.setState({autores: [...autoresAtualizado]});
            PopUp.exibeMensagem('success', "Autor removido com sucesso");
          }
      }).catch(err => PopUp.exibeMensagem('error', "Erro na comunicação com a API ao tentar remover o autor!"));
  }

  escutadorDeSubmit = autor => {
    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => {
        if(res.message === 'success'){
          this.setState({autores:[...this.state.autores, res.data]});
          PopUp.exibeMensagem('success', "Autor incluído com sucesso!");
        }
      }).catch(err => PopUp.exibeMensagem('error', "Erro na comunicação com a API ao tentar incluir autor!"));
  }

  componentDidMount(){
    ApiService.ListaAutores()
      .then(res => {
        if(res.message === 'success'){
          this.setState({autores: [...this.state.autores, ...res.data]})
        }
      }).catch(err => PopUp.exibeMensagem('error', "Erro na comunicação com a API ao tentar restaurar autores!"));
  }

  render(){
    return (
      <Fragment>
        <Header />
        <br />
        <div className="container">
          <h1>CW Livros</h1>
          <Form escutadorDeSubmit={this.escutadorDeSubmit} />
          <br />
          <Tabela autores={this.state.autores} removeAutor={this.removeAutor} />
        </div>
      </Fragment>
    );
  }
}

export default App;
