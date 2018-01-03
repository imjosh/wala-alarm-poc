const express = require('express');
const amqp = require('amqplib/callback_api');

const walabot = express.Router();

walabot.get('/isAwake', (req, res) => {
  // check RabbitMQ message queue to see if user is awake
  amqp.connect('amqp://pi:raspberry@raspberrypi.local', (err, conn) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }

    conn.createChannel((error, ch) => {
      if (error) {
        console.error('error:$ {error}');
        res.send(error);
        return;
      }

      const q = 'hello';
      ch.assertQueue(q, { durable: false });
      console.log(' [*] Waiting for messages in \'%s\' queue.', q);
      ch.consume(
        q,
        msg => {
          console.log(' [x] Received %s', msg.content.toString());
          ch.close();
          conn.close();
          res.send(msg.content.toString());
        },
        { noAck: true }
      );
    });
  });
});

module.exports = { walabot };
