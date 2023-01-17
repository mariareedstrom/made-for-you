require 'rails_helper'

RSpec.describe Item, type: :model do

  it "can be created successfully with valid data" do
    member = Member.create(name: "Jane Doe", email: "jane@email.com", password: "jane", about: "I'm Jane", links: "facebook/jane.com")
    gift  = Gift.create!(member_id: member.id, name: "Knitted Scarf", description: "Simple and pretty scarf pattern. Use your favorite yarn.", difficulty: 3, picture_url: "picture.com")
    item = Item.create(gift_id: gift.id, name: "yarn", quantity: 3, unit: "rolls")

    expect(item).to be_valid
  end

  describe "Associations" do
    it { should belong_to(:gift) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to allow_value("John").for(:name) }
    it { is_expected.to validate_presence_of(:quantity) }
    it { is_expected.to validate_presence_of(:unit) }

  end
end
