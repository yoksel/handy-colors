export interface INav {
  element: HTMLElement,
  setCurrentTab: (id: string) => void
}

export interface ITabs {
  element: HTMLElement
}

export interface IPalettes {
  element: HTMLElement
}

export interface IPaletteContructor {
  fullPaletteElement: HTMLElement,
  createPaletteElement: HTMLElement
}

export interface IFullPaletteParams {
  element: HTMLElement,
  colorClickHandler: (color: string) => void
}

export interface IFullPalette {
  selectColor(color: string): void,
  unselectColor(color: string): void,
  setCurrentColor(color: string): void,
}

export interface ITrayParams {
  element: HTMLElement,
  setPosition: (position: number) => void,
  removeColor: (position: number) => void
}

export interface ITray {
  _element: HTMLElement,
  setCurrent(position: number): void,
  addColorToTray({ color, position }: ISetColor): void,
  removeColorFromTray(position: number): void,
  setTrayOutput(colors: Array<string>): void
}

export interface ISetColor {
  color: string,
  position: number
}
