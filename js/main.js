let squares = [];

for (i = 0; i < 10; i++) {
    let square = []
    for (l = 0; l < 20; l++) {
        square.push({
            color: "black",
            setColor: function (color) {
                this.color = color;
            },
            getColor: function () {
                return this.color;
            }
        });
    }
    squares.push(square);
}

show();

function show() {
    /*
    按照視窗高度調整寬高
    r(10*20+1*21)=height
    r=height/221
    width=height/221*111
    
    */

    var height;
    var width;

    function squareProportion(xY) {
        var squareProportion = [1, 11, 10, 20];
        //現在221是"y"111是"x"
        if (xY == "x") {
            return ((squareProportion[0] * (squareProportion[2] + 1)) + (squareProportion[1] * squareProportion[2]));
        } else if (xY == "y") {
            return ((squareProportion[0] * (squareProportion[3] + 1)) + (squareProportion[1] * squareProportion[3]));
        } else if (xY == "s1") {
            return squareProportion[0];
        } else if (xY == "s2") {
            return squareProportion[1];
        } else if (xY == "h/y") {
            return $(window).height() / ((squareProportion[0] * (squareProportion[3] + 1)) + (squareProportion[1] * squareProportion[3]));
        } else {
            return 0;
        }
    }
    // console.log(squareProportion("x"));
    // console.log(squareProportion("y"));
    // console.log(squareProportion("s1"));
    // console.log(squareProportion("s2"));
    // console.log(squareProportion("h/y"));
    // console.log(squareProportion("a"));


    $("document").ready(function () {
        height = $(window).height();
        width = (squareProportion("h/y") * squareProportion("x"));
        $(window).resize(function () {
            height = $(window).height();
            width = (squareProportion("h/y") * squareProportion("x"));
            $("canvas").attr("height", height);
            $("canvas").attr("width", width);
        });
        $("canvas").attr("height", height);
        $("canvas").attr("width", width);
    });

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var FPS = 60;

    var light = { brightness: 80, status: "Brighten" };　//"darken"
    function drow() {
        ctx.fillStyle = ("#00" + (Math.floor(light.brightness)).toString(16) + (Math.floor(light.brightness) + 30).toString(16));
        var lightSpeed = 6.5;
        if (light.status == "darken") {//一秒鐘變一次，變ＦＰＳ分之一次
            if (light.brightness < 71) {
                light.status = "Brighten";
                light.brightness += lightSpeed / FPS;
            } else {
                light.brightness -= lightSpeed / FPS;
            }
        } else {
            if (light.brightness > 99) {
                light.status = "darken";
                light.brightness -= lightSpeed / FPS;
            } else {
                light.brightness += lightSpeed / FPS;
            }
        }
        // console.log(light.brightness);
        ctx.fillRect(0, 0, width, height);

        for (i = 0; i < squares.length; i++) {
            for (l = 0; l < squares[i].length; l++) {
                ctx.fillStyle = squares[i][l].getColor();
                ctx.fillRect(
                    ((i + 1) * squareProportion("s1") * (squareProportion("h/y")) + i * squareProportion("s2") * (squareProportion("h/y"))),
                    ((l + 1) * squareProportion("s1") * (squareProportion("h/y")) + l * squareProportion("s2") * (squareProportion("h/y"))),
                    (squareProportion("s2") * (squareProportion("h/y"))),
                    (squareProportion("s2") * (squareProportion("h/y"))));
            }
        }
    }

    setInterval(drow, 1000 / FPS);
}

function play() {
    var tetrises = {
        style: [
            {
                color: "", content: [
                    [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
                    [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -2, y: 1 }],
                    [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }]
                ]
            },
            {
                color: "", content: [
                    [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: -1, y: 0 }],
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }],
                    [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }],
                    [{ x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: -1 }]
                ]
            },
            {
                color: "", content: [
                    [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }],
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }],
                    [{ x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 0 }, { x: -1, y: 0 }],
                    [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: -1 }]
                ]
            },
            {
                color: "", content: [
                    [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: -1, y: 0 }],
                    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 0 }, { x: 0, y: -1 }],
                    [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }],
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }]
                ]
            },
            {
                color: "", content: [
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }],
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }],
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }],
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }]
                ]
            },
            {
                color: "", content: [
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }],
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }],
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }],
                    [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 0 }]
                ]
            }
        ]
    }
}
