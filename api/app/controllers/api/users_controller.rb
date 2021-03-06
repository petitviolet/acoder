class Api::UsersController < Api::ApiController
  skip_before_action :authenticate_user!, only: %i[sign_up]

  def whoami
    render json: current_user, status: :ok
  end

  # def index
  #   render json: User.all
  # end

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: user, status: :ok, serializer: UserSerializer
    else
      render json: {}, status: :not_found
    end
  end

  def sign_up
    user = User.sign_up!(account_params)
    render json: user, status: :created, serializer: UserSerializer
  end

  def update
    current_user.update(user_params)
    render json: user, status: :ok, serializer: UserSerializer
  end

  def destroy
  end

  private

    def user_params
      params.require(:user).permit(:name)
    end

    def account_params
      p = params.require(:user)
      p[:password_confirmation] = p[:password] if p[:password]
      p.permit(:name, :email, :password, :password_confirmation)
    end
end
