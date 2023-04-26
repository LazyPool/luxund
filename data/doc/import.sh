#!/bin/bash
mongoimport --host mongo --db luxund --collection people --type json --file /mongo-seed/人物.json --jsonArray
mongoimport --host mongo --db luxund --collection animal --type json --file /mongo-seed/动物.json --jsonArray
