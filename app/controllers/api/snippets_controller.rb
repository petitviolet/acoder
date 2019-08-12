class Api::SnippetsController < Api::ApiController
  before_action :user_authenticate!

  def index
    render json: Snippet.feed
  end

  def show
    snippet = Snippet.find_by(id: params[:id])
    if snippet
      render json: snippet, status: :ok
    else
      render json: {}, status: :not_found
    end
  end

  def create
    snippet = current_user.snippets.create!(snippet_params)
    render json: snippet, status: :created
  end

  def update
    snippet = current_user.snippets.find(params[:id])
    snippet.update!(snippet_params)
    render json: snippet, status: :ok
  end

  def destroy
    snippet = current_user.snippets.find(params[:id])
    snippet.delete!
    render json: { id: snippet.id }, status: :ok
  end

  private

    def snippet_params
      params.permit(:title, :description, :file_type, :content)
    end
end
