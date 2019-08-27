class ApplicationController < ActionController::API
  include SessionsHelper
  include ApplicationHelper

  rescue_from(ActiveRecord::RecordNotFound) do |e|
    render json: { error: e.message }, status: :not_found
  end

  rescue_from(ActiveRecord::RecordInvalid) do |e|
    render json: { error: e.message }, status: :bad_request
  end

  rescue_from(Exception) do |e|
    logger.error("Unexpected error occurred: #{e.inspect}")
    render json: { error: e.message }, status: :internal_server_error
  end
end
