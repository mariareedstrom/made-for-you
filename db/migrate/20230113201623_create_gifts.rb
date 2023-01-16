class CreateGifts < ActiveRecord::Migration[6.1]
  def change
    create_table :gifts do |t|
      t.references :member, null: false, foreign_key: true
      t.string :name
      t.text :description
      t.integer :difficulty
      t.string :picture_url

      t.timestamps
    end
  end
end
