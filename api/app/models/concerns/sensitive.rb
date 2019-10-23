module Sensitive
  extend ActiveSupport::Concern
  @@excludes = []

  class_methods do
    def sensitive_fields(*fields)
      @@excludes = @@excludes.concat(fields)
    end
  end

  def as_json(options = {})
    options[:except] ||= Array(options[:except]) + Array(@@excludes || nil)
    super(options)
  end
end
