#!/usr/bin/env bash



token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGUiOnRydWUsImlhdCI6MTY3Mzk5MDA5MCwiZXhwIjoxNjc0MDc2NDkwfQ.B9rHGfhfMeQoR9FJIZi_A1GfBzkKtC6Fs9j3rxlXwg8

curl -s -X POST -H "Authorization: Bearer $token"  -H "Content-Type: application/json" -d '{"name": "new-task", "description": "some description"}' http://localhost:3052/new-task | jq
# get all tasks
curl -s -H "Authorization: Bearer $token" http://localhost:3052/get-all | jq

#update task, /update-task/:id  -> the contenet can be name, description, status or none of them
curl -s -X POST -H "Authorization: Bearer $token" -H "Content-Type: application/json" -d '{"name": "new-task", "description": "some description", "status": "done"}' http://localhost:3052/update-task/8 | jq





# list all ports in use
lsof -i -P -n | grep LISTEN | awk '{print $9}'
# get a list of all ports in use
lsof -i -P -n | grep LISTEN | awk '{print $9}' | cut -d ':' -f 2 | sort -n