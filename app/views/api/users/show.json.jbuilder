json.extract! @user, :id, :username, :email

json.listings @user.listings do |listing|
  json.extract! listing, :id, :owner_id, :room_type, :price, :accommodates, :location, :description
end

# json.requests @user.requests do |request|
#   json.extract! request, :id, :listing_id, :requestor_id, :start_date, :end_date, :status
# end
