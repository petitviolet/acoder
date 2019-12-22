deploy/api:
	git subtree push --prefix api/ heroku-api master

deploy/front:
	git subtree push --prefix frontend/ heroku-front master
