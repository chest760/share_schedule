class Api::V1::RoomController < ApplicationController

    def index
        data = Room.all.where(user1_id: current_api_v1_user.id)
                       .or(Room.where(user2_id: current_api_v1_user.id))
                       .or(Room.where(user3_id: current_api_v1_user.id))
        render json:{status:200, data:data}
    end


    def update
        data = Room.find_by(password: room_params[:password])
        uid = params[:id].to_i
        if data
            if data.room_name == room_params[:room_name]
                if (data.user1_id != uid && data.user2_id != uid && data.user3_id != uid)
                    if (data.user2_id == nil)
                        data.user2_id = uid
                        data.update(update_user2)

                    elsif (data.user3_id == nil)
                            data.user3_id = uid
                            data.update(update_user3)
                    end
                end
                render json:{status:200, data:data}
            end
        end
    end

    def create
        data = Room.new(room_params)
        if data.save
            render json: {data: data}
        else
            render json:{message:"error"}
        end

    end

    private
    def room_params
        params.permit(:user1_id, :user2_id, :user3_id, :password, :room_name)
    end

    def update_user2
        params.permit(:user2_id)
    end


    def update_user3
        params.permit(:user3_id)
    end
end
