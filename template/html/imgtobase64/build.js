let _this = this,
canvas = document.createElement('canvas'),
cxt = canvas.getContext("2d"),
qr = new Image(),
img = new Image(),
showImg = function () {
  try {
    document.querySelector('.alert img').src = canvas.toDataURL("image/png");
    _this.alertBox.show = true;
  } catch (e) {
    alert(e);
  }
};
canvas.width = 1000;
canvas.height = 1000;
cxt.fillStyle = '#fff';
cxt.fillRect(0, 0, 1000, 1000);
qr.style.width = '300px';
cxt.drawImage(qr, 600, 700, 300, 300);
img.src = "./static/img/header.jpg";
qr.src = _this.qr;
img.style.width = canvas.width + 'px';
img.onload = function (res) {
  cxt.drawImage(img, 0, 0, 1000, 700);
  showImg();
};
qr.onload = function () {
  cxt.drawImage(qr, 600, 700, 300, 300);
  alert(0);
  showImg();
};


cxt.textBaseline = "middle";
cxt.fillStyle = '#000000';

function fillCanvasText(linehight, text, width, sx, sy, fz) {
  let fontSize = fz || linehight,
  lh = linehight,
  fontNum = parseInt(width / fontSize),
  newText = text;
  cxt.font = (fontSize) + "px s";
  for (let i = 0; ; i++) {
    let a = newText.substr(0, fontNum);
    newText = newText.substr(fontNum);
    cxt.fillText(a, sx + fontSize, sy + i * lh, width);
    if (!newText) break;
  }
}

fillCanvasText(50, '我写了一行文字，要很长很长很长很长很长很长时代峰峻奥ID金佛阿斯顿发打的费卢萨卡大家发枫',
  500, 0, 780, 40);

