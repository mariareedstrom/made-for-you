class Gift < ApplicationRecord
  belongs_to :member

  validates :name, presence: true
  validates :description, presence: true, length: { in: 50..250  }
  validates :difficulty, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 5}
  validates :picture_url, presence: true
end
