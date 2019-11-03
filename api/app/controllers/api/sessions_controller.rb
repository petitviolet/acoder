class Api::SessionsController < DeviseTokenAuth::SessionsController
  skip_before_action :authenticate_user!

  def whoami
    render json: current_user, status: :ok
  end

  def create
    def self.render_create_success
      user = User.by_account(@resource)
      render json: user
    end
    super
  end
end
