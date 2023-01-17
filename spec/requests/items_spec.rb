require 'rails_helper'

RSpec.describe "Items", type: :request do
  let!(:jane) { Member.create!(name: 'Jane Doe', email: 'jane@email.com', password: "jane", about: "I'm Jane!", links: "instagram/janed.com") }
  let!(:john) { Member.create!(name: 'John Doe', email: 'john@email.com', password: "john", about: "I'm John..", links: "facebook/john.com") }

  let!(:gift1) {Gift.create!(member_id: jane.id, name: "Beer Bread", description: "Super easy and delicious beer bread. Mix dry ingredients, pour over your favorite beer and cook.", difficulty: 2, picture_url: "picture.com")}
  let!(:gift2) {Gift.create!(member_id: john.id, name: "John's Hot Sauce", description: "Sweet and Spicy! Add all ingredients to pot, bring to boil and simmer for 20 min.", difficulty: 2, picture_url: "picture.com")}

  describe "GET /api/items" do

    let!(:item1) {Item.create!(gift: gift1, name: "beer", quantity: 1, unit: "bottle")}
    let!(:item2) {Item.create!(gift: gift2, name: "Chilly powder", quantity: 3, unit: "teaspoons")}



    it "returns an array of items" do
      get '/api/items'
      expect(response.body).to include_json([
                                              {
                                                id: item1.id,
                                                name: item1.name,
                                                quantity: item1.quantity,
                                                unit: item1.unit
                                              },
                                              {
                                                id: item2.id,
                                                name: item2.name,
                                                quantity: item2.quantity,
                                                unit: item2.unit
                                              },
                                            ])
    end
  end


end
