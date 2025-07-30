# 🎮 WOW Game - Plataforma de Gamificação Moderna

Uma aplicação web completa de gamificação onde usuários podem criar personagens 8-bit, completar missões, ganhar XP, subir de nível e acompanhar seu progresso através de um dashboard interativo e responsivo.

## ✨ Funcionalidades

### 🔐 Autenticação
- ✅ Login/cadastro seguro com JWT
- 🔗 Integração OAuth (Google/GitHub)
- 📧 Recuperação de senha por email
- 🛡️ Proteção de rotas e APIs

### 📊 Dashboard do Usuário
- 📈 Visualização de nível atual e XP total
- 📊 Barra de progresso até o próximo nível
- 🎯 Lista de missões pendentes/concluídas
- 🏆 Sistema de conquistas e badges
- 📱 Interface responsiva e animações suaves

### 🎯 Sistema de Missões
- ➕ CRUD completo de missões
- 🎚️ Diferentes níveis de dificuldade (Fácil, Médio, Difícil, Épico)
- 📊 Acompanhamento de progresso em tempo real
- ⏰ Sistema de prazos opcionais
- 🏷️ Categorização de missões

### 👾 Personagem Virtual 8-bits
- 🎨 Criação e customização completa de personagem
- 👕 Várias opções de roupas, cabelos, cores
- 🛡️ Sistema de acessórios (chapéus, armas, óculos)
- 💾 Persistência das customizações

### 🏆 Sistema de Níveis
- 📊 Cálculo dinâmico de XP e níveis
- 🎁 Sistema de recompensas por nível
- 📈 Visualização clara do progresso
- 🔢 Formatação inteligente de números grandes

## 🛠️ Stack Tecnológica

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **UI/Styling:** Chakra UI + Emotion
- **Estado:** Zustand
- **Animações:** Framer Motion
- **HTTP Client:** Axios
- **Testes:** Jest + React Testing Library

### Backend  
- **Runtime:** Node.js
- **Framework:** Express.js
- **Linguagem:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** JWT + Passport.js
- **Validação:** Express Validator
- **Documentação:** Swagger/OpenAPI

### DevOps & Ferramentas
- **Containerização:** Docker + Docker Compose
- **Deploy:** Vercel (Frontend) + Railway/Heroku (Backend)
- **CI/CD:** GitHub Actions
- **Versionamento:** Git + GitHub
- **Code Quality:** ESLint + Prettier

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 12+
- Docker (opcional)

### 🐳 Método 1: Docker (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/GabrielWPetermann/WOW-GAME.git
cd WOW-GAME

# Suba os containers
docker-compose up -d

# Acesse a aplicação
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

### 💻 Método 2: Desenvolvimento Local

#### Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Execute as migrações do banco
npm run db:migrate

# Popule o banco com dados iniciais
npm run db:seed

# Inicie o servidor de desenvolvimento
npm run dev
```

#### Frontend

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📁 Estrutura do Projeto

```
WOW-GAME/
├── frontend/                 # Aplicação Next.js
│   ├── src/
│   │   ├── app/             # App Router (Next.js 14)
│   │   ├── components/      # Componentes React
│   │   ├── hooks/          # Custom Hooks
│   │   ├── services/       # Serviços da API
│   │   ├── store/          # Estado global (Zustand)
│   │   ├── types/          # Tipos TypeScript
│   │   └── utils/          # Funções utilitárias
│   ├── public/             # Arquivos estáticos
│   └── package.json
├── backend/                 # API Node.js/Express
│   ├── src/
│   │   ├── controllers/    # Controladores da API
│   │   ├── middlewares/    # Middlewares personalizados
│   │   ├── routes/         # Definição das rotas
│   │   ├── services/       # Lógica de negócio
│   │   ├── utils/          # Funções utilitárias
│   │   └── config/         # Configurações
│   ├── prisma/             # Schema e migrações
│   └── package.json
├── shared/                  # Tipos compartilhados
├── docker-compose.yml       # Configuração Docker
└── README.md
```

## 🔧 Configuração

### Variáveis de Ambiente

#### Backend (.env)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/wowgame
JWT_SECRET=seu-jwt-secret-super-seguro
JWT_REFRESH_SECRET=seu-refresh-secret
GOOGLE_CLIENT_ID=seu-google-client-id
GITHUB_CLIENT_ID=seu-github-client-id
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🧪 Testes

### Backend
```bash
cd backend
npm test                    # Executar todos os testes
npm run test:watch         # Modo watch
npm run test:coverage      # Com cobertura
```

### Frontend
```bash
cd frontend
npm test                   # Executar todos os testes
npm run test:watch        # Modo watch
npm run test:coverage     # Com cobertura
```

## 📚 API Documentation

A documentação completa da API está disponível em:
- **Desenvolvimento:** http://localhost:3001/api-docs
- **Produção:** [URL da documentação em produção]

### Principais Endpoints

#### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Renovar token

#### Usuários
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil
- `GET /api/users/stats` - Estatísticas do usuário

#### Missões
- `GET /api/missions` - Listar missões
- `POST /api/missions` - Criar missão
- `GET /api/missions/:id` - Detalhes da missão
- `POST /api/users/missions/:id/start` - Iniciar missão
- `POST /api/users/missions/:id/complete` - Completar missão

#### Personagens
- `GET /api/characters` - Obter personagem
- `POST /api/characters` - Criar personagem
- `PUT /api/characters/:id` - Atualizar personagem

## 🚀 Deploy

### Frontend (Vercel)

```bash
# Conecte seu repositório ao Vercel
# Configure as variáveis de ambiente
# Deploy automático a cada push na main
```

### Backend (Railway/Heroku)

```bash
# Configure o banco PostgreSQL
# Configure as variáveis de ambiente
# Execute as migrações em produção
# Deploy da aplicação
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript para type safety
- Siga as convenções do ESLint configurado
- Escreva testes para novas funcionalidades
- Mantenha commits claros e organizados
- Use conventional commits

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Gabriel W. Petermann** - *Desenvolvimento Inicial* - [@GabrielWPetermann](https://github.com/GabrielWPetermann)

## 🙏 Agradecimentos

- Chakra UI pela excelente biblioteca de componentes
- Prisma pelo ORM incrível
- Next.js pela framework fantástica
- Todos os contribuidores open source

## 📞 Suporte

- 📧 Email: [seu-email@exemplo.com]
- 🐛 Issues: [GitHub Issues](https://github.com/GabrielWPetermann/WOW-GAME/issues)
- 💬 Discord: [Link do servidor Discord]

---

⭐ Deixe uma estrela se este projeto te ajudou!
Ideal para projetos educacionais, corporativos ou qualquer iniciativa que deseje engajar usuários através de mecânicas de gamificação.
