class Api::GiftsController < ApplicationController
  before_action :set_gift, only: [:update, :destroy]
  skip_before_action :authenticate_member, only: [:show, :index]

  def create
    gift = current_member.gifts.create!(gift_params)
    render json: gift, status: :created
  end

  def index
    render json: Gift.all, status: :ok
  end

  def show
    gift = Gift.find_by(id: params[:id])
    render json: gift, status: :ok
  end

  def update
    @gift.update!(gift_params)
    render json: @gift, status: :ok
  end

  def destroy
    @gift.destroy
    head :no_content
  end

  private

  def gift_params
    params.permit(:name, :description, :difficulty, :picture_url, :recipient_id)
  end

  def set_gift
    @gift = current_member.gifts.find_by(id: params[:id])
  end

end
