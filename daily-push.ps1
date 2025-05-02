cd "C:\dev\connect-tree-site"  # <-- change if your path is different
git add .
$commitMessage = "Auto daily commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git commit -m $commitMessage
git push origin main
