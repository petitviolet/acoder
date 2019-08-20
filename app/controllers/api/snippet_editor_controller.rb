class Api::SnippetEditorController < ActionController::Base
  # include ActionController::RequestForgeryProtection
  # include ActionController::ImplicitRender
  # include ActionView::Layouts
  #
  # layout "application"

  def editor
    @snippet = current_user.snippets.find_by(id: params[:id])
    # render 'snippets/editor'
    render :ok
  end
end
