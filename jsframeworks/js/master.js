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


