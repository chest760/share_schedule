class CreateCalendars < ActiveRecord::Migration[6.1]
  def change
    create_table :calendars do |t|
      t.string :title
      t.string :start
      t.string :end
      t.boolean :todo  

      t.timestamps
    end
  end
end
