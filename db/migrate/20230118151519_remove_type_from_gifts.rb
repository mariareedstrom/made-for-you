class RemoveTypeFromGifts < ActiveRecord::Migration[6.1]
  def change
    remove_column :gifts, :type, :integer
  end
end
