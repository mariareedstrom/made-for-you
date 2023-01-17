Rails.application.routes.draw do




  namespace :api do

    resources :items
    resources :gift_recipients, only: :index
    resources :recipients
    resources :gifts
    resources :members
    resources :sessions, only: [:create, :destroy]

    post '/signup', to: 'members#create'

    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'
    get '/me', to: 'sessions#show'
  end

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
