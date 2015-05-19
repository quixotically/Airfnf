class Listing < ActiveRecord::Base
  validates :owner_id, :room_type, :price, :accommodates, :location, presence: true
  validates :price, numericality: { only_integer: true }

  has_many :requests, dependent: :destroy
  belongs_to :owner, class_name: "User"
end
