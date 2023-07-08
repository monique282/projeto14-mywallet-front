import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import AuthProvider from "./pages/Contex";
import TransactionsPageEntrada from "./pages/TransactionPageEntrada";
import TransactionsPageSaida from "./pages/TransactionPageSaida";

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-transacao/entrada" element={<TransactionsPageEntrada />} />
          <Route path="/nova-transacao/saida" element={<TransactionsPageSaida />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
