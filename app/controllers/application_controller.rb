class ApplicationController < ActionController::API
  using Sessions
  include Sessions

  before_action :user_authenticate
  attr_reader :current_user

  rescue_from(ActiveRecord::RecordInvalid) do |e|
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

    def user_authenticate!
      render json: { error: 'You have to login' }, status: :unauthorized if @current_user.nil?
    end

    def user_authenticate
      @current_user ||= request.current_user
    end
end
