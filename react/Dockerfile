FROM debian:buster

MAINTAINER melperri <melperri@student.42.fr>

WORKDIR /home

RUN apt-get update && apt-get install -y \
	vim \
	curl

RUN curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh

RUN bash nodesource_setup.sh

RUN apt install nodejs

EXPOSE 3000
