require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'validations' do
    subject { build(:task) }

    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:avatar) }
  end
end
