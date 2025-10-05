// globals - these variables will be visible to all functions
let canvasW = 500;
let canvasH = 500;
let radius = 50;

let numBalls = 10;
let balls = [];

let circleFill = "#FF6545";

let lastLog = 0.0;

let multipler = 1;

// start position in center
let x = canvasW / 2;
let y = canvasH / 2;

let horizontal = "right";
let vertical = "down";

// velocity
// let vX = .2; // pixels per millisecond
// let vY = .3; // pixels per millisecond

// velocity in pixels per millisecond (sign = direction)
let vX = .3; // + right, = left
let vY = .2; // + down, - up

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// print 1/s
function printOncePerSecond(msg) {
  let now = millis();
  if (now - lastLog >= 1000) {
    console.log(msg);
    lastLog = now;
  }
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // push behind page content
  createCanvas(windowWidth, windowHeight);
// create an array of balls
  for (let i = 0; i < numBalls; i++) {
    balls.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      vx: .2, // px/sec
      vy: .3, // px/sec
      radius: 25,
      color: color(random(255), random(255), random(255))
    });
  }

}


function draw() {
  // background is typically used in the draw function to clear the display window at the beginning of each frame. 
  background("#FC9883");
  // set circle fill
  fill(circleFill);
  // set stroke color
  stroke(255);
  // set stroke weight
  strokeWeight(25);

  for (let b of balls) {
    // printOncePerSecond(b);
    x = b.x;
    y = b.y;

    /* High Level Summary
     * nearestX/nearestY -> distance to nearest wall
     * proximityX,proximityY -> normalize closeness between (0 center -> 1 wall)
     * multX,multY -> multipliers for velocity
    */
    // picks which wall is closest on x axis
    let nearestX = min(x, width - x);
    // picks which wall is closest on y axis
    let nearestY = min(y, height - y);

    /*
    When the ball is at its center(vertically or horizontally), the
    "nearest distance" is as large as possible.
    For example nearest x/(width/2): center -> 1, wall -> 0
    To make the larger value occur when the ball is closet to the wall,
    sutracting it from 1. This flips it: Center -> 0, 1 -> wall 
    */
    let proximityX = 1 - nearestX / (width / 2);
    let proximityY = 1 - nearestY / (height / 2);
    /*
     * This makes a speed multiplier for the x and y axis.
     * If at center (prox=0), the multipler will equal 1.
     * If at a wall (prox=1), the multipler will be equal to 2.
     * Values in between, scale linearly from 1x -> 2x.
     * Change the second value to adjust the max multipler.
    */
    let multX = 1 + 1 * proximityX;
    let multY = 1 + 1 * proximityX;

    // move
    b.x += b.vx * deltaTime * multX; // deltaTime is ms between frames
    b.y += b.vy * deltaTime;

    // collide with right wall
    if (b.x >= width - radius) {
      b.x = width - radius; // clamp inside
      b.vx *= -1;
    }
    // collide with left wall
    if (b.x <= radius) {
      b.vx *= -1;
    }
    // collide with top wall
    if (b.y <= radius) {
      b.vy *= -1;
    }
    // collide with bottom wall
    if (b.y >= height - radius) {
      b.vy *= -1;
    }
    circle(b.x, b.y, radius * 2);


  }
}