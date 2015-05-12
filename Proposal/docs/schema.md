# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## listings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
room_type   | string    | not null
price       | integer   | not null
accommodates| integer   | not null
location    | string    | not null

## requests
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
start_date  | date      | not null
end_date    | date      | not null
listing_id  | integer   | not null, foreign key (references listings)
requestor_id| integer   | not null, foreign key (references users)
status      | string    | not null, default: "pending"

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
listing_id  | integer   | not null, foreign key (references listings)
author_id   | integer   | not null, foreign key (references users)
host_id     | integer   | not null, foreign key (references users)
body        | string    | not null
rating      | integer   | not null
host        | boolean   | not null, default: false
