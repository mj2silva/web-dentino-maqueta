
const submitForm = async (values) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(values)
    }, 2000)
  })
}

const initContactForm = (contactFormId = 'contactForm') => {
  const contactForm = document.getElementById(contactFormId);
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const successMessage = document.createElement('div');
    successMessage.classList.add('spinner');
    const parent = contactForm.parentNode;
    parent.replaceChild(successMessage, contactForm);
    const values = [ ...event.target ].reduce((prev, curr) => {
      return { ...prev, [curr.name]: curr.value };
    }, {});
    const values2 = await submitForm(values);
    parent.replaceChild(contactForm, successMessage);
    console.log({ values2 });
  });
}

export default initContactForm;
