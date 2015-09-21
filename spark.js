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

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function() {
    var motor1;
    var motor2;
    var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;

    motor1 = new five.Motor(configs.M1);
    motor2 = new five.Motor(configs.M3);

    console.log("Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.");

    stdin.on("keypress", function(chunk, key) {

        if (!key) return;

        switch (key.name) {
            case 'up':
            case 'w':
                // set the motor going forward full speed
                motor1.forward(255);
                motor2.forward(255);
                break;

            case 'down':
            case 's':
                motor1.reverse(175);
                motor2.reverse(175);
                break;

            case 'left':
            case 'a':
                motor1.forward(255);
                motor2.reverse(175);
                break;

            case 'right':
            case 'd':
                motor2.forward(255);
                motor1.reverse(175);
                break;

            case 'space':
            case 'escape':
                motor1.stop();
                motor2.stop();
                break;
        }
    });

});