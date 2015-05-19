json.extract! listing, :id, :owner_id, :room_type, :price, :accommodates, :location, :description

json.requests listing.requests, partial: "api/requests/request", as: :request
