// Importamos las librerías necesarias
import "./style.css"
import gsap from "gsap"; // Animaciones
import ScrollTrigger from "gsap/ScrollTrigger"; // Plugin para animaciones con scroll
import LocomotiveScroll from "locomotive-scroll"; // Scroll suave
import Lenis from "@studio-freight/lenis"; // Más suavidad en el desplazamiento

// 🟢 1. Configurar Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true
  });
  
  // Detecta el desplazamiento y cambia la opacidad
scroll.on('scroll', (args) => {
const section2 = document.getElementById('section2');

// Aquí ajustamos la opacidad dependiendo del desplazamiento
const opacityValue = 1 - args.scroll.y / 1000;  // Ajusta la fórmula según lo necesites
section2.style.opacity = opacityValue; // Aplica la nueva opacidad
});

// 🟢 2. Configurar Lenis para mejorar la suavidad del scroll
const lenis = new Lenis({
    lerp: 0.1, // Define la suavidad del scroll (entre 0 y 1, donde 0.1 es muy fluido)
    smooth: true
});

// Función para mantener Lenis en ejecución
function raf(time) {
    lenis.raf(time); // Renderiza el scroll en cada frame
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf); // Iniciamos el loop de animación

// 🟢 3. Configurar GSAP con Locomotive Scroll
gsap.registerPlugin(ScrollTrigger);

// Sincronizar Locomotive Scroll con GSAP ScrollTrigger
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("#smooth-content", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#smooth-content").style.transform ? "transform" : "fixed"
});

// Actualizar GSAP y Locomotive cuando se haga un cambio
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
