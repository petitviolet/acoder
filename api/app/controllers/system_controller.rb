class SystemController < ActionController::Base
  def liveness
    render json: { message: 'OK', version: commit, date: Time.zone.now }
  end
  alias health liveness

  def readiness
    res = ActiveRecord::Base.connection.execute("SELECT now() as now")&.first["now"]
    render json: { message: 'OK', version: commit, date: Time.zone.now, result: res }
  end

  private

  def commit
    `git rev-parse --short HEAD`.strip
  end
end
