module Mutations
  module Snippets
    class Attributes < Types::BaseInputObject
      description 'Attributes for creating or updating a snippet'
      argument :title, String, 'title of snippet', required: true
      argument :description, String, 'description of snippet', required: true
      argument :file_type, String, 'file type of snippet', required: true
      argument :content, String, 'content of snippet', required: true
    end

    class Create < Mutations::BaseMutation
      @input_type = Attributes
      argument :attributes, Attributes, required: true, as: :attributes

      field :snippet, Types::SnippetType, null: true
      field :errors, [String], null: false

      def resolve(attributes: nil)
        snippet = context[:current_user].snippets.build(attributes.to_h)
        if snippet.save
          {
            snippet: snippet,
            errors: [],
          }
        else
          {
            snippet: nil,
            errors: snippet.errors.full_messages
          }
        end
      end
    end

  end
end