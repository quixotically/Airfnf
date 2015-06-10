class Listing < ActiveRecord::Base
  # large: "1024x768>",
  has_attached_file :pic, styles: { medium: "300x300>" },
    default_url: "venice.jpg"
  validates_attachment_content_type :pic, content_type: /\Aimage\/.*\Z/

  validates :owner_id, :room_type, :price, :accommodates, :address, presence: true
  validates :price, numericality: { only_integer: true }

  geocoded_by :address
  after_validation :geocode, :if => :address_changed?

  has_many :requests, dependent: :destroy
  belongs_to :owner, class_name: "User"
end
