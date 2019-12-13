module Types
  class QueryType < Types::BaseObject
    field :current_user, Types::UserType, null: false, description: 'fetch current user'

    field :user, Types::UserType, null: true, description: 'fetch user by id' do
      argument :id, String, required: true
    end

    field :snippet, Types::SnippetType, null: true, description: 'fetch snippet by id' do
      argument :id, String, required: true
    end

    field :snippets, [Types::SnippetType], null: false, description: 'fetch snippets' do
      argument :limit, Int, required: false
      argument :offset, Int, required: false
    end

    def current_user
      context[:current_user]
    end

    def user(id:)
      User.find_by(id: id)
    end

    def snippet(id:)
      Snippet.find_by(id: id)
    end

    def snippets(limit: 10, offset: 0)
      Snippet.feed.limit(limit).offset(offset)
    end
  end
end
