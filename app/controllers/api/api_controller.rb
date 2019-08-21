module Api
  class ApiController < ApplicationController
    using Sessions
    include Sessions

    before_action :user_authenticate
    attr_reader :current_user

    rescue_from(ActiveRecord::RecordInvalid) do |e|
      logger.error("ValidationError: #{e.inspect}")
      render json: { error: e.message }, status: :unprocessable_entity
    end

    rescue_from(Exception) do |e|
      logger.error("Error: #{e.inspect}")
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end

