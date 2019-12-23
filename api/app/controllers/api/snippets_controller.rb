class Api::SnippetsController < Api::ApiController
  class Pagination
    class Page
      attr_reader :limit
      attr_reader :offset
      def initialize(limit: 10, offset: 0)
        @limit = limit || 10
        @offset = offset || 0
      end
    end

    def initialize(rel:, page: Page.new)
      @rel = rel
      @page = page
    end

    def to_a
      @rel.limit(@page.limit).offset(@page.offset).to_a
    end

    def self.apply(rel, params)
      params ||= {}
      page = Pagination::Page.new(limit: params[:limit], offset: params[:offset])
      Pagination.new(rel: rel, page: page).to_a
    end
  end

  def index
    contents = Pagination.apply(Snippet.feed.without_content, params.fetch(:page, {}))
    render json: contents, status: :ok, each_serializer: SnippetSummarySerializer
  end

  def search
    user_id = params[:userId]
    render json: Snippet.without_content.includes(:user)
                   .where(snippets: { user_id: user_id }), status: :ok, each_serializer: SnippetSummarySerializer
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
      params.require(:snippet).permit(:title, :description, :file_type, :content)
    end
end
