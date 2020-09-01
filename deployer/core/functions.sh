#!/bin/bash

function deleteOldRelease {
	releaseToDelete=$(($1-3))

	if [ -d $releaseToDelete ]
	then
		rm -rf $releaseToDelete
	fi
}

APP_NAME=$1
BASE_DIR=$2
BRANCH=$3

PS1=$'\\u2605'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${PS1} deploy: ${GREEN}stop daemon${NC}"
pm2 stop $APP_NAME 1> /dev/null
pm2 delete $APP_NAME 1> /dev/null

cd $BASE_DIR

if ! [ -d releases ]
then
	mkdir "releases"
fi

cd "releases"
lastDir=$(ls -td ./* | head -1)
lastDirNumber=${lastDir#./}
nextDirNumber=$((lastDirNumber+1))

deleteOldRelease $nextDirNumber

# for dir in $(find . -type d -name "*" -maxdepth 1); do
# 	nextDirNumber=$((nextDirNumber+1))
# done

mkdir $nextDirNumber
cd $nextDirNumber

echo -e "${PS1} deploy: ${GREEN}clone${NC}"
git init
git remote add origin https://github.com/andreysuha2/sellbrocke-app-front.git
git fetch --all --prune && git checkout $BRANCH

echo -e "${PS1} deploy: ${GREEN}shared resources${NC}"
ln -s "${BASE_DIR}/shared/.env" .env

echo -e "${PS1} npm: ${GREEN}install${NC}"
npm install &> /dev/null

echo -e "${PS1} npm: ${GREEN}build${NC}"
npm run build &> /dev/null

echo -e "${PS1} deploy: ${GREEN}start daemon${NC}"
pm2 start npm --name $APP_NAME -- start
