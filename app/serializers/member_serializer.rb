class MemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :about, :picture

  has_many :gifts
  has_many :recipients
end
