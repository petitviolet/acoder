Rails.application.routes.draw do
  root 'home#index'
  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  scope :api do
    mount_devise_token_auth_for 'Account', at: 'accounts'
  end
  namespace :api, defaults: { format: :json } do
    resources :users
    resources :snippets, only: %i[index show create update delete] do
      collection do
        get 'search'
      end
    end

    get '/whoami', to: 'sessions#whoami'
  end
end
