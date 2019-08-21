class HtmlController < ActionController::Base
  include ActionController::RequestForgeryProtection
  include ActionController::ImplicitRender
  include ActionView::Layouts

  layout "application"
end
