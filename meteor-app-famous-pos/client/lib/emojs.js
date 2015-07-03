window.ej$ = window.emojs = {
  settings : {
    dataServerRoot: '/data'
  }
};

(function(global) {
(function(global) { 
global.libs = window.ej$l = {};


  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

(function(global){
  function Emitter(obj) {
    if (obj) return mixin(obj);
  };

  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  // let's add stack of ALL triggered events:
  var triggererWithEmitterEventsGlobal = []

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on =
    Emitter.prototype.addEventListener = function(event, fn){
      this._callbacks = this._callbacks || {};
      (this._callbacks[event] = this._callbacks[event] || [])
        .push(fn);
      return this;
    };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */
  Emitter.prototype.once = function(event, fn){
    var self = this;
    this._callbacks = this._callbacks || {};

    function on() {
      self.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };
  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed OR if event was already triggered before, the function gets executed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */
  Emitter.prototype.runOrWait = function(event, fn){
    if (triggererWithEmitterEventsGlobal.indexOf(event) === -1) {
      var self = this;
      this._callbacks = this._callbacks || {};

      function on() {
        self.off(event, on);
        fn.apply(this, arguments);
      }

      on.fn = fn;
      this.on(event, on);
      return this;
    } else {
      fn.apply(this, arguments);
    }

  };
  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off =
    Emitter.prototype.removeListener =
      Emitter.prototype.removeAllListeners =
        Emitter.prototype.removeEventListener = function(event, fn){
          this._callbacks = this._callbacks || {};

          // all
          if (0 == arguments.length) {
            this._callbacks = {};
            return this;
          }

          // specific event
          var callbacks = this._callbacks[event];
          if (!callbacks) return this;

          // remove all handlers
          if (1 == arguments.length) {
            delete this._callbacks[event];
            return this;
          }

          // remove specific handler
          var cb;
          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
              callbacks.splice(i, 1);
              break;
            }
          }
          return this;
        };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};

    /*var args = []
    for (var i=1; i<arguments.length; i++)
      args.push(arguments[i])
    var callbacks = this._callbacks[event];*/

    var args = [].slice.call(arguments, 1)
       , callbacks = this._callbacks[event];

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }
    // add event to global event stack:
    triggererWithEmitterEventsGlobal.push(event);
    return this;
  };

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks[event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
  };
  global.emitter = Emitter;
})(global.libs)

 })(ej$);
(function(global) { 
(function(global) { 
var global;

if (typeof global === 'undefined') {
  global = {};
}

if (typeof global.engine === 'undefined') {
  global.engine = {};
}

global.engine.core = {};

var Helpers, global1;

global1 = window;

Helpers = {};


Helpers.isPlainObject = function(a) {
  var b;
  if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a))
    return !1;
  try {
    if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf"))
      return !1
  } catch (c) {
    return !1
  }
  if (k.ownLast)
    for (b in a)
      return j.call(a, b);
  for (b in a)
    ;
  return void 0 === b || j.call(a, b)
}

Helpers.extend = function () {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ) {
    deep = target;

    // Skip the boolean and the target
    target = arguments[ i ] || {};
    i++;
  }

  // Handle case when target is a string or something (possible in deep copy)
  if ( typeof target !== "object" && typeof target !== 'function' ) {
    target = {};
  }

  if ( i === length ) {
    target = this;
    i--;
  }

  for ( ; i < length; i++ ) {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]) != null ) {
      // Extend the base object
      for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
          continue;
        }

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( helpers.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];

          } else {
            clone = src && helpers.isPlainObject(src) ? src : {};
          }

          // Never move original objects, clone them
          target[ name ] = helpers.extend( deep, clone, copy );

          // Don't bring in undefined values
        } else if ( copy !== undefined ) {
          target[ name ] = copy;
        }
      }
    }
  }

  // Return the modified object
  return target;
};
;

Helpers.MakeGlobalNamespaceFromString = function(path, _global, shortcut, initialObject) {
  var buildFromName, first, global, l1, l2, namespace, retObj, sc, subPaths;
  global = _global || global1 || {};
  if (global !== window) {
    global1 = global;
  }
  if (typeof global === 'string') {
    global = eval(global);
  }
  subPaths = path.split('.').reverse();
  first = subPaths.pop();
  namespace = global[first] = typeof global[first] !== 'undefined' && global[first] || {};
  if (subPaths.length === 0) {
    namespace;
    return namespace;
  }
  retObj = null;
  l1 = l2 = subPaths.length;
  buildFromName = function(paths, ns) {
    var retns;
    if (paths.length <= 0) {
      return ns;
    }
    first = subPaths.pop();
    retns = typeof ns[first] !== 'undefined' && ns[first] || {};
    ns[first] = buildFromName(paths, retns);
    if (l1 === l2) {
      retObj = Helpers.extend(ns[first] != null ? ns[first] : ns[first] = {}, retObj != null ? retObj : retObj = {});
    }
    return ns;
  };
  namespace = buildFromName(subPaths, namespace);
  if (shortcut) {
    sc = this.MakeGlobalNamespaceFromString(shortcut, window);
    window[shortcut] = retObj;
    sc = retObj;
  }
  return retObj;
};

Helpers.MakeGlobalNamespaceAndObject = function(initialObject) {
  var buildFromName, first, foreverFirst, global, l1, l2, namespace, retObj, sc, subPaths;
  global = initialObject.global || global1 || {};
  if (global !== window) {
    global1 = global;
  }
  if (typeof global === 'string') {
    global = eval(global);
  }
  subPaths = initialObject.path.split('.').reverse();
  foreverFirst = subPaths[0];
  first = subPaths.pop();
  namespace = global[first] = typeof global[first] !== 'undefined' && global[first] || {};
  if (subPaths.length === 0) {
    if (typeof global[first] !== 'undefined' && global[first]) {
      Helpers.extend(global[first], initialObject);
    } else {
      global[first] = initialObject.object;
    }
    return namespace;
  }
  retObj = null;
  l1 = l2 = subPaths.length;
  buildFromName = function(paths, ns) {
    var retns;
    if (paths.length <= 0) {
      return ns;
    }
    first = subPaths.pop();
    retns = typeof ns[first] !== 'undefined' && ns[first] || {};
    ns[first] = buildFromName(paths, retns);
    if (l1 === l2) {
      ns[foreverFirst] = Helpers.extend(initialObject.object, ns[foreverFirst]);
      retObj = Helpers.extend(ns[foreverFirst] != null ? ns[foreverFirst] : ns[foreverFirst] = {}, retObj != null ? retObj : retObj = {});
    }
    l1 = l1 - 1;
    return ns;
  };
  namespace = buildFromName(subPaths, namespace);
  if (initialObject.shortcut) {
    sc = this.MakeGlobalNamespaceFromString(initialObject.shortcut, window);
    window[initialObject.shortcut] = retObj;
    sc = retObj;
  }
  return retObj;
};

Helpers.hexToR = function(h) {
  return parseInt((this.cutHex(h)).substring(0, 2), 16);
};

Helpers.hexToG = function(h) {
  return parseInt((this.cutHex(h)).substring(2, 4), 16);
};

Helpers.hexToB = function(h) {
  return parseInt((this.cutHex(h)).substring(4, 6), 16);
};

Helpers.cutHex = function(h) {
  if (h.charAt(0) === "#") {
    return h.substring(1, 7);
  } else {
    return h;
  }
};


var ajax = {};
ajax.x = function() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for(var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function(url, callback, method, data, sync) {
    var x = ajax.x();
    x.open(method, url, sync);
    x.onreadystatechange = function() {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/json');
        x.setRequestHeader('dataType', 'jsonp');
    }
    /*if (method == 'GET') {
        x.setRequestHeader('Content-type', 'application/json');
        x.setRequestHeader('dataType', 'json');
    }*/
    x.send(data)
};

ajax.get = function(url, data, callback, sync) {
    var callback = typeof callback == 'undefined' ? function(){} : callback;
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'GET', null, sync)
    //ajax.send(url + '?' + query.join('&'), callback, 'GET', null, sync)
};

ajax.post = function(url, data, callback, sync) {
    var callback = typeof callback == 'undefined' ? function(){} : callback;
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), sync)
}
Helpers.ajax = ajax;
;

Helpers.MakeGlobalNamespaceAndObject({
  path: 'runtime.helpers',
  object: Helpers,
  global: global,
  shortcut: 'ej$h'
});

var Config;

Config = (function() {
  function Config() {}

  Config.dataServerRoot = global.settings.dataServerRoot;

  Config.fullyClientSide = true;

  return Config;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.core.Config',
  object: Config
});

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'runtime.config',
  object: Config
});


/*
* Returns a random number between min and max
 */
Math.getRandomArbitary = function(min, max) {
  return Math.random() * (max - min) + min;
};

Math.randomRange = function(min, max) {
  return Math.random() * (max - min) + min;
};

Math.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

Function.prototype.property = function(prop, desc) {
  return Object.defineProperty(this.prototype, prop, desc);
};

 })(ej$);
(function(global) { 
var AbstractController;

AbstractController = (function() {
  function AbstractController() {

    /**
    * For trigger events, that will be listened/casted in any part of program.
    * Format of the triggered event:
    *   'global:{name}:{action}'
    * @param {String} DESCRIPTION
    * @return {String} DESCRIPTION
    *
     */
  }

  AbstractController.prototype.trigger = function(name, action) {
    return this.emit(name);
  };

  AbstractController.prototype.ready = function(callback) {
    if (typeof callback !== 'undefined') {
      return callback.call();
    }
  };

  AbstractController.prototype.start = function() {};

  AbstractController.prototype.stop = function() {};

  return AbstractController;

})();

ej$h.extend(AbstractController.prototype, new ej$l.emitter());

ej$h.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractController',
  object: AbstractController
});

var AbstractContext;

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractContext',
  object: AbstractContext = (function() {
    function AbstractContext(val) {
      this.val = val;
    }

    return AbstractContext;

  })()
});

