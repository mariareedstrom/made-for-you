class Api::GiftRecipientsController < ApplicationController

  def index
    render json: GiftRecipient.all, status: :ok
  end

  def create
    gift_recipient = GiftRecipient.create!(gift_recipient_params)
    render json: gift_recipient, status: :created
  end

  private

  def gift_recipient_params
    params.permit(:recipient_id, :gift_id)
  end
end
