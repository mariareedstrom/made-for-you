class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.references :gift, null: false, foreign_key: true
      t.string :name
      t.integer :quantity
      t.string :unit

      t.timestamps
    end
  end
end
