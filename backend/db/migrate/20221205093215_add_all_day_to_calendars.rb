class AddAllDayToCalendars < ActiveRecord::Migration[6.1]
  def change
    add_column :calendars, :all_day, :boolean
  end
end
