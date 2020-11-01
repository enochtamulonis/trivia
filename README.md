##### Assumptions for app
  - A round of trivia has 10 Questions
  - All questions are multiple-choice questions
  - Data for questions are provided in a local JSON file.
  - There is real time updates with stimulusjs.
  - The score will increment depending on if your answer is correct.
  - Also the color of the number and the button will change if your answer is correct.
  - A user can view questions.
  - Questions with their multiple choice options must be displayed one at a time.
  - Questions should not repeat in a round.
  - A user can select only 1 answer out of the 4 possible answers.
  - The correct answer must be revealed after a user has submitted their answer
  - A user can see the score they received at the end of the round

##### Setup Prerequisites

The setup steps expect the following tools to be installed on the system.

- Github
- Ruby [2.7.1](https://github.com/ruby/ruby)
- Rails [6.0.3.4](https://github.com/rails/rails)

##### 1. Check out the repository

```bash
git clone https://github.com/yunggindigo/trivia.git
```

##### 2. Bundle and create database
  ```bash
    bundle
  ```
  ```bash
    rails db:create
  ```

##### 3. Install the yarn packages for stimulusjs

```ruby
yarn install --check-files
```
##### 4. Start the Rails server

You can start the rails server using the command given below.

```ruby
rails s
```

And now you can visit the site with the URL http://localhost:3000
