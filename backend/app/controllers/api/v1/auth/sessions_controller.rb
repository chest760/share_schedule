class Api::V1::Auth::SessionsController < ApplicationController
    # before_action :authenticate_api_v1_user!
    def index
        if current_api_v1_user
            render json: {status: 200, current_user: current_api_v1_user}
        else    
            render json: {status: 500, message: "not found user",id: session[:user_id]}
        end
    end
end
