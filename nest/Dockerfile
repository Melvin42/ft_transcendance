FROM debian:buster

WORKDIR /home

RUN apt-get update && apt-get upgrade -y \
	vim \
	curl

RUN curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh

RUN bash nodesource_setup.sh

RUN apt install nodejs

RUN npm i -g @nestjs/cli

EXPOSE 8000
