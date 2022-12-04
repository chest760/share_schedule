Rails.application.routes.draw do

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :test, only: [:index]
      resources :calendar, only: [:show, :create, :index, :update, :destroy]
      resources :room, only: [:show, :create, :index, :update, :destroy]
      resources :share_calendar, only: [:show, :create, :index, :update, :destroy]
      

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      namespace :auth do
        resources :sessions, only: [:index]
      end
    end
  end
end
