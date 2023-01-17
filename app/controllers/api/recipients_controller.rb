class Api::RecipientsController < ApplicationController
  skip_before_action :authenticate_member, only: [:show, :index]
  before_action :set_recipient, only: [:show, :update, :destroy]
  def create
    recipient = current_member.recipients.create!(recipient_parms)
    render json: recipient, status: :created
  end

  def index
    render json: Recipient.all, status: :ok
  end

  def show
    render json: @recipient, status: :ok
  end

  def update
    @recipient.update!(recipient_parms)
    render json: @recipient, status: :ok
  end

  def destroy
    @recipient.destroy
    head :no_content
  end

  private

  def recipient_parms
    params.permit(:name, :notes, :gift_id)
  end

  def set_recipient
    @recipient = current_member.recipients.find_by(id: params[:id])
  end
end
