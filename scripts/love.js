window.addEventListener('load', () => {
  // Ejecutamos la función que arma la línea de tiempo principal
  initAnimation();
});

// Insertar elementos de corazones pequeños
const total = 13;
const container = document.querySelector('.smallHearts');
for (var i = 0; i < total; i++) {
  const span = document.createElement('span');
  span.className = 'smallHeart';
  container.appendChild(span);
}

// Creamos una única línea de tiempo maestra
const mainTl = gsap.timeline({
  onComplete: () => {
    // Cuando TODO termine, esperamos 2 segundos y redirigimos
    gsap.delayedCall(2, () => {
      window.location.href = "carta.html";
    });
  }
});

function initAnimation() {
  // 1. Animación del texto
  mainTl.set('.s', { opacity: 1 })
    .from('.s', {
      duration: 0.4,
      delay: 3, // Retraso inicial
      ease: 'power1.inOut',
      scale: 0,
      y: 40,
      stagger: 0.04
    });

  // 2. Animación de los corazones (se añade a la misma mainTl)
  // Usamos "<" para que intente iniciar junto con la anterior o ajustamos el tiempo
  mainTl.set('.smallHeart', { opacity: 1 }, "-=0.5") 
    .fromTo('.smallHeart', 
      {
        scale: 0,
        rotate: '-=25',
        y: '+=70'
      },
      {
        duration: 3.4,
        delay: 0.6, // Ajustado para que combine con el delay global
        ease: 'slow.out',
        rotate: 'random(-20, 20)',
        scale: 'random(0.5, 1.5)',
        y: '0',
        x: Math.PI * 4,
        modifiers: {
          x: function (x) {
            return Math.sin(parseFloat(x)) * 15 + 'px';
          }
        },
        stagger: {
          each: 0.08,
          from: 'random'
        }
      }, "-=0.4"); // El "-=0.4" hace que empiece un poco antes de que termine el texto
}