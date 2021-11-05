exports.push = function (content, q) {
    global.channel.assertQueue(q, {
      durable: true
    });
    global.channel.sendToQueue(q, Buffer.from(JSON.stringify(content)), {
      persistent: true
    });
  }