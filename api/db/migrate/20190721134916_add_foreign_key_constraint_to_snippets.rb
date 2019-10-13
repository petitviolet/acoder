class AddForeignKeyConstraintToSnippets < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :snippets, :users, column: :user_id
  end
end
