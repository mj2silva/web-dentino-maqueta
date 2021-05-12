"use strict";

var openMenuButton = document.getElementById("btnOpenMenu");
var closeMenuButton = document.getElementById("btnCloseMenu");
var menu = document.getElementById("mainMenu");
var openMenuClassName = "navigation__list--mobile";
var closedMenuClassName = "navigation__list--hidden";
openMenuButton.addEventListener("click", function () {
  menu.classList.remove(closedMenuClassName);
  menu.classList.add(openMenuClassName);
});
closeMenuButton.addEventListener("click", function () {
  menu.classList.remove(openMenuClassName);
  menu.classList.add(closedMenuClassName);
});