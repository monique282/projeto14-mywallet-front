import { useState } from "react";
import styled from "styled-components"
import { AuthContext } from "./Contex";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function TransactionsPageEntrada() {

  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const { token } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  console.log(token);
  function Criar(e) {
    
    console.log("00000000000000");
    e.preventDefault();

    console.log("1111111111111111");
    

    const dados = {
      valor: valor,
      descricao: descricao,
      tipo: "entrada"
    };
    console.log("22222222222222");
    const url = `${import.meta.env.VITE_API_URL}/home`
    console.log("33333333333333333");
    const confi = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    console.log("4");
    const promise = axios.post(url, dados, confi);
    promise.then(resposta => {
     
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
      <h1>Nova entrada</h1>
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
