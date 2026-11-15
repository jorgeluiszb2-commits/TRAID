param([string]$TextFile, [string]$OutputWav)
Add-Type -AssemblyName System.Speech
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$s.SetOutputToWaveFile($OutputWav)
$text = Get-Content -Path $TextFile -Raw
$s.Speak($text)
$s.Dispose()
Write-Host "Audio generado: $OutputWav"
