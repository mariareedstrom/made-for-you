class GiftSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :difficulty, :picture_url
  has_one :member
end
