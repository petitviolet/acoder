class ChangeColumnsNonNullConstraints < ActiveRecord::Migration[6.0]
  def change
    change_column_null :users, :name, true, ''
    change_column_null :users, :email, true, ''
    change_column_null :users, :password_digest, true, ''
    change_column_null :users, :password_salt, true, ''

    change_column_null :snippets, :title, true, ''
    change_column_null :snippets, :file_type, true, ''
    change_column_null :snippets, :content, true, ''
  end
end
