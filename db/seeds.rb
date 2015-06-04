# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
path = Rails.root.join("app/assets/images/")
u1 = User.create!(username: 'foo', email: 'foo@foo.com', password: 'foofoo', avatar: File.open(path.join("cat.jpg")))
u2 = User.create!(username: 'hello', email: 'hello@gmail.com', password: 'foofoo', avatar: File.open(path.join("cat.jpg")))
u3 = User.create!(username: 'hi', email: 'hi@gmail.com', password: 'foofoo', avatar: File.open(path.join("cat.jpg")))
u4 = User.create!(username: 'rex', email: 'rex@gmail.com', password: 'foofoo', avatar: File.open(path.join("watermelon-trex.jpg")))
u5 = User.create!(username: 'doge', email: 'doge@gmail.com', password: 'foofoo', avatar: File.open(path.join("doge.png")))

l1 = Listing.create!(owner_id: u1.id, room_type: 'Entire home/apt', price: 1000, location: "New York", accommodates: 10, description: "Awesome place")
l2 = Listing.create!(owner_id: u1.id, room_type: 'Shared room', price: 800, location: "New York", accommodates: 2, description: "Great place")
l3 = Listing.create!(owner_id: u5.id, room_type: 'Private room', price: 1200, location: "New York", accommodates: 4, description: "Beautiful room")
l4 = Listing.create!(owner_id: u5.id, room_type: 'Entire home/apt', price: 1000, location: "Richmond", accommodates: 7, description: "BEST place")
l5 = Listing.create!(owner_id: u5.id, room_type: 'Private room', price: 200, location: "Richmond", accommodates: 2, description: "pretty good place")
l6 = Listing.create!(owner_id: u2.id, room_type: 'Shared room', price: 400, location: "Richmond", accommodates: 3, description: "Great room!")

r1 = Request.create!(requestor_id: u1.id, listing_id: l3.id, start_date: "2017-06-20", end_date: "2017-06-27")
r2 = Request.create!(requestor_id: u1.id, listing_id: l6.id, start_date: "2017-05-20", end_date: "2017-05-27")
