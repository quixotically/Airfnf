class ChangeLocationColumnNameToAddress < ActiveRecord::Migration
  def change
    rename_column :listings, :location, :address
  end
end
