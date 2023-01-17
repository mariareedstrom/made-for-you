class CreateGiftRecipients < ActiveRecord::Migration[6.1]
  def change
    create_table :gift_recipients do |t|
      t.references :recipient, null: false, foreign_key: true
      t.references :gift, null: false, foreign_key: true

      t.timestamps
    end
  end
end
