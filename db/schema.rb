# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150610173349) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listings", force: :cascade do |t|
    t.integer  "owner_id",                         null: false
    t.string   "room_type",                        null: false
    t.integer  "price",                            null: false
    t.integer  "accommodates",                     null: false
    t.string   "address",                          null: false
    t.text     "description"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.boolean  "booked",           default: false
    t.float    "latitude"
    t.float    "longitude"
    t.string   "pic_file_name"
    t.string   "pic_content_type"
    t.integer  "pic_file_size"
    t.datetime "pic_updated_at"
  end

  add_index "listings", ["latitude", "longitude"], name: "index_listings_on_latitude_and_longitude", using: :btree

  create_table "requests", force: :cascade do |t|
    t.integer  "listing_id",                       null: false
    t.integer  "requestor_id",                     null: false
    t.date     "start_date",                       null: false
    t.date     "end_date",                         null: false
    t.string   "status",       default: "Pending", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "requests", ["listing_id", "requestor_id"], name: "index_requests_on_listing_id_and_requestor_id", unique: true, using: :btree
  add_index "requests", ["listing_id"], name: "index_requests_on_listing_id", using: :btree
  add_index "requests", ["requestor_id"], name: "index_requests_on_requestor_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",            null: false
    t.string   "email",               null: false
    t.string   "password_digest",     null: false
    t.string   "session_token",       null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
