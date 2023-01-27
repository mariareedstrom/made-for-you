class AddInstructionsToGift < ActiveRecord::Migration[6.1]
  def change
    add_column :gifts, :instructions, :text
  end
end
