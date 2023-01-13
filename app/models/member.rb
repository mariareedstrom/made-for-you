class Member < ApplicationRecord
  has_secure_password

  validates :name, presence: true, length: {maximum: 50}
  validates :email, presence: true, uniqueness: true, format: { with: /.+@.+/ }
  validates :about, length: {maximum: 250}

end
