require 'rails_helper'

RSpec.describe Gift, type: :model do

  it "can be created successfully with valid data" do

    member = Member.create(name: "Joe Schmoe", email: "joe@email.com", password: "joe")
    gift = Gift.create!(name: "Cowboy Cookies",
                       description: "Delicious cookies for the hungry cowboy! Oats, peanut butter and chocolate mixed into a yummy treat. Makes 20.",
                       difficulty: 5,
                       picture_url: "https://www.thatskinnychickcanbake.com/wp-content/uploads/2017/10/Loaded-Cowboy-Cookies-Recipe-3.jpg",
                       member_id: member.id,

    )
    expect(gift).to be_valid
  end

  describe "Associations" do
    it { should belong_to(:member) }
    it {should have_many(:recipients).through(:gift_recipients)}
  end

  describe "Validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:description) }
    it { is_expected.to validate_length_of(:description).is_at_least(50).is_at_most(250) }
    it { is_expected.to validate_numericality_of(:difficulty).is_greater_than(0).is_less_than_or_equal_to(5) }
    it { is_expected.to validate_presence_of(:picture_url) }
  end


end
