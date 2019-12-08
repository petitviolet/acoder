class SnippetSummarySerializer < ActiveModel::Serializer
  attributes *%i[id user_id title file_type description created_at updated_at]
end
