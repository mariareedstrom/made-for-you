class Api::SessionsController < ApplicationController
  def create
    user = Member.find_by_email(params[:email])
    if  user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def destroy
    if current_member
      session.delete :user_id
      head :no_content
    else
      authenticate_member
    end
  end

  def show
    if current_member
      user = current_member
      render json: user, status: :ok
    else
      authenticate_member
    end
  end
end
