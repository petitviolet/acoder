module Types
  class SnippetType < Types::BaseObject
    field :id, String, null: false
    field :title, String, null: false
    field :description, String, null: false
    field :file_type, String, null: false
    field :content, String, null: false
    field :user, Types::UserType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end