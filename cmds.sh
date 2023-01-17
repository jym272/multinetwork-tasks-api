#!/usr/bin/env bash



token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGUiOnRydWUsImlhdCI6MTY3MzkwNjk2NywiZXhwIjoxNjczOTkzMzY3fQ.0WPCmbOrnYA6WMz81--jlfydR9rUFSASwSqLnCU5cYg

curl -s -X POST -H "Authorization: Bearer $token"  -H "Content-Type: application/json" -d '{"name": "new-task", "description": "some description"}' http://localhost:3052/new-task | jq
# get all tasks
curl -s -H "Authorization: Bearer $token" http://localhost:3052/get-all | jq
