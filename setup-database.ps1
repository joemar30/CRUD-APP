# Database Setup Script for CRUD App

Write-Host "Setting up MySQL database..." -ForegroundColor Green

# Check if MySQL is running
try {
    $mysqlTest = mysql -V
    Write-Host "MySQL is installed: $mysqlTest" -ForegroundColor Green
} catch {
    Write-Host "MySQL is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Import database
Write-Host "Importing database schema..." -ForegroundColor Yellow
Get-Content .\database.sql | mysql -u root -p

Write-Host "Database setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. cd backend && npm install" -ForegroundColor White
Write-Host "2. Update backend/.env with your database password" -ForegroundColor White
Write-Host "3. npm run dev" -ForegroundColor White
Write-Host "4. Open new terminal: cd frontend && npm install && npm run dev" -ForegroundColor White
