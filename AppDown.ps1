echo "App closing..."
$cred = Import-Clixml "C:\Users\aim4r\Secrets\host.cred"
$session = New-PSSession -ComputerName "192.168.2.46" -Credential $cred

Invoke-Command -Session $session -ScriptBlock{
    if(Get-Process -Name "dotnet" -ErrorAction SilentlyContinue){
        try {
            Stop-Process -Name "dotnet" -Force -ErrorAction Stop
            Write-Host "App closed"
        }
        catch {
            Write-Host $err    
        }
    } else {
         Write-Host "Process 'dotnet' is not running. Nothing to stop"
    }    
}