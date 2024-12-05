import axios from 'axios';

const API_URL = 'http://localhost:8080/api/usuarios';

const UsuarioService = {
    criarUsuario: async (usuario) => {
        try {
            const response = await axios.post(API_URL, usuario);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    },

    listarUsuarios: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            throw error;
        }
    }
};

export default UsuarioService;