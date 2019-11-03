class User < ApplicationRecord
  include Sensitive

  belongs_to :account, optional: false
  has_many :snippets, dependent: :nullify

  def self.sign_up!(params)
    ActiveRecord::Base.transaction do
      account = Account.new(params.slice(:name, :email, :password, :password_confirmation))
      account.save!
      user = User.new(account: account, name: params[:name])
      user.save!
      user
    end
  end
end
