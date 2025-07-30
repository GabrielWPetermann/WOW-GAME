@echo off
setlocal

echo.
echo 🚀 Configurando WOW Game - Plataforma de Gamificação
echo =================================================

:: Verificar se Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado: 
node --version

:: Verificar se Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Docker não encontrado. Você pode instalar as dependências manualmente.
)

:: Criar arquivos .env se não existirem
if not exist backend\.env (
    echo 📝 Criando arquivo .env para o backend...
    copy backend\.env.example backend\.env
)

if not exist frontend\.env.local (
    echo 📝 Criando arquivo .env.local para o frontend...
    copy frontend\.env.example frontend\.env.local
)

echo ✅ Arquivos de configuração criados!
echo.

:: Opção de instalação
echo Escolha uma opção de instalação:
echo 1) Docker (Recomendado - instala tudo automaticamente)
echo 2) Instalação manual (requer PostgreSQL local)
set /p choice="Digite sua escolha (1 ou 2): "

if "%choice%"=="1" (
    docker --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Docker não encontrado. Por favor, instale Docker primeiro.
        pause
        exit /b 1
    )
    
    echo 🐳 Iniciando com Docker...
    docker-compose up -d
    echo ✅ Aplicação rodando!
    echo Frontend: http://localhost:3000
    echo Backend: http://localhost:3001
) else if "%choice%"=="2" (
    echo 💻 Instalação manual...
    
    :: Instalar dependências do backend
    echo 📦 Instalando dependências do backend...
    cd backend
    call npm install
    
    echo 🗄️  Configure sua URL do PostgreSQL no arquivo backend\.env
    echo Depois execute: npm run db:migrate ^&^& npm run db:seed
    
    :: Instalar dependências do frontend
    echo 📦 Instalando dependências do frontend...
    cd ..\frontend
    call npm install
    
    echo ✅ Dependências instaladas!
    echo Para iniciar o desenvolvimento:
    echo Backend: cd backend ^&^& npm run dev
    echo Frontend: cd frontend ^&^& npm run dev
    
    cd ..
) else (
    echo ❌ Opção inválida.
    pause
    exit /b 1
)

echo.
echo 🎉 Setup concluído! Boa codificação!
pause
