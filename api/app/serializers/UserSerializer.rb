class UserSerializer < ActiveModel::Serializer
  attributes *%i[id name created_at updated_at]
end
