---
title: 'Developing a Web App with Java, Database, and React'
created: '2024-11-26T21:12:07.071Z'
modified: '2024-11-28T00:20:52.350Z'
---

# Developing a Web App with Java, Database, and React

## 1. Preparação do Ambiente
Instalações Necessárias:

- Java JDK 17 ou superior
- MySQL Workbench
- VS Code e IntelliJ IDEA
- Xampp (ou similar)
- Node.js
- Insomnia (ou similar)
- Git (opcional, mas recomendado)

## 2. Criar Backend com Spring Initializr (Framework  Java)
Passo a Passo Spring Initializr:

Acesse https://start.spring.io/
Configurações:

- Project: Maven
- Language: Java
- Spring Boot: 3.2.x (última versão estável)
- Grupo: com.fiap
- Artefato: cadastro
- Packaging: Jar
- Java: 17

Dependências para adicionar:

- Spring Web
- Spring Data JPA
- MySQL Driver
- Validation
- Lombok (opcional, mas recomendado)

1. Spring Web:
    - Permite criar aplicações web, incluindo APIs REST.
    - Facilita a criação de controladores, mapeamento de rotas e manipulação de requisições HTTP.

2. Spring Data JPA:
    - Simplifica o acesso e manipulação de dados em bancos de dados relacionais usando JPA (Java Persistence API).
    - Gera consultas SQL automaticamente com base em métodos de repositórios.

3. MySQL Driver:
    - Fornece o conector necessário para o Spring Boot se comunicar com um banco de dados MySQL.

4. Validation:
    - Oferece anotações para validar automaticamente os campos de entrada (e.g., `@NotBlank`, `@Email`, `@Size`).
    - Garante a integridade dos dados antes de serem processados.

5. Lombok:
    - Automatiza a geração de código repetitivo, como `getters`, `setters`, `toString`, `equals`, e construtores.
    - Reduz significativamente o tamanho do código-fonte, melhorando a legibilidade.

Gerar o projeto e baixar o ZIP
Extrair o projeto em uma pasta
Abrir no IntelliJ IDEA ou VS Code

## 3. Configurar Banco de Dados MySQL
No MySQL Workbench:

- CREATE DATABASE nome_db;

## 4. Configurar application.properties
No arquivo src/main/resources/application.properties:

```properties
# Configurações do Banco de Dados
spring.datasource.url=jdbc:mysql://localhost:3306/nome_db
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha

# Hibernate ddl auto (create, create-drop, validate, update)
spring.jpa.hibernate.ddl-auto=update

# Mostrar SQL no console
spring.jpa.show-sql=true

# Configurações de porta (opcional)
server.port=8080

```

## 5. Criar Estrutura de Pacotes
Estrutura recomendada:

```
src/main/java/com.sua_empresa.nome_projeto
├── controller/
│   └── UsuarioController.java
├── service/
│   └── UsuarioService.java
├── repository/
│   └── UsuarioRepository.java
└── model/
    └── Usuario.java
```

## 6. Desenvolver o Front com React Vite

