class AssociateUsersToAccounts < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :account_id, :integer, null: true
    connection.execute(<<-SQL)
      UPDATE users SET account_id = accounts.id
      FROM accounts WHERE accounts.name = users.name;
    SQL
    change_column_null :users, :account_id, false
    add_index :users, :account_id, unique: true
    add_foreign_key :users, :accounts
  end

  def down
    remove_column :users, :account_id
  end
end
