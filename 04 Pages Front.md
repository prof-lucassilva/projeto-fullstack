---
pinned: true
title: Pages Front
created: '2024-12-03T22:26:07.851Z'
modified: '2024-12-04T22:17:10.368Z'
---

# Pages Front

## Configurar Serviço de API (frontend)
### src/services/UsuarioService.jsx

```js
// Importa a biblioteca Axios, que é utilizada para facilitar as requisições HTTP.
import axios from 'axios';

// Define a URL base da API para centralizar o endpoint usado nas requisições.
const API_URL = 'http://localhost:8080/api/usuarios';

// Serviço que encapsula métodos para interagir com a API de usuários.
const UsuarioService = {
    // Método para criar um novo usuário.
    criarUsuario: async (usuario) => {
        try {
            // Utiliza o método POST do Axios para enviar dados para o servidor.
            // Aqui, os dados do objeto `usuario` são enviados ao endpoint definido.
            const response = await axios.post(API_URL, usuario);
            // Retorna apenas os dados da resposta, já que o Axios encapsula toda a resposta HTTP.
            return response.data;
        } catch (error) {
            // O `console.error` é usado para registrar o erro no console, ajudando no debug.
            console.error('Erro ao criar usuário', error);
            // O erro é lançado novamente para que quem chamou o método possa tratá-lo.
            throw error;
        }
    },

    // Método para buscar todos os usuários cadastrados.
    listarUsuarios: async () => {
        try {
            // Utiliza o método GET do Axios para buscar dados do servidor.
            // Aqui, o objetivo é obter a lista de todos os usuários da API.
            const response = await axios.get(API_URL);
            // Retorna apenas os dados da resposta, que no caso é a lista de usuários.
            return response.data;
        } catch (error) {
            // Registra o erro no console para diagnóstico.
            console.error('Erro ao listar usuários', error);
            // Relança o erro para permitir tratamento em outro lugar.
            throw error;
        }
    }
};

export default UsuarioService;
```
1. `axios.post`:
    - Usado para enviar dados ao servidor, especificamente para criar novos registros (no caso, um novo usuário).
    - Método ideal para operações de escrita, como criar ou atualizar recursos.

2. `axios.get`:
    - Usado para buscar dados do servidor. Aqui, ele recupera todos os usuários cadastrados.
    - Método ideal para operações de leitura, onde o objetivo é obter informações do servidor.

3. `async/await`:
    - Facilita o trabalho com código assíncrono, garantindo que o programa espere a conclusão das requisições antes de continuar.
    - Torna o código mais legível do que usar promessas com .then().

4. `try/catch`:
    - Utilizado para capturar erros que podem ocorrer durante as requisições, como falhas de rede ou problemas no servidor.
    - Garante que o erro seja tratado e registrado no console para facilitar o debug.

5. `console.error`:
    - Ajuda a registrar mensagens de erro no console, permitindo identificar problemas rapidamente durante o desenvolvimento.

6. `throw error`:
    - Relança o erro capturado no catch, permitindo que ele seja tratado em outro ponto do código, caso necessário.

<hr>

## No index.html inserir o CDN do Bootstrap:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
```
<hr>

## Componente de Cadastro
### src/components/CadastroUsuario.jsx

```js
// Importa o React e o hook useState para gerenciar o estado do componente.
import React, { useState } from 'react';
// Importa o serviço de usuários para realizar chamadas à API.
import UsuarioService from '../services/UsuarioService';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react'; // npm install lucide-react
import { Link } from 'react-router-dom';
import '../styles/CadastroUsuario.css';

