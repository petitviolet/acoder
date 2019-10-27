class ApplicationController < ActionController::API
  include SessionsHelper
  include ApplicationHelper
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

    print e.backtrace.join("\n")
    render json: { error: e.message }, status: :internal_server_error
  end

  private
    def configure_permitted_parameters
      # サインアップ時にnameのストロングパラメータを追加
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
      # アカウント編集の時にnameとprofileのストロングパラメータを追加
      devise_parameter_sanitizer.permit(:account_update, keys: [:name])
    end


end
