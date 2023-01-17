class Recipient < ApplicationRecord
  belongs_to :member

  validates :name, presence: true
  validates :notes, presence: true, length: {maximum: 150}

end
