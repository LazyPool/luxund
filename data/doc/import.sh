#!/usr/bin/bash
jq -s add /mongo-seed/diary*.json > /mongo-seed/diary.json
mongoimport --host mongo --db luxund --collection diary --type json --drop --file /mongo-seed/diary.json --jsonArray
mongosh --host mongo --eval 'db.diary.createIndex( { 年: 1, 月: 1, 日: 1 } )' luxund
mongosh --host mongo --eval 'db.diary.createIndex( { 天气: 1 } )' luxund
mongosh --host mongo --eval 'db.diary.createIndex( { 事件: 1 } )' luxund
mongosh --host mongo --eval 'db.diary.createIndex( { 人物: 1 } )' luxund
mongosh --host mongo --eval 'db.diary.createIndex( { 物件: 1 } )' luxund
mongosh --host mongo --eval 'db.diary.createIndex( { 地点: 1 } )' luxund