var AbstractEmotion;

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractEmotion',
  object: AbstractEmotion = (function() {
    function AbstractEmotion(val) {
      this.val = val;
    }

    return AbstractEmotion;

  })()
});


/**
* AbstractProcessor class will be processing core (standard) input-output events.
*   custom Processors are pluggable through modules into the system and should be inherited from AbstractProcessor.
* @namespace engine.controllers
* @class AbstractProcessor
*
 */
var AbstractProcessor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AbstractProcessor = (function(_super) {
  __extends(AbstractProcessor, _super);

  function AbstractProcessor() {}

  AbstractProcessor.prototype.feelText = function(text, context) {
    return console.log('abstract feelText: ' + text);
  };

  AbstractProcessor.prototype.createEmotionState = function(text, affectWords, TYPE) {
    return console.dir({
      message: 'abstract createEmotionState: ',
      affectWords: affectWords,
      TYPE: TYPE
    });
  };

  AbstractProcessor.prototype.ready = function(callback) {};


  /**
  * For trigger events, that will be listened/casted in any part of program.
  * Format of the triggered event:
  *   'global:{name}:{action}'
  * @param {String} DESCRIPTION
  * @return {String} DESCRIPTION
  *
   */

  return AbstractProcessor;

})(global.engine.classes.AbstractController);

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractProcessor',
  object: AbstractProcessor,
  global: global
});

var AbstractState;

AbstractState = (function() {
  function AbstractState(text) {
    this.text = text;
  }

  AbstractState.prototype.getText = function() {
    return this.text;
  };

  return AbstractState;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AbstractState',
  object: AbstractState
});

var AffectWord;

AffectWord = (function() {
  AffectWord.prototype.word = null;

  AffectWord.prototype.generalWeight = 0.0;

  AffectWord.prototype.generalValence = 0.0;

  AffectWord.prototype.happinessWeight = 0.0;

  AffectWord.prototype.sadnessWeight = 0.0;

  AffectWord.prototype.angerWeight = 0.0;

  AffectWord.prototype.fearWeight = 0.0;

  AffectWord.prototype.disgustWeight = 0.0;

  AffectWord.prototype.surpriseWeight = 0.0;

  AffectWord.prototype.startsWithEmoticon = false;

  function AffectWord(word, generalWeight, happinessWeight, sadnessWeight, angerWeight, fearWeight, disgustWeight, surpriseWeight, quoficient) {
    this.word = word;
    this.generalWeight = generalWeight;
    this.happinessWeight = happinessWeight;
    this.sadnessWeight = sadnessWeight;
    this.angerWeight = angerWeight;
    this.fearWeight = fearWeight;
    this.disgustWeight = disgustWeight;
    this.surpriseWeight = surpriseWeight;
    this.quoficient = quoficient;
    if (quoficient) {
      this.generalWeight = this.generalWeight * quoficient;
      this.happinessWeight = this.happinessWeight * quoficient;
      this.sadnessWeight = this.sadnessWeight * quoficient;
      this.angerWeight = this.angerWeight * quoficient;
      this.fearWeight = this.fearWeight * quoficient;
      this.disgustWeight = this.disgustWeight * quoficient;
      this.surpriseWeight = this.surpriseWeight * quoficient;
    }
    this.generalValence = this.getValenceSum();
  }

  AffectWord.prototype.adjustWeights = function(quoficient) {
    this.generalWeight = this.generalWeight * quoficient;
    this.happinessWeight = this.happinessWeight * quoficient;
    this.sadnessWeight = this.sadnessWeight * quoficient;
    this.angerWeight = this.angerWeight * quoficient;
    this.fearWeight = this.fearWeight * quoficient;
    this.disgustWeight = this.disgustWeight * quoficient;
    this.surpriseWeight = this.surpriseWeight * quoficient;
    return this.normalise();
  };

  AffectWord.prototype.normalise = function() {
    if (this.generalWeight > 1) {
      this.generalWeight = 1.0;
    }
    if (this.happinessWeight > 1) {
      this.happinessWeight = 1.0;
    }
    if (this.sadnessWeight > 1) {
      this.sadnessWeight = 1.0;
    }
    if (this.angerWeight > 1) {
      this.angerWeight = 1.0;
    }
    if (this.fearWeight > 1) {
      this.fearWeight = 1.0;
    }
    if (this.disgustWeight > 1) {
      this.disgustWeight = 1.0;
    }
    if (this.surpriseWeight > 1) {
      return this.surpriseWeight = 1.0;
    }
  };

  AffectWord.prototype.flipValence = function() {
    var temp;
    this.generalValence = -this.generalValence;
    temp = this.happinessWeight;
    this.happinessWeight = Math.max(Math.max(this.sadnessWeight, this.angerWeight), Math.max(this.fearWeight, this.disgustWeight));
    this.sadnessWeight = temp;
    this.angerWeight = temp / 2;
    this.fearWeight = temp / 2;
    return this.disgustWeight = temp / 2;
  };

  AffectWord.prototype.clone = function() {
    var value;
    value = new AffectWord(this.word, this.generalWeight, this.happinessWeight, this.sadnessWeight, this.angerWeight, this.fearWeight, this.disgustWeight, this.surpriseWeight);
    value.setStartsWithEmoticon(this.startsWithEmoticon);
    return value;
  };

  AffectWord.prototype.getStartsWithEmoticon = function() {
    return this.startsWithEmoticon;
  };

  AffectWord.prototype.setStartsWithEmoticon = function(startsWithEmoticon) {
    return this.startsWithEmoticon = startsWithEmoticon;
  };

  AffectWord.prototype.getAngerWeight = function() {
    return this.angerWeight;
  };

  AffectWord.prototype.setAngerWeight = function(angerWeight) {
    return this.angerWeight = angerWeight;
  };

  AffectWord.prototype.getDisgustWeight = function() {
    return this.disgustWeight;
  };

  AffectWord.prototype.setDisgustWeight = function(disgustWeight) {
    return this.disgustWeight = disgustWeight;
  };

  AffectWord.prototype.getFearWeight = function() {
    return this.fearWeight;
  };

  AffectWord.prototype.setFearWeight = function(fearWeight) {
    return this.fearWeight = fearWeight;
  };

  AffectWord.prototype.getHappinessWeight = function() {
    return this.happinessWeight;
  };

  AffectWord.prototype.setHappinessWeight = function(happinessWeight) {
    return this.happinessWeight = happinessWeight;
  };

  AffectWord.prototype.getSadnessWeight = function() {
    return this.sadnessWeight;
  };

  AffectWord.prototype.setSadnessWeight = function(sadnessWeight) {
    return this.sadnessWeight = sadnessWeight;
  };

  AffectWord.prototype.getSurpriseWeight = function() {
    return this.surpriseWeight;
  };

  AffectWord.prototype.setSurpriseWeight = function(surpriseWeight) {
    return this.surpriseWeight = surpriseWeight;
  };

  AffectWord.prototype.getWord = function() {
    return this.word;
  };

  AffectWord.prototype.getGeneralWeight = function() {
    return this.generalWeight;
  };

  AffectWord.prototype.setGeneralWeight = function(generalWeight) {
    return this.generalWeight = generalWeight;
  };

  AffectWord.prototype.getGeneralValence = function() {
    return this.generalValence;
  };

  AffectWord.prototype.setGeneralValence = function(generalValence) {
    return this.generalValence = generalValence;
  };

  AffectWord.prototype.isZeroEkman = function() {
    if (this.getWeightSum() === 0) {
      return true;
    } else {
      return false;
    }
  };

  AffectWord.prototype.toString = function() {
    var ret;
    return ret = this.word + ' ' + this.generalWeight + ' ' + this.happinessWeight + ' ' + this.sadnessWeight + ' ' + this.angerWeight + ' ' + this.fearWeight + ' ' + this.disgustWeight + ' ' + this.surpriseWeight;
  };

  AffectWord.prototype.getValenceSum = function() {
    var ret;
    return ret = this.happinessWeight - this.sadnessWeight - this.angerWeight - this.fearWeight - this.disgustWeight;
  };

  AffectWord.prototype.getWeightSum = function() {
    var ret;
    return ret = this.happinessWeight + this.sadnessWeight + this.angerWeight + this.fearWeight + this.disgustWeight + this.surpriseWeight;
  };

  return AffectWord;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.AffectWord',
  object: AffectWord
});

var Emotion,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Emotion = (function(_super) {
  __extends(Emotion, _super);

  function Emotion(weight, type) {
    this.weight = weight;
    this.type = type;
  }

  Emotion.prototype.compareTo = function(arg0) {
    var value;
    value = 100 * ((arg0.weight != null) - this.weight);
    if (value === 0) {
      return 1;
    }
    return value;
  };

  Emotion.prototype.getType = function() {
    return this.type;
  };

  Emotion.prototype.setType = function(type) {
    this.type = type;
  };

  Emotion.prototype.getName = function() {
    switch (this.type) {
      case -1:
        return 'NEUTRAL';
      case 0:
        return 'HAPPINESS';
      case 1:
        return 'SADNESS';
      case 2:
        return 'FEAR';
      case 3:
        return 'ANGER';
      case 4:
        return 'DISGUST';
      case 5:
        return 'SURPRISE';
    }
  };

  Emotion.prototype.getWeight = function() {
    return this.weight;
  };

  Emotion.prototype.setWeight = function(weight) {
    this.weight = weight;
  };

  Emotion.prototype.toString = function() {
    return "Type number: " + this.type + ", weight: " + this.weight;
  };

  Emotion.NEUTRAL = -1;

  Emotion.HAPPINESS = 0;

  Emotion.SADNESS = 1;

  Emotion.FEAR = 2;

  Emotion.ANGER = 3;

  Emotion.DISGUST = 4;

  Emotion.SURPRISE = 5;

  Emotion.TYPES = {
    TEXT: "TEXT",
    TOUCH: "TOUCH"
  };

  return Emotion;

})(global.engine.classes.AbstractEmotion);

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.Emotion',
  object: Emotion
});

var EmotionState;

