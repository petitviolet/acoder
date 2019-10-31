class Api::SessionsController < Api::ApiController
  def whoami
    render json: current_user, status: :ok
  end

end
