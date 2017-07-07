let canvas = document.getElementById('canvas');
let angle = 0;
let ctx = canvas.getContext('2d');
let shouldAngleIncrement = true;

let animate = () => {
  render();
  angle += shouldAngleIncrement ? 0.1 : -0.1;

  if (angle < 0 || angle > 180) {
    shouldAngleIncrement = !shouldAngleIncrement;
  }

  requestAnimationFrame(animate);
}

function render() {
  let width = canvas.width;
  let height = canvas.height;

  ctx.moveTo(width, height);
  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  ctx.fillStyle = 'grey';
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'white';

  let length = 150
  let fromX = width / 2;
  let fromY = height;
  let toX = width / 2;
  let toY = height - length;

  drawLine(fromX, fromY, toX, toY);
  branch(toX, toY, ctx, length, -angle);
  branch(toX, toY, ctx, length, angle + 180);

  ctx.stroke();
}

function branch(fromX, fromY, ctx, length, newAngle) {
  let toX = length * Math.cos(newAngle * Math.PI / 180) + fromX;
  let toY = length * Math.sin(newAngle * Math.PI / 180) + fromY;
  if(length > 4) {
    drawLine(fromX, fromY, toX, toY);
    let newLength = length * 0.67;
    branch(toX, toY, ctx, newLength, newAngle + angle);
    branch(toX, toY, ctx, newLength, newAngle - angle);
  }
}

function drawLine(fromX, fromY, toX, toY) {
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
}

requestAnimationFrame(animate);
