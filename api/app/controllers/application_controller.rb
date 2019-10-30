class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ApplicationHelper

  before_action :authenticate_user!, unless: :devise_token_auth_controller?

  respond_to :json

  rescue_from(ActiveRecord::RecordNotFound) do |e|
    render json: { error: e.message }, status: :not_found
  end

  rescue_from(ActiveRecord::RecordInvalid) do |e|
    render json: { error: e.message }, status: :bad_request
  end

  rescue_from(Exception) do |e|
    logger.error("Unexpected error occurred: #{e.inspect}")

    print e.backtrace.join("\n") if Rails.env.development?
    render json: { error: e.message }, status: :internal_server_error
  end

  private

    def authenticate_user!
      render json: { error: 'You have to login' }, status: :unauthorized if current_user.nil?
    end

    def current_user
      return nil if current_account.nil?

      @current_user ||= User.find_by(account_id: current_account.id)
    end

    def devise_token_auth_controller?
      res = params[:controller].split('/')[0] == 'devise_token_auth'
      binding.pry
      res
    end
end
