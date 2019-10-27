class Api::SessionsController < Devise::SessionsController

  def whoami
    render json: current_user, status: :ok
  end

  def login
    email, password = params.require(%i[email password])

    if (user = User.find_by(email: email)&.login(password))
      render json: { user: user, token: new_token(user) }, status: :ok
    else
      render json: { error: "Failed to login" }, status: :bad_request
    end
  end

  def logout
    AccessToken.token(token: access_token).destroy!
    render json: { message: 'Logout succeeded' }, status: :ok
  end
end
