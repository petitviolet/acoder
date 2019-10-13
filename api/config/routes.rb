Rails.application.routes.draw do
  root 'home#index'
  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  namespace :api, defaults: { format: :json } do
    resources :users
    resources :snippets, only: %i[index create update delete] do
      collection do
        get 'search'
      end
    end

    get '/whoami', to: 'sessions#whoami'
    post '/login', to: 'sessions#login'
    delete '/logout', to: 'sessions#logout'
  end

  get 'snippets/editor', to: 'snippet_editor#editor'
  get 'snippets/:id/editor', to: 'snippet_editor#editor'
end
