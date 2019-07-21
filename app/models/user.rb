class User < ApplicationRecord
  include Sensitive

  sensitive_fields :password_salt, :password_digest

  # virtual attr
  attr_writer :password, :password_confirmation

  validates :name, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  before_save do
    email.downcase!
    set_password_digest
  end

  validate :password_validation

  def authenticate(password)
    Security.match(password_digest, concat_password(password, password_salt)) && self
  end

  private

    def password_validation
      return if id.present? && (@password.nil? && @password_confirmation.nil?)

      @errors.add(:password, 'password confirmation failed') if @password.nil? || @password != @password_confirmation

      return if @password.nil?

      @errors.add(:password, 'password is too short') if @password.length < Security::MIN_PASSWORD_LENGTH
      @errors.add(:password, 'password is too long') if @password.length > Security::MAX_PASSWORD_LENGTH
    end

    def set_password_digest
      self.password_salt ||= Security.new_token
      self.password_digest = Security.digest(concat_password(@password, self.password_salt)) if @password.present?
    end

    def concat_password(password, salt)
      "#{password}:#{salt}"
    end
end
