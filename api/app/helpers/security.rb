module Security
  MIN_PASSWORD_LENGTH = 8
  MAX_PASSWORD_LENGTH = 50

  class << self
    # @param [String]  str
    # @return [BCrypt::Password]
    def digest(str)
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
      BCrypt::Password.create(str, cost: cost)
    end

    def digest_sha(str)
      Digest::SHA2.new.hexdigest(str)
    end

    # @return [String]
    def new_token
      SecureRandom.urlsafe_base64
    end

    # @param [String]  digest
    # @param [String]  raw_value
    # @return [TrueClass or FalseClass]
    def match(digest, raw_value)
      return false if digest.nil? || raw_value.nil?

      BCrypt::Password.new(digest).is_password? raw_value
    end
  end
end
