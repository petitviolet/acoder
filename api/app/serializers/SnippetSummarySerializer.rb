class SnippetSummarySerializer < ActiveModel::Serializer
  attributes *%i[id user_id title file_type created_at updated_at]
end
