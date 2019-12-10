module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :current_user, Types::UserType, null: false, description: 'fetch current user'

    field :user, Types::UserType, null: true, description: 'fetch user by id' do
      argument :id, String, required: true
    end

    field :snippets, [Types::SnippetType], null: false, description: 'fetch snippets' do
    end

    def current_user
      context[:current_user]
    end

    def user(id:)
      User.find_by(id: id)
    end

    def snippets
      Snippet.feed
    end
  end
end
