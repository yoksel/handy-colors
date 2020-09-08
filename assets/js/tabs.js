// import { ITabs } from './interfaces';

export default class Tabs {
  _mainElem: HTMLElement;
  _items: Record<string, HTMLElement>;

  constructor ({ mainElem }) {
    this._mainElem = mainElem;
    this._items = this._getNavItems();
  }

  init () {

  }

  _getNavItems(): Record<string, HTMLElement> {
    const items = Array.from(this._elem.querySelectorAll('.section[id]'));

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

  setCurrent (id) {

  }
}
