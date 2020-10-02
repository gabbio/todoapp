Rails.application.routes.draw do
  root 'pages#index'
  resources :tasks, only: [:index, :create, :update]

  match '*path', to: 'pages#index', via: :all
end
