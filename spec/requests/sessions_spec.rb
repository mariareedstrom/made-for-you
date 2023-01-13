require 'rails_helper'

RSpec.describe "Sessions", type: :request do

let!(:user){Member.create!(name: 'Jane Doe', email: 'jane@email.com', password: "jane")}

describe "POST /api/login" do

  context "with valid email and password" do

    it "returns the logged in user" do
      post "/api/login", params: { email: user.email, password: user.password }

      expect(response.body).to include_json({
                                              id: user.id,
                                              email: user.email
                                            })
    end

    it "sets the user ID in the session" do
      post "/api/login", params: { email: user.email, password: user.password }

      expect(session[:user_id]).to eq(user.id)
    end
  end

  context "with invalid password" do
    it "returns a 401 (Unauthorized) status code" do
      post "/api/login", params: { email: user.email, password: "123" }

      expect(response).to have_http_status(:unauthorized)
    end

    it "does not set the user ID in the session" do
      post "/api/login", params: { email: user.email, password: "123" }

      expect(session[:user_id]).to eq(nil)
    end
  end
end

describe "DELETE /api/logout" do
  context "with a logged in user" do
    before do
      post '/api/login', params: { email: user.email, password: user.password}
    end

    it "returns no content" do
      delete '/api/logout'

      expect(response).to have_http_status(:no_content)
    end

    it "deletes the user id from the session" do
      delete '/api/logout'

      expect(session[:user_id]).to eq(nil)
    end

  end

end

describe "GET /api/me" do
  let!(:member1){Member.create!(name: 'Erik Eriksen', email: 'erik@email.com', password: "erik")}
  let!(:member2){Member.create!(name: 'Karen K', email: 'karen@email.com', password: "karen")}

  it "asserts that a current user is authenticated" do
    post '/api/login', params: {name: member1.name, email: member1.email, password: member1.password}
    get '/api/me'

    expect(response).to have_http_status(:ok)
  end

  it "returns a 401 unauthorized response when no user is authenticated" do
    get "/api/me"

    expect(response).to have_http_status(:unauthorized)
  end

  it "returns the first user when the first user is logged in" do
    post '/api/login', params: {email: member1.email, password: member1.password, name: member1.name}
    get '/api/me'

    expect(response.body).to include_json({
                                            id: member1.id,
                                            email: member1.email,
                                            name: member1.name
                                          })
  end

  it "returns the second user when the second user is logged in" do
    post '/api/login', params: {email: member2.email, password: member2.password, name: member2.name}
    get '/api/me'

    expect(response.body).to include_json({
                                            id: member2.id,
                                            email: member2.email,
                                            name: member2.name
                                          })
  end
end


end

