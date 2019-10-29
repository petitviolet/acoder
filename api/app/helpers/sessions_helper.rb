module SessionsHelper
  extend ActiveSupport::Concern

  include Sessions
  using Sessions

  included do
    # before_action :user_authenticate! unless :devise_controller? # via devise || access_token
    # before_action :authenticate_account! unless :devise_auth_token_con
    # before_action :authenticate_user
    # attr_reader :current_user
  end

  private

    def user_authenticate!
      byebug
      render json: { error: 'You have to login' }, status: :unauthorized if @current_user.nil?
    end

    def authenticate_user
      @current_user ||= User.find_by(account_id: @current_account.id)
    end
end
