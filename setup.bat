@echo off
echo Setting up AlgoForge...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js v18 or higher.
    exit /b 1
)

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo PostgreSQL is not installed. Please install PostgreSQL v14 or higher.
    exit /b 1
)

echo Prerequisites check passed!

REM Install root dependencies
echo Installing root dependencies...
call npm install

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
cd ..

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

REM Setup environment file
echo Setting up environment files...
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Created backend\.env file. Please update it with your database credentials.
) else (
    echo backend\.env already exists.
)

echo.
echo Database Setup
echo ==================
echo Please run the following commands to set up your database:
echo.
echo 1. Create the database:
echo    createdb algoforge
echo.
echo 2. Update backend\.env with your database credentials
echo.
echo 3. Run the schema:
echo    psql -d algoforge -f backend\src\database\schema.sql
echo.
echo 4. Seed the database:
echo    psql -d algoforge -f backend\src\database\seed.sql
echo.
echo Setup complete! Run 'npm run dev' to start the application.
pause
