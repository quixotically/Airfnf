json.extract! @user, :id, :username, :email

json.listings @user.listings do |listing|
  json.partial! "api/listings/listing", listing: listing
end

json.requests @user.requests do |request|
  json.partial! "api/requests/request", request: request
end