EmotionState = (function() {
  var _Emotion;

  _Emotion = global.engine.classes.Emotion;

  EmotionState.prototype._generalWeight = 0.0;

  EmotionState.prototype._valence = 0;

  EmotionState.prototype._previous = null;

  EmotionState.prototype._emotions = [];

  function EmotionState(text, _emotions, _generalWeight, _valence) {
    this.text = text;
    this._generalWeight = _generalWeight;
    this._valence = _valence;
    this._emotions = _emotions || this._emotions;
    if (this._emotions.length === 0) {
      this._emotions.push(new _Emotion(1.0, _Emotion.NEUTRAL));
    }
    this;
  }

  EmotionState.prototype.getStrongestEmotion = function() {
    return _.max(this._emotions, function(emotion) {
      return emotion.weight;
    });
  };

  EmotionState.prototype.getFirstStrongestEmotions = function(stop) {
    var e, value, _i, _len, _ref;
    value = [];
    _ref = this._emotions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      if (stop <= 0) {
        break;
      }
      value.push(e);
      stop--;
    }
    return value;
  };

  EmotionState.prototype.getHappiness = function() {
    var e, value, _i, _len, _ref;
    value = new _Emotion(0.0, _Emotion.HAPPINESS);
    _ref = this._emotions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      if (e.getType() === _Emotion.HAPPINESS) {
        value = e;
      }
    }
    return value;
  };

  EmotionState.prototype.getHappinessWeight = function() {
    return this.getHappiness().getWeight();
  };

  EmotionState.prototype.getSadness = function() {
    var e, value, _i, _len, _ref;
    value = new _Emotion(0.0, _Emotion.SADNESS);
    _ref = this._emotions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      if (e.getType() === _Emotion.SADNESS) {
        value = e;
      }
    }
    return value;
  };

  EmotionState.prototype.getSadnessWeight = function() {
    return this.getSadness().getWeight();
  };

  EmotionState.prototype.getFear = function() {
    var e, value, _i, _len, _ref;
    value = new _Emotion(0.0, _Emotion.FEAR);
    _ref = this._emotions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      if (e.getType() === _Emotion.FEAR) {
        value = e;
      }
    }
    return value;
  };

  EmotionState.prototype.getFearWeight = function() {
    return this.getFear().getWeight();
  };

  EmotionState.prototype.getAnger = function() {
    var e, value, _i, _len, _ref;
    value = new _Emotion(0.0, _Emotion.ANGER);
    _ref = this._emotions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      if (e.getType() === _Emotion.ANGER) {
        value = e;
      }
    }
    return value;
  };

  EmotionState.prototype.getAngerWeight = function() {
    return this.getAnger().getWeight();
  };

  EmotionState.prototype.getDisgust = function() {
    var e, value, _i, _len, _ref;
    value = new _Emotion(0.0, _Emotion.DISGUST);
    _ref = this._emotions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      if (e.getType() === _Emotion.DISGUST) {
        value = e;
      }
    }
    return value;
  };

  EmotionState.prototype.getDisgustWeight = function() {
    return this.getDisgust().getWeight();
  };

  EmotionState.prototype.getSurprise = function() {
    var e, value, _i, _len, _ref;
    value = new _Emotion(0.0, _Emotion.SURPRISE);
    _ref = this._emotions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      e = _ref[_i];
      if (e.getType() === _Emotion.SURPRISE) {
        value = e;
      }
    }
    return value;
  };

  EmotionState.prototype.getSurpriseWeight = function() {
    return this.getSurprise().getWeight();
  };

  EmotionState.prototype.getPrevious = function() {
    return this.previous;
  };

  EmotionState.prototype.setPrevious = function(_previous) {
    return this.previous = _previous;
  };

  EmotionState.prototype.getValence = function() {
    return this._valence;
  };

  EmotionState.prototype.getGeneralWeight = function() {
    return this._generalWeight;
  };

  EmotionState.prototype.toString = function(separator) {
    var ret;
    if (separator) {
      ret = this.text + separator + this.getGeneralWeight() + separator + this.getValence() + separator + this.getHappinessWeight() + separator + this.getSadnessWeight() + separator + this.getAngerWeight() + separator + this.getFearWeight() + separator + this.getDisgustWeight() + separator + this.getSurpriseWeight();
    } else {
      ret = "Text: " + this.text + "\n General weight: " + this.getGeneralWeight() + "\nValence: " + this.getValence() + "\nhappiness: " + this.getHappinessWeight() + ",\nsadness: " + this.getSadnessWeight() + ",\nanger: " + this.getAngerWeight() + ",\nfear: " + this.getFearWeight() + ",\ndisgust: " + this.getDisgustWeight() + ",\nsurprise: " + this.getSurpriseWeight() + "\n";
    }
    return ret;
  };

  EmotionState.prototype.toHtml = function() {
    var ret;
    ret = "<i>Input text:</i> <b class='htmlText'>" + this.text + "</b><br/> <i>General weight: </i>" + this.getGeneralWeight() + "\n<i>Valence: </i>" + this.getValence() + "\n<i>happiness: </i>" + this.getHappinessWeight() + ",\n<i>sadness: </i>" + this.getSadnessWeight() + ",\n<i>anger: </i>" + this.getAngerWeight() + ",\n<i>fear: </i>" + this.getFearWeight() + ",\n<i>disgust: </i>" + this.getDisgustWeight() + ",\n<i>surprise: </i>" + this.getSurpriseWeight() + "\n";
    return ret;
  };

  return EmotionState;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.classes.EmotionState',
  object: EmotionState
});

 })(ej$);
(function(global) { 
ej$h.MakeGlobalNamespaceFromString('engine.controllers');


/**
* MainController class will be Events Bus
*
* @namespace engine.controllers
* @class MainController
*
 */
var App,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App = (function(_super) {
  var processor;

  __extends(App, _super);

  processor = null;

  App.staticConfig = null;

  function App(config) {
    this.staticConfig = config != null ? config : config = {};
  }


  /**
  * For trigger events, that will be listened/casted in any part of program.
  * Format of the triggered event:
  *   'global:{name}:{action}'
  * @param {String} DESCRIPTION
  * @return {String} DESCRIPTION
  *
   */

  App.prototype.trigger = function(name, action) {};

  App.prototype.getProcessorInstance = function() {
    return processor;
  };

  App.prototype.setProcessorInstance = function(ProcessorClassObjectName) {

    /*processorClass = eval(ProcessorClassObjectName)
    processor = new processorClass(@)
    processor.ready ()->
     */
    processor = global.runtime.app.processor;
    return processor.ready(function() {});
  };

  App.prototype.start = function() {
    if (typeof this.staticConfig.processor !== 'undefined') {
      return this.setProcessorInstance(this.staticConfig.processor);
    } else {
      return this.setProcessorInstance('global.processors.client.ClientProcessor');
    }
  };

  return App;

})(global.engine.classes.AbstractController);

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.controllers.App',
  object: App,
  global: global,
  shortcut: 'e$eca'
});

 })(ej$);
var app;

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine',
  object: this,
  global: global,
  shortcut: 'e$e'
});

global.runtime.helpers.MakeGlobalNamespaceFromString('runtime', global, 'e$r');

app = new global.engine.controllers.App;

global.runtime.app = app;


/*require [
], () ->
 */

app.once('processor:ready', function() {
  var appReadyEvent;
  appReadyEvent = new Event('app:ready');
  window.document.dispatchEvent(appReadyEvent);
  return app.start();
});

 })(ej$);
