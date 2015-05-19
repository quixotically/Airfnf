json.extract! request, :id, :listing_id, :requestor_id, :start_date, :end_date, :status

json.listing do
  json.location request.listing.location
  json.description request.listing.description
  json.owner_id request.listing.owner_id
end

json.owner do
  json.username request.listing.owner.username
end
