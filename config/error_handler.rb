class ErrorHandler
  def initialize(app)
    @app = app
  end

  def call(env)
    @app.call(env)
  rescue ActionController::RoutingError => e
    response(404, e)
  rescue ActionDispatch::Http::Parameters::ParseError => e
    # happens if invalid JSON was sent with Content-Type: application/json
    response(400, e)
  rescue => e
    if Rails.env.test?
      # For ease of debug using backtrace.
      raise e
    else
      response(500, e)
    end
  end

  def response(status, e)
    [
      status,
      response_header,
      [error_message(status, e).to_json],
    ]
  end

  def response_header
    {
      "Content-Type" => "application/json",
    }
  end

  def error_message(status, e)
    msg = {
      status: status,
      error: e.message,
    }
    msg[:details] = e.details if e.respond_to?(:details)
    msg
  end
end
