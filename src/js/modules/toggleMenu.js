const initToggleButton = ({
  openMenuId = 'btnOpenMenu',
  closeMenuId = 'btnCloseMenu',
  menuId = 'mainMenu',
  openMenuClassName = 'navigation__list--mobile',
  closedMenuClassName = 'navigation__list--hidden',
} = {}) => {
  const openMenuButton = document.getElementById(openMenuId);
  const closeMenuButton = document.getElementById(closeMenuId);
  const menu = document.getElementById(menuId)

  openMenuButton.addEventListener("click", (() => {
    menu.classList.remove(closedMenuClassName);
    menu.classList.add(openMenuClassName);
  }));
  
  closeMenuButton.addEventListener("click", (() => {
    menu.classList.remove(openMenuClassName);
    menu.classList.add(closedMenuClassName);
  }));
}

export default initToggleButton;
