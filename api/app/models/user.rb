class User < ApplicationRecord
  include Sensitive

  belongs_to :account
  has_many :snippets, dependent: :nullify

end
