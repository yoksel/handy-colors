var $ = tinyLib;
var doc = document;

var cls = {
  createPalColor: 'create-palette__color',
  createPalColorCurrent: 'create-palette__color--current',
  createPalColorActive: 'create-palette__color--active',
};

var createPalWrapper = $.get('.create-palette-wrapper');
var colorsViews = $.get('.full-palette-color__view');
var createPalColors = $.get('.' + cls.createPalColor);
var createPalOutput = $.get('.create-palette__output');

var palettesWrapper = $.get('.palettes');
var palettesList = $.create('ul').addClass('palettes__list');

var nav = {
  items: $.get('.nav__item'),
  current: null,
  currentClass: 'nav__item--current'
};

var tabs = {
  current: null,
  currentClass: 'section--visible',
  list: {
    'palettes': $.get('#palettes'),
    'full-palette': $.get('#full-palette')
  }
};

var colors = {
  currentPos: 0,
  currentElem: createPalColors[ 0 ],
  isCurrentJumping: true,
  list: []
};

init();

//---------------------------------------------

function init() {

  doc.body.classList.remove('no-js');

  initNav();
  initPalettes();
  initColorViews();
  initCreatePalette();
}

//---------------------------------------------

function initNav() {
  nav.current = nav.items[0];
  nav.current.addClass( nav.currentClass );
  tabs.current = tabs.list['full-palette'];
  tabs.current.addClass( tabs.currentClass );

  nav.items.forEach( function ( item ) {

    item.elem.onclick = function ( ev ) {
      var target = this.dataset.target;
      ev.preventDefault();

      nav.current.removeClass( nav.currentClass );
      nav.current = item;
      nav.current.addClass( nav.currentClass );

      tabs.current.removeClass( tabs.currentClass );
      tabs.current = tabs.list[ target ];
      tabs.current.addClass( tabs.currentClass );
    }
  });
}

//---------------------------------------------

function initPalettes() {
  palettes.forEach( function ( item ) {
    palettesList.append (createPalette( item ));
  });

  palettesWrapper.append( palettesList );
}

//---------------------------------------------

function createPalette( paletteItem ) {
  var tinyPalette = $.create('li').addClass(['palettes__item','tiny-palette']);
  var tinyPaletteList = $.create('ul').addClass('tiny-palette__list');
  var colors = paletteItem.colors;

  var tinyPaletteHeader = createTinyPaletteHeader( paletteItem );
  tinyPalette.append( tinyPaletteHeader );

  colors.forEach( function ( item ) {
    var tinyPaletteItem = $.create('li').addClass('tiny-palette__item').attr('style','background: ' + item);
    tinyPaletteList.append( tinyPaletteItem );
  });

  tinyPalette.append( tinyPaletteList );

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
    .html( getAuthor( paletteItem) );

  header.append( author );

  return header;
}

//---------------------------------------------

function getAuthor( paletteItem ) {
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

function initColorViews() {
  colorsViews.forEach( function ( item, i ) {

    item.elem.onclick = function () {
      var color = this.style.color;
      fillColorsList( color );
      printColorsList();
      addColorToPalette( color );
      setCurrent();
    };
  });
}

//---------------------------------------------

function initCreatePalette() {
  createPalColors.forEach( function ( item, i ) {
    var parent = item;

    item.elem.onclick = function ( ev ) {
      ev.stopPropagation();
      colors.isCurrentJumping = false;
      setCurrent( i );
    };
  });

  createPalWrapper.elem.onclick = function ( ev ) {
    colors.currentElem.removeClass( cls.createPalColorCurrent );
  }
}

//---------------------------------------------

function fillColorsList( color, i ) {
  colors.list[ colors.currentPos ] = color;
}

//---------------------------------------------

function printColorsList() {
  var list = '';
  var createPalColorNames = $.get('.create-palette__colornames');
  var ul = createPalColorNames.elem.cloneNode( false );

  colors.list.forEach( function ( item ) {
    var span = $.create( 'span' ).html( item );
    var li = $.create( 'li' )
              .addClass('create-palette__colorname')
              .attr({'style': 'color: ' + item})
              .append( span );

    ul.appendChild( li.elem );
  });

  createPalColorNames.elem.parentNode.replaceChild( ul, createPalColorNames.elem );
}

//---------------------------------------------

function setCurrent( i ) {
  if ( colors.currentElem ) {
    colors.currentElem.removeClass( cls.createPalColorCurrent );
  }

  if ( i >= 0 ) {
    colors.currentPos = i;
  }
  else if ( colors.list.length < createPalColors.length && colors.isCurrentJumping !== false ){
    colors.currentPos++;
  }

  colors.currentElem = createPalColors[ colors.currentPos ];
  colors.currentElem.addClass( cls.createPalColorCurrent );
}

//---------------------------------------------

function addColorToPalette( color ) {
  var target = colors.activeElem || colors.currentElem;
  target.elem.style.backgroundColor = color;
}

//---------------------------------------------
