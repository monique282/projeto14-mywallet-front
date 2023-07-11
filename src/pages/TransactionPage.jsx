import { useState } from "react";
import styled from "styled-components"
import { AuthContext } from "./Contex";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function TransactionsPage() {

  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState('');
  const { auth } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { tipo } = useParams()

  function Criar(e) {

    e.preventDefault();
    setValor(parseFloat(valor).toFixed(1));
    
    const dados = {
      valor: valor,
      descricao: descricao,
      tipo: `${tipo}`,
      email: auth.email
    };

    const url = `${import.meta.env.VITE_API_URL}/nova-transacao/:${tipo}`
    const confi = {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    };
    const promise = axios.post(url, dados, confi);
    promise.then(resposta => {
      setValor('');
      setDescricao('');
      setDisabled(true)
      navigate("/home");

    });
    promise.catch(resposta => {
      alert(resposta.response.data),
        setValor('');
      setDescricao('');
    });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={Criar}>
        <input data-test="registry-amount-input" placeholder="Valor" type="number" required value={valor} onChange={(e) => setValor(e.target.value)} disabled={disabled}  />
        <input data-test="registry-name-input" placeholder="Descrição" type="text" required value={descricao} onChange={(e) => setDescricao(e.target.value)} disabled={disabled}  />
        <button data-test="registry-save">Salvar {tipo}</button>
      </form >
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
