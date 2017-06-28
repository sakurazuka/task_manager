FROM ruby:2.4.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /task_manager
WORKDIR /task_manager
ADD Gemfile /task_manager/Gemfile
ADD Gemfile.lock /task_manager/Gemfile.lock
RUN bundle install
ADD . /task_manager
