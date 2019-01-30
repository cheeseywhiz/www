#!/usr/bin/env bash
set -e
HOST=$(git config deploy.host)
PORT=$(git config deploy.port)
rm -rf build
yarn build
ssh -p $PORT $HOST rm -rfv www/front/build
scp -P $PORT -r build $HOST:www/front
