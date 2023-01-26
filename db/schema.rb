# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_01_26_202131) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "gift_recipients", force: :cascade do |t|
    t.bigint "recipient_id", null: false
    t.bigint "gift_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["gift_id"], name: "index_gift_recipients_on_gift_id"
    t.index ["recipient_id"], name: "index_gift_recipients_on_recipient_id"
  end

  create_table "gifts", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.string "name"
    t.text "description"
    t.integer "difficulty"
    t.string "picture_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "type_of_gift"
    t.text "instructions"
    t.index ["member_id"], name: "index_gifts_on_member_id"
  end

  create_table "items", force: :cascade do |t|
    t.bigint "gift_id", null: false
    t.string "name"
    t.integer "quantity"
    t.string "unit"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["gift_id"], name: "index_items_on_gift_id"
  end

  create_table "members", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.text "about"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "password_digest"
    t.text "picture"
  end

  create_table "recipients", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.string "name"
    t.text "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["member_id"], name: "index_recipients_on_member_id"
  end

  add_foreign_key "gift_recipients", "gifts"
  add_foreign_key "gift_recipients", "recipients"
  add_foreign_key "gifts", "members"
  add_foreign_key "items", "gifts"
  add_foreign_key "recipients", "members"
end
