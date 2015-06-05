json.extract! listing, :id, :owner_id, :room_type, :price, :accommodates, :address, :latitude, :longitude, :description, :booked

json.requests listing.requests, partial: "api/requests/request", as: :request
