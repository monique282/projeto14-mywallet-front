import { useState } from "react";
import styled from "styled-components"
import { AuthContext } from "./Contex";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function TransactionsPageSaida() {

  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const { token } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();


  function Criar(e) {
    e.preventDefault();

    if (valor.trim() === '') {
      alert('O campo não foi preenchido. Por favor, insira um valor.');
      return;
    }
    if (descricao.trim() === '') {
      alert('O campo não foi preenchido. Por favor, insira uma descrição.');
      return;
    }

    const dados = {
      valor: valor,
      descricao: descricao,
      tipo: "saida"
    };
    console.log(" nao autorizado")
    const url = `${import.meta.env.VITE_API_URL}/home`
    const confi = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    console.log("autorizado")
    const promise = axios.post(url, dados, confi);
    promise.then(resposta => {
      console.log("ate aqui")
      setValor('');
      setDescricao('');
      console.log(resposta)
      console.log("deu certo")
      setDisabled(true)
      navigate("/home");

    });
    promise.catch(resposta => {
      alert(resposta.response.data.message),
        setValor('');
      setDescricao('');
    });
    
  }


  return (
    <TransactionsContainer>
      <h1>Nova saida</h1>
      <form>
        <input placeholder="Valor" type="text" required value={valor} onChange={(e) => setValor(e.target.value)} disabled={disabled} data-test="" />
        <input placeholder="Descrição" type="text" required value={descricao} onChange={(e) => setDescricao(e.target.value)} disabled={disabled} data-test="" />
        <button onClick={() => Criar()}>Salvar entrada</button>
      </form>
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
