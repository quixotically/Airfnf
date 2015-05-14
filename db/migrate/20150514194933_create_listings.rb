class CreateListings < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.integer :owner_id, null: false
      t.string :room_type, null: false
      t.integer :price, null: false
      t.integer :accommodates, null: false
      t.string :location, null: false
      t.text :description

      t.timestamps null: false
    end
  end
end
