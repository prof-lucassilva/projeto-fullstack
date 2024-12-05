---
title: Camadas do app
created: '2024-11-27T15:36:32.190Z'
modified: '2024-11-27T21:54:35.110Z'
---

# Camadas do app

### model > Usuario.java

```java
package com.storebooks.storebooks.model;

// Importação de bibliotecas necessárias.
import jakarta.persistence.*; // Pacote para anotações e manipulação de entidades do JPA.
import jakarta.validation.constraints.Email; // Validação para formato de email.
import jakarta.validation.constraints.NotBlank; // Validação para campos não vazios.
import lombok.Data; // Anotação do Lombok para gerar getters, setters e outros métodos comuns automaticamente.

@Data // Gera automaticamente getters, setters, equals, hashCode e toString.
@Entity // Indica que esta classe é uma entidade JPA e será mapeada para uma tabela no banco de dados.
@Table(name = "usuarios") // Define o nome da tabela no banco de dados como "usuarios".
public class Usuario {
    
    @Id // Indica que este campo é a chave primária da tabela.
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    // Define que o valor do ID será gerado automaticamente pelo banco de dados (estratégia de auto incremento).
    private Long id; // Identificador único para cada registro de usuário.

    @NotBlank(message = "Nome é obrigatório") 
    // Valida que o campo "nome" não pode ser vazio ou nulo, exibindo a mensagem personalizada caso a validação falhe.
    private String nome; // Campo que armazena o nome do usuário.

    @Email(message = "Email inválido") 
    // Valida que o valor segue o formato de email.
    @NotBlank(message = "Email é obrigatório") 
    // Valida que o campo "email" não pode ser vazio ou nulo.
    @Column(unique = true) 
    // Garante que o email seja único no banco de dados, evitando duplicações.
    private String email; // Campo que armazena o email do usuário.

    @NotBlank(message = "Senha é obrigatória") 
    // Valida que o campo "senha" não pode ser vazio ou nulo.
    private String senha; // Campo que armazena a senha do usuário.
}
```
1. Classe Usuario: Representa a entidade "Usuário", que será persistida em uma tabela do banco de dados chamada usuarios.

2. Validações:
    - @NotBlank: Garante que campos obrigatórios não sejam enviados vazios.
    - @Email: Valida o formato do email.

3. Configuração da tabela:
    - @Id e @GeneratedValue: Configuram o identificador único para cada registro, gerado automaticamente pelo banco.
    - @Column(unique = true): Define a coluna "email" como única no banco de dados.

4. Uso do Lombok:
    - A anotação @Data reduz o código manual gerando automaticamente métodos como getters e setters.

<hr>

### repository > UsuarioRepository.java

```java
package com.storebooks.storebooks.repository;

// Importação das classes necessárias.
import com.storebooks.storebooks.model.Usuario; // Modelo de dados que será manipulado pelo repositório.
import org.springframework.data.jpa.repository.JpaRepository; // Interface do Spring Data JPA para operações de banco de dados.
import org.springframework.stereotype.Repository; // Indica que esta interface é um repositório.

@Repository // Marca esta interface como um componente do Spring responsável por acessar dados.
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Estende JpaRepository, o que fornece métodos básicos para manipulação de dados, como salvar, atualizar, deletar e buscar.

    // Método personalizado para buscar um usuário pelo email.
    Usuario findByEmail(String email); 
    // O Spring Data JPA interpreta automaticamente este método com base no nome e cria uma consulta para buscar um usuário com o email fornecido.
}
```
1. Interface `UsuarioRepository`:
    - Atua como a camada responsável por acessar e manipular os dados da entidade `Usuario` no banco de dados.
    - Estende a interface `JpaRepository`, que fornece métodos prontos para operações comuns, como `save`, `findById`, `findAll`, `deleteById`, entre outros.

2. Consulta personalizada:
    - O método `findByEmail` usa o padrão de nomenclatura do Spring Data JPA para criar uma consulta SQL automaticamente.
    - Exemplo de uso: Buscar um usuário pelo email (por exemplo, em autenticação ou validação de cadastro).

3. `@Repository`:
    - Indica que esta interface é um componente Spring, especializado em interagir com o banco de dados.
    - Essa anotação facilita a injeção de dependência em outras classes do sistema.

#### Benefícios
  - Reduz o trabalho manual, já que os métodos básicos e consultas personalizadas são gerados automaticamente pelo Spring Data JPA.
  - Permite criar consultas mais complexas apenas seguindo o padrão de nomenclatura, sem precisar escrever SQL diretamente.

<hr>

### service > UsuarioService.java

