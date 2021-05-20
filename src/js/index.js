import initContactForm from "./modules/contactForm";
import initToggleButton from "./modules/toggleMenu";
import getAllSections from './modules/intersectionChanger'

document.addEventListener('readystatechange', (event) => {
  if (document.readyState == 'complete') {
    console.log({event});
    initContactForm('contactForm');
    initToggleButton();
    getAllSections();
  }
})
