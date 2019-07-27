Rails.application.routes.draw do
  resources :users

  get '/whoami', to: 'sessions#whoami'
  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
end
