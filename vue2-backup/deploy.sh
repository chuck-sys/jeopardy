#!/usr/bin/bash

set -e

yarn build

cd dist
git init
git add -A
git commit -m 'DEPLOY'
git push -f git@github.com:cheukyin699/jeopardy.git master:gh-pages

cd -
