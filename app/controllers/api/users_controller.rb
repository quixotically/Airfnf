class Api::UsersController < Api::ApiController
  wrap_parameters false

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :email, :password, :avatar)
    end
end
