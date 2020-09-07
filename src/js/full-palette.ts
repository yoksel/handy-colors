import { IFullPaletteParams } from './interfaces';

enum CLASSNAME {
  COLOR = 'full-palette-color',
  COLOR_SELECTED = 'full-palette-color--selected',
  COLOR_CURRENT = 'full-palette-color--current',
  VIEW = 'full-palette-color__view',
  VIEW_SELECTED = 'full-palette-color__view--selected',
  CONTROLS = 'view-controls',
  CONTROL = 'view-controls__control',
  CONTROL_CURRENT = 'view-controls__control--current',
  COLORS = 'full-palette__colors',
  COLORS_TILES = 'full-palette__colors--tiles'
}

export default class FullPalette {
  _element: HTMLElement;
  _colorClickHandler: (color: string) => void;
  _currentColorElement: HTMLElement;
  _viewControlsElement: HTMLElement;
  _currentViewControl: HTMLElement;
  _colorsElement: HTMLElement;

  constructor ({ element, colorClickHandler }: IFullPaletteParams) {
    this._element = element;
    this._colorClickHandler = colorClickHandler;
    this._colorsElement = this._element.querySelector(`.${CLASSNAME.COLORS}`);
    this._viewControlsElement = this._element.querySelector(`.${CLASSNAME.CONTROLS}`);
    this._currentViewControl = this._viewControlsElement.querySelector(`.${CLASSNAME.CONTROL_CURRENT}`);

    this._element.addEventListener('click', (event) => {
      const colorControl: HTMLButtonElement = (<HTMLElement>event.target).closest(`.${CLASSNAME.COLOR}`);

      if (!colorControl) {
        return;
      }

      this._colorClickHandler(colorControl.value);
    });

    this._viewControlsElement.addEventListener('click', (event) => {
      const viewControl: HTMLButtonElement = (<HTMLElement>event.target).closest(`.${CLASSNAME.CONTROL}`);

      if (!viewControl) {
        return;
      }

      this._currentViewControl.classList.remove(CLASSNAME.CONTROL_CURRENT);
      if (viewControl.value === 'tiles') {
        this._colorsElement.classList.add(CLASSNAME.COLORS_TILES);
      } else {
        this._colorsElement.classList.remove(CLASSNAME.COLORS_TILES);
      }

      this._currentViewControl = viewControl;
      this._currentViewControl.classList.add(CLASSNAME.CONTROL_CURRENT);
    });
  }

  selectColor (color: string): void {
    const colorControl = this._element.querySelector(`#color-${color}`);
    colorControl.classList.add(CLASSNAME.COLOR_SELECTED);
  }

  unselectColor (color: string): void {
    const colorControl = this._element.querySelector(`#color-${color}`);
    colorControl.classList.remove(CLASSNAME.COLOR_SELECTED);
    this._currentColorElement.classList.remove(CLASSNAME.COLOR_CURRENT);
  }

  setCurrentColor (color: string): void {
    if (this._currentColorElement) {
      this._currentColorElement.classList.remove(CLASSNAME.COLOR_CURRENT);
    }

    if (!color) {
      return;
    }

    this._currentColorElement = this._element.querySelector(`#color-${color}`);
    this._currentColorElement.classList.add(CLASSNAME.COLOR_CURRENT);
  }
}
