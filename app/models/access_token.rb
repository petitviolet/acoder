class AccessToken < ApplicationRecord
  belongs_to :user
  validates :user_id, presence: true
  validates :digest, presence: true, uniqueness: true, allow_nil: true

  validate do
    errors.add(:access_token, 'must not be changed') if changed? && persisted?
  end

  validate :check_expiration
  before_save :generate

  scope :token, ->(token) do
    where(digest: Security.digest_sha(token))
  end

  MAX_LIFE_TIME = 1.month

  attr_reader :token

  private

    def generate
      @token = Security.new_token + Security.new_token
      self.digest = Security.digest_sha(@token)
    end

    def check_expiration
      errors.add(:access_token, 'expired') if created_at && created_at < MAX_LIFE_TIME.ago
    end

end
