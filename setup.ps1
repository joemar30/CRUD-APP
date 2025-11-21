Write-Host "Setting up CRUD Application with SQLite..." -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan

# Backend setup
Write-Host "`n1. Setting up backend..." -ForegroundColor Yellow
cd backend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "Backend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "Error installing backend dependencies" -ForegroundColor Red
    exit 1
}

# Frontend setup
Write-Host "`n2. Setting up frontend..." -ForegroundColor Yellow
cd ..\frontend
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "Frontend dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "Error installing frontend dependencies" -ForegroundColor Red
    exit 1
}

cd ..

Write-Host "`n3. Setup Complete!" -ForegroundColor Green
Write-Host "==================" -ForegroundColor Green
Write-Host "To start the application:" -ForegroundColor White
Write-Host "1. Backend: cd backend && npm run dev" -ForegroundColor Cyan
Write-Host "2. Frontend: cd frontend && npm run dev" -ForegroundColor Cyan
Write-Host "`nDemo Credentials:" -ForegroundColor White
Write-Host "Admin: admin@example.com / password123" -ForegroundColor Yellow
Write-Host "User:  user@example.com / password123" -ForegroundColor Yellow
Write-Host "`nThe application will create database.sqlite automatically!" -ForegroundColor Green
