canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
var prevRotationX = canvas.width / 2;
var prevRotationY = canvas.height / 2;
ctx.canvas.width = $("canvas").width();
ctx.canvas.height = $("canvas").height();

ctx.translate(0.5, 0.5);

gsap.registerPlugin(Draggable);

gsap.set("#vertical", { transformOrigin: "50% 50%" });
gsap.set("#horizontal", { transformOrigin: "50% 50%" });

const vertical = Draggable.create("#vertical", {
  type: "rotation",
  inertia: true,
  onDrag: updateDirectionsVertical,
});

const horizontal = Draggable.create("#horizontal", {
  type: "rotation",
  inertia: true,
  onDrag: updateDirectionsHorizontal,
});

function updateDirectionsVertical() {
  setPosition(0, prevRotationY > this.rotation ? +1 : -1);
  prevRotationY = this.rotation;
  draw();
}

function updateDirectionsHorizontal() {
  setPosition(prevRotationX > this.rotation ? -1 : +1, 0);
  prevRotationX = this.rotation;
  draw();
}

console.log($("canvas").width());
console.log($("canvas").height());

ctx.fillRect(canvas.width / 2, canvas.height / 2, 2, 2);

var pos = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener("resize", resize);

// new position from mouse event
function setPosition(x, y) {
  console.log(pos.x + ";" + pos.y);
  if (pos.x + x < canvas.width && pos.x + x > 0) pos.x += x;
  if (pos.y + y < canvas.height && pos.y + y > 0) pos.y += y;
}

// resize canvas
function resize() {
  ctx.canvas.width = $(".canvas").width();
  ctx.canvas.height = $(".canvas").height();
}

function draw(e) {
  ctx.beginPath();

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#000000";

  ctx.moveTo(pos.x, pos.y); // from
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!
}
