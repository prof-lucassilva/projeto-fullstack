import React, { useState } from 'react';
import UsuarioService from '../services/UsuarioService';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/CadastroUsuario.css';


function CadastroUsuario() {
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UsuarioService.criarUsuario(usuario);
            alert('Usuário cadastrado com sucesso!');
            setUsuario({ nome: '', email: '', senha: '' });
        } catch (error) {
            alert('Erro no cadastro');
        }
    };

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
                            name="nome" 
                            value={usuario.nome}
                            onChange={handleChange}
                            required
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