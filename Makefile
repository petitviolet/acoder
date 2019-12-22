APP_API=acoder-api
APP_FRONT=acoder-front
GIT_HEROKU_API=heroku-api
GIT_HEROKU_FRONT=heroku-front

deploy/api:
	heroku config:set COMMIT_HASH=$$(git rev-parse --short HEAD) --app $(APP_API)
	git subtree push --prefix api/ $(GIT_HEROKU_API) master

deploy/api/db_migration:
	heroku run rails db:migrate --app $(APP_API)

deploy/front:
	heroku config:set COMMIT_HASH=$$(git rev-parse --short HEAD) --app $(APP_FRONT)
	git subtree push --prefix frontend/ $(GIT_HEROKU_FRONT) master
