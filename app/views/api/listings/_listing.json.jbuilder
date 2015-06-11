json.extract! listing, :id, :owner_id, :room_type, :price, :accommodates,
  :address, :latitude, :longitude, :description, :booked, :pic, :created_at, :updated_at
json.pic_url asset_path(listing.pic.url(:medium))
# json.original_pic_url asset_path(listing.pic.url)

json.owner do
  json.username listing.owner.username
end

json.requests listing.requests, partial: "api/requests/request", as: :request
