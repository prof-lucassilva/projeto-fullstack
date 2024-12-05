import React, { useState, useEffect } from 'react';
import UsuarioService from '../services/UsuarioService';
import { Link } from 'react-router-dom';
import { Users, Search, ArrowLeft } from 'lucide-react';
import '../styles/ListaUsuarios.css';

function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [busca, setBusca] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        try {
            const data = await UsuarioService.listarUsuarios();
            setUsuarios(data);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            setLoading(false);
        }
    };

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.nome?.toLowerCase().includes(busca.toLowerCase()) ||
        usuario.email?.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="lista-container">
            <div className="lista-card">
                <Link to="/" className="voltar-link">
                    <ArrowLeft size={20} />
                    Voltar
                </Link>

                <div className="lista-header">
                    <div className="titulo-grupo">
                        <Users size={24} className="titulo-icon" />
                        <h2 className="lista-titulo">Usuários Cadastrados</h2>
                    </div>
                    
                    <div className="busca-container">
                        <Search size={20} className="busca-icon" />
                        <input
                            type="text"
                            placeholder="Buscar usuários..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="busca-input"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Carregando...</div>
                ) : (
                    <div className="usuarios-grid">
                        {usuariosFiltrados.map(usuario => (
                            <div key={usuario.id} className="usuario-card">
                                <div className="usuario-info">
                                    <h3 className="usuario-nome">{usuario.nome}</h3>
                                    <p className="usuario-email">{usuario.email}</p>
                                </div>
                            </div>
                        ))}
                        {usuariosFiltrados.length === 0 && (
                            <p className="sem-resultados">Nenhum usuário encontrado</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListaUsuarios; 