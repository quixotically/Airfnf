Rails.application.routes.draw do
  root to: 'session#new'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
end
