# Lab Invest

Uma plataforma digital para educação financeira acessível e orientação especializada gratuita.

## 📋 Sobre o Projeto

O Lab Invest é uma plataforma digital criada com o propósito de oferecer educação financeira acessível e orientação especializada gratuita para pessoas físicas e pequenos empreendedores. Seu principal objetivo é democratizar o acesso ao conhecimento financeiro, conectando usuários a profissionais voluntários das áreas de contabilidade, economia, administração e direito tributário. 

Através de um ambiente virtual seguro, o Lab Invest promove a interação entre usuários e especialistas, viabilizando atendimentos informativos e disponibilizando conteúdos educativos sobre temas como finanças pessoais, investimentos, economia doméstica e planejamento financeiro.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15.5.3** - Framework React
- **React 19.1.0** - Biblioteca JavaScript
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS
- **Material-UI** - Components React
- **Formik + Yup** - Gerenciamento e validação de formulários
- **FontAwesome** - Ícones

### Backend
- **Next.js API Routes** - Rotas de API serverless

## 📁 Estrutura do Projeto

```
labinvest/
├── src/
│   ├── app/
│   │   ├── api/                    # Rotas de API
│   │   │   ├── agendamento/       # API de agendamentos
│   │   │   ├── chat/              # API de chat
│   │   │   ├── cliente/           # API de clientes
│   │   │   ├── postagens/         # API de postagens
│   │   │   └── voluntario/        # API de voluntários
│   │   ├── agendamento/           # Páginas de agendamento
│   │   ├── chat/                  # Páginas de chat
│   │   ├── cliente/               # Páginas de cliente
│   │   ├── home/                  # Página inicial
│   │   ├── perfil/                # Páginas de perfil
│   │   ├── postagens/             # Páginas de postagens
│   │   ├── servicos/              # Página de serviços
│   │   ├── voluntario/            # Páginas de voluntário
│   │   └── layout.tsx             # Layout principal
│   ├── components/               # Components reutilizáveis
│   │   └── templates/             # Templates de formulários
│   ├── schemas/                   # Schemas de validação
│   └── lib/                       # Bibliotecas e configurações
├── public/                        # Arquivos estáticos
└── package.json                   # Dependências do projeto
```

## 🗄️ Banco de Dados - SQL Server

### Scripts de Criação das Tabelas

