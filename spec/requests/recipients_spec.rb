require 'rails_helper'

  RSpec.describe "Api::Recipients", type: :request do
    let!(:jane) { Member.create!(name: 'Jane Doe', email: 'jane@email.com', password: "jane", links: "instagram/janed.com") }
    let!(:john) { Member.create!(name: 'John Doe', email: 'john@email.com', password: "john", links: "facebook/john.com") }

    describe "GET /api/recipients" do

      let!(:recipient1) { Recipient.create!(member: jane, name: "Aunt Jane", notes: "My favorite aunt. Loves flowers and scents")}
      let!(:recipient2) { Recipient.create!(member: john, name: "John", notes: "BFF. Into music and movies.")}

      it "returns an array of recipients" do
        get '/api/recipients'
        expect(response.body).to include_json([
                                                {
                                                  id: recipient1.id,
                                                  name: recipient1.name,
                                                  notes: recipient1.notes
                                                }
                                              ])
      end
    end

    describe "POST /api/recipients" do
      context "with valid input" do
        let!(:recipient_params){
          {
            name: "Martha Stewart",
            notes: "Sweet billionaire grandma"
          }
        }

        let!(:current_user) {
          post '/api/login', params: {email: jane.email, password: 'jane'}
        }

        it 'creates a new recipient' do
          expect { post '/api/recipients', params: recipient_params }.to change(Recipient, :count).by(1)
        end

        it 'returns the recipient data' do
          post '/api/recipients', params: recipient_params

          expect(response.body).to include_json({
                                                  id: a_kind_of(Integer),
                                                  member: { id: jane.id},
                                                  name: "Martha Stewart",
                                                  notes: "Sweet billionaire grandma"
                                                })
        end

        it 'returns a status code of 201 (created)' do
          post '/api/recipients', params: recipient_params

          expect(response).to have_http_status(:created)
        end

      end
    end


  end



