echo "Script executing local"
$cred = Import-Clixml "C:\Users\aim4r\Secrets\host.cred"
$session = New-PSSession -ComputerName "192.168.2.46" -Credential $cred

Invoke-Command -Session $session -ScriptBlock{
    cd "C:\Users\Yaroslav\Projects\Forum.Server"
    &.\AppExec.ps1
    Get-Content ".\output.log" -Wait -Tail 10 
    Get-Content ".\output.log" -Wait -Tail 10 
} 
    
# Remove-PSSession $session
# $publishPath="C:\Users\Yaroslav\source\execute\Forum.Server\Forum.API\bin\Debug\net8.0"

# $oldProcess = Get-Process "dotnet" | Where-Object { $_.CommandLine -like "*Forum.API.dll*" } -ErrorAction SilentlyContinue
# if ($oldProcess) {
    # Stop-Process -Id $oldProcess.Id -Force
    # Start-Sleep -Seconds 1 
# }

# Start-Process `
    # -FilePath "dotnet" `
    # -ArgumentList "Forum.API.dll", "--urls=http://0.0.0.0:5038" `
    # -WorkingDirectory $publishPath
# if ((Get-Service "com.docker.service").Status -ne "Running") {
    # Start-Service "com.docker.service"
# }
# if (-not (Get-Process "Docker Desktop" -ErrorAction SilentlyContinue)) {
    # Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
# }
# $dockerReady = $false
# while (-not $dockerReady) {
    # & docker ps > $null 2>&1 
    # if ($LASTEXITCODE -eq 0) {
        # $dockerReady = $true
        # Write-Host "Docker ready!" -ForegroundColor Green
    # } else {
        # Write-Host "." -NoNewline
        # Start-Sleep -Seconds 2 
    # }
# }
# docker start velo-cont