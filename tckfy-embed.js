! function() {
    function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c || a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }
    return a
}()({
    1: [function(a, b, c) {
        "use strict";

        function d(a) {
            var b = {};
            if (a.hasAttributes())
                for (var c = a.attributes, d = c.length - 1; d >= 0; d--) {
                    var e = c[d].name;
                    if (0 === e.indexOf("data-tockify-")) {
                        var f = e.replace("data-tockify-", "");
                        b[f] = c[d].value
                    }
                }
            return b
        }

        function e(a) {
            return a ? a.trim().toLowerCase() : void 0
        }

        function f(a) {
            a.calendar = e(a.calendar), a.component = e(a.component), "mini" === a.component && (a.component = "upcoming"), a.demo = e(a.demo);
            var b = e(a.shownavbar);
            "true" === b ? a.showNavBar = !0 : "false" === b && (a.showNavBar = !1), delete a.shownavbar, a.view = e(a.view), -1 === g.indexOf(a.view) && delete a.view, "upcoming" === a.component && (a.upcomingView = "monthly" === a.view ? "month" : a.view, a.view = "upcoming"), a.maxeventsperquery = a.maxeventsperquery || a.maxevents, a.maxeventsperquery = +a.maxeventsperquery, isNaN(a.maxeventsperquery) || (a.maxEventsPerQuery = a.maxeventsperquery), delete a.maxeventsperquery
        }
        var g = ["pinboard", "agenda", "monthly"],
            h = {};
        c.embedNameToArgs = h, c.parseTagAttrs = d, c.validateAndCanonicalise = f
    }, {}],
    2: [function(a, b, c) {
        "use strict";

        function d() {
            return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        }

        function e() {
            return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
        }

        function f(a) {
            return document.querySelector(a)
        }

        function g(a) {
            return document.querySelectorAll(a)
        }

        function h() {
            return f("[tkf-wrap-guid]")
        }

        function i() {
            return f(".tkf-overlay-ng")
        }

        function j() {
            if (C.isWeeblyEditor()) {
                var a = h(),
                    b = a.previousElementSibling,
                    c = b && b.classList.contains("platform-element-overlay");
                c || a.insertAdjacentHTML("beforebegin", '<div class="platform-element-overlay"> </div>')
            }
        }

        function k(a) {
            if ("string" == typeof args)
                for (var b = g('[data-tockify-manual="' + a + '"]'), c = 0; c < b.length; c++) r(b.item(c))
        }

        function l(a) {
            return document.createTextNode(a)
        }

        function m(a, b) {
            function c(a, c, d) {
                var e = b[c] || b[d] || b[a];
                e && i.push(a + "=" + encodeURIComponent(e))
            }

            function d() {
                var b = H.isMobile.apple.device ? 'scrolling="no"' : "";
                a.insertAdjacentHTML("afterend", '<div tkf-wrap-guid="' + o + '" ' + m + "><iframe " + b + ' title="' + v + '" name="' + n + '"  src="' + q + p + h + '"></iframe></div>'), r.removeChild(a)
            }

            function e() {
                var b = !(a.offsetWidth <= 0 && a.offsetHeight <= 0);
                return b
            }
            if (!b) return void a.appendChild(l("Misconfigured call to loadCalendar. No arguments were passed"));
            if ("object" != typeof b) return void a.appendChild(l("Misconfigured call to loadCalendar. The argument should be an object"));
            G.validateAndCanonicalise(b);
            var f = "single" === b.component;
            if (!b.calendar && !b.path && !f) return void a.appendChild(l("Misconfigured Tockify Embed Code. Either the 'data-tockify-calendar' or the 'data-tockify-path' attribute must be present"));
            if (!b.component) return void a.appendChild(l("Misconfigured Tockify Embed Code. The 'data-tockify-component' attribute is missing"));
            var g = !1;
            "upcoming" === b.component && (g = 20), "calendar" === b.component, b.height && (g = b.height);
            var h, i = [];
            b.path ? h = b.path : f ? h = "/" + b.calendar + "/detailquery" : b.view ? (h = "/" + b.calendar + "/" + b.view, "upcoming" === b.view && c("view", "upcomingView")) : h = "/" + b.calendar, c("tags"), c("search"), c("startms"), c("maxEventsPerQuery", "maxEvents"), c("demo"), i.length > 0 && (h = h + "?" + i.join("&"));
            var k = [];
            b.height && k.push("height:" + b.height + ";overflow-y:scroll;-webkit-overflow-scrolling:touch"), b.width && k.push("width:" + b.width);
            var m = "";
            k.length > 0 && (m = 'style="' + k.join(";") + '"');
            var n = C.toEmbedName(b.guid),
                o = C.toWrapName(n);
            G.embedNameToArgs[n] = b;
            var p = b.prefix || D.prefix,
                q = b.canonicalhost || D.rootPath(),
                r = a.parentNode,
                s = window.getComputedStyle(r),
                t = s.getPropertyValue("overflow"),
                u = s.getPropertyValue("overflow-y");
            ("scroll" === t || "auto" === t || "scroll" === u || "auto" === u) && (r.style["-webkit-overflow-scrolling"] = "touch");
            var v = b.title || "calendar";
            if (e()) d(), E.applyStyles('[tkf-wrap-guid="' + o + '"]', g);
            else var w = setInterval(function() {
                e() && (clearInterval(w), d(), E.applyStyles('[tkf-wrap-guid="' + o + '"]', g))
            }, 100);
            I.addClientListeningHandler(n, function() {
                var a = C.nameToFrame(n);
                F.sendInfo(a, b), setTimeout(function() {
                    j()
                }, 200)
            })
        }

        function n(a) {
            "string" == typeof a && (a = {
                name: a
            }), a.guid || (a.guid = C.makeName()), E.initStyles();
            var b;
            if (a.path) b = a.path;
            else {
                var c = a.view ? "/" + a.view : "";
                b = "/" + a.name + c
            }
            var d = C.toEmbedName(a.guid),
                e = a.overlay ? C.toOverlayName(a.guid) : C.toFullScreenName(a.guid);
            I.disposeClient(e);
            var f = G.embedNameToArgs[d] || {},
                g = a.canonicalhost || f.canonicalhost || D.rootPath(),
                h = g + D.prefix + b;
            E.addViewportIfMissing();
            var j = document.body;
            j.insertAdjacentHTML("afterbegin", '<div class="tkf-overlay-ng"><span class="tkf-close-icon">&#x2715;</span><div class="tkf-wrap"><iframe name="' + e + '" class="tkf-fullpage"  src="' + h + '"></iframe></div></div></div>');
            try {
                K.disableScroll();
                var k = i(),
                    l = function() {
                        p()
                    };
                k.addEventListener("click", l), I.addClientListeningHandler(e, function() {
                    var a = C.toEmbedName(e),
                        b = C.nameToFrame(a);
                    I.postMessage(b, {
                        type: "fullscreen-ready"
                    })
                }), I.addClientListeningHandler(e, function() {
                    function a() {
                        I.postMessage(e, {
                            type: "fullscreen-close"
                        })
                    }
                    k.removeEventListener("click", l), k.addEventListener("click", function() {
                        a()
                    })
                }), I.addClientListeningHandler(e, function() {
                    var a = C.nameToFrame(e),
                        b = C.toEmbedName(e);
                    F.sendInfo(a, G.embedNameToArgs[b], L[b])
                })
            } catch (m) {
                p()
            }
        }

        function o(a) {
            n({
                path: a.eventPath,
                guid: a.guid
            })
        }

        function p() {
            K.enableScroll();
            var a = i();
            a && (document.body.removeChild(a), E.removeViewportIfAdded())
        }

        function q(a, b, c) {
            L[C.frameToName(a)] = b;
            var d = {
                type: "update-settings",
                settings: b,
                filter: c
            };
            I.postMessage(a, d), (z !== b.background || A !== b.transparentWhenEmbedded) && C.fixChromeRenderBug(), z = b.background, A = b.transparentWhenEmbedded
        }

        function r(a) {
            B = !0;
            var b = G.parseTagAttrs(a);
            m(a, b)
        }

        function s(a) {
            "undefined" == typeof a && (a = 50), !B && a > 0 && (B = !!f("[data-tockify-component]"), B ? (t(), setTimeout(function() {
                t()
            }, 100)) : setTimeout(function() {
                s(a - 1)
            }, 100))
        }

        function t() {
            for (var a = g("[data-tockify-component]"), b = 0; b < a.length; b++) a.item(b).getAttribute("data-tockify-manual") || r(a.item(b));
            J.watchBrowserURL(function() {
                J.repeat(function() {
                    t()
                })
            })
        }

        function u(a, b) {
            var c = "pb-" + C.makeGuid();
            M[c] = b;
            var d = {
                type: "read-settings",
                passback: c
            };
            I.postMessage(a, d)
        }

        function v(a, b) {
            var c = {
                type: "update-state",
                stateParams: b
            };
            I.postMessage(a, c)
        }

        function w(a, b) {
            N[a] = b
        }

        function x(a) {
            return O[a] ? !1 : (O[a] = !0, !0)
        }

        function y(a, b) {
            var c = C.toWrapName(a),
                f = P(c);
            return "number" == typeof b ? (window.scroll(e(), f + b), d() === f + b) : d() - f
        }
        var z, A, B, C = a("./util.js"),
            D = a("./config.js"),
            E = a("./styler.js"),
            F = a("./host.js"),
            G = a("./args.js"),
            H = a("./env.js"),
            I = a("./cross-domain.js"),
            J = a("./routewatcher.js"),
            K = a("./scrollcontrol.js"),
            L = {},
            M = {};
        I.addHandler("read-settings-response", function(a) {
            var b = M[a.passback];
            b && (b(a.settings), delete M[a.passback])
        });
        var N = {},
            O = {};
        I.addHandler("get-embed-scrolltop", function(a) {
            var b = a.guid,
                c = y(b);
            I.postMessage(b, {
                type: "embed-scrolltop-changed",
                scrollTop: c
            })
        }), I.addHandler("embed-scrolltop", function(a) {
            function b(a) {
                a > 0 && !y(d, c) && setTimeout(function() {
                    b(a - 1)
                }, 50)
            }
            var c = a.scrollTop,
                d = a.guid;
            b(40)
        });
        var P = function(a) {
                var b = f('[tkf-wrap-guid="' + a + '"]');
                return b ? C.getCoords(b).top : null
            },
            Q = function(a) {
                var b = C.toWrapName(a),
                    c = P(b);
                if (null !== c) {
                    var e = d(),
                        f = document.documentElement.clientHeight,
                        g = e + f,
                        h = c,
                        i = h > e || h > g;
                    return i
                }
                return !1
            };
        I.addHandler("state-change", function(a) {
            if ("viewers.inter" !== a.stateChange.toState.name) {
                var b = !C.isFullScreenName(a.guid);
                if (b && !x(a.guid)) {
                    var c = 80;
                    if (!Q(a.guid)) {
                        var d = C.toWrapName(a.guid),
                            f = P(d),
                            g = Math.max(f - c, 0);
                        window.scroll(e(), g)
                    }
                }
                var h = N[a.guid];
                h && h(a.stateChange)
            }
        }), I.addHandler("open-popup", function(a) {
            p();
            var b = "";
            a.args && a.args.locale && (b += "?locale=" + a.args.locale), n({
                path: "/over" + b,
                guid: a.guid,
                overlay: !0
            });
            var c = f(".tkf-overlay-ng");
            c.classList.add("tkf-clear");
            var d = C.toOverlayName(a.guid);
            I.postMessage(d, a)
        }), I.addHandler("fullscreen", function(a) {
            a.open ? (p(a), o(a)) : p(a)
        }), c.requestSettings = u, c.updateSettings = q, c.loadCalendar = k, c.updateState = v, c.onStateChange = w, c.openFullScreen = n, c.loadDeclaredCalendars = t, c.waitForDynamicDeclarations = s
    }, {
        "./args.js": 1,
        "./config.js": 3,
        "./cross-domain.js": 4,
        "./env.js": 5,
        "./host.js": 6,
        "./routewatcher.js": 8,
        "./scrollcontrol.js": 9,
        "./styler.js": 10,
        "./util.js": 11
    }],
    3: [function(a, b, c) {
        "use strict";

        function d() {
            return window._tkf && window._tkf.rootPath ? window._tkf.rootPath : "https://tockify.com"
        }
        var e;
        c.rootPath = function() {
            return e || (e = d()), e
        }, c.prefix = "", c.WINDOW_NAME_PREFIX = "tkf-client-window"
    }, {}],
    4: [function(a, b, c) {
        "use strict";

        function d(a) {
            k = k.filter(function(b) {
                return a != b
            }), delete l[a], j = j.filter(function(b) {
                return a != b.guid
            })
        }

        function e(a, b) {
            -1 !== k.indexOf(a) ? b() : (l[a] = l[a] || [], l[a].push(b))
        }

        function f(a) {
            for (var b = l[a] || [], c = 0; c < b.length; c++) b[c]()
        }

        function g(a) {
            j.forEach(function(b) {
                if (b.guid === a) {
                    var c = h.nameToFrame(a);
                    o(c, b.msg)
                }
            }), j = j.filter(function(b) {
                return b.guid !== a
            })
        }
        var h = a("./util.js"),
            i = {},
            j = [],
            k = [],
            l = {},
            m = !0;
        try {
            window.postMessage({
                toString: function() {
                    m = !1
                }
            }, "*")
        } catch (n) {}
        var o = function(a, b) {
                if (a) {
                    var c = h.getJSON(),
                        d = a.contentWindow;
                    b.tkf = !0, m ? d.postMessage(b, "*") : d.postMessage(c.stringify(b), "*")
                }
            },
            p = function(a, b) {
                if (null !== a) {
                    var c, d;
                    return "string" == typeof a ? (c = a, d = h.nameToFrame(c)) : (d = a, c = a.getAttribute("name")), -1 === k.indexOf(c) ? void j.push({
                        msg: b,
                        guid: c
                    }) : void o(d, b)
                }
            },
            q = function(a, b) {
                i[a] = b
            },
            r = function(a) {
                delete i[a]
            };
        window.addEventListener("message", function(a) {
            var b, c = h.getJSON();
            if ("string" == typeof a.data && 0 === a.data.indexOf("{")) b = c.parse(a.data);
            else {
                if ("object" != typeof a.data) return;
                b = a.data
            }
            b.type = b.type || "missing";
            var d = i[b.type];
            d && d(b, a)
        }, !1), q("client-listening", function(a, b) {
            k.push(a.guid), g(a.guid), f(a.guid)
        }), c.disposeClient = d, c.addClientListeningHandler = e, c.postMessage = p, c.addHandler = q, c.removeHandler = r
    }, {
        "./util.js": 11
    }],
    5: [function(a, b, c) {
        "use strict";
        var d = /iPhone/i,
            e = /iPod/i,
            f = /iPad/i,
            g = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
            h = /Android/i,
            i = /IEMobile/i,
            j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
            k = /BlackBerry/i,
            l = /BB10/i,
            m = /Opera Mini/i,
            n = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
            o = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
            p = function(a, b) {
                return a.test(b)
            },
            q = function(a) {
                var b = a || navigator.userAgent;
                return this.apple = {
                    phone: p(d, b),
                    ipod: p(e, b),
                    tablet: p(f, b),
                    device: p(d, b) || p(e, b) || p(f, b)
                }, this.android = {
                    phone: p(g, b),
                    tablet: !p(g, b) && p(h, b),
                    device: p(g, b) || p(h, b)
                }, this.windows = {
                    phone: p(i, b),
                    tablet: p(j, b),
                    device: p(i, b) || p(j, b)
                }, this.other = {
                    blackberry: p(k, b),
                    blackberry10: p(l, b),
                    opera: p(m, b),
                    firefox: p(n, b),
                    device: p(k, b) || p(l, b) || p(m, b) || p(n, b)
                }, this.seven_inch = p(o, b), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window ? this : void 0
            },
            r = function() {
                var a = new q;
                return a.Class = q, a
            };
        c.isMobile = r(), c.isWindows = function() {
            return navigator.platform.indexOf("Win") > -1
        }(), c.isMac = function() {
            return navigator.platform.indexOf("Mac") > -1
        }()
    }, {}],
    6: [function(a, b, c) {
        "use strict";

        function d(a, b, c) {
            var d = {
                type: "host-info",
                height: document.documentElement.clientHeight,
                width: document.documentElement.clientWidth,
                inIFrame: window !== window.top,
                isWeeblyEditor: f.isWeeblyEditor(),
                parentDomain: window.location.hostname,
                args: b,
                settings: c
            };
            e.postMessage(a, d)
        }
        var e = a("./cross-domain.js"),
            f = a("./util.js"),
            g = a("./env.js");
        c.logicalWidth = function() {
            return g.isMobile.any ? window.screen.width : document.documentElement.clientWidth
        }, c.sendInfo = d
    }, {
        "./cross-domain.js": 4,
        "./env.js": 5,
        "./util.js": 11
    }],
    7: [function(a, b, c) {
        "use strict";
        window._tkf = window._tkf || {};
        var d = a("./config.js").WINDOW_NAME_PREFIX;
        if (!window.addEventListener && function(a, b, c, d, e, f, g) {
                a[d] = b[d] = c[d] = function(a, b) {
                    var c = this;
                    g.unshift([c, a, b, function(a) {
                        a.currentTarget = c, a.preventDefault = function() {
                            a.returnValue = !1
                        }, a.stopPropagation = function() {
                            a.cancelBubble = !0
                        }, a.target = a.srcElement || c, b.call(c, a)
                    }]), this.attachEvent("on" + a, g[0][3])
                }, a[e] = b[e] = c[e] = function(a, b) {
                    for (var c, d = 0; c = g[d]; ++d)
                        if (c[0] == this && c[1] == a && c[2] == b) return this.detachEvent("on" + a, g.splice(d, 1)[0][3])
                }, a[f] = b[f] = c[f] = function(a) {
                    return this.fireEvent("on" + a.type, a)
                }
            }(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []), !window._tkf.embedScriptLoaded && 0 !== window.name.indexOf(d)) {
            window._tkf.embedScriptLoaded = !0;
            var e = a("./cross-domain.js"),
                f = a("./calendars.js"),
                g = a("./host.js"),
                h = a("./env.js"),
                i = a("./util.js");
            e.addHandler("embed-dimensions", function(a) {
                if (i.isEmbedName(a.guid)) {
                    var b = document.querySelector("[name=" + a.guid + "]");
                    b.style.height = a.height + "px", window.gadgets && window.gadgets.window && window.gadgets.window.adjustHeight && window.gadgets.window.adjustHeight(a.height)
                } else if (h.isMobile.any) {
                    var c = document.querySelector(".tkf-overlay-ng");
                    c.style["overflow-y"] = "scroll", c.style["-webkit-overflow-scrolling"] = "auto";
                    var d = document.querySelector(".tkf-wrap");
                    d.style["overflow-y"] = "scroll", d.style["-webkit-overflow-scrolling"] = "auto", setTimeout(function() {
                        var a = document.querySelector(".tkf-overlay-ng");
                        a.style["overflow-y"] = "scroll", a.style["-webkit-overflow-scrolling"] = "touch";
                        var b = document.querySelector(".tkf-wrap");
                        b.style["overflow-y"] = "scroll", b.style["-webkit-overflow-scrolling"] = "touch"
                    }, 500)
                }
            }), e.addHandler("show-full-screen", function(a, b) {
                var c = document.querySelector(".tkf-overlay-ng");
                c.classList.add("tkf-fade")
            }), e.addHandler("request-host-info", function(a, b) {
                var c = b.source;
                g.sendInfo(c), window.on("resize", function() {
                    g.sendInfo(c)
                })
            }), window._tkf.loadCalendar = f.loadCalendar, window._tkf.updateState = f.updateState, window._tkf.onCalendarStateChange = f.onStateChange, window._tkf.loadDeclaredCalendars = f.loadDeclaredCalendars, window._tkf.updateSettings = f.updateSettings, window._tkf.requestSettings = f.requestSettings, window._tkf.openFullScreen = f.openFullScreen;
            var j = function() {
                window._tkfReady || (f.loadDeclaredCalendars(), f.waitForDynamicDeclarations(50)), window._tkfOnReady && window._tkfOnReady(), window._tkfReady = !0
            };
            document.addEventListener("DOMContentLoaded", j), window.addEventListener("load", j, !1), "complete" === document.readyState && j()
        }
    }, {
        "./calendars.js": 2,
        "./config.js": 3,
        "./cross-domain.js": 4,
        "./env.js": 5,
        "./host.js": 6,
        "./util.js": 11
    }],
    8: [function(a, b, c) {
        function d(a) {
            var b = window.location.href;
            b !== g && (g = b, a(b))
        }

        function e(a) {
            var b = function() {
                d(a)
            };
            h && window.addEventListener("popstate", b), window.addEventListener("hashchange", b)
        }

        function f(a, b, c) {
            "number" != typeof b && (b = 100), "number" != typeof c && (c = 10), c > 0 && setTimeout(function() {
                a(), f(a, --c, b)
            }, b)
        }
        var g, h = window.history && window.history.pushState;
        c.watchBrowserURL = e, c.repeat = f
    }, {}],
    9: [function(a, b, c) {
        function d(a, b) {
            q.addEventListener(a, b)
        }

        function e(a, b) {
            q.removeEventListener(a, b)
        }

        function f() {
            var a = window.getComputedStyle(document.documentElement),
                b = a["overflow-y"];
            "auto" !== b && "scroll" !== b && (document.body.style.overflowY = "scroll")
        }

        function g() {
            r = !0, l.hideScrollBar();
            var a = q.documentElement,
                b = q.body;
            o.y = p.pageYOffset || a.scrollTop || b.scrollTop, o.x = p.pageXOffset || a.scrollLeft || b.scrollLeft, n.forEach(function(a) {
                d(a, i, !1)
            }), d("scroll", k, !1), d("keydown", j, !1)
        }

        function h() {
            r && (l.showScrollBar(), n.forEach(function(a) {
                e(a, i)
            }), e("scroll", k), e("keydown", j))
        }

        function i(a) {
            return a.stopImmediatePropagation(), a.preventDefault(), a.returnValue = !1, !1
        }

        function j(a) {
            -1 !== m.indexOf(a.keyCode) && a.preventDefault()
        }

        function k() {
            window.scroll(o.x, o.y)
        }
        var l = a("./styler.js"),
            m = (a("./env.js"), [32, 33, 34, 35, 36, 37, 38, 39, 40]),
            n = ["mousewheel", "wheel", "DOMMouseScroll", "touchmove"],
            o = {},
            p = window,
            q = document,
            r = !1;
        c.disableScroll = g, c.enableScroll = h, c.makeBodyScrollable = f
    }, {
        "./env.js": 5,
        "./styler.js": 10
    }],
    10: [function(a, b, c) {
        "use strict";

        function d(a) {
            return document.querySelector(a)
        }

        function e(a, b) {
            ("undefined" == typeof b || null === b || b === !1) && (b = y);
            var c = {
                "min-height": b + "px"
            };
            return a && (c.position = "relative"), c
        }

        function f(a) {
            ("undefined" == typeof a || null === a || a === !1) && (a = y);
            var b = {
                "min-height": a + "px",
                width: "100%",
                border: "none",
                display: "block",
                visibility: "inherit",
                opacity: 1
            };
            return u.isMobile.apple.device && (b.width = "1px", b["min-width"] = "100%"), b
        }

        function g() {
            var a = d('[tkf-embed="true"]');
            a && document.head.removeChild(a);
            var b = d('[tkf-defensive-style-tag="true"]');
            a && document.head.removeChild(b);
            var c = document.createElement("style");
            c.setAttribute("tkf-embed", "true"), c.setAttribute("data-noprefix", ""), c.appendChild(document.createTextNode("")), document.head.appendChild(c);
            var e = document.createElement("style");
            return e.setAttribute("tkf-defensive-style-tag", "true"), document.head.appendChild(e), c.sheet
        }

        function h(a, b) {
            var c = t.getJSON(),
                d = Object.getOwnPropertyNames(a);
            d.forEach(function(b) {
                var c = a[b];
                "string" == typeof c && (a[b] = c.replace(/,/g, "##"))
            });
            var e = c.stringify(a, null, 0).replace(/"/g, "").replace(/,/g, ";").replace(/##/g, ",");
            return b && (e = e.replace("{", "").replace("}", "")), e
        }

        function i(a, b, c) {
            return "number" != typeof c && (c = 0), r.insertRule(a + " " + h(b), c)
        }

        function j() {
            s || (r = g(), i(".tkf-overlay-ng", B), i(".tkf-overlay-ng.tkf-fade", C), i(".tkf-overlay-ng.tkf-clear", D), i(".tkf-overlay-ng .tkf-close-icon", A.normal), i(".tkf-overlay-ng .tkf-close-icon:hover, .tkf-overlay-ng .tkf-close-icon:active", A.active), i(".tkf-wrap", E, 0), r.insertRule && (r.insertRule(G + "(min-width : " + (w + 1) + "px) and (max-width: " + x + "px) { .tkf-wrap {margin:0 0px;} }", 1), r.insertRule(G + "(max-width: " + w + "px) { .tkf-wrap {margin:40px 0 0 0;} }", 2), r.insertRule(G + "(max-width: " + w + "px) { .tkf-overlay-ng.tkf-fade {background:white} }", 5), r.insertRule(G + "(max-width: " + w + "px) { .tkf-overlay-ng .tkf-close-icon {display:block} }", 5)), i("iframe.tkf-fullpage", F), i("[data-tockify-component]", z), s = !0)
        }

        function k() {
            var a = document.createElement("div");
            a.style.cssText = "width:100px;height:100px;overflow:scroll !important;position:absolute;top:-99999px", document.body.appendChild(a);
            var b = a.offsetWidth - a.clientWidth;
            return document.body.removeChild(a), b
        }

        function l() {
            if (u.isWindows || 0 !== k()) {
                var a = "WebkitAppearance" in document.documentElement.style,
                    b = window.navigator.userAgent,
                    c = b.indexOf("MSIE ") > 0 || b.indexOf("Trident/") > 0 || b.indexOf("Edge/") > 0;
                if (-1 === H)
                    if (a) try {
                        H = i("body::-webkit-scrollbar", {
                            width: 0
                        })
                    } catch (d) {} else if (c) try {
                        H = i("body", {
                            "-ms-overflow-style": "none"
                        })
                    } catch (d) {}
            }
        }

        function m() {
            !u.isWindows, -1 !== H && (r.deleteRule(H), H = -1)
        }

        function n() {
            var a = d('meta[name="viewport"]');
            a || (document.head.insertAdjacentHTML("beforeend", '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">'), I = !0)
        }

        function o() {
            if (I) {
                var a = d('meta[name="viewport"]');
                document.head.removeChild(a), I = !1
            }
        }

        function p(a, b) {
            j();
            var c = d(a),
                g = window.getComputedStyle(c),
                h = "static" === g.getPropertyValue("position"),
                k = e(h, b),
                l = f(b);
            i(a, k), i(a + " iframe", l)
        }

        function q(a) {}
        var r, s, t = a("./util.js"),
            u = a("./env.js"),
            v = a("./host.js"),
            w = 768,
            x = 800,
            y = 220,
            z = {
                width: "1px",
                height: "1px"
            },
            A = {
                normal: {
                    "font-size": "28px",
                    position: "absolute",
                    right: "10px",
                    top: "7px",
                    color: "#333",
                    cursor: "pointer",
                    display: "none"
                },
                active: {
                    color: "#999"
                }
            },
            B = {
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                "background-color": "rgba(0,0,0,0.6)",
                width: "100%",
                height: "100%",
                "max-width": "100%",
                "max-height": "100%",
                zoom: 1,
                "z-index": 2147483647,
                margin: 0,
                padding: 0,
                border: 0,
                opacity: 0
            },
            C = {
                opacity: 1,
                transition: "opacity 0.5s ease-in-out"
            },
            D = {
                opacity: 1,
                "background-color": "transparent"
            },
            E = (v.logicalWidth() > w ? 40 : 0, {
                position: "relative",
                margin: 0,
                padding: 0,
                height: "100%",
                "overflow-x": "hidden"
            }),
            F = {
                border: "none",
                width: "100%",
                "min-height": "100vh",
                position: "absolute",
                overflow: "hidden",
                left: 0,
                top: 0,
                bottom: 0,
                display: "inline",
                margin: 0,
                padding: 0
            },
            G = "@media only screen and ",
            H = -1,
            I = !1;
        c.hideScrollBar = l, c.showScrollBar = m, c.applyStyles = p, c.initStyles = j, c.addViewportIfMissing = n, c.removeViewportIfAdded = o, c.positionSideTab = q
    }, {
        "./env.js": 5,
        "./host.js": 6,
        "./util.js": 11
    }],
    11: [function(a, b, c) {
        "use strict";

        function d(a) {
            return a || (a = c.makeName()), a.replace(m, "").replace(n, "").replace(o, "").replace(p, "")
        }
        var e, f = a("./config.js").WINDOW_NAME_PREFIX,
            g = function() {
                if (window.JSON && window.JSON.stringify) return window.JSON;
                if (!e) {
                    var a = document.createElement("iframe");
                    a.style.display = "none", document.documentElement.appendChild(a), e = a.contentWindow.JSON, document.documentElement.removeChild(a)
                }
                return e
            };
        c.makeGuid = function() {
            function a() {
                return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
            }
            return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
        };
        var h = 0;
        c.makeName = function() {
            return "fullcalendar-" + ++h
        };
        var i = f + "-wrap-",
            j = f + "-embed-",
            k = f + "-fullscreen-",
            l = f + "-overlay-",
            m = new RegExp("^" + i),
            n = new RegExp("^" + j),
            o = new RegExp("^" + k),
            p = new RegExp("^" + l);
        c.toWrapName = function(a) {
            return f + "-wrap-" + d(a)
        }, c.toEmbedName = function(a) {
            return f + "-embed-" + d(a)
        }, c.toFullScreenName = function(a) {
            return f + "-fullscreen-" + d(a)
        }, c.toOverlayName = function(a) {
            return f + "-overlay-" + d(a)
        }, c.isWrapName = function(a) {
            return a && m.test(a)
        }, c.isEmbedName = function(a) {
            return a && n.test(a)
        }, c.isFullScreenName = function(a) {
            return a && o.test(a)
        }, c.isOverlayName = function(a) {
            return a && p.test(a)
        }, c.frameToName = function(a) {
            return a.getAttribute("name")
        }, c.nameToFrame = function(a) {
            return document.querySelector("iframe[name=" + a + "]")
        }, c.fixChromeRenderBug = function() {}, c.isWeeblyEditor = function() {
            var a = window._W || window.Weebly || {},
                b = !!a.EDITOR;
            return b
        }, c.getCoords = function(a) {
            var b = a.getBoundingClientRect(),
                c = document.body,
                d = document.documentElement,
                e = window.pageYOffset || d.scrollTop || c.scrollTop,
                f = window.pageXOffset || d.scrollLeft || c.scrollLeft,
                g = d.clientTop || c.clientTop || 0,
                h = d.clientLeft || c.clientLeft || 0,
                i = b.top + e - g,
                j = b.left + f - h;
            return {
                top: Math.round(i),
                left: Math.round(j)
            }
        }, c.getJSON = g
    }, {
        "./config.js": 3
    }]
}, {}, [7]);
