var lms = (function () {
  // setup vars
  var lm, q = {}, isTag, parseTag, re;
  // root function
  lm = function (arr) {
    var rtn = [], l, i;
    if (isTag(arr)) {
      rtn = rtn.concat(parseTag(arr));
    } else {
      if (q.isA(arr) && !q.isEA(arr)) {
	if (isA(arr[i]) && isTag(arr[i])) {
	  rtn = rtn.concat(parseTag(arr[i]));
	}
      }
    }
    return rtn.join('');
  };
  // private
  re = new RegExp("^[a-zA-Z]((?![ ]).)*$"),// match valid tag name
  parseTag = function (arr) {
    var i, l, rtn = [];
    l = arr.length;
    for (i = 0; i < l; i += 1) {
      rtn.push('<');
      rtn.push(arr[i]);
      rtn.push('>');
      rtn.push('</');
      rtn.push(arr[i]);
      rtn.push('>');
    }
    return rtn;
  };
  isTag = function (arr) {
    // validate tag array
    return q.isA(arr) && q.isS(arr[0]) && re.test(arr[0]);
  };
  q.toS = function (x) {
    // shortcut q.toString
    return Object.prototype.toString.call(x);
  };
  q.isU = function (u) {
    // return true id u q.is undefined
    return typeof(u) === "undefined";
  };
  q.isF = function (f) {
    // q.is f a function?
    return typeof(f) === "function";
  };
  q.isO = function (o) {
    // q.is "o" an Object?
    return q.isU(o) === false && q.toS(o) === "[object Object]" &&
      typeof(o.length) !== 'number' && typeof(o.splice) !== 'function';
  };
  q.isA = function (a) {
    // q.is "a" an Array?
    return q.isU(a) ?
      false :
      typeof(a.length) === 'number' &&
      !(a.propertyIsEnumerable('length')) &&
      typeof(a.splice) === 'function';

  };
  q.isEA = function (a) {
    // q.is a an empty list?
    return q.isA(a) && a.length === 0;
  };
  q.h = function (a) {
    // return the head of a list
    if (q.isA(a)) {
      return a[0];
    }
  };
  q.t = function (a) {
    // return the tail of a list
    if (q.isA(a)) {
      return a.slice(1, a.length);
    }
  };
  q.isS = function (s) {
    // q.is s a string?
    return q.isU(s) === false && q.toS(s) === "[object String]";
  };
  q.cons = function (inPut, list) {
    // push inPut onto the front of a list
    if (!q.isU(inPut) && q.isA(list)) {
      return [inPut].concat(list);
    }
  };
  return lm;
} ());