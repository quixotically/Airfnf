class AddPicColumnsToListings < ActiveRecord::Migration
  def up
    add_attachment :listings, :pic
  end

  def down
    remove_attachment :listings, :pic
  end
end
