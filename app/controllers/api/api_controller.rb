module Api
  class ApiController < ApplicationController
    using Sessions
    include Sessions
    include ApplicationHelper

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

    private

      def user_authenticate!
        render json: { error: 'You have to login' }, status: :unauthorized if @current_user.nil?
      end

      def user_authenticate
        @current_user ||= request.current_user
      end
  end
end

