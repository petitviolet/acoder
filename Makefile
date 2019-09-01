run/server:
	bundle exec rails server

run/client:
	./bin/webpack-dev-server

api/users/new:
	curl -i -H "Content-Type: application/json" -d "$$(jo name=alice email=alice@example.com password=password password_confirmation=password)" localhost:3000/api/users -XPOST

api/login:
	curl -i -H "Content-Type: application/json" -d "$$(jo email=alice@example.com password=password)" localhost:3000/api/login -XPOST
