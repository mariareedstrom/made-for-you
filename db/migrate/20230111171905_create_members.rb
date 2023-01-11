class CreateMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :members do |t|
      t.string :name
      t.string :email
      t.text :about
      t.string :links

      t.timestamps
    end
  end
end
