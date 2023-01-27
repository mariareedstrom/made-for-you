class Api::MembersController < ApplicationController

  skip_before_action :authenticate_member, only: [:create, :show, :index]
  def create
    member = Member.create!(member_params)
    session[:user_id] = member.id
    render json: member, status: :created
  end

  def index
    render json: Member.all
  end

  def show
    member = Member.find(params[:id])
    render json: member, status: :ok
  end

  def update
    member = Member.find(params[:id])
    member.update(member_params)
    render json: member, status: :ok
  end

  private

  def member_params
    params.permit(:name, :email, :password, :about, :picture)
  end


end
