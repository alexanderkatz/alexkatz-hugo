let diameter = 200;
let circleFill = "rgba(255, 101, 69, 1)";
let numBalls = 10;
let balls = [];

let lastLog = 0.0;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  diameter = windowWidth/10;

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
  diameter = windowWidth/10;
  console.log("//setup//"+diameter);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // push behind page content

  /* Create an array of balls
   * (x, y) - random coordinates
   * (vx, hx) - calculate velocity by multiplying 1 or -1 by a random px/sec
   */
  for (let i = 0; i < numBalls; i++) {
    balls.push({
      x: random(diameter/2, width - diameter/2),
      y: random(diameter/2, height - diameter/2),
      vx: random([-1, 1]) * random(60, 150), // px/sec
      vy: random([-1, 1]) * random(60, 150), // px/sec
      diamater: diameter,
    });
    // console.log(balls[i]);
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
  strokeWeight(0);

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
    subtracting it from 1. This flips it: Center -> 0, 1 -> wall 
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
    let multX = 1.5 + pow(proximityX, 3); // slower increase near center, faster near wall

    let multY = 1.5 + pow(proximityY, 3);

    // move
    let dt = deltaTime / 1000.0; // convert ms to seconds for velocity in px/sec
    b.x += b.vx * dt * multX; // deltaTime is ms between frames
    b.y += b.vy * dt * multY;

    // collide with right wall
    if (b.x >= width - diameter/2) {
      b.x = width - diameter/2; // clamp inside
      b.vx *= -1;
    }
    // collide with left wall
    if (b.x <= diameter/2) {
      b.x = diameter/2; // clamp inside
      b.vx *= -1;
    }
    // collide with top wall
    if (b.y <= diameter/2) {
      b.y = diameter/2; // clamp inside
      b.vy *= -1;
    }
    // collide with bottom wall
    if (b.y >= height - diameter/2) {
      b.y = height - diameter/2; // clamp inside
      b.vy *= -1;
    }

    // draw the circle
    circle(b.x, b.y, diameter);
  }
}
