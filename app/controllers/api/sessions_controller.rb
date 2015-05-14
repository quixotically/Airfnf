class Api::SessionsController < Api::ApiController
  def show
    if !current_user
      render json: {}
    end
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user
      sign_in!(user)
      render :show
    else
      head :unprocessable_entity
    end
  end

  def destroy
    sign_out!
    render json: {}
  end
end
