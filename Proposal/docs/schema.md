# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
fname           | string    | not null
lname           | string    | not null
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## listings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
start_date  | date      | not null
end_date    | date      | not null
room_type   | string    | not null
price       | integer   | not null
accommodates| integer   | not null
location    | string    | not null

## requests
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
listing_id  | integer   | not null, foreign key (references listings)
requestor_id| integer   | not null, foreign key (references users)
status      | string    | not null, default: "pending"

## reviews from guests
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
listing_id  | integer   | not null, foreign key (references listings)
author_id   | integer   | not null, foreign key (references users)
host_id     | integer   | not null, foreign key (references users)
body        | string    | not null
rating      | integer   | not null

## reviews from hosts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
guest_id    | integer   | not null, foreign key (references users)
body        | string    | not null
