class RemoveLinksFromMembers < ActiveRecord::Migration[6.1]
  def change
    remove_column :members, :links
  end
end
