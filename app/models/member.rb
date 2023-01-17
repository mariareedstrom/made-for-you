class Member < ApplicationRecord
  has_secure_password

  has_many :gifts
  has_many :recipients

  validates :name, presence: true, length: {maximum: 50}
  validates :email, presence: true, uniqueness: true, format: { with: /.+@.+/ }
  validates :about, length: {maximum: 250}
  validates :links, uniqueness: true

end
