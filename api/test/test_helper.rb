ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
  require 'controllers/sessions_helper'
  include Controllers::SessionsHelper

  def json_get(path, params: {}, headers: {})
    headers.merge!(:'X-Access-Token' => @x_access_token) if @x_access_token
    get(path, params: params, headers: headers, as: :json)
  end
end

