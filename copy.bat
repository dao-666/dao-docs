rem rd unpackage /s /q 

cd .\docs\.vitepress
rem xcopy dist\. ..\..\unpackage\dist\build\h5\. /y/e/i

rd C:\dDisk\0.uniapp.demo\dao-docs\unpackage /s/q 
xcopy dist\. C:\dDisk\0.uniapp.demo\dao-docs\unpackage\dist\build\h5\. /y/e/i

pause