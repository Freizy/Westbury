@echo off
echo ========================================
echo Luxury Apartments Accra - Setup
echo ========================================
echo.

echo Installing dependencies...
npm install
cd client && npm install && cd ..

echo.
echo Creating environment file...
if not exist .env (
    copy env.example .env
    echo .env file created successfully!
) else (
    echo .env file already exists.
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start XAMPP MySQL service
echo 2. Run: npm run dev
echo 3. Access: http://localhost:3000
echo.
pause

