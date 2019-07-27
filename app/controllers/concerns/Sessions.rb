module Sessions
  def new_token(user)
    AccessToken.create!(user_id: user.id).token
  end

  refine ActionDispatch::Request do
    def current_user
      binding.pry
      User.authenticate(access_token) if access_token
    end

    def access_token
      headers['X-Access-Token']
    end
  end
end
