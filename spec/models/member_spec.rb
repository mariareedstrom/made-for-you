require 'rails_helper'

RSpec.describe Member, type: :model do
  it "can be created successfully with valid data" do
    member = Member.create(name: "Karen", email: "test@email.com", password: "karen", about: "I love making homemade gifts!", links: "instagram/karen.com")
    expect(member).to be_valid
  end

  describe "Associations" do
    it {should have_many(:gifts)}
    it {should have_many(:recipients)}

  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to allow_value("John").for(:name) }

    it { is_expected.to validate_uniqueness_of(:email) }
    it { is_expected.to allow_value("user@email.com").for(:email) }
    it { is_expected.to_not allow_value("@email.com").for(:email) }
    it { is_expected.to_not allow_value("foo").for(:email) }

    it { should validate_length_of(:about).is_at_most(250)  }
    it { is_expected.to validate_uniqueness_of(:links) }


    it { is_expected.to validate_presence_of(:password) }


  end
end
