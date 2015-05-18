Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] do
      resources :listings, only: [:index]
    end
    resource :session, only: [:show, :create, :destroy]
    resources :listings, only: [:show, :create, :destroy]
  end
end
