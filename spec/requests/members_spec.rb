require 'rails_helper'

RSpec.describe "Members", type: :request do
  describe "GET /api/members" do
    let!(:karen){Member.create!(name: 'Karen Smith', email: 'karen@email.com', about: 'Hi my name is Karen. I love making gifts for my friends and family.', links: 'instagram/karensmith.com')}
    let!(:bob){Member.create!(name: 'Bob Bobson', email: 'bob@email.com', about: 'I am a maker of things!')}

    it "returns an array of users" do
      get '/api/members'
      expect(response.body).to include_json([
                                              {
                                                id: karen.id,
                                                name: karen.name,
                                                email: karen.email,
                                                about: karen.about,
                                                links: karen.links
                                              },
                                              {
                                                id: bob.id,
                                                name: bob.name,
                                                email: bob.email,
                                                about: bob.about
                                              }
                                            ])
    end
  end

  describe "GET /api/members/:id" do
    let!(:member_params){Member.create!(name: 'Sam Smith', email: 'smith@email.com')}

    it "returns a member by id" do
      # post '/api/login', params: user_params
      get "/api/members/#{member_params.id}"
      expect(response.body).to include_json({
                                              id: member_params.id,
                                              name: member_params.name,
                                              email: member_params.email
                                            })
    end

  end

  describe "POST /api/signup" do
    context "with valid member params" do
      let!(:member_params) {
        {
          name: 'Karen K',
          email: 'karen@email.com',
          password: 'karen'
        }
      }

      it 'creates a new member' do
        expect { post '/api/signup', params: member_params }.to change(Member, :count).by(1)
      end

      it "saves the password as password_digest to allow authentication" do
        post "/api/signup", params: member_params

        expect(Member.last.authenticate(member_params[:password])).to eq(Member.last)
      end

      it 'returns the member data' do
        post '/api/signup', params: member_params

        expect(response.body).to include_json({
                                                id: a_kind_of(Integer),
                                                name: 'Karen K',
                                                email: 'karen@email.com'
                                              })
      end

      it "sets the member ID in the session" do
        post '/api/signup', params: member_params

        expect(session[:user_id]).to eq(JSON.parse(response.body)["id"])
      end

      it 'returns a status code of 201 (created)' do
        post '/api/signup', params: member_params

        expect(response).to have_http_status(:created)
      end


    end

    context "with invalid member params" do
      let!(:member_params) { { email: 'joe@schmoe.com' } }

      it 'does not create a new member' do
        expect { post '/api/signup', params: member_params }.to change(Member, :count).by(0)
      end


      it 'returns a status code of 422 (Unprocessable Entity)' do
        post '/api/signup', params: member_params

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

end
