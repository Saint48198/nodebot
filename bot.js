var five = require("johnny-five");
var board = new five.Board();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function() {
    var motor1;
    var motor2;
    var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;

    motor1 = new five.Motor(configs.M1);
    motor2 = new five.Motor(configs.M2);

    //// Create a new `ping` hardware instance.
    //var ping = new five.Ping(15);
    //ping.on("change", function() {
    //    console.log("Object is " + this.in + " inches away");
    //});

    new five.Servo({
        pin: 10,
        range: [45, 135]
    });

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