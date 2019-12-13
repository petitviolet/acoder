module Types
  class MutationType < Types::BaseObject
    field :create_snippet, mutation: Mutations::Snippets::Create
  end
end