(function(global) { 
var Processor;

Processor = (function() {
  function Processor() {}

  return Processor;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.processors',
  object: Processor
});


/**
* ClientProcessor class will be ..
* @namespace engine.controllers
* @class ClientProcessor
*
 */
var ClientProcessor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ClientProcessor = (function(_super) {
  var lexUtil;

  __extends(ClientProcessor, _super);

  lexUtil = null;

  ClientProcessor.instances = {};

  ClientProcessor.prototype.emotionStates = [];

  function ClientProcessor(app) {
    this.app = app;

    /*@.on 'lexical:ready', ()->
      @app.emit('processor:ready')
      @.ready.call()
     */
    lexUtil = new global.processors.client.controllers.Lexical(this);
    global.runtime.helpers.MakeGlobalNamespaceAndObject({
      path: 'runtime.helpers.lexical',
      object: lexUtil,
      global: global,
      shortcut: 'e$rhl'
    });
  }

  ClientProcessor.prototype.feelText = function(text, context) {
    var affectWords, capsLockCoef, emoWord, emoWordSurprise, emoticonCoef, exclaminationQoef, hasNegation, modifierCoef, negation, previousWord, ret, sentence, sentences, splittedWord, splittedWords, t1, t2, t3, word, words, _i, _j, _k, _len, _len1, _len2;
    ClientProcessor.__super__.feelText.apply(this, arguments);
    if (context == null) {
      context = 'default';
    }
    console.log('client feelText: ' + text);
    t1 = Date.now();
    text = text.replace('\n', ' ');
    affectWords = [];
    sentences = global.processors.client.controllers.Parsing.parseSentences(text);
    for (_i = 0, _len = sentences.length; _i < _len; _i++) {
      sentence = sentences[_i];
      console.log('- ' + sentence);
      exclaminationQoef = global.processors.client.controllers.Heuristics.computeExclaminationQoef(sentence.toLowerCase());
      if (global.processors.client.controllers.Heuristics.hasExclaminationQuestionMarks(sentence)) {
        emoWordSurprise = new global.engine.processors.client.classes.AffectWord("?!");
        emoWordSurprise.setSurpriseWeight(1.0);
        affectWords.push(emoWordSurprise);
      }
      hasNegation = false;
      splittedWords = global.processors.client.controllers.Parsing.splitWords(sentence, ' ');
      previousWord = '';
      negation = '';
      for (_j = 0, _len1 = splittedWords.length; _j < _len1; _j++) {
        splittedWord = splittedWords[_j];
        emoWord = lexUtil.getEmoticonAffectWord(splittedWord);
        if (emoWord === null) {
          emoWord = lexUtil.getEmoticonAffectWord(splittedWord.toLowerCase());
        }
        if (emoWord !== null) {
          emoticonCoef = global.processors.client.controllers.Heuristics.computeEmoticonCoef(splittedWord, emoWord);
          if (emoticonCoef === 1.0) {
            emoticonCoef = global.processors.client.controllers.Heuristics.computeEmoticonCoef(splittedWord.toLowerCase(), emoWord);
          }
          emoWord.adjustWeights(exclaminationQoef * emoticonCoef);
          affectWords.push(emoWord);
        } else {
          words = global.processors.client.controllers.Parsing.parseWords(splittedWord);
        }
        for (_k = 0, _len2 = words.length; _k < _len2; _k++) {
          word = words[_k];
          if (global.processors.client.controllers.Heuristics.isNegation(word.toLowerCase())) {
            negation = word;
            hasNegation = true;
          }
          emoWord = lexUtil.getAffectWord(word.toLowerCase());
          if (emoWord === null) {
            emoWord = lexUtil.getEmoticonAffectWord(word.toLowerCase());
          }
          if (emoWord !== null) {
            capsLockCoef = global.processors.client.controllers.Heuristics.computeCapsLockQoef(word);
            modifierCoef = global.processors.client.controllers.Heuristics.computeModifier(previousWord);
            if (hasNegation && lexUtil.inTheSamePartOfTheSentence(negation, emoWord.getWord(), sentence)) {
              emoWord.flipValence();
            }
            emoWord.adjustWeights(exclaminationQoef * capsLockCoef * modifierCoef);
            console.groupCollapsed('affect word ', word);
            console.dir(emoWord);
            console.groupEnd();
            affectWords.push(emoWord);
          }
          previousWord = word;
        }
      }
    }
    console.dir('all affectWords: ' + affectWords);
    ret = this.createEmotionState(text, affectWords, 'TEXT');
    this.emotionStates.push(ret);
    t2 = Date.now();
    window.t3 = t3 = t2 - t1;
    console.log('Context feelText time: ' + t3 / 1000 + 's');
    this.app.emit('processor:feel:' + context, ret);
    this.app.emit('processor:feel', ret, context);
    return ret;
  };

  ClientProcessor.prototype.createEmotionState = function(text, affectWords, TYPE) {
    var affectWord, angerWeight, disgustWeight, emotions, fearWeight, generalValence, generalWeight, happinessWeight, ret, sadnessWeight, surpriseWeight, valence, _i, _len;
    ClientProcessor.__super__.createEmotionState.apply(this, arguments);

    /*console.dir
      message: 'abstract createEmotionState: '
      affectWords : affectWords
      TYPE : TYPE
     */
    emotions = [];
    generalValence = 0;
    valence = 0.0;
    generalWeight = 0.0;
    happinessWeight = 0.0;
    sadnessWeight = 0.0;
    angerWeight = 0.0;
    fearWeight = 0.0;
    disgustWeight = 0.0;
    surpriseWeight = 0.0;
    for (_i = 0, _len = affectWords.length; _i < _len; _i++) {
      affectWord = affectWords[_i];
      valence += affectWord.getGeneralValence();
      if (affectWord.getGeneralWeight() > generalWeight) {
        generalWeight = affectWord.getGeneralWeight();
      }
      if (affectWord.getHappinessWeight() > happinessWeight) {
        happinessWeight = affectWord.getHappinessWeight();
      }
      if (affectWord.getSadnessWeight() > sadnessWeight) {
        sadnessWeight = affectWord.getSadnessWeight();
      }
      if (affectWord.getAngerWeight() > angerWeight) {
        angerWeight = affectWord.getAngerWeight();
      }
      if (affectWord.getFearWeight() > fearWeight) {
        fearWeight = affectWord.getFearWeight();
      }
      if (affectWord.getDisgustWeight() > disgustWeight) {
        disgustWeight = affectWord.getDisgustWeight();
      }
      if (affectWord.getSurpriseWeight() > surpriseWeight) {
        surpriseWeight = affectWord.getSurpriseWeight();
      }
    }
    if (valence > 0) {
      generalValence = 1;
    } else if (valence < 0) {
      generalValence = -1;
    }
    if (happinessWeight > 0) {
      emotions.push(new global.engine.classes.Emotion(happinessWeight, global.engine.classes.Emotion.HAPPINESS));
    }
    if (sadnessWeight > 0) {
      emotions.push(new global.engine.classes.Emotion(sadnessWeight, global.engine.classes.Emotion.SADNESS));
    }
    if (angerWeight > 0) {
      emotions.push(new global.engine.classes.Emotion(angerWeight, global.engine.classes.Emotion.ANGER));
    }
    if (fearWeight > 0) {
      emotions.push(new global.engine.classes.Emotion(fearWeight, global.engine.classes.Emotion.FEAR));
    }
    if (disgustWeight > 0) {
      emotions.push(new global.engine.classes.Emotion(disgustWeight, global.engine.classes.Emotion.DISGUST));
    }
    if (surpriseWeight > 0) {
      emotions.push(new global.engine.classes.Emotion(surpriseWeight, global.engine.classes.Emotion.SURPRISE));
    }
    if (emotions.length === 0) {
      emotions.push(new global.engine.classes.Emotion((0.2 + generalWeight) / 1.2, global.engine.classes.Emotion.NEUTRAL));
    }
    ret = new global.engine.classes.EmotionState(text, emotions, generalWeight, generalValence, TYPE);
    return ret;
  };

  ClientProcessor.prototype.ready = function(callback) {
    return ClientProcessor.__super__.ready.apply(this, arguments);
  };

  return ClientProcessor;

})(global.engine.classes.AbstractProcessor);

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'processors.client.ClientProcessor',
  object: ClientProcessor,
  global: global
});

ej$h.MakeGlobalNamespaceFromString('processors.client.controllers');

/**
 * jQuery plugin to convert a given $.ajax response xml object to json.
 *
 * @example var json = $.xml2json(response);
 */
(function(global) {

  // default options based on https://github.com/Leonidas-from-XIV/node-xml2js
  var defaultOptions = {
    attrkey: '$',
    charkey: '_',
    normalize: false
  };

  // extracted from jquery
  function parseXML(data) {
    var xml, tmp;
    if (!data || typeof data !== "string") {
      return null;
    }
    try {
      if (window.DOMParser) { // Standard
        tmp = new DOMParser();
        xml = tmp.parseFromString(data, "text/xml");
      } else { // IE
        xml = new ActiveXObject("Microsoft.XMLDOM");
        xml.async = "false";
        xml.loadXML(data);
      }
    } catch (e) {
      xml = undefined;
    }
    if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
      throw new Error("Invalid XML: " + data);
    }
    return xml;
  }

  function normalize(value, options){
    if (!!options.normalize){
      return (value || '').trim();
    }
    return value;
  }

  function xml2jsonImpl(xml, options) {

    var i, result = {}, attrs = {}, node, child, name;
    result[options.attrkey] = attrs;

    if (xml.attributes && xml.attributes.length > 0) {
      for (i = 0; i < xml.attributes.length; i++){
        var item = xml.attributes.item(i);
        attrs[item.nodeName] = item.value;
      }
    }

    // element content
    if (xml.childElementCount === 0) {
      result[options.charkey] = normalize(xml.textContent, options);
    }

    for (i = 0; i < xml.childNodes.length; i++) {
      node = xml.childNodes[i];
      if (node.nodeType === 1) {

        if (node.attributes.length === 0 && node.childElementCount === 0){
          child = normalize(node.textContent, options);
        } else {
          child = xml2jsonImpl(node, options);
        }

        name = node.nodeName;
        if (result.hasOwnProperty(name)) {
          // For repeating elements, cast/promote the node to array
          var val = result[name];
          if (!Array.isArray(val)) {
            val = [val];
            result[name] = val;
          }
          val.push(child);
        } else {
          result[name] = child;
        }
      }
    }

    return result;
  }

  /**w
   * Converts an xml document or string to a JSON object.
   *
   * @param xml
   */
  function xml2json(xml, options) {
    if (!xml) {
      return xml;
    }

    options = options || defaultOptions;

    if (typeof xml === 'string') {
      xml = parseXML(xml).documentElement;
    }

    var root = {};

    if (xml.attributes.length === 0 && xml.childElementCount === 0){
      root[xml.nodeName] = normalize(xml.textContent, options);
    } else {
      root[xml.nodeName] = xml2jsonImpl(xml, options);
    }

    return root;
  }

  if (typeof jQuery !== 'undefined') {
    jQuery.extend({xml2json: xml2json});
  } else if (typeof module !== 'undefined') {
    module.exports = xml2json;
  } else if (typeof window !== 'undefined') {
    window.xml2json = xml2json;
  }
  // assign to global variable:
  global && (global.x2js = xml2json);
})(ej$l);
var FileReader;

FileReader = (function() {
  function FileReader() {}

  FileReader.readFile = function(fileName, callback) {
    var d, file;
    file = null;
    d = null;
    global.runtime.helpers.ajax.get(fileName, {}, function(data) {
      d = data;
      if (callback) {
        return callback(data);
      }
    }, true);

    /*url:fileName
    async : false,
    crossDomain: true,
    contentType: "application/json",
    dataType: 'jsonp',
    success :(data)->
      callback.call(data)
    error : (e) ->
      console.log(e)
     */
    return file;
  };

  FileReader.parseLine = function(line) {
    var ret;
    return ret = null;
  };

  return FileReader;

})();

ej$h.MakeGlobalNamespaceAndObject({
  path: 'engine.controllers.FileReader',
  object: FileReader
});

var PropertiesManager, dataServerAddr;

dataServerAddr = global.engine.core.Config.dataServerRoot;

