module SessionsHelper
  extend ActiveSupport::Concern

  include Sessions
  using Sessions

  included do
    before_action :user_authenticate
    attr_reader :current_user
  end

  private

    def user_authenticate!
      render json: { error: 'You have to login' }, status: :unauthorized if @current_user.nil?
    end

    def user_authenticate
      @current_user ||= request.current_user
    end
end
