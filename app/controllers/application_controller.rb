class ApplicationController < ActionController::API
  using Sessions
  include Sessions

  attr_reader :current_user

  rescue_from(ActiveRecord::RecordInvalid) do |e|
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def user_authenticate!
    @current_user ||= request.current_user
    render json: { error: 'You have to login' }, status: :unauthorized if @current_user.nil?
  end
end
