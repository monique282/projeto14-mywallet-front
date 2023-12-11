import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { AuthContext } from "./Contex";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {

  const { auth, setAuth } = useContext(AuthContext);
  const [lista, setLista] = useState([]);
  const [somaTotal, setSomaTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      return
    }

    const url = `${import.meta.env.VITE_API_URL}/home`
    const confi = {
      headers: {
        Authorization: `Bearer ${auth?.token}`
      }
    };
    const promise = axios.get(url, confi);
    promise.then(resposta => {
      // isso serve pra trocar os valores que eu recebo do servidor fazendo um array novo do jeito que eu preciso
      const listaPronta = resposta.data.map(item => ({
        ...item,
        // aqui ele chama a função que vai trocar para numero flutuante
        value: converterParaNumeroFlutuante(item.value)
      }));
      setLista(listaPronta);

    })
      .catch(resposta => {
        alert(resposta.response.data);
      });

    // essa função converte converter uma string para numero flutuante
    function converterParaNumeroFlutuante(value) {
      const numeroAindaString = value.replace(',', '.'); // traca a , por .
      const numeroFlutuante = parseFloat(numeroAindaString); // passa para numero flutuante
      return numeroFlutuante.toFixed(2); // aqui eu falo quantas casas decimais eu quero
    }

  }, [auth]);

  useEffect(() => {
    total();
  }, [lista]);

  function total() {
    // isso serve pra fazer o calculo final do total 

    let soma = 0;
    lista.forEach(item => {
      if (item.type === "saida") {
        soma -= parseFloat(item.value);
      } else if (item.type === "entrada") {
        soma += parseFloat(item.value);
      }
    });
    const somaFormatada = soma.toFixed(2);
    setSomaTotal(somaFormatada);
  }

  // essa parte vai ficar para deslogar a pessoa

  function Logout() {

    const url = `${import.meta.env.VITE_API_URL}/home`
    const confi = {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    };

    const promise = axios.delete(url, confi);
    promise.then(resposta => {
      // apagar o local storage
      localStorage.clear();

      // mandar pra tela de login
      navigate("/");

    })
      .catch(resposta => {
        alert(resposta.response.data);
      });
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {auth && auth.nome}</h1>
        <Deslogar onClick={Logout} data-test="logout">
          <BiExit />
        </Deslogar>
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
              <Separar >
                {lista.map(lista => (
                  <ListItemContainer key={lista._id}>
                    <div >
                      <span>{lista.data}</span>
                      <strong data-test="registry-name">{lista.description}</strong>
                    </div>
                    {lista.type === "entrada" && (
                      <Value data-test="registry-amount" color={"positivo"} >{lista.value}</Value>)}
                    {lista.type === "saida" && (
                      <Value data-test="registry-amount" color={"saida"}  >{lista.value}</Value>)}
                  </ListItemContainer>))
                }
              </Separar>
              <article>
                <strong>Saldo</strong>
                {somaTotal > 0 && (
                  <Value color={"positivo"} data-test="total-amount">{somaTotal}</Value>
                )}
                {somaTotal < 0 && (
                  <Value color={"saida"} data-test="total-amount">{somaTotal}</Value>
                )}
              </article>
            </>
          )}
        </ul>
      </TransactionsContainer>

      <ButtonsContainer>
        <Link to={"/nova-transacao/entrada"}>
          <button data-test="new-income" >
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to={"/nova-transacao/saida"}>
          <button data-test="new-expense" >
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>

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
  overflow-y: auto;
  position: relative;

  article {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 32px;
    min-width: 345px;
    width: calc(100% - 25px );
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    z-index: 10;  
    background-color: #fff; 
  
    flex-grow: 1;
   
   
    
    strong {
      font-weight: 700;
      text-transform: uppercase;
      margin-right: 200px;
      margin-left: 10px;
      
   
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  a{
    width: 100%;
  }

  button {
    width: 100%;
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
const Deslogar = styled.button`
  width: 23px;
  height: 24px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  


`
const Separar = styled.div`
  margin-bottom: 20px; 
`