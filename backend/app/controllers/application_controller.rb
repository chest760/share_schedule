class ApplicationController < ActionController::Base
        include ActionController::Helpers
        include DeviseTokenAuth::Concerns::SetUserByToken
        
        skip_before_action :verify_authenticity_token
        helper_method :current_user, :user_signed_in?
        before_action :configure_permitted_parameters, if: :devise_controller? 

        private
      
          def configure_permitted_parameters
            devise_parameter_sanitizer.permit(:sign_up,keys:[:email]) # 注目
          end
end