PropertiesManager = (function() {
  var properties;

  properties = null;

  function PropertiesManager(fileName, callbackFunction) {

    /*try
      properties = (global.libs.x2js).xml2json(fileContent).properties.entry
    catch e
      properties = (new X2JS()).xml2json(fileContent).properties.entry
     */
    var d, url;
    url = dataServerAddr + fileName;
    d = null;
    global.engine.controllers.FileReader.readFile(url, function(data) {
      properties = global.libs.x2js(data).properties && global.libs.x2js(data).properties.entry;
      return callbackFunction(data);
    });
  }

  PropertiesManager.prototype.getProperty = function(key) {
    var prop, _i, _len;
    for (_i = 0, _len = properties.length; _i < _len; _i++) {
      prop = properties[_i];

      /*if prop['_key'] == key
        return prop['__text']
       */
      if (prop.$['key'] === key) {
        return prop._;
      }
    }
  };

  PropertiesManager.prototype.getIntArrayProperty = function(key) {
    var line, string, strings, values, _i, _len;
    line = this.getProperty(key);
    strings = line.split(', ');
    values = [];
    for (_i = 0, _len = strings.length; _i < _len; _i++) {
      string = strings[_i];
      values.push(parseInt(string, 16));
    }
    return values;
  };

  return PropertiesManager;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'engine.controllers.PropertiesManager',
  object: PropertiesManager
});

var Lexical, dataServerAddr;

dataServerAddr = global.engine.core.Config.dataServerRoot;

Lexical = (function() {
  var affectWords, emoticons, emoticonsFilePath, instance, intensityModifiers, keywordsFilePath, lexiconFilePath, negations, normalisator;

  instance = null;

  keywordsFilePath = '/lex/keywords';

  lexiconFilePath = dataServerAddr + '/lex/lexicon';

  emoticonsFilePath = dataServerAddr + '/lex/lexicon_emoticons';

  affectWords = null;

  emoticons = null;

  negations = null;

  intensityModifiers = null;

  normalisator = 1;

  function Lexical(processor) {
    var pm, that;
    affectWords = [];
    emoticons = [];
    that = this;
    pm = new global.engine.controllers.PropertiesManager(keywordsFilePath, function(data) {
      negations = global.processors.client.controllers.Parsing.splitWords(pm.getProperty('negations'), ', ');
      intensityModifiers = global.processors.client.controllers.Parsing.splitWords(pm.getProperty("intensity.modifiers"), ", ");
      return that.parseLexiconFile(lexiconFilePath, function(data) {
        affectWords = data;
        return that.parseLexiconFile(emoticonsFilePath, function(data) {
          emoticons = data;
          return processor.emit('lexical:ready');
        });
      });
    });
  }

  Lexical.getInstance = function() {
    if (instance === null) {
      instance = new Lexical();
    }
    return instance;
  };

  Lexical.prototype.parseLexiconFile = function(fileName, callback) {
    var parsedFile, that, wordList;
    wordList = [];
    that = this;
    return parsedFile = global.engine.controllers.FileReader.readFile(fileName, function(file) {
      var line, lines, record, _i, _len;
      lines = file.split('\n');
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        record = that.parseLine(line);
        wordList.push(record);
      }
      if (typeof callback !== 'undefined') {
        return callback(wordList);
      }
    });
  };

  Lexical.prototype.parseLine = function(line) {
    value;
    var angerWeight, disgustWeight, fearWeight, generalWeight, happinessWeight, sadnessWeight, surpriseWeight, text, value, word;
    text = line.split(' ');
    word = text[0];
    generalWeight = parseFloat(text[1]);
    happinessWeight = parseFloat(text[2]);
    sadnessWeight = parseFloat(text[3]);
    angerWeight = parseFloat(text[4]);
    fearWeight = parseFloat(text[5]);
    disgustWeight = parseFloat(text[6]);
    surpriseWeight = parseFloat(text[7]);
    value = new global.engine.classes.AffectWord(word, generalWeight, happinessWeight, sadnessWeight, angerWeight, fearWeight, disgustWeight, surpriseWeight, normalisator);
    return value;
  };

  Lexical.prototype.getAffectWord = function(word) {
    var affectWord, _i, _len;
    for (_i = 0, _len = affectWords.length; _i < _len; _i++) {
      affectWord = affectWords[_i];
      if (affectWord.getWord() === word) {
        return affectWord.clone();
      }
    }
    return null;
  };

  Lexical.prototype.getEmoticonAffectWord = function(word) {
    var affectWordEmoticon, _fn, _fn1, _i, _j, _len, _len1;
    _fn = function(affectWordEmoticon) {
      if (affectWordEmoticon.getWord() === word) {
        return affectWordEmoticon.clone();
      }
    };
    for (_i = 0, _len = emoticons.length; _i < _len; _i++) {
      affectWordEmoticon = emoticons[_i];
      _fn(affectWordEmoticon);
    }
    _fn1 = function(affectWordEmoticon) {
      var emoticon;
      emoticon = affectWordEmoticon.getWord();
      if (global.processors.client.controllers.Parsing.containsFirst(word, emoticon)) {
        affectWordEmoticon.setStartsWithEmoticon(true);
        return affectWordEmoticon.clone();
      }
    };
    for (_j = 0, _len1 = emoticons.length; _j < _len1; _j++) {
      affectWordEmoticon = emoticons[_j];
      _fn1(affectWordEmoticon);
    }
    return null;
  };

  Lexical.prototype.getEmoticonWords = function(sentence) {
    var emoticon, value, _fn, _i, _len;
    value = [];
    _fn = function(emoticon) {
      var emoticonWord;
      emoticonWord = emoticon.getWord();
      if (sentence.contains(emoticonWord)) {
        emoticon.setStartsWithEmoticon(true);
        return value.push(emoticon);
      }
    };
    for (_i = 0, _len = emoticons.length; _i < _len; _i++) {
      emoticon = emoticons[_i];
      _fn(emoticon);
    }
    return value;
  };

  Lexical.prototype.getAffectWords = function() {
    return affectWords;
  };

  Lexical.prototype.isNegation = function(word) {
    var ret;
    return ret = negations.indexOf(word) > -1;
  };


  /*hasNegation : (sentence) ->
    for negation in negations
      if sentence.indexOf(negation) > -1
        return true
    return false
   */

  Lexical.prototype.isIntensityModifier = function(word) {
    var ret;
    return ret = intensityModifiers.indexOf(word) > -1;
  };

  Lexical.prototype.inTheSamePartOfTheSentence = function(negation, word, sentence) {
    var i, j, k, tmp, _i;
    i = sentence.indexOf(negation);
    j = sentence.indexOf(word);
    if (i < j) {
      i += negation.length;
    } else {
      tmp = i;
      i = j + word.length;
      j = tmp;
    }
    for (k = _i = i; _i < j; k = _i += 1) {
      if ((sentence[k] === ',') || (sentence[k] === '.') || (sentence[k] === ';') || (sentence[k] === ':') || (sentence[k] === '-')) {
        return false;
      }
    }
    return true;
  };

  return Lexical;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'processors.client.controllers.Lexical',
  object: Lexical
});

var Heuristics;

Heuristics = (function() {
  var countChars, isCapsLock, isIntensityModifier;

  function Heuristics() {}

  isCapsLock = function(word) {
    var x, _i, _ref;
    for (x = _i = 1, _ref = word.length; _i < _ref; x = _i += 1) {
      if (word[x] === word[x].toLowerCase()) {
        return false;
      }
    }
    return true;
  };

  isIntensityModifier = function(word) {
    return global.runtime.helpers.lexical.isIntensityModifier(word);
  };

  countChars = function(arg, c) {
    var count, i, _i, _ref;
    count = 0;
    for (i = _i = 1, _ref = arg.length; _i < _ref; i = _i += 1) {
      if (arg[i] === c) {
        count++;
      }
    }
    return count;
  };

  Heuristics.computeEmoticonCoefForSentence = function(sentence) {
    var emot, emoticons, value, _fn, _i, _len;
    emoticons = global.runtime.helpers.lexical.getEmoticonWords(sentence);
    value = 1.0;
    _fn = function(emot) {
      var emotWord;
      emotWord = emot.getWord();
      return value *= 1.0 + (0.2 * countChars(sentence, emotWord.charAt(emotWord.length - 1)));
    };
    for (_i = 0, _len = emoticons.length; _i < _len; _i++) {
      emot = emoticons[_i];
      _fn(emot);
    }
    return value;
  };

  Heuristics.computeEmoticonCoef = function(word, emoticon) {
    var emotiveWord;
    if (emoticon.startsWithEmoticon()) {
      emotiveWord = emoticon.getWord();
      return 1.0 + (0.2 * countChars(word, emotiveWord.charAt(emotiveWord.length - 1)));
    } else {
      return 1.0;
    }
  };

  Heuristics.computeCapsLockQoef = function(word) {
    if (isCapsLock(word)) {
      return 1.5;
    } else {
      return 1.0;
    }
  };

  Heuristics.isNegation = function(sentence) {
    return global.runtime.helpers.lexical.isNegation(sentence);
  };

  Heuristics.computeModifier = function(word) {
    if (isIntensityModifier(word)) {
      return 1.5;
    } else {
      return 1.0;
    }
  };

  Heuristics.computeCapsLockQoef = function(word) {
    if (isCapsLock(word)) {
      return 1.5;
    } else {
      return 1.0;
    }
  };

  Heuristics.computeExclaminationQoef = function(text) {
    return 1.0 + (0.2 * countChars(text, '!'));
  };


  /*
  * Returns is there a "!?" or a "?!" in a sentece.
  *
  * @param text {@link String} representing the sentence
  * @return boolean representing the existance of a "!?" or a "?!"
   */

  Heuristics.hasExclaminationQuestionMarks = function(text) {
    if ((text.indexOf('?!') > -1) || (text.indexOf('!?') > -1)) {
      return true;
    }
    return false;
  };

  Heuristics.prototype.isCapsLock = function(word) {
    if (word.toUpperCase() === word) {
      return true;
    } else {
      return false;
    }
  };

  Heuristics.prototype.isIntensityModifier = function(word) {
    return global.runtime.helpers.lexical.isIntensityModifier(word);
  };

  Heuristics.prototype.countChars = function(arg, c) {
    var count, i, _i, _ref;
    count = 0;
    for (i = _i = 0, _ref = arg.length; _i < _ref; i = _i += 1) {
      if (arg[i] === c) {
        count++;
      }
    }
    return count;
  };

  return Heuristics;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'processors.client.controllers.Heuristics',
  object: Heuristics
});

