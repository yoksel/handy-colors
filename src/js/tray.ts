import { ITrayParams, ISetColor } from './interfaces';

enum CLASSNAMES {
  ITEM = 'tray__color',
  CURRENT = 'tray__color--current',
  FILLED = 'tray__color--filled',
  OUTPUT = 'tray__output'
}

export default class Tray {
  _element: HTMLElement;
  _currentElement: HTMLElement;
  _outputElement: HTMLTextAreaElement;
  _items: NodeListOf<HTMLElement>;
  _colorClickHandler: (color: string) => void;
  _setPosition: (position: number) => void;
  _removeColor: (position: number) => void;

  constructor ({ element, setPosition, removeColor }: ITrayParams) {
    this._element = element;
    this._setPosition = setPosition;
    this._removeColor = removeColor;
    this._currentElement = null;
    this._items = this._element.querySelectorAll(`.${CLASSNAMES.ITEM}`);
    this._outputElement = this._element.querySelector(`.${CLASSNAMES.OUTPUT}`);

    this.setCurrent(0);

    this._element.addEventListener('click', (event) => {
      const colorControl: HTMLElement = (<HTMLElement>event.target).closest(`.${CLASSNAMES.ITEM}`);

      if (!colorControl || !colorControl.dataset || !colorControl.dataset.pos) {
        return;
      }

      const position = +colorControl.dataset.pos;
      const color = colorControl.dataset.color;

      if (this._currentElement === colorControl && color) {
        this.removeColorFromTray(position);
        this._removeColor(position);
        return;
      }

      this.setCurrent(position);
      this._setPosition(position);
    });
  }

  setCurrent (position: number):void {
    if (this._currentElement) {
      this._currentElement.classList.remove(CLASSNAMES.CURRENT);
    }

    this._currentElement = this._items[position];
    this._currentElement.classList.add(CLASSNAMES.CURRENT);
  }

  addColorToTray ({ color, position }: ISetColor): void {
    const element = <HTMLElement> this._items[position];
    element.style.background = color;
    element.dataset.color = color;
    this._currentElement.classList.add(CLASSNAMES.FILLED);
  }

  removeColorFromTray (position: number): void {
    const element = <HTMLElement> this._items[position];
    element.style.background = 'transparent';
    element.classList.remove(CLASSNAMES.FILLED);
    element.dataset.color = '';
  }

  setTrayOutput (colors: Array<string>): void {
    this._outputElement.value = colors.join(', ');
  }
}
