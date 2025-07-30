#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Configurando WOW Game - Plataforma de Gamificação${NC}"
echo "================================================="

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro.${NC}"
    exit 1
fi

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker não encontrado. Você pode instalar as dependências manualmente.${NC}"
fi

echo -e "${GREEN}✅ Node.js encontrado: $(node --version)${NC}"

# Criar arquivos .env se não existirem
if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}📝 Criando arquivo .env para o backend...${NC}"
    cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env.local ]; then
    echo -e "${YELLOW}📝 Criando arquivo .env.local para o frontend...${NC}"
    cp frontend/.env.example frontend/.env.local
fi

echo -e "${GREEN}✅ Arquivos de configuração criados!${NC}"

# Opção de instalação
echo -e "${YELLOW}Escolha uma opção de instalação:${NC}"
echo "1) Docker (Recomendado - instala tudo automaticamente)"
echo "2) Instalação manual (requer PostgreSQL local)"
read -p "Digite sua escolha (1 ou 2): " choice

if [ "$choice" = "1" ]; then
    if command -v docker &> /dev/null; then
        echo -e "${GREEN}🐳 Iniciando com Docker...${NC}"
        docker-compose up -d
        echo -e "${GREEN}✅ Aplicação rodando!${NC}"
        echo -e "${GREEN}Frontend: http://localhost:3000${NC}"
        echo -e "${GREEN}Backend: http://localhost:3001${NC}"
    else
        echo -e "${RED}❌ Docker não encontrado. Por favor, instale Docker primeiro.${NC}"
        exit 1
    fi
elif [ "$choice" = "2" ]; then
    echo -e "${YELLOW}💻 Instalação manual...${NC}"
    
    # Instalar dependências do backend
    echo -e "${YELLOW}📦 Instalando dependências do backend...${NC}"
    cd backend
    npm install
    
    echo -e "${YELLOW}🗄️  Configure sua URL do PostgreSQL no arquivo backend/.env${NC}"
    echo -e "${YELLOW}Depois execute: npm run db:migrate && npm run db:seed${NC}"
    
    # Instalar dependências do frontend
    echo -e "${YELLOW}📦 Instalando dependências do frontend...${NC}"
    cd ../frontend
    npm install
    
    echo -e "${GREEN}✅ Dependências instaladas!${NC}"
    echo -e "${YELLOW}Para iniciar o desenvolvimento:${NC}"
    echo "Backend: cd backend && npm run dev"
    echo "Frontend: cd frontend && npm run dev"
    
    cd ..
else
    echo -e "${RED}❌ Opção inválida.${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Setup concluído! Boa codificação!${NC}"
