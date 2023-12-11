import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { AuthContext } from "./Contex";


export default function SignInPage() {

  const {setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    const dados = {
      email: email,
      password: password
    }
    const url = `${import.meta.env.VITE_API_URL}/`
    console.log(dados)
    const promise = axios.post(url, dados);
    setDisabled(true);
    promise.then(resposta => {
      console.log(dados)
      localStorage.setItem("user", JSON.stringify({email, token: resposta.data.token, name: resposta.data.name}));
      setAuth({email, token: resposta.data.token, name: resposta.data.name})
      navigate("/home");

    });
    promise.catch(resposta => {
      alert(resposta.response.data);
      console.log(resposta)
      setDisabled(false);
    });
  }


  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} data-test="email" />
        <input placeholder="Password" type="password" autoComplete="new-password" required value={password} onChange={(e) => setSenha(e.target.value)} disabled={disabled} data-test="password" />
        <button type='submit' disabled={disabled} data-test="sign-in-submit">
          {disabled ? (
            <ThreeDots width={32} height={21} border-radius={4.5} background-color="#A328D6" color="#FFFFFF" font-size={9} />
          ) : (
            <p>Entrar</p>
          )}
        </button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`
