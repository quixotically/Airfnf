json.extract! @user, :id, :username, :email

json.listings @user.listings do |listing|
  json.extract! listing, :id, :owner_id, :room_type, :price, :accommodates, :location, :description
end
