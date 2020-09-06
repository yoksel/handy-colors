import { ITabs } from './interfaces';

enum CLASSNAME {
  ITEM = 'section',
  CURRENT = 'section--current'
}

export default class Tabs {
  _element: HTMLElement;
  _items: Record<string, HTMLElement>;
  _current: HTMLElement;

  constructor ({ element }: ITabs) {
    this._element = element;
    this._items = this._getItems();
    this._current = null;

    this.setCurrent = this.setCurrent.bind(this);
  }

  _getItems (): Record<string, HTMLElement> {
    const items = Array.from(this._element.querySelectorAll(`.${CLASSNAME.ITEM}[id]`));

    return items.reduce((prev: Record<string, HTMLElement>, item: HTMLElement) => {
      prev[item.id] = item;

      return prev;
    }, {});
  }

  setCurrent (id: string):void {
    if (!this._items[id]) {
      return;
    }

    if (this._current) {
      this._current.classList.remove(CLASSNAME.CURRENT);
    }

    this._current = this._items[id];
    this._current.classList.add(CLASSNAME.CURRENT);
  }
}
