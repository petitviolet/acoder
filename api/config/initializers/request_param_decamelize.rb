ActionDispatch::Request.parameter_parsers[:json] = -> (raw_post) {
  # Modified from action_dispatch/http/parameters.rb
  # https://github.com/rails/rails/blob/v5.0.1/actionpack/lib/action_dispatch/http/parameters.rb#L11
  data = ActiveSupport::JSON.decode(raw_post)
  data = {:_json => data} unless data.is_a?(Hash)

  data.deep_transform_keys!(&:underscore)
}