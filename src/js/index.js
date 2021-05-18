import initContactForm from "./modules/contactForm";
import initToggleButton from "./modules/toggleMenu";

document.addEventListener('readystatechange', (event) => {
  if (document.readyState == 'complete') {
    console.log({event});
    initContactForm('contactForm');
    initToggleButton();
  }
})
