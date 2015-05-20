class Api::ListingsController < Api::ApiController
  def search
    @search_results = Listing.where("location = ?", params[:location])
  end

  def show
    @listing = Listing.find(params[:id])
  end

  def create
    @listing = current_user.listings.new(listing_params)

    if @listing.save
      render :show
    else
      render json: @listing.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    listing = Listing.find(params[:id])
    listing.destroy
    render json: {}
  end

  private

    def listing_params
      params.require(:listing).permit(:room_type, :price, :accommodates, :location, :description)
    end
end
