# README

Anomymous CODE Review

[https://acoder-front.herokuapp.com/](https://acoder-front.herokuapp.com/)

## How to run

See [Makefile](./Makefile)

## Structure

- ./api: API server
    - Ruby, Ruby on Rails
- ./frontend: Frontend SPA
    - TypeScript, React.js, Webpack

## Getting Started

### API

```console
$ cd api
$ docker-compose up -d
$ bundle
$ bundle exec rails s
```

### Frontend

```console
$ cd frontend
$ yarn
$ yarn start
```

## How to deploy

```console
# check heroku-(api|front) are available
$ git remote 
heroku-api
heroku-front
origin

# check git url
$ heroku apps --json | jq -S '.[] | select(.name | startswith("acoder-")) | [.name, .git_url]'

# deploy to heroku
$ make deploy/api
$ make deploy/front
```

## License

[MIT License](https://petitviolet.mit-license.org/)
