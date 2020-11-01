class PagesController < ApplicationController
  def home
    @questions = JSON.parse(File.read('app/javascript/trivia_questions.json')).to_json
  end
end
