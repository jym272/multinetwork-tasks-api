#!/usr/bin/env bash


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6eyJhdXRoZW50aWNhdGUiOnRydWV9LCJpYXQiOjE2NzQwNzQ2ODQsImV4cCI6MTY3NDE2MTA4NCwiYXVkIjoidGFza3MtYXBpIiwiaXNzIjoiYXV0aC1hcGkiLCJzdWIiOiJqeW0yNzJAZW1haWwuY29tIiwianRpIjoiMiJ9.nuknw5E4Pub1caywgzt0OkxXoMeZG-yHU57ol_wE390
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGUiOnRydWUsImlhdCI6MTY3Mzk5MDA5MCwiZXhwIjoxNjc0MDc2NDkwfQ.B9rHGfhfMeQoR9FJIZi_A1GfBzkKtC6Fs9j3rxlXwg8

curl -s -X POST -H "Authorization: Bearer $token"  -H "Content-Type: application/json" -d '{"name": "new-task", "description": "some description"}' http://localhost:3052/new-task | jq
# get all tasks
curl -s -H "Authorization: Bearer $token" http://localhost:3052/get-all | jq

#update task, /update-task/:id  -> the contenet can be name, description, status or none of them
curl -s -X PUT -H "Authorization: Bearer $token" -H "Content-Type: application/json" -d '{"name": "new-task", "description": "some description", "status": "done"}' http://localhost:3052/update-task/8 | jq

#delete task
curl -s -X DELETE -H "Authorization: Bearer $token" http://localhost:3052/delete-task/8 | jq





# list all ports in use
lsof -i -P -n | grep LISTEN | awk '{print $9}'
# get a list of all ports in use
lsof -i -P -n | grep LISTEN | awk '{print $9}' | cut -d ':' -f 2 | sort -n