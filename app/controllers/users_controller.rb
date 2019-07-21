class UsersController < ApplicationController

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
    user = User.new(user_params)
    byebug
    user.save!
    render json: user, status: :ok
  end

  def update
  end

  def destroy
  end

  private

    def user_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
end
