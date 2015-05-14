class Listing < ActiveRecord::Base
  validates :owner, :room_type, :price, :accommodates, :location, presence: true
  #has_many :requests
  belongs_to :owner, class_name: "User"
end
