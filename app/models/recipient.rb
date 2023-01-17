class Recipient < ApplicationRecord
  belongs_to :member
  has_many :gift_recipients, dependent: :destroy
  has_many :gifts, through: :gift_recipients

  validates :name, presence: true
  validates :notes, presence: true, length: {maximum: 150}

end
