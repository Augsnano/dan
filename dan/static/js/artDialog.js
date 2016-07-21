/*!
 * artDialog basic
 * Date: 2011-09-04 30:36
 */

;(function (window, undefined) {
    if (window.jQuery) return jQuery;
    var $ = window.art = function (selector, content) {
        return new $.fn.init(selector, content)
    }, readyBound = false, readyList = [], DOMContentLoaded, timerId, isOpacity = 'opacity' in document.documentElement.style, quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/, rclass = /[\n\t]/g, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/;
    if (window.$ === undefined) window.$ = $;
    $.fn = $.prototype = {
        constructor: $, ready: function (callback) {
            $.bindReady();
            if ($.isReady) {
                callback.call(document, $)
            } else if (readyList) {
                readyList.push(callback)
            }
            ;
            return this
        }, hasClass: function (name) {
            var className = ' ' + name + ' ';
            if ((' ' + this[0].className + ' ').replace(rclass, ' ').indexOf(className) > -1) return true;
            return false
        }, addClass: function (name) {
            if (!this.hasClass(name)) this[0].className += ' ' + name;
            return this
        }, removeClass: function (name) {
            var elem = this[0];
            if (!name) {
                elem.className = ''
            } else if (this.hasClass(name)) {
                elem.className = elem.className.replace(name, ' ')
            }
            ;
            return this
        }, css: function (name, value) {
            var i, elem = this[0], obj = arguments[0];
            if (typeof name === 'string') {
                if (value === undefined) {
                    return $.css(elem, name)
                } else {
                    name === 'opacity' ? $.opacity.set(elem, value) : elem.style[name] = value
                }
            } else {
                for (i in obj) {
                    i === 'opacity' ? $.opacity.set(elem, obj[i]) : elem.style[i] = obj[i]
                }
            }
            ;
            return this
        }, show: function () {
            return this.css('display', 'block')
        }, hide: function () {
            return this.css('display', 'none')
        }, offset: function () {
            var elem = this[0], box = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement, clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, top = box.top + (self.pageYOffset || docElem.scrollTop) - clientTop, left = box.left + (self.pageXOffset || docElem.scrollLeft) - clientLeft;
            return {left: left, top: top}
        }, html: function (content) {
            var elem = this[0];
            if (content === undefined) return elem.innerHTML;
            $.cleanData(elem.getElementsByTagName('*'));
            elem.innerHTML = content;
            return this
        }, remove: function () {
            var elem = this[0];
            $.cleanData(elem.getElementsByTagName('*'));
            $.cleanData([elem]);
            elem.parentNode.removeChild(elem);
            return this
        }, bind: function (type, callback) {
            $.event.add(this[0], type, callback);
            return this
        }, unbind: function (type, callback) {
            $.event.remove(this[0], type, callback);
            return this
        }
    };
    $.fn.init = function (selector, context) {
        var match, elem;
        context = context || document;
        if (!selector) return this;
        if (selector.nodeType) {
            this[0] = selector;
            return this
        }
        ;
        if (selector === 'body' && context.body) {
            this[0] = context.body;
            return this
        }
        ;
        if (selector === 'head' || selector === 'html') {
            this[0] = context.getElementsByTagName(selector)[0];
            return this
        }
        ;
        if (typeof selector === 'string') {
            match = quickExpr.exec(selector);
            if (match && match[2]) {
                elem = context.getElementById(match[2]);
                if (elem && elem.parentNode) this[0] = elem;
                return this
            }
        }
        ;
        if (typeof selector === 'function') return $(document).ready(selector);
        this[0] = selector;
        return this
    };
    $.fn.init.prototype = $.fn;
    $.noop = function () {
    };
    $.isWindow = function (obj) {
        return obj && typeof obj === 'object' && 'setInterval' in obj
    };
    $.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]'
    };
    $.fn.find = function (expr) {
        var value, elem = this[0], className = expr.split('.')[1];
        if (className) {
            if (document.getElementsByClassName) {
                value = elem.getElementsByClassName(className)
            } else {
                value = getElementsByClassName(className, elem)
            }
        } else {
            value = elem.getElementsByTagName(expr)
        }
        ;
        return $(value[0])
    };
    function getElementsByClassName(className, node, tag) {
        node = node || document;
        tag = tag || '*';
        var i = 0, j = 0, classElements = [], els = node.getElementsByTagName(tag), elsLen = els.length, pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
        for (; i < elsLen; i++) {
            if (pattern.test(els[i].className)) {
                classElements[j] = els[i];
                j++
            }
        }
        ;
        return classElements
    };
    $.each = function (obj, callback) {
        var name, i = 0, length = obj.length, isObj = length === undefined;
        if (isObj) {
            for (name in obj) {
                if (callback.call(obj[name], name, obj[name]) === false) break
            }
        } else {
            for (var value = obj[0]; i < length && callback.call(value, i, value) !== false; value = obj[++i]) {
            }
        }
        ;
        return obj
    };
    $.data = function (elem, name, data) {
        var cache = $.cache, id = uuid(elem);
        if (name === undefined) return cache[id];
        if (!cache[id]) cache[id] = {};
        if (data !== undefined) cache[id][name] = data;
        return cache[id][name]
    };
    $.removeData = function (elem, name) {
        var empty = true, expando = $.expando, cache = $.cache, id = uuid(elem), thisCache = id && cache[id];
        if (!thisCache) return;
        if (name) {
            delete thisCache[name];
            for (var n in thisCache) empty = false;
            if (empty) delete $.cache[id]
        } else {
            delete cache[id];
            if (elem.removeAttribute) {
                elem.removeAttribute(expando)
            } else {
                elem[expando] = null
            }
        }
    };
    $.uuid = 0;
    $.cache = {};
    $.expando = '@cache' + (new Date).getTime();
    function uuid(elem) {
        var expando = $.expando, id = elem === window ? 0 : elem[expando];
        if (id === undefined) elem[expando] = id = ++$.uuid;
        return id
    };
    $.event = {
        add: function (elem, type, callback) {
            var cache, listeners, that = $.event, data = $.data(elem, '@events') || $.data(elem, '@events', {});
            cache = data[type] = data[type] || {};
            listeners = cache.listeners = cache.listeners || [];
            listeners.push(callback);
            if (!cache.handler) {
                cache.elem = elem;
                cache.handler = that.handler(cache);
                document.addEventListener ? elem.addEventListener(type, cache.handler, false) : elem.attachEvent('on' + type, cache.handler)
            }
        }, remove: function (elem, type, callback) {
            var i, cache, listeners, that = $.event, empty = true, data = $.data(elem, '@events');
            if (!data) return;
            if (!type) {
                for (i in data) that.remove(elem, i);
                return
            }
            ;
            cache = data[type];
            if (!cache) return;
            listeners = cache.listeners;
            if (callback) {
                for (i = 0; i < listeners.length; i++) {
                    listeners[i] === callback && listeners.splice(i--, 1)
                }
            } else {
                cache.listeners = []
            }
            ;
            if (cache.listeners.length === 0) {
                document.removeEventListener ? elem.removeEventListener(type, cache.handler, false) : elem.detachEvent('on' + type, cache.handler);
                delete data[type];
                cache = $.data(elem, '@events');
                for (var n in cache) empty = false;
                if (empty) $.removeData(elem, '@events')
            }
        }, handler: function (cache) {
            return function (event) {
                event = $.event.fix(event || window.event);
                for (var i = 0, list = cache.listeners, fn; fn = list[i++];) {
                    if (fn.call(cache.elem, event) === false) {
                        event.preventDefault();
                        event.stopPropagation()
                    }
                }
            }
        }, fix: function (event) {
            if (event.target) return event;
            var event2 = {
                target: event.srcElement || document, preventDefault: function () {
                    event.returnValue = false
                }, stopPropagation: function () {
                    event.cancelBubble = true
                }
            };
            for (var i in event) event2[i] = event[i];
            return event2
        }
    };
    $.cleanData = function (elems) {
        var i = 0, elem, len = elems.length, removeEvent = $.event.remove, removeData = $.removeData;
        for (; i < len; i++) {
            elem = elems[i];
            removeEvent(elem);
            removeData(elem)
        }
    };
    $.isReady = false;
    $.ready = function () {
        if (!$.isReady) {
            if (!document.body) return setTimeout($.ready, 13);
            $.isReady = true;
            if (readyList) {
                var fn, i = 0;
                while ((fn = readyList[i++])) {
                    fn.call(document, $)
                }
                ;
                readyList = null
            }
        }
    };
    $.bindReady = function () {
        if (readyBound) return;
        readyBound = true;
        if (document.readyState === 'complete') {
            return $.ready()
        }
        ;
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
            window.addEventListener('load', $.ready, false)
        } else if (document.attachEvent) {
            document.attachEvent('onreadystatechange', DOMContentLoaded);
            window.attachEvent('onload', $.ready);
            var toplevel = false;
            try {
                toplevel = window.frameElement == null
            } catch (e) {
            }
            ;
            if (document.documentElement.doScroll && toplevel) {
                doScrollCheck()
            }
        }
    };
    if (document.addEventListener) {
        DOMContentLoaded = function () {
            document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
            $.ready()
        }
    } else if (document.attachEvent) {
        DOMContentLoaded = function () {
            if (document.readyState === 'complete') {
                document.detachEvent('onreadystatechange', DOMContentLoaded);
                $.ready()
            }
        }
    }
    ;
    function doScrollCheck() {
        if ($.isReady) return;
        try {
            document.documentElement.doScroll('left')
        } catch (e) {
            setTimeout(doScrollCheck, 1);
            return
        }
        ;
        $.ready()
    };
    $.css = 'defaultView' in document && 'getComputedStyle' in document.defaultView ? function (elem, name) {
        return document.defaultView.getComputedStyle(elem, false)[name]
    } : function (elem, name) {
        var ret = name === 'opacity' ? $.opacity.get(elem) : elem.currentStyle[name];
        return ret || ''
    };
    $.opacity = {
        get: function (elem) {
            return isOpacity ? document.defaultView.getComputedStyle(elem, false).opacity : ropacity.test((elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || '') ? (parseFloat(RegExp.$1) / 100) + '' : 1
        }, set: function (elem, value) {
            if (isOpacity) return elem.style.opacity = value;
            var style = elem.style;
            style.zoom = 1;
            var opacity = 'alpha(opacity=' + value * 100 + ')', filter = style.filter || '';
            style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : style.filter + ' ' + opacity
        }
    };
    $.each(['Left', 'Top'], function (i, name) {
        var method = 'scroll' + name;
        $.fn[method] = function (val) {
            var elem = this[0], win;
            win = getWindow(elem);
            return win ? ('pageXOffset' in win) ? win[i ? 'pageYOffset' : 'pageXOffset'] : win.document.documentElement[method] || win.document.body[method] : elem[method]
        }
    });
    function getWindow(elem) {
        return $.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false
    };
    $.each(['Height', 'Width'], function (i, name) {
        var type = name.toLowerCase();
        $.fn[type] = function (size) {
            var elem = this[0];
            if (!elem) {
                return size == null ? null : this
            }
            ;
            return $.isWindow(elem) ? elem.document.documentElement['client' + name] || elem.document.body['client' + name] : (elem.nodeType === 9) ? Math.max(elem.documentElement['client' + name], elem.body['scroll' + name], elem.documentElement['scroll' + name], elem.body['offset' + name], elem.documentElement['offset' + name]) : null
        }
    });
    $.ajax = function (config) {
        var ajax = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'), url = config.url;
        if (config.cache === false) {
            var ts = (new Date()).getTime(), ret = url.replace(/([?&])_=[^&]*/, "$1_=" + ts);
            url = ret + ((ret === url) ? (/\?/.test(url) ? "&" : "?") + "_=" + ts : "")
        }
        ;
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
                config.success && config.success(ajax.responseText);
                ajax.onreadystatechange = $.noop
            }
        };
        ajax.open('GET', url, 1);
        ajax.send(null)
    };
    $.fn.animate = function (prop, speed, easing, callback) {
        speed = speed || 400;
        if (typeof easing === 'function') callback = easing;
        easing = easing && $.easing[easing] ? easing : 'swing';
        var $this = this, overflow, fx, parts, start, end, unit, opt = {
            speed: speed,
            easing: easing,
            callback: function () {
                if (overflow != null) $this[0].style.overflow = '';
                callback && callback()
            }
        };
        opt.curAnim = {};
        $.each(prop, function (name, val) {
            opt.curAnim[name] = val
        });
        $.each(prop, function (name, val) {
            fx = new $.fx($this[0], opt, name);
            parts = rfxnum.exec(val);
            start = parseFloat(name === 'opacity' || ($this[0].style && $this[0].style[name] != null) ? $.css($this[0], name) : $this[0][name]);
            end = parseFloat(parts[2]);
            unit = parts[3];
            if (name === 'height' || name === 'width') {
                end = Math.max(0, end);
                overflow = [$this[0].style.overflow, $this[0].style.overflowX, $this[0].style.overflowY]
            }
            ;
            fx.custom(start, end, unit)
        });
        if (overflow != null) $this[0].style.overflow = 'hidden';
        return this
    };
    $.timers = [];
    $.fx = function (elem, options, prop) {
        this.elem = elem;
        this.options = options;
        this.prop = prop
    };
    $.fx.prototype = {
        custom: function (from, to, unit) {
            var that = this;
            that.startTime = $.fx.now();
            that.start = from;
            that.end = to;
            that.unit = unit;
            that.now = that.start;
            that.state = that.pos = 0;
            function t() {
                return that.step()
            };
            t.elem = that.elem;
            t();
            $.timers.push(t);
            if (!timerId) timerId = setInterval($.fx.tick, 13)
        }, step: function () {
            var that = this, t = $.fx.now(), done = true;
            if (t >= that.options.speed + that.startTime) {
                that.now = that.end;
                that.state = that.pos = 1;
                that.update();
                that.options.curAnim[that.prop] = true;
                for (var i in that.options.curAnim) {
                    if (that.options.curAnim[i] !== true) {
                        done = false
                    }
                }
                ;
                if (done) that.options.callback.call(that.elem);
                return false
            } else {
                var n = t - that.startTime;
                that.state = n / that.options.speed;
                that.pos = $.easing[that.options.easing](that.state, n, 0, 1, that.options.speed);
                that.now = that.start + ((that.end - that.start) * that.pos);
                that.update();
                return true
            }
        }, update: function () {
            var that = this;
            if (that.prop === 'opacity') {
                $.opacity.set(that.elem, that.now)
            } else if (that.elem.style && that.elem.style[that.prop] != null) {
                that.elem.style[that.prop] = that.now + that.unit
            } else {
                that.elem[that.prop] = that.now
            }
        }
    };
    $.fx.now = function () {
        return new Date().getTime()
    };
    $.easing = {
        linear: function (p, n, firstNum, diff) {
            return firstNum + diff * p
        }, swing: function (p, n, firstNum, diff) {
            return ((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum
        }
    };
    $.fx.tick = function () {
        var timers = $.timers;
        for (var i = 0; i < timers.length; i++) {
            !timers[i]() && timers.splice(i--, 1)
        }
        ;
        !timers.length && $.fx.stop()
    };
    $.fx.stop = function () {
        clearInterval(timerId);
        timerId = null
    };
    $.fn.stop = function () {
        var timers = $.timers;
        for (var i = timers.length - 1; i >= 0; i--) {
            if (timers[i].elem === this[0]) timers.splice(i, 1)
        }
        ;
        return this
    };
    return $
}(window));
;(function ($, window, undefined) {
    $.noop = $.noop || function () {
        };
    var _box, _thisScript, _skin, _path, _count = 0, _$window = $(window), _$document = $(document), _$html = $('html'), _$body = $(function () {
        _$body = $('body')
    }), _elem = document.documentElement, _isIE6 = window.VBArray && !window.XMLHttpRequest, _isMobile = 'createTouch' in document && !('onmousemove' in _elem) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent), _expando = 'artDialog' + (new Date).getTime();
    var artDialog = function (config, ok, cancel) {
        config = config || {};
        if (typeof config === 'string' || config.nodeType === 1) {
            config = {content: config, fixed: !_isMobile}
        }
        ;
        var api, buttons = [], defaults = artDialog.defaults, elem = config.follow = this.nodeType === 1 && this || config.follow;
        for (var i in defaults) {
            if (config[i] === undefined) config[i] = defaults[i]
        }
        ;
        $.each({
            ok: "yesFn",
            cancel: "noFn",
            close: "closeFn",
            init: "initFn",
            okVal: "yesText",
            cancelVal: "noText"
        }, function (i, o) {
            config[i] = config[i] !== undefined ? config[i] : config[o]
        });
        if (typeof elem === 'string') elem = $(elem)[0];
        config.id = elem && elem[_expando + 'follow'] || config.id || _expando + _count;
        api = artDialog.list[config.id];
        if (elem && api) return api.follow(elem).focus();
        art.PHPCMS_API = art.PHPCMS_API || [];
        var that_Api = art.PHPCMS_API[config.id];
        if (typeof that_Api == 'object' && api) {
            api.data = {};
            api.data.iframe = that_Api
        }
        ;
        if (api) return api.focus();
        if (_isMobile) config.fixed = false;
        if (!$.isArray(config.button)) {
            config.button = config.button ? [config.button] : []
        }
        ;
        if (ok !== undefined) config.ok = ok;
        if (cancel !== undefined) config.cancel = cancel;
        config.ok && config.button.push({name: config.okVal, callback: config.ok, focus: true});
        config.cancel && config.button.push({name: config.cancelVal, callback: config.cancel});
        artDialog.defaults.zIndex = config.zIndex;
        _count++;
        return artDialog.list[config.id] = _box ? _box._init(config) : new artDialog.fn._init(config)
    };
    artDialog.fn = artDialog.prototype = {
        version: '4.1.2', _init: function (config) {
            var that = this, DOM, icon = config.icon, iconBg = icon && (_isIE6 ? {png: '../css/icons/' + icon + '.png'} : {backgroundImage: 'url(\'' + config.path + '/../css/icons/' + icon + '.png\')'});
            that._isRun = true;
            that.config = config;
            that.DOM = DOM = that.DOM || that._getDOM();
            DOM.wrap.addClass(config.skin);
            DOM.close[config.cancel === false ? 'hide' : 'show']();
            DOM.icon[0].style.display = icon ? '' : 'none';
            DOM.iconBg.css(iconBg || {background: 'none'});
            DOM.se.css('cursor', config.resize ? 'se-resize' : 'auto');
            DOM.title.css('cursor', config.drag ? 'move' : 'auto');
            DOM.content.css('padding', config.padding);
            that[config.show ? 'show' : 'hide'](true);
            that.button(config.button).title(config.title).content(config.content, config.iframe).size(config.width, config.height).time(config.time);
            config.follow ? that.follow(config.follow) : that.position(config.left, config.top);
            that.focus(config.focus);
            config.lock && that.lock();
            that._addEvent();
            that._ie6PngFix();
            _box = null;
            config.init && config.init.call(that, window);
            return that
        }, content: function (msg, url) {
            var prev, next, parent, display, that = this, DOM = that.DOM, wrap = DOM.wrap[0], width = wrap.offsetWidth, height = wrap.offsetHeight, left = parseInt(wrap.style.left), top = parseInt(wrap.style.top), cssWidth = wrap.style.width, $content = DOM.content, content = $content[0], iframe = null, isIframe = typeof url == 'string' && url != '', iframrId = 'atrDialogIframe_' + that.config.id, ifrBox;
            that._elemBack && that._elemBack();
            if (isIframe) {
                if (typeof pc_hash == 'string') url += (url.indexOf('?') > -1 ? '&' : '?') + 'pc_hash=' + pc_hash;
                iframe = document.createElement('iframe');
                iframe.setAttribute("frameborder", 0, 0);
                iframe.setAttribute("width", '100%');
                iframe.setAttribute("height", '100%');
                iframe.setAttribute("id", iframrId);
                iframe.src = url;
                msg = iframe;
                $ready = function () {
                    that._reset(1);
                    try {
                        if (that.config.width !== 'auto' && that.config.height !== 'auto') return;
                        ifrBox = document.getElementById(iframrId).contentWindow.document;
                        ifrWidth = that.config.width === 'auto' ? Math.max(ifrBox.documentElement.scrollWidth, ifrBox.body.scrollWidth) + 18 : that.config.width;
                        ifrHeight = that.config.height === 'auto' ? Math.max(ifrBox.documentElement.scrollHeight, ifrBox.body.scrollHeight) : that.config.height;
                        that.position(0, 0);
                        that.size(ifrWidth, ifrHeight);
                        that.position(that.config.left, that.config.top)
                    } catch (e) {
                    }
                };
                if (document.addEventListener) iframe.addEventListener('load', $ready, false); else if (document.attachEvent) iframe.attachEvent('onload', $ready);
                that.DOM.content.css('padding', 0);
                that.DOM.content.css('width', '100%');
                that.DOM.content.css('height', '100%')
            }
            ;
            wrap.style.width = 'auto';
            if (msg === undefined) return content;
            if (typeof msg === 'string') {
                $content.html(msg)
            } else if (msg && msg.nodeType === 1) {
                display = msg.style.display;
                prev = msg.previousSibling;
                next = msg.nextSibling;
                parent = msg.parentNode;
                that._elemBack = function () {
                    if (prev && prev.parentNode) {
                        prev.parentNode.insertBefore(msg, prev.nextSibling)
                    } else if (next && next.parentNode) {
                        next.parentNode.insertBefore(msg, next)
                    } else if (parent) {
                        parent.appendChild(msg)
                    }
                    ;
                    msg.style.display = display;
                    that._elemBack = null
                };
                $content.html('');
                content.appendChild(msg);
                msg.style.display = 'block';
                if (isIframe) art.PHPCMS_API[that.config.id] = msg.contentWindow
            }
            ;
            if (!arguments[1]) {
                if (that.config.follow) {
                    that.follow(that.config.follow)
                } else {
                    width = wrap.offsetWidth - width;
                    height = wrap.offsetHeight - height;
                    left = left - width / 2;
                    top = top - height / 2;
                    if (isNaN(left)) return that;
                    wrap.style.left = Math.max(left, 0) + 'px';
                    wrap.style.top = Math.max(top, 0) + 'px'
                }
                ;
                if (cssWidth && cssWidth !== 'auto') {
                    wrap.style.width = wrap.offsetWidth + 'px'
                }
                ;
                that._autoPositionType()
            }
            ;
            that._ie6SelectFix();
            that._runScript(content);
            return that
        }, data: {}, title: function (text) {
            var DOM = this.DOM, wrap = DOM.wrap, title = DOM.title, className = 'aui_state_noTitle';
            if (text === undefined) return title[0];
            if (text === false) {
                title.hide().html('');
                wrap.addClass(className)
            } else {
                title.show().html(text || '');
                wrap.removeClass(className)
            }
            ;
            return this
        }, position: function (left, top) {
            var that = this, config = that.config, wrap = that.DOM.wrap[0], isFixed = _isIE6 ? false : config.fixed, ie6Fixed = _isIE6 && that.config.fixed, docLeft = _$document.scrollLeft(), docTop = _$document.scrollTop(), dl = isFixed ? 0 : docLeft, dt = isFixed ? 0 : docTop, ww = _$window.width(), wh = _$window.height(), ow = wrap.offsetWidth, oh = wrap.offsetHeight, style = wrap.style;
            if (left || left === 0) {
                that._left = left.toString().indexOf('%') !== -1 ? left : null;
                left = that._toNumber(left, ww - ow);
                if (typeof left === 'number') {
                    left = ie6Fixed ? (left += docLeft) : left + dl;
                    style.left = Math.max(left, dl) + 'px'
                } else if (typeof left === 'string') {
                    style.left = left
                }
            }
            ;
            if (top || top === 0) {
                that._top = top.toString().indexOf('%') !== -1 ? top : null;
                top = that._toNumber(top, wh - oh);
                if (typeof top === 'number') {
                    top = ie6Fixed ? (top += docTop) : top + dt;
                    style.top = Math.max(top, dt) + 'px'
                } else if (typeof top === 'string') {
                    style.top = top
                }
            }
            ;
            if (left !== undefined && top !== undefined) {
                that._follow = null;
                that._autoPositionType()
            }
            ;
            return that
        }, size: function (width, height) {
            var maxWidth, maxHeight, scaleWidth, scaleHeight, that = this, config = that.config, DOM = that.DOM, wrap = DOM.wrap, main = DOM.main, wrapStyle = wrap[0].style, style = main[0].style;
            if (width) {
                that._width = width.toString().indexOf('%') !== -1 ? width : null;
                maxWidth = _$window.width() - wrap[0].offsetWidth + main[0].offsetWidth;
                scaleWidth = that._toNumber(width, maxWidth);
                try {
                    width = Math.min(parseInt(scaleWidth), maxWidth);
                    width = isNaN(width) ? 'auto' : width
                } catch (e) {
                    width = scaleWidth
                }
                ;
                if (typeof width === 'number') {
                    wrapStyle.width = 'auto';
                    style.width = Math.max(that.config.minWidth, width) + 'px';
                    wrapStyle.width = wrap[0].offsetWidth + 'px';
                } else if (typeof width === 'string') {
                    style.width = width;
                    width === 'auto' && wrap.css('width', 'auto')
                }
            }
            ;
            if (height) {
                that._height = height.toString().indexOf('%') !== -1 ? height : null;
                maxHeight = _$window.height() - wrap[0].offsetHeight + main[0].offsetHeight;
                scaleHeight = that._toNumber(height, maxHeight);
                try {
                    height = Math.min(parseInt(scaleHeight), maxHeight);
                    height = isNaN(height) ? 'auto' : height
                } catch (e) {
                    height = scaleHeight
                }
                ;
                if (typeof height === 'number') {
                    style.height = Math.max(that.config.minHeight, height) + 'px'
                } else if (typeof height === 'string') {
                    style.height = height
                }
            }
            ;
            that._ie6SelectFix();
            return that
        }, follow: function (elem) {
            var $elem, that = this, config = that.config;
            if (typeof elem === 'string' || elem && elem.nodeType === 1) {
                $elem = $(elem);
                elem = $elem[0]
            }
            ;
            if (!elem || !elem.offsetWidth && !elem.offsetHeight) {
                return that.position(that._left, that._top)
            }
            ;
            var expando = _expando + 'follow', winWidth = _$window.width(), winHeight = _$window.height(), docLeft = _$document.scrollLeft(), docTop = _$document.scrollTop(), offset = $elem.offset(), width = elem.offsetWidth, height = elem.offsetHeight, isFixed = _isIE6 ? false : config.fixed, left = isFixed ? offset.left - docLeft : offset.left, top = isFixed ? offset.top - docTop : offset.top, wrap = that.DOM.wrap[0], style = wrap.style, wrapWidth = wrap.offsetWidth, wrapHeight = wrap.offsetHeight, setLeft = left - (wrapWidth - width) / 2, setTop = top + height, dl = isFixed ? 0 : docLeft, dt = isFixed ? 0 : docTop;
            setLeft = setLeft < dl ? left : (setLeft + wrapWidth > winWidth) && (left - wrapWidth > dl) ? left - wrapWidth + width : setLeft;
            setTop = (setTop + wrapHeight > winHeight + dt) && (top - wrapHeight > dt) ? top - wrapHeight : setTop;
            style.left = setLeft + 'px';
            style.top = setTop + 'px';
            that._follow && that._follow.removeAttribute(expando);
            that._follow = elem;
            elem[expando] = config.id;
            that._autoPositionType();
            return that
        }, button: function () {
            var that = this, ags = arguments, DOM = that.DOM, wrap = DOM.wrap, buttons = DOM.buttons, elem = buttons[0], strongButton = 'aui_state_highlight', listeners = that._listeners = that._listeners || {}, list = $.isArray(ags[0]) ? ags[0] : [].slice.call(ags);
            if (ags[0] === undefined) return elem;
            $.each(list, function (i, val) {
                var name = val.name, isNewButton = !listeners[name], button = !isNewButton ? listeners[name].elem : document.createElement('button');
                if (!listeners[name]) listeners[name] = {};
                if (val.callback) listeners[name].callback = val.callback;
                if (val.className) button.className = val.className;
                if (val.focus) {
                    that._focus && that._focus.removeClass(strongButton);
                    that._focus = $(button).addClass(strongButton);
                    that.focus()
                }
                ;
                button[_expando + 'callback'] = name;
                button.disabled = !!val.disabled;
                if (isNewButton) {
                    button.innerHTML = name;
                    listeners[name].elem = button;
                    elem.appendChild(button)
                }
            });
            buttons[0].style.display = list.length ? '' : 'none';
            that._ie6SelectFix();
            return that
        }, show: function () {
            this.DOM.wrap.show();
            !arguments[0] && this._lockMaskWrap && this._lockMaskWrap.show();
            return this
        }, hide: function () {
            this.DOM.wrap.hide();
            !arguments[0] && this._lockMaskWrap && this._lockMaskWrap.hide();
            return this
        }, close: function () {
            if (!this._isRun) return this;
            var that = this, DOM = that.DOM, wrap = DOM.wrap, list = artDialog.list, fn = that.config.close, follow = that.config.follow;
            that.time();
            if (typeof fn === 'function' && fn.call(that, window) === false) {
                return that
            }
            ;
            that.unlock();
            that._elemBack && that._elemBack();
            wrap[0].className = wrap[0].style.cssText = '';
            DOM.title.html('');
            DOM.content.html('');
            DOM.buttons.html('');
            if (artDialog.focus === that) artDialog.focus = null;
            if (follow) follow.removeAttribute(_expando + 'follow');
            delete list[that.config.id];
            that._removeEvent();
            that.hide(true)._setAbsolute();
            for (var i in that) {
                if (that.hasOwnProperty(i) && i !== 'DOM') delete that[i]
            }
            ;
            _box ? wrap.remove() : _box = that;
            return that
        }, time: function (second) {
            var that = this, cancel = that.config.cancelVal, timer = that._timer;
            timer && clearTimeout(timer);
            if (second) {
                that._timer = setTimeout(function () {
                    that._click(cancel)
                }, 1000 * second)
            }
            ;
            return that
        }, focus: function () {
            var elemFocus, that = this, DOM = that.DOM, wrap = DOM.wrap, top = artDialog.focus, index = artDialog.defaults.zIndex++;
            wrap.css('zIndex', index);
            that._lockMask && that._lockMask.css('zIndex', index - 1);
            top && top.DOM.wrap.removeClass('aui_state_focus');
            artDialog.focus = that;
            wrap.addClass('aui_state_focus');
            if (!arguments[0]) {
                try {
                    elemFocus = that._focus && that._focus[0] || DOM.close[0];
                    elemFocus && elemFocus.focus()
                } catch (e) {
                }
                ;
            }
            ;
            return that
        }, lock: function () {
            if (this._lock) return this;
            var that = this, index = artDialog.defaults.zIndex - 1, wrap = that.DOM.wrap, config = that.config, docWidth = _$document.width(), docHeight = _$document.height(), lockMaskWrap = that._lockMaskWrap || $(_$body[0].appendChild(document.createElement('div'))), lockMask = that._lockMask || $(lockMaskWrap[0].appendChild(document.createElement('div'))), domTxt = '(document).documentElement', sizeCss = _isMobile ? 'width:' + docWidth + 'px;height:' + docHeight + 'px' : 'width:100%;height:100%', ie6Css = _isIE6 ? 'position:absolute;left:expression(' + domTxt + '.scrollLeft);top:expression(' + domTxt + '.scrollTop);width:expression(' + domTxt + '.clientWidth);height:expression(' + domTxt + '.clientHeight)' : '';
            that.focus(true);
            wrap.addClass('aui_state_lock');
            lockMaskWrap[0].style.cssText = sizeCss + ';position:fixed;z-index:' + index + ';top:0;left:0;overflow:hidden;' + ie6Css;
            lockMask[0].style.cssText = 'height:100%;background:' + config.background + ';filter:alpha(opacity=0);opacity:0';
            if (_isIE6) lockMask.html('<iframe src="about:blank" style="width:100%;height:100%;position:absolute;' + 'top:0;left:0;z-index:-1;filter:alpha(opacity=0)"></iframe>');
            lockMask.stop();
            lockMask.bind('click', function () {
                that._reset()
            }).bind('dblclick', function () {
            });
            if (config.duration === 0) {
                lockMask.css({opacity: config.opacity})
            } else {
                lockMask.animate({opacity: config.opacity}, config.duration)
            }
            ;
            that._lockMaskWrap = lockMaskWrap;
            that._lockMask = lockMask;
            that._lock = true;
            return that
        }, unlock: function () {
            var that = this, lockMaskWrap = that._lockMaskWrap, lockMask = that._lockMask;
            if (!that._lock) return that;
            var style = lockMaskWrap[0].style;
            var un = function () {
                if (_isIE6) {
                    style.removeExpression('width');
                    style.removeExpression('height');
                    style.removeExpression('left');
                    style.removeExpression('top')
                }
                ;
                style.cssText = 'display:none';
                _box && lockMaskWrap.remove()
            };
            lockMask.stop().unbind();
            that.DOM.wrap.removeClass('aui_state_lock');
            if (!that.config.duration) {
                un()
            } else {
                lockMask.animate({opacity: 0}, that.config.duration, un)
            }
            ;
            that._lock = false;
            return that
        }, _getDOM: function () {
            var wrap = document.createElement('div');
            wrap.style.cssText = 'position:absolute;left:0;top:0';
            wrap.innerHTML = artDialog.templates;
            document.body.appendChild(wrap);
            var name, i = 0, DOM = {wrap: $(wrap)}, els = wrap.getElementsByTagName('*'), elsLen = els.length;
            for (; i < elsLen; i++) {
                name = els[i].className.split('aui_')[1];
                if (name) DOM[name] = $(els[i])
            }
            ;
            return DOM
        }, _toNumber: function (thisValue, maxValue) {
            if (!thisValue && thisValue !== 0 || typeof thisValue === 'number') {
                return thisValue
            }
            ;
            var last = thisValue.length - 1;
            if (thisValue.lastIndexOf('px') === last) {
                thisValue = parseInt(thisValue)
            } else if (thisValue.lastIndexOf('%') === last) {
                thisValue = parseInt(maxValue * thisValue.split('%')[0] / 100)
            }
            ;
            return thisValue
        }, _ie6PngFix: _isIE6 ? function () {
            var i = 0, elem, png, pngPath, runtimeStyle, path = artDialog.defaults.path + '/skins/', list = this.DOM.wrap[0].getElementsByTagName('*');
            for (; i < list.length; i++) {
                elem = list[i];
                png = elem.currentStyle['png'];
                if (png) {
                    pngPath = path + png;
                    runtimeStyle = elem.runtimeStyle;
                    runtimeStyle.backgroundImage = 'none';
                    runtimeStyle.filter = "progid:DXImageTransform.Microsoft." + "AlphaImageLoader(src='" + pngPath + "',sizingMethod='crop')"
                }
            }
        } : $.noop, _ie6SelectFix: _isIE6 ? function () {
            var $wrap = this.DOM.wrap, wrap = $wrap[0], expando = _expando + 'iframeMask', iframe = $wrap[expando], width = wrap.offsetWidth, height = wrap.offsetHeight;
            width = width + 'px';
            height = height + 'px';
            if (iframe) {
                iframe.style.width = width;
                iframe.style.height = height
            } else {
                iframe = wrap.appendChild(document.createElement('iframe'));
                $wrap[expando] = iframe;
                iframe.src = 'about:blank';
                iframe.style.cssText = 'position:absolute;z-index:-1;left:0;top:0;' + 'filter:alpha(opacity=0);width:' + width + ';height:' + height
            }
        } : $.noop, _runScript: function (elem) {
            var fun, i = 0, n = 0, tags = elem.getElementsByTagName('script'), length = tags.length, script = [];
            for (; i < length; i++) {
                if (tags[i].type === 'text/dialog') {
                    script[n] = tags[i].innerHTML;
                    n++
                }
            }
            ;
            if (script.length) {
                script = script.join('');
                fun = new Function(script);
                fun.call(this)
            }
        }, _autoPositionType: function () {
            this[this.config.fixed ? '_setFixed' : '_setAbsolute']()
        }, _setFixed: (function () {
            _isIE6 && $(function () {
                var bg = 'backgroundAttachment';
                if (_$html.css(bg) !== 'fixed' && _$body.css(bg) !== 'fixed') {
                    _$html.css({backgroundImage: 'url(about:blank)', backgroundAttachment: 'fixed'})
                }
            });
            return function () {
                var $elem = this.DOM.wrap, style = $elem[0].style;
                if (_isIE6) {
                    var left = parseInt($elem.css('left')), top = parseInt($elem.css('top')), sLeft = _$document.scrollLeft(), sTop = _$document.scrollTop(), txt = '(document.documentElement)';
                    this._setAbsolute();
                    style.setExpression('left', 'eval(' + txt + '.scrollLeft + ' + (left - sLeft) + ') + "px"');
                    style.setExpression('top', 'eval(' + txt + '.scrollTop + ' + (top - sTop) + ') + "px"')
                } else {
                    style.position = 'fixed'
                }
            }
        }()), _setAbsolute: function () {
            var style = this.DOM.wrap[0].style;
            if (_isIE6) {
                style.removeExpression('left');
                style.removeExpression('top')
            }
            ;
            style.position = 'absolute'
        }, _click: function (name) {
            var that = this, fn = that._listeners[name] && that._listeners[name].callback;
            return typeof fn !== 'function' || fn.call(that, window) !== false ? that.close() : that
        }, _reset: function (test) {
            var newSize, that = this, oldSize = that._winSize || _$window.width() * _$window.height(), elem = that._follow, width = that._width, height = that._height, left = that._left, top = that._top;
            if (test) {
                newSize = that._winSize = _$window.width() * _$window.height();
                if (oldSize === newSize) return
            }
            ;
            if (width || height) that.size(width, height);
            if (elem) {
                that.follow(elem)
            } else if (left || top) {
                that.position(left, top)
            }
        }, _addEvent: function () {
            var resizeTimer, that = this, config = that.config, isIE = 'CollectGarbage' in window, DOM = that.DOM;
            that._winResize = function () {
                resizeTimer && clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    that._reset(isIE)
                }, 40)
            };
            _$window.bind('resize', that._winResize);
            DOM.wrap.bind('click', function (event) {
                var target = event.target, callbackID;
                if (target.disabled) return false;
                if (target === DOM.close[0]) {
                    that._click(config.cancelVal);
                    return false
                } else {
                    callbackID = target[_expando + 'callback'];
                    callbackID && that._click(callbackID)
                }
                ;
                that._ie6SelectFix()
            }).bind('mousedown', function () {
                that.focus(true)
            })
        }, _removeEvent: function () {
            var that = this, DOM = that.DOM;
            DOM.wrap.unbind();
            _$window.unbind('resize', that._winResize)
        }
    };
    artDialog.fn._init.prototype = artDialog.fn;
    $.fn.dialog = $.fn.artDialog = function () {
        var config = arguments;
        this[this.live ? 'live' : 'bind']('click', function () {
            artDialog.apply(this, config);
            return false
        });
        return this
    };
    artDialog.focus = null;
    artDialog.list = {};
    _$document.bind('keydown', function (event) {
        var target = event.target, nodeName = target.nodeName, rinput = /^INPUT|TEXTAREA$/, api = artDialog.focus, keyCode = event.keyCode;
        if (!api || !api.config.esc || rinput.test(nodeName)) return;
        keyCode === 27 && api._click(api.config.cancelVal)
    });
    _path = window['_artDialog_path'] || (function (script, i, me) {
            for (i in script) {
                if (script[i].src && script[i].src.indexOf('artDialog') !== -1) me = script[i]
            }
            ;
            _thisScript = me || script[script.length - 1];
            me = _thisScript.src.replace(/\\/g, '/');
            return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'))
        }(document.getElementsByTagName('script')));
    _skin = _thisScript.src.split('skin=')[1];
    if (_skin) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = _path + '/skins/' + _skin + '.css?' + artDialog.fn.version;
        _thisScript.parentNode.insertBefore(link, _thisScript)
    }
    ;
    _$window.bind('load', function () {
        setTimeout(function () {
            if (_count) return;
            artDialog({left: '-9999em', time: 9, fixed: false, lock: false, focus: false})
        }, 150)
    });
    try {
        document.execCommand('BackgroundImageCache', false, true)
    } catch (e) {
    }
    ;
    artDialog.templates = '<div class="aui_outer">' + '<table class="aui_border">' + '<tbody>' + '<tr>' + '<td class="aui_nw"></td>' + '<td class="aui_n"></td>' + '<td class="aui_ne"></td>' + '</tr>' + '<tr>' + '<td class="aui_w"></td>' + '<td class="aui_c">' + '<div class="aui_inner">' + '<table class="aui_dialog">' + '<tbody>' + '<tr>' + '<td colspan="2" class="aui_header">' + '<div class="aui_titleBar">' + '<div class="aui_title"></div>' + '<a class="aui_close" href="javascript:/*artDialog*/;">' + '\xd7' + '</a>' + '</div>' + '</td>' + '</tr>' + '<tr>' + '<td class="aui_icon">' + '<div class="aui_iconBg"></div>' + '</td>' + '<td class="aui_main">' + '<div class="aui_content"></div>' + '</td>' + '</tr>' + '<tr>' + '<td colspan="2" class="aui_footer">' + '<div class="aui_buttons"></div>' + '</td>' + '</tr>' + '</tbody>' + '</table>' + '</div>' + '</td>' + '<td class="aui_e"></td>' + '</tr>' + '<tr>' + '<td class="aui_sw"></td>' + '<td class="aui_s"></td>' + '<td class="aui_se"></td>' + '</tr>' + '</tbody>' + '</table>' + '</div>';
    artDialog.defaults = {
        content: '<div class="aui_loading"><span>loading..</span></div>',
        title: '\u6d88\u606f',
        button: null,
        ok: null,
        cancel: null,
        init: null,
        close: null,
        okVal: '\u786E\u5B9A',
        cancelVal: '\u53D6\u6D88',
        width: 'auto',
        height: 'auto',
        minWidth: 96,
        minHeight: 32,
        padding: '20px 25px',
        skin: '',
        icon: null,
        time: null,
        esc: true,
        focus: true,
        show: true,
        follow: null,
        path: _path,
        lock: true,
        background: '#ccc',
        opacity: .7,
        duration: 300,
        fixed: false,
        left: '50%',
        top: '38.2%',
        zIndex: 1987,
        resize: true,
        drag: true
    };
    window.artDialog = $.dialog = $.artDialog = artDialog
}((window.jQuery && (window.art = jQuery)) || window.art, this));
;(function ($) {
    var _dragEvent, _use, _$window = $(window), _$document = $(document), _elem = document.documentElement, _isIE6 = !-[1,] && !('minWidth' in _elem.style), _isLosecapture = 'onlosecapture' in _elem, _isSetCapture = 'setCapture' in _elem;
    artDialog.dragEvent = function () {
        var that = this, proxy = function (name) {
            var fn = that[name];
            that[name] = function () {
                return fn.apply(that, arguments)
            }
        };
        proxy('start');
        proxy('move');
        proxy('end')
    };
    artDialog.dragEvent.prototype = {
        onstart: $.noop, start: function (event) {
            _$document.bind('mousemove', this.move).bind('mouseup', this.end);
            this._sClientX = event.clientX;
            this._sClientY = event.clientY;
            this.onstart(event.clientX, event.clientY);
            return false
        }, onmove: $.noop, move: function (event) {
            this._mClientX = event.clientX;
            this._mClientY = event.clientY;
            this.onmove(event.clientX - this._sClientX, event.clientY - this._sClientY);
            return false
        }, onend: $.noop, end: function (event) {
            _$document.unbind('mousemove', this.move).unbind('mouseup', this.end);
            this.onend(event.clientX, event.clientY);
            return false
        }
    };
    _use = function (event) {
        var limit, startWidth, startHeight, startLeft, startTop, isResize, api = artDialog.focus, config = api.config, DOM = api.DOM, wrap = DOM.wrap, title = DOM.title, main = DOM.main;
        var clsSelect = 'getSelection' in window ? function () {
            window.getSelection().removeAllRanges()
        } : function () {
            try {
                document.selection.empty()
            } catch (e) {
            }
        };
        _dragEvent.onstart = function (x, y) {
            if (isResize) {
                startWidth = main[0].offsetWidth;
                startHeight = main[0].offsetHeight
            } else {
                startLeft = wrap[0].offsetLeft;
                startTop = wrap[0].offsetTop
            }
            ;
            _$document.bind('dblclick', _dragEvent.end);
            !_isIE6 && _isLosecapture ? title.bind('losecapture', _dragEvent.end) : _$window.bind('blur', _dragEvent.end);
            _isSetCapture && title[0].setCapture();
            wrap.addClass('aui_state_drag');
            api.focus()
        };
        _dragEvent.onmove = function (x, y) {
            if (isResize) {
                var wrapStyle = wrap[0].style, style = main[0].style, width = x + startWidth, height = y + startHeight;
                wrapStyle.width = 'auto';
                style.width = Math.max(0, width) + 'px';
                wrapStyle.width = wrap[0].offsetWidth + 'px';
                style.height = Math.max(0, height) + 'px'
            } else {
                var style = wrap[0].style, left = x + startLeft, top = y + startTop;
                config.left = Math.max(limit.minX, Math.min(limit.maxX, left));
                config.top = Math.max(limit.minY, Math.min(limit.maxY, top));
                style.left = config.left + 'px';
                style.top = config.top + 'px'
            }
            ;
            clsSelect();
            api._ie6SelectFix()
        };
        _dragEvent.onend = function (x, y) {
            _$document.unbind('dblclick', _dragEvent.end);
            !_isIE6 && _isLosecapture ? title.unbind('losecapture', _dragEvent.end) : _$window.unbind('blur', _dragEvent.end);
            _isSetCapture && title[0].releaseCapture();
            _isIE6 && api._autoPositionType();
            wrap.removeClass('aui_state_drag')
        };
        isResize = event.target === DOM.se[0] ? true : false;
        limit = (function () {
            var maxX, maxY, wrap = api.DOM.wrap[0], fixed = wrap.style.position === 'fixed', ow = wrap.offsetWidth, oh = wrap.offsetHeight, ww = _$window.width(), wh = _$window.height(), dl = fixed ? 0 : _$document.scrollLeft(), dt = fixed ? 0 : _$document.scrollTop(), maxX = ww - ow + dl;
            maxY = wh - oh + dt;
            return {minX: dl, minY: dt, maxX: maxX, maxY: maxY}
        })();
        _dragEvent.start(event)
    };
    _$document.bind('mousedown', function (event) {
        var api = artDialog.focus;
        if (!api) return;
        var target = event.target, config = api.config, DOM = api.DOM;
        if (config.drag !== false && target === DOM.title[0] || config.resize !== false && target === DOM.se[0]) {
            _dragEvent = _dragEvent || new artDialog.dragEvent();
            _use(event);
            return false;
        }
    })
})(window.jQuery || window.art);

artDialog.notice = function (options) {
    var opt = options || {},
        api, aConfig, hide, wrap, top,
        duration = 800;
    var config = {
        id: 'Notice',
        left: '100%',
        top: '100%',
        fixed: true,
        drag: false,
        resize: false,
        follow: null,
        lock: false,
        init: function (here) {
            api = this;
            aConfig = api.config;
            wrap = api.DOM.wrap;
            top = parseInt(wrap[0].style.top);
            hide = top + wrap[0].offsetHeight;

            wrap.css('top', hide + 'px')
                .animate({top: top + 'px'}, duration, function () {
                    opt.init && opt.init.call(api, here);
                });
        },
        close: function (here) {
            wrap.animate({top: hide + 'px'}, duration, function () {
                opt.close && opt.close.call(this, here);
                aConfig.close = $.noop;
                api.close();
            });

            return false;
        }
    };
    for (var i in opt) {
        if (config[i] === undefined) config[i] = opt[i];
    }
    ;
    return artDialog(config);
};