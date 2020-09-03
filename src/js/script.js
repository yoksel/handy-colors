var $ = tinyLib;
var doc = document;
var storage = window.localStorage;

var cls = {
  createPalColor: 'create-palette__color',
  createPalColorCurrent: 'create-palette__color--current',
  createPalColorActive: 'create-palette__color--active',
};

var colorsViews = $.get('.full-palette-color__view');
var createPalWrapper = $.get('.create-palette-wrapper');
var createPalColors = $.get('.' + cls.createPalColor);
var createPalOutput = $.get('.create-palette__output');

var colorsViewsSet = {
  selectedClass: 'full-palette-color__view--selected',
  selectedList: []
};

var palettesSet = {
  current: null,
  currentClass: 'tiny-palette--current',
  wrapper: $.get('.palettes'),
  list: $.create('ul').addClass('palettes__list'),
  items: []
};

var nav = {
  current: null,
  currentClass: 'nav__item--current',
  items: $.get('.nav__item'),
  list: {}
};

var tabs = {
  current: null,
  currentClass: 'section--visible',
  list: getElemsList('.section', 'id' )
};

var newPalette = {
  currentPos: 0,
  currentElem: createPalColors[ 0 ],
  isCurrentJumping: true,
  colors: []
};

var fullPaletteControls = {
  current: null,
  currentClass: 'full-palette__control--current',
  items: $.get('.full-palette__control'),
  list: getElemsList('.full-palette__control', 'value' ),
  target: $.get('.full-palette__colors'),
  targetState: '',
  targetStateClass: 'full-palette__colors--tiles'
};

init();

//---------------------------------------------

function init() {

  initNav();
  initDoc();
  initPalettes();
  initColorViews();
  initPaletteControls();
  initCreatePalette();
}

//---------------------------------------------

function initDoc() {
  doc.body.classList.remove('no-js');

  if ( doc.location.hash ) {
    setCurrentByHash( doc.location.hash.substring(1) );
  }
}

//---------------------------------------------

function setCurrentByHash( hash ) {
  nav.current.removeClass( nav.currentClass );
  nav.current = nav.list[ hash ];
  nav.current.addClass( nav.currentClass );

  tabs.current.removeClass( tabs.currentClass );
  tabs.current = tabs.list[ hash ];
  tabs.current.addClass( tabs.currentClass );
}

//---------------------------------------------

function initNav() {
  nav.current = nav.items[0];
  nav.current.addClass( nav.currentClass );
  tabs.current = tabs.list['full-palette'];
  tabs.current.addClass( tabs.currentClass );

  nav.items.forEach( function ( item ) {
    var target = item.elem.dataset.target;
    nav.list[ target ] = item;

    item.elem.onclick = function ( ev ) {
      history.pushState(null, null, `#${target}`);
      ev.preventDefault();

      setCurrentByHash( target )
    }
  });
}

//---------------------------------------------

function initPalettes() {
  palettesSet.wrapper.html('');

  palettes.forEach( function ( item ) {
    var tinyPalette = createTinyPalette( item );
    palettesSet.list.append ( tinyPalette );
    palettesSet.items.push( tinyPalette );
  });

  palettesSet.wrapper.append( palettesSet.list );

  addPaletteAction();
}

//---------------------------------------------

function createTinyPalette( paletteItem ) {
  var tinyPalette = $.create('li')
    .addClass(['palettes__item','tiny-palette'])
    .attr({tabindex:"-1"});
  var colorControl = $.create('button')
    .addClass('tiny-palette__control')
    .attr('type', 'button');;
  var colorList = $.create('ul').addClass('tiny-palette__colorviews');

  var colorNamesOut = $.create('textarea')
    .addClass(['tiny-palette__colornames'])
    .attr('spellcheck', 'false');

  var colors = paletteItem.colors;
  var colorsText = colors.filter( removeEmptyItems).join(', ');
  colorNamesOut.val( colorsText );

  var colorNamesWrapper = $.create('div')
    .addClass(['tiny-palette__colornames-wrapper'])
    .append( colorNamesOut );


  var header = createTinyPaletteHeader( paletteItem );
  tinyPalette.append( header );

  colors.forEach( function ( item ) {
    var item = $.create('li')
      .addClass('tiny-palette__colorview')
      .attr('style','background: ' + item);
    colorList.append( item );
  });

  colorControl.append( colorList );
  tinyPalette.append( colorControl );
  tinyPalette.append( colorNamesWrapper );

  tinyPalette.textarea = colorNamesOut;
  tinyPalette.control = colorControl;

  return tinyPalette;
}

//---------------------------------------------

function createTinyPaletteHeader( paletteItem ) {
  var header = $.create('header').addClass('tiny-palette__header');

  var title = $.create('h4')
    .addClass('tiny-palette__title')
    .html( paletteItem.title || '*' );

  header.append( title );

  // var author = $.create('span')
  //   .addClass('tiny-palette__author')
  //   .html( getTinyPaletteAuthor( paletteItem) );

  // header.append( author );

  return header;
}

//---------------------------------------------

function getTinyPaletteAuthor( paletteItem ) {
  var authorProfiles = paletteItem.author;

  if ( authorProfiles.twitter ) {
    var name = authorProfiles.twitter;
    var link = 'https://twitter.com/' + authorProfiles.twitter;
  }
  else if ( authorProfiles.github ) {
    var name = authorProfiles.github;
    var link = 'https://github.com/' + authorProfiles.github;
  }

  if ( name ) {
    return 'by <a href="' + link + '">' + name + '</a>';
  }
  return '';
}

