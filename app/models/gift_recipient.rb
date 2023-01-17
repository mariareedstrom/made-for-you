class GiftRecipient < ApplicationRecord
  belongs_to :recipient
  belongs_to :gift
end
