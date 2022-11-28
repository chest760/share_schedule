class AddUidToCalendar < ActiveRecord::Migration[6.1]
  def change
    add_column :calendars, :uid, :integer
  end
end
