require 'rails_helper'

RSpec.describe Recipient, type: :model do

  it "can be created successfully with valid data" do
    member = Member.create!(name: "Jane Doe", email: "jane@email.com", password: "jane", links: "/instagram/janded.com")
    recipient = Recipient.create!(member_id: member.id, name: "Karen", notes: "My favorite Aunt. She loves flowers and scents.")
    expect(recipient).to be_valid
  end

  describe "Associations" do
    it { should belong_to(:member) }
    it {should have_many(:gifts).through(:gift_recipients)}
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to allow_value("John").for(:name) }
    it { is_expected.to validate_presence_of(:notes) }
    it { should validate_length_of(:notes).is_at_most(150)  }

  end
end
