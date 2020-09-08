(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var CLASSNAME;
(function (CLASSNAME) {
    CLASSNAME["COLOR"] = "full-palette-color";
    CLASSNAME["COLOR_SELECTED"] = "full-palette-color--selected";
    CLASSNAME["COLOR_CURRENT"] = "full-palette-color--current";
    CLASSNAME["VIEW"] = "full-palette-color__view";
    CLASSNAME["VIEW_SELECTED"] = "full-palette-color__view--selected";
    CLASSNAME["CONTROLS"] = "view-controls";
    CLASSNAME["CONTROL"] = "view-controls__control";
    CLASSNAME["CONTROL_CURRENT"] = "view-controls__control--current";
    CLASSNAME["COLORS"] = "full-palette__colors";
    CLASSNAME["COLORS_TILES"] = "full-palette__colors--tiles";
})(CLASSNAME || (CLASSNAME = {}));

var FullPalette = function () {
    function FullPalette(_ref) {
        var _this = this;

        var element = _ref.element,
            colorClickHandler = _ref.colorClickHandler;

        _classCallCheck(this, FullPalette);

        this._element = element;
        this._colorClickHandler = colorClickHandler;
        this._colorsElement = this._element.querySelector("." + CLASSNAME.COLORS);
        this._viewControlsElement = this._element.querySelector("." + CLASSNAME.CONTROLS);
        this._currentViewControl = this._viewControlsElement.querySelector("." + CLASSNAME.CONTROL_CURRENT);
        this._element.addEventListener('click', function (event) {
            var colorControl = event.target.closest("." + CLASSNAME.COLOR);
            if (!colorControl) {
                return;
            }
            _this._colorClickHandler(colorControl.value);
        });
        this._viewControlsElement.addEventListener('click', function (event) {
            var viewControl = event.target.closest("." + CLASSNAME.CONTROL);
            if (!viewControl) {
                return;
            }
            _this._currentViewControl.classList.remove(CLASSNAME.CONTROL_CURRENT);
            if (viewControl.value === 'tiles') {
                _this._colorsElement.classList.add(CLASSNAME.COLORS_TILES);
            } else {
                _this._colorsElement.classList.remove(CLASSNAME.COLORS_TILES);
            }
            _this._currentViewControl = viewControl;
            _this._currentViewControl.classList.add(CLASSNAME.CONTROL_CURRENT);
        });
    }

    _createClass(FullPalette, [{
        key: "selectColor",
        value: function selectColor(color) {
            var colorControl = this._element.querySelector("#color-" + color);
            colorControl.classList.add(CLASSNAME.COLOR_SELECTED);
        }
    }, {
        key: "unselectColor",
        value: function unselectColor(color) {
            var colorControl = this._element.querySelector("#color-" + color);
            colorControl.classList.remove(CLASSNAME.COLOR_SELECTED);
            this._currentColorElement.classList.remove(CLASSNAME.COLOR_CURRENT);
        }
    }, {
        key: "setCurrentColor",
        value: function setCurrentColor(color) {
            if (this._currentColorElement) {
                this._currentColorElement.classList.remove(CLASSNAME.COLOR_CURRENT);
            }
            if (!color) {
                return;
            }
            this._currentColorElement = this._element.querySelector("#color-" + color);
            this._currentColorElement.classList.add(CLASSNAME.COLOR_CURRENT);
        }
    }]);

    return FullPalette;
}();

exports.default = FullPalette;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nav_1 = require("./nav");
var tabs_1 = require("./tabs");
var palettes_1 = require("./palettes");
var palette_constructor_1 = require("./palette-constructor");
document.body.classList.remove('no-js');
var navElement = document.querySelector('.nav');
var mainElement = document.querySelector('.main');
var palettesElement = document.querySelector('.palettes');
var fullPaletteElement = document.querySelector('.full-palette');
var createPaletteElement = document.querySelector('.tray');
var currentSectionId = document.location.hash ? document.location.hash.substr(1) : 'full-palette';
var tabs = new tabs_1.default({ element: mainElement });
var nav = new nav_1.default({
    element: navElement,
    setCurrentTab: tabs.setCurrent
});
palette_constructor_1.initPaletteConstructor({
    fullPaletteElement: fullPaletteElement,
    createPaletteElement: createPaletteElement
});
palettes_1.addPalettesActions({ element: palettesElement });
nav.setCurrent(currentSectionId);
tabs.setCurrent(currentSectionId);

},{"./nav":3,"./palette-constructor":4,"./palettes":5,"./tabs":6}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var CLASSNAME;
(function (CLASSNAME) {
    CLASSNAME["ITEM"] = "nav__item";
    CLASSNAME["CURRENT"] = "nav__item--current";
})(CLASSNAME || (CLASSNAME = {}));

