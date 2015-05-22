class AddBookedToListings < ActiveRecord::Migration
  def change
    add_column :listings, :booked, :boolean, default: false
  end
end
