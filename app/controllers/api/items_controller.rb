class Api::ItemsController < ApplicationController
  before_action :set_item, except: [:index, :create]
  def index
    render json: Item.all, status: :ok
  end

  def create
    item = Item.create(item_params)
    render json: item, status: :created
  end

  def show
    render json: @item, status: :ok
  end

  def update
    @item.update(item_params)
    render json: @item, status: :ok
  end

  def destroy
    @item.destroy
    head :no_content
  end

  private

  def item_params
    params.permit(:gift_id, :name, :quantity, :unit)
  end

  def set_item
    @item = Item.find_by(id: params[:id])
  end


end
