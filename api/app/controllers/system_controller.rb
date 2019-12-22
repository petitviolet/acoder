class SystemController < ActionController::Base
  def liveness
    render json: { message: 'OK', version: commit, date: Time.zone.now }
  end
  alias health liveness

  def readiness
    res = ActiveRecord::Base.connection.execute('select max(version) v from schema_migrations')&.first['v']
    render json: { message: 'OK', version: commit, date: Time.zone.now, schema: res }
  end

  private

  def commit
    @commit ||= ENV.fetch('COMMIT_HASH') { `git rev-parse --short HEAD`.strip }
  end
end
