import { IPalettes } from './interfaces';

enum CLASSNAME {
  ITEM = 'tiny-palette',
  CURRENT = 'tiny-palette--current'
}

export const addPalettesActions = ({ element }: IPalettes): void => {
  let current: HTMLElement = null;

  element.addEventListener('click', (event) => {
    const palette = (<HTMLElement>event.target).closest(`.${CLASSNAME.ITEM}`);

    if (!palette || palette.classList.contains(CLASSNAME.CURRENT)) {
      return;
    }

    if (current) {
      current.classList.remove(CLASSNAME.CURRENT);
    }

    current = <HTMLElement>palette;
    current.classList.add(CLASSNAME.CURRENT);
  });
};
