class Listing < ActiveRecord::Base
  validates :owner_id, :room_type, :price, :accommodates, :address, presence: true
  validates :price, numericality: { only_integer: true }

  geocoded_by :address
  after_validation :geocode, :if => :address_changed?
  
  has_many :requests, dependent: :destroy
  belongs_to :owner, class_name: "User"
end
