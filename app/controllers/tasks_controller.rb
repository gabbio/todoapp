class TasksController < ApplicationController
  def index
    tasks = Task.all

    render json: tasks, status: :ok
  end

  def create
    task = Task.new task_params

    if task.save
      render json: task, status: :created
    else
      render json: task.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    task = Task.find(params[:id])

    task.update(checked_at: task_params[:checked_at])
      
    head :no_content
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Couldn't find task" }, status: :not_found
  end

  private

    def task_params
      params.permit(:avatar, :description, :checked_at)
    end
end
