module Sessions
  def new_token(user)
    AccessToken.create!(user_id: user.id).token
  end

  refine ActionDispatch::Request do
    def current_user_by_token
      User.authenticate(access_token) if access_token
    end

    def access_token
      headers['X-Access-Token']
    end
  end
end
