import { IPaletteContructor, IFullPalette, ITray } from './interfaces';
import FullPalette from './full-palette';
import Tray from './tray';

const MAX_COLORS = 5;

export const initPaletteConstructor = ({ fullPaletteElement, createPaletteElement }: IPaletteContructor):void => {
  const tray: ITray = new Tray({
    element: createPaletteElement,
    removeColor,
    setPosition
  });

  const fullPalette: IFullPalette = new FullPalette({
    element: fullPaletteElement,
    colorClickHandler: toggleColor
  });

  const colors: Array<string> = [];
  let currentPosition = 0;

  // If no clicks on colors => position not changed manually
  // If all colors was cleared & pos is 0
  let isSequential = true;

  function toggleColor (color: string): void {
    const currentPosColor = getCurrentColor();

    if (currentPosColor === color) {
      removeColor(currentPosition);
      tray.removeColorFromTray(currentPosition);
      return;
    }

    addColor(color);

    setNextCell();

    fullPalette.setCurrentColor(getCurrentColor());
  }

  function setNextCell (): void {
    if (isSequential) {
      if (currentPosition < MAX_COLORS - 1) {
        currentPosition++;
        tray.setCurrent(currentPosition);
      } else {
        isSequential = false;
      }
    }
  }

  function setPosition (position: number): void {
    if (typeof position !== 'number') {
      return;
    }

    currentPosition = position;
    isSequential = false;
    fullPalette.setCurrentColor(getCurrentColor());
  }

  function addColor (color: string): void {
    const currentColorOnPos = getCurrentColor();
    colors[currentPosition] = color;

    const isNeedUnselectColorOnPos = currentColorOnPos
      && currentColorOnPos !== color
      && !colors.includes(currentColorOnPos);

    if (isNeedUnselectColorOnPos) {
      // Override existed color & unselect it
      fullPalette.unselectColor(currentColorOnPos);
    }

    tray.addColorToTray({
      color,
      position: currentPosition
    });
    fullPalette.selectColor(color);

    tray.setTrayOutput(getExistedColors());
  }

  function removeColor (position: number): void {
    const color = colors[position];
    colors[position] = '';

    if (!colors.includes(color)) {
      fullPalette.unselectColor(color);
    }

    const existedColors = getExistedColors();
    if (existedColors.length === 0) {
      isSequential = true;
    }

    tray.setTrayOutput(existedColors);
    fullPalette.setCurrentColor(getCurrentColor());
  }

  function getExistedColors (): Array<string> {
    return colors.filter(item => item);
  }

  function getCurrentColor (): string {
    return colors[currentPosition];
  }
};
