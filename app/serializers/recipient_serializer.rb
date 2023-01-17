class RecipientSerializer < ActiveModel::Serializer
  attributes :id, :name, :notes
  has_one :member

  has_many :gift_recipients
  has_many :gifts, through: :gift_recipients
end
