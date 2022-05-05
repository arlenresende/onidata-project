import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useLogin } from '../context/loginContext';
import Cadastro from '../pages/Cadastro';
import CadastroProduto from '../pages/CadastroProduto';
import DashBoard from '../pages/Dashboard';
import EditarProduto from '../pages/EditarProduto';
import { Login } from '../pages/Login';

const RouterMain: React.FC = () => {
  const { IsLogged } = useLogin();

  console.log(IsLogged());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/dashboard"
          element={IsLogged() ? <DashBoard /> : <Login />}
        />
        <Route
          path="/cadastro-produto"
          element={IsLogged() ? <CadastroProduto /> : <Login />}
        />
        <Route
          path="/editar-produto/:id"
          element={IsLogged() ? <EditarProduto /> : <Login />}
        />
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterMain;
