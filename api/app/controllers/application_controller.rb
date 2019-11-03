class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ApplicationHelper

  before_action :split_tokens
  prepend_after_action :join_tokens
  before_action :authenticate_user!, unless: :devise_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?

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

      @current_user ||= User.by_account(current_account)
    end

    def split_tokens
      return if request.headers['X-Access-Token'].nil?

      token = JSON.parse(Base64.decode64(CGI.unescape(request.headers['X-Access-Token'])))
      request.headers['access-token'] = token['access-token']
      request.headers['client'] = token['client']
      request.headers['uid'] = token['uid']
    end

    def join_tokens
      return if response.headers['access-token'].nil?

      auth_json = {
        'access-token' => response.headers['access-token'],
        'client' => response.headers['client'],
        'uid' => response.headers['uid'],
      }
      response.headers.delete_if{ |key| auth_json.include? key }
      response.headers['X-Access-Token'] = CGI.escape(Base64.encode64(JSON.dump(auth_json)))
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
      devise_parameter_sanitizer.permit(:account_update, keys: [:name])
    end
end
