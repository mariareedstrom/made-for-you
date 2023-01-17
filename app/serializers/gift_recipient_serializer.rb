class GiftRecipientSerializer < ActiveModel::Serializer
  attributes :id
  has_one :recipient
  has_one :gift
end
