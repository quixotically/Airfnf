# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
u1 = User.create(username: 'foo', email: 'foo@foo.com', password: 'foofoo')
u2 = User.create(username: 'hello', email: 'hello@gmail.com', password: 'foofoo')
