#!/usr/bin/bash
mongoimport --host mongo --db luxund --collection people --type json --drop --file /mongo-seed/diary1929.json --jsonArray
