const openMenuButton = document.getElementById("btnOpenMenu");
const closeMenuButton = document.getElementById("btnCloseMenu");
const menu = document.getElementById("mainMenu")
const openMenuClassName = "navigation__list--mobile";
const closedMenuClassName = "navigation__list--hidden";

openMenuButton.addEventListener("click", (() => {
  menu.classList.remove(closedMenuClassName);
  menu.classList.add(openMenuClassName);
}));

closeMenuButton.addEventListener("click", (() => {
  menu.classList.remove(openMenuClassName);
  menu.classList.add(closedMenuClassName);
}));

