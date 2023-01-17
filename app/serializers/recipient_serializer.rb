class RecipientSerializer < ActiveModel::Serializer
  attributes :id, :name, :notes
  has_one :member
end
