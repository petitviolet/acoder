class Api::SessionsController < DeviseTokenAuth::SessionsController
  skip_before_action :authenticate_user!

  def create
    def self.render_create_success
      user = User.by_account(@resource)
      render json: user, serializer: UserSerializer
    end
    super
  end
end
