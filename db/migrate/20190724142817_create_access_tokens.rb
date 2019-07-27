class CreateAccessTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :access_tokens do |t|
      t.uuid :user_id, null: false
      t.string :digest, null: false

      t.timestamps null: false

      t.index :digest, unique: true
    end
    add_foreign_key :access_tokens, :users, on_delete: :cascade
  end
end
