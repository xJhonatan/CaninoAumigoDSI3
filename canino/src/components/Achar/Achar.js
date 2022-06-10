import './Achar.css';
import React, {Component} from 'react';
import { useState } from 'react';
import axios from 'axios';
const urlAPI = "https://localhost:7042/api/animalPerdido";
const initialState = {
  animalPerdido: { nome: '', telefone:'', email: '', complemeto: '', imagem: '', idCidade: 0 },
  lista: []
}
export default class Adotar extends Component {
  state = { ...initialState } 
  componentDidMount() {
    axios("https://localhost:7042/api/cidade")
            .then(resp => {
                const cidades = resp.data

                axios(urlAPI).then(resp => {
                    const animaisPerdidos = []

                    resp.data.map(animalPerdido => {
                        const cidade = cidades.filter(c => c.idCidade === animalPerdido.idCidade)[0]

                        animaisPerdidos.push({ ...animalPerdido, cidade })
                    })

                    this.setState({ lista: animaisPerdidos })
                })
            })
}
getListaAtualizada(animalPerdido, add = true) {
    const lista = this.state.lista.filter(a => a.id !== animalPerdido.id);
    if (add) lista.unshift(animalPerdido);
    return lista;
}
carregar(animalPerdido){
    this.setState({ animalPerdido });
}
render(){
  return (
    <div className="content">
                <main className="mainAchar">
                    <div>
    
                        <h2>Aqui estão todos os nossos aumigos perdidos!</h2>
                        
                        <div className="animalAlinhado">
                        {this.state.lista.map((animalPerdido) =>
                        <div className="cartao">
                        <img src={animalPerdido.imagem} alt="imagem do animalPerdido"  className="imgAnimal"></img>
                        <div id="container">
                        <a href={`/animal/${animalPerdido.idAnimal}`}>
                                <p>
                                    {animalPerdido.nome}
                                </p>
                            </a>

                            <p>
                                {animalPerdido.cidade.nome}
                            </p>
                        </div>
                    </div>
                        )}
                        </div>
                        
                    </div>
                </main>
            </div>
  )
}
}