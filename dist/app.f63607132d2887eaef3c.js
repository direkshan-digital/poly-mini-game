webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

window.JSCompiler_renameProperty = function(prop, obj) { return prop; }

/** @namespace */
let Polymer;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(68);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_legacy_legacy_element_mixin_js__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_legacy_polymer_fn_js__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_legacy_templatizer_behavior_js__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_elements_dom_bind_js__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_elements_dom_repeat_js__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_elements_dom_if_js__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_elements_array_selector_js__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_elements_custom_style_js__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_legacy_mutable_data_behavior_js__ = __webpack_require__(277);









const Base = Object(__WEBPACK_IMPORTED_MODULE_0__lib_legacy_legacy_element_mixin_js__["a" /* LegacyElementMixin */])(HTMLElement).prototype;
/* unused harmony export Base */



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


// unique global id for deduping mixins.
let dedupeId = 0;

/**
 * @constructor
 * @extends {Function}
 */
function MixinFunction(){}
/** @type {(WeakMap | undefined)} */
MixinFunction.prototype.__mixinApplications;
/** @type {(Object | undefined)} */
MixinFunction.prototype.__mixinSet;

const dedupingMixin = function(mixin) {
  let mixinApplications = /** @type {!MixinFunction} */(mixin).__mixinApplications;
  if (!mixinApplications) {
    mixinApplications = new WeakMap();
    /** @type {!MixinFunction} */(mixin).__mixinApplications = mixinApplications;
  }
  // maintain a unique id for each mixin
  let mixinDedupeId = dedupeId++;
  function dedupingMixin(base) {
    let baseSet = /** @type {!MixinFunction} */(base).__mixinSet;
    if (baseSet && baseSet[mixinDedupeId]) {
      return base;
    }
    let map = mixinApplications;
    let extended = map.get(base);
    if (!extended) {
      extended = /** @type {!Function} */(mixin)(base);
      map.set(base, extended);
    }
    // copy inherited mixin set from the extended class, or the base class
    // NOTE: we avoid use of Set here because some browser (IE11)
    // cannot extend a base Set via the constructor.
    let mixinSet = Object.create(/** @type {!MixinFunction} */(extended).__mixinSet || baseSet || null);
    mixinSet[mixinDedupeId] = true;
    /** @type {!MixinFunction} */(extended).__mixinSet = mixinSet;
    return extended;
  }

  return dedupingMixin;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = dedupingMixin;



/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


/** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
let AsyncInterface; // eslint-disable-line no-unused-vars

// Microtask implemented using Mutation Observer
let microtaskCurrHandle = 0;
let microtaskLastHandle = 0;
let microtaskCallbacks = [];
let microtaskNodeContent = 0;
let microtaskNode = document.createTextNode('');
new window.MutationObserver(microtaskFlush).observe(microtaskNode, {characterData: true});

function microtaskFlush() {
  const len = microtaskCallbacks.length;
  for (let i = 0; i < len; i++) {
    let cb = microtaskCallbacks[i];
    if (cb) {
      try {
        cb();
      } catch (e) {
        setTimeout(() => { throw e; });
      }
    }
  }
  microtaskCallbacks.splice(0, len);
  microtaskLastHandle += len;
}

const timeOut = {
  /**
   * Returns a sub-module with the async interface providing the provided
   * delay.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} delay Time to wait before calling callbacks in ms
   * @return {AsyncInterface} An async timeout interface
   */
  after(delay) {
    return  {
      run(fn) { return setTimeout(fn, delay); },
      cancel: window.clearTimeout.bind(window)
    };
  },
  /**
   * Enqueues a function called in the next task.
   *
   * @memberof Polymer.Async.timeOut
   * @param {Function} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run: window.setTimeout.bind(window),
  /**
   * Cancels a previously enqueued `timeOut` callback.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel: window.clearTimeout.bind(window)
};
/* harmony export (immutable) */ __webpack_exports__["b"] = timeOut;


const animationFrame = {
  /**
   * Enqueues a function called at `requestAnimationFrame` timing.
   *
   * @memberof Polymer.Async.animationFrame
   * @param {Function} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run: window.requestAnimationFrame.bind(window),
  /**
   * Cancels a previously enqueued `animationFrame` callback.
   *
   * @memberof Polymer.Async.timeOut
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel: window.cancelAnimationFrame.bind(window)
};
/* unused harmony export animationFrame */


const idlePeriod = {
  /**
   * Enqueues a function called at `requestIdleCallback` timing.
   *
   * @memberof Polymer.Async.idlePeriod
   * @param {function(IdleDeadline)} fn Callback to run
   * @return {number} Handle used for canceling task
   */
  run(fn) {
    return window.requestIdleCallback ?
      window.requestIdleCallback(fn) :
      window.setTimeout(fn, 16);
  },
  /**
   * Cancels a previously enqueued `idlePeriod` callback.
   *
   * @memberof Polymer.Async.idlePeriod
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel(handle) {
    window.cancelIdleCallback ?
      window.cancelIdleCallback(handle) :
      window.clearTimeout(handle);
  }
};
/* unused harmony export idlePeriod */


const microTask = {

  /**
   * Enqueues a function called at microtask timing.
   *
   * @memberof Polymer.Async.microTask
   * @param {Function} callback Callback to run
   * @return {number} Handle used for canceling task
   */
  run(callback) {
    microtaskNode.textContent = microtaskNodeContent++;
    microtaskCallbacks.push(callback);
    return microtaskCurrHandle++;
  },

  /**
   * Cancels a previously enqueued `microTask` callback.
   *
   * @memberof Polymer.Async.microTask
   * @param {number} handle Handle returned from `run` of callback to cancel
   */
  cancel(handle) {
    const idx = handle - microtaskLastHandle;
    if (idx >= 0) {
      if (!microtaskCallbacks[idx]) {
        throw new Error('invalid async handle: ' + handle);
      }
      microtaskCallbacks[idx] = null;
    }
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = microTask;



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(134),
    getValue = __webpack_require__(139);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Element; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_mixins_element_mixin_js__ = __webpack_require__(54);


/**
 * Base class that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * @customElement
 * @polymer
 * @memberof Polymer
 * @constructor
 * @implements {Polymer_ElementMixin}
 * @extends HTMLElement
 * @appliesMixin Polymer.ElementMixin
 * @summary Custom element base class that provides the core API for Polymer's
 *   key meta-programming features including template stamping, data-binding,
 *   attribute deserialization, and property change observation
 */
const Element = Object(__WEBPACK_IMPORTED_MODULE_0__lib_mixins_element_mixin_js__["a" /* ElementMixin */])(HTMLElement);



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DomApi */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return matchesSelector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_settings_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_flattened_nodes_observer_js__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_flush_js__ = __webpack_require__(60);
/* unused harmony reexport flush */
/* unused harmony reexport addDebouncer */





const p = Element.prototype;
/**
 * @const {function(this:Element, string): boolean}
 */
const normalizedMatchesSelector = p.matches || p.matchesSelector ||
  p.mozMatchesSelector || p.msMatchesSelector ||
  p.oMatchesSelector || p.webkitMatchesSelector;

/**
 * Cross-platform `element.matches` shim.
 *
 * @function matchesSelector
 * @memberof Polymer.dom
 * @param {!Element} node Node to check selector against
 * @param {string} selector Selector to match
 * @return {boolean} True if node matched selector
 */
const matchesSelector = function(node, selector) {
  return normalizedMatchesSelector.call(node, selector);
};

/**
 * Node API wrapper class returned from `Polymer.dom.(target)` when
 * `target` is a `Node`.
 */
class DomApi {

  /**
   * @param {Node} node Node for which to create a Polymer.dom helper object.
   */
  constructor(node) {
    this.node = node;
  }

  /**
   * Returns an instance of `Polymer.FlattenedNodesObserver` that
   * listens for node changes on this element.
   *
   * @param {Function} callback Called when direct or distributed children
   *   of this element changes
   * @return {Polymer.FlattenedNodesObserver} Observer instance
   */
  observeNodes(callback) {
    return new __WEBPACK_IMPORTED_MODULE_2__utils_flattened_nodes_observer_js__["a" /* FlattenedNodesObserver */](this.node, callback);
  }

  /**
   * Disconnects an observer previously created via `observeNodes`
   *
   * @param {Polymer.FlattenedNodesObserver} observerHandle Observer instance
   *   to disconnect.
   */
  unobserveNodes(observerHandle) {
    observerHandle.disconnect();
  }

  /**
   * Provided as a backwards-compatible API only.  This method does nothing.
   */
  notifyObserver() {}

  /**
   * Returns true if the provided node is contained with this element's
   * light-DOM children or shadow root, including any nested shadow roots
   * of children therein.
   *
   * @param {Node} node Node to test
   * @return {boolean} Returns true if the given `node` is contained within
   *   this element's light or shadow DOM.
   */
  deepContains(node) {
    if (this.node.contains(node)) {
      return true;
    }
    let n = node;
    let doc = node.ownerDocument;
    // walk from node to `this` or `document`
    while (n && n !== doc && n !== this.node) {
      // use logical parentnode, or native ShadowRoot host
      n = n.parentNode || n.host;
    }
    return n === this.node;
  }

  /**
   * Returns the root node of this node.  Equivalent to `getRoodNode()`.
   *
   * @return {Node} Top most element in the dom tree in which the node
   * exists. If the node is connected to a document this is either a
   * shadowRoot or the document; otherwise, it may be the node
   * itself or a node or document fragment containing it.
   */
  getOwnerRoot() {
    return this.node.getRootNode();
  }

  /**
   * For slot elements, returns the nodes assigned to the slot; otherwise
   * an empty array. It is equivalent to `<slot>.addignedNodes({flatten:true})`.
   *
   * @return {Array<Node>} Array of assigned nodes
   */
  getDistributedNodes() {
    return (this.node.localName === 'slot') ?
      this.node.assignedNodes({flatten: true}) :
      [];
  }

  /**
   * Returns an array of all slots this element was distributed to.
   *
   * @return {Array<HTMLSlotElement>} Description
   */
  getDestinationInsertionPoints() {
    let ip$ = [];
    let n = this.node.assignedSlot;
    while (n) {
      ip$.push(n);
      n = n.assignedSlot;
    }
    return ip$;
  }

  /**
   * Calls `importNode` on the `ownerDocument` for this node.
   *
   * @param {Node} node Node to import
   * @param {boolean} deep True if the node should be cloned deeply during
   *   import
   * @return {Node} Clone of given node imported to this owner document
   */
  importNode(node, deep) {
    let doc = this.node instanceof Document ? this.node :
      this.node.ownerDocument;
    return doc.importNode(node, deep);
  }

  /**
   * @return {Array} Returns a flattened list of all child nodes and nodes assigned
   * to child slots.
   */
  getEffectiveChildNodes() {
    return __WEBPACK_IMPORTED_MODULE_2__utils_flattened_nodes_observer_js__["a" /* FlattenedNodesObserver */].getFlattenedNodes(this.node);
  }

  /**
   * Returns a filtered list of flattened child elements for this element based
   * on the given selector.
   *
   * @param {string} selector Selector to filter nodes against
   * @return {Array<HTMLElement>} List of flattened child elements
   */
  queryDistributedElements(selector) {
    let c$ = this.getEffectiveChildNodes();
    let list = [];
    for (let i=0, l=c$.length, c; (i<l) && (c=c$[i]); i++) {
      if ((c.nodeType === Node.ELEMENT_NODE) &&
          matchesSelector(c, selector)) {
        list.push(c);
      }
    }
    return list;
  }

  /**
   * For shadow roots, returns the currently focused element within this
   * shadow root.
   *
   * @return {Node|undefined} Currently focused element
   */
  get activeElement() {
    let node = this.node;
    return node._activeElement !== undefined ? node._activeElement : node.activeElement;
  }
}

function forwardMethods(proto, methods) {
  for (let i=0; i < methods.length; i++) {
    let method = methods[i];
    proto[method] = /** @this {DomApi} */ function() {
      return this.node[method].apply(this.node, arguments);
    };
  }
}

function forwardReadOnlyProperties(proto, properties) {
  for (let i=0; i < properties.length; i++) {
    let name = properties[i];
    Object.defineProperty(proto, name, {
      get: function() {
        return /** @type {DomApi} */ (this).node[name];
      },
      configurable: true
    });
  }
}

function forwardProperties(proto, properties) {
  for (let i=0; i < properties.length; i++) {
    let name = properties[i];
    Object.defineProperty(proto, name, {
      get: function() {
        return /** @type {DomApi} */ (this).node[name];
      },
      set: function(value) {
        /** @type {DomApi} */ (this).node[name] = value;
      },
      configurable: true
    });
  }
}

forwardMethods(DomApi.prototype, [
  'cloneNode', 'appendChild', 'insertBefore', 'removeChild',
  'replaceChild', 'setAttribute', 'removeAttribute',
  'querySelector', 'querySelectorAll'
]);

forwardReadOnlyProperties(DomApi.prototype, [
  'parentNode', 'firstChild', 'lastChild',
  'nextSibling', 'previousSibling', 'firstElementChild',
  'lastElementChild', 'nextElementSibling', 'previousElementSibling',
  'childNodes', 'children', 'classList'
]);

forwardProperties(DomApi.prototype, [
  'textContent', 'innerHTML'
]);


/**
 * Event API wrapper class returned from `Polymer.dom.(target)` when
 * `target` is an `Event`.
 */
class EventApi {
  constructor(event) {
    this.event = event;
  }

  /**
   * Returns the first node on the `composedPath` of this event.
   *
   * @return {Node} The node this event was dispatched to
   */
  get rootTarget() {
    return this.event.composedPath()[0];
  }

  /**
   * Returns the local (re-targeted) target for this event.
   *
   * @return {Node} The local (re-targeted) target for this event.
   */
  get localTarget() {
    return this.event.target;
  }

  /**
   * Returns the `composedPath` for this event.
   */
  get path() {
    return this.event.composedPath();
  }
}



const dom = function(obj) {
  obj = obj || document;
  if (!obj.__domApi) {
    let helper;
    if (obj instanceof Event) {
      helper = new EventApi(obj);
    } else {
      helper = new DomApi(obj);
    }
    obj.__domApi = helper;
  }
  return obj.__domApi;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = dom;







/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(8),
    getRawTag = __webpack_require__(135),
    objectToString = __webpack_require__(136);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(12),
    isObjectLike = __webpack_require__(9);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(13);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["dashToCamelCase"] = dashToCamelCase;
/* harmony export (immutable) */ __webpack_exports__["camelToDashCase"] = camelToDashCase;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


const caseMap = {};
const DASH_TO_CAMEL = /-[a-z]/g;
const CAMEL_TO_DASH = /([A-Z])/g;

function dashToCamelCase(dash) {
  return caseMap[dash] || (
    caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL,
      (m) => m[1].toUpperCase()
    )
  );
}

function camelToDashCase(camel) {
  return caseMap[camel] || (
    caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase()
  );
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(17),
    isObject = __webpack_require__(5);

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtor;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(84),
    baseAssignValue = __webpack_require__(85);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(86),
    baseKeys = __webpack_require__(88),
    isArrayLike = __webpack_require__(90);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(172),
    listCacheDelete = __webpack_require__(173),
    listCacheGet = __webpack_require__(174),
    listCacheHas = __webpack_require__(175),
    listCacheSet = __webpack_require__(176);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(40);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(190);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(234);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return settings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rootPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return sanitizeDOMValue; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resolve_url_js__ = __webpack_require__(27);



/**
 * Legacy settings.
 * @namespace
 * @memberof Polymer
 */
const settings = undefined || {};
const useShadow = !(window.ShadyDOM);
/* unused harmony export useShadow */

const useNativeCSSProperties = Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
/* unused harmony export useNativeCSSProperties */

const useNativeCustomElements = !(window.customElements.polyfillWrapFlushCallback);
/* unused harmony export useNativeCustomElements */



/**
 * Globally settable property that is automatically assigned to
 * `Polymer.ElementMixin` instances, useful for binding in templates to
 * make URL's relative to an application's root.  Defaults to the main
 * document URL, but can be overridden by users.  It may be useful to set
 * `Polymer.rootPath` to provide a stable application mount path when
 * using client side routing.
 *
 * @memberof Polymer
 */
let rootPath = undefined ||
  Object(__WEBPACK_IMPORTED_MODULE_1__resolve_url_js__["a" /* pathFromUrl */])(document.baseURI || window.location.href);



const setRootPath = function(path) {
  rootPath = path;
};
/* unused harmony export setRootPath */


/**
 * A global callback used to sanitize any value before inserting it into the DOM. The callback signature is:
 *
 *     Polymer = {
 *       sanitizeDOMValue: function(value, name, type, node) { ... }
 *     }
 *
 * Where:
 *
 * `value` is the value to sanitize.
 * `name` is the name of an attribute or property (for example, href).
 * `type` indicates where the value is being inserted: one of property, attribute, or text.
 * `node` is the node where the value is being inserted.
 *
 * @type {(function(*,string,string,Node):*)|undefined}
 * @memberof Polymer
 */
let sanitizeDOMValue = undefined;



const setSanitizeDOMValue = function(newSanitizeDOMValue) {
  sanitizeDOMValue = newSanitizeDOMValue;
};
/* unused harmony export setSanitizeDOMValue */



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return resolveCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return resolveUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pathFromUrl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


let CSS_URL_RX = /(url\()([^)]*)(\))/g;
let ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;
let workingURL;
let resolveDoc;
/**
 * Resolves the given URL against the provided `baseUri'.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} url Input URL to resolve
 * @param {?string=} baseURI Base URI to resolve the URL against
 * @return {string} resolved URL
 */
function resolveUrl(url, baseURI) {
  if (url && ABS_URL.test(url)) {
    return url;
  }
  // Lazy feature detection.
  if (workingURL === undefined) {
    workingURL = false;
    try {
      const u = new URL('b', 'http://a');
      u.pathname = 'c%20d';
      workingURL = (u.href === 'http://a/c%20d');
    } catch (e) {
      // silently fail
    }
  }
  if (!baseURI) {
    baseURI = document.baseURI || window.location.href;
  }
  if (workingURL) {
    return (new URL(url, baseURI)).href;
  }
  // Fallback to creating an anchor into a disconnected document.
  if (!resolveDoc) {
    resolveDoc = document.implementation.createHTMLDocument('temp');
    resolveDoc.base = resolveDoc.createElement('base');
    resolveDoc.head.appendChild(resolveDoc.base);
    resolveDoc.anchor = resolveDoc.createElement('a');
    resolveDoc.body.appendChild(resolveDoc.anchor);
  }
  resolveDoc.base.href = baseURI;
  resolveDoc.anchor.href = url;
  return resolveDoc.anchor.href || url;

}

/**
 * Resolves any relative URL's in the given CSS text against the provided
 * `ownerDocument`'s `baseURI`.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} cssText CSS text to process
 * @param {string} baseURI Base URI to resolve the URL against
 * @return {string} Processed CSS text with resolved URL's
 */
function resolveCss(cssText, baseURI) {
  return cssText.replace(CSS_URL_RX, function(m, pre, url, post) {
    return pre + '\'' +
      resolveUrl(url.replace(/["']/g, ''), baseURI) +
      '\'' + post;
  });
}

/**
 * Returns a path from a given `url`. The path includes the trailing
 * `/` from the url.
 *
 * @memberof Polymer.ResolveUrl
 * @param {string} url Input URL to transform
 * @return {string} resolved path
 */
function pathFromUrl(url) {
  return url.substring(0, url.lastIndexOf('/') + 1);
}






/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = isPath;
/* harmony export (immutable) */ __webpack_exports__["g"] = root;
/* harmony export (immutable) */ __webpack_exports__["b"] = isAncestor;
/* harmony export (immutable) */ __webpack_exports__["c"] = isDescendant;
/* harmony export (immutable) */ __webpack_exports__["i"] = translate;
/* harmony export (immutable) */ __webpack_exports__["e"] = matches;
/* harmony export (immutable) */ __webpack_exports__["f"] = normalize;
/* unused harmony export split */
/* harmony export (immutable) */ __webpack_exports__["a"] = get;
/* harmony export (immutable) */ __webpack_exports__["h"] = set;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


function isPath(path) {
  return path.indexOf('.') >= 0;
}

function root(path) {
  let dotIndex = path.indexOf('.');
  if (dotIndex === -1) {
    return path;
  }
  return path.slice(0, dotIndex);
}

function isAncestor(base, path) {
  //     base.startsWith(path + '.');
  return base.indexOf(path + '.') === 0;
}

function isDescendant(base, path) {
  //     path.startsWith(base + '.');
  return path.indexOf(base + '.') === 0;
}

function translate(base, newBase, path) {
  return newBase + path.slice(base.length);
}

function matches(base, path) {
  return (base === path) ||
         isAncestor(base, path) ||
         isDescendant(base, path);
}

function normalize(path) {
  if (Array.isArray(path)) {
    let parts = [];
    for (let i=0; i<path.length; i++) {
      let args = path[i].toString().split('.');
      for (let j=0; j<args.length; j++) {
        parts.push(args[j]);
      }
    }
    return parts.join('.');
  } else {
    return path;
  }
}

function split(path) {
  if (Array.isArray(path)) {
    return normalize(path).split('.');
  }
  return path.toString().split('.');
}

function get(root, path, info) {
  let prop = root;
  let parts = split(path);
  // Loop over path parts[0..n-1] and dereference
  for (let i=0; i<parts.length; i++) {
    if (!prop) {
      return;
    }
    let part = parts[i];
    prop = prop[part];
  }
  if (info) {
    info.path = parts.join('.');
  }
  return prop;
}

function set(root, path, value) {
  let prop = root;
  let parts = split(path);
  let last = parts[parts.length-1];
  if (parts.length > 1) {
    // Loop over path parts[0..n-2] and dereference
    for (let i=0; i<parts.length-1; i++) {
      let part = parts[i];
      prop = prop[part];
      if (!prop) {
        return;
      }
    }
    // Set value to object at end of path
    prop[last] = value;
  } else {
    // Simple property set
    prop[path] = value;
  }
  return parts.join('.');
}

const isDeep = isPath;
/* unused harmony export isDeep */



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Debouncer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixin_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__async_js__ = __webpack_require__(6);




/** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
let AsyncModule; // eslint-disable-line no-unused-vars

/**
 * @summary Collapse multiple callbacks into one invocation after a timer.
 * @memberof Polymer
 */
class Debouncer {
  constructor() {
    this._asyncModule = null;
    this._callback = null;
    this._timer = null;
  }
  /**
   * Sets the scheduler; that is, a module with the Async interface,
   * a callback and optional arguments to be passed to the run function
   * from the async module.
   *
   * @param {!AsyncModule} asyncModule Object with Async interface.
   * @param {function()} callback Callback to run.
   */
  setConfig(asyncModule, callback) {
    this._asyncModule = asyncModule;
    this._callback = callback;
    this._timer = this._asyncModule.run(() => {
      this._timer = null;
      this._callback();
    });
  }
  /**
   * Cancels an active debouncer and returns a reference to itself.
   */
  cancel() {
    if (this.isActive()) {
      this._asyncModule.cancel(this._timer);
      this._timer = null;
    }
  }
  /**
   * Flushes an active debouncer and returns a reference to itself.
   */
  flush() {
    if (this.isActive()) {
      this.cancel();
      this._callback();
    }
  }
  /**
   * Returns true if the debouncer is active.
   *
   * @return {boolean} True if active.
   */
  isActive() {
    return this._timer != null;
  }
/**
 * Creates a debouncer if no debouncer is passed as a parameter
 * or it cancels an active debouncer otherwise. The following
 * example shows how a debouncer can be called multiple times within a
 * microtask and "debounced" such that the provided callback function is
 * called once. Add this method to a custom element:
 *
 * _debounceWork() {
 *   this._debounceJob = Polymer.Debouncer.debounce(this._debounceJob,
 *       Polymer.Async.microTask, () => {
 *     this._doWork();
 *   });
 * }
 *
 * If the `_debounceWork` method is called multiple times within the same
 * microtask, the `_doWork` function will be called only once at the next
 * microtask checkpoint.
 *
 * Note: In testing it is often convenient to avoid asynchrony. To accomplish
 * this with a debouncer, you can use `Polymer.enqueueDebouncer` and
 * `Polymer.flush`. For example, extend the above example by adding
 * `Polymer.enqueueDebouncer(this._debounceJob)` at the end of the
 * `_debounceWork` method. Then in a test, call `Polymer.flush` to ensure
 * the debouncer has completed.
 *
 * @param {Debouncer?} debouncer Debouncer object.
 * @param {!AsyncModule} asyncModule Object with Async interface
 * @param {function()} callback Callback to run.
 * @return {!Debouncer} Returns a debouncer object.
 */
  static debounce(debouncer, asyncModule, callback) {
    if (debouncer instanceof Debouncer) {
      debouncer.cancel();
    } else {
      debouncer = new Debouncer();
    }
    debouncer.setConfig(asyncModule, callback);
    return debouncer;
  }
}




/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_mixin_js__ = __webpack_require__(4);


// Common implementation for mixin & behavior
function mutablePropertyChange(inst, property, value, old, mutableData) {
  let isObject;
  if (mutableData) {
    isObject = (typeof value === 'object' && value !== null);
    // Pull `old` for Objects from temp cache, but treat `null` as a primitive
    if (isObject) {
      old = inst.__dataTemp[property];
    }
  }
  // Strict equality check, but return false for NaN===NaN
  let shouldChange = (old !== value && (old === old || value === value));
  // Objects are stored in temporary cache (cleared at end of
  // turn), which is used for dirty-checking
  if (isObject && shouldChange) {
    inst.__dataTemp[property] = value;
  }
  return shouldChange;
}

const MutableData = Object(__WEBPACK_IMPORTED_MODULE_0__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_MutableData}
   */
  class MutableData extends superClass {
    /**
     * Overrides `Polymer.PropertyEffects` to provide option for skipping
     * strict equality checking for Objects and Arrays.
     *
     * This method pulls the value to dirty check against from the `__dataTemp`
     * cache (rather than the normal `__data` cache) for Objects.  Since the temp
     * cache is cleared at the end of a turn, this implementation allows
     * side-effects of deep object changes to be processed by re-setting the
     * same object (using the temp cache as an in-turn backstop to prevent
     * cycles due to 2-way notification).
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     * @protected
     */
    _shouldPropertyChange(property, value, old) {
      return mutablePropertyChange(this, property, value, old, true);
    }

  }
  /** @type {boolean} */
  MutableData.prototype.mutableData = false;

  return MutableData;

});
/* harmony export (immutable) */ __webpack_exports__["a"] = MutableData;


const OptionalMutableData = Object(__WEBPACK_IMPORTED_MODULE_0__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @mixinClass
   * @polymer
   * @implements {Polymer_OptionalMutableData}
   */
  class OptionalMutableData extends superClass {

    static get properties() {
      return {
        /**
         * Instance-level flag for configuring the dirty-checking strategy
         * for this element.  When true, Objects and Arrays will skip dirty
         * checking, otherwise strict equality checking will be used.
         */
        mutableData: Boolean
      };
    }

    /**
     * Overrides `Polymer.PropertyEffects` to provide option for skipping
     * strict equality checking for Objects and Arrays.
     *
     * When `this.mutableData` is true on this instance, this method
     * pulls the value to dirty check against from the `__dataTemp` cache
     * (rather than the normal `__data` cache) for Objects.  Since the temp
     * cache is cleared at the end of a turn, this implementation allows
     * side-effects of deep object changes to be processed by re-setting the
     * same object (using the temp cache as an in-turn backstop to prevent
     * cycles due to 2-way notification).
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     * @protected
     */
    _shouldPropertyChange(property, value, old) {
      return mutablePropertyChange(this, property, value, old, this.mutableData);
    }
  }

  return OptionalMutableData;

});
/* harmony export (immutable) */ __webpack_exports__["b"] = OptionalMutableData;


// Export for use by legacy behavior
MutableData._mutablePropertyChange = mutablePropertyChange;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetData = __webpack_require__(65),
    createBind = __webpack_require__(140),
    createCurry = __webpack_require__(141),
    createHybrid = __webpack_require__(70),
    createPartial = __webpack_require__(160),
    getData = __webpack_require__(74),
    mergeData = __webpack_require__(161),
    setData = __webpack_require__(76),
    setWrapToString = __webpack_require__(78),
    toInteger = __webpack_require__(82);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *    1 - `_.bind`
 *    2 - `_.bindKey`
 *    4 - `_.curry` or `_.curryRight` of a bound function
 *    8 - `_.curry`
 *   16 - `_.curryRight`
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 *  128 - `_.rearg`
 *  256 - `_.ary`
 *  512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }
  var data = isBindKey ? undefined : getData(func);

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}

module.exports = createWrap;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(12),
    isObject = __webpack_require__(5);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(17),
    baseLodash = __webpack_require__(36);

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}

// Ensure `LazyWrapper` is an instance of `baseLodash`.
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

module.exports = LazyWrapper;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
function baseLodash() {
  // No operation performed.
}

module.exports = baseLodash;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(165),
    isObjectLike = __webpack_require__(9);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(1),
    stubFalse = __webpack_require__(166);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)(module)))

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(21),
    stackClear = __webpack_require__(177),
    stackDelete = __webpack_require__(178),
    stackGet = __webpack_require__(179),
    stackHas = __webpack_require__(180),
    stackSet = __webpack_require__(181);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(182),
    mapCacheDelete = __webpack_require__(189),
    mapCacheGet = __webpack_require__(191),
    mapCacheHas = __webpack_require__(192),
    mapCacheSet = __webpack_require__(193);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(199),
    stubArray = __webpack_require__(93);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(99);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(2),
    isSymbol = __webpack_require__(13);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export instanceCount */
/* unused harmony export _regLog */
/* unused harmony export register */
/* unused harmony export dumpRegistrations */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_settings_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_mixin_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_style_gather_js__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__property_effects_js__ = __webpack_require__(55);










const ElementMixin = Object(__WEBPACK_IMPORTED_MODULE_2__utils_mixin_js__["a" /* dedupingMixin */])(base => {

  /**
   * @constructor
   * @extends {base}
   * @implements {Polymer_PropertyEffects}
   */
  const polymerElementBase = Object(__WEBPACK_IMPORTED_MODULE_7__property_effects_js__["a" /* PropertyEffects */])(base);

  let caseMap = __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__;

  /**
   * Returns the `properties` object specifically on `klass`. Use for:
   * (1) super chain mixes togther to make `propertiesForClass` which is
   * then used to make `observedAttributes`.
   * (2) properties effects and observers are created from it at `finalize` time.
   *
   * @param {HTMLElement} klass Element class
   * @return {Object} Object containing own properties for this class
   * @private
   */
  function ownPropertiesForClass(klass) {
    if (!klass.hasOwnProperty(
      JSCompiler_renameProperty('__ownProperties', klass))) {
      klass.__ownProperties =
        klass.hasOwnProperty(JSCompiler_renameProperty('properties', klass)) ?
        /** @type PolymerElementConstructor */ (klass).properties : {};
    }
    return klass.__ownProperties;
  }

  /**
   * Returns the `observers` array specifically on `klass`. Use for
   * setting up observers.
   *
   * @param {HTMLElement} klass Element class
   * @return {Array} Array containing own observers for this class
   * @private
   */
  function ownObserversForClass(klass) {
    if (!klass.hasOwnProperty(
      JSCompiler_renameProperty('__ownObservers', klass))) {
      klass.__ownObservers =
        klass.hasOwnProperty(JSCompiler_renameProperty('observers', klass)) ?
        /** @type PolymerElementConstructor */ (klass).observers : [];
    }
    return klass.__ownObservers;
  }

  /**
   * Mixes `props` into `flattenedProps` but upgrades shorthand type
   * syntax to { type: Type}.
   *
   * @param {Object} flattenedProps Bag to collect flattened properties into
   * @param {Object} props Bag of properties to add to `flattenedProps`
   * @return {Object} The input `flattenedProps` bag
   * @private
   */
  function flattenProperties(flattenedProps, props) {
    for (let p in props) {
      let o = props[p];
      if (typeof o == 'function') {
        o = { type: o };
      }
      flattenedProps[p] = o;
    }
    return flattenedProps;
  }

  /**
   * Returns a flattened list of properties mixed together from the chain of all
   * constructor's `config.properties`. This list is used to create
   * (1) observedAttributes,
   * (2) class property default values
   *
   * @param {PolymerElementConstructor} klass Element class
   * @return {PolymerElementProperties} Flattened properties for this class
   * @suppress {missingProperties} class.prototype is not a property for some reason?
   * @private
   */
  function propertiesForClass(klass) {
    if (!klass.hasOwnProperty(
      JSCompiler_renameProperty('__classProperties', klass))) {
      klass.__classProperties =
      flattenProperties({}, ownPropertiesForClass(klass));
      let superCtor = Object.getPrototypeOf(klass.prototype).constructor;
      if (superCtor.prototype instanceof PolymerElement) {
        klass.__classProperties = Object.assign(
          Object.create(propertiesForClass(/** @type PolymerElementConstructor */(superCtor))),
          klass.__classProperties);
      }
    }
    return klass.__classProperties;
  }

  /**
   * Returns a list of properties with default values.
   * This list is created as an optimization since it is a subset of
   * the list returned from `propertiesForClass`.
   * This list is used in `_initializeProperties` to set property defaults.
   *
   * @param {PolymerElementConstructor} klass Element class
   * @return {PolymerElementProperties} Flattened properties for this class
   *   that have default values
   * @private
   */
  function propertyDefaultsForClass(klass) {
    if (!klass.hasOwnProperty(
      JSCompiler_renameProperty('__classPropertyDefaults', klass))) {
      klass.__classPropertyDefaults = null;
      let props = propertiesForClass(klass);
      for (let p in props) {
        let info = props[p];
        if ('value' in info) {
          klass.__classPropertyDefaults = klass.__classPropertyDefaults || {};
          klass.__classPropertyDefaults[p] = info;
        }
      }
    }
    return klass.__classPropertyDefaults;
  }

  /**
   * Returns true if a `klass` has finalized. Called in `ElementClass.finalize()`
   * @param {PolymerElementConstructor} klass Element class
   * @return {boolean} True if all metaprogramming for this class has been
   *   completed
   * @private
   */
  function hasClassFinalized(klass) {
    return klass.hasOwnProperty(JSCompiler_renameProperty('__finalized', klass));
  }

  /**
   * Called by `ElementClass.finalize()`. Ensures this `klass` and
   * *all superclasses* are finalized by traversing the prototype chain
   * and calling `klass.finalize()`.
   *
   * @param {PolymerElementConstructor} klass Element class
   * @private
   */
  function finalizeClassAndSuper(klass) {
    let proto = /** @type PolymerElementConstructor */ (klass).prototype;
    let superCtor = Object.getPrototypeOf(proto).constructor;
    if (superCtor.prototype instanceof PolymerElement) {
      superCtor.finalize();
    }
    finalizeClass(klass);
  }

  /**
   * Configures a `klass` based on a staic `klass.config` object and
   * a `template`. This includes creating accessors and effects
   * for properties in `config` and the `template` as well as preparing the
   * `template` for stamping.
   *
   * @param {PolymerElementConstructor} klass Element class
   * @private
   */
  function finalizeClass(klass) {
    klass.__finalized = true;
    let proto = /** @type PolymerElementConstructor */ (klass).prototype;
    if (klass.hasOwnProperty(
      JSCompiler_renameProperty('is', klass)) && klass.is) {
      register(proto);
    }
    let props = ownPropertiesForClass(klass);
    if (props) {
      finalizeProperties(proto, props);
    }
    let observers = ownObserversForClass(klass);
    if (observers) {
      finalizeObservers(proto, observers, props);
    }
    // note: create "working" template that is finalized at instance time
    let template = /** @type PolymerElementConstructor */ (klass).template;
    if (template) {
      if (typeof template === 'string') {
        let t = document.createElement('template');
        t.innerHTML = template;
        template = t;
      } else {
        template = template.cloneNode(true);
      }
      proto._template = template;
    }
  }

  /**
   * Configures a `proto` based on a `properties` object.
   * Leverages `PropertyEffects` to create property accessors and effects
   * supporting, observers, reflecting to attributes, change notification,
   * computed properties, and read only properties.
   * @param {PolymerElement} proto Element class prototype to add accessors
   *    and effects to
   * @param {Object} properties Flattened bag of property descriptors for
   *    this class
   * @private
   */
  function finalizeProperties(proto, properties) {
    for (let p in properties) {
      createPropertyFromConfig(proto, p, properties[p], properties);
    }
  }

  /**
   * Configures a `proto` based on a `observers` array.
   * Leverages `PropertyEffects` to create observers.
   * @param {PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {Object} observers Flattened array of observer descriptors for
   *   this class
   * @param {Object} dynamicFns Object containing keys for any properties
   *   that are functions and should trigger the effect when the function
   *   reference is changed
   * @private
   */
  function finalizeObservers(proto, observers, dynamicFns) {
    for (let i=0; i < observers.length; i++) {
      proto._createMethodObserver(observers[i], dynamicFns);
    }
  }

  /**
   * Creates effects for a property.
   *
   * Note, once a property has been set to
   * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
   * these values may not be changed. For example, a subclass cannot
   * alter these settings. However, additional `observers` may be added
   * by subclasses.
   *
   * The info object should may contain property metadata as follows:
   *
   * * `type`: {function} type to which an attribute matching the property
   * is deserialized. Note the property is camel-cased from a dash-cased
   * attribute. For example, 'foo-bar' attribute is dersialized to a
   * property named 'fooBar'.
   *
   * * `readOnly`: {boolean} creates a readOnly property and
   * makes a private setter for the private of the form '_setFoo' for a
   * property 'foo',
   *
   * * `computed`: {string} creates a computed property. A computed property
   * also automatically is set to `readOnly: true`. The value is calculated
   * by running a method and arguments parsed from the given string. For
   * example 'compute(foo)' will compute a given property when the
   * 'foo' property changes by executing the 'compute' method. This method
   * must return the computed value.
   *
   * * `reflectToAttriute`: {boolean} If true, the property value is reflected
   * to an attribute of the same name. Note, the attribute is dash-cased
   * so a property named 'fooBar' is reflected as 'foo-bar'.
   *
   * * `notify`: {boolean} sends a non-bubbling notification event when
   * the property changes. For example, a property named 'foo' sends an
   * event named 'foo-changed' with `event.detail` set to the value of
   * the property.
   *
   * * observer: {string} name of a method that runs when the property
   * changes. The arguments of the method are (value, previousValue).
   *
   * Note: Users may want control over modifying property
   * effects via subclassing. For example, a user might want to make a
   * reflectToAttribute property not do so in a subclass. We've chosen to
   * disable this because it leads to additional complication.
   * For example, a readOnly effect generates a special setter. If a subclass
   * disables the effect, the setter would fail unexpectedly.
   * Based on feedback, we may want to try to make effects more malleable
   * and/or provide an advanced api for manipulating them.
   * Also consider adding warnings when an effect cannot be changed.
   *
   * @param {PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {string} name Name of the property.
   * @param {Object} info Info object from which to create property effects.
   * Supported keys:
   * @param {Object} allProps Flattened map of all properties defined in this
   *   element (including inherited properties)
   * @private
   */
  function createPropertyFromConfig(proto, name, info, allProps) {
    // computed forces readOnly...
    if (info.computed) {
      info.readOnly = true;
    }
    // Note, since all computed properties are readOnly, this prevents
    // adding additional computed property effects (which leads to a confusing
    // setup where multiple triggers for setting a property)
    // While we do have `hasComputedEffect` this is set on the property's
    // dependencies rather than itself.
    if (info.computed  && !proto._hasReadOnlyEffect(name)) {
      proto._createComputedProperty(name, info.computed, allProps);
    }
    if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
      proto._createReadOnlyProperty(name, !info.computed);
    }
    if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
      proto._createReflectedProperty(name);
    }
    if (info.notify && !proto._hasNotifyEffect(name)) {
      proto._createNotifyingProperty(name);
    }
    // always add observer
    if (info.observer) {
      proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
    }
  }

  /**
   * Configures an element `proto` to function with a given `template`.
   * The element name `is` and extends `ext` must be specified for ShadyCSS
   * style scoping.
   *
   * @param {PolymerElement} proto Element class prototype to add accessors
   *   and effects to
   * @param {!HTMLTemplateElement} template Template to process and bind
   * @param {string} baseURI URL against which to resolve urls in
   *   style element cssText
   * @param {string} is Tag name (or type extension name) for this element
   * @param {string=} ext For type extensions, the tag name that was extended
   * @private
   */
  function finalizeTemplate(proto, template, baseURI, is, ext) {
    // support `include="module-name"`
    let cssText =
      Object(__WEBPACK_IMPORTED_MODULE_4__utils_style_gather_js__["a" /* cssFromModuleImports */])(is) +
      Object(__WEBPACK_IMPORTED_MODULE_4__utils_style_gather_js__["c" /* cssFromTemplate */])(template, baseURI);
    if (cssText) {
      let style = document.createElement('style');
      style.textContent = cssText;
      template.content.insertBefore(style, template.content.firstChild);
    }
    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(template, is, ext);
    }
    proto._bindTemplate(template);
  }

  /**
   * @polymer
   * @mixinClass
   * @unrestricted
   * @implements {Polymer_ElementMixin}
   */
  class PolymerElement extends polymerElementBase {

    /**
     * Standard Custom Elements V1 API.  The default implementation returns
     * a list of dash-cased attributes based on a flattening of all properties
     * declared in `static get properties()` for this element and any
     * superclasses.
     *
     * @return {Array} Observed attribute list
     */
    static get observedAttributes() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('__observedAttributes', this))) {
        let list = [];
        let properties = propertiesForClass(this);
        for (let prop in properties) {
          list.push(Object(__WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__["camelToDashCase"])(prop));
        }
        this.__observedAttributes = list;
      }
      return this.__observedAttributes;
    }

    /**
     * Called automatically when the first element instance is created to
     * ensure that class finalization work has been completed.
     * May be called by users to eagerly perform class finalization work
     * prior to the creation of the first element instance.
     *
     * Class finalization work generally includes meta-programming such as
     * creating property accessors and any property effect metadata needed for
     * the features used.
     *
     * @public
     */
    static finalize() {
      if (!hasClassFinalized(this)) {
        finalizeClassAndSuper(this);
      }
    }

    /**
     * Returns the template that will be stamped into this element's shadow root.
     *
     * If a `static get is()` getter is defined, the default implementation
     * will return the first `<template>` in a `dom-module` whose `id`
     * matches this element's `is`.
     *
     * Users may override this getter to return an arbitrary template
     * (in which case the `is` getter is unnecessary). The template returned
     * may be either an `HTMLTemplateElement` or a string that will be
     * automatically parsed into a template.
     *
     * Note that when subclassing, if the super class overrode the default
     * implementation and the subclass would like to provide an alternate
     * template via a `dom-module`, it should override this getter and
     * return `Polymer.DomModule.import(this.is, 'template')`.
     *
     * If a subclass would like to modify the super class template, it should
     * clone it rather than modify it in place.  If the getter does expensive
     * work such as cloning/modifying a template, it should memoize the
     * template for maximum performance:
     *
     *   let memoizedTemplate;
     *   class MySubClass extends MySuperClass {
     *     static get template() {
     *       if (!memoizedTemplate) {
     *         memoizedTemplate = super.template.cloneNode(true);
     *         let subContent = document.createElement('div');
     *         subContent.textContent = 'This came from MySubClass';
     *         memoizedTemplate.content.appendChild(subContent);
     *       }
     *       return memoizedTemplate;
     *     }
     *   }
     *
     * @return {HTMLTemplateElement|string} Template to be stamped
     */
    static get template() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
        this._template = __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */] && __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */].import(
          /** @type PolymerElementConstructor*/ (this).is, 'template') ||
          // note: implemented so a subclass can retrieve the super
          // template; call the super impl this way so that `this` points
          // to the superclass.
          Object.getPrototypeOf(/** @type PolymerElementConstructor*/ (this).prototype).constructor.template;
      }
      return this._template;
    }

    /**
     * Path matching the url from which the element was imported.
     * This path is used to resolve url's in template style cssText.
     * The `importPath` property is also set on element instances and can be
     * used to create bindings relative to the import path.
     * Defaults to the path matching the url containing a `dom-module` element
     * matching this element's static `is` property.
     * Note, this path should contain a trailing `/`.
     *
     * @return {string} The import path for this element class
     */
    static get importPath() {
      if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
          const module = __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */] && __WEBPACK_IMPORTED_MODULE_6__elements_dom_module_js__["a" /* DomModule */].import(/** @type PolymerElementConstructor */ (this).is);
          this._importPath = module ? module.assetpath : '' ||
          Object.getPrototypeOf(/** @type PolymerElementConstructor*/ (this).prototype).constructor.importPath;
      }
      return this._importPath;
    }

    constructor() {
      super();
      /** @type {HTMLTemplateElement} */
      this._template;
      /** @type {string} */
      this._importPath;
      /** @type {string} */
      this.rootPath;
      /** @type {string} */
      this.importPath;
      /** @type {StampedTemplate | HTMLElement | ShadowRoot} */
      this.root;
      /** @type {!Object<string, !Node>} */
      this.$;
    }

    /**
     * Overrides the default `Polymer.PropertyAccessors` to ensure class
     * metaprogramming related to property accessors and effects has
     * completed (calls `finalize`).
     *
     * It also initializes any property defaults provided via `value` in
     * `properties` metadata.
     *
     * @override
     * @suppress {invalidCasts}
     */
    _initializeProperties() {
      instanceCount++;
      this.constructor.finalize();
      const importPath = this.constructor.importPath;
      // note: finalize template when we have access to `localName` to
      // avoid dependence on `is` for polyfilling styling.
      if (this._template && !this._template.__polymerFinalized) {
        this._template.__polymerFinalized = true;
        const baseURI =
          importPath ? Object(__WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__["c" /* resolveUrl */])(importPath) : '';
        finalizeTemplate(/** @type {!PolymerElement} */(this.__proto__), this._template, baseURI,
          /**@type {!HTMLElement}*/(this).localName);
      }
      super._initializeProperties();
      // set path defaults
      this.rootPath = __WEBPACK_IMPORTED_MODULE_1__utils_settings_js__["b" /* rootPath */];
      this.importPath = importPath;
      // apply property defaults...
      let p$ = propertyDefaultsForClass(this.constructor);
      if (!p$) {
        return;
      }
      for (let p in p$) {
        let info = p$[p];
        // Don't set default value if there is already an own property, which
        // happens when a `properties` property with default but no effects had
        // a property set (e.g. bound) by its host before upgrade
        if (!this.hasOwnProperty(p)) {
          let value = typeof info.value == 'function' ?
            info.value.call(this) :
            info.value;
          // Set via `_setProperty` if there is an accessor, to enable
          // initializing readOnly property defaults
          if (this._hasAccessor(p)) {
            this._setPendingProperty(p, value, true);
          } else {
            this[p] = value;
          }
        }
      }
    }

    /**
     * Provides a default implementation of the standard Custom Elements
     * `connectedCallback`.
     *
     * The default implementation enables the property effects system and
     * flushes any pending properties, and updates shimmed CSS properties
     * when using the ShadyCSS scoping/custom properties polyfill.
     *
     * @suppress {invalidCasts}
     */
    connectedCallback() {
      if (window.ShadyCSS && this._template) {
        window.ShadyCSS.styleElement(/** @type {!HTMLElement} */(this));
      }
      this._enableProperties();
    }

    /**
     * Provides a default implementation of the standard Custom Elements
     * `disconnectedCallback`.
     */
    disconnectedCallback() {}

    /**
     * Stamps the element template.
     *
     * @override
     */
    ready() {
      if (this._template) {
        this.root = this._stampTemplate(this._template);
        this.$ = this.root.$;
      }
      super.ready();
    }

    /**
     * Implements `PropertyEffects`'s `_readyClients` call. Attaches
     * element dom by calling `_attachDom` with the dom stamped from the
     * element's template via `_stampTemplate`. Note that this allows
     * client dom to be attached to the element prior to any observers
     * running.
     *
     * @override
     */
    _readyClients() {
      if (this._template) {
        this.root = this._attachDom(/** @type {StampedTemplate} */(this.root));
      }
      // The super._readyClients here sets the clients initialized flag.
      // We must wait to do this until after client dom is created/attached
      // so that this flag can be checked to prevent notifications fired
      // during this process from being handled before clients are ready.
      super._readyClients();
    }


    /**
     * Attaches an element's stamped dom to itself. By default,
     * this method creates a `shadowRoot` and adds the dom to it.
     * However, this method may be overridden to allow an element
     * to put its dom in another location.
     *
     * @throws {Error}
     * @suppress {missingReturn}
     * @param {StampedTemplate} dom to attach to the element.
     * @return {ShadowRoot} node to which the dom has been attached.
     */
    _attachDom(dom) {
      if (this.attachShadow) {
        if (dom) {
          if (!this.shadowRoot) {
            this.attachShadow({mode: 'open'});
          }
          this.shadowRoot.appendChild(dom);
          return this.shadowRoot;
        }
        return null;
      } else {
        throw new Error('ShadowDOM not available. ' +
          // TODO(sorvell): move to compile-time conditional when supported
        'Polymer.Element can create dom as children instead of in ' +
        'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
      }
    }

    /**
     * Provides a default implementation of the standard Custom Elements
     * `attributeChangedCallback`.
     *
     * By default, attributes declared in `properties` metadata are
     * deserialized using their `type` information to properties of the
     * same name.  "Dash-cased" attributes are deserialzed to "camelCase"
     * properties.
     *
     * @param {string} name Name of attribute.
     * @param {?string} old Old value of attribute.
     * @param {?string} value Current value of attribute.
     * @override
     */
    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        let property = caseMap.dashToCamelCase(name);
        let type = propertiesForClass(this.constructor)[property].type;
        if (!this._hasReadOnlyEffect(property)) {
          this._attributeToProperty(name, value, type);
        }
      }
    }

    /**
     * When using the ShadyCSS scoping and custom property shim, causes all
     * shimmed styles in this element (and its subtree) to be updated
     * based on current custom property values.
     *
     * The optional parameter overrides inline custom property styles with an
     * object of properties where the keys are CSS properties, and the values
     * are strings.
     *
     * Example: `this.updateStyles({'--color': 'blue'})`
     *
     * These properties are retained unless a value of `null` is set.
     *
     * @param {Object=} properties Bag of custom property key/values to
     *   apply to this element.
     * @suppress {invalidCasts}
     */
    updateStyles(properties) {
      if (window.ShadyCSS) {
        window.ShadyCSS.styleSubtree(/** @type {!HTMLElement} */(this), properties);
      }
    }

    /**
     * Rewrites a given URL relative to a base URL. The base URL defaults to
     * the original location of the document containing the `dom-module` for
     * this element. This method will return the same URL before and after
     * bundling.
     *
     * @param {string} url URL to resolve.
     * @param {string=} base Optional base URL to resolve against, defaults
     * to the element's `importPath`
     * @return {string} Rewritten URL relative to base
     */
    resolveUrl(url, base) {
      if (!base && this.importPath) {
        base = Object(__WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__["c" /* resolveUrl */])(this.importPath);
      }
      return Object(__WEBPACK_IMPORTED_MODULE_5__utils_resolve_url_js__["c" /* resolveUrl */])(url, base);
    }

    /**
     * Overrides `PropertyAccessors` to add map of dynamic functions on
     * template info, for consumption by `PropertyEffects` template binding
     * code. This map determines which method templates should have accessors
     * created for them.
     *
     * @override
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateContent(template, templateInfo, nodeInfo) {
      templateInfo.dynamicFns = templateInfo.dynamicFns || propertiesForClass(this);
      return super._parseTemplateContent(template, templateInfo, nodeInfo);
    }

  }

  return PolymerElement;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = ElementMixin;


let instanceCount = 0;
const registrations = [];
/* unused harmony export registrations */


function _regLog(prototype) {
  console.log('[' + prototype.is + ']: registered');
}

function register(prototype) {
  registrations.push(prototype);
  undefined && _regLog(prototype);
}

function dumpRegistrations() {
  registrations.forEach(_regLog);
}

const updateStyles = function(props) {
  if (window.ShadyCSS) {
    window.ShadyCSS.styleDocument(props);
  }
};
/* unused harmony export updateStyles */



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_path_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__property_accessors_js__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__template_stamp_js__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_settings_js__ = __webpack_require__(26);









/** @const {Object} */
const CaseMap = __WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__;

// Monotonically increasing unique ID used for de-duping effects triggered
// from multiple properties in the same turn
let dedupeId = 0;

/**
 * Property effect types; effects are stored on the prototype using these keys
 * @enum {string}
 */
const TYPES = {
  COMPUTE: '__computeEffects',
  REFLECT: '__reflectEffects',
  NOTIFY: '__notifyEffects',
  PROPAGATE: '__propagateEffects',
  OBSERVE: '__observeEffects',
  READ_ONLY: '__readOnly'
};

/**
 * @typedef {{
 * name: (string | undefined),
 * structured: (boolean | undefined),
 * wildcard: (boolean | undefined)
 * }}
 */
let DataTrigger; //eslint-disable-line no-unused-vars

/**
 * @typedef {{
 * info: ?,
 * trigger: (!DataTrigger | undefined),
 * fn: (!Function | undefined)
 * }}
 */
let DataEffect; //eslint-disable-line no-unused-vars

let PropertyEffectsType; //eslint-disable-line no-unused-vars

/**
 * Ensures that the model has an own-property map of effects for the given type.
 * The model may be a prototype or an instance.
 *
 * Property effects are stored as arrays of effects by property in a map,
 * by named type on the model. e.g.
 *
 *   __computeEffects: {
 *     foo: [ ... ],
 *     bar: [ ... ]
 *   }
 *
 * If the model does not yet have an effect map for the type, one is created
 * and returned.  If it does, but it is not an own property (i.e. the
 * prototype had effects), the the map is deeply cloned and the copy is
 * set on the model and returned, ready for new effects to be added.
 *
 * @param {Object} model Prototype or instance
 * @param {string} type Property effect type
 * @return {Object} The own-property map of effects for the given type
 * @private
 */
function ensureOwnEffectMap(model, type) {
  let effects = model[type];
  if (!effects) {
    effects = model[type] = {};
  } else if (!model.hasOwnProperty(type)) {
    effects = model[type] = Object.create(model[type]);
    for (let p in effects) {
      let protoFx = effects[p];
      let instFx = effects[p] = Array(protoFx.length);
      for (let i=0; i<protoFx.length; i++) {
        instFx[i] = protoFx[i];
      }
    }
  }
  return effects;
}

// -- effects ----------------------------------------------

/**
 * Runs all effects of a given type for the given set of property changes
 * on an instance.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} effects Object map of property-to-Array of effects
 * @param {Object} props Bag of current property changes
 * @param {Object=} oldProps Bag of previous values for changed properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
  if (effects) {
    let ran = false;
    let id = dedupeId++;
    for (let prop in props) {
      if (runEffectsForProperty(inst, effects, id, prop, props, oldProps, hasPaths, extraArgs)) {
        ran = true;
      }
    }
    return ran;
  }
  return false;
}

/**
 * Runs a list of effects for a given property.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} effects Object map of property-to-Array of effects
 * @param {number} dedupeId Counter used for de-duping effects
 * @param {string} prop Name of changed property
 * @param {*} props Changed properties
 * @param {*} oldProps Old properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
  let ran = false;
  let rootProperty = hasPaths ? Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* root */])(prop) : prop;
  let fxs = effects[rootProperty];
  if (fxs) {
    for (let i=0, l=fxs.length, fx; (i<l) && (fx=fxs[i]); i++) {
      if ((!fx.info || fx.info.lastRun !== dedupeId) &&
          (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
        if (fx.info) {
          fx.info.lastRun = dedupeId;
        }
        fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
        ran = true;
      }
    }
  }
  return ran;
}

/**
 * Determines whether a property/path that has changed matches the trigger
 * criteria for an effect.  A trigger is a descriptor with the following
 * structure, which matches the descriptors returned from `parseArg`.
 * e.g. for `foo.bar.*`:
 * ```
 * trigger: {
 *   name: 'a.b',
 *   structured: true,
 *   wildcard: true
 * }
 * ```
 * If no trigger is given, the path is deemed to match.
 *
 * @param {string} path Path or property that changed
 * @param {DataTrigger} trigger Descriptor
 * @return {boolean} Whether the path matched the trigger
 */
function pathMatchesTrigger(path, trigger) {
  if (trigger) {
    let triggerPath = trigger.name;
    return (triggerPath == path) ||
      (trigger.structured && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["b" /* isAncestor */])(triggerPath, path)) ||
      (trigger.wildcard && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["c" /* isDescendant */])(triggerPath, path));
  } else {
    return true;
  }
}

/**
 * Implements the "observer" effect.
 *
 * Calls the method with `info.methodName` on the instance, passing the
 * new and old values.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @private
 */
function runObserverEffect(inst, property, props, oldProps, info) {
  let fn = inst[info.methodName];
  let changedProp = info.property;
  if (fn) {
    fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
  } else if (!info.dynamicFn) {
    console.warn('observer method `' + info.methodName + '` not defined');
  }
}

/**
 * Runs "notify" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * will dispatch path notification events in the case that the property
 * changed was a path and the root property for that path didn't have a
 * "notify" effect.  This is to maintain 1.0 behavior that did not require
 * `notify: true` to ensure object sub-property notifications were
 * sent.
 *
 * @param {!PropertyEffectsType} inst The instance with effects to run
 * @param {Object} notifyProps Bag of properties to notify
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @private
 */
function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
  // Notify
  let fxs = inst[TYPES.NOTIFY];
  let notified;
  let id = dedupeId++;
  // Try normal notify effects; if none, fall back to try path notification
  for (let prop in notifyProps) {
    if (notifyProps[prop]) {
      if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
        notified = true;
      } else if (hasPaths && notifyPath(inst, prop, props)) {
        notified = true;
      }
    }
  }
  // Flush host if we actually notified and host was batching
  // And the host has already initialized clients; this prevents
  // an issue with a host observing data changes before clients are ready.
  let host;
  if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
    host._invalidateProperties();
  }
}

/**
 * Dispatches {property}-changed events with path information in the detail
 * object to indicate a sub-path of the property was changed.
 *
 * @param {!PropertyEffectsType} inst The element from which to fire the event
 * @param {string} path The path that was changed
 * @param {Object} props Bag of current property changes
 * @return {boolean} Returns true if the path was notified
 * @private
 */
function notifyPath(inst, path, props) {
  let rootProperty = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* root */])(path);
  if (rootProperty !== path) {
    let eventName = Object(__WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__["camelToDashCase"])(rootProperty) + '-changed';
    dispatchNotifyEvent(inst, eventName, props[path], path);
    return true;
  }
  return false;
}

/**
 * Dispatches {property}-changed events to indicate a property (or path)
 * changed.
 *
 * @param {!PropertyEffectsType} inst The element from which to fire the event
 * @param {string} eventName The name of the event to send ('{property}-changed')
 * @param {*} value The value of the changed property
 * @param {string | null | undefined} path If a sub-path of this property changed, the path
 *   that changed (optional).
 * @private
 * @suppress {invalidCasts}
 */
function dispatchNotifyEvent(inst, eventName, value, path) {
  let detail = {
    value: value,
    queueProperty: true
  };
  if (path) {
    detail.path = path;
  }
  /** @type {!HTMLElement} */(inst).dispatchEvent(new CustomEvent(eventName, { detail }));
}

/**
 * Implements the "notify" effect.
 *
 * Dispatches a non-bubbling event named `info.eventName` on the instance
 * with a detail object containing the new `value`.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @private
 */
function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
  let rootProperty = hasPaths ? Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* root */])(property) : property;
  let path = rootProperty != property ? property : null;
  let value = path ? Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(inst, path) : inst.__data[property];
  if (path && value === undefined) {
    value = props[property];  // specifically for .splices
  }
  dispatchNotifyEvent(inst, info.eventName, value, path);
}

/**
 * Handler function for 2-way notification events. Receives context
 * information captured in the `addNotifyListener` closure from the
 * `__notifyListeners` metadata.
 *
 * Sets the value of the notified property to the host property or path.  If
 * the event contained path information, translate that path to the host
 * scope's name for that path first.
 *
 * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
 * @param {!PropertyEffectsType} inst Host element instance handling the notification event
 * @param {string} fromProp Child element property that was bound
 * @param {string} toPath Host property/path that was bound
 * @param {boolean} negate Whether the binding was negated
 * @private
 */
function handleNotification(event, inst, fromProp, toPath, negate) {
  let value;
  let detail = /** @type {Object} */(event.detail);
  let fromPath = detail && detail.path;
  if (fromPath) {
    toPath = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["i" /* translate */])(fromProp, toPath, fromPath);
    value = detail && detail.value;
  } else {
    value = event.target[fromProp];
  }
  value = negate ? !value : value;
  if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
    if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath))
      && (!detail || !detail.queueProperty)) {
      inst._invalidateProperties();
    }
  }
}

/**
 * Implements the "reflect" effect.
 *
 * Sets the attribute named `info.attrName` to the given property value.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @private
 */
function runReflectEffect(inst, property, props, oldProps, info) {
  let value = inst.__data[property];
  if (__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["c" /* sanitizeDOMValue */]) {
    value = Object(__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["c" /* sanitizeDOMValue */])(value, info.attrName, 'attribute', /** @type {Node} */(inst));
  }
  inst._propertyToAttribute(property, info.attrName, value);
}

/**
 * Runs "computed" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * continues to run computed effects based on the output of each pass until
 * there are no more newly computed properties.  This ensures that all
 * properties that will be computed by the initial set of changes are
 * computed before other effects (binding propagation, observers, and notify)
 * run.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {!Object} changedProps Bag of changed properties
 * @param {!Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @private
 */
function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
  let computeEffects = inst[TYPES.COMPUTE];
  if (computeEffects) {
    let inputProps = changedProps;
    while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
      Object.assign(oldProps, inst.__dataOld);
      Object.assign(changedProps, inst.__dataPending);
      inputProps = inst.__dataPending;
      inst.__dataPending = null;
    }
  }
}

/**
 * Implements the "computed property" effect by running the method with the
 * values of the arguments specified in the `info` object and setting the
 * return value to the computed property specified.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @private
 */
function runComputedEffect(inst, property, props, oldProps, info) {
  let result = runMethodEffect(inst, property, props, oldProps, info);
  let computedProp = info.methodInfo;
  if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
    inst._setPendingProperty(computedProp, result, true);
  } else {
    inst[computedProp] = result;
  }
}

/**
 * Computes path changes based on path links set up using the `linkPaths`
 * API.
 *
 * @param {!PropertyEffectsType} inst The instance whose props are changing
 * @param {string | !Array<(string|number)>} path Path that has changed
 * @param {*} value Value of changed path
 * @private
 */
function computeLinkedPaths(inst, path, value) {
  let links = inst.__dataLinkedPaths;
  if (links) {
    let link;
    for (let a in links) {
      let b = links[a];
      if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["c" /* isDescendant */])(a, path)) {
        link = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["i" /* translate */])(a, b, path);
        inst._setPendingPropertyOrPath(link, value, true, true);
      } else if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["c" /* isDescendant */])(b, path)) {
        link = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["i" /* translate */])(b, a, path);
        inst._setPendingPropertyOrPath(link, value, true, true);
      }
    }
  }
}

// -- bindings ----------------------------------------------

/**
 * Adds binding metadata to the current `nodeInfo`, and binding effects
 * for all part dependencies to `templateInfo`.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {NodeInfo} nodeInfo Node metadata for current template node
 * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
 * @param {string} target Target property name
 * @param {!Array<!BindingPart>} parts Array of binding part metadata
 * @param {string=} literal Literal text surrounding binding parts (specified
 *   only for 'property' bindings, since these must be initialized as part
 *   of boot-up)
 * @private
 */
function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
  // Create binding metadata and add to nodeInfo
  nodeInfo.bindings = nodeInfo.bindings || [];
  let /** Binding */ binding = { kind, target, parts, literal, isCompound: (parts.length !== 1) };
  nodeInfo.bindings.push(binding);
  // Add listener info to binding metadata
  if (shouldAddListener(binding)) {
    let {event, negate} = binding.parts[0];
    binding.listenerEvent = event || (CaseMap.camelToDashCase(target) + '-changed');
    binding.listenerNegate = negate;
  }
  // Add "propagate" property effects to templateInfo
  let index = templateInfo.nodeInfoList.length;
  for (let i=0; i<binding.parts.length; i++) {
    let part = binding.parts[i];
    part.compoundIndex = i;
    addEffectForBindingPart(constructor, templateInfo, binding, part, index);
  }
}

/**
 * Adds property effects to the given `templateInfo` for the given binding
 * part.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {number} index Index into `nodeInfoList` for this node
 */
function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
  if (!part.literal) {
    if (binding.kind === 'attribute' && binding.target[0] === '-') {
      console.warn('Cannot set attribute ' + binding.target +
        ' because "-" is not a valid attribute starting character');
    } else {
      let dependencies = part.dependencies;
      let info = { index, binding, part, evaluator: constructor };
      for (let j=0; j<dependencies.length; j++) {
        let trigger = dependencies[j];
        if (typeof trigger == 'string') {
          trigger = parseArg(trigger);
          trigger.wildcard = true;
        }
        constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
          fn: runBindingEffect,
          info, trigger
        });
      }
    }
  }
}

/**
 * Implements the "binding" (property/path binding) effect.
 *
 * Note that binding syntax is overridable via `_parseBindings` and
 * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
 * non-literal parts returned from `_parseBindings`.  However,
 * there is no support for _path_ bindings via custom binding parts,
 * as this is specific to Polymer's path binding syntax.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} path Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
 *   metadata
 * @private
 */
function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
  let node = nodeList[info.index];
  let binding = info.binding;
  let part = info.part;
  // Subpath notification: transform path and set to client
  // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
  if (hasPaths && part.source && (path.length > part.source.length) &&
      (binding.kind == 'property') && !binding.isCompound &&
      node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
    let value = props[path];
    path = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["i" /* translate */])(part.source, binding.target, path);
    if (node._setPendingPropertyOrPath(path, value, false, true)) {
      inst._enqueueClient(node);
    }
  } else {
    let value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
    // Propagate value to child
    applyBindingValue(inst, node, binding, part, value);
  }
}

/**
 * Sets the value for an "binding" (binding) effect to a node,
 * either as a property or attribute.
 *
 * @param {!PropertyEffectsType} inst The instance owning the binding effect
 * @param {Node} node Target node for binding
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {*} value Value to set
 * @private
 */
function applyBindingValue(inst, node, binding, part, value) {
  value = computeBindingValue(node, value, binding, part);
  if (__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["c" /* sanitizeDOMValue */]) {
    value = Object(__WEBPACK_IMPORTED_MODULE_6__utils_settings_js__["c" /* sanitizeDOMValue */])(value, binding.target, binding.kind, node);
  }
  if (binding.kind == 'attribute') {
    // Attribute binding
    inst._valueToNodeAttribute(/** @type {Element} */(node), value, binding.target);
  } else {
    // Property binding
    let prop = binding.target;
    if (node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
      if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
        if (node._setPendingProperty(prop, value)) {
          inst._enqueueClient(node);
        }
      }
    } else  {
      inst._setUnmanagedPropertyToNode(node, prop, value);
    }
  }
}

/**
 * Transforms an "binding" effect value based on compound & negation
 * effect metadata, as well as handling for special-case properties
 *
 * @param {Node} node Node the value will be set to
 * @param {*} value Value to set
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @return {*} Transformed value to set
 * @private
 */
function computeBindingValue(node, value, binding, part) {
  if (binding.isCompound) {
    let storage = node.__dataCompoundStorage[binding.target];
    storage[part.compoundIndex] = value;
    value = storage.join('');
  }
  if (binding.kind !== 'attribute') {
    // Some browsers serialize `undefined` to `"undefined"`
    if (binding.target === 'textContent' ||
        (node.localName == 'input' && binding.target == 'value')) {
      value = value == undefined ? '' : value;
    }
  }
  return value;
}

/**
 * Returns true if a binding's metadata meets all the requirements to allow
 * 2-way binding, and therefore a `<property>-changed` event listener should be
 * added:
 * - used curly braces
 * - is a property (not attribute) binding
 * - is not a textContent binding
 * - is not compound
 *
 * @param {!Binding} binding Binding metadata
 * @return {boolean} True if 2-way listener should be added
 * @private
 */
function shouldAddListener(binding) {
  return Boolean(binding.target) &&
         binding.kind != 'attribute' &&
         binding.kind != 'text' &&
         !binding.isCompound &&
         binding.parts[0].mode === '{';
}

/**
 * Setup compound binding storage structures, notify listeners, and dataHost
 * references onto the bound nodeList.
 *
 * @param {!PropertyEffectsType} inst Instance that bas been previously bound
 * @param {TemplateInfo} templateInfo Template metadata
 * @private
 */
function setupBindings(inst, templateInfo) {
  // Setup compound storage, dataHost, and notify listeners
  let {nodeList, nodeInfoList} = templateInfo;
  if (nodeInfoList.length) {
    for (let i=0; i < nodeInfoList.length; i++) {
      let info = nodeInfoList[i];
      let node = nodeList[i];
      let bindings = info.bindings;
      if (bindings) {
        for (let i=0; i<bindings.length; i++) {
          let binding = bindings[i];
          setupCompoundStorage(node, binding);
          addNotifyListener(node, inst, binding);
        }
      }
      node.__dataHost = inst;
    }
  }
}

/**
 * Initializes `__dataCompoundStorage` local storage on a bound node with
 * initial literal data for compound bindings, and sets the joined
 * literal parts to the bound property.
 *
 * When changes to compound parts occur, they are first set into the compound
 * storage array for that property, and then the array is joined to result in
 * the final value set to the property/attribute.
 *
 * @param {Node} node Bound node to initialize
 * @param {Binding} binding Binding metadata
 * @private
 */
function setupCompoundStorage(node, binding) {
  if (binding.isCompound) {
    // Create compound storage map
    let storage = node.__dataCompoundStorage ||
      (node.__dataCompoundStorage = {});
    let parts = binding.parts;
    // Copy literals from parts into storage for this binding
    let literals = new Array(parts.length);
    for (let j=0; j<parts.length; j++) {
      literals[j] = parts[j].literal;
    }
    let target = binding.target;
    storage[target] = literals;
    // Configure properties with their literal parts
    if (binding.literal && binding.kind == 'property') {
      node[target] = binding.literal;
    }
  }
}

/**
 * Adds a 2-way binding notification event listener to the node specified
 *
 * @param {Object} node Child element to add listener to
 * @param {!PropertyEffectsType} inst Host element instance to handle notification event
 * @param {Binding} binding Binding metadata
 * @private
 */
function addNotifyListener(node, inst, binding) {
  if (binding.listenerEvent) {
    let part = binding.parts[0];
    node.addEventListener(binding.listenerEvent, function(e) {
      handleNotification(e, inst, binding.target, part.source, part.negate);
    });
  }
}

// -- for method-based effects (complexObserver & computed) --------------

/**
 * Adds property effects for each argument in the method signature (and
 * optionally, for the method name if `dynamic` is true) that calls the
 * provided effect function.
 *
 * @param {Element | Object} model Prototype or instance
 * @param {!MethodSignature} sig Method signature metadata
 * @param {string} type Type of property effect to add
 * @param {Function} effectFn Function to run when arguments change
 * @param {*=} methodInfo Effect-specific information to be included in
 *   method effect metadata
 * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
 *   method names should be included as a dependency to the effect. Note,
 *   defaults to true if the signature is static (sig.static is true).
 * @private
 */
function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
  dynamicFn = sig.static || (dynamicFn &&
    (typeof dynamicFn !== 'object' || dynamicFn[sig.methodName]));
  let info = {
    methodName: sig.methodName,
    args: sig.args,
    methodInfo,
    dynamicFn
  };
  for (let i=0, arg; (i<sig.args.length) && (arg=sig.args[i]); i++) {
    if (!arg.literal) {
      model._addPropertyEffect(arg.rootProperty, type, {
        fn: effectFn, info: info, trigger: arg
      });
    }
  }
  if (dynamicFn) {
    model._addPropertyEffect(sig.methodName, type, {
      fn: effectFn, info: info
    });
  }
}

/**
 * Calls a method with arguments marshaled from properties on the instance
 * based on the method signature contained in the effect metadata.
 *
 * Multi-property observers, computed properties, and inline computing
 * functions call this function to invoke the method, then use the return
 * value accordingly.
 *
 * @param {!PropertyEffectsType} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {*} Returns the return value from the method invocation
 * @private
 */
function runMethodEffect(inst, property, props, oldProps, info) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  let context = inst._methodHost || inst;
  let fn = context[info.methodName];
  if (fn) {
    let args = marshalArgs(inst.__data, info.args, property, props);
    return fn.apply(context, args);
  } else if (!info.dynamicFn) {
    console.warn('method `' + info.methodName + '` not defined');
  }
}

const emptyArray = [];

// Regular expressions used for binding
const IDENT  = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
const NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
const SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
const DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
const STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
const ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' +  STRING + ')\\s*' + ')';
const ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
const ARGUMENT_LIST = '(?:' + '\\(\\s*' +
                              '(?:' + ARGUMENTS + '?' + ')' +
                            '\\)\\s*' + ')';
const BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
const OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
const CLOSE_BRACKET = '(?:]]|}})';
const NEGATE = '(?:(!)\\s*)?'; // Group 2
const EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
const bindingRegex = new RegExp(EXPRESSION, "g");

/**
 * Create a string from binding parts of all the literal parts
 *
 * @param {!Array<BindingPart>} parts All parts to stringify
 * @return {string} String made from the literal parts
 */
function literalFromParts(parts) {
  let s = '';
  for (let i=0; i<parts.length; i++) {
    let literal = parts[i].literal;
    s += literal || '';
  }
  return s;
}

/**
 * Parses an expression string for a method signature, and returns a metadata
 * describing the method in terms of `methodName`, `static` (whether all the
 * arguments are literals), and an array of `args`
 *
 * @param {string} expression The expression to parse
 * @return {?MethodSignature} The method metadata object if a method expression was
 *   found, otherwise `undefined`
 * @private
 */
function parseMethod(expression) {
  // tries to match valid javascript property names
  let m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
  if (m) {
    let methodName = m[1];
    let sig = { methodName, static: true, args: emptyArray };
    if (m[2].trim()) {
      // replace escaped commas with comma entity, split on un-escaped commas
      let args = m[2].replace(/\\,/g, '&comma;').split(',');
      return parseArgs(args, sig);
    } else {
      return sig;
    }
  }
  return null;
}

/**
 * Parses an array of arguments and sets the `args` property of the supplied
 * signature metadata object. Sets the `static` property to false if any
 * argument is a non-literal.
 *
 * @param {!Array<string>} argList Array of argument names
 * @param {!MethodSignature} sig Method signature metadata object
 * @return {!MethodSignature} The updated signature metadata object
 * @private
 */
function parseArgs(argList, sig) {
  sig.args = argList.map(function(rawArg) {
    let arg = parseArg(rawArg);
    if (!arg.literal) {
      sig.static = false;
    }
    return arg;
  }, this);
  return sig;
}

/**
 * Parses an individual argument, and returns an argument metadata object
 * with the following fields:
 *
 *   {
 *     value: 'prop',        // property/path or literal value
 *     literal: false,       // whether argument is a literal
 *     structured: false,    // whether the property is a path
 *     rootProperty: 'prop', // the root property of the path
 *     wildcard: false       // whether the argument was a wildcard '.*' path
 *   }
 *
 * @param {string} rawArg The string value of the argument
 * @return {!MethodArg} Argument metadata object
 * @private
 */
function parseArg(rawArg) {
  // clean up whitespace
  let arg = rawArg.trim()
    // replace comma entity with comma
    .replace(/&comma;/g, ',')
    // repair extra escape sequences; note only commas strictly need
    // escaping, but we allow any other char to be escaped since its
    // likely users will do this
    .replace(/\\(.)/g, '\$1')
    ;
  // basic argument descriptor
  let a = {
    name: arg,
    value: '',
    literal: false
  };
  // detect literal value (must be String or Number)
  let fc = arg[0];
  if (fc === '-') {
    fc = arg[1];
  }
  if (fc >= '0' && fc <= '9') {
    fc = '#';
  }
  switch(fc) {
    case "'":
    case '"':
      a.value = arg.slice(1, -1);
      a.literal = true;
      break;
    case '#':
      a.value = Number(arg);
      a.literal = true;
      break;
  }
  // if not literal, look for structured path
  if (!a.literal) {
    a.rootProperty = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* root */])(arg);
    // detect structured path (has dots)
    a.structured = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["d" /* isPath */])(arg);
    if (a.structured) {
      a.wildcard = (arg.slice(-2) == '.*');
      if (a.wildcard) {
        a.name = arg.slice(0, -2);
      }
    }
  }
  return a;
}

/**
 * Gather the argument values for a method specified in the provided array
 * of argument metadata.
 *
 * The `path` and `value` arguments are used to fill in wildcard descriptor
 * when the method is being called as a result of a path notification.
 *
 * @param {Object} data Instance data storage object to read properties from
 * @param {!Array<!MethodArg>} args Array of argument metadata
 * @param {string} path Property/path name that triggered the method effect
 * @param {Object} props Bag of current property changes
 * @return {Array<*>} Array of argument values
 * @private
 */
function marshalArgs(data, args, path, props) {
  let values = [];
  for (let i=0, l=args.length; i<l; i++) {
    let arg = args[i];
    let name = arg.name;
    let v;
    if (arg.literal) {
      v = arg.value;
    } else {
      if (arg.structured) {
        v = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(data, name);
        // when data is not stored e.g. `splices`
        if (v === undefined) {
          v = props[name];
        }
      } else {
        v = data[name];
      }
    }
    if (arg.wildcard) {
      // Only send the actual path changed info if the change that
      // caused the observer to run matched the wildcard
      let baseChanged = (name.indexOf(path + '.') === 0);
      let matches = (path.indexOf(name) === 0 && !baseChanged);
      values[i] = {
        path: matches ? path : name,
        value: matches ? props[path] : v,
        base: v
      };
    } else {
      values[i] = v;
    }
  }
  return values;
}

// data api

/**
 * Sends array splice notifications (`.splices` and `.length`)
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!PropertyEffectsType} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {Array} splices Array of splice records
 * @private
 */
function notifySplices(inst, array, path, splices) {
  let splicesPath = path + '.splices';
  inst.notifyPath(splicesPath, { indexSplices: splices });
  inst.notifyPath(path + '.length', array.length);
  // Null here to allow potentially large splice records to be GC'ed.
  inst.__data[splicesPath] = {indexSplices: null};
}

/**
 * Creates a splice record and sends an array splice notification for
 * the described mutation
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!PropertyEffectsType} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {number} index Index at which the array mutation occurred
 * @param {number} addedCount Number of added items
 * @param {Array} removed Array of removed items
 * @private
 */
function notifySplice(inst, array, path, index, addedCount, removed) {
  notifySplices(inst, array, path, [{
    index: index,
    addedCount: addedCount,
    removed: removed,
    object: array,
    type: 'splice'
  }]);
}

/**
 * Returns an upper-cased version of the string.
 *
 * @param {string} name String to uppercase
 * @return {string} Uppercased string
 * @private
 */
function upper(name) {
  return name[0].toUpperCase() + name.substring(1);
}

const PropertyEffects = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @constructor
   * @extends {superClass}
   * @implements {Polymer_PropertyAccessors}
   * @implements {Polymer_TemplateStamp}
   * @unrestricted
   */
  const propertyEffectsBase = Object(__WEBPACK_IMPORTED_MODULE_5__template_stamp_js__["a" /* TemplateStamp */])(Object(__WEBPACK_IMPORTED_MODULE_4__property_accessors_js__["a" /* PropertyAccessors */])(superClass));

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyEffects}
   * @extends {propertyEffectsBase}
   * @unrestricted
   */
  class PropertyEffects extends propertyEffectsBase {

    constructor() {
      super();
      /** @type {boolean} */
      this.__dataClientsReady;
      /** @type {Array} */
      this.__dataPendingClients;
      /** @type {Object} */
      this.__dataToNotify;
      /** @type {Object} */
      this.__dataLinkedPaths;
      /** @type {boolean} */
      this.__dataHasPaths;
      /** @type {Object} */
      this.__dataCompoundStorage;
      /** @type {Polymer_PropertyEffects} */
      this.__dataHost;
      /** @type {!Object} */
      this.__dataTemp;
      /** @type {boolean} */
      this.__dataClientsInitialized;
      /** @type {!Object} */
      this.__data;
      /** @type {!Object} */
      this.__dataPending;
      /** @type {!Object} */
      this.__dataOld;
      /** @type {Object} */
      this.__computeEffects;
      /** @type {Object} */
      this.__reflectEffects;
      /** @type {Object} */
      this.__notifyEffects;
      /** @type {Object} */
      this.__propagateEffects;
      /** @type {Object} */
      this.__observeEffects;
      /** @type {Object} */
      this.__readOnly;
      /** @type {number} */
      this.__dataCounter;
      /** @type {!TemplateInfo} */
      this.__templateInfo;
    }

    get PROPERTY_EFFECT_TYPES() {
      return TYPES;
    }

    _initializeProperties() {
      super._initializeProperties();
      hostStack.registerHost(this);
      this.__dataClientsReady = false;
      this.__dataPendingClients = null;
      this.__dataToNotify = null;
      this.__dataLinkedPaths = null;
      this.__dataHasPaths = false;
      // May be set on instance prior to upgrade
      this.__dataCompoundStorage = this.__dataCompoundStorage || null;
      this.__dataHost = this.__dataHost || null;
      this.__dataTemp = {};
      this.__dataClientsInitialized = false;
    }

    /**
     * Overrides `Polymer.PropertyAccessors` implementation to provide a
     * more efficient implementation of initializing properties from
     * the prototype on the instance.
     *
     * @override
     * @param {Object} props Properties to initialize on the prototype
     */
    _initializeProtoProperties(props) {
      this.__data = Object.create(props);
      this.__dataPending = Object.create(props);
      this.__dataOld = {};
    }

    /**
     * Overrides `Polymer.PropertyAccessors` implementation to avoid setting
     * `_setProperty`'s `shouldNotify: true`.
     *
     * @override
     * @param {Object} props Properties to initialize on the instance
     */
    _initializeInstanceProperties(props) {
      let readOnly = this[TYPES.READ_ONLY];
      for (let prop in props) {
        if (!readOnly || !readOnly[prop]) {
          this.__dataPending = this.__dataPending || {};
          this.__dataOld = this.__dataOld || {};
          this.__data[prop] = this.__dataPending[prop] = props[prop];
        }
      }
    }

    // Prototype setup ----------------------------------------

    /**
     * Equivalent to static `addPropertyEffect` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @protected
     */
    _addPropertyEffect(property, type, effect) {
      this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
      // effects are accumulated into arrays per property based on type
      let effects = ensureOwnEffectMap(this, type)[property];
      if (!effects) {
        effects = this[type][property] = [];
      }
      effects.push(effect);
    }

    /**
     * Removes the given property effect.
     *
     * @param {string} property Property the effect was associated with
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object to remove
     */
    _removePropertyEffect(property, type, effect) {
      let effects = ensureOwnEffectMap(this, type)[property];
      let idx = effects.indexOf(effect);
      if (idx >= 0) {
        effects.splice(idx, 1);
      }
    }

    /**
     * Returns whether the current prototype/instance has a property effect
     * of a certain type.
     *
     * @param {string} property Property name
     * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasPropertyEffect(property, type) {
      let effects = this[type];
      return Boolean(effects && effects[property]);
    }

    /**
     * Returns whether the current prototype/instance has a "read only"
     * accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasReadOnlyEffect(property) {
      return this._hasPropertyEffect(property, TYPES.READ_ONLY);
    }

    /**
     * Returns whether the current prototype/instance has a "notify"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasNotifyEffect(property) {
      return this._hasPropertyEffect(property, TYPES.NOTIFY);
    }

    /**
     * Returns whether the current prototype/instance has a "reflect to attribute"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasReflectEffect(property) {
      return this._hasPropertyEffect(property, TYPES.REFLECT);
    }

    /**
     * Returns whether the current prototype/instance has a "computed"
     * property effect for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if the prototype/instance has an effect of this type
     * @protected
     */
    _hasComputedEffect(property) {
      return this._hasPropertyEffect(property, TYPES.COMPUTE);
    }

    // Runtime ----------------------------------------

    /**
     * Sets a pending property or path.  If the root property of the path in
     * question had no accessor, the path is set, otherwise it is enqueued
     * via `_setPendingProperty`.
     *
     * This function isolates relatively expensive functionality necessary
     * for the public API (`set`, `setProperties`, `notifyPath`, and property
     * change listeners via {{...}} bindings), such that it is only done
     * when paths enter the system, and not at every propagation step.  It
     * also sets a `__dataHasPaths` flag on the instance which is used to
     * fast-path slower path-matching code in the property effects host paths.
     *
     * `path` can be a path string or array of path parts as accepted by the
     * public API.
     *
     * @param {string | !Array<number|string>} path Path to set
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify Set to true if this change should
     *  cause a property notification event dispatch
     * @param {boolean=} isPathNotification If the path being set is a path
     *   notification of an already changed value, as opposed to a request
     *   to set and notify the change.  In the latter `false` case, a dirty
     *   check is performed and then the value is set to the path before
     *   enqueuing the pending property change.
     * @return {boolean} Returns true if the property/path was enqueued in
     *   the pending changes bag.
     * @protected
     */
    _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
      if (isPathNotification ||
          Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["g" /* root */])(Array.isArray(path) ? path[0] : path) !== path) {
        // Dirty check changes being set to a path against the actual object,
        // since this is the entry point for paths into the system; from here
        // the only dirty checks are against the `__dataTemp` cache to prevent
        // duplicate work in the same turn only. Note, if this was a notification
        // of a change already set to a path (isPathNotification: true),
        // we always let the change through and skip the `set` since it was
        // already dirty checked at the point of entry and the underlying
        // object has already been updated
        if (!isPathNotification) {
          let old = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path);
          path = /** @type {string} */ (Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["h" /* set */])(this, path, value));
          // Use property-accessor's simpler dirty check
          if (!path || !super._shouldPropertyChange(path, value, old)) {
            return false;
          }
        }
        this.__dataHasPaths = true;
        if (this._setPendingProperty(/**@type{string}*/(path), value, shouldNotify)) {
          computeLinkedPaths(this, path, value);
          return true;
        }
      } else {
        if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
          return this._setPendingProperty(/**@type{string}*/(path), value, shouldNotify);
        } else {
          this[path] = value;
        }
      }
      return false;
    }

    /**
     * Applies a value to a non-Polymer element/node's property.
     *
     * The implementation makes a best-effort at binding interop:
     * Some native element properties have side-effects when
     * re-setting the same value (e.g. setting `<input>.value` resets the
     * cursor position), so we do a dirty-check before setting the value.
     * However, for better interop with non-Polymer custom elements that
     * accept objects, we explicitly re-set object changes coming from the
     * Polymer world (which may include deep object changes without the
     * top reference changing), erring on the side of providing more
     * information.
     *
     * Users may override this method to provide alternate approaches.
     *
     * @param {Node} node The node to set a property on
     * @param {string} prop The property to set
     * @param {*} value The value to set
     * @protected
     */
    _setUnmanagedPropertyToNode(node, prop, value) {
      // It is a judgment call that resetting primitives is
      // "bad" and resettings objects is also "good"; alternatively we could
      // implement a whitelist of tag & property values that should never
      // be reset (e.g. <input>.value && <select>.value)
      if (value !== node[prop] || typeof value == 'object') {
        node[prop] = value;
      }
    }

    /**
     * Overrides the `PropertyAccessors` implementation to introduce special
     * dirty check logic depending on the property & value being set:
     *
     * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
     *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
     * 2. Object set to simple property (e.g. 'prop': {...})
     *    Stored in `__dataTemp` and `__data`, dirty checked against
     *    `__dataTemp` by default implementation of `_shouldPropertyChange`
     * 3. Primitive value set to simple property (e.g. 'prop': 42)
     *    Stored in `__data`, dirty checked against `__data`
     *
     * The dirty-check is important to prevent cycles due to two-way
     * notification, but paths and objects are only dirty checked against any
     * previous value set during this turn via a "temporary cache" that is
     * cleared when the last `_propertiesChaged` exits. This is so:
     * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
     *    due to array mutations like shift/unshift/splice; this is fine
     *    since path changes are dirty-checked at user entry points like `set`
     * b. dirty-checking for objects only lasts one turn to allow the user
     *    to mutate the object in-place and re-set it with the same identity
     *    and have all sub-properties re-propagated in a subsequent turn.
     *
     * The temp cache is not necessarily sufficient to prevent invalid array
     * paths, since a splice can happen during the same turn (with pathological
     * user code); we could introduce a "fixup" for temporarily cached array
     * paths if needed: https://github.com/Polymer/polymer/issues/4227
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @param {boolean=} shouldNotify True if property should fire notification
     *   event (applies only for `notify: true` properties)
     * @return {boolean} Returns true if the property changed
     * @override
     */
    _setPendingProperty(property, value, shouldNotify) {
      let isPath = this.__dataHasPaths && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["d" /* isPath */])(property);
      let prevProps = isPath ? this.__dataTemp : this.__data;
      if (this._shouldPropertyChange(property, value, prevProps[property])) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        }
        // Ensure old is captured from the last turn
        if (!(property in this.__dataOld)) {
          this.__dataOld[property] = this.__data[property];
        }
        // Paths are stored in temporary cache (cleared at end of turn),
        // which is used for dirty-checking, all others stored in __data
        if (isPath) {
          this.__dataTemp[property] = value;
        } else {
          this.__data[property] = value;
        }
        // All changes go into pending property bag, passed to _propertiesChanged
        this.__dataPending[property] = value;
        // Track properties that should notify separately
        if (isPath || (this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property])) {
          this.__dataToNotify = this.__dataToNotify || {};
          this.__dataToNotify[property] = shouldNotify;
        }
        return true;
      }
      return false;
    }

    /**
     * Overrides base implementation to ensure all accessors set `shouldNotify`
     * to true, for per-property notification tracking.
     *
     * @override
     */
    _setProperty(property, value) {
      if (this._setPendingProperty(property, value, true)) {
        this._invalidateProperties();
      }
    }

    /**
     * Overrides `PropertyAccessor`'s default async queuing of
     * `_propertiesChanged`: if `__dataReady` is false (has not yet been
     * manually flushed), the function no-ops; otherwise flushes
     * `_propertiesChanged` synchronously.
     *
     * @override
     */
    _invalidateProperties() {
      if (this.__dataReady) {
        this._flushProperties();
      }
    }

    /**
     * Enqueues the given client on a list of pending clients, whose
     * pending property changes can later be flushed via a call to
     * `_flushClients`.
     *
     * @param {Object} client PropertyEffects client to enqueue
     * @protected
     */
    _enqueueClient(client) {
      this.__dataPendingClients = this.__dataPendingClients || [];
      if (client !== this) {
        this.__dataPendingClients.push(client);
      }
    }

    /**
     * Flushes any clients previously enqueued via `_enqueueClient`, causing
     * their `_flushProperties` method to run.
     *
     * @protected
     */
    _flushClients() {
      if (!this.__dataClientsReady) {
        this.__dataClientsReady = true;
        this._readyClients();
        // Override point where accessors are turned on; importantly,
        // this is after clients have fully readied, providing a guarantee
        // that any property effects occur only after all clients are ready.
        this.__dataReady = true;
      } else {
        this.__enableOrFlushClients();
      }
    }

    // NOTE: We ensure clients either enable or flush as appropriate. This
    // handles two corner cases:
    // (1) clients flush properly when connected/enabled before the host
    // enables; e.g.
    //   (a) Templatize stamps with no properties and does not flush and
    //   (b) the instance is inserted into dom and
    //   (c) then the instance flushes.
    // (2) clients enable properly when not connected/enabled when the host
    // flushes; e.g.
    //   (a) a template is runtime stamped and not yet connected/enabled
    //   (b) a host sets a property, causing stamped dom to flush
    //   (c) the stamped dom enables.
    __enableOrFlushClients() {
      let clients = this.__dataPendingClients;
      if (clients) {
        this.__dataPendingClients = null;
        for (let i=0; i < clients.length; i++) {
          let client = clients[i];
          if (!client.__dataEnabled) {
            client._enableProperties();
          } else if (client.__dataPending) {
            client._flushProperties();
          }
        }
      }
    }

    /**
     * Perform any initial setup on client dom. Called before the first
     * `_flushProperties` call on client dom and before any element
     * observers are called.
     *
     * @protected
     */
    _readyClients() {
      this.__enableOrFlushClients();
    }

    /**
     * Sets a bag of property changes to this instance, and
     * synchronously processes all effects of the properties as a batch.
     *
     * Property names must be simple properties, not paths.  Batched
     * path propagation is not supported.
     *
     * @param {Object} props Bag of one or more key-value pairs whose key is
     *   a property and value is the new value to set for that property.
     * @param {boolean=} setReadOnly When true, any private values set in
     *   `props` will be set. By default, `setProperties` will not set
     *   `readOnly: true` root properties.
     * @public
     */
    setProperties(props, setReadOnly) {
      for (let path in props) {
        if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
          //TODO(kschaaf): explicitly disallow paths in setProperty?
          // wildcard observers currently only pass the first changed path
          // in the `info` object, and you could do some odd things batching
          // paths, e.g. {'foo.bar': {...}, 'foo': null}
          this._setPendingPropertyOrPath(path, props[path], true);
        }
      }
      this._invalidateProperties();
    }

    /**
     * Overrides `PropertyAccessors` so that property accessor
     * side effects are not enabled until after client dom is fully ready.
     * Also calls `_flushClients` callback to ensure client dom is enabled
     * that was not enabled as a result of flushing properties.
     *
     * @override
     */
    ready() {
      // It is important that `super.ready()` is not called here as it
      // immediately turns on accessors. Instead, we wait until `readyClients`
      // to enable accessors to provide a guarantee that clients are ready
      // before processing any accessors side effects.
      this._flushProperties();
      // If no data was pending, `_flushProperties` will not `flushClients`
      // so ensure this is done.
      if (!this.__dataClientsReady) {
        this._flushClients();
      }
      // Before ready, client notifications do not trigger _flushProperties.
      // Therefore a flush is necessary here if data has been set.
      if (this.__dataPending) {
        this._flushProperties();
      }
    }

    /**
     * Implements `PropertyAccessors`'s properties changed callback.
     *
     * Runs each class of effects for the batch of changed properties in
     * a specific order (compute, propagate, reflect, observe, notify).
     *
     * @override
     */
    _propertiesChanged(currentProps, changedProps, oldProps) {
      // ----------------------------
      // let c = Object.getOwnPropertyNames(changedProps || {});
      // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
      // if (window.debug) { debugger; }
      // ----------------------------
      let hasPaths = this.__dataHasPaths;
      this.__dataHasPaths = false;
      // Compute properties
      runComputedEffects(this, changedProps, oldProps, hasPaths);
      // Clear notify properties prior to possible reentry (propagate, observe),
      // but after computing effects have a chance to add to them
      let notifyProps = this.__dataToNotify;
      this.__dataToNotify = null;
      // Propagate properties to clients
      this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
      // Flush clients
      this._flushClients();
      // Reflect properties
      runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
      // Observe properties
      runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
      // Notify properties to host
      if (notifyProps) {
        runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
      }
      // Clear temporary cache at end of turn
      if (this.__dataCounter == 1) {
        this.__dataTemp = {};
      }
      // ----------------------------
      // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
      // ----------------------------
    }

    /**
     * Called to propagate any property changes to stamped template nodes
     * managed by this element.
     *
     * @param {Object} changedProps Bag of changed properties
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @protected
     */
    _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
      if (this[TYPES.PROPAGATE]) {
        runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
      }
      let templateInfo = this.__templateInfo;
      while (templateInfo) {
        runEffects(this, templateInfo.propertyEffects, changedProps, oldProps,
          hasPaths, templateInfo.nodeList);
        templateInfo = templateInfo.nextTemplateInfo;
      }
    }

    /**
     * Aliases one data path as another, such that path notifications from one
     * are routed to the other.
     *
     * @param {string | !Array<string|number>} to Target path to link.
     * @param {string | !Array<string|number>} from Source path to link.
     * @public
     */
    linkPaths(to, from) {
      to = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* normalize */])(to);
      from = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* normalize */])(from);
      this.__dataLinkedPaths = this.__dataLinkedPaths || {};
      this.__dataLinkedPaths[to] = from;
    }

    /**
     * Removes a data path alias previously established with `_linkPaths`.
     *
     * Note, the path to unlink should be the target (`to`) used when
     * linking the paths.
     *
     * @param {string | !Array<string|number>} path Target path to unlink.
     * @public
     */
    unlinkPaths(path) {
      path = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* normalize */])(path);
      if (this.__dataLinkedPaths) {
        delete this.__dataLinkedPaths[path];
      }
    }

    /**
     * Notify that an array has changed.
     *
     * Example:
     *
     *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
     *     ...
     *     this.items.splice(1, 1, {name: 'Sam'});
     *     this.items.push({name: 'Bob'});
     *     this.notifySplices('items', [
     *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, obect: this.items, type: 'splice' },
     *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
     *     ]);
     *
     * @param {string} path Path that should be notified.
     * @param {Array} splices Array of splice records indicating ordered
     *   changes that occurred to the array. Each record should have the
     *   following fields:
     *    * index: index at which the change occurred
     *    * removed: array of items that were removed from this index
     *    * addedCount: number of new items added at this index
     *    * object: a reference to the array in question
     *    * type: the string literal 'splice'
     *
     *   Note that splice records _must_ be normalized such that they are
     *   reported in index order (raw results from `Object.observe` are not
     *   ordered and must be normalized/merged before notifying).
     * @public
    */
    notifySplices(path, splices) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      notifySplices(this, array, info.path, splices);
    }

    /**
     * Convenience method for reading a value from a path.
     *
     * Note, if any part in the path is undefined, this method returns
     * `undefined` (this method does not throw when dereferencing undefined
     * paths).
     *
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `users.12.name` or `['users', 12, 'name']`).
     * @param {Object=} root Root object from which the path is evaluated.
     * @return {*} Value at the path, or `undefined` if any part of the path
     *   is undefined.
     * @public
     */
    get(path, root) {
      return Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(root || this, path);
    }

    /**
     * Convenience method for setting a value to a path and notifying any
     * elements bound to the same path.
     *
     * Note, if any part in the path except for the last is undefined,
     * this method does nothing (this method does not throw when
     * dereferencing undefined paths).
     *
     * @param {(string|!Array<(string|number)>)} path Path to the value
     *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
     *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
     *   bracketed expressions are not supported; string-based path parts
     *   *must* be separated by dots.  Note that when dereferencing array
     *   indices, the index may be used as a dotted part directly
     *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
     * @param {*} value Value to set at the specified path.
     * @param {Object=} root Root object from which the path is evaluated.
     *   When specified, no notification will occur.
     * @public
    */
    set(path, value, root) {
      if (root) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["h" /* set */])(root, path, value);
      } else {
        if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][/** @type {string} */(path)]) {
          if (this._setPendingPropertyOrPath(path, value, true)) {
            this._invalidateProperties();
          }
        }
      }
    }

    /**
     * Adds items onto the end of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to push onto array
     * @return {number} New length of the array.
     * @public
     */
    push(path, ...items) {
      let info = {path: ''};
      let array = /** @type {Array}*/(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      let len = array.length;
      let ret = array.push(...items);
      if (items.length) {
        notifySplice(this, array, info.path, len, items.length, []);
      }
      return ret;
    }

    /**
     * Removes an item from the end of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */
    pop(path) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      let hadLength = Boolean(array.length);
      let ret = array.pop();
      if (hadLength) {
        notifySplice(this, array, info.path, array.length, 0, [ret]);
      }
      return ret;
    }

    /**
     * Starting from the start index specified, removes 0 or more items
     * from the array and inserts 0 or more new items in their place.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.splice`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {number} start Index from which to start removing/inserting.
     * @param {number} deleteCount Number of items to remove.
     * @param {...*} items Items to insert into array.
     * @return {Array} Array of removed items.
     * @public
     */
    splice(path, start, deleteCount, ...items) {
      let info = {path : ''};
      let array = /** @type {Array} */(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      // Normalize fancy native splice handling of crazy start values
      if (start < 0) {
        start = array.length - Math.floor(-start);
      } else {
        start = Math.floor(start);
      }
      if (!start) {
        start = 0;
      }
      let ret = array.splice(start, deleteCount, ...items);
      if (items.length || ret.length) {
        notifySplice(this, array, info.path, start, items.length, ret);
      }
      return ret;
    }

    /**
     * Removes an item from the beginning of array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.pop`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @return {*} Item that was removed.
     * @public
     */
    shift(path) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      let hadLength = Boolean(array.length);
      let ret = array.shift();
      if (hadLength) {
        notifySplice(this, array, info.path, 0, 0, [ret]);
      }
      return ret;
    }

    /**
     * Adds items onto the beginning of the array at the path specified.
     *
     * The arguments after `path` and return value match that of
     * `Array.prototype.push`.
     *
     * This method notifies other paths to the same array that a
     * splice occurred to the array.
     *
     * @param {string | !Array<string|number>} path Path to array.
     * @param {...*} items Items to insert info array
     * @return {number} New length of the array.
     * @public
     */
    unshift(path, ...items) {
      let info = {path: ''};
      let array = /** @type {Array} */(Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info));
      let ret = array.unshift(...items);
      if (items.length) {
        notifySplice(this, array, info.path, 0, items.length, []);
      }
      return ret;
    }

    /**
     * Notify that a path has changed.
     *
     * Example:
     *
     *     this.item.user.name = 'Bob';
     *     this.notifyPath('item.user.name');
     *
     * @param {string} path Path that should be notified.
     * @param {*=} value Value at the path (optional).
     * @public
    */
    notifyPath(path, value) {
      /** @type {string} */
      let propPath;
      if (arguments.length == 1) {
        // Get value if not supplied
        let info = {path: ''};
        value = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(this, path, info);
        propPath = info.path;
      } else if (Array.isArray(path)) {
        // Normalize path if needed
        propPath = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["f" /* normalize */])(path);
      } else {
        propPath = /** @type{string} */(path);
      }
      if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
        this._invalidateProperties();
      }
    }

    /**
     * Equivalent to static `createReadOnlyProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @protected
     */
    _createReadOnlyProperty(property, protectedSetter) {
      this._addPropertyEffect(property, TYPES.READ_ONLY);
      if (protectedSetter) {
        this['_set' + upper(property)] = /** @this {PropertyEffects} */function(value) {
          this._setProperty(property, value);
        };
      }
    }

    /**
     * Equivalent to static `createPropertyObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @param {string} methodName Name of observer method to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @protected
     */
    _createPropertyObserver(property, methodName, dynamicFn) {
      let info = { property, methodName, dynamicFn: Boolean(dynamicFn) };
      this._addPropertyEffect(property, TYPES.OBSERVE, {
        fn: runObserverEffect, info, trigger: {name: property}
      });
      if (dynamicFn) {
        this._addPropertyEffect(methodName, TYPES.OBSERVE, {
          fn: runObserverEffect, info, trigger: {name: methodName}
        });
      }
    }

    /**
     * Equivalent to static `createMethodObserver` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @protected
     */
    _createMethodObserver(expression, dynamicFn) {
      let sig = parseMethod(expression);
      if (!sig) {
        throw new Error("Malformed observer expression '" + expression + "'");
      }
      createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
    }

    /**
     * Equivalent to static `createNotifyingProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @protected
     */
    _createNotifyingProperty(property) {
      this._addPropertyEffect(property, TYPES.NOTIFY, {
        fn: runNotifyEffect,
        info: {
          eventName: CaseMap.camelToDashCase(property) + '-changed',
          property: property
        }
      });
    }

    /**
     * Equivalent to static `createReflectedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Property name
     * @protected
     */
    _createReflectedProperty(property) {
      let attr = CaseMap.camelToDashCase(property);
      if (attr[0] === '-') {
        console.warn('Property ' + property + ' cannot be reflected to attribute ' +
          attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property thisead.');
      } else {
        this._addPropertyEffect(property, TYPES.REFLECT, {
          fn: runReflectEffect,
          info: {
            attrName: attr
          }
        });
      }
    }

    /**
     * Equivalent to static `createComputedProperty` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @protected
     */
    _createComputedProperty(property, expression, dynamicFn) {
      let sig = parseMethod(expression);
      if (!sig) {
        throw new Error("Malformed computed expression '" + expression + "'");
      }
      createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
    }

    // -- static class methods ------------

    /**
     * Ensures an accessor exists for the specified property, and adds
     * to a list of "property effects" that will run when the accessor for
     * the specified property is set.  Effects are grouped by "type", which
     * roughly corresponds to a phase in effect processing.  The effect
     * metadata should be in the following form:
     *
     *     {
     *       fn: effectFunction, // Reference to function to call to perform effect
     *       info: { ... }       // Effect metadata passed to function
     *       trigger: {          // Optional triggering metadata; if not provided
     *         name: string      // the property is treated as a wildcard
     *         structured: boolean
     *         wildcard: boolean
     *       }
     *     }
     *
     * Effects are called from `_propertiesChanged` in the following order by
     * type:
     *
     * 1. COMPUTE
     * 2. PROPAGATE
     * 3. REFLECT
     * 4. OBSERVE
     * 5. NOTIFY
     *
     * Effect functions are called with the following signature:
     *
     *     effectFunction(inst, path, props, oldProps, info, hasPaths)
     *
     * @param {string} property Property that should trigger the effect
     * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
     * @param {Object=} effect Effect metadata object
     * @protected
     */
    static addPropertyEffect(property, type, effect) {
      this.prototype._addPropertyEffect(property, type, effect);
    }

    /**
     * Creates a single-property observer for the given property.
     *
     * @param {string} property Property name
     * @param {string} methodName Name of observer method to call
     * @param {boolean=} dynamicFn Whether the method name should be included as
     *   a dependency to the effect.
     * @protected
     */
    static createPropertyObserver(property, methodName, dynamicFn) {
      this.prototype._createPropertyObserver(property, methodName, dynamicFn);
    }

    /**
     * Creates a multi-property "method observer" based on the provided
     * expression, which should be a string in the form of a normal Javascript
     * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
     * should correspond to a property or path in the context of this
     * prototype (or instance), or may be a literal string or number.
     *
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating
     *   whether method names should be included as a dependency to the effect.
     * @protected
     */
    static createMethodObserver(expression, dynamicFn) {
      this.prototype._createMethodObserver(expression, dynamicFn);
    }

    /**
     * Causes the setter for the given property to dispatch `<property>-changed`
     * events to notify of changes to the property.
     *
     * @param {string} property Property name
     * @protected
     */
    static createNotifyingProperty(property) {
      this.prototype._createNotifyingProperty(property);
    }

    /**
     * Creates a read-only accessor for the given property.
     *
     * To set the property, use the protected `_setProperty` API.
     * To create a custom protected setter (e.g. `_setMyProp()` for
     * property `myProp`), pass `true` for `protectedSetter`.
     *
     * Note, if the property will have other property effects, this method
     * should be called first, before adding other effects.
     *
     * @param {string} property Property name
     * @param {boolean=} protectedSetter Creates a custom protected setter
     *   when `true`.
     * @protected
     */
    static createReadOnlyProperty(property, protectedSetter) {
      this.prototype._createReadOnlyProperty(property, protectedSetter);
    }

    /**
     * Causes the setter for the given property to reflect the property value
     * to a (dash-cased) attribute of the same name.
     *
     * @param {string} property Property name
     * @protected
     */
    static createReflectedProperty(property) {
      this.prototype._createReflectedProperty(property);
    }

    /**
     * Creates a computed property whose value is set to the result of the
     * method described by the given `expression` each time one or more
     * arguments to the method changes.  The expression should be a string
     * in the form of a normal Javascript function signature:
     * `'methodName(arg1, [..., argn])'`
     *
     * @param {string} property Name of computed property to set
     * @param {string} expression Method expression
     * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
     *   method names should be included as a dependency to the effect.
     * @protected
     */
    static createComputedProperty(property, expression, dynamicFn) {
      this.prototype._createComputedProperty(property, expression, dynamicFn);
    }

    /**
     * Parses the provided template to ensure binding effects are created
     * for them, and then ensures property accessors are created for any
     * dependent properties in the template.  Binding effects for bound
     * templates are stored in a linked list on the instance so that
     * templates can be efficiently stamped and unstamped.
     *
     * @param {HTMLTemplateElement} template Template containing binding
     *   bindings
     * @return {Object} Template metadata object
     * @protected
     */
    static bindTemplate(template) {
      return this.prototype._bindTemplate(template);
    }

    // -- binding ----------------------------------------------

    /**
     * Equivalent to static `bindTemplate` API but can be called on
     * an instance to add effects at runtime.  See that method for
     * full API docs.
     *
     * This method may be called on the prototype (for prototypical template
     * binding, to avoid creating accessors every instance) once per prototype,
     * and will be called with `runtimeBinding: true` by `_stampTemplate` to
     * create and link an instance of the template metadata associated with a
     * particular stamping.
     *
     * @param {HTMLTemplateElement} template Template containing binding
     *   bindings
     * @param {boolean=} instanceBinding When false (default), performs
     *   "prototypical" binding of the template and overwrites any previously
     *   bound template for the class. When true (as passed from
     *   `_stampTemplate`), the template info is instanced and linked into
     *   the list of bound templates.
     * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
     *   this is an instance of the prototypical template info
     * @protected
     */
    _bindTemplate(template, instanceBinding) {
      let templateInfo = this.constructor._parseTemplate(template);
      let wasPreBound = this.__templateInfo == templateInfo;
      // Optimization: since this is called twice for proto-bound templates,
      // don't attempt to recreate accessors if this template was pre-bound
      if (!wasPreBound) {
        for (let prop in templateInfo.propertyEffects) {
          this._createPropertyAccessor(prop);
        }
      }
      if (instanceBinding) {
        // For instance-time binding, create instance of template metadata
        // and link into list of templates if necessary
        templateInfo = /** @type {!TemplateInfo} */(Object.create(templateInfo));
        templateInfo.wasPreBound = wasPreBound;
        if (!wasPreBound && this.__templateInfo) {
          let last = this.__templateInfoLast || this.__templateInfo;
          this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
          templateInfo.previousTemplateInfo = last;
          return templateInfo;
        }
      }
      return this.__templateInfo = templateInfo;
    }

    /**
     * Adds a property effect to the given template metadata, which is run
     * at the "propagate" stage of `_propertiesChanged` when the template
     * has been bound to the element via `_bindTemplate`.
     *
     * The `effect` object should match the format in `_addPropertyEffect`.
     *
     * @param {Object} templateInfo Template metadata to add effect to
     * @param {string} prop Property that should trigger the effect
     * @param {Object=} effect Effect metadata object
     * @protected
     */
    static _addTemplatePropertyEffect(templateInfo, prop, effect) {
      let hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
      hostProps[prop] = true;
      let effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
      let propEffects = effects[prop] = effects[prop] || [];
      propEffects.push(effect);
    }

    /**
     * Stamps the provided template and performs instance-time setup for
     * Polymer template features, including data bindings, declarative event
     * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
     * is returned containing the stamped DOM, ready for insertion into the
     * DOM.
     *
     * This method may be called more than once; however note that due to
     * `shadycss` polyfill limitations, only styles from templates prepared
     * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
     * to the shadow root and support CSS custom properties), and note that
     * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
     * any styles required by in runtime-stamped templates must be included
     * in the main element template.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @return {!StampedTemplate} Cloned template content
     * @override
     * @protected
     */
    _stampTemplate(template) {
      // Ensures that created dom is `_enqueueClient`'d to this element so
      // that it can be flushed on next call to `_flushProperties`
      hostStack.beginHosting(this);
      let dom = super._stampTemplate(template);
      hostStack.endHosting(this);
      let templateInfo = /** @type {!TemplateInfo} */(this._bindTemplate(template, true));
      // Add template-instance-specific data to instanced templateInfo
      templateInfo.nodeList = dom.nodeList;
      // Capture child nodes to allow unstamping of non-prototypical templates
      if (!templateInfo.wasPreBound) {
        let nodes = templateInfo.childNodes = [];
        for (let n=dom.firstChild; n; n=n.nextSibling) {
          nodes.push(n);
        }
      }
      dom.templateInfo = templateInfo;
      // Setup compound storage, 2-way listeners, and dataHost for bindings
      setupBindings(this, templateInfo);
      // Flush properties into template nodes if already booted
      if (this.__dataReady) {
        runEffects(this, templateInfo.propertyEffects, this.__data, null,
          false, templateInfo.nodeList);
      }
      return dom;
    }

    /**
     * Removes and unbinds the nodes previously contained in the provided
     * DocumentFragment returned from `_stampTemplate`.
     *
     * @param {!StampedTemplate} dom DocumentFragment previously returned
     *   from `_stampTemplate` associated with the nodes to be removed
     * @protected
     */
    _removeBoundDom(dom) {
      // Unlink template info
      let templateInfo = dom.templateInfo;
      if (templateInfo.previousTemplateInfo) {
        templateInfo.previousTemplateInfo.nextTemplateInfo =
          templateInfo.nextTemplateInfo;
      }
      if (templateInfo.nextTemplateInfo) {
        templateInfo.nextTemplateInfo.previousTemplateInfo =
          templateInfo.previousTemplateInfo;
      }
      if (this.__templateInfoLast == templateInfo) {
        this.__templateInfoLast = templateInfo.previousTemplateInfo;
      }
      templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
      // Remove stamped nodes
      let nodes = templateInfo.childNodes;
      for (let i=0; i<nodes.length; i++) {
        let node = nodes[i];
        node.parentNode.removeChild(node);
      }
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @override
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      let noted = super._parseTemplateNode(node, templateInfo, nodeInfo);
      if (node.nodeType === Node.TEXT_NODE) {
        let parts = this._parseBindings(node.textContent, templateInfo);
        if (parts) {
          // Initialize the textContent with any literal parts
          // NOTE: default to a space here so the textNode remains; some browsers
          // (IE) evacipate an empty textNode following cloneNode/importNode.
          node.textContent = literalFromParts(parts) || ' ';
          addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
          noted = true;
        }
      }
      return noted;
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * parsing bindings from attributes.  A `bindings`
     * array is added to `nodeInfo` and populated with binding metadata
     * with information capturing the binding target, and a `parts` array
     * with one or more metadata objects capturing the source(s) of the
     * binding.
     *
     * @override
     * @param {Element} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
      let parts = this._parseBindings(value, templateInfo);
      if (parts) {
        // Attribute or property
        let origName = name;
        let kind = 'property';
        if (name[name.length-1] == '$') {
          name = name.slice(0, -1);
          kind = 'attribute';
        }
        // Initialize attribute bindings with any literal parts
        let literal = literalFromParts(parts);
        if (literal && kind == 'attribute') {
          node.setAttribute(name, literal);
        }
        // Clear attribute before removing, since IE won't allow removing
        // `value` attribute if it previously had a value (can't
        // unconditionally set '' before removing since attributes with `$`
        // can't be set using setAttribute)
        if (node.localName === 'input' && origName === 'value') {
          node.setAttribute(origName, '');
        }
        // Remove annotation
        node.removeAttribute(origName);
        // Case hackery: attributes are lower-case, but bind targets
        // (properties) are case sensitive. Gambit is to map dash-case to
        // camel-case: `foo-bar` becomes `fooBar`.
        // Attribute bindings are excepted.
        if (kind === 'property') {
          name = Object(__WEBPACK_IMPORTED_MODULE_3__utils_case_map_js__["dashToCamelCase"])(name);
        }
        addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
        return true;
      } else {
        return super._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value);
      }
    }

    /**
     * Overrides default `TemplateStamp` implementation to add support for
     * binding the properties that a nested template depends on to the template
     * as `_host_<property>`.
     *
     * @override
     * @param {Node} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template node
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     * @protected
     * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
     */
    static _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
      let noted = super._parseTemplateNestedTemplate(node, templateInfo, nodeInfo);
      // Merge host props into outer template and add bindings
      let hostProps = nodeInfo.templateInfo.hostProps;
      let mode = '{';
      for (let source in hostProps) {
        let parts = [{ mode, source, dependencies: [source] }];
        addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
      }
      return noted;
    }

    /**
     * Called to parse text in a template (either attribute values or
     * textContent) into binding metadata.
     *
     * Any overrides of this method should return an array of binding part
     * metadata  representing one or more bindings found in the provided text
     * and any "literal" text in between.  Any non-literal parts will be passed
     * to `_evaluateBinding` when any dependencies change.  The only required
     * fields of each "part" in the returned array are as follows:
     *
     * - `dependencies` - Array containing trigger metadata for each property
     *   that should trigger the binding to update
     * - `literal` - String containing text if the part represents a literal;
     *   in this case no `dependencies` are needed
     *
     * Additional metadata for use by `_evaluateBinding` may be provided in
     * each part object as needed.
     *
     * The default implementation handles the following types of bindings
     * (one or more may be intermixed with literal strings):
     * - Property binding: `[[prop]]`
     * - Path binding: `[[object.prop]]`
     * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
     * - Two-way property or path bindings (supports negation):
     *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
     * - Inline computed method (supports negation):
     *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
     *
     * @param {string} text Text to parse from attribute or textContent
     * @param {Object} templateInfo Current template metadata
     * @return {Array<!BindingPart>} Array of binding part metadata
     * @protected
     */
    static _parseBindings(text, templateInfo) {
      let parts = [];
      let lastIndex = 0;
      let m;
      // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
      // Regex matches:
      //        Iteration 1:  Iteration 2:
      // m[1]: '{{'          '[['
      // m[2]: ''            '!'
      // m[3]: 'prop'        'compute(foo,bar)'
      while ((m = bindingRegex.exec(text)) !== null) {
        // Add literal part
        if (m.index > lastIndex) {
          parts.push({literal: text.slice(lastIndex, m.index)});
        }
        // Add binding part
        let mode = m[1][0];
        let negate = Boolean(m[2]);
        let source = m[3].trim();
        let customEvent = false, notifyEvent = '', colon = -1;
        if (mode == '{' && (colon = source.indexOf('::')) > 0) {
          notifyEvent = source.substring(colon + 2);
          source = source.substring(0, colon);
          customEvent = true;
        }
        let signature = parseMethod(source);
        let dependencies = [];
        if (signature) {
          // Inline computed function
          let {args, methodName} = signature;
          for (let i=0; i<args.length; i++) {
            let arg = args[i];
            if (!arg.literal) {
              dependencies.push(arg);
            }
          }
          let dynamicFns = templateInfo.dynamicFns;
          if (dynamicFns && dynamicFns[methodName] || signature.static) {
            dependencies.push(methodName);
            signature.dynamicFn = true;
          }
        } else {
          // Property or path
          dependencies.push(source);
        }
        parts.push({
          source, mode, negate, customEvent, signature, dependencies,
          event: notifyEvent
        });
        lastIndex = bindingRegex.lastIndex;
      }
      // Add a final literal part
      if (lastIndex && lastIndex < text.length) {
        let literal = text.substring(lastIndex);
        if (literal) {
          parts.push({
            literal: literal
          });
        }
      }
      if (parts.length) {
        return parts;
      } else {
        return null;
      }
    }

    /**
     * Called to evaluate a previously parsed binding part based on a set of
     * one or more changed dependencies.
     *
     * @param {this} inst Element that should be used as scope for
     *   binding dependencies
     * @param {BindingPart} part Binding part metadata
     * @param {string} path Property/path that triggered this effect
     * @param {Object} props Bag of current property changes
     * @param {Object} oldProps Bag of previous values for changed properties
     * @param {boolean} hasPaths True with `props` contains one or more paths
     * @return {*} Value the binding part evaluated to
     * @protected
     */
    static _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
      let value;
      if (part.signature) {
        value = runMethodEffect(inst, path, props, oldProps, part.signature);
      } else if (path != part.source) {
        value = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(inst, part.source);
      } else {
        if (hasPaths && Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["d" /* isPath */])(path)) {
          value = Object(__WEBPACK_IMPORTED_MODULE_2__utils_path_js__["a" /* get */])(inst, path);
        } else {
          value = inst.__data[path];
        }
      }
      if (part.negate) {
        value = !value;
      }
      return value;
    }

  }

  // make a typing for closure :P
  PropertyEffectsType = PropertyEffects;

  return PropertyEffects;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyEffects;


/**
 * Helper api for enqueing client dom created by a host element.
 *
 * By default elements are flushed via `_flushProperties` when
 * `connectedCallback` is called. Elements attach their client dom to
 * themselves at `ready` time which results from this first flush.
 * This provides an ordering guarantee that the client dom an element
 * creates is flushed before the element itself (i.e. client `ready`
 * fires before host `ready`).
 *
 * However, if `_flushProperties` is called *before* an element is connected,
 * as for example `Templatize` does, this ordering guarantee cannot be
 * satisfied because no elements are connected. (Note: Bound elements that
 * receive data do become enqueued clients and are properly ordered but
 * unbound elements are not.)
 *
 * To maintain the desired "client before host" ordering guarantee for this
 * case we rely on the "host stack. Client nodes registers themselves with
 * the creating host element when created. This ensures that all client dom
 * is readied in the proper order, maintaining the desired guarantee.
 *
 * @private
 */
let hostStack = {

  stack: [],

  /**
   * @param {*} inst Instance to add to hostStack
   * @this {hostStack}
   */
  registerHost(inst) {
    if (this.stack.length) {
      let host = this.stack[this.stack.length-1];
      host._enqueueClient(inst);
    }
  },

  /**
   * @param {*} inst Instance to begin hosting
   * @this {hostStack}
   */
  beginHosting(inst) {
    this.stack.push(inst);
  },

  /**
   * @param {*} inst Instance to end hosting
   * @this {hostStack}
   */
  endHosting(inst) {
    let stackLen = this.stack.length;
    if (stackLen && this.stack[stackLen-1] == inst) {
      this.stack.pop();
    }
  }

};


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return nativeShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nativeCssVariables; });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



let nativeShadow = !(window['ShadyDOM'] && window['ShadyDOM']['inUse']);
let nativeCssVariables;

/**
 * @param {(ShadyCSSOptions | ShadyCSSInterface)=} settings
 */
function calcCssVariables(settings) {
  if (settings && settings['shimcssproperties']) {
    nativeCssVariables = false;
  } else {
    // chrome 49 has semi-working css vars, check if box-shadow works
    // safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
    // However, shim css custom properties are only supported with ShadyDOM enabled,
    // so fall back on native if we do not detect ShadyDOM
    // Edge 15: custom properties used in ::before and ::after will also be used in the parent element
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12414257/
    nativeCssVariables = nativeShadow || Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) &&
      window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)'));
  }
}

if (window.ShadyCSS && window.ShadyCSS.nativeCss !== undefined) {
  nativeCssVariables = window.ShadyCSS.nativeCss;
} else if (window.ShadyCSS) {
  calcCssVariables(window.ShadyCSS);
  // reset window variable to let ShadyCSS API take its place
  window.ShadyCSS = undefined;
} else {
  calcCssVariables(window['WebComponents'] && window['WebComponents']['flags']);
}

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export StyleNode */
/* harmony export (immutable) */ __webpack_exports__["a"] = parse;
/* harmony export (immutable) */ __webpack_exports__["b"] = stringify;
/* unused harmony export removeCustomPropAssignment */
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/*
Extremely simple css parser. Intended to be not more than what we need
and definitely not necessarily correct =).
*/



/** @unrestricted */
class StyleNode {
  constructor() {
    /** @type {number} */
    this['start'] = 0;
    /** @type {number} */
    this['end'] = 0;
    /** @type {StyleNode} */
    this['previous'] = null;
    /** @type {StyleNode} */
    this['parent'] = null;
    /** @type {Array<StyleNode>} */
    this['rules'] = null;
    /** @type {string} */
    this['parsedCssText'] = '';
    /** @type {string} */
    this['cssText'] = '';
    /** @type {boolean} */
    this['atRule'] = false;
    /** @type {number} */
    this['type'] = 0;
    /** @type {string} */
    this['keyframesName'] = '';
    /** @type {string} */
    this['selector'] = '';
    /** @type {string} */
    this['parsedSelector'] = '';
  }
}



// given a string of css, return a simple rule tree
/**
 * @param {string} text
 * @return {StyleNode}
 */
function parse(text) {
  text = clean(text);
  return parseCss(lex(text), text);
}

// remove stuff we don't care about that may hinder parsing
/**
 * @param {string} cssText
 * @return {string}
 */
function clean(cssText) {
  return cssText.replace(RX.comments, '').replace(RX.port, '');
}

// super simple {...} lexer that returns a node tree
/**
 * @param {string} text
 * @return {StyleNode}
 */
function lex(text) {
  let root = new StyleNode();
  root['start'] = 0;
  root['end'] = text.length
  let n = root;
  for (let i = 0, l = text.length; i < l; i++) {
    if (text[i] === OPEN_BRACE) {
      if (!n['rules']) {
        n['rules'] = [];
      }
      let p = n;
      let previous = p['rules'][p['rules'].length - 1] || null;
      n = new StyleNode();
      n['start'] = i + 1;
      n['parent'] = p;
      n['previous'] = previous;
      p['rules'].push(n);
    } else if (text[i] === CLOSE_BRACE) {
      n['end'] = i + 1;
      n = n['parent'] || root;
    }
  }
  return root;
}

// add selectors/cssText to node tree
/**
 * @param {StyleNode} node
 * @param {string} text
 * @return {StyleNode}
 */
function parseCss(node, text) {
  let t = text.substring(node['start'], node['end'] - 1);
  node['parsedCssText'] = node['cssText'] = t.trim();
  if (node['parent']) {
    let ss = node['previous'] ? node['previous']['end'] : node['parent']['start'];
    t = text.substring(ss, node['start'] - 1);
    t = _expandUnicodeEscapes(t);
    t = t.replace(RX.multipleSpaces, ' ');
    // TODO(sorvell): ad hoc; make selector include only after last ;
    // helps with mixin syntax
    t = t.substring(t.lastIndexOf(';') + 1);
    let s = node['parsedSelector'] = node['selector'] = t.trim();
    node['atRule'] = (s.indexOf(AT_START) === 0);
    // note, support a subset of rule types...
    if (node['atRule']) {
      if (s.indexOf(MEDIA_START) === 0) {
        node['type'] = types.MEDIA_RULE;
      } else if (s.match(RX.keyframesRule)) {
        node['type'] = types.KEYFRAMES_RULE;
        node['keyframesName'] =
          node['selector'].split(RX.multipleSpaces).pop();
      }
    } else {
      if (s.indexOf(VAR_START) === 0) {
        node['type'] = types.MIXIN_RULE;
      } else {
        node['type'] = types.STYLE_RULE;
      }
    }
  }
  let r$ = node['rules'];
  if (r$) {
    for (let i = 0, l = r$.length, r;
      (i < l) && (r = r$[i]); i++) {
      parseCss(r, text);
    }
  }
  return node;
}

/**
 * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
 * expanded form that doesn't require trailing space `\000033`
 * @param {string} s
 * @return {string}
 */
function _expandUnicodeEscapes(s) {
  return s.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
    let code = arguments[1],
      repeat = 6 - code.length;
    while (repeat--) {
      code = '0' + code;
    }
    return '\\' + code;
  });
}

/**
 * stringify parsed css.
 * @param {StyleNode} node
 * @param {boolean=} preserveProperties
 * @param {string=} text
 * @return {string}
 */
function stringify(node, preserveProperties, text = '') {
  // calc rule cssText
  let cssText = '';
  if (node['cssText'] || node['rules']) {
    let r$ = node['rules'];
    if (r$ && !_hasMixinRules(r$)) {
      for (let i = 0, l = r$.length, r;
        (i < l) && (r = r$[i]); i++) {
        cssText = stringify(r, preserveProperties, cssText);
      }
    } else {
      cssText = preserveProperties ? node['cssText'] :
        removeCustomProps(node['cssText']);
      cssText = cssText.trim();
      if (cssText) {
        cssText = '  ' + cssText + '\n';
      }
    }
  }
  // emit rule if there is cssText
  if (cssText) {
    if (node['selector']) {
      text += node['selector'] + ' ' + OPEN_BRACE + '\n';
    }
    text += cssText;
    if (node['selector']) {
      text += CLOSE_BRACE + '\n\n';
    }
  }
  return text;
}

/**
 * @param {Array<StyleNode>} rules
 * @return {boolean}
 */
function _hasMixinRules(rules) {
  let r = rules[0];
  return Boolean(r) && Boolean(r['selector']) && r['selector'].indexOf(VAR_START) === 0;
}

/**
 * @param {string} cssText
 * @return {string}
 */
function removeCustomProps(cssText) {
  cssText = removeCustomPropAssignment(cssText);
  return removeCustomPropApply(cssText);
}

/**
 * @param {string} cssText
 * @return {string}
 */
function removeCustomPropAssignment(cssText) {
  return cssText
    .replace(RX.customProp, '')
    .replace(RX.mixinProp, '');
}

/**
 * @param {string} cssText
 * @return {string}
 */
function removeCustomPropApply(cssText) {
  return cssText
    .replace(RX.mixinApply, '')
    .replace(RX.varApply, '');
}

/** @enum {number} */
const types = {
  STYLE_RULE: 1,
  KEYFRAMES_RULE: 7,
  MEDIA_RULE: 4,
  MIXIN_RULE: 1000
}
/* harmony export (immutable) */ __webpack_exports__["c"] = types;


const OPEN_BRACE = '{';
const CLOSE_BRACE = '}';

// helper regexp's
const RX = {
  comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
  port: /@import[^;]*;/gim,
  customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
  mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
  mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
  varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
  keyframesRule: /^@[^\s]*keyframes/,
  multipleSpaces: /\s+/g
}

const VAR_START = '--';
const MEDIA_START = '@media';
const AT_START = '@';


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

const VAR_ASSIGN = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi;
/* harmony export (immutable) */ __webpack_exports__["c"] = VAR_ASSIGN;

const MIXIN_MATCH = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi;
/* harmony export (immutable) */ __webpack_exports__["b"] = MIXIN_MATCH;

const VAR_CONSUMED = /(--[\w-]+)\s*([:,;)]|$)/gi;
/* unused harmony export VAR_CONSUMED */

const ANIMATION_MATCH = /(animation\s*:)|(animation-name\s*:)/;
/* unused harmony export ANIMATION_MATCH */

const MEDIA_MATCH = /@media\s(.*)/;
/* harmony export (immutable) */ __webpack_exports__["a"] = MEDIA_MATCH;

const IS_VAR = /^--/;
/* unused harmony export IS_VAR */

const BRACKETED = /\{[^}]*\}/g;
/* unused harmony export BRACKETED */

const HOST_PREFIX = '(?:^|[^.#[:])';
/* unused harmony export HOST_PREFIX */

const HOST_SUFFIX = '($|[.:[\\s>+~])';
/* unused harmony export HOST_SUFFIX */



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = updateNativeProperties;
/* harmony export (immutable) */ __webpack_exports__["b"] = getComputedStyleValue;
/* harmony export (immutable) */ __webpack_exports__["a"] = detectMixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_regex_js__ = __webpack_require__(58);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





/**
 * @param {Element} element
 * @param {Object=} properties
 */
function updateNativeProperties(element, properties) {
  // remove previous properties
  for (let p in properties) {
    // NOTE: for bc with shim, don't apply null values.
    if (p === null) {
      element.style.removeProperty(p);
    } else {
      element.style.setProperty(p, properties[p]);
    }
  }
}

/**
 * @param {Element} element
 * @param {string} property
 * @return {string}
 */
function getComputedStyleValue(element, property) {
  /**
   * @const {string}
   */
  const value = window.getComputedStyle(element).getPropertyValue(property);
  if (!value) {
    return '';
  } else {
    return value.trim();
  }
}

/**
 * return true if `cssText` contains a mixin definition or consumption
 * @param {string} cssText
 * @return {boolean}
 */
function detectMixin(cssText) {
  const has = __WEBPACK_IMPORTED_MODULE_0__common_regex_js__["b" /* MIXIN_MATCH */].test(cssText) || __WEBPACK_IMPORTED_MODULE_0__common_regex_js__["c" /* VAR_ASSIGN */].test(cssText);
  // reset state of the regexes
  __WEBPACK_IMPORTED_MODULE_0__common_regex_js__["b" /* MIXIN_MATCH */].lastIndex = 0;
  __WEBPACK_IMPORTED_MODULE_0__common_regex_js__["c" /* VAR_ASSIGN */].lastIndex = 0;
  return has;
}


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


let debouncerQueue = [];

const enqueueDebouncer = function(debouncer) {
  debouncerQueue.push(debouncer);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = enqueueDebouncer;


function flushDebouncers() {
  const didFlush = Boolean(debouncerQueue.length);
  while (debouncerQueue.length) {
    try {
      debouncerQueue.shift().flush();
    } catch(e) {
      setTimeout(() => {
        throw e;
      });
    }
  }
  return didFlush;
}

const flush = function() {
  let shadyDOM, debouncers;
  do {
    shadyDOM = window.ShadyDOM && ShadyDOM.flush();
    if (window.ShadyCSS && window.ShadyCSS.ScopingShim) {
      window.ShadyCSS.ScopingShim.flush();
    }
    debouncers = flushDebouncers();
  } while (shadyDOM || debouncers);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = flush;



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__class_js__ = __webpack_require__(269);


const Polymer = function(info) {
  // if input is a `class` (aka a function with a prototype), use the prototype
  // remember that the `constructor` will never be called
  let klass;
  if (typeof info === 'function') {
    klass = info;
  } else {
    klass = Object(__WEBPACK_IMPORTED_MODULE_0__class_js__["a" /* Class */])(info);
  }
  customElements.define(klass.is, /** @type {!HTMLElement} */(klass));
  return klass;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Polymer;



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Templatize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateInstanceBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__ = __webpack_require__(30);




// Base class for HTMLTemplateElement extension that has property effects
// machinery for propagating host properties to children. This is an ES5
// class only because Babel (incorrectly) requires super() in the class
// constructor even though no `this` is used and it returns an instance.
let newInstance = null;
/**
 * @constructor
 * @extends {HTMLTemplateElement}
 */
function HTMLTemplateElementExtension() { return newInstance; }
HTMLTemplateElementExtension.prototype = Object.create(HTMLTemplateElement.prototype, {
  constructor: {
    value: HTMLTemplateElementExtension,
    writable: true
  }
});
/**
 * @constructor
 * @implements {Polymer_PropertyEffects}
 * @extends {HTMLTemplateElementExtension}
 */
const DataTemplate = Object(__WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__["a" /* PropertyEffects */])(HTMLTemplateElementExtension);
/**
 * @constructor
 * @implements {Polymer_MutableData}
 * @extends {DataTemplate}
 */
const MutableDataTemplate = Object(__WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__["a" /* MutableData */])(DataTemplate);

// Applies a DataTemplate subclass to a <template> instance
function upgradeTemplate(template, constructor) {
  newInstance = template;
  Object.setPrototypeOf(template, constructor.prototype);
  new constructor();
  newInstance = null;
}

// Base class for TemplateInstance's
/**
 * @constructor
 * @implements {Polymer_PropertyEffects}
 */
const base = Object(__WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__["a" /* PropertyEffects */])(class {});

/**
 * @polymer
 * @customElement
 * @appliesMixin Polymer.PropertyEffects
 * @unrestricted
 */
class TemplateInstanceBase extends base {
  constructor(props) {
    super();
    this._configureProperties(props);
    this.root = this._stampTemplate(this.__dataHost);
    // Save list of stamped children
    let children = this.children = [];
    for (let n = this.root.firstChild; n; n=n.nextSibling) {
      children.push(n);
      n.__templatizeInstance = this;
    }
    if (this.__templatizeOwner.__hideTemplateChildren__) {
      this._showHideChildren(true);
    }
    // Flush props only when props are passed if instance props exist
    // or when there isn't instance props.
    let options = this.__templatizeOptions;
    if ((props && options.instanceProps) || !options.instanceProps) {
      this._enableProperties();
    }
  }
  /**
   * Configure the given `props` by calling `_setPendingProperty`. Also
   * sets any properties stored in `__hostProps`.
   * @private
   * @param {Object} props Object of property name-value pairs to set.
   */
  _configureProperties(props) {
    let options = this.__templatizeOptions;
    if (props) {
      for (let iprop in options.instanceProps) {
        if (iprop in props) {
          this._setPendingProperty(iprop, props[iprop]);
        }
      }
    }
    for (let hprop in this.__hostProps) {
      this._setPendingProperty(hprop, this.__dataHost['_host_' + hprop]);
    }
  }
  /**
   * Forwards a host property to this instance.  This method should be
   * called on instances from the `options.forwardHostProp` callback
   * to propagate changes of host properties to each instance.
   *
   * Note this method enqueues the change, which are flushed as a batch.
   *
   * @param {string} prop Property or path name
   * @param {*} value Value of the property to forward
   */
  forwardHostProp(prop, value) {
    if (this._setPendingPropertyOrPath(prop, value, false, true)) {
      this.__dataHost._enqueueClient(this);
    }
  }
  /**
   * @override
   */
  _addEventListenerToNode(node, eventName, handler) {
    if (this._methodHost && this.__templatizeOptions.parentModel) {
      // If this instance should be considered a parent model, decorate
      // events this template instance as `model`
      this._methodHost._addEventListenerToNode(node, eventName, (e) => {
        e.model = this;
        handler(e);
      });
    } else {
      // Otherwise delegate to the template's host (which could be)
      // another template instance
      let templateHost = this.__dataHost.__dataHost;
      if (templateHost) {
        templateHost._addEventListenerToNode(node, eventName, handler);
      }
    }
  }
  /**
   * Shows or hides the template instance top level child elements. For
   * text nodes, `textContent` is removed while "hidden" and replaced when
   * "shown."
   * @param {boolean} hide Set to true to hide the children;
   * set to false to show them.
   * @protected
   */
  _showHideChildren(hide) {
    let c = this.children;
    for (let i=0; i<c.length; i++) {
      let n = c[i];
      // Ignore non-changes
      if (Boolean(hide) != Boolean(n.__hideTemplateChildren__)) {
        if (n.nodeType === Node.TEXT_NODE) {
          if (hide) {
            n.__polymerTextContent__ = n.textContent;
            n.textContent = '';
          } else {
            n.textContent = n.__polymerTextContent__;
          }
        } else if (n.style) {
          if (hide) {
            n.__polymerDisplay__ = n.style.display;
            n.style.display = 'none';
          } else {
            n.style.display = n.__polymerDisplay__;
          }
        }
      }
      n.__hideTemplateChildren__ = hide;
      if (n._showHideChildren) {
        n._showHideChildren(hide);
      }
    }
  }
  /**
   * Overrides default property-effects implementation to intercept
   * textContent bindings while children are "hidden" and cache in
   * private storage for later retrieval.
   *
   * @override
   */
  _setUnmanagedPropertyToNode(node, prop, value) {
    if (node.__hideTemplateChildren__ &&
        node.nodeType == Node.TEXT_NODE && prop == 'textContent') {
      node.__polymerTextContent__ = value;
    } else {
      super._setUnmanagedPropertyToNode(node, prop, value);
    }
  }
  /**
   * Find the parent model of this template instance.  The parent model
   * is either another templatize instance that had option `parentModel: true`,
   * or else the host element.
   *
   * @return {Polymer_PropertyEffects} The parent model of this instance
   */
  get parentModel() {
    let model = this.__parentModel;
    if (!model) {
      let options;
      model = this;
      do {
        // A template instance's `__dataHost` is a <template>
        // `model.__dataHost.__dataHost` is the template's host
        model = model.__dataHost.__dataHost;
      } while ((options = model.__templatizeOptions) && !options.parentModel);
      this.__parentModel = model;
    }
    return model;
  }
}

/** @type {!DataTemplate} */
TemplateInstanceBase.prototype.__dataHost;
/** @type {!TemplatizeOptions} */
TemplateInstanceBase.prototype.__templatizeOptions;
/** @type {!Polymer_PropertyEffects} */
TemplateInstanceBase.prototype._methodHost;
/** @type {!Object} */
TemplateInstanceBase.prototype.__templatizeOwner;
/** @type {!Object} */
TemplateInstanceBase.prototype.__hostProps;

/**
 * @constructor
 * @extends {TemplateInstanceBase}
 * @implements {Polymer_MutableData}
 */
const MutableTemplateInstanceBase = Object(__WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__["a" /* MutableData */])(TemplateInstanceBase);

function findMethodHost(template) {
  // Technically this should be the owner of the outermost template.
  // In shadow dom, this is always getRootNode().host, but we can
  // approximate this via cooperation with our dataHost always setting
  // `_methodHost` as long as there were bindings (or id's) on this
  // instance causing it to get a dataHost.
  let templateHost = template.__dataHost;
  return templateHost && templateHost._methodHost || templateHost;
}

/* eslint-disable valid-jsdoc */
/**
 * @suppress {missingProperties} class.prototype is not defined for some reason
 */
function createTemplatizerClass(template, templateInfo, options) {
  // Anonymous class created by the templatize
  let base = options.mutableData ?
    MutableTemplateInstanceBase : TemplateInstanceBase;
  /**
   * @constructor
   * @extends {base}
   */
  let klass = class extends base { };
  klass.prototype.__templatizeOptions = options;
  klass.prototype._bindTemplate(template);
  addNotifyEffects(klass, template, templateInfo, options);
  return klass;
}

/**
 * @suppress {missingProperties} class.prototype is not defined for some reason
 */
function addPropagateEffects(template, templateInfo, options) {
  let userForwardHostProp = options.forwardHostProp;
  if (userForwardHostProp) {
    // Provide data API and property effects on memoized template class
    let klass = templateInfo.templatizeTemplateClass;
    if (!klass) {
      let base = options.mutableData ? MutableDataTemplate : DataTemplate;
      klass = templateInfo.templatizeTemplateClass =
        class TemplatizedTemplate extends base {};
      // Add template - >instances effects
      // and host <- template effects
      let hostProps = templateInfo.hostProps;
      for (let prop in hostProps) {
        klass.prototype._addPropertyEffect('_host_' + prop,
          klass.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,
          {fn: createForwardHostPropEffect(prop, userForwardHostProp)});
        klass.prototype._createNotifyingProperty('_host_' + prop);
      }
    }
    upgradeTemplate(template, klass);
    // Mix any pre-bound data into __data; no need to flush this to
    // instances since they pull from the template at instance-time
    if (template.__dataProto) {
      // Note, generally `__dataProto` could be chained, but it's guaranteed
      // to not be since this is a vanilla template we just added effects to
      Object.assign(template.__data, template.__dataProto);
    }
    // Clear any pending data for performance
    template.__dataTemp = {};
    template.__dataPending = null;
    template.__dataOld = null;
    template._enableProperties();
  }
}
/* eslint-enable valid-jsdoc */

function createForwardHostPropEffect(hostProp, userForwardHostProp) {
  return function forwardHostProp(template, prop, props) {
    userForwardHostProp.call(template.__templatizeOwner,
      prop.substring('_host_'.length), props[prop]);
  };
}

function addNotifyEffects(klass, template, templateInfo, options) {
  let hostProps = templateInfo.hostProps || {};
  for (let iprop in options.instanceProps) {
    delete hostProps[iprop];
    let userNotifyInstanceProp = options.notifyInstanceProp;
    if (userNotifyInstanceProp) {
      klass.prototype._addPropertyEffect(iprop,
        klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
        {fn: createNotifyInstancePropEffect(iprop, userNotifyInstanceProp)});
    }
  }
  if (options.forwardHostProp && template.__dataHost) {
    for (let hprop in hostProps) {
      klass.prototype._addPropertyEffect(hprop,
        klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
        {fn: createNotifyHostPropEffect()});
    }
  }
}

function createNotifyInstancePropEffect(instProp, userNotifyInstanceProp) {
  return function notifyInstanceProp(inst, prop, props) {
    userNotifyInstanceProp.call(inst.__templatizeOwner,
      inst, prop, props[prop]);
  };
}

function createNotifyHostPropEffect() {
  return function notifyHostProp(inst, prop, props) {
    inst.__dataHost._setPendingPropertyOrPath('_host_' + prop, props[prop], true, true);
  };
}

/**
 * Module for preparing and stamping instances of templates that utilize
 * Polymer's data-binding and declarative event listener features.
 *
 * Example:
 *
 *     // Get a template from somewhere, e.g. light DOM
 *     let template = this.querySelector('template');
 *     // Prepare the template
 *     let TemplateClass = Polymer.Templatize.templatize(template);
 *     // Instance the template with an initial data model
 *     let instance = new TemplateClass({myProp: 'initial'});
 *     // Insert the instance's DOM somewhere, e.g. element's shadow DOM
 *     this.shadowRoot.appendChild(instance.root);
 *     // Changing a property on the instance will propagate to bindings
 *     // in the template
 *     instance.myProp = 'new value';
 *
 * The `options` dictionary passed to `templatize` allows for customizing
 * features of the generated template class, including how outer-scope host
 * properties should be forwarded into template instances, how any instance
 * properties added into the template's scope should be notified out to
 * the host, and whether the instance should be decorated as a "parent model"
 * of any event handlers.
 *
 *     // Customze property forwarding and event model decoration
 *     let TemplateClass = Polymer.Templatize.templatize(template, this, {
 *       parentModel: true,
 *       instanceProps: {...},
 *       forwardHostProp(property, value) {...},
 *       notifyInstanceProp(instance, property, value) {...},
 *     });
 *
 *
 * @namespace
 * @memberof Polymer
 * @summary Module for preparing and stamping instances of templates
 *   utilizing Polymer templating features.
 */

const Templatize = {

  /**
   * Returns an anonymous `Polymer.PropertyEffects` class bound to the
   * `<template>` provided.  Instancing the class will result in the
   * template being stamped into document fragment stored as the instance's
   * `root` property, after which it can be appended to the DOM.
   *
   * Templates may utilize all Polymer data-binding features as well as
   * declarative event listeners.  Event listeners and inline computing
   * functions in the template will be called on the host of the template.
   *
   * The constructor returned takes a single argument dictionary of initial
   * property values to propagate into template bindings.  Additionally
   * host properties can be forwarded in, and instance properties can be
   * notified out by providing optional callbacks in the `options` dictionary.
   *
   * Valid configuration in `options` are as follows:
   *
   * - `forwardHostProp(property, value)`: Called when a property referenced
   *   in the template changed on the template's host. As this library does
   *   not retain references to templates instanced by the user, it is the
   *   templatize owner's responsibility to forward host property changes into
   *   user-stamped instances.  The `instance.forwardHostProp(property, value)`
   *    method on the generated class should be called to forward host
   *   properties into the template to prevent unnecessary property-changed
   *   notifications. Any properties referenced in the template that are not
   *   defined in `instanceProps` will be notified up to the template's host
   *   automatically.
   * - `instanceProps`: Dictionary of property names that will be added
   *   to the instance by the templatize owner.  These properties shadow any
   *   host properties, and changes within the template to these properties
   *   will result in `notifyInstanceProp` being called.
   * - `mutableData`: When `true`, the generated class will skip strict
   *   dirty-checking for objects and arrays (always consider them to be
   *   "dirty").
   * - `notifyInstanceProp(instance, property, value)`: Called when
   *   an instance property changes.  Users may choose to call `notifyPath`
   *   on e.g. the owner to notify the change.
   * - `parentModel`: When `true`, events handled by declarative event listeners
   *   (`on-event="handler"`) will be decorated with a `model` property pointing
   *   to the template instance that stamped it.  It will also be returned
   *   from `instance.parentModel` in cases where template instance nesting
   *   causes an inner model to shadow an outer model.
   *
   * Note that the class returned from `templatize` is generated only once
   * for a given `<template>` using `options` from the first call for that
   * template, and the cached class is returned for all subsequent calls to
   * `templatize` for that template.  As such, `options` callbacks should not
   * close over owner-specific properties since only the first `options` is
   * used; rather, callbacks are called bound to the `owner`, and so context
   * needed from the callbacks (such as references to `instances` stamped)
   * should be stored on the `owner` such that they can be retrieved via `this`.
   *
   * @memberof Polymer.Templatize
   * @param {!HTMLTemplateElement} template Template to templatize
   * @param {!Polymer_PropertyEffects} owner Owner of the template instances;
   *   any optional callbacks will be bound to this owner.
   * @param {Object=} options Options dictionary (see summary for details)
   * @return {function(new:TemplateInstanceBase)} Generated class bound to the template
   *   provided
   * @suppress {invalidCasts}
   */
  templatize(template, owner, options) {
    options = /** @type {!TemplatizeOptions} */(options || {});
    if (template.__templatizeOwner) {
      throw new Error('A <template> can only be templatized once');
    }
    template.__templatizeOwner = owner;
    let templateInfo = owner.constructor._parseTemplate(template);
    // Get memoized base class for the prototypical template, which
    // includes property effects for binding template & forwarding
    let baseClass = templateInfo.templatizeInstanceClass;
    if (!baseClass) {
      baseClass = createTemplatizerClass(template, templateInfo, options);
      templateInfo.templatizeInstanceClass = baseClass;
    }
    // Host property forwarding must be installed onto template instance
    addPropagateEffects(template, templateInfo, options);
    // Subclass base class and add reference for this specific template
    let klass = class TemplateInstance extends baseClass {};
    klass.prototype._methodHost = findMethodHost(template);
    klass.prototype.__dataHost = template;
    klass.prototype.__templatizeOwner = owner;
    klass.prototype.__hostProps = templateInfo.hostProps;
    return /** @type {function(new:TemplateInstanceBase)} */(klass);
  },

  /**
   * Returns the template "model" associated with a given element, which
   * serves as the binding scope for the template instance the element is
   * contained in. A template model is an instance of
   * `TemplateInstanceBase`, and should be used to manipulate data
   * associated with this template instance.
   *
   * Example:
   *
   *   let model = modelForElement(el);
   *   if (model.index < 10) {
   *     model.set('item.checked', true);
   *   }
   *
   * @memberof Polymer.Templatize
   * @param {HTMLTemplateElement} template The model will be returned for
   *   elements stamped from this template
   * @param {Node} node Node for which to return a template model.
   * @return {TemplateInstanceBase} Template instance representing the
   *   binding scope for the element
   */
  modelForElement(template, node) {
    let model;
    while (node) {
      // An element with a __templatizeInstance marks the top boundary
      // of a scope; walk up until we find one, and then ensure that
      // its __dataHost matches `this`, meaning this dom-repeat stamped it
      if ((model = node.__templatizeInstance)) {
        // Found an element stamped by another template; keep walking up
        // from its __dataHost
        if (model.__dataHost != template) {
          node = model.__dataHost;
        } else {
          return model;
        }
      } else {
        // Still in a template scope, keep going up until
        // a __templatizeInstance is found
        node = node.parentNode;
      }
    }
    return null;
  }
};





/***/ }),
/* 63 */,
/* 64 */
/***/ (function(module, exports) {

/**
 * The default argument placeholder value for methods.
 *
 * @type {Object}
 */
module.exports = {};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(32),
    metaMap = __webpack_require__(66);

/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var WeakMap = __webpack_require__(67);

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ }),
/* 69 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var composeArgs = __webpack_require__(71),
    composeArgsRight = __webpack_require__(72),
    countHolders = __webpack_require__(142),
    createCtor = __webpack_require__(16),
    createRecurry = __webpack_require__(73),
    getHolder = __webpack_require__(81),
    reorder = __webpack_require__(159),
    replaceHolders = __webpack_require__(39),
    root = __webpack_require__(1);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_ARY_FLAG = 128,
    WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG,
      isBind = bitmask & WRAP_BIND_FLAG,
      isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
      isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
      isFlip = bitmask & WRAP_FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

module.exports = createHybrid;


/***/ }),
/* 71 */
/***/ (function(module, exports) {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgs;


/***/ }),
/* 72 */
/***/ (function(module, exports) {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}

module.exports = composeArgsRight;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var isLaziable = __webpack_require__(143),
    setData = __webpack_require__(76),
    setWrapToString = __webpack_require__(78);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
    bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
  }
  var newData = [
    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
    newHoldersRight, argPos, ary, arity
  ];

  var result = wrapFunc.apply(undefined, newData);
  if (isLaziable(func)) {
    setData(result, newData);
  }
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

module.exports = createRecurry;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var metaMap = __webpack_require__(66),
    noop = __webpack_require__(144);

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(17),
    baseLodash = __webpack_require__(36);

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

module.exports = LodashWrapper;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetData = __webpack_require__(65),
    shortOut = __webpack_require__(77);

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity
 * function to avoid garbage collection pauses in V8. See
 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData = shortOut(baseSetData);

module.exports = setData;


/***/ }),
/* 77 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var getWrapDetails = __webpack_require__(149),
    insertWrapDetails = __webpack_require__(150),
    setToString = __webpack_require__(79),
    updateWrapDetails = __webpack_require__(153);

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString(wrapper, reference, bitmask) {
  var source = (reference + '');
  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

module.exports = setWrapToString;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(151),
    shortOut = __webpack_require__(77);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 81 */
/***/ (function(module, exports) {

/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func) {
  var object = func;
  return object.placeholder;
}

module.exports = getHolder;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var toFinite = __webpack_require__(162);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(19),
    keys = __webpack_require__(20);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(85),
    eq = __webpack_require__(40);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(80);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(164),
    isArguments = __webpack_require__(41),
    isArray = __webpack_require__(2),
    isBuffer = __webpack_require__(42),
    isIndex = __webpack_require__(38),
    isTypedArray = __webpack_require__(87);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(167),
    baseUnary = __webpack_require__(168),
    nodeUtil = __webpack_require__(169);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(45),
    nativeKeys = __webpack_require__(170);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 89 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(33),
    isLength = __webpack_require__(44);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(46),
    arrayEach = __webpack_require__(37),
    assignValue = __webpack_require__(84),
    baseAssign = __webpack_require__(83),
    baseAssignIn = __webpack_require__(194),
    cloneBuffer = __webpack_require__(197),
    copyArray = __webpack_require__(18),
    copySymbols = __webpack_require__(198),
    copySymbolsIn = __webpack_require__(200),
    getAllKeys = __webpack_require__(96),
    getAllKeysIn = __webpack_require__(201),
    getTag = __webpack_require__(98),
    initCloneArray = __webpack_require__(205),
    initCloneByTag = __webpack_require__(206),
    initCloneObject = __webpack_require__(215),
    isArray = __webpack_require__(2),
    isBuffer = __webpack_require__(42),
    isObject = __webpack_require__(5),
    keys = __webpack_require__(20);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(86),
    baseKeysIn = __webpack_require__(195),
    isArrayLike = __webpack_require__(90);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 93 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(50),
    getPrototype = __webpack_require__(95),
    getSymbols = __webpack_require__(49),
    stubArray = __webpack_require__(93);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(89);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(97),
    getSymbols = __webpack_require__(49),
    keys = __webpack_require__(20);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(50),
    isArray = __webpack_require__(2);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(202),
    Map = __webpack_require__(47),
    Promise = __webpack_require__(203),
    Set = __webpack_require__(204),
    WeakMap = __webpack_require__(67),
    baseGetTag = __webpack_require__(12),
    toSource = __webpack_require__(69);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),
/* 101 */
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(221),
    isObjectLike = __webpack_require__(9);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(222),
    arraySome = __webpack_require__(225),
    cacheHas = __webpack_require__(226);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ }),
/* 105 */
/***/ (function(module, exports) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(107),
    toKey = __webpack_require__(14);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(2),
    isKey = __webpack_require__(53),
    stringToPath = __webpack_require__(108),
    toString = __webpack_require__(25);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(232);

/** Used to match property names within property paths. */
var reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 109 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = cssFromModules;
/* unused harmony export cssFromModule */
/* harmony export (immutable) */ __webpack_exports__["c"] = cssFromTemplate;
/* harmony export (immutable) */ __webpack_exports__["a"] = cssFromModuleImports;
/* unused harmony export _cssFromModuleImports */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resolve_url_js__ = __webpack_require__(27);


const MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
const INCLUDE_ATTR = 'include';

function importModule(moduleId) {
  const /** Polymer.DomModule */ PolymerDomModule = customElements.get('dom-module');
  if (!PolymerDomModule) {
    return null;
  }
  return PolymerDomModule.import(moduleId);
}

/** @typedef {{assetpath: string}} */
let templateWithAssetPath; // eslint-disable-line no-unused-vars

function cssFromModules(moduleIds) {
  let modules = moduleIds.trim().split(/\s+/);
  let cssText = '';
  for (let i=0; i < modules.length; i++) {
    cssText += cssFromModule(modules[i]);
  }
  return cssText;
}

function cssFromModule(moduleId) {
  let m = importModule(moduleId);
  if (m && m._cssText === undefined) {
    // module imports: <link rel="import" type="css">
    let cssText = _cssFromModuleImports(m);
    // include css from the first template in the module
    let t = m.querySelector('template');
    if (t) {
      cssText += cssFromTemplate(t, /** @type {templateWithAssetPath} */(m).assetpath);
    }
    m._cssText = cssText || null;
  }
  if (!m) {
    console.warn('Could not find style data in module named', moduleId);
  }
  return m && m._cssText || '';
}

function cssFromTemplate(template, baseURI) {
  let cssText = '';
  // if element is a template, get content from its .content
  let e$ = template.content.querySelectorAll('style');
  for (let i=0; i < e$.length; i++) {
    let e = e$[i];
    // support style sharing by allowing styles to "include"
    // other dom-modules that contain styling
    let include = e.getAttribute(INCLUDE_ATTR);
    if (include) {
      cssText += cssFromModules(include);
    }
    e.parentNode.removeChild(e);
    cssText += baseURI ?
      Object(__WEBPACK_IMPORTED_MODULE_0__resolve_url_js__["b" /* resolveCss */])(e.textContent, baseURI) : e.textContent;
  }
  return cssText;
}

function cssFromModuleImports(moduleId) {
  let m = importModule(moduleId);
  return m ? _cssFromModuleImports(m) : '';
}

function _cssFromModuleImports(module) {
  let cssText = '';
  let p$ = module.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
  for (let i=0; i < p$.length; i++) {
    let p = p$[i];
    if (p.import) {
      let importDoc = p.import;
      // NOTE: polyfill affordance.
      // under the HTMLImports polyfill, there will be no 'body',
      // but the import pseudo-doc can be used directly.
      let container = importDoc.body ? importDoc.body : importDoc;
      cssText +=
        Object(__WEBPACK_IMPORTED_MODULE_0__resolve_url_js__["b" /* resolveCss */])(container.textContent,
          importDoc.baseURI);
    }
  }
  return cssText;
}


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DomModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_resolve_url_js__ = __webpack_require__(27);



let modules = {};
let lcModules = {};
function findModule(id) {
  return modules[id] || lcModules[id.toLowerCase()];
}

function styleOutsideTemplateCheck(inst) {
  if (inst.querySelector('style')) {
    console.warn('dom-module %s has style outside template', inst.id);
  }
}

/**
 * The `dom-module` element registers the dom it contains to the name given
 * by the module's id attribute. It provides a unified database of dom
 * accessible via its static `import` API.
 *
 * A key use case of `dom-module` is for providing custom element `<template>`s
 * via HTML imports that are parsed by the native HTML parser, that can be
 * relocated during a bundling pass and still looked up by `id`.
 *
 * Example:
 *
 *     <dom-module id="foo">
 *       <img src="stuff.png">
 *     </dom-module>
 *
 * Then in code in some other location that cannot access the dom-module above
 *
 *     let img = customElements.get('dom-module').import('foo', 'img');
 *
 * @customElement
 * @extends HTMLElement
 * @memberof Polymer
 * @summary Custom element that provides a registry of relocatable DOM content
 *   by `id` that is agnostic to bundling.
 * @unrestricted
 */
class DomModule extends HTMLElement {

  static get observedAttributes() { return ['id']; }

  /**
   * Retrieves the element specified by the css `selector` in the module
   * registered by `id`. For example, this.import('foo', 'img');
   * @param {string} id The id of the dom-module in which to search.
   * @param {string=} selector The css selector by which to find the element.
   * @return {Element} Returns the element which matches `selector` in the
   * module registered at the specified `id`.
   */
  static import(id, selector) {
    if (id) {
      let m = findModule(id);
      if (m && selector) {
        return m.querySelector(selector);
      }
      return m;
    }
    return null;
  }

  attributeChangedCallback(name, old, value) {
    if (old !== value) {
      this.register();
    }
  }

  /**
   * The absolute URL of the original location of this `dom-module`.
   *
   * This value will differ from this element's `ownerDocument` in the
   * following ways:
   * - Takes into account any `assetpath` attribute added during bundling
   *   to indicate the original location relative to the bundled location
   * - Uses the HTMLImports polyfill's `importForElement` API to ensure
   *   the path is relative to the import document's location since
   *   `ownerDocument` is not currently polyfilled
   */
  get assetpath() {
    // Don't override existing assetpath.
    if (!this.__assetpath) {
      // note: assetpath set via an attribute must be relative to this
      // element's location; accomodate polyfilled HTMLImports
      const owner = window.HTMLImports && HTMLImports.importForElement ?
        HTMLImports.importForElement(this) || document : this.ownerDocument;
      const url = Object(__WEBPACK_IMPORTED_MODULE_1__utils_resolve_url_js__["c" /* resolveUrl */])(
        this.getAttribute('assetpath') || '', owner.baseURI);
      this.__assetpath = Object(__WEBPACK_IMPORTED_MODULE_1__utils_resolve_url_js__["a" /* pathFromUrl */])(url);
    }
    return this.__assetpath;
  }

  /**
   * Registers the dom-module at a given id. This method should only be called
   * when a dom-module is imperatively created. For
   * example, `document.createElement('dom-module').register('foo')`.
   * @param {string=} id The id at which to register the dom-module.
   */
  register(id) {
    id = id || this.id;
    if (id) {
      this.id = id;
      // store id separate from lowercased id so that
      // in all cases mixedCase id will stored distinctly
      // and lowercase version is a fallback
      modules[id] = this;
      lcModules[id.toLowerCase()] = this;
      styleOutsideTemplateCheck(this);
    }
  }
}

DomModule.prototype['modules'] = modules;

customElements.define('dom-module', DomModule);




/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webcomponents_shadycss_entrypoints_apply_shim_js__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_element_mixin_js__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_gesture_event_listeners_js__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_mixin_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_import_href_js__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_render_status_js__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_unresolved_js__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_unresolved_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__utils_unresolved_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__polymer_dom_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_gestures_js__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_debounce_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_async_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils_path_js__ = __webpack_require__(28);













let styleInterface = window.ShadyCSS;

const LegacyElementMixin = Object(__WEBPACK_IMPORTED_MODULE_3__utils_mixin_js__["a" /* dedupingMixin */])((base) => {

  /**
   * @constructor
   * @extends {base}
   * @implements {Polymer_ElementMixin}
   * @implements {Polymer_GestureEventListeners}
   */
  const legacyElementBase = Object(__WEBPACK_IMPORTED_MODULE_2__mixins_gesture_event_listeners_js__["a" /* GestureEventListeners */])(Object(__WEBPACK_IMPORTED_MODULE_1__mixins_element_mixin_js__["a" /* ElementMixin */])(base));

  /**
   * Map of simple names to touch action names
   * @dict
   */
  const DIRECTION_MAP = {
    'x': 'pan-x',
    'y': 'pan-y',
    'none': 'none',
    'all': 'auto'
  };

  /**
   * @polymer
   * @mixinClass
   * @extends {legacyElementBase}
   * @implements {Polymer_LegacyElementMixin}
   * @unrestricted
   */
  class LegacyElement extends legacyElementBase {

    constructor() {
      super();
      this.root = this;
      /** @type {boolean} */
      this.isAttached;
      /** @type {WeakMap<!Element, !Object<string, !Function>>} */
      this.__boundListeners;
      /** @type {Object<string, Function>} */
      this._debouncers;
      this.created();
    }

    /**
     * Legacy callback called during the `constructor`, for overriding
     * by the user.
     */
    created() {}

    /**
     * Provides an implementation of `connectedCallback`
     * which adds Polymer legacy API's `attached` method.
     * @override
     */
    connectedCallback() {
      super.connectedCallback();
      this.isAttached = true;
      this.attached();
    }

    /**
     * Legacy callback called during `connectedCallback`, for overriding
     * by the user.
     */
    attached() {}

    /**
     * Provides an implementation of `disconnectedCallback`
     * which adds Polymer legacy API's `detached` method.
     * @override
     */
    disconnectedCallback() {
      super.disconnectedCallback();
      this.isAttached = false;
      this.detached();
    }

    /**
     * Legacy callback called during `disconnectedCallback`, for overriding
     * by the user.
     */
    detached() {}

    /**
     * Provides an override implementation of `attributeChangedCallback`
     * which adds the Polymer legacy API's `attributeChanged` method.
     * @param {string} name Name of attribute.
     * @param {?string} old Old value of attribute.
     * @param {?string} value Current value of attribute.
     * @override
     */
    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        super.attributeChangedCallback(name, old, value);
        this.attributeChanged(name, old, value);
      }
    }

    /**
     * Legacy callback called during `attributeChangedChallback`, for overriding
     * by the user.
     * @param {string} name Name of attribute.
     * @param {?string} old Old value of attribute.
     * @param {?string} value Current value of attribute.
     */
    attributeChanged(name, old, value) {} // eslint-disable-line no-unused-vars

    /**
     * Overrides the default `Polymer.PropertyEffects` implementation to
     * add support for class initialization via the `_registered` callback.
     * This is called only when the first instance of the element is created.
     *
     * @override
     */
    _initializeProperties() {
      let proto = Object.getPrototypeOf(this);
      if (!proto.hasOwnProperty('__hasRegisterFinished')) {
        proto.__hasRegisterFinished = true;
        this._registered();
      }
      super._initializeProperties();
    }

    /**
     * Called automatically when an element is initializing.
     * Users may override this method to perform class registration time
     * work. The implementation should ensure the work is performed
     * only once for the class.
     * @protected
     */
    _registered() {}

    /**
     * Overrides the default `Polymer.PropertyEffects` implementation to
     * add support for installing `hostAttributes` and `listeners`.
     *
     * @override
     */
    ready() {
      this._ensureAttributes();
      this._applyListeners();
      super.ready();
    }

    /**
     * Ensures an element has required attributes. Called when the element
     * is being readied via `ready`. Users should override to set the
     * element's required attributes. The implementation should be sure
     * to check and not override existing attributes added by
     * the user of the element. Typically, setting attributes should be left
     * to the element user and not done here; reasonable exceptions include
     * setting aria roles and focusability.
     * @protected
     */
    _ensureAttributes() {}

    /**
     * Adds element event listeners. Called when the element
     * is being readied via `ready`. Users should override to
     * add any required element event listeners.
     * In performance critical elements, the work done here should be kept
     * to a minimum since it is done before the element is rendered. In
     * these elements, consider adding listeners asychronously so as not to
     * block render.
     * @protected
     */
    _applyListeners() {}

    /**
     * Converts a typed JavaScript value to a string.
     *
     * Note this method is provided as backward-compatible legacy API
     * only.  It is not directly called by any Polymer features. To customize
     * how properties are serialized to attributes for attribute bindings and
     * `reflectToAttribute: true` properties as well as this method, override
     * the `_serializeValue` method provided by `Polymer.PropertyAccessors`.
     *
     * @param {*} value Value to deserialize
     * @return {string | undefined} Serialized value
     */
    serialize(value) {
      return this._serializeValue(value);
    }

    /**
     * Converts a string to a typed JavaScript value.
     *
     * Note this method is provided as backward-compatible legacy API
     * only.  It is not directly called by any Polymer features.  To customize
     * how attributes are deserialized to properties for in
     * `attributeChangedCallback`, override `_deserializeValue` method
     * provided by `Polymer.PropertyAccessors`.
     *
     * @param {string} value String to deserialize
     * @param {*} type Type to deserialize the string to
     * @return {*} Returns the deserialized value in the `type` given.
     */
    deserialize(value, type) {
      return this._deserializeValue(value, type);
    }

    /**
     * Serializes a property to its associated attribute.
     *
     * Note this method is provided as backward-compatible legacy API
     * only.  It is not directly called by any Polymer features.
     *
     * @param {string} property Property name to reflect.
     * @param {string=} attribute Attribute name to reflect.
     * @param {*=} value Property value to refect.
     */
    reflectPropertyToAttribute(property, attribute, value) {
      this._propertyToAttribute(property, attribute, value);
    }

    /**
     * Sets a typed value to an HTML attribute on a node.
     *
     * Note this method is provided as backward-compatible legacy API
     * only.  It is not directly called by any Polymer features.
     *
     * @param {*} value Value to serialize.
     * @param {string} attribute Attribute name to serialize to.
     * @param {Element} node Element to set attribute to.
     */
    serializeValueToAttribute(value, attribute, node) {
      this._valueToNodeAttribute(/** @type {Element} */ (node || this), value, attribute);
    }

    /**
     * Copies own properties (including accessor descriptors) from a source
     * object to a target object.
     *
     * @param {Object} prototype Target object to copy properties to.
     * @param {Object} api Source object to copy properties from.
     * @return {Object} prototype object that was passed as first argument.
     */
    extend(prototype, api) {
      if (!(prototype && api)) {
        return prototype || api;
      }
      let n$ = Object.getOwnPropertyNames(api);
      for (let i=0, n; (i<n$.length) && (n=n$[i]); i++) {
        let pd = Object.getOwnPropertyDescriptor(api, n);
        if (pd) {
          Object.defineProperty(prototype, n, pd);
        }
      }
      return prototype;
    }

    /**
     * Copies props from a source object to a target object.
     *
     * Note, this method uses a simple `for...in` strategy for enumerating
     * properties.  To ensure only `ownProperties` are copied from source
     * to target and that accessor implementations are copied, use `extend`.
     *
     * @param {Object} target Target object to copy properties to.
     * @param {Object} source Source object to copy properties from.
     * @return {Object} Target object that was passed as first argument.
     */
    mixin(target, source) {
      for (let i in source) {
        target[i] = source[i];
      }
      return target;
    }

    /**
     * Sets the prototype of an object.
     *
     * Note this method is provided as backward-compatible legacy API
     * only.  It is not directly called by any Polymer features.
     * @param {Object} object The object on which to set the prototype.
     * @param {Object} prototype The prototype that will be set on the given
     * `object`.
     * @return {Object} Returns the given `object` with its prototype set
     * to the given `prototype` object.
     */
    chainObject(object, prototype) {
      if (object && prototype && object !== prototype) {
        object.__proto__ = prototype;
      }
      return object;
    }

    /* **** Begin Template **** */

    /**
     * Calls `importNode` on the `content` of the `template` specified and
     * returns a document fragment containing the imported content.
     *
     * @param {HTMLTemplateElement} template HTML template element to instance.
     * @return {DocumentFragment} Document fragment containing the imported
     *   template content.
    */
    instanceTemplate(template) {
      let content = this.constructor._contentForTemplate(template);
      let dom = /** @type {DocumentFragment} */
        (document.importNode(content, true));
      return dom;
    }

    /* **** Begin Events **** */



    /**
     * Dispatches a custom event with an optional detail value.
     *
     * @param {string} type Name of event type.
     * @param {*=} detail Detail value containing event-specific
     *   payload.
     * @param {{ bubbles: (boolean|undefined), cancelable: (boolean|undefined), composed: (boolean|undefined) }=}
     *  options Object specifying options.  These may include:
     *  `bubbles` (boolean, defaults to `true`),
     *  `cancelable` (boolean, defaults to false), and
     *  `node` on which to fire the event (HTMLElement, defaults to `this`).
     * @return {Event} The new event that was fired.
     */
    fire(type, detail, options) {
      options = options || {};
      detail = (detail === null || detail === undefined) ? {} : detail;
      let event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true: options.composed
      });
      event.detail = detail;
      let node = options.node || this;
      node.dispatchEvent(event);
      return event;
    }

    /**
     * Convenience method to add an event listener on a given element,
     * late bound to a named method on this element.
     *
     * @param {Element} node Element to add event listener to.
     * @param {string} eventName Name of event to listen for.
     * @param {string} methodName Name of handler method on `this` to call.
     */
    listen(node, eventName, methodName) {
      node = /** @type {!Element} */ (node || this);
      let hbl = this.__boundListeners ||
        (this.__boundListeners = new WeakMap());
      let bl = hbl.get(node);
      if (!bl) {
        bl = {};
        hbl.set(node, bl);
      }
      let key = eventName + methodName;
      if (!bl[key]) {
        bl[key] = this._addMethodEventListenerToNode(
          node, eventName, methodName, this);
      }
    }

    /**
     * Convenience method to remove an event listener from a given element,
     * late bound to a named method on this element.
     *
     * @param {Element} node Element to remove event listener from.
     * @param {string} eventName Name of event to stop listening to.
     * @param {string} methodName Name of handler method on `this` to not call
     anymore.
     */
    unlisten(node, eventName, methodName) {
      node = /** @type {!Element} */ (node || this);
      let bl = this.__boundListeners && this.__boundListeners.get(node);
      let key = eventName + methodName;
      let handler = bl && bl[key];
      if (handler) {
        this._removeEventListenerFromNode(node, eventName, handler);
        bl[key] = null;
      }
    }

    /**
     * Override scrolling behavior to all direction, one direction, or none.
     *
     * Valid scroll directions:
     *   - 'all': scroll in any direction
     *   - 'x': scroll only in the 'x' direction
     *   - 'y': scroll only in the 'y' direction
     *   - 'none': disable scrolling for this node
     *
     * @param {string=} direction Direction to allow scrolling
     * Defaults to `all`.
     * @param {Element=} node Element to apply scroll direction setting.
     * Defaults to `this`.
     */
    setScrollDirection(direction, node) {
      Object(__WEBPACK_IMPORTED_MODULE_8__utils_gestures_js__["setTouchAction"])( (node || this), DIRECTION_MAP[direction] || 'auto');
    }
    /* **** End Events **** */

    /**
     * Convenience method to run `querySelector` on this local DOM scope.
     *
     * This function calls `Polymer.dom(this.root).querySelector(slctr)`.
     *
     * @param {string} slctr Selector to run on this local DOM scope
     * @return {Element} Element found by the selector, or null if not found.
     */
    $$(slctr) {
      return this.root.querySelector(slctr);
    }

    /**
     * Return the element whose local dom within which this element
     * is contained. This is a shorthand for
     * `this.getRootNode().host`.
     * @this {Element}
     */
    get domHost() {
      let root = this.getRootNode();
      return (root instanceof DocumentFragment) ? /** @type {ShadowRoot} */ (root).host : root;
    }

    /**
     * Force this element to distribute its children to its local dom.
     * This should not be necessary as of Polymer 2.0.2 and is provided only
     * for backwards compatibility.
     */
    distributeContent() {
      if (window.ShadyDOM && this.shadowRoot) {
        ShadyDOM.flush();
      }
    }

    /**
     * Returns a list of nodes that are the effective childNodes. The effective
     * childNodes list is the same as the element's childNodes except that
     * any `<content>` elements are replaced with the list of nodes distributed
     * to the `<content>`, the result of its `getDistributedNodes` method.
     * @this {Element}
     * @return {Array<Node>} List of effctive child nodes.
     */
    getEffectiveChildNodes() {
      return (
        /** @type {Polymer.DomApi} */ (Object(__WEBPACK_IMPORTED_MODULE_7__polymer_dom_js__["a" /* dom */])(this)).getEffectiveChildNodes()
      );
    }

    /**
     * Returns a list of nodes distributed within this element that match
     * `selector`. These can be dom children or elements distributed to
     * children that are insertion points.
     * @param {string} selector Selector to run.
     * @this {Element}
     * @return {Array<Node>} List of distributed elements that match selector.
     */
    queryDistributedElements(selector) {
      return (
        /** @type {Polymer.DomApi} */ (Object(__WEBPACK_IMPORTED_MODULE_7__polymer_dom_js__["a" /* dom */])(this)).queryDistributedElements(selector)
      );
    }

    /**
     * Returns a list of elements that are the effective children. The effective
     * children list is the same as the element's children except that
     * any `<content>` elements are replaced with the list of elements
     * distributed to the `<content>`.
     *
     * @return {Array<Node>} List of effctive children.
     */
    getEffectiveChildren() {
      let list = this.getEffectiveChildNodes();
      return list.filter(function(/** @type {Node} */ n) {
        return (n.nodeType === Node.ELEMENT_NODE);
      });
    }

    /**
     * Returns a string of text content that is the concatenation of the
     * text content's of the element's effective childNodes (the elements
     * returned by <a href="#getEffectiveChildNodes>getEffectiveChildNodes</a>.
     *
     * @return {string} List of effctive children.
     */
    getEffectiveTextContent() {
      let cn = this.getEffectiveChildNodes();
      let tc = [];
      for (let i=0, c; (c = cn[i]); i++) {
        if (c.nodeType !== Node.COMMENT_NODE) {
          tc.push(c.textContent);
        }
      }
      return tc.join('');
    }

    /**
     * Returns the first effective childNode within this element that
     * match `selector`. These can be dom child nodes or elements distributed
     * to children that are insertion points.
     * @param {string} selector Selector to run.
     * @return {Object<Node>} First effective child node that matches selector.
     */
    queryEffectiveChildren(selector) {
      let e$ = this.queryDistributedElements(selector);
      return e$ && e$[0];
    }

    /**
     * Returns a list of effective childNodes within this element that
     * match `selector`. These can be dom child nodes or elements distributed
     * to children that are insertion points.
     * @param {string} selector Selector to run.
     * @return {Array<Node>} List of effective child nodes that match selector.
     */
    queryAllEffectiveChildren(selector) {
      return this.queryDistributedElements(selector);
    }

    /**
     * Returns a list of nodes distributed to this element's `<slot>`.
     *
     * If this element contains more than one `<slot>` in its local DOM,
     * an optional selector may be passed to choose the desired content.
     *
     * @param {string=} slctr CSS selector to choose the desired
     *   `<slot>`.  Defaults to `content`.
     * @return {Array<Node>} List of distributed nodes for the `<slot>`.
     */
    getContentChildNodes(slctr) {
      let content = this.root.querySelector(slctr || 'slot');
      return content ? /** @type {Polymer.DomApi} */(Object(__WEBPACK_IMPORTED_MODULE_7__polymer_dom_js__["a" /* dom */])(content)).getDistributedNodes() : [];
    }

    /**
     * Returns a list of element children distributed to this element's
     * `<slot>`.
     *
     * If this element contains more than one `<slot>` in its
     * local DOM, an optional selector may be passed to choose the desired
     * content.  This method differs from `getContentChildNodes` in that only
     * elements are returned.
     *
     * @param {string=} slctr CSS selector to choose the desired
     *   `<content>`.  Defaults to `content`.
     * @return {Array<HTMLElement>} List of distributed nodes for the
     *   `<slot>`.
     * @suppress {invalidCasts}
     */
    getContentChildren(slctr) {
      return /** @type {Array<HTMLElement>} */(this.getContentChildNodes(slctr).filter(function(n) {
        return (n.nodeType === Node.ELEMENT_NODE);
      }));
    }

    /**
     * Checks whether an element is in this element's light DOM tree.
     *
     * @param {?Node} node The element to be checked.
     * @this {Element}
     * @return {boolean} true if node is in this element's light DOM tree.
     */
    isLightDescendant(node) {
      return this !== node && this.contains(node) &&
          this.getRootNode() === node.getRootNode();
    }

    /**
     * Checks whether an element is in this element's local DOM tree.
     *
     * @param {Element=} node The element to be checked.
     * @return {boolean} true if node is in this element's local DOM tree.
     */
    isLocalDescendant(node) {
      return this.root === node.getRootNode();
    }

    // NOTE: should now be handled by ShadyCss library.
    scopeSubtree(container, shouldObserve) { // eslint-disable-line no-unused-vars
    }

    /**
     * Returns the computed style value for the given property.
     * @param {string} property The css property name.
     * @return {string} Returns the computed css property value for the given
     * `property`.
     */
    getComputedStyleValue(property) {
      return styleInterface.getComputedStyleValue(this, property);
    }

    // debounce

    /**
     * Call `debounce` to collapse multiple requests for a named task into
     * one invocation which is made after the wait time has elapsed with
     * no new request.  If no wait time is given, the callback will be called
     * at microtask timing (guaranteed before paint).
     *
     *     debouncedClickAction(e) {
     *       // will not call `processClick` more than once per 100ms
     *       this.debounce('click', function() {
     *        this.processClick();
     *       } 100);
     *     }
     *
     * @param {string} jobName String to indentify the debounce job.
     * @param {function()} callback Function that is called (with `this`
     *   context) when the wait time elapses.
     * @param {number} wait Optional wait time in milliseconds (ms) after the
     *   last signal that must elapse before invoking `callback`
     * @return {Object} Returns a debouncer object on which exists the
     * following methods: `isActive()` returns true if the debouncer is
     * active; `cancel()` cancels the debouncer if it is active;
     * `flush()` immediately invokes the debounced callback if the debouncer
     * is active.
     */
    debounce(jobName, callback, wait) {
      this._debouncers = this._debouncers || {};
      return this._debouncers[jobName] = __WEBPACK_IMPORTED_MODULE_9__utils_debounce_js__["a" /* Debouncer */].debounce(
            this._debouncers[jobName]
          , wait > 0 ? __WEBPACK_IMPORTED_MODULE_10__utils_async_js__["b" /* timeOut */].after(wait) : __WEBPACK_IMPORTED_MODULE_10__utils_async_js__["a" /* microTask */]
          , callback.bind(this));
    }

    /**
     * Returns whether a named debouncer is active.
     *
     * @param {string} jobName The name of the debouncer started with `debounce`
     * @return {boolean} Whether the debouncer is active (has not yet fired).
     */
    isDebouncerActive(jobName) {
      this._debouncers = this._debouncers || {};
      let debouncer = this._debouncers[jobName];
      return !!(debouncer && debouncer.isActive());
    }

    /**
     * Immediately calls the debouncer `callback` and inactivates it.
     *
     * @param {string} jobName The name of the debouncer started with `debounce`
     */
    flushDebouncer(jobName) {
      this._debouncers = this._debouncers || {};
      let debouncer = this._debouncers[jobName];
      if (debouncer) {
        debouncer.flush();
      }
    }

    /**
     * Cancels an active debouncer.  The `callback` will not be called.
     *
     * @param {string} jobName The name of the debouncer started with `debounce`
     */
    cancelDebouncer(jobName) {
      this._debouncers = this._debouncers || {};
      let debouncer = this._debouncers[jobName];
      if (debouncer) {
        debouncer.cancel();
      }
    }

    /**
     * Runs a callback function asyncronously.
     *
     * By default (if no waitTime is specified), async callbacks are run at
     * microtask timing, which will occur before paint.
     *
     * @param {Function} callback The callback function to run, bound to `this`.
     * @param {number=} waitTime Time to wait before calling the
     *   `callback`.  If unspecified or 0, the callback will be run at microtask
     *   timing (before paint).
     * @return {number} Handle that may be used to cancel the async job.
     */
    async(callback, waitTime) {
      return waitTime > 0 ? __WEBPACK_IMPORTED_MODULE_10__utils_async_js__["b" /* timeOut */].run(callback.bind(this), waitTime) :
          ~__WEBPACK_IMPORTED_MODULE_10__utils_async_js__["a" /* microTask */].run(callback.bind(this));
    }

    /**
     * Cancels an async operation started with `async`.
     *
     * @param {number} handle Handle returned from original `async` call to
     *   cancel.
     */
    cancelAsync(handle) {
      handle < 0 ? __WEBPACK_IMPORTED_MODULE_10__utils_async_js__["a" /* microTask */].cancel(~handle) :
          __WEBPACK_IMPORTED_MODULE_10__utils_async_js__["b" /* timeOut */].cancel(handle);
    }

    // other

    /**
     * Convenience method for creating an element and configuring it.
     *
     * @param {string} tag HTML element tag to create.
     * @param {Object} props Object of properties to configure on the
     *    instance.
     * @return {Element} Newly created and configured element.
     */
    create(tag, props) {
      let elt = document.createElement(tag);
      if (props) {
        if (elt.setProperties) {
          elt.setProperties(props);
        } else {
          for (let n in props) {
            elt[n] = props[n];
          }
        }
      }
      return elt;
    }

    /**
     * Convenience method for importing an HTML document imperatively.
     *
     * This method creates a new `<link rel="import">` element with
     * the provided URL and appends it to the document to start loading.
     * In the `onload` callback, the `import` property of the `link`
     * element will contain the imported document contents.
     *
     * @param {string} href URL to document to load.
     * @param {Function} onload Callback to notify when an import successfully
     *   loaded.
     * @param {Function} onerror Callback to notify when an import
     *   unsuccessfully loaded.
     * @param {boolean} optAsync True if the import should be loaded `async`.
     *   Defaults to `false`.
     * @return {HTMLLinkElement} The link element for the URL to be loaded.
     */
    importHref(href, onload, onerror, optAsync) { // eslint-disable-line no-unused-vars
      let loadFn = onload ? onload.bind(this) : null;
      let errorFn = onerror ? onerror.bind(this) : null;
      return Object(__WEBPACK_IMPORTED_MODULE_4__utils_import_href_js__["a" /* importHref */])(href, loadFn, errorFn, optAsync);
    }

    /**
     * Polyfill for Element.prototype.matches, which is sometimes still
     * prefixed.
     *
     * @param {string} selector Selector to test.
     * @param {Element=} node Element to test the selector against.
     * @return {boolean} Whether the element matches the selector.
     */
    elementMatches(selector, node) {
      return Object(__WEBPACK_IMPORTED_MODULE_7__polymer_dom_js__["b" /* matchesSelector */])( (node || this), selector);
    }

    /**
     * Toggles an HTML attribute on or off.
     *
     * @param {string} name HTML attribute name
     * @param {boolean=} bool Boolean to force the attribute on or off.
     *    When unspecified, the state of the attribute will be reversed.
     * @param {Element=} node Node to target.  Defaults to `this`.
     */
    toggleAttribute(name, bool, node) {
      node = /** @type {Element} */ (node || this);
      if (arguments.length == 1) {
        bool = !node.hasAttribute(name);
      }
      if (bool) {
        node.setAttribute(name, '');
      } else {
        node.removeAttribute(name);
      }
    }


    /**
     * Toggles a CSS class on or off.
     *
     * @param {string} name CSS class name
     * @param {boolean=} bool Boolean to force the class on or off.
     *    When unspecified, the state of the class will be reversed.
     * @param {Element=} node Node to target.  Defaults to `this`.
     */
    toggleClass(name, bool, node) {
      node = /** @type {Element} */ (node || this);
      if (arguments.length == 1) {
        bool = !node.classList.contains(name);
      }
      if (bool) {
        node.classList.add(name);
      } else {
        node.classList.remove(name);
      }
    }

    /**
     * Cross-platform helper for setting an element's CSS `transform` property.
     *
     * @param {string} transformText Transform setting.
     * @param {Element=} node Element to apply the transform to.
     * Defaults to `this`
     */
    transform(transformText, node) {
      node = /** @type {Element} */ (node || this);
      node.style.webkitTransform = transformText;
      node.style.transform = transformText;
    }

    /**
     * Cross-platform helper for setting an element's CSS `translate3d`
     * property.
     *
     * @param {number} x X offset.
     * @param {number} y Y offset.
     * @param {number} z Z offset.
     * @param {Element=} node Element to apply the transform to.
     * Defaults to `this`.
     */
    translate3d(x, y, z, node) {
      node = /** @type {Element} */ (node || this);
      this.transform('translate3d(' + x + ',' + y + ',' + z + ')', node);
    }

    /**
     * Removes an item from an array, if it exists.
     *
     * If the array is specified by path, a change notification is
     * generated, so that observers, data bindings and computed
     * properties watching that path can update.
     *
     * If the array is passed directly, **no change
     * notification is generated**.
     *
     * @param {string | !Array<number|string>} arrayOrPath Path to array from which to remove the item
     *   (or the array itself).
     * @param {*} item Item to remove.
     * @return {Array} Array containing item removed.
     */
    arrayDelete(arrayOrPath, item) {
      let index;
      if (Array.isArray(arrayOrPath)) {
        index = arrayOrPath.indexOf(item);
        if (index >= 0) {
          return arrayOrPath.splice(index, 1);
        }
      } else {
        let arr = Object(__WEBPACK_IMPORTED_MODULE_11__utils_path_js__["a" /* get */])(this, arrayOrPath);
        index = arr.indexOf(item);
        if (index >= 0) {
          return this.splice(arrayOrPath, index, 1);
        }
      }
      return null;
    }

    // logging

    /**
     * Facades `console.log`/`warn`/`error` as override point.
     *
     * @param {string} level One of 'log', 'warn', 'error'
     * @param {Array} args Array of strings or objects to log
     */
    _logger(level, args) {
      // accept ['foo', 'bar'] and [['foo', 'bar']]
      if (Array.isArray(args) && args.length === 1) {
        args = args[0];
      }
      switch(level) {
        case 'log':
        case 'warn':
        case 'error':
          console[level](...args);
      }
    }

    /**
     * Facades `console.log` as an override point.
     *
     * @param {...*} args Array of strings or objects to log
     */
    _log(...args) {
      this._logger('log', args);
    }

    /**
     * Facades `console.warn` as an override point.
     *
     * @param {...*} args Array of strings or objects to log
     */
    _warn(...args) {
      this._logger('warn', args);
    }

    /**
     * Facades `console.error` as an override point.
     *
     * @param {...*} args Array of strings or objects to log
     */
    _error(...args) {
      this._logger('error', args);
    }

    /**
     * Formats a message using the element type an a method name.
     *
     * @param {string} methodName Method name to associate with message
     * @param {...*} args Array of strings or objects to log
     * @return {Array} Array with formatting information for `console`
     *   logging.
     */
    _logf(methodName, ...args) {
      return ['[%s::%s]', this.is, methodName, ...args];
    }

  }

  LegacyElement.prototype.is = '';

  return LegacyElement;

});
/* harmony export (immutable) */ __webpack_exports__["a"] = LegacyElementMixin;



/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = toCssText;
/* harmony export (immutable) */ __webpack_exports__["d"] = rulesForStyle;
/* unused harmony export isKeyframesSelector */
/* harmony export (immutable) */ __webpack_exports__["a"] = forEachRule;
/* unused harmony export applyCss */
/* unused harmony export createScopeStyle */
/* unused harmony export applyStylePlaceHolder */
/* unused harmony export applyStyle */
/* unused harmony export isTargetedBuild */
/* unused harmony export getCssBuildType */
/* harmony export (immutable) */ __webpack_exports__["c"] = processVariableAndFallback;
/* unused harmony export setElementClassRaw */
/* harmony export (immutable) */ __webpack_exports__["b"] = getIsExtends;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_settings_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_parse_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_regex_js__ = __webpack_require__(58);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/




 // eslint-disable-line no-unused-vars


/**
 * @param {string|StyleNode} rules
 * @param {function(StyleNode)=} callback
 * @return {string}
 */
function toCssText (rules, callback) {
  if (!rules) {
    return '';
  }
  if (typeof rules === 'string') {
    rules = Object(__WEBPACK_IMPORTED_MODULE_1__css_parse_js__["a" /* parse */])(rules);
  }
  if (callback) {
    forEachRule(rules, callback);
  }
  return Object(__WEBPACK_IMPORTED_MODULE_1__css_parse_js__["b" /* stringify */])(rules, __WEBPACK_IMPORTED_MODULE_0__style_settings_js__["a" /* nativeCssVariables */]);
}

/**
 * @param {HTMLStyleElement} style
 * @return {StyleNode}
 */
function rulesForStyle(style) {
  if (!style['__cssRules'] && style.textContent) {
    style['__cssRules'] = Object(__WEBPACK_IMPORTED_MODULE_1__css_parse_js__["a" /* parse */])(style.textContent);
  }
  return style['__cssRules'] || null;
}

// Tests if a rule is a keyframes selector, which looks almost exactly
// like a normal selector but is not (it has nothing to do with scoping
// for example).
/**
 * @param {StyleNode} rule
 * @return {boolean}
 */
function isKeyframesSelector(rule) {
  return Boolean(rule['parent']) &&
  rule['parent']['type'] === __WEBPACK_IMPORTED_MODULE_1__css_parse_js__["c" /* types */].KEYFRAMES_RULE;
}

/**
 * @param {StyleNode} node
 * @param {Function=} styleRuleCallback
 * @param {Function=} keyframesRuleCallback
 * @param {boolean=} onlyActiveRules
 */
function forEachRule(node, styleRuleCallback, keyframesRuleCallback, onlyActiveRules) {
  if (!node) {
    return;
  }
  let skipRules = false;
  let type = node['type'];
  if (onlyActiveRules) {
    if (type === __WEBPACK_IMPORTED_MODULE_1__css_parse_js__["c" /* types */].MEDIA_RULE) {
      let matchMedia = node['selector'].match(__WEBPACK_IMPORTED_MODULE_2__common_regex_js__["a" /* MEDIA_MATCH */]);
      if (matchMedia) {
        // if rule is a non matching @media rule, skip subrules
        if (!window.matchMedia(matchMedia[1]).matches) {
          skipRules = true;
        }
      }
    }
  }
  if (type === __WEBPACK_IMPORTED_MODULE_1__css_parse_js__["c" /* types */].STYLE_RULE) {
    styleRuleCallback(node);
  } else if (keyframesRuleCallback &&
    type === __WEBPACK_IMPORTED_MODULE_1__css_parse_js__["c" /* types */].KEYFRAMES_RULE) {
    keyframesRuleCallback(node);
  } else if (type === __WEBPACK_IMPORTED_MODULE_1__css_parse_js__["c" /* types */].MIXIN_RULE) {
    skipRules = true;
  }
  let r$ = node['rules'];
  if (r$ && !skipRules) {
    for (let i=0, l=r$.length, r; (i<l) && (r=r$[i]); i++) {
      forEachRule(r, styleRuleCallback, keyframesRuleCallback, onlyActiveRules);
    }
  }
}

// add a string of cssText to the document.
/**
 * @param {string} cssText
 * @param {string} moniker
 * @param {Node} target
 * @param {Node} contextNode
 * @return {HTMLStyleElement}
 */
function applyCss(cssText, moniker, target, contextNode) {
  let style = createScopeStyle(cssText, moniker);
  applyStyle(style, target, contextNode);
  return style;
}

/**
 * @param {string} cssText
 * @param {string} moniker
 * @return {HTMLStyleElement}
 */
function createScopeStyle(cssText, moniker) {
  let style = /** @type {HTMLStyleElement} */(document.createElement('style'));
  if (moniker) {
    style.setAttribute('scope', moniker);
  }
  style.textContent = cssText;
  return style;
}

/**
 * Track the position of the last added style for placing placeholders
 * @type {Node}
 */
let lastHeadApplyNode = null;

// insert a comment node as a styling position placeholder.
/**
 * @param {string} moniker
 * @return {!Comment}
 */
function applyStylePlaceHolder(moniker) {
  let placeHolder = document.createComment(' Shady DOM styles for ' +
    moniker + ' ');
  let after = lastHeadApplyNode ?
    lastHeadApplyNode['nextSibling'] : null;
  let scope = document.head;
  scope.insertBefore(placeHolder, after || scope.firstChild);
  lastHeadApplyNode = placeHolder;
  return placeHolder;
}

/**
 * @param {HTMLStyleElement} style
 * @param {?Node} target
 * @param {?Node} contextNode
 */
function applyStyle(style, target, contextNode) {
  target = target || document.head;
  let after = (contextNode && contextNode.nextSibling) ||
    target.firstChild;
  target.insertBefore(style, after);
  if (!lastHeadApplyNode) {
    lastHeadApplyNode = style;
  } else {
    // only update lastHeadApplyNode if the new style is inserted after the old lastHeadApplyNode
    let position = style.compareDocumentPosition(lastHeadApplyNode);
    if (position === Node.DOCUMENT_POSITION_PRECEDING) {
      lastHeadApplyNode = style;
    }
  }
}

/**
 * @param {string} buildType
 * @return {boolean}
 */
function isTargetedBuild(buildType) {
  return __WEBPACK_IMPORTED_MODULE_0__style_settings_js__["b" /* nativeShadow */] ? buildType === 'shadow' : buildType === 'shady';
}

/**
 * @param {Element} element
 * @return {?string}
 */
function getCssBuildType(element) {
  return element.getAttribute('css-build');
}

/**
 * Walk from text[start] matching parens and
 * returns position of the outer end paren
 * @param {string} text
 * @param {number} start
 * @return {number}
 */
function findMatchingParen(text, start) {
  let level = 0;
  for (let i=start, l=text.length; i < l; i++) {
    if (text[i] === '(') {
      level++;
    } else if (text[i] === ')') {
      if (--level === 0) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * @param {string} str
 * @param {function(string, string, string, string)} callback
 */
function processVariableAndFallback(str, callback) {
  // find 'var('
  let start = str.indexOf('var(');
  if (start === -1) {
    // no var?, everything is prefix
    return callback(str, '', '', '');
  }
  //${prefix}var(${inner})${suffix}
  let end = findMatchingParen(str, start + 3);
  let inner = str.substring(start + 4, end);
  let prefix = str.substring(0, start);
  // suffix may have other variables
  let suffix = processVariableAndFallback(str.substring(end + 1), callback);
  let comma = inner.indexOf(',');
  // value and fallback args should be trimmed to match in property lookup
  if (comma === -1) {
    // variable, no fallback
    return callback(prefix, inner.trim(), '', suffix);
  }
  // var(${value},${fallback})
  let value = inner.substring(0, comma).trim();
  let fallback = inner.substring(comma + 1).trim();
  return callback(prefix, value, fallback, suffix);
}

/**
 * @param {Element} element
 * @param {string} value
 */
function setElementClassRaw(element, value) {
  // use native setAttribute provided by ShadyDOM when setAttribute is patched
  if (__WEBPACK_IMPORTED_MODULE_0__style_settings_js__["b" /* nativeShadow */]) {
    element.setAttribute('class', value);
  } else {
    window['ShadyDOM']['nativeMethods']['setAttribute'].call(element, 'class', value);
  }
}

/**
 * @param {Element | {is: string, extends: string}} element
 * @return {{is: string, typeExtension: string}}
 */
function getIsExtends(element) {
  let localName = element['localName'];
  let is = '', typeExtension = '';
  /*
  NOTE: technically, this can be wrong for certain svg elements
  with `-` in the name like `<font-face>`
  */
  if (localName) {
    if (localName.indexOf('-') > -1) {
      is = localName;
    } else {
      typeExtension = localName;
      is = (element.getAttribute && element.getAttribute('is')) || '';
    }
  } else {
    is = /** @type {?} */(element).is;
    typeExtension = /** @type {?} */(element).extends;
  }
  return {is, typeExtension};
}


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/**
 * @const {!Object<string, !HTMLTemplateElement>}
 */
const templateMap = {};
/* harmony default export */ __webpack_exports__["a"] = (templateMap);


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = documentWait;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



/** @type {Promise<void>} */
let readyPromise = null;

/** @type {?function(?function())} */
let whenReady = window['HTMLImports'] && window['HTMLImports']['whenReady'] || null;

/** @type {function()} */
let resolveFn;

/**
 * @param {?function()} callback
 */
function documentWait(callback) {
  requestAnimationFrame(function() {
    if (whenReady) {
      whenReady(callback)
    } else {
      if (!readyPromise) {
        readyPromise = new Promise((resolve) => {resolveFn = resolve});
        if (document.readyState === 'complete') {
          resolveFn();
        } else {
          document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete') {
              resolveFn();
            }
          });
        }
      }
      readyPromise.then(function(){ callback && callback(); });
    }
  });
}


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CustomStyleProvider */
/* unused harmony export CustomStyleInterfaceInterface */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__document_wait_js__ = __webpack_require__(115);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/





/**
 * @typedef {HTMLStyleElement | {getStyle: function():HTMLStyleElement}}
 */
let CustomStyleProvider;

const SEEN_MARKER = '__seenByShadyCSS';
const CACHED_STYLE = '__shadyCSSCachedStyle';

/** @type {?function(!HTMLStyleElement)} */
let transformFn = null;

/** @type {?function()} */
let validateFn = null;

/**
This interface is provided to add document-level <style> elements to ShadyCSS for processing.
These styles must be processed by ShadyCSS to simulate ShadowRoot upper-bound encapsulation from outside styles
In addition, these styles may also need to be processed for @apply rules and CSS Custom Properties

To add document-level styles to ShadyCSS, one can call `ShadyCSS.addDocumentStyle(styleElement)` or `ShadyCSS.addDocumentStyle({getStyle: () => styleElement})`

In addition, if the process used to discover document-level styles can be synchronously flushed, one should set `ShadyCSS.documentStyleFlush`.
This function will be called when calculating styles.

An example usage of the document-level styling api can be found in `examples/document-style-lib.js`

@unrestricted
*/
class CustomStyleInterface {
  constructor() {
    /** @type {!Array<!CustomStyleProvider>} */
    this['customStyles'] = [];
    this['enqueued'] = false;
  }
  /**
   * Queue a validation for new custom styles to batch style recalculations
   */
  enqueueDocumentValidation() {
    if (this['enqueued'] || !validateFn) {
      return;
    }
    this['enqueued'] = true;
    Object(__WEBPACK_IMPORTED_MODULE_0__document_wait_js__["a" /* default */])(validateFn);
  }
  /**
   * @param {!HTMLStyleElement} style
   */
  addCustomStyle(style) {
    if (!style[SEEN_MARKER]) {
      style[SEEN_MARKER] = true;
      this['customStyles'].push(style);
      this.enqueueDocumentValidation();
    }
  }
  /**
   * @param {!CustomStyleProvider} customStyle
   * @return {HTMLStyleElement}
   */
  getStyleForCustomStyle(customStyle) {
    if (customStyle[CACHED_STYLE]) {
      return customStyle[CACHED_STYLE];
    }
    let style;
    if (customStyle['getStyle']) {
      style = customStyle['getStyle']();
    } else {
      style = customStyle;
    }
    return style;
  }
  /**
   * @return {!Array<!CustomStyleProvider>}
   */
  processStyles() {
    const cs = this['customStyles'];
    for (let i = 0; i < cs.length; i++) {
      const customStyle = cs[i];
      if (customStyle[CACHED_STYLE]) {
        continue;
      }
      const style = this.getStyleForCustomStyle(customStyle);
      if (style) {
        // HTMLImports polyfill may have cloned the style into the main document,
        // which is referenced with __appliedElement.
        const styleToTransform = /** @type {!HTMLStyleElement} */(style['__appliedElement'] || style);
        if (transformFn) {
          transformFn(styleToTransform);
        }
        customStyle[CACHED_STYLE] = styleToTransform;
      }
    }
    return cs;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CustomStyleInterface;


CustomStyleInterface.prototype['addCustomStyle'] = CustomStyleInterface.prototype.addCustomStyle;
CustomStyleInterface.prototype['getStyleForCustomStyle'] = CustomStyleInterface.prototype.getStyleForCustomStyle;
CustomStyleInterface.prototype['processStyles'] = CustomStyleInterface.prototype.processStyles;

Object.defineProperties(CustomStyleInterface.prototype, {
  'transformCallback': {
    /** @return {?function(!HTMLStyleElement)} */
    get() {
      return transformFn;
    },
    /** @param {?function(!HTMLStyleElement)} fn */
    set(fn) {
      transformFn = fn;
    }
  },
  'validateCallback': {
    /** @return {?function()} */
    get() {
      return validateFn;
    },
    /**
     * @param {?function()} fn
     * @this {CustomStyleInterface}
     */
    set(fn) {
      let needsEnqueue = false;
      if (!validateFn) {
        needsEnqueue = true;
      }
      validateFn = fn;
      if (needsEnqueue) {
        this.enqueueDocumentValidation();
      }
    },
  }
})

/** @typedef {{
 * customStyles: !Array<!CustomStyleProvider>,
 * addCustomStyle: function(!CustomStyleProvider),
 * getStyleForCustomStyle: function(!CustomStyleProvider): HTMLStyleElement,
 * findStyles: function(),
 * transformCallback: ?function(!HTMLStyleElement),
 * validateCallback: ?function()
 * }}
 */
let CustomStyleInterfaceInterface;


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_gestures_js__ = __webpack_require__(118);




/**
 * @const {Polymer.Gestures}
 */
const gestures = __WEBPACK_IMPORTED_MODULE_2__utils_gestures_js__;

const GestureEventListeners = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_GestureEventListeners}
   */
  class GestureEventListeners extends superClass {

    _addEventListenerToNode(node, eventName, handler) {
      if (!gestures.addListener(node, eventName, handler)) {
        super._addEventListenerToNode(node, eventName, handler);
      }
    }

    _removeEventListenerFromNode(node, eventName, handler) {
      if (!gestures.removeListener(node, eventName, handler)) {
        super._removeEventListenerFromNode(node, eventName, handler);
      }
    }

  }

  return GestureEventListeners;

});
/* harmony export (immutable) */ __webpack_exports__["a"] = GestureEventListeners;



/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["deepTargetFind"] = deepTargetFind;
/* harmony export (immutable) */ __webpack_exports__["_findOriginalTarget"] = _findOriginalTarget;
/* harmony export (immutable) */ __webpack_exports__["_handleNative"] = _handleNative;
/* harmony export (immutable) */ __webpack_exports__["_handleTouchAction"] = _handleTouchAction;
/* harmony export (immutable) */ __webpack_exports__["addListener"] = addListener;
/* harmony export (immutable) */ __webpack_exports__["removeListener"] = removeListener;
/* harmony export (immutable) */ __webpack_exports__["_add"] = _add;
/* harmony export (immutable) */ __webpack_exports__["_remove"] = _remove;
/* harmony export (immutable) */ __webpack_exports__["register"] = register;
/* harmony export (immutable) */ __webpack_exports__["_findRecognizerByEvent"] = _findRecognizerByEvent;
/* harmony export (immutable) */ __webpack_exports__["setTouchAction"] = setTouchAction;
/* harmony export (immutable) */ __webpack_exports__["_fire"] = _fire;
/* harmony export (immutable) */ __webpack_exports__["prevent"] = prevent;
/* harmony export (immutable) */ __webpack_exports__["resetMouseCanceller"] = resetMouseCanceller;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__async_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__debounce_js__ = __webpack_require__(29);




// detect native touch action support
let HAS_NATIVE_TA = typeof document.head.style.touchAction === 'string';
let GESTURE_KEY = '__polymerGestures';
let HANDLED_OBJ = '__polymerGesturesHandled';
let TOUCH_ACTION = '__polymerGesturesTouchAction';
// radius for tap and track
let TAP_DISTANCE = 25;
let TRACK_DISTANCE = 5;
// number of last N track positions to keep
let TRACK_LENGTH = 2;

// Disabling "mouse" handlers for 2500ms is enough
let MOUSE_TIMEOUT = 2500;
let MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'click'];
// an array of bitmask values for mapping MouseEvent.which to MouseEvent.buttons
let MOUSE_WHICH_TO_BUTTONS = [0, 1, 4, 2];
let MOUSE_HAS_BUTTONS = (function() {
  try {
    return new MouseEvent('test', {buttons: 1}).buttons === 1;
  } catch (e) {
    return false;
  }
})();

/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
// check for passive event listeners
let SUPPORTS_PASSIVE = false;
(function() {
  try {
    let opts = Object.defineProperty({}, 'passive', {get: function() {SUPPORTS_PASSIVE = true;}});
    window.addEventListener('test', null, opts);
    window.removeEventListener('test', null, opts);
  } catch(e) {}
})();

// Check for touch-only devices
let IS_TOUCH_ONLY = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);

let GestureRecognizer = function(){}; // eslint-disable-line no-unused-vars
GestureRecognizer.prototype.reset = function(){};
/** @type {function(MouseEvent) | undefined} */
GestureRecognizer.prototype.mousedown;
/** @type {(function(MouseEvent) | undefined)} */
GestureRecognizer.prototype.mousemove;
/** @type {(function(MouseEvent) | undefined)} */
GestureRecognizer.prototype.mouseup;
/** @type {(function(TouchEvent) | undefined)} */
GestureRecognizer.prototype.touchstart;
/** @type {(function(TouchEvent) | undefined)} */
GestureRecognizer.prototype.touchmove;
/** @type {(function(TouchEvent) | undefined)} */
GestureRecognizer.prototype.touchend;
/** @type {(function(MouseEvent) | undefined)} */
GestureRecognizer.prototype.click;

// touch will make synthetic mouse events
// `preventDefault` on touchend will cancel them,
// but this breaks `<input>` focus and link clicks
// disable mouse handlers for MOUSE_TIMEOUT ms after
// a touchend to ignore synthetic mouse events
let mouseCanceller = function(mouseEvent) {
  // Check for sourceCapabilities, used to distinguish synthetic events
  // if mouseEvent did not come from a device that fires touch events,
  // it was made by a real mouse and should be counted
  // http://wicg.github.io/InputDeviceCapabilities/#dom-inputdevicecapabilities-firestouchevents
  let sc = mouseEvent.sourceCapabilities;
  if (sc && !sc.firesTouchEvents) {
    return;
  }
  // skip synthetic mouse events
  mouseEvent[HANDLED_OBJ] = {skip: true};
  // disable "ghost clicks"
  if (mouseEvent.type === 'click') {
    let path = mouseEvent.composedPath && mouseEvent.composedPath();
    if (path) {
      for (let i = 0; i < path.length; i++) {
        if (path[i] === POINTERSTATE.mouse.target) {
          return;
        }
      }
    }
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();
  }
};

/**
 * @param {boolean=} setup True to add, false to remove.
 */
function setupTeardownMouseCanceller(setup) {
  let events = IS_TOUCH_ONLY ? ['click'] : MOUSE_EVENTS;
  for (let i = 0, en; i < events.length; i++) {
    en = events[i];
    if (setup) {
      document.addEventListener(en, mouseCanceller, true);
    } else {
      document.removeEventListener(en, mouseCanceller, true);
    }
  }
}

function ignoreMouse(e) {
  if (!POINTERSTATE.mouse.mouseIgnoreJob) {
    setupTeardownMouseCanceller(true);
  }
  let unset = function() {
    setupTeardownMouseCanceller();
    POINTERSTATE.mouse.target = null;
    POINTERSTATE.mouse.mouseIgnoreJob = null;
  };
  POINTERSTATE.mouse.target = e.composedPath()[0];
  POINTERSTATE.mouse.mouseIgnoreJob = __WEBPACK_IMPORTED_MODULE_2__debounce_js__["a" /* Debouncer */].debounce(
        POINTERSTATE.mouse.mouseIgnoreJob
      , __WEBPACK_IMPORTED_MODULE_1__async_js__["b" /* timeOut */].after(MOUSE_TIMEOUT)
      , unset);
}

/**
 * @param {MouseEvent} ev event to test for left mouse button down
 * @return {boolean} has left mouse button down
 */
function hasLeftMouseButton(ev) {
  let type = ev.type;
  // exit early if the event is not a mouse event
  if (MOUSE_EVENTS.indexOf(type) === -1) {
    return false;
  }
  // ev.button is not reliable for mousemove (0 is overloaded as both left button and no buttons)
  // instead we use ev.buttons (bitmask of buttons) or fall back to ev.which (deprecated, 0 for no buttons, 1 for left button)
  if (type === 'mousemove') {
    // allow undefined for testing events
    let buttons = ev.buttons === undefined ? 1 : ev.buttons;
    if ((ev instanceof window.MouseEvent) && !MOUSE_HAS_BUTTONS) {
      buttons = MOUSE_WHICH_TO_BUTTONS[ev.which] || 0;
    }
    // buttons is a bitmask, check that the left button bit is set (1)
    return Boolean(buttons & 1);
  } else {
    // allow undefined for testing events
    let button = ev.button === undefined ? 0 : ev.button;
    // ev.button is 0 in mousedown/mouseup/click for left button activation
    return button === 0;
  }
}

function isSyntheticClick(ev) {
  if (ev.type === 'click') {
    // ev.detail is 0 for HTMLElement.click in most browsers
    if (ev.detail === 0) {
      return true;
    }
    // in the worst case, check that the x/y position of the click is within
    // the bounding box of the target of the event
    // Thanks IE 10 >:(
    let t = _findOriginalTarget(ev);
    // make sure the target of the event is an element so we can use getBoundingClientRect,
    // if not, just assume it is a synthetic click
    if (!t.nodeType || /** @type {Element} */(t).nodeType !== Node.ELEMENT_NODE) {
      return true;
    }
    let bcr = /** @type {Element} */(t).getBoundingClientRect();
    // use page x/y to account for scrolling
    let x = ev.pageX, y = ev.pageY;
    // ev is a synthetic click if the position is outside the bounding box of the target
    return !((x >= bcr.left && x <= bcr.right) && (y >= bcr.top && y <= bcr.bottom));
  }
  return false;
}

let POINTERSTATE = {
  mouse: {
    target: null,
    mouseIgnoreJob: null
  },
  touch: {
    x: 0,
    y: 0,
    id: -1,
    scrollDecided: false
  }
};

function firstTouchAction(ev) {
  let ta = 'auto';
  let path = ev.composedPath && ev.composedPath();
  if (path) {
    for (let i = 0, n; i < path.length; i++) {
      n = path[i];
      if (n[TOUCH_ACTION]) {
        ta = n[TOUCH_ACTION];
        break;
      }
    }
  }
  return ta;
}

function trackDocument(stateObj, movefn, upfn) {
  stateObj.movefn = movefn;
  stateObj.upfn = upfn;
  document.addEventListener('mousemove', movefn);
  document.addEventListener('mouseup', upfn);
}

function untrackDocument(stateObj) {
  document.removeEventListener('mousemove', stateObj.movefn);
  document.removeEventListener('mouseup', stateObj.upfn);
  stateObj.movefn = null;
  stateObj.upfn = null;
}

// use a document-wide touchend listener to start the ghost-click prevention mechanism
// Use passive event listeners, if supported, to not affect scrolling performance
document.addEventListener('touchend', ignoreMouse, SUPPORTS_PASSIVE ? {passive: true} : false);

const gestures = {};
/* harmony export (immutable) */ __webpack_exports__["gestures"] = gestures;

const recognizers = [];
/* harmony export (immutable) */ __webpack_exports__["recognizers"] = recognizers;


function deepTargetFind(x, y) {
  let node = document.elementFromPoint(x, y);
  let next = node;
  // this code path is only taken when native ShadowDOM is used
  // if there is a shadowroot, it may have a node at x/y
  // if there is not a shadowroot, exit the loop
  while (next && next.shadowRoot && !window.ShadyDOM) {
    // if there is a node at x/y in the shadowroot, look deeper
    let oldNext = next;
    next = next.shadowRoot.elementFromPoint(x, y);
    // on Safari, elementFromPoint may return the shadowRoot host
    if (oldNext === next) {
      break;
    }
    if (next) {
      node = next;
    }
  }
  return node;
}

function _findOriginalTarget(ev) {
  // shadowdom
  if (ev.composedPath) {
    return /** @type {EventTarget} */(ev.composedPath()[0]);
  }
  // shadydom
  return ev.target;
}

function _handleNative(ev) {
  let handled;
  let type = ev.type;
  let node = ev.currentTarget;
  let gobj = node[GESTURE_KEY];
  if (!gobj) {
    return;
  }
  let gs = gobj[type];
  if (!gs) {
    return;
  }
  if (!ev[HANDLED_OBJ]) {
    ev[HANDLED_OBJ] = {};
    if (type.slice(0, 5) === 'touch') {
      ev = /** @type {TouchEvent} */(ev); // eslint-disable-line no-self-assign
      let t = ev.changedTouches[0];
      if (type === 'touchstart') {
        // only handle the first finger
        if (ev.touches.length === 1) {
          POINTERSTATE.touch.id = t.identifier;
        }
      }
      if (POINTERSTATE.touch.id !== t.identifier) {
        return;
      }
      if (!HAS_NATIVE_TA) {
        if (type === 'touchstart' || type === 'touchmove') {
          _handleTouchAction(ev);
        }
      }
    }
  }
  handled = ev[HANDLED_OBJ];
  // used to ignore synthetic mouse events
  if (handled.skip) {
    return;
  }
  // reset recognizer state
  for (let i = 0, r; i < recognizers.length; i++) {
    r = recognizers[i];
    if (gs[r.name] && !handled[r.name]) {
      if (r.flow && r.flow.start.indexOf(ev.type) > -1 && r.reset) {
        r.reset();
      }
    }
  }
  // enforce gesture recognizer order
  for (let i = 0, r; i < recognizers.length; i++) {
    r = recognizers[i];
    if (gs[r.name] && !handled[r.name]) {
      handled[r.name] = true;
      r[type](ev);
    }
  }
}

function _handleTouchAction(ev) {
  let t = ev.changedTouches[0];
  let type = ev.type;
  if (type === 'touchstart') {
    POINTERSTATE.touch.x = t.clientX;
    POINTERSTATE.touch.y = t.clientY;
    POINTERSTATE.touch.scrollDecided = false;
  } else if (type === 'touchmove') {
    if (POINTERSTATE.touch.scrollDecided) {
      return;
    }
    POINTERSTATE.touch.scrollDecided = true;
    let ta = firstTouchAction(ev);
    let prevent = false;
    let dx = Math.abs(POINTERSTATE.touch.x - t.clientX);
    let dy = Math.abs(POINTERSTATE.touch.y - t.clientY);
    if (!ev.cancelable) {
      // scrolling is happening
    } else if (ta === 'none') {
      prevent = true;
    } else if (ta === 'pan-x') {
      prevent = dy > dx;
    } else if (ta === 'pan-y') {
      prevent = dx > dy;
    }
    if (prevent) {
      ev.preventDefault();
    } else {
      prevent('track');
    }
  }
}

function addListener(node, evType, handler) {
  if (gestures[evType]) {
    _add(node, evType, handler);
    return true;
  }
  return false;
}

function removeListener(node, evType, handler) {
  if (gestures[evType]) {
    _remove(node, evType, handler);
    return true;
  }
  return false;
}

function _add(node, evType, handler) {
  let recognizer = gestures[evType];
  let deps = recognizer.deps;
  let name = recognizer.name;
  let gobj = node[GESTURE_KEY];
  if (!gobj) {
    node[GESTURE_KEY] = gobj = {};
  }
  for (let i = 0, dep, gd; i < deps.length; i++) {
    dep = deps[i];
    // don't add mouse handlers on iOS because they cause gray selection overlays
    if (IS_TOUCH_ONLY && MOUSE_EVENTS.indexOf(dep) > -1 && dep !== 'click') {
      continue;
    }
    gd = gobj[dep];
    if (!gd) {
      gobj[dep] = gd = {_count: 0};
    }
    if (gd._count === 0) {
      node.addEventListener(dep, _handleNative);
    }
    gd[name] = (gd[name] || 0) + 1;
    gd._count = (gd._count || 0) + 1;
  }
  node.addEventListener(evType, handler);
  if (recognizer.touchAction) {
    setTouchAction(node, recognizer.touchAction);
  }
}

function _remove(node, evType, handler) {
  let recognizer = gestures[evType];
  let deps = recognizer.deps;
  let name = recognizer.name;
  let gobj = node[GESTURE_KEY];
  if (gobj) {
    for (let i = 0, dep, gd; i < deps.length; i++) {
      dep = deps[i];
      gd = gobj[dep];
      if (gd && gd[name]) {
        gd[name] = (gd[name] || 1) - 1;
        gd._count = (gd._count || 1) - 1;
        if (gd._count === 0) {
          node.removeEventListener(dep, _handleNative);
        }
      }
    }
  }
  node.removeEventListener(evType, handler);
}

function register(recog) {
  recognizers.push(recog);
  for (let i = 0; i < recog.emits.length; i++) {
    gestures[recog.emits[i]] = recog;
  }
}

function _findRecognizerByEvent(evName) {
  for (let i = 0, r; i < recognizers.length; i++) {
    r = recognizers[i];
    for (let j = 0, n; j < r.emits.length; j++) {
      n = r.emits[j];
      if (n === evName) {
        return r;
      }
    }
  }
  return null;
}

function setTouchAction(node, value) {
  if (HAS_NATIVE_TA) {
    node.style.touchAction = value;
  }
  node[TOUCH_ACTION] = value;
}

function _fire(target, type, detail) {
  let ev = new Event(type, { bubbles: true, cancelable: true, composed: true });
  ev.detail = detail;
  target.dispatchEvent(ev);
  // forward `preventDefault` in a clean way
  if (ev.defaultPrevented) {
    let preventer = detail.preventer || detail.sourceEvent;
    if (preventer && preventer.preventDefault) {
      preventer.preventDefault();
    }
  }
}

function prevent(evName) {
  let recognizer = _findRecognizerByEvent(evName);
  if (recognizer.info) {
    recognizer.info.prevent = true;
  }
}

function resetMouseCanceller() {
  if (POINTERSTATE.mouse.mouseIgnoreJob) {
    POINTERSTATE.mouse.mouseIgnoreJob.flush();
  }
}

/* eslint-disable valid-jsdoc */

register({
  name: 'downup',
  deps: ['mousedown', 'touchstart', 'touchend'],
  flow: {
    start: ['mousedown', 'touchstart'],
    end: ['mouseup', 'touchend']
  },
  emits: ['down', 'up'],

  info: {
    movefn: null,
    upfn: null
  },

  /** @this {GestureRecognizer} */
  reset: function() {
    untrackDocument(this.info);
  },

  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   */
  mousedown: function(e) {
    if (!hasLeftMouseButton(e)) {
      return;
    }
    let t = _findOriginalTarget(e);
    let self = this;
    let movefn = function movefn(e) {
      if (!hasLeftMouseButton(e)) {
        self._fire('up', t, e);
        untrackDocument(self.info);
      }
    };
    let upfn = function upfn(e) {
      if (hasLeftMouseButton(e)) {
        self._fire('up', t, e);
      }
      untrackDocument(self.info);
    };
    trackDocument(this.info, movefn, upfn);
    this._fire('down', t, e);
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   */
  touchstart: function(e) {
    this._fire('down', _findOriginalTarget(e), e.changedTouches[0], e);
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   */
  touchend: function(e) {
    this._fire('up', _findOriginalTarget(e), e.changedTouches[0], e);
  },
  /**
   * @param {string} type
   * @param {EventTarget} target
   * @param {Event} event
   * @param {Function} preventer
   */
  _fire: function(type, target, event, preventer) {
    _fire(target, type, {
      x: event.clientX,
      y: event.clientY,
      sourceEvent: event,
      preventer: preventer,
      prevent: function(e) {
        return prevent(e);
      }
    });
  }
});

register({
  name: 'track',
  touchAction: 'none',
  deps: ['mousedown', 'touchstart', 'touchmove', 'touchend'],
  flow: {
    start: ['mousedown', 'touchstart'],
    end: ['mouseup', 'touchend']
  },
  emits: ['track'],

  info: {
    x: 0,
    y: 0,
    state: 'start',
    started: false,
    moves: [],
    /** @this {GestureRecognizer} */
    addMove: function(move) {
      if (this.moves.length > TRACK_LENGTH) {
        this.moves.shift();
      }
      this.moves.push(move);
    },
    movefn: null,
    upfn: null,
    prevent: false
  },

  /** @this {GestureRecognizer} */
  reset: function() {
    this.info.state = 'start';
    this.info.started = false;
    this.info.moves = [];
    this.info.x = 0;
    this.info.y = 0;
    this.info.prevent = false;
    untrackDocument(this.info);
  },

  /**
   * @this {GestureRecognizer}
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  hasMovedEnough: function(x, y) {
    if (this.info.prevent) {
      return false;
    }
    if (this.info.started) {
      return true;
    }
    let dx = Math.abs(this.info.x - x);
    let dy = Math.abs(this.info.y - y);
    return (dx >= TRACK_DISTANCE || dy >= TRACK_DISTANCE);
  },
  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   */
  mousedown: function(e) {
    if (!hasLeftMouseButton(e)) {
      return;
    }
    let t = _findOriginalTarget(e);
    let self = this;
    let movefn = function movefn(e) {
      let x = e.clientX, y = e.clientY;
      if (self.hasMovedEnough(x, y)) {
        // first move is 'start', subsequent moves are 'move', mouseup is 'end'
        self.info.state = self.info.started ? (e.type === 'mouseup' ? 'end' : 'track') : 'start';
        if (self.info.state === 'start') {
          // if and only if tracking, always prevent tap
          prevent('tap');
        }
        self.info.addMove({x: x, y: y});
        if (!hasLeftMouseButton(e)) {
          // always _fire "end"
          self.info.state = 'end';
          untrackDocument(self.info);
        }
        self._fire(t, e);
        self.info.started = true;
      }
    };
    let upfn = function upfn(e) {
      if (self.info.started) {
        movefn(e);
      }

      // remove the temporary listeners
      untrackDocument(self.info);
    };
    // add temporary document listeners as mouse retargets
    trackDocument(this.info, movefn, upfn);
    this.info.x = e.clientX;
    this.info.y = e.clientY;
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   */
  touchstart: function(e) {
    let ct = e.changedTouches[0];
    this.info.x = ct.clientX;
    this.info.y = ct.clientY;
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   */
  touchmove: function(e) {
    let t = _findOriginalTarget(e);
    let ct = e.changedTouches[0];
    let x = ct.clientX, y = ct.clientY;
    if (this.hasMovedEnough(x, y)) {
      if (this.info.state === 'start') {
        // if and only if tracking, always prevent tap
        prevent('tap');
      }
      this.info.addMove({x: x, y: y});
      this._fire(t, ct);
      this.info.state = 'track';
      this.info.started = true;
    }
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   */
  touchend: function(e) {
    let t = _findOriginalTarget(e);
    let ct = e.changedTouches[0];
    // only trackend if track was started and not aborted
    if (this.info.started) {
      // reset started state on up
      this.info.state = 'end';
      this.info.addMove({x: ct.clientX, y: ct.clientY});
      this._fire(t, ct, e);
    }
  },

  /**
   * @this {GestureRecognizer}
   * @param {EventTarget} target
   * @param {Touch} touch
   */
  _fire: function(target, touch) {
    let secondlast = this.info.moves[this.info.moves.length - 2];
    let lastmove = this.info.moves[this.info.moves.length - 1];
    let dx = lastmove.x - this.info.x;
    let dy = lastmove.y - this.info.y;
    let ddx, ddy = 0;
    if (secondlast) {
      ddx = lastmove.x - secondlast.x;
      ddy = lastmove.y - secondlast.y;
    }
    _fire(target, 'track', {
      state: this.info.state,
      x: touch.clientX,
      y: touch.clientY,
      dx: dx,
      dy: dy,
      ddx: ddx,
      ddy: ddy,
      sourceEvent: touch,
      hover: function() {
        return deepTargetFind(touch.clientX, touch.clientY);
      }
    });
  }

});

register({
  name: 'tap',
  deps: ['mousedown', 'click', 'touchstart', 'touchend'],
  flow: {
    start: ['mousedown', 'touchstart'],
    end: ['click', 'touchend']
  },
  emits: ['tap'],
  info: {
    x: NaN,
    y: NaN,
    prevent: false
  },
  /** @this {GestureRecognizer} */
  reset: function() {
    this.info.x = NaN;
    this.info.y = NaN;
    this.info.prevent = false;
  },
  /** @this {GestureRecognizer} */
  save: function(e) {
    this.info.x = e.clientX;
    this.info.y = e.clientY;
  },
  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   */
  mousedown: function(e) {
    if (hasLeftMouseButton(e)) {
      this.save(e);
    }
  },
  /**
   * @this {GestureRecognizer}
   * @param {MouseEvent} e
   */
  click: function(e) {
    if (hasLeftMouseButton(e)) {
      this.forward(e);
    }
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   */
  touchstart: function(e) {
    this.save(e.changedTouches[0], e);
  },
  /**
   * @this {GestureRecognizer}
   * @param {TouchEvent} e
   */
  touchend: function(e) {
    this.forward(e.changedTouches[0], e);
  },
  /**
   * @this {GestureRecognizer}
   * @param {Event | Touch} e
   * @param {Event=} preventer
   */
  forward: function(e, preventer) {
    let dx = Math.abs(e.clientX - this.info.x);
    let dy = Math.abs(e.clientY - this.info.y);
    // find original target from `preventer` for TouchEvents, or `e` for MouseEvents
    let t = _findOriginalTarget((preventer || e));
    // dx,dy can be NaN if `click` has been simulated and there was no `down` for `start`
    if (isNaN(dx) || isNaN(dy) || (dx <= TAP_DISTANCE && dy <= TAP_DISTANCE) || isSyntheticClick(e)) {
      // prevent taps from being generated if an event has canceled them
      if (!this.info.prevent) {
        _fire(t, 'tap', {
          x: e.clientX,
          y: e.clientY,
          sourceEvent: e,
          preventer: preventer
        });
      }
    }
  }
});

const findOriginalTarget = _findOriginalTarget;
/* harmony export (immutable) */ __webpack_exports__["findOriginalTarget"] = findOriginalTarget;

const add = addListener;
/* harmony export (immutable) */ __webpack_exports__["add"] = add;

const remove = removeListener;
/* harmony export (immutable) */ __webpack_exports__["remove"] = remove;



/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calculateSplices; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


function newSplice(index, removed, addedCount) {
  return {
    index: index,
    removed: removed,
    addedCount: addedCount
  };
}

const EDIT_LEAVE = 0;
const EDIT_UPDATE = 1;
const EDIT_ADD = 2;
const EDIT_DELETE = 3;

// Note: This function is *based* on the computation of the Levenshtein
// "edit" distance. The one change is that "updates" are treated as two
// edits - not one. With Array splices, an update is really a delete
// followed by an add. By retaining this, we optimize for "keeping" the
// maximum array items in the original array. For example:
//
//   'xxxx123' -> '123yyyy'
//
// With 1-edit updates, the shortest path would be just to update all seven
// characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
// leaves the substring '123' intact.
function calcEditDistances(current, currentStart, currentEnd,
                            old, oldStart, oldEnd) {
  // "Deletion" columns
  let rowCount = oldEnd - oldStart + 1;
  let columnCount = currentEnd - currentStart + 1;
  let distances = new Array(rowCount);

  // "Addition" rows. Initialize null column.
  for (let i = 0; i < rowCount; i++) {
    distances[i] = new Array(columnCount);
    distances[i][0] = i;
  }

  // Initialize null row
  for (let j = 0; j < columnCount; j++)
    distances[0][j] = j;

  for (let i = 1; i < rowCount; i++) {
    for (let j = 1; j < columnCount; j++) {
      if (equals(current[currentStart + j - 1], old[oldStart + i - 1]))
        distances[i][j] = distances[i - 1][j - 1];
      else {
        let north = distances[i - 1][j] + 1;
        let west = distances[i][j - 1] + 1;
        distances[i][j] = north < west ? north : west;
      }
    }
  }

  return distances;
}

// This starts at the final weight, and walks "backward" by finding
// the minimum previous weight recursively until the origin of the weight
// matrix.
function spliceOperationsFromEditDistances(distances) {
  let i = distances.length - 1;
  let j = distances[0].length - 1;
  let current = distances[i][j];
  let edits = [];
  while (i > 0 || j > 0) {
    if (i == 0) {
      edits.push(EDIT_ADD);
      j--;
      continue;
    }
    if (j == 0) {
      edits.push(EDIT_DELETE);
      i--;
      continue;
    }
    let northWest = distances[i - 1][j - 1];
    let west = distances[i - 1][j];
    let north = distances[i][j - 1];

    let min;
    if (west < north)
      min = west < northWest ? west : northWest;
    else
      min = north < northWest ? north : northWest;

    if (min == northWest) {
      if (northWest == current) {
        edits.push(EDIT_LEAVE);
      } else {
        edits.push(EDIT_UPDATE);
        current = northWest;
      }
      i--;
      j--;
    } else if (min == west) {
      edits.push(EDIT_DELETE);
      i--;
      current = west;
    } else {
      edits.push(EDIT_ADD);
      j--;
      current = north;
    }
  }

  edits.reverse();
  return edits;
}

/**
 * Splice Projection functions:
 *
 * A splice map is a representation of how a previous array of items
 * was transformed into a new array of items. Conceptually it is a list of
 * tuples of
 *
 *   <index, removed, addedCount>
 *
 * which are kept in ascending index order of. The tuple represents that at
 * the |index|, |removed| sequence of items were removed, and counting forward
 * from |index|, |addedCount| items were added.
 */

/**
 * Lacking individual splice mutation information, the minimal set of
 * splices can be synthesized given the previous state and final state of an
 * array. The basic approach is to calculate the edit distance matrix and
 * choose the shortest path through it.
 *
 * Complexity: O(l * p)
 *   l: The length of the current array
 *   p: The length of the old array
 *
 * @param {Array} current The current "changed" array for which to
 * calculate splices.
 * @param {number} currentStart Starting index in the `current` array for
 * which splices are calculated.
 * @param {number} currentEnd Ending index in the `current` array for
 * which splices are calculated.
 * @param {Array} old The original "unchanged" array to compare `current`
 * against to determine splices.
 * @param {number} oldStart Starting index in the `old` array for
 * which splices are calculated.
 * @param {number} oldEnd Ending index in the `old` array for
 * which splices are calculated.
 * @return {Array} Returns an array of splice record objects. Each of these
 * contains: `index` the location where the splice occurred; `removed`
 * the array of removed items from this location; `addedCount` the number
 * of items added at this location.
 */
function calcSplices(current, currentStart, currentEnd,
                      old, oldStart, oldEnd) {
  let prefixCount = 0;
  let suffixCount = 0;
  let splice;

  let minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
  if (currentStart == 0 && oldStart == 0)
    prefixCount = sharedPrefix(current, old, minLength);

  if (currentEnd == current.length && oldEnd == old.length)
    suffixCount = sharedSuffix(current, old, minLength - prefixCount);

  currentStart += prefixCount;
  oldStart += prefixCount;
  currentEnd -= suffixCount;
  oldEnd -= suffixCount;

  if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0)
    return [];

  if (currentStart == currentEnd) {
    splice = newSplice(currentStart, [], 0);
    while (oldStart < oldEnd)
      splice.removed.push(old[oldStart++]);

    return [ splice ];
  } else if (oldStart == oldEnd)
    return [ newSplice(currentStart, [], currentEnd - currentStart) ];

  let ops = spliceOperationsFromEditDistances(
      calcEditDistances(current, currentStart, currentEnd,
                             old, oldStart, oldEnd));

  splice = undefined;
  let splices = [];
  let index = currentStart;
  let oldIndex = oldStart;
  for (let i = 0; i < ops.length; i++) {
    switch(ops[i]) {
      case EDIT_LEAVE:
        if (splice) {
          splices.push(splice);
          splice = undefined;
        }

        index++;
        oldIndex++;
        break;
      case EDIT_UPDATE:
        if (!splice)
          splice = newSplice(index, [], 0);

        splice.addedCount++;
        index++;

        splice.removed.push(old[oldIndex]);
        oldIndex++;
        break;
      case EDIT_ADD:
        if (!splice)
          splice = newSplice(index, [], 0);

        splice.addedCount++;
        index++;
        break;
      case EDIT_DELETE:
        if (!splice)
          splice = newSplice(index, [], 0);

        splice.removed.push(old[oldIndex]);
        oldIndex++;
        break;
    }
  }

  if (splice) {
    splices.push(splice);
  }
  return splices;
}

function sharedPrefix(current, old, searchLength) {
  for (let i = 0; i < searchLength; i++)
    if (!equals(current[i], old[i]))
      return i;
  return searchLength;
}

function sharedSuffix(current, old, searchLength) {
  let index1 = current.length;
  let index2 = old.length;
  let count = 0;
  while (count < searchLength && equals(current[--index1], old[--index2]))
    count++;

  return count;
}

function calculateSplices(current, previous) {
  return calcSplices(current, 0, current.length, previous, 0,
                          previous.length);
}

function equals(currentValue, previousValue) {
  return currentValue === previousValue;
}




/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iron_a11y_keys_behavior_iron_a11y_keys_behavior_js__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iron_control_state_js__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polymer_lib_legacy_polymer_dom_js__ = __webpack_require__(11);





const IronButtonStateImpl = {

  properties: {

    /**
     * If true, the user is currently holding down the button.
     */
    pressed: {
      type: Boolean,
      readOnly: true,
      value: false,
      reflectToAttribute: true,
      observer: '_pressedChanged'
    },

    /**
     * If true, the button toggles the active state with each tap or press
     * of the spacebar.
     */
    toggles: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /**
     * If true, the button is a toggle and is currently in the active state.
     */
    active: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true
    },

    /**
     * True if the element is currently being pressed by a "pointer," which
     * is loosely defined as mouse or touch input (but specifically excluding
     * keyboard input).
     */
    pointerDown: {
      type: Boolean,
      readOnly: true,
      value: false
    },

    /**
     * True if the input device that caused the element to receive focus
     * was a keyboard.
     */
    receivedFocusFromKeyboard: {
      type: Boolean,
      readOnly: true
    },

    /**
     * The aria attribute to be set if the button is a toggle and in the
     * active state.
     */
    ariaActiveAttribute: {
      type: String,
      value: 'aria-pressed',
      observer: '_ariaActiveAttributeChanged'
    }
  },

  listeners: {
    down: '_downHandler',
    up: '_upHandler',
    tap: '_tapHandler'
  },

  observers: [
    '_focusChanged(focused)',
    '_activeChanged(active, ariaActiveAttribute)'
  ],

  keyBindings: {
    'enter:keydown': '_asyncClick',
    'space:keydown': '_spaceKeyDownHandler',
    'space:keyup': '_spaceKeyUpHandler',
  },

  _mouseEventRe: /^mouse/,

  _tapHandler: function() {
    if (this.toggles) {
     // a tap is needed to toggle the active state
      this._userActivate(!this.active);
    } else {
      this.active = false;
    }
  },

  _focusChanged: function(focused) {
    this._detectKeyboardFocus(focused);

    if (!focused) {
      this._setPressed(false);
    }
  },

  _detectKeyboardFocus: function(focused) {
    this._setReceivedFocusFromKeyboard(!this.pointerDown && focused);
  },

  // to emulate native checkbox, (de-)activations from a user interaction fire
  // 'change' events
  _userActivate: function(active) {
    if (this.active !== active) {
      this.active = active;
      this.fire('change');
    }
  },

  _downHandler: function(event) {
    this._setPointerDown(true);
    this._setPressed(true);
    this._setReceivedFocusFromKeyboard(false);
  },

  _upHandler: function() {
    this._setPointerDown(false);
    this._setPressed(false);
  },

  /**
   * @param {!KeyboardEvent} event .
   */
  _spaceKeyDownHandler: function(event) {
    var keyboardEvent = event.detail.keyboardEvent;
    var target = Object(__WEBPACK_IMPORTED_MODULE_3__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(keyboardEvent).localTarget;

    // Ignore the event if this is coming from a focused light child, since that
    // element will deal with it.
    if (this.isLightDescendant(/** @type {Node} */(target)))
      return;

    keyboardEvent.preventDefault();
    keyboardEvent.stopImmediatePropagation();
    this._setPressed(true);
  },

  /**
   * @param {!KeyboardEvent} event .
   */
  _spaceKeyUpHandler: function(event) {
    var keyboardEvent = event.detail.keyboardEvent;
    var target = Object(__WEBPACK_IMPORTED_MODULE_3__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(keyboardEvent).localTarget;

    // Ignore the event if this is coming from a focused light child, since that
    // element will deal with it.
    if (this.isLightDescendant(/** @type {Node} */(target)))
      return;

    if (this.pressed) {
      this._asyncClick();
    }
    this._setPressed(false);
  },

  // trigger click asynchronously, the asynchrony is useful to allow one
  // event handler to unwind before triggering another event
  _asyncClick: function() {
    this.async(function() {
      this.click();
    }, 1);
  },

  // any of these changes are considered a change to button state

  _pressedChanged: function(pressed) {
    this._changedButtonState();
  },

  _ariaActiveAttributeChanged: function(value, oldValue) {
    if (oldValue && oldValue != value && this.hasAttribute(oldValue)) {
      this.removeAttribute(oldValue);
    }
  },

  _activeChanged: function(active, ariaActiveAttribute) {
    if (this.toggles) {
      this.setAttribute(this.ariaActiveAttribute,
                        active ? 'true' : 'false');
    } else {
      this.removeAttribute(this.ariaActiveAttribute);
    }
    this._changedButtonState();
  },

  _controlStateChanged: function() {
    if (this.disabled) {
      this._setPressed(false);
    } else {
      this._changedButtonState();
    }
  },

  // provide hook for follow-on behaviors to react to button-state

  _changedButtonState: function() {
    if (this._buttonStateChanged) {
      this._buttonStateChanged(); // abstract
    }
  }

};
/* harmony export (immutable) */ __webpack_exports__["b"] = IronButtonStateImpl;


const IronButtonState = [
  __WEBPACK_IMPORTED_MODULE_1__iron_a11y_keys_behavior_iron_a11y_keys_behavior_js__["a" /* IronA11yKeysBehavior */],
  IronButtonStateImpl
];
/* harmony export (immutable) */ __webpack_exports__["a"] = IronButtonState;



/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);


/**
 * Chrome uses an older version of DOM Level 3 Keyboard Events
 *
 * Most keys are labeled as text, but some are Unicode codepoints.
 * Values taken from: http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/keyset.html#KeySet-Set
 */
var KEY_IDENTIFIER = {
  'U+0008': 'backspace',
  'U+0009': 'tab',
  'U+001B': 'esc',
  'U+0020': 'space',
  'U+007F': 'del'
};

/**
 * Special table for KeyboardEvent.keyCode.
 * KeyboardEvent.keyIdentifier is better, and KeyBoardEvent.key is even better
 * than that.
 *
 * Values from: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent.keyCode#Value_of_keyCode
 */
var KEY_CODE = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  27: 'esc',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  46: 'del',
  106: '*'
};

/**
 * MODIFIER_KEYS maps the short name for modifier keys used in a key
 * combo string to the property name that references those same keys
 * in a KeyboardEvent instance.
 */
var MODIFIER_KEYS = {
  'shift': 'shiftKey',
  'ctrl': 'ctrlKey',
  'alt': 'altKey',
  'meta': 'metaKey'
};

/**
 * KeyboardEvent.key is mostly represented by printable character made by
 * the keyboard, with unprintable keys labeled nicely.
 *
 * However, on OS X, Alt+char can make a Unicode character that follows an
 * Apple-specific mapping. In this case, we fall back to .keyCode.
 */
var KEY_CHAR = /[a-z0-9*]/;

/**
 * Matches a keyIdentifier string.
 */
var IDENT_CHAR = /U\+/;

/**
 * Matches arrow keys in Gecko 27.0+
 */
var ARROW_KEY = /^arrow/;

/**
 * Matches space keys everywhere (notably including IE10's exceptional name
 * `spacebar`).
 */
var SPACE_KEY = /^space(bar)?/;

/**
 * Matches ESC key.
 *
 * Value from: http://w3c.github.io/uievents-key/#key-Escape
 */
var ESC_KEY = /^escape$/;

/**
 * Transforms the key.
 * @param {string} key The KeyBoardEvent.key
 * @param {Boolean} [noSpecialChars] Limits the transformation to
 * alpha-numeric characters.
 */
function transformKey(key, noSpecialChars) {
  var validKey = '';
  if (key) {
    var lKey = key.toLowerCase();
    if (lKey === ' ' || SPACE_KEY.test(lKey)) {
      validKey = 'space';
    } else if (ESC_KEY.test(lKey)) {
      validKey = 'esc';
    } else if (lKey.length == 1) {
      if (!noSpecialChars || KEY_CHAR.test(lKey)) {
        validKey = lKey;
      }
    } else if (ARROW_KEY.test(lKey)) {
      validKey = lKey.replace('arrow', '');
    } else if (lKey == 'multiply') {
      // numpad '*' can map to Multiply on IE/Windows
      validKey = '*';
    } else {
      validKey = lKey;
    }
  }
  return validKey;
}

function transformKeyIdentifier(keyIdent) {
  var validKey = '';
  if (keyIdent) {
    if (keyIdent in KEY_IDENTIFIER) {
      validKey = KEY_IDENTIFIER[keyIdent];
    } else if (IDENT_CHAR.test(keyIdent)) {
      keyIdent = parseInt(keyIdent.replace('U+', '0x'), 16);
      validKey = String.fromCharCode(keyIdent).toLowerCase();
    } else {
      validKey = keyIdent.toLowerCase();
    }
  }
  return validKey;
}

function transformKeyCode(keyCode) {
  var validKey = '';
  if (Number(keyCode)) {
    if (keyCode >= 65 && keyCode <= 90) {
      // ascii a-z
      // lowercase is 32 offset from uppercase
      validKey = String.fromCharCode(32 + keyCode);
    } else if (keyCode >= 112 && keyCode <= 123) {
      // function keys f1-f12
      validKey = 'f' + (keyCode - 112 + 1);
    } else if (keyCode >= 48 && keyCode <= 57) {
      // top 0-9 keys
      validKey = String(keyCode - 48);
    } else if (keyCode >= 96 && keyCode <= 105) {
      // num pad 0-9
      validKey = String(keyCode - 96);
    } else {
      validKey = KEY_CODE[keyCode];
    }
  }
  return validKey;
}

/**
  * Calculates the normalized key for a KeyboardEvent.
  * @param {KeyboardEvent} keyEvent
  * @param {Boolean} [noSpecialChars] Set to true to limit keyEvent.key
  * transformation to alpha-numeric chars. This is useful with key
  * combinations like shift + 2, which on FF for MacOS produces
  * keyEvent.key = @
  * To get 2 returned, set noSpecialChars = true
  * To get @ returned, set noSpecialChars = false
 */
function normalizedKeyForEvent(keyEvent, noSpecialChars) {
  // Fall back from .key, to .detail.key for artifical keyboard events,
  // and then to deprecated .keyIdentifier and .keyCode.
  if (keyEvent.key) {
    return transformKey(keyEvent.key, noSpecialChars);
  }
  if (keyEvent.detail && keyEvent.detail.key) {
    return transformKey(keyEvent.detail.key, noSpecialChars);
  }
  return transformKeyIdentifier(keyEvent.keyIdentifier) ||
    transformKeyCode(keyEvent.keyCode) || '';
}

function keyComboMatchesEvent(keyCombo, event) {
  // For combos with modifiers we support only alpha-numeric keys
  var keyEvent = normalizedKeyForEvent(event, keyCombo.hasModifiers);
  return keyEvent === keyCombo.key &&
    (!keyCombo.hasModifiers || (
      !!event.shiftKey === !!keyCombo.shiftKey &&
      !!event.ctrlKey === !!keyCombo.ctrlKey &&
      !!event.altKey === !!keyCombo.altKey &&
      !!event.metaKey === !!keyCombo.metaKey)
    );
}

function parseKeyComboString(keyComboString) {
  if (keyComboString.length === 1) {
    return {
      combo: keyComboString,
      key: keyComboString,
      event: 'keydown'
    };
  }
  return keyComboString.split('+').reduce(function(parsedKeyCombo, keyComboPart) {
    var eventParts = keyComboPart.split(':');
    var keyName = eventParts[0];
    var event = eventParts[1];

    if (keyName in MODIFIER_KEYS) {
      parsedKeyCombo[MODIFIER_KEYS[keyName]] = true;
      parsedKeyCombo.hasModifiers = true;
    } else {
      parsedKeyCombo.key = keyName;
      parsedKeyCombo.event = event || 'keydown';
    }

    return parsedKeyCombo;
  }, {
    combo: keyComboString.split(':').shift()
  });
}

function parseEventString(eventString) {
  return eventString.trim().split(' ').map(function(keyComboString) {
    return parseKeyComboString(keyComboString);
  });
}

const IronA11yKeysBehavior = {
  properties: {
    /**
     * The EventTarget that will be firing relevant KeyboardEvents. Set it to
     * `null` to disable the listeners.
     * @type {?EventTarget}
     */
    keyEventTarget: {
      type: Object,
      value: function() {
        return this;
      }
    },

    /**
     * If true, this property will cause the implementing element to
     * automatically stop propagation on any handled KeyboardEvents.
     */
    stopKeyboardEventPropagation: {
      type: Boolean,
      value: false
    },

    _boundKeyHandlers: {
      type: Array,
      value: function() {
        return [];
      }
    },

    // We use this due to a limitation in IE10 where instances will have
    // own properties of everything on the "prototype".
    _imperativeKeyBindings: {
      type: Object,
      value: function() {
        return {};
      }
    }
  },

  observers: [
    '_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)'
  ],


  /**
   * To be used to express what combination of keys  will trigger the relative
   * callback. e.g. `keyBindings: { 'esc': '_onEscPressed'}`
   * @type {!Object}
   */
  keyBindings: {},

  registered: function() {
    this._prepKeyBindings();
  },

  attached: function() {
    this._listenKeyEventListeners();
  },

  detached: function() {
    this._unlistenKeyEventListeners();
  },

  /**
   * Can be used to imperatively add a key binding to the implementing
   * element. This is the imperative equivalent of declaring a keybinding
   * in the `keyBindings` prototype property.
   *
   * @param {string} eventString
   * @param {string} handlerName
   */
  addOwnKeyBinding: function(eventString, handlerName) {
    this._imperativeKeyBindings[eventString] = handlerName;
    this._prepKeyBindings();
    this._resetKeyEventListeners();
  },

  /**
   * When called, will remove all imperatively-added key bindings.
   */
  removeOwnKeyBindings: function() {
    this._imperativeKeyBindings = {};
    this._prepKeyBindings();
    this._resetKeyEventListeners();
  },

  /**
   * Returns true if a keyboard event matches `eventString`.
   *
   * @param {KeyboardEvent} event
   * @param {string} eventString
   * @return {boolean}
   */
  keyboardEventMatchesKeys: function(event, eventString) {
    var keyCombos = parseEventString(eventString);
    for (var i = 0; i < keyCombos.length; ++i) {
      if (keyComboMatchesEvent(keyCombos[i], event)) {
        return true;
      }
    }
    return false;
  },

  _collectKeyBindings: function() {
    var keyBindings = this.behaviors.map(function(behavior) {
      return behavior.keyBindings;
    });

    if (keyBindings.indexOf(this.keyBindings) === -1) {
      keyBindings.push(this.keyBindings);
    }

    return keyBindings;
  },

  _prepKeyBindings: function() {
    this._keyBindings = {};

    this._collectKeyBindings().forEach(function(keyBindings) {
      for (var eventString in keyBindings) {
        this._addKeyBinding(eventString, keyBindings[eventString]);
      }
    }, this);

    for (var eventString in this._imperativeKeyBindings) {
      this._addKeyBinding(eventString, this._imperativeKeyBindings[eventString]);
    }

    // Give precedence to combos with modifiers to be checked first.
    for (var eventName in this._keyBindings) {
      this._keyBindings[eventName].sort(function (kb1, kb2) {
        var b1 = kb1[0].hasModifiers;
        var b2 = kb2[0].hasModifiers;
        return (b1 === b2) ? 0 : b1 ? -1 : 1;
      })
    }
  },

  _addKeyBinding: function(eventString, handlerName) {
    parseEventString(eventString).forEach(function(keyCombo) {
      this._keyBindings[keyCombo.event] =
        this._keyBindings[keyCombo.event] || [];

      this._keyBindings[keyCombo.event].push([
        keyCombo,
        handlerName
      ]);
    }, this);
  },

  _resetKeyEventListeners: function() {
    this._unlistenKeyEventListeners();

    if (this.isAttached) {
      this._listenKeyEventListeners();
    }
  },

  _listenKeyEventListeners: function() {
    if (!this.keyEventTarget) {
      return;
    }
    Object.keys(this._keyBindings).forEach(function(eventName) {
      var keyBindings = this._keyBindings[eventName];
      var boundKeyHandler = this._onKeyBindingEvent.bind(this, keyBindings);

      this._boundKeyHandlers.push([this.keyEventTarget, eventName, boundKeyHandler]);

      this.keyEventTarget.addEventListener(eventName, boundKeyHandler);
    }, this);
  },

  _unlistenKeyEventListeners: function() {
    var keyHandlerTuple;
    var keyEventTarget;
    var eventName;
    var boundKeyHandler;

    while (this._boundKeyHandlers.length) {
      // My kingdom for block-scope binding and destructuring assignment..
      keyHandlerTuple = this._boundKeyHandlers.pop();
      keyEventTarget = keyHandlerTuple[0];
      eventName = keyHandlerTuple[1];
      boundKeyHandler = keyHandlerTuple[2];

      keyEventTarget.removeEventListener(eventName, boundKeyHandler);
    }
  },

  _onKeyBindingEvent: function(keyBindings, event) {
    if (this.stopKeyboardEventPropagation) {
      event.stopPropagation();
    }

    // if event has been already prevented, don't do anything
    if (event.defaultPrevented) {
      return;
    }

    for (var i = 0; i < keyBindings.length; i++) {
      var keyCombo = keyBindings[i][0];
      var handlerName = keyBindings[i][1];
      if (keyComboMatchesEvent(keyCombo, event)) {
        this._triggerKeyHandler(keyCombo, handlerName, event);
        // exit the loop if eventDefault was prevented
        if (event.defaultPrevented) {
          return;
        }
      }
    }
  },

  _triggerKeyHandler: function(keyCombo, handlerName, keyboardEvent) {
    var detail = Object.create(keyCombo);
    detail.keyboardEvent = keyboardEvent;
    var event = new CustomEvent(keyCombo.event, {
      detail: detail,
      cancelable: true
    });
    this[handlerName].call(this, event);
    if (event.defaultPrevented) {
      keyboardEvent.preventDefault();
    }
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = IronA11yKeysBehavior;



/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polymer_polymer_element_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polymer_lib_legacy_polymer_dom_js__ = __webpack_require__(11);




const IronControlState = {

  properties: {

    /**
     * If true, the element currently has focus.
     */
    focused: {
      type: Boolean,
      value: false,
      notify: true,
      readOnly: true,
      reflectToAttribute: true
    },

    /**
     * If true, the user cannot interact with this element.
     */
    disabled: {
      type: Boolean,
      value: false,
      notify: true,
      observer: '_disabledChanged',
      reflectToAttribute: true
    },

    _oldTabIndex: {
      type: Number
    },

    _boundFocusBlurHandler: {
      type: Function,
      value: function() {
        return this._focusBlurHandler.bind(this);
      }
    },

    __handleEventRetargeting: {
      type: Boolean,
      value: function() {
        return !this.shadowRoot && !__WEBPACK_IMPORTED_MODULE_1__polymer_polymer_element_js__["a" /* Element */];
      }
    }
  },

  observers: [
    '_changedControlState(focused, disabled)'
  ],

  ready: function() {
    this.addEventListener('focus', this._boundFocusBlurHandler, true);
    this.addEventListener('blur', this._boundFocusBlurHandler, true);
  },

  _focusBlurHandler: function(event) {
    // In Polymer 2.0, the library takes care of retargeting events.
    if (__WEBPACK_IMPORTED_MODULE_1__polymer_polymer_element_js__["a" /* Element */]) {
      this._setFocused(event.type === 'focus');
      return;
    }

    // NOTE(cdata):  if we are in ShadowDOM land, `event.target` will
    // eventually become `this` due to retargeting; if we are not in
    // ShadowDOM land, `event.target` will eventually become `this` due
    // to the second conditional which fires a synthetic event (that is also
    // handled). In either case, we can disregard `event.path`.
    if (event.target === this) {
      this._setFocused(event.type === 'focus');
    } else if (this.__handleEventRetargeting) {
      var target = /** @type {Node} */(Object(__WEBPACK_IMPORTED_MODULE_2__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(event).localTarget);
      if (!this.isLightDescendant(target)) {
        this.fire(event.type, {sourceEvent: event}, {
          node: this,
          bubbles: event.bubbles,
          cancelable: event.cancelable
        });
      }
    }
  },

  _disabledChanged: function(disabled, old) {
    this.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    this.style.pointerEvents = disabled ? 'none' : '';
    if (disabled) {
      this._oldTabIndex = this.tabIndex;
      this._setFocused(false);
      this.tabIndex = -1;
      this.blur();
    } else if (this._oldTabIndex !== undefined) {
      this.tabIndex = this._oldTabIndex;
    }
  },

  _changedControlState: function() {
    // _controlStateChanged is abstract, follow-on behaviors may implement it
    if (this._controlStateChanged) {
      this._controlStateChanged();
    }
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = IronControlState;



/***/ }),
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp_kebabCase__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_fp_kebabCase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_fp_kebabCase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__emp_list__ = __webpack_require__(286);




// add custom elements here
const elements = {
    MyApp: __WEBPACK_IMPORTED_MODULE_1__app__["a" /* MyApp */],
    MyEmpList: __WEBPACK_IMPORTED_MODULE_2__emp_list__["a" /* MyEmpList */]
};

// register all as kebab case
Object.keys(elements)
    .forEach(key => {
        customElements.define(__WEBPACK_IMPORTED_MODULE_0_lodash_fp_kebabCase__(key), elements[key])
    });


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var convert = __webpack_require__(129),
    func = convert('kebabCase', __webpack_require__(248), __webpack_require__(257));

func.placeholder = __webpack_require__(64);
module.exports = func;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var baseConvert = __webpack_require__(130),
    util = __webpack_require__(132);

/**
 * Converts `func` of `name` to an immutable auto-curried iteratee-first data-last
 * version with conversion `options` applied. If `name` is an object its methods
 * will be converted.
 *
 * @param {string} name The name of the function to wrap.
 * @param {Function} [func] The function to wrap.
 * @param {Object} [options] The options object. See `baseConvert` for more details.
 * @returns {Function|Object} Returns the converted function or object.
 */
function convert(name, func, options) {
  return baseConvert(util, name, func, options);
}

module.exports = convert;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var mapping = __webpack_require__(131),
    fallbackHolder = __webpack_require__(64);

/** Built-in value reference. */
var push = Array.prototype.push;

/**
 * Creates a function, with an arity of `n`, that invokes `func` with the
 * arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} n The arity of the new function.
 * @returns {Function} Returns the new function.
 */
function baseArity(func, n) {
  return n == 2
    ? function(a, b) { return func.apply(undefined, arguments); }
    : function(a) { return func.apply(undefined, arguments); };
}

/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
 * any additional arguments.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @param {number} n The arity cap.
 * @returns {Function} Returns the new function.
 */
function baseAry(func, n) {
  return n == 2
    ? function(a, b) { return func(a, b); }
    : function(a) { return func(a); };
}

/**
 * Creates a clone of `array`.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the cloned array.
 */
function cloneArray(array) {
  var length = array ? array.length : 0,
      result = Array(length);

  while (length--) {
    result[length] = array[length];
  }
  return result;
}

/**
 * Creates a function that clones a given object using the assignment `func`.
 *
 * @private
 * @param {Function} func The assignment function.
 * @returns {Function} Returns the new cloner function.
 */
function createCloner(func) {
  return function(object) {
    return func({}, object);
  };
}

/**
 * A specialized version of `_.spread` which flattens the spread array into
 * the arguments of the invoked `func`.
 *
 * @private
 * @param {Function} func The function to spread arguments over.
 * @param {number} start The start position of the spread.
 * @returns {Function} Returns the new function.
 */
function flatSpread(func, start) {
  return function() {
    var length = arguments.length,
        lastIndex = length - 1,
        args = Array(length);

    while (length--) {
      args[length] = arguments[length];
    }
    var array = args[start],
        otherArgs = args.slice(0, start);

    if (array) {
      push.apply(otherArgs, array);
    }
    if (start != lastIndex) {
      push.apply(otherArgs, args.slice(start + 1));
    }
    return func.apply(this, otherArgs);
  };
}

/**
 * Creates a function that wraps `func` and uses `cloner` to clone the first
 * argument it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} cloner The function to clone arguments.
 * @returns {Function} Returns the new immutable function.
 */
function wrapImmutable(func, cloner) {
  return function() {
    var length = arguments.length;
    if (!length) {
      return;
    }
    var args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var result = args[0] = cloner.apply(undefined, args);
    func.apply(undefined, args);
    return result;
  };
}

/**
 * The base implementation of `convert` which accepts a `util` object of methods
 * required to perform conversions.
 *
 * @param {Object} util The util object.
 * @param {string} name The name of the function to convert.
 * @param {Function} func The function to convert.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
 * @param {boolean} [options.curry=true] Specify currying.
 * @param {boolean} [options.fixed=true] Specify fixed arity.
 * @param {boolean} [options.immutable=true] Specify immutable operations.
 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
 * @returns {Function|Object} Returns the converted function or object.
 */
function baseConvert(util, name, func, options) {
  var setPlaceholder,
      isLib = typeof name == 'function',
      isObj = name === Object(name);

  if (isObj) {
    options = func;
    func = name;
    name = undefined;
  }
  if (func == null) {
    throw new TypeError;
  }
  options || (options = {});

  var config = {
    'cap': 'cap' in options ? options.cap : true,
    'curry': 'curry' in options ? options.curry : true,
    'fixed': 'fixed' in options ? options.fixed : true,
    'immutable': 'immutable' in options ? options.immutable : true,
    'rearg': 'rearg' in options ? options.rearg : true
  };

  var forceCurry = ('curry' in options) && options.curry,
      forceFixed = ('fixed' in options) && options.fixed,
      forceRearg = ('rearg' in options) && options.rearg,
      placeholder = isLib ? func : fallbackHolder,
      pristine = isLib ? func.runInContext() : undefined;

  var helpers = isLib ? func : {
    'ary': util.ary,
    'assign': util.assign,
    'clone': util.clone,
    'curry': util.curry,
    'forEach': util.forEach,
    'isArray': util.isArray,
    'isFunction': util.isFunction,
    'iteratee': util.iteratee,
    'keys': util.keys,
    'rearg': util.rearg,
    'toInteger': util.toInteger,
    'toPath': util.toPath
  };

  var ary = helpers.ary,
      assign = helpers.assign,
      clone = helpers.clone,
      curry = helpers.curry,
      each = helpers.forEach,
      isArray = helpers.isArray,
      isFunction = helpers.isFunction,
      keys = helpers.keys,
      rearg = helpers.rearg,
      toInteger = helpers.toInteger,
      toPath = helpers.toPath;

  var aryMethodKeys = keys(mapping.aryMethod);

  var wrappers = {
    'castArray': function(castArray) {
      return function() {
        var value = arguments[0];
        return isArray(value)
          ? castArray(cloneArray(value))
          : castArray.apply(undefined, arguments);
      };
    },
    'iteratee': function(iteratee) {
      return function() {
        var func = arguments[0],
            arity = arguments[1],
            result = iteratee(func, arity),
            length = result.length;

        if (config.cap && typeof arity == 'number') {
          arity = arity > 2 ? (arity - 2) : 1;
          return (length && length <= arity) ? result : baseAry(result, arity);
        }
        return result;
      };
    },
    'mixin': function(mixin) {
      return function(source) {
        var func = this;
        if (!isFunction(func)) {
          return mixin(func, Object(source));
        }
        var pairs = [];
        each(keys(source), function(key) {
          if (isFunction(source[key])) {
            pairs.push([key, func.prototype[key]]);
          }
        });

        mixin(func, Object(source));

        each(pairs, function(pair) {
          var value = pair[1];
          if (isFunction(value)) {
            func.prototype[pair[0]] = value;
          } else {
            delete func.prototype[pair[0]];
          }
        });
        return func;
      };
    },
    'nthArg': function(nthArg) {
      return function(n) {
        var arity = n < 0 ? 1 : (toInteger(n) + 1);
        return curry(nthArg(n), arity);
      };
    },
    'rearg': function(rearg) {
      return function(func, indexes) {
        var arity = indexes ? indexes.length : 0;
        return curry(rearg(func, indexes), arity);
      };
    },
    'runInContext': function(runInContext) {
      return function(context) {
        return baseConvert(util, runInContext(context), options);
      };
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Casts `func` to a function with an arity capped iteratee if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @returns {Function} Returns the cast function.
   */
  function castCap(name, func) {
    if (config.cap) {
      var indexes = mapping.iterateeRearg[name];
      if (indexes) {
        return iterateeRearg(func, indexes);
      }
      var n = !isLib && mapping.iterateeAry[name];
      if (n) {
        return iterateeAry(func, n);
      }
    }
    return func;
  }

  /**
   * Casts `func` to a curried function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castCurry(name, func, n) {
    return (forceCurry || (config.curry && n > 1))
      ? curry(func, n)
      : func;
  }

  /**
   * Casts `func` to a fixed arity function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the cast function.
   */
  function castFixed(name, func, n) {
    if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
      var data = mapping.methodSpread[name],
          start = data && data.start;

      return start  === undefined ? ary(func, n) : flatSpread(func, start);
    }
    return func;
  }

  /**
   * Casts `func` to an rearged function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castRearg(name, func, n) {
    return (config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name]))
      ? rearg(func, mapping.methodRearg[name] || mapping.aryRearg[n])
      : func;
  }

  /**
   * Creates a clone of `object` by `path`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {Array|string} path The path to clone by.
   * @returns {Object} Returns the cloned object.
   */
  function cloneByPath(object, path) {
    path = toPath(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        result = clone(Object(object)),
        nested = result;

    while (nested != null && ++index < length) {
      var key = path[index],
          value = nested[key];

      if (value != null) {
        nested[path[index]] = clone(index == lastIndex ? value : Object(value));
      }
      nested = nested[key];
    }
    return result;
  }

  /**
   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied.
   *
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function} Returns the converted `lodash`.
   */
  function convertLib(options) {
    return _.runInContext.convert(options)(undefined);
  }

  /**
   * Create a converter function for `func` of `name`.
   *
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @returns {Function} Returns the new converter function.
   */
  function createConverter(name, func) {
    var realName = mapping.aliasToReal[name] || name,
        methodName = mapping.remap[realName] || realName,
        oldOptions = options;

    return function(options) {
      var newUtil = isLib ? pristine : helpers,
          newFunc = isLib ? pristine[methodName] : func,
          newOptions = assign(assign({}, oldOptions), options);

      return baseConvert(newUtil, realName, newFunc, newOptions);
    };
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
   * arguments, ignoring any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap iteratee arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function iterateeAry(func, n) {
    return overArg(func, function(func) {
      return typeof func == 'function' ? baseAry(func, n) : func;
    });
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee with arguments
   * arranged according to the specified `indexes` where the argument value at
   * the first index is provided as the first argument, the argument value at
   * the second index is provided as the second argument, and so on.
   *
   * @private
   * @param {Function} func The function to rearrange iteratee arguments for.
   * @param {number[]} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   */
  function iterateeRearg(func, indexes) {
    return overArg(func, function(func) {
      var n = indexes.length;
      return baseArity(rearg(baseAry(func, n), indexes), n);
    });
  }

  /**
   * Creates a function that invokes `func` with its first argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return func();
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var index = config.rearg ? 0 : (length - 1);
      args[index] = transform(args[index]);
      return func.apply(undefined, args);
    };
  }

  /**
   * Creates a function that wraps `func` and applys the conversions
   * rules by `name`.
   *
   * @private
   * @param {string} name The name of the function to wrap.
   * @param {Function} func The function to wrap.
   * @returns {Function} Returns the converted function.
   */
  function wrap(name, func) {
    var result,
        realName = mapping.aliasToReal[name] || name,
        wrapped = func,
        wrapper = wrappers[realName];

    if (wrapper) {
      wrapped = wrapper(func);
    }
    else if (config.immutable) {
      if (mapping.mutate.array[realName]) {
        wrapped = wrapImmutable(func, cloneArray);
      }
      else if (mapping.mutate.object[realName]) {
        wrapped = wrapImmutable(func, createCloner(func));
      }
      else if (mapping.mutate.set[realName]) {
        wrapped = wrapImmutable(func, cloneByPath);
      }
    }
    each(aryMethodKeys, function(aryKey) {
      each(mapping.aryMethod[aryKey], function(otherName) {
        if (realName == otherName) {
          var data = mapping.methodSpread[realName],
              afterRearg = data && data.afterRearg;

          result = afterRearg
            ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey)
            : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

          result = castCap(realName, result);
          result = castCurry(realName, result, aryKey);
          return false;
        }
      });
      return !result;
    });

    result || (result = wrapped);
    if (result == func) {
      result = forceCurry ? curry(result, 1) : function() {
        return func.apply(this, arguments);
      };
    }
    result.convert = createConverter(realName, func);
    if (mapping.placeholder[realName]) {
      setPlaceholder = true;
      result.placeholder = func.placeholder = placeholder;
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  if (!isObj) {
    return wrap(name, func);
  }
  var _ = func;

  // Convert methods by ary cap.
  var pairs = [];
  each(aryMethodKeys, function(aryKey) {
    each(mapping.aryMethod[aryKey], function(key) {
      var func = _[mapping.remap[key] || key];
      if (func) {
        pairs.push([key, wrap(key, func)]);
      }
    });
  });

  // Convert remaining methods.
  each(keys(_), function(key) {
    var func = _[key];
    if (typeof func == 'function') {
      var length = pairs.length;
      while (length--) {
        if (pairs[length][0] == key) {
          return;
        }
      }
      func.convert = createConverter(key, func);
      pairs.push([key, func]);
    }
  });

  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
  each(pairs, function(pair) {
    _[pair[0]] = pair[1];
  });

  _.convert = convertLib;
  if (setPlaceholder) {
    _.placeholder = placeholder;
  }
  // Assign aliases.
  each(keys(_), function(key) {
    each(mapping.realToAlias[key] || [], function(alias) {
      _[alias] = _[key];
    });
  });

  return _;
}

module.exports = baseConvert;


/***/ }),
/* 131 */
/***/ (function(module, exports) {

/** Used to map aliases to their real names. */
exports.aliasToReal = {

  // Lodash aliases.
  'each': 'forEach',
  'eachRight': 'forEachRight',
  'entries': 'toPairs',
  'entriesIn': 'toPairsIn',
  'extend': 'assignIn',
  'extendAll': 'assignInAll',
  'extendAllWith': 'assignInAllWith',
  'extendWith': 'assignInWith',
  'first': 'head',

  // Methods that are curried variants of others.
  'conforms': 'conformsTo',
  'matches': 'isMatch',
  'property': 'get',

  // Ramda aliases.
  '__': 'placeholder',
  'F': 'stubFalse',
  'T': 'stubTrue',
  'all': 'every',
  'allPass': 'overEvery',
  'always': 'constant',
  'any': 'some',
  'anyPass': 'overSome',
  'apply': 'spread',
  'assoc': 'set',
  'assocPath': 'set',
  'complement': 'negate',
  'compose': 'flowRight',
  'contains': 'includes',
  'dissoc': 'unset',
  'dissocPath': 'unset',
  'dropLast': 'dropRight',
  'dropLastWhile': 'dropRightWhile',
  'equals': 'isEqual',
  'identical': 'eq',
  'indexBy': 'keyBy',
  'init': 'initial',
  'invertObj': 'invert',
  'juxt': 'over',
  'omitAll': 'omit',
  'nAry': 'ary',
  'path': 'get',
  'pathEq': 'matchesProperty',
  'pathOr': 'getOr',
  'paths': 'at',
  'pickAll': 'pick',
  'pipe': 'flow',
  'pluck': 'map',
  'prop': 'get',
  'propEq': 'matchesProperty',
  'propOr': 'getOr',
  'props': 'at',
  'symmetricDifference': 'xor',
  'symmetricDifferenceBy': 'xorBy',
  'symmetricDifferenceWith': 'xorWith',
  'takeLast': 'takeRight',
  'takeLastWhile': 'takeRightWhile',
  'unapply': 'rest',
  'unnest': 'flatten',
  'useWith': 'overArgs',
  'where': 'conformsTo',
  'whereEq': 'isMatch',
  'zipObj': 'zipObject'
};

/** Used to map ary to method names. */
exports.aryMethod = {
  '1': [
    'assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create',
    'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow',
    'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll',
    'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome','rest', 'reverse',
    'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart',
    'uniqueId', 'words', 'zipAll'
  ],
  '2': [
    'add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith',
    'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith',
    'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN',
    'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference',
    'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq',
    'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
    'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach',
    'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get',
    'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection',
    'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy',
    'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty',
    'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit',
    'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial',
    'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll',
    'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
    'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
    'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
    'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight',
    'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars',
    'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith',
    'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject',
    'zipObjectDeep'
  ],
  '3': [
    'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
    'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr',
    'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith',
    'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth',
    'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd',
    'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight',
    'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy',
    'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy',
    'xorWith', 'zipWith'
  ],
  '4': [
    'fill', 'setWith', 'updateWith'
  ]
};

/** Used to map ary to rearg configs. */
exports.aryRearg = {
  '2': [1, 0],
  '3': [2, 0, 1],
  '4': [3, 2, 0, 1]
};

/** Used to map method names to their iteratee ary. */
exports.iterateeAry = {
  'dropRightWhile': 1,
  'dropWhile': 1,
  'every': 1,
  'filter': 1,
  'find': 1,
  'findFrom': 1,
  'findIndex': 1,
  'findIndexFrom': 1,
  'findKey': 1,
  'findLast': 1,
  'findLastFrom': 1,
  'findLastIndex': 1,
  'findLastIndexFrom': 1,
  'findLastKey': 1,
  'flatMap': 1,
  'flatMapDeep': 1,
  'flatMapDepth': 1,
  'forEach': 1,
  'forEachRight': 1,
  'forIn': 1,
  'forInRight': 1,
  'forOwn': 1,
  'forOwnRight': 1,
  'map': 1,
  'mapKeys': 1,
  'mapValues': 1,
  'partition': 1,
  'reduce': 2,
  'reduceRight': 2,
  'reject': 1,
  'remove': 1,
  'some': 1,
  'takeRightWhile': 1,
  'takeWhile': 1,
  'times': 1,
  'transform': 2
};

/** Used to map method names to iteratee rearg configs. */
exports.iterateeRearg = {
  'mapKeys': [1],
  'reduceRight': [1, 0]
};

/** Used to map method names to rearg configs. */
exports.methodRearg = {
  'assignInAllWith': [1, 0],
  'assignInWith': [1, 2, 0],
  'assignAllWith': [1, 0],
  'assignWith': [1, 2, 0],
  'differenceBy': [1, 2, 0],
  'differenceWith': [1, 2, 0],
  'getOr': [2, 1, 0],
  'intersectionBy': [1, 2, 0],
  'intersectionWith': [1, 2, 0],
  'isEqualWith': [1, 2, 0],
  'isMatchWith': [2, 1, 0],
  'mergeAllWith': [1, 0],
  'mergeWith': [1, 2, 0],
  'padChars': [2, 1, 0],
  'padCharsEnd': [2, 1, 0],
  'padCharsStart': [2, 1, 0],
  'pullAllBy': [2, 1, 0],
  'pullAllWith': [2, 1, 0],
  'rangeStep': [1, 2, 0],
  'rangeStepRight': [1, 2, 0],
  'setWith': [3, 1, 2, 0],
  'sortedIndexBy': [2, 1, 0],
  'sortedLastIndexBy': [2, 1, 0],
  'unionBy': [1, 2, 0],
  'unionWith': [1, 2, 0],
  'updateWith': [3, 1, 2, 0],
  'xorBy': [1, 2, 0],
  'xorWith': [1, 2, 0],
  'zipWith': [1, 2, 0]
};

/** Used to map method names to spread configs. */
exports.methodSpread = {
  'assignAll': { 'start': 0 },
  'assignAllWith': { 'start': 0 },
  'assignInAll': { 'start': 0 },
  'assignInAllWith': { 'start': 0 },
  'defaultsAll': { 'start': 0 },
  'defaultsDeepAll': { 'start': 0 },
  'invokeArgs': { 'start': 2 },
  'invokeArgsMap': { 'start': 2 },
  'mergeAll': { 'start': 0 },
  'mergeAllWith': { 'start': 0 },
  'partial': { 'start': 1 },
  'partialRight': { 'start': 1 },
  'without': { 'start': 1 },
  'zipAll': { 'start': 0 }
};

/** Used to identify methods which mutate arrays or objects. */
exports.mutate = {
  'array': {
    'fill': true,
    'pull': true,
    'pullAll': true,
    'pullAllBy': true,
    'pullAllWith': true,
    'pullAt': true,
    'remove': true,
    'reverse': true
  },
  'object': {
    'assign': true,
    'assignAll': true,
    'assignAllWith': true,
    'assignIn': true,
    'assignInAll': true,
    'assignInAllWith': true,
    'assignInWith': true,
    'assignWith': true,
    'defaults': true,
    'defaultsAll': true,
    'defaultsDeep': true,
    'defaultsDeepAll': true,
    'merge': true,
    'mergeAll': true,
    'mergeAllWith': true,
    'mergeWith': true,
  },
  'set': {
    'set': true,
    'setWith': true,
    'unset': true,
    'update': true,
    'updateWith': true
  }
};

/** Used to track methods with placeholder support */
exports.placeholder = {
  'bind': true,
  'bindKey': true,
  'curry': true,
  'curryRight': true,
  'partial': true,
  'partialRight': true
};

/** Used to map real names to their aliases. */
exports.realToAlias = (function() {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      object = exports.aliasToReal,
      result = {};

  for (var key in object) {
    var value = object[key];
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key);
    } else {
      result[value] = [key];
    }
  }
  return result;
}());

/** Used to map method names to other names. */
exports.remap = {
  'assignAll': 'assign',
  'assignAllWith': 'assignWith',
  'assignInAll': 'assignIn',
  'assignInAllWith': 'assignInWith',
  'curryN': 'curry',
  'curryRightN': 'curryRight',
  'defaultsAll': 'defaults',
  'defaultsDeepAll': 'defaultsDeep',
  'findFrom': 'find',
  'findIndexFrom': 'findIndex',
  'findLastFrom': 'findLast',
  'findLastIndexFrom': 'findLastIndex',
  'getOr': 'get',
  'includesFrom': 'includes',
  'indexOfFrom': 'indexOf',
  'invokeArgs': 'invoke',
  'invokeArgsMap': 'invokeMap',
  'lastIndexOfFrom': 'lastIndexOf',
  'mergeAll': 'merge',
  'mergeAllWith': 'mergeWith',
  'padChars': 'pad',
  'padCharsEnd': 'padEnd',
  'padCharsStart': 'padStart',
  'propertyOf': 'get',
  'rangeStep': 'range',
  'rangeStepRight': 'rangeRight',
  'restFrom': 'rest',
  'spreadFrom': 'spread',
  'trimChars': 'trim',
  'trimCharsEnd': 'trimEnd',
  'trimCharsStart': 'trimStart',
  'zipAll': 'zip'
};

/** Used to track methods that skip fixing their arity. */
exports.skipFixed = {
  'castArray': true,
  'flow': true,
  'flowRight': true,
  'iteratee': true,
  'mixin': true,
  'rearg': true,
  'runInContext': true
};

/** Used to track methods that skip rearranging arguments. */
exports.skipRearg = {
  'add': true,
  'assign': true,
  'assignIn': true,
  'bind': true,
  'bindKey': true,
  'concat': true,
  'difference': true,
  'divide': true,
  'eq': true,
  'gt': true,
  'gte': true,
  'isEqual': true,
  'lt': true,
  'lte': true,
  'matchesProperty': true,
  'merge': true,
  'multiply': true,
  'overArgs': true,
  'partial': true,
  'partialRight': true,
  'propertyOf': true,
  'random': true,
  'range': true,
  'rangeRight': true,
  'subtract': true,
  'zip': true,
  'zipObject': true,
  'zipObjectDeep': true
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  'ary': __webpack_require__(133),
  'assign': __webpack_require__(83),
  'clone': __webpack_require__(171),
  'curry': __webpack_require__(216),
  'forEach': __webpack_require__(37),
  'isArray': __webpack_require__(2),
  'isFunction': __webpack_require__(33),
  'iteratee': __webpack_require__(217),
  'keys': __webpack_require__(88),
  'rearg': __webpack_require__(241),
  'toInteger': __webpack_require__(82),
  'toPath': __webpack_require__(247)
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var createWrap = __webpack_require__(31);

/** Used to compose bitmasks for function metadata. */
var WRAP_ARY_FLAG = 128;

/**
 * Creates a function that invokes `func`, with up to `n` arguments,
 * ignoring any additional arguments.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} func The function to cap arguments for.
 * @param {number} [n=func.length] The arity cap.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new capped function.
 * @example
 *
 * _.map(['6', '8', '10'], _.ary(parseInt, 1));
 * // => [6, 8, 10]
 */
function ary(func, n, guard) {
  n = guard ? undefined : n;
  n = (func && n == null) ? func.length : n;
  return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
}

module.exports = ary;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(33),
    isMasked = __webpack_require__(137),
    isObject = __webpack_require__(5),
    toSource = __webpack_require__(69);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(8);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 136 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(138);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 139 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var createCtor = __webpack_require__(16),
    root = __webpack_require__(1);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

module.exports = createBind;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(34),
    createCtor = __webpack_require__(16),
    createHybrid = __webpack_require__(70),
    createRecurry = __webpack_require__(73),
    getHolder = __webpack_require__(81),
    replaceHolders = __webpack_require__(39),
    root = __webpack_require__(1);

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

module.exports = createCurry;


/***/ }),
/* 142 */
/***/ (function(module, exports) {

/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }
  return result;
}

module.exports = countHolders;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(35),
    getData = __webpack_require__(74),
    getFuncName = __webpack_require__(145),
    lodash = __webpack_require__(147);

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(func) {
  var funcName = getFuncName(func),
      other = lodash[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData(other);
  return !!data && func === data[0];
}

module.exports = isLaziable;


/***/ }),
/* 144 */
/***/ (function(module, exports) {

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var realNames = __webpack_require__(146);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
  var result = (func.name + ''),
      array = realNames[result],
      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

module.exports = getFuncName;


/***/ }),
/* 146 */
/***/ (function(module, exports) {

/** Used to lookup unminified function names. */
var realNames = {};

module.exports = realNames;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(35),
    LodashWrapper = __webpack_require__(75),
    baseLodash = __webpack_require__(36),
    isArray = __webpack_require__(2),
    isObjectLike = __webpack_require__(9),
    wrapperClone = __webpack_require__(148);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps `value` to enable implicit method
 * chain sequences. Methods that operate on and return arrays, collections,
 * and functions can be chained together. Methods that retrieve a single value
 * or may return a primitive value will automatically end the chain sequence
 * and return the unwrapped value. Otherwise, the value must be unwrapped
 * with `_#value`.
 *
 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
 * enabled using `_.chain`.
 *
 * The execution of chained methods is lazy, that is, it's deferred until
 * `_#value` is implicitly or explicitly called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion.
 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
 * the creation of intermediate arrays and can greatly reduce the number of
 * iteratee executions. Sections of a chain sequence qualify for shortcut
 * fusion if the section is applied to an array and iteratees accept only
 * one argument. The heuristic for whether a section qualifies for shortcut
 * fusion is subject to change.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers have `Array` and `String` methods.
 *
 * The wrapper `Array` methods are:
 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
 *
 * The wrapper `String` methods are:
 * `replace` and `split`
 *
 * The wrapper methods that support shortcut fusion are:
 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
 *
 * The chainable wrapper methods are:
 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
 * `zipObject`, `zipObjectDeep`, and `zipWith`
 *
 * The wrapper methods that are **not** chainable by default are:
 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
 * `upperFirst`, `value`, and `words`
 *
 * @name _
 * @constructor
 * @category Seq
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // Returns an unwrapped value.
 * wrapped.reduce(_.add);
 * // => 6
 *
 * // Returns a wrapped value.
 * var squares = wrapped.map(square);
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash(value) {
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

module.exports = lodash;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var LazyWrapper = __webpack_require__(35),
    LodashWrapper = __webpack_require__(75),
    copyArray = __webpack_require__(18);

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__  = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

module.exports = wrapperClone;


/***/ }),
/* 149 */
/***/ (function(module, exports) {

/** Used to match wrap detail comments. */
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

module.exports = getWrapDetails;


/***/ }),
/* 150 */
/***/ (function(module, exports) {

/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

module.exports = insertWrapDetails;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(152),
    defineProperty = __webpack_require__(80),
    identity = __webpack_require__(32);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 152 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var arrayEach = __webpack_require__(37),
    arrayIncludes = __webpack_require__(154);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256,
    WRAP_FLIP_FLAG = 512;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [
  ['ary', WRAP_ARY_FLAG],
  ['bind', WRAP_BIND_FLAG],
  ['bindKey', WRAP_BIND_KEY_FLAG],
  ['curry', WRAP_CURRY_FLAG],
  ['curryRight', WRAP_CURRY_RIGHT_FLAG],
  ['flip', WRAP_FLIP_FLAG],
  ['partial', WRAP_PARTIAL_FLAG],
  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
  ['rearg', WRAP_REARG_FLAG]
];

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = '_.' + pair[0];
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

module.exports = updateWrapDetails;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(155);

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(156),
    baseIsNaN = __webpack_require__(157),
    strictIndexOf = __webpack_require__(158);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),
/* 156 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),
/* 157 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),
/* 158 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var copyArray = __webpack_require__(18),
    isIndex = __webpack_require__(38);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

module.exports = reorder;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(34),
    createCtor = __webpack_require__(16),
    root = __webpack_require__(1);

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartial;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var composeArgs = __webpack_require__(71),
    composeArgsRight = __webpack_require__(72),
    replaceHolders = __webpack_require__(39);

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers used to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and
 * `_.rearg` modify function arguments, making the order in which they are
 * executed important, preventing the merging of metadata. However, we make
 * an exception for a safe combined case where curried functions have `_.ary`
 * and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask,
      isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

  var isCombo =
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
    ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

  // Exit early if metadata can't be merged.
  if (!(isCommon || isCombo)) {
    return data;
  }
  // Use source `thisArg` if available.
  if (srcBitmask & WRAP_BIND_FLAG) {
    data[2] = source[2];
    // Set when currying a bound function.
    newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
  }
  // Compose partial arguments.
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
  }
  // Use source `argPos` if available.
  value = source[7];
  if (value) {
    data[7] = value;
  }
  // Use source `ary` if it's smaller.
  if (srcBitmask & WRAP_ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
  }
  // Use source `arity` if one is not provided.
  if (data[9] == null) {
    data[9] = source[9];
  }
  // Use source `func` and merge bitmasks.
  data[0] = source[0];
  data[1] = newBitmask;

  return data;
}

module.exports = mergeData;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var toNumber = __webpack_require__(163);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5),
    isSymbol = __webpack_require__(13);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 164 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(12),
    isObjectLike = __webpack_require__(9);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 166 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(12),
    isLength = __webpack_require__(44),
    isObjectLike = __webpack_require__(9);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 168 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(68);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)(module)))

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(89);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(91);

/** Used to compose bitmasks for cloning. */
var CLONE_SYMBOLS_FLAG = 4;

/**
 * Creates a shallow clone of `value`.
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
 * and supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
 * arrays. The own enumerable properties of `arguments` objects are cloned
 * as plain objects. An empty object is returned for uncloneable values such
 * as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to clone.
 * @returns {*} Returns the cloned value.
 * @see _.cloneDeep
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var shallow = _.clone(objects);
 * console.log(shallow[0] === objects[0]);
 * // => true
 */
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG);
}

module.exports = clone;


/***/ }),
/* 172 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(22);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(22);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(22);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(22);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(21);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 178 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 179 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 180 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(21),
    Map = __webpack_require__(47),
    MapCache = __webpack_require__(48);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(183),
    ListCache = __webpack_require__(21),
    Map = __webpack_require__(47);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(184),
    hashDelete = __webpack_require__(185),
    hashGet = __webpack_require__(186),
    hashHas = __webpack_require__(187),
    hashSet = __webpack_require__(188);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(23);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 185 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(23);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(23);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(23);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(24);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 190 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(24);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(24);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(24);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(19),
    keysIn = __webpack_require__(92);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5),
    isPrototype = __webpack_require__(45),
    nativeKeysIn = __webpack_require__(196);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 196 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(1);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)(module)))

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(19),
    getSymbols = __webpack_require__(49);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),
/* 199 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(19),
    getSymbolsIn = __webpack_require__(94);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(97),
    getSymbolsIn = __webpack_require__(94),
    keysIn = __webpack_require__(92);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 205 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(51),
    cloneDataView = __webpack_require__(207),
    cloneMap = __webpack_require__(208),
    cloneRegExp = __webpack_require__(210),
    cloneSet = __webpack_require__(211),
    cloneSymbol = __webpack_require__(213),
    cloneTypedArray = __webpack_require__(214);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(51);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

var addMapEntry = __webpack_require__(209),
    arrayReduce = __webpack_require__(52),
    mapToArray = __webpack_require__(100);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

module.exports = cloneMap;


/***/ }),
/* 209 */
/***/ (function(module, exports) {

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

module.exports = addMapEntry;


/***/ }),
/* 210 */
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

var addSetEntry = __webpack_require__(212),
    arrayReduce = __webpack_require__(52),
    setToArray = __webpack_require__(101);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

module.exports = cloneSet;


/***/ }),
/* 212 */
/***/ (function(module, exports) {

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

module.exports = addSetEntry;


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(8);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(51);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(17),
    getPrototype = __webpack_require__(95),
    isPrototype = __webpack_require__(45);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

var createWrap = __webpack_require__(31);

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG = 8;

/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = _.curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 */
function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}

// Assign default placeholders.
curry.placeholder = {};

module.exports = curry;


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(91),
    baseIteratee = __webpack_require__(218);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a function that invokes `func` with the arguments of the created
 * function. If `func` is a property name, the created function returns the
 * property value for a given element. If `func` is an array or object, the
 * created function returns `true` for elements that contain the equivalent
 * source properties, otherwise it returns `false`.
 *
 * @static
 * @since 4.0.0
 * @memberOf _
 * @category Util
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @returns {Function} Returns the callback.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
 * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, _.iteratee(['user', 'fred']));
 * // => [{ 'user': 'fred', 'age': 40 }]
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, _.iteratee('user'));
 * // => ['barney', 'fred']
 *
 * // Create custom iteratee shorthands.
 * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
 *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
 *     return func.test(string);
 *   };
 * });
 *
 * _.filter(['abc', 'def'], /ef/);
 * // => ['def']
 */
function iteratee(func) {
  return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
}

module.exports = iteratee;


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__(219),
    baseMatchesProperty = __webpack_require__(230),
    identity = __webpack_require__(32),
    isArray = __webpack_require__(2),
    property = __webpack_require__(238);

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(220),
    getMatchData = __webpack_require__(229),
    matchesStrictComparable = __webpack_require__(105);

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(46),
    baseIsEqual = __webpack_require__(102);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(46),
    equalArrays = __webpack_require__(103),
    equalByTag = __webpack_require__(227),
    equalObjects = __webpack_require__(228),
    getTag = __webpack_require__(98),
    isArray = __webpack_require__(2),
    isBuffer = __webpack_require__(42),
    isTypedArray = __webpack_require__(87);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(48),
    setCacheAdd = __webpack_require__(223),
    setCacheHas = __webpack_require__(224);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),
/* 223 */
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),
/* 224 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),
/* 225 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),
/* 226 */
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(8),
    Uint8Array = __webpack_require__(99),
    eq = __webpack_require__(40),
    equalArrays = __webpack_require__(103),
    mapToArray = __webpack_require__(100),
    setToArray = __webpack_require__(101);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(96);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(104),
    keys = __webpack_require__(20);

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(102),
    get = __webpack_require__(231),
    hasIn = __webpack_require__(235),
    isKey = __webpack_require__(53),
    isStrictComparable = __webpack_require__(104),
    matchesStrictComparable = __webpack_require__(105),
    toKey = __webpack_require__(14);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(106);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(233);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(48);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(8),
    arrayMap = __webpack_require__(109),
    isArray = __webpack_require__(2),
    isSymbol = __webpack_require__(13);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(236),
    hasPath = __webpack_require__(237);

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ }),
/* 236 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(107),
    isArguments = __webpack_require__(41),
    isArray = __webpack_require__(2),
    isIndex = __webpack_require__(38),
    isLength = __webpack_require__(44),
    toKey = __webpack_require__(14);

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(239),
    basePropertyDeep = __webpack_require__(240),
    isKey = __webpack_require__(53),
    toKey = __webpack_require__(14);

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ }),
/* 239 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(106);

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var createWrap = __webpack_require__(31),
    flatRest = __webpack_require__(242);

/** Used to compose bitmasks for function metadata. */
var WRAP_REARG_FLAG = 256;

/**
 * Creates a function that invokes `func` with arguments arranged according
 * to the specified `indexes` where the argument value at the first index is
 * provided as the first argument, the argument value at the second index is
 * provided as the second argument, and so on.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} func The function to rearrange arguments for.
 * @param {...(number|number[])} indexes The arranged argument indexes.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var rearged = _.rearg(function(a, b, c) {
 *   return [a, b, c];
 * }, [2, 0, 1]);
 *
 * rearged('b', 'c', 'a')
 * // => ['a', 'b', 'c']
 */
var rearg = flatRest(function(func, indexes) {
  return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
});

module.exports = rearg;


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var flatten = __webpack_require__(243),
    overRest = __webpack_require__(246),
    setToString = __webpack_require__(79);

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__(244);

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(50),
    isFlattenable = __webpack_require__(245);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(8),
    isArguments = __webpack_require__(41),
    isArray = __webpack_require__(2);

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(34);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(109),
    copyArray = __webpack_require__(18),
    isArray = __webpack_require__(2),
    isSymbol = __webpack_require__(13),
    stringToPath = __webpack_require__(108),
    toKey = __webpack_require__(14),
    toString = __webpack_require__(25);

/**
 * Converts `value` to a property path array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {*} value The value to convert.
 * @returns {Array} Returns the new property path array.
 * @example
 *
 * _.toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * _.toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 */
function toPath(value) {
  if (isArray(value)) {
    return arrayMap(value, toKey);
  }
  return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
}

module.exports = toPath;


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var createCompounder = __webpack_require__(249);

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

module.exports = kebabCase;


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var arrayReduce = __webpack_require__(52),
    deburr = __webpack_require__(250),
    words = __webpack_require__(253);

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

module.exports = createCompounder;


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var deburrLetter = __webpack_require__(251),
    toString = __webpack_require__(25);

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

module.exports = deburr;


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var basePropertyOf = __webpack_require__(252);

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

module.exports = deburrLetter;


/***/ }),
/* 252 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

module.exports = basePropertyOf;


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

var asciiWords = __webpack_require__(254),
    hasUnicodeWord = __webpack_require__(255),
    toString = __webpack_require__(25),
    unicodeWords = __webpack_require__(256);

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = words;


/***/ }),
/* 254 */
/***/ (function(module, exports) {

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

module.exports = asciiWords;


/***/ }),
/* 255 */
/***/ (function(module, exports) {

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

module.exports = hasUnicodeWord;


/***/ }),
/* 256 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)',
    rsOrdUpper = '\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

module.exports = unicodeWords;


/***/ }),
/* 257 */
/***/ (function(module, exports) {

module.exports = {
  'cap': false,
  'curry': false,
  'fixed': false,
  'immutable': false,
  'rearg': false
};


/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_polymer_element__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polymer_paper_button_paper_button_js__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polymer_iron_resizable_behavior_iron_resizable_behavior__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polymer_polymer_lib_utils_async__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_template_html__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_template_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__app_template_html__);

// Element is the same as Polymer.Element in 2.x
// Modules give you the freedom to rename the members that you import




// import { MyEmpList }  from '../emp-list/emp-list';
// import * as kebabCase from 'lodash/fp/kebabCase'; 


// Async.microTask.run(callback);

// Added "export" to export the MyApp symbol from the module
class MyApp extends __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_polymer_element__["a" /* Element */] {

    // Define a string template instead of a `<template>` element.
    static get template() {
        return __WEBPACK_IMPORTED_MODULE_4__app_template_html___default.a;
    }

    constructor() {
        super();
    }

    // properties, observers, etc. are identical to 2.x
    static get properties() {
        return {
            name: {
                type: String,
                value: 'jecelyn'
            },
            owner: {
                type: String,
                value: "Daniel",
            }
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MyApp;


// customElements.define(kebabCase('MyApp'), MyApp);

/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_case_map_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_async_js__ = __webpack_require__(6);





let caseMap = __WEBPACK_IMPORTED_MODULE_2__utils_case_map_js__;

let microtask = __WEBPACK_IMPORTED_MODULE_3__utils_async_js__["a" /* microTask */];

// Save map of native properties; this forms a blacklist or properties
// that won't have their values "saved" by `saveAccessorValue`, since
// reading from an HTMLElement accessor from the context of a prototype throws
const nativeProperties = {};
let proto = HTMLElement.prototype;
while (proto) {
  let props = Object.getOwnPropertyNames(proto);
  for (let i=0; i<props.length; i++) {
    nativeProperties[props[i]] = true;
  }
  proto = Object.getPrototypeOf(proto);
}

/**
 * Used to save the value of a property that will be overridden with
 * an accessor. If the `model` is a prototype, the values will be saved
 * in `__dataProto`, and it's up to the user (or downstream mixin) to
 * decide how/when to set these values back into the accessors.
 * If `model` is already an instance (it has a `__data` property), then
 * the value will be set as a pending property, meaning the user should
 * call `_invalidateProperties` or `_flushProperties` to take effect
 *
 * @param {Object} model Prototype or instance
 * @param {string} property Name of property
 * @private
 */
function saveAccessorValue(model, property) {
  // Don't read/store value for any native properties since they could throw
  if (!nativeProperties[property]) {
    let value = model[property];
    if (value !== undefined) {
      if (model.__data) {
        // Adding accessor to instance; update the property
        // It is the user's responsibility to call _flushProperties
        model._setPendingProperty(property, value);
      } else {
        // Adding accessor to proto; save proto's value for instance-time use
        if (!model.__dataProto) {
          model.__dataProto = {};
        } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
          model.__dataProto = Object.create(model.__dataProto);
        }
        model.__dataProto[property] = value;
      }
    }
  }
}

const PropertyAccessors = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_PropertyAccessors}
   * @extends HTMLElement
   * @unrestricted
   */
  class PropertyAccessors extends superClass {

    /**
     * Generates property accessors for all attributes in the standard
     * static `observedAttributes` array.
     *
     * Attribute names are mapped to property names using the `dash-case` to
     * `camelCase` convention
     *
     */
    static createPropertiesForAttributes() {
      let a$ = this.observedAttributes;
      for (let i=0; i < a$.length; i++) {
        this.prototype._createPropertyAccessor(caseMap.dashToCamelCase(a$[i]));
      }
    }

    constructor() {
      super();
      /** @type {boolean} */
      this.__serializing;
      /** @type {number} */
      this.__dataCounter;
      /** @type {boolean} */
      this.__dataEnabled;
      /** @type {boolean} */
      this.__dataReady;
      /** @type {boolean} */
      this.__dataInvalid;
      /** @type {!Object} */
      this.__data;
      /** @type {Object} */
      this.__dataPending;
      /** @type {Object} */
      this.__dataOld;
      /** @type {Object} */
      this.__dataProto;
      /** @type {Object} */
      this.__dataHasAccessor;
      /** @type {Object} */
      this.__dataInstanceProps;
      this._initializeProperties();
    }

    /**
     * Implements native Custom Elements `attributeChangedCallback` to
     * set an attribute value to a property via `_attributeToProperty`.
     *
     * @param {string} name Name of attribute that changed
     * @param {?string} old Old attribute value
     * @param {?string} value New attribute value
     */
    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }
    }

    /**
     * Initializes the local storage for property accessors.
     *
     * Provided as an override point for performing any setup work prior
     * to initializing the property accessor system.
     *
     * @protected
     */
    _initializeProperties() {
      this.__serializing = false;
      this.__dataCounter = 0;
      this.__dataEnabled = false;
      this.__dataReady = false;
      this.__dataInvalid = false;
      this.__data = {};
      this.__dataPending = null;
      this.__dataOld = null;
      if (this.__dataProto) {
        this._initializeProtoProperties(this.__dataProto);
        this.__dataProto = null;
      }
      // Capture instance properties; these will be set into accessors
      // during first flush. Don't set them here, since we want
      // these to overwrite defaults/constructor assignments
      for (let p in this.__dataHasAccessor) {
        if (this.hasOwnProperty(p)) {
          this.__dataInstanceProps = this.__dataInstanceProps || {};
          this.__dataInstanceProps[p] = this[p];
          delete this[p];
        }
      }
    }

    /**
     * Called at instance time with bag of properties that were overwritten
     * by accessors on the prototype when accessors were created.
     *
     * The default implementation sets these properties back into the
     * setter at instance time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @protected
     */
    _initializeProtoProperties(props) {
      for (let p in props) {
        this._setProperty(p, props[p]);
      }
    }

    /**
     * Called at ready time with bag of instance properties that overwrote
     * accessors when the element upgraded.
     *
     * The default implementation sets these properties back into the
     * setter at ready time.  This method is provided as an override
     * point for customizing or providing more efficient initialization.
     *
     * @param {Object} props Bag of property values that were overwritten
     *   when creating property accessors.
     * @protected
     */
    _initializeInstanceProperties(props) {
      Object.assign(this, props);
    }

    /**
     * Ensures the element has the given attribute. If it does not,
     * assigns the given value to the attribute.
     *
     *
     * @param {string} attribute Name of attribute to ensure is set.
     * @param {string} value of the attribute.
     */
    _ensureAttribute(attribute, value) {
      if (!this.hasAttribute(attribute)) {
        this._valueToNodeAttribute(this, value, attribute);
      }
    }

    /**
     * Deserializes an attribute to its associated property.
     *
     * This method calls the `_deserializeValue` method to convert the string to
     * a typed value.
     *
     * @param {string} attribute Name of attribute to deserialize.
     * @param {?string} value of the attribute.
     * @param {*=} type type to deserialize to.
     */
    _attributeToProperty(attribute, value, type) {
      // Don't deserialize back to property if currently reflecting
      if (!this.__serializing) {
        let property = caseMap.dashToCamelCase(attribute);
        this[property] = this._deserializeValue(value, type);
      }
    }

    /**
     * Serializes a property to its associated attribute.
     *
     * @param {string} property Property name to reflect.
     * @param {string=} attribute Attribute name to reflect.
     * @param {*=} value Property value to refect.
     */
    _propertyToAttribute(property, attribute, value) {
      this.__serializing = true;
      value = (arguments.length < 3) ? this[property] : value;
      this._valueToNodeAttribute(this, value,
        attribute || caseMap.camelToDashCase(property));
      this.__serializing = false;
    }

    /**
     * Sets a typed value to an HTML attribute on a node.
     *
     * This method calls the `_serializeValue` method to convert the typed
     * value to a string.  If the `_serializeValue` method returns `undefined`,
     * the attribute will be removed (this is the default for boolean
     * type `false`).
     *
     * @param {Element} node Element to set attribute to.
     * @param {*} value Value to serialize.
     * @param {string} attribute Attribute name to serialize to.
     */
    _valueToNodeAttribute(node, value, attribute) {
      let str = this._serializeValue(value);
      if (str === undefined) {
        node.removeAttribute(attribute);
      } else {
        node.setAttribute(attribute, str);
      }
    }

    /**
     * Converts a typed JavaScript value to a string.
     *
     * This method is called by Polymer when setting JS property values to
     * HTML attributes.  Users may override this method on Polymer element
     * prototypes to provide serialization for custom types.
     *
     * @param {*} value Property value to serialize.
     * @return {string | undefined} String serialized from the provided property value.
     */
    _serializeValue(value) {
      /* eslint-disable no-fallthrough */
      switch (typeof value) {
        case 'boolean':
          return value ? '' : undefined;

        case 'object':
          if (value instanceof Date) {
            return value.toString();
          } else if (value) {
            try {
              return JSON.stringify(value);
            } catch(x) {
              return '';
            }
          }

        default:
          return value != null ? value.toString() : undefined;
      }
    }

    /**
     * Converts a string to a typed JavaScript value.
     *
     * This method is called by Polymer when reading HTML attribute values to
     * JS properties.  Users may override this method on Polymer element
     * prototypes to provide deserialization for custom `type`s.  Note,
     * the `type` argument is the value of the `type` field provided in the
     * `properties` configuration object for a given property, and is
     * by convention the constructor for the type to deserialize.
     *
     * Note: The return value of `undefined` is used as a sentinel value to
     * indicate the attribute should be removed.
     *
     * @param {?string} value Attribute value to deserialize.
     * @param {*=} type Type to deserialize the string to.
     * @return {*} Typed value deserialized from the provided string.
     */
    _deserializeValue(value, type) {
      /**
       * @type {*}
       */
      let outValue;
      switch (type) {
        case Number:
          outValue = Number(value);
          break;

        case Boolean:
          outValue = (value !== null);
          break;

        case Object:
          try {
            outValue = JSON.parse(/** @type string */(value));
          } catch(x) {
            // allow non-JSON literals like Strings and Numbers
          }
          break;

        case Array:
          try {
            outValue = JSON.parse(/** @type string */(value));
          } catch(x) {
            outValue = null;
            console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${value}`);
          }
          break;

        case Date:
          outValue = new Date(value);
          break;

        case String:
        default:
          outValue = value;
          break;
      }

      return outValue;
    }
    /* eslint-enable no-fallthrough */

    /**
     * Creates a setter/getter pair for the named property with its own
     * local storage.  The getter returns the value in the local storage,
     * and the setter calls `_setProperty`, which updates the local storage
     * for the property and enqueues a `_propertiesChanged` callback.
     *
     * This method may be called on a prototype or an instance.  Calling
     * this method may overwrite a property value that already exists on
     * the prototype/instance by creating the accessor.  When calling on
     * a prototype, any overwritten values are saved in `__dataProto`,
     * and it is up to the subclasser to decide how/when to set those
     * properties back into the accessor.  When calling on an instance,
     * the overwritten value is set via `_setPendingProperty`, and the
     * user should call `_invalidateProperties` or `_flushProperties`
     * for the values to take effect.
     *
     * @param {string} property Name of the property
     * @param {boolean=} readOnly When true, no setter is created; the
     *   protected `_setProperty` function must be used to set the property
     * @protected
     */
    _createPropertyAccessor(property, readOnly) {
      if (!this.hasOwnProperty('__dataHasAccessor')) {
        this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
      }
      if (!this.__dataHasAccessor[property]) {
        this.__dataHasAccessor[property] = true;
        saveAccessorValue(this, property);
        Object.defineProperty(this, property, {
          /* eslint-disable valid-jsdoc */
          /** @this {PropertyAccessors} */
          get: function() {
            return this.__data[property];
          },
          /** @this {PropertyAccessors} */
          set: readOnly ? function() {} : function(value) {
            this._setProperty(property, value);
          }
          /* eslint-enable */
        });
      }
    }

    /**
     * Returns true if this library created an accessor for the given property.
     *
     * @param {string} property Property name
     * @return {boolean} True if an accessor was created
     */
    _hasAccessor(property) {
      return this.__dataHasAccessor && this.__dataHasAccessor[property];
    }

    /**
     * Updates the local storage for a property (via `_setPendingProperty`)
     * and enqueues a `_proeprtiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @protected
     */
    _setProperty(property, value) {
      if (this._setPendingProperty(property, value)) {
        this._invalidateProperties();
      }
    }

    /**
     * Updates the local storage for a property, records the previous value,
     * and adds it to the set of "pending changes" that will be passed to the
     * `_propertiesChanged` callback.  This method does not enqueue the
     * `_propertiesChanged` callback.
     *
     * @param {string} property Name of the property
     * @param {*} value Value to set
     * @return {boolean} Returns true if the property changed
     * @protected
     */
    _setPendingProperty(property, value) {
      let old = this.__data[property];
      let changed = this._shouldPropertyChange(property, value, old);
      if (changed) {
        if (!this.__dataPending) {
          this.__dataPending = {};
          this.__dataOld = {};
        }
        // Ensure old is captured from the last turn
        if (this.__dataOld && !(property in this.__dataOld)) {
          this.__dataOld[property] = old;
        }
        this.__data[property] = value;
        this.__dataPending[property] = value;
      }
      return changed;
    }

    /**
     * Returns true if the specified property has a pending change.
     *
     * @param {string} prop Property name
     * @return {boolean} True if property has a pending change
     * @protected
     */
    _isPropertyPending(prop) {
      return Boolean(this.__dataPending && (prop in this.__dataPending));
    }

    /**
     * Marks the properties as invalid, and enqueues an async
     * `_propertiesChanged` callback.
     *
     * @protected
     */
    _invalidateProperties() {
      if (!this.__dataInvalid && this.__dataReady) {
        this.__dataInvalid = true;
        microtask.run(() => {
          if (this.__dataInvalid) {
            this.__dataInvalid = false;
            this._flushProperties();
          }
        });
      }
    }

    /**
     * Call to enable property accessor processing. Before this method is
     * called accessor values will be set but side effects are
     * queued. When called, any pending side effects occur immediately.
     * For elements, generally `connectedCallback` is a normal spot to do so.
     * It is safe to call this method multiple times as it only turns on
     * property accessors once.
     */
    _enableProperties() {
      if (!this.__dataEnabled) {
        this.__dataEnabled = true;
        if (this.__dataInstanceProps) {
          this._initializeInstanceProperties(this.__dataInstanceProps);
          this.__dataInstanceProps = null;
        }
        this.ready();
      }
    }

    /**
     * Calls the `_propertiesChanged` callback with the current set of
     * pending changes (and old values recorded when pending changes were
     * set), and resets the pending set of changes. Generally, this method
     * should not be called in user code.
     *
     *
     * @protected
     */
    _flushProperties() {
      if (this.__dataPending && this.__dataOld) {
        let changedProps = this.__dataPending;
        this.__dataPending = null;
        this.__dataCounter++;
        this._propertiesChanged(this.__data, changedProps, this.__dataOld);
        this.__dataCounter--;
      }
    }

    /**
     * Lifecycle callback called the first time properties are being flushed.
     * Prior to `ready`, all property sets through accessors are queued and
     * their effects are flushed after this method returns.
     *
     * Users may override this function to implement behavior that is
     * dependent on the element having its properties initialized, e.g.
     * from defaults (initialized from `constructor`, `_initializeProperties`),
     * `attributeChangedCallback`, or values propagated from host e.g. via
     * bindings.  `super.ready()` must be called to ensure the data system
     * becomes enabled.
     *
     * @public
     */
    ready() {
      this.__dataReady = true;
      // Run normal flush
      this._flushProperties();
    }

    /**
     * Callback called when any properties with accessors created via
     * `_createPropertyAccessor` have been set.
     *
     * @param {!Object} currentProps Bag of all current accessor values
     * @param {!Object} changedProps Bag of properties changed since the last
     *   call to `_propertiesChanged`
     * @param {!Object} oldProps Bag of previous values for each property
     *   in `changedProps`
     * @protected
     */
    _propertiesChanged(currentProps, changedProps, oldProps) { // eslint-disable-line no-unused-vars
    }

    /**
     * Method called to determine whether a property value should be
     * considered as a change and cause the `_propertiesChanged` callback
     * to be enqueued.
     *
     * The default implementation returns `true` for primitive types if a
     * strict equality check fails, and returns `true` for all Object/Arrays.
     * The method always returns false for `NaN`.
     *
     * Override this method to e.g. provide stricter checking for
     * Objects/Arrays when using immutable patterns.
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     *   and enqueue a `_proeprtiesChanged` callback
     * @protected
     */
    _shouldPropertyChange(property, value, old) {
      return (
        // Strict equality check
        (old !== value &&
         // This ensures (old==NaN, value==NaN) always returns false
         (old === old || value === value))
      );
    }

  }

  return PropertyAccessors;

});
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyAccessors;



/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(4);



// 1.x backwards-compatible auto-wrapper for template type extensions
// This is a clear layering violation and gives favored-nation status to
// dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
// a.) to ease 1.x backwards-compatibility due to loss of `is`, and
// b.) to maintain if/repeat capability in parser-constrained elements
//     (e.g. table, select) in lieu of native CE type extensions without
//     massive new invention in this space (e.g. directive system)
const templateExtensions = {
  'dom-if': true,
  'dom-repeat': true
};
function wrapTemplateExtension(node) {
  let is = node.getAttribute('is');
  if (is && templateExtensions[is]) {
    let t = node;
    t.removeAttribute('is');
    node = t.ownerDocument.createElement(is);
    t.parentNode.replaceChild(node, t);
    node.appendChild(t);
    while(t.attributes.length) {
      node.setAttribute(t.attributes[0].name, t.attributes[0].value);
      t.removeAttribute(t.attributes[0].name);
    }
  }
  return node;
}

function findTemplateNode(root, nodeInfo) {
  // recursively ascend tree until we hit root
  let parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
  // unwind the stack, returning the indexed node at each level
  if (parent) {
    // note: marginally faster than indexing via childNodes
    // (http://jsperf.com/childnodes-lookup)
    for (let n=parent.firstChild, i=0; n; n=n.nextSibling) {
      if (nodeInfo.parentIndex === i++) {
        return n;
      }
    }
  } else {
    return root;
  }
}

// construct `$` map (from id annotations)
function applyIdToMap(inst, map, node, nodeInfo) {
  if (nodeInfo.id) {
    map[nodeInfo.id] = node;
  }
}

// install event listeners (from event annotations)
function applyEventListener(inst, node, nodeInfo) {
  if (nodeInfo.events && nodeInfo.events.length) {
    for (let j=0, e$=nodeInfo.events, e; (j<e$.length) && (e=e$[j]); j++) {
      inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
    }
  }
}

// push configuration references at configure time
function applyTemplateContent(inst, node, nodeInfo) {
  if (nodeInfo.templateInfo) {
    node._templateInfo = nodeInfo.templateInfo;
  }
}

function createNodeEventHandler(context, eventName, methodName) {
  // Instances can optionally have a _methodHost which allows redirecting where
  // to find methods. Currently used by `templatize`.
  context = context._methodHost || context;
  let handler = function(e) {
    if (context[methodName]) {
      context[methodName](e, e.detail);
    } else {
      console.warn('listener method `' + methodName + '` not defined');
    }
  };
  return handler;
}

const TemplateStamp = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_TemplateStamp}
   */
  class TemplateStamp extends superClass {

    /**
     * Scans a template to produce template metadata.
     *
     * Template-specific metadata are stored in the object returned, and node-
     * specific metadata are stored in objects in its flattened `nodeInfoList`
     * array.  Only nodes in the template that were parsed as nodes of
     * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
     * contains an `index` (`childNodes` index in parent) and optionally
     * `parent`, which points to node info of its parent (including its index).
     *
     * The template metadata object returned from this method has the following
     * structure (many fields optional):
     *
     * ```js
     *   {
     *     // Flattened list of node metadata (for nodes that generated metadata)
     *     nodeInfoList: [
     *       {
     *         // `id` attribute for any nodes with id's for generating `$` map
     *         id: {string},
     *         // `on-event="handler"` metadata
     *         events: [
     *           {
     *             name: {string},   // event name
     *             value: {string},  // handler method name
     *           }, ...
     *         ],
     *         // Notes when the template contained a `<slot>` for shady DOM
     *         // optimization purposes
     *         hasInsertionPoint: {boolean},
     *         // For nested `<template>`` nodes, nested template metadata
     *         templateInfo: {object}, // nested template metadata
     *         // Metadata to allow efficient retrieval of instanced node
     *         // corresponding to this metadata
     *         parentInfo: {number},   // reference to parent nodeInfo>
     *         parentIndex: {number},  // index in parent's `childNodes` collection
     *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
     *       },
     *       ...
     *     ],
     *     // When true, the template had the `strip-whitespace` attribute
     *     // or was nested in a template with that setting
     *     stripWhitespace: {boolean},
     *     // For nested templates, nested template content is moved into
     *     // a document fragment stored here; this is an optimization to
     *     // avoid the cost of nested template cloning
     *     content: {DocumentFragment}
     *   }
     * ```
     *
     * This method kicks off a recursive treewalk as follows:
     *
     * ```
     *    _parseTemplate <---------------------+
     *      _parseTemplateContent              |
     *        _parseTemplateNode  <------------|--+
     *          _parseTemplateNestedTemplate --+  |
     *          _parseTemplateChildNodes ---------+
     *          _parseTemplateNodeAttributes
     *            _parseTemplateNodeAttribute
     *
     * ```
     *
     * These methods may be overridden to add custom metadata about templates
     * to either `templateInfo` or `nodeInfo`.
     *
     * Note that this method may be destructive to the template, in that
     * e.g. event annotations may be removed after being noted in the
     * template metadata.
     *
     * @param {!HTMLTemplateElement} template Template to parse
     * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
     *   template, for parsing nested templates
     * @return {!TemplateInfo} Parsed template metadata
     */
    static _parseTemplate(template, outerTemplateInfo) {
      // since a template may be re-used, memo-ize metadata
      if (!template._templateInfo) {
        let templateInfo = template._templateInfo = {};
        templateInfo.nodeInfoList = [];
        templateInfo.stripWhiteSpace =
          (outerTemplateInfo && outerTemplateInfo.stripWhiteSpace) ||
          template.hasAttribute('strip-whitespace');
        this._parseTemplateContent(template, templateInfo, {parent: null});
      }
      return template._templateInfo;
    }

    static _parseTemplateContent(template, templateInfo, nodeInfo) {
      return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
    }

    /**
     * Parses template node and adds template and node metadata based on
     * the current node, and its `childNodes` and `attributes`.
     *
     * This method may be overridden to add custom node or template specific
     * metadata based on this node.
     *
     * @param {Node} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      let noted;
      let element = /** @type Element */(node);
      if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
        noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
      } else if (element.localName === 'slot') {
        // For ShadyDom optimization, indicating there is an insertion point
        templateInfo.hasInsertionPoint = true;
      }
      if (element.firstChild) {
        noted = this._parseTemplateChildNodes(element, templateInfo, nodeInfo) || noted;
      }
      if (element.hasAttributes && element.hasAttributes()) {
        noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
      }
      return noted;
    }

    /**
     * Parses template child nodes for the given root node.
     *
     * This method also wraps whitelisted legacy template extensions
     * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
     * wrappers, collapses text nodes, and strips whitespace from the template
     * if the `templateInfo.stripWhitespace` setting was provided.
     *
     * @param {Node} root Root node whose `childNodes` will be parsed
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     */
    static _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
      for (let node=root.firstChild, parentIndex=0, next; node; node=next) {
        // Wrap templates
        if (node.localName == 'template') {
          node = wrapTemplateExtension(node);
        }
        // collapse adjacent textNodes: fixes an IE issue that can cause
        // text nodes to be inexplicably split =(
        // note that root.normalize() should work but does not so we do this
        // manually.
        next = node.nextSibling;
        if (node.nodeType === Node.TEXT_NODE) {
          let /** Node */ n = next;
          while (n && (n.nodeType === Node.TEXT_NODE)) {
            node.textContent += n.textContent;
            next = n.nextSibling;
            root.removeChild(n);
            n = next;
          }
          // optionally strip whitespace
          if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
            root.removeChild(node);
            continue;
          }
        }
        let childInfo = { parentIndex, parentInfo: nodeInfo };
        if (this._parseTemplateNode(node, templateInfo, childInfo)) {
          childInfo.infoIndex = templateInfo.nodeInfoList.push(/** @type {!NodeInfo} */(childInfo)) - 1;
        }
        // Increment if not removed
        if (node.parentNode) {
          parentIndex++;
        }
      }
    }

    /**
     * Parses template content for the given nested `<template>`.
     *
     * Nested template info is stored as `templateInfo` in the current node's
     * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
     * It will then be the responsibility of the host to set it back to the
     * template and for users stamping nested templates to use the
     * `_contentForTemplate` method to retrieve the content for this template
     * (an optimization to avoid the cost of cloning nested template content).
     *
     * @param {HTMLTemplateElement} node Node to parse (a <template>)
     * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
     *   that includes the template `node`
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
      let templateInfo = this._parseTemplate(node, outerTemplateInfo);
      let content = templateInfo.content =
        node.content.ownerDocument.createDocumentFragment();
      content.appendChild(node.content);
      nodeInfo.templateInfo = templateInfo;
      return true;
    }

    /**
     * Parses template node attributes and adds node metadata to `nodeInfo`
     * for nodes of interest.
     *
     * @param {Element} node Node to parse
     * @param {TemplateInfo} templateInfo Template metadata for current template
     * @param {NodeInfo} nodeInfo Node metadata for current template.
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
      // Make copy of original attribute list, since the order may change
      // as attributes are added and removed
      let noted = false;
      let attrs = Array.from(node.attributes);
      for (let i=attrs.length-1, a; (a=attrs[i]); i--) {
        noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
      }
      return noted;
    }

    /**
     * Parses a single template node attribute and adds node metadata to
     * `nodeInfo` for attributes of interest.
     *
     * This implementation adds metadata for `on-event="handler"` attributes
     * and `id` attributes.
     *
     * @param {Element} node Node to parse
     * @param {!TemplateInfo} templateInfo Template metadata for current template
     * @param {!NodeInfo} nodeInfo Node metadata for current template.
     * @param {string} name Attribute name
     * @param {string} value Attribute value
     * @return {boolean} `true` if the visited node added node-specific
     *   metadata to `nodeInfo`
     */
    static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
      // events (on-*)
      if (name.slice(0, 3) === 'on-') {
        node.removeAttribute(name);
        nodeInfo.events = nodeInfo.events || [];
        nodeInfo.events.push({
          name: name.slice(3),
          value
        });
        return true;
      }
      // static id
      else if (name === 'id') {
        nodeInfo.id = value;
        return true;
      }
      return false;
    }

    /**
     * Returns the `content` document fragment for a given template.
     *
     * For nested templates, Polymer performs an optimization to cache nested
     * template content to avoid the cost of cloning deeply nested templates.
     * This method retrieves the cached content for a given template.
     *
     * @param {HTMLTemplateElement} template Template to retrieve `content` for
     * @return {DocumentFragment} Content fragment
     */
    static _contentForTemplate(template) {
      let templateInfo = /** @type {HTMLTemplateElementWithInfo} */ (template)._templateInfo;
      return (templateInfo && templateInfo.content) || template.content;
    }

    /**
     * Clones the provided template content and returns a document fragment
     * containing the cloned dom.
     *
     * The template is parsed (once and memoized) using this library's
     * template parsing features, and provides the following value-added
     * features:
     * * Adds declarative event listeners for `on-event="handler"` attributes
     * * Generates an "id map" for all nodes with id's under `$` on returned
     *   document fragment
     * * Passes template info including `content` back to templates as
     *   `_templateInfo` (a performance optimization to avoid deep template
     *   cloning)
     *
     * Note that the memoized template parsing process is destructive to the
     * template: attributes for bindings and declarative event listeners are
     * removed after being noted in notes, and any nested `<template>.content`
     * is removed and stored in notes as well.
     *
     * @param {!HTMLTemplateElement} template Template to stamp
     * @return {!StampedTemplate} Cloned template content
     */
    _stampTemplate(template) {
      // Polyfill support: bootstrap the template if it has not already been
      if (template && !template.content &&
          window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(template);
      }
      let templateInfo = this.constructor._parseTemplate(template);
      let nodeInfo = templateInfo.nodeInfoList;
      let content = templateInfo.content || template.content;
      let dom = /** @type DocumentFragment */ (document.importNode(content, true));
      // NOTE: ShadyDom optimization indicating there is an insertion point
      dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
      let nodes = dom.nodeList = new Array(nodeInfo.length);
      dom.$ = {};
      for (let i=0, l=nodeInfo.length, info; (i<l) && (info=nodeInfo[i]); i++) {
        let node = nodes[i] = findTemplateNode(dom, info);
        applyIdToMap(this, dom.$, node, info);
        applyTemplateContent(this, node, info);
        applyEventListener(this, node, info);
      }
      return /** @type {!StampedTemplate} */(dom);
    }

    /**
     * Adds an event listener by method name for the event provided.
     *
     * This method generates a handler function that looks up the method
     * name at handling time.
     *
     * @param {Node} node Node to add listener on
     * @param {string} eventName Name of event
     * @param {string} methodName Name of method
     * @param {*=} context Context the method will be called on (defaults
     *   to `node`)
     * @return {Function} Generated handler function
     */
    _addMethodEventListenerToNode(node, eventName, methodName, context) {
      context = context || node;
      let handler = createNodeEventHandler(context, eventName, methodName);
      this._addEventListenerToNode(node, eventName, handler);
      return handler;
    }

    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {Node} node Node to add event listener to
     * @param {string} eventName Name of event
     * @param {Function} handler Listener function to add
     */
    _addEventListenerToNode(node, eventName, handler) {
      node.addEventListener(eventName, handler);
    }

    /**
     * Override point for adding custom or simulated event handling.
     *
     * @param {Node} node Node to remove event listener from
     * @param {string} eventName Name of event
     * @param {Function} handler Listener function to remove
     */
    _removeEventListenerFromNode(node, eventName, handler) {
      node.removeEventListener(eventName, handler);
    }

  }

  return TemplateStamp;

});
/* harmony export (immutable) */ __webpack_exports__["a"] = TemplateStamp;



/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iron_flex_layout_iron_flex_layout_js__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paper_behaviors_paper_button_behavior_js__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__paper_styles_element_styles_paper_material_styles_js__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__polymer_lib_legacy_polymer_fn_js__ = __webpack_require__(61);





const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="paper-button">
  <template strip-whitespace="">
    <style include="paper-material-styles">
      /* Need to specify the same specificity as the styles imported from paper-material. */
      :host {
        @apply --layout-inline;
        @apply --layout-center-center;
        position: relative;
        box-sizing: border-box;
        min-width: 5.14em;
        margin: 0 0.29em;
        background: transparent;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
        font: inherit;
        text-transform: uppercase;
        outline-width: 0;
        border-radius: 3px;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        padding: 0.7em 0.57em;

        @apply --paper-font-common-base;
        @apply --paper-button;
      }

      :host([elevation="1"]) {
        @apply --paper-material-elevation-1;
      }

      :host([elevation="2"]) {
        @apply --paper-material-elevation-2;
      }

      :host([elevation="3"]) {
        @apply --paper-material-elevation-3;
      }

      :host([elevation="4"]) {
        @apply --paper-material-elevation-4;
      }

      :host([elevation="5"]) {
        @apply --paper-material-elevation-5;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host([raised].keyboard-focus) {
        font-weight: bold;
        @apply --paper-button-raised-keyboard-focus;
      }

      :host(:not([raised]).keyboard-focus) {
        font-weight: bold;
        @apply --paper-button-flat-keyboard-focus;
      }

      :host([disabled]) {
        background: #eaeaea;
        color: #a8a8a8;
        cursor: auto;
        pointer-events: none;

        @apply --paper-button-disabled;
      }

      :host([animated]) {
        @apply --shadow-transition;
      }

      paper-ripple {
        color: var(--paper-button-ink-color);
      }
    </style>

    <slot></slot>
  </template>

  
</dom-module>`;

document.head.appendChild($_documentContainer);
Object(__WEBPACK_IMPORTED_MODULE_4__polymer_lib_legacy_polymer_fn_js__["a" /* Polymer */])({
  is: 'paper-button',

  behaviors: [
    __WEBPACK_IMPORTED_MODULE_2__paper_behaviors_paper_button_behavior_js__["a" /* PaperButtonBehavior */]
  ],

  properties: {
    /**
     * If true, the button should be styled with a shadow.
     */
    raised: {
      type: Boolean,
      reflectToAttribute: true,
      value: false,
      observer: '_calculateElevation'
    }
  },

  _calculateElevation: function() {
    if (!this.raised) {
      this._setElevation(0);
    } else {
      __WEBPACK_IMPORTED_MODULE_2__paper_behaviors_paper_button_behavior_js__["b" /* PaperButtonBehaviorImpl */]._calculateElevation.apply(this);
    }
  }

  /**
  Fired when the animation finishes.
  This is useful if you want to wait until
  the ripple animation finishes to perform some action.

  @event transitionend
  Event param: {{node: Object}} detail Contains the animated node.
  */
});


/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_apply_shim_js__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_template_map_js__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_style_util_js__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_apply_shim_utils_js__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_document_wait_js__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_common_utils_js__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_custom_style_interface_js__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_style_settings_js__ = __webpack_require__(56);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/









 // eslint-disable-line no-unused-vars


/** @const {ApplyShim} */
const applyShim = new __WEBPACK_IMPORTED_MODULE_0__src_apply_shim_js__["a" /* default */]();

class ApplyShimInterface {
  constructor() {
    /** @type {?CustomStyleInterfaceInterface} */
    this.customStyleInterface = null;
    Object(__WEBPACK_IMPORTED_MODULE_4__src_document_wait_js__["a" /* default */])(() => {
      this.ensure();
    });
    applyShim['invalidCallback'] = __WEBPACK_IMPORTED_MODULE_3__src_apply_shim_utils_js__["a" /* invalidate */];
  }
  ensure() {
    if (this.customStyleInterface) {
      return;
    }
    this.customStyleInterface = window.ShadyCSS.CustomStyleInterface;
    if (this.customStyleInterface) {
      this.customStyleInterface['transformCallback'] = (style) => {
        applyShim.transformCustomStyle(style);
      };
      this.customStyleInterface['validateCallback'] = () => {
        requestAnimationFrame(() => {
          if (this.customStyleInterface['enqueued']) {
            this.flushCustomStyles();
          }
        });
      }
    }
  }
  /**
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   */
  prepareTemplate(template, elementName) {
    this.ensure();
    __WEBPACK_IMPORTED_MODULE_1__src_template_map_js__["a" /* default */][elementName] = template;
    let ast = applyShim.transformTemplate(template, elementName);
    // save original style ast to use for revalidating instances
    template['_styleAst'] = ast;
  }
  flushCustomStyles() {
    this.ensure();
    if (!this.customStyleInterface) {
      return;
    }
    let styles = this.customStyleInterface['processStyles']();
    if (!this.customStyleInterface['enqueued']) {
      return;
    }
    for (let i = 0; i < styles.length; i++ ) {
      let cs = styles[i];
      let style = this.customStyleInterface['getStyleForCustomStyle'](cs);
      if (style) {
        applyShim.transformCustomStyle(style);
      }
    }
    this.customStyleInterface['enqueued'] = false;
  }
  /**
   * @param {HTMLElement} element
   * @param {Object=} properties
   */
  styleSubtree(element, properties) {
    this.ensure();
    if (properties) {
      Object(__WEBPACK_IMPORTED_MODULE_5__src_common_utils_js__["c" /* updateNativeProperties */])(element, properties);
    }
    if (element.shadowRoot) {
      this.styleElement(element);
      let shadowChildren = element.shadowRoot.children || element.shadowRoot.childNodes;
      for (let i = 0; i < shadowChildren.length; i++) {
        this.styleSubtree(/** @type {HTMLElement} */(shadowChildren[i]));
      }
    } else {
      let children = element.children || element.childNodes;
      for (let i = 0; i < children.length; i++) {
        this.styleSubtree(/** @type {HTMLElement} */(children[i]));
      }
    }
  }
  /**
   * @param {HTMLElement} element
   */
  styleElement(element) {
    this.ensure();
    let {is} = Object(__WEBPACK_IMPORTED_MODULE_2__src_style_util_js__["b" /* getIsExtends */])(element);
    let template = __WEBPACK_IMPORTED_MODULE_1__src_template_map_js__["a" /* default */][is];
    if (template && !__WEBPACK_IMPORTED_MODULE_3__src_apply_shim_utils_js__["c" /* templateIsValid */](template)) {
      // only revalidate template once
      if (!__WEBPACK_IMPORTED_MODULE_3__src_apply_shim_utils_js__["d" /* templateIsValidating */](template)) {
        this.prepareTemplate(template, is);
        __WEBPACK_IMPORTED_MODULE_3__src_apply_shim_utils_js__["b" /* startValidatingTemplate */](template);
      }
      // update this element instance
      let root = element.shadowRoot;
      if (root) {
        let style = /** @type {HTMLStyleElement} */(root.querySelector('style'));
        if (style) {
          // reuse the template's style ast, it has all the original css text
          style['__cssRules'] = template['_styleAst'];
          style.textContent = Object(__WEBPACK_IMPORTED_MODULE_2__src_style_util_js__["e" /* toCssText */])(template['_styleAst'])
        }
      }
    }
  }
  /**
   * @param {Object=} properties
   */
  styleDocument(properties) {
    this.ensure();
    this.styleSubtree(document.body, properties);
  }
}

if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
  const applyShimInterface = new ApplyShimInterface();
  let CustomStyleInterface = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;

  window.ShadyCSS = {
    /**
     * @param {!HTMLTemplateElement} template
     * @param {string} elementName
     * @param {string=} elementExtends
     */
    prepareTemplate(template, elementName, elementExtends) { // eslint-disable-line no-unused-vars
      applyShimInterface.flushCustomStyles();
      applyShimInterface.prepareTemplate(template, elementName)
    },

    /**
     * @param {!HTMLElement} element
     * @param {Object=} properties
     */
    styleSubtree(element, properties) {
      applyShimInterface.flushCustomStyles();
      applyShimInterface.styleSubtree(element, properties);
    },

    /**
     * @param {!HTMLElement} element
     */
    styleElement(element) {
      applyShimInterface.flushCustomStyles();
      applyShimInterface.styleElement(element);
    },

    /**
     * @param {Object=} properties
     */
    styleDocument(properties) {
      applyShimInterface.flushCustomStyles();
      applyShimInterface.styleDocument(properties);
    },

    /**
     * @param {Element} element
     * @param {string} property
     * @return {string}
     */
    getComputedStyleValue(element, property) {
      return Object(__WEBPACK_IMPORTED_MODULE_5__src_common_utils_js__["b" /* getComputedStyleValue */])(element, property);
    },
    nativeCss: __WEBPACK_IMPORTED_MODULE_7__src_style_settings_js__["a" /* nativeCssVariables */],
    nativeShadow: __WEBPACK_IMPORTED_MODULE_7__src_style_settings_js__["b" /* nativeShadow */]
  };

  if (CustomStyleInterface) {
    window.ShadyCSS.CustomStyleInterface = CustomStyleInterface;
  }
}

window.ShadyCSS.ApplyShim = applyShim;

/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_util_js__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_regex_js__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_utils_js__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_parse_js__ = __webpack_require__(57);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/*
 * The apply shim simulates the behavior of `@apply` proposed at
 * https://tabatkins.github.io/specs/css-apply-rule/.
 * The approach is to convert a property like this:
 *
 *    --foo: {color: red; background: blue;}
 *
 * to this:
 *
 *    --foo_-_color: red;
 *    --foo_-_background: blue;
 *
 * Then where `@apply --foo` is used, that is converted to:
 *
 *    color: var(--foo_-_color);
 *    background: var(--foo_-_background);
 *
 * This approach generally works but there are some issues and limitations.
 * Consider, for example, that somewhere *between* where `--foo` is set and used,
 * another element sets it to:
 *
 *    --foo: { border: 2px solid red; }
 *
 * We must now ensure that the color and background from the previous setting
 * do not apply. This is accomplished by changing the property set to this:
 *
 *    --foo_-_border: 2px solid red;
 *    --foo_-_color: initial;
 *    --foo_-_background: initial;
 *
 * This works but introduces one new issue.
 * Consider this setup at the point where the `@apply` is used:
 *
 *    background: orange;
 *    `@apply` --foo;
 *
 * In this case the background will be unset (initial) rather than the desired
 * `orange`. We address this by altering the property set to use a fallback
 * value like this:
 *
 *    color: var(--foo_-_color);
 *    background: var(--foo_-_background, orange);
 *    border: var(--foo_-_border);
 *
 * Note that the default is retained in the property set and the `background` is
 * the desired `orange`. This leads us to a limitation.
 *
 * Limitation 1:

 * Only properties in the rule where the `@apply`
 * is used are considered as default values.
 * If another rule matches the element and sets `background` with
 * less specificity than the rule in which `@apply` appears,
 * the `background` will not be set.
 *
 * Limitation 2:
 *
 * When using Polymer's `updateStyles` api, new properties may not be set for
 * `@apply` properties.

*/






 // eslint-disable-line no-unused-vars

const APPLY_NAME_CLEAN = /;\s*/m;
const INITIAL_INHERIT = /^\s*(initial)|(inherit)\s*$/;

// separator used between mixin-name and mixin-property-name when producing properties
// NOTE: plain '-' may cause collisions in user styles
const MIXIN_VAR_SEP = '_-_';

/**
 * @typedef {!Object<string, string>}
 */
let PropertyEntry; // eslint-disable-line no-unused-vars

/**
 * @typedef {!Object<string, boolean>}
 */
let DependantsEntry; // eslint-disable-line no-unused-vars

/** @typedef {{
 *    properties: PropertyEntry,
 *    dependants: DependantsEntry
 * }}
 */
let MixinMapEntry; // eslint-disable-line no-unused-vars

// map of mixin to property names
// --foo: {border: 2px} -> {properties: {(--foo, ['border'])}, dependants: {'element-name': proto}}
class MixinMap {
  constructor() {
    /** @type {!Object<string, !MixinMapEntry>} */
    this._map = {};
  }
  /**
   * @param {string} name
   * @param {!PropertyEntry} props
   */
  set(name, props) {
    name = name.trim();
    this._map[name] = {
      properties: props,
      dependants: {}
    }
  }
  /**
   * @param {string} name
   * @return {MixinMapEntry}
   */
  get(name) {
    name = name.trim();
    return this._map[name] || null;
  }
}

/**
 * Callback for when an element is marked invalid
 * @type {?function(string)}
 */
let invalidCallback = null;

/** @unrestricted */
class ApplyShim {
  constructor() {
    /** @type {?string} */
    this._currentElement = null;
    /** @type {HTMLMetaElement} */
    this._measureElement = null;
    this._map = new MixinMap();
  }
  /**
   * return true if `cssText` contains a mixin definition or consumption
   * @param {string} cssText
   * @return {boolean}
   */
  detectMixin(cssText) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__common_utils_js__["a" /* detectMixin */])(cssText);
  }
  /**
   * @param {!HTMLTemplateElement} template
   * @param {string} elementName
   * @return {StyleNode}
   */
  transformTemplate(template, elementName) {
    const style = /** @type {HTMLStyleElement} */(template.content.querySelector('style'));
    /** @type {StyleNode} */
    let ast = null;
    if (style) {
      ast = this.transformStyle(style, elementName);
    }
    return ast;
  }
  /**
   * @param {!HTMLStyleElement} style
   * @param {string} elementName
   * @return {StyleNode}
   */
  transformStyle(style, elementName = '') {
    let ast = Object(__WEBPACK_IMPORTED_MODULE_0__style_util_js__["d" /* rulesForStyle */])(style);
    this.transformRules(ast, elementName);
    style.textContent = Object(__WEBPACK_IMPORTED_MODULE_0__style_util_js__["e" /* toCssText */])(ast);
    return ast;
  }
  /**
   * @param {!HTMLStyleElement} style
   * @return {StyleNode}
   */
  transformCustomStyle(style) {
    let ast = Object(__WEBPACK_IMPORTED_MODULE_0__style_util_js__["d" /* rulesForStyle */])(style);
    Object(__WEBPACK_IMPORTED_MODULE_0__style_util_js__["a" /* forEachRule */])(ast, (rule) => {
      if (rule['selector'] === ':root') {
        rule['selector'] = 'html';
      }
      this.transformRule(rule);
    })
    style.textContent = Object(__WEBPACK_IMPORTED_MODULE_0__style_util_js__["e" /* toCssText */])(ast);
    return ast;
  }
  /**
   * @param {StyleNode} rules
   * @param {string} elementName
   */
  transformRules(rules, elementName) {
    this._currentElement = elementName;
    Object(__WEBPACK_IMPORTED_MODULE_0__style_util_js__["a" /* forEachRule */])(rules, (r) => {
      this.transformRule(r);
    });
    this._currentElement = null;
  }
  /**
   * @param {!StyleNode} rule
   */
  transformRule(rule) {
    rule['cssText'] = this.transformCssText(rule['parsedCssText']);
    // :root was only used for variable assignment in property shim,
    // but generates invalid selectors with real properties.
    // replace with `:host > *`, which serves the same effect
    if (rule['selector'] === ':root') {
      rule['selector'] = ':host > *';
    }
  }
  /**
   * @param {string} cssText
   * @return {string}
   */
  transformCssText(cssText) {
    // produce variables
    cssText = cssText.replace(__WEBPACK_IMPORTED_MODULE_1__common_regex_js__["c" /* VAR_ASSIGN */], (matchText, propertyName, valueProperty, valueMixin) =>
      this._produceCssProperties(matchText, propertyName, valueProperty, valueMixin));
    // consume mixins
    return this._consumeCssProperties(cssText);
  }
  /**
   * @param {string} property
   * @return {string}
   */
  _getInitialValueForProperty(property) {
    if (!this._measureElement) {
      this._measureElement = /** @type {HTMLMetaElement} */(document.createElement('meta'));
      this._measureElement.setAttribute('apply-shim-measure', '');
      this._measureElement.style.all = 'initial';
      document.head.appendChild(this._measureElement);
    }
    return window.getComputedStyle(this._measureElement).getPropertyValue(property);
  }
  /**
   * replace mixin consumption with variable consumption
   * @param {string} text
   * @return {string}
   */
  _consumeCssProperties(text) {
    /** @type {Array} */
    let m = null;
    // loop over text until all mixins with defintions have been applied
    while((m = __WEBPACK_IMPORTED_MODULE_1__common_regex_js__["b" /* MIXIN_MATCH */].exec(text))) {
      let matchText = m[0];
      let mixinName = m[1];
      let idx = m.index;
      // collect properties before apply to be "defaults" if mixin might override them
      // match includes a "prefix", so find the start and end positions of @apply
      let applyPos = idx + matchText.indexOf('@apply');
      let afterApplyPos = idx + matchText.length;
      // find props defined before this @apply
      let textBeforeApply = text.slice(0, applyPos);
      let textAfterApply = text.slice(afterApplyPos);
      let defaults = this._cssTextToMap(textBeforeApply);
      let replacement = this._atApplyToCssProperties(mixinName, defaults);
      // use regex match position to replace mixin, keep linear processing time
      text = `${textBeforeApply}${replacement}${textAfterApply}`;
      // move regex search to _after_ replacement
      __WEBPACK_IMPORTED_MODULE_1__common_regex_js__["b" /* MIXIN_MATCH */].lastIndex = idx + replacement.length;
    }
    return text;
  }
  /**
   * produce variable consumption at the site of mixin consumption
   * `@apply` --foo; -> for all props (${propname}: var(--foo_-_${propname}, ${fallback[propname]}}))
   * Example:
   *  border: var(--foo_-_border); padding: var(--foo_-_padding, 2px)
   *
   * @param {string} mixinName
   * @param {Object} fallbacks
   * @return {string}
   */
  _atApplyToCssProperties(mixinName, fallbacks) {
    mixinName = mixinName.replace(APPLY_NAME_CLEAN, '');
    let vars = [];
    let mixinEntry = this._map.get(mixinName);
    // if we depend on a mixin before it is created
    // make a sentinel entry in the map to add this element as a dependency for when it is defined.
    if (!mixinEntry) {
      this._map.set(mixinName, {});
      mixinEntry = this._map.get(mixinName);
    }
    if (mixinEntry) {
      if (this._currentElement) {
        mixinEntry.dependants[this._currentElement] = true;
      }
      let p, parts, f;
      for (p in mixinEntry.properties) {
        f = fallbacks && fallbacks[p];
        parts = [p, ': var(', mixinName, MIXIN_VAR_SEP, p];
        if (f) {
          parts.push(',', f);
        }
        parts.push(')');
        vars.push(parts.join(''));
      }
    }
    return vars.join('; ');
  }

  /**
   * @param {string} property
   * @param {string} value
   * @return {string}
   */
  _replaceInitialOrInherit(property, value) {
    let match = INITIAL_INHERIT.exec(value);
    if (match) {
      if (match[1]) {
        // initial
        // replace `initial` with the concrete initial value for this property
        value = this._getInitialValueForProperty(property);
      } else {
        // inherit
        // with this purposfully illegal value, the variable will be invalid at
        // compute time (https://www.w3.org/TR/css-variables/#invalid-at-computed-value-time)
        // and for inheriting values, will behave similarly
        // we cannot support the same behavior for non inheriting values like 'border'
        value = 'apply-shim-inherit';
      }
    }
    return value;
  }

  /**
   * "parse" a mixin definition into a map of properties and values
   * cssTextToMap('border: 2px solid black') -> ('border', '2px solid black')
   * @param {string} text
   * @return {!Object<string, string>}
   */
  _cssTextToMap(text) {
    let props = text.split(';');
    let property, value;
    let out = {};
    for (let i = 0, p, sp; i < props.length; i++) {
      p = props[i];
      if (p) {
        sp = p.split(':');
        // ignore lines that aren't definitions like @media
        if (sp.length > 1) {
          property = sp[0].trim();
          // some properties may have ':' in the value, like data urls
          value = this._replaceInitialOrInherit(property, sp.slice(1).join(':'));
          out[property] = value;
        }
      }
    }
    return out;
  }

  /**
   * @param {MixinMapEntry} mixinEntry
   */
  _invalidateMixinEntry(mixinEntry) {
    if (!invalidCallback) {
      return;
    }
    for (let elementName in mixinEntry.dependants) {
      if (elementName !== this._currentElement) {
        invalidCallback(elementName);
      }
    }
  }

  /**
   * @param {string} matchText
   * @param {string} propertyName
   * @param {?string} valueProperty
   * @param {?string} valueMixin
   * @return {string}
   */
  _produceCssProperties(matchText, propertyName, valueProperty, valueMixin) {
    // handle case where property value is a mixin
    if (valueProperty) {
      // form: --mixin2: var(--mixin1), where --mixin1 is in the map
      Object(__WEBPACK_IMPORTED_MODULE_0__style_util_js__["c" /* processVariableAndFallback */])(valueProperty, (prefix, value) => {
        if (value && this._map.get(value)) {
          valueMixin = `@apply ${value};`
        }
      });
    }
    if (!valueMixin) {
      return matchText;
    }
    let mixinAsProperties = this._consumeCssProperties(valueMixin);
    let prefix = matchText.slice(0, matchText.indexOf('--'));
    let mixinValues = this._cssTextToMap(mixinAsProperties);
    let combinedProps = mixinValues;
    let mixinEntry = this._map.get(propertyName);
    let oldProps = mixinEntry && mixinEntry.properties;
    if (oldProps) {
      // NOTE: since we use mixin, the map of properties is updated here
      // and this is what we want.
      combinedProps = Object.assign(Object.create(oldProps), mixinValues);
    } else {
      this._map.set(propertyName, combinedProps);
    }
    let out = [];
    let p, v;
    // set variables defined by current mixin
    let needToInvalidate = false;
    for (p in combinedProps) {
      v = mixinValues[p];
      // if property not defined by current mixin, set initial
      if (v === undefined) {
        v = 'initial';
      }
      if (oldProps && !(p in oldProps)) {
        needToInvalidate = true;
      }
      out.push(`${propertyName}${MIXIN_VAR_SEP}${p}: ${v}`);
    }
    if (needToInvalidate) {
      this._invalidateMixinEntry(mixinEntry);
    }
    if (mixinEntry) {
      mixinEntry.properties = combinedProps;
    }
    // because the mixinMap is global, the mixin might conflict with
    // a different scope's simple variable definition:
    // Example:
    // some style somewhere:
    // --mixin1:{ ... }
    // --mixin2: var(--mixin1);
    // some other element:
    // --mixin1: 10px solid red;
    // --foo: var(--mixin1);
    // In this case, we leave the original variable definition in place.
    if (valueProperty) {
      prefix = `${matchText};${prefix}`;
    }
    return `${prefix}${out.join('; ')};`;
  }
}

/* exports */
ApplyShim.prototype['detectMixin'] = ApplyShim.prototype.detectMixin;
ApplyShim.prototype['transformStyle'] = ApplyShim.prototype.transformStyle;
ApplyShim.prototype['transformCustomStyle'] = ApplyShim.prototype.transformCustomStyle;
ApplyShim.prototype['transformRules'] = ApplyShim.prototype.transformRules;
ApplyShim.prototype['transformRule'] = ApplyShim.prototype.transformRule;
ApplyShim.prototype['transformTemplate'] = ApplyShim.prototype.transformTemplate;
ApplyShim.prototype['_separator'] = MIXIN_VAR_SEP;
Object.defineProperty(ApplyShim.prototype, 'invalidCallback', {
  /** @return {?function(string)} */
  get() {
    return invalidCallback;
  },
  /** @param {?function(string)} cb */
  set(cb) {
    invalidCallback = cb;
  }
});

/* harmony default export */ __webpack_exports__["a"] = (ApplyShim);

/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = invalidate;
/* unused harmony export invalidateTemplate */
/* unused harmony export isValid */
/* harmony export (immutable) */ __webpack_exports__["c"] = templateIsValid;
/* unused harmony export isValidating */
/* harmony export (immutable) */ __webpack_exports__["d"] = templateIsValidating;
/* unused harmony export startValidating */
/* harmony export (immutable) */ __webpack_exports__["b"] = startValidatingTemplate;
/* unused harmony export elementsAreInvalid */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_map_js__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_parse_js__ = __webpack_require__(57);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/



 // eslint-disable-line no-unused-vars

/*
 * Utilities for handling invalidating apply-shim mixins for a given template.
 *
 * The invalidation strategy involves keeping track of the "current" version of a template's mixins, and updating that count when a mixin is invalidated.
 * The template
 */

/** @const {string} */
const CURRENT_VERSION = '_applyShimCurrentVersion';

/** @const {string} */
const NEXT_VERSION = '_applyShimNextVersion';

/** @const {string} */
const VALIDATING_VERSION = '_applyShimValidatingVersion';

/**
 * @const {Promise<void>}
 */
const promise = Promise.resolve();

/**
 * @param {string} elementName
 */
function invalidate(elementName){
  let template = __WEBPACK_IMPORTED_MODULE_0__template_map_js__["a" /* default */][elementName];
  if (template) {
    invalidateTemplate(template);
  }
}

/**
 * This function can be called multiple times to mark a template invalid
 * and signal that the style inside must be regenerated.
 *
 * Use `startValidatingTemplate` to begin an asynchronous validation cycle.
 * During that cycle, call `templateIsValidating` to see if the template must
 * be revalidated
 * @param {HTMLTemplateElement} template
 */
function invalidateTemplate(template) {
  // default the current version to 0
  template[CURRENT_VERSION] = template[CURRENT_VERSION] || 0;
  // ensure the "validating for" flag exists
  template[VALIDATING_VERSION] = template[VALIDATING_VERSION] || 0;
  // increment the next version
  template[NEXT_VERSION] = (template[NEXT_VERSION] || 0) + 1;
}

/**
 * @param {string} elementName
 * @return {boolean}
 */
function isValid(elementName) {
  let template = __WEBPACK_IMPORTED_MODULE_0__template_map_js__["a" /* default */][elementName];
  if (template) {
    return templateIsValid(template);
  }
  return true;
}

/**
 * @param {HTMLTemplateElement} template
 * @return {boolean}
 */
function templateIsValid(template) {
  return template[CURRENT_VERSION] === template[NEXT_VERSION];
}

/**
 * @param {string} elementName
 * @return {boolean}
 */
function isValidating(elementName) {
  let template = __WEBPACK_IMPORTED_MODULE_0__template_map_js__["a" /* default */][elementName];
  if (template) {
    return templateIsValidating(template);
  }
  return false;
}

/**
 * Returns true if the template is currently invalid and `startValidating` has been called since the last invalidation.
 * If false, the template must be validated.
 * @param {HTMLTemplateElement} template
 * @return {boolean}
 */
function templateIsValidating(template) {
  return !templateIsValid(template) && template[VALIDATING_VERSION] === template[NEXT_VERSION];
}

/**
 * the template is marked as `validating` for one microtask so that all instances
 * found in the tree crawl of `applyStyle` will update themselves,
 * but the template will only be updated once.
 * @param {string} elementName
*/
function startValidating(elementName) {
  let template = __WEBPACK_IMPORTED_MODULE_0__template_map_js__["a" /* default */][elementName];
  startValidatingTemplate(template);
}

/**
 * Begin an asynchronous invalidation cycle.
 * This should be called after every validation of a template
 *
 * After one microtask, the template will be marked as valid until the next call to `invalidateTemplate`
 * @param {HTMLTemplateElement} template
 */
function startValidatingTemplate(template) {
  // remember that the current "next version" is the reason for this validation cycle
  template[VALIDATING_VERSION] = template[NEXT_VERSION];
  // however, there only needs to be one async task to clear the counters
  if (!template._validating) {
    template._validating = true;
    promise.then(function() {
      // sync the current version to let future invalidations cause a refresh cycle
      template[CURRENT_VERSION] = template[NEXT_VERSION];
      template._validating = false;
    });
  }
}

/**
 * @return {boolean}
 */
function elementsAreInvalid() {
  for (let elementName in __WEBPACK_IMPORTED_MODULE_0__template_map_js__["a" /* default */]) {
    let template = __WEBPACK_IMPORTED_MODULE_0__template_map_js__["a" /* default */][elementName];
    if (!templateIsValid(template)) {
      return true;
    }
  }
  return false;
}

/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


// run a callback when HTMLImports are ready or immediately if
// this api is not available.
function whenImportsReady(cb) {
  if (window.HTMLImports) {
    HTMLImports.whenReady(cb);
  } else {
    cb();
  }
}

const importHref = function(href, onload, onerror, optAsync) {
  let link = /** @type {HTMLLinkElement} */
    (document.head.querySelector('link[href="' + href + '"][import-href]'));
  if (!link) {
    link = /** @type {HTMLLinkElement} */ (document.createElement('link'));
    link.rel = 'import';
    link.href = href;
    link.setAttribute('import-href', '');
  }
  // always ensure link has `async` attribute if user specified one,
  // even if it was previously not async. This is considered less confusing.
  if (optAsync) {
    link.setAttribute('async', '');
  }
  // NOTE: the link may now be in 3 states: (1) pending insertion,
  // (2) inflight, (3) already laoded. In each case, we need to add
  // event listeners to process callbacks.
  let cleanup = function() {
    link.removeEventListener('load', loadListener);
    link.removeEventListener('error', errorListener);
  };
  let loadListener = function(event) {
    cleanup();
    // In case of a successful load, cache the load event on the link so
    // that it can be used to short-circuit this method in the future when
    // it is called with the same href param.
    link.__dynamicImportLoaded = true;
    if (onload) {
      whenImportsReady(() => {
        onload(event);
      });
    }
  };
  let errorListener = function(event) {
    cleanup();
    // In case of an error, remove the link from the document so that it
    // will be automatically created again the next time `importHref` is
    // called.
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
    if (onerror) {
      whenImportsReady(() => {
        onerror(event);
      });
    }
  };
  link.addEventListener('load', loadListener);
  link.addEventListener('error', errorListener);
  if (link.parentNode == null) {
    document.head.appendChild(link);
  // if the link already loaded, dispatch a fake load event
  // so that listeners are called and get a proper event argument.
  } else if (link.__dynamicImportLoaded) {
    link.dispatchEvent(new Event('load'));
  }
  return link;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = importHref;



/***/ }),
/* 266 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export beforeNextRender */
/* unused harmony export afterNextRender */
/* unused harmony export flush */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


let scheduled = false;
let beforeRenderQueue = [];
let afterRenderQueue = [];

function schedule() {
  scheduled = true;
  // before next render
  requestAnimationFrame(function() {
    scheduled = false;
    flushQueue(beforeRenderQueue);
    // after the render
    setTimeout(function() {
      runQueue(afterRenderQueue);
    });
  });
}

function flushQueue(queue) {
  while (queue.length) {
    callMethod(queue.shift());
  }
}

function runQueue(queue) {
  for (let i=0, l=queue.length; i < l; i++) {
    callMethod(queue.shift());
  }
}

function callMethod(info) {
  const context = info[0];
  const callback = info[1];
  const args = info[2];
  try {
    callback.apply(context, args);
  } catch(e) {
    setTimeout(() => {
      throw e;
    });
  }
}

function flush() {
  while (beforeRenderQueue.length || afterRenderQueue.length) {
    flushQueue(beforeRenderQueue);
    flushQueue(afterRenderQueue);
  }
  scheduled = false;
}

function beforeNextRender(context, callback, args) {
  if (!scheduled) {
    schedule();
  }
  beforeRenderQueue.push([context, callback, args]);
}

function afterNextRender(context, callback, args) {
  if (!scheduled) {
    schedule();
  }
  afterRenderQueue.push([context, callback, args]);
}




/***/ }),
/* 267 */
/***/ (function(module, exports) {

function resolve() {
  document.body.removeAttribute('unresolved');
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
  resolve();
} else {
  window.addEventListener('DOMContentLoaded', resolve);
}


/***/ }),
/* 268 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlattenedNodesObserver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array_splice_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__async_js__ = __webpack_require__(6);




/**
 * Returns true if `node` is a slot element
 * @param {HTMLElement} node Node to test.
 * @return {boolean} Returns true if the given `node` is a slot
 * @private
 */
function isSlot(node) {
  return (node.localName === 'slot');
}

/**
 * Class that listens for changes (additions or removals) to
 * "flattened nodes" on a given `node`. The list of flattened nodes consists
 * of a node's children and, for any children that are `<slot>` elements,
 * the expanded flattened list of `assignedNodes`.
 * For example, if the observed node has children `<a></a><slot></slot><b></b>`
 * and the `<slot>` has one `<div>` assigned to it, then the flattened
 * nodes list is `<a></a><div></div><b></b>`. If the `<slot>` has other
 * `<slot>` elements assigned to it, these are flattened as well.
 *
 * The provided `callback` is called whenever any change to this list
 * of flattened nodes occurs, where an addition or removal of a node is
 * considered a change. The `callback` is called with one argument, an object
 * containing an array of any `addedNodes` and `removedNodes`.
 *
 * Note: the callback is called asynchronous to any changes
 * at a microtask checkpoint. This is because observation is performed using
 * `MutationObserver` and the `<slot>` element's `slotchange` event which
 * are asynchronous.
 *
 * @memberof Polymer
 * @summary Class that listens for changes (additions or removals) to
 * "flattened nodes" on a given `node`.
 */
class FlattenedNodesObserver {

  /**
   * Returns the list of flattened nodes for the given `node`.
   * This list consists of a node's children and, for any children
   * that are `<slot>` elements, the expanded flattened list of `assignedNodes`.
   * For example, if the observed node has children `<a></a><slot></slot><b></b>`
   * and the `<slot>` has one `<div>` assigned to it, then the flattened
   * nodes list is `<a></a><div></div><b></b>`. If the `<slot>` has other
   * `<slot>` elements assigned to it, these are flattened as well.
   *
   * @param {HTMLElement|HTMLSlotElement} node The node for which to return the list of flattened nodes.
   * @return {Array} The list of flattened nodes for the given `node`.
  */
  static getFlattenedNodes(node) {
    if (isSlot(node)) {
      return /** @type {HTMLSlotElement} */ (node).assignedNodes({flatten: true});
    } else {
      return Array.from(node.childNodes).map(node => {
        if (isSlot(node)) {
          return /** @type {HTMLSlotElement} */ (node).assignedNodes({flatten: true});
        } else {
          return [node];
        }
      }).reduce((a, b) => a.concat(b), []);
    }
  }

  /**
   * @param {Node} target Node on which to listen for changes.
   * @param {Function} callback Function called when there are additions
   * or removals from the target's list of flattened nodes.
  */
  constructor(target, callback) {
    /** @type {MutationObserver} */
    this._shadyChildrenObserver = null;
    /** @type {MutationObserver} */
    this._nativeChildrenObserver = null;
    this._connected = false;
    this._target = target;
    this.callback = callback;
    this._effectiveNodes = [];
    this._observer = null;
    this._scheduled = false;
    /** @type {function()} */
    this._boundSchedule = () => {
      this._schedule();
    };
    this.connect();
    this._schedule();
  }

  /**
   * Activates an observer. This method is automatically called when
   * a `FlattenedNodesObserver` is created. It should only be called to
   * re-activate an observer that has been deactivated via the `disconnect` method.
   */
  connect() {
    if (isSlot(this._target)) {
      this._listenSlots([this._target]);
    } else {
      this._listenSlots(this._target.children);
      if (window.ShadyDOM) {
        this._shadyChildrenObserver =
          ShadyDOM.observeChildren(this._target, (mutations) => {
            this._processMutations(mutations);
          });
      } else {
        this._nativeChildrenObserver =
          new MutationObserver((mutations) => {
            this._processMutations(mutations);
          });
        this._nativeChildrenObserver.observe(this._target, {childList: true});
      }
    }
    this._connected = true;
  }

  /**
   * Deactivates the flattened nodes observer. After calling this method
   * the observer callback will not be called when changes to flattened nodes
   * occur. The `connect` method may be subsequently called to reactivate
   * the observer.
   */
  disconnect() {
    if (isSlot(this._target)) {
      this._unlistenSlots([this._target]);
    } else {
      this._unlistenSlots(this._target.children);
      if (window.ShadyDOM && this._shadyChildrenObserver) {
        ShadyDOM.unobserveChildren(this._shadyChildrenObserver);
        this._shadyChildrenObserver = null;
      } else if (this._nativeChildrenObserver) {
        this._nativeChildrenObserver.disconnect();
        this._nativeChildrenObserver = null;
      }
    }
    this._connected = false;
  }

  _schedule() {
    if (!this._scheduled) {
      this._scheduled = true;
      __WEBPACK_IMPORTED_MODULE_2__async_js__["a" /* microTask */].run(() => this.flush());
    }
  }

  _processMutations(mutations) {
    this._processSlotMutations(mutations);
    this.flush();
  }

  _processSlotMutations(mutations) {
    if (mutations) {
      for (let i=0; i < mutations.length; i++) {
        let mutation = mutations[i];
        if (mutation.addedNodes) {
          this._listenSlots(mutation.addedNodes);
        }
        if (mutation.removedNodes) {
          this._unlistenSlots(mutation.removedNodes);
        }
      }
    }
  }

  /**
   * Flushes the observer causing any pending changes to be immediately
   * delivered the observer callback. By default these changes are delivered
   * asynchronously at the next microtask checkpoint.
   *
   * @return {boolean} Returns true if any pending changes caused the observer
   * callback to run.
   */
  flush() {
    if (!this._connected) {
      return false;
    }
    if (window.ShadyDOM) {
      ShadyDOM.flush();
    }
    if (this._nativeChildrenObserver) {
      this._processSlotMutations(this._nativeChildrenObserver.takeRecords());
    } else if (this._shadyChildrenObserver) {
      this._processSlotMutations(this._shadyChildrenObserver.takeRecords());
    }
    this._scheduled = false;
    let info = {
      target: this._target,
      addedNodes: [],
      removedNodes: []
    };
    let newNodes = this.constructor.getFlattenedNodes(this._target);
    let splices = Object(__WEBPACK_IMPORTED_MODULE_1__array_splice_js__["a" /* calculateSplices */])(newNodes,
      this._effectiveNodes);
    // process removals
    for (let i=0, s; (i<splices.length) && (s=splices[i]); i++) {
      for (let j=0, n; (j < s.removed.length) && (n=s.removed[j]); j++) {
        info.removedNodes.push(n);
      }
    }
    // process adds
    for (let i=0, s; (i<splices.length) && (s=splices[i]); i++) {
      for (let j=s.index; j < s.index + s.addedCount; j++) {
        info.addedNodes.push(newNodes[j]);
      }
    }
    // update cache
    this._effectiveNodes = newNodes;
    let didFlush = false;
    if (info.addedNodes.length || info.removedNodes.length) {
      didFlush = true;
      this.callback.call(this._target, info);
    }
    return didFlush;
  }

  _listenSlots(nodeList) {
    for (let i=0; i < nodeList.length; i++) {
      let n = nodeList[i];
      if (isSlot(n)) {
        n.addEventListener('slotchange', this._boundSchedule);
      }
    }
  }

  _unlistenSlots(nodeList) {
    for (let i=0; i < nodeList.length; i++) {
      let n = nodeList[i];
      if (isSlot(n)) {
        n.removeEventListener('slotchange', this._boundSchedule);
      }
    }
  }

}




/***/ }),
/* 269 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export mixinBehaviors */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__legacy_element_mixin_js__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__elements_dom_module_js__ = __webpack_require__(111);



let metaProps = {
  attached: true,
  detached: true,
  ready: true,
  created: true,
  beforeRegister: true,
  registered: true,
  attributeChanged: true,
  // meta objects
  behaviors: true
};

/**
 * Applies a "legacy" behavior or array of behaviors to the provided class.
 *
 * Note: this method will automatically also apply the `Polymer.LegacyElementMixin`
 * to ensure that any legacy behaviors can rely on legacy Polymer API on
 * the underlying element.
 *
 * @param {!(Object|Array)} behaviors Behavior object or array of behaviors.
 * @param {!HTMLElement|function(new:HTMLElement)} klass Element class.
 * @return {function(new:HTMLElement)} Returns a new Element class extended by the
 * passed in `behaviors` and also by `Polymer.LegacyElementMixin`.
 * @memberof Polymer
 * @suppress {invalidCasts, checkTypes}
 */
function mixinBehaviors(behaviors, klass) {
  if (!behaviors) {
    return /** @type {HTMLElement} */(klass);
  }
  // NOTE: ensure the bahevior is extending a class with
  // legacy element api. This is necessary since behaviors expect to be able
  // to access 1.x legacy api.
  klass = Object(__WEBPACK_IMPORTED_MODULE_0__legacy_element_mixin_js__["a" /* LegacyElementMixin */])(klass);
  if (!Array.isArray(behaviors)) {
    behaviors = [behaviors];
  }
  let superBehaviors = klass.prototype.behaviors;
  // get flattened, deduped list of behaviors *not* already on super class
  behaviors = flattenBehaviors(behaviors, null, superBehaviors);
  // mixin new behaviors
  klass = _mixinBehaviors(behaviors, klass);
  if (superBehaviors) {
    behaviors = superBehaviors.concat(behaviors);
  }
  // Set behaviors on prototype for BC...
  klass.prototype.behaviors = behaviors;
  return klass;
}

// NOTE:
// 1.x
// Behaviors were mixed in *in reverse order* and de-duped on the fly.
// The rule was that behavior properties were copied onto the element
// prototype if and only if the property did not already exist.
// Given: Polymer{ behaviors: [A, B, C, A, B]}, property copy order was:
// (1), B, (2), A, (3) C. This means prototype properties win over
// B properties win over A win over C. This mirrors what would happen
// with inheritance if element extended B extended A extended C.
//
// Again given, Polymer{ behaviors: [A, B, C, A, B]}, the resulting
// `behaviors` array was [C, A, B].
// Behavior lifecycle methods were called in behavior array order
// followed by the element, e.g. (1) C.created, (2) A.created,
// (3) B.created, (4) element.created. There was no support for
// super, and "super-behavior" methods were callable only by name).
//
// 2.x
// Behaviors are made into proper mixins which live in the
// element's prototype chain. Behaviors are placed in the element prototype
// eldest to youngest and de-duped youngest to oldest:
// So, first [A, B, C, A, B] becomes [C, A, B] then,
// the element prototype becomes (oldest) (1) Polymer.Element, (2) class(C),
// (3) class(A), (4) class(B), (5) class(Polymer({...})).
// Result:
// This means element properties win over B properties win over A win
// over C. (same as 1.x)
// If lifecycle is called (super then me), order is
// (1) C.created, (2) A.created, (3) B.created, (4) element.created
// (again same as 1.x)
function _mixinBehaviors(behaviors, klass) {
  for (let i=0; i<behaviors.length; i++) {
    let b = behaviors[i];
    if (b) {
      klass = Array.isArray(b) ? _mixinBehaviors(b, klass) :
        GenerateClassFromInfo(b, klass);
    }
  }
  return klass;
}

/**
 * @param {Array} behaviors List of behaviors to flatten.
 * @param {Array=} list Target list to flatten behaviors into.
 * @param {Array=} exclude List of behaviors to exclude from the list.
 * @return {!Array} Returns the list of flattened behaviors.
 */
function flattenBehaviors(behaviors, list, exclude) {
  list = list || [];
  for (let i=behaviors.length-1; i >= 0; i--) {
    let b = behaviors[i];
    if (b) {
      if (Array.isArray(b)) {
        flattenBehaviors(b, list);
      } else {
        // dedup
        if (list.indexOf(b) < 0 && (!exclude || exclude.indexOf(b) < 0)) {
          list.unshift(b);
        }
      }
    } else {
      console.warn('behavior is null, check for missing or 404 import');
    }
  }
  return list;
}

/**
 * @param {!PolymerInit} info Polymer info object
 * @param {function(new:HTMLElement)} Base base class to extend with info object
 * @return {function(new:HTMLElement)} Generated class
 * @suppress {checkTypes}
 * @private
 */
function GenerateClassFromInfo(info, Base) {

  class PolymerGenerated extends Base {

    static get properties() {
      return info.properties;
    }

    static get observers() {
      return info.observers;
    }

    /**
     * @return {HTMLTemplateElement} template for this class
     */
    static get template() {
      // get template first from any imperative set in `info._template`
      return info._template ||
        // next look in dom-module associated with this element's is.
        __WEBPACK_IMPORTED_MODULE_1__elements_dom_module_js__["a" /* DomModule */] && __WEBPACK_IMPORTED_MODULE_1__elements_dom_module_js__["a" /* DomModule */].import(this.is, 'template') ||
        // next look for superclass template (note: use superclass symbol
        // to ensure correct `this.is`)
        Base.template ||
        // finally fall back to `_template` in element's protoype.
        this.prototype._template ||
        null;
    }

    created() {
      super.created();
      if (info.created) {
        info.created.call(this);
      }
    }

    _registered() {
      super._registered();
      /* NOTE: `beforeRegister` is called here for bc, but the behavior
       is different than in 1.x. In 1.0, the method was called *after*
       mixing prototypes together but *before* processing of meta-objects.
       However, dynamic effects can still be set here and can be done either
       in `beforeRegister` or `registered`. It is no longer possible to set
       `is` in `beforeRegister` as you could in 1.x.
      */
      if (info.beforeRegister) {
        info.beforeRegister.call(Object.getPrototypeOf(this));
      }
      if (info.registered) {
        info.registered.call(Object.getPrototypeOf(this));
      }
    }

    _applyListeners() {
      super._applyListeners();
      if (info.listeners) {
        for (let l in info.listeners) {
          this._addMethodEventListenerToNode(this, l, info.listeners[l]);
        }
      }
    }

    // note: exception to "super then me" rule;
    // do work before calling super so that super attributes
    // only apply if not already set.
    _ensureAttributes() {
      if (info.hostAttributes) {
        for (let a in info.hostAttributes) {
          this._ensureAttribute(a, info.hostAttributes[a]);
        }
      }
      super._ensureAttributes();
    }

    ready() {
      super.ready();
      if (info.ready) {
        info.ready.call(this);
      }
    }

    attached() {
      super.attached();
      if (info.attached) {
        info.attached.call(this);
      }
    }

    detached() {
      super.detached();
      if (info.detached) {
        info.detached.call(this);
      }
    }

    attributeChanged(name, old, value) {
      super.attributeChanged(name, old, value);
      if (info.attributeChanged) {
        info.attributeChanged.call(this, name, old, value);
      }
   }
  }

  PolymerGenerated.generatedFrom = info;

  for (let p in info) {
    // NOTE: cannot copy `metaProps` methods onto prototype at least because
    // `super.ready` must be called and is not included in the user fn.
    if (!(p in metaProps)) {
      let pd = Object.getOwnPropertyDescriptor(info, p);
      if (pd) {
        Object.defineProperty(PolymerGenerated.prototype, p, pd);
      }
    }
  }

  return PolymerGenerated;
}

const Class = function(info) {
  if (!info) {
    console.warn('Polymer.Class requires `info` argument');
  }
  let klass = GenerateClassFromInfo(info, info.behaviors ?
    // note: mixinBehaviors ensures `LegacyElementMixin`.
    mixinBehaviors(info.behaviors, HTMLElement) :
    Object(__WEBPACK_IMPORTED_MODULE_0__legacy_element_mixin_js__["a" /* LegacyElementMixin */])(HTMLElement));
  // decorate klass with registration info
  klass.is = info.is;
  return klass;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Class;





/***/ }),
/* 270 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Templatizer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_templatize_js__ = __webpack_require__(62);


let TemplateInstanceBase = __WEBPACK_IMPORTED_MODULE_0__utils_templatize_js__["a" /* TemplateInstanceBase */]; // eslint-disable-line

/**
 * @typedef {{
 *   _templatizerTemplate: HTMLTemplateElement,
 *   _parentModel: boolean,
 *   _instanceProps: Object,
 *   _forwardHostPropV2: Function,
 *   _notifyInstancePropV2: Function,
 *   ctor: TemplateInstanceBase
 * }}
 */
let TemplatizerUser; // eslint-disable-line

/**
 * The `Polymer.Templatizer` behavior adds methods to generate instances of
 * templates that are each managed by an anonymous `Polymer.PropertyEffects`
 * instance where data-bindings in the stamped template content are bound to
 * accessors on itself.
 *
 * This behavior is provided in Polymer 2.x as a hybrid-element convenience
 * only.  For non-hybrid usage, the `Polymer.Templatize` library
 * should be used instead.
 *
 * Example:
 *
 *     // Get a template from somewhere, e.g. light DOM
 *     let template = this.querySelector('template');
 *     // Prepare the template
 *     this.templatize(template);
 *     // Instance the template with an initial data model
 *     let instance = this.stamp({myProp: 'initial'});
 *     // Insert the instance's DOM somewhere, e.g. light DOM
 *     Polymer.dom(this).appendChild(instance.root);
 *     // Changing a property on the instance will propagate to bindings
 *     // in the template
 *     instance.myProp = 'new value';
 *
 * Users of `Templatizer` may need to implement the following abstract
 * API's to determine how properties and paths from the host should be
 * forwarded into to instances:
 *
 *     _forwardHostPropV2: function(prop, value)
 *
 * Likewise, users may implement these additional abstract API's to determine
 * how instance-specific properties that change on the instance should be
 * forwarded out to the host, if necessary.
 *
 *     _notifyInstancePropV2: function(inst, prop, value)
 *
 * In order to determine which properties are instance-specific and require
 * custom notification via `_notifyInstanceProp`, define an `_instanceProps`
 * object containing keys for each instance prop, for example:
 *
 *     _instanceProps: {
 *       item: true,
 *       index: true
 *     }
 *
 * Any properties used in the template that are not defined in _instanceProp
 * will be forwarded out to the Templatize `owner` automatically.
 *
 * Users may also implement the following abstract function to show or
 * hide any DOM generated using `stamp`:
 *
 *     _showHideChildren: function(shouldHide)
 *
 * Note that some callbacks are suffixed with `V2` in the Polymer 2.x behavior
 * as the implementations will need to differ from the callbacks required
 * by the 1.x Templatizer API due to changes in the `TemplateInstance` API
 * between versions 1.x and 2.x.
 *
 * @polymerBehavior
 * @memberof Polymer
 */
let Templatizer = {

  /**
   * Generates an anonymous `TemplateInstance` class (stored as `this.ctor`)
   * for the provided template.  This method should be called once per
   * template to prepare an element for stamping the template, followed
   * by `stamp` to create new instances of the template.
   *
   * @param {HTMLTemplateElement} template Template to prepare
   * @param {boolean=} mutableData When `true`, the generated class will skip
   *   strict dirty-checking for objects and arrays (always consider them to
   *   be "dirty"). Defaults to false.
   * @this {TemplatizerUser}
   */
  templatize(template, mutableData) {
    this._templatizerTemplate = template;
    this.ctor = __WEBPACK_IMPORTED_MODULE_0__utils_templatize_js__["b" /* Templatize */].templatize(template, this, {
      mutableData: Boolean(mutableData),
      parentModel: this._parentModel,
      instanceProps: this._instanceProps,
      forwardHostProp: this._forwardHostPropV2,
      notifyInstanceProp: this._notifyInstancePropV2
    });
  },

  /**
   * Creates an instance of the template prepared by `templatize`.  The object
   * returned is an instance of the anonymous class generated by `templatize`
   * whose `root` property is a document fragment containing newly cloned
   * template content, and which has property accessors corresponding to
   * properties referenced in template bindings.
   *
   * @param {Object=} model Object containing initial property values to
   *   populate into the template bindings.
   * @return {TemplateInstanceBase} Returns the created instance of
   * the template prepared by `templatize`.
   * @this {TemplatizerUser}
   */
  stamp(model) {
    return new this.ctor(model);
  },

  /**
   * Returns the template "model" (`TemplateInstance`) associated with
   * a given element, which serves as the binding scope for the template
   * instance the element is contained in.  A template model should be used
   * to manipulate data associated with this template instance.
   *
   * @param {HTMLElement} el Element for which to return a template model.
   * @return {TemplateInstanceBase} Model representing the binding scope for
   *   the element.
   * @this {TemplatizerUser}
   */
  modelForElement(el) {
    return __WEBPACK_IMPORTED_MODULE_0__utils_templatize_js__["b" /* Templatize */].modelForElement(this._templatizerTemplate, el);
  }
};




/***/ }),
/* 271 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DomBind */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_gesture_event_listeners_js__ = __webpack_require__(117);





/**
 * @constructor
 * @extends {HTMLElement}
 * @implements {Polymer_PropertyEffects}
 * @implements {Polymer_OptionalMutableData}
 * @implements {Polymer_GestureEventListeners}
 */
const domBindBase =
  Object(__WEBPACK_IMPORTED_MODULE_3__mixins_gesture_event_listeners_js__["a" /* GestureEventListeners */])(
    Object(__WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__["b" /* OptionalMutableData */])(
      Object(__WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__["a" /* PropertyEffects */])(HTMLElement)));

/**
 * Custom element to allow using Polymer's template features (data binding,
 * declarative event listeners, etc.) in the main document without defining
 * a new custom element.
 *
 * `<template>` tags utilizing bindings may be wrapped with the `<dom-bind>`
 * element, which will immediately stamp the wrapped template into the main
 * document and bind elements to the `dom-bind` element itself as the
 * binding scope.
 *
 * @polymer
 * @customElement
 * @appliesMixin Polymer.PropertyEffects
 * @appliesMixin Polymer.OptionalMutableData
 * @appliesMixin Polymer.GestureEventListeners
 * @extends {domBindBase}
 * @memberof Polymer
 * @summary Custom element to allow using Polymer's template features (data
 *   binding, declarative event listeners, etc.) in the main document.
 */
class DomBind extends domBindBase {

  static get observedAttributes() { return ['mutable-data']; }

  constructor() {
    super();
    this.root = null;
    this.$ = null;
    this.__children = null;
  }

  // assumes only one observed attribute
  attributeChangedCallback() {
    this.mutableData = true;
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.__removeChildren();
  }

  __insertChildren() {
    this.parentNode.insertBefore(this.root, this);
  }

  __removeChildren() {
    if (this.__children) {
      for (let i=0; i<this.__children.length; i++) {
        this.root.appendChild(this.__children[i]);
      }
    }
  }

  /**
   * Forces the element to render its content. This is typically only
   * necessary to call if HTMLImports with the async attribute are used.
   */
  render() {
    let template;
    if (!this.__children) {
      template = /** @type {HTMLTemplateElement} */(template || this.querySelector('template'));
      if (!template) {
        // Wait until childList changes and template should be there by then
        let observer = new MutationObserver(() => {
          template = /** @type {HTMLTemplateElement} */(this.querySelector('template'));
          if (template) {
            observer.disconnect();
            this.render();
          } else {
            throw new Error('dom-bind requires a <template> child');
          }
        });
        observer.observe(this, {childList: true});
        return;
      }
      this.root = this._stampTemplate(template);
      this.$ = this.root.$;
      this.__children = [];
      for (let n=this.root.firstChild; n; n=n.nextSibling) {
        this.__children[this.__children.length] = n;
      }
      this._enableProperties();
    }
    this.__insertChildren();
    this.dispatchEvent(new CustomEvent('dom-change', {
      bubbles: true,
      composed: true
    }));
  }

}

customElements.define('dom-bind', DomBind);




/***/ }),
/* 272 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DomRepeat */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_element_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_debounce_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_flush_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_mutable_data_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_path_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_async_js__ = __webpack_require__(6);








let TemplateInstanceBase = __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__["a" /* TemplateInstanceBase */]; // eslint-disable-line

/**
 * @constructor
 * @implements {Polymer_OptionalMutableData}
 * @extends {Polymer.Element}
 */
const domRepeatBase = Object(__WEBPACK_IMPORTED_MODULE_4__mixins_mutable_data_js__["b" /* OptionalMutableData */])(__WEBPACK_IMPORTED_MODULE_0__polymer_element_js__["a" /* Element */]);

/**
 * The `<dom-repeat>` element will automatically stamp and binds one instance
 * of template content to each object in a user-provided array.
 * `dom-repeat` accepts an `items` property, and one instance of the template
 * is stamped for each item into the DOM at the location of the `dom-repeat`
 * element.  The `item` property will be set on each instance's binding
 * scope, thus templates should bind to sub-properties of `item`.
 *
 * Example:
 *
 * ```html
 * <dom-module id="employee-list">
 *
 *   <template>
 *
 *     <div> Employee list: </div>
 *     <template is="dom-repeat" items="{{employees}}">
 *         <div>First name: <span>{{item.first}}</span></div>
 *         <div>Last name: <span>{{item.last}}</span></div>
 *     </template>
 *
 *   </template>
 *
 *   <script>
 *     Polymer({
 *       is: 'employee-list',
 *       ready: function() {
 *         this.employees = [
 *             {first: 'Bob', last: 'Smith'},
 *             {first: 'Sally', last: 'Johnson'},
 *             ...
 *         ];
 *       }
 *     });
 *   < /script>
 *
 * </dom-module>
 * ```
 *
 * Notifications for changes to items sub-properties will be forwarded to template
 * instances, which will update via the normal structured data notification system.
 *
 * Mutations to the `items` array itself should be made using the Array
 * mutation API's on `Polymer.Base` (`push`, `pop`, `splice`, `shift`,
 * `unshift`), and template instances will be kept in sync with the data in the
 * array.
 *
 * Events caught by event handlers within the `dom-repeat` template will be
 * decorated with a `model` property, which represents the binding scope for
 * each template instance.  The model is an instance of Polymer.Base, and should
 * be used to manipulate data on the instance, for example
 * `event.model.set('item.checked', true);`.
 *
 * Alternatively, the model for a template instance for an element stamped by
 * a `dom-repeat` can be obtained using the `modelForElement` API on the
 * `dom-repeat` that stamped it, for example
 * `this.$.domRepeat.modelForElement(event.target).set('item.checked', true);`.
 * This may be useful for manipulating instance data of event targets obtained
 * by event handlers on parents of the `dom-repeat` (event delegation).
 *
 * A view-specific filter/sort may be applied to each `dom-repeat` by supplying a
 * `filter` and/or `sort` property.  This may be a string that names a function on
 * the host, or a function may be assigned to the property directly.  The functions
 * should implemented following the standard `Array` filter/sort API.
 *
 * In order to re-run the filter or sort functions based on changes to sub-fields
 * of `items`, the `observe` property may be set as a space-separated list of
 * `item` sub-fields that should cause a re-filter/sort when modified.  If
 * the filter or sort function depends on properties not contained in `items`,
 * the user should observe changes to those properties and call `render` to update
 * the view based on the dependency change.
 *
 * For example, for an `dom-repeat` with a filter of the following:
 *
 * ```js
 * isEngineer: function(item) {
 *     return item.type == 'engineer' || item.manager.type == 'engineer';
 * }
 * ```
 *
 * Then the `observe` property should be configured as follows:
 *
 * ```html
 * <template is="dom-repeat" items="{{employees}}"
 *           filter="isEngineer" observe="type manager.type">
 * ```
 *
 * @customElement
 * @polymer
 * @memberof Polymer
 * @extends {domRepeatBase}
 * @appliesMixin Polymer.OptionalMutableData
 * @summary Custom element for stamping instance of a template bound to
 *   items in an array.
 */
class DomRepeat extends domRepeatBase {

  // Not needed to find template; can be removed once the analyzer
  // can find the tag name from customElements.define call
  static get is() { return 'dom-repeat'; }

  static get template() { return null; }

  static get properties() {

    /**
     * Fired whenever DOM is added or removed by this template (by
     * default, rendering occurs lazily).  To force immediate rendering, call
     * `render`.
     *
     * @event dom-change
     */
    return {

      /**
       * An array containing items determining how many instances of the template
       * to stamp and that that each template instance should bind to.
       */
      items: {
        type: Array
      },

      /**
       * The name of the variable to add to the binding scope for the array
       * element associated with a given template instance.
       */
      as: {
        type: String,
        value: 'item'
      },

      /**
       * The name of the variable to add to the binding scope with the index
       * of the instance in the sorted and filtered list of rendered items.
       * Note, for the index in the `this.items` array, use the value of the
       * `itemsIndexAs` property.
       */
      indexAs: {
        type: String,
        value: 'index'
      },

      /**
       * The name of the variable to add to the binding scope with the index
       * of the instance in the `this.items` array. Note, for the index of
       * this instance in the sorted and filtered list of rendered items,
       * use the value of the `indexAs` property.
       */
      itemsIndexAs: {
        type: String,
        value: 'itemsIndex'
      },

      /**
       * A function that should determine the sort order of the items.  This
       * property should either be provided as a string, indicating a method
       * name on the element's host, or else be an actual function.  The
       * function should match the sort function passed to `Array.sort`.
       * Using a sort function has no effect on the underlying `items` array.
       */
      sort: {
        type: Function,
        observer: '__sortChanged'
      },

      /**
       * A function that can be used to filter items out of the view.  This
       * property should either be provided as a string, indicating a method
       * name on the element's host, or else be an actual function.  The
       * function should match the sort function passed to `Array.filter`.
       * Using a filter function has no effect on the underlying `items` array.
       */
      filter: {
        type: Function,
        observer: '__filterChanged'
      },

      /**
       * When using a `filter` or `sort` function, the `observe` property
       * should be set to a space-separated list of the names of item
       * sub-fields that should trigger a re-sort or re-filter when changed.
       * These should generally be fields of `item` that the sort or filter
       * function depends on.
       */
      observe: {
        type: String,
        observer: '__observeChanged'
      },

      /**
       * When using a `filter` or `sort` function, the `delay` property
       * determines a debounce time after a change to observed item
       * properties that must pass before the filter or sort is re-run.
       * This is useful in rate-limiting shuffing of the view when
       * item changes may be frequent.
       */
      delay: Number,

      /**
       * Count of currently rendered items after `filter` (if any) has been applied.
       * If "chunking mode" is enabled, `renderedItemCount` is updated each time a
       * set of template instances is rendered.
       *
       */
      renderedItemCount: {
        type: Number,
        notify: true,
        readOnly: true
      },

      /**
       * Defines an initial count of template instances to render after setting
       * the `items` array, before the next paint, and puts the `dom-repeat`
       * into "chunking mode".  The remaining items will be created and rendered
       * incrementally at each animation frame therof until all instances have
       * been rendered.
       */
      initialCount: {
        type: Number,
        observer: '__initializeChunking'
      },

      /**
       * When `initialCount` is used, this property defines a frame rate to
       * target by throttling the number of instances rendered each frame to
       * not exceed the budget for the target frame rate.  Setting this to a
       * higher number will allow lower latency and higher throughput for
       * things like event handlers, but will result in a longer time for the
       * remaining items to complete rendering.
       */
      targetFramerate: {
        type: Number,
        value: 20
      },

      _targetFrameTime: {
        type: Number,
        computed: '__computeFrameTime(targetFramerate)'
      }

    };

  }

  static get observers() {
    return [ '__itemsChanged(items.*)' ];
  }

  constructor() {
    super();
    this.__instances = [];
    this.__limit = Infinity;
    this.__pool = [];
    this.__renderDebouncer = null;
    this.__itemsIdxToInstIdx = {};
    this.__chunkCount = null;
    this.__lastChunkTime = null;
    this.__sortFn = null;
    this.__filterFn = null;
    this.__observePaths = null;
    this.__ctor = null;
    this.__isDetached = true;
    this.template = null;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.__isDetached = true;
    for (let i=0; i<this.__instances.length; i++) {
      this.__detachInstance(i);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // only perform attachment if the element was previously detached.
    if (this.__isDetached) {
      this.__isDetached = false;
      let parent = this.parentNode;
      for (let i=0; i<this.__instances.length; i++) {
        this.__attachInstance(i, parent);
      }
    }
  }

  __ensureTemplatized() {
    // Templatizing (generating the instance constructor) needs to wait
    // until ready, since won't have its template content handed back to
    // it until then
    if (!this.__ctor) {
      let template = this.template = this.querySelector('template');
      if (!template) {
        // // Wait until childList changes and template should be there by then
        let observer = new MutationObserver(() => {
          if (this.querySelector('template')) {
            observer.disconnect();
            this.__render();
          } else {
            throw new Error('dom-repeat requires a <template> child');
          }
        });
        observer.observe(this, {childList: true});
        return false;
      }
      // Template instance props that should be excluded from forwarding
      let instanceProps = {};
      instanceProps[this.as] = true;
      instanceProps[this.indexAs] = true;
      instanceProps[this.itemsIndexAs] = true;
      this.__ctor = __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__["b" /* Templatize */].templatize(template, this, {
        mutableData: this.mutableData,
        parentModel: true,
        instanceProps: instanceProps,
        /**
         * @this {this}
         * @param {string} prop Property to set
         * @param {*} value Value to set property to
         */
        forwardHostProp: function(prop, value) {
          let i$ = this.__instances;
          for (let i=0, inst; (i<i$.length) && (inst=i$[i]); i++) {
            inst.forwardHostProp(prop, value);
          }
        },
        /**
         * @this {this}
         * @param {Object} inst Instance to notify
         * @param {string} prop Property to notify
         * @param {*} value Value to notify
         */
        notifyInstanceProp: function(inst, prop, value) {
          if (Object(__WEBPACK_IMPORTED_MODULE_5__utils_path_js__["e" /* matches */])(this.as, prop)) {
            let idx = inst[this.itemsIndexAs];
            if (prop == this.as) {
              this.items[idx] = value;
            }
            let path = Object(__WEBPACK_IMPORTED_MODULE_5__utils_path_js__["i" /* translate */])(this.as, 'items.' + idx, prop);
            this.notifyPath(path, value);
          }
        }
      });
    }
    return true;
  }

  __getMethodHost() {
    // Technically this should be the owner of the outermost template.
    // In shadow dom, this is always getRootNode().host, but we can
    // approximate this via cooperation with our dataHost always setting
    // `_methodHost` as long as there were bindings (or id's) on this
    // instance causing it to get a dataHost.
    return this.__dataHost._methodHost || this.__dataHost;
  }

  __sortChanged(sort) {
    let methodHost = this.__getMethodHost();
    this.__sortFn = sort && (typeof sort == 'function' ? sort :
      function() { return methodHost[sort].apply(methodHost, arguments); });
    if (this.items) {
      this.__debounceRender(this.__render);
    }
  }

  __filterChanged(filter) {
    let methodHost = this.__getMethodHost();
    this.__filterFn = filter && (typeof filter == 'function' ? filter :
      function() { return methodHost[filter].apply(methodHost, arguments); });
    if (this.items) {
      this.__debounceRender(this.__render);
    }
  }

  __computeFrameTime(rate) {
    return Math.ceil(1000/rate);
  }

  __initializeChunking() {
    if (this.initialCount) {
      this.__limit = this.initialCount;
      this.__chunkCount = this.initialCount;
      this.__lastChunkTime = performance.now();
    }
  }

  __tryRenderChunk() {
    // Debounced so that multiple calls through `_render` between animation
    // frames only queue one new rAF (e.g. array mutation & chunked render)
    if (this.items && this.__limit < this.items.length) {
      this.__debounceRender(this.__requestRenderChunk);
    }
  }

  __requestRenderChunk() {
    requestAnimationFrame(()=>this.__renderChunk());
  }

  __renderChunk() {
    // Simple auto chunkSize throttling algorithm based on feedback loop:
    // measure actual time between frames and scale chunk count by ratio
    // of target/actual frame time
    let currChunkTime = performance.now();
    let ratio = this._targetFrameTime / (currChunkTime - this.__lastChunkTime);
    this.__chunkCount = Math.round(this.__chunkCount * ratio) || 1;
    this.__limit += this.__chunkCount;
    this.__lastChunkTime = currChunkTime;
    this.__debounceRender(this.__render);
  }

  __observeChanged() {
    this.__observePaths = this.observe &&
      this.observe.replace('.*', '.').split(' ');
  }

  __itemsChanged(change) {
    if (this.items && !Array.isArray(this.items)) {
      console.warn('dom-repeat expected array for `items`, found', this.items);
    }
    // If path was to an item (e.g. 'items.3' or 'items.3.foo'), forward the
    // path to that instance synchronously (retuns false for non-item paths)
    if (!this.__handleItemPath(change.path, change.value)) {
      // Otherwise, the array was reset ('items') or spliced ('items.splices'),
      // so queue a full refresh
      this.__initializeChunking();
      this.__debounceRender(this.__render);
    }
  }

  __handleObservedPaths(path) {
    if (this.__observePaths) {
      path = path.substring(path.indexOf('.') + 1);
      let paths = this.__observePaths;
      for (let i=0; i<paths.length; i++) {
        if (path.indexOf(paths[i]) === 0) {
          this.__debounceRender(this.__render, this.delay);
          return true;
        }
      }
    }
  }

  /**
   * @param {function(this:DomRepeat)} fn Function to debounce.
   * @param {number=} delay Delay in ms to debounce by.
   */
  __debounceRender(fn, delay = 0) {
    this.__renderDebouncer = __WEBPACK_IMPORTED_MODULE_2__utils_debounce_js__["a" /* Debouncer */].debounce(
          this.__renderDebouncer
        , delay > 0 ? __WEBPACK_IMPORTED_MODULE_6__utils_async_js__["b" /* timeOut */].after(delay) : __WEBPACK_IMPORTED_MODULE_6__utils_async_js__["a" /* microTask */]
        , fn.bind(this));
    Object(__WEBPACK_IMPORTED_MODULE_3__utils_flush_js__["a" /* enqueueDebouncer */])(this.__renderDebouncer);
  }

  /**
   * Forces the element to render its content. Normally rendering is
   * asynchronous to a provoking change. This is done for efficiency so
   * that multiple changes trigger only a single render. The render method
   * should be called if, for example, template rendering is required to
   * validate application state.
   */
  render() {
    // Queue this repeater, then flush all in order
    this.__debounceRender(this.__render);
    Object(__WEBPACK_IMPORTED_MODULE_3__utils_flush_js__["b" /* flush */])();
  }

  __render() {
    if (!this.__ensureTemplatized()) {
      // No template found yet
      return;
    }
    this.__applyFullRefresh();
    // Reset the pool
    // TODO(kschaaf): Reuse pool across turns and nested templates
    // Now that objects/arrays are re-evaluated when set, we can safely
    // reuse pooled instances across turns, however we still need to decide
    // semantics regarding how long to hold, how many to hold, etc.
    this.__pool.length = 0;
    // Set rendered item count
    this._setRenderedItemCount(this.__instances.length);
    // Notify users
    this.dispatchEvent(new CustomEvent('dom-change', {
      bubbles: true,
      composed: true
    }));
    // Check to see if we need to render more items
    this.__tryRenderChunk();
  }

  __applyFullRefresh() {
    let items = this.items || [];
    let isntIdxToItemsIdx = new Array(items.length);
    for (let i=0; i<items.length; i++) {
      isntIdxToItemsIdx[i] = i;
    }
    // Apply user filter
    if (this.__filterFn) {
      isntIdxToItemsIdx = isntIdxToItemsIdx.filter((i, idx, array) =>
        this.__filterFn(items[i], idx, array));
    }
    // Apply user sort
    if (this.__sortFn) {
      isntIdxToItemsIdx.sort((a, b) => this.__sortFn(items[a], items[b]));
    }
    // items->inst map kept for item path forwarding
    const itemsIdxToInstIdx = this.__itemsIdxToInstIdx = {};
    let instIdx = 0;
    // Generate instances and assign items
    const limit = Math.min(isntIdxToItemsIdx.length, this.__limit);
    for (; instIdx<limit; instIdx++) {
      let inst = this.__instances[instIdx];
      let itemIdx = isntIdxToItemsIdx[instIdx];
      let item = items[itemIdx];
      itemsIdxToInstIdx[itemIdx] = instIdx;
      if (inst && instIdx < this.__limit) {
        inst._setPendingProperty(this.as, item);
        inst._setPendingProperty(this.indexAs, instIdx);
        inst._setPendingProperty(this.itemsIndexAs, itemIdx);
        inst._flushProperties();
      } else {
        this.__insertInstance(item, instIdx, itemIdx);
      }
    }
    // Remove any extra instances from previous state
    for (let i=this.__instances.length-1; i>=instIdx; i--) {
      this.__detachAndRemoveInstance(i);
    }
  }

  __detachInstance(idx) {
    let inst = this.__instances[idx];
    for (let i=0; i<inst.children.length; i++) {
      let el = inst.children[i];
      inst.root.appendChild(el);
    }
    return inst;
  }

  __attachInstance(idx, parent) {
    let inst = this.__instances[idx];
    parent.insertBefore(inst.root, this);
  }

  __detachAndRemoveInstance(idx) {
    let inst = this.__detachInstance(idx);
    if (inst) {
      this.__pool.push(inst);
    }
    this.__instances.splice(idx, 1);
  }

  __stampInstance(item, instIdx, itemIdx) {
    let model = {};
    model[this.as] = item;
    model[this.indexAs] = instIdx;
    model[this.itemsIndexAs] = itemIdx;
    return new this.__ctor(model);
  }

  __insertInstance(item, instIdx, itemIdx) {
    let inst = this.__pool.pop();
    if (inst) {
      // TODO(kschaaf): If the pool is shared across turns, hostProps
      // need to be re-set to reused instances in addition to item
      inst._setPendingProperty(this.as, item);
      inst._setPendingProperty(this.indexAs, instIdx);
      inst._setPendingProperty(this.itemsIndexAs, itemIdx);
      inst._flushProperties();
    } else {
      inst = this.__stampInstance(item, instIdx, itemIdx);
    }
    let beforeRow = this.__instances[instIdx + 1];
    let beforeNode = beforeRow ? beforeRow.children[0] : this;
    this.parentNode.insertBefore(inst.root, beforeNode);
    this.__instances[instIdx] = inst;
    return inst;
  }

  // Implements extension point from Templatize mixin
  _showHideChildren(hidden) {
    for (let i=0; i<this.__instances.length; i++) {
      this.__instances[i]._showHideChildren(hidden);
    }
  }

  // Called as a side effect of a host items.<key>.<path> path change,
  // responsible for notifying item.<path> changes to inst for key
  __handleItemPath(path, value) {
    let itemsPath = path.slice(6); // 'items.'.length == 6
    let dot = itemsPath.indexOf('.');
    let itemsIdx = dot < 0 ? itemsPath : itemsPath.substring(0, dot);
    // If path was index into array...
    if (itemsIdx == parseInt(itemsIdx, 10)) {
      let itemSubPath = dot < 0 ? '' : itemsPath.substring(dot+1);
      // If the path is observed, it will trigger a full refresh
      this.__handleObservedPaths(itemSubPath);
      // Note, even if a rull refresh is triggered, always do the path
      // notification because unless mutableData is used for dom-repeat
      // and all elements in the instance subtree, a full refresh may
      // not trigger the proper update.
      let instIdx = this.__itemsIdxToInstIdx[itemsIdx];
      let inst = this.__instances[instIdx];
      if (inst) {
        let itemPath = this.as + (itemSubPath ? '.' + itemSubPath : '');
        // This is effectively `notifyPath`, but avoids some of the overhead
        // of the public API
        inst._setPendingPropertyOrPath(itemPath, value, false, true);
        inst._flushProperties();
      }
      return true;
    }
  }

  /**
   * Returns the item associated with a given element stamped by
   * this `dom-repeat`.
   *
   * Note, to modify sub-properties of the item,
   * `modelForElement(el).set('item.<sub-prop>', value)`
   * should be used.
   *
   * @param {HTMLElement} el Element for which to return the item.
   * @return {*} Item associated with the element.
   */
  itemForElement(el) {
    let instance = this.modelForElement(el);
    return instance && instance[this.as];
  }

  /**
   * Returns the inst index for a given element stamped by this `dom-repeat`.
   * If `sort` is provided, the index will reflect the sorted order (rather
   * than the original array order).
   *
   * @param {HTMLElement} el Element for which to return the index.
   * @return {*} Row index associated with the element (note this may
   *   not correspond to the array index if a user `sort` is applied).
   */
  indexForElement(el) {
    let instance = this.modelForElement(el);
    return instance && instance[this.indexAs];
  }

  /**
   * Returns the template "model" associated with a given element, which
   * serves as the binding scope for the template instance the element is
   * contained in. A template model is an instance of `Polymer.Base`, and
   * should be used to manipulate data associated with this template instance.
   *
   * Example:
   *
   *   let model = modelForElement(el);
   *   if (model.index < 10) {
   *     model.set('item.checked', true);
   *   }
   *
   * @param {HTMLElement} el Element for which to return a template model.
   * @return {TemplateInstanceBase} Model representing the binding scope for
   *   the element.
   */
  modelForElement(el) {
    return __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__["b" /* Templatize */].modelForElement(this.template, el);
  }

}

customElements.define(DomRepeat.is, DomRepeat);




/***/ }),
/* 273 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DomIf */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_element_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_debounce_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_flush_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_async_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_path_js__ = __webpack_require__(28);







/**
 * The `<dom-if>` element will stamp a light-dom `<template>` child when
 * the `if` property becomes truthy, and the template can use Polymer
 * data-binding and declarative event features when used in the context of
 * a Polymer element's template.
 *
 * When `if` becomes falsey, the stamped content is hidden but not
 * removed from dom. When `if` subsequently becomes truthy again, the content
 * is simply re-shown. This approach is used due to its favorable performance
 * characteristics: the expense of creating template content is paid only
 * once and lazily.
 *
 * Set the `restamp` property to true to force the stamped content to be
 * created / destroyed when the `if` condition changes.
 *
 * @customElement
 * @polymer
 * @extends Polymer.Element
 * @memberof Polymer
 * @summary Custom element that conditionally stamps and hides or removes
 *   template content based on a boolean flag.
 */
class DomIf extends __WEBPACK_IMPORTED_MODULE_0__polymer_element_js__["a" /* Element */] {

  // Not needed to find template; can be removed once the analyzer
  // can find the tag name from customElements.define call
  static get is() { return 'dom-if'; }

  static get template() { return null; }

  static get properties() {

    return {

      /**
       * Fired whenever DOM is added or removed/hidden by this template (by
       * default, rendering occurs lazily).  To force immediate rendering, call
       * `render`.
       *
       * @event dom-change
       */

      /**
       * A boolean indicating whether this template should stamp.
       */
      if: {
        type: Boolean,
        observer: '__debounceRender'
      },

      /**
       * When true, elements will be removed from DOM and discarded when `if`
       * becomes false and re-created and added back to the DOM when `if`
       * becomes true.  By default, stamped elements will be hidden but left
       * in the DOM when `if` becomes false, which is generally results
       * in better performance.
       */
      restamp: {
        type: Boolean,
        observer: '__debounceRender'
      }

    };

  }

  constructor() {
    super();
    this.__renderDebouncer = null;
    this.__invalidProps = null;
    this.__instance = null;
    this._lastIf = false;
    this.__ctor = null;
  }

  __debounceRender() {
    // Render is async for 2 reasons:
    // 1. To eliminate dom creation trashing if user code thrashes `if` in the
    //    same turn. This was more common in 1.x where a compound computed
    //    property could result in the result changing multiple times, but is
    //    mitigated to a large extent by batched property processing in 2.x.
    // 2. To avoid double object propagation when a bag including values bound
    //    to the `if` property as well as one or more hostProps could enqueue
    //    the <dom-if> to flush before the <template>'s host property
    //    forwarding. In that scenario creating an instance would result in
    //    the host props being set once, and then the enqueued changes on the
    //    template would set properties a second time, potentially causing an
    //    object to be set to an instance more than once.  Creating the
    //    instance async from flushing data ensures this doesn't happen. If
    //    we wanted a sync option in the future, simply having <dom-if> flush
    //    (or clear) its template's pending host properties before creating
    //    the instance would also avoid the problem.
    this.__renderDebouncer = __WEBPACK_IMPORTED_MODULE_2__utils_debounce_js__["a" /* Debouncer */].debounce(
          this.__renderDebouncer
        , __WEBPACK_IMPORTED_MODULE_4__utils_async_js__["a" /* microTask */]
        , () => this.__render());
    Object(__WEBPACK_IMPORTED_MODULE_3__utils_flush_js__["a" /* enqueueDebouncer */])(this.__renderDebouncer);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (!this.parentNode ||
        (this.parentNode.nodeType == Node.DOCUMENT_FRAGMENT_NODE &&
         !this.parentNode.host)) {
      this.__teardownInstance();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.if) {
      this.__debounceRender();
    }
  }

  /**
   * Forces the element to render its content. Normally rendering is
   * asynchronous to a provoking change. This is done for efficiency so
   * that multiple changes trigger only a single render. The render method
   * should be called if, for example, template rendering is required to
   * validate application state.
   */
  render() {
    Object(__WEBPACK_IMPORTED_MODULE_3__utils_flush_js__["b" /* flush */])();
  }

  __render() {
    if (this.if) {
      if (!this.__ensureInstance()) {
        // No template found yet
        return;
      }
      this._showHideChildren();
    } else if (this.restamp) {
      this.__teardownInstance();
    }
    if (!this.restamp && this.__instance) {
      this._showHideChildren();
    }
    if (this.if != this._lastIf) {
      this.dispatchEvent(new CustomEvent('dom-change', {
        bubbles: true,
        composed: true
      }));
      this._lastIf = this.if;
    }
  }

  __ensureInstance() {
    let parentNode = this.parentNode;
    // Guard against element being detached while render was queued
    if (parentNode) {
      if (!this.__ctor) {
        let template = this.querySelector('template');
        if (!template) {
          // Wait until childList changes and template should be there by then
          let observer = new MutationObserver(() => {
            if (this.querySelector('template')) {
              observer.disconnect();
              this.__render();
            } else {
              throw new Error('dom-if requires a <template> child');
            }
          });
          observer.observe(this, {childList: true});
          return false;
        }
        this.__ctor = __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__["b" /* Templatize */].templatize(template, this, {
          // dom-if templatizer instances require `mutable: true`, as
          // `__syncHostProperties` relies on that behavior to sync objects
          mutableData: true,
          /**
           * @param {string} prop Property to forward
           * @param {*} value Value of property
           * @this {this}
           */
          forwardHostProp: function(prop, value) {
            if (this.__instance) {
              if (this.if) {
                this.__instance.forwardHostProp(prop, value);
              } else {
                // If we have an instance but are squelching host property
                // forwarding due to if being false, note the invalidated
                // properties so `__syncHostProperties` can sync them the next
                // time `if` becomes true
                this.__invalidProps = this.__invalidProps || Object.create(null);
                this.__invalidProps[Object(__WEBPACK_IMPORTED_MODULE_5__utils_path_js__["g" /* root */])(prop)] = true;
              }
            }
          }
        });
      }
      if (!this.__instance) {
        this.__instance = new this.__ctor();
        parentNode.insertBefore(this.__instance.root, this);
      } else {
        this.__syncHostProperties();
        let c$ = this.__instance.children;
        if (c$ && c$.length) {
          // Detect case where dom-if was re-attached in new position
          let lastChild = this.previousSibling;
          if (lastChild !== c$[c$.length-1]) {
            for (let i=0, n; (i<c$.length) && (n=c$[i]); i++) {
              parentNode.insertBefore(n, this);
            }
          }
        }
      }
    }
    return true;
  }

  __syncHostProperties() {
    let props = this.__invalidProps;
    if (props) {
      for (let prop in props) {
        this.__instance._setPendingProperty(prop, this.__dataHost[prop]);
      }
      this.__invalidProps = null;
      this.__instance._flushProperties();
    }
  }

  __teardownInstance() {
    if (this.__instance) {
      let c$ = this.__instance.children;
      if (c$ && c$.length) {
        // use first child parent, for case when dom-if may have been detached
        let parent = c$[0].parentNode;
        for (let i=0, n; (i<c$.length) && (n=c$[i]); i++) {
          parent.removeChild(n);
        }
      }
      this.__instance = null;
      this.__invalidProps = null;
    }
  }

  _showHideChildren() {
    let hidden = this.__hideTemplateChildren__ || !this.if;
    if (this.__instance) {
      this.__instance._showHideChildren(hidden);
    }
  }

}

customElements.define(DomIf.is, DomIf);




/***/ }),
/* 274 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ArraySelectorMixin */
/* unused harmony export ArraySelector */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_element_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_array_splice_js__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_element_mixin_js__ = __webpack_require__(54);





/**
 * Element mixin for recording dynamic associations between item paths in a
 * master `items` array and a `selected` array such that path changes to the
 * master array (at the host) element or elsewhere via data-binding) are
 * correctly propagated to items in the selected array and vice-versa.
 *
 * The `items` property accepts an array of user data, and via the
 * `select(item)` and `deselect(item)` API, updates the `selected` property
 * which may be bound to other parts of the application, and any changes to
 * sub-fields of `selected` item(s) will be kept in sync with items in the
 * `items` array.  When `multi` is false, `selected` is a property
 * representing the last selected item.  When `multi` is true, `selected`
 * is an array of multiply selected items.
 *
 * @polymer
 * @mixinFunction
 * @appliesMixin Polymer.ElementMixin
 * @memberof Polymer
 * @summary Element mixin for recording dynamic associations between item paths in a
 * master `items` array and a `selected` array
 */
let ArraySelectorMixin = Object(__WEBPACK_IMPORTED_MODULE_1__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @constructor
   * @extends {superClass}
   * @implements {Polymer_ElementMixin}
   */
  let elementBase = Object(__WEBPACK_IMPORTED_MODULE_3__mixins_element_mixin_js__["a" /* ElementMixin */])(superClass);

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_ArraySelectorMixin}
   * @unrestricted
   */
  class ArraySelectorMixin extends elementBase {

    static get properties() {

      return {

        /**
         * An array containing items from which selection will be made.
         */
        items: {
          type: Array,
        },

        /**
         * When `true`, multiple items may be selected at once (in this case,
         * `selected` is an array of currently selected items).  When `false`,
         * only one item may be selected at a time.
         */
        multi: {
          type: Boolean,
          value: false,
        },

        /**
         * When `multi` is true, this is an array that contains any selected.
         * When `multi` is false, this is the currently selected item, or `null`
         * if no item is selected.
         * @type {?(Object|Array<!Object>)}
         */
        selected: {
          type: Object,
          notify: true
        },

        /**
         * When `multi` is false, this is the currently selected item, or `null`
         * if no item is selected.
         * @type {?Object}
         */
        selectedItem: {
          type: Object,
          notify: true
        },

        /**
         * When `true`, calling `select` on an item that is already selected
         * will deselect the item.
         */
        toggle: {
          type: Boolean,
          value: false
        }

      };
    }

    static get observers() {
      return ['__updateSelection(multi, items.*)'];
    }

    constructor() {
      super();
      this.__lastItems = null;
      this.__lastMulti = null;
      this.__selectedMap = null;
    }

    __updateSelection(multi, itemsInfo) {
      let path = itemsInfo.path;
      if (path == 'items') {
        // Case 1 - items array changed, so diff against previous array and
        // deselect any removed items and adjust selected indices
        let newItems = itemsInfo.base || [];
        let lastItems = this.__lastItems;
        let lastMulti = this.__lastMulti;
        if (multi !== lastMulti) {
          this.clearSelection();
        }
        if (lastItems) {
          let splices = Object(__WEBPACK_IMPORTED_MODULE_2__utils_array_splice_js__["a" /* calculateSplices */])(newItems, lastItems);
          this.__applySplices(splices);
        }
        this.__lastItems = newItems;
        this.__lastMulti = multi;
      } else if (itemsInfo.path == 'items.splices') {
        // Case 2 - got specific splice information describing the array mutation:
        // deselect any removed items and adjust selected indices
        this.__applySplices(itemsInfo.value.indexSplices);
      } else {
        // Case 3 - an array element was changed, so deselect the previous
        // item for that index if it was previously selected
        let part = path.slice('items.'.length);
        let idx = parseInt(part, 10);
        if ((part.indexOf('.') < 0) && part == idx) {
          this.__deselectChangedIdx(idx);
        }
      }
    }

    __applySplices(splices) {
      let selected = this.__selectedMap;
      // Adjust selected indices and mark removals
      for (let i=0; i<splices.length; i++) {
        let s = splices[i];
        selected.forEach((idx, item) => {
          if (idx < s.index) {
            // no change
          } else if (idx >= s.index + s.removed.length) {
            // adjust index
            selected.set(item, idx + s.addedCount - s.removed.length);
          } else {
            // remove index
            selected.set(item, -1);
          }
        });
        for (let j=0; j<s.addedCount; j++) {
          let idx = s.index + j;
          if (selected.has(this.items[idx])) {
            selected.set(this.items[idx], idx);
          }
        }
      }
      // Update linked paths
      this.__updateLinks();
      // Remove selected items that were removed from the items array
      let sidx = 0;
      selected.forEach((idx, item) => {
        if (idx < 0) {
          if (this.multi) {
            this.splice('selected', sidx, 1);
          } else {
            this.selected = this.selectedItem = null;
          }
          selected.delete(item);
        } else {
          sidx++;
        }
      });
    }

    __updateLinks() {
      this.__dataLinkedPaths = {};
      if (this.multi) {
        let sidx = 0;
        this.__selectedMap.forEach(idx => {
          if (idx >= 0) {
            this.linkPaths('items.' + idx, 'selected.' + sidx++);
          }
        });
      } else {
        this.__selectedMap.forEach(idx => {
          this.linkPaths('selected', 'items.' + idx);
          this.linkPaths('selectedItem', 'items.' + idx);
        });
      }
    }

    /**
     * Clears the selection state.
     *
     */
    clearSelection() {
      // Unbind previous selection
      this.__dataLinkedPaths = {};
      // The selected map stores 3 pieces of information:
      // key: items array object
      // value: items array index
      // order: selected array index
      this.__selectedMap = new Map();
      // Initialize selection
      this.selected = this.multi ? [] : null;
      this.selectedItem = null;
    }

    /**
     * Returns whether the item is currently selected.
     *
     * @param {*} item Item from `items` array to test
     * @return {boolean} Whether the item is selected
     */
    isSelected(item) {
      return this.__selectedMap.has(item);
    }

    /**
     * Returns whether the item is currently selected.
     *
     * @param {number} idx Index from `items` array to test
     * @return {boolean} Whether the item is selected
     */
    isIndexSelected(idx) {
      return this.isSelected(this.items[idx]);
    }

    __deselectChangedIdx(idx) {
      let sidx = this.__selectedIndexForItemIndex(idx);
      if (sidx >= 0) {
        let i = 0;
        this.__selectedMap.forEach((idx, item) => {
          if (sidx == i++) {
            this.deselect(item);
          }
        });
      }
    }

    __selectedIndexForItemIndex(idx) {
      let selected = this.__dataLinkedPaths['items.' + idx];
      if (selected) {
        return parseInt(selected.slice('selected.'.length), 10);
      }
    }

    /**
     * Deselects the given item if it is already selected.
     *
     * @param {*} item Item from `items` array to deselect
     */
    deselect(item) {
      let idx = this.__selectedMap.get(item);
      if (idx >= 0) {
        this.__selectedMap.delete(item);
        let sidx;
        if (this.multi) {
          sidx = this.__selectedIndexForItemIndex(idx);
        }
        this.__updateLinks();
        if (this.multi) {
          this.splice('selected', sidx, 1);
        } else {
          this.selected = this.selectedItem = null;
        }
      }
    }

    /**
     * Deselects the given index if it is already selected.
     *
     * @param {number} idx Index from `items` array to deselect
     */
    deselectIndex(idx) {
      this.deselect(this.items[idx]);
    }

    /**
     * Selects the given item.  When `toggle` is true, this will automatically
     * deselect the item if already selected.
     *
     * @param {*} item Item from `items` array to select
     */
    select(item) {
      this.selectIndex(this.items.indexOf(item));
    }

    /**
     * Selects the given index.  When `toggle` is true, this will automatically
     * deselect the item if already selected.
     *
     * @param {number} idx Index from `items` array to select
     */
    selectIndex(idx) {
      let item = this.items[idx];
      if (!this.isSelected(item)) {
        if (!this.multi) {
          this.__selectedMap.clear();
        }
        this.__selectedMap.set(item, idx);
        this.__updateLinks();
        if (this.multi) {
          this.push('selected', item);
        } else {
          this.selected = this.selectedItem = item;
        }
      } else if (this.toggle) {
        this.deselectIndex(idx);
      }
    }

  }

  return ArraySelectorMixin;

});



/**
 * @constructor
 * @extends {Polymer.Element}
 * @implements {Polymer_ArraySelectorMixin}
 */
let baseArraySelector = ArraySelectorMixin(__WEBPACK_IMPORTED_MODULE_0__polymer_element_js__["a" /* Element */]);

/**
 * Element implementing the `Polymer.ArraySelector` mixin, which records
 * dynamic associations between item paths in a master `items` array and a
 * `selected` array such that path changes to the master array (at the host)
 * element or elsewhere via data-binding) are correctly propagated to items
 * in the selected array and vice-versa.
 *
 * The `items` property accepts an array of user data, and via the
 * `select(item)` and `deselect(item)` API, updates the `selected` property
 * which may be bound to other parts of the application, and any changes to
 * sub-fields of `selected` item(s) will be kept in sync with items in the
 * `items` array.  When `multi` is false, `selected` is a property
 * representing the last selected item.  When `multi` is true, `selected`
 * is an array of multiply selected items.
 *
 * Example:
 *
 * ```html
 * <dom-module id="employee-list">
 *
 *   <template>
 *
 *     <div> Employee list: </div>
 *     <template is="dom-repeat" id="employeeList" items="{{employees}}">
 *         <div>First name: <span>{{item.first}}</span></div>
 *         <div>Last name: <span>{{item.last}}</span></div>
 *         <button on-click="toggleSelection">Select</button>
 *     </template>
 *
 *     <array-selector id="selector" items="{{employees}}" selected="{{selected}}" multi toggle></array-selector>
 *
 *     <div> Selected employees: </div>
 *     <template is="dom-repeat" items="{{selected}}">
 *         <div>First name: <span>{{item.first}}</span></div>
 *         <div>Last name: <span>{{item.last}}</span></div>
 *     </template>
 *
 *   </template>
 *
 * </dom-module>
 * ```
 *
 * ```js
 * Polymer({
 *   is: 'employee-list',
 *   ready() {
 *     this.employees = [
 *         {first: 'Bob', last: 'Smith'},
 *         {first: 'Sally', last: 'Johnson'},
 *         ...
 *     ];
 *   },
 *   toggleSelection(e) {
 *     let item = this.$.employeeList.itemForElement(e.target);
 *     this.$.selector.select(item);
 *   }
 * });
 * ```
 *
 * @polymer
 * @customElement
 * @extends {baseArraySelector}
 * @appliesMixin Polymer.ArraySelectorMixin
 * @memberof Polymer
 * @summary Custom element that links paths between an input `items` array and
 *   an output `selected` item or array based on calls to its selection API.
 */
class ArraySelector extends baseArraySelector {
  // Not needed to find template; can be removed once the analyzer
  // can find the tag name from customElements.define call
  static get is() { return 'array-selector'; }
}
customElements.define(ArraySelector.is, ArraySelector);



/***/ }),
/* 275 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CustomStyle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webcomponents_shadycss_entrypoints_custom_style_interface_js__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_style_gather_js__ = __webpack_require__(110);



const attr = 'include';

const CustomStyleInterface = window.ShadyCSS.CustomStyleInterface;

/**
 * Custom element for defining styles in the main document that can take
 * advantage of [shady DOM](https://github.com/webcomponents/shadycss) shims
 * for style encapsulation, custom properties, and custom mixins.
 *
 * - Document styles defined in a `<custom-style>` are shimmed to ensure they
 *   do not leak into local DOM when running on browsers without native
 *   Shadow DOM.
 * - Custom properties can be defined in a `<custom-style>`. Use the `html` selector
 *   to define custom properties that apply to all custom elements.
 * - Custom mixins can be defined in a `<custom-style>`, if you import the optional
 *   [apply shim](https://github.com/webcomponents/shadycss#about-applyshim)
 *   (`shadycss/apply-shim.html`).
 *
 * To use:
 *
 * - Import `custom-style.html`.
 * - Place a `<custom-style>` element in the main document, wrapping an inline `<style>` tag that
 *   contains the CSS rules you want to shim.
 *
 * For example:
 *
 * ```
 * <!-- import apply shim--only required if using mixins -->
 * <link rel="import href="bower_components/shadycss/apply-shim.html">
 * <!-- import custom-style element -->
 * <link rel="import" href="bower_components/polymer/lib/elements/custom-style.html">
 * ...
 * <custom-style>
 *   <style>
 *     html {
 *       --custom-color: blue;
 *       --custom-mixin: {
 *         font-weight: bold;
 *         color: red;
 *       };
 *     }
 *   </style>
 * </custom-style>
 * ```
 *
 * @customElement
 * @extends HTMLElement
 * @memberof Polymer
 * @summary Custom element for defining styles in the main document that can
 *   take advantage of Polymer's style scoping and custom properties shims.
 */
class CustomStyle extends HTMLElement {
  constructor() {
    super();
    this._style = null;
    CustomStyleInterface.addCustomStyle(this);
  }
  /**
   * Returns the light-DOM `<style>` child this element wraps.  Upon first
   * call any style modules referenced via the `include` attribute will be
   * concatenated to this element's `<style>`.
   *
   * @return {HTMLStyleElement} This element's light-DOM `<style>`
   */
  getStyle() {
    if (this._style) {
      return this._style;
    }
    const style = /** @type {HTMLStyleElement} */(this.querySelector('style'));
    if (!style) {
      return null;
    }
    this._style = style;
    const include = style.getAttribute(attr);
    if (include) {
      style.removeAttribute(attr);
      style.textContent = Object(__WEBPACK_IMPORTED_MODULE_1__utils_style_gather_js__["b" /* cssFromModules */])(include) + style.textContent;
    }
    return this._style;
  }
}

window.customElements.define('custom-style', CustomStyle);



/***/ }),
/* 276 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_custom_style_interface_js__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_common_utils_js__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_style_settings_js__ = __webpack_require__(56);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/







const customStyleInterface = new __WEBPACK_IMPORTED_MODULE_0__src_custom_style_interface_js__["a" /* default */]();

if (!window.ShadyCSS) {
  window.ShadyCSS = {
    /**
     * @param {HTMLTemplateElement} template
     * @param {string} elementName
     * @param {string=} elementExtends
     */
    prepareTemplate(template, elementName, elementExtends) {}, // eslint-disable-line no-unused-vars

    /**
     * @param {Element} element
     * @param {Object=} properties
     */
    styleSubtree(element, properties) {
      customStyleInterface.processStyles();
      Object(__WEBPACK_IMPORTED_MODULE_1__src_common_utils_js__["c" /* updateNativeProperties */])(element, properties);
    },

    /**
     * @param {Element} element
     */
    styleElement(element) { // eslint-disable-line no-unused-vars
      customStyleInterface.processStyles();
    },

    /**
     * @param {Object=} properties
     */
    styleDocument(properties) {
      customStyleInterface.processStyles();
      Object(__WEBPACK_IMPORTED_MODULE_1__src_common_utils_js__["c" /* updateNativeProperties */])(document.body, properties);
    },

    /**
     * @param {Element} element
     * @param {string} property
     * @return {string}
     */
    getComputedStyleValue(element, property) {
      return Object(__WEBPACK_IMPORTED_MODULE_1__src_common_utils_js__["b" /* getComputedStyleValue */])(element, property);
    },
    nativeCss: __WEBPACK_IMPORTED_MODULE_2__src_style_settings_js__["a" /* nativeCssVariables */],
    nativeShadow: __WEBPACK_IMPORTED_MODULE_2__src_style_settings_js__["b" /* nativeShadow */]
  }
}

window.ShadyCSS.CustomStyleInterface = customStyleInterface;

/***/ }),
/* 277 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_mutable_data_js__ = __webpack_require__(30);


let mutablePropertyChange;
(
  /** @suppress {missingProperties} */
  (function() {
  mutablePropertyChange = __WEBPACK_IMPORTED_MODULE_0__mixins_mutable_data_js__["a" /* MutableData */]._mutablePropertyChange;
}))();

const MutableDataBehavior = {

  /**
   * Overrides `Polymer.PropertyEffects` to provide option for skipping
   * strict equality checking for Objects and Arrays.
   *
   * This method pulls the value to dirty check against from the `__dataTemp`
   * cache (rather than the normal `__data` cache) for Objects.  Since the temp
   * cache is cleared at the end of a turn, this implementation allows
   * side-effects of deep object changes to be processed by re-setting the
   * same object (using the temp cache as an in-turn backstop to prevent
   * cycles due to 2-way notification).
   *
   * @param {string} property Property name
   * @param {*} value New property value
   * @param {*} old Previous property value
   * @return {boolean} Whether the property should be considered a change
   * @protected
   */
  _shouldPropertyChange(property, value, old) {
    return mutablePropertyChange(this, property, value, old, true);
  }
};
/* unused harmony export MutableDataBehavior */


const OptionalMutableDataBehavior = {

  properties: {
    /**
     * Instance-level flag for configuring the dirty-checking strategy
     * for this element.  When true, Objects and Arrays will skip dirty
     * checking, otherwise strict equality checking will be used.
     */
    mutableData: Boolean
  },

  /**
   * Overrides `Polymer.PropertyEffects` to skip strict equality checking
   * for Objects and Arrays.
   *
   * Pulls the value to dirty check against from the `__dataTemp` cache
   * (rather than the normal `__data` cache) for Objects.  Since the temp
   * cache is cleared at the end of a turn, this implementation allows
   * side-effects of deep object changes to be processed by re-setting the
   * same object (using the temp cache as an in-turn backstop to prevent
   * cycles due to 2-way notification).
   *
   * @param {string} property Property name
   * @param {*} value New property value
   * @param {*} old Previous property value
   * @return {boolean} Whether the property should be considered a change
   * @this {this}
   * @protected
   */
  _shouldPropertyChange(property, value, old) {
    return mutablePropertyChange(this, property, value, old, this.mutableData);
  }
};
/* unused harmony export OptionalMutableDataBehavior */



/***/ }),
/* 278 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);

const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer);


/***/ }),
/* 279 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iron_behaviors_iron_button_state_js__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paper_ripple_behavior_js__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__iron_behaviors_iron_control_state_js__ = __webpack_require__(122);





const PaperButtonBehaviorImpl = {
  properties: {
    /**
     * The z-depth of this element, from 0-5. Setting to 0 will remove the
     * shadow, and each increasing number greater than 0 will be "deeper"
     * than the last.
     *
     * @attribute elevation
     * @type number
     * @default 1
     */
    elevation: {
      type: Number,
      reflectToAttribute: true,
      readOnly: true
    }
  },

  observers: [
    '_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)',
    '_computeKeyboardClass(receivedFocusFromKeyboard)'
  ],

  hostAttributes: {
    role: 'button',
    tabindex: '0',
    animated: true
  },

  _calculateElevation: function() {
    var e = 1;
    if (this.disabled) {
      e = 0;
    } else if (this.active || this.pressed) {
      e = 4;
    } else if (this.receivedFocusFromKeyboard) {
      e = 3;
    }
    this._setElevation(e);
  },

  _computeKeyboardClass: function(receivedFocusFromKeyboard) {
    this.toggleClass('keyboard-focus', receivedFocusFromKeyboard);
  },

  /**
   * In addition to `IronButtonState` behavior, when space key goes down,
   * create a ripple down effect.
   *
   * @param {!KeyboardEvent} event .
   */
  _spaceKeyDownHandler: function(event) {
    __WEBPACK_IMPORTED_MODULE_1__iron_behaviors_iron_button_state_js__["b" /* IronButtonStateImpl */]._spaceKeyDownHandler.call(this, event);
    // Ensure that there is at most one ripple when the space key is held down.
    if (this.hasRipple() && this.getRipple().ripples.length < 1) {
      this._ripple.uiDownAction();
    }
  },

  /**
   * In addition to `IronButtonState` behavior, when space key goes up,
   * create a ripple up effect.
   *
   * @param {!KeyboardEvent} event .
   */
  _spaceKeyUpHandler: function(event) {
    __WEBPACK_IMPORTED_MODULE_1__iron_behaviors_iron_button_state_js__["b" /* IronButtonStateImpl */]._spaceKeyUpHandler.call(this, event);
    if (this.hasRipple()) {
      this._ripple.uiUpAction();
    }
  }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = PaperButtonBehaviorImpl;


const PaperButtonBehavior = [
  __WEBPACK_IMPORTED_MODULE_1__iron_behaviors_iron_button_state_js__["a" /* IronButtonState */],
  __WEBPACK_IMPORTED_MODULE_3__iron_behaviors_iron_control_state_js__["a" /* IronControlState */],
  __WEBPACK_IMPORTED_MODULE_2__paper_ripple_behavior_js__["a" /* PaperRippleBehavior */],
  PaperButtonBehaviorImpl
];
/* harmony export (immutable) */ __webpack_exports__["a"] = PaperButtonBehavior;



/***/ }),
/* 280 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__paper_ripple_paper_ripple_js__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iron_behaviors_iron_button_state_js__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polymer_lib_legacy_polymer_dom_js__ = __webpack_require__(11);





const PaperRippleBehavior = {
  properties: {
    /**
     * If true, the element will not produce a ripple effect when interacted
     * with via the pointer.
     */
    noink: {
      type: Boolean,
      observer: '_noinkChanged'
    },

    /**
     * @type {Element|undefined}
     */
    _rippleContainer: {
      type: Object,
    }
  },

  /**
   * Ensures a `<paper-ripple>` element is available when the element is
   * focused.
   */
  _buttonStateChanged: function() {
    if (this.focused) {
      this.ensureRipple();
    }
  },

  /**
   * In addition to the functionality provided in `IronButtonState`, ensures
   * a ripple effect is created when the element is in a `pressed` state.
   */
  _downHandler: function(event) {
    __WEBPACK_IMPORTED_MODULE_2__iron_behaviors_iron_button_state_js__["b" /* IronButtonStateImpl */]._downHandler.call(this, event);
    if (this.pressed) {
      this.ensureRipple(event);
    }
  },

  /**
   * Ensures this element contains a ripple effect. For startup efficiency
   * the ripple effect is dynamically on demand when needed.
   * @param {!Event=} optTriggeringEvent (optional) event that triggered the
   * ripple.
   */
  ensureRipple: function(optTriggeringEvent) {
    if (!this.hasRipple()) {
      this._ripple = this._createRipple();
      this._ripple.noink = this.noink;
      var rippleContainer = this._rippleContainer || this.root;
      if (rippleContainer) {
        Object(__WEBPACK_IMPORTED_MODULE_3__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(rippleContainer).appendChild(this._ripple);
      }
      if (optTriggeringEvent) {
        // Check if the event happened inside of the ripple container
        // Fall back to host instead of the root because distributed text
        // nodes are not valid event targets
        var domContainer = Object(__WEBPACK_IMPORTED_MODULE_3__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(this._rippleContainer || this);
        var target = Object(__WEBPACK_IMPORTED_MODULE_3__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(optTriggeringEvent).rootTarget;
        if (domContainer.deepContains( /** @type {Node} */(target))) {
          this._ripple.uiDownAction(optTriggeringEvent);
        }
      }
    }
  },

  /**
   * Returns the `<paper-ripple>` element used by this element to create
   * ripple effects. The element's ripple is created on demand, when
   * necessary, and calling this method will force the
   * ripple to be created.
   */
  getRipple: function() {
    this.ensureRipple();
    return this._ripple;
  },

  /**
   * Returns true if this element currently contains a ripple effect.
   * @return {boolean}
   */
  hasRipple: function() {
    return Boolean(this._ripple);
  },

  /**
   * Create the element's ripple effect via creating a `<paper-ripple>`.
   * Override this method to customize the ripple element.
   * @return {!PaperRippleElement} Returns a `<paper-ripple>` element.
   */
  _createRipple: function() {
    return /** @type {!PaperRippleElement} */ (
        document.createElement('paper-ripple'));
  },

  _noinkChanged: function(noink) {
    if (this.hasRipple()) {
      this._ripple.noink = noink;
    }
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = PaperRippleBehavior;



/***/ }),
/* 281 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iron_a11y_keys_behavior_iron_a11y_keys_behavior_js__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polymer_lib_legacy_polymer_dom_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polymer_lib_legacy_polymer_fn_js__ = __webpack_require__(61);





var Utility = {
  distance: function(x1, y1, x2, y2) {
    var xDelta = (x1 - x2);
    var yDelta = (y1 - y2);

    return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
  },

  now: window.performance && window.performance.now ?
      window.performance.now.bind(window.performance) : Date.now
};

/**
 * @param {HTMLElement} element
 * @constructor
 */
function ElementMetrics(element) {
  this.element = element;
  this.width = this.boundingRect.width;
  this.height = this.boundingRect.height;

  this.size = Math.max(this.width, this.height);
}

ElementMetrics.prototype = {
  get boundingRect () {
    return this.element.getBoundingClientRect();
  },

  furthestCornerDistanceFrom: function(x, y) {
    var topLeft = Utility.distance(x, y, 0, 0);
    var topRight = Utility.distance(x, y, this.width, 0);
    var bottomLeft = Utility.distance(x, y, 0, this.height);
    var bottomRight = Utility.distance(x, y, this.width, this.height);

    return Math.max(topLeft, topRight, bottomLeft, bottomRight);
  }
};

/**
 * @param {HTMLElement} element
 * @constructor
 */
function Ripple(element) {
  this.element = element;
  this.color = window.getComputedStyle(element).color;

  this.wave = document.createElement('div');
  this.waveContainer = document.createElement('div');
  this.wave.style.backgroundColor = this.color;
  this.wave.classList.add('wave');
  this.waveContainer.classList.add('wave-container');
  Object(__WEBPACK_IMPORTED_MODULE_2__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(this.waveContainer).appendChild(this.wave);

  this.resetInteractionState();
}

Ripple.MAX_RADIUS = 300;

Ripple.prototype = {
  get recenters() {
    return this.element.recenters;
  },

  get center() {
    return this.element.center;
  },

  get mouseDownElapsed() {
    var elapsed;

    if (!this.mouseDownStart) {
      return 0;
    }

    elapsed = Utility.now() - this.mouseDownStart;

    if (this.mouseUpStart) {
      elapsed -= this.mouseUpElapsed;
    }

    return elapsed;
  },

  get mouseUpElapsed() {
    return this.mouseUpStart ?
      Utility.now () - this.mouseUpStart : 0;
  },

  get mouseDownElapsedSeconds() {
    return this.mouseDownElapsed / 1000;
  },

  get mouseUpElapsedSeconds() {
    return this.mouseUpElapsed / 1000;
  },

  get mouseInteractionSeconds() {
    return this.mouseDownElapsedSeconds + this.mouseUpElapsedSeconds;
  },

  get initialOpacity() {
    return this.element.initialOpacity;
  },

  get opacityDecayVelocity() {
    return this.element.opacityDecayVelocity;
  },

  get radius() {
    var width2 = this.containerMetrics.width * this.containerMetrics.width;
    var height2 = this.containerMetrics.height * this.containerMetrics.height;
    var waveRadius = Math.min(
      Math.sqrt(width2 + height2),
      Ripple.MAX_RADIUS
    ) * 1.1 + 5;

    var duration = 1.1 - 0.2 * (waveRadius / Ripple.MAX_RADIUS);
    var timeNow = this.mouseInteractionSeconds / duration;
    var size = waveRadius * (1 - Math.pow(80, -timeNow));

    return Math.abs(size);
  },

  get opacity() {
    if (!this.mouseUpStart) {
      return this.initialOpacity;
    }

    return Math.max(
      0,
      this.initialOpacity - this.mouseUpElapsedSeconds * this.opacityDecayVelocity
    );
  },

  get outerOpacity() {
    // Linear increase in background opacity, capped at the opacity
    // of the wavefront (waveOpacity).
    var outerOpacity = this.mouseUpElapsedSeconds * 0.3;
    var waveOpacity = this.opacity;

    return Math.max(
      0,
      Math.min(outerOpacity, waveOpacity)
    );
  },

  get isOpacityFullyDecayed() {
    return this.opacity < 0.01 &&
      this.radius >= Math.min(this.maxRadius, Ripple.MAX_RADIUS);
  },

  get isRestingAtMaxRadius() {
    return this.opacity >= this.initialOpacity &&
      this.radius >= Math.min(this.maxRadius, Ripple.MAX_RADIUS);
  },

  get isAnimationComplete() {
    return this.mouseUpStart ?
      this.isOpacityFullyDecayed : this.isRestingAtMaxRadius;
  },

  get translationFraction() {
    return Math.min(
      1,
      this.radius / this.containerMetrics.size * 2 / Math.sqrt(2)
    );
  },

  get xNow() {
    if (this.xEnd) {
      return this.xStart + this.translationFraction * (this.xEnd - this.xStart);
    }

    return this.xStart;
  },

  get yNow() {
    if (this.yEnd) {
      return this.yStart + this.translationFraction * (this.yEnd - this.yStart);
    }

    return this.yStart;
  },

  get isMouseDown() {
    return this.mouseDownStart && !this.mouseUpStart;
  },

  resetInteractionState: function() {
    this.maxRadius = 0;
    this.mouseDownStart = 0;
    this.mouseUpStart = 0;

    this.xStart = 0;
    this.yStart = 0;
    this.xEnd = 0;
    this.yEnd = 0;
    this.slideDistance = 0;

    this.containerMetrics = new ElementMetrics(this.element);
  },

  draw: function() {
    var scale;
    var translateString;
    var dx;
    var dy;

    this.wave.style.opacity = this.opacity;

    scale = this.radius / (this.containerMetrics.size / 2);
    dx = this.xNow - (this.containerMetrics.width / 2);
    dy = this.yNow - (this.containerMetrics.height / 2);


    // 2d transform for safari because of border-radius and overflow:hidden clipping bug.
    // https://bugs.webkit.org/show_bug.cgi?id=98538
    this.waveContainer.style.webkitTransform = 'translate(' + dx + 'px, ' + dy + 'px)';
    this.waveContainer.style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0)';
    this.wave.style.webkitTransform = 'scale(' + scale + ',' + scale + ')';
    this.wave.style.transform = 'scale3d(' + scale + ',' + scale + ',1)';
  },

  /** @param {Event=} event */
  downAction: function(event) {
    var xCenter = this.containerMetrics.width / 2;
    var yCenter = this.containerMetrics.height / 2;

    this.resetInteractionState();
    this.mouseDownStart = Utility.now();

    if (this.center) {
      this.xStart = xCenter;
      this.yStart = yCenter;
      this.slideDistance = Utility.distance(
        this.xStart, this.yStart, this.xEnd, this.yEnd
      );
    } else {
      this.xStart = event ?
          event.detail.x - this.containerMetrics.boundingRect.left :
          this.containerMetrics.width / 2;
      this.yStart = event ?
          event.detail.y - this.containerMetrics.boundingRect.top :
          this.containerMetrics.height / 2;
    }

    if (this.recenters) {
      this.xEnd = xCenter;
      this.yEnd = yCenter;
      this.slideDistance = Utility.distance(
        this.xStart, this.yStart, this.xEnd, this.yEnd
      );
    }

    this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(
      this.xStart,
      this.yStart
    );

    this.waveContainer.style.top =
      (this.containerMetrics.height - this.containerMetrics.size) / 2 + 'px';
    this.waveContainer.style.left =
      (this.containerMetrics.width - this.containerMetrics.size) / 2 + 'px';

    this.waveContainer.style.width = this.containerMetrics.size + 'px';
    this.waveContainer.style.height = this.containerMetrics.size + 'px';
  },

  /** @param {Event=} event */
  upAction: function(event) {
    if (!this.isMouseDown) {
      return;
    }

    this.mouseUpStart = Utility.now();
  },

  remove: function() {
    Object(__WEBPACK_IMPORTED_MODULE_2__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(this.waveContainer.parentNode).removeChild(
      this.waveContainer
    );
  }
};

Object(__WEBPACK_IMPORTED_MODULE_3__polymer_lib_legacy_polymer_fn_js__["a" /* Polymer */])({
  _template: `
    <style>
      :host {
        display: block;
        position: absolute;
        border-radius: inherit;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,
         * creating a node (with a position:absolute) in the middle of an event
         * handler "interrupts" that event handler (which happens when the
         * ripple is created on demand) */
        pointer-events: none;
      }

      :host([animating]) {
        /* This resolves a rendering issue in Chrome (as of 40) where the
           ripple is not properly clipped by its parent (which may have
           rounded corners). See: http://jsbin.com/temexa/4

           Note: We only apply this style conditionally. Otherwise, the browser
           will create a new compositing layer for every ripple element on the
           page, and that would be bad. */
        -webkit-transform: translate(0, 0);
        transform: translate3d(0, 0, 0);
      }

      #background,
      #waves,
      .wave-container,
      .wave {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      #background,
      .wave {
        opacity: 0;
      }

      #waves,
      .wave {
        overflow: hidden;
      }

      .wave-container,
      .wave {
        border-radius: 50%;
      }

      :host(.circle) #background,
      :host(.circle) #waves {
        border-radius: 50%;
      }

      :host(.circle) .wave-container {
        overflow: hidden;
      }
    </style>

    <div id="background"></div>
    <div id="waves"></div>
`,

  is: 'paper-ripple',

  behaviors: [
    __WEBPACK_IMPORTED_MODULE_1__iron_a11y_keys_behavior_iron_a11y_keys_behavior_js__["a" /* IronA11yKeysBehavior */]
  ],

  properties: {
    /**
     * The initial opacity set on the wave.
     *
     * @attribute initialOpacity
     * @type number
     * @default 0.25
     */
    initialOpacity: {
      type: Number,
      value: 0.25
    },

    /**
     * How fast (opacity per second) the wave fades out.
     *
     * @attribute opacityDecayVelocity
     * @type number
     * @default 0.8
     */
    opacityDecayVelocity: {
      type: Number,
      value: 0.8
    },

    /**
     * If true, ripples will exhibit a gravitational pull towards
     * the center of their container as they fade away.
     *
     * @attribute recenters
     * @type boolean
     * @default false
     */
    recenters: {
      type: Boolean,
      value: false
    },

    /**
     * If true, ripples will center inside its container
     *
     * @attribute recenters
     * @type boolean
     * @default false
     */
    center: {
      type: Boolean,
      value: false
    },

    /**
     * A list of the visual ripples.
     *
     * @attribute ripples
     * @type Array
     * @default []
     */
    ripples: {
      type: Array,
      value: function() {
        return [];
      }
    },

    /**
     * True when there are visible ripples animating within the
     * element.
     */
    animating: {
      type: Boolean,
      readOnly: true,
      reflectToAttribute: true,
      value: false
    },

    /**
     * If true, the ripple will remain in the "down" state until `holdDown`
     * is set to false again.
     */
    holdDown: {
      type: Boolean,
      value: false,
      observer: '_holdDownChanged'
    },

    /**
     * If true, the ripple will not generate a ripple effect
     * via pointer interaction.
     * Calling ripple's imperative api like `simulatedRipple` will
     * still generate the ripple effect.
     */
    noink: {
      type: Boolean,
      value: false
    },

    _animating: {
      type: Boolean
    },

    _boundAnimate: {
      type: Function,
      value: function() {
        return this.animate.bind(this);
      }
    }
  },

  get target () {
    return this.keyEventTarget;
  },

  keyBindings: {
    'enter:keydown': '_onEnterKeydown',
    'space:keydown': '_onSpaceKeydown',
    'space:keyup': '_onSpaceKeyup'
  },

  attached: function() {
    // Set up a11yKeysBehavior to listen to key events on the target,
    // so that space and enter activate the ripple even if the target doesn't
    // handle key events. The key handlers deal with `noink` themselves.
    if (this.parentNode.nodeType == 11) { // DOCUMENT_FRAGMENT_NODE
      this.keyEventTarget = Object(__WEBPACK_IMPORTED_MODULE_2__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(this).getOwnerRoot().host;
    } else {
      this.keyEventTarget = this.parentNode;
    }
    var keyEventTarget = /** @type {!EventTarget} */ (this.keyEventTarget);
    this.listen(keyEventTarget, 'up', 'uiUpAction');
    this.listen(keyEventTarget, 'down', 'uiDownAction');
  },

  detached: function() {
    this.unlisten(this.keyEventTarget, 'up', 'uiUpAction');
    this.unlisten(this.keyEventTarget, 'down', 'uiDownAction');
    this.keyEventTarget = null;
  },

  get shouldKeepAnimating () {
    for (var index = 0; index < this.ripples.length; ++index) {
      if (!this.ripples[index].isAnimationComplete) {
        return true;
      }
    }

    return false;
  },

  simulatedRipple: function() {
    this.downAction(null);

    // Please see polymer/polymer#1305
    this.async(function() {
      this.upAction();
    }, 1);
  },

  /**
   * Provokes a ripple down effect via a UI event,
   * respecting the `noink` property.
   * @param {Event=} event
   */
  uiDownAction: function(event) {
    if (!this.noink) {
      this.downAction(event);
    }
  },

  /**
   * Provokes a ripple down effect via a UI event,
   * *not* respecting the `noink` property.
   * @param {Event=} event
   */
  downAction: function(event) {
    if (this.holdDown && this.ripples.length > 0) {
      return;
    }

    var ripple = this.addRipple();

    ripple.downAction(event);

    if (!this._animating) {
      this._animating = true;
      this.animate();
    }
  },

  /**
   * Provokes a ripple up effect via a UI event,
   * respecting the `noink` property.
   * @param {Event=} event
   */
  uiUpAction: function(event) {
    if (!this.noink) {
      this.upAction(event);
    }
  },

  /**
   * Provokes a ripple up effect via a UI event,
   * *not* respecting the `noink` property.
   * @param {Event=} event
   */
  upAction: function(event) {
    if (this.holdDown) {
      return;
    }

    this.ripples.forEach(function(ripple) {
      ripple.upAction(event);
    });

    this._animating = true;
    this.animate();
  },

  onAnimationComplete: function() {
    this._animating = false;
    this.$.background.style.backgroundColor = null;
    this.fire('transitionend');
  },

  addRipple: function() {
    var ripple = new Ripple(this);

    Object(__WEBPACK_IMPORTED_MODULE_2__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(this.$.waves).appendChild(ripple.waveContainer);
    this.$.background.style.backgroundColor = ripple.color;
    this.ripples.push(ripple);

    this._setAnimating(true);

    return ripple;
  },

  removeRipple: function(ripple) {
    var rippleIndex = this.ripples.indexOf(ripple);

    if (rippleIndex < 0) {
      return;
    }

    this.ripples.splice(rippleIndex, 1);

    ripple.remove();

    if (!this.ripples.length) {
      this._setAnimating(false);
    }
  },

  /**
   * This conflicts with Element#antimate().
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
   * @suppress {checkTypes}
   */
  animate: function() {
    if (!this._animating) {
      return;
    }
    var index;
    var ripple;

    for (index = 0; index < this.ripples.length; ++index) {
      ripple = this.ripples[index];

      ripple.draw();

      this.$.background.style.opacity = ripple.outerOpacity;

      if (ripple.isOpacityFullyDecayed && !ripple.isRestingAtMaxRadius) {
        this.removeRipple(ripple);
      }
    }

    if (!this.shouldKeepAnimating && this.ripples.length === 0) {
      this.onAnimationComplete();
    } else {
      window.requestAnimationFrame(this._boundAnimate);
    }
  },

  _onEnterKeydown: function() {
    this.uiDownAction();
    this.async(this.uiUpAction, 1);
  },

  _onSpaceKeydown: function() {
    this.uiDownAction();
  },

  _onSpaceKeyup: function() {
    this.uiUpAction();
  },

  // note: holdDown does not respect noink since it can be a focus based
  // effect.
  _holdDownChanged: function(newVal, oldVal) {
    if (oldVal === undefined) {
      return;
    }
    if (newVal) {
      this.downAction();
    } else {
      this.upAction();
    }
  }

  /**
  Fired when the animation finishes.
  This is useful if you want to wait until
  the ripple animation finishes to perform some action.

  @event transitionend
  @param {{node: Object}} detail Contains the animated node.
  */
});


/***/ }),
/* 282 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shadow_js__ = __webpack_require__(283);


const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="paper-material-styles">
  <template>
    <style>
      :host, html {
        --paper-material: {
          display: block;
          position: relative;
        };
        --paper-material-elevation-1: {
          @apply --shadow-elevation-2dp;
        };
        --paper-material-elevation-2: {
          @apply --shadow-elevation-4dp;
        };
        --paper-material-elevation-3: {
          @apply --shadow-elevation-6dp;
        };
        --paper-material-elevation-4: {
          @apply --shadow-elevation-8dp;
        };
        --paper-material-elevation-5: {
          @apply --shadow-elevation-16dp;
        };
      }
      :host(.paper-material), .paper-material {
        @apply --paper-material;
      }
      :host(.paper-material[elevation="1"]), .paper-material[elevation="1"] {
        @apply --paper-material-elevation-1;
      }
      :host(.paper-material[elevation="2"]), .paper-material[elevation="2"] {
        @apply --paper-material-elevation-2;
      }
      :host(.paper-material[elevation="3"]), .paper-material[elevation="3"] {
        @apply --paper-material-elevation-3;
      }
      :host(.paper-material[elevation="4"]), .paper-material[elevation="4"] {
        @apply --paper-material-elevation-4;
      }
      :host(.paper-material[elevation="5"]), .paper-material[elevation="5"] {
        @apply --paper-material-elevation-5;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer);


/***/ }),
/* 283 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);

const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<custom-style>
  <style is="custom-style">
    html {

      --shadow-transition: {
        transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      };

      --shadow-none: {
        box-shadow: none;
      };

      /* from http://codepen.io/shyndman/pen/c5394ddf2e8b2a5c9185904b57421cdb */

      --shadow-elevation-2dp: {
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
      };

      --shadow-elevation-3dp: {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
                    0 1px 8px 0 rgba(0, 0, 0, 0.12),
                    0 3px 3px -2px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-4dp: {
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12),
                    0 2px 4px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-6dp: {
        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-8dp: {
        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
                    0 3px 14px 2px rgba(0, 0, 0, 0.12),
                    0 5px 5px -3px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-12dp: {
        box-shadow: 0 12px 16px 1px rgba(0, 0, 0, 0.14),
                    0 4px 22px 3px rgba(0, 0, 0, 0.12),
                    0 6px 7px -4px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-16dp: {
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
                    0  6px 30px 5px rgba(0, 0, 0, 0.12),
                    0  8px 10px -5px rgba(0, 0, 0, 0.4);
      };

      --shadow-elevation-24dp: {
        box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
                    0 9px 46px 8px rgba(0, 0, 0, 0.12),
                    0 11px 15px -7px rgba(0, 0, 0, 0.4);
      };
    }
  </style>
</custom-style>`;

document.head.appendChild($_documentContainer);


/***/ }),
/* 284 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__polymer_lib_utils_settings_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__polymer_lib_legacy_polymer_dom_js__ = __webpack_require__(11);




const IronResizableBehavior = {
  properties: {
    /**
     * The closest ancestor element that implements `IronResizableBehavior`.
     */
    _parentResizable: {
      type: Object,
      observer: '_parentResizableChanged'
    },

    /**
     * True if this element is currently notifying its descendant elements of
     * resize.
     */
    _notifyingDescendant: {
      type: Boolean,
      value: false
    }
  },

  listeners: {
    'iron-request-resize-notifications': '_onIronRequestResizeNotifications'
  },

  created: function() {
    // We don't really need property effects on these, and also we want them
    // to be created before the `_parentResizable` observer fires:
    this._interestedResizables = [];
    this._boundNotifyResize = this.notifyResize.bind(this);
  },

  attached: function() {
    this._requestResizeNotifications();
  },

  detached: function() {
    if (this._parentResizable) {
      this._parentResizable.stopResizeNotificationsFor(this);
    } else {
      window.removeEventListener('resize', this._boundNotifyResize);
    }

    this._parentResizable = null;
  },

  /**
   * Can be called to manually notify a resizable and its descendant
   * resizables of a resize change.
   */
  notifyResize: function() {
    if (!this.isAttached) {
      return;
    }

    this._interestedResizables.forEach(function(resizable) {
      if (this.resizerShouldNotify(resizable)) {
        this._notifyDescendant(resizable);
      }
    }, this);

    this._fireResize();
  },

  /**
   * Used to assign the closest resizable ancestor to this resizable
   * if the ancestor detects a request for notifications.
   */
  assignParentResizable: function(parentResizable) {
    this._parentResizable = parentResizable;
  },

  /**
   * Used to remove a resizable descendant from the list of descendants
   * that should be notified of a resize change.
   */
  stopResizeNotificationsFor: function(target) {
    var index = this._interestedResizables.indexOf(target);

    if (index > -1) {
      this._interestedResizables.splice(index, 1);
      this.unlisten(target, 'iron-resize', '_onDescendantIronResize');
    }
  },

  /**
   * This method can be overridden to filter nested elements that should or
   * should not be notified by the current element. Return true if an element
   * should be notified, or false if it should not be notified.
   *
   * @param {HTMLElement} element A candidate descendant element that
   * implements `IronResizableBehavior`.
   * @return {boolean} True if the `element` should be notified of resize.
   */
  resizerShouldNotify: function(element) { return true; },

  _onDescendantIronResize: function(event) {
    if (this._notifyingDescendant) {
      event.stopPropagation();
      return;
    }

    // NOTE(cdata): In ShadowDOM, event retargeting makes echoing of the
    // otherwise non-bubbling event "just work." We do it manually here for
    // the case where Polymer is not using shadow roots for whatever reason:
    if (!__WEBPACK_IMPORTED_MODULE_1__polymer_lib_utils_settings_js__["a" /* Settings */].useShadow) {
      this._fireResize();
    }
  },

  _fireResize: function() {
    this.fire('iron-resize', null, {
      node: this,
      bubbles: false
    });
  },

  _onIronRequestResizeNotifications: function(event) {
    var target = /** @type {!EventTarget} */ (Object(__WEBPACK_IMPORTED_MODULE_2__polymer_lib_legacy_polymer_dom_js__["a" /* dom */])(event).rootTarget);
    if (target === this) {
      return;
    }

    if (this._interestedResizables.indexOf(target) === -1) {
      this._interestedResizables.push(target);
      this.listen(target, 'iron-resize', '_onDescendantIronResize');
    }

    target.assignParentResizable(this);
    this._notifyDescendant(target);

    event.stopPropagation();
  },

  _parentResizableChanged: function(parentResizable) {
    if (parentResizable) {
      window.removeEventListener('resize', this._boundNotifyResize);
    }
  },

  _notifyDescendant: function(descendant) {
    // NOTE(cdata): In IE10, attached is fired on children first, so it's
    // important not to notify them if the parent is not attached yet (or
    // else they will get redundantly notified when the parent attaches).
    if (!this.isAttached) {
      return;
    }

    this._notifyingDescendant = true;
    descendant.notifyResize();
    this._notifyingDescendant = false;
  },
  
  _requestResizeNotifications: function() {
    if (!this.isAttached)
      return;
    
    // NOTE(valdrin) In CustomElements v1 with native HTMLImports, the order
    // of imports affects the order of `attached` callbacks (see webcomponents/custom-elements#15).
    // This might cause a child to notify parents too early (as the parent
    // still has to be upgraded), resulting in a parent not able to keep track
    // of the `_interestedResizables`. To solve this, we wait for the document
    // to be done loading before firing the event.
    if (document.readyState === 'loading') {
      var _requestResizeNotifications = this._requestResizeNotifications.bind(this);
      document.addEventListener('readystatechange', function readystatechanged() {
        document.removeEventListener('readystatechange', readystatechanged);
        _requestResizeNotifications();
      });
    } else {
      this.fire('iron-request-resize-notifications', null, {
        node: this,
        bubbles: true,
        cancelable: true
      });

      if (!this._parentResizable) {
        window.addEventListener('resize', this._boundNotifyResize);
        this.notifyResize();
      } 
    }
  }
};
/* unused harmony export IronResizableBehavior */



/***/ }),
/* 285 */
/***/ (function(module, exports) {

module.exports = "<div>This is our [[name]] app.</div>\n<div>This is my {{name}} app.</div>\n<div>\n    <p>--start--</p>\n    <my-emp-list></my-emp-list>\n    <p>--end--</p>\n</div>";

/***/ }),
/* 286 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_polymer_element__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__emp_list_template_html__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__emp_list_template_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__emp_list_template_html__);

// Element is the same as Polymer.Element in 2.x
// Modules give you the freedom to rename the members that you import



class MyEmpList extends __WEBPACK_IMPORTED_MODULE_0__polymer_polymer_polymer_element__["a" /* Element */] {

    static get template() {
        return __WEBPACK_IMPORTED_MODULE_1__emp_list_template_html___default.a;
    }

    constructor() {
        super();
        this.employees = [
            { first: 'Bob', last: 'Li' },
            { first: 'Ayesha', last: 'Johnson' },
            { first: 'Fatma', last: 'Kumari' },
            { first: 'Tony', last: 'Morelli' }
        ];
    }

    // properties, observers, etc. are identical to 2.x
    static get properties() {
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MyEmpList;


// customElements.define(kebabCase('MyEmpList'), MyEmpList);

/***/ }),
/* 287 */
/***/ (function(module, exports) {

module.exports = "<template is=\"dom-repeat\" items=\"{{employees}}\">\n    <div>First name: <span>{{item.first}}</span></div>\n    <div>Last name: <span>{{item.last}}</span></div>\n    <p></p>\n</template>";

/***/ })
],[127]);