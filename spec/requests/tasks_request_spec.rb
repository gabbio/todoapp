require 'rails_helper'

RSpec.describe "Tasks", type: :request do

  let!(:tasks) { create_list(:task, 10) }
  let(:id) { tasks.first.id }

  describe "GET /tasks" do
    before do
      headers = { "ACCEPT" => "application/json" }
      get tasks_path
    end

    it "returns content type application/json" do
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end

    let(:returned_tasks) { JSON.parse response.body }

    it "returns tasks" do
      expect(response.body).not_to be_empty
      expect(returned_tasks.size).to eq(10)
    end
  end

  describe "POST /tasks" do
    let(:valid_task_params) { { avatar: 'http://www.gravatar.com/avatar?d=mp', description: 'Just for test' } }

    context "when the request is valid" do
      before { post tasks_path, params: valid_task_params }

      it "creates a task" do
        expect(response.body).to match(/Just for test/)
      end

      it "returns content type application/json" do
        expect(response.content_type).to eq("application/json; charset=utf-8")
      end

      it "returns status code 201" do
        expect(response).to have_http_status(201)
      end
    end

    context "when the request is not valid" do
      before { post tasks_path, params: {} }

      it "returns status code 422" do
        expect(response).to have_http_status(422)
      end

      it "returns a failure message" do
        expect(response.body).to match(/Avatar can't be blank/)
        expect(response.body).to match(/Description can't be blank/)
      end
    end
  end

  describe "PUT /tasks/:id" do
    before do
      freeze_time
      put task_path(id), params: valid_task_params
    end

    let(:checked_at) { Time.now }
    let(:valid_task_params) { { checked_at: checked_at } }

    after { travel_back }

    context "when the task exists" do

      it "returns an empty response" do
        expect(response.body).to be_empty
      end

      it "sets the task as checked" do
        updated_task = Task.find(id)
        expect(updated_task.checked_at).to eq(checked_at)
      end

      it "returns status code 204" do
        expect(response).to have_http_status(204)
      end
    end

    context "when the task does not exist" do
      let(:id) { 0 }

      it "returns status code 404" do
        expect(response).to have_http_status(404)
      end

      it "returns not found message" do
        expect(response.body).to match(/Couldn't find task/)
      end
    end
  end

end
