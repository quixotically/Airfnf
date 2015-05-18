Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:show, :create, :destroy]
    resources :listings, only: [:show, :create, :destroy]
    resources :requests, only: [:show, :create] do
      post "approve", on: :member
      post "deny", on: :member
    end
  end
end
