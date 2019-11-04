class UserSerializer < ActiveModel::Serializer
  attributes *%i[id name]
end
