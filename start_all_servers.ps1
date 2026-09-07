# 🚀 Master Server Runner for 3D Animation Portfolio Projects

$projects = @(
    @{ Name = "velora-chocolate"; Port = 5180 },
    @{ Name = "aurelia-luxury-estates"; Port = 5181 },
    @{ Name = "tidal-veil-skincare"; Port = 5182 },
    @{ Name = "rootsole-footwear"; Port = 5183 },
    @{ Name = "kinroot-fitness"; Port = 5184 },
    @{ Name = "aura-noir-perfume"; Port = 5185 },
    @{ Name = "nocturne-dining"; Port = 5186 },
    @{ Name = "pulseform-fitness"; Port = 5187 },
    @{ Name = "gusto-italian"; Port = 5188 },
    @{ Name = "nova-sneakers"; Port = 5189 },
    @{ Name = "maison-braise"; Port = 5190 },
    @{ Name = "soluna-cove-resort"; Port = 5192 },
    @{ Name = "aurelia-developments"; Port = 5193 }
)

$baseDir = "D:\SOFTWARE\ANTIGRAVITY\3D Animation Portfolio"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Starting 3D Animation Portfolio Dev Servers" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

foreach ($p in $projects) {
    $dir = Join-Path $baseDir $p.Name
    if (Test-Path $dir) {
        Write-Host "[STARTING] $($p.Name) on http://localhost:$($p.Port)" -ForegroundColor Green
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$dir'; npm run dev" -WindowStyle Minimized
    }
}

Write-Host ""
Write-Host "All dev servers started in background!" -ForegroundColor Cyan
Write-Host "Serving Master Portfolio Hub on http://localhost:5000 ..." -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# Serve the master hub
npx -y serve -l 5000 "$baseDir"
