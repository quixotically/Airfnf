json.extract! @user, :id, :username, :email, :avatar, :created_at, :updated_at
json.avatar_url asset_path(@user.avatar.url(:medium))
# @user.avatar.url(:original)

json.listings @user.listings do |listing|
  json.partial! "api/listings/listing", listing: listing
end

json.requests @user.requests do |request|
  json.partial! "api/requests/request", request: request
end
