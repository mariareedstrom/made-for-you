class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_member

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

  private

  def record_not_found(errors)
    render json: errors.message, status: :not_found
  end

  def invalid_record(invalid)
    render json: invalid.record.errors.full_messages, status: :unprocessable_entity
  end

  def current_member
    @current_member ||= Member.find_by_id(session[:user_id])
  end

  def authenticate_member
    render json: { error: "Not authorized" }, status: :unauthorized unless current_member
  end
end