//---------------------------------------------

function addPaletteAction() {
  palettesSet.items.forEach( function ( item ) {
    const { control, elem, textarea } = item;

    control.elem.onclick = function () {
      if ( palettesSet.current !== null ) {
        palettesSet.current.removeClass( palettesSet.currentClass );
      }

      palettesSet.current = item;
      palettesSet.current.addClass( palettesSet.currentClass );
    };

    textarea.elem.onblur = function () {
      unsetCurrentPalette();
    }

    elem.onblur = function () {
      unsetCurrentPalette()
    };
  });
}

//---------------------------------------------

function unsetCurrentPalette() {
  if ( palettesSet.current !== null ) {
    palettesSet.current.removeClass( palettesSet.currentClass );
    palettesSet.current = null;
  }
}

//---------------------------------------------

function initColorViews() {
  colorsViews.forEach( function ( item, i ) {
    item.color = item.elem.dataset.color;
    var name = $.create('span')
      .addClass('full-palette-color__view-name')
      .html( item.color );
    var sign = $.create('span')
      .addClass('full-palette-color__view-sign')
    var inner = $.create('span')
      .addClass('full-palette-color__view-inner')
      .append( sign )
      .append( name );
    item.append( inner );

    item.elem.onclick = function () {

      setUnsetColor( item );
      setCreatePalCurrentColor();
      printColorsList();
    };
  });
}

//---------------------------------------------

function initPaletteControls() {
  var currentItem;

  if ( storage.fullPaletteState && storage.fullPaletteState !== 'undefined' ) {
    currentItem = fullPaletteControls.list[ storage.fullPaletteState ];
  }
  else {
    currentItem = fullPaletteControls.items[0];
  }

  setCurrentControl( currentItem );

  fullPaletteControls.items.forEach( function ( item ) {

    item.elem.onclick = function () {

      if ( fullPaletteControls.current !== null ) {
        fullPaletteControls.current.removeClass( fullPaletteControls.currentClass );
      }

      setCurrentControl( item );
    }
  });
}

//---------------------------------------------

function setCurrentControl( item ) {
  fullPaletteControls.current = item;
  fullPaletteControls.current.addClass( fullPaletteControls.currentClass );

  fullPaletteControls.targetState = item.elem.value;
  if ( fullPaletteControls.targetState === 'tiles' ) {
    fullPaletteControls.target.addClass( fullPaletteControls.targetStateClass );
  }
  else {
    fullPaletteControls.target.removeClass( fullPaletteControls.targetStateClass );
  }

  storage.fullPaletteState = item.elem.value;
}

//---------------------------------------------

function initCreatePalette() {
  createPalColors.forEach( function ( item, i ) {
    var parent = item;

    item.elem.onclick = function ( ev ) {
      ev.stopPropagation();
      newPalette.isCurrentJumping = false;
      setCreatePalCurrentColor( i );
    };
  });

  createPalWrapper.elem.onclick = function ( ev ) {
    newPalette.currentElem.removeClass( cls.createPalColorCurrent );
  }
}

//---------------------------------------------

function setUnsetColor( item ) {
  if ( newPalette.colors[ newPalette.currentPos ] === item.color ) {
    newPalette.colors[ newPalette.currentPos ] = undefined;
    setColorInPalette( '' );
    colorsViewsSet.selectedList[ newPalette.currentPos ] = null;

    unsetClassIfNoColor( item );
  }
  else {
    var oldItem = colorsViewsSet.selectedList[ newPalette.currentPos ];

    colorsViewsSet.selectedList[ newPalette.currentPos ] = item;
    newPalette.colors[ newPalette.currentPos ] = item.color;
    item.addClass( colorsViewsSet.selectedClass );
    setColorInPalette( item.color );

    unsetClassIfNoColor( oldItem );
  }
}

//---------------------------------------------

function unsetClassIfNoColor( item ) {
  if ( !item ) {
    return;
  }

  var isColorInPalette = newPalette.colors.indexOf( item.color );

  if ( isColorInPalette < 0 ) {
    item.removeClass( colorsViewsSet.selectedClass );
  }
}

//---------------------------------------------

function printColorsList() {
  var outList = newPalette.colors.filter( removeEmptyItems )
  createPalOutput.val( outList.join(', ') );
}

//---------------------------------------------

function setCreatePalCurrentColor( i ) {
  // Remove currentClass from previous current
  if ( newPalette.currentElem ) {
    newPalette.currentElem.removeClass( cls.createPalColorCurrent );
  }

  // Set particular current
  if ( i >= 0 ) {
    newPalette.currentPos = i;
  }
  // Or jump to the next
  else if ( newPalette.colors.length < createPalColors.length
            && newPalette.isCurrentJumping !== false ){
    newPalette.currentPos++;

    // If the end was reached, stop jumping
    if ( newPalette.currentPos === createPalColors.length - 1 ) {
      newPalette.isCurrentJumping = false;
    }
  }

  newPalette.currentElem = createPalColors[ newPalette.currentPos ];
  newPalette.currentElem.addClass( cls.createPalColorCurrent );
}

//---------------------------------------------

function setColorInPalette( color ) {
  var target = newPalette.activeElem || newPalette.currentElem;
  target.elem.style.backgroundColor = color;
}

//---------------------------------------------

function getElemsList( selector, key ) {
  var elems = $.get( selector );
  var set = {};

  elems.forEach( function ( item ) {
    set[ item.elem[ key ]] = item;
  });

  return set;
}

//---------------------------------------------

function removeEmptyItems ( item ) {
  return item ? true : false;
}
