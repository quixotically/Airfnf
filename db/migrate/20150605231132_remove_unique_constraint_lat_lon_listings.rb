class RemoveUniqueConstraintLatLonListings < ActiveRecord::Migration
  def change
    remove_index :listings, name: "index_listings_on_latitude_and_longitude"
    add_index :listings, [:latitude, :longitude]
  end
end
