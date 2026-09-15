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
    @{ Name = "ember-restaurant"; Port = 5191 },
    @{ Name = "soluna-cove-resort"; Port = 5192 },
    @{ Name = "aurelia-developments"; Port = 5193 },
    @{ Name = "solara-atelier"; Port = 5194 },
    @{ Name = "web-roast"; Port = 5195 },
    @{ Name = "mira-vale-studio"; Port = 5196 },
    @{ Name = "rasmia-portfolio"; Port = 5197 },
    @{ Name = "atelier-editorial"; Port = 5198 },
    @{ Name = "cinematic-portfolio"; Port = 5200 },
    @{ Name = "01-gather"; Port = 5201 },
    @{ Name = "02-altitude"; Port = 5202 },
    @{ Name = "03-kinetic"; Port = 5203 },
    @{ Name = "04-verdant-lab"; Port = 5204 },
    @{ Name = "05-elemental-kitchen"; Port = 5205 },
    @{ Name = "06-molecule-08"; Port = 5206 },
    @{ Name = "07-habitat-system"; Port = 5207 },
    @{ Name = "08-layered"; Port = 5208 },
    @{ Name = "09-formula"; Port = 5209 },
    @{ Name = "10-atelier"; Port = 5210 },
    @{ Name = "11-bean-to-cup"; Port = 5211 },
    @{ Name = "12-living-modules"; Port = 5212 },
    @{ Name = "13-blend"; Port = 5213 },
    @{ Name = "14-casa-horizon"; Port = 5214 },
    @{ Name = "15-ritual"; Port = 5215 }
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
