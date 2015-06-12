# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
path = Rails.root.join("app/assets/images/")
u1 = User.create!(username: 'foo', email: 'foo@foo.com', password: 'foofoo', avatar: File.open(path.join("cat.jpg")))
u2 = User.create!(username: 'hello', email: 'hello@gmail.com', password: 'foofoo', avatar: File.open(path.join("cat.jpg")))
u3 = User.create!(username: 'hi', email: 'hi@gmail.com', password: 'foofoo', avatar: File.open(path.join("cat.jpg")))
u4 = User.create!(username: 'rex', email: 'rex@gmail.com', password: 'foofoo', avatar: File.open(path.join("watermelon-trex.jpg")))
u5 = User.create!(username: 'doge', email: 'doge@gmail.com', password: 'foofoo', avatar: File.open(path.join("doge.png")))

# NY
l1 = Listing.create!(owner_id: u1.id, room_type: 'Entire home/apt', price: 1000, address: "80 Spring St New York, NY 10012", accommodates: 10, description: "Awesome place!", pic: File.open(path.join("apt1.jpg")))
l2 = Listing.create!(owner_id: u2.id, room_type: 'Entire home/apt', price: 200, address: "200 Eastern Parkway, Brooklyn, NY", accommodates: 8, description: "Great place to spend the weekend", pic: File.open(path.join("apt2.jpg")))
l3 = Listing.create!(owner_id: u3.id, room_type: 'Entire home/apt', price: 400, address: "79 N 11th St New York, NY 11249", accommodates: 13, description: "Wonderful place to spend the week", pic: File.open(path.join("apt3.jpg")))
l4 = Listing.create!(owner_id: u4.id, room_type: 'Entire home/apt', price: 600, address: "601 Westchester Ave Bronx, NY 10455", accommodates: 11, description: "Sunny and beautiful", pic: File.open(path.join("apt4.jpg")))
l4 = Listing.create!(owner_id: u5.id, room_type: 'Entire home/apt', price: 1100, address: "67th St Central Park West New York, NY 10023", accommodates: 16, description: "Very popular!", pic: File.open(path.join("apt5.jpg")))

l6 = Listing.create!(owner_id: u1.id, room_type: 'Shared room', price: 130, address: "95 E Houston St New York, NY 10002", accommodates: 1, description: "The best around", pic: File.open(path.join("shared1.jpg")))
l7 = Listing.create!(owner_id: u2.id, room_type: 'Shared room', price: 160, address: "118 10th Ave New York, NY 10011", accommodates: 1, description: "Great room!", pic: File.open(path.join("shared2.jpg")))
l8 = Listing.create!(owner_id: u3.id, room_type: 'Shared room', price: 30, address: "Madison Ave. and E.23rd St. New York, NY 10010", accommodates: 1, description: "Lovely and quiet", pic: File.open(path.join("shared3.jpg")))
l9 = Listing.create!(owner_id: u4.id, room_type: 'Shared room', price: 20, address: "Barcade 388 Union Ave Brooklyn, NY 11211", accommodates: 2, description: "Enjoyable stay", pic: File.open(path.join("shared4.jpg")))
l10 = Listing.create!(owner_id: u5.id, room_type: 'Shared room', price: 50, address: "2919 24th Ave Astoria, NY 11102", accommodates: 2, description: "Much to do around here", pic: File.open(path.join("shared5.jpg")))

l11 = Listing.create!(owner_id: u1.id, room_type: 'Private room', price: 200, address: "379 Grand St New York, NY 10002", accommodates: 1, description: "So great", pic: File.open(path.join("bed1.jpg")))
l12 = Listing.create!(owner_id: u2.id, room_type: 'Private room', price: 90, address: "131 2nd Ave New York, NY 10003", accommodates: 2, description: "Everything you could want", pic: File.open(path.join("bed2.jpg")))
l13 = Listing.create!(owner_id: u3.id, room_type: 'Private room', price: 80, address: "61 Wythe Ave Brooklyn, NY 11249", accommodates: 1, description: "Comfortable and clean", pic: File.open(path.join("bed3.jpg")))
l14 = Listing.create!(owner_id: u4.id, room_type: 'Private room', price: 150, address: "64-13 39th Ave Woodside, NY 11377", accommodates: 2, description: "Roomy", pic: File.open(path.join("bed4.jpg")))
l15 = Listing.create!(owner_id: u5.id, room_type: 'Private room', price: 180, address: "15 John St New York, NY 10038", accommodates: 3, description: "Fun environment", pic: File.open(path.join("bed5.jpg")))

# Paris
l16 = Listing.create!(owner_id: u1.id, room_type: 'Entire home/apt', price: 9000, address: "20 Rue Saint-Martin 75004 Paris France", accommodates: 12, description: "Awesome place!", pic: File.open(path.join("apt1.jpg")))
l17 = Listing.create!(owner_id: u2.id, room_type: 'Entire home/apt', price: 800, address: "6 Rue Geoffroy l'Angevin 75004 Paris France", accommodates: 14, description: "Great place to spend the weekend", pic: File.open(path.join("apt2.jpg")))
l18 = Listing.create!(owner_id: u3.id, room_type: 'Entire home/apt', price: 700, address: "5 Rue Coq Héron 75001 Paris France", accommodates: 9, description: "The best around", pic: File.open(path.join("apt3.jpg")))
l19 = Listing.create!(owner_id: u4.id, room_type: 'Shared room', price: 10, address: "27 Quai Branly 75007 Paris France", accommodates: 1, description: "Great room!", pic: File.open(path.join("apt4.jpg")))
l20 = Listing.create!(owner_id: u5.id, room_type: 'Shared room', price: 40, address: "61 Boulevard de Reuilly 75012 Paris France", accommodates: 1, description: "Warm and comfy", pic: File.open(path.join("shared2.jpg")))
l21 = Listing.create!(owner_id: u1.id, room_type: 'Shared room', price: 50, address: "27 Rue de la Colonie 75013 Paris France", accommodates: 1, description: "Spacious", pic: File.open(path.join("shared3.jpg")))
l22 = Listing.create!(owner_id: u2.id, room_type: 'Private room', price: 100, address: "6 Rue des Abbesses 75018 Paris France", accommodates: 2, description: "Memorable stay", pic: File.open(path.join("bed2.jpg")))
l23 = Listing.create!(owner_id: u3.id, room_type: 'Private room', price: 120, address: "59 Rue de Dantzig 75015 Paris France", accommodates: 3, description: "Unforgettable", pic: File.open(path.join("bed5.jpg")))


r1 = Request.create!(requestor_id: u1.id, listing_id: l3.id, start_date: "2017-06-20", end_date: "2017-06-27")
r2 = Request.create!(requestor_id: u1.id, listing_id: l4.id, start_date: "2017-05-20", end_date: "2017-05-27")
r3 = Request.create!(requestor_id: u2.id, listing_id: l1.id, start_date: "2017-04-20", end_date: "2017-04-27")
r4 = Request.create!(requestor_id: u2.id, listing_id: l6.id, start_date: "2017-03-20", end_date: "2017-03-27")
r5 = Request.create!(requestor_id: u3.id, listing_id: l1.id, start_date: "2017-07-20", end_date: "2017-07-27")
r6 = Request.create!(requestor_id: u4.id, listing_id: l1.id, start_date: "2017-08-20", end_date: "2017-08-27")
