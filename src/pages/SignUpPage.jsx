import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";




export default function SignUpPage() {
  const [name, setNome] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();
  

  function cadastro(e) {
    e.preventDefault();
    // se as senhas estão iguais ou nao 
    if (password != confirmarSenha) {
      return alert("Senhas informadas estão divergentes!");
    }
    // const url = `http://localhost:5000/cadastro`;
    // para quando tiver o deploy 
    const url = `${import.meta.env.VITE_API_URL}/cadastro`

    const dados = {
      name: name,
      email: email,
      password: password
    }; 

    const promise = axios.post(url, dados)
    setDisabled(true);
    promise.then(resposta => navigate('/'));
    promise.catch(resposta => {
      alert(resposta.response.data);
      setDisabled(false);
    })
  }

  return (
    <SingUpContainer>
      <form onSubmit={cadastro}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" required value={name} onChange={(e) => setNome(e.target.value)} disabled={disabled} data-test="name" />
        <input placeholder="E-mail" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} data-test="email" />
        <input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={(e) => setSenha(e.target.value)} disabled={disabled} data-test="password" />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" required value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} disabled={disabled} data-test="conf-password" />
        <button type='submit' disabled={disabled} data-test="sing-up-submit">
          {disabled ? (
            <ThreeDots width={32} height={21} border-radius={4.5} background-color="#A328D6" color="#FFFFFF" font-size={9} />
          ) : (
            <p>Cadastrar</p>
          )}
        </button>
      </form>


      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
