var five = require("johnny-five");
var board = new five.Board({
    port: "/dev/cu.3rc-DevB"
});

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

board.on("ready", function() {
    this.pinMode(13, this.MODES.OUTPUT);

    var motor1;
    var motor2;
    var configs = five.Motor.SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_3;

    motor1 = new five.Motor(configs.A);
    motor2 = new five.Motor(configs.B);

    //// Create a new `ping` hardware instance.
    //var ping = new five.Ping(15);
    //ping.on("change", function() {
    //    console.log("Object is " + this.in + " inches away");
    //});


    console.log("Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.");

    stdin.on("keypress", function(chunk, key) {
        console.log(key);
        if (!key) return;

        switch (key.name) {
            case 'up':
            case 'w':
                // set the motor going forward full speed
                motor1.forward(175);
                motor2.forward(175);
                break;

            case 'down':
            case 's':
                motor1.reverse(125);
                motor2.reverse(125);
                break;

            case 'left':
            case 'a':
                motor1.forward(175);
                motor2.reverse(125);
                break;

            case 'right':
            case 'd':
                motor2.forward(175);
                motor1.reverse(125);
                break;

            case 'space':
            case 'escape':
                motor1.stop();
                motor2.stop();
                break;
        }
    });
});