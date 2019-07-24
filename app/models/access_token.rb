class AccessToken < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
  validates :token, presence: true, uniqueness: true

  validate do
    errors.add(:access_token, 'must not be changed') if changed? && persisted?
  end

  MAX_LIFE_TIME = 1.month

  def self.generate(user_id)
    AccessToken.new(user_id: user_id, token: Security.new_token + Security.new_token)
  end

  def expire?
    created_at < MAX_LIFE_TIME.ago
  end

end
