class Snippet < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 32 }
  validates :description, length: { maximum: 128 }
  validates :file_type, presence: true
  before_save do
    file_type.downcase!
  end

  validates :content, presence: true

  scope :feed, -> do
    order(:created_at)
  end

end
