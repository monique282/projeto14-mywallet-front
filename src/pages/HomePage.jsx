import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { AuthContext } from "./Contex";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {

  const { nome, token } = useContext(AuthContext);
  const [lista, setLista] = useState([])



  useEffect(() => {

    const url = `${import.meta.env.VITE_API_URL}/home`
    const confi = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const promise = axios.get(url, confi);
    promise.then(resposta => {
      setLista(resposta.data);
      
    });
    promise.catch(resposta => {
      alert(resposta.response.data.message)

    });
  }, [])



  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {nome}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {lista.length === 0 && (
            <Vazio>
              Não há registros de entrada ou saída
            </Vazio>
          )}
          {lista.length !== 0 && (
            <>
              <ListItemContainer>
                <div>
                  <span>30/11</span>
                  <strong>Almoço mãe</strong>
                </div>
                <Value color={"negativo"}>120,00</Value>
              </ListItemContainer>

              <ListItemContainer>
                <div>
                  <span>15/11</span>
                  <strong>Salário</strong>
                </div>
                <Value color={"positivo"}>3000,00</Value>
              </ListItemContainer>
              <article>
                <strong>Saldo</strong>
                <Value color={"positivo"}>2880,00</Value>
              </article>
            </>
          )}
        </ul>
      </TransactionsContainer>

      <ButtonsContainer>
        <button>
          <Link to={"/nova-transacao/entrada"}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
          </Link>
        </button>
        <button>
        <Link to={"/nova-transacao/saida"}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
          </Link>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
const Vazio = styled.p`
  position: fixed;
  width: 180px;
  height: 46px;
  top: 278px;
  left: 98px;
  font-family: 'Raleway';
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

`
