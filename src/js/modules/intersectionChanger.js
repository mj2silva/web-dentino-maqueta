const toggleLinkClassList = (entry, activeClassName, treshold = 0.25) => {
  const switchEntryClassName = (linkId) => {
    const link = document.getElementById(linkId);
    console.log({ entry, link })
    if (entry.intersectionRatio >= treshold) link.classList.add(activeClassName);
    else link.classList.remove(activeClassName);
  }
  const removeEntriesClassName = (linkId) => {
    const link = document.getElementById(linkId);
    link.classList.remove(activeClassName);
  }
  const id = entry.target.id;
  switch (id) {
    case 'aboutUs':
      switchEntryClassName('linknosotros');
      removeEntriesClassName('linkespecialidades');
      removeEntriesClassName('linksedes');
      removeEntriesClassName('linktestimonios');
      removeEntriesClassName('linkcontacto');
      break;
    case 'specialties':
      switchEntryClassName('linkespecialidades');
      removeEntriesClassName('linknosotros');
      removeEntriesClassName('linksedes');
      removeEntriesClassName('linktestimonios');
      removeEntriesClassName('linkcontacto');
      break;
    case 'branches':
      switchEntryClassName('linksedes');
      removeEntriesClassName('linkespecialidades');
      removeEntriesClassName('linknosotros');
      removeEntriesClassName('linktestimonios');
      removeEntriesClassName('linkcontacto');
      break;
    case 'customerStories':
      switchEntryClassName('linktestimonios');
      removeEntriesClassName('linkespecialidades');
      removeEntriesClassName('linksedes');
      removeEntriesClassName('linknosotros');
      removeEntriesClassName('linkcontacto');
      break;
    case 'contactFormSection':
      switchEntryClassName('linkcontacto');
      removeEntriesClassName('linkespecialidades');
      removeEntriesClassName('linksedes');
      removeEntriesClassName('linktestimonios');
      removeEntriesClassName('linknosotros');
      break;
    default:
      break;
  }
}

const getAllSections = () => {
  const aboutUsSection = document.getElementById("aboutUs");
  const specialitesSection =document.getElementById("specialties");
  const brancheSection =document.getElementById("branches");
  const customerStoriesSection =document.getElementById("customerStories");
  const contactSection =document.getElementById("contactFormSection");

  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    toggleLinkClassList(entry, 'navigation__item--active', 0.75);
  }, {
    rootMargin: '0px',
    threshold: 0.75,
  })

  observer.observe(aboutUsSection);
  observer.observe(specialitesSection);
  observer.observe(brancheSection);
  observer.observe(customerStoriesSection);
  observer.observe(contactSection);
    

}

export default getAllSections;
