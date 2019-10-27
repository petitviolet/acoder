Rails.application.routes.draw do

  devise_for :users, skip: :all
  devise_scope :user do
    post '/api/sign_in' => 'api/sessions#create', as: :user_session
    delete '/api/sign_out' => 'api/sessions#destroy', as: :destroy_user_session
  end

  root 'home#index'
  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  namespace :api, defaults: { format: :json } do
    resources :users
    resources :snippets, only: %i[index show create update delete] do
      collection do
        get 'search'
      end
    end

    get '/whoami', to: 'sessions#whoami'
    # post '/login', to: 'sessions#login'
    # delete '/logout', to: 'sessions#logout'
  end
end
