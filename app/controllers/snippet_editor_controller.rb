class SnippetEditorController < HtmlController

  include ApplicationHelper
  include SessionsHelper

  def editor
    @snippet = current_user.snippets.find_by(id: params[:id])
  end
end
