import { IPaletteContructor, IFullPalette, ITray } from './interfaces';
import FullPalette from './full-palette';
import Tray from './tray';

const MAX_COLORS = 5;

export default class PaletteConstructor {
  _fullPaletteElement: HTMLElement;
  _createPaletteElement: HTMLElement;
  _fullPalette: IFullPalette;
  _tray: ITray;
  _colors: Array<string>;
  _currentPosition: number;
  _isSequential: boolean;

  constructor ({ fullPaletteElement, createPaletteElement }: IPaletteContructor) {
    this._fullPaletteElement = fullPaletteElement;
    this._createPaletteElement = createPaletteElement;

    this._toggleColor = this._toggleColor.bind(this);
    this._removeColor = this._removeColor.bind(this);
    this._setPosition = this._setPosition.bind(this);

    this._tray = new Tray({
      element: this._createPaletteElement,
      removeColor: this._removeColor,
      setPosition: this._setPosition
    });
    this._fullPalette = new FullPalette({
      element: fullPaletteElement,
      colorClickHandler: this._toggleColor
    });

    this._colors = [];
    this._currentPosition = 0;

    // If no clicks on colors => position not changed manually
    // If all colors was cleared & pos is 0
    this._isSequential = true;
  }

  _toggleColor (color: string): void {
    const currentPosColor = this._getCurrentColor();

    if (currentPosColor === color) {
      this._removeColor(this._currentPosition);
      this._tray.removeColorFromTray(this._currentPosition);
      return;
    }

    this._addColor(color);

    this._setNextCell();

    this._fullPalette.setCurrentColor(this._getCurrentColor());
  }

  _setNextCell ():void {
    if (this._isSequential) {
      if (this._currentPosition < MAX_COLORS - 1) {
        this._currentPosition++;
        this._tray.setCurrent(this._currentPosition);
      } else {
        this._isSequential = false;
      }
    }
  }

  _setPosition (position: number): void {
    if (typeof position !== 'number') {
      return;
    }

    this._currentPosition = position;
    this._isSequential = false;
    this._fullPalette.setCurrentColor(this._getCurrentColor());
  }

  _addColor (color: string): void {
    const currentColorOnPos = this._getCurrentColor();
    this._colors[this._currentPosition] = color;

    const isNeedUnselectColorOnPos = currentColorOnPos
      && currentColorOnPos !== color
      && !this._colors.includes(currentColorOnPos);

    if (isNeedUnselectColorOnPos) {
      // Override existed color & unselect it
      this._fullPalette.unselectColor(currentColorOnPos);
    }

    this._tray.addColorToTray({
      color,
      position: this._currentPosition
    });
    this._fullPalette.selectColor(color);

    this._tray.setTrayOutput(this._getExistedColors());
  }

  _removeColor (position: number): void {
    const color = this._colors[position];
    this._colors[position] = '';

    if (!this._colors.includes(color)) {
      this._fullPalette.unselectColor(color);
    }

    const existedColors = this._getExistedColors();
    if (existedColors.length === 0) {
      this._isSequential = true;
    }

    this._tray.setTrayOutput(existedColors);
    this._fullPalette.setCurrentColor(this._getCurrentColor());
  }

  _getExistedColors (): Array<string> {
    return this._colors.filter(item => item);
  }

  _getCurrentColor (): string {
    return this._colors[this._currentPosition];
  }
}
