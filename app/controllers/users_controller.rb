class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    # @users = User.all

    # render json: @users

    ret = {
      code: 200,
      data: {
        pref: "兵庫県(test)",
        address: "神戸市中央区港島中町(test)",
        city: "神戸市中央区(test)",
        town: "港島中町(test)",
        fullAddress: "兵庫県神戸市中央区港島中町(test)",
      }
    }
    p ret
    render json: ret, callback: ERB::Util.html_escape(params[:callback])
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.fetch(:user, {})
    end
end
