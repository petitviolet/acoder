require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest

  test "create user" do
    name = Faker::Name.unique.name
    post(
      '/api/users/sign_up',
      params: { user: {
        name: name,
        email: Faker::Internet.unique.email,
        password: 'password',
      } }
    )

    assert_equal 201, @response.status
    body = JSON.parse(@response.body)
    assert_not_empty body["id"]
    assert_equal name, body["name"]
  end

  test "whoami" do
    sign_in_as_alice
    json_get('/api/whoami')

    assert_equal 200, @response.status
    assert_equal users(:alice).id, JSON.parse(@response.body)['id']
  end
end
