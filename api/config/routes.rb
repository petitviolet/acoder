Rails.application.routes.draw do
  root 'home#index'
  get '*page', to: 'home#index', constraints: lambda { |req|
    !req.xhr? && req.format.html?
  }

  scope :api do
    mount_devise_token_auth_for 'Account', at: 'users', skip: [:registrations], controllers: {
      sessions: 'api/sessions'
    }
    # devise_scope :account do
    #   post '/accounts/sign_up', to: 'devise_token_auth/registrations#create'
    #   put '/accounts', to: 'devise_token_auth/registrations#update'
    #   delete '/accounts', to: 'devise_token_auth/registrations#destroy'
    # end
  end

  namespace :api, defaults: { format: :json } do
    resources :users, only: %i[show update delete] do
      collection do
        post 'sign_up'
      end
    end

    resources :snippets, only: %i[index show create update delete] do
      collection do
        get 'search'
      end
    end

    get '/whoami', to: 'sessions#whoami'
  end
end
