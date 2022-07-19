// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/main.ts":[function(require,module,exports) {
/// projeto
/// declaração de variaveis ///
var rAltura = document.getElementById("rAltura");
var rComprimento = document.getElementById("rComprimento");
var rLargura = document.getElementById("rLargura");
var TempStart = document.getElementById("tempinit");
var TempEnd = document.getElementById("tempend");
var calcular = document.getElementById("calcular");
var resultado = document.getElementById("resultado");
var select = document.getElementById("select"); //calculando valor volumetrico retangulo

calcular.addEventListener("click", function () {
  try {
    var comprimento = Number(rComprimento.value);
    var largura = Number(rLargura.value);
    var altura = Number(rAltura.value);
    var temperaturaInicial = Number(TempStart.value);
    var temperaturaFinal = Number(TempEnd.value);
    var materialid = Number(select.value);
    var material = materias[materialid].coeficiente;

    if (isNaN(comprimento) == true || !comprimento) {
      throw new TypeError("não são aceitos valos do tipo String");
    }

    if (isNaN(largura) == true || !largura) {
      throw new TypeError("não são aceitos valos do tipo String");
    }

    if (isNaN(altura) == true || !altura) {
      throw new TypeError("não são aceitos valos do tipo String");
    }

    if (isNaN(temperaturaInicial) == true || !temperaturaInicial) {
      throw new TypeError("não são aceitos valos do tipo String");
    }

    if (isNaN(temperaturaFinal) == true || !temperaturaFinal) {
      throw new TypeError("não são aceitos valos do tipo String");
    }

    if (comprimento <= 0 || largura <= 0 || altura <= 0) {
      throw new TypeError("não são aceitos valos negativos");
    }

    var areaRetangulo = calculoAreRetangulo(comprimento, largura, altura);
    var volumeInicial = areaRetangulo;
    var dilacao = calculandoDilacao(volumeInicial, temperaturaInicial, temperaturaFinal, material);
    return resultado.innerHTML = "\n    <p> A dilata\xE7\xE3o volum\xE9trica do cubo ser\xE1 de ".concat(dilacao === null || dilacao === void 0 ? void 0 : dilacao.toFixed(2), " mc\xB3 </p>\n    <p>\n      <strong>\u0394V</strong> = V0.\u03B3.\u0394\u03B8<br>\n      <strong>\u0394V</strong> = ").concat(volumeInicial, ".").concat(material, ".10^-6.").concat(temperaturaInicial - temperaturaFinal, "<br>\n      <strong>\u0394V</strong> = ").concat(volumeInicial, ".10^-6<br>\n      <strong>\u0394V</strong> = ").concat(dilacao === null || dilacao === void 0 ? void 0 : dilacao.toFixed(2), " mc\xB3<br>\n    </p>\n     <p>O resultado \xE9: </p>\n      <h1 class=\"resulh1\">").concat(dilacao === null || dilacao === void 0 ? void 0 : dilacao.toFixed(2), " mc\xB3</h1>\n    ");
  } catch (error) {
    if (error instanceof TypeError) {
      error.stack;
      return resultado.innerHTML = "<p> ".concat(error.message, " </p>");
    }
  }
});
var materias = [{
  material: "Aço",
  coeficiente: 11
}, {
  material: "aluminio",
  coeficiente: 22
}, {
  material: "cobre",
  coeficiente: 17
}, {
  material: "Concreto",
  coeficiente: 12
}, {
  material: "Ouro",
  coeficiente: 15
}]; //calculo de aréa do retangulo

function calculoAreRetangulo(comprimento, largura, altura) {
  return comprimento * largura * altura;
} //calcullando dilação de um corpo


function calculandoDilacao(volumeInicial, temperaturaInicial, temperaturaFinal, material) {
  try {
    var variçãotemperatura = temperaturaInicial - temperaturaFinal;
    var deltaVolume = volumeInicial * material * variçãotemperatura;
    var exponencial = Math.pow(10, -6);
    var resultado_1 = deltaVolume * exponencial;
    return resultado_1;
  } catch (error) {
    if (error instanceof TypeError) {
      error.stack;
      throw error.message;
    }
  }
}
/*
ΔV = V0.γ.Δθ
ΔV = 1000.15.10-6.30
ΔV = 1000.15.30.10-6
ΔV = 450000.10-6
ΔV = 0,45cm3
*/
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58139" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map