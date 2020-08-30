 #!/bin/bash

cwd="$PWD"                                        ## save current path
for file in $(find . -path "./node_modules" -prune -o -type f -name "*"); do
fname="${file#./}"
  
if [ $fname != "node_modules" ]
then
  ##curl \
  ##--insecure -T {$file} \
  ##sftp://test20.f5-cloud.top:2285/var/www/test20/data/www/test20.f5-cloud.top/$fname \
  ##--user "test20:F5f3Y1f7" \
  ##--ftp-create-dirs
  scp -o StrictHostKeyChecking=yes -P 2285 $fname test20@test20.f5-cloud.top://var/www/test20/data/www/test20.f5-cloud.top/
fi
done
