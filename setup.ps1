Write-Host "========================================" -ForegroundColor Green
Write-Host "Luxury Apartments Accra - Setup" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install
Set-Location "client"
npm install
Set-Location ".."

Write-Host ""
Write-Host "Creating environment file..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Copy-Item "env.example" ".env"
    Write-Host ".env file created successfully!" -ForegroundColor Green
} else {
    Write-Host ".env file already exists." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start XAMPP MySQL service" -ForegroundColor White
Write-Host "2. Run: npm run dev" -ForegroundColor White
Write-Host "3. Access: http://localhost:3000" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to continue"

