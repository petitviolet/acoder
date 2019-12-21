require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "sign_in" do
    post(
      '/api/users/sign_in',
      params: {
        email: accounts(:alice).email,
        password: 'password',
      }
    )
    assert_equal 200, @response.status
    assert_not_empty @response.headers['X-Access-Token']
  end
end
