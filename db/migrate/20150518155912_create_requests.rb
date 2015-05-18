class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.integer :listing_id, null: false
      t.integer :requestor_id, null: false
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.string :status, null: false, default: "Pending"

      t.timestamps
    end

    add_index :requests, :listing_id
    add_index :requests, :requestor_id
    add_index :requests, [:listing_id, :requestor_id], unique: true
  end
end
