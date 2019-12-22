deploy/api:
	heroku config:set COMMIT_HASH=$$(git rev-parse --short HEAD) --app acoder-api
	git subtree push --prefix api/ heroku-api master

deploy/front:
	heroku config:set COMMIT_HASH=$$(git rev-parse --short HEAD) --app acoder-front
	git subtree push --prefix frontend/ heroku-front master