```sql
-- Tabela de Usuários
CREATE TABLE Usuario (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    celular VARCHAR(50),
    endereco VARCHAR(255),
    bairro VARCHAR(255),
    numero VARCHAR(50),
    cep VARCHAR(20)
);

-- Tabela de Categorias
CREATE TABLE Categoria (
    ID_Categoria INT IDENTITY(1,1) PRIMARY KEY,
    Descricao VARCHAR(255)
);

-- Tabela de Tipos de Documento
CREATE TABLE Tipo_Documento (
    ID_tipo_documento INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(255),
    descricao VARCHAR(255),
    obrigatorio BIT
);

-- Tabela de Voluntários
CREATE TABLE Voluntario (
    ID_Voluntario INT IDENTITY(1,1) PRIMARY KEY,
    Formacao VARCHAR(255),
    fk_Usuario_id_usuario INT,
    CONSTRAINT FK_Voluntario_Usuario
        FOREIGN KEY (fk_Usuario_id_usuario)
        REFERENCES Usuario (id_usuario)
);

-- Tabela de Clientes
CREATE TABLE Cliente (
    ID_Cliente INT IDENTITY(1,1) PRIMARY KEY,
    Avaliacao DECIMAL(5,2),
    fk_id_usuario INT,
    CONSTRAINT FK_Cliente_Usuario
        FOREIGN KEY (fk_id_usuario)
        REFERENCES Usuario (id_usuario)
);

-- Tabela de Serviços
CREATE TABLE Servico (
    ID_Servico INT IDENTITY(1,1) PRIMARY KEY,
    Descricao VARCHAR(255),
    fk_Categoria_ID_Categoria INT,
    CONSTRAINT FK_Servico_Categoria
        FOREIGN KEY (fk_Categoria_ID_Categoria)
        REFERENCES Categoria (ID_Categoria)
);

-- Tabela de Chat
CREATE TABLE Chat (
    ID_Chat INT IDENTITY(1,1) PRIMARY KEY,
    fk_Cliente_ID_Cliente INT,
    fk_Voluntario_ID_Voluntario INT,
    CONSTRAINT FK_Chat_Cliente
        FOREIGN KEY (fk_Cliente_ID_Cliente)
        REFERENCES Cliente (ID_Cliente)
        ON DELETE CASCADE,
    CONSTRAINT FK_Chat_Voluntario
        FOREIGN KEY (fk_Voluntario_ID_Voluntario)
        REFERENCES Voluntario (ID_Voluntario)
        ON DELETE CASCADE
);

-- Tabela de Mensagens
CREATE TABLE Mensagem (
    ID_Mensagem INT IDENTITY(1,1) PRIMARY KEY,
    Mensagem VARCHAR(MAX),
    fk_Chat_ID_Chat INT,
    CONSTRAINT FK_Mensagem_Chat
        FOREIGN KEY (fk_Chat_ID_Chat)
        REFERENCES Chat (ID_Chat)
        ON DELETE CASCADE
);

-- Tabela de Agendamentos
CREATE TABLE Agendamento (
    ID_Agendamento INT IDENTITY(1,1) PRIMARY KEY,
    Data_Agendamento DATE,
    Descricao VARCHAR(255),
    Finalizado BIT,
    fk_Cliente_ID_Cliente INT,
    fk_Voluntario_ID_Voluntario INT,
    CONSTRAINT FK_Agendamento_Cliente
        FOREIGN KEY (fk_Cliente_ID_Cliente)
        REFERENCES Cliente (ID_Cliente)
        ON DELETE CASCADE,
    CONSTRAINT FK_Agendamento_Voluntario
        FOREIGN KEY (fk_Voluntario_ID_Voluntario)
        REFERENCES Voluntario (ID_Voluntario)
        ON DELETE CASCADE
);

-- Tabela de Agendamento_Servico
CREATE TABLE Agendamento_Servico (
    ID_agendamento_servico INT IDENTITY(1,1) PRIMARY KEY,
    fk_Agendamento_ID_Agendamento INT,
    fk_Servico_ID_Servico INT,
    CONSTRAINT FK_AgendamentoServico_Agendamento
        FOREIGN KEY (fk_Agendamento_ID_Agendamento)
        REFERENCES Agendamento (ID_Agendamento),
    CONSTRAINT FK_AgendamentoServico_Servico
        FOREIGN KEY (fk_Servico_ID_Servico)
        REFERENCES Servico (ID_Servico)
);

-- Tabela de Voluntario_servico_Presta
CREATE TABLE Voluntario_servico_Presta (
    ID_Voluntario_servico INT IDENTITY(1,1) PRIMARY KEY,
    fk_Voluntario_ID_Voluntario INT,
    fk_Servico_ID_Servico INT,
    CONSTRAINT FK_VolServ_Voluntario
        FOREIGN KEY (fk_Voluntario_ID_Voluntario)
        REFERENCES Voluntario (ID_Voluntario),
    CONSTRAINT FK_VolServ_Servico
        FOREIGN KEY (fk_Servico_ID_Servico)
        REFERENCES Servico (ID_Servico)
);

-- Tabela de Feedback
CREATE TABLE Feedback_Avalia (
    ID_Feedback INT IDENTITY(1,1) PRIMARY KEY,
    Nota NUMERIC(3,1),
    Mensagem VARCHAR(MAX),
    fk_Cliente_ID_Cliente INT,
    fk_Voluntario_ID_Voluntario INT,
    CONSTRAINT FK_Feedback_Cliente
        FOREIGN KEY (fk_Cliente_ID_Cliente)
        REFERENCES Cliente (ID_Cliente),
    CONSTRAINT FK_Feedback_Voluntario
        FOREIGN KEY (fk_Voluntario_ID_Voluntario)
        REFERENCES Voluntario (ID_Voluntario)
);

-- Tabela de Documentos
CREATE TABLE Documentos (
    ID_Documento INT IDENTITY(1,1) PRIMARY KEY,
    caminho_arquivo VARCHAR(255),
    nome_arquivo VARCHAR(255),
    data_envio DATE,
    status_validacao VARCHAR(50),
    observacao VARCHAR(255),
    fk_Voluntario_ID_Voluntario INT,
    fk_Tipo_Documento_ID_tipo_documento INT,
    CONSTRAINT FK_Documento_Voluntario
        FOREIGN KEY (fk_Voluntario_ID_Voluntario)
        REFERENCES Voluntario (ID_Voluntario),
    CONSTRAINT FK_Documento_TipoDocumento
        FOREIGN KEY (fk_Tipo_Documento_ID_tipo_documento)
        REFERENCES Tipo_Documento (ID_tipo_documento)
);

-- Tabela de Postagens
CREATE TABLE Postagem (
    id_postagem INT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(255),
    imagem_principal VARCHAR(255),
    conteudo VARCHAR(MAX),
    fk_id_voluntario INT,
    CONSTRAINT FK_Postagem_Voluntario
        FOREIGN KEY (fk_id_voluntario)
        REFERENCES Voluntario (ID_Voluntario)
);

-- Tabela de Comentários
CREATE TABLE Comentario (
    id_comentario INT IDENTITY(1,1) PRIMARY KEY,
    fk_id_usuario INT,
    comentario VARCHAR(MAX),
    CONSTRAINT FK_Comentario_Usuario
        FOREIGN KEY (fk_id_usuario)
        REFERENCES Usuario (id_usuario)
);
```

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/labinvest/labinvest.git
```

2. Navegue até o diretório do projeto:
```bash
cd labinvest
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📡 API Routes

