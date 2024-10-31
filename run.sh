#!/bin/bash

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <year> <day>"
  exit 1
fi

YEAR=$1
DAY=$2
SOURCE_CODE_DAY=$(printf "%02d" $2)

curl -s -b $(cat .env) "https://adventofcode.com/${YEAR}/day/${DAY}/input" | go run ./cmd/${YEAR}/day${SOURCE_CODE_DAY}/main.go