var Parsing;

Parsing = (function() {
  function Parsing() {}

  Parsing.parseSentences = function(text) {
    var value;
    value = [];
    value = text.split('.');
    value = value.filter(function(val) {
      return val.trim() !== '';
    });
    return value;
  };

  Parsing.parseWords = function(text) {
    var value;
    value = text.match(/[^\W]+/mig) || [];
    return value;

    /*value = []
    boundary = BreakIterator.getWordInstance()
    boundary.setText(text)
    start = boundary.first()
    for int end = boundary.next(); end != BreakIterator.DONE; start = end, end = boundary.next()
      word = text.substring(start, end)
      value.push(word)
    return value
     */
  };

  Parsing.splitWords = function(text, splitter) {
    return text.split(splitter);
  };

  Parsing.containsFirst = function(container, containee) {
    var x, _i, _ref;
    if (container.length > containee.length) {
      for (x = _i = 1, _ref = containee.length; _i < _ref; x = _i += 1) {
        if (!(containee.charAt(x) === container.charAt(x))) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

  return Parsing;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'processors.client.controllers.Parsing',
  object: Parsing,
  shortcut: 'e$epccp'
});

var processor;

processor = new global.processors.client.ClientProcessor(global.runtime.app);

processor.runOrWait('lexical:ready', function() {
  global.runtime.app.emit('processor:ready');
  return processor.ready.call();
});

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'runtime.app.processor',
  object: processor,
  global: global,
  shortcut: 'eо$p'
});

 })(ej$);
(function(global) { 
var Text;

Text = (function() {
  function Text() {}

  Text.emo = function(value, contextName) {
    if (!contextName || contextName === '' || contextName === 'default') {

      /*if (@text()!='')
        text = @text()
      else
        text = @val()
       */
      contextName = 'default';
      return this.process(value, contextName);
    } else {
      return this.process(value, contextName);
    }
  };

  Text.process = function(text, contextName) {
    var curProc, processedEmo;
    curProc = global.runtime.app.getProcessorInstance();
    return processedEmo = curProc.feelText(text);
  };

  return Text;

})();

ej$h.MakeGlobalNamespaceAndObject({
  path: 'modules.core.input.text',
  object: Text
});

var Logger,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Logger = (function(_super) {
  __extends(Logger, _super);

  function Logger() {
    return Logger.__super__.constructor.apply(this, arguments);
  }

  return Logger;

})(global.engine.classes.AbstractController);

global.runtime.app.on('processor:feel', function(state, contextName) {
  return console.log(state.toString());
});

ej$h.MakeGlobalNamespaceAndObject({
  path: 'engine.output.Logger',
  object: Logger
});

var $;

$ = global.libs && global.libs.$ || window.$;

$.fn.emo1 = function(contextName) {
  var text;
  if (!contextName || contextName === '' || contextName === 'default') {

    /*if (@text()!='')
      text = @text()
    else
      text = @val()
     */
    text = this[0].value;
    return this.process(text, contextName);
  } else if (contextName === 'user1') {
    return {};
  }
};


/*$.fn.feel = ()->
  empathyScope.feel(@val())
 */

$.fn.process1 = function(text, contextName) {
  var context, current;
  context = global.core.api.Context.getInstance(contextName);
  return current = context.feel(text);
};


/*
  $.fn.art = (contextName, moduleName) ->
    ret = null
    if(!moduleName || moduleName == '' || moduleName == 'synemania')
       *synemania effect:
      ret = new global.output.art.sketch.Synemania(@, contextName)
      $(window).on 'context:feel:' + contextName, (e, state)->
        ret.update(state)

    else if (moduleName == 'splash')
       *show user waves!
      debugger
    else
      debugger
    ret
 */

var SynesketchPalette, paletteFilePath;

paletteFilePath = '/palette/standard';

SynesketchPalette = (function() {
  var angerColors, disgustColors, fearColors, happinessColors, randomiser, sadnessColors, surpriseColors;

  fearColors = [];

  angerColors = [];

  disgustColors = [];

  happinessColors = [];

  sadnessColors = [];

  surpriseColors = [];

  randomiser = null;

  function SynesketchPalette(paletteName) {
    var pm;
    pm = new global.engine.controllers.PropertiesManager(paletteFilePath, function() {
      happinessColors = pm.getIntArrayProperty('happiness.palette');
      sadnessColors = pm.getIntArrayProperty('sadness.palette');
      angerColors = pm.getIntArrayProperty('anger.palette');
      fearColors = pm.getIntArrayProperty('fear.palette');
      disgustColors = pm.getIntArrayProperty('disgust.palette');
      return surpriseColors = pm.getIntArrayProperty('surprise.palette');
    });
  }

  SynesketchPalette.prototype.getAngerColors = function() {
    return angerColors;
  };

  SynesketchPalette.prototype.getDisgustColors = function() {
    return disgustColors;
  };

  SynesketchPalette.prototype.getFearColors = function() {
    return fearColors;
  };

  SynesketchPalette.prototype.getHappinessColors = function() {
    return happinessColors;
  };

  SynesketchPalette.prototype.getSadnessColors = function() {
    return sadnessColors;
  };

  SynesketchPalette.prototype.getSurpriseColors = function() {
    return surpriseColors;
  };

  SynesketchPalette.prototype.getRandomHappinessColor = function() {
    return happinessColors[Math.floor(Math.random() * happinessColors.length)];
  };

  SynesketchPalette.prototype.getRandomSadnessColor = function() {
    return sadnessColors[Math.floor(Math.random() * sadnessColors.length)];
  };

  SynesketchPalette.prototype.getRandomAngerColor = function() {
    return angerColors[Math.floor(Math.random() * angerColors.length)];
  };

  SynesketchPalette.prototype.getRandomFearColor = function() {
    return fearColors[Math.floor(Math.random() * fearColors.length)];
  };

  SynesketchPalette.prototype.getRandomDisgustColor = function() {
    return disgustColors[Math.floor(Math.random() * disgustColors.length)];
  };

  SynesketchPalette.prototype.getRandomSurpriseColor = function() {
    return surpriseColors[Math.floor(Math.random() * surpriseColors.length)];
  };

  return SynesketchPalette;

})();

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'output.art.utils.SynesketchPalette',
  object: SynesketchPalette
});


/**
*  Classes which describe emotion-specific particles, that is visual representation of each emotion.
*
* @module Synemania
*
 */
var AngryParticle, DisgustParticle, FearParticle, HappyParticle, NeutralParticle, Particle, SadParticle, SupriseParticle, Synemania, TWO_PI, dim, palette, retObj,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

dim = 500;

TWO_PI = 6.28;

palette = new global.output.art.utils.SynesketchPalette('standard');

window.testParticles = window.testParticles || [];


/**
* Class representing a particle
*
* @namespace emo.output.art.sketch
* @class Particle
*
 */

Particle = (function() {
  Particle.prototype.color = null;

  Particle.prototype.x = null;

  Particle.prototype.y = null;

  Particle.prototype.vx = null;

  Particle.prototype.vy = null;

  Particle.prototype.theta = null;

  Particle.prototype.speed = null;

  Particle.prototype.speedD = null;

  Particle.prototype.thetaD = null;

  Particle.prototype.thetaDD = null;

  function Particle(ctx) {
    this.ctx = ctx;
    this.x = dim / 2;
    this.y = dim / 2;
    testParticles.push(this);
  }

  Particle.prototype.collide = function() {
    throw 'abstract';
  };

  Particle.prototype.move = function() {
    throw 'abstract';
  };

  return Particle;

})();

NeutralParticle = (function(_super) {
  __extends(NeutralParticle, _super);

  NeutralParticle.prototype.gray = null;

  function NeutralParticle(ctx) {
    NeutralParticle.__super__.constructor.call(this, ctx);
    this.gray = 0xFFFFFF;
    this.count = 0;
  }

  NeutralParticle.prototype.collide = function() {
    var _results;
    this.x = dim / 2;
    this.y = dim / 2;
    this.theta = Math.random() * TWO_PI;
    this.speed = Math.randomRange(0.5, 3.5);
    this.speedD = Math.randomRange(0.996, 1.001);
    this.thetaD = 0;
    this.thetaDD = 0;
    _results = [];
    while (Math.abs(this.thetaDD) < 0.00001) {
      _results.push(this.thetaDD = Math.randomRange(-0.001, 0.001));
    }
    return _results;
  };

  NeutralParticle.prototype.move = function() {
    var col16;
    col16 = this.gray.toString(16);
    this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',0.2)';
    this.ctx.fillRect(this.x, this.y - 1, 1, 1);
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);

    /*if(@x>0)
      debugger
     */
    if ((Math.random() * 1000) > 990) {
      this.x = dim / 2;
      this.y = dim / 2;
      this.collide();
    }
    if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
      this.x = dim / 2;
      this.y = dim / 2;
      return this.collide();
    }
  };

  return NeutralParticle;

})(Particle);

HappyParticle = (function(_super) {
  __extends(HappyParticle, _super);

  function HappyParticle() {
    return HappyParticle.__super__.constructor.apply(this, arguments);
  }

  HappyParticle.prototype.collide = function() {
    this.x = dim / 2;
    this.y = dim / 2;
    this.theta = Math.random() * TWO_PI;
    this.speed = Math.randomRange(0.5, 3.5);
    this.speedD = Math.randomRange(0.996, 1.001);
    this.thetaD = 0;
    this.thetaDD = 0;
    while (Math.abs(this.thetaDD) < 0.00001) {
      this.thetaDD = Math.randomRange(-0.001, 0.001);
    }
    return this.color = palette.getRandomHappinessColor();
  };

  HappyParticle.prototype.move = function() {
    var col16, fillst;
    if ((this.color != null)) {
      col16 = this.color.toString(16);
      this.count = this.count || 0;
      this.count += 1;
      this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
      this.ctx.fillRect(this.x, this.y - 1, 1, 1);
      fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
      this.ctx.fillStyle = fillst;
      this.ctx.fillRect(0, this.y + 1, 1, 1);
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);
    this.theta += this.thetaD;
    this.thetaD += this.thetaDD;
    this.speed *= this.speedD;
    if ((Math.random() * 1000) > 997) {
      this.speedD = 1.0;
      this.thetaDD = 0.00001;
      if (Math.random() * 100 > 70) {
        this.x = dim / 2;
        this.y = dim / 2;
        this.collide();
      }
    }
    if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
      return this.collide();
    }
  };

  return HappyParticle;

})(Particle);

