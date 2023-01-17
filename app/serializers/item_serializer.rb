class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :quantity, :unit
  has_one :gift
end
