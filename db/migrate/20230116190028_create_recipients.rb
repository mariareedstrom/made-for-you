class CreateRecipients < ActiveRecord::Migration[6.1]
  def change
    create_table :recipients do |t|
      t.references :member, null: false, foreign_key: true
      t.string :name
      t.text :notes

      t.timestamps
    end
  end
end
