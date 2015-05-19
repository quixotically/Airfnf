class Api::RequestsController < Api::ApiController
  def approve
    current_request.approve!
  end

  def deny
    current_request.deny!
  end

  def create
    @request = current_user.requests.new(request_params)

    if @request.save
      render :show
    else
      render json: @request.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @request = Request.find(params[:id])
  end

  private

    def current_request
      @request ||= Request.includes(:listing).find(params[:id])
    end

    def current_listing
      current_request.listing
    end

    def request_params
      params.require(:request).permit(:listing_id, :start_date, :end_date)
    end
end
