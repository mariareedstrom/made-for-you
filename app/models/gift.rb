class Gift < ApplicationRecord
  belongs_to :member
  has_many :gift_recipients, dependent: :destroy
  has_many :recipients, through: :gift_recipients
  has_many :items, dependent: :destroy

  accepts_nested_attributes_for :items

  validates :name, presence: true
  validates :description, presence: true, length: { in: 50..250  }
  validates :difficulty, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 5}
  validates :picture_url, presence: true

  enum type_of_gift: [:craft, :food, :beverage]

end
