#!/bin/sh
## Install script for proof-of-concept Walabot Alarm Clock

# walabot 1.1.6 (beta) - can't get it to detect targets, use non-beta version
# you must accept the eula (tab-enter, enter)
# curl -L https://walabot.com/WalabotInstaller/Latest/walabot_maker_1.1.6.deb -o walabot_maker_1.1.6.deb
# sudo apt install -y ./walabot_maker_1.1.6.deb
# pip install WalabotAPI --no-index --find-links="/usr/share/walabot/python/"

# walabot-maker 1.0.34
# you must accept the eula (tab-enter, left arrow, enter)
curl -L https://walabot.com/WalabotInstaller/Latest/walabot_maker_1.0.34_raspberry_arm32.deb -o /tmp/walabot_maker_1.0.34.deb
sudo apt install -y /tmp/walabot_maker_1.0.34.deb
pip install WalabotAPI --no-index --find-links="/usr/share/walabot/python/"

# node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# rabbitMQ
curl -s https://packagecloud.io/install/repositories/rabbitmq/rabbitmq-server/script.deb.sh | sudo bash
sudo apt-get install -y rabbitmq-server

# pip
sudo apt-get install -y python-pip

# RabbitMQ Python client
pip install pika

# update rabbitMQ settings
sudo rabbitmqctl add_user pi raspberry
sudo rabbitmqctl set_permissions -p / pi ".*" ".*" ".*"
sudo rabbitmqctl set_policy my-pol "hello" '{"max-length":1}' --apply-to queues
sudo rabbitmqctl start_app
# ngrok
curl -L  https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm.zip -o /tmp/ngrok.zip
unzip /tmp/ngrok.zip

# github
sudo apt-get install -y git

# clone this project and run
git clone https://github.com/imjosh/wala-alarm-poc.git
cd wala-alarm-poc
git checkout test_install
# npm install -g --save pm2
npm update
npm install
npm start &

/usr/bin/python ./walabot/app.py

# todo start node and python automatically as services