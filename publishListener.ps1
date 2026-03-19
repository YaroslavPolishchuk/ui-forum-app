$publishPath = "\\192.168.2.1\Yaroslav\My Projects\FORUM VELO\Server\ForumApp\Forum.API\bin\Debug\net8.0\publish"
$targetPath = "\\192.168.2.46\Users\Yaroslav\source\execute\buffer"
$cred = Import-Clixml "C:\Users\aim4r\Secrets\host.cred"

$pass = $cred.GetNetworkCredential().Password
$user = $cred.UserName
net use "$targetPath" $pass /user:$user /persistent:no 2>$null

$Global:timer = New-Object System.Timers.Timer
$Global:timer.Interval = 4000
$Global:timer.AutoReset = $false 


$timerAction = {
    try {
        Write-Host "Publish finished -> copying artifacts..."         
        if (-not(Test-Path $targetPath)) {
            throw "Host is not reachable!"
        }
        $Global:timer.Stop();    
        Robocopy.exe "$publishPath" $targetPath /MIR /Z /R:2 /W:2 /V /FP
        #Copy-Item $publishPath "S:\" -Recurse -Force -Verbose
        Write-Host "Copy done"
        Write-Host "monitoring..." -ForegroundColor Blue
    }
    catch {
        Write-Warning "Cannot connect to host: $_"
    }
    
}
$action = { 
    Write-Host "[$(Get-Date -Format HH:mm:ss)] Event triggered!" -ForegroundColor Gray            
    Write-Host "Timer stops"
    $Global:timer.Stop()
    Write-Host "Timer Starts"
    $Global:timer.Start()
}  
        
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $publishPath
$watcher.IncludeSubdirectories = $true
$watcher.InternalBufferSize = 65536
$watcher.EnableRaisingEvents = $true 

Get-EventSubscriber | Unregister-Event -Force
Register-ObjectEvent $watcher Changed -Action $action
Register-ObjectEvent $watcher Created -Action $action
Register-ObjectEvent $watcher Deleted -Action $action
Register-ObjectEvent $Global:timer Elapsed -Action $timerAction

Write-Host "monitoring..." -ForegroundColor Blue
while ($true) {
    # if ( [System.Console]::KeyAvailable) {  
    #     $key = [Console]::ReadKey($true)
    #     Write-Host "Key pressed: $($key.Key)"    
    #     $timer.Stop()    
    #     $timer.Start()
    #     Write-Host "Timer started for 3 seconds"     
    # }
    Start-Sleep 0.1
}


# Register-ObjectEvent $timer Elapsed -SourceIdentifier "TimerElapsed" -Action {        
#         # New-PSDrive S -PSProvider FileSystem -Root $targetPath -Credential $cred -Verbose
#         Write-Host "Publish finished → copying artifacts..."
#         # # Get-ChildItem $publishPath -Recurse | ForEach-Object {
#         # #     $dest = $_.FullName.Replace($publishPath, $targetPath)

#         # #     if ($_.PSIsContainer) {
#         # #         if (!(Test-Path $dest)) {
#         # #             New-Item -ItemType Directory -Path $dest | Out-Null
#         # #         }
#         # #     }
#         # #     else {
#         # #         Copy-Item $_.FullName $dest -Force
#         # #     }
#         # # }
#         # Copy-Item $publishPath "S:\" -Recurse -Verbose

#         # Write-Host "Copy done"
#         # Remove-PSDrive S
#     }