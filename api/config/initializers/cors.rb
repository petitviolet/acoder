Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins /localhost\:\d+/, /acoder-frontend\.herokuapp\.com/

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             expose: %w[X-Access-Token]
  end
end
