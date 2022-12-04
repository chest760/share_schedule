class Room < ApplicationRecord
    validates :password, uniqueness: {scope: :room_name}
end
