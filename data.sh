#!/bin/bash
mongoimport --db test -c student --headerline --upsert --file ./students.csv --type csv