var Nav = function () {
    function Nav(_ref) {
        var element = _ref.element,
            setCurrentTab = _ref.setCurrentTab;

        _classCallCheck(this, Nav);

        this._element = element;
        this._items = this._getItems();
        this._current = null;
        this._setCurrentTab = setCurrentTab;
        this.setCurrent = this.setCurrent.bind(this);
        this._addEvents();
    }

    _createClass(Nav, [{
        key: "_addEvents",
        value: function _addEvents() {
            var _this = this;

            this._element.addEventListener('click', function (event) {
                event.preventDefault();
                var dataset = event.target.dataset;
                if (!dataset || !dataset.target) {
                    return;
                }
                _this.setCurrent(dataset.target);
                _this._setCurrentTab(dataset.target);
            });
        }
    }, {
        key: "setCurrent",
        value: function setCurrent(id) {
            if (this._current) {
                this._current.classList.remove(CLASSNAME.CURRENT);
            }
            this._current = this._items[id];
            this._current.classList.add(CLASSNAME.CURRENT);
            history.pushState(null, null, "#" + id);
        }
    }, {
        key: "_getItems",
        value: function _getItems() {
            var items = Array.from(this._element.querySelectorAll("." + CLASSNAME.ITEM));
            return items.reduce(function (prev, item) {
                var dataset = item.dataset;
                if (!dataset || !dataset.target) {
                    return prev;
                }
                var target = dataset.target;
                prev[target] = item;
                return prev;
            }, {});
        }
    }]);

    return Nav;
}();

exports.default = Nav;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.initPaletteConstructor = void 0;
var full_palette_1 = require("./full-palette");
var tray_1 = require("./tray");
var MAX_COLORS = 5;
exports.initPaletteConstructor = function (_ref) {
    var fullPaletteElement = _ref.fullPaletteElement,
        createPaletteElement = _ref.createPaletteElement;

    var tray = new tray_1.default({
        element: createPaletteElement,
        removeColor: removeColor,
        setPosition: setPosition
    });
    var fullPalette = new full_palette_1.default({
        element: fullPaletteElement,
        colorClickHandler: toggleColor
    });
    var colors = [];
    var currentPosition = 0;
    // If no clicks on colors => position not changed manually
    // If all colors was cleared & pos is 0
    var isSequential = true;
    function toggleColor(color) {
        var currentPosColor = getCurrentColor();
        if (currentPosColor === color) {
            removeColor(currentPosition);
            tray.removeColorFromTray(currentPosition);
            return;
        }
        addColor(color);
        setNextCell();
        fullPalette.setCurrentColor(getCurrentColor());
    }
    function setNextCell() {
        if (isSequential) {
            if (currentPosition < MAX_COLORS - 1) {
                currentPosition++;
                tray.setCurrent(currentPosition);
            } else {
                isSequential = false;
            }
        }
    }
    function setPosition(position) {
        if (typeof position !== 'number') {
            return;
        }
        currentPosition = position;
        fullPalette.setCurrentColor(getCurrentColor());
        var existedColors = getExistedColors();
        if (existedColors.length === 0 && currentPosition === 0) {
            isSequential = true;
        } else {
            isSequential = false;
        }
    }
    function addColor(color) {
        var currentColorOnPos = getCurrentColor();
        colors[currentPosition] = color;
        var isNeedUnselectColorOnPos = currentColorOnPos && currentColorOnPos !== color && !colors.includes(currentColorOnPos);
        if (isNeedUnselectColorOnPos) {
            // Override existed color & unselect it
            fullPalette.unselectColor(currentColorOnPos);
        }
        tray.addColorToTray({
            color: color,
            position: currentPosition
        });
        fullPalette.selectColor(color);
        tray.setTrayOutput(getExistedColors());
    }
    function removeColor(position) {
        var color = colors[position];
        colors[position] = '';
        if (!colors.includes(color)) {
            fullPalette.unselectColor(color);
        }
        var existedColors = getExistedColors();
        if (existedColors.length === 0) {
            isSequential = true;
        }
        tray.setTrayOutput(existedColors);
        fullPalette.setCurrentColor(getCurrentColor());
    }
    function getExistedColors() {
        return colors.filter(function (item) {
            return item;
        });
    }
    function getCurrentColor() {
        return colors[currentPosition];
    }
};

},{"./full-palette":1,"./tray":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.addPalettesActions = void 0;
var CLASSNAME;
(function (CLASSNAME) {
    CLASSNAME["ITEM"] = "tiny-palette";
    CLASSNAME["CURRENT"] = "tiny-palette--current";
})(CLASSNAME || (CLASSNAME = {}));
exports.addPalettesActions = function (_ref) {
    var element = _ref.element;

    var current = null;
    element.addEventListener('click', function (event) {
        var palette = event.target.closest("." + CLASSNAME.ITEM);
        if (!palette || palette.classList.contains(CLASSNAME.CURRENT)) {
            return;
        }
        if (current) {
            current.classList.remove(CLASSNAME.CURRENT);
        }
        current = palette;
        current.classList.add(CLASSNAME.CURRENT);
    });
};

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var CLASSNAME;
(function (CLASSNAME) {
    CLASSNAME["ITEM"] = "section";
    CLASSNAME["CURRENT"] = "section--current";
})(CLASSNAME || (CLASSNAME = {}));

var Tabs = function () {
    function Tabs(_ref) {
        var element = _ref.element;

        _classCallCheck(this, Tabs);

        this._element = element;
        this._items = this._getItems();
        this._current = null;
        this.setCurrent = this.setCurrent.bind(this);
    }

    _createClass(Tabs, [{
        key: "_getItems",
        value: function _getItems() {
            var items = Array.from(this._element.querySelectorAll("." + CLASSNAME.ITEM + "[id]"));
            return items.reduce(function (prev, item) {
                prev[item.id] = item;
                return prev;
            }, {});
        }
    }, {
        key: "setCurrent",
        value: function setCurrent(id) {
            if (!this._items[id]) {
                return;
            }
            if (this._current) {
                this._current.classList.remove(CLASSNAME.CURRENT);
            }
            this._current = this._items[id];
            this._current.classList.add(CLASSNAME.CURRENT);
        }
    }]);

    return Tabs;
}();

exports.default = Tabs;

},{}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var CLASSNAMES;
(function (CLASSNAMES) {
    CLASSNAMES["ITEM"] = "tray__color";
    CLASSNAMES["CURRENT"] = "tray__color--current";
    CLASSNAMES["FILLED"] = "tray__color--filled";
    CLASSNAMES["OUTPUT"] = "tray__output";
})(CLASSNAMES || (CLASSNAMES = {}));

