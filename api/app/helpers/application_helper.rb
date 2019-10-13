module ApplicationHelper
  # @return [Logger]
  def logger
    Rails.logger
  end

  def with_logging(msg:, options: {})
    logger.info { "[Start]#{msg}" }
    res = yield
    logger.info { "[End]#{msg}#{res if options[:result]}" }
    res
  end

  def with_time_logging(msg:, options: {})
    logger.info { "[Start]#{msg}" }
    start = Time.now.utc
    res = yield
    logger.info { "[End][#{Time.now.utc - start} sec]#{msg}#{res if options[:result]}" }
    res
  end
end