```java
package com.storebooks.storebooks.service;

// Importação das classes necessárias.
import com.storebooks.storebooks.model.Usuario; // Modelo de dados representando os usuários.
import com.storebooks.storebooks.repository.UsuarioRepository; // Repositório para interação com o banco de dados.
import org.springframework.beans.factory.annotation.Autowired; // Para injeção automática de dependências.
import org.springframework.stereotype.Service; // Marca a classe como um serviço no Spring.

import java.util.List; // Usado para trabalhar com listas.

@Service // Indica que esta classe é um serviço do Spring, contendo lógica de negócios.
public class UsuarioService {

    @Autowired // Injeção automática do repositório de usuários.
    private UsuarioRepository usuarioRepository; 
    // Objeto responsável por acessar os dados da entidade "Usuario" no banco de dados.

    // Método para criar e salvar um novo usuário no banco de dados.
    public Usuario criarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario); 
        // Chama o método `save` do JpaRepository para salvar o objeto no banco.
    }

    // Método para listar todos os usuários cadastrados no banco de dados.
    public List<Usuario> listarTodosUsuarios() {
        return usuarioRepository.findAll(); 
        // Chama o método `findAll` do JpaRepository para buscar todos os registros da tabela "usuarios".
    }

    // Método para buscar um usuário pelo email.
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email); 
        // Chama o método personalizado `findByEmail` para localizar o usuário com o email especificado.
    }
}
```
1. Classe `UsuarioService`:
    - Atua como a camada intermediária entre o controlador e o repositório.
    - Contém a lógica de negócios para manipular os dados de usuários.

2. Métodos implementados:
    - `criarUsuario`: Salva um novo usuário no banco de dados.
    - `listarTodosUsuarios`: Retorna uma lista com todos os usuários cadastrados.
    - `buscarPorEmail`: Localiza um usuário pelo email.

3. `@Service`:
    - Marca a classe como um componente de serviço do Spring, permitindo que ela seja gerenciada pelo framework.
    - Facilita a injeção de dependências em outras partes do sistema.

4. Uso do `UsuarioRepository`:
    - Utiliza os métodos padrão e personalizados fornecidos pelo repositório para realizar operações no banco.

5. Vantagens:
    - Centraliza a lógica de negócios em uma camada dedicada, tornando o código mais organizado e fácil de manter.
    - Permite reaproveitar métodos em diferentes partes do sistema.

<hr>

### controller > UsuarioController.java

```java
package com.storebooks.storebooks.controller;

// Importação de classes e pacotes necessários.
import com.storebooks.storebooks.model.Usuario; // Modelo de dados para os usuários.
import com.storebooks.storebooks.service.UsuarioService; // Serviço que contém a lógica de negócios para usuários.
import jakarta.validation.Valid; // Anotação para validar os campos do objeto recebido.
import org.springframework.beans.factory.annotation.Autowired; // Para injeção automática de dependências.
import org.springframework.http.ResponseEntity; // Representa respostas HTTP.
import org.springframework.web.bind.annotation.*; // Anotações para controlar rotas e comportamentos no Spring Boot.

import java.util.List; // Usado para trabalhar com listas.

@RestController // Indica que esta classe é um controlador REST, retornando dados JSON em vez de uma view.
@RequestMapping("/api/usuarios") // Define o endpoint base para esta classe: "/api/usuarios".
@CrossOrigin(origins = "http://localhost:5173", // Permite requisições de origens diferentes, neste caso do front-end rodando no localhost na porta 5173.
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, // Métodos HTTP permitidos.
        allowedHeaders = "*") // Permite todos os headers nas requisições.
public class UsuarioController {
    
    @Autowired // Injeção automática da dependência para a classe UsuarioService.
    private UsuarioService usuarioService; // Serviço que contém a lógica para manipular usuários.

    @PostMapping // Define que este método será chamado para requisições POST no endpoint "/api/usuarios".
    public ResponseEntity<Usuario> criarUsuario(@Valid @RequestBody Usuario usuario) { 
        // Recebe um objeto Usuario no corpo da requisição e o valida (@Valid).
        // @RequestBody converte o JSON recebido em um objeto Usuario.
        Usuario novoUsuario = usuarioService.criarUsuario(usuario); 
        // Chama o serviço para criar um novo usuário.
        return ResponseEntity.ok(novoUsuario); 
        // Retorna o objeto criado com o status HTTP 200 (OK).
    }

    @GetMapping // Define que este método será chamado para requisições GET no endpoint "/api/usuarios".
    public List<Usuario> listarUsuarios() {
        // Retorna uma lista de todos os usuários.
        return usuarioService.listarTodosUsuarios(); 
        // Chama o serviço para listar todos os usuários.
    }
}
```
1. Este controlador é responsável por expor endpoints REST relacionados a usuários.

2. A classe utiliza as anotações do Spring Boot para configurar rotas, receber dados e lidar com respostas HTTP.

3. As operações básicas implementadas são:
    - Criar um novo usuário via POST.
    - Listar todos os usuários via GET.

4. A lógica de negócios está abstraída no serviço UsuarioService.

## Testar a aplicação

http://localhost:8080/api/usuarios

Exemplo para usar no Insomnia:
POST http://localhost:8080/api/usuarios
```json
{
  "nome": "Maria Souza",
  "email": "maria@teste.com",
  "senha": "123456"
}
```
```json
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "senha": "senha123"
}
```