var Tray = function () {
    function Tray(_ref) {
        var _this = this;

        var element = _ref.element,
            setPosition = _ref.setPosition,
            removeColor = _ref.removeColor;

        _classCallCheck(this, Tray);

        this._element = element;
        this._setPosition = setPosition;
        this._removeColor = removeColor;
        this._currentElement = null;
        this._items = this._element.querySelectorAll("." + CLASSNAMES.ITEM);
        this._outputElement = this._element.querySelector("." + CLASSNAMES.OUTPUT);
        this.setCurrent(0);
        this._element.addEventListener('click', function (event) {
            var colorControl = event.target.closest("." + CLASSNAMES.ITEM);
            if (!colorControl || !colorControl.dataset || !colorControl.dataset.pos) {
                return;
            }
            var position = +colorControl.dataset.pos;
            var color = colorControl.dataset.color;
            if (_this._currentElement === colorControl && color) {
                _this.removeColorFromTray(position);
                _this._removeColor(position);
                return;
            }
            _this.setCurrent(position);
            _this._setPosition(position);
        });
    }

    _createClass(Tray, [{
        key: "setCurrent",
        value: function setCurrent(position) {
            if (this._currentElement) {
                this._currentElement.classList.remove(CLASSNAMES.CURRENT);
            }
            this._currentElement = this._items[position];
            this._currentElement.classList.add(CLASSNAMES.CURRENT);
        }
    }, {
        key: "addColorToTray",
        value: function addColorToTray(_ref2) {
            var color = _ref2.color,
                position = _ref2.position;

            var element = this._items[position];
            element.style.background = color;
            element.dataset.color = color;
            this._currentElement.classList.add(CLASSNAMES.FILLED);
        }
    }, {
        key: "removeColorFromTray",
        value: function removeColorFromTray(position) {
            var element = this._items[position];
            element.style.background = 'transparent';
            element.classList.remove(CLASSNAMES.FILLED);
            element.dataset.color = '';
        }
    }, {
        key: "setTrayOutput",
        value: function setTrayOutput(colors) {
            this._outputElement.value = colors.join(', ');
        }
    }]);

    return Tray;
}();

exports.default = Tray;

},{}]},{},[2])

//# sourceMappingURL=assets/js/bundle.js.map
