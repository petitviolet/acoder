module Types
  class UserType < Types::BaseObject
    field :id, String, null: false
    field :name, String, null: false
    field :snippets, [Types::SnippetType], null: false

    def snippets
      Snippet.includes(:user)
        .where(snippets: { user_id: object.id })
    end
  end
end