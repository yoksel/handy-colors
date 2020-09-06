import { INav } from './interfaces';

enum CLASSNAME {
  ITEM = 'nav__item',
  CURRENT = 'nav__item--current'
}

export default class Nav {
  _element: HTMLElement;
  _current: HTMLElement;
  _items: Record<string, HTMLElement>
  _setCurrentTab: (id: string) => void;

  constructor ({ element, setCurrentTab }: INav) {
    this._element = element;
    this._items = this._getItems();
    this._current = null;
    this._setCurrentTab = setCurrentTab;

    this.setCurrent = this.setCurrent.bind(this);

    this._addEvents();
  }

  _addEvents (): void {
    this._element.addEventListener('click', (event) => {
      event.preventDefault();
      const dataset = (<HTMLElement>event.target).dataset;

      if (!dataset || !dataset.target) {
        return;
      }

      this.setCurrent(dataset.target);
      this._setCurrentTab(dataset.target);
    });
  }

  setCurrent (id: string): void {
    if (this._current) {
      this._current.classList.remove(CLASSNAME.CURRENT);
    }

    this._current = <HTMLElement>(this._items[id]);
    this._current.classList.add(CLASSNAME.CURRENT);

    history.pushState(null, null, `#${id}`);
  }

  _getItems (): Record<string, HTMLElement> {
    const items = Array.from(this._element.querySelectorAll(`.${CLASSNAME.ITEM}`));

    return items.reduce((prev: Record<string, HTMLElement>, item: HTMLElement) => {
      const dataset = item.dataset;

      if (!dataset || !dataset.target) {
        return prev;
      }

      const target = dataset.target;

      prev[target] = item;

      return prev;
    }, {});
  }
}
