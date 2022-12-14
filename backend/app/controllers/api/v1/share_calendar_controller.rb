class Api::V1::ShareCalendarController < ApplicationController
    
    def show
        room_id = params[:id]
        room = Room.find(room_id)
        logger.debug(room_id)
        if room
            if room.user1_id
                user1 = User.find(room.user1_id)
                calendar1 = Calendar.all.where(uid: room.user1_id)
            end
            if room.user2_id
                user2 = User.find(room.user2_id)
                calendar2 = Calendar.all.where(uid: room.user2_id)
            end
            if room.user3_id
                user3 = User.find(room.user3_id)
                calendar3 = Calendar.all.where(uid: room.user3_id)
            end

            render json:{status:200, data1:calendar1,user1:user1, data2:calendar2,user2:user2, data3:calendar3,user3:user3}
        else 
            render json:{message:"error"}
        end
    end

    
end
