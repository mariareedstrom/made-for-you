class AddTypeOfGiftToGifts < ActiveRecord::Migration[6.1]
  def change
    add_column :gifts, :type_of_gift, :integer
  end
end
