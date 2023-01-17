class Api::GiftRecipientsController < ApplicationController

  def index
    render json: GiftRecipient.all, status: :ok
  end

  private

  def params
    params.permit(:recipient_id, :gift_id)
  end
end
