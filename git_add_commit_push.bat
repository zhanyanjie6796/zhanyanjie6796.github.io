@echo off
echo === Git Add, Commit, Push ===
echo.

echo Step 1: Checking git status...
git status --short
echo.

echo Step 2: Adding all changes...
git add .
if %errorlevel% neq 0 (
    echo Error: git add failed
    pause
    exit /b 1
)
echo.

echo Step 3: Committing changes...
set /p COMMIT_MSG="Enter commit message (or press Enter for default 'update'): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=update
git commit -m "%COMMIT_MSG%"
if %errorlevel% neq 0 (
    echo Error: git commit failed
    pause
    exit /b 1
)
echo.

echo Step 4: Pushing to remote...
git push
if %errorlevel% neq 0 (
    echo Error: git push failed
    pause
    exit /b 1
)
echo.
echo === Done! ===
pause