SadParticle = (function(_super) {
  __extends(SadParticle, _super);

  function SadParticle() {
    return SadParticle.__super__.constructor.apply(this, arguments);
  }

  SadParticle.prototype.collide = function() {
    this.x = dim / 2;
    this.y = dim / 2;
    this.theta = Math.random() * TWO_PI;
    this.speed = Math.randomRange(0.5, 3.5);
    this.speedD = Math.randomRange(0.996, 1.001);
    this.thetaD = 0;
    this.thetaDD = 0;
    while (Math.abs(this.thetaDD) < 0.00001) {
      this.thetaDD = Math.randomRange(-0.001, 0.001);
    }
    return this.color = palette.getRandomSadnessColor();
  };

  SadParticle.prototype.move = function() {
    var col16, fillst;
    if ((this.color != null)) {
      col16 = this.color.toString(16);
      this.count = this.count || 0;
      this.count += 1;
      this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
      this.ctx.fillRect(this.x, this.y - 1, 1, 1);
      fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
      this.ctx.fillStyle = fillst;
      this.ctx.fillRect(0, this.y + 1, 1, 1);
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);
    this.theta += this.thetaD;
    this.thetaD += this.thetaDD;
    this.speed *= this.speedD;
    if ((Math.random() * 1000) > 997) {
      this.speedD = 1.0;
      this.thetaDD = 0.00001;
      if (Math.random() * 100 > 70) {
        this.collide();
      }
    }
    if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
      return this.collide();
    }
  };

  return SadParticle;

})(Particle);

AngryParticle = (function(_super) {
  __extends(AngryParticle, _super);

  function AngryParticle() {
    return AngryParticle.__super__.constructor.apply(this, arguments);
  }

  AngryParticle.prototype.collide = function() {
    this.x = dim / 2;
    this.y = dim / 2;
    this.theta = Math.random() * TWO_PI;
    this.speed = Math.randomRange(0.5, 3.5);
    this.speedD = Math.randomRange(0.996, 1.001);
    this.thetaD = 0;
    this.thetaDD = 0;
    while (Math.abs(this.thetaDD) < 0.00001) {
      this.thetaDD = Math.randomRange(-0.001, 0.001);
    }
    return this.color = palette.getRandomAngerColor();
  };

  AngryParticle.prototype.move = function() {
    var col16, fillst;
    if ((this.color != null)) {
      col16 = this.color.toString(16);
      this.count = this.count || 0;
      this.count += 1;
      this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
      this.ctx.fillRect(this.x, this.y - 1, 1, 1);
      fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
      this.ctx.fillStyle = fillst;
      this.ctx.fillRect(0, this.y + 1, 1, 1);
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);
    this.theta += this.thetaD;
    this.thetaD += this.thetaDD;
    this.speed *= this.speedD;
    if ((Math.random() * 1000) > 997) {
      this.speedD = 1.0;
      this.thetaDD = 0.00001;
      if (Math.random() * 100 > 70) {
        this.x = dim / 2;
        this.y = dim / 2;
        this.collide();
      }
    }
    if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
      return this.collide();
    }
  };

  return AngryParticle;

})(Particle);

SupriseParticle = (function(_super) {
  __extends(SupriseParticle, _super);

  function SupriseParticle() {
    return SupriseParticle.__super__.constructor.apply(this, arguments);
  }

  SupriseParticle.prototype.collide = function() {
    this.x = dim / 2;
    this.y = dim / 2;
    this.theta = Math.random() * TWO_PI;
    this.speed = Math.randomRange(0.5, 3.5);
    this.speedD = Math.randomRange(0.996, 1.001);
    this.thetaD = 0;
    this.thetaDD = 0;
    while (Math.abs(this.thetaDD) < 0.00001) {
      this.thetaDD = Math.randomRange(-0.001, 0.001);
    }
    return this.color = palette.getRandomSurpriseColor();
  };

  SupriseParticle.prototype.move = function() {
    var col16, fillst;
    if ((this.color != null)) {
      col16 = this.color.toString(16);
      this.count = this.count || 0;
      this.count += 1;
      this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
      this.ctx.fillRect(this.x, this.y - 1, 1, 1);
      fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
      this.ctx.fillStyle = fillst;
      this.ctx.fillRect(0, this.y + 1, 1, 1);
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);
    this.theta += this.thetaD;
    this.thetaD += this.thetaDD;
    this.speed *= this.speedD;
    if ((Math.random() * 1000) > 997) {
      this.speedD = 1.0;
      this.thetaDD = 0.00001;
      if (Math.random() * 100 > 70) {
        this.x = dim / 2;
        this.y = dim / 2;
        this.collide();
      }
    }
    if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
      return this.collide();
    }
  };

  return SupriseParticle;

})(Particle);

FearParticle = (function(_super) {
  __extends(FearParticle, _super);

  function FearParticle() {
    return FearParticle.__super__.constructor.apply(this, arguments);
  }

  FearParticle.prototype.collide = function() {
    this.x = dim / 2;
    this.y = dim / 2;
    this.theta = Math.random() * TWO_PI;
    this.speed = Math.randomRange(0.5, 3.5);
    this.speedD = Math.randomRange(0.996, 1.001);
    this.thetaD = 0;
    this.thetaDD = 0;
    while (Math.abs(this.thetaDD) < 0.00001) {
      this.thetaDD = Math.randomRange(-0.001, 0.001);
    }
    return this.color = palette.getRandomFearColor();
  };

  FearParticle.prototype.move = function() {
    var col16, fillst;
    if ((this.color != null)) {
      col16 = this.color.toString(16);
      this.count = this.count || 0;
      this.count += 1;
      this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
      this.ctx.fillRect(this.x, this.y - 1, 1, 1);
      fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
      this.ctx.fillStyle = fillst;
      this.ctx.fillRect(0, this.y + 1, 1, 1);
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);
    this.theta += this.thetaD;
    this.thetaD += this.thetaDD;
    this.speed *= this.speedD;
    if ((Math.random() * 1000) > 997) {
      this.speedD = 1.0;
      this.thetaDD = 0.00001;
      if (Math.random() * 100 > 70) {
        this.x = dim / 2;
        this.y = dim / 2;
        this.collide();
      }
    }
    if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
      return this.collide();
    }
  };

  return FearParticle;

})(Particle);

