class DeleteUsersPrivateInformation < ActiveRecord::Migration[6.0]
  def change
    remove_columns :users, :email, :password_salt,
                   :encrypted_password,
                   :reset_password_token, :reset_password_sent_at, :remember_created_at
  end
end
