class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')

    create_table :users, id: :uuid do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.string :password_salt

      t.timestamps
    end
  end
end
