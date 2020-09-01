#!/bin/bash

GREEN='\033[0;32m'
NC='\033[0m' # No Color
PS1=$'\\u2605'

. ./config.cfg

printf "${PS1} deploy: ${GREEN}start${NC}\n"
printf "${PS1} branch: ${GREEN}${BRANCH}${NC}\n"

ssh -p 2285 test20@test20.f5-cloud.top 'bash -s' < core/functions.sh $APP_NAME $BASE_DIR $BRANCH

printf "${PS1} deploy: ${GREEN}done${NC}\n"