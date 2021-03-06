var control_sets = [], components = [], filters = [];
var ImageEditor = function (settings) {
  "use strict";
  if (settings === undefined) return this;
  settings.pixelRatio = 1;
  var im            = this, x, round = function(float){return Math.round(float)};
  im.width          = settings.width;
  im.height         = settings.height;
  im.saveWidth      = settings.saveWidth || round(im.width / 2);
  im.saveHeight     = settings.saveHeight || round(im.height / 2);
  im.strictSize     = (settings.saveWidth !== undefined ? true : false);
  im.stage          = new Kinetic.Stage(settings);
  im.namespaces     = {};
  im.controlSets    = {};
  im.components     = {};
  im.settings       = settings;
  im.filters        = {};
  im.fileId         = im.settings.fID;
  im.scale          = 1;
  im.crosshair      = new Image();
  im.uniqid         = im.stage.getContainer().id;
  im.editorContext  = $(im.stage.getContainer()).parent();
  im.domContext     = im.editorContext.parent();
  im.controlContext = im.domContext.children('div.controls');
  im.controlSetNamespaces = [];

  im.showLoader = $.fn.dialog.showLoader;
  im.hideLoader = $.fn.dialog.hideLoader;
  im.stage.im = im;
  im.stage.elementType = 'stage';
  im.crosshair.src = '/concrete/images/image_editor/crosshair.png';

  im.center = {
    x: Math.round(im.width / 2),
    y: Math.round(im.height / 2)
  };

  im.centerOffset = {
    x: im.center.x,
    y: im.center.y
  };

  var getElem = function(selector) {
    return $(selector, im.domContext);
  },
  log = function() {
    if (settings.debug === true && typeof console !== 'undefined') {
      var args = arguments;
      if (args.length == 1) args = args[0];
      console.log(args);
    }
  },
  warn = function() {
    if (settings.debug === true && typeof console !== 'undefined') {
      var args = arguments;
      if (args.length == 1) args = args[0];
      console.warn(args);
    }
  },
  error = function() {
    if (typeof console !== 'undefined') {
      var args = arguments;
      if (args.length == 1) args = args[0];
      console.error("Image Editor Error: " + args);
    }
  };

  im.stage._setDraggable = im.stage.setDraggable;
  im.stage.setDraggable = function(v) {
    warn('setting draggable to '+v);
    return im.stage._setDraggable(v);
  };
