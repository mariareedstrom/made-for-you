class AddPictureToMembers < ActiveRecord::Migration[6.1]
  def change
    add_column :members, :picture, :text
  end
end
