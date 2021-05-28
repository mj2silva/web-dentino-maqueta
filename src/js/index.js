import initContactForm from "./modules/contactForm";
import initToggleButton from "./modules/toggleMenu";
import getAllSections from './modules/intersectionChanger'
import Slider from "./modules/Slider";

const stories = [
  {
    message: 'Feliz con la atención personalizada y extremos cuidados en mi tratamiento gracias al uso de los protocolos de bioseguridad en cada intervención clínica.',
    author: 'Sebastian Martinez'
  },
  {
    message: 'Estoy muy satisfecha con el diagnóstico y tratamiento dental que llevo en Dentino, he vuelto a sonreír con mucha confianza.',
    author: 'Eliana Caro'
  },
  {
    message: 'En Dentino encontré diversos profesionales especializados en cada área, mi problema dental me generaba muchas complicaciones pero los doctores supieron cómo ayudarme y estoy muy feliz.',
    author: 'Sergio Mendez'
  },
];

document.addEventListener('readystatechange', () => {
  if (document.readyState == 'complete') {
    initContactForm('contactForm');
    initToggleButton();
    getAllSections();
    const slider = new Slider(stories);
    slider.initSlider();
  }
})
