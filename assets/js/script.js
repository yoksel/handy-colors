var $ = tinyLib;
var doc = document;

var cls = {
  createPalColor: 'create-palette__color',
  createPalColorCurrent: 'create-palette__color--current',
  createPalColorActive: 'create-palette__color--active',
};

var colorsViews = $.get('.full-palette-color__view');
var createPalWrapper = $.get('.create-palette-wrapper');
var createPalColors = $.get('.' + cls.createPalColor);
var createPalOutput = $.get('.create-palette__output');

var palettesSet = {
  current: null,
  currentClass: 'tiny-palette__colornames--current',
  wrapper: $.get('.palettes'),
  list: $.create('ul').addClass('palettes__list'),
  items: [],
  colorNamesItems: []
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
  list: {
    'palettes': $.get('#palettes'),
    'full-palette': $.get('#full-palette')
  }
};

var newPalette = {
  currentPos: 0,
  currentElem: createPalColors[ 0 ],
  isCurrentJumping: true,
  colors: []
};

init();

//---------------------------------------------

function init() {

  initNav();
  initDoc();
  initPalettes();
  initColorViews();
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
      ev.preventDefault();
      doc.location.hash = target;

      setCurrentByHash( target )
    }
  });
}

//---------------------------------------------

function initPalettes() {
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
  var tinyPalette = $.create('li').addClass(['palettes__item','tiny-palette']);
  var tinyPaletteList = $.create('ul').addClass('tiny-palette__colorviews');
  var tinyPaletteColorNames = $.create('ul').addClass(['tiny-palette__colornames']).attr({tabindex:"-1"});
  var colors = paletteItem.colors;

  var tinyPaletteHeader = createTinyPaletteHeader( paletteItem );
  tinyPalette.append( tinyPaletteHeader );

  colors.forEach( function ( item ) {
    // Color view
    var tinyPaletteItem = $.create('li').addClass('tiny-palette__colorview').attr('style','background: ' + item);
    tinyPaletteList.append( tinyPaletteItem );

    // Color name
    var li = $.create( 'li' )
              .addClass(['tiny-palette__colorname'])
              .html( item );
    tinyPaletteColorNames.append( li );
  });

  tinyPalette.append( tinyPaletteList );
  tinyPalette.append( tinyPaletteColorNames );
  palettesSet.colorNamesItems.push( tinyPaletteColorNames );

  return tinyPalette;
}

//---------------------------------------------

function createTinyPaletteHeader( paletteItem ) {
  var header = $.create('header').addClass('tiny-palette__header');

  var title = $.create('h4')
    .addClass('tiny-palette__title')
    .html( paletteItem.title || '*' );

  header.append( title );

  var author = $.create('span')
    .addClass('tiny-palette__author')
    .html( getTinyPaletteAuthor( paletteItem) );

  header.append( author );

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
    var link = 'https://gist.github.com/' + authorProfiles.github;
  }

  if ( name ) {
    return 'by <a href="' + link + '">' + name + '</a>';
  }
  return '';
}

//---------------------------------------------

function addPaletteAction() {
  palettesSet.colorNamesItems.forEach( function ( item ) {
    item.elem.onclick = function () {

      if ( palettesSet.current !== null ) {
        palettesSet.current.removeClass( palettesSet.currentClass )
      }

      if ( palettesSet.current === item ) {
        palettesSet.current = null;
        return;
      }
      palettesSet.current = item;
      palettesSet.current.addClass( palettesSet.currentClass );
    };

    item.elem.onblur = function () {
      if ( palettesSet.current !== null ) {
        palettesSet.current.removeClass( palettesSet.currentClass );
        palettesSet.current = null;
      }
    };
  });
}

//---------------------------------------------

function initColorViews() {
  colorsViews.forEach( function ( item, i ) {

    item.elem.onclick = function () {
      var color = this.style.color;
      fillColorsList( color );
      printColorsList();
      addColorToPalette( color );
      setCurrentColor();
    };
  });
}

//---------------------------------------------

function initCreatePalette() {
  createPalColors.forEach( function ( item, i ) {
    var parent = item;

    item.elem.onclick = function ( ev ) {
      ev.stopPropagation();
      newPalette.isCurrentJumping = false;
      setCurrentColor( i );
    };
  });

  createPalWrapper.elem.onclick = function ( ev ) {
    colors.currentElem.removeClass( cls.createPalColorCurrent );
  }
}

//---------------------------------------------

function fillColorsList( color, i ) {
  newPalette.colors[ newPalette.currentPos ] = color;
}

//---------------------------------------------

function printColorsList() {
  var list = '';
  var colorsList = $.get('.create-palette__colornames').addClass('colornames');
  var ul = colorsList.elem.cloneNode( false );

  newPalette.colors.forEach( function ( item ) {
    var span = $.create( 'span' ).html( item );
    var li = $.create( 'li' )
              .addClass(['create-palette__colorname', 'colorname'])
              .attr({'style': 'color: ' + item})
              .append( span );

    ul.appendChild( li.elem );
  });

  colorsList.elem.parentNode.replaceChild( ul, colorsList.elem );
}

//---------------------------------------------

function setCurrentColor( i ) {
  if ( newPalette.currentElem ) {
    newPalette.currentElem.removeClass( cls.createPalColorCurrent );
  }

  if ( i >= 0 ) {
    newPalette.currentPos = i;
  }
  else if ( newPalette.colors.length < createPalColors.length && newPalette.isCurrentJumping !== false ){
    newPalette.currentPos++;
  }

  newPalette.currentElem = createPalColors[ newPalette.currentPos ];
  newPalette.currentElem.addClass( cls.createPalColorCurrent );
}

//---------------------------------------------

function addColorToPalette( color ) {
  var target = newPalette.activeElem || newPalette.currentElem;
  target.elem.style.backgroundColor = color;
}

//---------------------------------------------
