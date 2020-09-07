import Nav from './nav';
import Tabs from './tabs';
import { addPalettesActions } from './palettes';
import { initPaletteConstructor } from './palette-constructor';

document.body.classList.remove('no-js');

const navElement: HTMLElement = document.querySelector('.nav');
const mainElement: HTMLElement = document.querySelector('.main');
const palettesElement: HTMLElement = document.querySelector('.palettes');
const fullPaletteElement: HTMLElement = document.querySelector('.full-palette');
const createPaletteElement: HTMLElement = document.querySelector('.tray');

const currentSectionId = document.location.hash
  ? document.location.hash.substr(1)
  : 'full-palette';

const tabs = new Tabs({ element: mainElement });
const nav = new Nav({
  element: navElement,
  setCurrentTab: tabs.setCurrent
});

initPaletteConstructor({
  fullPaletteElement,
  createPaletteElement
});

addPalettesActions({ element: palettesElement });

nav.setCurrent(currentSectionId);
tabs.setCurrent(currentSectionId);
