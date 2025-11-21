Write-Host "MySQL Diagnostic Check" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan

# Check PATH for MySQL
Write-Host "`nChecking PATH for MySQL..." -ForegroundColor Yellow
$pathEntries = $env:Path -split ';'
$mysqlInPath = $pathEntries | Where-Object { $_ -like "*mysql*" }
if ($mysqlInPath) {
    Write-Host "MySQL found in PATH:" -ForegroundColor Green
    $mysqlInPath | ForEach-Object { Write-Host "  $_" -ForegroundColor White }
} else {
    Write-Host "MySQL not found in PATH" -ForegroundColor Red
}

# Check common installation locations
Write-Host "`nChecking common MySQL locations..." -ForegroundColor Yellow
$commonPaths = @(
    "C:\Program Files\MySQL",
    "C:\Program Files (x86)\MySQL", 
    "C:\xampp",
    "C:\wamp"
)

foreach ($basePath in $commonPaths) {
    if (Test-Path $basePath) {
        Write-Host "Found: $basePath" -ForegroundColor Green
        $mysqlExe = Get-ChildItem $basePath -Recurse -Filter "mysql.exe" -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($mysqlExe) {
            Write-Host "  MySQL executable: $($mysqlExe.FullName)" -ForegroundColor White
        }
    }
}

# Check services
Write-Host "`nChecking MySQL services..." -ForegroundColor Yellow
$mysqlServices = Get-Service | Where-Object {$_.Name -like "*mysql*"}
if ($mysqlServices) {
    $mysqlServices | Format-Table Name, Status -AutoSize
} else {
    Write-Host "No MySQL services found" -ForegroundColor Red
}

Write-Host "`nRecommendations:" -ForegroundColor Cyan
if ($mysqlInPath) {
    Write-Host "1. MySQL is in PATH but command not found. Try restarting PowerShell." -ForegroundColor Yellow
} else {
    Write-Host "1. Install MySQL or add it to PATH" -ForegroundColor Yellow
    Write-Host "2. Or use XAMPP for easier setup" -ForegroundColor Yellow
    Write-Host "3. Or let me help you switch to SQLite" -ForegroundColor Yellow
}
