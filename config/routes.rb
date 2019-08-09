Rails.application.routes.draw do
  resources :users
  resources :snippets

  root 'home#index'
  get '/whoami', to: 'sessions#whoami'
  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'
end