// Componente de cadastro de usuário.
function CadastroUsuario() {
    // Define o estado inicial do formulário com campos nome, email e senha.
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    // Função para lidar com mudanças nos campos do formulário.
    const handleChange = (e) => {
        // Extrai o nome do campo e o valor inserido pelo usuário.
        const { name, value } = e.target;
        // Atualiza o estado do formulário sem sobrescrever os outros campos.
        setUsuario(prevState => ({
            ...prevState, // Mantém os campos anteriores.
            [name]: value // Atualiza o campo correspondente.
        }));
    };

    // Função para lidar com o envio do formulário.
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página.
        try {
            // Chama o método de criar usuário no serviço, passando os dados do formulário.
            await UsuarioService.criarUsuario(usuario);
            // Exibe um alerta de sucesso.
            alert('Usuário cadastrado com sucesso!');
            // Reseta o estado do formulário para os valores iniciais.
            setUsuario({ nome: '', email: '', senha: '' });
        } catch (error) {
            // Exibe um alerta em caso de erro na operação.
            alert('Erro no cadastro');
        }
    };

    // Retorna o JSX que define a interface de cadastro.
    return (
        <div className="cadastro-container">
            <div className="cadastro-card">
                <Link to="/" className="voltar-link">
                    <ArrowLeft size={20} />
                    Voltar
                </Link>
                
                <h2 className="cadastro-titulo">Criar Conta</h2>
                <p className="cadastro-subtitulo">Preencha os dados para se cadastrar</p>

                <form onSubmit={handleSubmit} className="cadastro-form">
                    <div className="input-group">
                        <User size={20} className="input-icon" />
                        <input
                            type="text"
                            placeholder="Nome completo"
                            name="nome" // Nome do campo, usado no handleChange.
                            value={usuario.nome} // Valor do campo no estado.
                            onChange={handleChange} // Chama handleChange ao digitar.
                            required // Torna o campo obrigatório.
                        />
                    </div>

                    <div className="input-group">
                        <Mail size={20} className="input-icon" />
                        <input
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            value={usuario.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock size={20} className="input-icon" />
                        <input
                            type="password"
                            placeholder="Senha"
                            name="senha"
                            value={usuario.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="cadastro-button">
                        Criar conta
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CadastroUsuario;
```
1. `useState`:
    - Gerencia o estado do formulário, permitindo que os valores dos campos sejam monitorados e atualizados.

2. `handleChange`:
    - Atualiza dinamicamente o estado do campo correspondente com base no nome (name) do campo, garantindo que cada input seja controlado.

3. `handleSubmit`:
    - Processa os dados quando o formulário é enviado:
      - Previne a recarga da página.
      - Envia os dados para a API usando o serviço.
      - Lida com sucesso ou erro, informando o usuário.

4. Estrutura do formulário:
    - Cada campo é controlado pelo estado (value) e atualizado pelo evento onChange, garantindo que o estado e a interface estejam sincronizados.

5. `alert`:
    - Fornece um feedback simples e direto ao usuário sobre o sucesso ou falha na operação.

<hr>

## Componente de Lista Usuários
### src/components/ListaUsuarios.jsx

```js
// Importa React e os hooks useState e useEffect para gerenciar estado e efeitos colaterais.
import React, { useState, useEffect } from 'react';
// Importa o serviço de usuário para realizar operações relacionadas à API.
import UsuarioService from '../services/UsuarioService';
// Importa o componente Link para navegação entre rotas.
import { Link } from 'react-router-dom';
// Importa ícones da biblioteca lucide-react para melhorar a interface.
import { Users, Search, ArrowLeft } from 'lucide-react';
// Importa os estilos específicos da lista de usuários.
import '../styles/ListaUsuarios.css';

// Componente funcional para exibir a lista de usuários cadastrados.
function ListaUsuarios() {
    // Estado para armazenar os usuários retornados da API.
    const [usuarios, setUsuarios] = useState([]);
    // Estado para armazenar o texto digitado no campo de busca.
    const [busca, setBusca] = useState('');
    // Estado para indicar se os dados ainda estão sendo carregados.
    const [loading, setLoading] = useState(true);

    // useEffect é usado para carregar os dados da API assim que o componente é montado.
    useEffect(() => {
        carregarUsuarios();
    }, []); // O array vazio indica que o efeito será executado apenas uma vez.

    // Função assíncrona para buscar os usuários da API.
    const carregarUsuarios = async () => {
        try {
            const data = await UsuarioService.listarUsuarios(); // Obtém os usuários da API.
            setUsuarios(data); // Atualiza o estado com os usuários recebidos.
            setLoading(false); // Define o estado de carregamento como concluído.
        } catch (error) {
            console.error('Erro ao carregar usuários:', error); // Exibe erros no console.
            setLoading(false); // Define o estado de carregamento como concluído, mesmo com erro.
        }
    };

    // Filtra os usuários com base no texto digitado no campo de busca.
    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.nome?.toLowerCase().includes(busca.toLowerCase()) || // Busca pelo nome.
        usuario.email?.toLowerCase().includes(busca.toLowerCase()) // Busca pelo e-mail.
    );

    // Renderiza a interface do componente.
    return (
        <div className="lista-container">
            {/* Container principal da lista */}
            <div className="lista-card">
                {/* Link para voltar à página anterior */}
                <Link to="/" className="voltar-link">
                    <ArrowLeft size={20} /> {/* Ícone de seta para voltar */}
                    Voltar
                </Link>

                {/* Cabeçalho da lista */}
                <div className="lista-header">
                    {/* Título do grupo */}
                    <div className="titulo-grupo">
                        <Users size={24} className="titulo-icon" /> {/* Ícone de usuários */}
                        <h2 className="lista-titulo">Usuários Cadastrados</h2> {/* Título */}
                    </div>
                    
                    {/* Campo de busca */}
                    <div className="busca-container">
                        <Search size={20} className="busca-icon" /> {/* Ícone de busca */}
                        <input
                            type="text"
                            placeholder="Buscar usuários..." // Placeholder do campo.
                            value={busca} // Valor atual do campo de busca.
                            onChange={(e) => setBusca(e.target.value)} // Atualiza o estado da busca ao digitar.
                            className="busca-input" // Classe CSS para estilização.
                        />
                    </div>
                </div>

                {/* Exibe um carregando enquanto os dados estão sendo buscados */}
                {loading ? (
                    <div className="loading">Carregando...</div> // Mensagem de carregamento.
                ) : (
                    // Exibe os usuários filtrados em uma grade.
                    <div className="usuarios-grid">
                        {usuariosFiltrados.map(usuario => (
                            <div key={usuario.id} className="usuario-card"> {/* Cada cartão de usuário */}
                                <div className="usuario-info">
                                    <h3 className="usuario-nome">{usuario.nome}</h3> {/* Nome do usuário */}
                                    <p className="usuario-email">{usuario.email}</p> {/* Email do usuário */}
                                </div>
                            </div>
                        ))}
                        {/* Caso nenhum usuário seja encontrado na busca */}
                        {usuariosFiltrados.length === 0 && (
                            <p className="sem-resultados">Nenhum usuário encontrado</p> // Mensagem de erro.
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Exporta o componente para ser usado em outras partes da aplicação.
export default ListaUsuarios;
```

1. `useState`:
    - Gerencia os estados locais do componente, como os usuários carregados, texto de busca e estado de carregamento.

2. `useEffect`:
    - Executa a função carregarUsuarios quando o componente é montado, para buscar os dados da API.

3. `carregarUsuarios`:
    - Chama a API para buscar os usuários e atualiza os estados usuarios e loading de acordo com o resultado.

4. `usuarios.filter`:
    - Filtra os usuários com base no texto digitado na busca, verificando se o nome ou e-mail contém a string digitada.

5. `map`:
    - Itera sobre os usuários filtrados para renderizar cada um em um cartão.

<hr>

## App.jsx

```js
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
```

1. `BrowserRouter`:
    - Componente de mais alto nível para ativar o sistema de roteamento baseado em histórico do React Router.
    - Envolve toda a aplicação para garantir que as rotas possam ser usadas.

2. `Routes`:
    - Contém todas as definições de rotas da aplicação.

3. `Route`:
    - Define uma rota específica e qual componente ou elemento deve ser renderizado ao acessá-la.
    - Exemplo:
      - `path="/"`: Rota inicial que exibe a tela de boas-vindas.
      - `element={<CadastroUsuario />}`: Rota que renderiza o componente CadastroUsuario.
4. `Link`:
    - Cria links de navegação para diferentes rotas sem recarregar a página.
    - Exemplo: `to="/cadastro"` navega para a rota de cadastro.

### **Como o fluxo funciona**

1. Quando o usuário acessa a rota `/`, a tela de boas-vindas é renderizada.
2. Na tela de boas-vindas, os botões **"Cadastro"** e **"Lista de Usuários"** levam o usuário para suas respectivas rotas.
3. As rotas `/cadastro` e `/usuarios` carregam os componentes `CadastroUsuario` e `ListaUsuarios`, respectivamente, permitindo a interação com funcionalidades específicas.


