import { IPalettes } from './interfaces';

enum CLASSNAME {
  ITEM = 'tiny-palette',
  CURRENT = 'tiny-palette--current'
}

export default class Palettes {
  _element: HTMLElement;
  _current: HTMLElement | null;

  constructor ({ element }: IPalettes) {
    this._element = element;
    this._current = null;

    this._element.addEventListener('click', (event) => {
      const palette = (<HTMLElement>event.target).closest(`.${CLASSNAME.ITEM}`);

      if (!palette || palette.classList.contains(CLASSNAME.CURRENT)) {
        return;
      }

      if (this._current) {
        this._current.classList.remove(CLASSNAME.CURRENT);
      }

      this._current = <HTMLElement>palette;
      this._current.classList.add(CLASSNAME.CURRENT);
    });
  }
}