Todas as rotas de API seguem o padrão REST e retornam dados no formato JSON:

### Clientes
- `GET /api/cliente` - Lista todos os clientes
- `POST /api/cliente` - Cria novo cliente
- `GET /api/cliente/[id]` - Busca cliente por ID
- `PUT /api/cliente/[id]` - Atualiza cliente
- `DELETE /api/cliente/[id]` - Remove cliente

### Voluntários
- `GET /api/voluntario` - Lista todos os voluntários
- `POST /api/voluntario` - Cria novo voluntário
- `GET /api/voluntario/[id]` - Busca voluntário por ID
- `PUT /api/voluntario/[id]` - Atualiza voluntário
- `DELETE /api/voluntario/[id]` - Remove voluntário

### Postagens
- `GET /api/postagens` - Lista todas as postagens
- `POST /api/postagens` - Cria nova postagem
- `GET /api/postagens/[id]` - Busca postagem por ID
- `PUT /api/postagens/[id]` - Atualiza postagem
- `DELETE /api/postagens/[id]` - Remove postagem

### Agendamentos
- `GET /api/agendamento` - Lista todos os agendamentos
- `GET /api/agendamento/[id]` - Busca agendamento por ID
- `PATCH /api/agendamento/[id]` - Atualiza agendamento
- `DELETE /api/agendamento/[id]` - Remove agendamento

### Chat
- `GET /api/chat` - Lista todas as conversas
- `POST /api/chat` - Cria nova conversa
- `GET /api/chat/[id]` - Lista mensagens de uma conversa
- `POST /api/chat/[id]` - Envia mensagem

## 👥 Contribuidores

- **HenriqueVidotto** - Henrique Vidotto
- **joseroberto12** - José Roberto
- **Gabriella Fernanda**
- **Gustavo Henrique de Oliveira Lima**
- **GuilhermeOto** - Guilherme Oto Venturelli

## 📄 Licença

Este projeto está sob a licença MIT. 


---

**Desenvolvido com ❤️ pela equipe**
```

