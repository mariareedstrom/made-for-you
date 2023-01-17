class Item < ApplicationRecord
  belongs_to :gift

  validates :name, presence: true
  validates :quantity, presence: true
  validates :unit, presence: true

end
