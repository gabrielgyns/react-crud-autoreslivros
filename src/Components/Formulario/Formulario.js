import React, {Component} from 'react';
import FormValidator from './../../utils/FormValidator';
import {PopUp} from './../../utils/PopUp';

export default class Formulario extends Component {

    constructor(props) {
        super(props);

        this.validador = new FormValidator([
            {
                campo: 'nome',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'O campo nome é obrigatório!'
            },
            {
                campo: 'livro',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'O campo livro é obrigatório!'
            },
            {
                campo: 'preco',
                metodo: 'isInt',
                args: [{
                    min: 0,
                    max: 9999
                }],
                validoQuando: true,
                mensagem: 'O campo preço é obrigatório!'
            },
        ]);

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validacao: this.validador.valido(),
        }

        this.state = this.stateInicial; 

    }

    escutadorDeInput = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    submitForm = () => {
        const validacao = this.validador.valida(this.state);

        if (validacao.isValid) {
            this.props.escutadorDeSubmit(this.state);
            this.setState(this.stateInicial);
        } else {
            const {nome, livro, preco} = validacao;
            const campos = [nome, livro, preco];

            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid;
            });

            camposInvalidos.forEach(campo => {
                PopUp.exibeMensagem('error', campo.message);
            });
        }
    }

    render(){

        const {nome, livro, preco} = this.state;

        return(
            <form>
                <div className="row">
                    <div className="input-field col s4" >
                        <label htmlFor="nome">Nome</label>
                        <input
                            className="validate"
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={this.escutadorDeInput} />
                    </div>
                    <div className="input-field col s4" >
                        <label htmlFor="livro">Livro</label>
                        <input
                            className="validate"
                            id="livro"
                            type="text"
                            name="livro"
                            value={livro}
                            onChange={this.escutadorDeInput} /> 
                    </div>
                    <div className="input-field col s4" >
                        <label htmlFor="preco">Preço</label>
                        <input
                            className="validate"
                            id="preco"
                            type="number"
                            name="preco"
                            value={preco}
                            onChange={this.escutadorDeInput} />
                    </div>
                    
                    <button 
                        type="button"
                        onClick={this.submitForm} 
                        className="waves-effect waves-light btn indigo" > 
                        <i className="material-icons right">send</i> 
                        Salvar
                    </button>
                    
                </div>
            </form>
        );
    }

}
