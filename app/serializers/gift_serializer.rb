class GiftSerializer < ActiveModel::Serializer
  attributes :id, :type_of_gift, :name, :description, :difficulty, :picture_url

  has_one :member
  has_many :gift_recipients
  has_many :recipients, through: :gift_recipients
  has_many :items
end
