$cloudName = "djbekmw8n"
$uploadPreset = "ml_default"
$pastaLocal = "imagens"
$pastaCloud = "imagens"

Write-Host "=========================="
Write-Host "UPLOAD CLOUDINARY"
Write-Host "=========================="

Get-ChildItem -Path $pastaLocal | ForEach-Object {
    $filePath = $_.FullName
    $nomeArquivo = $_.BaseName

    Write-Host "Enviando $filePath ..."

    $response = Invoke-RestMethod -Method Post `
        -Uri "https://api.cloudinary.com/v1_1/$cloudName/image/upload" `
        -Form @{
            file = Get-Item $filePath
            upload_preset = $uploadPreset
            public_id = "$pastaCloud/$nomeArquivo"
        }

    $urlFinal = $response.secure_url -replace "/upload/", "/upload/f_auto,q_auto,w_500/"

    Write-Host "✅ URL FINAL:"
    Write-Host $urlFinal
    Write-Host "-----------------------------"
}