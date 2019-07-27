class UsersController < ApplicationController
  before_action :user_authenticate!, only: %i[update destroy]
  def index
    render json: User.all
  end

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: user, status: :ok
    else
      render json: {}, status: :not_found
    end
  end

  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def update
    current_user.update(user_params)
    render json: user, status: :ok
  end

  def destroy
  end

  private

    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
end
