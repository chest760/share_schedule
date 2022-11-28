class Api::V1::CalendarController < ApplicationController
    before_action :set_current_user, only: []

    def show
        if api_v1_user_signed_in?
            data = Calendar.find_by(uid: params[:id])
            render json:{status:200, data:data,id:params[:id]}
        else
            render json:{message:"error"}
        end
    end

    def index
        events = Calendar.all.where(uid: current_api_v1_user.id)
        # events = Calendar.find_by(uid: current_api_v1_user.id)
        render json:{status:200, data:events}
    end


    def create
        data = Calendar.new(user_params)
        data.uid = current_api_v1_user.id
        logger.debug(data.inspect)
        if data.save!
            render json: {data: data}
        else
            render json:{message:"error"}
        end
    end

    private

    # def set_current_user
    #     @current_user = User.find_by(id: params[:id])
    #     logger.debug('AAA')
        
    # end

    def user_params
        params.permit(:title, :start, :end, :todo)
    end

end
