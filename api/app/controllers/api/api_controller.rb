module Api
  class ApiController < ApplicationController

    rescue_from(ActiveRecord::RecordInvalid) do |e|
      logger.error("ValidationError: #{e.inspect}")
      render json: { error: e.message }, status: :unprocessable_entity
    end

  end
end

