// linea exterior dibujandose constantemente
	var lineDrawing = anime({
  targets: '#lineDrawing .lines path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 4000,
  delay: 0,
  direction: 'alternate',
  loop: false
});
var sectorA = anime({
targets: '#sectorA .lines path',
strokeDashoffset: [anime.setDashoffset, 0],
easing: 'easeInOutSine',
duration: 4000,
delay: 0,
direction: 'alternate',
loop: true
});
var defectuosoA = anime({
targets: '#defectuosoA .lines path',
strokeDashoffset: [anime.setDashoffset, 0],
easing: 'easeInOutSine',
duration: 3500,
delay: 0,
direction: 'alternate',
loop: true
});
//destruir logo al darle click
var destruir = function() {
  anime({
    targets: 'g',
    translateX: ['-.25rem', '.25rem'],
    duration: 50,    
    direction: 'alternate',
    loop: 10,
    easing: 'easeOutBack',
  });
  anime({
    targets: 'path',
    translateX: function() { return anime.random(-10, 10) + 'rem'; },
    translateY: function() { return anime.random(-3, 5) + 'rem'; },
    scale: function() { return anime.random(10,20) / 10; },
    rotate: function() { return anime.random(-360,360); },
    duration: function() { return anime.random(800,1200); },
    easing: 'easeInOutQuart',
    direction: 'alternate',
    delay: 400,

  });
}

// montaje del logo

var animacionLogo = anime.timeline({
  direction: 'alternate',
  loop: false
});

animacionLogo.add([
  {
    targets: '#sectorA path',
    translateX: [-2000, 0],
    opacity: {
      value: 1,
      duration: 100
    },
    fill: '#FFF',
    delay: (el, i) => 600 + (i * 75),
    duration: 400,
    easing: 'easeOutExpo',
    offset: 0
  }, {
    targets: '#defectuosoA path',
    opacity: [0, 1],
    fill: '#FFF',
    easing: 'easeOutExpo',
    duration: 500,
    delay: (t, i) => 1400 + (anime.random(0, 470)),
    offset: 0
  }, {
    targets: '.logo',
    translateX: (target) => {
      let x = 1200;
      let translate;
      return [translate, 0];
    },
    translateY: (target) => {
      let y = 1200;
      let translate;
      return [translate, 0];
    },
    scale: {
      value: [6, 1],
      duration: 500,
    },
    stroke: '#000',
    opacity: {
      value: [0, 1],
      duration: 100,
    },
    delay: (t, i) => (i * 25),
    duration: 500,
    easing: 'easeOutQuart',
    offset: 0
  }
]);


var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cH;
var cW;
var bgColor = "#FF6138";
var animations = [];
var circles = [];

var colorPicker = (function() {
  var caracter = "ABCDEF0123456789";
  var colors = [];
  var colorHX;
  for(j = 0; j < 100; j++){
    colorHX = "#";
    for (i = 0; i < 6; i++){
      var x = Math.floor((Math.random() * 10));
      colorHX += caracter.charAt(x);
    }
    colors.push(colorHX);
  }
  var index = 0;
  function next() {
    index = index++ < colors.length-1 ? index : 0;
    return colors[index];
  }
  function current() {
    return colors[index]
  }
  return {
    next: next,
    current: current
  }
})();

function removeAnimation(animation) {
  var index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
}

function calcPageFillRadius(x, y) {
  var l = Math.max(x - 0, cW - x);
  var h = Math.max(y - 0, cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

function addClickListeners() {
  document.addEventListener("touchstart", handleEvent);
  document.addEventListener("mousedown", handleEvent);
};

function handleEvent(e) {
    if (e.touches) { 
      e.preventDefault();
      e = e.touches[0];
    }
    var currentColor = colorPicker.current();
    var nextColor = colorPicker.next();
    var targetR = calcPageFillRadius(e.pageX, e.pageY);
    var rippleSize = Math.min(200, (cW * .4));
    var minCoverDuration = 750;
    
    var pageFill = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: nextColor
    });
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration:  Math.max(targetR / 2 , minCoverDuration ),
      easing: "easeOutQuart",
      complete: function(){
        bgColor = pageFill.fill;
        removeAnimation(fillAnimation);
      }
    });
    
    var ripple = new Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: currentColor,
      stroke: {
        width: 3,
        color: currentColor
      },
      opacity: 1
    });
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 900,
      complete: removeAnimation
    });
    
    var particles = [];
    for (var i=0; i<32; i++) {
      var particle = new Circle({
        x: e.pageX,
        y: e.pageY,
        fill: currentColor,
        r: anime.random(24, 48)
      })
      particles.push(particle);
    }
    var particlesAnimation = anime({
      targets: particles,
      x: function(particle){
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function(particle){
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1000,1300),
      complete: removeAnimation
    });
    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
}

function extend(a, b){
  for(var key in b) {
    if(b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

var Circle = function(opts) {
  extend(this, opts);
}

Circle.prototype.draw = function() {
  ctx.globalAlpha = this.opacity || 1;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    ctx.strokeStyle = this.stroke.color;
    ctx.lineWidth = this.stroke.width;
    ctx.stroke();
  }
  if (this.fill) {
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
  ctx.closePath();
  ctx.globalAlpha = 1;
}

var animate = anime({
  duration: Infinity,
  update: function() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cW, cH);
    animations.forEach(function(anim) {
      anim.animatables.forEach(function(animatable) {
        animatable.target.draw();
      });
    });
  }
});

var resizeCanvas = function() {
  cW = window.innerWidth;
  cH = window.innerHeight;
  c.width = cW * devicePixelRatio;
  c.height = cH * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
};

(function init() {
  resizeCanvas();
  if (window.CP) {
    // CodePen's loop detection was causin' problems
    // and I have no idea why, so...
    window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
  }
  window.addEventListener("resize", resizeCanvas);
  addClickListeners();
  if (!!window.location.pathname.match(/fullcpgrid/)) {
    startFauxClicking();
  }
  handleInactiveUser();
})();

function handleInactiveUser() {
  var inactive = setTimeout(function(){
    fauxClick(cW/2, cH/2);
  }, 2000);
  
  function clearInactiveTimeout() {
    clearTimeout(inactive);
    document.removeEventListener("mousedown", clearInactiveTimeout);
    document.removeEventListener("touchstart", clearInactiveTimeout);
  }
  
  document.addEventListener("mousedown", clearInactiveTimeout);
  document.addEventListener("touchstart", clearInactiveTimeout);
}

function startFauxClicking() {
  setTimeout(function(){
    fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
    startFauxClicking();
  }, anime.random(200, 900));
}

function fauxClick(x, y) {
  var fauxClick = new Event("mousedown");
  fauxClick.pageX = x;
  fauxClick.pageY = y;
  document.dispatchEvent(fauxClick);
}