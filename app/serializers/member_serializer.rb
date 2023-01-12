class MemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :about, :links
end
