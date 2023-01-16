require 'rails_helper'
RSpec.describe "Api::Gifts", type: :request do
  let!(:jane) { Member.create!(name: 'Jane Doe', email: 'jane@email.com', password: "jane", links: "instagram/janed.com") }
  let!(:john) { Member.create!(name: 'John Doe', email: 'john@email.com', password: "john", links: "faceboo/john.com") }

  describe "GET /api/gifts" do

    let!(:gift1) { Gift.create!(member: jane, name: "Coconut Candle", description: "This is a lovely scented candle that will remind you of the beach. Make it in a half coconut shell or your favorite mason jar.", difficulty: 4, picture_url: "https://cdn.shopify.com/s/files/1/1485/1040/products/MichaelEditedCoconutCandlewhitebackground_1000x1000.jpg?v=1605400119")}
    let!(:gift2) { Gift.create!(member: john, name: "Beer Bread", description: "An easy and delicious bread for all your beer loving friends. Bake it and gift as ready made loaf, of give the mixed dry ingredients along with their favorite beer", difficulty: 3, picture_url: "https://static01.nyt.com/images/2020/04/24/dining/30RECIPES/30RECIPES-articleLarge.jpg")}

    it "returns an array of gifts" do
      get '/api/gifts'
      expect(response.body).to include_json([
                                              {
                                                id: gift1.id,
                                                name: gift1.name,
                                                description: gift1.description,
                                                difficulty: gift1.difficulty,
                                                picture_url: gift1.picture_url
                                              },
                                              {
                                                id: gift2.id,
                                                name: gift2.name,
                                                description: gift2.description,
                                                difficulty: gift2.difficulty,
                                                picture_url: gift2.picture_url
                                              }
                                            ])
    end
  end


  describe "POST /api/gifts" do
    context "with valid input" do
      let!(:gift_params){
        {
          name: "Coconut Candle",
          description: "This is a lovely scented candle that will remind you of the beach. Make it in a half coconut shell or your favorite mason jar.",
          difficulty: 4,
          picture_url: "https://cdn.shopify.com/s/files/1/1485/1040/products/MichaelEditedCoconutCandlewhitebackground_1000x1000.jpg?v=1605400119"
        }
      }

      let!(:current_user) {
        post '/api/login', params: {email: jane.email, password: 'jane'}
      }

      it 'creates a new gift' do
        expect { post '/api/gifts', params: gift_params }.to change(Gift, :count).by(1)
      end

      it 'returns the gift data' do
        post '/api/gifts', params: gift_params

        expect(response.body).to include_json({
                                                id: a_kind_of(Integer),
                                                member: { id: jane.id},
                                                name: "Coconut Candle",
                                                description: "This is a lovely scented candle that will remind you of the beach. Make it in a half coconut shell or your favorite mason jar.",
                                                difficulty: 4,
                                                picture_url: "https://cdn.shopify.com/s/files/1/1485/1040/products/MichaelEditedCoconutCandlewhitebackground_1000x1000.jpg?v=1605400119"
                                              })
      end

      it 'returns a status code of 201 (created)' do
        post '/api/gifts', params: gift_params

        expect(response).to have_http_status(:created)
      end

    end
  end


end