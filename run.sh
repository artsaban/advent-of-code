#!/bin/bash

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <year> <day> <lang>"
  exit 1
fi

YEAR=$1
DAY=$2
LANG=$3
SOURCE_CODE_DAY=$(printf "%02d" $2)

if [ "$LANG" = "go" ]; then
  curl -s -b $(cat .env) "https://adventofcode.com/${YEAR}/day/${DAY}/input" | go run ./cmd/${YEAR}/day${SOURCE_CODE_DAY}/main.go
elif [ "$LANG" = "py" ]; then
  curl -s -b $(cat .env) "https://adventofcode.com/${YEAR}/day/${DAY}/input" | python3 ./cmd/${YEAR}/day${SOURCE_CODE_DAY}/main.py
else
  curl -s -b $(cat .env) "https://adventofcode.com/${YEAR}/day/${DAY}/input" | deno run ./cmd/${YEAR}/day${SOURCE_CODE_DAY}/main.ts
fi
