class Task < ApplicationRecord
  validates :description, presence: true
  validates :avatar, presence: true
end
