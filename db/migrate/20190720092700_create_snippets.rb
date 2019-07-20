class CreateSnippets < ActiveRecord::Migration[6.0]
  def change
    create_table :snippet, id: :uuid do |t|
      t.uuid :user_id
      t.string :title
      t.string :description
      t.string :file_type
      t.string :content

      t.timestamps
    end
  end
end
