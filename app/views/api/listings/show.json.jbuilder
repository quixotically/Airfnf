json.extract! @listing, :id, :owner_id, :room_type, :price, :accommodates, :location, :description

json.requests @listing.requests do |request|
  json.extract! request, :id, :listing_id, :requestor_id, :start_date, :end_date, :status
end
