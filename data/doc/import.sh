#!/usr/bin/bash
jq -s add /mongo-seed/diary*.json > /mongo-seed/diary.json
mongoimport --host mongo --db luxund --collection diary --type json --drop --file /mongo-seed/diary.json --jsonArray
