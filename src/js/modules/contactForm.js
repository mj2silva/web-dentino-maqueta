import { firestore, toFirebaseTimestamp } from "./firebase";

const submitForm = async (values) => {
  const { email, message, names, phone } = values;
  const contactDbRef = firestore.collection('consultasRecibidas');
  const consultation = contactDbRef.doc();
  await consultation.set({
    email, message, names, phone, fecha: toFirebaseTimestamp(new Date())
  });
}

const initContactForm = (contactFormId = 'contactForm') => {
  const contactForm = document.getElementById(contactFormId);
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    const successMessage = document.createElement('div');
    successMessage.innerHTML = '<i class="fas fa-check-circle"></i>';
    successMessage.innerHTML += '<div class="success-message__message">Se ha enviado tu consulta, pronto nos pondremos en contacto contigo</div>';
    successMessage.classList.add('success-message');
    const parent = contactForm.parentNode;
    parent.replaceChild(spinner, contactForm);
    const values = [ ...event.target ].reduce((prev, curr) => {
      return { ...prev, [curr.name]: curr.value };
    }, {});
    try {
      await submitForm(values);
      parent.replaceChild(successMessage, spinner);
    } catch(err) {
      alert('Error al enviar el formulario');
      console.log({ err })
      parent.replaceChild(contactForm, spinner);
    }
  });
}

export default initContactForm;
