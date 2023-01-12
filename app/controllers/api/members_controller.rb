class Api::MembersController < ApplicationController

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
    render json: member
  end

  private

  def member_params
    params.permit(:name, :email, :password, :about, :links)
  end


end
