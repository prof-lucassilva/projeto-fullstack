// Importa React para criação de componentes e elementos.
import React from 'react';
// Importa componentes e funções do React Router para gerenciar navegação e rotas.
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// Importa os componentes para cadastro de usuários e exibição da lista de usuários.
import CadastroUsuario from './components/CadastroUsuario';
import ListaUsuarios from './components/ListaUsuarios';
// Importa os estilos específicos da aplicação.
import './App.css';


// Componente principal da aplicação.
function App() {
    return (
        // Define um contexto de roteamento para a aplicação.
        <BrowserRouter>
            {/* Container principal da aplicação */}
            <div className="app-container">
                <div className="main-content">
                    {/* Configura as rotas da aplicação */}
                    <Routes>
                        {/* Define a rota inicial ("/") */}
                        <Route path="/" element={
                            <div className="welcome-container">
                                {/* Título de boas-vindas */}
                                <h1 className="welcome-title">Bem-vindo ao Sistema</h1>
                                {/* Texto explicativo */}
                                <p className="welcome-text">Selecione uma opção para continuar</p>
                                {/* Botões de navegação */}
                                <div className="nav-buttons">
                                    {/* Link para a página de cadastro */}
                                    <Link to="/cadastro" className="nav-button primary-button">
                                        Cadastro
                                    </Link>
                                    {/* Link para a página da lista de usuários */}
                                    <Link to="/usuarios" className="nav-button primary-button">
                                        Lista de Usuários
                                    </Link>
                                </div>
                            </div>
                        } />
                        {/* Define a rota para a página de cadastro */}
                        <Route path="/cadastro" element={<CadastroUsuario />} />
                        {/* Define a rota para a página de lista de usuários */}
                        <Route path="/usuarios" element={<ListaUsuarios />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

// Exporta o componente principal para uso em outras partes da aplicação.
export default App;