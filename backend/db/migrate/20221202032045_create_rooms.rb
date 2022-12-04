class CreateRooms < ActiveRecord::Migration[6.1]
  def change
    create_table :rooms do |t|
      t.integer :user1_id
      t.integer :user2_id
      t.integer :user3_id
      t.string :room_name
      t.string :password
      t.timestamps
    end
  end
end
