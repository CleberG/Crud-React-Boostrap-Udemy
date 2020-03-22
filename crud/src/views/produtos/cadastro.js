import React from 'react'

import ProdutoService from '../../app/produtoService'
import { withRouter } from 'react-router-dom'

const estadoInicial = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    erros: []
}

class CadastroProduto extends React.Component {
    state = estadoInicial

    constructor() {
        super()
        this.service = new ProdutoService();
    }

    onChange = (event) => {
        const valor = event.target.value
        const nomeDoCampo = event.target.name
        this.setState({ [nomeDoCampo]: valor })
    }

    onSubmit = () => {
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }
        try {

            this.service.salvar(produto)
            this.limparCampos()
            this.setState({ sucesso: true })
        } catch (erro) {
            const erros = erro.erros
            this.setState({ erros: erros })
        }

    }

    limparCampos = () => {
        this.setState(estadoInicial)
    }

    componentDidMount() {
        const sku = this.props.match.params.sku

        if(sku){
            const resultado = this
                    .service
                    .ObterProdutos().filter(produto => produto.sku === sku)
            if(resultado.length === 1){
                const produtoEncontrado = resultado[0]
                this.setState({...produtoEncontrado})
            }
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    Cadastro de Produto
                </div>
                <div className="card-body">

                    {
                        this.state.sucesso &&
                        <div class="alert alert-dismissible alert-success">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Bem Feito!</strong> Cadastro Realizado com sucesso.
                        </div>

                    }
                    {
                        this.state.erros.length > 0 &&
                        this.state.erros.map(msg => {
                            return (
                                <div class="alert alert-dismissible alert-danger">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Ocorreu um Erro!</strong> {msg}
                                </div>
                            )
                        })
                    }


                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input type="text"
                                    name="nome"
                                    onChange={this.onChange}
                                    value={this.state.nome}
                                    className="form-control"></input>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input type="text"
                                    name="sku"
                                    onChange={this.onChange}
                                    value={this.state.sku}
                                    className="form-control"></input>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea name="descricao"
                                    onChange={this.onChange}
                                    value={this.state.descricao}
                                    className="form-control" />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input name="preco"
                                    onChange={this.onChange}
                                    type="text"
                                    value={this.state.preco}
                                    className="form-control"></input>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input name="fornecedor"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.fornecedor}
                                    className="form-control"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button onClick={this.onSubmit} className="btn btn-outline-success">Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button onClick={this.limparCampos} className="btn btn-outline-primary">Limpar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(CadastroProduto);