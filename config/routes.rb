Rails.application.routes.draw do
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    resources :users
    resources :snippets

    get '/whoami', to: 'sessions#whoami'
    post '/login', to: 'sessions#login'
    delete '/logout', to: 'sessions#logout'
  end
end
