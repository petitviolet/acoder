class Snippet < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 32 }
  validates :description, length: { maximum: 128 }
  validates :file_type, presence: true
  before_save do
    file_type.save!
  end

  validates :content, presence: true

end
