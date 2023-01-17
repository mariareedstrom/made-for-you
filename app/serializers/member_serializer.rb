class MemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :about, :links

  has_many :gifts
  has_many :recipients
end
