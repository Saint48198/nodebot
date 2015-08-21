var SPARK_TOKEN = "ef5a5a631133977f6c87466234e7fec6e5bf76c9";
var SPARK_DEVICE_ID = "55ff6e065075555329311787";

var five = require("johnny-five");
var Spark = require("spark-io");
var board = new five.Board({
    io: new Spark({
        token: SPARK_TOKEN,
        deviceId: SPARK_DEVICE_ID
    })
});

board.on("ready", function() {
    var led = new five.Led("D0");
    console.log(led);
    led.blink();
});