DisgustParticle = (function(_super) {
  __extends(DisgustParticle, _super);

  function DisgustParticle() {
    return DisgustParticle.__super__.constructor.apply(this, arguments);
  }

  DisgustParticle.prototype.collide = function() {
    this.x = dim / 2;
    this.y = dim / 2;
    this.theta = Math.random() * TWO_PI;
    this.speed = Math.randomRange(0.5, 3.5);
    this.speedD = Math.randomRange(0.996, 1.001);
    this.thetaD = 0;
    this.thetaDD = 0;
    while (Math.abs(this.thetaDD) < 0.00001) {
      this.thetaDD = Math.randomRange(-0.001, 0.001);
    }
    return this.color = palette.getRandomDisgustColor();
  };

  DisgustParticle.prototype.move = function() {
    var col16, fillst;
    if ((this.color != null)) {
      col16 = this.color.toString(16);
      this.count = this.count || 0;
      this.count += 1;
      this.ctx.fillStyle = 'rgba(' + global.runtime.helpers.hexToR(col16) + ',' + global.runtime.helpers.hexToG(col16) + ',' + global.runtime.helpers.hexToB(col16) + ',' + (50 / this.count) + ')';
      this.ctx.fillRect(this.x, this.y - 1, 1, 1);
      fillst = '#000000, {a}'.replace('{a}', 1 / this.speed);
      this.ctx.fillStyle = fillst;
      this.ctx.fillRect(0, this.y + 1, 1, 1);
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx = this.speed * Math.sin(this.theta);
    this.vy = this.speed * Math.cos(this.theta);
    this.theta += this.thetaD;
    this.thetaD += this.thetaDD;
    this.speed *= this.speedD;
    if ((Math.random() * 1000) > 997) {
      this.speedD = 1.0;
      this.thetaDD = 0.00001;
      if (Math.random() * 100 > 70) {
        this.x = dim / 2;
        this.y = dim / 2;
        this.collide();
      }
    }
    if ((this.x < -dim) || (this.x > dim * 2) || (this.y < -dim) || (this.y > dim * 2)) {
      return this.collide();
    }
  };

  return DisgustParticle;

})(Particle);

Synemania = (function() {
  var angries, currentEmotionState, currentParticles, currentText, disgusties, fearies, happies, maxAngries, maxDisgusties, maxFearies, maxHappies, maxNeutrals, maxSaddies, maxSurprises, neutrals, sadTheta, saddies, saturationFactor, surprises, syne;

  Synemania.serialVersionUID = '1L';

  maxHappies = 800;

  maxSaddies = 800;

  maxAngries = 800;

  maxSurprises = 800;

  maxFearies = 800;

  maxDisgusties = 800;

  maxNeutrals = 30;

  currentEmotionState = new global.engine.classes.EmotionState();

  syne = null;

  neutrals = [];

  happies = [];

  saddies = [];

  angries = [];

  surprises = [];

  fearies = [];

  disgusties = [];

  currentParticles = [];

  sadTheta = null;

  saturationFactor = 1.0;

  currentText = null;

  function Synemania($el, context, dim) {
    this.$el = $el;
    this.context = context;
    this.dim = dim;
    this.setup();
  }

  Synemania.prototype.setup = function() {
    var x, _i, _j, _k, _l, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
    if (this.$el != null) {
      this.$el.width = dim;
      this.$el.height = dim;
    }
    this.ctx = this.$el.getContext("2d");
    for (x = _i = 0, _ref = maxNeutrals - 1; _i < _ref; x = _i += 1) {
      neutrals[x] = new global.modules.sketch.output.synemania.NeutralParticle(this.ctx);
    }
    for (x = _j = 0, _ref1 = maxSaddies - 1; _j < _ref1; x = _j += 1) {
      saddies[x] = new global.modules.sketch.output.synemania.SadParticle(this.ctx);
    }
    for (x = _k = 0, _ref2 = maxHappies - 1; _k < _ref2; x = _k += 1) {
      happies[x] = new global.modules.sketch.output.synemania.HappyParticle(this.ctx);
    }
    for (x = _l = 0, _ref3 = maxAngries - 1; _l < _ref3; x = _l += 1) {
      angries[x] = new global.modules.sketch.output.synemania.AngryParticle(this.ctx);
    }
    for (x = _m = 0, _ref4 = maxSurprises - 1; _m < _ref4; x = _m += 1) {
      surprises[x] = new global.modules.sketch.output.synemania.SupriseParticle(this.ctx);
    }
    for (x = _n = 0, _ref5 = maxFearies - 1; _n < _ref5; x = _n += 1) {
      fearies[x] = new global.modules.sketch.output.synemania.FearParticle(this.ctx);
    }
    for (x = _o = 0, _ref6 = maxDisgusties - 1; _o < _ref6; x = _o += 1) {
      disgusties[x] = new global.modules.sketch.output.synemania.DisgustParticle(this.ctx);
    }
    sadTheta = Math.random() * TWO_PI;
    return currentParticles = neutrals;

    /*try
      syne = new SynesthetiatorEmotion(@)
    catch e
      e.printStackTrace()
     */
  };

  Synemania.prototype.update = function(state) {
    currentEmotionState = state;
    return currentParticles = this.getCurrentParticles(currentEmotionState.getStrongestEmotion());
  };

  Synemania.prototype.draw = function(contextName) {
    var numberOfParticles, strongest, weight, x, _i, _results;
    strongest = currentEmotionState.getStrongestEmotion();
    weight = strongest.getWeight();
    saturationFactor = Math.sqrt(weight);
    numberOfParticles = Math.round(currentParticles.length * saturationFactor);
    _results = [];
    for (x = _i = 0; _i < numberOfParticles; x = _i += 1) {
      _results.push(currentParticles[x].move());
    }
    return _results;
  };

  Synemania.prototype.getCurrentParticles = function(e) {
    var currentEmotion;
    currentEmotion = e.getType();
    if (currentEmotion === global.engine.classes.Emotion.HAPPINESS) {
      return happies;
    } else if (currentEmotion === global.engine.classes.Emotion.SADNESS) {
      return saddies;
    } else if (currentEmotion === global.engine.classes.Emotion.ANGER) {
      return angries;
    } else if (currentEmotion === global.engine.classes.Emotion.FEAR) {
      return fearies;
    } else if (currentEmotion === global.engine.classes.Emotion.DISGUST) {
      return disgusties;
    } else if (currentEmotion === global.engine.classes.Emotion.SURPRISE) {
      return surprises;
    } else {
      return neutrals;
    }
  };

  Synemania.prototype.saturate = function(color) {
    colorMode(HSB, 1.0);
    color = color(hue(color), saturation(color) * 0.98, brightness(color));
    colorMode(RGB, 255);
    return color;
  };

  return Synemania;

})();

retObj = {
  Particle: Particle,
  NeutralParticle: NeutralParticle,
  HappyParticle: HappyParticle,
  SadParticle: SadParticle,
  AngryParticle: AngryParticle,
  SupriseParticle: SupriseParticle,
  FearParticle: FearParticle,
  DisgustParticle: DisgustParticle,
  Synemania: Synemania
};

global.runtime.helpers.MakeGlobalNamespaceAndObject({
  path: 'modules.sketch.output.synemania',
  object: retObj
});


/*global.engine.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.sketch.Particle'
  object: Particle
global.engine.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.sketch.NeutralParticle'
  object: NeutralParticle
global.engine.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.sketch.HappyParticle'
  object: HappyParticle
global.engine.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.sketch.SadParticle'
  object: SadParticle
global.engine.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.sketch.AngryParticle'
  object: AngryParticle
global.engine.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.sketch.SupriseParticle'
  object: SupriseParticle
global.engine.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.sketch.FearParticle'
  object: FearParticle
global.engine.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.sketch.DisgustParticle'
  object: DisgustParticle
global.engine.helpers.MakeGlobalNamespaceAndObject
  path: 'output.art.sketch.Synemania'
  object: Synemania
 */

global.runtime.helpers.MakeGlobalNamespaceFromString('output.art');


/*confObj =
  shim:
    './sketch/_sketch_.js':
      deps: ['./sketch/_sketch_.js']

requirejs.config(confObj)
 */

$.fn.art = function(contextName, moduleName) {
  var ret;
  contextName = contextName || 'default';
  ret = null;
  if (!moduleName || moduleName === '' || moduleName === 'synemania') {
    ret = new global.output.art.sketch.Synemania(this, contextName);
    global.libs.$(window).on('context:feel:' + contextName, function(e, state) {
      var a;
      a = contextName;
      return ret.update(state);
    });
  } else if (moduleName === 'splash') {
    //debugger;
  } else {
    //debugger;
  }
  return ret;
};

$.fn.backgroundContext = function(contextName, moduleName) {
  var that;
  that = this;
  return global.libs.$(window).on('context:feel:' + contextName, function(e, state) {
    var imgData, ret, tempCanvasEl, x, _i;
    tempCanvasEl = global.libs.$('<canvas id="canvasOverlay"></canvas>');
    tempCanvasEl.attr('style', 'width: ' + that.css('width') + '; height: ' + that.css('height') + ';');
    tempCanvasEl[0].getContext('2d').globalAlpha = 0.4;
    contextName = contextName || 'default';
    ret = null;
    if (!moduleName || moduleName === '' || moduleName === 'synemania') {
      ret = new global.output.art.sketch.Synemania(tempCanvasEl, contextName);
      ret.update(state);
      for (x = _i = 1; _i <= 100; x = _i += 1) {
        ret.draw(contextName);
      }
    } else if (moduleName === 'splash') {
      //debugger;
    } else {
    //  debugger;
    }
    imgData = tempCanvasEl[0].toDataURL();
    that.css('background', 'url("' + imgData + '")');
    return that.css('background-size', '100% 100%');
  });
};

$.fn.drawEmotion = function(contextName, sourceEmotionText) {
  var emotion, i, synemania, tempCanvasEl, text, that, x, _i, _ref, _results;
  contextName = contextName || 'default';
  that = this;
  _results = [];
  for (i = _i = 0, _ref = this.length - 1; _i <= _ref; i = _i += 1) {
    tempCanvasEl = that[i];
    text = sourceEmotionText || that[i].innerText;
    emotion = global.modules.core.input.text.emo(text, contextName);
    if (emotion.getStrongestEmotion().getName() === 'HAPPINESS') {
      tempCanvasEl.getContext('2d').globalAlpha = 0.4;
    } else if (emotion.getStrongestEmotion().getName() === 'SURPRISE') {
      tempCanvasEl.getContext('2d').globalAlpha = 0.3;
    } else if (emotion.getStrongestEmotion().getName() === 'NEUTRAL') {
      tempCanvasEl.getContext('2d').globalAlpha = 0.1;
    } else {
      tempCanvasEl.getContext('2d').globalAlpha = 0.1;
    }
    emotion.id = 'emo' + Math.floor(Math.random(2) * 100);
    synemania = new global.modules.sketch.output.synemania.Synemania(tempCanvasEl, contextName);
    synemania.update(emotion);
    _results.push((function() {
      var _j, _results1;
      _results1 = [];
      for (x = _j = 1; _j <= 1000; x = _j += 1) {
        _results1.push(synemania.draw(contextName));
      }
      return _results1;
    })());
  }
  return _results;
};

$.fn.backgroundEmotion = function(contextName, sourceEmotionText) {
  //debugger;
  var attr, emotion, i, imgData, synemania, tempCanvasEl, text, that, x, _i, _j, _ref, _results;
  contextName = contextName || 'default';
  that = this;
  _results = [];
  for (i = _i = 0, _ref = this.length - 1; _i <= _ref; i = _i += 1) {
    tempCanvasEl = document.createElement('canvas');
    tempCanvasEl.id = 'canvasOverlay';
    attr = document.createAttribute('style');
    attr.value = 'width: ' + that.css('width') + '; height: ' + that.css('height') + ';';
    tempCanvasEl.setAttributeNode(attr);
    text = sourceEmotionText || that[i].innerText;
    emotion = global.modules.core.input.text.emo(text, contextName);
    if (emotion.getStrongestEmotion().getName() === 'HAPPINESS') {
      tempCanvasEl.getContext('2d').globalAlpha = 0.4;
    } else if (emotion.getStrongestEmotion().getName() === 'SURPRISE') {
      tempCanvasEl.getContext('2d').globalAlpha = 0.3;
    } else if (emotion.getStrongestEmotion().getName() === 'NEUTRAL') {
      tempCanvasEl.getContext('2d').globalAlpha = 0.1;
    } else {
      tempCanvasEl.getContext('2d').globalAlpha = 0.1;
    }
    emotion.id = 'emo' + Math.floor(Math.random(2) * 100);
    synemania = new global.modules.sketch.output.synemania.Synemania(tempCanvasEl, contextName);
    synemania.update(emotion);
    for (x = _j = 1; _j <= 200; x = _j += 1) {
      synemania.draw(contextName);
    }
    window.tempCanvasEl = tempCanvasEl;
    imgData = tempCanvasEl.toDataURL();
    $(that[i]).css('background-image', 'url("data:' + imgData + '")');
    _results.push($(that[i]).css('background-size', '100% 100%'));
  }
  return _results;
};

$.fn.clearBackground = function() {
  return $(this).css('background-image', global.libs.$(this).prevBackground || 'none');
};

 })(ej$);
 })(ej$);