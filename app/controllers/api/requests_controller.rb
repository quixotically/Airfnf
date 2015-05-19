class Api::RequestsController < Api::ApiController
  # before_action :require_ownership!, only: [:approve, :deny]

  def approve
    current_request.approve!
    render json: {}
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

    # def current_listing
    #   current_request.listing
    # end
    #
    # def require_ownership!
    #   return if current_user.owns_listing?(current_listing)
    #   render json: { message: "You do not own this listing!" }
    # end

    def request_params
      params.require(:request).permit(:listing_id, :start_date, :end_date)
    end
end
