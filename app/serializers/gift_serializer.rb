class GiftSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :type_of_gift, :difficulty, :picture_url, :instructions

  has_one :member
  has_many :gift_recipients
  has_many :recipients, through: :gift_recipients
  has_many :items

  def type_of_gift
    Gift.type_of_gifts[object.type_of_gift]
  end
end
