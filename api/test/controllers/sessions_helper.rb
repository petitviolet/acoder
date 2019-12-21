module Controllers
  module SessionsHelper

    def sign_in_as_alice
      sign_in_as(user: users(:alice))
    end

    def sign_in_as(user:)
      post(
        '/api/users/sign_in',
        params: {
          email: user.account.email,
          password: 'password',
        }
      )
      @x_access_token = @response.headers['X-Access-Token']
    end

  end
end
