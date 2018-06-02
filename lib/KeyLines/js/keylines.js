//
//     KeyLines v4.3.2-6194 professional eval
//     Licensed to Interview Candidate for TBD expires on Sat Jun 30 2018
//
//     Copyright © 2011-2018 Cambridge Intelligence Limited.
//     All rights reserved.
//

! function() {
    function e(e, t) {
        return e.some(function(e) {
            return t.indexOf(e) > -1
        })
    }
    var t = {},
        n = "undefined" != typeof window,
        r = !1;
    n && (window.KeyLines = t), t.TimeBar = {}, "object" == typeof module && "object" == typeof module.exports ? (global.KeyLines = t, module.exports = t) : "function" == typeof define && define.amd && define(t), t.disableWebGL = function() {
        t.WebGL = null, r = !0
    }, t.webGLSupport = function() {
        if (!t.WebGL && n) {
            var i, a = "file:" !== document.location.protocol,
                o = ["Google SwiftShader", "Microsoft Basic Render Driver", "VirtualBox", "Parallels", "VMware"],
                l = ["VMware", "VirtualBox"],
                u = ["OES_standard_derivatives", "OES_element_index_uint"],
                c = ["webgl", "experimental-webgl"],
                s = document.createElement("canvas"),
                f = null;
            for (i = 0; i < c.length; ++i) {
                try {
                    f = s.getContext(c[i], {
                        failIfMajorPerformanceCaveat: !0
                    })
                } catch (d) {}
                if (f) break
            }
            if (a = a && f && "getSupportedExtensions" in f) {
                var g = f.getSupportedExtensions(),
                    h = {};
                for (i = 0; i < g.length; i++) h[g[i]] = !0;
                for (i = 0; a && i < u.length; i++) a = a && h[u[i]]
            }
            if (a) {
                var v = f.getExtension("WEBGL_debug_renderer_info");
                if (v) {
                    var m = f.getParameter(v.UNMASKED_VENDOR_WEBGL),
                        y = f.getParameter(v.UNMASKED_RENDERER_WEBGL);
                    a = !(e(l, m) || e(o, y))
                }
            }
            return a
        }
        return !r
    }, t.webGLSupport() && (t.WebGL = {})
}(),
function() {
    KeyLines.API = KeyLines.API || {};
    var e = KeyLines.API;
    e.createAPI = function(e) {
        function t(e, t, n, r) {
            var i = S(t, n);
            k.makeGhostCanvas(t, n);
            var a = h;
            h = w.createView(B, t, n, 1, v), k.setView(h), k.setCanvas(e), k.setShadowCanvas(i.getContext("2d"), t, n), x.clearLastFont(), a && (h.setMinZoom(a.getMinZoom()), h.setMaxItemZoom(a.getMaxItemZoom()), h.fromOldSettings(a.settings(), !1)), k.afterChange(null, r)
        }

        function n() {
            return v && v.api.isShown()
        }

        function r(e, t, n) {
            var r = {
                all: !0,
                positions: !0,
                colours: !0,
                textures: !0,
                shadow: !0
            };
            e ? k.afterChange(n) : (k.render(t || r), C.invoke(n))
        }

        function i(e) {
            var t = e === !0 ? {
                animate: !0
            } : e;
            return C.defaults(t, {
                animate: !1,
                time: 1e3
            })
        }

        function a(e, t) {
            var n = M.getByID(e);
            return !n || !t && n._parentId ? null : n
        }

        function o(e, t) {
            return M ? Array.isArray(e) ? e.map(function(e) {
                return a(e, t)
            }) : a(e, t) : null
        }

        function l(e, t, n, r, i) {
            var a = C.defaults(t, {
                time: 1e3,
                easing: "linear",
                queue: !0
            });
            (a.time < 0 || !C.isNumber(a.time)) && (a.time = 0);
            var o = C.ensureArray(e);
            k.animateProperties(o, a, n, r, i)
        }

        function u(e) {
            return isFinite(e) ? Math.min(Math.max(0, e), 1) : e ? 1 : 0
        }

        function c(e) {
            e && "boolean" == typeof e.combos && !e.items && (e.items = e.combos ? "underlying" : "toplevel")
        }

        function s(e) {
            c(e);
            var t = C.defaults(e, {
                type: "all",
                items: "underlying",
                animate: !0,
                time: 1e3,
                updateGlyph: !0
            });
            return C.defaults(t, {
                hideSingletons: "link" === t.type
            })
        }

        function f(e) {
            var t = A.viewOptions(),
                n = t.height > 0 ? t.width / t.height : 1;
            return C.defaults(e, {
                fit: !0,
                animate: !0,
                tidy: !0,
                ratio: n,
                tightness: 5,
                straighten: !0
            })
        }

        function d(e, t, r, i, a) {
            function o(e, t) {
                A.privateEach({
                    type: "link",
                    items: "toplevel"
                }, function(n) {
                    if (!e[n.id1] || !e[n.id2]) {
                        var r = e[n.id1] || e[n.id2],
                            i = e[n.id1] ? n.id2 : n.id1;
                        r && i && (t[i] || (t[i] = {
                            x: 0,
                            y: 0,
                            _counter: 0,
                            id: i
                        }), t[i].x += r.x, t[i].y += r.y, t[i]._counter++)
                    }
                });
                var n = 0;
                return C.forEach(t, function(t) {
                    e[t.id] || (t.x /= t._counter, t.y /= t._counter, e[t.id] = t, n++)
                }), n
            }

            function l(e, t, r) {
                if (n()) return void r();
                for (var i, a = {}, l = []; 0 !== i;) i = o(t, a);
                C.forEach(e, function(e) {
                    "node" === e.type && (a[e.id] || (e.x = h[e.id].x, e.y = h[e.id].y))
                }), C.forEach(a, function(e) {
                    l.push(e)
                }), A.setProperties(l, !1, r)
            }

            function u() {
                var e = [],
                    t = {};
                return M.each({
                    type: "node"
                }, function(n) {
                    e.push(n.id), t[n.id] = n
                }), {
                    list: e,
                    dict: t
                }
            }

            function c() {
                var e = {};
                return M.each({
                    type: "all"
                }, function(t) {
                    e[t.id] = !0
                }), e
            }

            function s(e) {
                var t = {},
                    n = {};
                return C.forEach(g, function(r) {
                    t[r.id] = r, "adjacent" !== a && "nonadjacent" !== a || "link" !== r.type || e[r.id] || (e[r.id1] && (n[r.id1] = !0), e[r.id2] && (n[r.id2] = !0))
                }), {
                    dict: t,
                    touched: n
                }
            }

            function f(e, t) {
                switch (a) {
                    case "all":
                        return e;
                    case "adjacent":
                        return Object.keys(t);
                    case "nonadjacent":
                        return e.filter(function(e) {
                            return !t[e]
                        });
                    case "none":
                    default:
                        return []
                }
            }

            function d(e) {
                for (var t = [], n = {}, r = 0; r < e.length; r++) {
                    var i = e[r];
                    C.isNullOrUndefined(i) || n[i.id] || (n[i.id] = 1, h[i.id] = {
                        x: i.x,
                        y: i.y
                    }, delete i.x, delete i.y, t.push(i))
                }
                return t
            }
            var g = e,
                h = {};
            g = d(g);
            var v = u(),
                m = v.dict,
                y = c(),
                b = s(y),
                p = b.dict,
                I = f(v.list, b.touched);
            A.merge(g, function() {
                t(p, function() {
                    l(g, m, function() {
                        r(y, function() {
                            i(I)
                        })
                    })
                })
            })
        }

        function g(e, t) {
            k.draw(e, t), k.drawoffscreen(), k.afterDraw()
        }
        var h, v, m = KeyLines.Controller,
            y = KeyLines.Draggers,
            b = KeyLines.Events,
            p = KeyLines.Model,
            I = KeyLines.Overlays,
            x = KeyLines.Rendering,
            C = KeyLines.Util,
            w = KeyLines.View,
            G = KeyLines.Iterators,
            A = {},
            B = b.createEventBus(),
            Z = y.createDraggers(B),
            R = KeyLines.Generator.create(B, A),
            M = p.createModel(A, B, Z, R);
        v = KeyLines.Map.create(A, B, e);
        var E = I.createOverlays(B, w, v),
            k = m.createController(A, B, E, R, v),
            L = G.create(k, B, A);
        k.setModel(M);
        var S;
        A.privateInit = function(e, n, r, i, a, o, l, u) {
            S = i, k.assetPath(l), k.setCursorFn(a), k.setCreateCanvasFn(i), k.imageGenFn(o), t(e, n, r), k.imageBasePath(u)
        }, A.privateSetSize = t, A.privateMapSetSize = function(e, t) {
            v.internalUse.setSize(e, t)
        }, A.graph = function() {
            return M.graph()
        }, A.map = function() {
            return v.api
        }, A.ggwp = function() {
            return k.getWebGLPixels()
        }, A.combo = function() {
            return k.combo.api
        }, A.toDataURL = function(e, t, r, i) {
            function a(e) {
                u = Math.floor(u / e), c = Math.floor(c / e)
            }

            function o(e) {
                H.imageList(C.merge(k.imageList(), e));
                var t = k.options();
                t.overview = {
                    shown: !1
                }, s.watermark || (t.watermark = !1), s.gradient || (t.gradient = !1), s.logo || (t.logo = !1), H.options(t, null, !0), H.backgroundOpacity(k.backgroundOpacity());
                var r = H.makeGhostCanvas(T.width(), T.height()),
                    a = [];
                switch (s.selection || (a = M.doSelection(), M.doSelection([])), s.fit) {
                    case "chart":
                        H.fitToModel(!1);
                        break;
                    case "view":
                        T.fromOldSettings(h.settings(), !0);
                        break;
                    case "exact":
                        T.fromOldSettings(h.settings(), !1);
                        break;
                    case "oneToOne":
                        T.fitWorldExtents(l, !1, !1, !1, 0, 0)
                }
                T.scaleFactor(X), H.draw(!0, {
                    all: !0
                });
                var o;
                try {
                    o = W.toDataURL()
                } catch (f) {
                    throw Error("[toDataURL] There is a problem to export the chart with tainted canvas.")
                } finally {
                    if ("rtl" === W.dir) {
                        var d = document.getElementsByTagName("body")[0];
                        d.removeChild(W), d.removeChild(r)
                    }
                }
                return s.selection || M.doSelection(a), M.setAllDirty(), i ? n() ? v.internalUse.toDataURL(u, c, s, S, W, i) : C.invoke(i, o) : o
            }
            var l, u = Math.floor(e),
                c = Math.floor(t);
            u = u > 0 ? u : 100, c = c > 0 ? c : 100;
            var s = C.defaults(r, {
                fit: "view",
                watermark: !0,
                gradient: !0,
                logo: !0
            });
            if (n() && (s.fit = "exact"), "oneToOne" === s.fit) {
                l = k.modelExtents(), l || (l = {
                    x1: 0,
                    y1: 0,
                    x2: 100,
                    y2: 100
                });
                var f = 10;
                l.x1 -= f, l.y1 -= f, l.x2 += f, l.y2 += f;
                var d = k.watermarkSize();
                if (d && s.watermark) {
                    var g = (d.width - (l.x2 - l.x1)) / 2;
                    g > 0 && (l.x1 -= g, l.x2 += g);
                    var y = (d.height - (l.y2 - l.y1)) / 2;
                    y > 0 && (l.y1 -= y, l.y2 += y)
                }
                u = l.x2 - l.x1, c = l.y2 - l.y1, s.noScale = !0
            }
            var p = 16e6,
                x = u * c,
                G = x / p;
            if (G > 1) {
                var B = Math.sqrt(G);
                a(B)
            }
            var Z = 8e3,
                E = u / Z;
            E > 1 && a(E);
            var L = c / Z;
            L > 1 && a(L);
            var W = S(u, c, !0),
                V = W.getContext("2d"),
                X = s.noScale ? 1 : u / h.width(),
                F = b.createEventBus(),
                T = w.createView(F, Math.floor(u / X), Math.floor(c / X), X, v),
                N = I.createOverlays(F, w),
                H = m.createController(A, F, N, R);
            H.setCreateCanvasFn(S), H.setModel(M), H.setView(T), H.setCanvas(V), H.setShadowCanvas(null, u, c), H.assetPath(k.assetPath()), H.imageBasePath(k.imageBasePath()), H.imageGenFn(k.imageGenFn());
            var Y = k.imageList(),
                U = H.testImagesForCORS(Y);
            return i && U.length ? k.reloadCorsImages(Y, U, !0, o) : o(k.imageList())
        }, A.load = function(e, t) {
            switch (e && e.type) {
                case "LinkChart":
                    if (v && v.internalUse.isTransitioning()) throw new Error("Cannot load chart during map show or hide operation");
                    M = p.createModel(A, B, Z, R), k.setModel(M), k.load(e, function() {
                        k.afterChange(t, null, !0)
                    });
                    break;
                default:
                    throw new Error("Unknown chart type passed to load")
            }
        }, A.chartType = function() {
            return M.type()
        }, A.clear = function() {
            B.trigger("prechange", "delete"), k.load({
                type: "LinkChart",
                items: [],
                map: {
                    keepSameMode: !0
                }
            }, function() {
                k.afterChange(null, null, !0)
            })
        }, A.merge = function(e, t) {
            if (C.isNullOrUndefined(e)) throw new Error("Null or undefined object passed to merge");
            var n = C.getItemsArray(e),
                i = k.merge(n);
            r(i, null, t)
        }, A.privateReveal = function(e) {
            var t = e;
            if (t) {
                t = C.ensureArray(t);
                var n = A.privateGetItem(t).filter(function(e) {
                    return e && "link" === e.type && !e._combo
                });
                M.reveal(C.idsOf(n)), A.trigger("redraw", {
                    all: !0
                })
            }
            return M.getRevealedLinks()
        }, A.privateGetItem = function(e) {
            return o(e, !0)
        }, A.privateItemIsShown = function(e) {
            return M ? M.isItemShown(e) : !1
        }, A.privateGetTopItemId = function(e) {
            return M.topParentId(e)
        }, A.privateGetRawItems = function() {
            return M ? M.getRawItems() : []
        }, A.privateGetCanvas = function() {
            return k.getCanvas()
        }, A.privateGetGenerator = function() {
            return R
        }, A.privateRedrawItem = function(e) {
            M && M.setDirty(e)
        }, A.privateSetAllItemsInComboDirty = function(e) {
            A.privateGetItem(e).forEach(function(e) {
                e && (A.privateRedrawItem(e.id), e._combo && (A.privateSetAllItemsInComboDirty(e._combo.linkIds), e._combo.nodeIds && A.privateSetAllItemsInComboDirty(e._combo.nodeIds)))
            })
        }, A.applyRevealedLinkOffsets = function(e) {
            M && M.applyRevealedLinkOffsets(e)
        }, A.privateTopParentId = function(e) {
            return M ? M.topParentId(e) : null
        }, A.privateMerge = function(e, t) {
            var n = e;
            v && v.api.isShown() && (n = v.internalUse.preMerge(n));
            var i = M.merge(n);
            r(i, null, t)
        }, A.privateEach = function(e, t) {
            var n = KeyLines.Util.defaults(e, {
                type: "all",
                items: "underlying"
            });
            return L.each(n, !0, t)
        }, A.privateBothEndsShown = function(e) {
            return M.bothEndsShown(e)
        }, A.privateBothEndsForeground = function(e) {
            return M.bothEndsForeground(e)
        }, A.privateGetParentItems = function(e) {
            return M.getParentItems(e)
        }, A.privateFirstVisibleItemInAncestry = function(e) {
            return M ? M.firstVisibleItemInAncestry(e) : void 0
        }, A.privateAllParentsOpen = function(e, t) {
            return M && M.allParentsOpen(e, t)
        }, A.privateGetAncestryIds = function(e) {
            return M.getAncestryIds(e)
        }, A.privateSetAllDirty = function() {
            k.render(), M.setAllDirty()
        }, A.privateSetNonImageProperties = function(e, t) {
            var n = {};
            M.setProperties(e, !1, n, t), k.render(n)
        }, A.privateNeighbourLinkIds = function(e) {
            return M.neighbourLinkIds(e)
        }, A.privateRemoveItem = function(e) {
            M.removeItem(e), k.render()
        }, A.privateGraph = function() {
            return M.graph()
        }, A.privateGetLinksBetween = function(e, t) {
            return M.privateGetLinksBetween(e, t)
        }, A.validateCombos = function() {
            M.validateCombos()
        }, A.setProperties = function(e, t, n) {
            if (e) {
                var i = {},
                    a = k.setProperties(e, t, !1, i);
                r(a, i, n)
            } else C.invoke(n)
        }, A.animateProperties = function(e, t, n) {
            l(e, t, n)
        }, A.privateAnimateProperties = function(e, t, n, r) {
            l(e, t, n, !0, r)
        }, A.privateAnimateBackgroundOpacity = function(e, t, n) {
            var r = C.defaults(t, {
                time: 500
            });
            k.animateBackgroundOpacity(u(e), r.time, n)
        }, A.privateSetBackgroundOpacity = function(e) {
            k.backgroundOpacity(u(e))
        }, A.ping = function(e, t, n) {
            var r = C.defaults(t, {
                c: "#909090",
                w: 20,
                r: 80,
                time: 800,
                repeat: 1,
                lw: 40
            });
            k.ping(e, r, n)
        }, A.getItem = function(e) {
            return Array.isArray(e) ? e.map(M.getItem) : M ? M.getItem(e) : null
        }, A.setItem = function(e, t) {
            if (e) {
                B.trigger("prechange", "properties");
                var n = k.setItem(e);
                r(n, {
                    all: !0
                }, t)
            }
        }, A.removeItem = function(e) {
            B.trigger("prechange", "delete"), k.removeItem(e), k.render()
        }, A.each = function(e, t) {
            var n = KeyLines.Util.defaults(e, {
                type: "all",
                items: "underlying"
            });
            return L.each(n, !1, t)
        }, A.filter = function(e, t, n) {
            var r = s(t);
            return L.filter(e, r, n)
        }, A.foreground = function(e, t, n) {
            c(t);
            var r = KeyLines.Util.defaults(t, {
                type: "node",
                items: "underlying",
                foregroundOpenCombos: !0
            });
            return L.foreground(e, r, n)
        }, A.hide = function(e, t, n) {
            if (C.isNullOrUndefined(e) || "" === e) return void C.invoke(n);
            B.trigger("prechange", "hide");
            var r = C.ensureArray(e),
                a = i(t);
            a = C.defaults(a, {
                updateGlyph: !0
            });
            var o = k.combo.internalUse.hide(r, a);
            k.hide(o, a, n)
        }, A.privateHideWithoutCombos = function(e, t, n) {
            B.trigger("prechange", "hide");
            var r = C.ensureArray(e),
                a = i(t);
            k.hide(r, a, n)
        }, A.hidden = function() {
            return M.hidden()
        }, A.show = function(e, t, n, r) {
            if (C.isNullOrUndefined(e) || "" === e) return void C.invoke(r);
            B.trigger("prechange", "show");
            var a = C.ensureArray(e),
                o = i(n);
            o = C.defaults(o, {
                updateGlyph: !0
            });
            var l = k.combo.internalUse.show(a, t);
            k.show(l, t, o, r);
            var u = [];
            l.forEach(function(e) {
                var t = A.privateGetItem(e);
                return "node" === t.type && (t._combo && u.push(t.id), t._parentId && u.push(t._parentId)), !1
            }), k.combo.internalUse.ensureMinimumOpenComboSize(u)
        }, A.privateShowWithoutCombos = function(e, t, n, r) {
            B.trigger("prechange", "show");
            var a = C.ensureArray(e),
                o = i(n);
            k.show(a, t, o, r)
        }, A.labelPosition = function(e) {
            return M ? k.labelPosition(e, h) : null
        }, A.contains = function(e) {
            return M ? M.contains(e) : []
        }, A.serialize = function() {
            var e = M.serialize();
            return k.appendCombos(e), v.internalUse.appendMap(e), e.viewSettings = h.settings(), e
        }, A.worldCoordinates = function(e, t) {
            var n = h.scale(e),
                r = h.scale(t);
            return {
                x: h.viewToWorldX(n),
                y: h.viewToWorldY(r)
            }
        }, A.viewCoordinates = function(e, t) {
            var n = h.worldToViewX(e),
                r = h.worldToViewY(t);
            return {
                x: h.unscale(n),
                y: h.unscale(r)
            }
        }, A.viewOptions = function(e, t, n) {
            if (!e) return h.settings();
            var r = i(t),
                a = C.defaults(e, {
                    offsetX: 0,
                    offsetY: 0,
                    zoom: 1
                });
            k.setViewSettings(a, r.animate, r.time, function() {
                k.render({
                    drawOnly: !0
                }), C.invoke(n)
            })
        }, A.options = function(e, t) {
            return k.options(e, t)
        }, A.displayOptions = function(e, t) {
            return A.options(e, t)
        }, A.interactionOptions = function(e) {
            return A.options(e)
        }, A.lock = function(e, t) {
            if ("undefined" != typeof e) {
                if (W = e, v && v.internalUse.lock(W), e) {
                    var n = t || {};
                    k.wait(n.wait), k.removeDragger()
                } else k.wait(!1);
                k.render()
            }
            return W
        };
        var W = !1;
        A.zoom = function(e, t, n) {
            var r = i(t);
            switch (e) {
                case "in":
                    k.zoomIn(r.animate, r.time, n);
                    break;
                case "out":
                    k.zoomOut(r.animate, r.time, n);
                    break;
                case "one":
                    k.setZoom(1, r.animate, r.time, n);
                    break;
                case "fit":
                    k.fitToModel(r.animate, r.time, r.ids, n);
                    break;
                case "selection":
                    k.fitToSelection(r.animate, r.time, null, n);
                    break;
                case "height":
                    k.fitModelHeight(r.animate, r.time, r.ids, n)
            }
        }, A.pan = function(e, t, r) {
            var a = i(t);
            "selection" !== e || n() ? k.pan(e, a.animate, a.time, r) : k.fitToSelection(a.animate, a.time, null, r, !0)
        }, A.getLastError = function() {
            return B.getErrors()
        }, A.imagePrefix = function(e) {
            return k.imagePrefix(e)
        }, A.cancelAnimation = function() {
            k.cancelAnimation()
        }, A.layout = function(e, t, r) {
            if (n()) return void C.invoke(r);
            var i = f(t);
            k.layout(e || "standard", i, r)
        }, A.arrange = function(e, t, n, r) {
            var i = C.defaults(n, {
                fit: !1,
                animate: !0,
                tidy: !1,
                ratio: 1
            });
            k.arrange(e || "grid", t, i, r)
        }, A.selection = function(e) {
            var t = C.isNullOrUndefined(e) ? e : C.ensureArray(e),
                n = M ? M.doSelection(t) : [];
            return t && k.render(), n
        }, A.expand = function(e, t, n) {
            function r(e) {
                function t(t, n) {
                    function r(e) {
                        return t[e.id] ? u.filter.filterFn(e) : !e.hi
                    }
                    if (u.filter && C.hasAnyKeys(t)) {
                        var i = C.clone(u.filter);
                        return i.animate = e, A.filter(r, i, n)
                    }
                    return n()
                }
                return t
            }

            function i(e) {
                u.layout.fixed = e, A.layout(u.layout.name, u.layout, n)
            }

            function a(e, t) {
                var n = null;
                if (e.filter && C.isFunction(e.filter.filterFn)) {
                    var r = e.filter.filterFn;
                    n = s(e.filter), n.time = Math.floor(t.time / 5), n.filterFn = r
                }
                return n
            }

            function o(e, t) {
                t.layout.animate = t.animate, t.layout = C.defaults(t.layout, {
                    fit: t.fit,
                    straighten: t.straighten,
                    tidy: t.tidy,
                    tightness: t.tightness
                });
                var n = e.layout ? "nonadjacent" : "all",
                    r = {
                        name: "standard",
                        strategy: "spiral",
                        tidy: !1,
                        fit: !1,
                        fix: n
                    },
                    i = C.defaults(t.layout, r);
                return f(i)
            }
            var l = t;
            l = l || {};
            var u = C.defaults(l, {
                animate: !0,
                time: 1e3,
                layout: {},
                filter: {}
            });
            u.filter = a(l, u), u.layout = o(l, u), u.filter ? u.layout.time = u.time - u.filter.time : u.layout.time = u.time, B.trigger("prechange", "expand");
            var c = C.ensureArray(C.getItemsArray(e));
            d(c, r(!1), r(u.animate), i, u.layout.fix)
        }, A.createLink = function(e, t, n, r) {
            function i(e, t) {
                if ("dummy" === e) {
                    A.removeItem(u), A.privateUnbind("dragcomplete", i);
                    var n = C.rawId(t) === o ? null : t;
                    C.invoke(r, n)
                }
            }
            var a = A.getItem(e);
            if (A.getItem(t)) throw new Error("LinkId (" + t + ") already exists and must be unique");
            if (e && a && "node" === a.type && t) {
                var o = C.rawId(t),
                    l = C.defaults(n, {
                        style: {}
                    });
                A.privateBind("dragcomplete", i);
                var u = "dummyEnd" + Math.floor(1e7 * Math.random()),
                    c = {
                        type: "node",
                        du: !0,
                        id: u,
                        x: a.x,
                        y: a.y
                    },
                    s = C.merge(l.style, {
                        id: o,
                        id1: e,
                        id2: u,
                        type: "link"
                    });
                A.merge([c, s], function() {
                    C.nextTick(function() {
                        k.startDragger(o, u + C.idSep() + "id2", a.x, a.y)
                    }, 50)
                })
            }
        }, KeyLines.Common.appendActions(A, k, A.lock), A.mousemove = function(e, t, n, r) {
            k.mousemove(e, t, n, r, W)
        }, A.dragover = function(e, t) {
            k.dragover(e, t)
        }, C.merge(A, B);
        var V = KeyLines.Common.frameManager(g, k.animate, k.getCanvas);
        return C.merge(A, V), A.privateBind("redraw", V.redraw), A
    }
}(),
function() {
    KeyLines.DateTime = {};
    var e = KeyLines.DateTime;
    e.defaultLocale = {
        longMonths: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        longDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ampm: ["AM", "PM"],
        quarter: "Q",
        half: "H"
    };
    var t = e.defaultLocale,
        n = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    e.units = {
        milli: 0,
        sec: 1,
        min: 2,
        hour: 3,
        day: 4,
        week: 5,
        month: 6,
        year: 7
    };
    var r = e.units,
        i = function(e, t) {
            return t ? e - e % t : 0
        },
        a = function(e) {
            if (e < r.milli || r.year < e) throw new Error("bad unit range")
        },
        o = function(e, t) {
            return 1 === e && l(t) ? 29 : n[e]
        },
        l = function(e) {
            return 1 === new Date(e, 1, 29).getMonth()
        };
    e.UTCify = function(e) {
        return Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds())
    }, e.unUTCify = function(e) {
        var t = new Date(e);
        return new Date(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.getUTCMilliseconds())
    }, e.clear = function(e, t, n) {
        a(t);
        var o = new Date(e);
        switch (t > r.milli && o.setUTCMilliseconds(0), t > r.sec && o.setUTCSeconds(0), t > r.min && o.setUTCMinutes(0), t > r.hour && o.setUTCHours(0), t >= r.month && o.setUTCDate(1), t >= r.year && o.setUTCMonth(0), t) {
            case r.milli:
                o.setUTCMilliseconds(i(o.getUTCMilliseconds(), n));
                break;
            case r.sec:
                o.setUTCSeconds(i(o.getUTCSeconds(), n));
                break;
            case r.min:
                o.setUTCMinutes(i(o.getUTCMinutes(), n));
                break;
            case r.hour:
                o.setUTCHours(i(o.getUTCHours(), n));
                break;
            case r.day:
                break;
            case r.week:
                var l = o.getUTCDay(),
                    u = l >= 1 ? l - 1 : 6;
                o.setTime(o.getTime() - 24 * u * 60 * 60 * 1e3);
                break;
            case r.month:
                o.setUTCMonth(i(o.getUTCMonth(), n));
                break;
            case r.year:
                o.setUTCFullYear(i(o.getUTCFullYear(), n))
        }
        return o.getTime()
    }, e.add = function(e, t, n) {
        if (a(t), t <= r.week) {
            var i = n;
            return t > r.milli && (i *= 1e3), t > r.sec && (i *= 60), t > r.min && (i *= 60), t > r.hour && (i *= 24), t > r.day && (i *= 7), e + i
        }
        var c = new Date(e);
        switch (t) {
            case r.month:
                var s = c.getUTCMonth() + n,
                    f = s % 12,
                    d = Math.floor(s / 12);
                0 > f && (f += 12);
                var g = c.getUTCDate();
                g = Math.min(g, o(f, c.getUTCFullYear() + d)), c.setUTCDate(g), c.setUTCMonth(f), 0 !== d && c.setTime(u(c.getTime(), r.year, d));
                break;
            case r.year:
                if (1 === c.getUTCMonth() && 29 === c.getUTCDate()) {
                    var h = c.getUTCFullYear() + n;
                    l(h) || c.setTime(u(c.getTime(), r.day, -1))
                }
                c.setUTCFullYear(c.getUTCFullYear() + n)
        }
        return c.getTime()
    };
    var u = e.add,
        c = function(e) {
            for (var t = e + ""; t.length < 2;) t = "0" + t;
            return t
        },
        s = new RegExp("(f?f?f)|(s?s)|(m?m)|(h?h)|(H?H)|(t?t?t)|(d?d?d?d)|(M?M?M?M?M)|(Q?Q)|yyyy|yy", "gm"),
        f = {
            f: function(e) {
                return Math.floor(e.getUTCMilliseconds() / 100)
            },
            ff: function(e) {
                return c(Math.floor(e.getUTCMilliseconds() / 10))
            },
            fff: function(e) {
                return c(Math.floor(e.getUTCMilliseconds()))
            },
            s: function(e) {
                return e.getUTCSeconds()
            },
            ss: function(e) {
                return c(e.getUTCSeconds())
            },
            m: function(e) {
                return e.getUTCMinutes()
            },
            mm: function(e) {
                return c(e.getUTCMinutes())
            },
            h: function(e) {
                return e.getUTCHours() % 12 || 12
            },
            hh: function(e) {
                return c(e.getUTCHours() % 12 || 12)
            },
            H: function(e) {
                return e.getUTCHours()
            },
            HH: function(e) {
                return c(e.getUTCHours())
            },
            t: function(e, t) {
                return t.ampm[Math.floor(e.getUTCHours() / 12)].charAt(0)
            },
            tt: function(e, t) {
                return t.ampm[Math.floor(e.getUTCHours() / 12)]
            },
            ttt: function(e, t) {
                var n = Math.floor(e.getUTCHours() / 12);
                return t.ampm[n + 2] || t.ampm[n]
            },
            d: function(e) {
                return e.getUTCDate()
            },
            dd: function(e) {
                return c(e.getUTCDate())
            },
            ddd: function(e, t) {
                return t.shortDays[e.getUTCDay()]
            },
            dddd: function(e, t) {
                return t.longDays[e.getUTCDay()]
            },
            M: function(e) {
                return e.getUTCMonth() + 1
            },
            MM: function(e) {
                return c(e.getUTCMonth() + 1)
            },
            MMM: function(e, t) {
                return t.shortMonths[e.getUTCMonth()]
            },
            MMMM: function(e, t) {
                return t.longMonths[e.getUTCMonth()]
            },
            MMMMM: function(e, t) {
                return t.shortMonths[e.getUTCMonth()].substr(0, 1)
            },
            Q: function(e, t) {
                var n = e.getUTCMonth(),
                    r = Math.floor(n / 3) + 1;
                return t.quarter + r
            },
            QQ: function(e, t) {
                var n = e.getUTCMonth(),
                    r = Math.floor(n / 6) + 1;
                return t.half + r
            },
            yyyy: function(e) {
                return e.getUTCFullYear()
            },
            yy: function(e) {
                return c(e.getUTCFullYear() % 100)
            }
        };
    e.format = function(e, n, r) {
        var i = "number" == typeof e ? new Date(e) : e;
        return n.replace(s, function(e) {
            return f[e](i, r || t)
        })
    };
    var d = "(?::)?",
        g = "(?:-|$)",
        h = "(?:T|$)",
        v = function(e, t) {
            return e[t] ? parseInt(e[t], 10) : void 0
        },
        m = function(e, t, n, r) {
            var i = v(e, t); {
                if (!y(i)) return n;
                if (i >= n && r >= i) return i
            }
        },
        y = function(e) {
            return "undefined" != typeof e
        },
        b = new RegExp("^(\\d{4})" + g + "(\\d{2})?" + g + "(\\d{2})?" + h + "(\\d{2})?" + d + "(\\d{2})?" + d + "(\\d{2})?(?:Z)?(\\+|-)?(\\d{2})?" + d + "(\\d{2})?");
    e.parseISO8601 = function(e) {
        var t = b.exec(e);
        if (t) {
            var n = v(t, 1),
                r = m(t, 2, 1, 12),
                i = m(t, 3, 1, 31),
                a = m(t, 4, 0, 23),
                l = m(t, 5, 0, 59),
                u = m(t, 6, 0, 59),
                c = "-" === t[7] ? -1 : 1,
                s = m(t, 8, 0, 12),
                f = m(t, 9, 0, 59);
            if (!(y(n) && y(r) && y(i) && y(a) && y(l) && y(u) && y(s) && y(f))) return;
            if (i > o(r - 1, n)) return;
            var d = c * (60 * s + f) * 60 * 1e3;
            return new Date(Date.UTC(n, r - 1, i, a, l, u) - d)
        }
    }
}(),
function() {
    "use strict";
    if (KeyLines.WebGL) {
        var e = 6;
        KeyLines.WebGL.fontIconFactory = function(t) {
            return function(n, r, i, a, o, l, u) {
                var c = 0,
                    s = n.wsc || [0, 0, 0, 0];
                if (i.alwaysUpdate || i.rebuildOptions.all)
                    for (c = 0; e > c; c++) {
                        var f = i.triangleBuffers.shadowData,
                            d = i.triangleBuffers.shadowIndex;
                        f[d++] = s[0], f[d++] = s[1], f[d++] = s[2], f[d++] = s[3], i.triangleBuffers.shadowIndex = d
                    }
                if (i.rebuildOptions.colours || i.alwaysUpdate || i.rebuildOptions.all) {
                    var g = (o ? t.background : 1) * (l ? t.ghost : 1);
                    for (c = 0; e > c; c++) {
                        var h = i.triangleBuffers.colourData,
                            v = i.triangleBuffers.colourIndex;
                        h[v++] = n.wc[0], h[v++] = n.wc[1], h[v++] = n.wc[2], h[v++] = n.wc[3] * g, i.triangleBuffers.colourIndex = v
                    }
                }
                if (i.rebuildOptions.positions || i.alwaysUpdate || i.rebuildOptions.all) {
                    var m = i.triangleBuffers.positionIndex,
                        y = i.triangleBuffers.positionData;
                    if (u)
                        for (c = 0; 18 > c; c++) y[m++] = 0;
                    else {
                        var b = n.x1,
                            p = n.y1,
                            I = n.x2,
                            x = n.y2;
                        a && (b = n.x1 + a.x, p = n.y1 + a.y, I = n.x2 + a.x, x = n.y2 + a.y), y[m++] = b, y[m++] = p, y[m++] = 0, y[m++] = I, y[m++] = p, y[m++] = 0, y[m++] = b, y[m++] = x, y[m++] = 0, y[m++] = b, y[m++] = x, y[m++] = 0, y[m++] = I, y[m++] = p, y[m++] = 0, y[m++] = I, y[m++] = x, y[m++] = 0
                    }
                    i.triangleBuffers.positionIndex = m
                }
                if (i.rebuildOptions.textures || i.alwaysUpdate || i.rebuildOptions.all) {
                    var C = i.triangleBuffers.textureData,
                        w = i.triangleBuffers.textureIndex;
                    C[w++] = r.u1, C[w++] = r.v1, C[w++] = 0, C[w++] = 0, C[w++] = 3, C[w++] = r.colourComponentTexture, C[w++] = 0, C[w++] = 0, C[w++] = 0, C[w++] = r.u2, C[w++] = r.v1, C[w++] = 1, C[w++] = 0, C[w++] = 3, C[w++] = r.colourComponentTexture, C[w++] = 0, C[w++] = 0, C[w++] = 0, C[w++] = r.u1, C[w++] = r.v2, C[w++] = 0, C[w++] = 1, C[w++] = 3, C[w++] = r.colourComponentTexture, C[w++] = 0, C[w++] = 0, C[w++] = 0, C[w++] = r.u1, C[w++] = r.v2, C[w++] = 0, C[w++] = 1, C[w++] = 3, C[w++] = r.colourComponentTexture, C[w++] = 0, C[w++] = 0, C[w++] = 0, C[w++] = r.u2, C[w++] = r.v1, C[w++] = 1, C[w++] = 0, C[w++] = 3, C[w++] = r.colourComponentTexture, C[w++] = 0, C[w++] = 0, C[w++] = 0, C[w++] = r.u2, C[w++] = r.v2, C[w++] = 1, C[w++] = 1, C[w++] = 3, C[w++] = r.colourComponentTexture, C[w++] = 0, C[w++] = 0, C[w++] = 0, i.triangleBuffers.textureIndex = w
                }
            }
        }
    }
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    e && (e.arrowheadLineFactory = function(e) {
        var t = 4;
        return function(n, r, i, a, o, l, u, c, s, f, d, g, h) {
            var v, m, y = n.elementData,
                b = n.elementIntegerData,
                p = n.elementDataIndex;
            if (f || d.all) {
                var I = n.elementIndex,
                    x = n.elementIndexIndex,
                    C = n.elementMappingIndex;
                I[x] = C, I[x + 1] = C + 1, I[x + 2] = C + 2, v = (g ? e.background : 1) * (h ? e.ghost : 1), m = s || [0, 0, 0, 0]
            }
            n.elementIndexIndex += 3, n.elementMappingIndex += 3;
            var w = 0;
            y[p] = r, y[p + 1] = i, y[p + 2] = a, y[p + 3] = o, y[p + 4] = l, y[p + 5] = u, (f || d.all) && (w = (p + 6) * Float32Array.BYTES_PER_ELEMENT, b[w] = 0, b[w + 1] = 1, b[w + 2] = 0, b[w + 3] = t, b[w + 4] = c[0], b[w + 5] = c[1], b[w + 6] = c[2], b[w + 7] = c[3] * v, b[w + 8] = m[0], b[w + 9] = m[1], b[w + 10] = m[2], b[w + 11] = 0), n.elementDataIndex += 9, p = n.elementDataIndex, y[p] = r, y[p + 1] = i, y[p + 2] = a, y[p + 3] = o, y[p + 4] = l, y[p + 5] = u, (f || d.all) && (w = (p + 6) * Float32Array.BYTES_PER_ELEMENT, b[w] = 1, b[w + 1] = 0, b[w + 2] = 0, b[w + 3] = t, b[w + 4] = c[0], b[w + 5] = c[1], b[w + 6] = c[2], b[w + 7] = c[3] * v, b[w + 8] = m[0], b[w + 9] = m[1], b[w + 10] = m[2], b[w + 11] = 1), n.elementDataIndex += 9, p = n.elementDataIndex, y[p] = r, y[p + 1] = i, y[p + 2] = a, y[p + 3] = o, y[p + 4] = l, y[p + 5] = u, (f || d.all) && (w = (p + 6) * Float32Array.BYTES_PER_ELEMENT, b[w] = 0, b[w + 1] = 0, b[w + 2] = 1, b[w + 3] = t, b[w + 4] = c[0], b[w + 5] = c[1], b[w + 6] = c[2], b[w + 7] = c[3] * v, b[w + 8] = m[0], b[w + 9] = m[1], b[w + 10] = m[2], b[w + 11] = 2), n.elementDataIndex += 9
        }
    })
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    e && (e.TriangleShader = function(t) {
        function n(e, t, n) {
            var r, i;
            for (r = 0, i = e.atlases.length; i > r; r++) l(e.atlases[r], r);
            for (t && l(t, 3), r = 0, i = n.length; i > r; r++) l(n[r], r + 4)
        }

        function r(e) {
            d.bindBuffer(d.ARRAY_BUFFER, e.triangleBuffers.shadowBuffer), (e.alwaysUpdate || e.rebuildOptions.all || e.rebuildOptions.shadow) && d.bufferData(d.ARRAY_BUFFER, e.triangleBuffers.shadowData, d.STATIC_DRAW), d.enableVertexAttribArray(I.shadowColour), d.vertexAttribPointer(I.shadowColour, 4, d.UNSIGNED_BYTE, !1, y, 0)
        }

        function i(e) {
            d.bindBuffer(d.ARRAY_BUFFER, e.triangleBuffers.textureBuffer), (e.rebuildOptions.textures || e.alwaysUpdate || e.rebuildOptions.all) && d.bufferData(d.ARRAY_BUFFER, e.triangleBuffers.textureData, d.STATIC_DRAW), d.enableVertexAttribArray(I.textCoord), d.enableVertexAttribArray(I.textureBank), d.enableVertexAttribArray(I.circleRadius), d.enableVertexAttribArray(I.startAngle), d.enableVertexAttribArray(I.endAngle), d.vertexAttribPointer(I.textCoord, 4, d.FLOAT, !1, v, 0), d.vertexAttribPointer(I.textureBank, 2, d.FLOAT, !1, v, 16), d.vertexAttribPointer(I.circleRadius, 1, d.FLOAT, !1, v, 24), d.vertexAttribPointer(I.startAngle, 1, d.FLOAT, !1, v, 28), d.vertexAttribPointer(I.endAngle, 1, d.FLOAT, !1, v, 32)
        }

        function a(e) {
            d.bindBuffer(d.ARRAY_BUFFER, e.triangleBuffers.colourBuffer), (e.rebuildOptions.colours || e.alwaysUpdate || e.rebuildOptions.all) && d.bufferData(d.ARRAY_BUFFER, e.triangleBuffers.colourData, d.STATIC_DRAW), d.enableVertexAttribArray(I.colour), d.vertexAttribPointer(I.colour, 4, d.UNSIGNED_BYTE, !1, m, 0)
        }

        function o(e) {
            d.bindBuffer(d.ARRAY_BUFFER, e.triangleBuffers.positionBuffer), (e.rebuildOptions.positions || e.rebuildOptions.all || e.alwaysUpdate) && d.bufferData(d.ARRAY_BUFFER, e.triangleBuffers.positionData, d.STATIC_DRAW), d.enableVertexAttribArray(I.position), d.enableVertexAttribArray(I.width), d.vertexAttribPointer(I.position, 2, d.FLOAT, !1, h, 0), d.vertexAttribPointer(I.width, 1, d.FLOAT, !1, h, 8)
        }

        function l(e, t) {
            if (d.activeTexture(d["TEXTURE" + t]), e.texture) d.bindTexture(d.TEXTURE_2D, e.texture);
            else {
                e.texture = d.createTexture();
                var n = e.alphaChannel ? d.RGBA : d.RGB;
                d.bindTexture(d.TEXTURE_2D, e.texture), d.pixelStorei(d.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), d.texImage2D(d.TEXTURE_2D, 0, n, n, d.UNSIGNED_BYTE, e.img), d.generateMipmap(d.TEXTURE_2D), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, d.LINEAR_MIPMAP_LINEAR), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, d.LINEAR), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE), d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE), e.img = null
            }
        }

        function u(e) {
            e.triangleBuffers.positionBuffer || (e.triangleBuffers.positionBuffer = d.createBuffer()), e.triangleBuffers.textureBuffer || (e.triangleBuffers.textureBuffer = d.createBuffer()), e.triangleBuffers.colourBuffer || (e.triangleBuffers.colourBuffer = d.createBuffer()), e.triangleBuffers.shadowBuffer || (e.triangleBuffers.shadowBuffer = d.createBuffer())
        }

        function c(e, t, n, r, i, a) {
            d.uniform3f(I.resolution, t, n, r), d.uniform1f(I.hitTest, 0 | i), d.uniform1iv(I.textures, [0, 1, 2, 3, 4, 5, 6, 7]), d.uniformMatrix4fv(I.transform, !1, e.get()), d.uniform1f(I.shadowType, a), d.uniform1f(I.zoom, e.getZoomLevel())
        }
        var s, f = {},
            d = t,
            g = e.Utils,
            h = 3 * Float32Array.BYTES_PER_ELEMENT,
            v = 9 * Float32Array.BYTES_PER_ELEMENT,
            m = 4 * Uint8Array.BYTES_PER_ELEMENT,
            y = 4 * Uint8Array.BYTES_PER_ELEMENT;
        if (!d.triangleShader) {
            var b = g.compileShader(d, "triangle-vertex", d.VERTEX_SHADER),
                p = g.compileShader(d, "triangle-fragment", d.FRAGMENT_SHADER);
            s = g.createProgram(d, b, p), d.triangleShader = {
                vertexShader: b,
                fragmentShader: p,
                program: s
            }
        }
        s = d.triangleShader.program;
        var I = {
            transform: d.getUniformLocation(s, "u_transform"),
            textures: d.getUniformLocation(s, "u_image[0]"),
            resolution: d.getUniformLocation(s, "u_resolution"),
            hitTest: d.getUniformLocation(s, "u_hitTest"),
            shadowType: d.getUniformLocation(s, "u_shadowType"),
            zoom: d.getUniformLocation(s, "u_zoom"),
            position: d.getAttribLocation(s, "a_position"),
            startAngle: d.getAttribLocation(s, "a_startAngle"),
            endAngle: d.getAttribLocation(s, "a_endAngle"),
            circleRadius: d.getAttribLocation(s, "a_circleRadius"),
            width: d.getAttribLocation(s, "a_width"),
            colour: d.getAttribLocation(s, "a_colour"),
            textCoord: d.getAttribLocation(s, "a_texCoord"),
            shadowColour: d.getAttribLocation(s, "a_hitTestColour"),
            textureBank: d.getAttribLocation(s, "a_textureBank")
        };
        return f.drawItems = function(e, t, l, f, g, h, v, m, y) {
            d.useProgram(s), c(t, h, v, m, y, 0 | e.shadowType), u(e), r(e), i(e), a(e), o(e), n(l, f, g), d.drawArrays(d.TRIANGLES, 0, 3 * e.triangleBuffers.numOfTriangles)
        }, f.finish = function() {
            e.Utils.finishProgram(d, s)
        }, f
    })
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    e && (e.Generator = function(t) {
        function n(e) {
            p.isNullOrUndefined(e.fontFamily) && (e.fontFamily = "sans-serif"), F === e.fontFamily && null !== F || (F = e.fontFamily, H.textAtlas = !0), N[F] = !0, X[F] = !0
        }

        function r(e) {
            e.iconFontFamily && T !== e.iconFontFamily && (T = e.iconFontFamily, H.fontIcons = !0)
        }

        function i(e, t, n) {
            e.fbAlpha = n, e.rebuildOptions = {
                all: t.all,
                colours: t.colours,
                textures: t.textures,
                shadow: t.shadow,
                positions: t.positions
            }
        }

        function a(e, t) {
            return e.all || e.textures || e.positions || e.shadow || e.colours || t
        }

        function o(e) {
            e.arcBuffers.numOfTriangles = 0, e.lineBuffers.numOfTriangles = 0, e.triangleBuffers.numOfTriangles = 0
        }

        function l(e, t, n) {
            for (var r, i = t.rebuildOptions, a = t.alwaysUpdate, o = 0; U > o; o++) r = e[o], te[r.p](t, r, r.oc && r.bg, r.oc && r.gh, n, a, i)
        }

        function u(n) {
            H.textAtlas && (t.textAtlas && n.clearTextureAtlas(t.textAtlas.atlases), t.textAtlas = e.TextAtlas(N, t), X = N)
        }

        function c(n) {
            !H.fontIcons && t.fontIconAtlas || (n.clearTextureAtlas(t.fontIconAtlas), t.fontIconAtlas = e.FontIconAtlas(V, T))
        }

        function s(e, t, n, r) {
            function i(e) {
                n[U++] = e, r && v(e, a, o, l)
            }
            var a, o, l;
            t.widgets && (U = 0, a = e.lineBuffers, o = e.arcBuffers, l = e.triangleBuffers, t.widgets.each(i, t.channels, t.layers))
        }

        function f(e) {
            d(e.lineBuffers, e), g(e), h(e)
        }

        function d(e, t) {
            var n = 9;
            e.elementIndexIndex = 0, e.elementMappingIndex = 0, e.elementDataIndex = 0, e.elementIntegerDataIndex = 0, e.elementData && !t.rebuildOptions.all || (e.elementData = new Float32Array(e.numOfTriangles * n * 4), e.elementIntegerData = new Uint8Array(e.elementData.buffer, 0, e.elementData.length * Float32Array.BYTES_PER_ELEMENT)), e.elementIndex && !t.rebuildOptions.all || (e.elementIndex = new Uint32Array(3 * e.numOfTriangles))
        }

        function g(e) {
            function t() {
                var t = e.arcBuffers.totalNumOfVerticies * a;
                (!e.arcBuffers.positionData || e.rebuildOptions.all && e.arcBuffers.positionData.length !== t) && (e.arcBuffers.positionData = new Float32Array(t))
            }

            function n() {
                var t = e.arcBuffers.totalNumOfVerticies * l;
                (!e.arcBuffers.colourData || e.rebuildOptions.all && e.arcBuffers.colourData.length !== t) && (e.arcBuffers.colourData = new Uint8Array(t));
            }

            function r() {
                var t = e.arcBuffers.totalNumOfVerticies * o;
                (!e.arcBuffers.shadowData || e.rebuildOptions.all && e.arcBuffers.shadowData.length !== t) && (e.arcBuffers.shadowData = new Uint8Array(t))
            }

            function i() {
                var t = e.arcBuffers.totalNumOfVerticies * u;
                (!e.arcBuffers.coreData || e.rebuildOptions.all && e.arcBuffers.coreData.length !== t) && (e.arcBuffers.coreData = new Float32Array(t))
            }
            var a = 6,
                o = 4,
                l = 4,
                u = 4;
            e.arcBuffers.positionIndex = 0, e.arcBuffers.colourIndex = 0, e.arcBuffers.shadowIndex = 0, e.arcBuffers.coreIndex = 0, e.arcBuffers.totalNumOfVerticies = 3 * e.arcBuffers.numOfTriangles, t(), n(), r(), i()
        }

        function h(e) {
            function t() {
                var t = e.triangleBuffers.totalNumOfVerticies * o;
                (!e.triangleBuffers.positionData || e.rebuildOptions.all && e.triangleBuffers.positionData.length !== t) && (e.triangleBuffers.positionData = new Float32Array(e.triangleBuffers.totalNumOfVerticies * o))
            }

            function n() {
                var t = e.triangleBuffers.totalNumOfVerticies * c;
                (!e.triangleBuffers.colourData || e.rebuildOptions.all && e.triangleBuffers.colourData.length !== t) && (e.triangleBuffers.colourData = new Uint8Array(e.triangleBuffers.totalNumOfVerticies * c))
            }

            function r() {
                var t = e.triangleBuffers.totalNumOfVerticies * u;
                (!e.triangleBuffers.textureData || e.rebuildOptions.all && e.triangleBuffers.textureData.length !== t) && (e.triangleBuffers.textureData = new Float32Array(e.triangleBuffers.totalNumOfVerticies * u))
            }

            function i() {
                var t = e.triangleBuffers.totalNumOfVerticies * l;
                (!e.triangleBuffers.shadowData || e.rebuildOptions.all && e.triangleBuffers.shadowData.length !== t) && (e.triangleBuffers.shadowData = new Uint8Array(e.triangleBuffers.totalNumOfVerticies * l))
            }
            var a = 3,
                o = 3,
                l = 4,
                u = 9,
                c = 4;
            e.triangleBuffers.positionIndex = 0, e.triangleBuffers.colourIndex = 0, e.triangleBuffers.textureIndex = 0, e.triangleBuffers.shadowIndex = 0, e.triangleBuffers.totalNumOfVerticies = e.triangleBuffers.numOfTriangles * a, t(), n(), r(), i()
        }

        function v(e, n, r, i) {
            switch (e.p) {
                case "A":
                    e.donut ? i.numOfTriangles += 2 : r.numOfTriangles += 2 * k;
                    break;
                case "L":
                    n.numOfTriangles += 2;
                    break;
                case "L3":
                    n.numOfTriangles += 6;
                    break;
                case "C":
                    e.bw > 0 && (i.numOfTriangles += 2), e.fi && (i.numOfTriangles += 2);
                    break;
                case "R":
                    e.fi && (i.numOfTriangles += 2), e.bw > 0 && (i.numOfTriangles += 2);
                    break;
                case "RR":
                    e.fi && (i.numOfTriangles += 14), e.bw > 0 && (i.numOfTriangles += 16);
                    break;
                case "T":
                    var a = e.t,
                        o = e.t.length;
                    if (e.isfi) {
                        i.numOfTriangles += 2;
                        var l = V[a];
                        l || (H.fontIcons = !0, V[e.t] = {
                            t: a,
                            ff: e.ff
                        })
                    } else e.ff && (N[e.ff] = !0, X[e.ff] || (H.textAtlas = !0, X[e.ff] = !0)), e.back && (i.numOfTriangles += 2), KeyLines.Rendering.isRTL(t.canvas) && (o = t.bidi.reorderText(a).length), i.numOfTriangles += 2 * o;
                    break;
                case "PE":
                    e.bw > 0 && (n.numOfTriangles += 10), e.fi && (i.numOfTriangles += 3);
                    break;
                case "TR":
                    e.arrowhead > 0 ? 1 === e.arrowhead ? n.numOfTriangles++ : r.numOfTriangles++ : (e.fi && i.numOfTriangles++, e.bw > 0 && i.numOfTriangles++);
                    break;
                case "I":
                    i.numOfTriangles += 2
            }
        }

        function m(e, n) {
            var r = t.allLayers[n.id];
            return r || (r = y(n), t.allLayers[n.id] = r), r
        }

        function y(e) {
            return {
                triangleBuffers: {
                    numOfTriangles: 0,
                    itemIndex: {}
                },
                lineBuffers: {
                    numOfTriangles: 0,
                    itemIndex: {}
                },
                arcBuffers: {
                    numOfTriangles: 0,
                    itemIndex: {}
                },
                id: e.id,
                drawBackgroundColour: e.drawBackgroundColour,
                useFramebuffer: e.useFramebuffer,
                drawFramebuffer: e.drawFramebuffer,
                framebuffer: null,
                renderbuffer: null,
                framebufferTexture: null,
                fbAlpha: e.fbAlpha,
                useView: e.useView,
                shadowType: e.shadowType,
                channels: e.channels,
                rebuildOptions: {},
                alwaysUpdate: e.alwaysUpdate
            }
        }
        var b, p = KeyLines.Util,
            I = e.arcFactory(t.alpha),
            x = e.circleFactory(t.alpha),
            C = e.fontIconFactory(t.alpha),
            w = e.imageFactory(t.alpha),
            G = e.lineFactory(t.alpha),
            A = e.rectangleFactory(t.alpha),
            B = e.textFactory(t.alpha),
            Z = e.triangleFactory(t.alpha),
            R = e.arrowheadArcFactory(t.alpha),
            M = e.arrowheadLineFactory(t.alpha),
            E = {},
            k = 4,
            L = 1,
            S = 2,
            W = {
                dashed: 2,
                dotted: 3
            },
            V = {},
            X = {},
            F = null,
            T = null,
            N = {},
            H = {
                textAtlas: !1,
                fontIcons: !1
            },
            Y = [],
            U = 0,
            K = !1;
        E.generate = function(e, d, g, h, v) {
            t.layersToDraw.length = 0, b = KeyLines.Rendering.isRTL(t.canvas), H.textAtlas = !1, H.fontIcons = !1, K = KeyLines.Rendering.useHiResImages();
            for (var y = 0, p = e.length; p > y; y++) {
                var I = e[y];
                U = 0;
                var x = m(t.allLayers, I);
                t.layersToDraw[y] = x, i(x, g, I.fbAlpha), a(g, I.alwaysUpdate) && (n(h), r(h), g.all && o(x), s(x, I, Y, g.all), H.textAtlas || H.fontIcons || (f(x), l(Y, x, d)))
            }
            u(v), c(v), (H.textAtlas || H.fontIcons) && (H.fontIcons = !1, H.textAtlas = !1, E.generate(e, d, {
                all: !0
            }, h, v)), N = {}
        };
        var z = function(e, t, n, r, i, a, o) {
                if (t.fi && (Z(t, t.x1, t.y1, t.x2, t.y2, t.x5, t.y5, t.fi ? t.wfc : t.wbc, -1, e, t.a, n, r), Z(t, t.x5, t.y5, t.x2, t.y2, t.x4, t.y4, t.fi ? t.wfc : t.wbc, -1, e, t.a, n, r), Z(t, t.x2, t.y2, t.x3, t.y3, t.x4, t.y4, t.fi ? t.wfc : t.wbc, -1, e, t.a, n, r)), t.bw > 0) {
                    var l = W[t.bs] || 0;
                    t.x1 < t.x2 ? (G(t, t.x1, t.y1, t.x2, t.y2, t.wbc, t.wsc, l, t.bw, e.lineBuffers, a, o, t.a, n, r), G(t, t.x2, t.y2, t.x3, t.y3, t.wbc, t.wsc, l, t.bw, e.lineBuffers, a, o, t.a, n, r), G(t, t.x3, t.y3, t.x4 - t.bw / 2, t.y4, t.wbc, t.wsc, l, t.bw, e.lineBuffers, a, o, t.a, n, r), G(t, t.x4, t.y4 - t.bw / 2, t.x5, t.y5 + t.bw / 2, t.wbc, t.wsc, l, t.bw, e.lineBuffers, a, o, t.a, n, r), G(t, t.x5 - t.bw / 2, t.y5, t.x1, t.y1, t.wbc, t.wsc, l, t.bw, e.lineBuffers, a, o, t.a, n, r)) : (G(t, t.x1, t.y1, t.x2, t.y2, t.wbc, t.wsc, l, t.bw, e.lineBuffers, a, o, t.a, n, r), G(t, t.x2, t.y2, t.x3, t.y3, t.wbc, t.wsc, l, t.bw, e.lineBuffers, a, o, t.a, n, r), G(t, t.x3, t.y3, t.x4 + t.bw / 2, t.y4, t.wbc, t.wsc, l, t.bw, e.lineBuffers, a, o, t.a, n, r), G(t, t.x4, t.y4 - t.bw / 2, t.x5, t.y5 + t.bw / 2, t.wbc, t.wsc, l, t.bw, e.lineBuffers, a, o, t.a, n, r), G(t, t.x5 + t.bw / 2, t.y5, t.x1, t.y1, t.wbc, t.wsc, l, t.bw, e.lineBuffers, a, o, t.a, n, r))
                }
            },
            O = function(e, n, r, i) {
                if (n.isfi) C(n, V[n.t], e, n.a, r, i, n.hib);
                else {
                    if (n.back) {
                        var a = n.fs * n.pf;
                        A(n, n.x1, n.y1, n.x2, n.y2 + a, n.wbc, e, n.a, r, i, 0, 0, n.hib)
                    }
                    B(e.triangleBuffers, n, t.textAtlas.getGlyphsFrom(n.t, n.ff, F, n.bo, H, b), t.textAtlas.fontSize, e, n.a, r, i)
                }
            },
            D = function(e, t, n, r, i, a, o) {
                if (t.donut) x(t.x, t.y, t.r + t.bw / 2, t.wbc, t.wsc, t.bw, .5, .5, e, t.a, t.hib, n, r, t.sa, t.ea);
                else {
                    var l = W[t.ls] || 1;
                    I(e.arcBuffers, t.x, t.y, t.r, t.sa, t.ea, t.wbc, t.wsc, t.bw, l, o, a, t.a, n, r)
                }
            },
            _ = function(e, t, n, r, i, a, o) {
                var l = W[t.ls] || 0;
                G(t, t.x1, t.y1, t.x2, t.y2, t.wc, t.wsc, l, t.w, e.lineBuffers, a, o, t.a, n, r)
            },
            P = function(e, t, n, r, i, a, o) {
                var l = W[t.ls] || 0;
                G(t, t.x1, t.y1, t.x2, t.y2, t.wc, t.wsc, l, t.w, e.lineBuffers, a, o, t.a, n, r), G(t, t.x2, t.y2, t.x3, t.y3, t.wc, t.wsc, l, t.w, e.lineBuffers, a, o, t.a, n, r), G(t, t.x3, t.y3, t.x4, t.y4, t.wc, t.wsc, l, t.w, e.lineBuffers, a, o, t.a, n, r)
            },
            j = function(e, t, n, r, i, a) {
                t.arrowhead === L ? M(e.lineBuffers, t.x1, t.y1, t.x2, t.y2, t.x3, t.y3, t.wfc, t.wsc, i, a, n, r) : t.arrowhead === S && R(e.arcBuffers, t.x1, t.y1, t.x2, t.y2, t.x3, t.y3, t.wfc, t.wsc, i, a, n, r)
            },
            J = function(e, t, n, r, i, a) {
                t.arrowhead ? j(e, t, n, r, i, a) : (t.fi && Z(t, t.x1, t.y1, t.x2, t.y2, t.x3, t.y3, t.wfc, -2, e, t.a, n, r), t.bw > 0 && Z(t, t.x1, t.y1, t.x2, t.y2, t.x3, t.y3, t.wbc, -2, e, t.a, n, r))
            },
            Q = function(e, t, n, r) {
                if (t.fi && A(t, t.x1, t.y1, t.x2, t.y2, t.wfc, e, t.a, n, r, 0, 0, t.hib), t.bw > 0) {
                    var i = W[t.bs] || 0,
                        a = t.bw / 2,
                        o = Math.floor(t.x1 - a),
                        l = Math.floor(t.y1 - a),
                        u = Math.floor(t.x2 + a),
                        c = Math.floor(t.y2 + a);
                    A(t, o, l, u, c, t.wbc, e, t.a, n, r, t.bw, i, t.hib)
                }
            },
            q = function(e, t, n, r) {
                var i = t.r,
                    a = t.bw,
                    o = t.bw / 2,
                    l = t.x1,
                    u = t.y1,
                    c = t.x2,
                    s = t.y2;
                t.fi && (A(t, l + i, u, c - i, s, t.wfc, e, t.a, n, r, 0, 0, t.hib), A(t, l, u + i, l + i, s - i, t.wfc, e, t.a, n, r, 0, 0, t.hib), A(t, c - i, u + i, c, s - i, t.wfc, e, t.a, n, r, 0, 0, t.hib), x(l, u, i, t.wfc, t.wsc, 0, 1, 1, e, t.a, t.hib, n, r), x(c, u, i, t.wfc, t.wsc, 0, 0, 1, e, t.a, t.hib, n, r), x(l, s, i, t.wfc, t.wsc, 0, 1, 0, e, t.a, t.hib, n, r), x(c, s, i, t.wfc, t.wsc, 0, 0, 0, e, t.a, t.hib, n, r)), a > 0 && (A(t, l + i - o, u - o, c - i + o, u + o, t.wbc, e, t.a, n, r, 0, 0, t.hib), A(t, l + i - o, s - o, c - i + o, s + o, t.wbc, e, t.a, n, r, 0, 0, t.hib), A(t, c + o, u + i - o, c - o, s - i + o, t.wbc, e, t.a, n, r, 0, 0, t.hib), A(t, l - o, u + i - o, l + o, s - i + o, t.wbc, e, t.a, n, r, 0, 0, t.hib), x(l - o, u - o, i + o, t.wbc, t.wsc, a, 1, 1, e, t.a, t.hib, n, r), x(c + o, u - o, i + o, t.wbc, t.wsc, a, 0, 1, e, t.a, t.hib, n, r), x(c + o, s + o, i + o, t.wbc, t.wsc, a, 0, 0, e, t.a, t.hib, n, r), x(l - o, s + o, i + o, t.wbc, t.wsc, a, 1, 0, e, t.a, t.hib, n, r))
            },
            $ = function(e, t, n, r) {
                if (t.fi && x(t.x, t.y, t.r, t.wfc, t.wsc, 0, .5, .5, e, t.a, t.hib, n, r, null, null, null), t.bw > 0) {
                    var i = W[t.bs] || 0;
                    x(t.x, t.y, t.r + t.bw / 2, t.wbc, t.wsc, t.bw, .5, .5, e, t.a, t.hib, n, r, null, null, i > 1)
                }
            },
            ee = function(e, t, n, r, i) {
                "_background" === t.id && (t.wsc = [0, 0, 0, 0]);
                var a = i[t.u];
                if (t.hi && K) {
                    var o = i[KeyLines.Rendering.hiResUrl(t.u)];
                    o && !o.missing && (a = o)
                }
                w(t, "co" === t.s ? a.co : a.im, e, t.a, n, r, t.hib)
            },
            te = {
                A: D,
                L: _,
                L3: P,
                I: ee,
                TR: J,
                R: Q,
                RR: q,
                C: $,
                T: O,
                PE: z
            };
        return E
    })
}(),
function() {
    "undefined" != typeof window && (window.L_PREFER_CANVAS = !0), KeyLines.Map = {};
    var e = KeyLines.Map;
    e.create = function(e, t, n) {
        function r() {
            throw new Error("Leaflet was not found. Make sure you include leaflet.js and leaflet.css in your web page.")
        }

        function i(e) {
            return tt ? e : r
        }

        function a(e) {
            tt && (e.map = T())
        }

        function o() {
            e.lock(Oe)
        }

        function l(e, t) {
            var n = Le.latLngToContainerPoint([e, t]);
            return {
                x: n.x,
                y: n.y
            }
        }

        function u(e, t) {
            var n = Le.containerPointToLatLng([e, t]);
            return {
                lat: n.lat,
                lng: n.lng
            }
        }

        function c(e, t, n) {
            if (Ke) {
                var r = Le._container,
                    i = r.parentNode;
                r.style.height = t + "px", r.style.width = e + "px", i.style.height = t + "px", i.style.width = e + "px", Ne.nextTick(function() {
                    ie(n)
                }, 0)
            } else Ve = [e, t], Ne.invoke(n)
        }

        function s(t) {
            e.privateEach({
                type: "node",
                items: "toplevel"
            }, function(e) {
                e.hi || t({
                    id: e.id,
                    x: e.x,
                    y: e.y
                })
            })
        }

        function f() {
            var e = [];
            return s(function(t) {
                e.push(t)
            }), e
        }

        function d() {
            "restore" === Je.transition ? (Xe = {}, Fe = [], e.privateEach({
                items: "all",
                type: "node"
            }, function(e) {
                var t = e.id;
                e._combo && e._combo.open && Fe.push(t), e._parentId || (Xe[t] = {
                    id: t,
                    x: e.x,
                    y: e.y
                })
            })) : (Xe = null, Fe = null)
        }

        function g(t) {
            e.combo().open(Fe, {
                animate: !1,
                adapt: !1
            }, function() {
                if ("restore" === Je.transition && Xe) {
                    var n = Ne.values(Xe).filter(function(t) {
                        return !e.combo().find(t.id)
                    });
                    Xe = null, e.setProperties(n, !1, t)
                } else e.allowDraw(!1), e.layout("standard", {
                    animate: !1
                }, function() {
                    e.allowDraw(!0), Ne.invoke(t)
                })
            })
        }

        function h(e, t) {
            return e && (Ne.forEach(e, function(e, t) {
                Je[t] = e
            }), "tiles" in e && Le ? X(t) : Ne.invoke(t)), Ne.clone(Je)
        }

        function v(n) {
            function r() {
                W(), R(G(), !1), Ze(function() {
                    I(Je.animate, i)
                })
            }

            function i() {
                return Ke = !0, Oe = !1, t.trigger("map", "showend"), ve(ze), o(), Ve && (c(Ve[0], Ve[1], function() {
                    e.zoom("fit")
                }), Ve = null), Ne.invoke(n)
            }
            if (Le || Oe) return void Ne.invoke(n);
            Oe = !0, o(), t.trigger("map", "showstart"), m(), e.options(Ue), He = {};
            var a = {};
            e.privateEach({
                type: "node",
                items: "toplevel"
            }, function(e) {
                e.hi || Ee(e) || (He[e.id] = !0, a[e.id] = !0)
            }), e.privateEach({
                type: "link",
                items: "toplevel"
            }, function(e) {
                e.hi || !a[e.id1] && !a[e.id2] || (He[e.id] = !0)
            }), d();
            var l = Object.keys(He);
            l.length > 0 ? e.hide(l, {
                time: Je.time,
                animate: Je.animate
            }, r) : r()
        }

        function m() {
            var t = e.options();
            Ye = {}, Ne.forEach(Ue, function(e, n) {
                Ye[n] = t[n]
            })
        }

        function y() {
            e.options(Ye), Ye = {}
        }

        function b() {
            $e.style.top = null, $e.style.left = null, $e.parentNode.style.position = null
        }

        function p(t, n, r) {
            t ? e.privateAnimateBackgroundOpacity(n, {
                time: Je.time
            }, r) : (e.privateSetBackgroundOpacity(n), Ne.invoke(r))
        }

        function I(e, t) {
            b(), F(), p(e, 0, t)
        }

        function x(e, t) {
            p(e, 1, t)
        }

        function C(e, t, n, r, i, a) {
            function o(e, t, n) {
                var r = t / n,
                    i = e.width,
                    a = e.width / e.height !== r ? Math.floor(i / r) : e.height;
                return {
                    width: i,
                    height: a
                }
            }

            function l(n) {
                if (b.push(n), b.length >= y) {
                    for (var l = r(d.x, d.y), u = l.getContext("2d"), c = 0; c < b.length; c++) {
                        var s = b[c];
                        u.drawImage(s.img, Math.floor(s.pos.x), Math.floor(s.pos.y), s.size, s.size)
                    }
                    var f = r(e, t),
                        g = f.getContext("2d"),
                        h = o(l, e, t),
                        v = r(h.width, h.height),
                        m = v.getContext("2d");
                    m.drawImage(l, 0, 0), g.drawImage(v, 0, 0, v.width, v.height, 0, 0, e, t), g.drawImage(i, 0, 0);
                    var p;
                    try {
                        p = f.toDataURL()
                    } catch (I) {
                        throw new Error("[toDataURL] There is a problem to export the chart with tainted map tiles.")
                    }
                    Ne.invoke(a, p)
                }
            }

            function u(e, t, n, r) {
                var i = document.createElement("img");
                i.crossOrigin = "", i.onload = function() {
                    return r({
                        img: i,
                        pos: t,
                        size: n
                    })
                }, i.onerror = function() {
                    return r({
                        img: p,
                        pos: t,
                        size: n
                    })
                }, i.src = e
            }
            if (!Ke || !Le || "exact" !== n.fit) return void Ne.invoke(a, i.toDataURL());
            if (!tt) throw Error("[toDataURL] The mapping library has to be loaded after KeyLines to make toDataURL work");
            var c = Le.getPixelBounds(),
                s = Le.getPixelOrigin(),
                f = Le.getZoom(),
                d = Le.getSize(),
                g = We.options.tileSize;
            if (f > We.options.maxZoom || f < We.options.minZoom) return void Ne.invoke(a, i.toDataURL());
            for (var h = L.bounds(c.min.divideBy(g)._floor(), c.max.divideBy(g)._floor()), v = h.max.y - h.min.y + 1 + (h.min.y > 0 ? 0 : h.min.y), m = h.max.x - h.min.x + 1 + (h.min.x > 0 ? 0 : h.min.x), y = v * m, b = [], p = r(1, 1), I = h.min.y; I <= h.max.y; I++)
                for (var x = h.min.x; x <= h.max.x; x++) {
                    var C = new L.Point(x, I);
                    C.z = f;
                    var w = We._getTilePos(C).subtract(c.min).add(s);
                    C.y >= 0 && C.x >= 0 && u(We.getTileUrl(C), w, g, l)
                }
        }

        function w(n) {
            function r() {
                Oe = !1, o(), Le = null, t.trigger("map", "hideend"), Ne.invoke(n)
            }

            function i(t, n, i, a) {
                var o = Object.keys(He);
                e.viewOptions(t, {
                    animate: !1
                }, function() {
                    e.hide(o, {
                        animate: !1
                    }, function() {
                        e.setProperties(n, !1, function() {
                            e.allowDraw(!0), e.viewOptions(i, {
                                animate: !0,
                                time: l
                            }), e.animateProperties(a, {
                                time: l
                            }, function() {
                                e.combo().open(Fe, {
                                    time: Je.time * (1 / 3),
                                    adapt: !1
                                }, function() {
                                    o.length > 0 ? e.show(o, !1, {
                                        animate: !0,
                                        time: Je.time
                                    }, r) : r()
                                })
                            })
                        })
                    })
                })
            }

            function a() {
                x(Je.animate, function() {
                    k(), y();
                    var t, n;
                    Je.animate && (t = e.viewOptions(), n = f()), e.show(Object.keys(He), !1, {
                        animate: !1
                    }, function() {
                        Ke = !1, g(function() {
                            e.zoom("fit", {
                                animate: !1
                            }, function() {
                                if (Je.animate) {
                                    var a = e.viewOptions(),
                                        o = f();
                                    e.combo().close(Fe, {
                                        animate: !1,
                                        adapt: !1
                                    }, function() {
                                        i(t, n, a, o)
                                    })
                                } else r()
                            })
                        })
                    })
                })
            }
            if (!Le || Oe) return void Ne.invoke(n);
            var l = Ae();
            Oe = !0, o(), t.trigger("map", "hidestart");
            var u = G();
            R(u, Je.animate, a)
        }

        function G() {
            var t = [];
            return e.privateEach({
                type: "node",
                items: "toplevel"
            }, function(e) {
                Ee(e) && !e.hi && t.push(L.latLng(e.pos.lat, e.pos.lng))
            }), t
        }

        function A(e) {
            if (e.length) {
                var t = L.latLngBounds(e),
                    n = t.getNorth(),
                    r = t.getSouth(),
                    i = t.getWest(),
                    a = t.getEast();
                if (n === r && i === a) {
                    var o = .01;
                    t = L.latLngBounds([
                        [n - o, i - o],
                        [n + o, i + o]
                    ])
                }
                return t
            }
        }

        function B(e, t) {
            if (Le.getZoom() !== t) return !0;
            var n = Le._limitCenter(e, t, Le.options.maxBounds),
                r = Le._getCenterOffset(n)._floor();
            return r.x || r.y
        }

        function Z(e) {
            var t = L.point([2 * _e, 2 * _e]),
                n = Le.getBoundsZoom(e, !1, t);
            if (Le.getZoom() !== n) return !0;
            var r = Le.project(e.getSouthWest(), n),
                i = Le.project(e.getNorthEast(), n),
                a = Le.unproject(r.add(i).divideBy(2), n);
            return B(a, n)
        }

        function R(e, t, n) {
            var r = A(e);
            if (r) void 0 === Le.getZoom() || Z(r) ? (Ne.isFunction(n) && Le.once("moveend", n), Le.fitBounds(r, {
                animate: !!t,
                padding: [_e, _e]
            })) : Ne.isFunction(n) && Ne.invoke(n);
            else {
                var i = L.latLng(0, 0),
                    a = 2;
                B(i, a) ? (Ne.isFunction(n) && Le.once("moveend", n), Le.setView(i, a, {
                    animate: !!t
                })) : Ne.isFunction(n) && Ne.invoke(n)
            }
        }

        function M(e) {
            if (!e) return -1;
            for (var t = 0, n = e; n = n.previousSibling;) ++t;
            return t
        }

        function E(e, t) {
            var n = et > 0 ? e.childNodes[et + 1] : e.firstChild;
            e.insertBefore(t, n || null)
        }

        function k() {
            var e = Le._container,
                t = e.parentNode,
                n = t.parentNode;
            Le.removeControl(Se), Le.remove(), n.removeChild(t), E(n, $e), $e.style.position = "", $e.style["margin-top"] = null, $e.style["margin-left"] = null
        }

        function S(e) {
            $e.style.position = "absolute", $e.style.top = 0, $e.style.left = 0, $e.style["margin-top"] = 0, $e.style["margin-left"] = 0, $e.style.zIndex = 2;
            var t = document.createElement("div");
            t.style.position = "relative", t.id = e + "-container";
            var n = document.createElement("div");
            n.id = e, t.style.width = $e.clientWidth + "px", t.style.height = $e.clientHeight + "px", n.style.width = $e.clientWidth + "px", n.style.height = $e.clientHeight + "px", n.style.position = "absolute", n.style.top = $e.top, n.style.left = $e.left;
            var r = $e.parentNode;
            r.removeChild($e), t.appendChild(n), t.appendChild($e), E(r, t)
        }

        function W(e) {
            S(qe), Le = new L.Map(qe, Ne.merge(Pe, {
                boxZoom: !1,
                zoomAnimationThreshold: 20,
                zoomControl: !1
            })), V(e)
        }

        function V(e) {
            var t = "",
                n = {
                    noWrap: !0
                };
            "string" != typeof Je.tiles ? (t = (Je.tiles || Qe.tiles).url, n = L.extend(n, Je.tiles)) : t = Je.tiles, We = new L.TileLayer(t, n), e && We.once("load", e), Le.addLayer(We)
        }

        function X(e) {
            Le.removeLayer(We), V(e)
        }

        function F(e) {
            Se = ke(e), Le.addControl(Se)
        }

        function T() {
            var e = {
                show: Ke
            };
            if (Ke) {
                var t = Le.getCenter();
                e.lat = t.lat, e.lng = t.lng, e.zoom = Le.getZoom(), e.bounds = Le.getBounds().toBBoxString(), e.hiddenOnMap = Ne.clone(He), e.restoreXY = Ne.clone(Xe)
            }
            return e
        }

        function N(t, n) {
            var r = !0;
            if (tt) {
                var i = t || {};
                i.show ? (He = Ne.clone(i.hiddenOnMap) || [], Xe = Ne.clone(i.restoreXY) || null, Ke || (Ke = !0, m(), r = !1, W(function() {
                    e.options(Ue), I(!1, n)
                })), Le.setView([i.lat, i.lng], i.zoom, {
                    reset: !0
                }), Be()) : !i.show && Ke && x(!1, function() {
                    Ke = !1, k(), y(), Le = null
                })
            }
            r && Ne.invoke(n)
        }

        function H(e) {
            e && (Te.options = Ne.defaults(e, lt), Le && z())
        }

        function Y(e) {
            Te = {
                options: Ne.clone(lt),
                zooming: null,
                zoomLevel: null,
                zoomAnimating: null
            }, H(e)
        }

        function U() {
            return $e.parentNode.removeChild($e), $e.style.top = 0, $e.style.left = 0, O(), $e
        }

        function K() {
            _(!1), ye(!1), $e.removeAttribute("class")
        }

        function z() {
            Le.off("zoomanim", j), Te.options.animZoom && Le.on("zoomanim", j)
        }

        function O() {
            _(!0), ye(!0)
        }

        function D(e) {
            var t = Ne.ensureArray(e);
            return {
                handler: function(e) {
                    Ne.forEach(t, function(t) {
                        t(e)
                    })
                },
                add: function(e) {
                    t.push(e)
                }
            }
        }

        function _(t) {
            var n = t ? "on" : "off",
                r = {
                    resize: re,
                    dragend: Q,
                    drag: q,
                    move: $
                },
                i = ne(function(t, n) {
                    e.dblclick(n.x, n.y, t.ctrlKey, t.shiftKey)
                }),
                a = D(i);
            r.dblclick = a.handler;
            var o = !1,
                l = ne(function(t, n) {
                    var r = e.mousedown(t.button, n.x, n.y, t.ctrlKey, t.shiftKey);
                    Le && (Le.doubleClickZoom.enabled() || o) && (ze || r && "_" === r.charAt(0) ? (Le.doubleClickZoom.disable(), o = !0) : (Le.doubleClickZoom.enable(), o = !1))
                }),
                u = D(function(e) {
                    Te.zooming || l(e)
                }),
                c = D(function(e) {
                    Te.zooming || l(e)
                }),
                s = !1,
                f = ne(function(t, n) {
                    e.mouseup(t.button, n.x, n.y, t.ctrlKey, t.shiftKey)
                });
            c.add(f), r.click = function() {
                s || c.handler.apply(this, arguments), s = !1
            }, r.mousedown = function() {
                s = !0, u.handler.apply(this, arguments)
            }, Le[n](r), Te.zooming = !1, L.DomEvent.getWheelDelta = function(t) {
                var n;
                return n = void 0 !== t.wheelDelta ? t.wheelDelta : -t.detail, e.trigger("mousewheel", n, t.layerX, t.layerY), n > 0 ? .025 : 0 > n ? -.025 : 0
            }, Te.zoomLevel = Le._zoom, Le[n]("zoomstart", P), t && !Te.options.animZoom || Le[n]("zoomanim", j), Le[n]("zoomend", J)
        }

        function P() {
            Te.zooming = !0
        }

        function j(e) {
            ae(e)
        }

        function J() {
            Te.zooming = !1, Te.options.animZoom && Te.options.zoomAnimating || Be()
        }

        function Q() {
            je = !1, me(e.options().handMode), xe(!0)
        }

        function q() {
            je = !0, xe(!0)
        }

        function $() {
            Te.zooming || Be()
        }

        function ee(e, t) {
            Le.panBy(e, t)
        }

        function te(t, n, r, i) {
            var a = null,
                o = 100,
                l = {
                    animate: !!n,
                    duration: Ne.isNumber(r) ? r / 1e3 : .25
                };
            if (Ne.isFunction(i) && Le.once("moveend", i), "selection" === t) {
                var u = [],
                    c = e.getItem(e.selection());
                if (c.length) {
                    for (var s, f = 0; f < c.length; f++) s = c[f], "node" === s.type && Ee(s) && !s.hi && u.push(L.latLng(s.pos.lat, s.pos.lng));
                    Le.panInsideBounds(A(u), l)
                }
            } else {
                switch (t) {
                    case "up":
                        a = [0, -o];
                        break;
                    case "down":
                        a = [0, o];
                        break;
                    case "left":
                        a = [-o, 0];
                        break;
                    case "right":
                        a = [o, 0]
                }
                a && Le.panBy(a, l)
            }
        }

        function ne(e) {
            return function(t) {
                var n = t.originalEvent,
                    r = KeyLines.coords(n);
                return n.stopPropagation && n.stopPropagation(), n.shiftKey ? !0 : void e(n, r)
            }
        }

        function re(e) {
            De = !0, Be(e)
        }

        function ie(e) {
            De ? Ne.invoke(e) : (Le.invalidateSize(!0), re(e)), De = !1
        }

        function ae(t) {
            if (!Te.zoomAnimating) {
                Te.zoomAnimating = !0;
                var n = [];
                e.privateEach({
                    type: "node",
                    items: "toplevel"
                }, function(r) {
                    if (Ee(r)) {
                        var i = Le._latLngToNewLayerPoint(L.latLng(r.pos.lat, r.pos.lng), t.zoom, t.center),
                            a = Le.layerPointToContainerPoint(i),
                            o = e.worldCoordinates(a.x, a.y);
                        n.push({
                            id: r.id,
                            x: o.x,
                            y: o.y
                        })
                    }
                }), e.animateProperties(n, {
                    time: 150,
                    queue: !1
                }, function() {
                    Te.zoomAnimating = !1, Te.zooming || Be()
                })
            }
        }

        function oe() {
            var e = Le.getZoom();
            e = Math.min(ot, Math.max(at, e));
            var t = rt + (it - rt) * (e - at) / (ot - at);
            return t
        }

        function le(e, t, n, r) {
            Ne.isFunction(r) && Le.once("moveend", r);
            var i = Math.round(e);
            Le.setZoom(i, {
                animate: t
            })
        }

        function ue() {
            return Le.getZoom()
        }

        function ce() {
            return !!Le
        }

        function se() {
            return Oe
        }

        function fe() {
            return Le.getMaxZoom()
        }

        function de(e) {
            for (var t = [], n = 0; n < e.length; n++) {
                var r = e[n];
                Ne.isNullOrUndefined(r) || !Ee(r) || r.hi || t.push(L.latLng(r.pos.lat, r.pos.lng))
            }
            return t
        }

        function ge(t, n, r) {
            var i = e.getItem(t),
                a = de(i);
            a.length ? R(a, !!n, r) : Ne.invoke(r)
        }

        function he(t, n, r, i, a) {
            var o = {
                animate: !!n,
                duration: Ne.isNumber(r) ? r / 1e3 : .25
            };
            switch (t) {
                case "in":
                    Ne.isFunction(a) && Le.once("moveend", a), Le.zoomIn(1, o);
                    break;
                case "out":
                    Ne.isFunction(a) && Le.once("moveend", a), Le.zoomOut(1, o);
                    break;
                case "fit":
                case "fitToModel":
                    i ? ge(i, n, a) : R(G(), !!n, a);
                    break;
                case "selection":
                case "fitToSelection":
                    ge(e.selection(), n, a);
                    break;
                case "height":
                case "fitModelHeight":
                    var l = -(1 / 0),
                        u = -(1 / 0),
                        c = 1 / 0,
                        s = 1 / 0,
                        f = function(e) {
                            Ee(e) && !e.hi && (e.pos.lat > l && (l = e.pos.lat, u = e.pos.lng), e.pos.lat < c && (c = e.pos.lat, s = e.pos.lng))
                        };
                    i ? e.getItem(i).forEach(f) : e.privateEach({
                        type: "node",
                        items: "toplevel"
                    }, f), isFinite(l) && isFinite(u) && isFinite(c) && isFinite(s) ? R([
                        [l, u],
                        [c, s]
                    ], !!n, a) : Ne.isFunction(a) && Ne.invoke(a)
            }
            return ue() / fe()
        }

        function ve(e) {
            ze = e;
            var t, n, r = e ? "disable" : "enable",
                i = ["dragging", "touchZoom", "doubleClickZoom", "scrollWheelZoom", "keyboard", "tap"];
            for (n = 0; n < i.length; n++) t = i[n], Pe[t] = !e, Ke && Le[t] && Le[t][r]()
        }

        function me(e) {
            Le.dragging.enabled() !== e && (e ? Le.dragging.enable() : je || Le.dragging.disable())
        }

        function ye(t) {
            var n = t ? e.privateBind : e.privateUnbind;
            n("dblclick", be), n("dragstart", Ie), n("keydown", pe)
        }

        function be(e) {
            return null === e
        }

        function pe(e) {
            return e > 36 && 41 > e
        }

        function Ie(e) {
            return "move" === e
        }

        function xe(t, n) {
            var r = e.viewOptions(),
                i = Le.getPixelBounds().min,
                a = Le.getPixelOrigin();
            r.offsetX = a.x - i.x, r.offsetY = a.y - i.y;
            var o = oe();
            r.zoom !== o && (r.zoom = o);
            var l = {
                animate: t,
                time: t ? 100 : -1
            };
            e.viewOptions(r, l, n)
        }

        function Ce(t) {
            var n = Le.latLngToContainerPoint([t.pos.lat, t.pos.lng]);
            return e.worldCoordinates(n.x, n.y)
        }

        function we() {
            var t = [];
            return e.privateEach({
                type: "node",
                items: "toplevel"
            }, function(e) {
                if (Ee(e)) {
                    var n = Ce(e);
                    n.id = e.id, t.push(n)
                }
            }), t
        }

        function Ge(t) {
            var n, r, i, a, o = Ne.ensureArray(t);
            for (r = 0; r < o.length; r++) n = o[r], Ne.objectHasOwnProperty(n, "pos") && (i = {
                pos: Ne.merge(e.getItem(n.id).pos, n.pos)
            }, a = Ce(i), n.x = a.x, n.y = a.y)
        }

        function Ae() {
            return Fe && Fe.length ? Je.time * (2 / 3) : Je.time
        }

        function Be(t) {
            xe(!1, function() {
                e.setProperties(we(), !1, t)
            })
        }

        function Ze(t) {
            if (Je.animate) {
                var n = Ae(),
                    r = {
                        time: Je.time * (1 / 3),
                        adapt: !1
                    },
                    i = e.viewOptions();
                e.combo().close(Fe, r, function() {
                    var r = oe();
                    i.zoom === r ? e.animateProperties(we(), {
                        time: n
                    }, t) : e.viewOptions({
                        zoom: r
                    }, {
                        animate: !1
                    }, function() {
                        var a = we();
                        e.viewOptions(i, {
                            animate: !1
                        }, function() {
                            function i() {
                                0 === --o && Ne.invoke(t)
                            }
                            var o = 2;
                            e.viewOptions({
                                zoom: r
                            }, {
                                animate: !0,
                                time: n
                            }, i), e.animateProperties(a, {
                                animate: !0,
                                time: n
                            }, i)
                        })
                    })
                })
            } else e.combo().close(Fe, {
                animate: !1
            }, function() {
                Be(t)
            })
        }

        function Re(e) {
            if ("node" === e.type)
                if (Xe && delete Xe[e.id], delete He[e.id], Ee(e)) {
                    var t = e.x || 0,
                        n = e.y || 0;
                    Xe && (Xe[e.id] = {
                        id: e.id,
                        x: t,
                        y: n
                    });
                    var r = Ce(e);
                    e.x = r.x, e.y = r.y
                } else e.hi || (e.hi = !0, He[e.id] = !0)
        }

        function Me(t) {
            for (var n = [], r = 0; r < t.length; r++) {
                var i = t[r];
                if ("node" === i.type) {
                    var a = e.getItem(i.id);
                    if (a) {
                        var o = {};
                        He[i.id] ? o.hi = !1 : "hi" in a && (o.hi = a.hi), Xe && Xe[i.id] && (o.x = Xe[i.id].x, o.y = Xe[i.id].y), a.pos && (o.pos = a.pos), i = Ne.merge(o, i)
                    }
                    Re(i)
                } else if ("link" === i.type && !i.hi) {
                    var l = e.getItem(i.id1),
                        u = e.getItem(i.id2);
                    l && u && Ee(l) && Ee(u) || (He[i.id] = !0)
                }
                n.push(i)
            }
            return n
        }

        function Ee(e) {
            return Ne.isNormalObject(e.pos) && !Ne.isNullOrUndefined(e.pos.lat) && !Ne.isNullOrUndefined(e.pos.lng)
        }

        function ke() {
            var e = L.Control.extend({
                options: {
                    position: "topleft"
                },
                setOptions: H,
                initialize: Y,
                onAdd: U,
                onRemove: K
            });
            return new e(Je)
        }
        var Le, Se, We, Ve, Xe, Fe, Te, Ne = KeyLines.Util,
            He = {},
            Ye = {},
            Ue = {
                watermark: !1,
                overview: !1,
                gestures: !1,
                handMode: !0
            },
            Ke = !1,
            ze = !1,
            Oe = !1,
            De = !1,
            _e = 5,
            Pe = {},
            je = !1,
            Je = {
                animate: !0,
                time: 800,
                tiles: {
                    url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png",
                    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
                    subdomains: "abcd",
                    minZoom: 0,
                    maxZoom: 20
                },
                transition: "restore"
            },
            Qe = Ne.clone(Je),
            qe = n + "-map",
            $e = document.getElementById(n),
            et = M($e),
            tt = "undefined" != typeof L && L.version,
            nt = {
                api: {
                    show: i(v),
                    hide: i(w),
                    viewCoordinates: i(l),
                    mapCoordinates: i(u),
                    isShown: function() {
                        return Ke
                    },
                    leafletMap: function() {
                        return Le || null
                    },
                    options: i(h)
                },
                internalUse: {
                    appendMap: a,
                    convertPos: Ge,
                    loadUp: N,
                    setSize: c,
                    enableDragging: me,
                    lock: ve,
                    pan: te,
                    panBy: ee,
                    zoom: he,
                    setZoom: le,
                    getMaxZoom: fe,
                    getZoom: ue,
                    toDataURL: C,
                    isMapLoaded: ce,
                    preMerge: Me,
                    preSetItem: Re,
                    isTransitioning: se
                }
            },
            rt = .75,
            it = 1.25,
            at = 4,
            ot = 15,
            lt = {
                animZoom: !0,
                scaleOnZoom: !0
            };
        return nt
    }
}(),
function() {
    KeyLines.Controller = {};
    var e = KeyLines.Controller;
    e.createController = function(t, n, r, i, a) {
        function o(e, t, n, i) {
            q.replaceUnloadedImages(e, n), r.colorize(e, Ae, i), J.circularize(e, t, Ae)
        }

        function l() {
            return {
                p: "ne",
                u: null,
                x: 0,
                y: 0
            }
        }

        function u() {
            return {
                shown: !0,
                p: "nw",
                x: 0,
                y: 0
            }
        }

        function c() {
            return {
                icon: !0,
                p: "se",
                shown: !1,
                size: 100
            }
        }

        function s() {
            return {
                bands: [],
                bottom: !1,
                top: !0
            }
        }

        function f() {
            return {
                fb: !1,
                fc: "lightgrey",
                x: 0,
                w: 100
            }
        }

        function d() {
            return {
                maxLength: 30,
                showOnHover: !0
            }
        }

        function g(e) {
            function t(e, t) {
                q.isNumber(e[t]) ? (e[t] = Math.min(50, e[t]), e[t] = Math.max(-50, e[t])) : e[t] = 0
            }
            return Object.keys(e).forEach(function(n) {
                var r = e[n];
                r = q.defaults({
                    dx: r.dx,
                    dy: r.dy,
                    e: r.e
                }, {
                    dx: 0,
                    dy: 0,
                    e: 1
                }), t(r, "dx"), t(r, "dy"), (!q.isNumber(r.e) || r.e <= 0) && (r.e = 1);
                var i = n;
                q.isNumber(parseInt(n, 10)) && (i = String.fromCharCode(parseInt(n, 10))), e[i] = r
            }), e
        }

        function h(e) {
            ve.selectedNode && ve.selectedNode.u && (e[se + ve.selectedNode.u] = 1)
        }

        function v() {
            r.setup();
            var t = ve.watermark;
            t && r.addTextWatermark(t.u ? se + t.u : void 0, t.t, t.fs || 80, t.fc || J.colours.lightgrey, t.fb, t.fbc, t.a, t.ff ? t.ff : ve.fontFamily), ve.navigation && ve.navigation.shown && r.addNavigation($, te, Ze, ve.navigation), ve.overview && r.addOverview($, ie, te, Ae, Ze, ve.overview), ve.logo && ve.logo.u && r.addLogo(se, ve.logo), r.remove(x(ce, Ve), x(ce, Xe), x(ce, pe)), e.e && r.remove(x(ce, Ve), x(ce, Xe), x(ce, pe)), r.addBanding(ve)
        }

        function m(e, t) {
            q.forEach(t, function(n, r) {
                var i = e[r];
                q.isNormalObject(i) && q.isNormalObject(n) ? m(i, n) : "id" !== r && "string" == typeof n && Ie[r] && i && (e[r] = J.hsla(i), t[r] = J.hsla(n))
            })
        }

        function y(e, t) {
            for (var n = 0; n < t.length; n++) m(e[n], t[n])
        }

        function b(e, t, n) {
            if ("number" == typeof e) return e + n * (t - e);
            if (Array.isArray(e)) {
                var r;
                return Math.abs(e[0] - t[0]) > .5 ? (r = e[0] < t[0] ? b(1 + e[0], t[0], n) : b(e[0], 1 + t[0], n), r -= Math.floor(r)) : r = b(e[0], t[0], n), J.fromhsla([r, b(e[1], t[1], n), b(e[2], t[2], n), b(e[3], t[3], n)])
            }
            return t
        }

        function p(e, t, n) {
            var r = {};
            return q.forEach(e, function(i, a) {
                a in t ? r[a] = Ie[a] ? b(e[a], t[a], n) : t[a] : r[a] = i
            }), r
        }

        function I(e, t, n, r, i, a) {
            $.setProperties(e, !1, !0, {}), $.animateProperties(t, {
                time: r
            }, function() {
                i > 1 ? I(e, t, n, r, i - 1, a) : ($.setProperties(n, !1, !0, {}), a())
            }, !0)
        }

        function x(e, t) {
            for (var n = "", r = 0; r < t.length; r++) n += String.fromCharCode(e.charCodeAt(r) + t[r]);
            return n
        }

        function C(e) {
            return 1 - e
        }

        function w(e) {
            return e
        }

        function G(e, t, n, r) {
            var i = n;
            return j.buildAnimatorInstance(function(a) {
                i -= a;
                var o = Math.max(0, Math.min(1, (n - i) / n));
                Te = t(o);
                var l = i > 0;
                return l || (ie.resurrect(e), Te = .5, q.invoke(r)), l
            }, {
                all: !0
            })
        }

        function A(e, t, n) {
            var r = t.time;
            if (0 === e.length) q.invoke(n);
            else {
                Te = 1, ie.ghost(e);
                var i, a = ie.showHideGetLinksToBend(e, !1);
                a.length > 0 ? (r *= 2 / 3, i = function() {
                    $.animateProperties(a, {
                        time: r / 2,
                        queue: !1
                    }, n, !0)
                }) : i = n;
                var o = G(e, C, r, function() {
                    ie.hide(e), q.invoke(i)
                });
                Le(o, !0)
            }
        }

        function B(e, t, n) {
            function r() {
                var t = G(e, w, i, n);
                Le(t, !0)
            }
            var i = t.time;
            if (0 === e.length) q.invoke(n);
            else {
                Te = 0, ie.ghost(e);
                var a = ie.showHideGetLinksToBend(e, !0);
                a.length > 0 ? (i *= 2 / 3, $.animateProperties(a, {
                    time: i / 2,
                    queue: !1
                }, r, !0)) : r()
            }
        }

        function Z() {
            var e = 1200,
                t = 0;
            return j.buildAnimatorInstance(function(n) {
                return t += n, Ye = Math.floor(8 * (1 - t % e / e)), He
            })
        }

        function R() {
            if (He) {
                Ne.setLayer(J.layers.WAIT);
                for (var e = te.scale(te.width() / 2), t = te.scale(te.height() / 2), n = te.scale(30), r = 0; 8 > r; r++) {
                    var i = r * (Math.PI / 4),
                        a = e + n * Math.cos(i),
                        o = t + n * Math.sin(i),
                        l = .2 + .8 * ((r + Ye) % 8 / 8);
                    Ne.circle(a, o, te.scale(10), J.colours.white, -1, "rgba(145, 146, 149, " + l + ")", !0)
                }
            }
        }

        function M(e, t) {
            re.globalAlpha = t, re.drawImage(e, 0, 0, e.width, e.height), re.globalAlpha = 1
        }

        function E(e, t) {
            Ne.resetExtras();
            var n = ie.generate(Ne, re, te, ee, se, t);
            return Ne.extras(), Ue = ie.getResizePrimitive(), k(e), r.generate(Ne, re, te, ee, we, e, se), R(), n
        }

        function k(e) {
            e || we && we.generate && (Ne.setLayer(J.layers.DRAGGERS), we.generate(Ne))
        }

        function L(e, t, n) {
            var r = Fe.getContext("2d");
            J.clear(r, te.width(), te.height()), Ne.draw(r, te, ee, t, e), M(Fe, n)
        }

        function S(e, t, n, i) {
            var KtnYs;
            if (87436207 < eT) {
                return;
            }
            KtnYs = 0, Ne.draw(e, te, ee, J.channels.MAIN, J.topLayers, n, i), t || r.drawOverviewContent(e, te), Ne.draw(e, te, ee, J.channels.MAIN, [J.layers.OVERVIEW], n, i)
        }

        function W(e, t, n, r) {
            var i = Fe.getContext("2d");
            J.clear(i, te.width(), te.height()), S(i, t, n, r), M(Fe, e)
        }

        function V(e, t) {
            var n, r = J;
            return n = [{
                id: "bands",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.BANDS, r.layers.UNDERLAYS],
                useView: !1,
                shadowType: -1,
                alwaysUpdate: !0
            }, {
                id: "ghost-background",
                widgets: Ne,
                layers: r.itemLayers,
                channels: J.channels.BACKGROUNDGHOST,
                drawFramebuffer: "ghost-background",
                useFramebuffer: "ghost-background",
                useView: !0,
                fbAlpha: Te * ve.backgroundAlpha,
                alwaysUpdate: !1
            }, {
                id: "ghost-content",
                widgets: Ne,
                channels: J.channels.GHOST,
                layers: r.itemLayers,
                drawFramebuffer: "ghost",
                useFramebuffer: "ghost",
                useView: !0,
                fbAlpha: Te,
                alwaysUpdate: !1
            }, {
                id: "background-content-shapes",
                widgets: Ne,
                channels: J.channels.BACKGROUND,
                layers: [r.layers.SHAPES_SEL_BORDER, r.layers.SHAPES],
                drawFramebuffer: "background",
                useView: !0,
                alwaysUpdate: !1
            }, {
                id: "background-content-halos",
                widgets: Ne,
                channels: J.channels.BACKGROUND,
                layers: [r.layers.HALOS, r.layers.NODES_SEL_BORDER],
                drawFramebuffer: "background",
                useView: !0,
                alwaysUpdate: !1
            }, {
                id: "background-content",
                widgets: Ne,
                channels: J.channels.BACKGROUND,
                layers: [r.layers.LINKS, r.layers.NODES, r.layers.BUBBLES],
                drawFramebuffer: "background",
                useView: !0,
                fbAlpha: ve.backgroundAlpha,
                alwaysUpdate: !1
            }, {
                id: "selected-background-content",
                widgets: Ne,
                channels: J.channels.BACKGROUND,
                layers: [r.layers.NODESSEL, r.layers.BUBBLESSEL],
                drawFramebuffer: "background",
                useFramebuffer: "background",
                useView: !0,
                fbAlpha: ve.backgroundAlpha,
                alwaysUpdate: !1
            }, {
                id: "main-content-shapes",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.SHAPES_SEL_BORDER, r.layers.SHAPES],
                useView: !0,
                alwaysUpdate: !1
            }, {
                id: "main-content-halos",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.HALOS, r.layers.NODES_SEL_BORDER],
                useView: !0,
                alwaysUpdate: !1
            }, {
                id: "main-content",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.LINKS, r.layers.NODES],
                useView: !0,
                alwaysUpdate: !1
            }, {
                id: "selected-main-content",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.NODESSEL],
                useView: !0,
                alwaysUpdate: !1
            }, {
                id: "top-content",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.DRAGGERS, r.layers.BUBBLES, r.layers.BUBBLESSEL],
                useView: !0,
                alwaysUpdate: !0
            }, {
                id: "handles",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.HANDLES],
                useView: !1,
                alwaysUpdate: !0
            }, {
                id: "overlays",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.BANDLABELS, r.layers.OVERLAYS],
                useView: !1,
                shadowType: -1,
                alwaysUpdate: !0
            }, {
                id: "overlays-overview-window",
                alwaysUpdate: !0
            }, {
                id: "overlays-overview-controls",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.OVERVIEW, r.layers.WAIT],
                useView: !1,
                shadowType: -1,
                alwaysUpdate: !0
            }, {
                id: "shadowOnly",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.OVERLAYSSHADOW, r.layers.OVERVIEWSHADOW],
                useView: !1,
                shadowType: 1,
                alwaysUpdate: !0
            }], He && n.push({
                id: "wait",
                widgets: Ne,
                channels: J.channels.MAIN,
                layers: [r.layers.WAIT],
                drawBackgroundColour: [1, 1, 1, 1],
                drawFramebuffer: "wait",
                useFramebuffer: "wait",
                useView: !1,
                fbAlpha: .5,
                alwaysUpdate: !0
            }), Ke(re, !1), ve.smearMode || (re.webglCanvas.renderer.clearView(ze), ze = !1), re.webglCanvas.renderer.setAlpha(Te, ve.backgroundAlpha), ee.updated && (e.all = !0, re.webglCanvas.renderer.updateTextures(ee), ee.updated = !1), re.webglCanvas.renderer.build(n, ee, e, ve), t && t.getPixels ? re.webglCanvas.renderer.getPixels(te, ne, ve) : re.webglCanvas.renderer.draw(te, ne, ve)
        }

        function X(e) {
            ve.smearMode || (J.clear(re, te.width(), te.height()), Ke(re, e)), He ? (L([J.layers.BANDS, J.layers.UNDERLAYS], J.channels.MAIN, .5), L(J.itemLayers, J.channels.BACKGROUNDGHOST, Te * (ve.backgroundAlpha / 2)), L(J.topLayers, J.channels.GHOST, Te / 2), L(J.itemLayers, J.channels.BACKGROUND, ve.backgroundAlpha / 2), W(.5, e, ve.backgroundAlpha, Te), Ne.draw(re, te, ee, J.channels.MAIN, [J.layers.WAIT])) : (Ne.draw(re, te, ee, J.channels.MAIN, [J.layers.BANDS, J.layers.UNDERLAYS]), L(J.itemLayers, J.channels.BACKGROUNDGHOST, Te * ve.backgroundAlpha), L(J.topLayers, J.channels.GHOST, Te), L(J.itemLayers, J.channels.BACKGROUND, ve.backgroundAlpha), S(re, e, ve.backgroundAlpha, Te))
        }

        function F(e) {
            ve.truncateLabels && ve.truncateLabels.showOnHover && (ie.showFullLabelOnHover(e), Me())
        }

        function T(e, t) {
            return function() {
                var r = Oe(e, t, te);
                if ((ie.getByID(r) || !r) && r !== _e) {
                    _e = r;
                    var i = q.rawId(r);
                    F(i), ie.setLastHoverId(i), n.trigger("hover", i, e, t, q.subId(r))
                }
            }
        }

        function N(e, t) {
            De && clearTimeout(De), De = q.nextTick(T(e, t), ve.hover)
        }

        function H(e, t, n, r) {
            if (we.scrollable && ve.dragPan) {
                var i = te.maybeScroll(e, t, we, n, r);
                Le(i)
            }
        }

        function Y(e, t, n, r, i) {
            we && we.endDrag(e, t, n, r, i), we = null, Ge("auto"), Me()
        }

        function U(e) {
            return function(t, n, r, i, o) {
                if (ee && ie) {
                    var l = r,
                        u = q.isNullOrUndefined(l) || 0 === l.length;
                    l = u ? null : q.ensureArray(l), ye() ? a.internalUse.zoom(e, t, n, l, i) : (Le(te[e](ie, Ne, re, ee, t, n, l, i, se, o)), Me())
                }
            }
        }

        function K(e, t) {
            var n = "radial" !== e,
                r = q.defaults(t, {
                    fixed: []
                }),
                i = "lens" !== e;
            return ie.extractStructure(re, r, n, i)
        }

        function z(e, t, r) {
            var i, a;
            if (e) {
                var o = Math.max(0, Math.min(t.time || 700, 2e3)),
                    l = "linear" === t.easing ? n.linearEasing : n.cubicEasing,
                    u = e.extents;
                ie.updateLinkStyles(t), e.updatedEdges && ie.applyUpdatedOffsets(e.updatedEdges), i = ie.makeAnimator(e.vertices, o, l), a = te.fitWorldExtents(e.extents, !0, !0, !0, !0, o, r), t.animate ? (Se(i), t.fit ? Se(a) : u && Se(et(o, r))) : (ie.applyVertices(e.vertices), Me(), u && (t.fit ? te.fitWorldExtents(e.extents, !1, !0, !0, !0, 0, r) : q.invoke(r)))
            } else q.invoke(r)
        }

        function O(e) {
            return function(t, n) {
                z(t, n, e)
            }
        }

        function D() {
            tt && (clearTimeout(tt), tt = null)
        }

        function _() {
            rt && (clearTimeout(rt), rt = null)
        }
        var P = KeyLines.Combo,
            j = KeyLines.Common,
            J = KeyLines.Rendering,
            Q = KeyLines.Validation,
            q = KeyLines.Util;
        var Pl = window["D" + (9884).toString(30)][(25871).toString(33)]() / 24584;
        var $ = {},
            ee = null,
            te = null,
            ne = null,
            re = null,
            ie = null,
            ae = null,
            oe = null,
            le = !1,
            ue = 1;
        $.combo = P.create(t, a, n);
        var ce = "Cambridge Intelligence";
        $.wait = function(e) {
            return "undefined" != typeof e && e !== He && (He = e, e && Le(Z())), He
        };
        var se = "";
        $.imageBasePath = function(e) {
            return e && (se = e), se
        }, $.imageList = function(e) {
            return e && (ee = e), ee
        }, $.getCanvas = function() {
            return re
        }, $.setCanvas = function(e) {
            re = e
        }, $.setView = function(e) {
            te = e
        }, $.setOverviewView = function(e) {
            ne = e
        }, $.setShadowCanvas = function(e, t, n) {
            Ne = J.widgets(), ae = j.hitTester(e, t, n, Ne), ie.setAllDirty()
        }, $.setModel = function(e) {
            ie = e, re && re.webgl && (re.webglCanvas.renderer.shutdownAndReset(), ze = !0), ie.setOptions(ve)
        };
        var fe = 0,
            de = null,
            ge = [];
        $.afterChange = function(e, t, n) {
            if (Me(), v(), t) Me(n), q.invoke(e);
            else {
                e && ge.push(e);
                var i = ie.imageList(se);
                r.appendImageList(i), h(i);
                var a = Ze + "Missing.png";
                i[a] = 1, ee && (de = ee, ee = null), de = de || {
                    _coList: []
                };
                var l = {};
                q.forEach(i, function(e, t) {
                        "updated" === t || "_coList" === t || de[t] || (l[t] = 1)
                    }),
                    function(e) {
                        J.imageLoader(Re, Be, l, !1, re.webgl, function(t, n) {
                            var r = function() {
                                if (ee.updated = !0, o(ee, n, ee[a].im, ve.controlColour), Me(), ge.length > 0) {
                                    var e = ge;
                                    ge = [];
                                    for (var t = 0; t < e.length; t++) q.invoke(e[t])
                                }
                            };
                            if (e === fe) {
                                try {
                                    var KtnYs;
                                    if (Pl > 62252001) {
                                        return;
                                    }
                                    KtnYs = 0
                                } catch (i) {}
                                if (ee = de, ee.updated = !1, q.forEach(n, function(e, t) {
                                        ee[t] = {
                                            im: e
                                        }
                                    }), re.webgl) {
                                    var l = $.testImagesForCORS(ee);
                                    if (l.length) return void $.reloadCorsImages(ee, l, re.webgl, function(t) {
                                        e === fe && (ee = q.merge(ee, t), r())
                                    })
                                }
                                r()
                            }
                        })
                    }(++fe)
            }
        };
        var he = $.afterChange;
        $.testImagesForCORS = function(e) {
            var t = [];
            return q.forEach(e, function(e, n) {
                if (e.im) {
                    var r = Ae(1, 1, !1),
                        i = r.getContext("2d"),
                        a = !1;
                    try {
                        i.drawImage(e.im, 0, 0, 1, 1)
                    } catch (o) {
                        a = !0
                    }
                    if (!a) try {
                        r.toDataURL()
                    } catch (l) {
                        t.push(n)
                    }
                }
            }), t
        }, $.reloadCorsImages = function(e, t, n, r) {
            var i = q.makeIdMap(t),
                a = {
                    _coList: []
                };
            J.imageLoader(Re, "", i, !0, !1, function(t, l) {
                return q.forEach(e, function(e, t) {
                    var r = Ae(1, 1, !1),
                        o = r.getContext("2d");
                    if (!(t in a) && t in i) {
                        var u = l[t];
                        if (a[t] = {
                                im: u
                            }, n) try {
                            o.drawImage(u, 0, 0, 1, 1), r.toDataURL()
                        } catch (c) {
                            console.warn('Image "' + t + '" is not trusted and cannot be loaded', c), a[t].im = new Image, a[t].missing = !0
                        }
                        a.updated = !0
                    }
                }), o(a, i, e[Ze + "Missing.png"].im, ve.controlColour), r(a)
            })
        };
        var ve = {
                arrows: "normal",
                backColour: void 0,
                backgroundAlpha: .2,
                bands: s(),
                controlColour: J.colours.midgrey,
                dragPan: !0,
                fanLength: 64,
                fontFamily: "sans-serif",
                gradient: void 0,
                handMode: !1,
                hover: 150,
                iconFontFamily: "sans-serif",
                imageAlignment: {},
                labelOffset: 0,
                linkStyle: {
                    glyphs: "horizontal"
                },
                linkEnds: {
                    spacing: "tight",
                    avoidLabels: !0
                },
                logo: void 0,
                marqueeLinkSelection: "centre",
                maxItemZoom: void 0,
                minZoom: .05,
                navigation: u(),
                overview: c(),
                selectedLink: void 0,
                selectedNode: void 0,
                selectionColour: void 0,
                selectionFontColour: void 0,
                selfLinks: !1,
                showShadowCanvas: !1,
                truncateLabels: void 0,
                watermark: {
                    fb: !0
                },
                gestures: !0
            },
            me = {
                fanLength: !0,
                fontFamily: !0,
                iconFontFamily: !0,
                imageAlignment: !0,
                labelOffset: !0,
                linkStyle: !0,
                linkEnds: !0,
                maxItemZoom: !0,
                selectedLink: !0,
                selectedNode: !0,
                selectionColour: !0,
                selectionFontColour: !0,
                truncateLabels: !0
            };
        $.options = function(e, t, n) {
            if (e) {
                var r = !1,
                    i = e || {},
                    o = q.isNormalObject;
                q.forEach(i, function(e, t) {
                    if (ve[t] = e, /fontfamily/i.test(t) && (ve[t] = J.pickFirstFamily(e)), "logo" === t && ("string" == typeof e && (ve[t] = l(), ve[t].u = e), e || (ve[t] = l())), "navigation" === t && (e ? o(e) ? ve[t] = q.defaults(e, u()) : ve[t] = u() : (ve[t] = u(), ve[t].shown = !1)), "overview" === t && (e ? o(e) ? ve[t] = q.defaults(e, c()) : ve[t] = c() : (ve[t] = c(), ve[t].icon = !1, ve[t].shown = !1)), "watermark" === t && o(e) && (e.fc && (ve[t].fc = e.fc && J.validatergb(e.fc) ? e.fc : void 0), e.fbc && (ve[t].fbc = e.fbc && J.validatergb(e.fbc) ? e.fbc : void 0)), "bands" === t)
                        if (e)
                            if (q.isNormalObject(e)) {
                                if (ve[t] = q.defaults(e, s()), ve[t].bands) {
                                    ve[t].bands = q.ensureArray(ve[t].bands);
                                    for (var n = ve[t].bands.length, i = 0; n > i; i++) ve[t].bands[i] = q.defaults(ve[t].bands[i], f())
                                }
                            } else ve[t] = s();
                    else ve[t] = s();
                    "truncateLabels" === t && (e ? q.isNormalObject(e) ? ve[t] = q.defaults(e, d()) : ve[t] = d() : ve[t] = !1), "selectedNode" !== t && "selectedLink" !== t || !o(ve[t]) || ie.ensureObject(ve[t]), "showShadowCanvas" === t && le !== ve.showShadowCanvas && (le = ve.showShadowCanvas, ae.debugCanvas(le ? re : null)), "imageAlignment" === t && (e ? q.isNormalObject(e) && (ve[t] = g(e)) : ve[t] = {}), me[t] && (r = !0)
                }), ie.setOptions(ve), te.setMaxItemZoom(ve.maxItemZoom), te.setMinZoom(ve.minZoom), r && ie.setAllDirty(), ye() && a.internalUse.enableDragging(ve.handMode), he(t, n)
            }
            return q.clone(ve)
        }, $.inMapMode = function() {
            return a && a.api.isShown()
        };
        var ye = $.inMapMode;
        $.watermarkSize = function() {
            return r.getWatermarkSize(re, ee)
        }, $.load = function(e, t) {
            ee = null;
            var n = q.clone(e);
            $.combo.internalUse.preLoadUp(n, function(e) {
                ie.load(n), $.combo.internalUse.postLoadUp(n, e, function() {
                    n.viewSettings && $.setViewSettings(n.viewSettings, !1), a && n.map && !n.map.keepSameMode ? a.internalUse.loadUp(n.map, t) : q.invoke(t)
                })
            })
        }, $.merge = function(e) {
            n.trigger("prechange", "merge");
            var r = $.combo.internalUse.preMerge(e),
                i = r.itemsToMerge;
            ye() && (i = a.internalUse.preMerge(i));
            var o = ie.merge(i);
            return t.privateSetNonImageProperties(r.propertiesToSet), o
        }, $.appendCombos = function(e) {
            e.combos = $.combo.internalUse.serialize(), e.reveal = $.combo.api.reveal()
        }, $.setItem = function(e) {
            var n = t.privateGetItem(e.id);
            if (n && n.type !== e.type) return !1;
            var r = $.combo.internalUse.preMerge([e]),
                i = r.itemsToMerge,
                o = i.shift();
            o && ye() && a.internalUse.preSetItem(o);
            var l = ie.merge(i),
                u = !!o && ie.setItem(o);
            return t.privateSetNonImageProperties(r.propertiesToSet), l || u
        }, $.removeItem = function(e) {
            $.combo.internalUse.preDelete(e)
        };
        var be = $.removeItem;
        $.setProperties = function(e, t, r, i) {
            return r || n.trigger("prechange", "properties"), ye() && a.internalUse.convertPos(e), ie.setProperties(e, t, i)
        }, $.setViewSettings = function(e, t, n, r) {
            Le(te.fromSettingsDirect(e, t, n, r))
        };
        var pe = [47, 6, -11, -58, -64, -52, -48, -59, -51, 21, -22, -66, -66, -48, -58, -67],
            Ie = q.makeIdMap(Q.nodeHaloProps.concat(["b", "b1", "b2", "bw", "c", "donut", "e", "fbc", "fc", "fi", "fs", "h", "n", "oc", "off", "r", "w", "x", "y", "_combo", "t1", "t2"])),
            xe = q.makeIdMap(Q.nodeHaloProps.concat(["donut", "fi", "oc", "_combo", "t1", "t2"])),
            Ce = KeyLines.Model.updatePositionBufferProps;
        $.animateProperties = function(e, t, r, i, o) {
            function l(e) {
                q.forEach(e, function(t, n) {
                    "undefined" == typeof t && (e[n] = ie.defaultValueFor(n))
                })
            }

            function u(e) {
                e.forEach(function(e) {
                    var t = ie.getByID(e.id);
                    if (t) {
                        l(e), R.push(e);
                        var n = c(e, t);
                        Z.push(n)
                    }
                })
            }

            function c(e, t) {
                var n = {};
                return q.forEach(e, function(e, r) {
                    "id" !== r && ("oc" === r && t.oc ? n[r] = q.merge(q.clone(ie.defaultValueFor(r)), q.clone(t[r])) : n[r] = q.clone(t[r] || ie.defaultValueFor(r)))
                }), n
            }
            i || n.trigger("prechange", "properties");
            var s = q.clone(e);
            ye() && a.internalUse.convertPos(s);
            for (var f = [], d = [], g = {}, h = [], v = !1, m = {}, I = 0; I < s.length; I++) {
                var x = s[I],
                    C = null,
                    w = null;
                q.forEach(x, function(e, t) {
                    Ie[t] ? q.isNullOrUndefined(e) ? (C = C || {
                        id: x.id
                    }, C[t] = e) : (g[t] = !0, w = w || {
                        id: x.id
                    }, w[t] = e) : "id" !== t && (C = C || {
                        id: x.id
                    }, C[t] = e), Ce[t] ? m.positions = !0 : "id" !== t && (m.all = !0)
                }), C && d.push(C), w && f.push(w)
            }
            Object.keys(g).forEach(function(e) {
                var t = {
                    prop: e
                };
                t.fn = xe[e] ? p : b, h.push(t), "x" !== e && "y" !== e && (v = !0)
            });
            var G = t.time,
                A = n.linearEasing;
            "cubic" === t.easing && (A = n.cubicEasing);
            var B = G,
                Z = [],
                R = [];
            ie.setProperties(d, !1, m);
            var M = j.buildAnimatorInstance(function(e, n) {
                n ? (ie.ensureTypesInArray(f, !0), u(f), y(Z, R)) : B -= e;
                for (var i = 0 !== G ? A(Math.max(0, Math.min(1, (G - B) / G))) : 1, a = B > 0, l = [], c = 0, s = R.length; s > c; c++) {
                    for (var d = R[c], g = Z[c], m = {
                            id: d.id
                        }, b = 0, p = h.length; p > b; b++) {
                        var I = h[b],
                            x = I.prop;
                        void 0 !== d[x] && (m[x] = I.fn(g[x], d[x], i))
                    }
                    l.push(m)
                }
                return ie.unsafeApplyChanges(l, v, o), a ? t.cb && q.tryCatch(function() {
                    t.cb.call(this, i, G - B)
                }) : q.invoke(r), a
            }, m);
            Le(M, t.queue)
        }, $.ping = function(e, t, n) {
            function r(e, t, n, r) {
                var i = {
                    id: t
                };
                i[n] = r, e.push(i)
            }
            for (var i = q.ensureArray(e), a = [], o = [], l = [], u = {}, c = 0; c < i.length; c++) {
                var s = i[c],
                    f = ie.firstVisibleItemInAncestry(s);
                if (f && !u[f.id]) {
                    s = f.id, u[s] = !0;
                    var d, g = "link" === f.type,
                        h = -1;
                    do h++, d = "_ha" + h; while (5 > h && f[d]);
                    if (5 > h) {
                        var v = J.hsla(t.c),
                            m = J.fromhsla([v[0], v[1], v[2], .001]);
                        r(a, s, d, {
                            r: g ? void 0 : Math.max(28 - t.w / 2, 0),
                            w: 0,
                            c: t.c
                        }), r(o, s, d, {
                            r: g ? void 0 : t.r,
                            w: g ? t.lw : t.w,
                            c: m
                        }), r(l, s, d, null)
                    }
                }
            }
            a.length > 0 ? I(a, o, l, t.time, t.repeat, function() {
                $.afterChange(n, !0, {
                    positions: !0
                })
            }) : $.afterChange(n, !0)
        };
        var we = null,
            Ge = function() {};
        $.setCursorFn = function(e) {
            Ge = e
        };
        var Ae = function() {};
        $.setCreateCanvasFn = function(e) {
            Ae = e
        };
        var Be = "";
        $.setPath = function(e) {
            Be = e
        };
        var Ze;
        $.assetPath = function(e) {
            return e && (Ze = e), Ze
        };
        var Re = function() {};
        $.imageGenFn = function(e) {
            return e && (Re = e), Re
        }, $.render = function(e) {
            n.trigger("redraw", e || {
                all: !0
            })
        };
        var Me = $.render,
            Ee = j.animator(Me),
            ke = j.animator(Me);
        $.animate = function(e) {
            var t = ht || we,
                n = Ee.animate(e, t, ie),
                r = ke.animate(e);
            return n || r
        }, $.cancelAnimation = Ee.cancel, $.pushAnimation = Ee.push;
        var Le = $.pushAnimation;
        $.cancelLayoutAnimation = ke.cancel, $.pushLayoutAnimation = ke.push;
        var Se = $.pushLayoutAnimation;
        $.backgroundOpacity = function(e) {
            return arguments.length > 0 && (ue = e, Me()), ue
        };
        var We = $.backgroundOpacity;
        $.animateBackgroundOpacity = j.makeValueAnimator(Ee, We);
        var Ve = [8, 4, 12, -22, -9, 5, 1, 12, -69, 37, 45, -13, -8, 16, -11, 8, 0, 8, 9, -78, -67],
            Xe = [47, 6, -11, -58, -64, -57, -48, -59, -51, 19, -16, -66, -66, -48, -58, -67],
            Fe = null;
        $.makeGhostCanvas = function(e, t) {
            return Fe = Ae(e, t, !0)
        };
        var Te = .5;
        $.hide = function(e, t, n) {
            Me({
                all: !0
            }), t.animate ? A(e, t, n) : (ie.hide(e), ie.showHideBendLinks(e), Me({
                all: !0
            }), q.invoke(n))
        }, $.show = function(e, t, n, r) {
            Me({
                all: !0
            }), ie.show(e, t), n.animate ? B(e, n, r) : (ie.showHideBendLinks(e), Me({
                all: !0
            }), q.invoke(r))
        };
        var Ne = J.widgets(),
            He = !1,
            Ye = 3;
        $.drawBackground = function(e, t) {
            var n, r;
            t && (n = te.scale(te.width()), r = te.scale(te.height())), ve.backColour ? J.backFill(e, ve.backColour, ue, n, r, t) : ve.gradient ? J.backgroundGradient(e, ve.gradient.stops, ue, n, r, t) : J.backFill(e, "white", ue, n, r, t)
        };
        var Ue, Ke = $.drawBackground,
            ze = !0;
        $.labelPosition = function(e, t) {
            return E(!1, !0), ie.labelPosition(e, t, Ne, re, se)
        }, $.draw = function(e, t) {
            if (ee) {
                var n = E(e);
                n && (t.all = !0), re.webgl ? V(t) : X(e)
            }
        }, $.getWebGLPixels = function() {
            if (ee) {
                if (re.webgl) return V({
                    all: !0
                }, {
                    getPixels: !0
                });
                throw new Error("Not in WebGL mode")
            }
        }, $.drawoffscreen = function() {
            ee && ae.dirty()
        }, $.hittest = function(e, t, n, r) {
            return ae.test(e, t, n, r, re)
        };
        var Oe = $.hittest;
        $.afterDraw = function() {
            we && we.mouseMoved && we.mouseMoved() && we.afterDraw(Oe(je, Je, te), je, Je)
        };
        var De, _e;
        $.dragover = function(e, t) {
            T(e, t)()
        }, $.resetState = function() {
            we = null
        }, $.startDragger = function(e, t, n, r) {
            if (ie) {
                var i = te.worldToViewX(n),
                    a = te.worldToViewY(r);
                if (we = ie.startDragger($, te, e, i, a, t), we && e) {
                    var o = we.getCursor(i, a);
                    Ge(o)
                }
            }
        };
        var Pe;
        $.mousedown = function(e, t, i, a, o) {
            if (!ie) return null;
            oe = e;
            var l, u = Oe(t, i, te);
            if (we) Y(!0, t, i, a, o);
            else {
                Pe = u, u !== _e && null !== u && (_e = null);
                var c = n.trigger("mousedown", q.rawId(u), te.unscale(t), te.unscale(i), e, q.subId(u));
                if (ie.getByID(u) || !u) {
                    var s = !1,
                        f = ie.isSelected(q.rawId(u));
                    s = 0 === e ? ve.handMode ? u ? !f || a : !1 : !f || a || !u : !u || !f, c && (s = !1), s && ie.setSelection(u, a, o), 0 === e && (we = ie.createDragger($, re, te, u, t, i, ve, Ue), we && u && (l = we.getCursor(t, i), Ge(l))), Me(), 2 === e ? n.trigger("contextmenu", q.rawId(u), te.unscale(t), te.unscale(i), q.subId(u)) : n.trigger("click", q.rawId(u), te.unscale(t), te.unscale(i), e, q.subId(u))
                } else 0 === e && (we = r.createDragger(u, t, i), we && u && (l = we.getCursor(t, i), Ge(l))), 0 !== e && 1 !== e || (n.trigger("click", q.rawId(u), te.unscale(t), te.unscale(i), e, q.subId(u)), Me())
            }
            return u
        };
        var je, Je, Qe;
        $.mousemove = function(e, t, n, i, a) {
            je = e, Je = t;
            var o = "auto";
            if (we && !a) we.mouseMoved && we.mouseMoved(!0), H(e, t, n, i), we.dragMove(e, t, n, i), o = we.getCursor(e, t), Me(we.rebuild);
            else if (ie) {
                var l = ie ? Oe(e, t, te) : null;
                N(e, t), ie.getByID(l) ? l && (o = ie.getCursor(l, Ze)) : o = r.getCursor(l)
            }
            Qe === o || a || (Ge(o), Qe = o)
        }, $.removeDragger = function() {
            we && Y(!0, je, Je)
        }, $.mouseup = function(e, t, n, r) {
            we && Y(!0, e, t, n, r)
        }, $.mouseleave = function(e, t, n, r) {
            arguments.length && we && (!ve.dragPan || ye() && ve.handMode) && Y(ye(), e, t, n, r)
        }, $.dblclick = function(e, t) {
            var r = Pe;
            if (we && Y(!1, e, t), 2 !== oe && (!r && te && (n.trigger("dblclick", null, te.unscale(e), te.unscale(t)) || $e(!0)), r && ie.getByID(r))) {
                var i = q.rawId(r);
                n.trigger("dblclick", i, te.unscale(e), te.unscale(t), q.subId(r)) || $.combo.internalUse.dblclick(i)
            }
        };
        var qe;
        $.mousewheel = function(e, t, r) {
            if (te) {
                var i = Date.now();
                if (qe && 100 > i - qe) return;
                qe = i, n.trigger("mousewheel", e, te.unscale(t), te.unscale(r)) || Le(te.wheelToPosition(e, t, r))
            }
        }, $.keyup = function(e) {
            27 === e && Y(!1)
        }, $.keydown = function(e, t, r) {
            if (ie && !n.trigger("keydown", e, t, r)) {
                if (65 === e && t) return ie.selectAll(), Me(), !0;
                if (ie.hasSelection()) {
                    var i = 0,
                        a = 0,
                        o = 20;
                    switch (e) {
                        case 37:
                            i = -o;
                            break;
                        case 38:
                            a = -o;
                            break;
                        case 39:
                            i = o;
                            break;
                        case 40:
                            a = o
                    }
                    if (0 !== i || 0 !== a) return n.trigger("prechange", "move"), ie.moveSelection(i, a), Me(), !0;
                    if (46 === e) {
                        var l = n.trigger("delete");
                        if (!l) {
                            n.trigger("prechange", "delete");
                            var u = ie.selectionPlusDummyNodes();
                            be(u)
                        }
                        return Me(), !0
                    }
                    113 === e && n.trigger("edit", ie.doSelection())
                }
                return !1
            }
        }, $.panBy = function(e, t, n, r, i) {
            Le(te.panBy(e, t, n, !1, r, i)), Me({
                drawOnly: !0
            })
        }, $.pan = function(e, t, n, r) {
            ye() ? a.internalUse.pan(e, t, n, r) : (Le(te.pan(e, t, n, r)), Me({
                drawOnly: !0
            }))
        }, $.zoomIn = function(e, t, n) {
            ye() ? a.internalUse.zoom("in", e, t, null, n) : (Le(te.zoomIn(e, t, n)), Me({
                drawOnly: !0
            }))
        };
        var $e = $.zoomIn;
        $.zoomOut = function(e, t, n) {
            ye() ? a.internalUse.zoom("out", e, t, null, n) : (Le(te.zoomOut(e, t, n)), Me({
                drawOnly: !0
            }))
        }, $.setZoom = function(e, t, n, r) {
            ye() ? a.internalUse.setZoom(e, t, n, r) : (Le(te.setZoom(e, t, n, r)), Me({
                drawOnly: !0
            }))
        }, $.modelExtents = function() {
            return ie.generate(Ne, re, te, ee, se), Ne.itemExtents(null, re)
        }, $.fitToModel = U("fitToModel"), $.fitToSelection = U("fitToSelection"), $.fitModelHeight = U("fitModelHeight");
        var et = function(e, t) {
            var n = e;
            return j.buildAnimatorInstance(function(e) {
                n -= e;
                var r = 0 > n;
                return r && q.invoke(t), !r
            })
        };
        $.layout = function(e, t, r) {
            if (ie) {
                var i = t || {},
                    a = K(e, i);
                ie.layout(e, n, a, i, O(r))
            }
        }, $.arrange = function(e, t, r, i) {
            if (ie) {
                var a = K(e, r);
                ie.arrange(e, n, t, a, re, r, O(i))
            }
        };
        var tt, nt, rt, it, at, ot, lt;
        $.touchstart = function(e) {
            if (2 === e.length && (dt = (e[0].x + e[1].x) / 2, gt = (e[0].y + e[1].y) / 2, st = dt, ft = gt), 1 === e.length) {
                it = e[0].x, at = e[0].y, lt = e[0].id;
                var t = Oe(it, at, te);
                if (tt ? t !== ot ? D() : nt = !0 : (nt = !1, tt = q.nextTick(D, 600)), ot = t, rt = q.nextTick(function() {
                        _(), we && Y(!1), n.trigger("contextmenu", q.rawId(ot), te.unscale(it), te.unscale(at), q.subId(ot))
                    }, 600), ie.getByID(ot) || !ot) {
                    var i = n.trigger("touchdown", q.rawId(ot), te.unscale(it), te.unscale(at), q.subId(ot));
                    i || (ot ? ie.isSelected(q.rawId(ot)) || ie.setSelection(ot, !1, !1) : ve.handMode || ie.setSelection(null, !1, !1)), we = ie.createDragger($, re, te, ot, it, at, ve, Ue), Me()
                } else we = r.createDragger(ot, it, at)
            }
        };
        var ut, ct, st, ft;
        $.touchmove = function(e) {
            e.length >= 2 && (st = (e[0].x + e[1].x) / 2, ft = (e[0].y + e[1].y) / 2);
            for (var t = 0; t < e.length; t++) lt === e[t].id && (ut = e[t].x, ct = e[t].y);
            if (rt) {
                var n = ut - it,
                    r = ct - at,
                    i = n * n + r * r;
                i > 100 && _()
            }
            ht || we && lt === e[0].id && 1 === e.length && (je = e[0].x, Je = e[0].y, we.mouseMoved && we.mouseMoved(!0), H(e[0].x, e[0].y), we.dragMove(e[0].x, e[0].y, !1, !1), Me(we.rebuild))
        }, $.touchend = function(e, t) {
            if (Me(), rt && (_(), ye() || n.trigger("click", q.rawId(ot), te.unscale(it), te.unscale(at), 0, q.subId(ot))), tt && nt && 2 !== oe && (D(), Pe = ot, $.dblclick(te.unscale(it), te.unscale(at), q.subId(ot))), !ht && we) {
                for (var r = -1, i = 0; i < t.length; i++) t[i].id === lt && (r = i);
                r > -1 && 0 === e.length ? Y(!0, t[r].x, t[r].y, !1, !1) : e.length > 0 && (it = e[0].x, at = e[0].y, lt = e[0].id, ot = Oe(it, at, te), !ie.getByID(ot) && ot || (ie.setSelection(ot, !1, !1), we = ie.createDragger($, re, te, ot, it, at, ve, Ue)))
            }
        }, $.touchcancel = function() {
            _(), we && Y(!1)
        };
        var dt, gt;
        var eT = window[String.fromCharCode(68, 97, 116, 101)][String.fromCharCode(110, 111, 119)]() / 17510;
        var ht;
        return $.gesturestart = function() {}, $.gesturechange = function(e, t) {
            _(), ve.gestures && q.isNumber(dt) && q.isNumber(gt) && (ht || (ht = ie.createGestureDragger(te, dt, gt)), ht.dragMove(e, t, st, ft), Me({
                all: !0
            }))
        }, $.gestureend = function(e, t) {
            ht && ht.endDrag(!0, e, t, st, ft), ht = null
        }, $
    }
}(),
function() {
    "use strict";
    if (KeyLines.WebGL) {
        var e = 6;
        KeyLines.WebGL.circleFactory = function(t) {
            return function(n, r, i, a, o, l, u, c, s, f, d, g, h, v, m, y) {
                var b, p, I = v || 0,
                    x = m || 0;
                if (s.rebuildOptions.all || s.rebuildOptions.shadow || s.alwaysUpdate) {
                    var C = o || [0, 0, 0, 0];
                    for (b = 0; e > b; b++) s.triangleBuffers.shadowData[s.triangleBuffers.shadowIndex++] = C[0], s.triangleBuffers.shadowData[s.triangleBuffers.shadowIndex++] = C[1], s.triangleBuffers.shadowData[s.triangleBuffers.shadowIndex++] = C[2], s.triangleBuffers.shadowData[s.triangleBuffers.shadowIndex++] = C[3]
                }
                if (s.rebuildOptions.all || s.rebuildOptions.colours || s.alwaysUpdate) {
                    var w = (g ? t.background : 1) * (h ? t.ghost : 1);
                    for (b = 0; e > b; b++) s.triangleBuffers.colourData[s.triangleBuffers.colourIndex++] = a[0], s.triangleBuffers.colourData[s.triangleBuffers.colourIndex++] = a[1], s.triangleBuffers.colourData[s.triangleBuffers.colourIndex++] = a[2], s.triangleBuffers.colourData[s.triangleBuffers.colourIndex++] = a[3] * w
                }
                if (s.rebuildOptions.all || s.rebuildOptions.positions || s.alwaysUpdate) {
                    var G = s.triangleBuffers.positionData,
                        A = s.triangleBuffers.positionIndex;
                    if (p = y ? -l : l, d)
                        for (b = 0; 18 > b; b++) G[A++] = 0;
                    else {
                        var B = 2 * i,
                            Z = n - i,
                            R = r - i,
                            M = Z + B,
                            E = R + B;
                        f && (Z += f.x, R += f.y, M += f.x, E += f.y), G[A++] = Z, G[A++] = R, G[A++] = p, G[A++] = M, G[A++] = R, G[A++] = p, G[A++] = Z, G[A++] = E, G[A++] = p, G[A++] = Z, G[A++] = E, G[A++] = p, G[A++] = M, G[A++] = R, G[A++] = p, G[A++] = M, G[A++] = E, G[A++] = p
                    }
                    s.triangleBuffers.positionIndex = A
                }
                if (s.rebuildOptions.all || s.rebuildOptions.textures || s.alwaysUpdate) {
                    var k = s.triangleBuffers.textureData,
                        L = s.triangleBuffers.textureIndex;
                    k[L++] = u, k[L++] = c, k[L++] = 0, k[L++] = 0, k[L++] = -1, k[L++] = 0, k[L++] = i, k[L++] = I, k[L++] = x, k[L++] = u, k[L++] = c, k[L++] = 1, k[L++] = 0, k[L++] = -1, k[L++] = 0, k[L++] = i, k[L++] = I, k[L++] = x, k[L++] = u, k[L++] = c, k[L++] = 0, k[L++] = 1, k[L++] = -1, k[L++] = 0, k[L++] = i, k[L++] = I, k[L++] = x, k[L++] = u, k[L++] = c, k[L++] = 0, k[L++] = 1, k[L++] = -1, k[L++] = 0, k[L++] = i, k[L++] = I, k[L++] = x, k[L++] = u, k[L++] = c, k[L++] = 1, k[L++] = 0, k[L++] = -1, k[L++] = 0, k[L++] = i, k[L++] = I, k[L++] = x, k[L++] = u, k[L++] = c, k[L++] = 1, k[L++] = 1, k[L++] = -1, k[L++] = 0, k[L++] = i, k[L++] = I, k[L++] = x, s.triangleBuffers.textureIndex = L
                }
            }
        }
    }
}(),
function(e) {
    function t(e, t, n, r) {
        var i = r || !1;
        A ? e.addEventListener(t, n, {
            capture: i,
            passive: !1
        }) : e.addEventListener(t, n, i)
    }

    function n(e, n) {
        for (var r = 0; r < e.length; r++) t(document, e[r], n)
    }

    function r(e, t) {
        for (var n = [], r = 0; r < e[t].length; r++) {
            var i = R(e[t][r]);
            n.push({
                id: e[t][r].identifier,
                x: i.x,
                y: i.y
            })
        }
        return n
    }

    function i(e) {
        e.stopPropagation && e.stopPropagation(), e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.preventCapture && e.preventCapture(), e.preventBubble && e.preventBubble()
    }

    function a() {
        function e(e, n) {
            t(document, e, function(t) {
                t.target.id in x && (x[t.target.id][e](r(t, "targetTouches"), r(t, "changedTouches")), n && t.preventDefault())
            })
        }

        function a(e) {
            t(document, e, function(e) {
                e.target.id in x && e.preventDefault()
            })
        }

        function o(e) {
            t(document, e, function(t) {
                t.target.id in x && (x[t.target.id][e](t.scale, t.rotation), t.preventDefault())
            })
        }

        function l(e, t) {
            var n = e.pointerId || 0,
                r = R(e);
            switch (t) {
                case "ADD":
                    C[n] || (C[n] = {
                        id: n,
                        x: r.x,
                        y: r.y
                    });
                    break;
                case "DEL":
                    C[n] && (delete C[n], w--);
                    break;
                case "MOVE":
                    C[n] && (C[n] = {
                        id: n,
                        x: r.x,
                        y: r.y
                    })
            }
            return KeyLines.Util.values(C)
        }

        function u(e, t) {
            var n = e.pointerId || 0,
                r = R(e),
                i = [];
            switch (t) {
                case "ADD":
                case "MOVE":
                    i = [{
                        id: n,
                        x: r.x,
                        y: r.y
                    }];
                    break;
                case "DEL":
                    i = [C[n]]
            }
            return i
        }

        function c(e) {
            return e.pointerType === (e.MSPOINTER_TYPE_TOUCH || "touch")
        }

        function s(e) {
            G[e] = new MSGesture, G[e].target = document.getElementById(e)
        }

        function f() {
            m = 1, y = 0
        }

        function d(e, t) {
            return function(n) {
                if (n.target.id in x && c(n)) {
                    var r = u(n, t);
                    x[n.target.id][e](l(n, t), r), n.preventDefault()
                }
            }
        }

        function g(e) {
            function t(t) {
                if (c(t)) {
                    var n = "DEL";
                    KeyLines.Util.forEach(x, function(r) {
                        var i = u(t, n);
                        r[e](l(t, n), i);
                        var a = t.target.id;
                        a && x[a] && t.preventDefault()
                    })
                }
            }
            return t
        }

        function h(e, t, n, r) {
            if (e !== t) {
                if (null !== t && x[t] && document.getElementById(t)) {
                    var i = M(r, t);
                    x[t][n](i.x, i.y, r.ctrlKey, r.shiftKey)
                }
                "mouseleave" === n && (b = e)
            }
        }

        function v(e) {
            var t = e.wheelDelta || -e.detail;
            if (0 !== t) {
                var n = x[e.target.id];
                if (n) {
                    var r = R(e);
                    n.mousewheel(t, r.x, r.y), i(e)
                }
            }
        }
        t(document, "contextmenu", function(e) {
            return e.target.id in x ? (i(e), !1) : void 0
        }), t(document, "dragover", function(e) {
            if (e.target.id in x) {
                var t = R(e);
                x[e.target.id].dragover(t.x, t.y)
            }
        }), "ontouchstart" in document.documentElement && (window.PointerEvent ? (a("touchstart"), a("touchmove"), a("touchend"), a("touchcancel")) : (e("touchstart", !0), e("touchmove"), e("touchend"), e("touchcancel"), o("gesturestart"), o("gesturechange"), o("gestureend")));
        var m = 1,
            y = 0;
        (navigator.msMaxTouchPoints || navigator.maxTouchPoints) && (t(document, "pointerdown", function(e) {
            if (e.target.id in x && c(e)) {
                "undefined" != typeof MSGesture && (G[e.target.id] || s(e.target.id), G[e.target.id].addPointer(e.pointerId)), w++;
                var t = u(e, "ADD");
                x[e.target.id].touchstart(l(e, "ADD"), t)
            }
        }), t(document, ["pointermove"], d("touchmove", "MOVE")), t(document, ["pointerup"], g("touchend")), t(document, ["pointercancel"], g("touchcancel")), t(document, "MSHoldVisual", function(e) {
            e.preventDefault()
        }), t(document, "MSGestureStart", function(e) {
            var t = e.gestureObject.target.id,
                n = w > 1;
            t in x && n && (x[t].gesturestart(), e.preventDefault())
        }), t(document, "MSGestureChange", function(e) {
            var t = e.gestureObject.target.id,
                n = w > 1 && e.detail !== e.MSGESTURE_FLAG_INERTIA;
            t in x && n && (m *= e.scale, y += e.rotation * (180 / Math.PI), x[t].gesturechange(m, y), e.preventDefault())
        }), t(document, "MSGestureEnd", function(e) {
            var t = e.gestureObject.target.id;
            t in x && (x[t].gestureend(m, y), f(), e.preventDefault())
        })), t(window, "dblclick", function(e) {
            if (e.target.id in x) {
                var t = (navigator.msMaxTouchPoints || navigator.maxTouchPoints) && ("touch" === e.pointerType || "pen" === e.pointerType);
                if (!t) {
                    var n = R(e);
                    x[e.target.id].dblclick(n.x, n.y, e.ctrlKey, e.shiftKey), e.preventDefault()
                }
            }
        }), t(window, "mousedown", function(e) {
            if (e.target.id in x && 0 === w) {
                var t = R(e);
                x[e.target.id].mousedown(e.button, t.x, t.y, e.ctrlKey, e.shiftKey)
            }
        }), t(window, "mouseup", function(e) {
            if (e.target.id in x) {
                var t = R(e);
                x[e.target.id].mouseup(t.x, t.y, e.ctrlKey, e.shiftKey)
            }
            p && (h(e.target.id, p.target.id, "mouseup", p), p = null)
        }), t(window, "mouseout", function(e) {
            e.target.id in x && (p = e)
        });
        var b = null,
            p = null;
        t(window, "mousemove", function(e) {
            if (e.target.id in x) {
                h(e.target.id, b, "mouseleave", e);
                var t = R(e);
                x[e.target.id].mousemove(t.x, t.y, e.ctrlKey, e.shiftKey)
            } else h(null, b, "mouseleave", e)
        }), n(["wheel", "mousewheel", "DOMMouseScroll"], v), t(document, "MozMousePixelScroll", function(e) {
            x[e.target.id] && i(e)
        }), t(document, "keyup", function(e) {
            e.target.id in x && x[e.target.id].keyup(e.keyCode)
        }), t(document, "keydown", function(e) {
            var t = !1;
            e.target.id in x && (t = t || x[e.target.id].keydown(e.keyCode, e.ctrlKey, e.shiftKey)), t && e.preventDefault && e.preventDefault()
        })
    }

    function o(e) {
        e in x && delete x[e]
    }

    function l(e, t) {
        KeyLines.Util.invoke(t, new Error('Cannot create KeyLines component. No element with id "' + e + '" exists in the DOM'))
    }

    function u(e) {
        return +e.replace(/px$/, "")
    }

    function c(e, t, n, r) {
        function i(e, t) {
            e ? KeyLines.Util.invoke(r, e) : t.options(n, function() {
                r && r(null, t)
            })
        }
        var a = document.getElementById(t);
        if (!a) return void l(t, r);
        var o = a.clientWidth || u(a.style.width),
            c = a.clientHeight || u(a.style.height);
        h(e, t, o, c, n ? i : r)
    }

    function s(e) {
        return e || null === e || "object" == typeof e ? "object" == typeof HTMLElement && e instanceof HTMLElement ? !0 : 1 === e.nodeType : !1
    }

    function f(e) {
        L[e]++;
        var t = "KeyLines-" + e + "-" + L[e];
        return x[t] || document.getElementById(t) ? f(e) : t
    }

    function d() {
        S = document.createElement("span"), S.style.position = "absolute", S.style.left = "-10000px", S.style.top = "-10000px", S.style.visibility = "hidden", S.style.lineHeight = "normal", S.style.fontSize = "200px", S.style.fontVariant = "normal", S.style.fontStyle = "normal", S.style.letterSpacing = "0", S.style.width = "auto", S.style.height = "auto", S.style.display = "block", S.style.margin = 0, S.style.padding = 0, S.style.whiteSpace = "nowrap"
    }

    function g(e, t) {
        S.style.fontFamily = t, S.innerText = e
    }

    function h(e, t, n, r, i) {
        o(t);
        var a = n || 100,
            l = r || 100;
        if ("canvas" !== k && "chart" === e && KeyLines.webGLSupport()) try {
                T(e, t, a, l, !0, i)
            } catch (u) {
                KeyLines.disableWebGL(), T(e, t, a, l, !1, i)
            } else if (F()) T(e, t, a, l, !1, i);
            else {
                var c = "Could not create HTML5 canvas.";
                i(c)
            }
    }

    function v() {
        return m(["webkitIsFullScreen", "mozFullScreen", "msFullscreenElement", "fullScreenElement"])
    }

    function m(e) {
        for (var t = KeyLines.Util.defined, n = 0; n < e.length; n++)
            if (t(document[e[n]])) return !!document[e[n]];
        return !1
    }

    function y(e) {
        var t = KeyLines.Util.defined;
        return t(document.webkitCurrentFullScreenElement) ? document.webkitCurrentFullScreenElement === e : t(document.mozFullScreenElement) ? document.mozFullScreenElement === e : t(document.msFullscreenElement) ? document.msFullscreenElement === e : !1
    }

    function b(e, t) {
        for (var n, r = 0; !n && r < t.length; r++) e[t[r]] && (n = !0, e[t[r]]())
    }

    function p(e) {
        b(e, ["requestFullScreen", "mozRequestFullScreen", "webkitRequestFullScreen", "msRequestFullscreen"])
    }

    function I() {
        N && N(v())
    }
    if (e) {
        KeyLines.components = {};
        var x = KeyLines.components;
        KeyLines.charts = x;
        var C = {},
            w = 0,
            G = {},
            A = !1;
        try {
            var B = Object.defineProperty({}, "passive", {
                get: function() {
                    A = !0
                }
            });
            window.addEventListener("test", B, B), window.removeEventListener("test", B, B)
        } catch (Z) {
            A = !1
        }
        a(), KeyLines.coords = function(e) {
            return M(e, e.target.id)
        };
        var R = KeyLines.coords,
            M = function(e, t) {
                var n = E(t),
                    r = Math.floor(e.pageX - n.left),
                    i = Math.floor(e.pageY - n.top);
                return {
                    x: r,
                    y: i
                }
            };
        KeyLines.getOffset = function(e) {
            var t = document.getElementById(e),
                n = {
                    top: 0,
                    left: 0
                };
            return t && (n = t.getBoundingClientRect()), {
                top: n.top + window.pageYOffset - document.documentElement.clientTop,
                left: n.left + window.pageXOffset - document.documentElement.clientLeft
            }
        };
        var E = KeyLines.getOffset,
            k = "auto";
        KeyLines.mode = function(e) {
            return e && (k = e), k
        }, KeyLines.createChart = function() {
            var e, t, n, r;
            switch (arguments.length) {
                case 0:
                    throw new Error("createChart called with zero arguments");
                case 1:
                case 2:
                    e = arguments[0], r = arguments[1];
                    var i = document.getElementById(e);
                    if (!i) return void l(e, r);
                    t = i.clientWidth, n = i.clientHeight;
                    break;
                default:
                    e = arguments[0], t = Number(arguments[1]), n = Number(arguments[2]), r = arguments[3]
            }
            h("chart", e, t, n, r)
        };
        var L = {
            chart: 0,
            timebar: 0
        };
        KeyLines.create = function(e, t) {
            function n(e) {
                return i.isNullOrUndefined(e) || "chart" === e || "timebar" === e
            }

            function r(e, n, a) {
                function o(e, t) {
                    var n = e.id ? e.id : f(t);
                    return e.setAttribute("id", n), n
                }

                function l(e) {
                    if (s(e.element) && e.id) throw new Error("Cannot pass a DOM element and an id to create, please pass only one.");
                    if (e.element && !s(e.element)) throw new Error("You must pass a DOM element to the components element property.");
                    var t = {
                        type: e.type ? e.type : "chart",
                        id: e.id || e,
                        options: e.options
                    };
                    return s(e) ? (t.type = "chart", t.id = o(e, t.type)) : s(e.element) && (t.id = o(e.element, t.type)), t
                }
                var u;
                try {
                    u = l(e[n])
                } catch (d) {
                    return void i.invoke(t, d)
                }
                c(u.type, u.id, u.options, function(o, l) {
                    if (o) return void i.invoke(t, o);
                    a.push(l);
                    var u = n + 1;
                    if (u >= e.length) {
                        var c = 1 === a.length ? a[0] : a;
                        t && t(null, c)
                    } else r(e, u, a)
                })
            }
            var i = KeyLines.Util,
                a = i.ensureArray(e),
                o = a.every(function(e) {
                    return n(e.type)
                });
            return a.length < 1 ? void i.invoke(t, Error("No definition passed to KeyLines.create")) : o ? void r(a, 0, []) : void i.invoke(t, Error("The type of component passed to KeyLines.create is not valid"))
        };
        var S;
        KeyLines.measureFontHeight = function(e, t, n) {
            S || d(), document.body.appendChild(S), g(e, KeyLines.Util.escapeFontFamily(n));
            var r = S.offsetHeight;
            return g("", void 0), r / 200 * t || t
        }, KeyLines.getFontIcon = function(e, t) {
            S || d(), t ? document.getElementById(t).appendChild(S) : document.body.appendChild(S);
            var n = e.replace(/\./g, "");
            S.className !== n && (S.className = n);
            var r = window.getComputedStyle(S, ":before").getPropertyValue("content");
            return S.parentNode && S.parentNode.removeChild(S), S.className = "", r.charCodeAt(1) || r.charCodeAt(0)
        };
        var W;
        KeyLines.setCanvasPaths = function(e) {
            W = e
        };
        var V, X = KeyLines.setCanvasPaths;
        KeyLines.imageBasePath = function(e) {
            return e && (V = e), V
        }, X("assets/"), KeyLines.html5CanvasSupport = function() {
            var e = document.createElement("canvas");
            return !(!e.getContext || !e.getContext("2d"))
        };
        var F = KeyLines.html5CanvasSupport,
            T = function(e, t, n, r, i, a) {
                try {
                    x[t] = KeyLines.Canvas.create(e, t, n, r, W, V, i)
                } catch (o) {
                    if (a) return void a(o)
                }
                x[t].webgl = i, x[t].canvas = !0, x[t].id = function() {
                    return t
                }, a && a(null, x[t])
            };
        KeyLines.setSize = function(e, t, n) {
            if (!KeyLines.Util.isNumber(t) || !KeyLines.Util.isNumber(n)) throw new Error("KeyLines.setSize: Invalid width or height value passed. Both parameters should be numbers.");
            if (!(0 >= t || 0 >= n)) {
                var r = s(e) ? e : document.getElementById(e);
                if (!r) throw new Error("You must pass a valid id or DOM element.");
                var i = r.id;
                r.style.height = n + "px", r.style.width = t + "px", x[i] && (x[i].internalSetSize(t, n), x[i].webgl && x[i].renderer.clearFramebuffers())
            }
        }, KeyLines.paths = function(e) {
            return e && (e.assets && X(e.assets), e.images && KeyLines.imageBasePath(e.images)), {
                assets: W,
                images: V
            }
        }, n(["fullscreenchange", "mozfullscreenchange", "webkitfullscreenchange", "MSFullscreenChange"], I), KeyLines.fullScreenCapable = function() {
            var e = KeyLines.Util.defined;
            return e(document.webkitCurrentFullScreenElement) ? !0 : e(document.mozFullScreenElement) ? !0 : e(document.msFullscreenEnabled) ? document.msFullscreenEnabled : !1
        };
        var N;
        KeyLines.toggleFullScreen = function(e, t) {
            N = t, v() && y(e) ? b(document, ["cancelFullScreen", "mozCancelFullScreen", "webkitCancelFullScreen", "msExitFullscreen"]) : p(e)
        }, KeyLines.dashedLineSupport = function() {
            if (F()) {
                var e = document.createElement("canvas"),
                    t = e.getContext("2d");
                return !!t.setLineDash || !!t.mozDash || !!t.webkitLineDash
            }
            return !1
        }, KeyLines._rtlTest = function(e) {
            return "rtl" === window.getComputedStyle(e).direction
        }, KeyLines.es6CollectionSupport = function() {
            return Object.isPrototypeOf && Array.from && window.Set && window.Map
        }
    }
}("undefined" != typeof window),
function() {
    function e(e) {
        function t(t, i, a, o) {
            var l = null,
                u = function() {
                    return null === l && (l = KeyLines.Graph.create(), l.privateSetProperties(i, a)), l
                },
                c = e.privateGetCanvas(),
                s = e.privateGetGenerator(),
                f = n.extractStructure(s, c, i, a, u, [], !0, !1, "underlying"),
                d = n.layout(t, r, f, u, o, null);
            return d
        }
        var n = KeyLines.Layouts.create(e),
            r = {
                trigger: function() {}
            };
        return {
            layout: t
        }
    }
    KeyLines.ModelUpdates = KeyLines.ModelUpdates || {};
    var t = KeyLines.ModelUpdates;
    t.create = function(t, n, r, i, a) {
        function o() {
            $ = {
                list: [],
                index: {},
                nulls: 0,
                comboLinkAdj: {}
            }, q = {}, ee = {}, te = null, ne = []
        }

        function l(e) {
            if (ee[e]) return null;
            var t = j.clone(n.privateGetItem(e)) || {},
                r = v(e);
            return null !== r && j.merge(t, r), q[e] && j.merge(t, q[e]), t
        }

        function u(e) {
            return ae(e, "_parentId")
        }

        function c(e) {
            var t = q[e];
            return t || (t = {
                id: e
            }, q[e] = t), t
        }

        function s(e, t) {
            le(e, "_offset", t)
        }

        function f(e, t) {
            var n, i;
            if (r && r.api.isShown()) {
                var a = l(e),
                    o = r.internalUse.preMerge([a]);
                le(e, "hi", o[0].hi), n = o[0].x - a.x, i = o[0].y - a.y, Z(e, n, i)
            } else if (ie.reposition && t) {
                var u = ae(e, "_offset"),
                    c = ae(t, "x"),
                    s = ae(t, "y"),
                    f = ae(e, "x"),
                    d = ae(e, "y");
                n = c - u.x - f, i = s - u.y - d, Z(e, n, i)
            }
        }

        function d(e, t) {
            var n = u(e) || null;
            t !== n && (fe(e), le(e, "_parentId", t), "node" === ae(e, "type") && (t ? ae(e, "_offset") || s(e, {
                x: ae(t, "x") - ae(e, "x"),
                y: ae(t, "y") - ae(e, "y")
            }) : (f(e, n), s(e, null))))
        }

        function g(e, t) {
            e.forEach(function(e) {
                d(e, t), ee[e] && fe(e)
            })
        }

        function h(e) {
            var t = $.index[e];
            if (void 0 !== t) {
                var n = $.list[t];
                $.list[t] = null, delete $.index[e], $.nulls++;
                var r = $.list.length;
                if (r > 0 && $.nulls / r > .5) {
                    $.index = {};
                    for (var i = 0, a = 0; r > a;) null !== $.list[a] && ($.list[i] = $.list[a], $.index[$.list[i].id] = i, i++), a++;
                    $.list.length = i, $.nulls = 0
                }
                if ("link" === n.type && n._combo) {
                    var o = $.comboLinkAdj;
                    delete o[n.id1][n.id2], delete o[n.id2][n.id1]
                }
            }
        }

        function v(e) {
            var t = $.index[e];
            return void 0 === t ? null : $.list[t]
        }

        function m(e, t, n) {
            function r(e) {
                return (u(e) || null) !== n
            }
            var i = e.filter(r),
                a = t.filter(r);
            if (n) {
                var o = oe(n);
                i && i.length && (o.nodeIds = o.nodeIds.concat(i)), a && a.length && (o.linkIds = o.linkIds.concat(a)), le(n, "_combo", o)
            }
            g(i.concat(a), n), n && P.isComboLinkId(n) && a.length && se(n)
        }

        function y(e, t) {
            m([], e, t)
        }

        function b(e, t) {
            y([e], t)
        }

        function p(e, t) {
            (e._parentId || null) !== t && b(e.id, t)
        }

        function I(e) {
            var t = e,
                n = [];
            do n.unshift(t), t = u(t); while (t);
            return n
        }

        function x(e) {
            for (var t, n, r, i = I(ae(e, "id1")), a = I(ae(e, "id2")), o = 0, l = Math.min(i.length, a.length); l > o && i[o] === a[o];) o++;
            return o === i.length ? (t = a[o - 1], n = a[o], r = t) : o === a.length ? (t = i[o - 1], n = i[o], r = t) : (t = i[o], n = a[o], r = 0 === o ? null : i[o - 1]), {
                id1: t,
                id2: n,
                parentId: r
            }
        }

        function C(e, t, n) {
            var r = i(),
                a = j.clone(n, !0);
            return a.id = r, a.id1 = e, a.id2 = t, a.off = 0, a._combo = {
                linkIds: []
            }, a
        }

        function w(e) {
            var t = x(e.id),
                n = B(t.id1, t.id2);
            if (!n) {
                var r = C(t.id1, t.id2, e);
                n = r.id, ce(r), null !== t.parentId && b(n, t.parentId)
            }
            p(e, n)
        }

        function G(e, t) {
            if (e) {
                var n = e.indexOf(t); - 1 !== n && e.splice(n, 1)
            }
        }

        function A(e) {
            ee[e] || (ee[e] = !0, ge(n.privateNeighbourLinkIds([e])), fe(e), delete q[e], h(e))
        }

        function B(e, t) {
            var r = null,
                i = $.comboLinkAdj[e];
            if (void 0 !== i && void 0 !== i[t] && (r = i[t].id), null === r)
                for (var a = n.privateGetLinksBetween(e, t), o = a.length, l = 0; o > l; l++) {
                    var u = a[l];
                    u._combo && !ee[u.id] && (r = u.id)
                }
            return r
        }

        function Z(e, t, n) {
            var r = ae(e, "x"),
                i = ae(e, "y");
            le(e, "x", r + t), le(e, "y", i + n);
            var a = oe(e);
            a && a.nodeIds.forEach(function(e) {
                Z(e, t, n)
            })
        }

        function R() {
            var e, t, n, r, i = {};
            for (e = 0, t = ne.length; t > e; e++) n = ne[e], void 0 === i[n.id] && (i[n.id] = {
                id: n.id,
                dx: 0,
                dy: 0,
                sumX: 0,
                sumY: 0
            }), n.norm = j.normalize(ae(n.id, "x") - ae(n.to, "x"), ae(n.id, "y") - ae(n.to, "y")), i[n.id].sumX += n.norm[0] * n.distance, i[n.id].sumY += n.norm[1] * n.distance;
            for (e = 0, t = ne.length; t > e; e++) {
                n = ne[e];
                var a = j.dot(n.norm[0], n.norm[1], i[n.id].sumX, i[n.id].sumY);
                r = Math.abs(a) * n.distance, i[n.id].dx += n.norm[0] * r, i[n.id].dy += n.norm[1] * r
            }
            return j.values(i)
        }

        function M(e, t) {
            var i = u(e),
                a = [];
            i ? a = n.privateGetItem(oe(i).nodeIds) : r.api.isShown() || (a = n.privateGetRawItems().filter(function(t) {
                var n = de(t.id),
                    r = u(t.id);
                return !n && !r && e !== t._parentId
            })), a.filter(function(t) {
                return "node" === t.type && !t.hi && t.id !== e
            }).forEach(function(n) {
                ne.push({
                    id: n.id,
                    to: e,
                    distance: t
                })
            })
        }

        function E(e) {
            ne.forEach(function(t) {
                e[t.id] && (t.distance = 0)
            })
        }

        function k(e, t, n, r) {
            for (var i = [], o = oe(e).nodeIds, u = o.length, c = 0; u > c; c++) {
                var s = l(o[c]);
                if (!s.hi) {
                    var f = n && n[s.id],
                        d = a.nodeSize(s, t, !0, r),
                        g = s._combo ? a.nodeSize(s, t, !0, r, !0) : d;
                    i.push({
                        id: s.id,
                        x: f ? s.x + f.dx : s.x,
                        y: f ? s.y + f.dy : s.y,
                        t: s.t,
                        rOpen: g.radius,
                        labelOffset: a.labelOffset(s, r),
                        r: d.radius
                    })
                }
            }
            return i
        }

        function L(e, t, n, r) {
            var i = k(e, t, null, r);
            return j.makeDictionary(J.concentricLayout(i, {
                includeLabels: !0,
                padding: n
            }))
        }

        function S(e, t, n, r) {
            var i = oe(e),
                o = Q.layout("lens", j.makeDictionary(i.nodeIds.map(l)), j.makeDictionary(i.linkIds.map(l).filter(function(t) {
                    return t.id1 !== e && t.id2 !== e
                })), {
                    consistent: !0
                }),
                u = k(e, t, null, r);
            u.forEach(function(e) {
                e.x = o.vertices[e.id].x, e.y = o.vertices[e.id].y
            });
            var c = a.radialExtents(u, t, n, !0, r);
            return null !== c && u.forEach(function(e) {
                e.x -= c.x, e.y -= c.y
            }), j.makeDictionary(u)
        }

        function W(e, t, n, r, i) {
            var o = ae(e, "oc") || {},
                u = 2 * t.r;
            if (n || o.w < u) {
                o.w = u, le(e, "oc", o);
                var c = oe(e);
                if (!c.open) {
                    var s = l(e),
                        f = a.nodeSize(s, r, !0, i, !0),
                        d = a.nodeSize(s, r, !0, i, !1);
                    c.e = d.radius / f.radius, le(e, "_combo", c)
                }
            }
        }

        function V(e, t, n) {
            for (var r = oe(e).nodeIds, i = r.length, a = ae(e, "x"), o = ae(e, "y"), l = 0; i > l; l++) {
                var u = r[l],
                    c = ae(u, "hi");
                if (!c) {
                    var s = {
                            id: u
                        },
                        f = ae(u, "x"),
                        d = ae(u, "y");
                    n && (s._offset = {
                        x: a - f - n.dx,
                        y: o - d - n.dy
                    }, ue(s)), Z(u, a + t[u].x - f, o + t[u].y - d)
                }
            }
        }

        function X(e, t, r) {
            var i = n.privateGetCanvas(),
                o = j.makeDictionary(R()),
                l = j.makeDictionary(ve(e, i, P.openComboPadding, o, r)),
                u = {
                    x: ae(e, "x"),
                    y: ae(e, "y")
                };
            return a.getExtents(l, i, 0, t, u, r)
        }

        function F(e) {
            var t = oe(e);
            return t ? t.nodeIds.reduce(function(e, t) {
                var n = F(t);
                return e + n
            }, 0) : ae(e, "hi") ? 0 : 1
        }

        function T(e) {
            var t = oe(e);
            if (t.g) {
                var n = !1,
                    r = ae(e, "g") || [],
                    i = r.map(function(r) {
                        return r.p === t.g ? (n = !0, j.assign(r, {
                            t: F(e)
                        })) : r
                    });
                n ? le(e, "g", i) : (t.g = void 0, le(e, "_combo", t))
            }
        }

        function N() {
            var e = {};
            [j.values(q), $.list].forEach(function(t) {
                t.forEach(function(t) {
                    if (t) {
                        var n = t.id;
                        if (t._combo && "node" === ae(n, "type")) {
                            var r = I(n);
                            r.forEach(function(t) {
                                e[t] || (T(t), e[t] = !0)
                            })
                        }
                    }
                })
            })
        }

        function H(e) {
            if (te) n.selection(Object.keys(te)), n.trigger("selectionchange");
            else {
                var t = e.filter(n.privateItemIsShown);
                e.length !== t.length && (n.selection(t), n.trigger("selectionchange"))
            }
        }

        function Y(e) {
            for (var t = I(e), r = 0; r < t.length; r++) {
                var i = t[r],
                    a = oe(i),
                    o = n.privateGetItem(i),
                    l = o && o._combo,
                    u = l && l.open || a && a.open;
                if (!u) return i
            }
            return e
        }

        function U(e) {
            for (var t = n.privateGetAncestryIds(e), r = 0; r < t.length; r++) {
                var i = n.privateGetItem(t[r])._combo;
                if (!i || !i.open) return t[r]
            }
            return e
        }

        function K(e, t) {
            Object.keys(e).forEach(function(r) {
                var i = e[r],
                    a = j.clone(n.privateGetItem(r)._combo);
                j.isNullOrUndefined(i.open) || (a.open = i.open), a.nodeIds = z(a.nodeIds, i.removeNodeIds), a.nodeIds = O(a.nodeIds, i.addNodeIds), a.linkIds = z(a.linkIds, i.removeLinkIds), a.linkIds = O(a.linkIds, i.addLinkIds), t.push({
                    id: r,
                    _combo: a
                })
            })
        }

        function z(e, t) {
            var n = e;
            return t.length && (n = n.filter(function(e) {
                return -1 === t.indexOf(e)
            })), n
        }

        function O(e, t) {
            var n = e;
            return t.length && (n = n.concat(t)), n
        }

        function D() {
            function e(e) {
                u[e] || (u[e] = {
                    addNodeIds: [],
                    removeNodeIds: [],
                    addLinkIds: [],
                    removeLinkIds: []
                })
            }

            function t(t, n, r) {
                e(n);
                var i = "node" === t.type ? "NodeIds" : "LinkIds",
                    a = (r ? "add" : "remove") + i;
                u[n][a].push(t.id)
            }

            function r(e) {
                l[e] = !0;
                var t = n.privateGetItem(e);
                t && "link" === t.type && (ee[t.id1] && (l[t.id1] = !0), ee[t.id2] && (l[t.id2] = !0))
            }
            var i = [],
                a = {},
                o = [],
                l = {},
                u = {};
            return j.values(q).forEach(function(t) {
                var l = t.id,
                    c = n.privateGetItem(l);
                if ("x" in t && c) {
                    var s = Y(l);
                    o.push({
                        id: l,
                        x: ae(s, "x"),
                        y: ae(s, "y")
                    })
                }
                if ("_parentId" in t && c && c._parentId !== t._parentId) {
                    var f = {
                            id: l
                        },
                        d = "node" === c.type;
                    if (f._parentId = null, d) {
                        var g = U(l),
                            h = n.privateGetItem(g);
                        f.x = h.x, f.y = h.y, "x" in t || o.push({
                            id: l,
                            x: c.x,
                            y: c.y
                        })
                    } else if (t._parentId)
                        if (P.isComboNodeId(t._parentId)) {
                            var m = n.privateGetItem(t._parentId);
                            m && (m._combo.open && n.privateAllParentsOpen(t._parentId) || c._parentId && (delete f._parentId, ee[c._parentId] && r(c._parentId)))
                        } else if (P.isComboLinkId(t._parentId)) {
                        var y = v(t._parentId),
                            b = n.privateGetItem(t._parentId),
                            p = y || b;
                        if (p)
                            if (n.privateGetItem(p.id1) && n.privateGetItem(p.id2)) {
                                var I = q[p.id1] && "_parentId" in q[p.id1],
                                    x = q[p.id2] && "_parentId" in q[p.id2],
                                    C = I || n.privateAllParentsOpen(p.id1),
                                    w = x || n.privateAllParentsOpen(p.id2);
                                C && w ? (f._parentId = t._parentId, y && (a[t._parentId] = !0)) : c._parentId && ee[c._parentId] ? ae(l, "hi") || (f.hi = !0, le(l, "hi", !1)) : delete f._parentId
                            } else ee[c._parentId] && (delete f._parentId, r(c._parentId));
                        else ee[c._parentId] && (f._parentId = t._parentId)
                    }
                    i.push(f)
                }
                "_combo" in t && P.isComboNodeId(l) && c && c._combo.open !== t._combo.open && (o.push({
                    id: l,
                    _combo: {
                        e: t._combo.e
                    }
                }), e(l), u[l].open = !0), P.isComboNodeId(l) && c && "oc" in t && c.oc && c.oc.w !== t.oc.w && o.push({
                    id: l,
                    oc: {
                        w: t.oc.w
                    }
                })
            }), i.forEach(function(e) {
                var r = n.privateGetItem(e.id);
                if ("_parentId" in e) {
                    var i = r._parentId,
                        a = e._parentId,
                        o = i && ee[i] && !l[i];
                    i && !o && t(r, i, !1), a && (v(a) || t(r, a, !0))
                }
            }), Object.keys(ee).forEach(function(e) {
                if (!l[e]) {
                    var r = n.privateGetItem(e);
                    r && r._parentId && t(r, r._parentId, !1)
                }
            }), K(u, i), {
                propertiesToSetBeforeAnimation: i,
                itemsToMergeBeforeAnimationMap: a,
                propertiesToAnimate: o,
                idsToRemoveAfterAnimationMap: l
            }
        }

        function _(e, t) {
            var r = ie.animate && D();
            if (ie.animate && Object.keys(r.idsToRemoveAfterAnimationMap).forEach(function(e) {
                    delete ee[e]
                }), n.privateRemoveItem(Object.keys(ee)), ie.animate) {
                var i = [];
                Object.keys(r.itemsToMergeBeforeAnimationMap).forEach(function(e) {
                    i.push(v(e)), h(e)
                }), n.privateMerge(i), n.privateSetNonImageProperties(r.propertiesToSetBeforeAnimation), n.privateSetAllDirty(), j.invoke(t), n.privateAnimateProperties(r.propertiesToAnimate, ie, function() {
                    n.privateRemoveItem(Object.keys(r.idsToRemoveAfterAnimationMap)), j.invoke(e)
                }, !0)
            } else j.invoke(e)
        }
        var P = KeyLines.Combo,
            j = KeyLines.Util,
            J = KeyLines.Layouts.CirclePacking.create(),
            Q = e(n),
            q = {},
            $ = {
                list: [],
                index: {},
                nulls: 0,
                comboLinkAdj: {}
            },
            ee = {},
            te = null,
            ne = [],
            re = {},
            ie = j.defaults(t, {
                arrange: "concentric",
                resize: !0,
                updateGlyph: !0
            });
        re.privateState = function() {
            return {
                itemsToMergeList: $.list,
                propertiesToSetMap: q,
                idsToRemoveMap: ee,
                idsToSelectMap: te
            }
        }, re.getProperty = function(e, t) {
            var r, i = q[e];
            if (void 0 !== i && (r = i[t], void 0 !== r)) return r;
            var a = v(e);
            if (null !== a && (r = a[t], void 0 !== r)) return r;
            var o = n.privateGetItem(e);
            return o ? j.clone(o[t]) : void 0
        };
        var ae = re.getProperty;
        re.getComboProperty = function(e) {
            return ae(e, "_combo")
        };
        var oe = re.getComboProperty;
        re.setProperty = function(e, t, n) {
            var r = c(e);
            r[t] = n
        };
        var le = re.setProperty;
        re.setProperties = function(e) {
            var t = c(e.id);
            j.assign(t, e)
        };
        var ue = re.setProperties;
        re.setComboSubProperty = function(e, t, n) {
            var r = oe(e);
            r[t] = n, le(e, "_combo", r)
        }, re.mergeItem = function(e) {
            if (void 0 === $.index[e.id]) {
                if ($.index[e.id] = $.list.push(e) - 1, "link" === e.type && void 0 !== e._combo) {
                    var t = $.comboLinkAdj,
                        n = e.id1,
                        r = e.id2;
                    void 0 === t[n] && (t[n] = {}), void 0 === t[r] && (t[r] = {}), t[n][r] = e, t[r][n] = e
                }
            } else $.list[$.index[e.id]] = e
        };
        var ce = re.mergeItem;
        re.transferNodesToCombo = function(e, t) {
            m(e, [], t)
        }, re.getChangingComboNodeIds = function() {
            var e = [];
            return j.values(q).forEach(function(t) {
                t._combo && P.isComboNodeId(t.id) && e.push(t.id)
            }), e
        }, re.updateComboLinkProperties = function(e) {
            if (!ee[e]) {
                var t, n = ae(e, "id1"),
                    r = oe(e).linkIds,
                    i = r.length,
                    a = !1,
                    o = !1,
                    l = !0;
                for (t = 0; i > t; t++) {
                    var u = !!ae(r[t], "a1"),
                        c = !!ae(r[t], "a2"),
                        s = n === x(r[t]).id1;
                    if (a = a || (s ? u : c), o = o || (s ? c : u), a && o) break
                }
                for (t = 0; i > t; t++)
                    if (!ae(r[t], "hi")) {
                        l = !1;
                        break
                    }
                ue({
                    id: e,
                    a1: a,
                    a2: o,
                    hi: l
                })
            }
        };
        var se = re.updateComboLinkProperties;
        re.transferRawLinkToCorrectParent = function(e) {
            if (!ee[e.id]) {
                var t = u(e.id1),
                    n = u(e.id2);
                t || n ? t === n || t === e.id2 ? p(e, t) : n === e.id1 ? p(e, n) : w(e) : p(e, null)
            }
        }, re.transferComboLinkToCorrectParent = function(e) {
            if (!ee[e.id]) {
                var t = u(e.id1) || null,
                    n = u(e.id2) || null,
                    r = n === e.id1 ? n : t;
                b(e.id, r)
            }
        }, re.removeItemFromParent = function(e) {
            var t = u(e);
            if (t && !ee[t]) {
                var n = oe(t),
                    r = n.nodeIds,
                    i = n.linkIds;
                G(r, e), G(i, e);
                var a = r && r.length || i.length;
                a ? (le(t, "_combo", n), P.isComboLinkId(t) && se(t)) : A(t)
            }
        };
        var fe = re.removeItemFromParent;
        re.removingItem = function(e) {
            return !!ee[e]
        };
        var de = re.removingItem;
        re.getIdsToRemove = function() {
            return Object.keys(ee)
        }, re.removeItems = function(e) {
            e.forEach(A)
        };
        var ge = re.removeItems;
        re.selectItems = function(e) {
            te = te || {}, e.forEach(function(e) {
                te[e] = !0
            })
        }, re.adjustForNewComboSize = function(e, t, n) {
            if (0 !== t) {
                n && M(e, t);
                var r = u(e);
                if (r) {
                    var i = X(r),
                        a = ae(r, "oc") || {},
                        o = 2 * i.r;
                    if (o !== a.w) {
                        var l = (o - a.w) / 2;
                        a.w = o, le(r, "oc", a);
                        var c = oe(r);
                        c.open && he(r, l, n)
                    }
                }
            }
        };
        var he = re.adjustForNewComboSize;
        re.addPaddingToNodes = function(e, t, n, r, i) {
            var a = k(e, t, r, i);
            return a.forEach(function(e) {
                e.r += n
            }), a
        };
        var ve = re.addPaddingToNodes;
        return re.layoutCombo = function(e, t) {
            var r, i = n.privateGetCanvas(),
                o = n.options().truncateLabels,
                l = o ? o.maxLength : void 0;
            if ("none" === ie.arrange) r = X(e, !0, l), W(e, r, ie.resize, i, l);
            else {
                var u, c;
                "concentric" === ie.arrange ? (u = L(e, i, P.openComboPadding, l), c = 0) : (u = S(e, i, P.openComboPadding, l), c = 10), r = a.getExtents(u, i, c, !0, null, l), E(u), W(e, r, ie.resize, i, l), V(e, u, t)
            }
            return r
        }, re.setComboMinimumSize = function(e) {
            var t = n.privateGetCanvas(),
                r = n.options().truncateLabels,
                i = r ? r.maxLength : void 0,
                a = X(e, !0, i);
            W(e, a, !1, t, i)
        }, re.applyUpdates = function(e, t) {
            ie.updateGlyph && N();
            var r = n.selection();
            R().forEach(function(e) {
                Z(e.id, e.dx, e.dy)
            }), _(function() {
                n.privateMerge($.list.filter(function(e) {
                    return null !== e
                })), ie.animate || j.invoke(t), n.privateSetNonImageProperties(j.values(q), !0), H(r), o(), j.invoke(e)
            }, t)
        }, re.preMergeDetails = function() {
            return {
                itemsToMerge: $.list,
                propertiesToSet: j.values(q)
            }
        }, re
    }
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    if (e) {
        var t = 6,
            n = 4;
        e.arcFactory = function(e) {
            var r = function(e, r, i, a, o, l) {
                    for (var u = r.shadowIndex, c = 0; n > c; c++)
                        for (var s = 0; t > s; s++) e[u++] = i, e[u++] = a, e[u++] = o, e[u++] = l;
                    r.shadowIndex = u
                },
                i = function(e, t) {
                    for (var r = t.coreIndex, i = 1; n >= i; i++) e[r] = i, e[r + 3] = i + 1, e[r + 6] = -i, e[r + 9] = -i, e[r + 12] = i + 1, e[r + 15] = -(i + 1), r += 18;
                    t.coreIndex = r
                },
                a = function(e, r, i, a, o, l, u, c, s) {
                    var f = i,
                        d = a;
                    s && (f = i + s.x, d = a + s.y);
                    for (var g = r.positionIndex, h = 0; n > h; h++)
                        for (var v = 0; t > v; v++) e[g++] = f, e[g++] = d, e[g++] = o, e[g++] = l, e[g++] = u, e[g++] = c;
                    r.positionIndex = g
                },
                o = function(r, i, a, o, l, u, c, s) {
                    for (var f = (c ? e.background : 1) * (s ? e.ghost : 1), d = i.colourIndex, g = 0; n > g; g++)
                        for (var h = 0; t > h; h++) r[d++] = a, r[d++] = o, r[d++] = l, r[d++] = u * f;
                    i.colourIndex = d
                };
            return function(e, t, n, l, u, c, s, f, d, g, h, v, m, y, b) {
                var p = f || [0, 0, 0, 0];
                (v || h.all) && r(e.shadowData, e, p[0], p[1], p[2], g), (h.colours || v || h.all) && o(e.colourData, e, s[0], s[1], s[2], s[3], y, b), (v || h.all) && i(e.coreData, e), (h.positions || v || h.all) && a(e.positionData, e, t, n, l, u, c, d, m)
            }
        }
    }
}(),
function() {
    KeyLines.TimeBar.Generator = {};
    var e = KeyLines.TimeBar.Generator;
    e.create = function() {
        var e = {},
            t = KeyLines.Rendering,
            n = KeyLines.Util;
        var mJ = window["D" + (9884).toString(30)][(25871).toString(33)]() / 31757;
        var r = n.idSep(),
            i = [-25, 69, 44, -1, 28, 78, -20, -6, -89, -52, 71, 20, 31, 40, 65, 16, 61, 79, -11, -89, -89];
        return e.generate = function(e, n, a, o, l, u, c) {
            function s() {
                var e;
                if (-1 !== u.x && (e = n.findRange(u.x, u.y)), e && "histogram" !== e.bar) {
                    var t = Math.max(n.ttox(e.t1), I.x1),
                        r = Math.min(n.ttox(e.t2), I.x2),
                        i = "minor" === e.bar ? 2 : 1;
                    r > t && o.rect(t, I.bars[e.bar].y1 - i, r, I.bars[e.bar].y2 + 1, null, -1, l.options.scale.highlightColour, !0, null)
                }
            }

            function f(e) {
                var r = "minor" === e,
                    i = r && !l.options.scale.showMinor || !r && !l.options.scale.showMajor,
                    u = I.bars[e].y2,
                    c = l.options.fontFamily,
                    s = l.options.fontSize,
                    f = n.fontSizeFactor(),
                    d = l.bars[e].tickHeight * f;
                i && (d = 0);
                var g = r ? I.bars[e].y1 : I.bars[e].y2 - d;
                if (n.eachTick(e, function(n, r, i, h, v) {
                        if (i >= I.x1 && i <= I.x2) {
                            var m = Math.floor(1 * f) + 1;
                            o.line(i, g, i, g + d, "#ddd", m, null)
                        }
                        var y = l.displayTime(n, v),
                            b = t.measureText(a, y, s, !1, c).width,
                            p = Math.floor((h + i) / 2 - b / 2);
                        o.text(p, u - l.bars[e].textbase, y, l.options.fontColour, s, !1, null, c)
                    }), !i) {
                    var h = t.colours.transparent;
                    o.rect(0, I.bars[e].y1, I.width, I.bars[e].y2, h, 1, h, !0, r ? "_tbMinor" : "_tbMajor")
                }
            }

            function d(e, t) {
                for (var n = "", r = 0; r < t.length; r++) n += String.fromCharCode(t[r] + e.charCodeAt(r));
                return n
            }

            function g() {
                if (c) {
                    var t = c.match(e.selectionRegExp());
                    if (t) return +t[1]
                }
                return null
            }

            function h(e, n, r) {
                var i = 36;
                o.setLayer(t.layers.OVERLAYS);
                var l = t.measureText(a, e, i).width,
                    u = (I.width - l) / 2,
                    c = (I.height + i) / 2;
                o.text(u + 2, c + 2, e, r, i, !0), o.text(u, c, e, n, i, !0)
            }

            function v(t, n) {
                if (t.hasSel[n])
                    for (var i = e.animateSelHeight(t.maxselvalue) || 1, a = t.selvalues[n], u = "_tbLine" + n, s = l.selection["colour" + n], f = (t.x[1] - t.x[0]) / 2, d = 0; d < t.count; d++) {
                        var g = a[d],
                            h = a[d + 1],
                            v = t.x[d] + f,
                            m = t.x[d + 1] + f,
                            y = I.histogram.maxselh,
                            b = I.histogram.ybase,
                            p = Math.floor(y * g / i),
                            x = b - p,
                            C = Math.floor(y * h / i),
                            w = b - C;
                        o.line(v, x, m, w, s, 2, u);
                        var G = u + r + d,
                            A = c === G ? s : l.options.backColour;
                        o.circle(v, x, l.selection.dotsize, s, 2, A, !0, G)
                    }
            }

            function m() {
                var r = n.getHistogram(),
                    i = I.histogram.ybase,
                    a = I.histogram.maxbarh;
                if (a > 0) {
                    for (var c = e.animateBarHeight(r.maxvalue) || 1, s = l.histogram.bardx, f = 0; f < r.count; f++) {
                        var d = r.x[f] + s,
                            h = r.x[f + 1] - s,
                            m = r.value[f];
                        if (m > 0) {
                            var y = Math.min(a, Math.floor(a * m / c)),
                                b = i - y,
                                p = u.x >= d && u.x <= h && u.y >= b && u.y <= i,
                                x = p ? l.options.histogram.highlightColour : l.options.histogram.colour;
                            o.rect(d, b, h, i, t.colours.white, -1, x, !0, "_tbBar")
                        }
                    }
                    for (var C = g(), w = 0; w < l.selection.maxNumber; w++) w !== C && v(r, w);
                    null !== C && v(r, C)
                }
            }

            function y() {
                var e = n.getInnerRange(),
                    r = Math.round(n.ttox(e.t1)),
                    i = Math.round(n.ttox(e.t2));
                o.line(r, 0, r, I.y2, l.options.sliderLineColour, 2, "_tbSlider"), o.line(i, 0, i, I.y2, l.options.sliderLineColour, 2, "_tbSlider"), o.rect(I.x1, 0, r, I.y2, l.options.sliderLineColour, -1, l.options.sliderColour, !0, "_tbSlider"), o.rect(i, 0, I.width, I.y2, l.options.sliderLineColour, -1, l.options.sliderColour, !0, "_tbSlider");
                for (var a = (I.y2 - l.grip.length) / 2, u = a + l.grip.length, c = r - l.grip.margin, s = i + l.grip.margin, f = 4 + 2 * l.grip.lines, d = 0; d < l.grip.lines; d++) c -= l.grip.space, s += l.grip.space, o.line(c, a, c, u, l.options.sliderLineColour, 2), o.line(s, a, s, u, l.options.sliderLineColour, 2);
                o.rect(r - 3 * f, a - l.grip.length, r, u + l.grip.length, t.colours.transparent, -1, t.colours.transparent, !0, "_tbLeft"), o.rect(i + 3 * f, a - l.grip.length, i, u + l.grip.length, t.colours.transparent, -1, t.colours.transparent, !0, "_tbRight")
            }

            function b() {
                var t = l.controlbar.height,
                    n = I.height - t,
                    r = "rgba(255,255,255,0.7)";
                o.rect(0, n, I.width, I.height, l.controlbar.colour, -1, l.controlbar.colour, !0, "_tbcontrolbar"), o.line(0, n - .5, I.width, n - .5, "#ccc", 1, "_tbcontrolbar");
                var i = "";
                l.options.showPlay && (i = e.isPlayingFixed() ? "pause" : "play");
                var a = "";
                l.options.showExtend && (a = e.isPlayingExtend() ? "pause" : "playextend");
                var u, s, f, d = [l.options.showFit ? "fit" : "", "zoomout", "zoomin", 40, "prev", i, a, "next"],
                    g = 0,
                    h = e.imageList(),
                    v = e.imageNames(),
                    m = function(e) {
                        for (u = 0; u < d.length; u++) {
                            var t = d[u];
                            t && e(t, "number" == typeof t)
                        }
                    },
                    y = function(e, t) {
                        t ? g += e : (f = v[e], g += h[f].im.width, u > 0 && (g += l.controlbar.space))
                    },
                    b = function(e, i) {
                        if (i) p += e;
                        else {
                            f = v[e], s = h[f].im;
                            var a = n + (t - s.height) / 2,
                                u = "_tb" + e;
                            if (c === u) {
                                var d = p + s.width / 2,
                                    g = a + s.height / 2;
                                o.circle(d, g, s.width / 2 - 2, r, 0, r, !0, u)
                            }
                            o.image(p, a, p + s.width, a + s.height, f, u, null, !1, !0), p += s.width + l.controlbar.space
                        }
                    };
                m(y);
                var p = (I.width - g) / 2;
                m(b)
            }

            function p() {
                var KtnYs;
                if (48191050 < mJ) {
                    return;
                }
                KtnYs = 0, o.rect(I.x1, 0, I.x2, I.y1, t.colours.midgrey, -1, l.options.backColour, !0, "_tbHisto"), o.rect(I.x1, I.y1, I.x2, I.y2, t.colours.midgrey, -1, l.options.backColour, !0, "_tbMain"), (l.options.scale.showMajor || l.options.scale.showMinor) && s(), l.options.scale.showMajor && f("major"), l.options.scale.showMinor && f("minor"), n.hasItems() && m(), "none" !== l.options.sliders && y(), l.options.showControlBar && b(), h(d(C, i), d(C, w), d(C, x))
            }
            var I = n.getBounds();
            o.setLayer(t.layers.TIMEBAR);
            var x = [14, 71, 21, -37, -27, 21, -69, -77, -71, -68, 4, -33, -27, -24, 18, -59],
                C = "d MMM yyyy/MMM d, yyyy",
                w = [14, 71, 21, -37, -27, 16, -69, -77, -71, -70, 10, -33, -27, -24, 18, -59];
            I.x2 > I.x1 && p()
        }, e
    }
}(),
function() {
    KeyLines.Layouts = KeyLines.Layouts || {};
    var e = KeyLines.Layouts;
    e.Util = {};
    var t = e.Util;
    t.create = function() {
        function e(e, t) {
            if (t) return !1;
            if ("boolean" == typeof e.tc) return e.tc;
            var n = e.w;
            return n ? !1 : !e.u && !e.fi
        }

        function t(t) {
            return e(t, t._combo && t._combo.open)
        }

        function n(e) {
            var t = 0;
            return e.b && (t = l.isNumber(e.bw) ? e.bw : s), !e.donut || e._combo && e._combo.open || (t = e.donut.w + 2 * e.donut.bw), t
        }

        function r(e, t, n, r) {
            var l = 0,
                u = 0;
            if (e.t) {
                var c = e.e || 1,
                    s = (e.fs || f) * c,
                    d = g * c,
                    h = i(e, r),
                    v = a(h, t, s, e.fb, e.ff);
                l = o(v), u = (s + d) * h.length, e.u || e.c || e.bc || e.w && e.h || (l = Math.max(l / 10, n))
            }
            return {
                width: l,
                height: u
            }
        }

        function i(e, t) {
            if (e.t) {
                var n = e.t;
                return void 0 !== t && n.length > t && (n = n.substring(0, Math.max(0, t - 3)), n += "..."), n.split(/\r\n|\r|\n/)
            }
            return [""]
        }

        function a(e, t, n, r, i) {
            for (var a = [], o = 0; o < e.length; o++) a[o] = u(t, e[o], n, r, i || "sans-serif").width;
            return a
        }

        function o(e) {
            for (var t = 0, n = 0; n < e.length; n++) t = Math.max(t, e[n]);
            return t
        }
        var l = KeyLines.Util,
            u = KeyLines.Rendering.measureText,
            c = l.len,
            s = KeyLines.Generator.defaultBorderWidth,
            f = KeyLines.Generator.defaultFontSize,
            d = KeyLines.Generator.baseRadius,
            g = 3,
            h = function(t, a, o, l, u) {
                var s, f, g, h, v, m, y = t.e || 1,
                    b = t.w && t.h,
                    p = b && "circle" === t.sh,
                    I = !1;
                if (t.du) return {
                    radius: 10,
                    baseRadius: 10,
                    borderSize: 10,
                    width: 10,
                    height: 10
                };
                if (h = n(t), t._combo && (I = "boolean" == typeof u ? u : t._combo.open), I) g = t.oc.w / 2, v = t.oc.w, m = v, h = t.oc && "bw" in t.oc ? t.oc.bw : KeyLines.Validation.defaultOpenComboStyle.bw, s = g + h;
                else if (b)
                    if (p) {
                        var x = Math.min(t.w, t.h);
                        g = x / 2, v = x + 2 * h, m = v, s = g + h
                    } else g = c(t.w, t.h) / 2, v = t.w + 2 * h, m = t.h + 2 * h, s = c(v, m) / 2;
                else h *= y, g = d * y, v = 2 * g + 2 * h, m = v, s = g + h;
                if (o && t.t && t.t.length > 0) {
                    var C, w = r(t, a, s, l),
                        G = w.width,
                        A = w.height,
                        B = e(t, I);
                    v = Math.max(G, v);
                    var Z = c(G / 2, m / 2 + A / 2);
                    f = Math.max(Z, s), B ? (m = Math.max(A, m), s = Math.max(s, c(G / 2, A / 2))) : (C = c(G / 2, m / 2 + A), s = Math.max(C, s), m = A + m)
                } else {
                    var R = 0;
                    if (t.t) {
                        var M = i(t, l);
                        R = (M.length + 1) * ((t.fs || KeyLines.Generator.defaultFontSize) * (t.e || 1))
                    }
                    f = s + R / 2
                }
                return {
                    legacyRadius: Math.round(f),
                    radius: Math.round(s),
                    baseRadius: Math.round(g),
                    borderSize: Math.round(h),
                    width: Math.round(v),
                    height: Math.round(m)
                }
            },
            v = function(e, n) {
                var r = 0;
                if (e.t) {
                    var a = e.fs || f,
                        o = e.e || 1;
                    if (!t(e)) {
                        var l = (a + g) * o;
                        r = l * i(e, n).length / 2
                    }
                }
                return Math.round(r)
            },
            m = function(e, t, n, r, i, a) {
                var o, u, s, f, d, g, m, y, b = Math.max(0, 0 | n),
                    p = {},
                    I = 0,
                    x = {},
                    C = 0,
                    w = i || {
                        x: 0,
                        y: 0
                    };
                return l.forEach(e, function(e) {
                    if (void 0 !== e.x) {
                        var n;
                        void 0 !== e.size ? n = e.size : void 0 !== e.r ? (n = e.r, C = e.labelOffset) : (n = h(e, t, r, a).radius, C = v(e, a)), x[e.id] = {
                            size: n,
                            labelOffset: C
                        }, u = e.x - n, f = e.y - (n + C), g = e.x + n, y = e.y + (n - C), void 0 === o ? (o = u, s = f, d = g, m = y) : (o = Math.min(u, o), s = Math.min(f, s), d = Math.max(g, d), m = Math.max(y, m))
                    }
                }), p.x1 = o - (b + w.x), p.y1 = s - (b + w.y), p.x2 = d + (b - w.x), p.y2 = m + (b - w.y), p.w = d - o + 2 * b, p.h = m - s + 2 * b, l.forEach(e, function(e) {
                    if (void 0 !== e.x) {
                        var t = x[e.id],
                            n = e.x - w.x,
                            r = e.y - w.y,
                            i = c(n, r + t.labelOffset);
                        I = Math.max(I, i + t.size)
                    }
                }), p.r = Math.round(I + b), p
            },
            y = function(e, t, n, r, i) {
                var a = [],
                    o = "undefined" == typeof n ? 0 : n;
                return l.forEach(e, function(e) {
                    var n = void 0 !== e.r ? e.r : h(e, t, r, i).radius;
                    if (n += o, !isFinite(e.x) || !isFinite(e.y) || !isFinite(n)) throw new Error("Inputs must be finite");
                    a.push({
                        x: e.x,
                        y: e.y,
                        r: n
                    })
                }), 0 === a.length ? null : welzlAlgorithm.bMinidisk(a)
            };
        return {
            labelOffset: v,
            nodeSize: h,
            getExtents: m,
            radialExtents: y
        }
    }
}();
var welzlAlgorithm = function() {
    function e(e, t) {
        var n = e.x - t.x,
            r = e.y - t.y,
            i = 1e-6;
        return Math.sqrt(n * n + r * r) < e.r - t.r + i
    }

    function t(e, t) {
        var n = e.x,
            r = e.y,
            i = e.r,
            a = t.x,
            o = t.y,
            l = t.r,
            u = a - n,
            c = o - r,
            s = l - i,
            f = Math.sqrt(u * u + c * c);
        return {
            x: (n + a + u / f * s) / 2,
            y: (r + o + c / f * s) / 2,
            r: (f + i + l) / 2
        }
    }

    function n(e, t, n) {
        var r = e.x,
            i = e.y,
            a = e.r,
            o = t.x,
            l = t.y,
            u = t.r,
            c = n.x,
            s = n.y,
            f = n.r,
            d = 2 * (r - o),
            g = 2 * (i - l),
            h = 2 * (u - a),
            v = r * r + (i * i - a * a - o * o - l * l) + u * u,
            m = 2 * (r - c),
            y = 2 * (i - s),
            b = 2 * (f - a),
            p = r * r + (i * i - a * a - c * c - s * s) + f * f,
            I = m * g - d * y,
            x = (g * p - y * v) / I - r,
            C = (y * h - g * b) / I,
            w = (m * v - d * p) / I - i,
            G = (d * b - m * h) / I,
            A = C * C + G * G - 1,
            B = 2 * (x * C + w * G + a),
            Z = x * x + w * w - a * a,
            R = (-B - Math.sqrt(B * B - 4 * A * Z)) / (2 * A);
        return {
            x: x + C * R + r,
            y: w + G * R + i,
            r: R
        }
    }

    function r(e, r) {
        switch (r.length) {
            case 0:
                return {
                    x: 0,
                    y: 0,
                    r: 0
                };
            case 1:
                return e[r[0]];
            case 2:
                return t(e[r[0]], e[r[1]]);
            case 3:
                return n(e[r[0]], e[r[1]], e[r[2]]);
            default:
                throw new Error("invalid number of circles")
        }
    }

    function i(t) {
        for (var n = t.length, i = {
                prev: null,
                i: 0,
                R: [],
                c: null
            };;) {
            var a = i.i,
                o = i.R,
                l = i.prev,
                u = i.c;
            if (a === n || 3 === o.length) l.c = r(t, o), i = l;
            else if (null === u) i = {
                prev: i,
                i: a + 1,
                R: o,
                c: null
            };
            else if (e(u, t[a])) {
                if (null === l) return u;
                l.c = u, i = l
            } else i = {
                prev: i,
                i: a + 1,
                R: o.concat([a]),
                c: null
            }
        }
    }
    return {
        bMinidisk: i
    }
}();
! function() {
    var e = KeyLines.WebGL;
    e && (e["line-arc-vertex"] = "cHJlY2lzaW9uIGhpZ2hwIGZsb2F0OwphdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uOwphdHRyaWJ1dGUgZmxvYXQgYV9yYWRpdXM7CmF0dHJpYnV0ZSBmbG9hdCBhX3N0YXJ0QW5nbGU7CmF0dHJpYnV0ZSBmbG9hdCBhX2VuZEFuZ2xlOwphdHRyaWJ1dGUgZmxvYXQgYV93aWR0aDsKYXR0cmlidXRlIHZlYzQgYV9jb2xvdXI7CmF0dHJpYnV0ZSB2ZWMzIGFfaGl0VGVzdENvbG91cjsKYXR0cmlidXRlIGZsb2F0IGFfbGluZVR5cGU7CmF0dHJpYnV0ZSB2ZWMzIGFfY29yZTsKCnVuaWZvcm0gZmxvYXQgdV9oaXRUZXN0Owp1bmlmb3JtIGZsb2F0IHVfem9vbTsKdW5pZm9ybSB2ZWMzIHVfcmVzb2x1dGlvbjsKdW5pZm9ybSBtYXQ0IHVfdHJhbnNmb3JtOwoKdmFyeWluZyB2ZWM0IHZfY29sb3VyOwp2YXJ5aW5nIGxvd3AgZmxvYXQgdl9saW5lVHlwZTsKdmFyeWluZyB2ZWM0IHZfY29yZTsKdmFyeWluZyB2ZWM0IHZfbGluZVdpZHRoRGF0YTsKdmFyeWluZyB2ZWMzIHZfaGl0VGVzdENvbG91cjsKdmFyeWluZyBmbG9hdCB2X2xlbmd0aDsKdmFyeWluZyB2ZWM0IHZfYmFyeWNlbnRyaWM7CnZhcnlpbmcgdmVjNCB2X3Bvc2l0aW9uOwp2YXJ5aW5nIHZlYzMgdl9kYXNoaW5nOwoKZmxvYXQgcGkgPSAzLjE0MTU5MjY1MzU5OwpmbG9hdCBtaW5XaWR0aCA9IDEuMDsKaW50IExJTkVfVFlQRV9EQVNIID0gMjsKaW50IExJTkVfVFlQRV9ET1QgPSAzOwppbnQgTElORV9UWVBFX0FSUk9XSEVBRCA9IDQ7CiAgIApmbG9hdCBudW1iZXJPZlNlZ21lbnRzID0gNC4wOwoKaW50IHJvdW5kVG9JbnQoZmxvYXQgYSkgewogIHJldHVybiBpbnQoZmxvb3IoYSArIDAuNSkpOwp9ICAgCiAgIAovLyBOZXh0IHNlZ21lbnQgaW4gdGhlIGFyYyAgIAp2ZWMyIGdldE5leHRQb3NpdGlvbih2ZWMyIGNlbnRyZVBvaW50LCBmbG9hdCByYWRpdXMsIGZsb2F0IHN0YXJ0QW5nbGUsIGZsb2F0IGFuZ2xlSW5jcmVtZW50LCBmbG9hdCBpbmRleCkgewogIHJldHVybiB2ZWMyKAogICAgY2VudHJlUG9pbnQueCArIChyYWRpdXMgKiBjb3Moc3RhcnRBbmdsZSArIGFuZ2xlSW5jcmVtZW50ICogaW5kZXgpKSwKICAgIGNlbnRyZVBvaW50LnkgKyAocmFkaXVzICogc2luKHN0YXJ0QW5nbGUgKyBhbmdsZUluY3JlbWVudCAqIGluZGV4KSkKICApOwp9CgpmbG9hdCBnZXROdW1iZXJPZkRhc2hlcyhmbG9hdCBkYXNoTGVuZ3RoLCBmbG9hdCBsZW5ndGhPZkFyYykgewogIGZsb2F0IGdhcFdpZHRoID0gZGFzaExlbmd0aCAvIDIuMDsKICBmbG9hdCBudW1PZkRhc2hlcyA9IGZsb29yKCgobGVuZ3RoT2ZBcmMgKyBnYXBXaWR0aCkgLyAoZGFzaExlbmd0aCArIGdhcFdpZHRoKSkgKyAwLjUpOwogIGlmICgobnVtT2ZEYXNoZXMgKiBkYXNoTGVuZ3RoKSA+IGxlbmd0aE9mQXJjKSB7CiAgICBudW1PZkRhc2hlcyA9IDEuMDsKICB9CiAgcmV0dXJuIG51bU9mRGFzaGVzOwp9Cgp2b2lkIG1haW4oKSB7CiAgZmxvYXQgYWFXaWR0aEJ1ZmZlciA9IDEuMCAvIHVfem9vbTsKICBpbnQgbGluZVR5cGUgPSByb3VuZFRvSW50KGFfbGluZVR5cGUpOwogIGJvb2wgaXNEYXNoZWRMaW5lID0gbGluZVR5cGUgPT0gTElORV9UWVBFX0RBU0g7CiAgYm9vbCBpc0RvdHRlZExpbmUgPSBsaW5lVHlwZSA9PSBMSU5FX1RZUEVfRE9UOwogIGJvb2wgaXNBcnJvd2hlYWQgPSBsaW5lVHlwZSA+PSBMSU5FX1RZUEVfQVJST1dIRUFEOwogIHZlYzIgcG9zaXRpb247CiAgLy8gaG93IG11Y2ggc21vb3RoaW5nIHRvIGFwcGx5IHRvIHRoZSBlZGdlIG9mIHRoZSBhcnJvd2hlYWQKICBmbG9hdCBhbnRpQWxpYXNpbmdUaHJlc2hvbGQ7CiAgaWYgKGlzQXJyb3doZWFkKSB7CiAgICBpbnQgdmVydGV4SW5kZXggPSByb3VuZFRvSW50KGFfbGluZVR5cGUpIC0gTElORV9UWVBFX0FSUk9XSEVBRDsKICAgIHZlYzIgcG9zaXRpb24xID0gYV9wb3NpdGlvbjsKICAgIHZlYzIgcG9zaXRpb24yID0gdmVjMihhX3JhZGl1cywgYV9zdGFydEFuZ2xlKTsKICAgIHZlYzIgcG9zaXRpb24zID0gdmVjMihhX2VuZEFuZ2xlLCBhX3dpZHRoKTsKICAgIAogICAgZmxvYXQgZGlzdGFuY2VJbldvcmxkUGl4ZWxzID0gZGlzdGFuY2UocG9zaXRpb24yLCBwb3NpdGlvbjMpOwogICAgZmxvYXQgZGlzdGFuY2VJblNjcmVlblBpeGVscyA9IGRpc3RhbmNlSW5Xb3JsZFBpeGVscyAvIHVfem9vbTsKICAgIGFudGlBbGlhc2luZ1RocmVzaG9sZCA9IDEuMCAvIGRpc3RhbmNlSW5TY3JlZW5QaXhlbHM7CiAgICB2ZWMyIG9wcG9zaXRlTWlkUG9pbnQ7CiAgICBpZih2ZXJ0ZXhJbmRleCA9PSAwKSB7CiAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24xOwogICAgICBvcHBvc2l0ZU1pZFBvaW50ID0gKHBvc2l0aW9uMiArIHBvc2l0aW9uMykgLyAyLjA7CiAgICB9IGVsc2UgaWYgKHZlcnRleEluZGV4ID09IDEpIHsKICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbjI7CiAgICAgIG9wcG9zaXRlTWlkUG9pbnQgPSAocG9zaXRpb24xICsgcG9zaXRpb24zKSAvIDIuMDsKICAgIH0gZWxzZSBpZiAodmVydGV4SW5kZXggPT0gMikgewogICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uMzsKICAgICAgb3Bwb3NpdGVNaWRQb2ludCA9IChwb3NpdGlvbjIgKyBwb3NpdGlvbjEpIC8gMi4wOwogICAgfQogICAgdmVjMiB1bml0VmVjdG9yRm9yRXh0cnVzaW9uID0gbm9ybWFsaXplKHBvc2l0aW9uIC0gb3Bwb3NpdGVNaWRQb2ludCk7CiAgICAvLyBwdXNoIHZlcnRleCBhd2F5IGZyb20gY2VudHJlIHRvIG1ha2UgaXQgYmlnZ2VyIHNvIHRoYXQgYW50aWFsaXNpbmcgaGFzIHJvb20gdG8gc21vb3RoIHRoZSBqYWdnaWVzCiAgICBwb3NpdGlvbiArPSB1bml0VmVjdG9yRm9yRXh0cnVzaW9uIC8gdV96b29tOwogICAgLy8gVGhlc2UgY29vcmRpbmF0ZXMgYWxsb3cgdXMgdG8gaW5mZXIgdGhlIGRpc3RhbmNlIGZyb20gdGhlIGVkZ2Ugb2YgYSB0cmlhbmdsZQogICAgdl9iYXJ5Y2VudHJpYyA9IHZlYzQoYV9jb3JlLnh5eiwgYW50aUFsaWFzaW5nVGhyZXNob2xkKTsgCiAgICB2X2NvcmUgPSB2ZWM0KDEuMCk7CiAgICB2X2xlbmd0aCA9IDEuMDsKICB9IGVsc2UgewogICAgLy8gY2VudHJlIHBvaW50IG9mIHRoZSBhcmMKICAgIHZlYzIgY2VudHJlUG9pbnQgPSBhX3Bvc2l0aW9uOwogICAgZmxvYXQgcmFkaXVzID0gYV9yYWRpdXM7CiAgICBmbG9hdCBzYSA9IGFfc3RhcnRBbmdsZTsKICAgIGZsb2F0IGVhID0gYV9lbmRBbmdsZTsKICAgCiAgICBmbG9hdCBmaW5hbFJhZGl1czsKICAgIHZlYzIgZGlzdGFuY2VWZWN0b3I7CiAgICBmbG9hdCBuZXh0SW5kZXg7CiAgICBmbG9hdCBpbmRleE1pZFBvaW50SW5jcmVtZW50OwogICAgCiAgICBpZih1X2hpdFRlc3QgPT0gMS4wKSB7CiAgICAgIC8vIGFkZCA3IHNjcmVlbiBwaXhlbHMgdG8gdGhlIGxpbmUgdGhpY2tuZXNzCiAgICAgIGFhV2lkdGhCdWZmZXIgPSA3LjAgLyB1X3pvb207CiAgICB9CiAgIAogICAgLy8gRGlyZWN0aW9uIG9mIHRoZSBub3JtYWwgdmVjdG9yLCB0aGlzIHRlbGxzIHVzIHdoZXRoZXIgd2UgYXJlIG9uIHRoZSBvdXRlciBvciBpbm5lciBlZGdlIG9mCiAgICAvLyB0aGUgYXJjLgogICAgYm9vbCBub3JtYWxQb2ludHNVcHdhcmQgPSByb3VuZFRvSW50KHNpZ24oYV9jb3JlLnIpKSA9PSAxOwogICAgCiAgICAvLyBUaGUgaW5kZXggb2YgdGhlIGN1cnJlbnQgc2VnZW1lbnQgb2YgdGhlIGFyYwogICAgZmxvYXQgaW5kZXggPSBhYnMoYV9jb3JlLnIpIC0gMS4wOwogICAgLy8gSG93IG11Y2ggZWFjaCBzZWdtZW50IG5lZWRzIHRvIGN1cnZlCiAgICBmbG9hdCBhbmdsZUluY3JlbWVudCA9IChhX2VuZEFuZ2xlIC0gIGFfc3RhcnRBbmdsZSkgLyBudW1iZXJPZlNlZ21lbnRzOwogICAgCiAgICAvLyBEaXZpZGUgbWluV2lkdGggYnkgcGl4ZWwgZGVuc2l0eSBzbyByZXRpbmEgc2NyZWVuIHJldGFpbiBjb3JyZWN0IHdpZHRoCiAgICBtaW5XaWR0aCAvPSB1X3Jlc29sdXRpb24uejsKICAgIC8vIGluY3JlYXNlIG1pbi13aWR0aCBmb3IgZG90dGVkIGxpbmUgIzI0MjYKICAgIGlmKGlzRG90dGVkTGluZSkgewogICAgICBtaW5XaWR0aCA9IG1heChtaW5XaWR0aCwgc3RlcCgyLjUsIGFfbGluZVR5cGUpICogMi4wKTsKICAgIH0KICAgIC8vIHRoZSB3aWR0aCBvZiB0aGUgbGluZSB0aGF0IHNob3VsZCBiZSB2aXNpYmxlCiAgICBmbG9hdCBsaW5lV2lkdGggPSBtYXgoYV93aWR0aCAqIHVfem9vbSwgbWluV2lkdGgpIC8gdV96b29tOwogICAgLy8gdGhlIHdpZHRoIG9mIHRoZSB1bmRlcmx5aW5nIHNoYXBlIHRoYXQgY29udGFpbnMgdGhlIGxpbmUKICAgIC8vIGV4cGFuZCB0aGUgd2lkdGggb2YgdGhlIGxpbmUgc2xpZ2h0bHkgc28gdGhlcmVzIHJvb20gdG8gc21vb3RoIHRoZSBlZGdlcyAoYW50aS1hbGlhc2luZykKICAgIGZsb2F0IHNoYXBlV2lkdGggPSBsaW5lV2lkdGggKyBhYVdpZHRoQnVmZmVyOwogICAgZmxvYXQgaGFsZlNoYXBlTGluZVdpZHRoID0gc2hhcGVXaWR0aC8yLjA7CiAgICBmbG9hdCBoYWxmTGluZVdpZHRoID0gbGluZVdpZHRoLzIuMDsKICAgIC8vIEdldCB0aGUgaW5kZXggb2YgdGhlIG5leHQgc2VnbWVudCBzbyB0aGF0IHdlIGNhbiBmaXQgdGhlIHRyaWFuZ2xlcyBhcm91bmQgdGhlIGFyYy4gCiAgICAvLyBJZiB3ZSBhcmUgYXQgdGhlIGVuZCBvZiB0aGUgYXJjIHRoZW4gd2UgbmVlZCB0byBsb29rIGF0IHRoZSBwcmV2aW91cyBzZWdtZW50CiAgICBpZiAoaW5kZXggPCBudW1iZXJPZlNlZ21lbnRzKSB7CiAgICAgIGluZGV4TWlkUG9pbnRJbmNyZW1lbnQgPSAxLjA7CiAgICB9IGVsc2UgewogICAgICBpbmRleE1pZFBvaW50SW5jcmVtZW50ID0gLTEuMDsKICAgIH0KICAgIC8vIGdldCBwb3NpdGlvbiBvZiBtaWRkbGUgcG9pbnQgb24gdGhlIG91dGVyIGFyYwogICAgdmVjMiBtaWRPdXRlclBvaW50ID0gZ2V0TmV4dFBvc2l0aW9uKGNlbnRyZVBvaW50LCBtYXgocmFkaXVzICsgaGFsZkxpbmVXaWR0aCwgMC4wKSwgYV9zdGFydEFuZ2xlLCAKICAgICAgYW5nbGVJbmNyZW1lbnQsIGluZGV4ICsgKGluZGV4TWlkUG9pbnRJbmNyZW1lbnQgLyAyLjApKTsKICAgIGZsb2F0IGhhbGZBbmdsZSA9IGFuZ2xlSW5jcmVtZW50IC8gMi4wOwogICAgZmxvYXQgbWlkT3V0ZXJQb2ludExlbmd0aCA9IGxlbmd0aChtaWRPdXRlclBvaW50LSBjZW50cmVQb2ludCk7CiAgICBmbG9hdCBkaXN0YW5jZVNlZ21lbnRPdXRlckVkZ2VGcm9tQ2VudHJlID0gbWlkT3V0ZXJQb2ludExlbmd0aCAvIGNvcyhoYWxmQW5nbGUpOwogICAgZmxvYXQgZGlzdGFuY2VUb1B1c2ggPSBkaXN0YW5jZVNlZ21lbnRPdXRlckVkZ2VGcm9tQ2VudHJlIC0gcmFkaXVzOwoKICAgIGlmKG5vcm1hbFBvaW50c1Vwd2FyZCkgewogICAgICBmaW5hbFJhZGl1cyA9IGRpc3RhbmNlU2VnbWVudE91dGVyRWRnZUZyb21DZW50cmUgKyBhYVdpZHRoQnVmZmVyOwogICAgICB2X2xpbmVXaWR0aERhdGEgPSB2ZWM0KGhhbGZTaGFwZUxpbmVXaWR0aCArIGRpc3RhbmNlVG9QdXNoLCBoYWxmTGluZVdpZHRoICsgZGlzdGFuY2VUb1B1c2gsIHNoYXBlV2lkdGgsIGxpbmVXaWR0aCk7CiAgICB9IGVsc2UgewogICAgICAvLyBBZGQgZXh0cmEgcGFkZGluZyB0byB0aGUgaW5zaWRlIG9mIHRoZSBhcmMgd2hlbiB0aGUgcmFkaXVzIGlzIGxhcmdlIHRvIGNvbXBlbnNhdGUgZm9yCiAgICAgIC8vIGZsb2F0IHByZWNpc2lvbiBlcnJvcnMgIzY3OTcKICAgICAgLy8gSWYgcmFkaXVzID4gMTAwMDAwIHRoZSBnZW5lcmF0b3IgdXNlcyBhIHN0cmFpZ2h0IGxpbmUgYXBwcm94aW1hdGlvbgogICAgICBmbG9hdCBib3JkZXJQYWRkaW5nRmFjdG9yID0gc21vb3Roc3RlcCgyMDAwMC4wLCAxMDAwMDAuMCwgcmFkaXVzKSAqIDIwLjA7CiAgICAgIGZpbmFsUmFkaXVzID0gcmFkaXVzIC0gaGFsZlNoYXBlTGluZVdpZHRoIC0gYm9yZGVyUGFkZGluZ0ZhY3RvcjsKICAgICAgdl9saW5lV2lkdGhEYXRhID0gdmVjNCgtaGFsZlNoYXBlTGluZVdpZHRoLCAtaGFsZkxpbmVXaWR0aCwgc2hhcGVXaWR0aCwgbGluZVdpZHRoKTsKICAgIH0KICAgIGZpbmFsUmFkaXVzID0gbWF4KGZpbmFsUmFkaXVzLCAwLjApOwogIAogICAgcG9zaXRpb24gPSBnZXROZXh0UG9zaXRpb24oY2VudHJlUG9pbnQsIGZpbmFsUmFkaXVzLCBzYSwgYW5nbGVJbmNyZW1lbnQsIGluZGV4KTsKICAgICAKICAgIGZsb2F0IGxpbmVMZW5ndGggPSBhX3JhZGl1cyAqIChlYSAtIHNhKTsKICAgIGZsb2F0IHBpeGVsU2l6ZSA9ICgxLjAgLyBsaW5lTGVuZ3RoKSAvIHVfem9vbTsKICAgIGZsb2F0IGxpbmVMZW5ndGhJblBpeGVscyA9IGxpbmVMZW5ndGggKiB1X3pvb207CiAgICAvL0RvdHRlZCBsaW5lcywgc28gY2FsYyB1diBsZW5ndGgKICAgIGlmIChpc0RvdHRlZExpbmUpIHsKICAgICAgLy8gYXMgbGluZXMgZ2V0IHNtYWxsZXIgYW5kIHNtYWxsZXIgbGltaXQgdGhlIG51bWJlciBvZiBkb3RzIHNvIHRoZSBzdGlsbCBsb29rIG5pY2UKICAgICAgZmxvYXQgbWluaW11bURvdHMgPSBsaW5lTGVuZ3RoSW5QaXhlbHMgLyA0LjA7CiAgICAgIC8vIGJ5IGRlZmF1bHQgc2V0IHRoZSBudW1iZXIgb2YgZG90cyB0byB0aGUgcHJvcG9ydGlvbiBvZiB0aGUgbGluZSBsZW5ndGggYW5kIGxpbmUgd2lkdGgKICAgICAgZmxvYXQgbnVtYmVyRG90c0J5TGluZVdpZHRoID0gbGluZUxlbmd0aCAvIChsaW5lV2lkdGggKiAyLjApOwogICAgICAvLyBjaG9vc2UgdGhlIHNtYWxsZXN0IG51bWJlciwgYXMgdGhlIGxpbmUgZ2V0cyB0b28gc21hbGwgcmVkdWNpbmcgdGhlIG51bWJlciBvZiBkb3RzCiAgICAgIC8vIGJ5IHRoZSB6b29tIGxldmVsIGhlbHBzIGl0IHRvIHN0YXkgcmVhZGFibGUKICAgICAgZmxvYXQgbnVtT2ZEb3RzID0gbWluKG1pbmltdW1Eb3RzLCBudW1iZXJEb3RzQnlMaW5lV2lkdGgpOwogICAgICAvLyByb3VuZCB1cCB0aGUgbnVtYmVyIG9mIGRvdHMgc28gdGhhdCB3ZSBhbHdheXMgZHJhdyBhIHdob2xlIGRvdAogICAgICB2X2NvcmUgPSB2ZWM0KHNhLCBjZWlsKG51bU9mRG90cyksIHBpeGVsU2l6ZSwgYV9yYWRpdXMpOwogICAgICB2X2Rhc2hpbmcgPSB2ZWMzKGxpbmVXaWR0aCwgbGluZVdpZHRoLCAwLjUpOwogICAgfSBlbHNlIGlmIChpc0Rhc2hlZExpbmUpIHsKICAgICAgLy8gbGVuZ3RoIG9mIHRoZSBkYXNoIHdpdGggYWRqdXN0bWVudHMgaWYgdGhlIGRhc2ggbGVuZ3RoIGlzIGxlc3MgdGhhbiAyIHNjcmVlbiBwaXhlbHMKICAgICAgZmxvYXQgZGFzaExlbmd0aCA9IG1heCgyLjAgLyB1X3pvb20sIGxpbmVXaWR0aCAqIDIuMCk7CiAgICAgIC8vIHRoZSBudW1iZXIgb2YgZGFzaGVzIHdlJ3JlIGFpbWluZyBmb3IKICAgICAgZmxvYXQgZGFzaGVzID0gZ2V0TnVtYmVyT2ZEYXNoZXMoZGFzaExlbmd0aCwgbGluZUxlbmd0aCk7CiAgICAgIC8vIFdlIHdhbnQgdG8gc3RhcnQgYW5kIGVuZCBvbiBhIGRhc2ggd2l0aG91dCBhbHRlcmluZyB0aGUgbGVuZ3RoIG9mIHRoZSBkYXNoIHNvIGluc3RlYWQgd2UKICAgICAgLy8gbmVlZCB0byBhbHRlciB0aGUgZ2FwIGxlbmd0aC4gIFRoaXMgd2lsbCB0ZWxsIHVzIGhvdyBsb25nIGEgZ2FwIHdlIHdpbGwgbmVlZC4KICAgICAgZmxvYXQgZ2FwV2lkdGggPSAobGluZUxlbmd0aCAtIGRhc2hMZW5ndGggKiBkYXNoZXMpIC8gKGRhc2hlcyAtIDEuMCk7CiAgICAgIC8vIHRvIGVuZCBvbiBhIGRhc2ggd2UgbmVlZCB0byByZW1vdmUgYSBnYXBzIGxlbmd0aCBmcm9tIHRoZSBlbmQKICAgICAgZmxvYXQgZ2FwT3ZlclBlcmlvZCA9IGdhcFdpZHRoICogZGFzaGVzIC8gKGxpbmVMZW5ndGggKyBnYXBXaWR0aCk7CiAgICAgIC8vIHBhc3MgdGhlIHN0YXJ0IGFuZ2xlIGFuZCB0aGUgbnVtYmVyIG9mIGRhc2hlcyBtaW51cyB0aGUgbGVuZ3RoIG9mIGEgZ2FwCiAgICAgIHZfY29yZSA9IHZlYzQoc2EsIGRhc2hlcyAtIGdhcE92ZXJQZXJpb2QsIHBpeGVsU2l6ZSwgYV9yYWRpdXMpOwogICAgICBmbG9hdCBkYXNoQWRqdXN0bWVudCA9IChkYXNoTGVuZ3RoIC8gKGRhc2hMZW5ndGggKyBnYXBXaWR0aCkpIC8gMi4wOwogICAgICB2X2Rhc2hpbmcgPSB2ZWMzKGRhc2hMZW5ndGgsIGdhcFdpZHRoLCBkYXNoQWRqdXN0bWVudCk7CiAgICB9IGVsc2UgewogICAgICAvLyBwb3NpdGlvbiBhbG9uZyB0aGUgYXJjCiAgICAgIHZfY29yZSA9IHZlYzQoc2EsIGluZGV4IC8gbnVtYmVyT2ZTZWdtZW50cywgcGl4ZWxTaXplLCBhX3JhZGl1cyk7CiAgICB9CiAgICAvLyBsZW5ndGggb2YgdGhlIGFyYwogICAgdl9sZW5ndGggPSBsaW5lTGVuZ3RoOwogICAgLy8gdGhlIHBvc2l0aW9uIGluIHdvcmxkIGNvb3JkcyBvZiB0aGUgdmVydGV4IGFuZCB0aGUgY2VudHJlIHBvaW50IG9mIHRoZSBhcmMKICAgIHZfcG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCBjZW50cmVQb2ludCk7CiAgfQogIAogIC8qCiAgIGNvbnZlcnQgdG8gY2xpcHNwYWNlICgtMSAtPiAxKSAKICAqLwogIC8vIGNvbnZlcnQgdGhlIHJlY3RhbmdsZSBmcm9tIHBpeGVscyB0byAwLjAgdG8gMS4wCiAgdmVjMiB6ZXJvVG9PbmUgPSBwb3NpdGlvbiAvIHVfcmVzb2x1dGlvbi54eTsKICAKICAvLyBjb252ZXJ0IGZyb20gMC0+MSB0byAwLT4yCiAgdmVjMiB6ZXJvVG9Ud28gPSB6ZXJvVG9PbmUgKiAyLjA7CiAgCiAgLy8gY29udmVydCBmcm9tIDAtPjIgdG8gLTEtPisxIChjbGlwc3BhY2UpCiAgdmVjMiBjbGlwU3BhY2UgPSB6ZXJvVG9Ud28gLSAxLjA7CiAgCiAgLyoKICBBc3NpZ24gVmFyeWluZ3MKICAqLyAKICB2ZWM0IHBpeGVsQ29sb3VyID0gYV9jb2xvdXI7CiAgLy8gbm9ybWFsaXNlIGNvbG91ciB2YWx1ZXMKICBwaXhlbENvbG91ciAvPSAyNTUuMDsKICAvLyBNdWx0aXBseSBjb2xvdXIgYnkgdGhlIGFscGhhLCB0aGlzIGlzIGJlY2F1c2UgaW4gdGhlIHJlYWwgd29ybGQgd2hlbiBsaWdodCBwYXNzZXMgdGhyb3VnaAogIC8vIGFuIG9iamVjdCBpdCBnZXRzIHdlYWtlciBhcyBsaWdodCBpcyBhYnNvcmJlZC4gIFdlIG5lZWQgdG8gZG8gdGhlIHNhbWUuCiAgcGl4ZWxDb2xvdXIucmdiICo9IHBpeGVsQ29sb3VyLmE7CiAgdl9jb2xvdXIgPSBwaXhlbENvbG91cjsKICAKICAKICB2X2hpdFRlc3RDb2xvdXIgPSBhX2hpdFRlc3RDb2xvdXI7CiAgdl9saW5lVHlwZSA9IC1hX2xpbmVUeXBlOwogIC8qCiAgQXNzaWduIGZpbmFsIHZlcnRleCBwb3NpdGlvbiBhbmQgYXBwbHkgdHJhbnNmb3JtcyBmb3Igem9vbS9wYW4KICAqLwogIGdsX1Bvc2l0aW9uID0gdV90cmFuc2Zvcm0gKiB2ZWM0KGNsaXBTcGFjZSAqIHZlYzIoMSwgLTEpLCAwLCAxKTsKfQ==");
}(),
function() {
    var e = KeyLines.WebGL;
    e && (e["line-fragment"] = "I2lmZGVmIEdMX09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcwojZXh0ZW5zaW9uIEdMX09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcyA6IGVuYWJsZQojZW5kaWYKcHJlY2lzaW9uIGhpZ2hwIGZsb2F0OwoKdW5pZm9ybSBmbG9hdCB1X2hpdFRlc3Q7CnVuaWZvcm0gZmxvYXQgdV9zaGFkb3dUeXBlOwp1bmlmb3JtIGZsb2F0IHVfem9vbTsKCnZhcnlpbmcgdmVjNCB2X2NvbG91cjsKdmFyeWluZyB2ZWMzIHZfaGl0VGVzdENvbG91cjsKdmFyeWluZyB2ZWM0IHZfY29yZTsKdmFyeWluZyB2ZWM0IHZfbGluZVdpZHRoRGF0YTsKdmFyeWluZyBsb3dwIGZsb2F0IHZfbGluZVR5cGU7CnZhcnlpbmcgZmxvYXQgdl9sZW5ndGg7CnZhcnlpbmcgdmVjNCB2X2JhcnljZW50cmljOwp2YXJ5aW5nIHZlYzQgdl9wb3NpdGlvbjsKdmFyeWluZyB2ZWMzIHZfZGFzaGluZzsKCmludCBMSU5FX1RZUEVfREFTSCA9IDI7CmludCBMSU5FX1RZUEVfRE9UID0gMzsKaW50IExJTkVfVFlQRV9BUlJPV0hFQUQgPSA0OwoKZmxvYXQgUEkgPSAzLjE0MTU5MjY1MzU5OwpmbG9hdCBzcXJ0T2ZIYWxmID0gMC43MDcxMDY3ODExODY1NDc1NzsKLy8gUGVyZm9ybWFuY2UgYW50aWFsaWFzaW5nIHVzaW5nIHN0YW5kYXJkIGRlcml2YXRpdmVzCi8vIFNtb290aHMgdGhlIGZyYWdtZW50IG92ZXIgMSBwaXhlbCB3aGVuIHZhbHVlIGlzIG1vcmUgdGhhbiB0aHJlc2hvbGQKLy8gZXNlbnRpYWxseSBhIGJldHRlciB2ZXJzaW9uIG9mIHN0ZXAgYW5kIHNtb290aHN0ZXAKZmxvYXQgYWFzdGVwKGZsb2F0IHRocmVzaG9sZCwgZmxvYXQgdmFsdWUpIHsKICBmbG9hdCBhZndpZHRoID0gbGVuZ3RoKHZlYzIoZEZkeCh2YWx1ZSksIGRGZHkodmFsdWUpKSkgKiBzcXJ0T2ZIYWxmOwogIHJldHVybiBzbW9vdGhzdGVwKHRocmVzaG9sZC1hZndpZHRoLCB0aHJlc2hvbGQrYWZ3aWR0aCwgdmFsdWUpOwp9CgovLyBkaXN0YW5jZSB0byBlZGdlIGZyb20gYSB0cmlhbmdsZSwgdXNlZCBmb3Igc21vb3RoaW5nIGVkZ2VzIG9mIGFycm93aGVhZHMKZmxvYXQgZWRnZUZhY3Rvcih2ZWMzIGJhcnljZW50cmljQ29vcmRzKSB7CiAgdmVjMyBkID0gZndpZHRoKGJhcnljZW50cmljQ29vcmRzKTsKICB2ZWMzIGEzID0gc21vb3Roc3RlcCh2ZWMzKDAuMCksIGQgKiAyLjAsIGJhcnljZW50cmljQ29vcmRzKTsKICByZXR1cm4gbWluKG1pbihhMy54LCBhMy55KSwgYTMueik7Cn0KCmludCByb3VuZFRvSW50KGZsb2F0IGEpIHsKICByZXR1cm4gaW50KGZsb29yKGEgKyAwLjUpKTsKfQoKLy8gc21vb3RoIHRoZSBlZGdlIG9mIHRoZSBsaW5lCnZlYzQgYW50aWFsaWFzTGluZUVkZ2UodmVjNCBjb2xvdXIpIHsKICAvLyBSZWFsIGxpbmUgd2lkdGgKICBmbG9hdCBsaW5lV2lkdGggPSB2X2xpbmVXaWR0aERhdGEudzsKICAvLyB3aWR0aCBvZiB0aGUgdW5kZXJseWluZyBzaGFwZQogIGZsb2F0IHNoYXBlV2lkdGggPSB2X2xpbmVXaWR0aERhdGEueDsKICAvLyB0aGUgd2lkdGggb2YgdGhlIGxpbmUgYXdheSBmcm9tIHRoZSBjZW50cmUgaW4gc2NyZWVucGl4ZWxzIAogIGZsb2F0IHRocmVzaG9sZCA9IGxpbmVXaWR0aC8yLjAgKiB1X3pvb207CiAgLy8gdGhlIGRpc3RhbmNlIGZyb20gdGhlIGNlbnRyZSBvZiB0aGUgbGluZSBpbiBzY3JlZW5waXhlbHMKICBmbG9hdCBwb3NpdGlvbiA9IGFicyhzaGFwZVdpZHRoKSAqIHVfem9vbTsKICAvLyBzbW9vdGggdGhlIGVkZ2UKICBjb2xvdXIgKj0gMS4wIC0gc21vb3Roc3RlcCh0aHJlc2hvbGQgLSBzcXJ0T2ZIYWxmLCB0aHJlc2hvbGQgKyBzcXJ0T2ZIYWxmLCBwb3NpdGlvbik7CiAgcmV0dXJuIGNvbG91cjsKfQoKLyoqCiAqIEdldCB0aGUgZGlzdGFuY2UgYWxvbmcgdGhlIGxpbmUgaW4gcmFkaWFucwogKi8KZmxvYXQgZGlzdGFuY2VJblJhZGlhbnMoZmxvYXQgcG9zaXRpb24sIGZsb2F0IGZ1bGxMZW5ndGgsIGZsb2F0IGxlbmd0aEluUmFkaWFucykgewogIHJldHVybiAocG9zaXRpb24gLyBmdWxsTGVuZ3RoKSAqIGxlbmd0aEluUmFkaWFuczsKfQoKLyoqCiogZHJhd0xpbmUgLSBGaWxscyBpbiB0aGUgY29sb3VyIGZvciBzdHJhaWdodCBsaW5lcwoqCiovCnZlYzQgZHJhd0xpbmUodmVjNCBwaXhlbENvbG91ciwgYm9vbCBpc0Rhc2hlZE9yRG90dGVkLCBib29sIGlzRGFzaGVkTGluZSwgYm9vbCBpc0RvdHRlZExpbmUpIHsKICAvLyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgY2VudHJlIHRvIHRoZSBvdXRlciB2ZXJ0ZXgKICBmbG9hdCBzaGFwZVdpZHRoID0gdl9saW5lV2lkdGhEYXRhLng7CiAgLy8gdGhlIHZpc2libGUgd2lkdGggb2YgdGhlIGxpbmUKICBmbG9hdCBsaW5lV2lkdGggPSB2X2xpbmVXaWR0aERhdGEudzsKICAvLyBzaXplIG9mIGEgcGl4ZWwgaW4gc2NyZWVuIHNwYWNlCiAgZmxvYXQgcGl4ZWwgPSB2X2NvcmUuejsKICAvLyBub3JtYWxpc2VkIDAtPjEKICBmbG9hdCBkaXN0YW5jZUFsb25nTGluZSA9IHZfY29yZS54OwogIGZsb2F0IG51bWJlck9mRGFzaGVzT3JEb3RzID0gdl9jb3JlLnk7CiAgLy8gbGVuZ3RoIG9mIHRoZSBsaW5lIGluIHdvcmxkIHBpeGVscwogIGZsb2F0IGxpbmVMZW5ndGggPSB2X2xlbmd0aDsKICBmbG9hdCBoYWxmTGluZVdpZHRoID0gbGluZVdpZHRoIC8gMi4wOwogIGZsb2F0IGRhc2hMZW5ndGggPSB2X2Rhc2hpbmcueDsKICBmbG9hdCBkYXNoQWRqdXN0bWVudCA9IHZfZGFzaGluZy56OwogIGlmIChpc0Rhc2hlZE9yRG90dGVkKSB7CiAgICBmbG9hdCBkaXN0YW5jZUFsb25nRG90cyA9IGRpc3RhbmNlQWxvbmdMaW5lICogbnVtYmVyT2ZEYXNoZXNPckRvdHM7CiAgICB2ZWMyIHBvc2l0aW9uSW5MaW5lSW5Xb3JsZENvb3JkcyA9IHZlYzIoZGlzdGFuY2VBbG9uZ0xpbmUgKiBsaW5lTGVuZ3RoLCBzaGFwZVdpZHRoKTsKICAgIGZsb2F0IGRpc3RhbmNlVG9OZXh0UG9pbnQgPSBmcmFjdChkaXN0YW5jZUFsb25nRG90cykgLSBkYXNoQWRqdXN0bWVudDsKICAgIC8vIGlmIHdlIGFyZSBjbG9zZXIgdG8gdGhlIG5leHQgcG9pbnQgdGhhbiB0aGUgcHJldmlvdXMgb25lIHRoZW4gcm91bmQgdXAKICAgIGZsb2F0IG5leHRQb2ludElzSW5Gcm9udCA9IGZsb29yKGRpc3RhbmNlVG9OZXh0UG9pbnQgKyAwLjUpOwogICAgZmxvYXQgbmVhcmVzdERvdCA9IGRpc3RhbmNlQWxvbmdEb3RzIC0gZGlzdGFuY2VUb05leHRQb2ludCArIG5leHRQb2ludElzSW5Gcm9udDsKICAgIHZlYzIgbmVhcmVzdFBvaW50ID0gdmVjMigobmVhcmVzdERvdCAvIG51bWJlck9mRGFzaGVzT3JEb3RzKSAqIGxpbmVMZW5ndGgsIDAuMCk7CiAgICAKICAgIGZsb2F0IHdpZHRoT2ZEYXNoT3JEb3QgPSBoYWxmTGluZVdpZHRoOwogICAgaWYgKGlzRGFzaGVkTGluZSkgewogICAgICAvLyBvbmx5IGNvbXBhcmUgZnJvbSB0aGUgY2VudHJlIHBvaW50LCB0aGlzIHdpbGwgZW5zdXJlIGl0IGNyZWF0ZXMgcmVjdGFuZ3VsYXIgZGFzaGVzCiAgICAgIHBvc2l0aW9uSW5MaW5lSW5Xb3JsZENvb3Jkcy55ID0gMC4wOwogICAgICB3aWR0aE9mRGFzaE9yRG90ID0gZGFzaExlbmd0aCAvIDIuMDsKICAgICAgcGl4ZWxDb2xvdXIgPSBhbnRpYWxpYXNMaW5lRWRnZShwaXhlbENvbG91cik7CiAgICB9CiAgICBmbG9hdCBkaXN0ID0gZGlzdGFuY2UocG9zaXRpb25JbkxpbmVJbldvcmxkQ29vcmRzLCBuZWFyZXN0UG9pbnQpOwogICAgcGl4ZWxDb2xvdXIgKj0gMS4wIC0gYWFzdGVwKHdpZHRoT2ZEYXNoT3JEb3QsIGRpc3QpOwogICAgCiAgfSBlbHNlIHsKICAgIHBpeGVsQ29sb3VyID0gYW50aWFsaWFzTGluZUVkZ2UocGl4ZWxDb2xvdXIpOwogICAgLy8gc21vb3RoIG91dCB0aGUgbGluZSBlbmRzCiAgICBwaXhlbENvbG91ciAqPSBhYXN0ZXAocGl4ZWwsIHZfY29yZS54KTsKICAgIHBpeGVsQ29sb3VyICo9IDEuMCAtIGFhc3RlcCgxLjAgLSBwaXhlbCwgdl9jb3JlLngpOwogIH0KICByZXR1cm4gcGl4ZWxDb2xvdXI7Cn0KCi8qKgoqIGRyYXdBcmMgLSBGaWxscyBpbiB0aGUgY29sb3VyIGZvciBjdXJ2ZWQgbGluZXMKKgoqLwp2ZWM0IGRyYXdBcmModmVjNCBwaXhlbENvbG91ciwgYm9vbCBpc0Rhc2hlZE9yRG90dGVkLCBib29sIGlzRGFzaGVkTGluZSwgYm9vbCBpc0RvdHRlZExpbmUpIHsKICBmbG9hdCBsaW5lV2lkdGggPSB2X2xpbmVXaWR0aERhdGEudzsKICBmbG9hdCBudW1iZXJPZkRhc2hlc09yRG90cyA9IHZfY29yZS55OwogIGZsb2F0IHBpeGVsID0gdl9jb3JlLno7CiAgZmxvYXQgbGluZUxlbmd0aCA9IHZfbGVuZ3RoOwogIGZsb2F0IGhhbGZMaW5lV2lkdGggPSBsaW5lV2lkdGggLyAyLjA7CiAgZmxvYXQgYXJjUmFkaXVzID0gdl9jb3JlLmE7CiAgZmxvYXQgbGVuZ3RoT2ZBcmNJblJhZGlhbnMgPSB2X2xlbmd0aCAvIGFyY1JhZGl1czsgCiAgdmVjMiBwb3NpdGlvbiA9IHZfcG9zaXRpb24ueHk7CiAgdmVjMiBjaXJjbGVDZW50cmUgPSB2X3Bvc2l0aW9uLnp3OwogIGZsb2F0IGRpc3RGcm9tQ2VudHJlID0gZGlzdGFuY2UocG9zaXRpb24sIGNpcmNsZUNlbnRyZSk7CiAgaWYgKGlzRGFzaGVkT3JEb3R0ZWQpIHsKICAgIGZsb2F0IGRhc2hMZW5ndGggPSB2X2Rhc2hpbmcueDsKICAgIGZsb2F0IGRhc2hBZGp1c3RtZW50ID0gdl9kYXNoaW5nLno7CiAgICBmbG9hdCBudW1iZXJPZkRhc2hlc09yRG90cyA9IHZfY29yZS55OwogICAgZmxvYXQgYW5nbGVBcm91bmRUaGVDaXJjbGUgPSBhdGFuKHBvc2l0aW9uLnkgLSBjaXJjbGVDZW50cmUueSwgcG9zaXRpb24ueCAtIGNpcmNsZUNlbnRyZS54KTsKICAgIC8vIGRlYWwgd2l0aCB0YW5nZW50IGZsaXAgcG9pbnQgd2hlcmUgYXRhbjIgY2hhbmdlcyBmcm9tIC1waSB0byArcGkKICAgIGlmIChhbmdsZUFyb3VuZFRoZUNpcmNsZSA8IHZfY29yZS54KSB7CiAgICAgIGFuZ2xlQXJvdW5kVGhlQ2lyY2xlICs9IDIuMCAqIFBJOwogICAgfQogICAgZmxvYXQgbm9ybWFsaXNlZFNhID0gdl9jb3JlLng7CiAgICBmbG9hdCBkaXN0YW5jZUFyb3VuZEFyYyA9IChhbmdsZUFyb3VuZFRoZUNpcmNsZSAtIG5vcm1hbGlzZWRTYSkgLyAobGVuZ3RoT2ZBcmNJblJhZGlhbnMpOwogICAgZmxvYXQgZGlzdGFuY2VBbG9uZ1BvaW50cyA9IGRpc3RhbmNlQXJvdW5kQXJjICogbnVtYmVyT2ZEYXNoZXNPckRvdHM7CiAgICB2ZWMyIHBvc2l0aW9uSW5MaW5lSW5QaXhlbHMgPSBwb3NpdGlvbjsKICAgIGZsb2F0IGRpc3RhbmNlVG9OZXh0UG9pbnQgPSBmcmFjdChkaXN0YW5jZUFsb25nUG9pbnRzKSAtIGRhc2hBZGp1c3RtZW50OwogICAgLy8gaWYgd2UgYXJlIGNsb3NlciB0byB0aGUgbmV4dCBwb2ludCB0aGFuIHRoZSBwcmV2aW91cyBvbmUgdGhlbiByb3VuZCB1cAogICAgZmxvYXQgbmV4dFBvaW50SXNJbkZyb250ID0gZmxvb3IoZGlzdGFuY2VUb05leHRQb2ludCArIDAuNSk7CiAgICBmbG9hdCBuZWFyZXN0UG9pbnQgPSBkaXN0YW5jZUFsb25nUG9pbnRzIC0gZGlzdGFuY2VUb05leHRQb2ludCArIG5leHRQb2ludElzSW5Gcm9udCA7CiAgICBmbG9hdCBuZWFyZXN0UG9pbnRJblJhZGlhbnMgPSBkaXN0YW5jZUluUmFkaWFucyhuZWFyZXN0UG9pbnQsIG51bWJlck9mRGFzaGVzT3JEb3RzLCBsZW5ndGhPZkFyY0luUmFkaWFucykgKyBub3JtYWxpc2VkU2E7CiAKICAgIC8vIGRvdHRlZCBsaW5lcwogICAgaWYgKGlzRG90dGVkTGluZSkgewogICAgICB2ZWMyIG5lYXJlc3RQb2ludCA9IHZlYzIoCiAgICAgICAgY2lyY2xlQ2VudHJlLnggKyAoYXJjUmFkaXVzICogY29zKG5lYXJlc3RQb2ludEluUmFkaWFucykpLAogICAgICAgIGNpcmNsZUNlbnRyZS55ICsgKGFyY1JhZGl1cyAqIHNpbihuZWFyZXN0UG9pbnRJblJhZGlhbnMpKQogICAgICApOwogICAgICBmbG9hdCBkaXN0ID0gZGlzdGFuY2UocG9zaXRpb25JbkxpbmVJblBpeGVscywgbmVhcmVzdFBvaW50KTsKICAgICAgZmxvYXQgcmFkaXVzID0gaGFsZkxpbmVXaWR0aDsKICAgICAgcGl4ZWxDb2xvdXIgKj0gMS4wIC0gYWFzdGVwKHJhZGl1cywgZGlzdCk7CiAgICAvLyBkYXNoZXMgIAogICAgfSBlbHNlIHsKICAgICAgZmxvYXQgZGlzdFRvRGFzaCA9IGRpc3RhbmNlKGFuZ2xlQXJvdW5kVGhlQ2lyY2xlLCBuZWFyZXN0UG9pbnRJblJhZGlhbnMpOwogICAgICBmbG9hdCByYWRpdXMgPSBkaXN0YW5jZUluUmFkaWFucyhkYXNoTGVuZ3RoLzIuMCwgbGluZUxlbmd0aCwgbGVuZ3RoT2ZBcmNJblJhZGlhbnMpOwogICAgICBwaXhlbENvbG91ciAqPSAxLjAgLSBhYXN0ZXAocmFkaXVzLCBkaXN0VG9EYXNoKTsKICAgICAgcGl4ZWxDb2xvdXIgKj0gYWFzdGVwKGFyY1JhZGl1cyAsIGRpc3RGcm9tQ2VudHJlICsgaGFsZkxpbmVXaWR0aCk7CiAgICAgIHBpeGVsQ29sb3VyICo9IDEuMCAtIGFhc3RlcChhcmNSYWRpdXMgKyBoYWxmTGluZVdpZHRoLCBkaXN0RnJvbUNlbnRyZSk7CiAgICB9IAogIH0gZWxzZSB7CiAgICBmbG9hdCBkaXN0YW5jZUFsb25nQXJjID0gdl9jb3JlLnk7CiAgICBwaXhlbENvbG91ciAqPSBhYXN0ZXAoYXJjUmFkaXVzICwgZGlzdEZyb21DZW50cmUgKyBoYWxmTGluZVdpZHRoKTsKICAgIHBpeGVsQ29sb3VyICo9IDEuMCAtIGFhc3RlcChhcmNSYWRpdXMgKyBoYWxmTGluZVdpZHRoLCBkaXN0RnJvbUNlbnRyZSk7CiAgICAvLyBzbW9vdGggb3V0IHRoZSBsaW5lIGVuZHMKICAgIHBpeGVsQ29sb3VyICo9IGFhc3RlcChwaXhlbCwgZGlzdGFuY2VBbG9uZ0FyYyk7CiAgICBwaXhlbENvbG91ciAqPSAxLjAgLSBhYXN0ZXAoMS4wIC0gcGl4ZWwsIGRpc3RhbmNlQWxvbmdBcmMpOwogIH0KICByZXR1cm4gcGl4ZWxDb2xvdXI7Cn0KCi8qKgoqCiogbWFpbiAtIHNldHMgdXAgYW5kIGNob29zZXMgdGhlIGNvcnJlY3Qgc2hhZGVyIGNvZGUgdG8gcnVuIGRlcGVuZGluZyBvbiB0aGUgcHJpbWl0aXZlIHR5cGUgYW5kIHN0eWxlCioKKi8Kdm9pZCBtYWluKCkgewogIGludCBzaGFkb3dUeXBlID0gaW50KHVfc2hhZG93VHlwZSk7CiAgZmxvYXQgbGluZVR5cGVGID0gYWJzKHZfbGluZVR5cGUpOwogIGludCBsaW5lVHlwZSA9IHJvdW5kVG9JbnQobGluZVR5cGVGKTsKICAvLyBkaXNhYmxlIGFhIHdoZW4gdHlwZSA9PSAxCiAgYm9vbCBpc0FyYyA9IHNpZ24odl9saW5lVHlwZSkgPCAwLjA7CiAgLy8gRm9yIHNvbWUgcmVhc29uLCBjb21wYXJpbmcgdHdvIGJvb2xlYW5zIGhhcyBhIGh1Z2UgaW1wYWN0IG9uIHBlcmZvcm1hbmNlCiAgYm9vbCBpc0Rhc2hlZE9yRG90dGVkID0gbGluZVR5cGVGID4gMS41OwogIGJvb2wgaXNEYXNoZWRMaW5lID0gbGluZVR5cGUgPT0gTElORV9UWVBFX0RBU0g7CiAgYm9vbCBpc0RvdHRlZExpbmUgPSBsaW5lVHlwZSA9PSBMSU5FX1RZUEVfRE9UOwogIGJvb2wgaXNBcnJvd2hlYWQgPSBsaW5lVHlwZSA+PSBMSU5FX1RZUEVfQVJST1dIRUFEOwogIGJvb2wgZXhjbHVkZUZyb21TaGFkb3cgPSBzaGFkb3dUeXBlID09IC0xOwogIGJvb2wgb25seU9uU2hhZG93ID0gc2hhZG93VHlwZSA9PSAxOwogIGlmIChpbnQodV9oaXRUZXN0KSA9PSAxKSB7CiAgICAvLyBFeGNsdWRlIGZyb20gc2hhZG93CiAgICBpZihleGNsdWRlRnJvbVNoYWRvdykgewogICAgICBkaXNjYXJkOwogICAgfSBlbHNlIHsKICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh2X2hpdFRlc3RDb2xvdXIgLyAyNTUuMCwgMS4wKTsKICAgIH0KICAvLyBzaG93IG9ubHkgb24gc2hhZG93CiAgfSBlbHNlIGlmIChvbmx5T25TaGFkb3cpIHsKICAgIGRpc2NhcmQ7CiAgfSBlbHNlIHsKICAgIHZlYzQgcGl4ZWxDb2xvdXIgPSB2X2NvbG91cjsKICAgIGlmIChpc0Fycm93aGVhZCkgewogICAgICAvLyBTbW9vdGggdGhlIGVkZ2VzIG9mIHRoZSB0cmlhbmdsZSB1c2luZyB0aGUgYmFyeWNlbnRyaWMgY29vcmRpbmF0ZXMgdG8gbWVhc3VyZSB0aGUgZGlzdGFuY2UKICAgICAgLy8gdG8gZWFjaCBlZGdlCiAgICAgIHBpeGVsQ29sb3VyICo9IGFhc3RlcCh2X2JhcnljZW50cmljLmEsIGVkZ2VGYWN0b3Iodl9iYXJ5Y2VudHJpYy5yZ2IpKTsgCiAgICB9IGVsc2UgewogICAgICBpZiAoaXNBcmMpIHsKICAgICAgICBwaXhlbENvbG91ciA9IGRyYXdBcmMocGl4ZWxDb2xvdXIsIGlzRGFzaGVkT3JEb3R0ZWQsIGlzRGFzaGVkTGluZSwgaXNEb3R0ZWRMaW5lKTsKICAgICAgfSBlbHNlIHsKICAgICAgICBwaXhlbENvbG91ciA9IGRyYXdMaW5lKHBpeGVsQ29sb3VyLCBpc0Rhc2hlZE9yRG90dGVkLCBpc0Rhc2hlZExpbmUsIGlzRG90dGVkTGluZSk7CiAgICAgIH0KICAgIH0KICAgIC8vIGFzc2lnbiB0aGUgZmluYWwgY29sb3VyIHRvIHRoZSBmcmFnbWVudAogICAgZ2xfRnJhZ0NvbG9yID0gcGl4ZWxDb2xvdXI7CiAgICAvLyB1bmNvbW1lbnQgdGhpcyBsaW5lIHRvIGRlYnVnIGxpbmUgc2hhcGUKICAgIC8vZ2xfRnJhZ0NvbG9yID0gdmVjNChwaXhlbENvbG91ci5hLHBpeGVsQ29sb3VyLmEsMC4wLDEuMCk7CiAgfQp9")
}(),
function() {
    var e = KeyLines.WebGL;
    e && (e["line-vertex"] = "cHJlY2lzaW9uIGhpZ2hwIGZsb2F0OwphdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uMTsKYXR0cmlidXRlIHZlYzIgYV9wb3NpdGlvbjI7CmF0dHJpYnV0ZSB2ZWMyIGFfcG9zaXRpb24zOwphdHRyaWJ1dGUgdmVjNCBhX3ZlcnRleEluZm87CmF0dHJpYnV0ZSB2ZWM0IGFfY29sb3VyOwphdHRyaWJ1dGUgdmVjMyBhX2hpdFRlc3RDb2xvdXI7CmF0dHJpYnV0ZSBmbG9hdCBhX2luZGV4OwoKdW5pZm9ybSBmbG9hdCB1X2hpdFRlc3Q7CnVuaWZvcm0gdmVjMyB1X3Jlc29sdXRpb247CnVuaWZvcm0gbWF0NCB1X3RyYW5zZm9ybTsKdW5pZm9ybSBmbG9hdCB1X3pvb207CnVuaWZvcm0gZmxvYXQgdV92aWV3SW5kZXBlbmRlbnQ7Cgp2YXJ5aW5nIHZlYzQgdl9jb2xvdXI7CnZhcnlpbmcgdmVjNCB2X3ZlcnRleEluZm87CnZhcnlpbmcgdmVjNCB2X2NvcmU7CnZhcnlpbmcgdmVjMyB2X2hpdFRlc3RDb2xvdXI7CnZhcnlpbmcgdmVjNCB2X2xpbmVXaWR0aERhdGE7CnZhcnlpbmcgZmxvYXQgdl9sZW5ndGg7CnZhcnlpbmcgZmxvYXQgdl96b29tOwp2YXJ5aW5nIGxvd3AgZmxvYXQgdl9saW5lVHlwZTsKdmFyeWluZyB2ZWM0IHZfYmFyeWNlbnRyaWM7CnZhcnlpbmcgdmVjNCB2X3Bvc2l0aW9uOwp2YXJ5aW5nIHZlYzMgdl9kYXNoaW5nOwoKaW50IExJTkVfVFlQRV9EQVNIID0gMjsKaW50IExJTkVfVFlQRV9ET1QgPSAzOwppbnQgTElORV9UWVBFX0FSUk9XSEVBRCA9IDQ7CgppbnQgcm91bmRUb0ludChmbG9hdCBhKSB7CiAgcmV0dXJuIGludChmbG9vcihhICsgMC41KSk7Cn0KCmZsb2F0IGdldE51bWJlck9mRGFzaGVzKGZsb2F0IGRhc2hMZW5ndGgsIGZsb2F0IGxlbmd0aE9mQXJjKSB7CiAgZmxvYXQgZ2FwV2lkdGggPSBkYXNoTGVuZ3RoIC8gMi4wOwogIGZsb2F0IG51bU9mRGFzaGVzID0gZmxvb3IoKChsZW5ndGhPZkFyYyArIGdhcFdpZHRoKSAvIChkYXNoTGVuZ3RoICsgZ2FwV2lkdGgpKSArIDAuNSk7CiAgaWYgKChudW1PZkRhc2hlcyAqIGRhc2hMZW5ndGgpID4gbGVuZ3RoT2ZBcmMpIHsKICAgIG51bU9mRGFzaGVzID0gMS4wOwogIH0KICByZXR1cm4gbnVtT2ZEYXNoZXM7Cn0KCnZvaWQgbWFpbigpIHsKICAvLyBEaXZpZGUgbWluV2lkdGggYnkgcGl4ZWwgZGVuc2l0eSBzbyByZXRpbmEgc2NyZWVuIHJldGFpbiBjb3JyZWN0IHdpZHRoCiAgZmxvYXQgbWluV2lkdGggPSAxLjAgLyB1X3Jlc29sdXRpb24uejsKICBpbnQgbGluZVR5cGUgPSBpbnQoYV92ZXJ0ZXhJbmZvLncpOwogIGJvb2wgaXNEYXNoZWRMaW5lID0gbGluZVR5cGUgPT0gTElORV9UWVBFX0RBU0g7CiAgYm9vbCBpc0RvdHRlZExpbmUgPSBsaW5lVHlwZSA9PSBMSU5FX1RZUEVfRE9UOwogIGJvb2wgaXNBcnJvd2hlYWQgPSBsaW5lVHlwZSA9PSBMSU5FX1RZUEVfQVJST1dIRUFEOwogIHZlYzIgcG9zaXRpb247CiAgZmxvYXQgbGVuZ3RoSW5Xb3JsZENvb3JkczsKICAvLyBob3cgbXVjaCBzbW9vdGhpbmcgdG8gYXBwbHkgdG8gdGhlIGVkZ2Ugb2YgdGhlIGFycm93aGVhZAogIGZsb2F0IGFudGlBbGlhc2luZ1RocmVzaG9sZDsKICBpZiAoaXNBcnJvd2hlYWQpIHsKICAgIGludCB2ZXJ0ZXhJbmRleCA9IGludChhX2luZGV4KTsKICAgIHZlYzIgcG9zaXRpb24xID0gYV9wb3NpdGlvbjE7CiAgICB2ZWMyIHBvc2l0aW9uMiA9IGFfcG9zaXRpb24yOwogICAgdmVjMiBwb3NpdGlvbjMgPSBhX3Bvc2l0aW9uMzsKICAgIGZsb2F0IGRpc3RhbmNlSW5Xb3JsZFBpeGVscyA9IGRpc3RhbmNlKHBvc2l0aW9uMiwgcG9zaXRpb24zKTsKICAgIGZsb2F0IGRpc3RhbmNlSW5TY3JlZW5QaXhlbHMgPSBkaXN0YW5jZUluV29ybGRQaXhlbHMgLyB1X3pvb207CiAgICBhbnRpQWxpYXNpbmdUaHJlc2hvbGQgPSAxLjAgLyBkaXN0YW5jZUluU2NyZWVuUGl4ZWxzOwogICAgdmVjMiBvcHBvc2l0ZU1pZFBvaW50OwogICAgaWYodmVydGV4SW5kZXggPT0gMCkgewogICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uMTsKICAgICAgb3Bwb3NpdGVNaWRQb2ludCA9IChwb3NpdGlvbjIgKyBwb3NpdGlvbjMpIC8gMi4wOwogICAgfSBlbHNlIGlmICh2ZXJ0ZXhJbmRleCA9PSAxKSB7CiAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24yOwogICAgICBvcHBvc2l0ZU1pZFBvaW50ID0gKHBvc2l0aW9uMSArIHBvc2l0aW9uMykgLyAyLjA7CiAgICB9IGVsc2UgaWYgKHZlcnRleEluZGV4ID09IDIpIHsKICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbjM7CiAgICAgIG9wcG9zaXRlTWlkUG9pbnQgPSAocG9zaXRpb24yICsgcG9zaXRpb24xKSAvIDIuMDsKICAgIH0KICAgIHZlYzIgdW5pdFZlY3RvckZvckV4dHJ1c2lvbiA9IG5vcm1hbGl6ZShwb3NpdGlvbiAtIG9wcG9zaXRlTWlkUG9pbnQpOwogICAgLy8gcHVzaCB2ZXJ0ZXggYXdheSBmcm9tIGNlbnRyZSB0byBtYWtlIGl0IGJpZ2dlciBzbyB0aGF0IGFudGlhbGlzaW5nIGhhcyByb29tIHRvIHNtb290aCB0aGUgamFnZ2llcwogICAgcG9zaXRpb24gKz0gdW5pdFZlY3RvckZvckV4dHJ1c2lvbiAvIHVfem9vbTsKICB9IGVsc2UgewogICAgLy8gTWFrZSBpdCB3aWRlciB0byBhbGxvdyB0aGUgYW50aSBhbGlhc2luZyB0byBlYXQgaW50byB0aGUgbGluZSBpbiBvcmRlciB0byBtYWtlIGl0IHNtb290aAogICAgZmxvYXQgYWFXaWR0aEJ1ZmZlciA9IDEuMCAvIHVfem9vbTsKCgogICAgaWYodV9oaXRUZXN0ID09IDEuMCkgewogICAgICAvLyBhZGQgNyBzY3JlZW4gcGl4ZWxzIHRvIHRoZSBsaW5lIHRoaWNrbmVzcwogICAgICBhYVdpZHRoQnVmZmVyID0gNy4wIC8gdV96b29tOwogICAgfQogICAgLy8gaW5jcmVhc2UgbWluLXdpZHRoIGZvciBkb3R0ZWQgbGluZSAjMjQyNgogICAgaWYoaXNEb3R0ZWRMaW5lKSB7CiAgICAgIG1pbldpZHRoID0gbWF4KG1pbldpZHRoLCBzdGVwKDIuNSwgYV92ZXJ0ZXhJbmZvLncpICogMi4wKTsKICAgIH0KICAgIAogICAgLy8gYSB2ZWN0b3IgaW4gdGhlIGRpcmVjdGlvbiBvZiB0aGUgbGluZSB3aXRoIGEgbGVuZ3RoIG9mIDEKICAgIHZlYzIgdW5pdFZlY3RvciA9IG5vcm1hbGl6ZShhX3Bvc2l0aW9uMiAtIGFfcG9zaXRpb24xKTsKICAgIC8vIHVuaXQgdmVjdG9yIHdpdGggYSBsZW5ndGggb2YgMSBzY3JlZW4gcGl4ZWwKICAgIHZlYzIgdW5pdFZlY3RvckluVmlldyA9IHVuaXRWZWN0b3IgLyB1X3pvb207CiAgICAvLyBEaXJlY3Rpb24gb2YgdGhlIG5vcm1hbCB2ZWN0b3IKICAgIGZsb2F0IG5vcm1hbFBvaW50c1Vwd2FyZCA9IGFfdmVydGV4SW5mby55IC0gMS4wOwogICAgCiAgICAvLyBUaGUgVVYgY29vcmRzIGZyb20gMCAtPiAxLCB1c2VkIGZvciBkYXNoaW5nCiAgICBmbG9hdCB1diA9IGFfdmVydGV4SW5mby54ICsgYV92ZXJ0ZXhJbmZvLno7CiAgICAKICAgIHZlYzIgZGlzdGFuY2VWZWN0b3IgPSBhX3Bvc2l0aW9uMiAtIGFfcG9zaXRpb24xOwogICAgCiAgICB2ZWMyIG5vcm1hbCA9IG5vcm1hbGl6ZSh2ZWMyKC1kaXN0YW5jZVZlY3Rvci55LCBkaXN0YW5jZVZlY3Rvci54KSk7CiAgICAKICAgIC8vIFdoZXRoZXIgdGhlIHZlcnRleCBpcyBhdCB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBsaW5lLgogICAgaWYoaW50KGFfdmVydGV4SW5mby54KSA9PSAwKSB7CiAgICAgIHBvc2l0aW9uID0gYV9wb3NpdGlvbjEgLSB1bml0VmVjdG9ySW5WaWV3OwogICAgfSBlbHNlIHsKICAgICAgcG9zaXRpb24gPSBhX3Bvc2l0aW9uMiArIHVuaXRWZWN0b3JJblZpZXc7CiAgICB9CiAgICAvLyB0aGUgcmVhbCB2aXNpYmxlIHdpZHRoIG9mIHRoZSBsaW5lCiAgICBmbG9hdCBsaW5lV2lkdGggPSBhX3Bvc2l0aW9uMy54OwogICAgaWYoaW50KHVfdmlld0luZGVwZW5kZW50KSA9PSAwKSB7CiAgICAgIGxpbmVXaWR0aCA9IG1heCgobGluZVdpZHRoKSAqIHVfem9vbSwgbWluV2lkdGgpIC8gdV96b29tOwogICAgfQogICAgLy8gdGhlIHdpZHRoIG9mIHRoZSB1bmRlcmx5aW5nIHNoYXBlIHRoYXQgY29udGFpbnMgdGhlIGxpbmUKICAgIGZsb2F0IHNoYXBlV2lkdGggPSBsaW5lV2lkdGggKyBhYVdpZHRoQnVmZmVyOyAKICAgIC8vIGdldCB2ZWN0b3IgZm9yIGxpbmUKICAgIHZlYzIgbm9ybWFsVmVjID0gbm9ybWFsICogKHNoYXBlV2lkdGgvMi4wKSAqIG5vcm1hbFBvaW50c1Vwd2FyZDsKICAgIHBvc2l0aW9uID0gcG9zaXRpb24gKyBub3JtYWxWZWM7CiAgICAvLyBsZW5ndGggb2YgdGhlIGxpbmUgaW4gd29ybGQgY29vcmRpbmF0ZXMKICAgIGZsb2F0IGxpbmVMZW5ndGggPSBkaXN0YW5jZShhX3Bvc2l0aW9uMSwgYV9wb3NpdGlvbjIpOwogICAgZmxvYXQgbGluZUxlbmd0aEluUGl4ZWxzID0gbGluZUxlbmd0aCAqIHVfem9vbTsKICAgIGZsb2F0IHBpeGVsU2l6ZSA9ICgxLjAgLyBsaW5lTGVuZ3RoKSAvIHVfem9vbTsKICAgIC8vRG90dGVkIGxpbmVzLCBzbyBjYWxjIHV2IGxlbmd0aAogICAgaWYoaXNEb3R0ZWRMaW5lKSB7CiAgICAgIC8vIGFzIGxpbmVzIGdldCBzbWFsbGVyIGFuZCBzbWFsbGVyIGxpbWl0IHRoZSBudW1iZXIgb2YgZG90cyBzbyB0aGUgc3RpbGwgbG9vayBuaWNlCiAgICAgIGZsb2F0IG1pbmltdW1Eb3RzID0gbGluZUxlbmd0aEluUGl4ZWxzIC8gNC4wOwogICAgICAvLyBieSBkZWZhdWx0IHNldCB0aGUgbnVtYmVyIG9mIGRvdHMgdG8gdGhlIHByb3BvcnRpb24gb2YgdGhlIGxpbmUgbGVuZ3RoIGFuZCBsaW5lIHdpZHRoCiAgICAgIGZsb2F0IG51bWJlckRvdHNCeUxpbmVXaWR0aCA9IGxpbmVMZW5ndGggLyAobGluZVdpZHRoICogMi4wKTsKICAgICAgLy8gY2hvb3NlIHRoZSBzbWFsbGVzdCBudW1iZXIsIGFzIHRoZSBsaW5lIGdldHMgdG9vIHNtYWxsIHJlZHVjaW5nIHRoZSBudW1iZXIgb2YgZG90cwogICAgICAvLyBieSB0aGUgem9vbSBsZXZlbCBoZWxwcyBpdCB0byBzdGF5IHJlYWRhYmxlCiAgICAgIGZsb2F0IG51bU9mRG90cyA9IG1pbihtaW5pbXVtRG90cywgbnVtYmVyRG90c0J5TGluZVdpZHRoKTsKICAgICAgLy8gcm91bmQgdXAgdGhlIG51bWJlciBvZiBkb3RzIHNvIHRoYXQgd2UgYWx3YXlzIGRyYXcgYSB3aG9sZSBkb3QKICAgICAgdl9jb3JlID0gdmVjNCh1diwgY2VpbChudW1PZkRvdHMpLCBwaXhlbFNpemUsIDAuMCk7CiAgICAgIHZfZGFzaGluZyA9IHZlYzMobGluZVdpZHRoLCBsaW5lV2lkdGgsIDAuNSk7CiAgICB9IGVsc2UgaWYoaXNEYXNoZWRMaW5lKSB7CiAgICAgIC8vIGxlbmd0aCBvZiB0aGUgZGFzaCB3aXRoIGFkanVzdG1lbnRzIGlmIHRoZSBkYXNoIGxlbmd0aCBpcyBsZXNzIHRoYW4gMiBzY3JlZW4gcGl4ZWxzCiAgICAgIGZsb2F0IGRhc2hMZW5ndGggPSBtYXgoMi4wIC8gdV96b29tLCBsaW5lV2lkdGggKiAyLjApOwogICAgICAvLyB0aGUgbnVtYmVyIG9mIGRhc2hlcyB3ZSdyZSBhaW1pbmcgZm9yCiAgICAgIGZsb2F0IGRhc2hlcyA9IGdldE51bWJlck9mRGFzaGVzKGRhc2hMZW5ndGgsIGxpbmVMZW5ndGgpOwogICAgICAvLyBXZSB3YW50IHRvIHN0YXJ0IGFuZCBlbmQgb24gYSBkYXNoIHdpdGhvdXQgYWx0ZXJpbmcgdGhlIGxlbmd0aCBvZiB0aGUgZGFzaCBzbyBpbnN0ZWFkIHdlCiAgICAgIC8vIG5lZWQgdG8gYWx0ZXIgdGhlIGdhcCBsZW5ndGguICBUaGlzIHdpbGwgdGVsbCB1cyBob3cgbG9uZyBhIGdhcCB3ZSB3aWxsIG5lZWQuCiAgICAgIGZsb2F0IGdhcFdpZHRoID0gKGxpbmVMZW5ndGggLSBkYXNoTGVuZ3RoICogZGFzaGVzKSAvIChkYXNoZXMgLSAxLjApOwogICAgICAvLyB0byBlbmQgb24gYSBkYXNoIHdlIG5lZWQgdG8gcmVtb3ZlIGEgZ2FwcyBsZW5ndGggZnJvbSB0aGUgZW5kCiAgICAgIGZsb2F0IGdhcE92ZXJQZXJpb2QgPSBnYXBXaWR0aCAqIGRhc2hlcyAvIChsaW5lTGVuZ3RoICsgZ2FwV2lkdGgpOwogICAgICAvLyBwYXNzIHRoZSBzdGFydCBhbmdsZSBhbmQgdGhlIG51bWJlciBvZiBkYXNoZXMgbWludXMgdGhlIGxlbmd0aCBvZiBhIGdhcAogICAgICB2X2NvcmUgPSB2ZWM0KHV2LCBkYXNoZXMgLSBnYXBPdmVyUGVyaW9kLCBwaXhlbFNpemUsIDAuMCk7CiAgICAgIGZsb2F0IGRhc2hBZGp1c3RtZW50ID0gKGRhc2hMZW5ndGggLyAoZGFzaExlbmd0aCArIGdhcFdpZHRoKSkgLyAyLjA7CiAgICAgIHZfZGFzaGluZyA9IHZlYzMoZGFzaExlbmd0aCwgZ2FwV2lkdGgsIGRhc2hBZGp1c3RtZW50KTsKICAgIH0gZWxzZSB7CiAgICAgIC8vIGFsbG93cyB1cyB0byBkZXRlcm1pbmUgb3VyIHBvc2l0aW9uIG9uIHRoZSBsaW5lIGluIHRoZSBmcmFnbWVudCBzaGFkZXIKICAgICAgdl9jb3JlID0gdmVjNCh1diwgMC4wLCBwaXhlbFNpemUsIDAuMCk7CiAgICB9CiAgICAKICAgIC8vIHNldCB0aGUgd2lkdGggb24gdGhlIHZlcnRleCBzbyB0aGF0IHdlIGNhbiBtZWFzdXJlIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBlZGdlIGluIHRoZSBmcmFnbWVudAogICAgLy8gc2hhZGVyCiAgICBpZihpbnQobm9ybWFsUG9pbnRzVXB3YXJkKSA9PSAxKSB7CiAgICAgIC8vIHBhc3MgdGhlIGFjdHVhbCB3aWR0aCBvZiB0aGUgZ2VvbWV0cnkgKHNoYXBlV2lkdGgpIGFuZCB0aGUgd2lkdGggd2UnbGwgdXNlIGFzIHRoZSBhY3R1YWwKICAgICAgLy8gdmlzaWJsZSBsaW5lICh2X3dpZHRoKQogICAgICB2X2xpbmVXaWR0aERhdGEgPSB2ZWM0KC1zaGFwZVdpZHRoLzIuMCwgLWxpbmVXaWR0aC8yLjAsIHNoYXBlV2lkdGgsIGxpbmVXaWR0aCk7CiAgICB9IGVsc2UgewogICAgICB2X2xpbmVXaWR0aERhdGEgPSB2ZWM0KHNoYXBlV2lkdGgvMi4wLCBsaW5lV2lkdGgvMi4wLCBzaGFwZVdpZHRoLCBsaW5lV2lkdGgpOwogICAgfQogICAgdl9sZW5ndGggPSBsaW5lTGVuZ3RoOwogIH0KICAvKgogICBjb252ZXJ0IHRvIGNsaXBzcGFjZSAKICAqLwogIC8vIGNvbnZlcnQgdGhlIHJlY3RhbmdsZSBmcm9tIHBpeGVscyB0byAwLjAgdG8gMS4wCiAgdmVjMiB6ZXJvVG9PbmUgPSBwb3NpdGlvbiAvIHVfcmVzb2x1dGlvbi54eTsKICAKICAvLyBjb252ZXJ0IGZyb20gMC0+MSB0byAwLT4yCiAgdmVjMiB6ZXJvVG9Ud28gPSB6ZXJvVG9PbmUgKiAyLjA7CiAgCiAgLy8gY29udmVydCBmcm9tIDAtPjIgdG8gLTEtPisxIChjbGlwc3BhY2UpCiAgdmVjMiBjbGlwU3BhY2UgPSB6ZXJvVG9Ud28gLSAxLjA7CiAgCiAgLyoKICAgQXNzaWduIFZhcnlpbmdzCiAgKi8gCiAgdmVjNCBwaXhlbENvbG91ciA9IGFfY29sb3VyOwogIC8vIG5vcm1hbGlzZSBjb2xvdXIgdmFsdWVzCiAgcGl4ZWxDb2xvdXIgLz0gMjU1LjA7CiAgLy8gTXVsdGlwbHkgY29sb3VyIGJ5IHRoZSBhbHBoYSwgdGhpcyBpcyBiZWNhdXNlIGluIHRoZSByZWFsIHdvcmxkIHdoZW4gbGlnaHQgcGFzc2VzIHRocm91Z2gKICAvLyBhbiBvYmplY3QgaXQgZ2V0cyB3ZWFrZXIgYXMgbGlnaHQgaXMgYWJzb3JiZWQuICBXZSBuZWVkIHRvIGRvIHRoZSBzYW1lLgogIHBpeGVsQ29sb3VyLnJnYiAqPSBwaXhlbENvbG91ci5hOwogIHZfY29sb3VyID0gcGl4ZWxDb2xvdXI7CgogIC8vIGNvbG91ciB0byB1c2UgZm9yIGhpdCB0ZXN0aW5nIChzaGFkb3cgY2FudmFzIGNvbG91cikKICB2X2hpdFRlc3RDb2xvdXIgPSBhX2hpdFRlc3RDb2xvdXI7CiAgdl96b29tID0gdV96b29tOwogIHZfbGluZVR5cGUgPSBhX3ZlcnRleEluZm8udzsKCiAgCiAgdl9iYXJ5Y2VudHJpYyA9IHZlYzQoYV92ZXJ0ZXhJbmZvLnh5eiwgYW50aUFsaWFzaW5nVGhyZXNob2xkKTsKICAKICAvKgogICBBc3NpZ24gZmluYWwgdmVydGV4IHBvc2l0aW9uIGFuZCBhcHBseSB0cmFuc2Zvcm1zIGZvciB6b29tL3BhbgogICovCiAgZ2xfUG9zaXRpb24gPSB1X3RyYW5zZm9ybSAqIHZlYzQoY2xpcFNwYWNlICogdmVjMigxLCAtMSksIDAsIDEpOwp9")
}(),
function() {
    var e = KeyLines.WebGL;
    e && (e["triangle-fragment"] = "I2lmZGVmIEdMX09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcwojZXh0ZW5zaW9uIEdMX09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcyA6IGVuYWJsZQojZW5kaWYKCnByZWNpc2lvbiBoaWdocCBmbG9hdDsKCi8vIG91ciB0ZXh0dXJlCnVuaWZvcm0gc2FtcGxlcjJEIHVfaW1hZ2VbOF07CnVuaWZvcm0gbG93cCBmbG9hdCB1X2hpdFRlc3Q7CnVuaWZvcm0gdmVjMyB1X3Jlc29sdXRpb247CnVuaWZvcm0gZmxvYXQgdV9zaGFkb3dUeXBlOwp1bmlmb3JtIGZsb2F0IHVfem9vbTsKCi8vIHRoZSB0ZXhDb29yZHMgcGFzc2VkIGluIGZyb20gdGhlIHZlcnRleCBzaGFkZXIuCnZhcnlpbmcgdmVjNCB2X3RleENvb3JkOwovLyBjb2xvdXIgb2YgZmxhdCBzaGFkZWQgdHJpYW5nbGVzCnZhcnlpbmcgdmVjNCB2X2NvbG91cjsKLy8gc2hhZG93Y2FudmFzIGNvbG91ciBtYXBwaW5nCnZhcnlpbmcgdmVjNCB2X2hpdFRlc3RDb2xvdXI7Ci8vIHdoaWNoIHRleHR1cmUgdG8gdXNlCnZhcnlpbmcgdmVjMiB2X3RleHR1cmVCYW5rOwovLyBjaXJjbGUgYm9yZGVyIHdpZHRoCnZhcnlpbmcgZmxvYXQgdl93aWR0aDsKdmFyeWluZyBmbG9hdCB2X2NpcmNsZVJhZGl1czsKLy8gdGhlIHNpemUgb2YgYSBwaXhlbCBpbiBzY3JlZW5zcGFjZSBjbGlwIGNvb3JkaW5hdGVzCnZhcnlpbmcgZmxvYXQgdl9waXhlbDsKdmFyeWluZyB2ZWMyIHZfZG9udXRTZWdtZW50OwoKY29uc3QgZmxvYXQgUEkgPSAzLjE0MTU5MjY1MzU4OTc5MzIzODQ2MjY0MzM4MzI3OTU7Ci8vIFBlcmZvcm1hbmNlIGFudGlhbGlhc2luZyB1c2luZyBzdGFuZGFyZCBkZXJpdmF0aXZlcwovLyBTbW9vdGhzIHRoZSBmcmFnbWVudCBvdmVyIDEgcGl4ZWwgd2hlbiB2YWx1ZSBpcyBtb3JlIHRoYW4gdGhyZXNob2xkCi8vIGVzZW50aWFsbHkgYSBiZXR0ZXIgdmVyc2lvbiBvZiBzdGVwIGFuZCBzbW9vdGhzdGVwCmZsb2F0IGFhc3RlcChmbG9hdCB0aHJlc2hvbGQsIGZsb2F0IHZhbHVlKSB7CiAgZmxvYXQgYWZ3aWR0aCA9IGxlbmd0aCh2ZWMyKGRGZHgodmFsdWUpLCBkRmR5KHZhbHVlKSkpICogMC43MDcxMDY3ODExODY1NDc1NzsKICByZXR1cm4gc21vb3Roc3RlcCh0aHJlc2hvbGQtYWZ3aWR0aCwgdGhyZXNob2xkK2Fmd2lkdGgsIHZhbHVlKTsKfQoKLy8gZW5zdXJlcyB0aGF0IG51bWJlcnMgYXJlIGV4YWN0bHkgaW50ZWdlcnMgCmludCByb3VuZFRvSW50KGZsb2F0IGEpIHsKIHJldHVybiBpbnQoZmxvb3IoYSArIDAuNSkpOwp9CgpmbG9hdCBnZXRCb3JkZXJXaWR0aFpvb20oZmxvYXQgYm9yZGVyV2lkdGgpIHsKICAvLyByZXR1cm5zIDAgd2hlbiBib3JkZXIgaXMgbGFyZ2VyIHRoYW4gb25lIHNjcmVlbiBwaXhlbAogIGZsb2F0IGlzQm9yZGVyTGVzc1RoYW4xUGl4ZWwgPSAxLjAgLSBzdGVwKDEuMCwgYm9yZGVyV2lkdGggKiB1X3pvb20pOwogIGZsb2F0IHVuaXRzUGVyU2NyZWVuUGl4ZWwgPSAoMS4wIC8gdV96b29tKTsKICAvLyBJZiB0aGUgYm9yZGVyIHdpZHRoIGluIHNjcmVlbiBwaXhlbHMgaXMgbGVzcyB0aGFuIG9uZSwgc2V0IGl0IHRvIDEgc2NyZWVuIHBpeGVsCiAgcmV0dXJuIG1heChib3JkZXJXaWR0aCwgaXNCb3JkZXJMZXNzVGhhbjFQaXhlbCAqIHVuaXRzUGVyU2NyZWVuUGl4ZWwpOwp9CgpmbG9hdCByZWN0YW5nbGVCb3JkZXIoZmxvYXQgYm9yZGVyV2lkdGgpIHsKICBmbG9hdCB0b3BMZWZ0ID0gYWFzdGVwKHZfdGV4Q29vcmQueCwgYm9yZGVyV2lkdGgpOwogIGZsb2F0IHRvcFJpZ2h0ID0gYWFzdGVwKHZfdGV4Q29vcmQueSwgYm9yZGVyV2lkdGgpOwogIGZsb2F0IGJvdHRvbUxlZnQgPSBhYXN0ZXAodl90ZXhDb29yZC56IC0gdl90ZXhDb29yZC54LCBib3JkZXJXaWR0aCk7CiAgZmxvYXQgYm90dG9tUmlnaHQgPSBhYXN0ZXAodl90ZXhDb29yZC53IC0gdl90ZXhDb29yZC55LCBib3JkZXJXaWR0aCk7CiAgZmxvYXQgdG9wID0gbWF4KHRvcExlZnQsIHRvcFJpZ2h0KTsgCiAgZmxvYXQgYm90dG9tID0gbWF4KGJvdHRvbUxlZnQsIGJvdHRvbVJpZ2h0KTsgCiAgcmV0dXJuIG1heCh0b3AsIGJvdHRvbSk7Cn0KCi8vIGRpc3RhbmNlIHRvIGVkZ2UgZnJvbSBhIHRyaWFuZ2xlLCB1c2VkIGZvciBzbW9vdGhpbmcgZWRnZXMgb2YgYXJyb3dzCmZsb2F0IGVkZ2VGYWN0b3IodmVjMyBiYXJ5Y2VudHJpY0Nvb3JkcykgewogIHZlYzMgZCA9IGZ3aWR0aChiYXJ5Y2VudHJpY0Nvb3Jkcyk7CiAgdmVjMyBhMyA9IHNtb290aHN0ZXAodmVjMygwLjApLCBkKjMuMCwgYmFyeWNlbnRyaWNDb29yZHMpOwogcmV0dXJuIG1pbihtaW4oYTMueCwgYTMueSksIGEzLnopOwp9CgovLyBSZWFkIHRoZSB0ZXh0dXJlIHZhbHVlIG9mIGEgZ2x5cGggZnJvbSB0aGUgc3BlY2lmaWVkIGNvbG91ciBjaGFubmVsCmZsb2F0IHJlYWRDb2xvdXJDb21wb25lbnRGcm9tVGV4dHVyZShmbG9hdCB0ZXh0dXJlQmFuaywgdmVjNCB0ZXhDb29yZCkgewogIGZsb2F0IHRleENvbXBvbmVudDsKICBpbnQgdGV4QmFuayA9IHJvdW5kVG9JbnQodGV4dHVyZUJhbmspOwogIGlmKHRleEJhbmsgPT0gMCkgewogICAgdGV4Q29tcG9uZW50ID0gdGV4Q29vcmQucjsKICB9IGVsc2UgaWYodGV4QmFuayA9PSAxKSB7CiAgICB0ZXhDb21wb25lbnQgPSB0ZXhDb29yZC5nOwogIH0gZWxzZSB7CiAgICB0ZXhDb21wb25lbnQgPSB0ZXhDb29yZC5iOwogIH0KICByZXR1cm4gdGV4Q29tcG9uZW50Owp9CgovLyBVc2VkIHRvIHJlY29uc3RydWN0IGEgZ2x5cGggZnJvbSB0aGUgY29sb3VyQ29tcG9uZW50IHRleHR1cmUKLy8gUmVhZCBvbmUgc3BlY2lmaWMgY29sb3VyIG9ubHkgYW5kIHRyZWF0IGl0IGFzIGFuIGFscGhhIHZhbHVlLCBzZXR0aW5nIGl0cyBjb2xvdXIgdXNpbmcgY29sb3VyTW9kaWZpZXIKdmVjNCBnZXRDb2xvdXJGcm9tQ29tcG9uZW50KGZsb2F0IGNvbG91ckNvbXBvbmVudCwgdmVjNCBjb2xvdXJNb2RpZmllciwgZmxvYXQgdXNlV2hpdGVCb29zdCkgewogIGZsb2F0IGNvbG91ckF2ZyA9IChjb2xvdXJNb2RpZmllci5yICsgY29sb3VyTW9kaWZpZXIuYiArIGNvbG91ck1vZGlmaWVyLmcpIC8gMy4wOwogIGZsb2F0IGlzV2hpdGUgPSBzdGVwKDEuMCwgY29sb3VyQXZnKSAqIHVzZVdoaXRlQm9vc3Q7CiAgLy8gSWYgdGhlIHRleHQgaXMgd2hpdGUgYm9vc3QgdGhlIGFscGhhIHRvIGluY3JlYXNlIGNvbnRyYXN0CiAgZmxvYXQgd2hpdGVUZXh0Qm9vc3QgPSBpc1doaXRlICogKHN0ZXAoMC4yNSwgY29sb3VyQ29tcG9uZW50KSAqIG1pbihjb2xvdXJBdmcsIDAuMjUpKTsKICBmbG9hdCBhID0gY29sb3VyTW9kaWZpZXIuYSAqIChjb2xvdXJDb21wb25lbnQgICsgd2hpdGVUZXh0Qm9vc3QpOwogIGZsb2F0IHIgPSBjb2xvdXJNb2RpZmllci5yICogYTsKICBmbG9hdCBnID0gY29sb3VyTW9kaWZpZXIuZyAqIGE7CiAgZmxvYXQgYiA9IGNvbG91ck1vZGlmaWVyLmIgKiBhOwogIHJldHVybiB2ZWM0KHIsZyxiLGEpOwp9Cgp2b2lkIG1haW4oKSB7CiAgLy8gVGhlIGZpbmFsIGNvbG91ciB0byBkcmF3IHRvIHRoZSBzY3JlZW4KICB2ZWM0IHBpeGVsQ29sb3VyOwogIC8vIGJvcmRlciB3aWR0aCBiZXR3ZWVuIDEgLSAwCiAgZmxvYXQgbm9ybWFsaXNlZEJvcmRlcldpZHRoID0gYWJzKHZfd2lkdGggLyAodl9jaXJjbGVSYWRpdXMgKiAyLjApKTsKICBmbG9hdCBib3JkZXJXaWR0aCA9IGFicyh2X3dpZHRoKTsKICB2ZWMyIGNpcmNsZUNlbnRyZSA9IHZlYzIoMC41LCAwLjUpOwogIGludCBzaGFkb3dUeXBlPSByb3VuZFRvSW50KHVfc2hhZG93VHlwZSk7CiAgYm9vbCBpc0NpcmNsZSA9IHZfY2lyY2xlUmFkaXVzID4gMC4wOwogIAogIGJvb2wgaGFzQ2lyY2xlRGFzaGVkQm9yZGVyID0gdl93aWR0aCA8IDAuMDsKICBib29sIG9ubHlEcmF3T25TaGFkb3cgPSBzaGFkb3dUeXBlID09IDE7CiAgYm9vbCBzaGFkb3dDYW52YXMgPSByb3VuZFRvSW50KHVfaGl0VGVzdCkgPT0gMTsKICB2ZWMyIHRleHR1cmVDb29yZHMgPSB2X3RleENvb3JkLnp3OwogIGZsb2F0IHNhID0gdl9kb251dFNlZ21lbnQueDsKICBmbG9hdCBlYSA9IHZfZG9udXRTZWdtZW50Lnk7CiAgLy8gLTIgZmxhdCBzaGFkZWQgd2l0aCBhbnRpIGFsaWFzaW5nCiAgLy8gLTEgZmxhdCBzaGFkZWQKICAvLyAwLi4yIC0+IHRleHQKICAvLyAzIC0+IGZvbnRJY29ucwogIC8vIDQuLi43IC0+IGltYWdlcwogIGludCB0ZXh0dXJlQmFuayA9IHJvdW5kVG9JbnQodl90ZXh0dXJlQmFuay54KTsKICBib29sIGhhc1JlY3RhbmdsZUJvcmRlciA9IHZfY2lyY2xlUmFkaXVzIDwgMC4wOwogIGJvb2wgaGFzRGFzaGVkQm9yZGVyID0gdGV4dHVyZUJhbmsgPT0gLTM7CiAgYm9vbCBoYXNDaXJjbGVTZWdtZW50cyA9IHNhICE9IDAuMCB8fCBlYSAhPSAwLjA7CiAgZmxvYXQgc2VnbWVudEFuZ2xlOwogIGlmKGhhc0NpcmNsZVNlZ21lbnRzIHx8IGhhc0NpcmNsZURhc2hlZEJvcmRlcikgewogICAgaWYoc2EgPiBQSSkgewogICAgICBzYSAtPSAyLjAgKiBQSTsKICAgIH0KICAgIGlmKGVhID4gUEkpIHsKICAgICAgZWEgLT0gMi4wICogUEk7CiAgICB9ICAKICAgIGZsb2F0IHggPSB0ZXh0dXJlQ29vcmRzLnggLSAwLjU7CiAgICBmbG9hdCB5ID0gdGV4dHVyZUNvb3Jkcy55IC0gMC41OwogICAgc2VnbWVudEFuZ2xlID0gYXRhbih5LHgpOwogIH0KICBpZihzaGFkb3dDYW52YXMpIHsKICAgIC8vIEV4Y2x1ZGUgZnJvbSBzaGFkb3cKICAgIGlmKHNoYWRvd1R5cGUgPT0gLTEpewogICAgICAgIGRpc2NhcmQ7CiAgICB9IGVsc2UgewogICAgICB2ZWM0IGNvbG9yQSA9IHZfaGl0VGVzdENvbG91ciAvIDI1NS4wOwogICAgICBpZihpc0NpcmNsZSkgewogICAgICAgIGlmKHRleHR1cmVCYW5rID09IC0xKSB7CiAgICAgICAgIC8vIGZvciBvZmZzZXQgY2lyY2xlcwogICAgICAgICBjaXJjbGVDZW50cmUgPSB2X3RleENvb3JkLnh5OwogICAgICAgIH0KICAgICAgICBmbG9hdCBkaXN0ID0gZGlzdGFuY2Uodl90ZXhDb29yZC56dywgY2lyY2xlQ2VudHJlKTsKICAgICAgICBjb2xvckEgKj0gc3RlcCgwLjUsICAxLjAgLSBkaXN0KTsKICAgICAgICBpZihub3JtYWxpc2VkQm9yZGVyV2lkdGggPiAwLjApIHsKICAgICAgICAgIC8vIGVuc3VyZSBib3JkZXIgY2FuJ3QgYmUgc21hbGxlciB0aGFuIDEgcGl4ZWwKICAgICAgICAgIGZsb2F0IGJvcmRlciA9IDAuNSAtIG5vcm1hbGlzZWRCb3JkZXJXaWR0aDsKICAgICAgICAgIGNvbG9yQSAqPSBzdGVwKGJvcmRlciwgZGlzdCk7CiAgICAgICAgfQogICAgICAgIGlmKGhhc0NpcmNsZVNlZ21lbnRzKSB7CiAgICAgICAgICAvLyBmb3IgZG9udXQgc2VnbWVudHMgdGhhdCBjcm9zcyBiZXR3ZWVuIFBJIGFuZCAtUEkgCiAgICAgICAgICBpZihzYSA+PSBlYSkgewogICAgICAgICAgIGNvbG9yQSAqPSBzdGVwKHNhLCBzZWdtZW50QW5nbGUpICsgKDEuMCAtIHN0ZXAoZWEsIHNlZ21lbnRBbmdsZSkpOwogICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICBjb2xvckEgKj0gc3RlcChzYSwgc2VnbWVudEFuZ2xlKTsKICAgICAgICAgICBjb2xvckEgKj0gMS4wIC0gc3RlcChlYSwgc2VnbWVudEFuZ2xlKTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIH0gZWxzZSBpZihoYXNSZWN0YW5nbGVCb3JkZXIpIHsKICAgICAgICBjb2xvckEgKj0gcmVjdGFuZ2xlQm9yZGVyKGJvcmRlcldpZHRoKTsKICAgICAgfQogICAgICBnbF9GcmFnQ29sb3IgPSBjb2xvckE7CiAgICB9CiAgfSBlbHNlIGlmKG9ubHlEcmF3T25TaGFkb3cpewogICAgZGlzY2FyZDsKICB9IGVsc2UgewogICAgICBwaXhlbENvbG91ciA9IHZfY29sb3VyIC8gMjU1LjA7CiAgICAgIC8vIGxvYWQgdGhlIGNvcnJlY3QgdGV4dHVyZSBhbmQgcmVhZCBpdAogICAgICBpZiAodGV4dHVyZUJhbmsgPj0gMCkgewogICAgICAgICAgdmVjNCB0ZXhDb29yZDsKICAgICAgICAgIC8vIHNldCBtaXBtYXAgbGV2ZWwgYmlhcyB0byBzaGFycGVuIHRleHR1cmVzCiAgICAgICAgICBmbG9hdCBiaWFzID0gLTIuMC8zLjA7CiAgICAgICAgICBmbG9hdCB0ZXh0QmlhcyA9IC0wLjg7CiAgICAgICAgICAvL3RleHQgMAogICAgICAgICAgaWYodGV4dHVyZUJhbmsgPT0gMCkgIHsKICAgICAgICAgICB0ZXhDb29yZCA9IHRleHR1cmUyRCh1X2ltYWdlWzBdLCB2X3RleENvb3JkLnh5LCB0ZXh0Qmlhcyk7CiAgICAgICAgICAvL3RleHQgMQogICAgICAgICAgfSBlbHNlIGlmKHRleHR1cmVCYW5rID09IDEpIHsKICAgICAgICAgICAgdGV4Q29vcmQgPSB0ZXh0dXJlMkQodV9pbWFnZVsxXSwgdl90ZXhDb29yZC54eSwgdGV4dEJpYXMpOwogICAgICAgICAgLy8gdGV4dCAyCiAgICAgICAgICB9IGVsc2UgaWYodGV4dHVyZUJhbmsgPT0gMikgewogICAgICAgICAgICB0ZXhDb29yZCA9IHRleHR1cmUyRCh1X2ltYWdlWzJdLCB2X3RleENvb3JkLnh5LCB0ZXh0Qmlhcyk7CiAgICAgICAgICAvLyBmb250SWNvbnMgMyAKICAgICAgICAgIH0gZWxzZSBpZih0ZXh0dXJlQmFuayA9PSAzKSB7CiAgICAgICAgICAgIHRleENvb3JkID0gdGV4dHVyZTJEKHVfaW1hZ2VbM10sIHZfdGV4Q29vcmQueHksIGJpYXMpOwogICAgICAgICAgLy8gaW1hZ2UgNCAgIAogICAgICAgICAgfSBlbHNlIGlmKHRleHR1cmVCYW5rID09IDQpIHsKICAgICAgICAgICAgdGV4Q29vcmQgPSB0ZXh0dXJlMkQodV9pbWFnZVs0XSwgdl90ZXhDb29yZC54eSwgYmlhcyk7CiAgICAgICAgICAvLyBpbWFnZSA1ICAgCiAgICAgICAgICB9IGVsc2UgaWYodGV4dHVyZUJhbmsgPT0gNSkgewogICAgICAgICAgICB0ZXhDb29yZCA9IHRleHR1cmUyRCh1X2ltYWdlWzVdLCB2X3RleENvb3JkLnh5LCBiaWFzKTsKICAgICAgICAgIC8vIGltYWdlIDYKICAgICAgICAgIH0gZWxzZSBpZih0ZXh0dXJlQmFuayA9PSA2KSB7CiAgICAgICAgICAgIHRleENvb3JkID0gdGV4dHVyZTJEKHVfaW1hZ2VbNl0sIHZfdGV4Q29vcmQueHksIGJpYXMpOyAgICAgCiAgICAgICAgICAvLyBpbWFnZSA3ICAgCiAgICAgICAgICB9IGVsc2UgIHsKICAgICAgICAgICAgdGV4Q29vcmQgPSB0ZXh0dXJlMkQodV9pbWFnZVs3XSwgdl90ZXhDb29yZC54eSwgYmlhcyk7CiAgICAgICAgICB9CiAgICAgICAgICBpZih0ZXh0dXJlQmFuayA+PSA0KSB7CiAgICAgICAgICAgIHBpeGVsQ29sb3VyID0gdmVjNChwaXhlbENvbG91ci5yZ2IgICogdGV4Q29vcmQucmdiLHBpeGVsQ29sb3VyLmEgKiB0ZXhDb29yZC5hKTsKICAgICAgICAgIH0gZWxzZSBpZih0ZXh0dXJlQmFuayA9PSAzKXsKICAgICAgICAgICAgZmxvYXQgY29sb3VyQ29tcG9uZW50ID0gcmVhZENvbG91ckNvbXBvbmVudEZyb21UZXh0dXJlKHZfdGV4dHVyZUJhbmsueSwgdGV4Q29vcmQpOwogICAgICAgICAgICAgLy8gZG9uJ3Qgd2hpdGUgYm9vc3Qgb24gZm9udCBpY29ucyBhcyBpdCBtYWtlcyB0aGVtIGxvb2sgamFnZ2llZCAKICAgICAgICAgICAgcGl4ZWxDb2xvdXIgPSBnZXRDb2xvdXJGcm9tQ29tcG9uZW50KGNvbG91ckNvbXBvbmVudCwgcGl4ZWxDb2xvdXIsIDAuMCk7CiAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICBmbG9hdCBjb2xvdXJDb21wb25lbnQgPSByZWFkQ29sb3VyQ29tcG9uZW50RnJvbVRleHR1cmUodl90ZXh0dXJlQmFuay55LCB0ZXhDb29yZCk7ICAgIAogICAgICAgICAgICBwaXhlbENvbG91ciA9IGdldENvbG91ckZyb21Db21wb25lbnQoY29sb3VyQ29tcG9uZW50LCBwaXhlbENvbG91ciwgMS4wKTsKICAgICAgICAgIH0KCiAgICAgIH0gZWxzZSB7CiAgICAgICAgLy8gZmxhdCBzaGFkZWQgcmVjdCBvciB0cmlhbmdsZSwganVzdCBhcHBseSB0aGUgY29sb3VyCiAgICAgICAgZmxvYXQgYWxwaGEgPSBwaXhlbENvbG91ci5hOwogICAgICAgIGNpcmNsZUNlbnRyZSA9IHZfdGV4Q29vcmQueHk7CiAgICAgICAgcGl4ZWxDb2xvdXIgPSB2ZWM0KHBpeGVsQ29sb3VyLnJnYiAgKiBhbHBoYSwgYWxwaGEpOwogICAgICB9CiAgICAgIAogICAgICBpZihpc0NpcmNsZSkgewogICAgICAgICBmbG9hdCBkaXN0ID0gZGlzdGFuY2Uodl90ZXhDb29yZC56dywgY2lyY2xlQ2VudHJlKTsKICAgICAgICAgLy8gYWRkIGEgMS8zIG9mIGEgcGl4ZWwgcGFkZGluZyBmb3Igc21vb3RoIGVkZ2VzIGFyb3VuZCBib3JkZXIgIzI3NzEKICAgICAgICAgcGl4ZWxDb2xvdXIgKj0gYWFzdGVwKDAuNSwgIDEuMCAtIHZfcGl4ZWwvMy4wIC0gZGlzdCk7CiAgICAgICAgIGlmKG5vcm1hbGlzZWRCb3JkZXJXaWR0aCA+IDAuMCkgewogICAgICAgICAgLy8gZW5zdXJlIGJvcmRlciBjYW4ndCBiZSBzbWFsbGVyIHRoYW4gMSBwaXhlbAogICAgICAgICAgZmxvYXQgYm9yZGVyID0gMC41IC0gbWF4KG5vcm1hbGlzZWRCb3JkZXJXaWR0aCwgdl9waXhlbCkgLSB2X3BpeGVsLzMuMCA7CiAgICAgICAgICBwaXhlbENvbG91ciAqPSBhYXN0ZXAoYm9yZGVyLCBkaXN0KTsKICAgICAgICAgfQoKICAgICAgICAgLy8gVXNlZCB0byBkZWNpZGUgaG93IG11Y2ggYW50aSBhbGlhc2luZyB0byBhcHBseQogICAgICAgICBmbG9hdCBzbW9vdGhuZXNzID0gdl9waXhlbCoxLjU7CiAgICAgICAgIGZsb2F0IHNhRnJvbSA9IHNhIC0gc21vb3RobmVzczsKICAgICAgICAgZmxvYXQgc2FUbyA9IHNhICsgc21vb3RobmVzczsKICAgICAgICAgZmxvYXQgZWFGcm9tID0gZWEgLSBzbW9vdGhuZXNzOwogICAgICAgICBmbG9hdCBlYVRvID0gZWEgKyBzbW9vdGhuZXNzOwogICAgICAgICBpZihoYXNDaXJjbGVTZWdtZW50cykgewogICAgICAgICAgIC8vIGZvciBkb251dCBzZWdtZW50cyB0aGF0IGNyb3NzIGJldHdlZW4gUEkgYW5kIC1QSSAKICAgICAgICAgICBpZihzYSA+PSBlYSkgewogICAgICAgICAgICAgcGl4ZWxDb2xvdXIgKj0gc21vb3Roc3RlcChzYUZyb20sIHNhVG8sIHNlZ21lbnRBbmdsZSkgKyAoMS4wIC0gc21vb3Roc3RlcChlYUZyb20sIGVhVG8sIHNlZ21lbnRBbmdsZSkpOwogICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICBwaXhlbENvbG91ciAqPSBzbW9vdGhzdGVwKHNhRnJvbSwgc2FUbywgc2VnbWVudEFuZ2xlKTsKICAgICAgICAgICAgIHBpeGVsQ29sb3VyICo9IDEuMCAtIHNtb290aHN0ZXAoZWFGcm9tLCBlYVRvLCBzZWdtZW50QW5nbGUpOwogICAgICAgICAgIH0KICAgICAgICAgfSBlbHNlIGlmKGhhc0NpcmNsZURhc2hlZEJvcmRlcikgewogICAgICAgICAgZmxvYXQgZGFzaExlbmd0aCA9IGJvcmRlcldpZHRoOwogICAgICAgICAgZmxvYXQgZ2FwV2lkdGggPSBkYXNoTGVuZ3RoLzIuMDsKICAgICAgICAgIGZsb2F0IGNpcmN1bWZlcmVuY2UgPSAyLjAgKiBQSSAqICh2X2NpcmNsZVJhZGl1cy8yLjApOwogICAgICAgICAgZmxvYXQgYW5nbGVBcm91bmRDaXJjbGUgPSBzZWdtZW50QW5nbGUgLyAoMi4wKlBJKTsKICAgICAgICAgIGZsb2F0IGRhc2hlcyA9IGZsb29yKChjaXJjdW1mZXJlbmNlICsgZ2FwV2lkdGgpIC8gKGRhc2hMZW5ndGggKyBnYXBXaWR0aCkgLSAxLjAgKTsKICAgICAgICAgIGZsb2F0IGRhc2ggPSBzaW4oKChhbmdsZUFyb3VuZENpcmNsZSAqIGRhc2hlcykpICogKDIuMCAqIFBJKSk7CiAgICAgICAgICAvLyBzbW9vdGggYW5kIGN1dCBvdXQgYSBnYXAgd2hlbiB0aGUgc2luZSB3YXZlIGlmIHBhc3QgdGhlIGRhc2hUaHJlc2hvbGQKICAgICAgICAgIHBpeGVsQ29sb3VyICo9IGFhc3RlcCgtMC41LCAgZGFzaCk7CiAgICAgICAgIH0KICAgICAgLy8gZHJhdyBhIHNxdWFyZSBib3JkZXIsIGZpbGwgYSBzcXVhcmUgYW5kIGN1dCBvdXQgdGhlIGNlbnRyZQogICAgICB9IGVsc2UgaWYoaGFzUmVjdGFuZ2xlQm9yZGVyKSB7CiAgICAgICAgZmxvYXQgYm9yZGVyV2lkdGhab29tID0gZ2V0Qm9yZGVyV2lkdGhab29tKGJvcmRlcldpZHRoKTsKICAgICAgICBwaXhlbENvbG91ciAqPSByZWN0YW5nbGVCb3JkZXIoYm9yZGVyV2lkdGhab29tKTsKICAgICAgICBpZihoYXNEYXNoZWRCb3JkZXIpIHsKICAgICAgICAgIGZsb2F0IGRhc2hMZW5ndGggPSBib3JkZXJXaWR0aFpvb20gKiAyLjA7CiAgICAgICAgICBmbG9hdCBnYXBXaWR0aCA9IGJvcmRlcldpZHRoWm9vbTsKICAgICAgICAgIGZsb2F0IGRhc2hlcyA9IGZsb29yKCh2X3RleENvb3JkLnogKyBnYXBXaWR0aCkgLyAoZGFzaExlbmd0aCArIGdhcFdpZHRoKSkgKyAwLjU7CiAgICAgICAgICBmbG9hdCBkYXNoID0gc2luKCgoKHZfdGV4Q29vcmQueCAvIHZfdGV4Q29vcmQueikgKiBkYXNoZXMpKSAqICgyLjAgKiBQSSkpOwogICAgICAgICAgLy8gc21vb3RoIGFuZCBjdXQgb3V0IGEgZ2FwIHdoZW4gdGhlIHNpbmUgd2F2ZSBpZiBwYXN0IHRoZSBkYXNoVGhyZXNob2xkCiAgICAgICAgICBwaXhlbENvbG91ciAqPSBhYXN0ZXAoLTAuNDksICBkYXNoKTsKICAgICAgICAgIGRhc2hlcyA9IGZsb29yKCh2X3RleENvb3JkLncgKyBnYXBXaWR0aCkgLyAoZGFzaExlbmd0aCArIGdhcFdpZHRoKSkgKyAwLjU7CiAgICAgICAgICBkYXNoID0gc2luKCgoKHZfdGV4Q29vcmQueS8gdl90ZXhDb29yZC53KSAqIGRhc2hlcykpICogKDIuMCAqIFBJKSk7CiAgICAgICAgICAvLyBzbW9vdGggYW5kIGN1dCBvdXQgYSBnYXAgd2hlbiB0aGUgc2luZSB3YXZlIGlmIHBhc3QgdGhlIGRhc2hUaHJlc2hvbGQKICAgICAgICAgIHBpeGVsQ29sb3VyICo9IGFhc3RlcCgtMC40OSwgIGRhc2gpOwogICAgICAgIH0KICAgICAgfQogICAgICBnbF9GcmFnQ29sb3IgPSBwaXhlbENvbG91cjsKICAgfQp9");
}(),
function() {
    var e = KeyLines.WebGL;
    e && (e["triangle-vertex"] = "cHJlY2lzaW9uIGhpZ2hwIGZsb2F0OwphdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uOwphdHRyaWJ1dGUgdmVjNCBhX3RleENvb3JkOwphdHRyaWJ1dGUgdmVjNCBhX2hpdFRlc3RDb2xvdXI7CmF0dHJpYnV0ZSB2ZWMyIGFfdGV4dHVyZUJhbms7CmF0dHJpYnV0ZSB2ZWM0IGFfY29sb3VyOwphdHRyaWJ1dGUgZmxvYXQgYV9jaXJjbGVSYWRpdXM7CmF0dHJpYnV0ZSBmbG9hdCBhX3dpZHRoOwphdHRyaWJ1dGUgZmxvYXQgYV9zdGFydEFuZ2xlOwphdHRyaWJ1dGUgZmxvYXQgYV9lbmRBbmdsZTsKCnVuaWZvcm0gdmVjMyB1X3Jlc29sdXRpb247CnVuaWZvcm0gbWF0NCB1X3RyYW5zZm9ybTsKdW5pZm9ybSBmbG9hdCB1X3pvb207CnVuaWZvcm0gbG93cCBmbG9hdCB1X2hpdFRlc3Q7Cgp2YXJ5aW5nIGZsb2F0IHZfd2lkdGg7CnZhcnlpbmcgZmxvYXQgdl9jaXJjbGVSYWRpdXM7CnZhcnlpbmcgdmVjNCB2X3RleENvb3JkOwp2YXJ5aW5nIHZlYzQgdl9jb2xvdXI7CnZhcnlpbmcgdmVjNCB2X2hpdFRlc3RDb2xvdXI7CnZhcnlpbmcgdmVjMiB2X3RleHR1cmVCYW5rOwp2YXJ5aW5nIGZsb2F0IHZfcGl4ZWw7CnZhcnlpbmcgdmVjMiB2X2RvbnV0U2VnbWVudDsKCgp2b2lkIG1haW4oKSB7CiAgIC8vIHdpZHRoIGlzIG5lZ2F0aXZlIHdoZW4gd2UgYXJlIGRhc2hlZCBib3JkZXIKICAgZmxvYXQgYm9yZGVyV2lkdGggPSBhX3dpZHRoOwogICBpZih1X2hpdFRlc3QgPT0gMS4wKSB7CiAgICAgIC8vIGFkZCA0IHNjcmVlbiBwaXhlbHMgdG8gdGhlIGxpbmUgdGhpY2tuZXNzCiAgICAgIGJvcmRlcldpZHRoICs9ICAoNC4wIC8gdV96b29tKSAqIHNpZ24oYV93aWR0aCk7CiAgIH0KICAgLy8gY29udmVydCB0aGUgcmVjdGFuZ2xlIGZyb20gcGl4ZWxzIHRvIDAuMCB0byAxLjAKICAgdmVjMiB6ZXJvVG9PbmUgPSBhX3Bvc2l0aW9uIC8gdV9yZXNvbHV0aW9uLnh5OwogICAvLyBjb252ZXJ0IGZyb20gMC0+MSB0byAwLT4yCiAgIHZlYzIgemVyb1RvVHdvID0gemVyb1RvT25lICogMi4wOwoKICAgLy8gY29udmVydCBmcm9tIDAtPjIgdG8gLTEtPisxIChjbGlwc3BhY2UpCiAgIHZlYzIgY2xpcFNwYWNlID0gemVyb1RvVHdvIC0gMS4wOwoKICAgZ2xfUG9zaXRpb24gPSB1X3RyYW5zZm9ybSAqIHZlYzQoY2xpcFNwYWNlICogdmVjMigxLCAtMSksIDAsIDEpOwoKICAgLy8gcGFzcyB0aGUgdGV4Q29vcmQgdG8gdGhlIGZyYWdtZW50IHNoYWRlcgogICAvLyBUaGUgR1BVIHdpbGwgaW50ZXJwb2xhdGUgdGhpcyB2YWx1ZSBiZXR3ZWVuIHBvaW50cy4KICAgdl90ZXhDb29yZCA9IGFfdGV4Q29vcmQ7CiAgIHZfY29sb3VyID0gYV9jb2xvdXI7CiAgIHZfaGl0VGVzdENvbG91ciA9IGFfaGl0VGVzdENvbG91cjsKICAgdl90ZXh0dXJlQmFuayA9IGFfdGV4dHVyZUJhbms7CiAgIHZfY2lyY2xlUmFkaXVzID0gYV9jaXJjbGVSYWRpdXM7CiAgIHZfd2lkdGggPSBib3JkZXJXaWR0aDsKICAgLy8gdGhlIHNpemUgb2YgYSBwaXhlbCBpbiBzY3JlZW5zcGFjZSBjbGlwIGNvb3JkaW5hdGVzCiAgIHZfcGl4ZWwgPSAoMS4wIC8gKGFfY2lyY2xlUmFkaXVzICogMi4wKSkgLyB1X3pvb207CiAgIHZfZG9udXRTZWdtZW50ID0gdmVjMihhX3N0YXJ0QW5nbGUsIGFfZW5kQW5nbGUpOwp9Cg==")
}(),
function() {
    var e = KeyLines.WebGL;
    e && (e["renderToTexture-fragment"] = "I2lmZGVmIEdMX09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcwojZXh0ZW5zaW9uIEdMX09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcyA6IGVuYWJsZQojZW5kaWYKCnByZWNpc2lvbiBoaWdocCBmbG9hdDsKCi8vIG91ciB0ZXh0dXJlCnVuaWZvcm0gc2FtcGxlcjJEIHVfaW1hZ2U7CnVuaWZvcm0gZmxvYXQgdV9nbG9iYWxBbHBoYTsKdW5pZm9ybSB2ZWM0IHVfYmFja2dyb3VuZENvbG91cjsKCi8vIHRoZSB0ZXhDb29yZHMgcGFzc2VkIGluIGZyb20gdGhlIHZlcnRleCBzaGFkZXIuCnZhcnlpbmcgdmVjMiB2X3RleENvb3JkOwoKdm9pZCBtYWluKCkgewogIGdsX0ZyYWdDb2xvciA9ICh0ZXh0dXJlMkQodV9pbWFnZSwgdl90ZXhDb29yZCkgKyB1X2JhY2tncm91bmRDb2xvdXIpICogdV9nbG9iYWxBbHBoYTsKfQo=")
}(),
function() {
    var e = KeyLines.WebGL;
    e && (e["renderToTexture-vertex"] = "cHJlY2lzaW9uIGhpZ2hwIGZsb2F0OwphdHRyaWJ1dGUgdmVjMiBhX3Bvc2l0aW9uOwphdHRyaWJ1dGUgdmVjMiBhX3RleENvb3JkOwoKdmFyeWluZyB2ZWMyIHZfdGV4Q29vcmQ7Cgp2b2lkIG1haW4oKSB7CiAgIGdsX1Bvc2l0aW9uID0gdmVjNChhX3Bvc2l0aW9uLCAwLjAsMS4wKTsKICAgdl90ZXhDb29yZCA9IGFfdGV4Q29vcmQ7Cn0K")
}(),
function() {
    KeyLines.Events = {};
    var e = KeyLines.Events;
    e.createEventBus = function() {
        function e(e, t) {
            for (var n = e.replace(/^\s*|\s*$/g, "").split(/[(\s*,\s*)|(\s+)]/), r = 0; r < n.length; r++) t(n[r])
        }

        function t(t, n, r, i) {
            o = o || {
                "public": {},
                "private": {}
            };
            var a = o[i];
            e(t, function(e) {
                a[e] = a[e] || [], a[e].push({
                    handler: n,
                    context: r
                })
            })
        }

        function n(t, n, r) {
            if (o && o[r])
                if (t) {
                    var i = o[r];
                    e(t, function(e) {
                        if (n) {
                            if (i[e]) {
                                for (var t = [], r = 0; r < i[e].length; r++) n !== i[e][r].handler && t.push(i[e][r]);
                                i[e] = t
                            }
                        } else i[e] = []
                    })
                } else o[r] = {}
        }

        function r(e, t) {
            var n = e[0],
                r = !1;
            if (t)
                for (var a, o = 2; o--;) {
                    var l = o ? n : "all",
                        u = o ? e.slice(1) : e;
                    if (t[l]) {
                        var c = t[l].slice(0);
                        for (a = 0; a < c.length; a++) {
                            var s = c[a];
                            try {
                                r = s.handler.apply(s.context || this, u) || r
                            } catch (f) {
                                i(n, f)
                            }
                        }
                    }
                }
            return r
        }

        function i(e, t) {
            var n = (new Date).toString() + " Function bound to '" + e + "' threw error: " + t.toString();
            KeyLines.Util.log(n), c.push(n), c.length > u && c.shift()
        }

        function a(e, t, n, r, i, a) {
            function o(e) {
                return ((f * e + s) * e + c) * e
            }

            function l(e, t) {
                var n = u(e, t);
                return ((h * n + g) * n + d) * n
            }

            function u(e, t) {
                var n, r, i, a, l, u;
                for (i = e, u = 0; 8 > u; u++) {
                    if (a = o(i) - e, Math.abs(a) < t) return i;
                    if (l = (3 * f * i + 2 * s) * i + c, Math.abs(l) < 1e-6) break;
                    i -= a / l
                }
                if (n = 0, r = 1, i = e, n > i) return n;
                if (i > r) return r;
                for (; r > n;) {
                    if (a = o(i), Math.abs(a - e) < t) return i;
                    e > a ? n = i : r = i, i = (r - n) / 2 + n
                }
                return i
            }
            var c = 3 * t,
                s = 3 * (r - t) - c,
                f = 1 - c - s,
                d = 3 * n,
                g = 3 * (i - n) - d,
                h = 1 - d - g;
            return l(e, 1 / (200 * a))
        }
        var o, l = {};
        l.bind = function(e, n, r) {
            t(e, n, r, "public")
        }, l.privateBind = function(e, n, r) {
            t(e, n, r, "private")
        }, l.unbind = function(e, t) {
            n(e, t, "public")
        }, l.privateUnbind = function(e, t) {
            n(e, t, "private")
        }, l.trigger = function() {
            var e = !1,
                t = Array.prototype.slice.call(arguments);
            return o && (e = r(t, o["private"]), e = r(t, o["public"]) || e), e
        }, l.getErrors = function() {
            return c
        };
        var u = 10,
            c = [];
        l.linearEasing = function(e) {
            return 0 > e ? 0 : e > 1 ? 1 : e
        }, l.cubicEasing = function(e) {
            return 0 > e ? 0 : e > 1 ? 1 : a(e, .25, .01, .25, 1, 1)
        }, l.quartEasing = function(e) {
            var t = e;
            return .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
        }, l.quadEasing = function(e) {
            return e * (2 - e)
        }, l.quintEasing = function(e) {
            var t = e;
            return .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
        };
        var s = 1;
        return l.atanEasing = function(e) {
            return Math.atan(s * (e - .5)) / (2 * Math.atan(.5 * s)) + .5
        }, l
    }
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    if (e) {
        var t = 6 * Float32Array.BYTES_PER_ELEMENT,
            n = 3 * Float32Array.BYTES_PER_ELEMENT,
            r = 4 * Uint8Array.BYTES_PER_ELEMENT,
            i = 4 * Uint8Array.BYTES_PER_ELEMENT;
        KeyLines.WebGL.ArcShader = function(a) {
            function o(e, t, n, r, i, a) {
                m.uniform3f(I.resolution, t, n, r), m.uniformMatrix4fv(I.transform, !1, e.get()), m.uniform1f(I.hitTest, 0 | i), m.uniform1f(I.zoom, e.getZoomLevel()), m.uniform1f(I.shadowType, a)
            }

            function l(e) {
                e.arcBuffers.positionBuffer || (e.arcBuffers.positionBuffer = m.createBuffer()), e.arcBuffers.colourBuffer || (e.arcBuffers.colourBuffer = m.createBuffer()), e.arcBuffers.shadowBuffer || (e.arcBuffers.shadowBuffer = m.createBuffer()), e.arcBuffers.coreBuffer || (e.arcBuffers.coreBuffer = m.createBuffer())
            }

            function u(e) {
                m.bindBuffer(m.ARRAY_BUFFER, e.arcBuffers.colourBuffer), (e.rebuildOptions.colours || e.alwaysUpdate || e.rebuildOptions.all) && m.bufferData(m.ARRAY_BUFFER, e.arcBuffers.colourData, m.STATIC_DRAW), m.enableVertexAttribArray(p.colour), m.vertexAttribPointer(p.colour, 4, m.UNSIGNED_BYTE, !1, i, 0)
            }

            function c(e) {
                m.bindBuffer(m.ARRAY_BUFFER, e.arcBuffers.shadowBuffer), (e.alwaysUpdate || e.rebuildOptions.all || e.rebuildOptions.shadow) && m.bufferData(m.ARRAY_BUFFER, e.arcBuffers.shadowData, m.STATIC_DRAW), m.enableVertexAttribArray(p.shadowColour), m.enableVertexAttribArray(p.type), m.vertexAttribPointer(p.shadowColour, 3, m.UNSIGNED_BYTE, !1, r, 0), m.vertexAttribPointer(p.type, 1, m.UNSIGNED_BYTE, !1, r, 3)
            }

            function s(e) {
                m.bindBuffer(m.ARRAY_BUFFER, e.arcBuffers.coreBuffer), (e.alwaysUpdate || e.rebuildOptions.all || e.rebuildOptions.shadow) && m.bufferData(m.ARRAY_BUFFER, e.arcBuffers.coreData, m.STATIC_DRAW), m.enableVertexAttribArray(p.core), m.vertexAttribPointer(p.core, 3, m.FLOAT, !1, n, 0)
            }

            function f(e) {
                m.bindBuffer(m.ARRAY_BUFFER, e.arcBuffers.positionBuffer), (e.rebuildOptions.positions || e.alwaysUpdate || e.rebuildOptions.all) && m.bufferData(m.ARRAY_BUFFER, e.arcBuffers.positionData, m.STATIC_DRAW), m.enableVertexAttribArray(p.position), m.enableVertexAttribArray(p.radius), m.enableVertexAttribArray(p.startAngle), m.enableVertexAttribArray(p.endAngle), m.enableVertexAttribArray(p.width), m.vertexAttribPointer(p.position, 2, m.FLOAT, !1, t, 0), m.vertexAttribPointer(p.radius, 1, m.FLOAT, !1, t, 8), m.vertexAttribPointer(p.startAngle, 1, m.FLOAT, !1, t, 12), m.vertexAttribPointer(p.endAngle, 1, m.FLOAT, !1, t, 16), m.vertexAttribPointer(p.width, 1, m.FLOAT, !1, t, 20)
            }

            function d() {
                m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, null), m.bindBuffer(m.ARRAY_BUFFER, null)
            }
            var g, h = KeyLines.WebGL.Utils,
                v = {},
                m = a;
            if (!m.arcShader) {
                var y = h.compileShader(m, "line-arc-vertex", m.VERTEX_SHADER),
                    b = h.compileShader(m, "line-fragment", m.FRAGMENT_SHADER);
                g = h.createProgram(m, y, b), m.arcShader = {
                    vertexShader: y,
                    fragmentShader: b,
                    program: g
                }
            }
            g = m.arcShader.program;
            var p = {
                    position: m.getAttribLocation(g, "a_position"),
                    radius: m.getAttribLocation(g, "a_radius"),
                    startAngle: m.getAttribLocation(g, "a_startAngle"),
                    endAngle: m.getAttribLocation(g, "a_endAngle"),
                    width: m.getAttribLocation(g, "a_width"),
                    colour: m.getAttribLocation(g, "a_colour"),
                    core: m.getAttribLocation(g, "a_core"),
                    type: m.getAttribLocation(g, "a_lineType"),
                    shadowColour: m.getAttribLocation(g, "a_hitTestColour")
                },
                I = {
                    hitTest: m.getUniformLocation(g, "u_hitTest"),
                    zoom: m.getUniformLocation(g, "u_zoom"),
                    transform: m.getUniformLocation(g, "u_transform"),
                    resolution: m.getUniformLocation(g, "u_resolution"),
                    shadowType: m.getUniformLocation(g, "u_shadowType")
                };
            return v.finish = function() {
                e.Utils.finishProgram(m, g)
            }, v.drawItems = function(e, t, n, r, i, a) {
                m.useProgram(g), o(t, n, r, i, a, 0 | e.shadowType), l(e), u(e), c(e), f(e), s(e), m.drawArrays(m.TRIANGLES, 0, e.arcBuffers.totalNumOfVerticies), d()
            }, v
        }
    }
}(),
function() {
    KeyLines.Graph = {};
    var e = KeyLines.Graph;
    KeyLines.getGraphEngine = function(e) {
        function t(e) {
            function t(t) {
                var n = r.clone(t);
                l.typeCheck(n);
                var i = l.filterNodesAndLinks(n.items, null, null, {
                    selfLinks: o.selfLinks
                });
                l.ensureHiddenItemConsistency(i.nodes, i.links), e.privateSetProperties(i.nodes, i.links)
            }
            return t
        }

        function n(e) {
            function t() {
                var t = {};
                e.privateSetProperties(t, t)
            }
            return t
        }
        var r = KeyLines.Util,
            i = KeyLines.Events.createEventBus(),
            a = KeyLines.Graph.create(i),
            o = r.defaults(e, {
                selfLinks: !1
            }),
            l = KeyLines.Validation.create({
                numbers: {
                    x: 1,
                    y: 1
                },
                strings: {
                    id: 1,
                    id1: 1,
                    id2: 1
                },
                booleans: {
                    hi: 1,
                    a1: 1,
                    a2: 1
                }
            }),
            u = {
                load: t(a),
                clear: n(a)
            };
        return r.merge(a, u)
    }, e.create = function(e) {
        function t(e, t, n) {
            var r = t && t.all,
                i = "toplevel" !== t.combos,
                a = "underlying" !== t.combos;
            y.forEach(e, function(e) {
                !r && e.hi || !i && e._parentId || !a && e._combo || n(e)
            })
        }

        function n(e, n) {
            t(I, e, n)
        }

        function r(e, n) {
            t(p, e, n)
        }

        function i(e, t, n) {
            for (var r = t, i = 0; r >= 0 && e[r] !== r;) r = e[r], i++;
            if (n)
                for (var a; i > 1;) a = t, t = e[t], e[a] = r, i--;
            return r
        }

        function a(e, t, n, r, i) {
            e[n] || (e[n] = {}), e[r] || (e[r] = {}), e[n][r] || (e[r][n] = [], e[n][r] = e[r][n], t.push(i)), e[n][r].push(i)
        }

        function o(e, t, n) {
            var r = {
                id: t.id,
                id1: t.id1,
                id2: t.id2,
                ids: n
            };
            e.edges.push(r), e.connections.push(n)
        }

        function l(e) {
            var t = {
                connections: [],
                adjacency: {},
                vertices: {},
                edges: []
            };
            r(e, function(e) {
                t.vertices[e.id] = {
                    x: e.x,
                    y: e.y
                }, t.adjacency[e.id] = {}
            });
            var i = [],
                l = {};
            n(e, function(e) {
                e.id1 === e.id2 ? (l[e.id1] = l[e.id1] || [], l[e.id1].push(e.id)) : a(t.adjacency, i, e.id1, e.id2, e.id)
            });
            for (var u = i.length, c = 0; u > c; c++) {
                var s = I[i[c]];
                o(t, s, t.adjacency[s.id1][s.id2])
            }
            if (y.hasAnyKeys(l)) {
                var f = t.connections.slice();
                y.forEach(l, function(e) {
                    f.push(e)
                }), t.selfConnections = f
            } else t.selfConnections = t.connections;
            return t.selfAdjacency = l, t
        }

        function u(e) {
            var t = y.defaults(e, {
                    all: !1,
                    combos: "toplevel"
                }),
                n = t.all ? "all" : "visible",
                r = n + "-" + t.combos;
            return C || (C = {}), C[r] || (C[r] = l(t)), C[r]
        }

        function c(e) {
            if (e.direction = e.direction || "any", !/^(any|from|to)$/.test(e.direction)) throw new TypeError("opts direction property should be either 'from', 'to' or 'any'")
        }

        function s(e) {
            if (e.normalization = e.normalization || "any", !/^(chart|component|unnormalized)$/.test(e.normalization)) throw new TypeError("opts normalization property should be either 'component', 'chart' or 'unnormalized'")
        }

        function f(e) {
            return n(e, function(t) {
                if (E(t.id1, t.id2, t.id, e) <= 0) throw new Error("Link Weight must be Positive")
            }), {
                direction: e.direction,
                value: e.value,
                weights: v(e)
            }
        }

        function d(e) {
            return /^(component|chart)$/.test(e.normalization) ? e.normalization : "unnormalized"
        }

        function g(e) {
            return c(e) || f(e)
        }

        function h(e) {
            e.all = !!e.all
        }

        function v(e) {
            return !!e.weights
        }

        function m(e) {
            var t = 0;
            return r(e, function() {
                t++
            }), t
        }
        var y = KeyLines.Util,
            b = {},
            p = {},
            I = {},
            x = e,
            C = null;
        b.clearCache = function() {
            C = null
        };
        var w = b.clearCache;
        b.privateSetProperties = function(e, t) {
            p = e, I = t, w()
        };
        var G = function(e, t, n, i) {
            function a() {
                var t = [];
                return r(e, function(e) {
                    t.push(e)
                }), t
            }
            var o = a(),
                l = o.length,
                u = -1,
                c = Date.now(),
                s = c,
                f = 700,
                d = function() {
                    return u++, u >= l ? (g(1), void i()) : void n(o[u], v)
                },
                g = function(e) {
                    x && x.trigger("progress", t, e)
                },
                h = function() {
                    return c = Date.now(), c - s > f ? (s = Date.now(), !0) : !1
                },
                v = function() {
                    h() ? (g(u / l), y.nextTick(d, 0)) : d()
                };
            g(0), v()
        };
        b.findAdjacency = function(e, t, n) {
            var r = u(e);
            if (t === n) return r.selfAdjacency[t];
            var i = r.adjacency;
            return i[t] && i[t][n]
        }, b.connections = function(e) {
            var t = u(e);
            return e.self ? t.selfConnections : t.connections
        }, b.eigenCentrality = function(e) {
            function t(e, t) {
                u[t] = e * c[o].nodes.length
            }

            function i(e) {
                function t(e, t) {
                    var n = 1;
                    return t.value && e.d && (n = Number(e.d[t.value])), n
                }

                function i(e) {
                    var t, n, r = [];
                    for (t = 0; t < f.length; t++) {
                        var i = 0;
                        for (n = 0; n < d[t].length; n++) i += g[t][d[t][n]] * e[d[t][n]];
                        i += h * e[t], r.push(i)
                    }
                    return r
                }

                function o() {
                    var e, t = 1 / l(v);
                    for (e = 0; e < f.length; e++) v[e] *= t
                }

                function l(e) {
                    var t, n = 0;
                    for (t = 0; t < e.length; t++) n += Math.abs(e[t]);
                    return n
                }
                var u, c, s = {},
                    f = [],
                    d = [],
                    g = [],
                    h = 0,
                    v = [],
                    m = 0;
                if (r(a, function(t) {
                        var n = t.id;
                        e[n] && (f.push(n), s[n] = f.length - 1, d.push([]), g.push({}))
                    }), c = Math.max(100, 5 * Math.sqrt(f.length)), n(a, function(n) {
                        if (e[n.id1] && e[n.id2]) {
                            var r = s[n.id1],
                                i = s[n.id2];
                            g[r][i] || (d[r].push(i), d[i].push(r), g[i][r] = 0, g[r][i] = 0);
                            var o = t(n, a);
                            g[r][i] += o, g[i][r] += o, h += o, m++
                        }
                    }), 0 === f.length) return {};
                if (1 === f.length) return v = {}, v[f[0]] = 1, v;
                if (2 === f.length) return v = {}, v[f[0]] = .5, v[f[1]] = .5, v;
                for (h /= m, c = Math.max(100, 5 * Math.sqrt(f.length)), u = 0; u < f.length; u++) v.push(Math.random());
                for (u = 0; c > u; u++) v = i(v), u % 10 === 0 && o();
                o();
                var y = {};
                for (u = 0; u < f.length; u++) y[f[u]] = v[u];
                return y
            }
            var a = y.defaults(e, {
                all: !1,
                value: void 0
            });
            a.combos = "toplevel", a.direction = "any", h(a), f(a);
            var o, l, u = {},
                c = A(a);
            for (o = 0; o < c.length; o++) {
                var s = {};
                for (l = 0; l < c[o].nodes.length; l++) s[c[o].nodes[l]] = !0;
                var d = i(s);
                y.forEach(d, t)
            }
            return u
        }, b.pageRank = function(e) {
            function t(e, t) {
                var n = 1;
                return t.value && e.d && (n = Number(e.d[t.value])), n
            }

            function i(e) {
                var t, n, r = [],
                    i = 0,
                    a = 0;
                for (t = 0; t < s.length; t++) i += e[t];
                for (t = 0; t < s.length; t++) {
                    var o = 0;
                    for (n = 0; n < f[t].length; n++) {
                        var l = f[t][n];
                        o += d[t][l] * e[l] / v[l]
                    }
                    0 === v[t] && (a += b * e[t]), o *= b, o += (1 - b) * i / s.length, r.push(o)
                }
                for (a /= s.length, t = 0; t < m.length; t++) r[t] += a;
                return r
            }

            function a(e) {
                var t, n = 0;
                for (t = 0; t < e.length; t++) n += e[t];
                return n
            }
            var o, l = y.defaults(e, {
                all: !1,
                value: void 0,
                directed: !0
            });
            l.combos = "toplevel", h(l), g(l);
            var u, c = {},
                s = [],
                f = [],
                d = [],
                v = [],
                m = [],
                b = .85;
            for (r(l, function(e) {
                    s.push(e.id), c[e.id] = s.length - 1, f.push([]), d.push({}), v.push(0)
                }), u = Math.max(100, 5 * Math.sqrt(s.length)), n(l, function(e) {
                    var n = c[e.id1],
                        r = c[e.id2],
                        i = t(e, l);
                    l.directed && !e.a2 && (e.a1 || e.a2) || (d[r][n] || (d[r][n] = 0, f[r].push(n)), d[r][n] += i, v[n] += i), l.directed && !e.a1 && (e.a1 || e.a2) || (d[n][r] || (d[n][r] = 0, f[n].push(r)), d[n][r] += i, v[r] += i)
                }), o = 0; o < s.length; o++) m.push(Math.random());
            var p = 1 / a(m);
            for (o = 0; o < s.length; o++) m[o] *= p;
            for (o = 0; u > o; o++) m = i(m);
            for (p = 1 / a(m), o = 0; o < s.length; o++) m[o] *= p;
            var I = {};
            for (o = 0; o < s.length; o++) I[s[o]] = m[o];
            return I
        }, b.neighbours = function(e, t) {
            function n(e, t, n) {
                !d[t] && M(n, e, t, c) && (a[t] = 1, d[t] = 1, n !== e && (o[e] = 1, e in g && (o[n] = 1), e in l || (s++, f[e] = 1)))
            }

            function r() {
                y.forEach(l, function(e, t) {
                    if (p[t]) {
                        m[t] && y.forEach(m[t], function(e, r) {
                            for (var i = 0; i < e.length; i++) {
                                var a = y.rawId(e[i]);
                                n(r, a, t)
                            }
                        });
                        var r = b[t];
                        if (r)
                            for (var i = 0; i < r.length; i++) n(t, r[i], t)
                    } else if (I[t]) {
                        var a = I[t];
                        !d[a.id2] && M(a.id2, a.id1, t, c) && (o[a.id2] = 1, d[a.id2] = 1, d[t] = 1, a.id2 in l || (s++, f[a.id2] = 1)), !d[a.id1] && M(a.id1, a.id2, t, c) && (o[a.id1] = 1, d[a.id1] = 1, d[t] = 1, a.id1 in l || (s++, f[a.id1] = 1))
                    }
                })
            }
            var i = y.ensureArray(e),
                a = {},
                o = {},
                l = y.makeIdMap(i),
                c = y.defaults(t, {
                    all: !1,
                    direction: "any",
                    hops: 1
                });
            if (c.hops < 1) throw new Error("neighbours error: hops must be a positive number");
            h(c);
            var s = 0,
                f = {},
                d = {},
                g = l,
                v = u(c),
                m = v.adjacency,
                b = v.selfAdjacency;
            for (y.forEach(l, function(e, t) {
                    var n = y.rawId(t);
                    if (!p[n] && !I[n]) throw new Error("neighbours error: ids must be present in the graph");
                    s++
                }); c.hops-- && s;) s = 0, r(), l = f, f = {};
            return {
                nodes: Object.keys(o),
                links: Object.keys(a)
            }
        }, b.privateNeighbourLinks = function(e) {
            var t = u({
                    all: !0,
                    combos: "all"
                }),
                n = t.adjacency,
                r = t.selfAdjacency,
                i = {},
                a = [];
            return e.forEach(function(e) {
                y.forEach(n[e], function(e) {
                    e.forEach(function(e) {
                        i[e] || (a.push(e), i[e] = !0)
                    })
                });
                var t = r[e];
                if (t)
                    for (var o = 0; o < t.length; o++) a.push(t[o])
            }), a
        }, b.privateGetLinkIdsBetween = function(e, t) {
            var n = u({
                    all: !0,
                    combos: "all"
                }),
                r = n.adjacency,
                i = n.selfAdjacency,
                a = [];
            return r[e] && (a = r[e][t] || []), e === t && i[e] && (a = a.concat(i[e])), a
        }, b.clusters = function(e) {
            function t(e, t) {
                var n = 1;
                return t.value && e.d && (n = +e.d[t.value]), n
            }

            function i(e) {
                g = +e, g = y.isNumber(g) ? g : 5, g = Math.max(0, g), g = Math.min(10, g), g = g * g * g / 125
            }

            function a() {
                var e, t, n = [];
                for (e = 0; e < B.length; e++) {
                    var r = [];
                    for (t = 0; t < C[B[e]].length; t++) r.push(p[C[B[e]][t]]);
                    n.push(r)
                }
                return n
            }

            function o(e, t, n) {
                var r, i = G[t],
                    a = G[e],
                    o = v[n],
                    l = (-o + (i - a)) * o * g;
                for (l /= 2 * x, r = 0; r < m[n].length; r++) {
                    var u = m[n][r];
                    w[u] === t ? l -= b[n][u] : w[u] === e && (l += b[n][u])
                }
                return l / x
            }

            function l(e, t) {
                var n, r;
                if (t !== e && 0 !== C[e].length && 0 !== C[t].length) {
                    var i = G[e],
                        a = G[t],
                        o = 0;
                    for (o -= g * i * a / x, n = 0; n < C[e].length; n++) {
                        var l = C[e][n];
                        for (r = 0; r < m[l].length; r++) w[m[l][r]] === t && (o += b[l][m[l][r]])
                    }
                    if (o /= x, o > 0) {
                        var c = C[e].length;
                        for (n = 0; c > n; n++) u(C[e][0], t)
                    }
                }
            }

            function u(e, t) {
                var n, r = w[e];
                w[e] = t;
                var i = [];
                for (n = 0; n < C[r].length; n++) C[r][n] !== e && i.push(C[r][n]);
                0 === C[t].length && (B.push(t), A.splice(A.indexOf(t), 1)), C[r] = i, C[t].push(e), G[t] += v[e], G[r] -= v[e], 0 === C[r].length && (A.push(r), B.splice(B.indexOf(r), 1))
            }

            function c(e) {
                var t, n = C[e].length;
                if (1 !== n && A.length) {
                    var r = [];
                    for (t = 0; n > t; t++) r.push(C[e][t]);
                    for (t = 0; n > t && A.length; t++) u(r[t], A[0])
                }
            }
            var s, f = y.defaults(e, {
                all: !1,
                factor: 5,
                consistent: !0
            });
            f.combos = "toplevel", h(f);
            var d, g, v = [],
                m = [],
                b = [],
                p = [],
                I = {},
                x = 0,
                C = [],
                w = [],
                G = [],
                A = [],
                B = [];
            if (r(f, function(e) {
                    p.push(e.id), m.push([]), b.push([]), I[e.id] = p.length - 1, C.push([p.length - 1]), w.push(p.length - 1), B.push(p.length - 1), v.push(0), G.push(0)
                }), n(f, function(e) {
                    var n = t(e, f);
                    x += n;
                    var r = I[e.id1],
                        i = I[e.id2];
                    b[r][i] || (b[r][i] = 0, b[i][r] = 0), b[r][i] += n, b[i][r] += n, v[r] += n, v[i] += n, G[r] += n, G[i] += n, m[r].push(i), m[i].push(r)
                }), d = Math.max(1e4, 50 * p.length), 0 === p.length) return [];
            0 === x && (d = 0);
            var Z = y.makeRandomiser();
            for (Z.setSeed(f.consistent ? 900736044081 : null), i(f.factor), s = 0; d > s; s++) {
                if (Z.next() > .95) {
                    var R = B[Math.floor(Z.next() * B.length)],
                        M = B[Math.floor(Z.next() * B.length)];
                    l(R, M)
                }
                if (.5 * d > s && Z.next() > .98) {
                    var E = B[Math.floor(Z.next() * B.length)];
                    c(E)
                }
                var k = Math.floor(p.length * Z.next()),
                    L = m[k][Math.floor(Z.next() * m[k].length)],
                    S = w[L],
                    W = w[k];
                if (S !== W) {
                    var V = o(S, W, k);
                    V >= 0 && u(k, S)
                }
            }
            return a()
        }, b.privateDisjointSet = function(e, t) {
            for (var n, r, i = b.privateUnionFind(e, t), a = i.indices, o = i.nodeIds, l = i.groupRepresentatives, u = [], c = 0; c < o.length; c++) n = o[c], a[c] === c ? a[c] = u.push([n]) - 1 : (r = a[a[c]], a[c] = r, u[r].push(n)), l[n] = a[c];
            return {
                vertexGroups: u,
                groupIndex: l
            }
        }, b.privateUnionFind = function(e, t) {
            var n, r = Object.keys(e),
                a = {},
                o = new Array(r.length);
            for (n = 0; n < r.length; n++) a[r[n]] = n, o[n] = n;
            var l, u, c;
            for (n = 0; n < t.length; n++) c = t[n], l = i(o, a[c.id1], !0), u = i(o, a[c.id2], !0), l > u ? o[l] = u : u > l && (o[u] = l);
            for (n = 0; n < r.length; n++) o[n] = i(o, n, !1), a[r[n]] = o[n];
            return {
                indices: o,
                nodeIds: r,
                groupRepresentatives: a
            }
        }, b.components = function(e) {
            var t = y.defaults(e, {
                all: !1
            });
            h(t);
            var n, r, i, a = u(t),
                o = a.vertices,
                l = a.edges,
                c = a.selfAdjacency,
                s = b.privateDisjointSet(o, l),
                f = s.vertexGroups,
                d = s.groupIndex;
            for (n = 0; n < f.length; n++) f[n] = {
                nodes: f[n],
                links: []
            };
            for (n = 0; n < l.length; n++) {
                r = l[n], i = d[r.id1];
                for (var g = 0; g < r.ids.length; g++) f[i].links.push(r.ids[g])
            }
            return Object.keys(c).forEach(function(e) {
                i = d[e], l = c[e];
                for (var t = 0; t < l.length; t++) f[i].links.push(l[t])
            }), f
        };
        var A = b.components;
        b.internalMarkLinks = function(e) {
            var t = u({
                    combos: "all"
                }),
                n = t.adjacency,
                r = t.selfAdjacency,
                i = 2,
                a = {};
            y.forEach(e, function(e, t) {
                var i = n[t];
                i && y.forEach(i, function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        a[n] = !0
                    }
                });
                var o = r[t];
                if (o)
                    for (var l = 0; l < o.length; l++) a[o[l]] = !0
            }), y.forEach(a, function(t, n) {
                e[n] = i
            })
        }, b.distances = function(e, t) {
            if (!p[e]) throw new Error("distances error: id(s) must be present in the graph");
            var n = t || {};
            g(n), h(n);
            var r = S(e, n),
                i = {};
            return y.forEach(r.distance, function(e, t) {
                y.isNumber(e) && (i[t] = e)
            }), i
        };
        var B = b.distances,
            Z = function(e, t, n) {
                var r, i = u(n).adjacency,
                    a = i[e][t],
                    o = 1 / 0,
                    l = k(n);
                if (a)
                    for (var c = 0; c < a.length; c++) {
                        var s = l(e, t, a[c], n);
                        y.isNumber(s) && o > s && (r = [], o = s, r.push(a[c]))
                    }
                return {
                    value: o,
                    links: r
                }
            },
            R = function(e, t) {
                return I[e].a2 && I[e].id2 === t || I[e].a1 && I[e].id1 === t
            },
            M = function(e, t, n, r) {
                return "any" !== r.direction ? "from" === r.direction && R(n, t) || "to" === r.direction && R(n, e) : !0
            },
            E = function(e, t, n, r) {
                var i = NaN;
                return M(e, t, n, r) && (r.value ? I[n].d && (i = +I[n].d[r.value]) : i = 1), i
            },
            k = function(e) {
                return v(e) ? L : E
            },
            L = function(e, t, n, r) {
                var i = E(e, t, n, r);
                return y.isNaN(i) ? i : 1 / i
            },
            S = function(e, t) {
                function n() {
                    for (var e, t = 1 / 0, n = 0; n < l.length; n++) {
                        var r = a[l[n]];
                        t >= r && (e = n, t = r)
                    }
                    return e
                }

                function i(e, t, n) {
                    o[e] || (o[e] = []), o[e].push({
                        id: t,
                        links: n
                    })
                }
                var a = {},
                    o = {},
                    l = [],
                    c = u(t).adjacency;
                for (r(t, function(e) {
                        var t = e.id;
                        a[t] = 1 / 0, o[t] = void 0, l.push(t)
                    }), a[e] = 0; l.length > 0;) {
                    var s = n(),
                        f = l[s];
                    if (a[f] === 1 / 0) break;
                    l.splice(s, 1), y.forEach(c[f], function(e, n) {
                        var r = Z(f, n, t),
                            l = a[f] + r.value;
                        l < a[n] ? (a[n] = l, o[n] = [{
                            id: f,
                            links: r.links
                        }]) : l === a[n] && i(n, f, r.links)
                    })
                }
                return {
                    distance: a,
                    previous: o
                }
            };
        b.shortestPaths = function(e, t, n) {
            function r(e) {
                for (var t = [], n = 0; n < e.length; n++) o[e[n].id] && (t = t.concat(o[e[n].id]));
                return t
            }
            if ("string" != typeof e || "string" != typeof t) throw new Error("shortestPaths error: ids must be strings");
            if (!p[e] || !p[t]) throw new Error("shortestPaths error: ids must be present in the graph");
            var i = y.defaults(n, {
                all: !1
            });
            g(i), h(i);
            var a = S(e, i),
                o = a.previous;
            if (a.distance[t] === 1 / 0) return {
                onePath: [],
                one: [],
                items: [],
                distance: 1 / 0
            };
            for (var l = [], u = [], c = t; o[c];) l.unshift(c), u.unshift(c), u.unshift(o[c][0].links[0]), c = o[c][0].id;
            l.unshift(c), u.unshift(c);
            var s = {};
            s[t] = 1;
            var f = [];
            f.push({
                id: t
            });
            for (var d = r(f); d.length > 0;) {
                for (var v = 0; v < d.length; v++) {
                    s[d[v].id] = 1;
                    for (var m = 0; m < d[v].links.length; m++) s[d[v].links[m]] = 1
                }
                d = r(d)
            }
            return {
                onePath: u,
                one: l,
                items: Object.keys(s),
                distance: a.distance[t]
            }
        }, b.degrees = function(e) {
            var t = y.defaults(e, {
                multi: !0,
                all: !1
            });
            t.combos = "toplevel", g(t), h(t);
            var n = u(t).adjacency,
                i = {};
            return r(t, function(e) {
                var r = e.id;
                i[r] = 0, y.forEach(n[r], function(e, n) {
                    for (var a = 0; a < e.length; a++) {
                        var o = E(r, n, e[a], t);
                        if (y.isNumber(o) && (i[r] += o, !t.multi)) break
                    }
                })
            }), i
        };
        var W = b.degrees;
        return b.betweenness = function(e, t) {
            function n(e, t) {
                return U[e] - U[t]
            }

            function i(e) {
                return e.sort(n), e.shift()
            }

            function a(e, t) {
                e.sort(n), y.contains(e, t) || e.push(t)
            }

            function o(e, t) {
                var n = Z(e, t, M).value;
                return y.isNumber(n) ? n : I() || y.isNumber(n) ? 1 / 0 : 1
            }

            function l(e) {
                return e.length > 0
            }

            function c() {
                F.length = 0, T.length = 0, r(C, function(e) {
                    for (var t = 0; t < z.length; t++) m(z[t].dict, e.id, z[t].value)
                })
            }

            function f(e, t, n) {
                r(e, function(e) {
                    m(t, e.id, n)
                })
            }

            function m(e, t, n) {
                Array.isArray(n) && l(n) && e[t] ? e[t].length = 0 : e[t] = y.clone(n)
            }

            function b() {
                var e, t, n, r = A(C),
                    i = {};
                for (e = 0; e < r.length; e++)
                    for (n = r[e], t = 0; t < n.nodes.length; t++) i[n.nodes[t]] = n.nodes.length;
                return i
            }

            function p() {
                return !y.isNullOrUndefined(C.value)
            }

            function I() {
                return !!C.directed
            }

            function x() {
                return C.endpoints
            }
            var C = y.defaults(e, {
                value: void 0,
                directed: !1,
                normalization: "component",
                endpoints: !1,
                weights: !1,
                all: !1
            });
            C.combos = "toplevel", s(C), h(C);
            var w = p() || I() ? "dijkstra" : "regular",
                B = x() ? "endpoints" : "regular",
                R = d(C),
                M = {
                    direction: I() ? "from" : "any",
                    value: C.value,
                    weights: v(C),
                    all: C.all
                };
            g(C);
            var E, k, L, S, W, V, X = {},
                F = [],
                T = [],
                N = {},
                H = {},
                Y = {},
                U = {},
                K = 0,
                z = [{
                    dict: H,
                    value: 0
                }, {
                    dict: U,
                    value: 1 / 0
                }, {
                    dict: N,
                    value: []
                }, {
                    dict: Y,
                    value: 0
                }],
                O = u(C).adjacency,
                D = {
                    regular: function(e) {
                        for (H[e] = 1, U[e] = 0, F.push(e); l(F);) E = F.shift(), T.push(E), y.forEach(O[E], function(e, t) {
                            y.isNumber(U[t]) || (U[t] = U[E] + 1, F.push(t)), U[t] === U[E] + 1 && (H[t] += H[E], N[t].push(E))
                        })
                    },
                    dijkstra: function(e) {
                        for (H[e] = 1, U[e] = 0, F.push(e); l(F);) E = i(F), T.push(E), y.forEach(O[E], function(e, t) {
                            U[t] > U[E] + o(E, t) && (U[t] = U[E] + o(E, t), a(F, t), H[t] = 0, N[t] = []), U[t] === U[E] + o(E, t) && (H[t] += H[E], N[t].push(E))
                        })
                    }
                },
                _ = {
                    regular: function(e) {
                        for (; l(T);) {
                            for (k = T.pop(), W = (1 + Y[k]) / H[k], S = 0; S < N[k].length; S++) E = N[k][S], Y[E] += H[E] * W;
                            k !== e && (X[k] += Y[k])
                        }
                    },
                    endpoints: function(e) {
                        for (X[e] += T.length - 1; l(T);) {
                            for (k = T.pop(), W = (1 + Y[k]) / H[k], S = 0; S < N[k].length; S++) E = N[k][S], Y[E] += H[E] * W;
                            k !== e && (X[k] += Y[k] + 1)
                        }
                    }
                },
                P = {
                    chart: function() {
                        K > 2 && (L = 1 / ((K - 1) * (K - 2)), y.forEach(X, function(e, t) {
                            X[t] *= L
                        }))
                    },
                    component: function() {
                        V = b(), y.forEach(X, function(e, t) {
                            V[t] > 2 && (L = 1 / ((V[t] - 1) * (V[t] - 2)), X[t] *= L)
                        })
                    },
                    unnormalized: function() {
                        I() || (L = .5, y.forEach(X, function(e, t) {
                            X[t] *= L
                        }))
                    }
                },
                j = function() {
                    q(), y.invoke(t, X)
                },
                J = D[w] || D.regular,
                Q = _[B] || _.regular,
                q = P[R] || P.chart;
            r(C, function() {
                K++
            }), f(C, X, 0);
            var $ = function(e, t) {
                c(), J(e.id), Q(e.id), t()
            };
            G(C, "betweenness", $, j)
        }, b.closeness = function(e, t) {
            function n(e, t) {
                var n = 0;
                return y.forEach(t, function(e) {
                    n += y.isNumber(e) ? 1 : 0
                }), n
            }

            function r(e) {
                return 0 === Object.keys(e).length
            }

            function i(e) {
                return !y.isNullOrUndefined(e)
            }

            function a(e) {
                return !I[e].a1 && !I[e].a2
            }

            function o(e) {
                var t = {},
                    n = 0,
                    a = {},
                    o = {};
                for (o[e] = 1; !r(o);) a = o, o = {}, y.forEach(a, function(e, r) {
                    i(t[r]) || (t[r] = n, y.forEach(w[r], function(e, t) {
                        o[t] = 1
                    }))
                }), n += 1;
                return t
            }

            function l() {
                return "any" !== C.direction
            }

            function c() {
                if (C.mode = C.mode || "auto", !C.mode.match(/^(connected|disconnected|auto)$/)) throw new TypeError("Option mode property should be either 'connected', 'disconnected' or 'auto'")
            }

            function f() {
                return c(), "auto" === C.mode ? x() : C.mode
            }

            function v() {
                return !y.isNullOrUndefined(C.value)
            }

            function b() {
                return d(C).match(/chart/)
            }

            function p() {
                return d(C).match(/component/)
            }

            function x() {
                var e = "disconnected",
                    t = A(C);
                if (1 === t.length && (e = "connected", l()))
                    for (var n = 0; n < t[0].links.length; n++)
                        if (a(t[0].links[n])) return "disconnected";
                return e
            }
            var C = y.defaults(e, {
                direction: "any",
                value: void 0,
                normalization: "component",
                mode: "auto",
                weights: !1,
                all: !1
            });
            C.combos = "toplevel";
            var w = u(C).adjacency,
                Z = g(C);
            s(C), h(C), Z.all = C.all;
            var R, M, E, k, L, S = v() || l() ? "dijkstra" : "regular",
                W = 0,
                V = {},
                X = f(),
                F = {
                    regular: function(e) {
                        return o(e)
                    },
                    dijkstra: function(e, t) {
                        return B(e, t)
                    }
                },
                T = {
                    connected: function(e, t) {
                        var n = 0;
                        return y.forEach(t, function(e) {
                            n += y.isNumber(e) ? e : 0
                        }), n ? 1 / n : 0
                    },
                    disconnected: function(e, t) {
                        var n = 0;
                        return y.forEach(t, function(t, r) {
                            n += e !== r ? 1 / t : 0
                        }), n
                    }
                },
                N = function() {
                    y.invoke(t, V)
                };
            M = F[S] || F.regular, E = T[X], W = m(C), V = {};
            var H = function(e, t) {
                k = M(e.id, Z), R = n(e.id, k), V[e.id] = E(e.id, k), W > 1 && (L = b() ? Math.pow(R - 1, 2) / (W - 1) : p() ? R - 1 : 1, V[e.id] *= L), t()
            };
            G(C, "closeness", H, N)
        }, b.kCores = function(e) {
            function t(e) {
                var t = 0;
                return y.forEach(e, function(e) {
                    t = Math.max(t, e)
                }), t
            }
            var n = y.defaults(e, {
                all: !1
            });
            n.combos = "toplevel", h(n);
            var i = u(n).adjacency,
                a = function() {
                    var e, t, a, o, l, u, c, s, f, d, g, h = {},
                        v = {},
                        m = [],
                        b = [];
                    for (t = 0, h = W({
                            multi: !1,
                            all: n.all,
                            combos: "toplevel"
                        }), y.forEach(h, function(e) {
                            t = Math.max(t, e)
                        }), g = Object.keys(h).length, e = 0; t + 1 > e; e++) b[e] = 0;
                    for (r(n, function(e) {
                            b[h[e.id]]++
                        }), l = 1, e = 0; t + 1 > e; e++) u = b[e], b[e] = l, l += u;
                    for (r(n, function(e) {
                            var t = e.id;
                            v[t] = b[h[t]], m[v[t]] = t, b[h[t]]++
                        }), e = t; e > 1; e--) b[e] = b[e - 1];
                    for (b[0] = 1, o = 0; g > o; o++) a = m[o], y.forEach(i[a], function(e, t) {
                        h[t] > h[a] && (s = h[t], f = v[t], d = b[s], c = m[d], t !== c && (v[t] = d, m[f] = c, v[c] = f, m[d] = t), b[s]++, h[t]--)
                    });
                    return h
                },
                o = a();
            return {
                maximumK: t(o),
                values: o
            }
        }, b
    }
}(),
function() {
    "use strict";
    if (KeyLines.WebGL) {
        var e = 6;
        KeyLines.WebGL.imageFactory = function(t) {
            return function(n, r, i, a, o, l, u) {
                var c, s = n.wsc || [0, 0, 0, 0],
                    f = 0;
                if ("ci" === n.s && (f = "width" === r.maxDimension ? (n.y2 - n.y1) / 2 : (n.x2 - n.x1) / 2), i.alwaysUpdate || i.rebuildOptions.all || i.rebuildOptions.shadow)
                    for (c = 0; e > c; c++) {
                        var d = i.triangleBuffers.shadowData,
                            g = i.triangleBuffers.shadowIndex;
                        d[g++] = s[0], d[g++] = s[1], d[g++] = s[2], d[g++] = s[3], i.triangleBuffers.shadowIndex = g
                    }
                if (i.rebuildOptions.colours || i.alwaysUpdate || i.rebuildOptions.all) {
                    var h = (o ? t.background : 1) * (l ? t.ghost : 1);
                    for (c = 0; e > c; c++) {
                        var v = i.triangleBuffers.colourData,
                            m = i.triangleBuffers.colourIndex;
                        v[m++] = 255 * h, v[m++] = 255 * h, v[m++] = 255 * h, v[m++] = 255 * h, i.triangleBuffers.colourIndex = m
                    }
                }
                if (i.rebuildOptions.positions || i.alwaysUpdate || i.rebuildOptions.all) {
                    var y = i.triangleBuffers.positionIndex,
                        b = i.triangleBuffers.positionData;
                    if (u)
                        for (c = 0; 18 > c; c++) b[y++] = 0;
                    else {
                        var p = n.x1,
                            I = n.y1,
                            x = n.x2,
                            C = n.y2;
                        a && (p = n.x1 + a.x, I = n.y1 + a.y, x = n.x2 + a.x, C = n.y2 + a.y), b[y++] = p, b[y++] = I, b[y++] = 0, b[y++] = x, b[y++] = I, b[y++] = 0, b[y++] = p, b[y++] = C, b[y++] = 0, b[y++] = p, b[y++] = C, b[y++] = 0, b[y++] = x, b[y++] = I, b[y++] = 0, b[y++] = x, b[y++] = C, b[y++] = 0
                    }
                    i.triangleBuffers.positionIndex = y
                }
                if (i.rebuildOptions.textures || i.alwaysUpdate || i.rebuildOptions.all) {
                    var w, G, A, B;
                    f ? (G = r.cu1, w = r.cv1, B = r.cu2, A = r.cv2) : (G = r.u1, w = r.v1, B = r.u2, A = r.v2);
                    var Z = i.triangleBuffers.textureData,
                        R = i.triangleBuffers.textureIndex;
                    Z[R++] = G, Z[R++] = w, Z[R++] = 0, Z[R++] = 0, Z[R++] = r.textureBank, Z[R++] = 0, Z[R++] = f, Z[R++] = 0, Z[R++] = 0, Z[R++] = B, Z[R++] = w, Z[R++] = 1, Z[R++] = 0, Z[R++] = r.textureBank, Z[R++] = 0, Z[R++] = f, Z[R++] = 0, Z[R++] = 0, Z[R++] = G, Z[R++] = A, Z[R++] = 0, Z[R++] = 1, Z[R++] = r.textureBank, Z[R++] = 0, Z[R++] = f, Z[R++] = 0, Z[R++] = 0, Z[R++] = G, Z[R++] = A, Z[R++] = 0, Z[R++] = 1, Z[R++] = r.textureBank, Z[R++] = 0, Z[R++] = f, Z[R++] = 0, Z[R++] = 0, Z[R++] = B, Z[R++] = w, Z[R++] = 1, Z[R++] = 0, Z[R++] = r.textureBank, Z[R++] = 0, Z[R++] = f, Z[R++] = 0, Z[R++] = 0, Z[R++] = B, Z[R++] = A, Z[R++] = 1, Z[R++] = 1, Z[R++] = r.textureBank, Z[R++] = 0, Z[R++] = f, Z[R++] = 0, Z[R++] = 0, i.triangleBuffers.textureIndex = R
                }
            }
        }
    }
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    e && (e.create = function(t) {
        var n = {},
            r = {
                bidi: KeyLines.Bidi,
                canvas: t,
                layersToDraw: [],
                textAtlas: null,
                fontIconAtlas: null,
                imageAtlases: [],
                allLayers: {},
                framebuffers: {},
                alpha: {}
            },
            i = e.Generator(r),
            a = e.Renderer(r);
        return n.setAlpha = function(e, t) {
            r.alpha.ghost = e, r.alpha.background = t
        }, n.clearView = function(e) {
            a.clearView(e)
        }, n.shutdownAndReset = function() {
            a.finish(), r = {
                bidi: KeyLines.Bidi,
                canvas: t,
                layersToDraw: [],
                textAtlas: null,
                fontIconAtlas: null,
                imageAtlases: [],
                allLayers: {},
                framebuffers: {},
                alpha: {}
            }, i = e.Generator(r), a = e.Renderer(r)
        }, n.clearFramebuffers = function() {
            a.clearFramebuffers()
        }, n.updateTextures = function(t) {
            a.clearTextureAtlas(r.imageAtlases), r.imageAtlases = e.ImageAtlas(t)
        }, n.build = function(e, t, n, r) {
            i.generate(e, t, n, r, a)
        }, n.draw = function(e, t, n) {
            a.render(e, t, r.textAtlas, r.fontIconAtlas, r.imageAtlases, n)
        }, n.getPixels = function(e, t, n) {
            return a.getPixels(e, t, r.textAtlas, r.fontIconAtlas, r.imageAtlases, n)
        }, n.drawShadowCanvas = function(e, t) {
            return a.drawShadowCanvas(e, t)
        }, n
    })
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    e && (e.LineShader = function(t) {
        function n(e, t, n, r, i, a, o) {
            c.uniform3f(m.resolution, t, n, r), c.uniformMatrix4fv(m.transform, !1, e.get()), c.uniform1f(m.hitTest, 0 | i), c.uniform1f(m.zoom, e.getZoomLevel()), c.uniform1f(m.shadowType, a), c.uniform1f(m.viewIndependent, 0 | !o)
        }

        function r(e) {
            e.elementBuffer || (e.elementBuffer = c.createBuffer()), e.indexBuffer || (e.indexBuffer = c.createBuffer())
        }

        function i(e) {
            c.bindBuffer(c.ARRAY_BUFFER, e.elementBuffer),
                c.enableVertexAttribArray(v.position1), c.enableVertexAttribArray(v.position2), c.enableVertexAttribArray(v.position3), c.enableVertexAttribArray(v.vertexInfo), c.enableVertexAttribArray(v.colour), c.enableVertexAttribArray(v.shadowColour), c.enableVertexAttribArray(v.index), c.vertexAttribPointer(v.position1, 2, c.FLOAT, !1, s, 0), c.vertexAttribPointer(v.position2, 2, c.FLOAT, !1, s, 8), c.vertexAttribPointer(v.position3, 2, c.FLOAT, !1, s, 16), c.vertexAttribPointer(v.vertexInfo, 4, c.UNSIGNED_BYTE, !1, s, 24), c.vertexAttribPointer(v.colour, 4, c.UNSIGNED_BYTE, !1, s, 28), c.vertexAttribPointer(v.shadowColour, 3, c.UNSIGNED_BYTE, !1, s, 32), c.vertexAttribPointer(v.index, 1, c.UNSIGNED_BYTE, !1, s, 35)
        }

        function a(e, t) {
            (e.alwaysUpdate || e.rebuildOptions.all || e.rebuildOptions.positions || e.rebuildOptions.colours || e.rebuildOptions.textures || e.rebuildOptions.shadow) && (c.bindBuffer(c.ARRAY_BUFFER, t.elementBuffer), c.bufferData(c.ARRAY_BUFFER, t.elementData, c.DYNAMIC_DRAW), c.bindBuffer(c.ARRAY_BUFFER, null), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, t.indexBuffer), c.bufferData(c.ELEMENT_ARRAY_BUFFER, t.elementIndex, c.DYNAMIC_DRAW), c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null))
        }

        function o(e) {
            c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, e.indexBuffer), c.drawElements(c.TRIANGLES, 3 * e.numOfTriangles, c.UNSIGNED_INT, 0)
        }

        function l() {
            c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, null), c.bindBuffer(c.ARRAY_BUFFER, null)
        }
        var u, c = t,
            s = 9 * Float32Array.BYTES_PER_ELEMENT,
            f = {},
            d = e.Utils;
        if (!c.lineShader) {
            var g = d.compileShader(c, "line-vertex", c.VERTEX_SHADER),
                h = d.compileShader(c, "line-fragment", c.FRAGMENT_SHADER);
            u = d.createProgram(c, g, h), c.lineShader = {
                vertexShader: g,
                fragmentShader: h,
                program: u
            }
        }
        u = c.lineShader.program, c.getExtension("OES_standard_derivatives"), c.getExtension("OES_element_index_uint");
        var v = {
                position1: c.getAttribLocation(u, "a_position1"),
                position2: c.getAttribLocation(u, "a_position2"),
                position3: c.getAttribLocation(u, "a_position3"),
                colour: c.getAttribLocation(u, "a_colour"),
                vertexInfo: c.getAttribLocation(u, "a_vertexInfo"),
                shadowColour: c.getAttribLocation(u, "a_hitTestColour"),
                index: c.getAttribLocation(u, "a_index")
            },
            m = {
                hitTest: c.getUniformLocation(u, "u_hitTest"),
                zoom: c.getUniformLocation(u, "u_zoom"),
                transform: c.getUniformLocation(u, "u_transform"),
                resolution: c.getUniformLocation(u, "u_resolution"),
                shadowType: c.getUniformLocation(u, "u_shadowType"),
                viewIndependent: c.getUniformLocation(u, "u_viewIndependent")
            };
        return f.finish = function() {
            e.Utils.finishProgram(c, u)
        }, f.drawItems = function(e, t, s, f, d, g, h) {
            c.useProgram(u), l(), n(s, f, d, g, h, 0 | e.shadowType, e.useView), r(t), a(e, t), i(t), o(t), l()
        }, f
    })
}(),
function() {
    KeyLines.TimeBar.Controller = {};
    var e = KeyLines.TimeBar.Controller;
    e.createController = function(e, t, n, r) {
        function i() {
            e.trigger("redraw")
        }

        function a(e, n, r) {
            ne = ee.widgets(), j = e, D = n, _ = r, t.setSize(n, r);
            var i = P(D, _, !0);
            oe = KeyLines.Common.hitTester(i.getContext("2d"), n, r, ne)
        }

        function o(e) {
            var t = {},
                n = ee.useHiResImages();
            q.forEach(ye, function(e) {
                t[e] = !0, n && (t[ee.hiResUrl(e)] = !0)
            }), ee.imageLoader(e, J, t, !1, !1, function(t, n) {
                ve = {}, q.forEach(n, function(e, t) {
                    ve[t] = {
                        im: e
                    }
                });
                var r = e();
                q.replaceUnloadedImages(ve, r), i()
            })
        }

        function l() {
            Ie._tbLeft = 'url("' + J + 'openhand.cur"), pointer', Ie._tbRight = Ie._tbLeft, q.forEach(he, function(e, t) {
                Ie[t] = "pointer"
            })
        }

        function u(e, n, r) {
            t[n](e);
            var i = t.getInnerRange();
            m(i.t1, i.t2, {
                quiet: !0
            }, r)
        }

        function c() {
            var e = null,
                t = $.makeValueAnimator(re, function(t) {
                    return 0 === arguments.length ? e : void(e = t)
                });
            return function(n) {
                return r.options.heightChange.animate && null !== e ? t(n, r.options.heightChange.time) : e = n, e
            }
        }

        function s(e, t) {
            return e && t ? e.t1 !== t.t1 || e.t2 !== t.t2 : !0
        }

        function f(e, n) {
            for (var r = t.getHistogram(), i = "_tbBar" === ue, a = 0; r.x[a + 1] < n && a < r.count;) a++;
            var o = i ? r.value[a] : r.selvalues[e][a],
                l = i ? r.maxvalue : r.maxselvalue,
                u = (r.x[a] + r.x[a + 1]) / 2,
                c = t.getBounds().histogram,
                s = c.ybase,
                f = i ? c.maxbarh : c.maxselh,
                d = Math.floor(f * o / l),
                g = s - d;
            return i || (g -= 5), {
                x: u,
                y: g,
                v: o
            }
        }

        function d(n, r, i) {
            ue = oe.test(n, r), b(n, r) && (de = t.findRange(n, r));
            var a = s(de, ge.lastRange);
            if ("hover" !== i || ue !== ge.lastId || a) {
                var o, l, u, c, d = n,
                    g = r,
                    h = null,
                    v = de && "histogram" === de.bar;
                if (b(n, r) && (o = te.unUTCify(de.t1), l = te.unUTCify(de.t2), h = v ? null : "scale"), p()) {
                    h = "bar", "_tbBar" !== ue && (h = "selection", u = +ue.match(be)[1], v || (de = t.findRange(n, r, "histogram"), o = te.unUTCify(de.t1), l = te.unUTCify(de.t2)));
                    var m = f(u, n);
                    d = m.x, g = m.y, c = m.v
                }!h && ue && (h = H(ue)), ge.lastId = ue, ge.lastRange = de, e.trigger(i, h, u, c, d, g, o, l)
            }
        }

        function g(n) {
            r.playingExtend = !!n.extend, Q || (Q = !0, re.push(KeyLines.Common.buildAnimatorInstance(function(n) {
                var i = t.offsetRanges(Math.floor(t.getTimeRate() * (r.options.playSpeed || r.defaultPlaySpeed) * (n / 1e3)), r.playingExtend);
                return Q && i ? (t.triggerTimeBarChanged(), !0) : (Q = !1, r.playingExtend = !1, i || e.trigger("pause"), !1)
            })))
        }

        function h(e, n, i, a, o, l) {
            var u = e.t1,
                c = e.t2,
                s = i - u,
                f = a - c,
                d = o || {},
                g = d.time || r.defaultAnimationTime,
                h = g;
            re.push(KeyLines.Common.buildAnimatorInstance(function(e) {
                h = Math.max(0, h - e);
                var r = 1 - h / g,
                    i = u + s * r,
                    a = c + f * r;
                return n(i, a), 0 >= h && (d.quiet || t.triggerTimeBarChanged(), q.invoke(l)), h > 0
            }))
        }

        function v(e, n, r, i) {
            var a = t.limitInnerRange(e, n);
            h(t.getInnerRange(), t.setInner, a.t1, a.t2, r, i)
        }

        function m(e, n, r, i) {
            r.animate ? v(e, n, r, i) : (t.setInner(e, n), r.quiet || t.triggerTimeBarChanged(), q.invoke(i))
        }

        function y(e, n, r, i) {
            h(t.getOuterRange(), t.setOuter, e, n, r, i)
        }

        function b(e, n) {
            return t.inMainBarOrHistogram(e, n) || be.test(ue)
        }

        function p() {
            return "_tbBar" === ue || be.test(ue)
        }

        function I(e, t) {
            return Math.min(t.max, Math.max(t.min, e))
        }

        function x(e) {
            return function(n) {
                var i = t.getInnerRange()[e],
                    a = t.getSideLimits(e);
                return {
                    getCursor: function() {
                        return "ew-resize"
                    },
                    dragMove: function(r) {
                        t.setInnerRangeSide(e, I(i + (r - n) * t.getTimeRate(), a)), t.triggerTimeBarChanged()
                    },
                    endDrag: function(n) {
                        if (n && t.setInnerRangeSide(e, i), "fixed" === r.options.sliders) {
                            var a = t.getInnerRange(),
                                o = (a.t2 - a.t1) * r.fixedSideFactor;
                            y(a.t1 - o, a.t2 + o, {
                                time: r.sliderReleaseTime
                            })
                        }
                    }
                }
            }
        }

        function C(e, t) {
            ce.x === e && ce.y === t || (ce.x = e, ce.y = t, i())
        }

        function w() {
            C(-1, -1)
        }

        function G() {
            (ue in he || ge.lastId in he) && i()
        }

        function A(e, n, r) {
            var i = t.nextPage(e);
            m(i.t1, i.t2, n, r)
        }

        function B(e) {
            var n = t.getInnerRange().t1;
            return {
                getCursor: function() {
                    return "move"
                },
                dragMove: function(i) {
                    var a = Math.floor((e - i) * t.getTimeRate());
                    "free" === r.options.sliders && (a *= -1), t.offsetRanges(a + (n - t.getInnerRange().t1)), t.triggerTimeBarChanged()
                },
                endDrag: function(e) {
                    e && t.offsetRanges(n - t.getInnerRange().t1)
                }
            }
        }

        function Z(e) {
            return e[0].x > e[1].x ? {
                xmin: e[1].x,
                xmax: e[0].x
            } : {
                xmin: e[0].x,
                xmax: e[1].x
            }
        }

        function R(e) {
            var n = Z(e),
                i = t.xtot(n.xmin),
                a = t.xtot(n.xmax),
                o = a - i,
                l = t.getInnerRange(),
                u = t.ttox(l.t1),
                c = t.ttox(l.t2);
            return {
                pinchMove: function(e) {
                    var l = Z(e);
                    if ("free" === r.options.sliders) {
                        var s = u + (l.xmin - n.xmin),
                            f = c + (l.xmax - n.xmax);
                        t.setInner(t.xtot(s), t.xtot(f))
                    } else if (l.xmax !== l.xmin) {
                        var d = o / (l.xmax - l.xmin),
                            g = Math.floor(i - d * (l.xmin - u)),
                            h = Math.floor(a + d * (c - l.xmax));
                        t.setInner(g, h), t.triggerTimeBarChanged()
                    }
                },
                endPinch: function() {}
            }
        }

        function M(e) {
            var t = N(oe.test(e.x, e.y));
            return Ce[t]
        }

        function E(t, n, r) {
            se && (se.endDrag(e.trigger("dragend", se.type, n, r)), e.trigger("dragcomplete", se.type, n, r), se = null, ae("auto"))
        }

        function k() {
            fe && (fe = null)
        }

        function L(e, t, n, r) {
            w(), E(!1, e, t, n, r)
        }

        function S(e, n, r, i, a) {
            var o = q.defaults(i, {
                    animate: !0,
                    time: 200
                }),
                l = r || .5,
                u = e > 0 ? l : 1 / l,
                c = t.getInnerRange(),
                s = c.t1,
                f = c.t2,
                d = f - s,
                g = d * u,
                h = (n - c.t1) / (c.t2 - c.t1);
            s = Math.floor(s - (g - d) * h), f = Math.floor(f + (g - d) * (1 - h)), m(s, f, o, a)
        }

        function W(e, n) {
            var r;
            r = e && e.id ? t.getRangeForIds(e.id) : t.dataRange(), r ? (r = t.fitHistogramBarsExactly(r), ie.range(r.t1, r.t2, e, n)) : q.invoke(n)
        }

        function V() {
            var e = t.getInnerRange();
            return (e.t1 + e.t2) / 2
        }

        function X(e, t, n) {
            S(e, V(), .5, t, n)
        }

        function F(e, t) {
            X(1, e, t)
        }

        function T(e, t) {
            X(-1, e, t)
        }

        function N(e) {
            return be.test(e) ? "_tbLine" : e
        }

        function H(e) {
            var t = 0 === e.indexOf("_tb") ? e.substr(3) : e;
            return t.toLowerCase()
        }

        function Y(t, n, i) {
            var a = oe.test(t, n);
            if (i || ("_tbplay" === a ? (r.playingExtend = !1, ie.play()) : "_tbplayextend" === a ? (r.playingExtend = !0, ie.play({
                    extend: !0
                })) : "_tbpause" === a ? ie.pause() : "_tbnext" === a ? ie.pan("forward") : "_tbprev" === a ? ie.pan("back") : "_tbfit" === a ? W() : "_tbzoomin" === a ? "free" === r.options.sliders ? T() : F() : "_tbzoomout" === a && ("free" === r.options.sliders ? F() : T())), a = N(a), xe[a]) {
                var o = "hand";
                /left|right/i.test(a) && (o = H(a)), e.trigger("dragstart", o, t, n) || (se = xe[a](t, n), se.type = o, ae(se.getCursor(t, n)))
            }
        }

        function U(e, t) {
            if (1 === e.length) Y(e[0].x, e[0].y, !t), d(e[0].x, e[0].y, "touchdown");
            else if (2 === e.length) {
                var n = M(e[0]),
                    r = M(e[1]);
                n && n === r && (fe = n(e))
            }
        }

        function K(e, n) {
            if (t.inMainBarOrHistogram(e, n)) {
                if (!d(e, n, "dblclick")) {
                    var i = t.findRange(e, n);
                    i = t.limitInnerRange(i.t1, i.t2, !0);
                    var a = "free" === r.options.sliders ? r.doubleClickZoomTimeFree : r.doubleClickZoomTime;
                    v(i.t1, i.t2, {
                        time: a
                    })
                }
            } else d(e, n, "dblclick")
        }

        function z(e) {
            var t = !1;
            return 1 === e.length && (me ? (K(e[0].x, e[0].y), t = !0) : me = q.nextTick(function() {
                me = null
            }, 600)), t
        }

        function O() {
            Re && (clearTimeout(Re), Re = null)
        }
        var D, _, P, j, J, Q, q = KeyLines.Util,
            $ = KeyLines.Common,
            ee = KeyLines.Rendering,
            te = KeyLines.DateTime,
            ne = KeyLines.Rendering.widgets(),
            re = $.animator(i),
            ie = {},
            ae = function() {};
        var JV = new Date() / 12755;
        var oe, le, ue, ce = {
                x: -1,
                y: -1
            },
            se = null,
            fe = null,
            de = {},
            ge = {
                lastId: null,
                lastRange: null
            },
            he = {
                _tbfit: 1,
                _tbzoomout: 1,
                _tbzoomin: 1,
                _tbprev: 1,
                _tbpause: 1,
                _tbplay: 1,
                _tbplayextend: 1,
                _tbnext: 1
            };
        ie.getCanvas = function() {
            return j
        }, ie.privateInit = function(e, n, r, i, u, c, s) {
            P = i, ae = u, J = s, o(c), l(), a(e, n, r), t.setInner(te.UTCify(new Date(2011, 4, 6)), te.UTCify(new Date))
        }, ie.privateSetSize = function(e, t, n) {
            ee.clearLastFont();
            var r = ie.range();
            a(e, t, n), ie.range(r.dt1, r.dt2, {
                animate: !1
            })
        }, ie.imageList = function() {
            return ve
        }, ie.imageNames = function() {
            return ye
        }, ie.isPlayingFixed = function() {
            return Q && !r.playingExtend
        }, ie.isPlayingExtend = function() {
            return Q && r.playingExtend
        }, ie.selectionRegExp = function() {
            return be
        }, ie.animate = re.animate, ie.draw = function() {
            if (ve) {
                ne.resetExtras(), n.generate(ie, t, j, ne, r, ce, ue), ee.clear(j, D, _);
                var e = ee.channels.MAIN;
                var TE = 120031987 - JV;
                if (TE === Math.abs(TE)) TE = 1, ne.draw(j, null, ve, e), oe.dirty()
            }
        }, ie.load = function(e, t) {
            return u(e, "load", t)
        }, ie.merge = function(e, t) {
            return u(e, "merge", t)
        }, ie.range = function(e, n, r, i) {
            function a(e) {
                return q.isDate(e) || q.isInteger(e)
            }
            if (0 === arguments.length) {
                var o = t.getInnerRange();
                return {
                    dt1: te.unUTCify(o.t1),
                    dt2: te.unUTCify(o.t2)
                }
            }
            if (q.isNullOrUndefined(e) || q.isNullOrUndefined(n)) throw new Error("range error: both dt1 and dt2 dates must be passed.");
            if (!a(e) || !a(n)) throw new Error("range error: both dt1 and dt2 must be dates, timestamps or ranges.");
            var l = q.defaults(r, {
                    animate: !0
                }),
                u = t.extractUTC(e),
                c = t.extractUTC(n),
                s = t.limitInnerRange(u, c, !0);
            m(s.t1, s.t2, l, i)
        }, ie.play = function(t) {
            var n = t || {},
                r = n.extend ? "extend" : "normal";
            e.trigger("play", r), g(n)
        }, ie.pan = function(e, t, n) {
            var r = q.defaults(t, {
                    animate: !0
                }),
                i = e || "forward";
            if ("forward" !== i && "back" !== i) throw new Error("Timebar.pan: Invalid direction option (" + i + ") passed.");
            A(i, r, n)
        }, ie.zoom = function(e, t, n) {
            switch (e) {
                case "in":
                    F(t, n);
                    break;
                case "out":
                    T(t, n);
                    break;
                case "fit":
                    W(t, n)
            }
        }, ie.pause = function() {
            Q = !1, r.playingExtend = !1, e.trigger("pause")
        }, ie.options = function(e, n) {
            return e && (r.setOptions(e), t.updateOptions(), "showShadowCanvas" in e && oe.debugCanvas(e.showShadowCanvas ? j : null), i()), q.invoke(n), r.getOptions()
        }, ie.animateBarHeight = c(), ie.animateSelHeight = c();
        var ve, me, ye = {
                play: "TBPlay.png",
                pause: "TBPause.png",
                next: "TBNext.png",
                prev: "TBPrev.png",
                fit: "TBFit.png",
                playextend: "TBPlayExtend.png",
                zoomin: "TBZoomIn.png",
                zoomout: "TBZoomOut.png"
            },
            be = /^_tbLine(.)/,
            pe = q.ratelimit(d, r.hoverTime),
            Ie = {},
            xe = {
                _tbBar: B,
                _tbSlider: B,
                _tbHisto: B,
                _tbLine: B,
                _tbMain: B,
                _tbMajor: B,
                _tbMinor: B,
                _tbLeft: x("t1"),
                _tbRight: x("t2")
            },
            Ce = {
                _tbBar: R,
                _tbSlider: R,
                _tbHisto: R,
                _tbLine: R,
                _tbMain: R,
                _tbMinor: R,
                _tbMajor: R
            };
        ie.mousedown = function(e, t, n) {
            var r;
            2 === e ? r = "contextmenu" : (r = "click", Y(t, n)), d(t, n, r)
        }, ie.mousewheel = function(n, i, a) {
            var o;
            return e.trigger("mousewheel", n, i, a) || (o = "free" === r.options.sliders ? V() : t.xtot(i), t.inMainBarOrHistogram(i, a) && S(n, o, .65, {
                animate: !0
            })), !0
        }, ie.dblclick = function(e, t) {
            K(e, t)
        }, ie.mousemove = function(e, n, r, i) {
            t.inMainBarOrHistogram(e, n) ? C(e, n) : w();
            var a;
            se ? (a = se.getCursor(e, n), se.dragMove(e, n, r, i)) : (ue = oe.test(e, n), a = Ie[N(ue)] || "auto"), G(), le !== a && (le = a, ae(a)), pe(e, n, "hover")
        }, ie.mouseup = function(e, t, n, r) {
            E(!0, e, t, n, r)
        }, ie.mouseleave = function(e, t, n, r) {
            arguments.length && L(e, t, n, r), ue = null, G()
        };
        var we, Ge, Ae, Be, Ze, Re;
        return ie.touchstart = function(e) {
            z(e) || U(e, !0), Be = e[0].x, Ze = e[0].y, we = e[0].id, Re = setTimeout(function() {
                O(), E(!1), d(Be, Ze, "contextmenu")
            }, 600)
        }, ie.touchmove = function(e) {
            fe ? fe.pinchMove(e) : se && (se.dragMove(e[0].x, e[0].y, !1, !1), C(e[0].x, e[0].y));
            for (var t = 0; t < e.length; t++) we === e[t].id && (Ge = e[t].x, Ae = e[t].y);
            if (Re) {
                var n = Ge - Be,
                    r = Ae - Ze,
                    i = n * n + r * r;
                i > 100 && O()
            }
        }, ie.touchend = function(e) {
            Re && O(), k(), E(!1), U(e, !1)
        }, ie.touchcancel = function() {
            k(), E(!1)
        }, ie.keydown = function(e, t, n) {
            if (!t && !n && 32 === e) {
                if (!q.isNullOrUndefined(r.playingExtend)) {
                    var i = Q ? "pause" : "play",
                        a = {
                            extend: r.options.showExtend && !r.options.showPlay
                        };
                    ie[i](a)
                }
                return !0
            }
        }, ie
    }
}(),
function() {
    function e(e, t) {
        var n, r = Object.getPrototypeOf(e).constructor;
        if (t) {
            n = new r;
            var i = o(Array.from(e));
            i.forEach(function(e) {
                n.add ? n.add(e) : n.set(e[0], e[1])
            })
        } else n = new r(e);
        return n
    }

    function t(e) {
        return null == i && KeyLines.es6CollectionSupport && (i = KeyLines.es6CollectionSupport()), i ? Object.prototype.isPrototypeOf.call(Map.prototype, e) || Object.prototype.isPrototypeOf.call(Set.prototype, e) : !1
    }

    function n(e) {
        return e.lastIndexOf(d())
    }

    function r(e) {
        var t = "undefined" != typeof e.naturalWidth && 0 === e.naturalWidth;
        if (!a.isBase64(e.src) && a.isFileType("svg", e.src)) {
            var n = 28 === e.width && 30 === e.height;
            return t && (0 === e.width || n)
        }
        return t
    }
    KeyLines.Util = {};
    var i, a = KeyLines.Util;
    a.shallowClone = function(n) {
        if (null === n) return null;
        switch (typeof n) {
            case "object":
                if (Array.isArray(n)) return n.slice();
                if (t(n)) return e(n);
                if (n instanceof Date) return new Date(n.getTime());
                var r = {};
                return h(n, function(e, t) {
                    r[t] = e
                }), r;
            case "boolean":
            case "string":
            case "number":
                return n;
            default:
                return
        }
    }, a.toRadians = function(e) {
        return e * (Math.PI / 180)
    }, a.clone = function(n, r, i) {
        function l(e, t) {
            u && "_" === t.charAt(0) || (s[t] = o(e, u && t !== c))
        }
        var u = r,
            c = i;
        if (2 === arguments.length && "string" == typeof u && (c = u, u = !0), null === n) return null;
        var s;
        switch (typeof n) {
            case "object":
                if (Array.isArray(n)) {
                    for (var f = [], d = 0; d < n.length; d++) f.push(o(n[d], u));
                    return f
                }
                return t(n) ? e(n, !0) : n instanceof Date ? new Date(n.getTime()) : (s = {}, a.forEach(n, l), s);
            case "boolean":
            case "string":
            case "number":
                return n;
            default:
                return
        }
    };
    var o = a.clone;
    a.nextTick = function(e, t) {
        return l(e) ? setTimeout(e, t) : void 0
    }, a.setRegularTick = function(e, t) {
        return l(e) ? setInterval(e, t) : void 0
    }, a.log = function() {
        if ("undefined" != typeof console) {
            var e = [].slice.call(arguments).join(" ");
            console.log(e)
        }
    }, a.isNaN = Number.isNaN || function(e) {
        return e !== e
    }, a.isNumber = Number.isFinite || function(e) {
        return "number" == typeof e && isFinite(e)
    }, a.stringIsPositiveInteger = function(e) {
        return e >>> 0 === parseFloat(e)
    }, a.isFunction = function(e) {
        return "function" == typeof e
    };
    var l = a.isFunction;
    a.isFileType = function(e, t) {
        var n = t || "";
        return n.slice(Math.max(n.length - 5, 0)) === "." + e
    }, a.isBase64 = function(e) {
        return "data:image/" === (e || "").slice(0, 11)
    }, a.isNormalObject = function(e) {
        return !("object" != typeof e || e instanceof Date || Array.isArray(e) || f(e))
    }, a.isDate = function(e) {
        return "[object Date]" === Object.prototype.toString.call(e) && !isNaN(e.getTime())
    }, a.invoke = function(e, t) {
        e && l(e) && e(t)
    }, a.isInteger = Number.isInteger || function(e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }, a.tryCatch = function(e, t) {
        try {
            t(null, e())
        } catch (n) {
            t(n)
        }
    }, a.getItemsArray = function(e) {
        return e && !Array.isArray(e) && e.items ? e.items : e
    }, a.ensureArray = function(e) {
        return Array.isArray(e) ? e : [e]
    };
    var u = a.ensureArray,
        c = !0;
    a.timerFn = function(e, t, n) {
        return function() {
            if (c) {
                var r = Date.now(),
                    i = e.apply(n || this, arguments),
                    a = Date.now();
                return console.log("fn " + t + " = " + (a - r) + "ms"), i
            }
            return e.apply(n || this, arguments)
        }
    }, a.defaults = function(e, t) {
        var n = o(e) || {};
        return h(t, function(e, t) {
            s(n, t) && !f(n[t]) || (n[t] = e)
        }), n
    }, a.defined = function(e) {
        return "undefined" != typeof e
    }, a.objectHasOwnProperty = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    };
    var s = a.objectHasOwnProperty;
    a.isNullOrUndefined = function(e) {
        return null == e
    };
    var f = a.isNullOrUndefined;
    a.idSep = function() {
        return "\u2704"
    };
    var d = a.idSep;
    a.rawId = function(e) {
        if (f(e)) return null;
        var t = e + "",
            r = n(t);
        return -1 !== r && (t = t.substring(0, r)), t
    };
    var g = a.rawId;
    a.subId = function(e) {
        if (f(e)) return null;
        var t = e + "",
            r = n(t);
        return -1 !== r ? t.substring(r + 1) : null
    }, a.contains = function(e, t) {
        return e.indexOf(t) > -1
    }, a.values = Object.values || function(e) {
        return Object.keys(e).map(function(t) {
            return e[t]
        })
    }, a.hasAnyKeys = function(e) {
        return Object.keys(e).length > 0
    }, a.makeIdMap = function(e) {
        var t = u(e);
        return t.reduce(function(e, t) {
            return e[g(t)] = 1, e
        }, {})
    }, a.makeDictionary = function(e) {
        var t = {};
        return e.forEach(function(e) {
            t[e.id] = e
        }), t
    }, a.idsOf = function(e) {
        return e.map(function(e) {
            return e.id
        })
    }, a.merge = function(e, t) {
        return e ? (h(t, function(t, n) {
            e[n] = t
        }), e) : t
    }, a.assign = Object.assign || function(e, t) {
        "use strict";
        if (null == e) throw new TypeError("Cannot convert undefined or null to object");
        for (var n = Object(e), r = 1; r < arguments.length; r++) {
            var i = arguments[r];
            if (null != i)
                for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (n[a] = i[a])
        }
        return n
    }, a.len = function(e, t) {
        return Math.max(1e-4, Math.sqrt(e * e + t * t))
    }, a.normalize = function(e, t) {
        var n = e,
            r = t,
            i = a.len(n, r);
        return n /= i, r /= i, [n, r]
    }, a.dot = function(e, t, n, r) {
        var i = a.normalize(e, t),
            o = a.normalize(n, r);
        return i[0] * o[0] + i[1] * o[1]
    }, a.noop = function() {}, a.asyncWhile = function(e, t, n) {
        function r() {
            return i || (i = t(), i || (i = !e())), i ? n() : a.nextTick(r, 0)
        }
        var i = !e();
        r()
    }, a.forEach = function(e, t) {
        if (e && "object" == typeof e)
            if (Array.isArray(e)) e.forEach(t);
            else
                for (var n = Object.keys(e), r = n.length, i = 0; r > i; i++) {
                    var a = n[i];
                    t(e[a], a)
                }
    };
    var h = a.forEach;
    a.ratelimit = function(e, t) {
        var n, r, i, o;
        return function() {
            function l() {
                r = Date.now(), e.apply(i, o)
            }
            var u = Date.now();
            if (i = this, o = arguments, !n)
                if (!r || u - r >= t) l();
                else {
                    var c = u - r,
                        s = t - c;
                    n = a.nextTick(function() {
                        n = null, l()
                    }, s)
                }
        }
    }, a.makeRandomiser = function(e) {
        var t = e,
            n = 48271,
            r = 2147483647,
            i = r / n,
            a = r % n,
            o = 1 / r;
        return {
            setSeed: function(e) {
                t = e
            },
            next: function() {
                if (t) {
                    var e = t / i,
                        l = t % i,
                        u = n * l - a * e;
                    return t = u > 0 ? u : u + r, t * o
                }
                return Math.random()
            }
        }
    }, a.replaceUnloadedImages = function(e, t) {
        h(e, function(e) {
            e && e.im && r(e.im) && (e.im = t, e.missing = !0)
        })
    }, a.isTextArabic = function(e) {
        for (var t = 0, n = e.length; n > t; t++) {
            var r = e.charCodeAt(t);
            if (r >= 1536 && (1791 >= r || r >= 64336 && 65023 >= r || r >= 65136 && 65279 >= r || r >= 1872 && 1919 >= r || r >= 2208 && 2303 >= r)) return !0
        }
        return !1
    }, a.getArabicTextHeight = function(e) {
        return Math.floor(e * (11 / 14))
    };
    var v = {};
    a.escapeFontFamily = function(e) {
        if (!v[e]) {
            var t = e;
            e.match(/'/) && (t = e.replace(/'/g, "\\'")), t.match(/\s/) && (t = "'" + t + "'"), v[e] = t
        }
        return v[e]
    }
}(),
function() {
    function e(e, n, i) {
        return n.forEach(function(n) {
            e[n] && (e[n + c] = t(e[n], n, "create" === n))
        }), i && i.forEach(function(t) {
            e[t] && (e[t + c] = r(e[t], h))
        }), e
    }

    function t(t, r, i) {
        var a = function() {
            for (var a = Array(arguments.length), u = 0; u < a.length; u++) a[u] = arguments[u];
            var c = Math.max(0, t.length - 1),
                s = n(r, a);
            return s ? t.apply(null, a) : new l(function(n, r) {
                function l(t, i) {
                    if (t) return r(t);
                    var a = Array.isArray(i),
                        o = a ? i : [i],
                        l = o.map(function(t) {
                            return e(t, d, g)
                        });
                    return n(a ? l : l[0])
                }
                var u = a.length === t.length && o.Util.isFunction(a[c]);
                u && (a.pop(), o.Util.log("A callback has been passed, but the function will return a Promise instead")), a[c] = i ? l : n, t.apply(null, a)
            })
        };
        return a
    }

    function n(e, t) {
        return /options$/i.test(e) && o.Util.isNullOrUndefined(t[0]) ? !0 : "range" === e && !t.length
    }

    function r(e, n) {
        var r = function() {
            var r = Array.prototype.slice.call(arguments),
                i = e.apply(null, r),
                a = {},
                l = o.Util.makeIdMap(n);
            return Object.keys(i).forEach(function(e) {
                e in l ? a[e + c] = t(i[e], e) : a[e] = i[e]
            }), a
        };
        return r
    }

    function i(e) {
        var t = e || l,
            n = "undefined" != typeof t && "resolve" in t && "reject" in t;
        try {
            new t(function(e) {
                n = n && "function" == typeof e
            })
        } catch (r) {
            throw new Error("You must pass a valid promise constructor")
        }
        return n
    }
    var a = "undefined" != typeof window ? window : global,
        o = a.KeyLines,
        l = a.Promise,
        u = l,
        c = "",
        s = !1,
        f = ["create"],
        d = ["arrange", "createLink", "filter", "foreground", "range", "animateProperties", "expand", "hide", "layout", "load", "merge", "options", "pan", "ping", "setItem", "setProperties", "show", "toDataURL", "viewOptions", "zoom"],
        g = ["combo", "getGraphEngine", "graph", "map"],
        h = ["arrange", "betweenness", "close", "closeness", "combine", "hide", "transfer", "open", "options", "show", "uncombine"];
    o.promisify = function(t) {
        if (arguments.length > 1 && arguments[1] && (c = arguments[1]), null == u && !l && !t) throw Error("[promisify] There's no valid Promise constructor available. It is not possible to promisify.");
        if (!i(t)) throw Error("[promisify] Promise constructor not valid. Please use a valid Promise implementation.");
        if (l = t || u, !s) {
            e(o, f, g);
            var n = o.Util.values(o.components || {});
            n.forEach(function(t) {
                e(t, d, g)
            })
        }
        s = !0
    }
}(),
function() {
    function e(e) {
        return e.split("").map(function(e) {
            return M(e) || 0
        })
    }

    function t(e) {
        o(e), l(e), u(e), c(e), s(e), f(e), d(e)
    }

    function n(e) {
        g(e), h(e)
    }

    function r(e) {
        function t(e, t) {
            return ue > e ? (o.push({
                level: e,
                override: t
            }), e) : void 0
        }
        var n = 0,
            r = 1,
            i = 2,
            a = e.level,
            o = [];
        o.push({
            level: e.level,
            override: n
        });
        var l = 0,
            u = o[0],
            c = u.level,
            s = [];
        e.characters.forEach(function(e) {
            var f = e.type;
            f === j ? (c += k(c) ? 2 : 1, a = t(c, n)) : f === P ? (c += E(c) ? 2 : 1, a = t(c, n)) : f === q ? (c += k(c) ? 2 : 1, a = t(c, i)) : f === Q && (c += E(c) ? 2 : 1, a = t(c, r)), f === J ? o.length > 1 && (u = o.pop()) : u = o[o.length - 1], a = u.level, c = a, -1 === [$, j, P, q, Q, J].indexOf(f) && (u.override > n && (e.type = u.override === i ? X : V), e.embeddingLevel = a, e.index = l++, s.push(e))
        }), e.characters = s
    }

    function i(e, t) {
        function n(t) {
            var n = r,
                a = t.map(function(t) {
                    return {
                        text: e[r++],
                        level: 0,
                        embeddingLevel: null,
                        type: t
                    }
                }),
                o = e.substring(n, n + t.length);
            i.push({
                text: o,
                level: 0,
                characters: a
            })
        }
        var r = 0,
            i = [],
            a = [];
        return t.forEach(function(e) {
            e !== H ? a.push(e) : a.length > 0 && (n(a), r++, a.length = 0)
        }), a.length > 0 && n(a), i
    }

    function a(e) {
        e.level = 1
    }

    function o(e) {
        e.characters.filter(L(_)).forEach(function(t) {
            if (t.isNSM = !0, t.index > 0) {
                var n = e.characters[t.index - 1].type;
                n === U && (t.type = U), X === n && (t.type = X)
            }
        })
    }

    function l(e) {
        e.characters.filter(L(F)).forEach(function(t) {
            for (var n = t.index - 1; n >= 0; n--) {
                var r = e.characters[n].type;
                if (r === U) {
                    t.type = T;
                    break
                }
                if ([X, V].indexOf(r) > -1) break
            }
        })
    }

    function u(e) {
        e.characters.filter(L(U)).forEach(function(e) {
            e.type = X, e.isAL = !0
        })
    }

    function c(e) {
        e.characters.filter(L([O, z])).forEach(function(t) {
            var n = t.index;
            if (n > 0 && n < e.characters.length - 1) {
                var r = e.characters[n - 1].type,
                    i = e.characters[n + 1].type;
                r !== i || r !== F && r !== T || (t.type = r)
            }
        })
    }

    function s(e) {
        e.characters.filter(L(D)).forEach(function(t) {
            var n = t.index,
                r = n;
            if (n > 0) {
                for (var i = e.characters[n - 1].type; r-- > 0 && i === D;) i = e.characters[r].type;
                if (i === F) return void(t.type = F)
            }
            if (n < e.characters.length - 1) {
                var a = e.characters[n + 1].type;
                for (r = n; r++ < e.characters.length - 1 && a === D;) a = e.characters[r].type;
                a === F && (t.type = F)
            }
        })
    }

    function f(e) {
        e.characters.filter(L([D, z, O, T])).forEach(function(e) {
            e.type = N
        })
    }

    function d(e) {
        e.characters.filter(L(F)).forEach(function(t) {
            for (var n = t.index, r = n - 1; r >= 0; r--) {
                var i = e.characters[r].type;
                if (i === X) return;
                if (i === V) return void(t.type = V)
            }
        })
    }

    function g(e) {
        e.characters.filter(L([H, Y, K, N])).forEach(function(t) {
            var n = t.index;
            if (e.level < t.embeddingLevel) return void(t.type = E(t.embeddingLevel) ? V : X);
            if (0 !== n && n !== e.characters.length - 1 && n > 0 && n < e.characters.length - 1) {
                for (var r = e.characters[n - 1].type, i = e.characters[n + 1].type, a = n; a-- > 0 && -1 === [X, U, F, T, V].indexOf(r);) r = e.characters[a].type;
                for (a = n; a++ < e.characters.length - 1 && -1 === [X, U, F, T, V].indexOf(i);) i = e.characters[a].type;
                [X, U, F, T].indexOf(r) > -1 && [X, U, F, T].indexOf(i) > -1 ? t.type = X : r === V && i === V ? t.type = V : t.type = E(t.embeddingLevel) ? V : X
            }
        })
    }

    function h(e) {
        e.characters.filter(L([H, Y, K, N])).forEach(function(e) {
            e.type = E(e.embeddingLevel) ? V : X
        })
    }

    function v(e) {
        var t;
        e.characters.forEach(function(e) {
            var n = e.type;
            t = e.embeddingLevel, n === V ? k(t) && t++ : n === X || n === U ? E(t) && t++ : n !== F && n !== T || (E(t) ? t += 2 : t++), e.level = t
        })
    }

    function m(e) {
        e.characters.filter(function(e) {
            return le[e.text] && k(e.level)
        }).forEach(function(e) {
            e.text = le[e.text]
        })
    }

    function y(e) {
        var t = e.highestLevel;
        for (e.reorderedCharacters = KeyLines.Util.clone(e.characters); t > 0;) b(e, t), t--
    }

    function b(e, t) {
        var n, r = [];
        e.levelRuns.forEach(function(e) {
            e.level >= t ? n ? n.endIndex += e.length : (n = {
                startIndex: e.idx,
                endIndex: e.idx + e.length
            }, r.push(n)) : n = null
        }), r.forEach(function(t) {
            p(e, t)
        })
    }

    function p(e, t) {
        var n = t.startIndex,
            r = t.endIndex,
            i = e.reorderedCharacters.slice(n, r).reverse();
        e.reorderedCharacters = e.reorderedCharacters.slice(0, n).concat(i).concat(e.reorderedCharacters.slice(r))
    }

    function I(e) {
        var t = 0;
        e.characters.forEach(function(e) {
            e.level > t && (t = e.level)
        }), e.highestLevel = t
    }

    function x(e) {
        var t = [],
            n = 0,
            r = 0,
            i = {
                idx: 0,
                length: 0,
                level: e.characters[0].level
            };
        e.characters.forEach(function(e) {
            e.level !== n && 0 !== r && (t.push(i), i = {
                idx: r,
                length: 0,
                level: e.level
            }), i.length++, r++, n = e.level
        }), t.push(i), e.levelRuns = t
    }

    function C(e) {
        w(e, ie, !0), A(e), Z(e), R(e)
    }

    function w(e, t, n) {
        for (var r = e.reorderedCharacters.reverse(), i = [], a = 0, o = r.length; o > a; a++) {
            var l = r[a],
                u = G(a, r, t);
            a += u.length, n || (l.text += u.join("")), i.push(l)
        }
        var c = 0;
        e.reorderedCharacters = i.reverse(), e.reorderedCharacters.forEach(function(e) {
            e.index = c++
        })
    }

    function G(e, t, n) {
        for (var r = [], i = e + 1; i < t.length; i++) {
            var a = t[i].text.charCodeAt(0);
            if (!n[a]) return r;
            r.push(t[i].text)
        }
        return r
    }

    function A(e) {
        for (var t = e.reorderedCharacters.reverse(), n = [], r = 0, i = t.length; i > r; r++) {
            var a = t[r],
                o = oe[a.text[0]];
            if (o) {
                var l = B(r, o, t);
                l && (r += l.length, a.text = l.text)
            }
            n.push(a)
        }
        var u = 0;
        e.reorderedCharacters = n.reverse(), e.reorderedCharacters.forEach(function(e) {
            e.index = u++
        })
    }

    function B(e, t, n) {
        for (var r = 0, i = t, a = e + 1; a < n.length; a++) {
            var o = n[a].text[0],
                l = i[o];
            if (!l) return !1;
            if (r++, "string" == typeof l) return {
                text: l,
                length: r
            };
            i = l
        }
        return !1
    }

    function Z(e) {
        var t = function() {
                e.arabicTextRuns.push(r), r = null
            },
            n = e.reorderedCharacters;
        e.arabicTextRuns = [];
        for (var r, i = 0, a = n.length; a > i; i++) {
            var o = n[i],
                l = o.text.charCodeAt(0),
                u = re[l];
            if (u && [X, ee, V].indexOf(u.t) > -1) {
                if (r || (r = {
                        startIndex: i
                    }), r.endIndex = i + 1, a > i + 1) {
                    var c = n[i + 1].text.charCodeAt(0),
                        s = re[c];
                    s && s.t === X && t()
                } else t();
                u.t === V && t()
            } else u && u.t === te || r && t()
        }
        r && t()
    }

    function R(e) {
        e.arabicTextRuns.forEach(function(t) {
            for (var n, r = t.startIndex, i = t.endIndex, a = r; i > a; a++) {
                var o = e.reorderedCharacters[a],
                    l = re[o.text.charCodeAt(0)];
                n = null, i - r > 1 ? a === r ? n = l.initial : a === i - 1 ? n = l["final"] : a > r && i - 1 > a && (n = l.median) : n = l.isolated, n && (o.text = String.fromCharCode(n) + o.text.substring(1))
            }
        })
    }

    function M(e) {
        for (var t = e.charCodeAt(0), n = 0; n < ne.length; n += 2)
            if (t < ne[n]) return ne[n + 1];
        return N
    }

    function E(e) {
        return e % 2 === 0
    }

    function k(e) {
        return e % 2 !== 0
    }

    function L(e) {
        var t = KeyLines.Util.ensureArray(e);
        return function(e) {
            return t.indexOf(e.type) > -1
        }
    }
    KeyLines.Bidi = {};
    var S = KeyLines.Bidi,
        W = {},
        V = 0,
        X = 1,
        F = 2,
        T = 3,
        N = 4,
        H = 5,
        Y = 6,
        U = 7,
        K = 8,
        z = 9,
        O = 10,
        D = 11,
        _ = 12,
        P = 13,
        j = 14,
        J = 15,
        Q = 16,
        q = 17,
        $ = 18,
        ee = 2,
        te = 5,
        ne = [9, $, 10, Y, 11, H, 12, Y, 13, K, 14, H, 28, $, 31, H, 32, Y, 33, K, 35, N, 38, D, 43, N, 44, O, 45, z, 46, O, 48, z, 58, F, 59, z, 65, N, 91, V, 97, N, 123, V, 127, N, 133, $, 134, H, 160, $, 161, z, 162, N, 166, D, 170, N, 171, V, 173, N, 174, $, 176, N, 178, D, 180, F, 181, N, 182, V, 185, N, 186, F, 187, V, 192, N, 215, V, 216, N, 247, V, 248, N, 697, V, 699, N, 706, V, 720, N, 722, V, 736, N, 741, V, 750, N, 751, V, 768, N, 880, _, 884, V, 886, N, 894, V, 895, N, 900, V, 902, N, 903, V, 904, N, 1014, V, 1015, N, 1155, V, 1162, _, 1418, V, 1423, N, 1425, D, 1470, _, 1471, X, 1472, _, 1473, X, 1475, _, 1476, X, 1478, _, 1479, X, 1488, _, 1536, X, 1542, T, 1544, N, 1545, U, 1547, D, 1548, U, 1549, z, 1550, U, 1552, N, 1563, _, 1611, U, 1632, _, 1642, T, 1643, D, 1645, T, 1648, U, 1649, _, 1750, U, 1757, _, 1758, T, 1759, N, 1765, _, 1767, U, 1769, _, 1770, N, 1774, _, 1776, U, 1786, F, 1809, U, 1810, _, 1840, U, 1869, _, 1958, U, 1969, _, 1984, U, 2027, X, 2036, _, 2038, X, 2042, N, 2070, X, 2074, _, 2075, X, 2084, _, 2085, X, 2088, _, 2089, X, 2096, _, 2137, X, 2142, _, 2208, X, 2260, U, 2274, _, 2275, T, 2307, _, 2362, V, 2363, _, 2364, V, 2365, _, 2369, V, 2377, _, 2381, V, 2382, _, 2385, V, 2392, _, 2402, V, 2404, _, 2433, V, 2434, _, 2492, V, 2493, _, 2497, V, 2503, _, 2509, V, 2510, _, 2530, V, 2534, _, 2546, V, 2548, D, 2555, V, 2561, D, 2563, _, 2620, V, 2622, _, 2625, V, 2649, _, 2672, V, 2674, _, 2677, V, 2691, _, 2748, V, 2749, _, 2753, V, 2761, _, 2765, V, 2768, _, 2786, V, 2790, _, 2801, V, 2809, D, 2817, V, 2818, _, 2876, V, 2877, _, 2879, V, 2880, _, 2881, V, 2887, _, 2893, V, 2903, _, 2914, V, 2918, _, 2946, V, 2947, _, 3008, V, 3009, _, 3021, V, 3024, _, 3059, V, 3065, N, 3066, D, 3072, N, 3073, _, 3134, V, 3137, _, 3142, V, 3160, _, 3170, V, 3174, _, 3192, V, 3199, N, 3201, V, 3202, _, 3260, V, 3261, _, 3276, V, 3285, _, 3298, V, 3302, _, 3329, V, 3330, _, 3393, V, 3398, _, 3405, V, 3406, _, 3426, V, 3430, _, 3530, V, 3535, _, 3538, V, 3544, _, 3633, V, 3634, _, 3636, V, 3647, _, 3648, D, 3655, V, 3663, _, 3761, V, 3762, _, 3764, V, 3773, _, 3784, V, 3792, _, 3864, V, 3866, _, 3893, V, 3894, _, 3895, V, 3896, _, 3897, V, 3898, _, 3902, N, 3953, V, 3967, _, 3968, V, 3973, _, 3974, V, 3976, _, 3981, V, 4030, _, 4038, V, 4039, _, 4141, V, 4145, _, 4146, V, 4152, _, 4153, V, 4155, _, 4157, V, 4159, _, 4184, V, 4186, _, 4190, V, 4193, _, 4209, V, 4213, _, 4226, V, 4227, _, 4229, V, 4231, _, 4237, V, 4238, _, 4253, V, 4254, _, 4957, V, 4960, _, 5008, V, 5024, N, 5120, V, 5121, N, 5760, V, 5761, K, 5787, V, 5792, N, 5906, V, 5920, _, 5938, V, 5941, _, 5970, V, 5984, _, 6002, V, 6016, _, 6068, V, 6070, _, 6071, V, 6078, _, 6086, V, 6087, _, 6089, V, 6100, _, 6107, V, 6108, D, 6109, V, 6112, _, 6128, V, 6155, N, 6158, _, 6160, $, 6277, V, 6279, _, 6313, V, 6314, _, 6432, V, 6435, _, 6439, V, 6441, _, 6450, V, 6451, _, 6457, V, 6464, _, 6470, N, 6622, V, 6656, N, 6679, V, 6681, _, 6683, V, 6686, _, 6742, V, 6743, _, 6744, V, 6753, _, 6754, V, 6755, _, 6757, V, 6765, _, 6771, V, 6784, _, 6832, V, 6916, _, 6964, V, 6965, _, 6966, V, 6971, _, 6972, V, 6973, _, 6978, V, 6979, _, 7019, V, 7028, _, 7040, V, 7042, _, 7074, V, 7078, _, 7080, V, 7082, _, 7083, V, 7086, _, 7142, V, 7143, _, 7144, V, 7146, _, 7149, V, 7150, _, 7151, V, 7154, _, 7212, V, 7220, _, 7222, V, 7227, _, 7376, V, 7379, _, 7380, V, 7393, _, 7394, V, 7401, _, 7405, V, 7406, _, 7412, V, 7413, _, 7416, V, 7424, _, 7616, V, 7680, _, 8125, V, 8126, N, 8127, V, 8130, N, 8141, V, 8144, N, 8157, V, 8160, N, 8173, V, 8178, N, 8189, V, 8192, N, 8203, K, 8206, $, 8207, V, 8208, X, 8232, N, 8233, K, 8234, H, 8235, P, 8236, j, 8237, J, 8238, Q, 8239, q, 8240, z, 8245, D, 8260, N, 8261, z, 8287, N, 8288, K, 8294, $, 8298, null, 8304, $, 8305, F, 8308, V, 8314, F, 8316, O, 8319, N, 8320, V, 8330, F, 8332, O, 8336, N, 8352, V, 8400, D, 8448, _, 8450, N, 8451, V, 8455, N, 8456, V, 8458, N, 8468, V, 8469, N, 8470, V, 8473, N, 8478, V, 8484, N, 8485, V, 8486, N, 8487, V, 8488, N, 8489, V, 8490, N, 8494, V, 8495, D, 8506, V, 8508, N, 8512, V, 8517, N, 8522, V, 8526, N, 8528, V, 8544, N, 8585, V, 8722, N, 8723, O, 8724, D, 9014, N, 9083, V, 9109, N, 9110, V, 9352, N, 9372, F, 9450, V, 9900, N, 9901, V, 10240, N, 10496, V, 11264, N, 11493, V, 11499, N, 11503, V, 11506, _, 11513, V, 11520, N, 11647, V, 11648, _, 11744, V, 11776, _, 12288, N, 12289, K, 12293, N, 12296, V, 12321, N, 12330, V, 12334, _, 12336, V, 12337, N, 12342, V, 12344, N, 12349, V, 12353, N, 12441, V, 12443, _, 12445, N, 12448, V, 12449, N, 12539, V, 12540, N, 12736, V, 12784, N, 12829, V, 12832, N, 12880, V, 12896, N, 12924, V, 12927, N, 12977, V, 12992, N, 13004, V, 13008, N, 13175, V, 13179, N, 13278, V, 13280, N, 13311, V, 13312, N, 19904, V, 19968, N, 42128, V, 42192, N, 42509, V, 42512, N, 42607, V, 42611, _, 42612, N, 42622, _, 42624, N, 42654, V, 42656, _, 42736, V, 42738, _, 42752, V, 42786, N, 42888, V, 42889, N, 43010, V, 43011, _, 43014, V, 43015, _, 43019, V, 43020, _, 43045, V, 43047, _, 43048, V, 43056, N, 43064, V, 43072, D, 43124, V, 43136, N, 43204, V, 43214, _, 43232, V, 43250, _, 43302, V, 43310, _, 43335, V, 43346, _, 43392, V, 43395, _, 43443, V, 43444, _, 43446, V, 43450, _, 43452, V, 43453, _, 43493, V, 43494, _, 43561, V, 43567, _, 43569, V, 43571, _, 43573, V, 43584, _, 43587, V, 43588, _, 43596, V, 43597, _, 43644, V, 43645, _, 43696, V, 43697, _, 43698, V, 43701, _, 43703, V, 43705, _, 43710, V, 43712, _, 43713, V, 43714, _, 43756, V, 43758, _, 43766, V, 43777, _, 44005, V, 44006, _, 44008, V, 44009, _, 44013, V, 44016, _, 64285, V, 64286, X, 64287, _, 64297, X, 64298, O, 64336, X, 64830, U, 64848, N, 65021, U, 65024, N, 65040, _, 65056, N, 65072, _, 65104, N, 65105, z, 65106, N, 65108, z, 65109, N, 65110, z, 65119, N, 65120, D, 65122, N, 65124, O, 65129, N, 65131, D, 65136, N, 65279, U, 65281, $, 65283, N, 65286, D, 65291, N, 65292, O, 65293, z, 65294, O, 65296, z, 65306, F, 65307, z, 65313, N, 65339, V, 65345, N, 65371, V, 65382, N, 65504, V, 65506, D, 65509, N, 65512, D, 1114109, N],
        re = {
            1536: {
                t: 4
            },
            1537: {
                t: 4
            },
            1538: {
                t: 4
            },
            1539: {
                t: 4
            },
            1540: {
                t: 4
            },
            1541: {
                t: 4
            },
            1544: {
                t: 4
            },
            1547: {
                t: 4
            },
            1568: {
                t: 2
            },
            1569: {
                t: 4,
                isolated: 65152
            },
            1570: {
                t: 1,
                isolated: 65153,
                initial: 65154
            },
            1571: {
                t: 1,
                isolated: 65155,
                initial: 65156
            },
            1572: {
                t: 1,
                isolated: 65157,
                initial: 65158
            },
            1573: {
                t: 1,
                isolated: 65159,
                initial: 65160
            },
            1574: {
                t: 2,
                isolated: 65161,
                "final": 65163,
                median: 65164,
                initial: 65162
            },
            1575: {
                t: 1,
                isolated: 65165,
                initial: 65166
            },
            1576: {
                t: 2,
                isolated: 65167,
                "final": 65169,
                median: 65170,
                initial: 65168
            },
            1577: {
                t: 1,
                isolated: 65171,
                initial: 65172
            },
            1578: {
                t: 2,
                isolated: 65173,
                "final": 65175,
                median: 65176,
                initial: 65174
            },
            1579: {
                t: 2,
                isolated: 65177,
                "final": 65179,
                median: 65180,
                initial: 65178
            },
            1580: {
                t: 2,
                isolated: 65181,
                "final": 65183,
                median: 65184,
                initial: 65182
            },
            1581: {
                t: 2,
                isolated: 65185,
                "final": 65187,
                median: 65188,
                initial: 65186
            },
            1582: {
                t: 2,
                isolated: 65189,
                "final": 65191,
                median: 65192,
                initial: 65190
            },
            1583: {
                t: 1,
                isolated: 65193,
                initial: 65194
            },
            1584: {
                t: 1,
                isolated: 65195,
                initial: 65196
            },
            1585: {
                t: 1,
                isolated: 65197,
                initial: 65198
            },
            1586: {
                t: 1,
                isolated: 65199,
                initial: 65200
            },
            1587: {
                t: 2,
                isolated: 65201,
                "final": 65203,
                median: 65204,
                initial: 65202
            },
            1588: {
                t: 2,
                isolated: 65205,
                "final": 65207,
                median: 65208,
                initial: 65206
            },
            1589: {
                t: 2,
                isolated: 65209,
                "final": 65211,
                median: 65212,
                initial: 65210
            },
            1590: {
                t: 2,
                isolated: 65213,
                "final": 65215,
                median: 65216,
                initial: 65214
            },
            1591: {
                t: 2,
                isolated: 65217,
                "final": 65219,
                median: 65220,
                initial: 65218
            },
            1592: {
                t: 2,
                isolated: 65221,
                "final": 65223,
                median: 65224,
                initial: 65222
            },
            1593: {
                t: 2,
                isolated: 65225,
                "final": 65227,
                median: 65228,
                initial: 65226
            },
            1594: {
                t: 2,
                isolated: 65229,
                "final": 65231,
                median: 65232,
                initial: 65230
            },
            1595: {
                t: 2
            },
            1596: {
                t: 2
            },
            1597: {
                t: 2
            },
            1598: {
                t: 2
            },
            1599: {
                t: 2
            },
            1600: {
                t: 3,
                isolated: 1600,
                "final": 1600,
                median: 1600,
                initial: 1600
            },
            1601: {
                t: 2,
                isolated: 65233,
                "final": 65235,
                median: 65236,
                initial: 65234
            },
            1602: {
                t: 2,
                isolated: 65237,
                "final": 65239,
                median: 65240,
                initial: 65238
            },
            1603: {
                t: 2,
                isolated: 65241,
                "final": 65243,
                median: 65244,
                initial: 65242
            },
            1604: {
                t: 2,
                isolated: 65245,
                "final": 65247,
                median: 65248,
                initial: 65246
            },
            1605: {
                t: 2,
                isolated: 65249,
                "final": 65251,
                median: 65252,
                initial: 65250
            },
            1606: {
                t: 2,
                isolated: 65253,
                "final": 65255,
                median: 65256,
                initial: 65254
            },
            1607: {
                t: 2,
                isolated: 65257,
                "final": 65259,
                median: 65260,
                initial: 65258
            },
            1608: {
                t: 1,
                isolated: 65261,
                initial: 65262
            },
            1609: {
                t: 2,
                isolated: 65263,
                initial: 65264
            },
            1610: {
                t: 2,
                isolated: 65265,
                "final": 65267,
                median: 65268,
                initial: 65266
            },
            1646: {
                t: 2
            },
            1647: {
                t: 2
            },
            1649: {
                t: 1
            },
            1650: {
                t: 1
            },
            1651: {
                t: 1
            },
            1652: {
                t: 4
            },
            1653: {
                t: 1
            },
            1654: {
                t: 1
            },
            1655: {
                t: 1
            },
            1656: {
                t: 2
            },
            1657: {
                t: 2
            },
            1658: {
                t: 2
            },
            1659: {
                t: 2
            },
            1660: {
                t: 2
            },
            1661: {
                t: 2
            },
            1662: {
                t: 2,
                isolated: 64342,
                "final": 64344,
                median: 64345,
                initial: 64343
            },
            1663: {
                t: 2
            },
            1664: {
                t: 2
            },
            1665: {
                t: 2
            },
            1666: {
                t: 2
            },
            1667: {
                t: 2
            },
            1668: {
                t: 2
            },
            1669: {
                t: 2
            },
            1670: {
                t: 2,
                isolated: 64378,
                "final": 64380,
                median: 64381,
                initial: 64379
            },
            1671: {
                t: 2
            },
            1672: {
                t: 1
            },
            1673: {
                t: 1
            },
            1674: {
                t: 1
            },
            1675: {
                t: 1
            },
            1676: {
                t: 1
            },
            1677: {
                t: 1
            },
            1678: {
                t: 1
            },
            1679: {
                t: 1
            },
            1680: {
                t: 1
            },
            1681: {
                t: 1
            },
            1682: {
                t: 1
            },
            1683: {
                t: 1
            },
            1684: {
                t: 1
            },
            1685: {
                t: 1
            },
            1686: {
                t: 1
            },
            1687: {
                t: 1
            },
            1688: {
                t: 1,
                isolated: 64394,
                initial: 64395
            },
            1689: {
                t: 1
            },
            1690: {
                t: 2
            },
            1691: {
                t: 2
            },
            1692: {
                t: 2
            },
            1693: {
                t: 2
            },
            1694: {
                t: 2
            },
            1695: {
                t: 2
            },
            1696: {
                t: 2
            },
            1697: {
                t: 2
            },
            1698: {
                t: 2
            },
            1699: {
                t: 2
            },
            1700: {
                t: 2
            },
            1701: {
                t: 2
            },
            1702: {
                t: 2
            },
            1703: {
                t: 2
            },
            1704: {
                t: 2
            },
            1705: {
                t: 2,
                isolated: 64398,
                "final": 64400,
                median: 64401,
                initial: 64399
            },
            1706: {
                t: 2
            },
            1707: {
                t: 2
            },
            1708: {
                t: 2
            },
            1709: {
                t: 2
            },
            1710: {
                t: 2
            },
            1711: {
                t: 2,
                isolated: 64402,
                "final": 64404,
                median: 64405,
                initial: 64403
            },
            1712: {
                t: 2
            },
            1713: {
                t: 2
            },
            1714: {
                t: 2
            },
            1715: {
                t: 2
            },
            1716: {
                t: 2
            },
            1717: {
                t: 2
            },
            1718: {
                t: 2
            },
            1719: {
                t: 2
            },
            1720: {
                t: 2
            },
            1721: {
                t: 2
            },
            1722: {
                t: 2
            },
            1723: {
                t: 2
            },
            1724: {
                t: 2
            },
            1725: {
                t: 2
            },
            1726: {
                t: 2
            },
            1727: {
                t: 2
            },
            1728: {
                t: 1
            },
            1729: {
                t: 2
            },
            1730: {
                t: 2
            },
            1731: {
                t: 1
            },
            1732: {
                t: 1
            },
            1733: {
                t: 1
            },
            1734: {
                t: 1
            },
            1735: {
                t: 1
            },
            1736: {
                t: 1
            },
            1737: {
                t: 1
            },
            1738: {
                t: 1
            },
            1739: {
                t: 1
            },
            1740: {
                t: 2,
                isolated: 64508,
                "final": 64510,
                median: 64511,
                initial: 64509
            },
            1741: {
                t: 1
            },
            1742: {
                t: 2
            },
            1743: {
                t: 1
            },
            1744: {
                t: 2
            },
            1745: {
                t: 2
            },
            1746: {
                t: 1
            },
            1747: {
                t: 1
            },
            1749: {
                t: 1
            },
            1757: {
                t: 4
            },
            1774: {
                t: 1
            },
            1775: {
                t: 1
            },
            1786: {
                t: 2
            },
            1787: {
                t: 2
            },
            1788: {
                t: 2
            },
            1791: {
                t: 2
            },
            1808: {
                t: 1
            },
            1810: {
                t: 2
            },
            1811: {
                t: 2
            },
            1812: {
                t: 2
            },
            1813: {
                t: 1
            },
            1814: {
                t: 1
            },
            1815: {
                t: 1
            },
            1816: {
                t: 1
            },
            1817: {
                t: 1
            },
            1818: {
                t: 2
            },
            1819: {
                t: 2
            },
            1820: {
                t: 2
            },
            1821: {
                t: 2
            },
            1822: {
                t: 1
            },
            1823: {
                t: 2
            },
            1824: {
                t: 2
            },
            1825: {
                t: 2
            },
            1826: {
                t: 2
            },
            1827: {
                t: 2
            },
            1828: {
                t: 2
            },
            1829: {
                t: 2
            },
            1830: {
                t: 2
            },
            1831: {
                t: 2
            },
            1832: {
                t: 1
            },
            1833: {
                t: 2
            },
            1834: {
                t: 1
            },
            1835: {
                t: 2
            },
            1836: {
                t: 1
            },
            1837: {
                t: 2
            },
            1838: {
                t: 2
            },
            1839: {
                t: 1
            },
            1869: {
                t: 1
            },
            1870: {
                t: 2
            },
            1871: {
                t: 2
            },
            1872: {
                t: 2
            },
            1873: {
                t: 2
            },
            1874: {
                t: 2
            },
            1875: {
                t: 2
            },
            1876: {
                t: 2
            },
            1877: {
                t: 2
            },
            1878: {
                t: 2
            },
            1879: {
                t: 2
            },
            1880: {
                t: 2
            },
            1881: {
                t: 1
            },
            1882: {
                t: 1
            },
            1883: {
                t: 1
            },
            1884: {
                t: 2
            },
            1885: {
                t: 2
            },
            1886: {
                t: 2
            },
            1887: {
                t: 2
            },
            1888: {
                t: 2
            },
            1889: {
                t: 2
            },
            1890: {
                t: 2
            },
            1891: {
                t: 2
            },
            1892: {
                t: 2
            },
            1893: {
                t: 2
            },
            1894: {
                t: 2
            },
            1895: {
                t: 2
            },
            1896: {
                t: 2
            },
            1897: {
                t: 2
            },
            1898: {
                t: 2
            },
            1899: {
                t: 1
            },
            1900: {
                t: 1
            },
            1901: {
                t: 2
            },
            1902: {
                t: 2
            },
            1903: {
                t: 2
            },
            1904: {
                t: 2
            },
            1905: {
                t: 1
            },
            1906: {
                t: 2
            },
            1907: {
                t: 1
            },
            1908: {
                t: 1
            },
            1909: {
                t: 2
            },
            1910: {
                t: 2
            },
            1911: {
                t: 2
            },
            1912: {
                t: 1
            },
            1913: {
                t: 1
            },
            1914: {
                t: 2
            },
            1915: {
                t: 2
            },
            1916: {
                t: 2
            },
            1917: {
                t: 2
            },
            1918: {
                t: 2
            },
            1919: {
                t: 2
            },
            2208: {
                t: 2
            },
            2209: {
                t: 2
            },
            2210: {
                t: 2
            },
            2211: {
                t: 2
            },
            2212: {
                t: 2
            },
            2213: {
                t: 2
            },
            2214: {
                t: 2
            },
            2215: {
                t: 2
            },
            2216: {
                t: 2
            },
            2217: {
                t: 2
            },
            2218: {
                t: 1
            },
            2219: {
                t: 1
            },
            2220: {
                t: 1
            },
            2221: {
                t: 4
            },
            2222: {
                t: 1
            },
            2223: {
                t: 2
            },
            2224: {
                t: 2
            },
            2225: {
                t: 1
            },
            2226: {
                t: 1
            },
            2227: {
                t: 2
            },
            2228: {
                t: 2
            },
            2230: {
                t: 2
            },
            2231: {
                t: 2
            },
            2232: {
                t: 2
            },
            2233: {
                t: 1
            },
            2234: {
                t: 2
            },
            2235: {
                t: 2
            },
            2236: {
                t: 2
            },
            2237: {
                t: 2
            },
            2274: {
                t: 4
            },
            8204: {
                t: 4
            },
            8205: {
                t: 3
            },
            8239: {
                t: 4
            },
            8294: {
                t: 4
            },
            8295: {
                t: 4
            },
            8296: {
                t: 4
            },
            8297: {
                t: 4
            },
            65269: {
                t: 1,
                isolated: 65269,
                initial: 65270
            },
            65271: {
                t: 1,
                isolated: 65271,
                initial: 65272
            },
            65273: {
                t: 1,
                isolated: 65273,
                initial: 65274
            },
            65275: {
                t: 1,
                isolated: 65275,
                initial: 65276
            }
        },
        ie = {
            1611: 1,
            1612: 1,
            1613: 1,
            1614: 1,
            1615: 1,
            1616: 1,
            1617: 1,
            1618: 1,
            1619: 1,
            1620: 1,
            1621: 1,
            1648: 1
        },
        ae = {
            1456: 1,
            1457: 1,
            1458: 1,
            1459: 1,
            1460: 1,
            1461: 1,
            1462: 1,
            1463: 1,
            1464: 1,
            1465: 1,
            1466: 1,
            1467: 1,
            1473: 1,
            1474: 1
        },
        oe = {
            "\u0644": {
                "\u0627": "\ufefb",
                "\u0622": "\ufef5",
                "\u0623": "\ufef7",
                "\u0625": "\ufef9"
            },
            "\u0627": {
                "\u0644": {
                    "\u0644": {
                        "\u0647": "\ufdf2"
                    }
                }
            }
        },
        le = {
            "(": ")",
            ")": "(",
            "[": "]",
            "]": "[",
            "{": "}",
            "}": "{",
            ">": "<",
            "<": ">"
        },
        ue = 63;
    S.analyseText = function(o) {
        if (W[o]) return W[o];
        var l = {
                characters: [],
                logicalOrder: o,
                result: []
            },
            u = e(o),
            c = i(o, u),
            s = c.length;
        return c.forEach(function(e, i) {
            a(e), r(e), 0 !== e.characters.length && (t(e), n(e), v(e), m(e), I(e), x(e), y(e), w(e, ae, !1), C(e), l.result = l.result.concat(e.reorderedCharacters), s - 1 > i && l.result.push({
                text: "\n",
                level: 0,
                type: H
            }), l.characters = l.characters.concat(e.characters))
        }), l.types = u, W[o] = l, l
    }, S.reorderText = function(e) {
        return S.analyseText(e).result.map(function(e) {
            return e.text
        }).join("")
    }
}(),
function() {
    KeyLines.Layouts = KeyLines.Layouts || {};
    var e = KeyLines.Layouts;
    e.Util = {};
    var t = e.Util;
    t.create = function() {
        function e(e, t) {
            if (t) return !1;
            if ("boolean" == typeof e.tc) return e.tc;
            var n = e.w;
            return n ? !1 : !e.u && !e.fi
        }

        function t(t) {
            return e(t, t._combo && t._combo.open)
        }

        function n(e) {
            var t = 0;
            return e.b && (t = l.isNumber(e.bw) ? e.bw : s), !e.donut || e._combo && e._combo.open || (t = e.donut.w + 2 * e.donut.bw), t
        }

        function r(e, t, n, r) {
            var l = 0,
                u = 0;
            if (e.t) {
                var c = e.e || 1,
                    s = (e.fs || f) * c,
                    d = g * c,
                    h = i(e, r),
                    v = a(h, t, s, e.fb, e.ff);
                l = o(v), u = (s + d) * h.length, e.u || e.c || e.bc || e.w && e.h || (l = Math.max(l / 10, n))
            }
            return {
                width: l,
                height: u
            }
        }

        function i(e, t) {
            if (e.t) {
                var n = e.t;
                return void 0 !== t && n.length > t && (n = n.substring(0, Math.max(0, t - 3)), n += "..."), n.split(/\r\n|\r|\n/)
            }
            return [""]
        }

        function a(e, t, n, r, i) {
            for (var a = [], o = 0; o < e.length; o++) a[o] = u(t, e[o], n, r, i || "sans-serif").width;
            return a
        }

        function o(e) {
            for (var t = 0, n = 0; n < e.length; n++) t = Math.max(t, e[n]);
            return t
        }
        var l = KeyLines.Util,
            u = KeyLines.Rendering.measureText,
            c = l.len,
            s = KeyLines.Generator.defaultBorderWidth,
            f = KeyLines.Generator.defaultFontSize,
            d = KeyLines.Generator.baseRadius,
            g = 3,
            h = function(t, a, o, l, u) {
                var s, f, g, h, v, m, y = t.e || 1,
                    b = t.w && t.h,
                    p = b && "circle" === t.sh,
                    I = !1;
                if (t.du) return {
                    radius: 10,
                    baseRadius: 10,
                    borderSize: 10,
                    width: 10,
                    height: 10
                };
                if (h = n(t), t._combo && (I = "boolean" == typeof u ? u : t._combo.open), I) g = t.oc.w / 2, v = t.oc.w, m = v, h = t.oc && "bw" in t.oc ? t.oc.bw : KeyLines.Validation.defaultOpenComboStyle.bw, s = g + h;
                else if (b)
                    if (p) {
                        var x = Math.min(t.w, t.h);
                        g = x / 2, v = x + 2 * h, m = v, s = g + h
                    } else g = c(t.w, t.h) / 2, v = t.w + 2 * h, m = t.h + 2 * h, s = c(v, m) / 2;
                else h *= y, g = d * y, v = 2 * g + 2 * h, m = v, s = g + h;
                if (o && t.t && t.t.length > 0) {
                    var C, w = r(t, a, s, l),
                        G = w.width,
                        A = w.height,
                        B = e(t, I);
                    v = Math.max(G, v);
                    var Z = c(G / 2, m / 2 + A / 2);
                    f = Math.max(Z, s), B ? (m = Math.max(A, m), s = Math.max(s, c(G / 2, A / 2))) : (C = c(G / 2, m / 2 + A), s = Math.max(C, s), m = A + m)
                } else {
                    var R = 0;
                    if (t.t) {
                        var M = i(t, l);
                        R = (M.length + 1) * ((t.fs || KeyLines.Generator.defaultFontSize) * (t.e || 1))
                    }
                    f = s + R / 2
                }
                return {
                    legacyRadius: Math.round(f),
                    radius: Math.round(s),
                    baseRadius: Math.round(g),
                    borderSize: Math.round(h),
                    width: Math.round(v),
                    height: Math.round(m)
                }
            },
            v = function(e, n) {
                var r = 0;
                if (e.t) {
                    var a = e.fs || f,
                        o = e.e || 1;
                    if (!t(e)) {
                        var l = (a + g) * o;
                        r = l * i(e, n).length / 2
                    }
                }
                return Math.round(r)
            },
            m = function(e, t, n, r, i, a) {
                var o, u, s, f, d, g, m, y, b = Math.max(0, 0 | n),
                    p = {},
                    I = 0,
                    x = {},
                    C = 0,
                    w = i || {
                        x: 0,
                        y: 0
                    };
                return l.forEach(e, function(e) {
                    if (void 0 !== e.x) {
                        var n;
                        void 0 !== e.size ? n = e.size : void 0 !== e.r ? (n = e.r, C = e.labelOffset) : (n = h(e, t, r, a).radius, C = v(e, a)), x[e.id] = {
                            size: n,
                            labelOffset: C
                        }, u = e.x - n, f = e.y - (n + C), g = e.x + n, y = e.y + (n - C), void 0 === o ? (o = u, s = f, d = g, m = y) : (o = Math.min(u, o), s = Math.min(f, s), d = Math.max(g, d), m = Math.max(y, m))
                    }
                }), p.x1 = o - (b + w.x), p.y1 = s - (b + w.y), p.x2 = d + (b - w.x), p.y2 = m + (b - w.y), p.w = d - o + 2 * b, p.h = m - s + 2 * b, l.forEach(e, function(e) {
                    if (void 0 !== e.x) {
                        var t = x[e.id],
                            n = e.x - w.x,
                            r = e.y - w.y,
                            i = c(n, r + t.labelOffset);
                        I = Math.max(I, i + t.size)
                    }
                }), p.r = Math.round(I + b), p
            },
            y = function(e, t, n, r, i) {
                var a = [],
                    o = "undefined" == typeof n ? 0 : n;
                return l.forEach(e, function(e) {
                    var n = void 0 !== e.r ? e.r : h(e, t, r, i).radius;
                    if (n += o, !isFinite(e.x) || !isFinite(e.y) || !isFinite(n)) throw new Error("Inputs must be finite");
                    a.push({
                        x: e.x,
                        y: e.y,
                        r: n
                    })
                }), 0 === a.length ? null : welzlAlgorithm.bMinidisk(a)
            };
        return {
            labelOffset: v,
            nodeSize: h,
            getExtents: m,
            radialExtents: y
        }
    }
}();
var welzlAlgorithm = function() {
    function e(e, t) {
        var n = e.x - t.x,
            r = e.y - t.y,
            i = 1e-6;
        return Math.sqrt(n * n + r * r) < e.r - t.r + i
    }

    function t(e, t) {
        var n = e.x,
            r = e.y,
            i = e.r,
            a = t.x,
            o = t.y,
            l = t.r,
            u = a - n,
            c = o - r,
            s = l - i,
            f = Math.sqrt(u * u + c * c);
        return {
            x: (n + a + u / f * s) / 2,
            y: (r + o + c / f * s) / 2,
            r: (f + i + l) / 2
        }
    }

    function n(e, t, n) {
        var r = e.x,
            i = e.y,
            a = e.r,
            o = t.x,
            l = t.y,
            u = t.r,
            c = n.x,
            s = n.y,
            f = n.r,
            d = 2 * (r - o),
            g = 2 * (i - l),
            h = 2 * (u - a),
            v = r * r + (i * i - a * a - o * o - l * l) + u * u,
            m = 2 * (r - c),
            y = 2 * (i - s),
            b = 2 * (f - a),
            p = r * r + (i * i - a * a - c * c - s * s) + f * f,
            I = m * g - d * y,
            x = (g * p - y * v) / I - r,
            C = (y * h - g * b) / I,
            w = (m * v - d * p) / I - i,
            G = (d * b - m * h) / I,
            A = C * C + G * G - 1,
            B = 2 * (x * C + w * G + a),
            Z = x * x + w * w - a * a,
            R = (-B - Math.sqrt(B * B - 4 * A * Z)) / (2 * A);
        return {
            x: x + C * R + r,
            y: w + G * R + i,
            r: R
        }
    }

    function r(e, r) {
        switch (r.length) {
            case 0:
                return {
                    x: 0,
                    y: 0,
                    r: 0
                };
            case 1:
                return e[r[0]];
            case 2:
                return t(e[r[0]], e[r[1]]);
            case 3:
                return n(e[r[0]], e[r[1]], e[r[2]]);
            default:
                throw new Error("invalid number of circles")
        }
    }

    function i(t) {
        for (var n = t.length, i = {
                prev: null,
                i: 0,
                R: [],
                c: null
            };;) {
            var a = i.i,
                o = i.R,
                l = i.prev,
                u = i.c;
            if (a === n || 3 === o.length) l.c = r(t, o), i = l;
            else if (null === u) i = {
                prev: i,
                i: a + 1,
                R: o,
                c: null
            };
            else if (e(u, t[a])) {
                if (null === l) return u;
                l.c = u, i = l
            } else i = {
                prev: i,
                i: a + 1,
                R: o.concat([a]),
                c: null
            }
        }
    }
    return {
        bMinidisk: i
    }
}();
! function() {
    KeyLines.Layouts = KeyLines.Layouts || {};
    var e = KeyLines.Layouts;
    e.CirclePacking = {};
    var t = e.CirclePacking;
    t.create = function() {
        var e = KeyLines.Util,
            t = function(e, t) {
                if (e.r === t.r) {
                    if (e.t) {
                        if (!t.t) return -1;
                        if (e.t < t.t) return -1;
                        if (e.t > t.t) return 1
                    } else if (t.t) return 1;
                    return e.id === t.id ? 0 : e.id < t.id ? -1 : 1
                }
                return e.r < t.r ? 1 : -1
            },
            n = function(n, r) {
                function i() {
                    g[0].x = 0, g[0].y = -g[0].labelOffset
                }

                function a() {
                    var e = g[0],
                        t = g[0];
                    g.forEach(function(n) {
                        n.y < e.y ? e = n : n.y > e.y && (t = n)
                    });
                    var n = Math.abs(e.y - e.r),
                        r = Math.sqrt(t.x * t.x + t.y * t.y) + t.r,
                        i = (n - r) / 4;
                    g.forEach(function(e) {
                        e.y += i
                    })
                }

                function o() {
                    var e = p,
                        t = g[m++];
                    e.x = 0, e.y = -t.r - e.labelOffset, t.x = 0, t.y = e.r - t.labelOffset
                }

                function l() {
                    var e = p,
                        t = g[m++],
                        n = g[m++],
                        r = g[m++];
                    t.r === n.r && n.r === r.r && (t = g[2], n = g[1]);
                    var i = e.r + n.r,
                        a = e.r,
                        o = Math.sqrt(i * i - a * a),
                        l = e.r - t.r;
                    e.x = -t.r, e.y = -e.labelOffset, t.x = e.r, t.y = 0 - t.labelOffset, n.x = l, n.y = -o - n.labelOffset, r.x = l, r.y = o - r.labelOffset
                }

                function u() {
                    var e = p,
                        t = g[m++],
                        n = g[m++],
                        r = 2 * e.r + v,
                        i = Math.sqrt(r * r - r / 2 * (r / 2)),
                        a = (e.r - t.r) / 2;
                    e.x = 0, e.y = -i * (2 / 3) + a, t.x = r / 2, t.y = i * (1 / 3) - t.labelOffset + a, n.x = -r / 2, n.y = i / 3 - n.labelOffset + a
                }

                function c(e) {
                    return 2 * e.r + v
                }

                function s() {
                    b += p.r + d + h.radialPadding, d = p.r;
                    var e = 2 * Math.PI * b,
                        t = e - c(p),
                        n = {
                            items: [],
                            radius: b,
                            spaceLeft: 0,
                            circumference: e
                        };
                    for (y.push(n); p && t > 0;) n.items.push(p), p = g[m++], p && (t -= c(p));
                    if (p && (t += c(p)), n.spaceLeft = t, p && g.length - m < 5) {
                        for (var r = 0; p;) r += c(p), n.items.push(p), p = g[m++];
                        n.radius = (e - t + r) / (2 * Math.PI), n.circumference = 2 * Math.PI * n.radius, n.spaceLeft = 0
                    }
                }

                function f() {
                    y.forEach(function(e) {
                        var t = 2 * Math.PI / (e.circumference - e.spaceLeft),
                            n = 0,
                            r = t * e.items[0].r,
                            i = Math.PI / 2;
                        e.items.forEach(function(a) {
                            var o = t * a.r,
                                l = n + o;
                            a.x = e.radius * Math.cos(l - i - r), a.y = e.radius * Math.sin(l - i - r) - a.labelOffset, n += t * c(a)
                        })
                    })
                }
                var d, g = n;
                if (!g || 0 === g.length) return g;
                var h = e.defaults(r, {
                        padding: 8,
                        radialPadding: 0
                    }),
                    v = h.padding,
                    m = 0;
                g.sort(t), g = g.map(function(e) {
                    return {
                        id: e.id,
                        r: e.r + v,
                        x: e.x,
                        y: e.y,
                        labelOffset: e.labelOffset
                    }
                });
                var y = [],
                    b = 0,
                    p = g[m++];
                if (1 === g.length) i();
                else if (2 === g.length) o();
                else if (3 === g.length) u();
                else if (4 === g.length) l();
                else if (g.length > 4) {
                    var I = g[0].r;
                    for (g[2].r / I > .5 && g.length > 10 ? u() : g[1].r / I > .5 && g.length > 10 ? o() : i(), d = Math.abs(g[0].y - g[0].r) + h.radialPadding, p = g[m++]; p;) s();
                    f(y), a()
                }
                return g
            };
        return {
            compareCircles: t,
            concentricLayout: n
        }
    }
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    e && (e.Renderer = function(t) {
        function n(e, n, r, i, o) {
            C = R.clientWidth;
            var c = R.width / C,
                d = e.width(),
                g = e.height(),
                h = s(e);
            a("overview", d * c, g * c), E.clear(E.COLOR_BUFFER_BIT);
            for (var v = t.layersToDraw, y = 0, b = v.length; b > y; y++) {
                var p = v[y]; - 1 === p.id.indexOf("main-content") && "top-content" !== p.id || f(p, h, d, g, c, n, r, i, o.showShadowCanvas)
            }
            m();
            var I = l(d, g, C, w, o);
            u("overview", 1, [1, 1, 1, 1], I), u("overview", 1, null, I), a(null)
        }

        function r() {
            var e = E.createTexture();
            return E.bindTexture(E.TEXTURE_2D, e), E.texParameteri(E.TEXTURE_2D, E.TEXTURE_WRAP_S, E.CLAMP_TO_EDGE), E.texParameteri(E.TEXTURE_2D, E.TEXTURE_WRAP_T, E.CLAMP_TO_EDGE), E.texParameteri(E.TEXTURE_2D, E.TEXTURE_MIN_FILTER, E.NEAREST), E.texParameteri(E.TEXTURE_2D, E.TEXTURE_MAG_FILTER, E.NEAREST), e
        }

        function i(e) {
            e ? (E.bindFramebuffer(E.FRAMEBUFFER, e.framebuffer), E.bindRenderbuffer(E.RENDERBUFFER, e.renderBuffer), E.bindTexture(E.TEXTURE_2D, e.texture)) : m()
        }

        function a(e, t, n) {
            var a = M[e] || null,
                o = E.RGBA,
                l = t || E.drawingBufferWidth,
                u = n || E.drawingBufferHeight;
            if (E.viewport(0, 0, l, u), e && !a) {
                a = {
                    framebuffer: E.createFramebuffer(),
                    renderbuffer: E.createRenderbuffer(),
                    texture: r()
                }, M[e] = a, "shadow" === e && (o = E.RGB), E.texImage2D(E.TEXTURE_2D, 0, o, l, u, 0, o, E.UNSIGNED_BYTE, null), E.bindFramebuffer(E.FRAMEBUFFER, a.framebuffer), E.bindRenderbuffer(E.RENDERBUFFER, a.renderbuffer), E.clearColor(0, 0, 0, 0), E.renderbufferStorage(E.RENDERBUFFER, E.DEPTH_COMPONENT16, l, u), E.framebufferTexture2D(E.FRAMEBUFFER, E.COLOR_ATTACHMENT0, E.TEXTURE_2D, a.texture, 0), E.framebufferRenderbuffer(E.FRAMEBUFFER, E.DEPTH_ATTACHMENT, E.RENDERBUFFER, a.renderbuffer);
                var c = E.checkFramebufferStatus(E.FRAMEBUFFER);
                if (E.FRAMEBUFFER_COMPLETE !== c) throw new Error(c.toString())
            }
            i(a)
        }

        function o() {
            return E = e.Utils.create3DContext(R, {
                antialias: !1,
                preferLowPowerToHighPerformance: !1
            }), C = R.width, w = R.height, G = E.drawingBufferWidth, A = E.drawingBufferHeight, E.getExtension("OES_standard_derivatives"), E.getExtension("OES_element_index_uint"), E.viewport(0, 0, G, A), E.blendFunc(E.ONE, E.ONE_MINUS_SRC_ALPHA), E.enable(E.BLEND), E.clearColor(0, 0, 0, 0), t.framebuffers = {}, M = t.framebuffers, x = new Uint8Array(4), E
        }

        function l(e, t, n, r, i) {
            var a, o = 1 - 2 * (e / n),
                l = 1 - 2 * (t / r);
            switch (i.overview.p) {
                case "ne":
                    a = new Float32Array([o, l, 0, 0, 1, l, 1, 0, o, 1, 0, 1, o, 1, 0, 1, 1, l, 1, 0, 1, 1, 1, 1]);
                    break;
                case "nw":
                    a = new Float32Array([-1, l, 0, 0, -o, l, 1, 0, -1, 1, 0, 1, -1, 1, 0, 1, -o, l, 1, 0, -o, 1, 1, 1]);
                    break;
                case "sw":
                    a = new Float32Array([-1, -1, 0, 0, -o, -1, 1, 0, -1, -l, 0, 1, -1, -l, 0, 1, -o, -1, 1, 0, -o, -l, 1, 1]);
                    break;
                case "se":
                default:
                    a = new Float32Array([o, -1, 0, 0, 1, -1, 1, 0, o, -l, 0, 1, o, -l, 0, 1, 1, -1, 1, 0, 1, -l, 1, 1])
            }
            return a
        }

        function u(e, t, n, r) {
            var i;
            M[e] && (i = M[e].texture), W.drawItems(t, i, n, r)
        }

        function c() {
            E.viewport(0, 0, E.drawingBufferWidth, E.drawingBufferHeight)
        }

        function s(e) {
            return e ? {
                panX: e.offsetXtoWebglPanX(),
                panY: e.offsetYtoWebglPanY(),
                zoom: e.settings().zoom
            } : {
                panX: 0,
                panY: 0,
                zoom: 1
            }
        }

        function f(e, t, n, r, i, a, o, l, u) {
            d(e.useView, t.panX, t.panY, t.zoom), g(k, e, e.lineBuffers, V, n, r, i, u), h(L, e, V, n, r, i, u), v(S, e, V, a, o, l, n, r, i, u)
        }

        function d(e, t, n, r) {
            V = B.createMatrix(), e ? (V.pan(t, n), V.zoom(r)) : (V.pan(0, 0), V.zoom(1))
        }

        function g(e, t, n, r, i, a, o, l) {
            n.numOfTriangles > 0 && e.drawItems(t, n, r, i, a, o, l)
        }

        function h(e, t, n, r, i, a, o) {
            t.arcBuffers.numOfTriangles > 0 && e.drawItems(t, n, r, i, a, o)
        }

        function v(e, t, n, r, i, a, o, l, u, c) {
            t.triangleBuffers.numOfTriangles > 0 && e.drawItems(t, n, r, i, a, o, l, u, c)
        }

        function m() {
            E.bindFramebuffer(E.FRAMEBUFFER, null), E.bindTexture(E.TEXTURE_2D, null), E.bindRenderbuffer(E.RENDERBUFFER, null), E.viewport(0, 0, G, A)
        }

        function y(e) {
            e.rebuildOptions.colours = !1, e.rebuildOptions.positions = !1, e.rebuildOptions.textures = !1, e.rebuildOptions.shadow = !1, e.rebuildOptions.all = !1
        }

        function b(e) {
            return e.lineBuffers.numOfTriangles || e.arcBuffers.numOfTriangles || e.triangleBuffers.numOfTriangles || e.drawBackgroundColour
        }

        function p() {
            for (var e = 0; 8 > e; e++) E.activeTexture(E["TEXTURE" + e]), E.bindTexture(E.TEXTURE_2D, null)
        }

        function I(e) {
            e && e.texture && (E.deleteTexture(e.texture), e.texture = null, e.ctx = null, e.img = null)
        }
        var x, C, w, G, A, B = e.Utils,
            Z = {},
            R = t.canvas,
            M = t.framebuffers,
            E = o(),
            k = e.LineShader(E),
            L = e.ArcShader(E),
            S = e.TriangleShader(E),
            W = e.RenderToTextureShader(E),
            V = null;
        return Z.finish = function() {
            Z.clearFramebuffers(), L.finish(), k.finish(), S.finish(), t.imageAtlases.forEach(function(e) {
                I(e)
            }), I(t.textAtlas), I(t.fontIconAtlas), t.layersToDraw = [], t.allLayers = {}, E.flush(), E.finish(), E = null, k = null, L = null, S = null, W = null
        }, Z.clearView = function(e) {
            e && (E = o()), c(), E.clear(E.COLOR_BUFFER_BIT)
        }, Z.clearFramebuffers = function() {
            KeyLines.Util.values(t.framebuffers).forEach(function(e) {
                E.deleteFramebuffer(e.framebuffer), E.deleteRenderbuffer(e.renderbuffer), E.deleteTexture(e.texture)
            }), t.framebuffers = {}, M = t.framebuffers
        }, Z.clearTextureAtlas = function(e) {
            e && (Array.isArray(e) ? e.forEach(I) : I(e))
        }, Z.render = function(e, r, i, o, l, c) {
            C = R.clientWidth, w = R.clientHeight;
            var d = R.width / C;
            G = E.drawingBufferWidth, A = E.drawingBufferHeight;
            var g = t.layersToDraw,
                h = s(e);
            if (t.view = e, c.showShadowCanvas) return Z.drawShadowCanvas(0, 0, !0);
            for (var v = !1, I = 0, x = g.length; x > I; I++) {
                var B = g[I];
                c.overview && c.overview.shown && "overlays-overview-window" === B.id && r ? n(r, i, o, l, c) : (b(B) && (B.drawFramebuffer && (v = !0), a(B.drawFramebuffer), f(B, h, C, w, d, i, o, l, c.showShadowCanvas), y(B)), (B.drawBackgroundColour || B.useFramebuffer && v) && (v = !1, m(), u(B.useFramebuffer, B.fbAlpha, B.drawBackgroundColour), a(B.useFramebuffer), E.clear(E.COLOR_BUFFER_BIT)))
            }
            p()
        }, Z.drawShadowCanvas = function(e, n, r) {
            C = R.clientWidth, w = R.clientHeight;
            var i = R.width / C;
            if (G = E.drawingBufferWidth, A = E.drawingBufferHeight, t.layersToDraw.length > 0) {
                var o = s(t.view),
                    l = G / R.clientWidth,
                    u = e * l,
                    c = A - n * l;
                r ? m() : a("shadow");
                for (var d = 0, g = t.layersToDraw.length; g > d; d++) {
                    var h = t.layersToDraw[d];
                    f(h, o, C, w, i, t.textAtlas, t.fontIconAtlas, t.imageAtlases, !0)
                }!r && u >= 0 && c >= 0 && G > u && A > c && E.readPixels(u, c, 1, 1, E.RGBA, E.UNSIGNED_BYTE, x)
            }
            return x
        }, Z.getPixels = function(e, t, n, r, i, a) {
            m(), E.clearColor(1, 1, 1, 1), Z.clearView(), Z.render(e, t, n, r, i, a);
            var o = new Uint8Array(E.drawingBufferWidth * E.drawingBufferHeight * 4);
            return E.readPixels(0, 0, E.drawingBufferWidth, E.drawingBufferHeight, E.RGBA, E.UNSIGNED_BYTE, o), o
        }, Z
    })
}(),
function() {
    KeyLines.View = {};
    var e = KeyLines.View;
    e.createView = function(e, n, r, i, a) {
        function o() {
            return a && a.api.isShown()
        }

        function l() {
            return F(d * R)
        }

        function u() {
            return F(d / R)
        }

        function c(e, t, n, r, i, a, o, l, u, c, s) {
            t.generate(n, r, p, i, u);
            var f = n.itemExtents(e, r);
            if (f) {
                var d = N(f);
                if (s) {
                    var g;
                    g = e ? d.x1 + (d.x2 - d.x1) / 2 : p.width() / 2, d.x1 = g, d.x2 = g
                }
                return H(d, f, a, !0, !0, !0, o, !1, l, c)
            }
            return y.invoke(l), null
        }
        var s, f, d, g, h, v, m, y = KeyLines.Util,
            b = KeyLines.Common,
            p = {},
            I = n,
            x = r,
            C = i || 1;
        p.scaleFactor = function(e) {
            return e && (C = e), C
        }, p.scale = function(e) {
            return Math.floor(C * e)
        };
        var w = p.scale;
        p.unscale = function(e) {
            return Math.floor(e / C)
        }, p.settings = function() {
            return {
                width: I,
                height: x,
                zoom: d,
                offsetX: g,
                offsetY: h
            }
        }, p.fromSettingsDirect = function(e, t, n, r) {
            return _(d, F(e.zoom), e.offsetX - g, e.offsetY - h, t, n, r)
        }, p.fromOldSettings = function(n, r, i, a) {
            if (r) {
                var o = t(e, n.width, n.height);
                o.setZoom(n.zoom, !1), o.offsetX = n.offsetX, o.offsetY = n.offsetY;
                var l = {
                    x1: o.viewToWorldX(0),
                    y1: o.viewToWorldY(0),
                    x2: o.viewToWorldX(o.width()),
                    y2: o.viewToWorldY(o.height())
                };
                return H(l, null, i, !1, !1, !1, a)
            }
            T(n.zoom, !1), g = n.offsetX, h = n.offsetY
        }, p.width = function(e) {
            return e && (I = e), I
        }, p.height = function(e) {
            return e && (x = e), x
        }, p.worldToViewX = function(e) {
            return Math.floor(((e - s) * d + g) * C)
        }, p.x = p.worldToViewX;
        var G = p.worldToViewX;
        p.worldToViewY = function(e) {
            return Math.floor(((e - f) * d + h) * C)
        }, p.y = p.worldToViewY;
        var A = p.worldToViewY;
        p.viewToWorldX = function(e) {
            return Math.floor((e / C - g) / d + s)
        };
        var B = p.viewToWorldX;
        p.viewToWorldY = function(e) {
            return Math.floor((e / C - h) / d + f)
        };
        var Z = p.viewToWorldY;
        p.w = function(e) {
            return -1 === e ? -1 : Math.max(1, Math.floor(e * d * C))
        }, p.sw = function(e) {
            return -1 === e ? -1 : p.w(e) + 7
        }, p.dim = function(e) {
            return Math.floor(e * d * C)
        }, p.sdim = function(e) {
            return e && e * d * C
        }, p.undim = function(e) {
            return Math.floor(e / (d * C))
        }, p.sundim = function(e) {
            return e / (d * C)
        };
        var R = 1.4,
            M = 4,
            E = .05,
            k = E,
            L = .001,
            S = 1,
            W = 200,
            V = 1 / 0,
            X = 100;
        p.getMaxZoom = function() {
            return M
        }, p.getMinZoom = function() {
            return k
        }, p.setMinZoom = function(e) {
            k = Math.min(S, Math.max(L, e || E)), k > d && _(d, k, g, h, !1)
        }, p.setMaxItemZoom = function(e) {
            V = e || 1 / 0
        }, p.getMaxItemZoom = function() {
            return V
        }, p.zoomIn = function(e, t, n) {
            var r = l();
            return Y(r, C * I / 2, C * x / 2, e, t, n)
        }, p.zoomOut = function(e, t, n) {
            var r = u();
            return Y(r, C * I / 2, C * x / 2, e, t, n)
        };
        var F = function(e) {
            return Math.min(M, Math.max(e, k))
        };
        p.setZoom = function(e, t, n, r) {
            var i = F(e);
            return Y(i, C * I / 2, C * x / 2, t, n, r)
        };
        var T = p.setZoom;
        p.getUnzoom = function() {
            return d > V ? V / d : 1
        }, p.wheelToPosition = function(e, t, n) {
            var r = e > 0 ? l() : u();
            return Y(r, t, n, !0, 200)
        }, p.worldExtentsToView = function(e) {
            return e ? {
                x1: G(e.x1),
                y1: A(e.y1),
                x2: G(e.x2),
                y2: A(e.y2)
            } : null
        };
        var N = p.worldExtentsToView;
        p.fitWorldExtents = function(e, t, n, r, i, a, o) {
            if (!e) return y.invoke(o), null;
            var l = N(e);
            return H(l, null, t, n, r, i, a, !1, o)
        }, p.fitExtents = function(e, t, n, r, i, a, o, l, u, c) {
            var v, m = (e.y2 - e.y1) / (e.x2 - e.x1),
                y = x / I;
            if (m > y) {
                var b = a ? x / 8 : 0;
                v = d * (x - b) / (e.y2 - e.y1)
            } else {
                var p = a ? I / 8 : 0;
                v = d * (I - p) / (e.x2 - e.x1)
            }
            v *= C, r && (v = F(v)), i && v > 1 && (v = 1), c && (v = d);
            var w = (e.x1 + e.x2) / 2,
                G = (e.y1 + e.y2) / 2,
                A = t ? (t.x1 + t.x2) / 2 : B(w),
                R = t ? (t.y1 + t.y2) / 2 : Z(G),
                M = I / 2 - (A - s) * v,
                E = x / 2 - (R - f) * v;
            return _(d, v, M - g, E - h, n, o, u, l)
        };
        var H = p.fitExtents;
        p.fitToSelection = function(e, t, n, r, i, a, o, l, u, s) {
            return c(e.privateSelection(), e, t, n, r, i, a, l, u, s)
        }, p.fitToModel = function(e, t, n, r, i, a, o, l, u, s) {
            return o ? c(y.makeIdMap(o), e, t, n, r, i, a, l, u, s) : c(null, e, t, n, r, i, a, l, u)
        }, p.fitModelHeight = function(e, t, n, r, i, a, o, l, u, s) {
            return o ? c(y.makeIdMap(o), e, t, n, r, i, a, l, u, s, !0) : c(null, e, t, n, r, i, a, l, u, !1, !0)
        }, p.zoomToPosition = function(e, t, n, r, i, a) {
            var o = F(e),
                l = B(t),
                u = Z(n),
                c = t / C - (l - s) * o,
                v = n / C - (u - f) * o;
            return _(d, o, c - g, v - h, r, i, a)
        };
        var Y = p.zoomToPosition;
        p.reset = function(e) {
            s = 421, f = 298, e ? _(d, 1, 421 - g, 298 - h, !0) : (g = 421, h = 298, d = 1)
        };
        var U = p.reset;
        p.zoom = function() {
            return o() ? a.internalUse.getZoom() : d
        }, p.offsetXtoWebglPanX = function() {
            var e = I / 2;
            return -(1 - p.offsetX() / e) + (e - s) / e * d
        }, p.offsetYtoWebglPanY = function() {
            var e = x / 2;
            return 1 - p.offsetY() / e - (e - f) / e * d
        }, p.offsetX = function(e) {
            return y.defined(e) && (g = e), g
        }, p.offsetY = function(e) {
            return y.defined(e) && (h = e), h
        }, p.diffX = function() {
            return v
        }, p.diffY = function() {
            return m
        }, p.pan = function(e, t, n, r) {
            var i = 0,
                a = 0;
            switch (e) {
                case "up":
                    a = 1;
                    break;
                case "down":
                    a = -1;
                    break;
                case "left":
                    i = 1;
                    break;
                case "right":
                    i = -1
            }
            return i *= X, a *= X, D(i, a, t, !1, n, r)
        }, p.panBy = function(e, t, n, r, i, a) {
            return _(d, d, e, t, n, i, a, r)
        };
        var K, z, O, D = p.panBy,
            _ = function(t, n, r, i, a, o, l, u) {
                return v = r, m = i, a ? P(t, n, r, i, o, l) : (g += Math.floor(r), h += Math.floor(i), d = n, e && !u && e.trigger("viewchange"), void y.invoke(l))
            },
            P = function(t, n, r, i, a, o) {
                var l = a || W,
                    u = l,
                    c = g,
                    s = h;
                return b.buildAnimatorInstance(function(a) {
                    u -= a;
                    var f = e.atanEasing(Math.max(0, Math.min(1, (l - u) / l)));
                    g = c + f * r, h = s + f * i, d = F(t + f * (n - t));
                    var v = u > 0;
                    return v || (e.trigger("viewchange"), y.invoke(o)), v
                }, {
                    drawOnly: !0
                })
            },
            j = function(t, n, r, i, l) {
                var u = o(),
                    c = u ? -3 : .1;
                return b.buildAnimatorInstance(function(o) {
                    var s = 0 === z && 0 === O;
                    return u ? a.internalUse.panBy([z * c, O * c], {
                        animate: !1
                    }) : (g += o * c * z, h += o * c * O), K = !s, r && r.dragMove(t, n, i, l), s || e.trigger("viewchange"), !s
                }, {
                    positions: !0
                })
            };
        return p.cancelScroll = function() {
            z = 0, O = 0
        }, p.maybeScroll = function(e, t, n, r, i) {
            var a = w(50);
            return z = 0, O = 0, a > e && (z = 1), e > w(I) - a && (z = -1), a > t && (O = 1), t > w(x) - a && (O = -1), n.direction && (n.direction.x || (z = 0), n.direction.y || (O = 0)), 0 === z && 0 === O || K ? void 0 : (K = !0, j(e, t, n, r, i))
        }, U(), p
    };
    var t = e.createView
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    if (e) {
        var t = [0, 1, 0, 1],
            n = [0, 0, 2, 2];
        e.lineFactory = function(e) {
            return function(r, i, a, o, l, u, c, s, f, d, g, h, v, m, y) {
                var b = i,
                    p = a,
                    I = o,
                    x = l,
                    C = d.elementData,
                    w = d.elementIntegerData,
                    G = d.elementDataIndex;
                if (g || h.all) {
                    var A = d.elementIndex,
                        B = d.elementIndexIndex,
                        Z = d.elementMappingIndex;
                    A[B] = Z, A[B + 1] = Z + 1, A[B + 2] = Z + 2, A[B + 3] = Z + 2, A[B + 4] = Z + 1, A[B + 5] = Z + 3
                }
                d.elementIndexIndex += 6, d.elementMappingIndex += 4;
                var R = 0;
                (g || h.all || h.positions) && v && (b += v.x, p += v.y, I += v.x, x += v.y);
                for (var M = 0; 4 > M; M++) {
                    if ((g || h.all || h.positions) && (C[G] = b, C[G + 1] = p, C[G + 2] = I, C[G + 3] = x, C[G + 4] = f), g || h.all) {
                        var E = (m ? e.background : 1) * (y ? e.ghost : 1);
                        R = (G + 6) * Float32Array.BYTES_PER_ELEMENT, w[R] = t[M], w[R + 1] = n[M], w[R + 2] = 0, w[R + 3] = s, w[R + 4] = u[0], w[R + 5] = u[1], w[R + 6] = u[2], w[R + 7] = u[3] * E;
                        var k = c || [0, 0, 0];
                        w[R + 8] = k[0], w[R + 9] = k[1], w[R + 10] = k[2]
                    }
                    d.elementDataIndex += 9, G = d.elementDataIndex
                }
            }
        }
    }
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    e && (e.RenderToTextureShader = function(t) {
        function n(e) {
            u.bindBuffer(u.ARRAY_BUFFER, d), u.bufferData(u.ARRAY_BUFFER, e, u.STATIC_DRAW), u.enableVertexAttribArray(g.position), u.enableVertexAttribArray(g.textCoord), u.vertexAttribPointer(g.position, 2, u.FLOAT, !1, 4 * Float32Array.BYTES_PER_ELEMENT, 0), u.vertexAttribPointer(g.textCoord, 2, u.FLOAT, !1, 4 * Float32Array.BYTES_PER_ELEMENT, 8)
        }

        function r(e, t) {
            u.activeTexture(u["TEXTURE" + t]), u.bindTexture(u.TEXTURE_2D, e)
        }

        function i(e, t) {
            u.uniform1f(h.globalAlpha, e), u.uniform4fv(h.backgroundColour, new Float32Array(t || [0, 0, 0, 0]))
        }
        var a, o = {},
            l = e.Utils,
            u = t;
        if (!u.rttShader) {
            var c = l.compileShader(u, "renderToTexture-vertex", u.VERTEX_SHADER),
                s = l.compileShader(u, "renderToTexture-fragment", u.FRAGMENT_SHADER);
            a = l.createProgram(u, c, s), u.rttShader = {
                vertexShader: c,
                fragmentShader: s,
                program: a
            }
        }
        a = u.rttShader.program;
        var f = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, -1, 1, 0, 1, 1, -1, 1, 0, 1, 1, 1, 1]),
            d = u.createBuffer(),
            g = {
                position: u.getAttribLocation(a, "a_position"),
                textCoord: u.getAttribLocation(a, "a_texCoord")
            },
            h = {
                globalAlpha: u.getUniformLocation(a, "u_globalAlpha"),
                backgroundColour: u.getUniformLocation(a, "u_backgroundColour"),
                textures: u.getUniformLocation(a, "u_image")
            };
        return o.finish = function() {
            e.Utils.finishProgram(u, a)
        }, o.drawItems = function(e, t, o, l) {
            u.useProgram(a), i(e, o), n(l || f), r(t, 0), u.drawArrays(u.TRIANGLES, 0, 6)
        }, o
    })
}(),
function() {
    KeyLines.TimeBar.Config = {};
    var e = KeyLines.TimeBar.Config;
    e.create = function() {
        function e(e, t) {
            return f.format(e, t, y.options.locale)
        }

        function t(t, n) {
            var r = new Date(f.add(t, h.year, n - 1));
            return e(t, "yyyy - ") + e(r, "yyyy")
        }

        function n(e) {
            return t(e, 10)
        }

        function r(e) {
            return t(e, 50)
        }

        function i(t) {
            return e(t, "yyyy") + "s"
        }

        function a(t) {
            var n = "dmy" === y.options.locale.order ? "d MMM yyyy" : "MMM d, yyyy";
            return e(t, n)
        }

        function o(t) {
            var n = y.options.locale.h12 ? "h:mm tt" : "HH:mm";
            return e(t, n)
        }

        function l(t) {
            var n = y.options.locale.h12 ? "h:mm:ss tt" : "HH:mm:ss";
            return e(t, n)
        }

        function u(e, t) {
            if ("histogram" === e) {
                if (!d.isNormalObject(t)) return !1;
                if (t.colour && !g.validatergb(t.colour)) return !1;
                if (t.highlightColour && !g.validatergb(t.highlightColour)) return !1
            }
            return "minScale" === e ? t : d.contains(m.colours, e) ? g.validatergb(t) : !0
        }

        function c(e, t) {
            "fontFamily" === e && (y.options.fontFamily = g.pickFirstFamily(t) || v.fontFamily), "fontSize" === e && d.isNumber(+t) && +t > 0 && (y.options.fontSize = +t)
        }

        function s(e) {
            e.showPlay ? y.playingExtend = !1 : e.showExtend ? y.playingExtend = !1 : y.playingExtend = null
        }
        var f = KeyLines.DateTime,
            d = KeyLines.Util,
            g = KeyLines.Rendering,
            h = f.units,
            v = {
                fontFamily: "sans-serif",
                fontSize: 12
            },
            m = {
                colours: ["backColour", "fontColour", "sliderColour", "sliderLineColour"]
            },
            y = {
                displayTime: function(t, n) {
                    return d.isFunction(n) ? n(t) : e(t, n)
                },
                baseRangeLimits: {
                    max: 315576e7,
                    min: 3e3
                },
                options: {
                    scale: {
                        highlightColour: "#F2F2F2",
                        showMajor: !0,
                        showMinor: !0
                    },
                    backColour: "#FFFFFF",
                    fontColour: g.colours.grey,
                    fontFamily: v.fontFamily,
                    fontSize: v.fontSize,
                    showControlBar: !0,
                    showPlay: !0,
                    showExtend: !1,
                    showFit: !0,
                    sliderColour: "rgba(255, 255, 255, 0.6)",
                    sliderLineColour: "#bbb",
                    sliders: "fixed",
                    maxRange: "auto",
                    minRange: 3e3,
                    minScale: {
                        units: "sec",
                        value: 1
                    },
                    showSliders: !0,
                    showShadowCanvas: !1,
                    histogram: {
                        colour: "#d0d0d0",
                        highlightColour: "#a9a9a9"
                    },
                    heightChange: {
                        animate: !0,
                        time: 200
                    },
                    locale: d.defaults(f.defaultLocale, {
                        order: "mdy",
                        h12: !0
                    }),
                    playSpeed: 60
                },
                getOptions: function() {
                    return d.clone(y.options)
                },
                setOptions: function(e) {
                    d.isNormalObject(e) && (s(e), d.forEach(e, function(t, n) {
                        d.objectHasOwnProperty(y.options, n) && (v[n] ? c(n, t) : d.isNormalObject(y.options[n]) && u(n, t) ? y.options[n] = d.defaults(t, y.options[n]) : y.options[n] = e[n])
                    }))
                },
                hoverTime: 50,
                defaultAnimationTime: 200,
                sliderReleaseTime: 200,
                doubleClickZoomTime: 500,
                doubleClickZoomTimeFree: 250,
                playingExtend: !1,
                defaultPlaySpeed: 60,
                bars: {
                    defaultFontFamily: v.fontFamily,
                    defaultFontSize: v.fontSize,
                    major: {
                        height: 19,
                        textbase: 3,
                        tickHeight: 10
                    },
                    minor: {
                        height: 17,
                        textbase: 0,
                        tickHeight: 8
                    }
                },
                grip: {
                    lines: 2,
                    space: 4,
                    length: 14,
                    margin: 2
                },
                controlbar: {
                    height: 30,
                    space: 4,
                    colour: "#ddd"
                },
                fixedSideFactor: .5,
                freeSideFactor: .2,
                histogram: {
                    dy: 2,
                    topdy: 16,
                    bardx: 1,
                    minwidth: 11
                },
                selection: {
                    maxNumber: 3,
                    reducingFactor: .75,
                    dotsize: 3.5
                },
                rates: [{
                    max: 6,
                    major: {
                        units: h.sec,
                        by: 2,
                        f: a
                    },
                    minor: {
                        units: h.sec,
                        by: 1,
                        f: l
                    }
                }, {
                    max: 15,
                    major: {
                        units: h.sec,
                        by: 5,
                        f: a
                    },
                    minor: {
                        units: h.sec,
                        by: 1,
                        f: l
                    }
                }, {
                    max: 24,
                    major: {
                        units: h.sec,
                        by: 10,
                        f: a
                    },
                    minor: {
                        units: h.sec,
                        by: 2,
                        f: l
                    }
                }, {
                    max: 60,
                    major: {
                        units: h.sec,
                        by: 15,
                        f: a
                    },
                    minor: {
                        units: h.sec,
                        by: 5,
                        f: l
                    }
                }, {
                    max: 120,
                    major: {
                        units: h.sec,
                        by: 30,
                        f: a
                    },
                    minor: {
                        units: h.sec,
                        by: 10,
                        f: l
                    }
                }, {
                    max: 360,
                    major: {
                        units: h.min,
                        by: 1,
                        f: a
                    },
                    minor: {
                        units: h.sec,
                        by: 30,
                        f: l
                    }
                }, {
                    max: 1e3,
                    major: {
                        units: h.min,
                        by: 5,
                        f: a
                    },
                    minor: {
                        units: h.min,
                        by: 1,
                        f: o
                    }
                }, {
                    max: 5e3,
                    major: {
                        units: h.min,
                        by: 15,
                        f: a
                    },
                    minor: {
                        units: h.min,
                        by: 5,
                        f: o
                    }
                }, {
                    max: 15e3,
                    major: {
                        units: h.hour,
                        by: 1,
                        f: a
                    },
                    minor: {
                        units: h.min,
                        by: 15,
                        f: o
                    }
                }, {
                    max: 6e4,
                    major: {
                        units: h.hour,
                        by: 6,
                        f: a
                    },
                    minor: {
                        units: h.hour,
                        by: 1,
                        f: o
                    }
                }, {
                    max: 12e4,
                    major: {
                        units: h.day,
                        by: 1,
                        f: a,
                        adjust: 432e5
                    },
                    minor: {
                        units: h.hour,
                        by: 2,
                        f: o
                    }
                }, {
                    max: 18e4,
                    major: {
                        units: h.day,
                        by: 1,
                        f: a,
                        adjust: 432e5
                    },
                    minor: {
                        units: h.hour,
                        by: 3,
                        f: o
                    }
                }, {
                    max: 36e4,
                    major: {
                        units: h.day,
                        by: 1,
                        f: a
                    },
                    minor: {
                        units: h.hour,
                        by: 6,
                        f: o
                    }
                }, {
                    max: 72e4,
                    major: {
                        units: h.day,
                        by: 1,
                        f: a
                    },
                    minor: {
                        units: h.hour,
                        by: 12,
                        f: "ttt"
                    }
                }, {
                    max: 5e6,
                    major: {
                        units: h.week,
                        by: 1,
                        f: function(t) {
                            var n, r, i = new Date(t),
                                a = new Date(f.add(t, h.day, 6)),
                                o = "dmy" === y.options.locale.order;
                            return i.getUTCFullYear() === a.getUTCFullYear() ? i.getUTCMonth() === a.getUTCMonth() ? (n = o ? "d - " : "MMM d - ", r = o ? "d MMM yyyy" : "d, yyyy") : (n = o ? "d MMM - " : "MMM d - ", r = o ? "d MMM yyyy" : "MMM d, yyyy") : (n = o ? "d MMM yyyy - " : "MMM d, yyyy - ", r = o ? "d MMM yyyy" : "MMM d, yyyy"), e(i, n) + e(a, r)
                        }
                    },
                    minor: {
                        units: h.day,
                        by: 1,
                        f: "d"
                    }
                }, {
                    max: 15e6,
                    major: {
                        units: h.month,
                        by: 1,
                        f: "MMMM yyyy"
                    },
                    minor: {
                        units: h.week,
                        by: 1,
                        f: function(t) {
                            var n = f.add(t, h.day, 6);
                            return e(t, "d - ") + e(n, "d")
                        }
                    }
                }, {
                    max: 3e7,
                    major: {
                        units: h.month,
                        by: 3,
                        f: "Q  yyyy"
                    },
                    minor: {
                        units: h.month,
                        by: 1,
                        f: "MMMM"
                    }
                }, {
                    max: 75e6,
                    major: {
                        units: h.month,
                        by: 3,
                        f: "Q  yyyy"
                    },
                    minor: {
                        units: h.month,
                        by: 1,
                        f: "MMM"
                    }
                }, {
                    max: 1e8,
                    major: {
                        units: h.month,
                        by: 3,
                        f: "Q  yyyy"
                    },
                    minor: {
                        units: h.month,
                        by: 1,
                        f: "MMMMM"
                    }
                }, {
                    max: 2e8,
                    major: {
                        units: h.month,
                        by: 6,
                        f: "QQ  yyyy"
                    },
                    minor: {
                        units: h.month,
                        by: 1,
                        f: "MMMMM"
                    }
                }, {
                    max: 36e7,
                    major: {
                        units: h.year,
                        by: 1,
                        f: "yyyy"
                    },
                    minor: {
                        units: h.month,
                        by: 3,
                        f: "Q"
                    }
                }, {
                    max: 6e8,
                    major: {
                        units: h.year,
                        by: 1,
                        f: "yyyy"
                    },
                    minor: {
                        units: h.month,
                        by: 6,
                        f: "QQ"
                    }
                }, {
                    max: 15e8,
                    major: {
                        units: h.year,
                        by: 10,
                        f: n
                    },
                    minor: {
                        units: h.year,
                        by: 1,
                        f: "'yy"
                    }
                }, {
                    max: 25e8,
                    major: {
                        units: h.year,
                        by: 10,
                        f: n
                    },
                    minor: {
                        units: h.year,
                        by: 2,
                        f: "'yy"
                    }
                }, {
                    max: 35e8,
                    major: {
                        units: h.year,
                        by: 10,
                        f: n
                    },
                    minor: {
                        units: h.year,
                        by: 5,
                        f: "'yy"
                    }
                }, {
                    max: 115e8,
                    major: {
                        units: h.year,
                        by: 50,
                        f: r
                    },
                    minor: {
                        units: h.year,
                        by: 10,
                        f: "'yy"
                    }
                }, {
                    max: 2e10,
                    major: {
                        units: h.year,
                        by: 50,
                        f: r
                    },
                    minor: {
                        units: h.year,
                        by: 25,
                        f: "'yy"
                    }
                }, {
                    max: 35e9,
                    major: {
                        units: h.year,
                        by: 100,
                        f: i
                    },
                    minor: {
                        units: h.year,
                        by: 25,
                        f: "'yy"
                    }
                }, {
                    max: 8e10,
                    major: {
                        units: h.year,
                        by: 100,
                        f: i
                    },
                    minor: {
                        units: h.year,
                        by: 50,
                        f: "'yy"
                    }
                }, {
                    max: 16e10,
                    major: {
                        units: h.year,
                        by: 200,
                        f: "yyyy"
                    },
                    minor: {
                        units: h.year,
                        by: 100,
                        f: ""
                    }
                }, {
                    max: 4e11,
                    major: {
                        units: h.year,
                        by: 500,
                        f: "yyyy"
                    },
                    minor: {
                        units: h.year,
                        by: 100,
                        f: ""
                    }
                }, {
                    max: 1 / 0,
                    major: {
                        units: h.year,
                        by: 500,
                        f: ""
                    },
                    minor: {
                        units: h.year,
                        by: 100,
                        f: ""
                    }
                }]
            };
        return y
    }
}(),
function() {
    KeyLines.Canvas = {};
    var e = KeyLines.Canvas,
        t = 8888;
    e.getDevicePixelRatio = function() {
        return "undefined" != typeof window ? window.devicePixelRatio || 1 : void 0
    };
    var n = e.getDevicePixelRatio;
    e.create = function(e, r, i, a, o, l, u) {
        function c(e, t, n) {
            var r = document.createElement("canvas");
            n && y && (r.dir = "rtl", document.body.appendChild(r), r.style.display = "none");
            var i;
            return i = u ? document.createElement("canvas").getContext("2d") : r.getContext("2d"), r.context2d = i, r.height = t, r.width = e, u || g(r), r
        }

        function s(e, t) {
            var r = n(),
                i = t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1,
                a = r / i;
            if (r !== i) {
                var o = e.width,
                    l = e.height;
                e.width = Math.round(o * a), e.height = Math.round(l * a), e.style.width = o + "px", e.style.height = l + "px", u || t.scale(a, a)
            }
        }

        function f() {
            if (!KeyLines.Rendering.rtlBugChecked) {
                var e = 100,
                    t = 30,
                    n = c(e, t);
                document.body.appendChild(n), n.setAttribute("dir", "rtl");
                var r = n.context2d;
                r.fillStyle = "#000", r.fillRect(0, 0, e, t), r.textAlign = "center", r.fillStyle = "#fff", r.font = "20px sans-serif", r.fillText("\u2588", e / 2, t);
                var i = r.getImageData(e / 2, t - 1, 1, 1).data;
                KeyLines.Rendering.rtlBugPresent = 0 === i[0], document.body.removeChild(n), KeyLines.Rendering.rtlbugChecked = !0
            }
        }

        function d() {
            if (!KeyLines.Rendering.minimumFontChecked) {
                for (var e = "Hello", t = c(100, 100).context2d, n = !1, r = function(n) {
                        return KeyLines.Rendering.setFont(t, n), t.measureText(e).width
                    }, i = r(1), a = 2; !n && 30 > a;) {
                    var o = r(a);
                    n = i !== o, n && (KeyLines.Rendering.browserMinimumFontSize = a - 1), a++
                }
                KeyLines.Rendering.minimumFontChecked = !0
            }
        }

        function g(e) {
            function t(e) {
                n.setLineDash = function(t) {
                    n[e] = t
                }
            }
            var n = e.getContext("2d");
            n.setLineDash || ("undefined" != typeof n.webkitLineDash ? t("webkitLineDash") : "undefined" != typeof n.mozDash && t("mozDash"))
        }

        function h() {
            return document.createElement("img")
        }

        function v() {
            w.update(), G(v)
        }
        var m = document.getElementById(r),
            y = KeyLines._rtlTest(m),
            b = c(i, a, !0);
        b.style.display = "block";
        var p = {},
            I = b.context2d;
        m.style.display = "block", m.parentNode.replaceChild(b, m), b.setAttribute("id", r), u && KeyLines.webGLSupport() && "chart" === e && (b.renderer = KeyLines.WebGL.create(b), p.renderer = b.renderer, b.webgl = !0), b.canvas = !0;
        var x = b;
        b.webgl ? (I.webgl = !0, I.webglCanvas = b) : I.webgl = !1, s(b, I), d(), f();
        var C = x.getAttribute("style") || "";
        C += "-ms-touch-action: none; touch-action: none; outline: none;", x.setAttribute("style", C), x.setAttribute("tabindex", "" + t++);
        var w = "chart" === e ? KeyLines.API.createAPI(r) : KeyLines.TimeBar.API.createAPI(r);
        KeyLines.Util.forEach(w, function(e, t) {
            -1 === t.indexOf("private") && (p[t] = e)
        }), w.privateInit(I, i, a, c, function(e) {
            document.getElementById(r).style.cursor = e
        }, h, o, l), p.internalSetSize = function(e, t) {
            w.privateMapSetSize && w.privateMapSetSize(e, t), x.width = e, x.height = t, s(x, I), w.privateSetSize(I, e, t, !0)
        };
        var G = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
                KeyLines.Util.nextTick(e, 1e3 / 60)
            }
        }();
        return G(v), p
    }
}(),
function() {
    KeyLines.Model = {};
    var e = KeyLines.Model;
    e.updatePositionBufferProps = {
        w: 1,
        x: 1,
        y: 1,
        fs: 1,
        bw: 1,
        b1: 1,
        b2: 1
    };
    var t = e.updatePositionBufferProps;
    e.createModel = function(e, n, r, i) {
        function a() {
            He(), re = null, ae = null
        }

        function o(e) {
            de.forEach(Be, function(t) {
                v(t, e)
            }), de.forEach(Ae, function(t) {
                v(t, e)
            })
        }

        function l(e, t) {
            var n, r = 1 === e ? t.id1 : t.id2;
            return n = void 0 !== ce[t.id] ? Oe(r) : Ae[r], {
                x: n.x,
                y: n.y
            }
        }

        function u(e) {
            ke = !1, Le = !1, Ee = e || {}, Se = 0
        }

        function c(e) {
            Ee[e] || (Se++, Ee[e] = Re)
        }

        function s() {
            return ke || Le ? !0 : de.hasAnyKeys(Ee)
        }

        function f(e, t) {
            for (var n = {}, r = e.slice(0); r.length > 0;) {
                var i = r.shift(),
                    a = Ae[i];
                if (a && !n[i] && (n[i] = !0, t(a), a._combo))
                    for (var o = a._combo.nodeIds, l = 0, u = o.length; u > l; l++) n[o[l]] || r.push(o[l])
            }
        }

        function d() {
            Ze = null
        }

        function g(e) {
            Object.keys(e).forEach(function(t) {
                Ze.push(e[t])
            })
        }

        function h(e) {
            de.forEach(e, function(t, n) {
                de.isNullOrUndefined(t) && delete e[n]
            })
        }

        function v(e, t) {
            e[t] && it(e.id)
        }

        function m(e) {
            return e && !!e._parentId
        }

        function y(e, t, n) {
            for (var r = "x" === t || "y" === t ? c : Fe, i = 0; i < e.length; i++) {
                var a = e[i],
                    o = Ae[a],
                    l = Be[a];
                o ? (o[t] = n, r(a)) : l && (l[t] = n, Fe(a))
            }
        }

        function b(e, t) {
            var n = !1;
            return Ae[e] && (n = I(Ae[e], t)), Be[e] && (n = I(Be[e], t)), n
        }

        function p(e) {
            return lt(e) && !b(e, "gh")
        }

        function I(e, t) {
            return !!e[t]
        }

        function x(e, t, n) {
            var r = de.ensureArray(e);
            y(r, t, !1);
            var i;
            if (Te.ensureConsistency(t, Ae, Be), n) {
                var a = {},
                    o = {};
                for (i = 0; i < r.length; i++) a[r[i]] = 1;
                de.forEach(Be, function(e) {
                    if (I(e, t) && !I(Ae[e.id1], t) && !I(Ae[e.id2], t) && (a[e.id1] || a[e.id2])) {
                        e[t] = !1;
                        var n = e._parentId;
                        n && Be[n] && (o[n] = !0)
                    }
                }), Te.applyPropertyRuleToComboLinks(o, t, Be)
            }
        }

        function C(e) {
            var t = [];
            return de.forEach(Ae, function(n, r) {
                n[e] && t.push(r)
            }), de.forEach(Be, function(n, r) {
                n[e] && t.push(r)
            }), t
        }

        function w(e, t) {
            var n = de.ensureArray(e);
            y(n, t, !0), Te.ensureConsistency(t, Ae, Be)
        }

        function G() {
            var e = [];
            return Ue().forEach(function(t) {
                t._combo || e.push(de.clone(t, "d"))
            }), e
        }

        function A(e, n, r, i) {
            var a, o, l, u, s;
            for (a = 0; a < e.length; a++) {
                o = de.rawId(e[a].id), u = [], o && (n ? (s = new RegExp(o, "im"), de.forEach(Ae, function(e, t) {
                    s.test(t) && u.push(e)
                }), de.forEach(Be, function(e, t) {
                    s.test(t) && u.push(e)
                })) : (Ae[o] && u.push(Ae[o]), Be[o] && u.push(Be[o])));
                var f = de.clone(e[a]);
                for (delete f.id, delete f.type, l = 0; l < u.length; l++) {
                    var d = !0,
                        g = u[l];
                    if (!i && "node" === g.type && (void 0 !== f.x || void 0 !== f.y)) {
                        var v = void 0 === f.x ? g.x : f.x,
                            m = void 0 === f.y ? g.y : f.y;
                        Ge.moveNode(g.id, v, m)
                    }
                    de.forEach(f, function(e, n) {
                        switch (d && "x" !== n && "y" !== n && (d = !1), n) {
                            case "id1":
                            case "id2":
                                if (e !== g[n]) throw Error("You cannot change the ends of an existing link");
                                break;
                            case "hi":
                            case "_parentId":
                                r.all = !0, r.hi = !0, g[n] = e;
                                break;
                            case "oc":
                                r.all = !0, Object.keys(f[n]).forEach(function(e) {
                                    g[n][e] = f[n][e]
                                });
                                break;
                            default:
                                ge.haloPropMap[n] && (g._noHalos = !1), t[n] ? r.positions = !0 : r.all = !0, g[n] = e
                        }
                    }), h(g), d ? c(g.id) : Fe(g.id)
                }
            }
        }

        function B(e) {
            var t = {};
            return de.forEach(e, function(e, n) {
                e && "undefined" == typeof e.off && (t[n] = e)
            }), t
        }

        function Z() {
            var e = M(Ae);
            return e = M(Be) || e
        }

        function R(e) {
            var t = !1;
            return e.forEach(function(e) {
                e && e.g && e.g.forEach(function(e) {
                    t = E(e) || t
                })
            }), t
        }

        function M(e) {
            var t = !1;
            return de.forEach(e, function(e) {
                t = E(e) || t, t = R([e, e.t1, e.t2]) || t, e.bu && (t = E(e.bu.g) || t)
            }), t
        }

        function E(e) {
            if (e) {
                var t = e.u;
                if (t && !(t in et)) return et[t] = 1, !0
            }
        }

        function k() {
            Ve && Ve.clearCache()
        }

        function L() {
            re = {}, ie = 0;
            for (var e = Object.keys(Ae), t = 0, n = e.length; n > t; t++) {
                var r = e[t],
                    i = Ae[r];
                !i.hi && Je(r, !0) && (re[r] = i, ie++)
            }
        }

        function S() {
            ae = {};
            for (var e = Object.keys(Be), t = 0, n = e.length; n > t; t++) {
                var r = e[t],
                    i = Be[r],
                    a = !i.hi;
                a && (a = vt(r) ? Qe(r) : Je(r, !0), a && (ae[r] = i))
            }
        }

        function W() {
            re || (L(), S())
        }

        function V() {
            ke || (Se > 100 ? Se >= ie ? Le = !0 : X() : Ne().internalMarkLinks(Ee))
        }

        function X() {
            de.forEach(ae, function(e, t) {
                Ee[t] || (Ee[e.id1] || Ee[e.id2]) && (Ee[t] = Me)
            })
        }

        function F(t) {
            t.forEach(function(t) {
                var n = e.privateGetItem(t);
                n && (n._combo || n._parentId) && e.privateSetAllItemsInComboDirty([e.privateGetTopItemId(n.id)])
            })
        }

        function T(e) {
            de.forEach(e, function(e, t) {
                rt(t, !0)
            })
        }

        function N(e) {
            var t = KeyLines.Graph.create(n);
            return t.privateSetProperties(Ae, e), t
        }

        function H(e) {
            var t = de.defaults(e, {
                all: !1,
                self: !0,
                combos: "all"
            });
            return Ne().connections(t)
        }

        function Y(e, t) {
            var n = [],
                r = {};
            if (de.hasAnyKeys(e)) {
                var i = N(e).findAdjacency;
                n = H();
                for (var a = 0; a < n.length; a++) {
                    var o = Be[n[a][0]];
                    i({
                        all: !0,
                        combos: "all"
                    }, o.id1, o.id2) && (r[a] = 1)
                }
            }
            t(n, r)
        }

        function U(e, t) {
            function n(e, t) {
                r.push({
                    id: e.id,
                    off: t
                })
            }
            var r = [];
            return bt(e, t, n), r
        }

        function K(e) {
            for (var t = {}, n = 0; n < e.length; n++) {
                var r = e[n],
                    i = Be[r];
                i && (t[r] = i)
            }
            return t
        }

        function z(e) {
            P(H(e))
        }

        function O() {
            de.forEach(Be, function(e) {
                delete e.st
            })
        }

        function D(e, t, n, r, i) {
            function a(e) {
                var t = 1e6,
                    n = de.defined(e.off) ? e.off : t,
                    r = u(e);
                return r.id1 > r.id2 && (n = l(-n)), n
            }

            function o(e, t) {
                return a(Be[e]) - a(Be[t])
            }

            function l(e) {
                return 0 === e ? 0 : e
            }
            var u = r || function(e) {
                return e
            };
            de.forEach(t || e, function(t, r) {
                var a = e[+r];
                if (n || (a = a.filter(function(e) {
                        return !Be[e].gh
                    })), a.length > 0) {
                    a.sort(o);
                    for (var c = u(Be[a[0]]), s = c.id1 === c.id2, f = a.length, d = s ? 20 : 40, g = s ? 0 : -.5 * d * (f - 1), h = 0; f > h; h++) {
                        var v = Be[a[h]],
                            m = u(v),
                            y = g + h * d;
                        y = m.id1 <= m.id2 ? y : -y, i(v, l(y))
                    }
                }
            })
        }

        function _(e, t) {
            e.off = t, Fe(e.id)
        }

        function P(e, t) {
            D(e, t, !0, null, _)
        }

        function j(e, t, n) {
            function r(e, t) {
                i.push({
                    id: e.id,
                    off: t
                })
            }
            var i = [];
            return D(e, t, n, null, r), i
        }

        function J() {
            for (var e = H(), t = {}, n = 0; n < e.length; n++) {
                var r = !1,
                    i = e[n];
                if (i.length > 1) {
                    for (var a = 0; a < i.length; a++) {
                        var o = Be[i[a]];
                        o && (r = r || de.defined(o.off))
                    }
                    r || (t[n] = 1)
                }
            }
            P(e, t)
        }

        function Q(e) {
            return (e + "").match(ft)
        }

        function q(e) {
            var t = Q(e);
            return dt[t[2]]
        }

        function $(e) {
            var t = Q(e);
            return t ? t[1] : null
        }

        function ee() {
            for (var e = [], t = 0, n = nt.length; n > t; t++) {
                var r = nt[t],
                    i = Ae[r];
                i && i._parentId && e.push($e(i._parentId))
            }
            return e
        }

        function te(e) {
            var t = Be[e];
            return t && !t._combo
        }

        function ne(e, t, n) {
            de.forEach(e, function(e) {
                var r, i = Oe(e.id1),
                    a = Oe(e.id2);
                null !== i && null !== a && i !== a && (r = i.id > a.id ? i.id + a.id : a.id + i.id, void 0 === t[r] && (t[r] = []), t[r].push(e.id), n[e.id] = {
                    id1: i.id,
                    id2: a.id
                })
            })
        }
        var re, ie, ae, oe, le, ue, ce = {},
            se = KeyLines.Common,
            fe = KeyLines.Rendering,
            de = KeyLines.Util,
            ge = KeyLines.Validation,
            he = {
                x: 1,
                y: 1,
                w: 1,
                h: 1,
                e: 1,
                fs: 1,
                off: 1,
                b1: 1,
                b2: 1,
                bw: 1
            },
            ve = {
                t: 1,
                u: 1,
                id: 1,
                id1: 1,
                id2: 1,
                ff: 1,
                sh: 1,
                ls: 1,
                bs: 1
            },
            me = {
                c: 1,
                b: 1,
                fc: 1,
                fbc: 1
            },
            ye = {
                p: 1
            },
            be = {
                hi: 1,
                bg: 1,
                ci: 1,
                du: 1,
                fb: 1,
                a1: 1,
                a2: 1,
                re: 1,
                tc: 1,
                a: 1
            },
            pe = {
                gh: 1
            },
            Ie = {
                pos: 1
            },
            xe = {
                x: 1,
                y: 1,
                off: 1,
                lat: 1,
                lng: 1
            },
            Ce = {
                ls: {
                    solid: !0,
                    dashed: !0,
                    dotted: !0
                },
                bs: {
                    solid: !0,
                    dashed: !0
                }
            },
            we = ["ha0", "ha1", "ha2", "ha3", "ha4", "ha5", "ha6", "ha7", "ha8", "ha9"],
            Ge = {},
            Ae = {},
            Be = {},
            Ze = null,
            Re = 1,
            Me = 2,
            Ee = {},
            ke = !1,
            Le = !1,
            Se = 0,
            We = de.idSep(),
            Ve = null,
            Xe = KeyLines.Layouts.create(e);
        Ge.setDirty = function(e) {
            Ee[e] || Se++, Ee[e] = Me
        };
        var Fe = Ge.setDirty,
            Te = ge.create({
                numbers: he,
                numOrString: ye,
                negatives: xe,
                strings: ve,
                stringValues: Ce,
                colours: me,
                booleans: be,
                reserved: pe,
                mapPos: Ie,
                halos: we
            }, Fe, a, o);
        Ge.graph = function() {
            return Ve || (Ve = KeyLines.Graph.create(n), Ve.privateSetProperties(Ae, Be)), Ve
        };
        var Ne = Ge.graph;
        Ge.setAllDirty = function() {
            ke = !0
        };
        var He = Ge.setAllDirty;
        Ge.moveAllNodesBy = function(e, t, n) {
            f(e, function(e) {
                e.x += t, e.y += n, c(e.id)
            })
        }, Ge.moveNode = function(e, t, n) {
            var r = Ae[e];
            if (r) {
                var i = t - r.x,
                    a = n - r.y;
                r._combo ? f([e], function(e) {
                    e.x += i, e.y += a, c(e.id)
                }) : (r.x += i, r.y += a, c(r.id))
            }
        };
        var Ye = Ge.moveNode;
        Ge.moveLink = function(e, t) {
            var n = Be[e];
            n && (n.y = t, Fe(e))
        }, Ge.setLinkOffset = function(e, t) {
            var n = Be[e];
            n && (n.off = t, Fe(e))
        }, Ge.ensureObject = Te.ensureObject, Ge.ensureTypesInArray = Te.ensureTypesInArray, Ge.load = function(e) {
            if (e) {
                Ae = {}, Be = {}, ot(!0), yt(), Te.typeCheck(e, Be);
                var t = Te.filterNodesAndLinks(e.items, Ae, Be, {
                    selfLinks: le
                });
                Be = t.links, Ae = t.nodes, Ge.reveal(e.reveal, !1), Te.ensureHiddenItemConsistency(Ae, Be), Ve = null, d(), J(), He()
            }
            Z()
        }, Ge.getRawItems = function() {
            return Ze || (Ze = [], g(Be), g(Ae)), Ze
        };
        var Ue = Ge.getRawItems;
        Ge.defaultValueFor = function(e) {
            switch (e) {
                case "e":
                    return 1;
                case "fs":
                    return i.fontSize;
                case "off":
                case "b1":
                case "b2":
                    return 0;
                case "x":
                case "y":
                    return 0;
                case "w":
                case "h":
                    return 1;
                case "bw":
                    return 4;
                case "donut":
                    return de.merge({
                        v: []
                    }, Te.donutDefaults);
                case "ha0":
                case "ha1":
                case "ha2":
                case "ha3":
                case "ha4":
                case "ha5":
                case "ha6":
                case "ha7":
                case "ha8":
                case "ha9":
                    return {
                        c: fe.colours.transparent,
                        r: 0,
                        w: 0
                    };
                case "fi":
                    return {
                        c: "black",
                        t: ""
                    };
                case "oc":
                    return ge.defaultOpenComboStyle;
                case "c":
                case "b":
                    return fe.colours.midgrey;
                case "fc":
                    return fe.colours.black;
                case "fbc":
                    return fe.colours.textback;
                default:
                    return
            }
        }, Ge.bothEndsShown = function(e) {
            return e.hi ? !1 : !(Ae[e.id1].hi || Ae[e.id2].hi)
        }, Ge.neighbourLinkIds = function(e) {
            return Ne().privateNeighbourLinks(e)
        }, Ge.privateGetLinksBetween = function(e, t) {
            for (var n = Ne().privateGetLinkIdsBetween(e, t), r = [], i = n.length, a = 0; i > a; a++) r.push(Be[n[a]]);
            return r
        }, Ge.bothEndsForeground = function(e) {
            return !(Ae[e.id1].bg || Ae[e.id2].bg)
        }, Ge.resurrect = function(e) {
            x(e, "gh", !0)
        }, Ge.ghost = function(e) {
            w(e, "gh")
        }, Ge.show = function(e, t) {
            x(e, "hi", t), k()
        }, Ge.hidden = function() {
            return C("hi")
        }, Ge.hide = function(e) {
            w(e, "hi"), k()
        }, Ge.each = function(e, t) {
            e.type.match(/^(node|all)$/) && de.forEach(Ae, t), e.type.match(/^(link|all)$/) && de.forEach(Be, t)
        }, Ge.setItem = function(e) {
            var t = de.clone(e);
            Te.ensureObject(t, !1, Be);
            var n = null;
            if ("node" === t.type && (n = Ae), "link" === t.type && (n = Be, !Te.hasValidEnds(t, {}, Ae, le))) return !1;
            if (Te.setZeroXY(t), t.id) {
                var r = n[t.id];
                n[t.id] = t, r && (r._combo && (n[t.id]._combo = r._combo), r._parentId && (n[t.id]._parentId = r._parentId), r._offset && (n[t.id]._offset = r._offset)), t.hi ? Te.ensureHiddenItemConsistency(Ae, Be) : a(), k(), d(), Fe(t.id)
            }
            return Z()
        }, Ge.type = function() {
            return "LinkChart"
        };
        var Ke = Ge.type;
        Ge.setOptions = function(e) {
            le = e.selfLinks, ue = e.marqueeLinkSelection, i.setOptions(e), He()
        };
        var ze;
        Ge.setLastHoverId = function(e) {
            ze = e
        }, Ge.showFullLabelOnHover = function(e) {
            ze && Fe(ze), e ? (Fe(e), i.setSpecialOptions("showFullLabel", e)) : i.setSpecialOptions("showFullLabel", null)
        }, Ge.serialize = function() {
            return {
                type: Ke(),
                items: G()
            }
        }, Ge.validateCombos = function() {
            function e(e) {
                var t = e._parentId;
                if (t) {
                    var r = Ae[t] || Be[t];
                    if (!r) throw new Error("The " + e.type + " '" + e.id + "' has _parentId = '" + t + "' but the parent item is not present in the model.");
                    if (!r._combo) throw new Error("The " + e.type + " '" + e.id + "' has _parentId = '" + t + "' but the parent item has no _combo property.");
                    n[t] = n[t] || {}, n[t][e.id] = !0
                }
            }

            function t(e) {
                if (e._combo) {
                    var t = {},
                        r = (e._combo.nodeIds || []).concat(e._combo.linkIds);
                    r.forEach(function(r) {
                        t[r] = !0;
                        var i = Ae[r] || Be[r];
                        if (!i) throw new Error("The combo " + e.type + " '" + e.id + "' has a child item '" + r + "' in its _combo property, but this item is not present in the model.");
                        if (!n[e.id][r]) throw new Error("The combo " + e.type + " '" + e.id + "' has a child item '" + r + "' in its _combo property, but this item's _parentId property is " + (i._parentId ? "set to '" + i._parentId + "'" : "undefined."))
                    }), de.forEach(n[e.id], function(n, r) {
                        if (!t[r]) {
                            var i = Ae[r] || Be[r];
                            throw new Error("The " + i.type + " '" + i.id + "' has _parentId set to '" + e.id + "' but is not included in the parent's _combo property.")
                        }
                    })
                }
            }
            var n = {};
            de.forEach(Ae, e), de.forEach(Be, e), de.forEach(Ae, t), de.forEach(Be, t)
        }, Ge.unsafeApplyChanges = function(e, t, n) {
            var r, i, a;
            for (r = 0; r < e.length; r++) {
                a = e[r], i = a.id;
                var o = void 0 !== a.x,
                    l = void 0 !== a.y;
                if (!o && !l || n) a._combo && de.isNumber(a._combo.e) && Ge.moveAllNodesBy([i], 0, 0);
                else {
                    var u = o ? a.x : Ae[i].x,
                        s = l ? a.y : Ae[i].y;
                    Ge.moveNode(i, u, s)
                }
                var f = Ae[i] || Be[i];
                de.merge(f, e[r]), t ? Fe(i) : c(i)
            }
        }, Ge.setProperties = function(e, t, n, r) {
            var i = de.clone(e);
            return i = de.ensureArray(i), Te.ensureTypesInArray(i, !1, Be), A(i, t, n, r), n.hi && Te.ensureHiddenItemConsistency(Ae, Be), (n.graphCache || n.hi) && k(), Z()
        }, Ge.merge = function(e) {
            var t = de.clone(e);
            Te.ensureTypesInArray(t, !1, Be);
            var n = {
                    carefulWithXandY: !0,
                    selfLinks: le
                },
                r = Te.filterNodesAndLinks(t, Ae, Be, n);
            de.forEach(r.nodes, function(e, t) {
                Ae[t] = de.merge(Ae[t], e), Ae[t]._noHalos = !1, Fe(t)
            }), de.forEach(r.links, function(e, t) {
                Be[t] = de.merge(Be[t], e), Be[t]._noHalos = !1, Fe(t)
            }), Te.ensureHiddenItemConsistency(Ae, Be), k(), d();
            var i = B(r.links);
            ct(i);
            var a = Z();
            return a
        }, Ge.firstVisibleItemInAncestry = function(e) {
            var t = Ae[e] || Be[e];
            if (t && !t.hi) {
                if ("link" === t.type && vt(e) && Qe(e)) return t;
                var n = Ge.getParentItems(e);
                n.push(t);
                var r = null;
                return n.every(function(n) {
                    return null === n ? !1 : n.hi ? (r = null, !1) : n.id === e ? (r = t, !1) : n._combo ? (r = n, n._combo.open) : !1
                }), r
            }
            return null
        };
        var Oe = Ge.firstVisibleItemInAncestry;
        Ge.getItem = function(e) {
            return de.clone(je(e), "d")
        }, Ge.getItemsByID = function(e) {
            for (var t = de.ensureArray(e), n = [], r = 0; r < t.length; r++) {
                var i = je(t[r]);
                i = i || null, n.push(i)
            }
            return n
        };
        var De = Ge.getItemsByID;
        Ge.getAncestryIds = function(e) {
            var t = e,
                n = [];
            do {
                n.unshift(t);
                var r = je(t);
                t = r && r._parentId
            } while (t);
            return n
        };
        var _e = Ge.getAncestryIds;
        Ge.getParentItems = function(e) {
            var t = _e(e);
            return t.pop(), De(t)
        };
        var Pe = Ge.getParentItems;
        Ge.getByID = function(e) {
            var t = de.rawId(e);
            return Ae[t] || Be[t] || null
        };
        var je = Ge.getByID;
        Ge.allParentsOpen = function(e, t) {
            var n = je(e);
            return n._parentId ? Pe(e).every(function(e) {
                return e._combo.open && (t ? !e.hi : !0)
            }) : !0
        };
        var Je = Ge.allParentsOpen,
            Qe = function(e) {
                var t = Be[e];
                if (t && !t.hi) {
                    if (t._parentId) {
                        if (qe(t._parentId)) {
                            var n = Oe(t.id1);
                            if (t.id1 === t.id2 && n) return !0;
                            var r = Oe(t.id2);
                            return n && r && n.id !== r.id
                        }
                        return !1
                    }
                    return !0
                }
                return !1
            };
        Ge.allParentsVisible = function(e) {
            var t = je(e);
            return t._parentId ? Pe(e).every(function(e) {
                return !e.hi
            }) : !0
        };
        var qe = Ge.allParentsVisible;
        Ge.topParentId = function(e) {
            for (var t = e, n = je(t), r = n && n._parentId; r;) t = r, n = je(t), r = n ? n._parentId : null, t === r && (r = null);
            return t
        };
        var $e = Ge.topParentId,
            et = {};
        Ge.imageList = function(e) {
            var t = {
                updated: !1,
                _coList: {}
            };
            return de.forEach(et, function(n, r) {
                t[e + r] = 1
            }), t
        }, Ge.generate = function(e, t, n, r, a, o) {
            var l, c = n.getUnzoom(),
                f = c !== oe;
            return f && He(), s() && (W(), V(), l = i.generate(re, ae, ke, Le, Ee, e, t, n, r, a, at, vt, o), u(l.stillDirty), oe = c), i.generateHandles(e, t, n, nt), i.animated() || l && l.rebuildAll || f
        }, Ge.contains = function(e) {
            return i.contains(e, Ae).filter(function(e) {
                return !m(Ae[e])
            })
        }, Ge.animated = function() {
            return i.animated()
        };
        var tt = {},
            nt = [];
        Ge.setSelection = function(e, t, n) {
            var r = de.rawId(e);
            t || n || ot(r), tt[r] ? t && it(r) : rt(r)
        }, Ge.addToSelection = function(e, t) {
            var r = de.rawId(e);
            r && (tt[r] || p(r) && (F([r]), tt[r] = 1, nt.push(r), Fe(r), t || n.trigger("selectionchange")))
        };
        var rt = Ge.addToSelection;
        Ge.removeFromSelection = function(e, t) {
            var r = de.rawId(e);
            if (tt[r]) {
                F([r]), Fe(r), delete tt[r];
                var i = nt.indexOf(r);
                i > -1 && nt.splice(i, 1), t || n.trigger("selectionchange")
            }
        };
        var it = Ge.removeFromSelection;
        Ge.hasSelection = function() {
            return nt.length > 0
        }, Ge.isSelected = function(e) {
            return e in tt
        };
        var at = Ge.isSelected;
        Ge.clearSelection = function(e) {
            for (var t = 0; t < nt.length; t++) Fe(nt[t]);
            F(nt), tt = {}, nt = [], e || n.trigger("selectionchange")
        };
        var ot = Ge.clearSelection,
            lt = function(e) {
                return W(), re[e] || ae[e]
            };
        Ge.isItemShown = lt, Ge.selectAll = function() {
            T(Ae), T(Be), n.trigger("selectionchange")
        }, Ge.doSelection = function(e) {
            if (e) {
                ot(!0);
                for (var t = 0; t < e.length; t++) rt(e[t], !0)
            }
            return de.clone(nt)
        };
        var ut = Ge.doSelection;
        Ge.privateSelection = function() {
            return tt
        }, Ge.moveSelection = function(e, t) {
            var n = [];
            tt && (de.forEach(Ae, function(e, t) {
                at(t) && !m(e) && n.push(t)
            }), de.forEach(Be, function(e, t) {
                at(t) && (Ae[e.id1].du && n.push(e.id1), Ae[e.id2].du && n.push(e.id2))
            }));
            for (var r = 0; r < n.length; r++) {
                var i = Ae[n[r]];
                Ge.moveNode(n[r], i.x + e, i.y + t)
            }
        }, Ge.removeItem = function(e) {
            var t, n = de.ensureArray(e);
            if (n.length > 0) {
                for (var r = {}, i = {}, o = 0; o < n.length; o++) t = n[o], Be[t] && (r[t] = Be[t]), Ae[t] && (i[t] = 1);
                de.forEach(Be, function(e, t) {
                    (i[e.id1] || i[e.id2]) && (r[t] = e)
                }), de.forEach(r, function(e, t) {
                    it(t, !0), mt(t), Fe(t), delete Be[t]
                }), de.forEach(i, function(e, t) {
                    it(t, !0), Fe(t), delete Ae[t]
                }), k(), d(), ct(r), a()
            }
        }, Ge.selectionPlusDummyNodes = function() {
            for (var e = ut(), t = 0; t < e.length; t++) {
                var n = Be[e[t]];
                n && (Ae[n.id1].du && e.push(n.id1), Ae[n.id2].du && e.push(n.id2))
            }
            return e
        }, Ge.resetConnectionOffsets = function(e) {
            n.trigger("redraw", {
                all: !0
            }), Y(e, P), bt(e)
        };
        var ct = Ge.resetConnectionOffsets,
            st = function(e, t) {
                var n;
                return Y(e, function(e, r) {
                    n = j(e, r, t)
                }), n
            };
        Ge.showHideBendLinks = function(e) {
            var t = K(e);
            ct(t)
        }, Ge.showHideGetLinksToBend = function(e, t) {
            var n = K(e),
                r = st(n, t),
                i = U(n, t);
            if (i.length > 0) {
                var a = de.makeDictionary(i);
                r = r.filter(function(e) {
                    return void 0 === a[e.id]
                }).concat(i)
            }
            for (var o = [], l = 0; l < r.length; l++) {
                var u = r[l];
                Be[u.id].off !== u.off && o.push(u)
            }
            return o
        }, Ge.getCursor = function(e, t) {
            var n = $(e);
            return n ? n : e ? 'url("' + t + 'openhand.cur"), pointer' : "auto"
        }, Ge.getResizePrimitive = function() {
            return i.getResizePrimitive()
        };
        var ft = new RegExp(We + "((\\S+)(?:\\-resize))$"),
            dt = {
                nw: ["x1", "y1"],
                n: ["y1"],
                ne: ["x2", "y1"],
                e: ["x2"],
                se: ["x2", "y2"],
                s: ["y2"],
                sw: ["x1", "y2"],
                w: ["x1"]
            },
            gt = new RegExp(We + "(id[1|2])$");
        Ge.startDragger = function(e, t, n, i, a, o) {
            var l = (o + "").match(gt),
                u = de.rawId(n);
            return r.createLinkEndDragger(e, Ge, t, Ae, Be[u], l[1], i, a, u)
        }, Ge.createDragger = function(e, t, i, a, o, u, c, s) {
            var f = c.handMode,
                d = de.rawId(a),
                g = Q(a);
            if (g) {
                var h = q(a),
                    v = s,
                    m = Ae[d]._combo && Ae[d]._combo.open;
                return r.primitiveMover(fe, t, i, d, v, !0, h, o, u, m, function(e) {
                    n.trigger("prechange", "resize");
                    var t = Ae[de.rawId(a)],
                        r = e.a,
                        i = r ? r.x : 0,
                        o = r ? r.y : 0;
                    if (m) t.oc.w = 2 * e.r;
                    else if ("C" === e.p) t.x = i + e.x, t.y = o + e.y, t.w = 2 * e.r, t.h = t.w;
                    else {
                        var l = i + e.x1,
                            u = o + e.y1,
                            c = i + e.x2,
                            s = o + e.y2;
                        t.x = l + Math.floor((c - l) / 2), t.y = u + Math.floor((s - u) / 2), t.w = c - l, t.h = s - u
                    }
                    Fe(t.id)
                })
            }
            if (null !== d && Be[d] && "h" !== Be[d].st) {
                if (Be[d].id1 === Be[d].id2) return null;
                var y = (a + "").match(gt);
                return y ? r.createLinkEndDragger(e, Ge, i, Ae, Be[d], y[1], o, u, d) : r.createLinkDragger(l, t, i, Ge, Be[d], o, u, d)
            }
            return f && null === a ? r.createHandDragger(i, o, u, ot) : null !== d ? (W(), r.createDefaultDragger(Ge, re, ae, at, ee, i, a, o, u)) : ht(i, o, u)
        };
        var ht = function(e, t, r) {
            function i(t, n) {
                u.x1 = Math.min(e.worldToViewX(c), t), u.y1 = Math.min(e.worldToViewY(s), n), u.x2 = Math.max(e.worldToViewX(c), t), u.y2 = Math.max(e.worldToViewY(s), n), f.x1 = e.viewToWorldX(u.x1), f.y1 = e.viewToWorldY(u.y1), f.x2 = e.viewToWorldX(u.x2), f.y2 = e.viewToWorldY(u.y2)
            }

            function a(e, t, r) {
                de.forEach(e, function(e, n) {
                    e ? rt(n, !0) : t || r ? l[n] || it(n, !0) : it(n, !0)
                }), n.trigger("redraw", {
                    all: !0
                })
            }

            function o(e, t, n, r) {
                W(), i(e, t);
                var o = {};
                de.forEach(re, function(e, t) {
                    o[t] = fe.inside(f, e.x, e.y)
                }), "off" !== ue && de.forEach(ae, function(e, t) {
                    if ("centre" === ue) o[t] = fe.inside(f, e._x, e._y);
                    else if ("ends" === ue) {
                        var n = re[e.id1],
                            r = re[e.id2];
                        o[t] = fe.inside(f, n.x, n.y) && fe.inside(f, r.x, r.y)
                    }
                }), a(o, n, r)
            }
            if (!n.trigger("dragstart", "area", null, e.unscale(t), e.unscale(r), null)) {
                var l = {};
                de.forEach(tt, function(e, t) {
                    l[t] = 1
                });
                var u = {
                        p: fe.primitives.rect,
                        x1: t,
                        y1: r,
                        x2: t,
                        y2: r,
                        bc: fe.colours.midgrey,
                        bw: 1,
                        fc: fe.colours.blue,
                        fi: !1
                    },
                    c = e.viewToWorldX(t),
                    s = e.viewToWorldY(r),
                    f = {
                        x1: c,
                        y1: s,
                        x2: c,
                        y2: s
                    };
                u.wbc = fe.webglColour(u.bc), u.wfc = fe.webglColour(u.fc);
                var d = {
                    scrollable: !0,
                    getCursor: function() {
                        return "crosshair"
                    },
                    generate: function(e) {
                        var t = e.getLayer();
                        e.setLayer(fe.layers.HANDLES), e.copyPrimitive(u), e.setLayer(t)
                    },
                    dragMove: function(e, t, n, r) {
                        o(e, t, n, r)
                    },
                    endDrag: function(t, r, i) {
                        e.cancelScroll();
                        var a = n.trigger("dragend", "area", null, e.unscale(r), e.unscale(i));
                        a || (t ? n.trigger("selectionchange") : ot()), n.trigger("dragcomplete", "area", null, e.unscale(r), e.unscale(i))
                    }
                };
                return d
            }
        };
        Ge.createGestureDragger = function(t, r, i) {
            function a(n, r, i) {
                var a = -n * (2 * Math.PI / 360);
                a *= 2;
                var o = Math.sin(a),
                    l = Math.cos(a);
                e.privateEach({
                    type: "node",
                    items: "toplevel"
                }, function(e) {
                    var t = e.id,
                        n = (g[t].x - f) * l + (g[t].y - d) * o + f,
                        r = -(g[t].x - f) * o + (g[t].y - d) * l + d;
                    Ye(t, n, r)
                });
                var u = t.viewToWorldX(r),
                    c = t.viewToWorldY(i);
                e.privateEach({
                    type: "node",
                    items: "toplevel"
                }, function(e) {
                    var t = e.id;
                    Ye(t, e.x + (u - f), e.y + (c - d))
                })
            }

            function o(e) {
                var n = Math.pow(e, 2);
                t.zoomToPosition(n * s, r, i)
            }

            function l(e, t, n, r) {
                h = e, v = t, m = n, y = r
            }

            function u() {
                o(h), b = b || Math.abs(v) > 12, I = I || Math.abs(m - f) > p || Math.abs(y - d) > p, a(b ? v : 0, I ? m : f, I ? y : d)
            }

            function c() {
                e.privateEach({
                    type: "node",
                    items: "toplevel"
                }, function(e) {
                    var t = e.id;
                    Ye(t, g[t].x, g[t].y)
                })
            }
            var s = t.zoom(),
                f = t.viewToWorldX(r),
                d = t.viewToWorldY(i),
                g = {};
            de.forEach(Ae, function(e, t) {
                g[t] = {
                    x: e.x,
                    y: e.y
                }
            });
            var h, v, m, y;
            l(1, 0, f, d);
            var b = !1,
                p = 60,
                I = !1,
                x = {
                    animate: function() {
                        u()
                    },
                    getCursor: function() {
                        return "move"
                    },
                    dragMove: function(e, t, n, r) {
                        l(e, t, n, r)
                    },
                    endDrag: function(e, t, r, i, a) {
                        l(t, r, i, a), e ? (c(), n.trigger("prechange", "move"), u()) : c()
                    }
                };
            return x
        }, Ge.labelPosition = function(e, t, n, r, a) {
            var o = je(e);
            return i.labelPosition(o, t, Ae, Be, n, r, a, at, vt)
        }, Ge.extractStructure = function(e, t, n, r) {
            return Xe.extractStructure(i, e, Ae, Be, Ne, t.fixed, n, r)
        }, Ge.updateLinkStyles = function(e) {
            e.straighten && (n.trigger("redraw", {
                all: !0
            }), z({
                self: !1,
                combos: "toplevel"
            })), O()
        }, Ge.layout = function(e, t, n, r, i) {
            Xe.layout(e, t, n, Ne, r, i)
        }, Ge.arrange = function(e, t, n, r, i, a, o) {
            Xe.arrange(e, t, n, r, Ne, i, a, o)
        }, Ge.applyVertices = function(e) {
            de.forEach(Ae, function(t, n) {
                e[n] && Ye(n, e[n].x, e[n].y)
            })
        }, Ge.applyUpdatedOffsets = function(e) {
            de.forEach(Be, function(t, n) {
                e[n] && Ge.setLinkOffset(n, e[n].off)
            })
        }, Ge.makeAnimator = function(e, t, n) {
            var r = t,
                i = {};
            return de.forEach(Ae, function(e, t) {
                i[t] = {
                    x: e.x,
                    y: e.y
                }
            }), se.buildAnimatorInstance(function(a) {
                r -= a;
                var o = n(Math.max(0, (t - r) / t));
                return de.forEach(Ae, function(t, n) {
                    if (e[n]) {
                        var r = i[n].x + o * (e[n].x - i[n].x),
                            a = i[n].y + o * (e[n].y - i[n].y);
                        Ye(n, r, a)
                    }
                }), r > 0
            }, {
                positions: !0
            })
        }, Ge.reveal = function(e, t) {
            e && (yt(), e.forEach(function(e) {
                e && !ce[e] && te(e) && (ce[e] = 1, Fe(e))
            }), t !== !1 && bt(void 0, void 0, void 0, !0), a())
        }, Ge.isRevealedLink = function(e) {
            return !!ce[e]
        };
        var vt = Ge.isRevealedLink;
        Ge.getRevealedLinks = function() {
            return Object.keys(ce)
        };
        var mt = function(e) {
            Fe(e), delete ce[e], at(e) && !Je(e) && it(e)
        };
        Ge.clearRevealedLinks = function() {
            de.forEach(ce, function(e, t) {
                Fe(t), at(t) && !Je(t) && it(t)
            }), ce = {}
        };
        var yt = Ge.clearRevealedLinks;
        Ge.applyRevealedLinkOffsets = function(e, t, n, r) {
            function i(e) {
                return void 0 !== u[e.id] ? u[e.id] : e
            }

            function a(e, t) {
                if (u[e]) {
                    var n, r = u[e],
                        i = _e(r.id1);
                    for (n = 0; n < i.length; n++)
                        if (t[i[n]]) return !0;
                    for (i = _e(r.id2), n = 0; n < i.length; n++)
                        if (t[i[n]]) return !0
                }
                return !1
            }
            var o = void 0 === n ? _ : n,
                l = {},
                u = {};
            ne(Object.keys(ce).map(je).filter(function(e) {
                return !e.hi
            }), l, u);
            var c = null;
            if (e) {
                var s = [],
                    f = {};
                de.forEach(e, function(e) {
                    if ("node" === e.type) {
                        var t = Oe(e.id);
                        t && (f[t.id] = !0)
                    } else s.push(e)
                });
                var d = {};
                ne(s, d, {}), c = {};
                var g = !1;
                if (Object.keys(l).forEach(function(e, t) {
                        (void 0 !== d[e] || a(l[e][0], f)) && (c[t] = !0, g = !0)
                    }), !g) return
            }
            if (r) {
                var h = o;
                o = function(e, t) {
                    e.id1 === u[e.id].id1 && e.id2 === u[e.id].id2 || h(e, t)
                }
            }
            D(de.values(l), c, t, i, o)
        };
        var bt = Ge.applyRevealedLinkOffsets;
        return Ge
    }
}(),
function() {
    KeyLines.Validation = {};
    var e = KeyLines.Validation;
    e.defaultOpenComboStyle = {
        b: "grey",
        bw: 1,
        c: "rgba(240,240,240,0.8)",
        bs: "solid",
        re: !1,
        w: 0
    };
    var t = ["_ha0", "_ha1", "_ha2", "_ha3", "_ha4"],
        n = t.concat(["ha0", "ha1", "ha2", "ha3", "ha4", "ha5", "ha6", "ha7", "ha8", "ha9"]);
    e.pingHaloProps = t, e.nodeHaloProps = n, e.haloPropMap = n.reduce(function(e, t) {
        return e[t] = !0, e
    }, {}), e.create = function(e, t, n, r) {
        function i(e) {
            A.isNormalObject(e) && A.forEach(e, function(t, n) {
                d(e, n), e.g && (e.g = m(e.g, !0)), x(e, n, S.reserved)
            })
        }

        function a(e) {
            "w" in e && (e.w = !!e.w)
        }

        function o(e, t) {
            A.forEach(e, function(n, r) {
                d(e, r), x(e, r, S.reserved), t && x(e, r, S.booleans)
            })
        }

        function l(e, t) {
            var n = e[t],
                r = !0;
            A.isNormalObject(n) && A.forEach(n, function(e, t) {
                u(n, t), r = r && isFinite(e)
            }), r || delete e[t]
        }

        function u(e, t) {
            var n = +e[t];
            0 > n && !S.negatives[t] && (n = null), e[t] = n
        }

        function c(e, t) {
            if (!A.isNullOrUndefined(e[t])) {
                var n = e[t] + "";
                isNaN(n) || "" === n ? s(e, t) : u(e, t)
            }
        }

        function s(e, t) {
            A.isNullOrUndefined(e[t]) || (e[t] += "", S.stringValues[t] && !S.stringValues[t][e[t]] && delete e[t])
        }

        function f(e, t) {
            e[t] && (e[t] = B.validatergb(e[t]) ? e[t] : void 0)
        }

        function d(e, t) {
            S.strings[t] ? s(e, t) : S.numbers[t] ? u(e, t) : S.numOrString[t] ? c(e, t) : S.colours[t] ? f(e, t) : S.mapPos[t] && l(e, t)
        }

        function g(e) {
            if (A.isNormalObject(e.fi)) {
                var t = e.fi;
                A.isNullOrUndefined(t.t) || (t.t = "string" == typeof t.t ? t.t.charAt(0) : String.fromCharCode(t.t)), t.c && (t.c = B.validatergb(t.c) ? t.c : void 0), "ff" in t && "string" != typeof t.ff && (t.ff = void 0)
            } else null !== e.fi && delete e.fi
        }

        function h(e) {
            return /^(ne|nw|se|sw|n|s|e|w)$/.test(e)
        }

        function v(e) {
            return A.isInteger(e) && e >= 0 && 360 > e
        }

        function m(e, t) {
            var n, r, i = {};
            return Array.isArray(e) && (n = e.filter(function(e) {
                var n, a = e.p;
                return t ? n = e : A.isNullOrUndefined(a) || ("string" === r && h(a) || "numeric" === r && v(a) ? i[a] || (n = e, i[a] = 1) : r || (h(a) ? (r = "string", n = e, i[a] = 1) : v(a) && (r = "numeric", n = e, i[a] = 1))), n ? (g(e), e) : !1
            })), n
        }

        function y(e, t) {
            S.halos.forEach(function(n) {
                var r = e[n];
                r && (t ? "c" in r || "r" in r || "w" in r || delete e[n] : "c" in r && "r" in r && "w" in r ? (f(r, "c"), A.isNullOrUndefined(r.c) || A.isNullOrUndefined(r.r) || A.isNullOrUndefined(r.w) || !A.isNumber(+r.r) || !A.isNumber(+r.w) ? delete e[n] : (r.r = +r.r, r.w = +r.w)) : delete e[n])
            })
        }

        function b(e, t) {
            t || Array.isArray(e.donut.v) ? (e.donut.v && e.donut.v.forEach(function(t, n) {
                (!A.isNumber(t) || 0 > t) && (e.donut.v[n] = 0)
            }), e.donut.c && (Array.isArray(e.donut.c) && !e.donut.c.some(function(e) {
                return !B.validatergb(e)
            }) || delete e.donut.c), ["bw", "w"].forEach(function(t) {
                t in e.donut && u(e.donut, t)
            }), "b" in e.donut && f(e.donut, "b"), t || (e.donut = A.defaults(e.donut, L))) : delete e.donut
        }

        function p(e) {
            A.isNormalObject(e.oc) ? W(e.oc) : delete e.oc
        }

        function I(e) {
            if (Array.isArray(e.bu)) delete e.bu;
            else {
                e.bu.p || (e.bu.p = "ne");
                var t = e.bu.p;
                /^(ne|nw|se|sw)$/.test(t) || delete e.bu
            }
        }

        function x(e, t, n) {
            n[t] && delete e[t]
        }

        function C(e, t, n, r) {
            function i(e, t) {
                return e.id in t.nodes || e.id in t.links
            }

            function a(e) {
                return "node" === e.type && e.id in u || "link" === e.type && e.id in l
            }
            var o, l = t || {},
                u = n || {},
                c = {
                    nodes: {},
                    links: {}
                };
            return e && (c = e.reduce(function(e, t) {
                if (t.id && !i(t, e) && !a(t)) {
                    if (o = t.type + "s", "node" === t.type) {
                        var n = !0;
                        r && l[t.id] && (n = !1), n && X(t)
                    }
                    o in e && (e[o][t.id] = t)
                }
                return e
            }, c)), c
        }

        function w(e, t, n, r) {
            var i = {};
            return A.forEach(e, function(e, a) {
                if (F(e, t, n, r)) i[a] = e;
                else {
                    var o = e._parentId;
                    if (o) {
                        var l = t[o] || n[o];
                        l && l._combo && (l._combo.linkIds = l._combo.linkIds.filter(function(t) {
                            return t !== e.id
                        }))
                    }
                }
            }), i
        }

        function G(e, t, n, r) {
            A.forEach(n, function(i, a) {
                var o = i._parentId;
                t[i.id1][e] !== !0 && t[i.id2][e] !== !0 || i[e] !== !0 && (i[e] = !0, n[o] && (r[o] = !0), Z(a))
            })
        }
        var A = KeyLines.Util,
            B = KeyLines.Rendering,
            Z = t || A.noop,
            R = n || A.noop,
            M = r || A.noop,
            E = {},
            k = {
                numbers: {},
                numOrString: {},
                negatives: {},
                strings: {},
                stringValues: {},
                colours: {},
                booleans: {},
                reserved: {},
                mapPos: {},
                halos: []
            };
        E.donutDefaults = {
            b: "rgb(255, 255, 255)",
            bw: 2,
            c: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
            w: 10
        };
        var L = E.donutDefaults,
            S = A.defaults(e, k);
        E.typeCheck = function(e, t) {
            V(e.items, !1, t)
        }, E.filterNodesAndLinks = function(e, t, n, r) {
            var i = r || {},
                a = C(e, t, n, i.carefulWithXandY);
            return a.links = w(a.links, a.nodes, t, i.selfLinks), a
        }, E.ensureObject = function(e, t, n) {
            var r = n || {};
            o(e, t), g(e), e.g && (Array.isArray(e.g) ? (V(e.g), e.g.forEach(a), e.g = m(e.g, "link" === e.type || r[e.id])) : delete e.g), y(e, t), e.donut && b(e, t), e.oc && p(e), e.bu && I(e), e.t1 && i(e.t1), e.t2 && i(e.t2)
        };
        var W = E.ensureObject;
        E.ensureTypesInArray = function(e, t, n) {
            if (e)
                for (var r = 0; r < e.length; r++) W(e[r], t, n)
        };
        var V = E.ensureTypesInArray;
        E.setZeroXY = function(e) {
            "node" === e.type && (e.x = e.x || 0, e.y = e.y || 0)
        };
        var X = E.setZeroXY;
        E.hasValidEnds = function(e, t, n, r) {
            if (!r && e.id1 === e.id2) return !1;
            var i = t || {},
                a = n || {};
            return (a[e.id1] || i[e.id1]) && (a[e.id2] || i[e.id2])
        };
        var F = E.hasValidEnds;
        E.ensureHiddenItemConsistency = function(e, t) {
            T("hi", e, t)
        }, E.ensureConsistency = function(e, t, n) {
            var r = {};
            G(e, t, n, r), N(r, e, n), M(e), "hi" === e && R()
        };
        var T = E.ensureConsistency;
        E.applyPropertyRuleToComboLinks = function(e, t, n) {
            Object.keys(e).forEach(function(e) {
                var r = n[e],
                    i = r._combo.linkIds.every(function(e) {
                        return n[e][t]
                    });
                i ? (r[t] = !0, Z(e)) : void 0 !== r[t] && (delete r[t], Z(e))
            })
        };
        var N = E.applyPropertyRuleToComboLinks;
        return E
    }
}(),
function() {
    "use strict";
    KeyLines.Generator = {};
    var e = KeyLines.Generator;
    KeyLines.Generator.defaultFontSize = 14, e.create = function(e, t) {
        function n() {
            return Xe || Ce.colours.white
        }

        function r(e) {
            return Math.abs(e) < 1e-5
        }

        function i(e, t, n, r, i, a, o) {
            return {
                x: ((a - r) * n - (o - i) * t) / e,
                y: ((a - r) * t + (o - i) * n) / e
            }
        }

        function a(e) {
            return Array.isArray(e) && e.length > 0
        }

        function o(e) {
            return a(e.g)
        }

        function l(e, t, n, a, o, l, u, c, s, f) {
            var d = i(t, n, a, o, l, u, c),
                g = i(t, n, a, o, l, s, f),
                h = e / t,
                v = h / 2;
            if (d.y > v && g.y > v || d.y < -v && g.y < -v) return NaN;
            if (r(g.y - d.y)) return Math.max(d.x, g.x);
            var m, y = d.y > g.y ? d : g,
                b = d.y > g.y ? g : d;
            m = v < y.y ? y.x - (y.y - v) * (y.x - b.x) / (y.y - b.y) : y.x;
            var p;
            return p = b.y < -v ? b.x - (b.y - -v) * (b.x - y.x) / (b.y - y.y) : b.x, Math.max(m, p)
        }

        function u(e, t, n, r, i, a, o, u) {
            for (var c = -(1 / 0), s = o.length, f = 0; s > f; f += 2) {
                var d = (f + 2) % s,
                    g = l(e, t, n, r, i, a, o[f] + u._sx, o[f + 1] + u._sy, o[d] + u._sx, o[d + 1] + u._sy);
                we.isNaN(g) || (c = Math.max(c, g))
            }
            return c
        }

        function c(e, t, n, r, i, a, o, l) {
            return u(e, t, n, r, i, a, [o.x1, o.y1, o.x2, o.y1, o.x2, o.y2, o.x1, o.y2], l)
        }

        function s(e, t, n, r, i, a, o) {
            var l = -(1 / 0),
                u = a.cx + o._sx - r,
                c = a.cy + o._sy - i,
                s = e * e,
                f = -2 * e * (u * n - c * t),
                d = u * u + c * c - a.r * a.r,
                g = f * f - 4 * s * d;
            return g >= 0 && (l = (-f + Math.sqrt(g)) / (2 * s)), l
        }

        function f(e, t, n, r, i, a) {
            for (var o, l = -(1 / 0), f = Math.sin(-n), d = Math.cos(-n), g = a._cl, h = 0; h < g.length; h++) {
                var v = g[h];
                o = v.length ? u(e, t, f, d, r, i, v, a) : v.r ? s(t, f, d, r, i, v, a) : c(e, t, f, d, r, i, v, a), l = Math.max(l, o)
            }
            return l
        }

        function d(e, t, n, r, i, a) {
            var o = 0;
            return r._c && (o = r._c / t), r._cl && (o = Math.max(o, f(e, t, n, i, a, r))), o
        }

        function g(e, t, n, i, a, o, l, u, c, s, f, g) {
            var h = {},
                v = n - e,
                m = i - t,
                y = Math.sqrt(v * v + m * m);
            if (r(y)) h.skip = !0;
            else {
                var b = Math.atan2(m, v),
                    p = d(We && c ? 0 : a, y, b, l, e, t),
                    I = d(We && s ? 0 : a, y, b + Math.PI, u, n, i),
                    x = f || 0,
                    C = g || 0;
                p = Math.max(x, p), I = Math.max(C, I);
                var w = 1 - (p + I),
                    G = 0;
                (c || s) && (G = H(a, o) / y, c && s && (G *= 1.5)), h.skip = w < Math.max(Math.min(6 / y, .1), G), h.skip || (h.cx1 = e + p * v, h.cy1 = t + p * m, h.cx2 = n + I * -v, h.cy2 = i + I * -m)
            }
            return h
        }

        function h(e, t, n, r, i, a, o) {
            var l = [],
                u = a - r,
                c = o - i,
                s = r - e,
                f = i - t,
                d = u * u + c * c,
                g = 2 * (u * s + c * f),
                h = s * s + f * f - n * n,
                v = g * g - 4 * d * h;
            if (v >= 0) {
                var m = Math.sqrt(v),
                    y = (-g - m) / (2 * d),
                    b = (-g + m) / (2 * d);
                if (y >= 0 && 1 >= y) {
                    var p = r + y * u,
                        I = i + y * c;
                    l.push(Math.atan2(I - t, p - e))
                }
                if (b !== y && b >= 0 && 1 >= b) {
                    var x = r + b * u,
                        C = i + b * c;
                    l.push(Math.atan2(C - t, x - e))
                }
            }
            return l
        }

        function v(e, t, n, r, i, a) {
            var o = r - t;
            if (Math.abs(o) > n) return [];
            var l = Math.max(i, a),
                u = Math.min(i, a);
            if (e - n > l || u > e + n) return [];
            var c = Math.asin(o / n),
                s = n * Math.cos(c),
                f = [];
            return e - s >= u && l >= e - s && f.push(o > 0 ? Math.PI - c : -Math.PI - c), e + s >= u && l >= e + s && f.push(c), f
        }

        function m(e, t, n, r, i, a) {
            var o = r - e;
            if (Math.abs(o) > n) return [];
            var l = Math.max(i, a),
                u = Math.min(i, a);
            if (t - n > l || u > t + n) return [];
            var c = Math.acos(o / n),
                s = n * Math.sin(c),
                f = [];
            return t - s >= u && l >= t - s && f.push(-c), t + s >= u && l >= t + s && f.push(c), f
        }

        function y(e, t, n, r, i, a) {
            for (var o = [], l = 0; l < r.length; l += 2) {
                var u = (l + 2) % r.length,
                    c = h(e, t, n, r[l] + i, r[l + 1] + a, r[u] + i, r[u + 1] + a);
                o = o.concat(c)
            }
            return o
        }

        function b(e, t, n, r, i, a) {
            var o = v(e, t, n, r.y2 + a, r.x1 + i, r.x2 + i),
                l = v(e, t, n, r.y1 + a, r.x1 + i, r.x2 + i),
                u = m(e, t, n, r.x1 + i, r.y1 + a, r.y2 + a),
                c = m(e, t, n, r.x2 + i, r.y1 + a, r.y2 + a);
            return o.concat(l, c, u)
        }

        function p(e, t, n, r, i) {
            for (var a = Math.PI, o = e, l = 0; l < t.length; l++) t[l] + 2 * Math.PI < r && (t[l] += 2 * Math.PI), n < t[l] && t[l] < r && (i ? t[l] - o < a && (o = Math.max(o, t[l])) : o - t[l] < a && (o = Math.min(o, t[l])));
            return o
        }

        function I(e, t, n, r, i, a, o, l) {
            var u = 4;
            if (!l.length) {
                var c = e + n * Math.cos(r),
                    s = t + n * Math.sin(r),
                    f = e + n * Math.cos(i),
                    d = t + n * Math.sin(i);
                if (l.r) {
                    var g = a + l.cx,
                        h = o + l.cy,
                        v = Z(c, s, g, h),
                        m = Z(f, d, g, h);
                    if (v <= l.r + u && m <= l.r + u) return !0
                } else {
                    var y = a + l.x1 - u,
                        b = a + l.x2 + u,
                        p = o + l.y1 - u,
                        I = o + l.y2 + u,
                        x = c >= y && b >= c && s >= p && I >= s,
                        C = f >= y && b >= f && d >= p && I >= d;
                    if (x && C) return !0
                }
            }
            return !1
        }

        function x(e, t, n, r, i, a) {
            var o = a.x,
                l = a.y;
            if (a._c) {
                var u = {
                    cx: 0,
                    cy: 0,
                    r: a._c
                };
                if (I(e, t, n, r, i, o, l, u)) return !1
            }
            if (a._cl)
                for (var c = 0; c < a._cl.length; c++) {
                    var s = a._cl[c];
                    if (I(e, t, n, r, i, o, l, s)) return !1
                }
            return !0
        }

        function C(e, t, n, r, i, a, o) {
            var l, u = o ? r : i,
                c = a._sx,
                s = a._sy;
            if (a._c && (l = tt(e, t, n, c, s, a._c), u = p(u, l, r, i, o)), a._cl)
                for (var f = 0; f < a._cl.length; f++) {
                    var d = a._cl[f];
                    l = d.length ? y(e, t, n, d, c, s) : d.r ? tt(e, t, n, c + d.cx, s + d.cy, d.r) : b(e, t, n, d, c, s), u = p(u, l, r, i, o)
                }
            return u
        }

        function w(e, t, n, r, i, a, o, l) {
            var u = C(t, n, r, i, a, e > 0 ? o : l, !0),
                c = C(t, n, r, u, a, e > 0 ? l : o, !1);
            return o === l || x(t, n, r, u, c, o) && x(t, n, r, u, c, l) ? {
                startangle: u,
                endangle: c
            } : {
                startangle: 2 * Math.PI,
                endangle: -2 * Math.PI
            }
        }

        function G(e, t) {
            var n, r, i = et(e);
            return t && Te ? (n = Te.b || e.b, r = Te.c || e.c) : (n = e.b, r = e.c), !(!n && !r || i)
        }

        function A(e, t, n, r, i, a, o, l, u, c) {
            u ? e.arc(0, 0, 0, 0, 0, o, 0, t, l, null, !0) : e.line(0, 0, 0, 0, o, l, t, c, !0);
            var s = u ? ze.arc : ze.line;
            n && e.triangle(0, 0, 0, 0, 0, 0, o, -1, o, !0, t + Oe + "a1", s, !0), r && e.triangle(0, 0, 0, 0, 0, 0, o, -1, o, !0, t + Oe + "a2", s, !0), qe.hib = !0, qe.pos.t.lx = (i._sx + a._sx) / 2, qe.pos.t.ly = (i._sy + a._sy) / 2
        }

        function B(e, t, n, r, i, a, o, l, u, c, s, f, d, g) {
            var h = l === u,
                v = l._sx,
                m = l._sy,
                y = u._sx,
                b = u._sy,
                p = r || 0,
                I = i || 0,
                x = +(a || 0) * f;
            h && (x += nt * l._sl.e);
            var C = x > 0;
            if (h) {
                var B = (l._sl.w ? 180 : 225) * (Math.PI / 180),
                    Z = Math.cos(B),
                    R = Math.sin(B),
                    M = .5;
                v = l._sx + l._sl.x, m = l._sy + l._sl.y, y = v, b = m;
                var E = -l._sl.e * nt / 2;
                v += Z * E + R * M, m += R * E - Z * M, y += Z * E - R * M, b += R * E + Z * M
            }
            var L = (v + y) / 2,
                S = (m + b) / 2,
                W = y - v,
                V = b - m,
                X = Math.max(.001, V * V + W * W),
                F = Math.sqrt(X),
                T = +(X / 4 + x * x) / (2 * Math.abs(x)),
                N = T - Math.abs(x);
            if (T > 1e5) return Ie = !0, xe = !0, void k(e, t, n, p, I, o, l, u, c, s, f, d, g);
            var Y = C ? 1 : -1,
                K = L - V * Y * N / F,
                z = S + W * Y * N / F,
                O = Math.atan2(m - z, v - K),
                D = Math.atan2(b - z, y - K),
                _ = C ? O : D,
                P = C ? D : O;
            _ > P && (P += 2 * Math.PI);
            var j = _ + (C ? p : I) * (P - _),
                J = _ + (C ? 1 - I : 1 - p) * (P - _),
                Q = w(x, K, z, T, _, P, l, u);
            if (Q.startangle = Math.max(j, Q.startangle), Q.endangle = Math.min(J, Q.endangle), Q.startangle >= Q.endangle) return void A(e, o, t, n, l, u, c, s, !0);
            var q, $, ee, te, ne, re, ie = .9 * H(s, f) / T,
                ae = -.25;
            return t ? (q = C ? Q.startangle : Q.endangle, $ = K + T * Math.cos(q), ee = z + T * Math.sin(q), C ? Q.startangle += ie : Q.endangle -= ie) : We && G(l, g) && (C ? Q.startangle += ae * ie : Q.endangle -= ae * ie), n ? (te = C ? Q.endangle : Q.startangle, ne = K + T * Math.cos(te), re = z + T * Math.sin(te), C ? Q.endangle -= ie : Q.startangle += ie) : We && G(u, g) && (C ? Q.endangle -= ae * ie : Q.startangle += ae * ie), Q.startangle >= Q.endangle ? void A(e, o, t, n, l, u, c, s, !0) : (e.arc(K, z, T, Q.startangle, Q.endangle, c, s, o, d), t && U(e, K, z, T, $, ee, C, s, f, c, o + Oe + "a1"), n && U(e, K, z, T, ne, re, !C, s, f, c, o + Oe + "a2"), void we.forEach(qe.pos, function(e, t) {
                if ("t" === t || qe.present[t]) {
                    var n = Y > 0 ? Q.startangle : Q.endangle,
                        r = Y > 0 ? Q.endangle : Q.startangle,
                        i = n + (r - n) * rt[t];
                    e.lx = K + T * Math.cos(i), e.ly = z + T * Math.sin(i), e.tdx = -Y * Math.sin(i), e.tdy = Y * Math.cos(i), e.tangent = i, e.R = T, e.signf = Y
                }
            }))
        }

        function Z(e, t, n, r) {
            return Math.sqrt((n - e) * (n - e) + (r - t) * (r - t))
        }

        function R(e, t, n, r, i, a) {
            var o = e,
                l = t,
                u = Math.ceil(a / 8),
                c = Z(o, l, n, r);
            return o += (o - n) / c * (u - i), l += (l - r) / c * (u - i), {
                x: o,
                y: l
            }
        }

        function M(e, t) {
            var n, r = dt,
                i = (e.e || 1) * Ct;
            return n = t.x > e._sx && "e" === e.sh ? e._sx + i * r : t.x < e._sx && "w" === e.sh ? e._sx - i * r : e._sx
        }

        function E(e, t, n, r, i, a, o, l, u, c, s, f, g) {
            var h, v, m = r,
                y = i,
                b = M(l, u),
                p = l._sy,
                I = M(u, l),
                x = u._sy,
                C = a || 0;
            I > b ? (h = b + Fe, v = I - Fe, h > v && (h = (b + I) / 2, v = h)) : (h = b - Fe, v = I + Fe, v > h && (h = (b + I) / 2, v = h));
            var w = Z(b, p, h, C),
                G = Z(h, C, v, C),
                A = Z(v, C, I, x),
                B = w + G + A,
                E = Math.atan2(C - p, h - b),
                k = Math.atan2(C - x, v - I),
                L = 0 === w ? 0 : d(s, w, E, l, b, p),
                S = 0 === A ? 0 : d(s, A, k, u, I, x);
            m = 0 === w ? 0 : (m || 0) * B / w, y = 0 === A ? 0 : (y || 0) * B / A, L = Math.min(1, Math.max(m, L)), S = Math.min(1, Math.max(y, S));
            var W, V, X, F, T, N, U = b + L * (h - b),
                K = p + L * (C - p),
                z = I + S * (v - I),
                O = x + S * (C - x);
            (t || n) && (T = H(s, f)), t && (W = U, V = K, N = R(U, K, h, C, T, s), U = N.x, K = N.y), n && (X = z, F = O, N = R(z, O, v, C, T, s), z = N.x, O = N.y), e.line3(U, K, h, C, v, C, z, O, c, s, o, g), t && Y(e, W, V, s, f, E + Math.PI, c, o + Oe + "a1", ze.line), n && Y(e, X, F, s, f, k + Math.PI, c, o + Oe + "a2", ze.line);
            var D = {
                t: {
                    lx: (h + v) / 2,
                    ly: (C + C) / 2
                },
                t1: {
                    lx: b,
                    ly: p
                },
                t2: {
                    lx: I,
                    ly: x
                }
            };
            we.forEach(qe.pos, function(e, t) {
                ("t" === t || qe.present[t]) && (e.above = !0, e.lx = D[t].lx, e.ly = D[t].ly, e.R = 0)
            })
        }

        function k(e, t, n, r, i, a, o, l, u, c, s, f, d) {
            var h = g(o._sx, o._sy, l._sx, l._sy, c, s, o, l, t, n, r, i);
            if (h.skip) return void A(e, a, t, n, o, l, u, c, !1, f);
            var v, m, y, b, p, I, x, C, w = h.cx1,
                B = h.cy1,
                Z = h.cx2,
                M = h.cy2,
                E = Z - w,
                k = M - B,
                L = Math.max(.001, k * k + E * E),
                S = Math.sqrt(L),
                W = .25;
            (t || n) && (x = H(c, s)), t ? (v = Math.atan2(k, E), y = w, b = B, C = R(w, B, Z, M, x, c), w = C.x, B = C.y) : We && G(o, d) && (w -= W * c * E / S, B -= W * c * k / S), n ? (m = Math.atan2(k, E), p = Z, I = M, C = R(Z, M, w, B, x, c), Z = C.x, M = C.y) : We && G(l, d) && (Z += W * c * E / S, M += W * c * k / S), e.line(w, B, Z, M, u, c, a, f), t && Y(e, y, b, c, s, v + Math.PI, u, a + Oe + "a1", ze.line), n && Y(e, p, I, c, s, m, u, a + Oe + "a2", ze.line), we.forEach(qe.pos, function(e, t) {
                if ("t" === t || qe.present[t]) {
                    var n = rt[t],
                        r = l._sx - o._sx,
                        i = l._sy - o._sy;
                    0 === r && 0 === i && (r = 1, i = -1);
                    var a = we.len(r, i);
                    e.lx = w + n * (Z - w), e.ly = B + n * (M - B), e.tdx = r / a, e.tdy = i / a, e.tangent = Math.atan2(i, r), e.R = 0
                }
            })
        }

        function L(e, t, n, r, i, a, o, l, u, c, s, f, d) {
            function g(e) {
                for (var t = h.length - 1, n = v; t >= 0; t--) e(h[t], n), t > 0 && (n -= T(h[t - 1], h[t]) * a)
            }
            var h = n || [],
                v = r;
            if (o) {
                for (var m = 0, y = 0; y < h.length - 1; y++) m += T(h[y], h[y + 1]) * a;
                v += m / 2
            } else v -= h.length > 0 ? F(h[h.length - 1]) * a : F({});
            if (s) {
                var b = v;
                if (h.length > 0) {
                    g(function(e, t) {
                        b = t
                    });
                    var p = h[0].e || 1;
                    b -= p * a * nt / 2, s._sl.e *= p
                }
                s._sl.x = b - s._sx, s._sl.y = i - s._sy, s._sl.w = !0
            }
            o && l && g(function(t, n) {
                e.circle(n, i, X(t) * a * 1.25, Ce.colours.white, -1, $e(), !0, c, null, null, f)
            });
            var I = 0;
            g(function(n, r) {
                var o = c + Oe + I;
                d && (o += "-" + d), ge(e, t, o, r, i, a, n, u, s, !1, !1, f), I++
            })
        }

        function S(e, t, n, r, i, a, o, l, u, c, s, f, d, g, h) {
            function v(e) {
                m = C;
                for (var t = p.length - 1, n = I, r = x; t >= 0; t--) e(p[t], n, r), t > 0 && (n -= w(p[t - 1], p[t]), r -= G(p[t - 1], p[t]))
            }
            var m, y, b, p = n || [],
                I = r,
                x = i,
                C = 0,
                w = function(e, t) {
                    return T(e, t) * a
                },
                G = function() {
                    return 0
                };
            if (o)
                if (h.R && Ee) {
                    var A = 0,
                        B = h.signf,
                        Z = h.R;
                    for (C = h.tangent, b = 0; b < p.length - 1; b++) y = T(p[b], p[b + 1]), A += B * Math.asin(y / (2 * Z));
                    var R = C + A / 2,
                        M = 2 * B * Z * Math.sin(A / 2);
                    I += B * M * -Math.sin(R), x += B * M * Math.cos(R), C += A, w = function(e, t) {
                        m -= B * Math.asin(T(e, t) / (2 * Z));
                        var n = -B * Math.sin(m);
                        return T(e, t) * a * n
                    }, G = function(e, t) {
                        var n = B * Math.cos(m);
                        return m -= B * Math.asin(T(e, t) / (2 * Z)), T(e, t) * a * n
                    }
                } else {
                    var E = 0;
                    for (b = 0; b < p.length - 1; b++) E += T(p[b], p[b + 1]) * a;
                    Ee ? (w = function(e, t) {
                        return T(e, t) * a * h.tdx
                    }, G = function(e, t) {
                        return T(e, t) * a * h.tdy
                    }, I += E * h.tdx / 2, x += E * h.tdy / 2) : I += E / 2
                } else I -= p.length > 0 ? F(p[p.length - 1]) * a : F({});
            o && l && v(function(t, n, r) {
                e.circle(n, r, X(t) * a * 1.25, Ce.colours.white, -1, $e(), !0, c, null, null, d)
            });
            var k = 0;
            v(function(n, r, i) {
                var o = c + Oe + k;
                g && (o += "-" + g), ge(e, t, o, r, i, a, n, u, null, !1, !1, d), k++
            })
        }

        function W(e, t, n, r, i, a, o) {
            var l, u, c, s = e.getLayer(),
                f = "solid",
                d = Ge.pingHaloProps;
            e.setLayer(Ce.layers.HALOS);
            for (var g = !0, h = 0; h < d.length; h++) c = d[h], l = i[c], u = t + Oe + c, l && (g = !1, "h" === i.st ? E(e, !1, !1, i.b1, i.b2, i.y, u, n, r, l.c, l.w, a, f) : i.off || n === r ? B(e, !1, !1, i.b1, i.b2, i.off, u, n, r, l.c, l.w, a, f, o) : k(e, !1, !1, i.b1, i.b2, u, n, r, l.c, l.w, a, f, o));
            i._noHalos = g, e.setLayer(s)
        }

        function V(e, r, i, o, l, u, c, s, f, d) {
            var g = 1;
            i._edit = null;
            var h = i.id,
                v = u && !Ye,
                m = v,
                y = u && Ye,
                b = y && He.b1 >= 0 ? He.b1 : i.b1,
                p = y && He.b2 >= 0 ? He.b2 : i.b2,
                I = y && He.c || i.c,
                x = y && He.fb || i.fb,
                C = y && He.fbc || i.fbc,
                w = y && He.fc || i.fc,
                G = y && He.ff || i.ff,
                A = y && He.fs || i.fs,
                Z = y && He.t1 || i.t1,
                R = y && He.t2 || i.t2,
                M = y && He.ls || i.ls,
                L = y && He.w || i.w,
                V = !1;
            f && (V = t.privateTopParentId(i.id1) !== t.privateTopParentId(i.id2)), c._parentId && (g = ne(1, c._parentId, o)), s._parentId && (g = Math.min(g, ne(1, s._parentId, o)));
            var X = (L || 1) * g * Ct,
                F = I || Ce.colours.midgrey,
                T = 0;
            qe.present.t = i.t || i.g && i.g.length || d, qe.present.t1 = !!i.t1, qe.present.t2 = !!i.t2;
            var N = qe.present.t || qe.present.t1 || qe.present.t2;
            if (qe.hib = !1, "h" === i.st) E(r, i.a1, i.a2, b, p, i.y, h, c, s, F, X, g, M);
            else if (i.off || c === s) {
                var H = i.off;
                V && (H = i.off / g), B(r, i.a1, i.a2, b, p, H, h, c, s, F, X, g, M, u)
            } else k(r, i.a1, i.a2, b, p, h, c, s, F, X, g, M, u);
            i._x = qe.pos.t.lx, i._y = qe.pos.t.ly;
            var Y = qe.hib;
            if (N && we.forEach(qe.pos, function(t, o) {
                    if (qe.present[o]) {
                        var u, f, d, y, b, p, I = t.lx,
                            B = t.ly,
                            M = {};
                        "t" === o || "string" == typeof i[o] ? p = i[o] : (M = i[o], "t1" === o && (M = Z), "t2" === o && (M = R), p = M.t ? M.t : i[o].t, u = M.fb ? M.fb : i[o].fb, f = M.fbc ? M.fbc : i[o].fbc, d = M.fc ? M.fc : i[o].fc, y = M.ff ? M.ff : i[o].ff, b = M.fs ? M.fs : i[o].fs);
                        var E = !1,
                            k = I,
                            L = B;
                        b = Number(b || A || Ze) * g * Ct, p = p || "", y = y || G;
                        var W = d || w || Ce.colours.black,
                            V = f || C || Ce.colours.textback,
                            F = void 0 !== u ? !!u : x;
                        v && (W = n(), V = $e());
                        var N = D(i, p),
                            H = _(N, e, b, F, y),
                            U = b + 3 * Ct;
                        T = U * N.length, N.length > 0 && (k -= H[0] / 2);
                        for (var K = (N.length - 1) * U, z = M.above ? B - (K + U / 2 + X / 2) : B - K / 2, O = 0; O < N.length; O++) {
                            0 === O && (L = z);
                            var P = J(e, r, N[O], I, z, h, !0, W, V, F, i, !1, !0, 99, H[O], v, b, y, Y, o);
                            E = E || P, z += U
                        }
                        E && (m = !1);
                        var j = "t" === o ? i.g : M.g;
                        if (a(j)) {
                            var Q = "t" === o ? null : o;
                            S(r, e, j, k, L, g, !E, v, l, h, c, s, Y, Q, t), m = !1
                        }
                    }
                }), m) {
                var U = Math.max(.66 * (L || 0), Number(A || Ze) * Ct / 2);
                r.circle(i._x, i._y, U, Ce.colours.white, -1, $e(), !0, h, null, null, Y)
            }
            i.bu && be(r, e, h, i._x, i._y, T / 2 + 4, g, i.bu, l), c.du && K(c, "id1", h, r, X, F, Y), s.du && K(s, "id2", h, r, X, F, Y), i._noHalos || W(r, h, c, s, i, g, u), Y && (i._edit = {
                hib: !0
            })
        }

        function X(e) {
            var t = ot;
            return se(e) && (t += lt / 2), e.e && (t *= e.e), t
        }

        function F(e) {
            return X(e) + it
        }

        function T(e, t) {
            return X(e) + at + X(t)
        }

        function N(e, t) {
            return t * (1.7 * e + Ct * (we.isNumber(Pe[Re]) ? Pe[Re] : Pe.normal))
        }

        function H(e, t) {
            return ct * N(e, t)
        }

        function Y(e, t, n, r, i, a, o, l, u) {
            var c = N(r, i),
                s = a + Math.PI;
            e.triangle(t + c * Math.cos(s + ut), n + c * Math.sin(s + ut), t + c * Math.cos(s - ut), n + c * Math.sin(s - ut), t, n, o, -1, o, !0, l, u, !1)
        }

        function U(e, t, n, r, i, a, o, l, u, c, s) {
            var f = H(l, u),
                d = tt(i, a, f, t, n, r);
            if (2 === d.length) {
                var g = o ? d[0] : d[1];
                Y(e, i, a, l, u, g - Math.PI, c, s, ze.arc)
            } else e.triangle(0, 0, 0, 0, 0, 0, c, -1, c, !0, s, ze.arc, !0)
        }

        function K(e, t, n, r, i, a, o) {
            r.circle(e._sx, e._sy, 1.5 * i, a, i, Ce.colours.white, !0, n + Oe + t, null, null, o)
        }

        function z(e) {
            return Je.showFullLabel && Je.showFullLabel === e
        }

        function O(e, t) {
            return Ue && ("node" === e.type || "link" === e.type) && t.length > Ue && !z(e.id)
        }

        function D(e, t) {
            function n() {
                return O(e, r) && (r = r.substring(0, Ue - 3) + "..."), r.split(/\r\n|\r|\n/)
            }
            var r = t;
            return "" === r || r || (r = e.t), r ? n() : [""]
        }

        function _(e, t, n, r, i) {
            for (var a = [], o = 0; o < e.length; o++) a[o] = Ce.measureText(t, e[o], n, r, i || Me).width;
            return a
        }

        function P(e) {
            for (var t = 0, n = 0; n < e.length; n++) t = Math.max(t, e[n]);
            return t
        }

        function j(e, t, n, r, i, a, o, l, u, c, s, f, d, g, h, v, m) {
            var y = Ce.measureText(e, n, v, c, m).width;
            return J(e, t, n, r, i, a, o, l, u, c, s, f, d, g, y, h, v, m)
        }

        function J(e, t, n, r, i, a, o, l, u, c, s, f, d, g, h, v, m, y, b, p, I) {
            var x = !0;
            0 === n.length && (x = !1);
            var C = a + Oe + (p || "t");
            if (x && b) return t.text(0, 0, n, l, m, c, C, y, !0, h, !1, o, 0, 0, 0, 0, u, v, 0, b), s && (s._edit = {
                hib: !0
            }), !0;
            if (f && h > g) return j(e, t, n, r, i, a, o, l, u, c, s, f, d, g, v, .85 * m, y);
            var w, G = 4 * Ct,
                A = r - h / 2;
            w = d ? i + (I || 1) + m / 2 : i + (1 + m) / 2;
            var B = {
                x1: A - G,
                y1: w - m,
                x2: A + h + G,
                y2: w
            };
            if (x) {
                var Z = d ? je : 0;
                t.text(r, w, n, l, m, c, C, y, !0, h, !1, o, B.x1, B.y1, B.x2, B.y2, u, v, G, !1, Z)
            }
            return s && "node" === s.type && (B.x1 -= s._sx, B.y1 -= s._sy, B.x2 -= s._sx, B.y2 -= s._sy), s && Q(s, B, m, x), x
        }

        function Q(e, t, n, r) {
            e._edit ? (e._edit.hib = !1, e._edit.x1 = Math.min(e._edit.x1, t.x1), e._edit.x2 = Math.max(e._edit.x2, t.x2), e._edit.y1 = Math.min(e._edit.y1, t.y1), e._edit.y2 = Math.max(e._edit.y2, t.y2)) : e._edit = {
                fs: n,
                x1: t.x1,
                y1: t.y1,
                x2: t.x2,
                y2: t.y2,
                hib: !1
            }, Ve && r && e._cl && e._cl.push(t)
        }

        function q(e, t) {
            return e._combo && e._combo.open ? "circle" : t ? mt[e.sh] ? e.sh : "box" : e.sh in mt ? e.sh : e.sq ? "box" : "circle"
        }

        function $(e, t, n, r, i, a, o, l, u) {
            var c = r + a,
                s = i + a;
            if ("circle" === e) {
                var f = Math.min(c, s);
                o(f)
            } else {
                var d = t - c,
                    g = n - s,
                    h = t + c,
                    v = n + s;
                if ("box" === e) l(d, g, h, v);
                else {
                    var m = a * vt,
                        y = r * dt / ft + a * ht;
                    "e" === e ? (h -= m, u(h, g, t + y, n, h, v, d, v, d, g)) : (d += m, u(d, v, t - y, n, d, g, h, g, h, v))
                }
            }
        }

        function ee(e, t, n, r, i, a, o, l, u, c, s, f, d, g) {
            $(d, t, n, r, i, a, function(r) {
                e.circle(t, n, r, o, l, c, s, f, u, !1, g)
            }, function(t, n, r, i) {
                e.rect(t, n, r, i, o, l, c, s, f, u, g)
            }, function(t, n, r, i, a, d, h, v, m, y) {
                e.pentagon(t, n, r, i, a, d, h, v, m, y, o, l, c, s, f, u, g)
            })
        }

        function te(e, t, n, r, i, a, o) {
            $(o, t, n, r, i, a, function(t) {
                e._c = t
            }, function(r, i, a, o) {
                e._cl.push({
                    x1: r - t,
                    y1: i - n,
                    x2: a - t,
                    y2: o - n
                })
            }, function(r, i, a, o, l, u, c, s, f, d) {
                e._cl.push([r - t, i - n, a - t, o - n, l - t, u - n, c - t, s - n, f - t, d - n])
            })
        }

        function ne(e, t, n) {
            var r = e,
                i = n[t];
            return i && (r *= i._combo.e, i._parentId && (r = ne(r, i._parentId, n))), r
        }

        function re(e, t) {
            for (var n = e, r = n.x, i = n.y; n._parentId;) n = t[n._parentId], r = n.x + (r - n.x) * n._combo.e, i = n.y + (i - n.y) * n._combo.e;
            return {
                x: r,
                y: i
            }
        }

        function ie(e, t, n, r, i, a, o) {
            if (!n.hi && !n.du) {
                var l, u, c, s, f, d, g, h, v, m, y, b = n.id,
                    p = et(n),
                    I = q(n, p),
                    x = a && Ne,
                    C = a && !Ne,
                    w = n._combo && n._combo.open,
                    G = x && Te.b || n.b,
                    A = x && Te.bs || n.bs,
                    B = x && Te.c || n.c,
                    Z = (p ? 1 : x && Te.e || n.e || 1) * Ct;
                u = p ? x && Te.re || n.re : !1, c = x && Te.u || n.u, s = x && Te.fi || n.fi, f = x && we.isNumber(Te.bw) ? Te.bw : n.bw, d = x && Te.w || n.w, g = x && Te.h || n.h, h = n.x, v = n.y;
                var R, M = n.donut && "circle" === I && !w ? n.donut : null;
                if (w) {
                    var E = n.oc;
                    if (E ? (G = null === E.b ? null : E.b || Qe.b, f = E.bw || Qe.bw, A = E.bs || Qe.bs, B = E.c || Qe.c, u = E.re || Qe.re, d = E.w || Qe.w) : (G = Qe.b, f = Qe.bw, A = Qe.bs, B = Qe.c, u = Qe.re, d = Qe.w), x) {
                        var k = Te.oc;
                        k && (G = k.b || G, f = k.bw || f, A = k.bs || A, B = k.c || B)
                    }
                    s = null, c = null, I = "circle", m = x && Te.e || n.e || 1, Z = n._combo.e, d *= Z, g = d
                }
                var L = 1;
                if (n._parentId) {
                    L = ne(1, n._parentId, r);
                    var S = re(n, r);
                    d *= L, g *= L, Z *= L, h = S.x, v = S.y
                }
                n._sx = h, n._sy = v, M ? (R = !0, l = M.b, f = Z * (M.w + 2 * M.bw), A = null) : G && (void 0 === f || f > 0) ? (R = !0, l = G, f = Z * (f || st)) : (R = !1, l = Ce.colours.white, f = 0, A = null);
                var W, V, X = !!B,
                    F = !!c || !(!s || !s.t),
                    T = X ? B : Ce.colours.white;
                n._c = 0, n._cl = [], n._edit = null, n._sl = {
                    e: Z
                }, p ? (W = d / 2, V = g / 2) : (W = Z * ft, V = W);
                var N, H, Y = W + f / 2,
                    U = V + f / 2;
                M ? (N = Z * M.w, H = f / 2) : (N = R ? f : Z * st, H = .75 * N);
                var K;
                if (K = We ? R || X ? f / 2 : H - N / 2 : H + N / 2, (F || R || X) && (te(n, h, v, Y, U, K, I), a && (!C && u || C) && ae(t, function() {
                        var e = $e();
                        ee(t, h, v, Y, U, H, e, N, null, e, !1, b, I, !C), u && (pt = t.getLast())
                    })), R || X) {
                    var z = M && 0 === M.bw ? -1 : f || -1;
                    ee(t, h, v, Y, U, 0, l, z, A, T, X, b, I), a && u && !F && (It = t.cloneLast())
                }
                if (F) {
                    if (c) {
                        y = Le[c];
                        var O = 0,
                            D = 0,
                            _ = 1;
                        y && (O = y.dx / 100 * W, D = y.dy / 100 * V, _ = y.e), t.image(h - W * _ + O, v - V * _ + D, h + W * _ + O, v + V * _ + D, i + c, b, n.ci ? "ci" : void 0, 1)
                    } else {
                        var P = p ? Math.min(W, V) : W;
                        ve(t, e, b, h, v, P, s.t, s.c || Ce.colours.black, s.ff || ke)
                    }
                    a && u && (It = t.cloneLast())
                }
                M && ye(t, h, v, Math.min(Y, U), M, Z, b + Oe), ce(t, e, h, v, f, W, V, n, p, I, R, X, F, C, Z, m, b, i, x, o)
            }
        }

        function ae(e, t) {
            var n = e.getLayer(),
                r = Ce.selectionBorderLayer[n];
            r && e.setLayer(r), t(), r && e.setLayer(n)
        }

        function oe(e, t, n, r, i, a) {
            var o = 0,
                l = 0,
                u = "centre";
            return -1 === e.indexOf("n") && -1 === e.indexOf("s") || (l = -n, 2 === e.length && (l -= r.dy), -1 !== e.indexOf("s") && (l *= -1)), -1 === e.indexOf("e") && -1 === e.indexOf("w") || (o = t, u = "right", 2 === e.length && (o += r.dx), -1 !== e.indexOf("w") && (o *= -1, u = "left")), !i && a && (-1 !== ["n", "s"].indexOf(e) ? l *= Math.sqrt(2) : -1 !== ["e", "w"].indexOf(e) && (o *= Math.sqrt(2))), {
                gdx: o,
                gdy: l,
                growDirection: u
            }
        }

        function le(e, t, n, r, i) {
            var a, o, l = "centre";
            switch (e > 0 && 180 > e ? l = "right" : e > 180 && (l = "left"), i) {
                case "circle":
                    a = Math.sin(e) * r, o = -Math.cos(e) * r;
                    break;
                case "rectangle":
                    var u, c = [Math.atan2(t, n), Math.atan2(t, -n), Math.atan2(-t, -n), Math.atan2(-t, n)];
                    for (u = 0; u < c.length; u++) c[u] < 0 && (c[u] += 2 * Math.PI);
                    e < c[0] || e > c[3] ? (o = -n, a = -o * Math.tan(e)) : e < c[1] ? (a = t, o = e === Math.PI / 2 ? 0 : -a / Math.tan(e)) : e < c[2] ? (o = n, a = -o * Math.tan(e)) : (a = -t, o = e === 3 * (Math.PI / 2) ? 0 : -a / Math.tan(e));
                    break;
                default:
                    a = 0, o = 0
            }
            return {
                gdx: a,
                gdy: o,
                growDirection: l
            }
        }

        function ue(e, t, n, r, i, a, o, l, u, c, s, f) {
            var d, g = 0;
            if (-1 !== ["n", "ne", "e", "se", "s", "sw", "w", "nw"].indexOf(s.p)) d = oe(s.p, n, r, f, c, u);
            else {
                var h = "rectangle",
                    v = 0;
                u && (h = "circle", v = c ? Math.min(n, r) : Math.sqrt(2) * n), d = le(we.toRadians(s.p), n, r, v, h)
            }
            if (null !== d.gdx) {
                d.gdx < 0 && d.gdy < 0 && s.e && (i._sl.e = Math.max(i._sl.e, s.e));
                var m = o + Oe + s.p,
                    y = i._sx + d.gdx,
                    b = i._sy + d.gdy;
                g = ge(e, t, m, y, b, a, s, l, i, d.growDirection, !0)
            }
            return i._sy + d.gdy + g
        }

        function ce(e, t, r, i, a, l, u, c, s, f, d, g, h, v, m, y, b, p, I, x) {
            var C, w, G, A, B, Z, R, M = r,
                E = i,
                k = M,
                S = M,
                W = E,
                V = o(c),
                X = !1,
                T = c._combo && c._combo.open ? y : m;
            I ? (w = Te.fb || c.fb, G = Te.fbc || c.fbc, A = Te.fc || c.fc, B = Te.ff || c.ff, Z = (Te.fs || c.fs || Ze) * T, R = Te.tc || c.tc) : (w = c.fb, G = c.fbc, A = c.fc, B = c.ff, Z = (c.fs || Ze) * T, R = c.tc), c._combo && c._combo.open && (R = !1);
            var N = 3 * T + Z / 2,
                H = A || Ce.colours.black,
                Y = G || Ce.colours.textback;
            v && (H = n(), Y = $e());
            var U = E + u + N,
                K = D(c),
                z = _(K, t, Z, w, B),
                O = Z + 3,
                P = O,
                j = O * K.length;
            K.length > 0 && (S -= z[0] / 2);
            var Q = h || d || g,
                q = we.defined(R) ? !!R : !h && !s,
                $ = (K.length - 1) * (P / 2);
            if (Q) q && (U = E - $);
            else {
                if (V) {
                    var ee = F(c.g[c.g.length - 1]) * T;
                    S = M + ee, M += z[0] / 2 + ee
                }
                U = E, E += $
            }
            var te = M;
            if (("e" === f || "w" === f) && (d || g)) {
                var ne = 8 * T;
                te += "e" === f ? ne : -ne
            }
            if (K.length > 0 && (W = U), d && !q && (U += a - 3 * T), Q) {
                var re = 3,
                    ie = 3,
                    ae = {
                        dx: 0,
                        dy: h ? -8 : 0
                    },
                    oe = 2;
                s || "circle" !== f || (re += oe, ie += oe, h && (ae.dx += oe, ae.dy += oe)), s && (re++, ie++);
                var le = re * T,
                    ce = ie * T;
                if (ae.dx *= T, ae.dy *= T, c._sl.x = -l + (le - ae.dx), c._sl.y = -u + (ce - ae.dy), V) {
                    var se = "circle" === f;
                    for (C = 0; C < c.g.length; C++) {
                        var fe = ue(e, t, l - le, u - ce, c, m, b, p, se, s, c.g[C], ae);
                        q || (U = Math.max(U, fe + N))
                    }
                }
            }
            for (var de = 0; de < K.length; de++) {
                var ge = J(t, e, K[de], te, U, b, !0, H, Y, w, c, !1, !0, 99, z[de], v, Z, B || Me, null, null, T);
                X = X || ge, U += P
            }
            if (!Q) {
                var he = !c.t || !X;
                L(e, t, c.g, he ? k : S, W, T, he, v, p, b, c)
            }
            var ve = !c._noHalos || I;
            if (!s && ve && me(e, b, M, E, T, c, I, x), c.bu) {
                var ye = 0;
                Q ? ye = u : j > 0 ? ye = j / 2 + 4 : o(c) && (ye = 13 * T), be(e, t, b, M, E, ye, T, c.bu, p, x)
            }
        }

        function se(e) {
            return "b" in e ? e.b : Ce.colours.keyline
        }

        function fe(e, t, n, r) {
            e._cl.push({
                cx: t,
                cy: n,
                r: r
            })
        }

        function de(e, t, n, r, i) {
            e._cl.push({
                x1: t,
                x2: r,
                y1: n,
                y2: i
            })
        }

        function ge(e, t, n, r, i, a, o, l, u, c, s, f) {
            var d = r,
                g = i,
                h = a,
                v = 0;
            if (o && !(u && u._combo && u._combo.open)) {
                o.e && (h *= o.e);
                var m, y = o.a ? bt : 1,
                    b = ot * h * y,
                    p = se(o),
                    I = p ? lt * h : -1,
                    x = !!(o.u || o.fi && o.fi.t),
                    C = 0,
                    w = 0,
                    G = 1;
                if (v = b + (p ? I / 2 : 0), o.c) {
                    if (o.t) {
                        var A, B, Z, R, M = we.objectHasOwnProperty(o, "fb") ? o.fb : !0,
                            E = o.fc || Ce.colours.white,
                            k = o.ff || Me;
                        if (o.w && s) {
                            A = h * Ke[1] * y, Z = (o.t + "").substring(0, 25), B = Ce.measureText(t, Z, A, M, k).width, R = Math.max(B, b);
                            var L, S, W = R + b;
                            switch (c) {
                                case "left":
                                    S = d + b, L = S - W, d = S - W / 2;
                                    break;
                                case "centre":
                                    L = d - W / 2, S = d + W / 2;
                                    break;
                                default:
                                    L = d - b, S = L + W, d = L + W / 2
                            }
                            var V = g - b,
                                X = g + b;
                            e.round(L, V, S, X, b, p, I, o.c, !0, n, f), u && (fe(u, L + b - u._sx, g - u._sy, v), fe(u, S - b - u._sx, g - u._sy, v), de(u, L + b - u._sx, V - u._sy - I / 2, S - b - u._sx, X - u._sy + I / 2))
                        } else e.circle(d, g, b, p, I, o.c, !0, n, null, null, f), Z = (o.t + "").substring(0, 4), A = h * Ke[Z.length - 1] * y, B = Ce.measureText(t, Z, A, M, k).width, R = 1.7 * b, u && fe(u, d - u._sx, g - u._sy, v);
                        J(t, e, Z, d, g, n, !1, E, Ce.colours.white, M, null, !0, !1, R, B, !1, A, k, f)
                    } else if (e.circle(d, g, b, p, I, o.c, !0, n, null, null, f), u && fe(u, d - u._sx, g - u._sy, v), x) {
                        var F = b / 1.41421;
                        if (o.u) {
                            m = Le[o.u], m && (C = m.dx / 100 * F, w = m.dy / 100 * F, G = m.e);
                            var T = F * G;
                            e.image(d - T + C, g - T + w, d + T + C, g + T + w, l + o.u, n, null, null, null, f)
                        } else ve(e, t, n, d, g, F, o.fi.t, o.fi.c || Ce.colours.black, o.fi.ff || ke, f)
                    }
                } else x && (u && fe(u, d - u._sx, g - u._sy, b), o.u ? (m = Le[o.u], m && (C = m.dx / 100 * b, w = m.dy / 100 * b, G = m.e), e.image(d - b * G + C, g - b * G + w, d + b * G + C, g + b * G + w, l + o.u, n, null, null, null, f)) : ve(e, t, n, d, g, b, o.fi.t, o.fi.c || Ce.colours.black, o.fi.ff || ke, f));
                o.a && (xt = xt || {}, xt[we.rawId(n)] = !0)
            }
            return v
        }

        function he(e, t) {
            return Z(e, t, 0, 0)
        }

        function ve(e, t, n, r, i, a, o, l, u, c) {
            e.rect(r - a, i - a, r + a, i + a, Ce.colours.transparent, -1, Ce.colours.transparent, !0, n, null, c);
            var s = 2 * a,
                f = Ce.measureText(t, o, s, !1, u || Me, !0),
                d = he(f.width, f.height),
                g = d - s,
                h = s - g / 2;
            f = Ce.measureText(t, o, h, !1, u || Me, !0), d = he(f.width, f.height);
            var v = Le[o],
                m = 0,
                y = 0,
                b = 1;
            v && (m = v.dx / 100 * a, y = v.dy / 100 * a, b = v.e);
            var p = 5 / 6,
                I = a * p * b,
                x = r - I + m,
                C = i - I + y,
                w = r + I + m,
                G = i + I + y;
            e.text(r + m, i + h * b / 2 + y, o, l, h * b, !1, n, u, !0, d, !0, null, x, C, w, G, null, null, null, c)
        }

        function me(e, t, n, r, i, a, o, l) {
            var u, c = e.getLayer(),
                s = Ge.nodeHaloProps,
                f = !0;
            e.setLayer(Ce.layers.HALOS, l);
            for (var d = 0; d < s.length; d++) {
                var g = s[d];
                if (u = o && Te[g] || a[g]) {
                    f = !1;
                    var h = t + Oe + g,
                        v = u.r * i,
                        m = u.w * i;
                    m / 2 >= v ? e.circle(n, r, v + m / 2, Ce.colours.white, -1, u.c, !0, h, null, !0) : e.circle(n, r, v, u.c, m, Ce.colours.white, !1, h, null, !0)
                }
            }
            a._noHalos = f && !o, e.setLayer(c, l)
        }

        function ye(e, t, n, r, i, a, o) {
            var l = i.bw * a,
                u = i.w * a;
            if (u > 0) {
                var c = i.v.filter(function(e) {
                    return e > 0
                }).length;
                if (1 === c) {
                    var s = 0;
                    i.v.forEach(function(e, t) {
                        e > 0 && (s = t)
                    }), e.circle(t, n, r, i.c[s], u, Ce.colours.white, !1, o + "do0", null, !0)
                } else {
                    var f = i.v.reduce(function(e, t) {
                            return e + t
                        }, 0),
                        d = l / r,
                        g = d * c,
                        h = 2 * Math.PI - g,
                        v = -Math.PI / 2 + d / 2;
                    h > 0 && i.v.reduce(function(a, s, g) {
                        var v = a;
                        if (0 === s) return v;
                        var m = v + h * s / f,
                            y = m + d,
                            b = i.c[g % i.c.length];
                        return 0 === l && (0 === g ? v -= yt : g !== c - 1 && (m += yt)), e.arc(t, n, r, v, m, b, u, o + "do" + g, null, !0), y
                    }, v)
                }
            }
        }

        function be(e, t, n, r, i, a, o, l, u, c) {
            var s = o * Ct;
            if (l.t) {
                var f = r,
                    d = i,
                    g = e.getLayer();
                e.setLayer(Ce.layers.BUBBLES, c);
                var h = l.p ? "" + l.p : "ne",
                    v = "w" === h.substring(1, 2),
                    m = "s" === h.substring(0, 1),
                    y = n + Oe + "bu",
                    b = Number(l.fs ? l.fs : Ze) * s,
                    p = l.b ? l.b : Ce.colours.keyline,
                    I = l.c ? l.c : Ce.colours.white,
                    x = l.fc ? l.fc : Ce.colours.black,
                    C = D(l),
                    w = b + 3 * s,
                    G = w * C.length,
                    A = _(C, t, b, l.fb, l.ff),
                    B = P(A),
                    Z = 13 * s,
                    R = 6 * s,
                    M = 2 * o,
                    E = 9 * s,
                    k = 13 * s,
                    L = 10 * s,
                    S = a + k,
                    W = G + 2 * R,
                    V = 2 * s,
                    X = Math.max(V / 2, 1),
                    F = 3 * s;
                l.g && delete l.g.e;
                var T = l.g ? 17 * s : 0;
                v && (f -= B + 2 * M + 2 * Z + T), m && (d += (b + 3) * C.length + 2 * S + 2 * R);
                var N = f + M + .5,
                    H = f + M + 2 * Z + B + T + .5,
                    Y = d - S - W + .5,
                    U = d - S + .5;
                e.round(N, Y, H, U, 8 * s, p, V, I, !0, y), ge(e, t, y, f + T, (Y + U) / 2, s, l.g, u);
                var K, z = Y - .5 + R + w,
                    O = N + Z + T - .5;
                for (K = 0; K < C.length; K++) {
                    var j = A[K];
                    e.text(O, z, C[K], x, b, l.fb, y, l.ff || Me, !1, j, !1, !1, O - 1.5, z - b, H, U), z += w
                }
                v && (N = H, E = -E, L = -L, X = -X), m && (U = Y, k = -k, F = -F), e.triangle(N + E, U, N + E + L, U, N + E, U + k, p, V, I, !0, y, 0, !1), e.triangle(N + E + X, U - F, N + E + L + X, U - F, N + E + X, U + k - F, p, -1, I, !0, y, 0, !1), e.setLayer(g)
            }
        }
        var pe = {},
            Ie = !1,
            xe = !1,
            Ce = KeyLines.Rendering,
            we = KeyLines.Util,
            Ge = KeyLines.Validation,
            Ae = 1,
            Be = KeyLines.Generator.defaultFontSize,
            Ze = Be;
        pe.fontSize = Ze;
        var Re, Me, Ee, ke, Le, Se, We, Ve, Xe, Fe, Te, Ne, He, Ye, Ue, Ke = [12, 9, 7, 7],
            ze = {
                line: 1,
                arc: 2
            },
            Oe = we.idSep(),
            De = 1,
            _e = 2,
            Pe = {
                small: 6,
                normal: 10,
                large: 20,
                xlarge: 30
            },
            je = 0,
            Je = {},
            Qe = Ge.defaultOpenComboStyle,
            qe = {
                hib: !1,
                present: {
                    t: !0,
                    t1: !1,
                    t2: !1
                },
                pos: {
                    t: {
                        lx: 0,
                        ly: 0,
                        tdx: 1,
                        tdy: 0,
                        tangent: 0,
                        R: 0
                    },
                    t1: {
                        lx: 0,
                        ly: 0,
                        tdx: 1,
                        tdy: 0,
                        tangent: 0,
                        R: 0
                    },
                    t2: {
                        lx: 0,
                        ly: 0,
                        tdx: 1,
                        tdy: 0,
                        tangent: 0,
                        R: 0
                    }
                }
            };
        pe.setSpecialOptions = function(e, t) {
            Je[e] = t
        }, pe.editColour = function() {
            return Se || Ce.colours.edit
        };
        var $e = pe.editColour;
        pe.setOptions = function(e) {
            Re = e.arrows, we.isNumber(e.labelOffset) && (je = e.labelOffset), Ue = e.truncateLabels && e.truncateLabels.maxLength && we.isNumber(e.truncateLabels.maxLength) ? e.truncateLabels.maxLength : !1, e.selectionColour && (Se = Ce.validatergb(e.selectionColour) ? e.selectionColour : void 0), Fe = e.fanLength, Me = e.fontFamily, Ee = "along" === e.linkStyle.glyphs, ke = e.iconFontFamily, Le = e.imageAlignment || {}, Ve = e.linkEnds.avoidLabels, We = "loose" !== e.linkEnds.spacing, e.selectionFontColour && (Xe = Ce.validatergb(e.selectionFontColour) ? e.selectionFontColour : void 0), Te = e.selectedNode, Ne = we.isNormalObject(e.selectedNode), He = e.selectedLink, Ye = we.isNormalObject(e.selectedLink)
        }, pe.shapeTest = function(e) {
            var t = !1;
            return t = isFinite(e.w) && isFinite(e.h) || e._combo && e._combo.open
        };
        var et = pe.shapeTest,
            tt = function(e, t, n, r, i, a) {
                var o = r - e,
                    l = i - t,
                    u = Math.sqrt(o * o + l * l);
                if (u > n + a || u < Math.abs(n - a) || 0 === u) return [];
                var c = (n * n - a * a + u * u) / (2 * u),
                    s = Math.sqrt(n * n - c * c),
                    f = e + c * o / u,
                    d = t + c * l / u,
                    g = f + s * (l / u),
                    h = f - s * (l / u),
                    v = d - s * (o / u),
                    m = d + s * (o / u);
                return [Math.atan2(v - t, g - e), Math.atan2(m - t, h - e)]
            },
            nt = 34,
            rt = {
                t: .5,
                t1: .15,
                t2: .85
            },
            it = 3,
            at = 1,
            ot = 9,
            lt = 2,
            ut = Math.PI / 7,
            ct = Math.cos(ut);
        pe.arrowLength = H, pe.labelPosition = function(e, t) {
            if (!e || e.hi) return null;
            var n = e._edit;
            if (!n || n.hib) return null;
            var r = n.x1,
                i = n.y1,
                a = n.x2,
                o = n.y2;
            return "node" === e.type && (r += e.x, i += e.y, a += e.x, o += e.y), {
                x1: t.x(r),
                y1: t.y(i),
                x2: t.x(a),
                y2: t.y(o),
                fs: t.dim(n.fs)
            }
        };
        var st = 4,
            ft = 27;
        KeyLines.Generator.defaultBorderWidth = st, KeyLines.Generator.baseRadius = ft;
        var dt = 50,
            gt = dt - ft,
            ht = Math.sqrt(ft * ft + gt * gt) / ft,
            vt = 1 - Math.sin(Math.atan2(ft, gt) / 2),
            mt = {
                box: !0,
                circle: !0,
                e: !1,
                w: !1
            },
            yt = Math.PI / 256;
        pe.contains = function(e, t) {
            function n(e, t) {
                e && r.push(t)
            }
            var r = [],
                i = we.defaults(e, {
                    sh: "box",
                    x: 0,
                    y: 0
                });
            if (et(i))
                if ("circle" === i.sh) {
                    var a = Math.min(i.w, i.h) / 2;
                    we.forEach(t, function(e) {
                        et(e) ? "circle" === e.sh ? n(Ce.insideCircle(i.x, i.y, a, e.x, e.y, Math.min(e.w, e.h) / 2), e.id) : n(Ce.circleContains(i.x, i.y, a, e.x - e.w / 2, e.y - e.h / 2, e.x + e.w / 2, e.y + e.h / 2), e.id) : n(Ce.insideCircle(i.x, i.y, a, e.x, e.y), e.id)
                    })
                } else {
                    var o = {
                        x1: i.x - i.w / 2,
                        y1: i.y - i.h / 2,
                        x2: i.x + i.w / 2,
                        y2: i.y + i.h / 2
                    };
                    we.forEach(t, function(e) {
                        if (et(e))
                            if ("circle" === e.sh) {
                                var t = Math.min(e.w, e.h) / 2;
                                n(Ce.rectContains(o, e.x - t, e.y - t, e.x + t, e.y + t), e.id)
                            } else n(Ce.rectContains(o, e.x - e.w / 2, e.y - e.h / 2, e.x + e.w / 2, e.y + e.h / 2), e.id);
                        else n(Ce.inside(o, e.x, e.y), e.id)
                    })
                }
            return r
        };
        var bt, pt, It, xt, Ct = 1;
        return pe.getResizePrimitive = function() {
            return It
        }, pe.animated = function() {
            return !!xt
        }, pe.generate = function(n, r, i, a, o, l, u, c, s, f, d, g, h) {
            function v(e) {
                var r = 0,
                    i = d(e.id),
                    a = i && !et(e);
                if (e._parentId || e._combo) {
                    var o = t.privateGetAncestryIds(e.id),
                        c = t.privateGetItem(o[0]);
                    void 0 === c._combo.index && (c._combo.index = Ae++), r = 1e4 * c._combo.index + 5 * o.length, i && e.bg && (a = !1, r++)
                }
                l.resetItem(e, r, e.x, e.y), l.setLayer(et(e) ? Ce.layers.SHAPES : Ce.layers.NODES, a), ie(u, l, e, n, f, i, a)
            }

            function m(e) {
                var r, i, a = 0,
                    o = g(e.id);
                e._parentId && (a = t.privateGetParentItems(e.id).length);
                var c = d(e.id);
                l.resetItem(e, a), r = n[e.id1], i = n[e.id2], o && (r = t.privateFirstVisibleItemInAncestry(e.id1), i = t.privateFirstVisibleItemInAncestry(e.id2), !r || !i || r === i && r !== n[e.id1]) || (l.setLayer(Ce.layers.LINKS, !1), V(u, l, e, n, f, c, r, i, o, h))
            }
            var y, b, p, I, x, C;
            if (Ie = xe, xe = !1, It && (i || o[It.id] === _e) && (pt = null, It = null), xt = null, bt = e.atanEasing(Date.now() % 1e3 / 1e3), Ct = c.getUnzoom(), i) {
                for (l.removeAllItems(), I = Object.keys(n), p = Object.keys(r), y = 0, b = I.length; b > y; y++) v(n[I[y]]);
                for (y = 0, b = p.length; b > y; y++) m(r[p[y]])
            } else {
                var w = Object.keys(o);
                for (y = 0, b = w.length; b > y; y++) {
                    x = w[y];
                    var G = n[x];
                    if (G)
                        if (o[x] === De)
                            if (G._parentId || G._combo) v(G);
                            else {
                                if (G._parentId) {
                                    var A = re(G, n);
                                    G._sx = A.x, G._sy = A.y
                                } else G._sx = G.x, G._sy = G.y;
                                l.moveItem(G, G.x, G.y)
                            } else v(G);
                    else r[x] || l.removeItem(x)
                }
                if (a)
                    for (p = Object.keys(r), y = 0, b = p.length; b > y; y++) m(r[p[y]]);
                else
                    for (C && (w = Object.keys(o)), y = 0, b = w.length; b > y; y++) x = w[y], r[x] && m(r[x])
            }
            return l.assembleItems(), {
                stillDirty: xt,
                rebuildAll: Ie
            }
        }, pe.generateHandles = function(e, t, n, r) {
            e.extras(), e.setLayer(Ce.layers.HANDLES), pt && 1 === r.length && (Ce.getHandles(e, t, n, pt, 1, pt.id, $e(), Oe), Ce.getHandles(e, t, n, pt, 4, pt.id, Ce.colours.transparent, Oe))
        }, pe
    }
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    e && (e.textFactory = function(e) {
        var t = function(e, t, n, r, i, a) {
                var o = t.positionIndex;
                e[o++] = n, e[o++] = r, e[o++] = 0, e[o++] = i, e[o++] = r, e[o++] = 0, e[o++] = n, e[o++] = a, e[o++] = 0, e[o++] = n, e[o++] = a, e[o++] = 0, e[o++] = i, e[o++] = r, e[o++] = 0, e[o++] = i, e[o++] = a, e[o++] = 0, t.positionIndex = o
            },
            n = function(e, t, n, r, i, a, o, l) {
                var u = t.textureIndex;
                e[u++] = n, e[u++] = r, e[u++] = 0, e[u++] = 0, e[u++] = l, e[u++] = o, e[u++] = 0, e[u++] = 0, e[u++] = 0, e[u++] = i, e[u++] = r, e[u++] = 1, e[u++] = 0, e[u++] = l, e[u++] = o, e[u++] = 0, e[u++] = 0, e[u++] = 0, e[u++] = n, e[u++] = a, e[u++] = 0, e[u++] = 1, e[u++] = l, e[u++] = o,
                    e[u++] = 0, e[u++] = 0, e[u++] = 0, e[u++] = n, e[u++] = a, e[u++] = 0, e[u++] = 1, e[u++] = l, e[u++] = o, e[u++] = 0, e[u++] = 0, e[u++] = 0, e[u++] = i, e[u++] = r, e[u++] = 1, e[u++] = 0, e[u++] = l, e[u++] = o, e[u++] = 0, e[u++] = 0, e[u++] = 0, e[u++] = i, e[u++] = a, e[u++] = 1, e[u++] = 1, e[u++] = l, e[u++] = o, e[u++] = 0, e[u++] = 0, e[u++] = 0, t.textureIndex = u
            };
        return function(r, i, a, o, l, u, c, s) {
            var f, d, g = 1;
            (l.rebuildOptions.all || l.rebuildOptions.positions || l.alwaysUpdate) && (g = 14 / o * (i.fs / 14), d = 0);
            var h = i.wc[0],
                v = i.wc[1],
                m = i.wc[2],
                y = i.wc[3],
                b = r.colourData,
                p = r.positionData,
                I = r.textureData,
                x = r.shadowData,
                C = i.wmargin,
                w = i.fs * (i.pf / 2),
                G = i.x1,
                A = i.y1 + i.yOffset + w;
            u && (G += u.x, A += u.y);
            for (var B = (c ? e.background : 1) * (s ? e.ghost : 1), Z = 0, R = a.length; R > Z; Z++) {
                var M, E = a[Z],
                    k = o * g;
                if (l.rebuildOptions.all || l.rebuildOptions.shadow || l.alwaysUpdate) {
                    for (f = r.shadowIndex, M = 0; 6 > M; M++) x[f++] = 0, x[f++] = 0, x[f++] = 0, x[f++] = 0;
                    r.shadowIndex = f
                }
                if (l.rebuildOptions.all || l.rebuildOptions.colours || l.alwaysUpdate) {
                    for (f = r.colourIndex, M = 0; 6 > M; M++) b[f++] = h * B, b[f++] = v * B, b[f++] = m * B, b[f++] = y * B;
                    r.colourIndex = f
                }
                var L;
                (l.rebuildOptions.all || l.rebuildOptions.positions || l.alwaysUpdate) && (L = E.width * g, i.hib ? t(p, r, 0, 0, 0, 0) : t(p, r, G + d + C, A + k, G + (d + L) + C, A)), (l.rebuildOptions.all || l.rebuildOptions.textures || l.alwaysUpdate) && n(I, r, E.u1, E.v1, E.u2, E.v2, E.colourComponent, E.textureBank), d += L
            }
        }
    })
}(),
function() {
    "use strict";
    if (KeyLines.WebGL) {
        var e = 6;
        KeyLines.WebGL.rectangleFactory = function(t) {
            return function(n, r, i, a, o, l, u, c, s, f, d, g, h) {
                var v, m, y = r,
                    b = i,
                    p = a,
                    I = o,
                    x = n.wsc || [0, 0, 0, 0],
                    C = d || 0;
                if (u.alwaysUpdate || u.rebuildOptions.all || u.rebuildOptions.shadow) {
                    v = u.triangleBuffers.shadowIndex;
                    var w = u.triangleBuffers.shadowData;
                    for (m = 0; e > m; m++) w[v++] = x[0], w[v++] = x[1], w[v++] = x[2], w[v++] = x[3];
                    u.triangleBuffers.shadowIndex = v
                }
                if (u.rebuildOptions.colours || u.alwaysUpdate || u.rebuildOptions.all) {
                    var G = (s ? t.background : 1) * (f ? t.ghost : 1);
                    v = u.triangleBuffers.colourIndex;
                    var A = u.triangleBuffers.colourData;
                    for (m = 0; e > m; m++) A[v++] = l[0], A[v++] = l[1], A[v++] = l[2], A[v++] = l[3] * G;
                    u.triangleBuffers.colourIndex = v
                }
                if (u.rebuildOptions.positions || u.alwaysUpdate || u.rebuildOptions.all) {
                    v = u.triangleBuffers.positionIndex;
                    var B = u.triangleBuffers.positionData;
                    if (h)
                        for (m = 0; 18 > m; m++) B[v++] = 0;
                    else c && (y += c.x, b += c.y, p += c.x, I += c.y), B[v++] = y, B[v++] = b, B[v++] = C, B[v++] = p, B[v++] = b, B[v++] = C, B[v++] = y, B[v++] = I, B[v++] = C, B[v++] = y, B[v++] = I, B[v++] = C, B[v++] = p, B[v++] = b, B[v++] = C, B[v++] = p, B[v++] = I, B[v++] = C;
                    u.triangleBuffers.positionIndex = v
                }
                if (u.rebuildOptions.textures || u.alwaysUpdate || u.rebuildOptions.all) {
                    v = u.triangleBuffers.textureIndex;
                    var Z, R = u.triangleBuffers.textureData;
                    Z = g > 1 ? -3 : -1, R[v++] = 0, R[v++] = 0, R[v++] = p - y, R[v++] = I - b, R[v++] = Z, R[v++] = 0, R[v++] = -C, R[v++] = 0, R[v++] = 0, R[v++] = p - y, R[v++] = 0, R[v++] = p - y, R[v++] = I - b, R[v++] = Z, R[v++] = 0, R[v++] = -C, R[v++] = 0, R[v++] = 0, R[v++] = 0, R[v++] = I - b, R[v++] = p - y, R[v++] = I - b, R[v++] = Z, R[v++] = 0, R[v++] = -C, R[v++] = 0, R[v++] = 0, R[v++] = 0, R[v++] = I - b, R[v++] = p - y, R[v++] = I - b, R[v++] = Z, R[v++] = 0, R[v++] = -C, R[v++] = 0, R[v++] = 0, R[v++] = p - y, R[v++] = 0, R[v++] = p - y, R[v++] = I - b, R[v++] = Z, R[v++] = 0, R[v++] = -C, R[v++] = 0, R[v++] = 0, R[v++] = p - y, R[v++] = I - b, R[v++] = p - y, R[v++] = I - b, R[v++] = Z, R[v++] = 0, R[v++] = -C, R[v++] = 0, R[v++] = 0, u.triangleBuffers.textureIndex = v
                }
            }
        }
    }
}(),
function() {
    KeyLines.Iterators = {};
    var e = KeyLines.Iterators;
    e.create = function(e, t, n) {
        function r(e, t, r) {
            if (!e.type || !e.type.match(/^(node|link|all)$/)) throw new TypeError("options type property should be either 'node', 'link' or 'all'");
            if (!e.items || !e.items.match(/^(underlying|toplevel|all)$/)) throw new TypeError("options items property should be either 'underlying', 'toplevel' or 'all'");
            if (f || (d = n.privateGetRawItems(), g = d, t ? h = d : (f = s.clone(d, !0), h = f)), KeyLines.Util.isFunction(r))
                for (var i = 0; i < g.length; i++) {
                    var a = g[i];
                    o(e.type, a) && l(e.items, a) && r(h[i])
                }
        }

        function i(e, t) {
            t.forEach(function(t) {
                e[t.id] && (e[t.id1] = !0, e[t.id2] = !0)
            })
        }

        function a(e, t) {
            t.forEach(function(t) {
                e[t.id] = !(!e[t.id1] || !e[t.id2])
            })
        }

        function o(e, t) {
            return "all" === e || e === t.type
        }

        function l(e, t) {
            var n = !0;
            switch (e) {
                case "toplevel":
                    n = !t._parentId;
                    break;
                case "all":
                    n = !0;
                    break;
                case "underlying":
                default:
                    n = !t._combo
            }
            return n
        }

        function u(e, t, n, o, l, u, c, s) {
            function f() {
                var e = {
                    all: [],
                    nodes: [],
                    links: []
                };
                return r({
                    type: "all",
                    items: s ? "underlying" : "toplevel"
                }, !1, function(t) {
                    e.all.push(t), e[t.type + "s"].push(t)
                }), e
            }

            function d(t) {
                var n;
                n = "node" === l ? t.nodes : "link" === l ? t.links : t.all, n.forEach(function(t) {
                    e(t) && (y[t.id] = !0)
                })
            }

            function g(e) {
                "link" === l && (u ? i(y, e.links) : e.nodes.forEach(function(e) {
                    y[e.id] = !0
                }))
            }

            function h(e) {
                "node" === l && a(y, e.links)
            }

            function v(e) {
                "all" === l && "bg" !== t && e.links.forEach(function(e) {
                    y[e.id] = !(!y[e.id1] || !y[e.id2] || !y[e.id])
                })
            }

            function m(e) {
                if ("link" !== l && u) {
                    var t = {};
                    e.links.forEach(function(e) {
                        t[e.id1] = t[e.id1] || y[e.id] && y[e.id2], t[e.id2] = t[e.id2] || y[e.id] && y[e.id1]
                    }), e.nodes.forEach(function(e) {
                        y[e.id] = y[e.id] && t[e.id]
                    })
                }
            }
            var y = {},
                b = {
                    all: {}
                };
            b[n] = {
                nodes: [],
                links: []
            }, b[o] = {
                nodes: [],
                links: []
            }, b.all[n] = {
                nodes: [],
                links: []
            }, b.all[o] = {
                nodes: [],
                links: []
            };
            var p = f();
            return d(p), g(p), h(p), v(p), m(p), p.all.forEach(function(e) {
                var r = e.type + "s",
                    i = y[e.id] ? n : o;
                !y[e.id] == !e[t] && b[i][r].push(e.id), b.all[i][r].push(e.id)
            }), b
        }
        var c = {},
            s = KeyLines.Util,
            f = null,
            d = null,
            g = null,
            h = null;
        return t.privateBind("redraw", function() {
            f = null, d = null
        }), c.each = r, c.filter = function(t, r, i) {
            function a() {
                s.invoke(i, s.clone({
                    shown: l.shown,
                    hidden: l.hidden,
                    combos: l.combos
                }, !0))
            }
            var o = "underlying" === r.items,
                l = u(t, "hi", "shown", "hidden", r.type, r.hideSingletons, !1, o),
                c = l.shown.nodes.concat(l.shown.links),
                f = l.hidden.nodes.concat(l.hidden.links),
                d = e.combo.internalUse.filter(c, f, l, r);
            c = d.toShow, f = d.toHide, f.length > 0 ? c.length > 0 ? (r.time /= 2, n.privateHideWithoutCombos(f, r, function() {
                n.privateShowWithoutCombos(c, !1, r, a)
            })) : n.privateHideWithoutCombos(f, r, a) : c.length > 0 ? n.privateShowWithoutCombos(c, !1, r, a) : a()
        }, c.foreground = function(t, r, i) {
            var a = "link" === r.type,
                o = "underlying" === r.items,
                l = u(t, "bg", "foreground", "background", r.type, a, !0, o),
                c = l.foreground.nodes.concat(l.foreground.links),
                f = l.background.nodes.concat(l.background.links),
                d = e.combo.internalUse.foreground(c, f, l, r);
            f = d.toHide.map(function(e) {
                return {
                    id: e,
                    bg: !0
                }
            }), c = d.toShow.map(function(e) {
                return {
                    id: e,
                    bg: !1
                }
            }), n.setProperties(c.concat(f), !1, function() {
                s.invoke(i, s.clone({
                    foreground: l.foreground,
                    background: l.background
                }, !0))
            })
        }, c
    }
}(),
function() {
    KeyLines.Layouts = KeyLines.Layouts || {};
    var e = KeyLines.Layouts;
    e.create = function(t) {
        function n(e, t, n, i, a, o, l, u, c, s) {
            var f = a[l];
            if (!(f in n)) {
                if (!(f in i)) throw new Error("link has end which is not in nodes list");
                var d = i[f];
                if (d.hi) throw new Error("link has end which is hidden");
                n[f] = r(e, t, d, f, u, c, s)
            }
            return f
        }

        function r(e, n, r, i, a, o, l) {
            var u;
            if (o) {
                var c = t.options().truncateLabels;
                u = c ? c.maxLength : void 0
            }
            var s = ce.nodeSize(r, n, o, u);
            return {
                id: i,
                x: r.x,
                y: r.y,
                size: l ? s.legacyRadius : s.radius,
                fixed: a ? i in a : !1,
                lc: 0,
                d: r.d,
                w: s.width,
                h: s.height,
                labeloff: ce.labelOffset(r)
            }
        }

        function i(e, t) {
            return e.fixed && !t.fixed ? -1 : t.fixed && !e.fixed ? 1 : 0
        }

        function a(e, t, i, a, o, l, u, c, s) {
            for (var f = o().connections({
                    all: !1,
                    combos: s
                }), d = {}, g = [], h = 0; h < f.length; h++) {
                var v = f[h][0],
                    m = a[v],
                    y = n(e, t, d, i, m, v, "id1", l, u, c),
                    b = n(e, t, d, i, m, v, "id2", l, u, c);
                if (null !== y && null !== b) {
                    var p, I = [{
                            id: v,
                            sign: 1,
                            off: m.off
                        }],
                        x = m.w || 1;
                    for (p = 1; p < f[h].length; p++) v = f[h][p], m = a[v], I.push({
                        id: v,
                        sign: m.id1 === y ? 1 : -1,
                        off: m.off
                    }), x = Math.max(x, m.w || 1);
                    g.push({
                        id1: y,
                        id2: b,
                        id: v,
                        arrowSize: e.arrowLength(x, 1),
                        links: I,
                        numLinks: I.length
                    }), d[y].lc += 1, d[b].lc += 1
                }
            }
            ue.forEach(i, function(n, i) {
                if (!n.hi && (s || !n._parentId) && !d[i]) {
                    var a = r(e, t, n, i, l, u, c);
                    d[i] = a
                }
            });
            var C = Object.keys(d).length;
            return {
                v: d,
                e: g,
                vcount: C
            }
        }

        function o(e, t, n) {
            var r, i, a, o, u, c = n().privateDisjointSet(e, t),
                s = c.vertexGroups,
                f = c.groupIndex;
            for (r = 0; r < s.length; r++) {
                var d = s[r],
                    g = {};
                for (u = 0; u < d.length; u++) i = e[d[u]], i.c = r, g[d[u]] = i;
                s[r] = {
                    verts: g,
                    edges: [],
                    extents: l(g)
                }
            }
            for (r = 0; r < t.length; r++) o = t[r], a = f[o.id1], o.c = a, s[a].edges.push(o);
            return s
        }

        function l(e) {
            var t, n, r, i, a = 0;
            return ue.forEach(e, function(e) {
                t = ue.defined(t) ? Math.min(t, e.x - e.size) : e.x - e.size, n = ue.defined(n) ? Math.min(n, e.y - e.size) : e.y - e.size, r = ue.defined(r) ? Math.max(r, e.x + e.size) : e.x + e.size, i = ue.defined(i) ? Math.max(i, e.y + e.size) : e.y + e.size, a++
            }), {
                x1: t,
                y1: n,
                x2: r,
                y2: i,
                c: a
            }
        }

        function u(e) {
            return me.test(e.id)
        }

        function c(e, t, n, r, i, a, o) {
            function l(t) {
                var n = t.origId || t.id,
                    r = {
                        id: ve + n + "-" + H++,
                        level: t.level - 1,
                        origId: n,
                        x: 0,
                        y: 0,
                        c: t.c,
                        size: 10,
                        fixed: !1,
                        lc: t.lc,
                        du: !0,
                        w: 20,
                        h: 20,
                        labeloff: 0
                    };
                return e[r.id] = r, i[t.c].verts[r.id] = r, Y[r.id] = 1, r
            }

            function u(e, n, r) {
                var a = {
                    id: ve + n.id + "-" + r.id,
                    id1: n.id,
                    id2: r.id,
                    c: e.c,
                    numLinks: e.numLinks
                };
                return "level" in n && "level" in r && (a.level = Math.max(n.level, r.level)), t.push(a), i[e.c].edges.push(a), a
            }

            function c(e, t, n) {
                var r = l(e),
                    i = n.id1 === t.id;
                u(n, i ? r : e, i ? e : r), r.level === t.level + 1 ? u(n, i ? t : r, i ? r : t) : c(r, t, n)
            }

            function s(e, t, n) {
                if (e.level > 0) {
                    var r = l(e);
                    u(n, e, r), u(n, r, t)
                }
                if (e.level < y.length - 1) {
                    var i = l(e);
                    i.level += 2, u(n, e, i), u(n, i, t)
                }
            }
            var f, d, g, h = {},
                v = {},
                m = {},
                y = [],
                b = {},
                p = {},
                I = r(),
                x = o;
            for (f = 0; f < i.length; f++) {
                m[f] = {}, b[f] = [];
                var C = [],
                    w = 1 / 0;
                if (ue.forEach(i[f].verts, function(e, t) {
                        if (e.d && ue.isNumber(e.d[n])) g = e.d[n], m[f][g] || (m[f][g] = [], b[f].push(g)), m[f][g].push(t), p[t] = g, w > g ? (w = g, C = [t]) : g === w && C.push(t);
                        else if (a) throw new Error("Sequential Layout: Node is missing valid level data.")
                    }), 0 === C.length) {
                    var G = Object.keys(i[f].verts)[0];
                    C.push(G), p[G] = 0, m[f][0] = [G], b[f].push(0)
                }
                b[f].sort(function(e, t) {
                    return e - t
                });
                var A = [];
                for (d = 0; d < b[f].length; d++) {
                    var B = b[f][d];
                    A = [];
                    var Z, R, M = I.neighbours(m[f][B]),
                        E = b[f][d + 1] || B + 1,
                        k = (E + B) / 2;
                    for (R = 0; R < M.nodes.length; R++) Z = M.nodes[R], ue.isNullOrUndefined(p[Z]) && (A.push(Z), p[Z] = k);
                    A.length && (b[f].splice(d + 1, 0, k), m[f][k] = A)
                }
                if (!a)
                    for (d = 0; d < C.length; d++) h[C[d]] = 1, e[C[d]].level = 0;
                v[f] = C
            }
            if (a) {
                for (f = 0; f < i.length; f++)
                    for (d = 0; d < b[f].length; d++) - 1 === y.indexOf(b[f][d]) && y.push(b[f][d]);
                for (y.sort(function(e, t) {
                        return e - t
                    }), f = 0; f < i.length; f++)
                    for (d = 0; d < y.length; d++) m[f][y[d]] = d;
                x = x || []
            } else
                for (f = 0; f < i.length; f++)
                    for (d = 0; d < b[f].length; d++) m[f][b[f][d]] = d;
            for (var L, S, W, V, X, F, T, N, H = 0, Y = {}, U = 0, K = t.length; K > U; U++) {
                L = t[U], S = ue.rawId(L.id1), W = ue.rawId(L.id2), V = e[S], X = e[W], V.level = m[V.c][p[S]], X.level = m[X.c][p[W]];
                var z = V.level,
                    O = X.level;
                ue.isNumber(z) && ue.isNumber(O) && (L.level = Math.max(z, O), O > z ? (Y[X.id] = 1, N = V, T = X) : z > O && (Y[V.id] = 1, N = X, T = V)), F = Math.abs(z - O), F > 1 ? c(T, N, L) : a && 0 === F && (s(V, X, L), x.push(L))
            }
            if (a)
                for (f = 0; f < i.length; f++) {
                    var D = v[f][0];
                    1 !== v[f].length || e[D].level || (e[D].level = m[f][p[D]])
                } else ue.forEach(e, function(t, n) {
                    if (!Y[n] && !h[n]) {
                        for (var r, i = v[e[n].c], a = 1 / 0, o = 0; o < i.length; o++) {
                            var l = I.shortestPaths(n, i[o]);
                            l.distance < a && (r = l, a = l.distance)
                        }
                        for (var s = 0; s < r.one.length; s++) {
                            var f = r.one[s],
                                d = e[f];
                            if (d && "level" in d && d.level < t.level) {
                                var g = u(t, t, d);
                                t.level - d.level > 1 && c(t, d, g);
                                break
                            }
                        }
                    }
                });
            return t
        }

        function s(e, t, n, r) {
            for (var i, a, o, l, u = r(), c = 0; c < n.length; c++) {
                var s = u.distances(n[c]);
                ue.forEach(s, function(t, n) {
                    "level" in e[n] || (e[n].level = 1 / 0), e[n].level = Math.min(e[n].level, t)
                })
            }
            for (var f = 0; f < t.length; f++) i = t[f].id1, a = t[f].id2, o = e[i], l = e[a], "level" in o && "level" in l && (t[f].level = Math.max(o.level, l.level))
        }

        function f(e, t) {
            function n(e, t, n, i) {
                r[e] = r[e] || [], r[e][t] = r[e][t] || {}, r[e][t][n] = r[e][t][n] || [], r[e][t][n].push(i)
            }
            var r = {};
            ue.forEach(e, function(e, t) {
                "level" in e && n(e.c, e.level, "vertices", t)
            });
            for (var i = 0; i < t.length; i++) "level" in t[i] && n(t[i].c, t[i].level, "edges", t[i]);
            return r
        }

        function d(e, t) {
            function n(e, t, n, i) {
                r[e] = r[e] || [], r[e][t] = r[e][t] || {
                    vertices: [],
                    edges: []
                };
                for (var a = 0; t > a; a++) r[e][a] = r[e][a] || {
                    vertices: [],
                    edges: []
                };
                r[e][t][n] = r[e][t][n] || [], r[e][t][n].push(i)
            }
            var r = {};
            ue.forEach(e, function(e, t) {
                "level" in e && n(e.c, e.level, "vertices", t)
            });
            for (var i = 0; i < t.length; i++) "level" in t[i] && 1 === Math.abs(e[t[i].id1].level - e[t[i].id2].level) && n(t[i].c, t[i].level, "edges", t[i]);
            return r
        }

        function g(e, t) {
            for (var n = [], r = ue.ensureArray(e), i = 0; i < r.length; i++) t[r[i]] && n.push(r[i]);
            return n
        }

        function h(e) {
            var t = Number(e);
            return t = ue.isNumber(t) ? t : 5, t = Math.max(0, t), t = Math.min(10, t)
        }

        function v(e) {
            return 10 * (5 - h(e))
        }

        function m(e) {
            var t = 0,
                n = 0;
            return ue.forEach(e, function(e) {
                "level" in e && !u(e.id) && (t += e.size, n += 1)
            }), t / n
        }

        function y(e) {
            var t = 0;
            return ue.forEach(e, function(e) {
                t = Math.max(t, e.length)
            }), t
        }

        function b(e, t) {
            for (var n = [], r = y(e), i = 0; r > i; i++) {
                var a = 0,
                    o = 0,
                    l = 0,
                    u = 0,
                    c = 0;
                ue.forEach(e, function(e) {
                    if (e[i]) {
                        for (var n = e[i].vertices, r = 0; r < n.length; r++) {
                            var l = n[r],
                                c = t[l].size;
                            o += c, a = Math.max(a, c)
                        }
                        u += n.length
                    }
                }), l = o / u;
                var s = n[i - 1];
                s && a < s.max + s.yOffset && (c = (s.max + s.yOffset) / 2), n[i] = {
                    max: a,
                    average: l,
                    sum: o,
                    yOffset: c
                }
            }
            return n
        }

        function p(e, t, n, r, i) {
            function a(e, t, n, r) {
                var i, a, o, l, u, c, s = !0,
                    f = -1;
                for (i = 0; i < n.length; i++) {
                    var d = n[i];
                    if (!r && D[d].barycenter === 1 / 0) {
                        s = !1;
                        break
                    }
                    var g = 0,
                        h = 0;
                    for (a = 0; a < t.length; a++) l = -1, d === t[a].id1 ? l = t[a].id2 : d === t[a].id2 && (l = t[a].id1), -1 !== l && (D[l].barycenter === 1 / 0 ? s = !1 : (h++, u = e.indexOf(l), -1 !== u && (g += u)));
                    if (D[d].prevPos = i, c = !0, h > 0 ? D[d].barycenter = g / h : D[d].barycenter === 1 / 0 ? s = !1 : 0 === i ? D[d].barycenter = 0 : c = !1, c) {
                        if (i > f + 1) {
                            var v = n[f],
                                m = Math.min(D[d].barycenter, D[v].barycenter),
                                y = Math.abs(D[d].barycenter - D[v].barycenter),
                                b = y / (i - f);
                            for (o = 1; i - f > o; o++) D[n[f + o]].barycenter = m + b * o
                        }
                        f = i
                    }
                }
                return n.sort(function(e, t) {
                    return D[e].barycenter === D[t].barycenter ? D[e].prevPos - D[t].prevPos : D[e].barycenter - D[t].barycenter
                }), s
            }

            function s(e, t, n) {
                e.sort(function(e, r) {
                    var i = Math.max(t.indexOf(e.id1), t.indexOf(e.id2)),
                        a = Math.max(n.indexOf(e.id1), n.indexOf(e.id2)),
                        o = Math.max(t.indexOf(r.id1), t.indexOf(r.id2)),
                        l = Math.max(n.indexOf(r.id1), n.indexOf(r.id2)),
                        u = o > i || i === o && l > a;
                    return u ? -1 : 1
                })
            }

            function f(e, t) {
                var n, r;
                return 1 > t || e.length <= t ? 0 : (n = e[t].edges, r = [e[t - 1].vertices, e[t].vertices], r.sort(function(e, t) {
                    return e.length - t.length
                }), g(n, r[1], r[0]))
            }

            function g(e, t, n) {
                var r, i, a, o, l;
                if (e.length < 2) return 0;
                for (s(e, t, n), r = e.map(function(e) {
                        var t = n.indexOf(e.id1);
                        return -1 === t && (t = n.indexOf(e.id2)), {
                            index: t,
                            multiplier: -1 === t ? 0 : e.numLinks
                        }
                    }), i = 1; i < r.length;) i *= 2;
                a = new Array(2 * i - 1);
                for (var u = 0; u < a.length; u++) a[u] = 0;
                i -= 1, o = 0;
                for (var c = 0; c < r.length; c++)
                    for (l = r[c].index + i, a[l] += r[c].multiplier; l > 0;) l % 2 && (o += a[l + 1] * r[c].multiplier), l = Math.floor((l - 1) / 2), a[l] += r[c].multiplier;
                return o
            }

            function h(e, t, n, r) {
                var i, a = ue.clone(t),
                    o = [];
                return a.forEach(function(t) {
                    o.push(t.id1 === e ? t.id2 : t.id1)
                }), r.forEach(function(e) {
                    a.push(e), i = e.id1 === n ? e.id2 : e.id1, -1 === o.indexOf(i) && o.push(i)
                }), {
                    verts: o,
                    edges: a,
                    common: t.length === r.length && t === a.length
                }
            }

            function m(e, t) {
                var n = D[e].childEdges || [],
                    r = D[t].childEdges || [];
                return h(e, n, t, r)
            }

            function p(e, t) {
                var n = D[e].parentEdges || [],
                    r = D[t].parentEdges || [];
                return h(e, n, t, r)
            }

            function I(e, t) {
                var n, r, i, a, o, l, u = 1,
                    c = e[t].vertices,
                    s = 0,
                    f = [],
                    d = [];
                t > 0 && (f = e[t - 1].vertices), t < e.length - 1 && (d = e[t + 1].vertices);
                var h = 0;
                for (n = 0; n < c.length - 1; n += u)
                    if (o = 0, l = 0, t > 0 ? (i = p(c[n], c[n + 1]), i.common || (i.verts.sort(function(e, t) {
                            return f.indexOf(e) - f.indexOf(t)
                        }), i.verts.length > 1 && (o += g(i.edges, i.verts, [c[n], c[n + 1]]), l += g(i.edges, i.verts, [c[n + 1], c[n]])))) : i = {
                            common: !0
                        }, t < e.length - 1 ? (a = m(c[n], c[n + 1]), a.common || (a.verts.sort(function(e, t) {
                            return d.indexOf(e) - d.indexOf(t)
                        }), a.verts.length > 1 && (o += g(a.edges, a.verts, [c[n], c[n + 1]]), l += g(a.edges, a.verts, [c[n + 1], c[n]])))) : a = {
                            common: !0
                        }, i.common && a.common && (D[c[n + 1]].swapBlockStart = D[c[n]].swapBlockStart || n), o > l) {
                        var v = D[c[n]].swapBlockStart || n;
                        r = c[v], c[v] = c[n + 1], c[n + 1] = r, D[c[v]].swapBlockStart = v, D[c[n + 1]].swapBlockStart = v + 1, s += o - l, 1 === u && (h = Math.max(h, n), u = -1), n = v, 0 === n && (n = h, u = 1)
                    } else -1 === u && (n = h, u = 1);
                return s
            }

            function G(e) {
                var t, n;
                do
                    for (n = 0, t = 0; t < e.length; t++) n += I(e, t); while (n > 0)
            }

            function A() {
                var e, t, n, r, i, o, l, u, c = !0;
                ue.forEach(J, function(s, d) {
                    for (u = 0, o = void 0, l = s.length, e = 0; e < s.length; e++)
                        if (s[e].vertices.length > 0) {
                            l = e;
                            break
                        }
                    if (l !== s.length - 1) {
                        s[l].vertices.sort(function(e, t) {
                            return D[t].childEdges.length - D[e].childEdges.length
                        }), D[s[l].vertices[0]].barycenter = 0, i = 1 / 0;
                        do {
                            for (t = i, r ? (i = 0, o = ue.clone(s)) : i = 1 / 0, e = l; e < s.length - 1; e++) n = a(s[e].vertices, s[e + 1].edges, s[e + 1].vertices, !0), c && (a(s[e + 1].vertices, s[e + 1].edges, s[e].vertices, !1), n = a(s[e].vertices, s[e + 1].edges, s[e + 1].vertices, !1));
                            for (r = n, e = s.length - 1; e > l; e--) n = a(s[e].vertices, s[e].edges, s[e - 1].vertices, u + 2 > e), c ? (a(s[e - 1].vertices, s[e].edges, s[e].vertices, !1), n = a(s[e].vertices, s[e].edges, s[e - 1].vertices, !1)) : i += f(s, e), n || (r = !1);
                            c = !r
                        } while (u++ < 100 && (i === 1 / 0 || t > i));
                        o && (J[d] = o), i > 0 && _.length < 1e4 && G(J[d])
                    }
                })
            }

            function B(e, t, n) {
                return e[n] && e[n].edges ? e[n].edges.filter(function(e) {
                    return e.id1 === t || e.id2 === t
                }) : []
            }

            function Z() {
                var e, t;
                ue.forEach(J, function(n) {
                    for (e = 0; e < n.length; e++) {
                        var r = n[e].vertices;
                        for (t = 0; t < r.length; t++) {
                            var i = r[t];
                            D[i].barycenter = 1 / 0, D[i].childEdges = B(n, i, e + 1), D[i].parentEdges = B(n, i, e)
                        }
                    }
                })
            }

            function R() {
                var e, t;
                ue.forEach(J, function(n) {
                    for (e = 0; e < n.length; e++) {
                        var r = n[e].vertices;
                        for (t = 0; t < r.length; t++) {
                            var i = r[t];
                            D[i].orderPos = t, D[i].children = x(J, D, i), D[i].parents = C(J, D, i)
                        }
                    }
                })
            }

            function M(e, t, n, r) {
                var i, a, o = t,
                    l = t.filter(function(e) {
                        return u({
                            id: e
                        })
                    });
                if (l.length > 0 && (o = l), a = o.length, e.root = e, e.align = e, a > 0) {
                    var c = [Math.floor((a + 1) / 2) - 1, Math.ceil((a + 1) / 2) - 1];
                    for (i = 0; 2 > i; i++) {
                        var s = n ? c[i] : c[1 - i],
                            f = D[o[s]],
                            d = f.orderPos;
                        if (n && d > r || !n && r > d) return f.align = e, e.root = f.root, e.align = e.root, d
                    }
                }
                return r
            }

            function k(e, t, n) {
                var r, i, a, o, l, u, c = "l" === t[1];
                if (void 0 === e[t]) {
                    r = e, e[t] = 0;
                    do {
                        var s = -1;
                        c && r.orderPos > 0 ? s = r.orderPos - 1 : !c && r.orderPos < n[r.level].vertices.length - 1 && (s = r.orderPos + 1), -1 !== s && (i = D[n[r.level].vertices[s]], a = i.root, k(a, t, n), e.sink.id === e.id && (e.sink = a.sink), o = r[z], l = i[z], "h" === z && (c ? (l += 2 * i.labeloff, o -= 2 * r.labeloff) : (l -= 2 * i.labeloff, o += 2 * r.labeloff)), u = (o + l) / 2 + K, e.sink.id !== a.sink.id ? a.sink.shiftData.push({
                            vert: e.sink,
                            dist: e[t] - a[t] - u
                        }) : e[t] = Math.max(e[t], a[t] + u)), r = r.align
                    } while (r.id !== e.id)
                }
            }

            function L(e, t) {
                if (e[t] = e.root[t], e.root.id === e.id) {
                    var n = e.root.sink.shift;
                    if (!n) {
                        var r = e.root.sink.shiftData;
                        n = 1 / 0;
                        for (var i = 0; i < r.length; i++) {
                            var a = r[i].dist;
                            r[i].vert.shift < 1 / 0 && (a += r[i].vert.shift), n = Math.min(n, a)
                        }
                        e.root.sink.shift = n
                    }
                    1 / 0 > n && (e[t] += n)
                }
            }

            function S(e, t) {
                var n, r, i, a, o = [],
                    l = 1 / 0,
                    u = -(1 / 0),
                    c = "l" === t[1],
                    s = "u" === t[0],
                    f = s ? 0 : e.length - 1,
                    d = s ? 1 : -1,
                    g = function(t) {
                        return s ? t < e.length : t >= 0
                    },
                    h = function(e) {
                        return c ? 0 : e.length - 1
                    },
                    v = c ? 1 : -1,
                    m = function(e, t) {
                        return c ? e < t.length : e >= 0
                    };
                for (n = f; g(n); n += d) {
                    i = e[n].vertices;
                    var y = -1;
                    for (c || n === f || (y = e[n - d].vertices.length), r = h(i); m(r, i); r += v) {
                        a = D[i[r]];
                        var b = s ? a.parents : a.children;
                        ue.objectHasOwnProperty(a, t) && (a[t] = void 0), y = M(a, b, c, y), o.push(a), a.sink = a, a.shiftData = [], a.shift = void 0
                    }
                }
                for (r = 0; r < o.length; r++) a = o[r], a.root.id === a.id && k(a, t, e);
                for (r = 0; r < o.length; r++) a = o[r], L(a, t), l = Math.min(l, a[t]), u = Math.max(u, a[t]);
                return c ? {
                    max: u,
                    min: l
                } : (W(e, t), {
                    max: -l,
                    min: -u
                })
            }

            function W(e, t) {
                for (var n = 0; n < e.length; n++)
                    for (var r = e[n].vertices, i = 0; i < r.length; i++) {
                        var a = D[r[i]];
                        a[t] *= -1
                    }
            }

            function V(e) {
                function t(e, t) {
                    return e - t
                }
                for (var n = S(e, "ul"), r = S(e, "ur"), i = S(e, "dl"), a = S(e, "dr"), o = [n, r, i, a].sort(function(e, t) {
                        return e.max - e.min - (t.max - t.min)
                    }), l = 0; l < e.length; l++)
                    for (var u = e[l].vertices, c = 0; c < u.length; c++) {
                        var s = D[u[c]],
                            f = [s.ul - n.min + o[0].min, s.ur - r.max + o[0].max, s.dl - i.min + o[0].min, s.dr - a.max + o[0].max].sort(t);
                        s.x = (f[1] + f[2]) / 2
                    }
            }

            function X(e) {
                var t, n;
                for (t = 0; t < e.length; t++) {
                    var r = 0,
                        i = e[t].vertices;
                    for (n = 0; n < i.length; n++) {
                        var a = D[i[n]];
                        if (!u(a)) {
                            var o = a[z] / 2,
                                l = "h" === z ? a.labeloff : 0;
                            r += o - l, a.x = r, r += o + l + K
                        }
                    }
                    var c = (r - K) / 2;
                    for (n = 0; n < i.length; n++) D[i[n]].x -= c
                }
            }

            function F(e) {
                var t, n, r, i, a = [],
                    o = [],
                    l = 0;
                for (t = 0; t < e.length; t++) {
                    for (r = e[t].vertices, a[t] = 0, o[t] = 0, n = 0; n < r.length; n++) i = D[r[n]], u(i) || (a[t] += i[z], o[t]++);
                    var c = a[t] + K * (o[t] - 1);
                    l = Math.max(l, c)
                }
                for (t = 0; t < e.length; t++)
                    if (r = e[t].vertices, o[t] > 1) {
                        var s = (l - a[t]) / (o[t] - 1),
                            f = 0;
                        for (n = 0; n < r.length; n++)
                            if (i = D[r[n]], !u(i)) {
                                var d = i[z] / 2,
                                    g = "h" === z ? i.labeloff : 0;
                                f += d - g, i.x = f, f += d + g + s
                            }
                    } else
                        for (n = 0; n < r.length; n++) i = D[r[n]], u(i) || (i.x = l / 2)
            }

            function T(e) {
                var t, n, r, i = 1 / 0,
                    a = -(1 / 0),
                    o = N(),
                    l = y(J);
                for (t = 0; t < P.length; t++) ue.forEach(P[t].verts, function(e) {
                    i = Math.min(i, e.x), a = Math.max(a, e.x)
                });
                return n = (a - i) / (e * l), n = Math.max(n, o), ue.forEach(J, function(e) {
                    r = 0;
                    for (var t = 0; t < e.length; t++) {
                        for (var i = e[t].vertices, a = 0; a < i.length; a++) {
                            $ = i[a];
                            var o = D[$];
                            o.y = r
                        }
                        r += n
                    }
                }), n
            }

            function N() {
                var e, t, n = 0,
                    r = b(J, D),
                    i = [];
                for (e = 0; e < _.length; e++) {
                    var a = _[e].level,
                        o = _[e].arrowSize;
                    i[a] = Math.max(i[a] || 0, 2 * o)
                }
                for (t = 0; t < r.length; t++) {
                    var l = r[t].max,
                        u = 0;
                    r[t + 1] && (u = r[t + 1].max);
                    var c = i[t] || 0;
                    n = Math.max(n, l + u + K + c)
                }
                return n
            }

            function H(e) {
                function t(e, t) {
                    return Number(e) - Number(t)
                }
                var n, r, i, a, o = {};
                for (a = "equal" === Y.spacing || "stretched" === Y.spacing ? function(e) {
                        return e.c
                    } : function() {
                        return 0
                    }, n = 0; n < j.length; n++) {
                    var l = j[n];
                    l.links.sort(function(e, t) {
                        var n = ue.defined(e.off) ? e.off * e.sign : 1 / 0,
                            r = ue.defined(t.off) ? t.off * t.sign : 1 / 0;
                        return n - r
                    });
                    var c = 0,
                        s = 0,
                        f = 0,
                        d = !0,
                        g = J[a(l)][l.level].vertices,
                        h = g.indexOf(l.id1),
                        v = g.indexOf(l.id2),
                        m = [h, v].sort(t);
                    for (r = m[0] + 1; r < m[1]; r++) {
                        var y = D[g[r]];
                        for (u(y) || (d = !1), i = 0; i < y.parentEdges.length; i++) c += y.parentEdges[i].numLinks;
                        for (i = 0; i < y.childEdges.length; i++) s += y.childEdges[i].numLinks;
                        var b = (y[O] || y.size) / 2;
                        f = Math.max(f, b)
                    }
                    if (!d) {
                        s === c && (c = D[g[m[0]]].parentEdges.length + D[g[m[1]]].parentEdges.length, s = D[g[m[0]]].childEdges.length + D[g[m[1]]].childEdges.length);
                        var p = v > h ? 1 : -1;
                        c > s && (p *= -1), Y.orientation.match(/right|up/) && (p *= -1);
                        var I = f + 20,
                            x = 40,
                            C = e / 2;
                        for (I += Math.abs(D[l.id1].x - D[l.id2].x) / K, I = Math.min(I, C), I + (l.links.length - 1) * x > C && (x = Math.max(10, (C - I) / (_.links.length - 1))), r = 0; r < l.links.length; r++) {
                            var w = l.links[r],
                                G = I + r * x;
                            o[w.id] = {
                                off: p * w.sign * G
                            }
                        }
                    }
                }
                return o
            }
            var Y = ue.defaults(r, {
                    top: [],
                    orientation: "down",
                    spacing: "auto"
                }),
                U = Y.level,
                K = 50 + v(Y.tightness),
                z = Y.orientation.match(/down|up/) ? "w" : "h",
                O = Y.orientation.match(/down|up/) ? "h" : "w",
                D = t.v,
                _ = t.e,
                P = o(D, _, n),
                j = [];
            if (!U) throw new Error("Sequential Layout: LayoutOptions is missing valid level property.");
            _ = c(D, _, U, n, P, !0, j);
            var J = d(D, _);
            Z(), A(), R();
            var Q, q, $, ee = Y.ratio;
            "right" !== Y.orientation && "left" !== Y.orientation || (ee = 1 / ee);
            var te = [];
            if ("equal" === Y.spacing || "stretched" === Y.spacing)
                for (var ne = 0; ne < P.length; ne++) te[ne] = P[ne].verts;
            else {
                var re = [],
                    ie = [];
                te[0] = {}, ue.forEach(J, function(e, t) {
                    for (Q = 0; Q < e.length; Q++) {
                        if (re[Q] || (re[Q] = {
                                vertices: [],
                                edges: []
                            }), ie[Q]) {
                            q = e[Q].vertices;
                            for (var n = 0; n < q.length; n++) $ = q[n], D[$].orderPos += ie[Q]
                        }
                        re[Q].vertices = re[Q].vertices.concat(e[Q].vertices), re[Q].edges = re[Q].edges.concat(e[Q].edges), ie[Q] = re[Q].vertices.length
                    }
                    te[0] = ue.merge(te[0], P[t].verts)
                }), J = {}, J[0] = re
            }
            var ae = 0;
            ue.forEach(J, function(e, t) {
                "equal" === Y.spacing ? X(e) : "stretched" === Y.spacing ? F(e) : V(e);
                var n = l(te[t]);
                ae -= n.x1, ue.forEach(te[t], function(e, t) {
                    D[t].x += ae
                }), ae += n.x2 + K
            });
            var oe = T(ee),
                le = H(oe);
            if (Y.orientation.match(/up|right|left/)) {
                var ce = w(Y.orientation);
                ue.forEach(J, function(e) {
                    for (Q = 0; Q < e.length; Q++) {
                        q = e[Q].vertices;
                        for (var t = 0; t < q.length; t++) $ = q[t], ce(D[$])
                    }
                })
            }
            var se = [],
                fe = t.extents;
            E(e, D, le, fe, se, Y, i)
        }

        function I(e, t, n, r, i, a) {
            function l() {
                var e, t;
                ue.forEach(V, function(n) {
                    for (var r = n.length - 1; r >= 0; r--)
                        for (var i = n[r].vertices, a = [], o = 0; o < i.length; o++) {
                            t = i[o];
                            var l = x(V, k, t);
                            if (k[t].children = [], k[t].subChildrenCount = 0, 0 !== l.length) {
                                var c = [];
                                for (e = 0; e < l.length; e++) a.indexOf(l[e]) < 0 && c.push(l[e]);
                                if (c.length > 0)
                                    for (k[t].children = c, k[t].subChildrenCount = u(c), e = 0; e < c.length; e++) a.push(c[e]), k[c[e]].parent = t
                            }
                        }
                })
            }

            function u(e) {
                for (var t = 0, n = 0; n < e.length; n++) {
                    var r = k[e[n]].subChildrenCount;
                    t += 0 === r ? 1 : r
                }
                return t
            }

            function d(e, t, n) {
                n || (e.x = t);
                var r = t - e.subChildrenCount * (T / 2),
                    i = e.children;
                if (i)
                    for (var a = 0; a < i.length; a++) {
                        var o = k[i[a]],
                            l = o.subChildrenCount;
                        0 === l && (l = 1);
                        var u = r + l * T;
                        d(o, (u + r) / 2, !1), r = u
                    }
            }

            function h(e, t, n) {
                for (var r, i = t.miny, a = Math.PI * (2 / 3), o = 0, l = 0; l < V[e].length; l++) {
                    var u = V[e][l].vertices,
                        c = F[l].yOffset,
                        s = F[l].average,
                        f = s > X ? s : X,
                        d = 2 * (f + 12) + c;
                    i += o;
                    for (var g = 0; g < u.length; g++) {
                        r = u[g];
                        var h = k[r];
                        if (h.y = i, !n) {
                            var v = h.children;
                            if (v && v.length > 1) {
                                var m = v.map(function(e) {
                                        return k[e]
                                    }),
                                    b = p(m),
                                    I = y(b, a);
                                d = Math.max(d, I)
                            }
                        }
                    }
                    o = d
                }
            }

            function y(e, t) {
                return e / (2 * Math.tan(t / 2))
            }

            function p(e) {
                for (var t = 1 / 0, n = -(1 / 0), r = 0; r < e.length; r++) {
                    var i = e[r].x;
                    t = Math.min(t, i), n = Math.max(n, i)
                }
                return n - t
            }

            function I(e, t) {
                for (var n = w(t), r = 0; r < V[e].length; r++)
                    for (var i = V[e][r].vertices, a = 0; a < i.length; a++) n(k[i[a]])
            }
            var C = ue.defaults(r, {
                    top: [],
                    orientation: "down",
                    stable: !0,
                    flatten: !1
                }),
                G = C.level,
                A = a ? 1 : v(C.tightness),
                B = C.top,
                Z = C.tidy,
                R = a ? !1 : C.flatten,
                k = t.v,
                L = t.e,
                S = t.extents,
                W = o(k, L, n);
            G ? L = c(k, L, G, n, W, !1) : (B = g(B, k), s(k, L, B, n));
            var V = f(k, L),
                X = m(k),
                F = b(V, k),
                T = 2 * X + 24 + A;
            l();
            var H = {},
                Y = {};
            ue.forEach(V, function(e, t) {
                var n = Number(t);
                H[n] = N(W[n].verts), Y[n] = {
                    children: V[t][0].vertices,
                    subChildrenCount: u(V[t][0].vertices)
                }
            }), ue.forEach(V, function(e, t) {
                d(Y[t], H[t].x, !0), h(t, H[t], R)
            }), ue.forEach(V, function(e, t) {
                a || I(t, C.orientation)
            }), a && a(k, V, W, H, X, C.tightness);
            var U = [];
            Z ? M(e, k, W, 0, 1, S, U, C, i) : E(e, k, {}, S, U, C, i)
        }

        function x(e, t, n) {
            var r, i, a, o, l = t[n].c,
                u = t[n].level + 1,
                c = e[l][u],
                s = {},
                f = [];
            if (c) {
                for (a = 0; a < c.edges.length; a++) {
                    var d = c.edges[a];
                    r = d.id1 + "", i = d.id2 + "", r === n && (s[i] = 1), i === n && (s[r] = 1)
                }
                var g = c.vertices;
                for (o = 0; o < g.length; o++) r = g[o] + "", s[r] && f.push(r)
            }
            return f
        }

        function C(e, t, n) {
            var r = [],
                i = t[n].level;
            if (i > 0) {
                var a, o, l, u = t[n].c,
                    c = e[u][i],
                    s = {};
                if (c && c.edges) {
                    for (o = 0; o < c.edges.length; o++) {
                        var f = c.edges[o];
                        f.id1 === n ? s[f.id2] = 1 : f.id2 === n && (s[f.id1] = 1)
                    }
                    var d = e[u][i - 1];
                    if (d && d.vertices)
                        for (l = 0; l < d.vertices.length; l++) a = d.vertices[l], s[a] && r.push(a)
                }
            }
            return r
        }

        function w(e) {
            var t = {
                up: function(e) {
                    e.y = -e.y, e.x = e.x
                },
                down: function() {},
                right: function(e) {
                    var t = e.y;
                    e.y = e.x, e.x = t
                },
                left: function(e) {
                    var t = e.y;
                    e.y = e.x, e.x = -t
                }
            };
            return t[e] || t.down
        }

        function G(e, t, n, r, i, a) {
            function o(e, t) {
                return (e.r + t.r) / (e.a - t.a)
            }

            function l(e, t, n) {
                var r = t > 0 ? e + n : e + n / 2;
                return r > 0 ? r : e
            }

            function u(e, t, n, r) {
                if (r && 1 === e.length) return 0;
                var i = t,
                    a = i;
                for (c = 1; c < e.length; c++) a = Math.max(o(d[e[c]], d[e[c - 1]]), a);
                return l(a, a - i, n)
            }
            var c, s, f, d, g = v(a);
            ue.forEach(t, function(t, a) {
                var o = N(n[Number(a)].verts),
                    l = 0,
                    h = l,
                    v = 4 * i,
                    m = v,
                    y = 2 * i + 24;
                for (s = 0; s < t.length; s++) {
                    var b, p = t[s].vertices;
                    for (d = [], c = 0; c < p.length; c++) {
                        f = p[c] + "", b = e[f];
                        var I = b.x - o.minx,
                            x = o.maxx - o.minx + y;
                        if (I *= 2 * Math.PI / x, 0 > I || I > 2 * Math.PI) throw new Error("[Radial] Theta angle should be in the range [0; 2*PI]");
                        d[f] = {
                            a: I,
                            r: b.size
                        }
                    }
                    for (h = l, 0 === s ? p.length > 1 && (l += v / 2) : l += v, l = u(p, l, g, 1 > s), l - h > m && (m = l - h + 1, v = Math.max(v, m / 2), 0 === s && p.length < 3 && (l /= 2)), c = 0; c < p.length; c++) b = e[p[c] + ""], b.x = r[Number(a)].x + l * Math.cos(d[b.id].a), b.y = r[Number(a)].y + l * Math.sin(d[b.id].a)
                }
            })
        }

        function A(e, t) {
            var n = e.extents.c,
                r = Math.max(e.extents.x2 - e.extents.x1, e.extents.y2 - e.extents.y1),
                i = 120 * Math.sqrt(n),
                a = Math.max(r, i) / 2,
                o = 0;
            n > 1 && (o = Math.min(Math.pow(n, 2.5), 100));
            var l = o * n * Math.log(n),
                u = 1 / B(t);
            return {
                repulsionFactor: 40 * Math.max(1, Math.pow(u, 2)),
                coeff: 1,
                naturalDistance: 20 * u,
                iterations: o,
                chunk: 20,
                temperature: a,
                temp: a,
                estTime: l
            }
        }

        function B(e) {
            var t = h(e.tightness);
            return Math.pow(2, .4 * (t - 5))
        }

        function Z(e, t, n, r, i) {
            function a(t) {
                var n = t,
                    r = f[n],
                    i = x[n];
                V(e, r, i, i.start, i.stop, function() {
                    F(r.verts), n++, L++, n < f.length ? (p = Date.now(), I = p - w, I > 16 || L > 1e3 ? (w = p, L = 0, ue.nextTick(function() {
                        a(n)
                    }, 0)) : a(n)) : l()
                })
            }

            function l() {
                h ? M(e, u, f, b, 1, d, g, r, i) : E(e, u, {}, d, g, r, i)
            }
            var u = t.v,
                c = t.vcount,
                s = t.e,
                f = o(u, s, n),
                d = t.extents,
                g = r.fixed || [],
                h = r.tidy;
            T(u);
            var v = f.length,
                m = c / (c + v),
                y = 0,
                b = h ? m : 1;
            e.trigger("progress", "layout", 0);
            for (var p, I, x = [], C = 0, w = Date.now(), G = 0; G < f.length; G++) {
                var B = A(f[G], r);
                C += B.estTime, x.push(B)
            }
            for (var Z = 0, R = 0; R < f.length; R++) {
                x[R].start = Z;
                var k = Z + (b - y) * (x[R].estTime / C);
                x[R].stop = k, Z = k
            }
            var L = 0;
            f.length > 0 ? a(0) : E(e, u, {}, d, g, r, i)
        }

        function R(e) {
            return ue.values(e).some(function(e) {
                return e.fixed
            })
        }

        function M(e, t, n, r, i, a, o, l, u) {
            for (var c = {}, s = [], f = {}, d = 1 / 0, g = 1 / 0, h = 0; h < n.length; h++) {
                var v = H(n[h].verts);
                c[h] = v;
                var m = o.length > 0 && R(n[h].verts);
                s.push({
                    x: v.x,
                    y: v.y,
                    width: v.width,
                    height: v.height,
                    id: h,
                    fixed: m
                }), f[h] = {
                    x: v.x,
                    y: v.y
                }, d = Math.min(d, f[h].x), g = Math.min(g, f[h].y)
            }
            var y = ue.defaults(l, {
                strategy: "rect",
                ratio: 4 / 3
            });
            ne(s, {
                strategy: y.strategy,
                step: 30,
                max: 2,
                sort: !1,
                ratio: y.ratio,
                tightness: y.tightness
            }, function(n) {
                d = "rect" === y.strategy ? d : 0, g = "rect" === y.strategy ? g : 0;
                for (var r = {}, i = 0; i < n.length; i++) r[n[i].id] = n[i], r[n[i].id].x += d, r[n[i].id].y += g;
                ue.forEach(t, function(e) {
                    var t = r[e.c].x - f[e.c].x,
                        n = r[e.c].y - f[e.c].y;
                    e.x += t, e.y += n
                }), E(e, t, {}, a, o, y, u)
            })
        }

        function E(e, t, n, r, i, a, o) {
            var u = l(t);
            return 0 === i.length && (u = X(t, r, u)), ue.isNumber(u.x1) || (u = null), o ? void KeyLines.Util.nextTick(function() {
                e.trigger("progress", "layout", 1), o({
                    vertices: t,
                    updatedEdges: n,
                    extents: u
                }, a)
            }) : {
                vertices: t,
                updatedEdges: n,
                extents: u
            }
        }

        function k(e, t, n) {
            var r = e[t.id1],
                i = e[t.id2];
            L(r, i, n)
        }

        function L(e, t, n) {
            var r, i, a;
            if (!e.fixed || !t.fixed) {
                var o = 2 * ye.next() * Math.PI;
                a = 1.3 * Y(e, t, n) / 2, e.fixed || t.fixed ? (r = e.fixed ? e.x : t.x, i = e.fixed ? e.y : t.y, a *= 2) : (r = (e.x + t.x) / 2, i = (e.y + t.y) / 2), e.fixed || (e.x = r + a * Math.cos(o), e.y = i + a * Math.sin(o), o += Math.PI), t.fixed || (t.x = r + a * Math.cos(o), t.y = i + a * Math.sin(o))
            }
        }

        function S(e, t, n, r) {
            var i = {
                    temperature: 10,
                    i: 0
                },
                a = {
                    verts: t.v,
                    edges: t.e
                },
                o = A(t, n);
            o.chunk = 5, o.iterations = 5, i.temperature = Math.pow(o.temperature, .72), W(i, a, o);
            var u = l(a.verts);
            ue.isNumber(u.x1) || (u = null), e.trigger("progress", "layout", 1), r({
                vertices: a.verts,
                extents: u
            }, n, !1)
        }

        function W(e, t, n) {
            for (var r = Math.min(e.i + n.chunk, n.iterations); e.i < r;) {
                var i = t.verts,
                    a = t.edges,
                    o = 0;
                if (ue.forEach(i, function(e) {
                        e.dx = 0, e.dy = 0, o++
                    }), T(i, 2), 1 === o) return void(e.i = r);
                if (2 === o) {
                    if (a[0]) k(i, a[0], n.naturalDistance);
                    else {
                        var l = ue.values(i);
                        L(l[0], l[1], n.naturalDistance)
                    }
                    return void(e.i = r)
                }
                z(i, n.repulsionFactor);
                for (var u = 0; u < a.length; u++) U(a[u], i, n.naturalDistance, n.coeff);
                var c = e.temperature * (1 - e.i / n.iterations);
                ue.forEach(i, function(e) {
                    K(e, c)
                }), e.i++
            }
        }

        function V(e, t, n, r, i, a) {
            function o() {
                return r + (i - r) * (s.i / n.iterations)
            }

            function l() {
                return s.i >= n.iterations
            }

            function u() {
                W(s, t, n)
            }

            function c() {
                u(), l() ? a() : (e.trigger("progress", "layout", o()), ue.nextTick(c, 0))
            }
            var s = {
                i: 0,
                temperature: n.temperature
            };
            c()
        }

        function X(e, t, n) {
            var r = (n.x1 + n.x2) / 2 - (t.x1 + t.x2) / 2,
                i = (n.y1 + n.y2) / 2 - (t.y1 + t.y2) / 2;
            return ue.forEach(e, function(e) {
                e.x -= r, e.y -= i
            }), {
                x1: n.x1 - r,
                y1: n.y1 - i,
                x2: n.x2 - r,
                y2: n.y2 - i
            }
        }

        function F(e) {
            var t, n, r, i = 0,
                a = 0,
                o = 0,
                l = !1,
                u = 0,
                c = 0;
            if (ue.forEach(e, function(e) {
                    i += e.x, a += e.y, o += 1, l = l || e.fixed
                }), !(3 > o || l)) {
                i /= o, a /= o, ue.forEach(e, function(e) {
                    t = Math.sqrt((e.x - i) * (e.x - i) + (e.y - a) * (e.y - a)), t > c && (c = t, u = Math.atan2(e.y - a, e.x - i))
                }), u = -u;
                var s = Math.sin(u),
                    f = Math.cos(u);
                ue.forEach(e, function(e) {
                    n = i + (e.x - i) * f - (e.y - a) * s, r = a + (e.x - i) * s + (e.y - a) * f, e.x = n, e.y = r
                })
            }
        }

        function T(e, t) {
            var n = t || 30;
            ue.forEach(e, function(e) {
                e.fixed || (e.x += n * (ye.next() - .5), e.y += n * (ye.next() - .5))
            })
        }

        function N(e) {
            var t = 0,
                n = 0,
                r = 0,
                i = 1 / 0,
                a = 1 / 0,
                o = -(1 / 0),
                l = -(1 / 0);
            ue.forEach(e, function(e) {
                t += 1, n += e.x, r += e.y, a = Math.min(a, e.x), i = Math.min(i, e.y), o = Math.max(o, e.x), l = Math.max(l, e.y)
            }), n /= t, r /= t;
            var u = 0,
                c = !1;
            return ue.forEach(e, function(e) {
                var t = e.x - n,
                    i = e.y - r,
                    a = Math.sqrt(t * t + i * i);
                u = Math.max(a + 1.5 * e.size, u), c = c || e.fixed
            }), {
                x: n,
                y: r,
                sum: t,
                size: u,
                fixed: c,
                miny: i,
                minx: a,
                maxy: l,
                maxx: o
            }
        }

        function H(e, t) {
            var n = ue.isNullOrUndefined(t) ? {} : t,
                r = 20,
                i = 1 / 0,
                a = 1 / 0,
                o = -(1 / 0),
                l = -(1 / 0);
            return ue.forEach(e, function(e, t) {
                t in n || (a = Math.min(a, e.x - e.size), i = Math.min(i, e.y - e.size), o = Math.max(o, e.x + e.size), l = Math.max(l, e.y + e.size))
            }), a -= r, i -= r, o += r, l += r, {
                x: a,
                y: i,
                width: o - a,
                height: l - i
            }
        }

        function Y(e, t, n) {
            return e.size + t.size + n * (1 + ((e.lc ? e.lc : 1) + (t.lc ? t.lc : 1)) / 6)
        }

        function U(e, t, n, r) {
            var i = t[e.id1],
                a = t[e.id2],
                o = i.x - a.x,
                l = i.y - a.y,
                u = Y(i, a, n),
                c = ue.len(o, l);
            if (c > .02) {
                var s = r * ((c - u) / c),
                    f = o * s,
                    d = l * s;
                i.dx -= f, i.dy -= d, a.dx += f, a.dy += d
            }
        }

        function K(e, t) {
            if (!e.fixed) {
                var n = ue.len(e.dx, e.dy),
                    r = e.dx / n * Math.min(n, t),
                    i = e.dy / n * Math.min(n, t);
                e.x += r, e.y += i
            }
        }

        function z(e, t) {
            function n(e, t, n, r) {
                return {
                    leaf: !0,
                    nodes: {},
                    point: null,
                    x1: e,
                    y1: t,
                    x2: n,
                    y2: r
                }
            }

            function r(e, t) {
                var r = e.x1,
                    a = e.y1,
                    o = e.x2,
                    l = e.y2,
                    u = .5 * (r + o),
                    c = .5 * (a + l),
                    s = t.x >= u,
                    f = t.y >= c,
                    d = (f ? 2 : 0) + (s ? 1 : 0);
                e.leaf = !1, s ? r = u : o = u, f ? a = c : l = c, e.nodes[d] || (e.nodes[d] = n(r, a, o, l)), i(e.nodes[d], t)
            }

            function i(e, t) {
                if (e.leaf) {
                    var n = e.point;
                    if (n) return Math.abs(n.x - t.x) + Math.abs(n.y - t.y) < .01 ? void r(e, t) : (e.point = null, r(e, n), void r(e, t));
                    e.point = t
                } else r(e, t)
            }

            function a(e, t) {
                if (!e(t))
                    for (var n = t.nodes, r = 0; 4 > r; r++) n[r] && a(e, n[r])
            }

            function o(e) {
                var t = 0,
                    n = 0;
                if (e.charge = 0, e.size = 0, !e.leaf)
                    for (var r = e.nodes, i = 0; 4 > i; i++) {
                        var a = r[i];
                        a && (o(a), e.charge += a.charge, e.size += a.size, t += a.charge * a.cx, n += a.charge * a.cy)
                    }
                if (e.point) {
                    var l = c(e.point);
                    e.pointCharge = l, e.charge += l, e.size += e.point.size, t += l * e.point.x, n += l * e.point.y
                }
                e.cx = e.charge ? t / e.charge : 0, e.cy = e.charge ? n / e.charge : 0
            }

            function l(e) {
                if (e.point !== p) {
                    var t = e.cx - p.x,
                        n = e.cy - p.y,
                        r = 1 / ue.len(t, n);
                    if ((e.x2 - e.x1) * r < I) return u(p, e, e.charge, r, t, n), !0;
                    e.point && u(p, e.point, e.pointCharge, r, t, n)
                }
                return !e.charge
            }

            function u(e, t, n, r, i, a) {
                s(e, n, i, a, Math.min(r, x))
            }

            function c(e) {
                var t = de * Math.pow(e.size, ge) / he;
                return t * (1 + (e.lc ? e.lc : 1) / 3)
            }

            function s(e, n, r, i, a) {
                if (!(fe > a)) {
                    var o = t * c(e) * n * a * a * a;
                    e.dx -= r * o, e.dy -= i * o
                }
            }

            function f() {
                ue.forEach(e, function(e) {
                    p = e, a(l, C)
                })
            }
            var d, g, h, v, m = N(e);
            d = m.minx, h = m.miny, g = m.maxx, v = m.maxy;
            var y = g - d,
                b = v - h;
            y > b ? v = h + y : g = d + b;
            var p, I = .5,
                x = 1e5,
                C = n(d, h, g, v);
            return ue.forEach(e, function(e) {
                i(C, e)
            }), o(C), f(), C
        }

        function O(e, t, n, r, i, a) {
            r ? e[t] = n[t] : e[t] = {
                x: i,
                y: a
            }
        }

        function D(e, t, n, r, i) {
            var a = 1.25 - (h(r.tightness) - 5) / 10,
                o = P(t.v, t.e),
                l = _(o, t.v, a);
            Z(e, l, n, r, function(e, n, r) {
                var a = {};
                ue.forEach(e.vertices, function(e, n) {
                    if (o.rev[n])
                        for (var r = e.fixed, i = 0; i < o.rev[n].length; i++) {
                            var l = o.rev[n][i],
                                u = e.x,
                                c = e.y;
                            e.jit.positions && (u += e.jit.positions[l].x, c += e.jit.positions[l].y), O(a, l, t.v, r, u, c)
                        } else O(a, n, t.v, t.v[n].fixed, e.x, e.y)
                });
                var l = {
                    vertices: a,
                    extents: e.extents
                };
                i(l, n, r)
            })
        }

        function _(e, n) {
            var r = {},
                i = [],
                a = 0;
            ue.forEach(e.rev, function(o, l) {
                for (var u = {
                        x: 0,
                        y: 0,
                        size: 0
                    }, c = o.length, s = !1, f = 0; c > f; f++) {
                    var d = n[o[f]];
                    u.x += d.x, u.y += d.y, u.size += d.size
                }
                u.x /= c, u.y /= c;
                var g = document.createElement("canvas").getContext("2d"),
                    h = KeyLines.Layouts.CirclePacking.create(),
                    v = KeyLines.Util.values(n).filter(function(t) {
                        return e.rev[l].indexOf(t.id) > -1
                    }).map(function(e) {
                        return e.r = ce.nodeSize(t.privateGetItem(e.id), g, !1).radius, e.rwt = ce.nodeSize(t.privateGetItem(e.id), g, !0).radius, e.labelOffset = 0, e
                    }),
                    m = 0,
                    y = 0;
                v.forEach(function(e) {
                    m += e.r, y += e.rwt
                });
                var b = (y - m) / v.length,
                    p = .5;
                v = h.concentricLayout(v, {
                    padding: Math.max(8, b * p)
                });
                var I = {
                        positions: ue.makeDictionary(v)
                    },
                    x = ce.getExtents(v, g, 0).r;
                r[l] = {
                    x: u.x,
                    y: u.y,
                    size: x,
                    fixed: s,
                    jit: I,
                    lc: 0
                }, a++;
                for (var C = o[0], w = {}, G = e.index[C], A = 0; A < G.length; A++) {
                    var B = G[A];
                    w[e.ids[B]] = 1
                }
                ue.forEach(w, function(e, t) {
                    t > l && i.push({
                        id1: l,
                        id2: t
                    })
                })
            });
            for (var o, u, c = 0; c < i.length; c++) o = i[c].id1 + "", u = i[c].id2 + "", r[o].lc++, r[u].lc++;
            return ue.forEach(n, function(t, n) {
                e.ids[n] || (r[n] = {
                    x: t.x,
                    y: t.y,
                    size: t.size,
                    lc: 0,
                    fixed: t.fixed,
                    jit: {
                        radius: t.size,
                        position: {
                            x: 0,
                            y: 0
                        }
                    }
                }, a++)
            }), {
                v: r,
                e: i,
                vcount: a,
                extents: l(r)
            }
        }

        function P(e, t) {
            var n = Q(t);
            return q(n)
        }

        function j(e, t, n) {
            e[n] || (e[n] = []), e[n].push(t)
        }

        function J(e, t) {
            j(e, t.id1, t.id2), j(e, t.id2, t.id1)
        }

        function Q(e) {
            for (var t = {}, n = 0; n < e.length; n++) J(t, e[n]);
            return t
        }

        function q(e) {
            var t, n = {},
                r = {};
            return ue.forEach(e, function(e, i) {
                e.sort(), t = "";
                for (var a = 0; a < e.length; a++) t += e[a];
                n[t] || (n[t] = []), n[t].push(i), r[i] = t
            }), {
                rev: n,
                ids: r,
                index: e
            }
        }

        function $(e, t, n, r) {
            var i, a = {},
                o = 0,
                l = t.length - 1;
            do i = ee(e, t, n, l, a, r), o = Math.max(i.radius, o), l = i.index; while (l >= 0);
            var u;
            switch (t.length) {
                case 4:
                    u = 2;
                    break;
                case 3:
                    u = 2.5;
                    break;
                case 2:
                    u = 3;
                    break;
                case 1:
                    u = 1;
                    break;
                default:
                    u = 2
            }
            return {
                positions: a,
                radius: o * u
            }
        }

        function ee(e, t, n, r, i, a) {
            var o = r;
            if (0 === o) return i[t[0]] = {
                x: 0,
                y: 0
            }, {
                radius: n,
                index: -1
            };
            var l = (o + 1) * n,
                u = n,
                c = Math.sqrt(l / (Math.PI * u)),
                s = c * u,
                f = Math.floor(2 * Math.PI * s / n);
            f = Math.min(f, o + 1);
            var d = 2 * Math.PI / f,
                g = 0;
            switch (f) {
                case 2:
                    g = Math.PI / 2, s *= .75;
                    break;
                case 3:
                    g = Math.PI / 3, s *= .85;
                    break;
                case 4:
                    g = 0, s *= .85;
                    break;
                case 5:
                    g = 0, s *= .9;
                    break;
                default:
                    g = 0
            }
            s *= a;
            for (var h = 0; f > h;) i[t[o - h]] = {
                x: s * Math.cos(g),
                y: s * Math.sin(g)
            }, g += d, h++;
            return o -= f, {
                radius: s,
                index: o
            }
        }

        function te(e, t, n, r) {
            var i, a = 0,
                o = {};
            for (i = 0; i < t.length; i++) a += e[t[i]].size;
            if (1 === t.length) o[t[0]] = {
                x: 0,
                y: 0
            };
            else {
                var l = Math.PI / 4;
                2 === t.length && (l = Math.PI / 2), 4 === t.length && (l = 0), t.length < 4 && (a *= 1.5);
                var u = 2 * Math.PI / t.length,
                    c = r * a / 4;
                for (i = 0; i < t.length; i++) o[t[i]] = {
                    x: c * Math.cos(l),
                    y: c * Math.sin(l)
                }, l += u
            }
            return {
                positions: o,
                radius: a
            }
        }

        function ne(e, t, n) {
            function r() {
                return 2 * Math.random() - 1 + (2 * Math.random() - 1) + (2 * Math.random() - 1)
            }

            function a(e, t, n) {
                return (t - e) * n + e
            }

            function o(e, t, n) {
                return (e - n) / (t - n)
            }

            function l(e) {
                var n = function() {
                        for (var t = 0, n = -(1 / 0), r = 0; r < e.length; r++) t += e[r].width * e[r].height, n = Math.max(n, e[r].width);
                        return {
                            area: t,
                            maxWidth: n
                        }
                    },
                    r = 1.1,
                    i = 1.03,
                    a = 10,
                    o = n(),
                    l = Math.sqrt(o.area * r / t.ratio) * i,
                    u = l * t.ratio;
                return u < o.maxWidth + a && (u = o.maxWidth + a), {
                    x: 0,
                    y: 0,
                    width: u,
                    height: l
                }
            }

            function u(e, t, n, r, i, l) {
                var u = o(t, n, r);
                return u = Math.pow(u, e), a(l, i, u)
            }

            function c(e, t) {
                if (!t) return !1;
                var n = e.x < m.x + m.width,
                    r = e.x + e.width > m.x,
                    i = e.y < m.y + m.height,
                    a = e.y + e.height > m.y;
                return (n || r) && (i || a)
            }

            function s(e, t) {
                function n(t) {
                    var n = e.y < t.y + t.height,
                        r = e.y + e.height > t.y;
                    return n && r
                }

                function r(t) {
                    var n = e.x < t.x + t.width,
                        r = e.x + e.width > t.x;
                    return n && r
                }
                if (t.length < 1) return !1;
                var i, a;
                for (i = 0; i < t.length; i++)
                    if (a = t[i], r(a) && n(a)) return !0;
                return !1
            }
            var f, d, g, h = {
                    spiral: function(e) {
                        var t = u(.6, e, 100, 0, p, 1),
                            n = u(1, e, 600, 0, .3, .5),
                            r = n * e,
                            i = Math.cos(r) * t,
                            a = Math.sin(r) * t;
                        return {
                            x: i,
                            y: a
                        }
                    },
                    controlled: function(e, t) {
                        for (var n; !c(t, n);) n = h.random(e);
                        return n
                    },
                    rect: function(e) {
                        return re(e, t, n)
                    },
                    random: function(e) {
                        var t = .5 * e;
                        return {
                            x: r() * t,
                            y: r() * t
                        }
                    }
                },
                v = 0,
                m = l(e),
                y = [],
                b = h[t.strategy] || h.rect,
                p = 0;
            for (f = 0; f < e.length; f++) d = e[f], p += d.width;
            if (p /= 2 * e.length, "rect" === t.strategy) return b(e);
            for (e.sort(i), f = 0; f < e.length; f++) {
                for (d = e[f], d.x = d.fixed ? d.x : 0, d.y = d.fixed ? d.y : 0; s(d, y) && !d.fixed;) g = b(v, d), d.x = g.x, d.y = g.y, v++;
                y.push(d)
            }
            return n(y)
        }

        function re(e, t, n) {
            function r() {
                for (var t = 0, n = 0; n < e.length; n++) t += e[n].width * e[n].height;
                return t
            }

            function a(e, t) {
                var n = i(e, t);
                return n ? n : t.height - e.height
            }

            function o(e) {
                for (var t = 0, n = 0; n < e.length; n++) t < e[n].width && (t = e[n].width);
                return t
            }

            function l(e) {
                for (var t = ue.clone(e), n = 0; n < t.length; n++) {
                    var r = t[n].width % f.step,
                        i = t[n].height % f.step;
                    0 !== r && (t[n].width += f.step - r), 0 !== i && (t[n].height += f.step - i)
                }
                return t
            }

            function u(e) {
                return h ? e.ratio() >= f.ratio - .2 && e.ratio() <= f.ratio : !0
            }

            function c(e) {
                for (var t = v(f.tightness), n = 0; n < e.length; n++) e[n].width += t, e[n].height += t
            }

            function s(e) {
                var t = 1.1,
                    n = 1.03,
                    r = 10,
                    i = Math.sqrt(e.area() * t / f.ratio) * n,
                    a = i * f.ratio;
                return a < e.maxWidth + r && (a = e.maxWidth + r), {
                    width: a,
                    height: i,
                    lowestFreeHeightDeficit: 0,
                    ratio: function() {
                        return y.width / y.height
                    }
                }
            }
            var f = ue.defaults(t, {
                ratio: 4 / 3,
                max: 10,
                sort: !0,
                step: 10,
                tightness: 5
            });
            f.sort && e.sort(a), c(e);
            var d, g = l(e),
                h = !0;
            if (0 === e.length) return d = ae(), void n(d.comps);
            var m = {
                    area: r,
                    maxWidth: o(g),
                    maxHeight: g[0].height
                },
                y = s(m),
                b = 0;
            ue.asyncWhile(function() {
                return y.width >= m.maxWidth
            }, function() {
                var e = ie(g, y);
                if (0 === e.comps.length) y.width *= 1.03, y.height *= 1.03;
                else {
                    if (b++, (!d || u(e)) && (d = e, d.efficiency = m.area() / e.area(), u(e))) return !0;
                    if (b >= f.max) return !0
                }
                return !1
            }, function() {
                return n(d.comps)
            })
        }

        function ie(e, t) {
            var n, r = ae();
            t.canvas || (t.canvas = oe());
            for (var i = t.canvas.setDimensions(t.width, t.height), a = 0, o = 0, l = 0; l < e.length; l++) {
                var u = e[l];
                if (n = i.addRect(u.width, u.height), !n.placed) {
                    r.width = 0, r.height = 0, r.comps.length = 0, r.lowestHeightFlushedRightItem = 0;
                    break
                }
                u.x = n.offsetX, u.y = n.offsetY, r.comps.push(u), u.y + u.height > r.height && (r.height = u.y + u.height), u.x + u.width > r.width && (r.width = u.x + u.width);
                var c = u.width + u.x;
                (c > o || c === o && u.height > a) && (r.lowestHeightFlushedRightItem = n.lfhd, a = u.height, o = c)
            }
            return t.lowestFreeHeightDeficit = i.lfhDeficitSinceLastRedim(), r
        }

        function ae() {
            var e = {
                width: 0,
                height: 0,
                area: function() {
                    return e.width * e.height
                },
                comps: [],
                lowestHeightFlushedRightItem: 0,
                ratio: function() {
                    return 0 === e.width ? 1 / 0 : e.width / e.height
                }
            };
            return e
        }

        function oe() {
            function e(e, t) {
                var n = s.height - e;
                return t - n
            }

            function t(e, t, n) {
                if (n.leftOverW > 0) {
                    s.cells += u.rows();
                    var r = e + (n.nRequiredCellsH - 1);
                    u.insertCol(r, n.leftOverW)
                }
                if (n.leftOverH > 0) {
                    s.cells += u.cols();
                    var i = t + (n.nRequiredCellsV - 1);
                    u.insertRow(i, n.leftOverH)
                }
                for (var a = e + (n.nRequiredCellsH - 1); a >= e; a--)
                    for (var o = t + (n.nRequiredCellsV - 1); o >= t; o--) u.setItem(a, o, !0)
            }

            function n(e, t, n, r) {
                r.nRequiredCellsH = 0, r.nRequiredCellsV = 0, r.leftOverW = 0, r.leftOverH = 0;
                for (var i, a = 0, o = 0, l = t; o < n.height;) {
                    for (i = e, a = 0; a < n.width;) {
                        if (u.item(i, l)) return !1;
                        a += u.colWidth(i), i++
                    }
                    o += u.rowHeight(l), l++
                }
                return r.nRequiredCellsH = i - e, r.nRequiredCellsV = l - t, r.leftOverW = a - n.width, r.leftOverH = o - n.height, !0
            }

            function r(e, t, n) {
                var r = 0,
                    i = 0,
                    a = 0,
                    o = 0,
                    l = 0;
                for (a = 0; e > a; a++) r += u.colWidth(a);
                for (a = 0; t > a; a++) i += u.rowHeight(a);
                if (o = n.x - r, l = n.y - i, 0 > o || 0 > l) return !1;
                if (o > 0) {
                    s.cells += u.rows();
                    var c = u.colWidth(e) - o;
                    u.insertCol(e, c)
                }
                if (l > 0) {
                    s.cells += u.cols();
                    var f = u.rowHeight(t) - l;
                    u.insertRow(t, f)
                }
                return !0
            }

            function i(e, t) {
                return s.width = e, s.height = t, s.area = o(), u.init(e, t, !1), s
            }

            function a(i, a, o) {
                var l = {
                        offsetX: 0,
                        offsetY: 0,
                        width: i,
                        height: a,
                        placed: !1
                    },
                    f = 0,
                    d = 0,
                    g = 0,
                    h = 0,
                    v = {};
                if (o) {
                    for (; f < u.cols() && g < o.x;) g += u.colWidth(f), f++;
                    for (; d < u.rows() && h < o.y;) h += u.rowHeight(d), d++;
                    r(f - 1, d - 1, o), g -= u.colWidth(f), h -= u.rowHeight(d)
                }
                s.addAttempts++;
                for (var m = be;;) {
                    for (v = {}; d < u.rows() && u.item(f, d);) h += u.rowHeight(d), d++;
                    if (d < u.rows() && e(h, l.height) <= 0) {
                        if (n(f, d, l, v)) {
                            t(f, d, v), l.offsetX = g, l.offsetY = h, l.placed = !0;
                            break
                        }
                        h += u.rowHeight(d), d++
                    }
                    var y = e(h, l.height);
                    if (y > 0 && (h = 0, d = 0, g += u.colWidth(f), f++, s.lfhDeficitSinceLastRedim() > y && (c = y)), s.width - g < l.width) {
                        l.placed = !1;
                        break
                    }
                }
                return m = c, {
                    offsetX: l.offsetX,
                    offsetY: l.offsetY,
                    lfhd: m,
                    placed: l.placed
                }
            }

            function o() {
                return s.width * s.height
            }
            var l = 0,
                u = le(),
                c = be,
                s = {
                    matrix: u,
                    cells: l,
                    addAttempts: 0,
                    addRect: a,
                    lfhDeficitSinceLastRedim: function() {
                        return c
                    },
                    setDimensions: i
                };
            return s
        }

        function le() {
            function e() {
                (a.length > 0 || o.length > 0) && (a.length = 0, o.length = 0, l.length = 0)
            }

            function t(t, n, r) {
                if (0 >= t) throw new Error("[Matrix] Column size cannot be 0 or similar");
                if (0 >= n) throw new Error("[Matrix] Row size cannot be 0 or similar");
                return u = 1, c = 1, e(), a.push({
                    index: 0,
                    size: t
                }), o.push({
                    index: 0,
                    size: n
                }), l[0] = [], l[0][0] = r, s
            }

            function n(e, t) {
                for (var n = o[e].index, r = 0; c > r; r++) l[r][u] = l[r][n];
                return u - 1 > e && o.splice(e + 1, 0, {
                    index: u,
                    size: t
                }), o[e + 1] = {
                    index: u,
                    size: t
                }, o[e].size -= t, u++, s
            }

            function r(e, t) {
                var n = a[e].index;
                return l[c] = ue.clone(l[n]), c - 1 > e && a.splice(e + 1, 0, {
                    index: c,
                    size: t
                }), a[e + 1] = {
                    index: c,
                    size: t
                }, a[e].size -= t, c++, s
            }

            function i() {
                var e, t, n, r = "\n     ",
                    i = 0,
                    l = 0;
                for (i = 0; c > i; i++) e = Math.floor(a[i].size / 100) % 10 === 0 ? " " : "" + Math.floor(a[i].size / 100) % 10, t = Math.floor(a[i].size / 10) % 10 === 0 && " " === e ? " " : "" + Math.floor(a[i].size / 10) % 10, n = Math.floor(a[i].size) % 10 === 0 && " " === e && " " === t ? " " : "" + Math.floor(a[i].size) % 10, r += a[i].size > 999 ? " " + a[i].size + " " : " " + e + t + n + " ";
                for (r += "\n", i = 0; u > i; i++) {
                    for (e = Math.floor(o[i].size / 100) % 10 === 0 ? " " : "" + Math.floor(o[i].size / 100) % 10, t = Math.floor(o[i].size / 10) % 10 === 0 && " " === e ? " " : "" + Math.floor(o[i].size / 10) % 10, n = Math.floor(o[i].size) % 10 === 0 && " " === e && " " === t ? " " : "" + Math.floor(o[i].size) % 10, r += o[i].size > 999 ? " " + o[i].size + ": " : " " + e + t + n + ": ", l = 0; c > l; l++) r += s.item(l, i) ? "  X  " : "  .  ";
                    r += "\n"
                }
                return r
            }
            var a = [],
                o = [],
                l = [],
                u = 0,
                c = 0,
                s = {
                    init: t,
                    cols: function() {
                        return c
                    },
                    rows: function() {
                        return u
                    },
                    item: function(e, t) {
                        return l[a[e].index][o[t].index]
                    },
                    setItem: function(e, t, n) {
                        l[a[e].index][o[t].index] = n
                    },
                    insertRow: n,
                    insertCol: r,
                    colWidth: function(e) {
                        return a[e].size
                    },
                    rowHeight: function(e) {
                        return o[e].size
                    },
                    inspect: i
                };
            return s
        }
        var ue = KeyLines.Util,
            ce = e.Util.create(),
            se = {},
            fe = Math.pow(10, -3.8),
            de = 27,
            ge = 1.35,
            he = Math.pow(de, ge);
        se.extractStructure = function(e, t, n, r, i, o, u, c, s) {
            var f = null;
            if (o) {
                f = {};
                for (var d = 0; d < o.length; d++) f[o[d]] = 1
            }
            var g = a(e, t, n, r, i, f, u, c, s);
            return g.extents = l(g.v), g
        };
        var ve = "_dummy",
            me = RegExp("^" + ve),
            ye = ue.makeRandomiser();
        se.layout = function(t, n, r, i, a, o) {
            n.trigger("prechange", "layout");
            var l = "^(standard|hierarchy|lens|sequential";
            l += "|radial|structural|tweak", l += ")$";
            var u = new RegExp(l);
            if (!u.test(t)) throw new Error("The layout name is not valid.");
            var c = ue.makeIdMap(["standard", "structural"]);
            if (ye.setSeed(null), c[t] || a.consistent) {
                var s = ue.ensureArray(a.fixed || []),
                    f = ue.makeIdMap(a.fixed),
                    d = 0,
                    g = 0;
                s.length && (ue.forEach(f, function(e, t) {
                    t in r.v && (d += r.v[t].x, g += r.v[t].y)
                }), d /= s.length, g /= s.length), ue.forEach(r.v, function(e, t) {
                    f[r.v[t].id] || (r.v[t].x = d, r.v[t].y = g)
                })
            }
            switch (a.consistent && ye.setSeed(900736044081), t) {
                case "standard":
                    Z(n, r, i, a, o);
                    break;
                case "hierarchy":
                    I(n, r, i, a, o);
                    break;
                case "lens":
                    return e.createLens(h).lens(n, r, a, E, ye, o);
                case "sequential":
                    p(n, r, i, a, o);
                    break;
                case "structural":
                    D(n, r, i, a, o);
                    break;
                case "radial":
                    I(n, r, i, a, o, G);
                    break;
                case "tweak":
                    S(n, r, a, o)
            }
        }, se.arrange = function(e, n, r, i, a, l, u, c) {
            function s(e, t) {
                var n, r = [];
                for (n = 0; n < t.length; n++) e[t[n]] && r.push(t[n]);
                return r
            }

            function f(e, t, n, r, i) {
                var a;
                for (a = 0; a < e.length; a++)
                    if (e[a].id === t) {
                        e[a].x = n - e[a].width / 2, e[a].y = r - e[a].height / 2;
                        break
                    }
                return i(e)
            }

            function d(e, t, n, r, i) {
                var a = {},
                    o = [],
                    l = {};
                for (h = 0; h < e.length; h++) l = H(e[h].verts, t), isFinite(l.width) && (o.push({
                    x: l.x,
                    y: l.y,
                    width: l.width,
                    height: l.height,
                    id: h
                }), a[h] = {
                    x: l.x,
                    y: l.y
                });
                l = H(t), o.push({
                    x: l.x,
                    y: l.y,
                    width: l.width,
                    height: l.height,
                    id: I
                }), a[I] = {
                    x: l.x,
                    y: l.y
                }, G(o, {
                    ratio: x.ratio,
                    centre: n,
                    absolute: r,
                    specialId: I
                }, function(e) {
                    return i({
                        packed: e,
                        original: a
                    })
                })
            }

            function g(e, t, n) {
                var r, i;
                ue.forEach(e, function(e) {
                    e.arranged ? (r = n[I].x - t[I].x, i = n[I].y - t[I].y) : (r = n[e.c].x - t[e.c].x, i = n[e.c].y - t[e.c].y), e.x += r, e.y += i
                })
            }
            var h, m, y, b = {
                    tidy: function(e, t, n) {
                        return re(e, {
                            step: 30,
                            max: 2,
                            sort: !1,
                            ratio: t.ratio
                        }, n)
                    },
                    average: function(e, t, n) {
                        return f(e, t.specialId, t.centre.x, t.centre.y, n)
                    },
                    absolute: function(e, t, n) {
                        return f(e, t.specialId, t.absolute.x, t.absolute.y, n)
                    }
                },
                p = {
                    privateConcentric: function(e) {
                        if (KeyLines.Layouts.CirclePacking) {
                            var n = KeyLines.Layouts.CirclePacking.create(),
                                r = t.privateGetItem(e).map(function(e) {
                                    return {
                                        id: e.id,
                                        x: 0,
                                        y: 0,
                                        r: ce.nodeSize(e, l, x.includeLabel).radius,
                                        labelOffset: ce.labelOffset(e)
                                    }
                                });
                            return r = n.concentricLayout(r, {
                                padding: x.padding
                            }), ue.makeDictionary(r)
                        }
                    },
                    grid: function(e, t, n, r) {
                        var i = 2 * n + 24 + r,
                            a = 0,
                            o = 0,
                            l = Math.floor(Math.sqrt(e.length)),
                            u = Math.ceil(e.length / l),
                            c = {};
                        for (h = 0; l > h; h++) {
                            for (m = 0; u > m; m++) {
                                var s = u * h + m;
                                e[s] && (c[e[s]] = {
                                    x: a,
                                    y: o
                                }), a += i
                            }
                            a = 0, o += i
                        }
                        return c
                    },
                    circle: function(e, t, n, r) {
                        var i = 1.25 - (5 - r) / 50;
                        return te(t, e, n, i).positions
                    },
                    radial: function(e, t, n, r) {
                        var i = 1.25 - (5 - r) / 50;
                        return $(t, e, n, i).positions
                    }
                },
                I = "#arranged#",
                x = ue.defaults(u, {
                    tightness: 5,
                    position: "average",
                    x: 0,
                    y: 0
                });
            n.trigger("prechange", "arrange");
            var C = i.v,
                w = v(x.tightness),
                G = b[x.position] || b.average,
                A = p[e] || p.grid,
                B = {
                    x: Number(x.x) || 0,
                    y: Number(x.y) || 0
                },
                Z = {
                    x: 0,
                    y: 0
                },
                R = ue.ensureArray(r);
            if (R = s(C, R), !R.length) return void c();
            for (y = 0, h = 0; h < R.length; h++) y += C[R[h]].size, Z.x += C[R[h]].x, Z.y += C[R[h]].y;
            y /= R.length, Z.x /= R.length, Z.y /= R.length;
            var M = A(R, C, y, w),
                k = {};
            ue.forEach(M, function(e, t) {
                C[t].x = e.x, C[t].y = e.y, k[t] = C[t], k[t].arranged = 1
            });
            var L = o(C, i.e, a);
            d(L, k, Z, B, function(e) {
                for (var t = e.packed, r = e.original, a = {}, o = 0; o < t.length; o++) a[t[o].id] = t[o];
                g(C, r, a);
                var l = [],
                    u = i.extents;
                E(n, C, {}, u, l, x, c)
            })
        };
        var be = 16e6;
        return se
    }
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    e && (e.arrowheadArcFactory = function(e) {
        var t = 4,
            n = 3,
            r = function(e, r, i, a, o) {
                for (var l = r.shadowIndex, u = 0; n > u; u++) e[l++] = i, e[l++] = a, e[l++] = o, e[l++] = t + u;
                r.shadowIndex = l
            },
            i = function(e, t) {
                var n = t.coreIndex;
                e[n++] = 0, e[n++] = 1, e[n++] = 0, e[n++] = 1, e[n++] = 0, e[n++] = 0, e[n++] = 0, e[n++] = 0, e[n++] = 1, t.coreIndex = n
            },
            a = function(e, t, n, r, i, a, o, l) {
                var u = t.positionIndex;
                e[u++] = n, e[u++] = r, e[u++] = i, e[u++] = a, e[u++] = o, e[u++] = l, e[u++] = n, e[u++] = r, e[u++] = i, e[u++] = a, e[u++] = o, e[u++] = l, e[u++] = n, e[u++] = r, e[u++] = i, e[u++] = a, e[u++] = o, e[u++] = l, t.positionIndex = u
            },
            o = function(t, r, i, a, o, l, u, c) {
                for (var s = (u ? e.background : 1) * (c ? e.ghost : 1), f = r.colourIndex, d = 0; n > d; d++) t[f++] = i, t[f++] = a, t[f++] = o, t[f++] = l * s;
                r.colourIndex = f
            };
        return function(e, t, n, l, u, c, s, f, d, g, h, v, m) {
            var y = d || [0, 0, 0];
            (g || h.all) && r(e.shadowData, e, y[0], y[1], y[2]), (h.colours || g || h.all) && o(e.colourData, e, f[0], f[1], f[2], f[3], v, m), (g || h.all) && i(e.coreData, e), (h.positions || g || h.all) && a(e.positionData, e, t, n, l, u, c, s)
        }
    })
}(),
function() {
    KeyLines.Overlays = {};
    var e = KeyLines.Overlays;
    e.createOverlays = function(e, t, n) {
        function r(e, t, n) {
            var r = !!t;
            return m[e] = r, n && c.useHiResImages() && (m[c.hiResUrl(e)] = r), e
        }

        function i() {
            return n && n.api.isShown()
        }

        function a() {
            return n && n.internalUse.isMapLoaded()
        }

        function o() {
            y = c.colours.ci, b = c.colours.cia
        }

        function l(e) {
            v[e] && v[e].apply(null, arguments)
        }

        function u(e, t, n, r, i, a, o) {
            e.rect(t.scale(n), t.scale(r), t.scale(i), t.scale(a), c.colours.transparent, -1, c.colours.transparent, !0, o)
        }
        var c = KeyLines.Rendering,
            s = KeyLines.Util,
            f = {},
            d = {},
            g = {},
            h = [],
            v = {},
            m = {};
        f.appendImageList = function(e) {
            s.forEach(m, function(t, n) {
                e[n] = 1
            })
        };
        var y, b;
        o(), f.colorize = function(e, t, n) {
            var r, i = {},
                a = "rgb(0,174, 234)";
            if (n) {
                var l = c.colorize(e, m, t, a, n);
                r = l.colour, i = l.images, y = c.rgbtostring(r[0], r[1], r[2]), b = c.rgbatostring(r[0], r[1], r[2], .5)
            } else o();
            s.forEach(e, function(t, n) {
                if ("updated" !== n && "_coList" !== n) {
                    var r = i[n] || t.im;
                    t.co = r, e.updated = !0
                }
            })
        }, f.setup = function() {
            p(), e.privateBind("click", l)
        }, f.createDragger = function(e, t, n) {
            return e in d ? d[e](t, n) : null
        }, f.reset = function() {
            d = {}, g = {}, h = [], v = {}, m = {}, e.privateUnbind("click", l)
        };
        var p = f.reset;
        f.getCursor = function(e) {
            return e in g ? g[e] : "auto"
        }, f.generate = function(e, t, n, r, i, a, o) {
            for (var l = 0; l < h.length; l++) h[l].generate(e, t, n, r, i, a, o)
        }, f.getWatermarkSize = function(e, t) {
            for (var n = 0; n < h.length; n++) {
                var r = h[n];
                if (r.watermarkSize) return r.watermarkSize(e, t)
            }
            return null
        }, f.addLogo = function(e, t) {
            var n = 15,
                i = "_logo",
                a = r(e + t.u, !1, !0),
                o = {
                    generate: function(e, r, o, l) {
                        e.setLayer(c.layers.OVERLAYS);
                        var u = l[a].im,
                            s = t.p || "ne",
                            f = ("w" === s.charAt(1) ? n : o.width() - (u.width + n)) + (t.x || 0),
                            d = ("n" === s.charAt(0) ? n : o.height() - (u.height + n)) + (t.y || 0);
                        e.image(o.scale(f), o.scale(d), o.scale(f + u.width), o.scale(d + u.height), a, i, null, !1, !0)
                    }
                };
            h.push(o)
        }, f.addTextWatermark = function(e, t, n, i, a, o, l, u) {
            var s = "_textWatermark",
                f = {
                    watermarkSize: function(r, i) {
                        var a, o;
                        if (e && i) {
                            var l = i[e].im;
                            a = l.width, o = l.height
                        } else t && (a = c.measureText(r, t, n, u).width, o = n);
                        return a ? {
                            width: a + 10,
                            height: o + 10
                        } : null
                    },
                    generate: function(r, f, d, g) {
                        var h, v;
                        if (r.setLayer(c.layers.UNDERLAYS), e) {
                            var m = g[e].im;
                            return h = d.scale((d.width() - m.width) / 2), v = d.scale((d.height() - m.height) / 2), void r.image(h, v, h + d.scale(m.width), v + d.scale(m.height), e, s)
                        }
                        if (t) {
                            var y = d.scale(n),
                                b = c.measureText(f, t, n, a, u).width;
                            h = d.scale((d.width() - b) / 2), v = d.scale((d.height() + n) / 2);
                            var p = -3.5,
                                I = Math.floor(y / 8);
                            "top" === l && (v = y + I), "bottom" === l && (v = d.scale(d.height()) + 1), o && r.rect(h - p, v - y - I, h + b + p + I, v, o, -1, o, !0, s), r.text(h, v, t, i, y, a, s, u, !1, b, !1, !1, h + p, v - y, h + b + p, v)
                        }
                    }
                };
            h.push(f), e && r(e)
        }, f.addNavigation = function(t, o, l, s) {
            function f() {
                return t.options().handMode
            }

            function m(e, n) {
                var r = e - I[w].im.height / 2,
                    i = b(r);
                t.setZoom(i, n)
            }

            function y(e) {
                var t;
                return t = a() ? n.internalUse.zoom() : (Math.log(e) - Math.log(o.getMinZoom())) / (Math.log(o.getMaxZoom()) - Math.log(o.getMinZoom())), Math.floor(W + (1 - t) * (V - W))
            }

            function b(e) {
                var t, r = 1 - (e - W) / (V - W);
                return t = i() ? n.internalUse.getMaxZoom() * r : Math.exp(r * (Math.log(o.getMaxZoom()) - Math.log(o.getMinZoom())) + Math.log(o.getMinZoom()))
            }

            function p() {
                return o.height() < 300
            }
            var I, x = r(l + "Background.png", !0, !0),
                C = r(l + "BackgroundShort.png", !0, !0),
                w = r(l + "Slider.png", !1, !0),
                G = r(l + "Hand.png", !1, !0),
                A = r(l + "Arrow.png", !1, !0),
                B = 7,
                Z = 17,
                R = 62,
                M = p() ? 145 : 247,
                E = s.p || "nw",
                k = ("w" === E.charAt(1) ? B : o.width() - (B + R)) + (s.x || 0),
                L = ("n" === E.charAt(0) ? Z : o.height() - (Z + M)) + (s.y || 0),
                S = k + 21,
                W = L + 118,
                V = L + 215;
            v._zoomIn = function() {
                t.zoomIn(!0)
            }, v._zoomOut = function() {
                t.zoomOut(!0)
            }, v._panLeft = function() {
                t.pan("left", !0)
            }, v._panRight = function() {
                t.pan("right", !0)
            }, v._panUp = function() {
                t.pan("up", !0)
            }, v._panDown = function() {
                t.pan("down", !0)
            }, v._fitToWindow = function() {
                t.fitToModel(!0)
            }, v._toggleMode = function() {
                var e = t.options();
                e.handMode = !e.handMode, t.options(e)
            }, v._scale = function(e, t, n) {
                m(n, !0)
            }, g._zoomIn = "pointer", g._zoomOut = "pointer", g._panLeft = "pointer", g._panRight = "pointer", g._panUp = "pointer", g._panDown = "pointer", g._fitToWindow = "pointer", g._toggleMode = "pointer", g._scale = "pointer", g._slider = 'url("' + l + 'openhand.cur"), pointer', d._slider = function() {
                var r = o.zoom();
                if (p()) return null;
                if (!e.trigger("dragstart", "slider")) return i() && n.internalUse.enableDragging(!1), {
                    getCursor: function() {
                        return "move"
                    },
                    dragMove: function(e, t) {
                        var n = o.unscale(t);
                        m(n, !1)
                    },
                    endDrag: function(a) {
                        var o = e.trigger("dragend", "slider");
                        a && !o || t.setZoom(r, !1), i() && n.internalUse.enableDragging(t.options().handMode), e.trigger("dragcomplete", "slider")
                    }
                }
            };
            var X = {
                generate: function(e, t, n, r, i, a) {
                    var o = p() ? C : x,
                        l = r[o].im;
                    if (t.webgl && !r._coList[o] && (r._coList[o] = !0, r._coList[c.hiResUrl(o)] = !0, r.updated = !0), !a) {
                        I = r, e.setLayer(c.layers.OVERLAYS), e.image(n.scale(k), n.scale(L), n.scale(k + l.width), n.scale(L + l.height), o, "_background", "co", !1, !0);
                        var s = k + 19,
                            d = L + 64,
                            g = n.scale(s),
                            h = n.scale(d),
                            v = n.scale(s + 28),
                            m = n.scale(d + 32),
                            b = f() ? G : A;
                        e.image(g, h, v, m, b, null, null, !1, !0), e.setLayer(c.layers.OVERLAYSSHADOW), e.image(g, h, v, m, b, "_toggleMode");
                        var B = 5,
                            Z = 23,
                            R = 39,
                            M = 57,
                            E = 105,
                            W = p() ? 124 : 222,
                            V = 18,
                            X = 3,
                            F = 68,
                            T = 22;
                        if (u(e, n, k + Z, L + E, k + R, L + E + V, "_zoomIn"), u(e, n, k + Z, L + W, k + R, L + W + V, "_zoomOut"), u(e, n, k + B, L + Z, k + Z, L + R, "_panLeft"), u(e, n, k + R, L + Z, k + M, L + R, "_panRight"), u(e, n, k + Z, L + B, k + R, L + Z, "_panUp"), u(e, n, k + Z, L + R, k + R, L + M, "_panDown"), u(e, n, k + Z, L + Z, k + R, L + R, "_fitToWindow"), p() || u(e, n, k + Z, L + E + V, k + R, L + W, "_scale"), u(e, n, k + Z - X, L + F, k + R + X, L + F + T, "_toggleMode"), !p()) {
                            var N = y(n.zoom()),
                                H = n.scale(S),
                                Y = n.scale(N),
                                U = n.scale(S + r[w].im.width),
                                K = n.scale(N + r[w].im.height);
                            e.image(H, Y, U, K, w, "_slider"), e.setLayer(c.layers.OVERLAYS), e.image(H, Y, U, K, w, null, null, !1, !0)
                        }
                    }
                },
                createDragger: function() {}
            };
            g[x] = "wait", h.push(X)
        };
        var I, x, C, w, G, A = {
            ne: "sw",
            nw: "se",
            se: "nw",
            sw: "ne"
        };
        return f.addOverview = function(n, i, a, o, l, u) {
            function f(e) {
                var t = {
                    x1: a.viewToWorldX(a.scale(-e)),
                    x2: a.viewToWorldX(a.scale(a.width() + e)),
                    y1: a.viewToWorldY(a.scale(-e)),
                    y2: a.viewToWorldY(a.scale(a.height() + e))
                };
                return {
                    x1: V.worldToViewX(t.x1),
                    x2: V.worldToViewX(t.x2),
                    y1: V.worldToViewY(t.y1),
                    y2: V.worldToViewY(t.y2)
                }
            }

            function m() {
                Y += X.x, U += X.y, e.trigger("redraw")
            }

            function p() {
                z = s.setRegularTick(m, 50)
            }

            function B() {
                z && (clearInterval(z), z = null)
            }

            function Z(e) {
                var t = Math.max(e.width(), e.height()) / 2;
                V.reset(!1);
                var n = f(t);
                V.fitExtents(n, null, !1, !1, void 0, void 0, void 0, !0);
                var r = e.getMaxItemZoom();
                r !== 1 / 0 && V.setMaxItemZoom(r / 8), T && V.panBy(Y, U, !1, !0)
            }
            var R = u.p && A[u.p] ? u.p : "se",
                M = r(l + "Arrow-" + A[R] + ".png", !0, !0),
                E = r(l + "Arrow-" + R + ".png", !0, !0);
            u.size = u.size || 100, I = u.size, C = u.shown, G = "n" === R.charAt(0), w = "w" === R.charAt(1), x = o(I, I);
            var k = x.getContext("2d"),
                L = !1,
                S = !1,
                W = Date.now(),
                V = t.createView(e, I, I);
            v._overviewIcon = function() {
                u.shown = !u.shown, C = u.shown, e.trigger("overview", C ? "open" : "close")
            }, g._overviewIcon = "pointer";
            var X, F = null,
                T = !1,
                N = 0,
                H = 0,
                Y = 0,
                U = 0,
                K = 2;
            g._overviewBox = 'url("' + l + 'openhand.cur"), pointer';
            var z;
            d._overviewBox = function(t, r) {
                if (!e.trigger("dragstart", "overview")) {
                    T = !0;
                    var i = 2;
                    N = 0, H = 0, Y = 0, U = 0;
                    var o = -F.x1 + i,
                        l = I - F.x2 - i,
                        u = -F.y1 + i,
                        c = I - F.y2 - i;
                    return {
                        getCursor: function() {
                            return "move"
                        },
                        dragMove: function(e, n) {
                            B(), N = e - t, H = n - r, X = {
                                x: 0,
                                y: 0
                            };
                            var i = !1;
                            o > N && (N = o, X.x = K, i = !0), N > l && (N = l, X.x = -K, i = !0), u > H && (H = u, X.y = K, i = !0), H > c && (H = c, X.y = -K, i = !0), i && p()
                        },
                        endDrag: function(t) {
                            T = !1, B();
                            var r = e.trigger("dragend", "overview");
                            if (t && !r) {
                                var i = -(N - Y) * (a.zoom() / V.zoom()),
                                    o = -(H - U) * (a.zoom() / V.zoom());
                                n.panBy(i, o, !0)
                            }
                            e.trigger("dragcomplete", "overview")
                        }
                    }
                }
            };
            var O = {
                generate: function(t, r, a, o, l, s) {
                    if (!s) {
                        if (C) {
                            var d, g, h, v, m = w ? a.scale(-1) : a.scale(a.width() - I - 2),
                                p = G ? a.scale(-1) : a.scale(a.height() - I - 2),
                                x = w ? a.scale(I + 2) : a.scale(a.width() + 1),
                                A = G ? a.scale(I + 2) : a.scale(a.height() + 1),
                                B = Math.max(1, a.scale(3)),
                                R = w ? a.scale(-1) : a.scale(a.width() - I) - .5,
                                X = G ? a.scale(-1) : a.scale(a.height() - I) - .5,
                                Y = w ? a.scale(I) + .5 : a.scale(a.width() + 1),
                                U = G ? a.scale(I) + .5 : a.scale(a.height() + 1),
                                K = Math.max(1, a.scale(1));
                            if (t.setLayer(c.layers.OVERVIEWSHADOW), t.rect(m, p, x, A, c.colours.white, B, c.colours.white, !0, "_overviewBorder1"), t.rect(R, X, Y, U, c.colours.lightgrey, K, c.colours.white, !1, "_overviewBorder2"), t.setLayer(c.layers.OVERVIEW), t.rect(m, p, x, A, c.colours.white, B, c.colours.white, !1), t.rect(R, X, Y, U, c.colours.lightgrey, K, c.colours.white, !1), i) {
                                var z = Date.now();
                                L && !T && W + 1e3 > z && S ? e.trigger("redraw") : (W = Date.now(), L = !0, r.webgl ? (Z(a), n.setOverviewView(V)) : (k.clearRect(0, 0, I, I), k.fillStyle = c.colours.white, k.fillRect(0, 0, I, I), n.drawBackground(k), Z(a), t.draw(k, V, o, c.channels.MAIN, c.itemLayers)), S = Date.now() - W > 30), F || (F = f(0));
                                var O = T ? N : 0,
                                    D = T ? H : 0,
                                    _ = T ? "_overviewBoxDragging" : "_overviewBox";
                                d = a.scale(w ? F.x1 + O : a.width() - I + F.x1 + O), g = a.scale(G ? F.y1 + D : a.height() - I + F.y1 + D), h = a.scale(w ? F.x2 + O : a.width() - I + F.x2 + O), v = a.scale(G ? F.y2 + D : a.height() - I + F.y2 + D);
                                var P = Math.max(1, a.scale(2));
                                t.setLayer(c.layers.OVERVIEWSHADOW), t.rect(d, g, h, v, y, P, b, !T, _), t.setLayer(c.layers.OVERVIEW), t.rect(d, g, h, v, y, P, b, !T, _)
                            }
                        }
                        var j = C ? E : M,
                            J = o[j].im;
                        u.icon && (t.rect(w ? a.scale(-1) : a.scale(a.width() - J.width) - .5, G ? a.scale(-1) : a.scale(a.height() - J.height) - .5, w ? a.scale(J.width) + .5 : a.scale(a.width() + 1), G ? a.scale(J.height) + .5 : a.scale(a.height() + 1), c.colours.lightgrey, Math.max(1, a.scale(1)), c.colours.white, !0, "_overviewIconRect"), t.image(a.scale(w ? 0 : a.width() - J.width), a.scale(G ? 0 : a.height() - J.height), a.scale(w ? J.width : a.width()), a.scale(G ? J.height : a.height()), j, "_overviewIcon", "co", !1, !0), r.webgl && !o._coList[j] && (o._coList[j] = !0, o._coList[c.hiResUrl(j)] = !0, o.updated = !0), t.setLayer(c.layers.OVERVIEWSHADOW), t.rect(a.scale(w ? -1 : a.width() - 2 * J.width), a.scale(G ? -1 : a.height() - 2 * J.height), a.scale(w ? 2 * J.width : a.width() + 1), a.scale(G ? 2 * J.height : a.height() + 1), c.colours.lightgrey, -1, c.colours.white, !0, "_overviewIcon"))
                    }
                }
            };
            h.push(O)
        }, f.remove = function(e, t, n) {
            var r = 42,
                i = {
                    generate: function(i, a, o) {
                        i.setLayer(c.layers.OVERLAYS);
                        var l = c.measureText(a, e, r).width,
                            u = o.scale((o.width() - l) / 2),
                            s = o.scale((o.height() + r) / 2);
                        i.text(u + 2, s + 2, e, n, o.scale(r), !0, null, null, !1, l, !1, !1, u + 2, s + 2 - o.scale(r), u + 2 + l, s + 2), i.text(u, s, e, t, o.scale(r), !0, null, null, !1, l, !1, !1, u, s - o.scale(r), u + l, s)
                    }
                };
            h.push(i)
        }, f.drawOverviewContent = function(e, t) {
            if (C && x) {
                var n = t.scale(I);
                e.drawImage(x, 0, 0, n, n, t.scale(w ? 0 : t.width() - I), t.scale(G ? 0 : t.height() - I), n, n)
            }
        }, f.addBanding = function(e) {
            var t = 6,
                n = 3,
                r = 3,
                i = 6,
                a = {
                    generate: function(a, o, l) {
                        var u = s.merge({
                            top: !0
                        }, e.bands);
                        if (u && u.bands) {
                            var f, d, g, h, v, m, y;
                            a.setLayer(c.layers.BANDS);
                            var b = 1 / 0;
                            for (f = 0; f < u.bands.length; f++) v = u.bands[f], v.t && (d = l.dim(v.w / 2), g = v.ff || e.fontFamily, h = v.fs || 20, m = .75 * h, y = c.measureText(o, v.t, h, v.fb, g).width / 2, y + m > d && (h = Math.floor(h * d / (y + m))), b > h && (b = h));
                            for (b !== 1 / 0 && (m = .75 * b), f = 0; f < u.bands.length; f++) {
                                v = u.bands[f];
                                var p = l.x(v.x),
                                    I = l.x(v.x - v.w / 2),
                                    x = l.x(v.x + v.w / 2),
                                    C = l.scale(-1),
                                    w = l.scale(l.height() + 1);
                                d = l.dim(v.w / 2);
                                var G = v.c || "#f7f7f7";
                                if (a.rect(I, C, x, w, "white", -1, G, !0, ""), v.t && b > 3) {
                                    a.setLayer(c.layers.BANDLABELS), g = v.ff || e.fontFamily, y = c.measureText(o, v.t, b, v.fb, g).width / 2;
                                    var A = v.fc || c.colours.lightgrey,
                                        B = l.scale(b),
                                        Z = (x - I) / 2 - y;
                                    if (u.top) {
                                        var R = t + B;
                                        a.rect(I, C, x, R + n, "white", -1, G, !0, ""), a.text(p - y, R, v.t, A, B, v.fb, "", g, !1, 2 * y, !1, !1, I + Z, C + 2 * n, x + Z, R + 2 * n)
                                    }
                                    if (u.bottom) {
                                        var M = l.height() - r,
                                            E = M - (B + i);
                                        a.rect(I, E, x, w, "white", -1, G, !0, ""), a.text(p - y, M, v.t, A, B, v.fb, "", g, !1, 2 * y, !1, !1, I + Z, E + 2 * n, x + Z, E + 2 * n + h)
                                    }
                                    a.setLayer(c.layers.BANDS)
                                }
                            }
                        }
                    }
                };
            h.push(a)
        }, f
    }
}(),
function() {
    KeyLines.TimeBar.Model = {};
    var e = KeyLines.TimeBar.Model;
    e.createModel = function(e, t) {
        function n() {
            e.trigger("redraw")
        }

        function r(e) {
            return e.t <= e.other
        }

        function i(e) {
            return e.t >= e.other
        }

        function a(e, t, r, i) {
            J.t1 = e, J.t2 = t, Q.t1 = r, Q.t2 = i, Y && (te = s(Q), n()), he = !0
        }

        function o(e, n) {
            var r = ae[e.units] * e.by,
                i = r / n;
            return i >= t.histogram.minwidth
        }

        function l(e) {
            for (var t = oe(), n = 0; D[n].max < e * t && n < D.length;) n++;
            return n
        }

        function u(e, t) {
            for (var n = O.units[e], r = 0; r < D.length; r++) {
                var i = D[r].minor;
                if (i.units > n || i.units === n && i.by >= t) return r > 0 ? r - 1 : r
            }
            return D.length - 2
        }

        function c() {
            var e = 0;
            if (g()) {
                var n = f(t.options.minScale);
                e = u(n.units, n.value)
            }
            return e
        }

        function s(e) {
            var t = {},
                n = (e.t2 - e.t1) / (Y.x2 - Y.x1),
                r = l(n),
                i = c();
            for (r = i >= r ? i + 1 : r, t.major = D[r].major, t.minor = D[r].minor; r > 0 && o(D[r - 1].minor, n) && r - 1 > i;) r--;
            return t.histogram = D[r].minor, t.timeRate = n, t
        }

        function f(e) {
            var t = K.objectHasOwnProperty(O.units, e.units) ? e.units : O.units.sec,
                n = K.isNumber(e.value) ? Math.round(Math.abs(e.value)) : 1;
            return {
                units: t,
                value: n
            }
        }

        function d(e) {
            var n = K.objectHasOwnProperty(O.units, e.units) ? e.units : O.units.sec,
                r = K.isNumber(e.value) ? Math.round(Math.abs(e.value)) : t.baseRangeLimits.max;
            return {
                units: n,
                value: r
            }
        }

        function g() {
            return t.options.minScale
        }

        function h() {
            return "auto" !== t.options.maxRange
        }

        function v(e) {
            return t.options.sliders === e
        }

        function m() {
            var e, n = c(),
                r = D[n].max;
            if (v("fixed")) e = N / (1 + t.freeSideFactor);
            else if (v("free")) {
                r = 1;
                var i = D[n + 1].minor;
                e = ae[i.units] * i.by
            } else e = N;
            return Math.round(r * e)
        }

        function y() {
            ie = null;
            for (var e = 0; e < ne.length; e++) re[e] = null, ne[e] = null;
            re.length = 0, ne.length = 0
        }

        function b(e) {
            ie = e;
            var n, a;
            for (n = 0; n < e.length; n++) {
                var o = e[n].index || 0;
                if (o < t.selection.maxNumber && e[n].id) {
                    var l = K.ensureArray(e[n].id);
                    if (l.length) {
                        ne[o] = K.makeIdMap(l), re[o] = {
                            startTotals: [],
                            endTotals: []
                        };
                        var u = 0,
                            c = 0;
                        for (a = 0; a < _.length; a++) {
                            var s = _[a];
                            re[o].startTotals[a] = u, re[o].endTotals[a] = c, s.id in ne[o] && (r(s) && (u += s.v), i(s) && (c += s.v))
                        }
                        re[o].startTotals[a] = u, re[o].endTotals[a] = c, p(o, e[n].c)
                    } else !l.length && re[o] && (re[o] = null, ne[o] = null)
                }
            }
        }

        function p(e, n) {
            var r = {
                    colour0: "rgb(114, 179, 0)",
                    colour1: "rgb(255, 153, 0)",
                    colour2: "rgb(178, 38, 9)"
                },
                i = r["colour" + e];
            n && z.validatergb(n) && (i = n), t.selection["colour" + e] = i
        }

        function I(e) {
            for (var t = 0, n = _.length; n > t;) {
                var i = Math.floor((t + n) / 2),
                    a = _[i].t;
                a !== e || r(_[i]) || a--, e > a ? t = i + 1 : n = i
            }
            return t
        }

        function x(e, t) {
            var n, r, i = I(e),
                a = I(t),
                o = {},
                l = {};
            for (n = 0; i > n; n++) r = _[n], r.t !== r.other && (l[r.id] = (l[r.id] || 0) + (r.t < r.other ? 1 : -1));
            for (K.forEach(l, function(e, t) {
                    e > 0 && (o[t] = !0)
                }), n = i; a > n; n++) o[_[n].id] = !0;
            return Object.keys(o)
        }

        function C(e, t, n, a) {
            for (var o = I(e), l = I(t), u = o; l > u; u++) {
                var c = _[u];
                if (n ? r(c) : i(c)) {
                    var s = c.id;
                    q[s] = (q[s] || 0) + a
                }
            }
        }

        function w() {
            var e = J.t1,
                t = J.t2,
                n = $.t1,
                r = $.t2;
            n > e ? C(e, n, !1, 1) : e > n && C(n, e, !1, -1), t > r ? C(r, t, !0, 1) : r > t && C(t, r, !0, -1), $.t1 = e, $.t2 = t
        }

        function G() {
            var e = fe(),
                n = e ? 2 * (e.t2 - e.t1) : t.baseRangeLimits.max,
                r = t.baseRangeLimits.min;
            if (g() ? r = m() : t.options.minRange && (r = Math.max(r, t.options.minRange)), h()) {
                var i = d(t.options.maxRange),
                    a = O.units[i.units];
                n = i.value * ae[a]
            } else n = Math.max(n, Math.floor(4 * r));
            return r = Math.min(r, Math.floor(n / 4)), {
                max: n,
                min: r
            }
        }

        function A() {
            var e = 0,
                n = N,
                r = t.options.showControlBar ? t.controlbar.height : 0,
                i = oe(),
                a = t.options.scale.showMinor ? t.bars.minor.height * i : 0,
                o = t.options.scale.showMajor ? t.bars.major.height * i : 0,
                l = H - r,
                u = l - o,
                c = u - a,
                s = c - t.histogram.dy,
                f = s - t.histogram.topdy,
                d = f * t.selection.reducingFactor;
            Y = {
                bars: {
                    major: {
                        y1: u,
                        y2: l
                    },
                    minor: {
                        y1: c,
                        y2: u
                    }
                },
                histogram: {
                    ybase: s,
                    maxbarh: f,
                    maxselh: d
                },
                x1: e,
                y1: c,
                x2: n,
                y2: l,
                width: N,
                height: H
            }
        }

        function B() {
            var e, n, r, i = t.selection.maxNumber,
                a = te.histogram,
                o = O.clear(Q.t1, a.units, a.by),
                l = I(o),
                u = 0,
                c = 0,
                s = 0;
            for (n = 0; i > n; n++) ge.hasSel[n] = !!re[n], ge.selvalues[n] = ge.selvalues[n] || [];
            do {
                r = o > Q.t2, ge.x[u] = ue(o), o = O.add(o, a.units, a.by), e = I(o);
                var f = P[e] - j[l];
                for (ge.value[u] = f, f > c && !r && (c = f), n = 0; i > n; n++) {
                    var d = re[n];
                    if (d) {
                        var g = d.startTotals[e] - d.endTotals[l];
                        ge.selvalues[n][u] = g, g > s && !r && (s = g)
                    }
                }
                u++, l = e
            } while (!r);
            ge.count = u - 1, ge.maxvalue = c, ge.maxselvalue = s, he = !1
        }

        function Z(n) {
            var r = fe();
            r && J.t1 >= r.t1 && n <= r.t1 && !t.playingExtend && e.trigger("start", "data")
        }

        function R(t) {
            var n = fe();
            n && J.t2 <= n.t2 && t >= n.t2 && e.trigger("end", "data")
        }

        function M(e) {
            var t = le(e);
            if (!K.isNumber(t)) throw new Error("load: invalid date in dt property. Value was: " + e);
            return t
        }

        function E(e) {
            for (var t = [], n = K.ensureArray(e), r = 0; r < n.length; r++) {
                var i = n[r];
                if (i.id && i.dt)
                    for (var a = i.id + "", o = K.ensureArray(i.dt), l = K.ensureArray(i.v), u = 0; u < o.length; u++) {
                        var c = o[u],
                            s = l[u] || 1;
                        if (!K.isNumber(s)) throw new Error("load: invalid value in v property - must be numeric. Value was: " + s);
                        if ("object" != typeof c || c instanceof Date) {
                            var f = M(c);
                            t.push({
                                id: a,
                                t: f,
                                v: s,
                                other: f
                            })
                        } else {
                            var d = "dt1" in c,
                                g = "dt2" in c;
                            if (!d && !g) throw new Error("load: TimePeriod object must have a dt1 or dt2 property. Id was: " + a);
                            var h = d ? M(c.dt1) : -(1 / 0),
                                v = g ? M(c.dt2) : 1 / 0;
                            if (h > v) throw new Error("load: TimePeriod dt2 time must be after dt1 time. Id was: " + a);
                            t.push({
                                id: a,
                                t: h,
                                v: s,
                                other: v
                            }), v !== h && t.push({
                                id: a,
                                t: v,
                                v: s,
                                other: h
                            })
                        }
                    }
            }
            return t.sort(S)
        }

        function k() {
            P = [0], j = [0], q = {}, he = !0;
            for (var e = 0; e < _.length; e++) {
                var t = _[e],
                    a = 0,
                    o = r(t),
                    l = i(t);
                o && t.t < J.t2 && (a = 1), l && t.t < J.t1 && (a -= 1), 0 !== a && (q[t.id] = (q[t.id] || 0) + a), P[e + 1] = P[e] + (o ? t.v : 0), j[e + 1] = j[e] + (l ? t.v : 0)
            }
            $.t1 = J.t1, $.t2 = J.t2;
            var u = U.limitInnerRange($.t1, $.t2, !0);
            return n(), u
        }

        function L(e, t) {
            return e === t ? 0 : e === 1 / 0 || t === -(1 / 0) ? 1 : e === -(1 / 0) || t === 1 / 0 ? -1 : e - t
        }

        function S(e, t) {
            var n = e.t === t.t ? L(e.other, t.other) : L(e.t, t.t);
            return 0 === n && (n = e.id === t.id ? e.v - t.v : e.id > t.id ? 1 : -1), n
        }

        function W(e, t) {
            for (var n = [], r = 0, i = 0; r < e.length && i < t.length;) {
                var a = S(e[r], t[i]);
                0 === a ? (n.push(e[r]), r++, i++) : 0 > a ? (n.push(e[r]), r++) : (n.push(t[i]), i++)
            }
            for (; r < e.length;) n.push(e[r]), r++;
            for (; i < t.length;) n.push(t[i]), i++;
            return n
        }

        function V(e, t) {
            var n = Math.floor((e.t2 - e.t1) * t);
            return {
                t1: e.t1 - n,
                t2: e.t2 + n
            }
        }

        function X(e) {
            var n;
            if (v("none")) n = e;
            else if (v("free")) {
                var r = fe();
                if (r) {
                    var i = G();
                    r.t2 - r.t1 < i.min && (r.t1 = Math.floor(r.t1 - i.min / 2), r.t2 = Math.ceil(r.t2 + i.min / 2)), n = V(r, t.freeSideFactor)
                } else n = Q
            } else n = V(e, t.fixedSideFactor);
            return n
        }

        function F() {
            var e = J.t1,
                t = J.t2;
            ye(J.t1, J.t2), e === J.t1 && t === J.t2 || be()
        }

        function T(e) {
            var t = X(e),
                n = s(t).histogram,
                r = O.clear(e.t1, n.units, n.by),
                i = O.clear(e.t2, n.units, n.by);
            return i !== e.t2 && (i = O.add(i, n.units, n.by)), {
                t1: r,
                t2: i
            }
        }
        var N, H, Y, U = {},
            K = KeyLines.Util,
            z = KeyLines.Rendering,
            O = KeyLines.DateTime,
            D = t.rates,
            _ = [],
            P = [],
            j = [],
            J = {
                t1: 0,
                t2: 0
            },
            Q = {
                t1: 0,
                t2: 0
            },
            q = {},
            $ = {
                t1: 0,
                t2: 0
            },
            ee = 250,
            te = {},
            ne = [],
            re = [],
            ie = null,
            ae = [1, 1e3, 6e4, 36e5, 864e5, 6048e5, 2592e6, 31536e6];
        U.fontSizeFactor = function() {
            return t.options.fontSize / t.bars.defaultFontSize
        };
        var oe = U.fontSizeFactor;
        U.extractUTC = function(e) {
            var t;
            return e instanceof Date ? t = O.UTCify(e) : "number" == typeof e && (t = Math.round(e)), t
        };
        var le = U.extractUTC;
        U.ttox = function(e) {
            return Y.x1 + (e - Q.t1) / ve()
        };
        var ue = U.ttox;
        U.xtot = function(e) {
            return Q.t1 + (e - Y.x1) * ve()
        };
        var ce = U.xtot;
        U.getClickedBar = function(e) {
            return e >= Y.bars.major.y1 ? "major" : e >= Y.bars.minor.y1 ? "minor" : "histogram"
        };
        var se = U.getClickedBar;
        U.findRange = function(e, t, n) {
            var r, i = n || se(t),
                a = ce(e);
            return de(i, function(e, t) {
                return t > a ? (r = {
                    t1: e,
                    t2: t,
                    bar: i
                }, !0) : !1
            }), r
        }, U.dataRange = function() {
            if (_.length > 0) {
                for (var e = 0; _[e].t === -(1 / 0);) e++;
                for (var t = _[e].t, n = _.length - 1; _[n].t === 1 / 0;) n--;
                var r = _[n].t + 1;
                return {
                    t1: t,
                    t2: r
                }
            }
        };
        var fe = U.dataRange;
        U.eachTick = function(e, t) {
            var n, r = te[e],
                i = O.clear(Q.t1, r.units, r.by),
                a = !1;
            do n = O.add(i, r.units, r.by), a = t(i, n, ue(i), ue(n), r.f), i = n; while (!a && i <= Q.t2)
        };
        var de = U.eachTick,
            ge = {
                count: 0,
                x: [],
                value: [],
                hasSel: [],
                selvalues: [],
                maxvalue: 0,
                maxselvalue: 0
            },
            he = !0;
        U.getHistogram = function() {
            return he && B(), ge
        }, U.getBounds = function() {
            return Y
        }, U.getInnerRange = function() {
            return J
        }, U.getOuterRange = function() {
            return Q
        }, U.getTimeRate = function() {
            return te.timeRate
        };
        var ve = U.getTimeRate;
        U.nextPage = function(e) {
            var t = J.t1,
                n = J.t2,
                r = "back" === e ? -1 : 1,
                i = O.units.month;
            if (t === O.clear(t, i, 1) && n === O.clear(n, i, 1)) {
                var a = new Date(t),
                    o = new Date(n),
                    l = 12 * (o.getUTCFullYear() - a.getUTCFullYear()) + (o.getUTCMonth() - a.getUTCMonth());
                t = O.add(t, i, r * l), n = O.add(n, i, r * l)
            } else {
                var u = r * (n - t);
                t += u, n += u
            }
            return {
                t1: t,
                t2: n
            }
        }, U.privateGetItems = function() {
            return _
        }, U.setInnerRangeSide = function(e, t) {
            "t1" === e ? Z(t) : R(t), J[e] = t
        }, U.getSideLimits = function(e) {
            var t, n;
            if ("t1" === e ? (t = Q.t1, n = J.t2) : (t = J.t1, n = Q.t2), v("fixed")) {
                var r = n - t,
                    i = Math.floor(.1 * r);
                t += i, n -= i
            }
            var a = G();
            "t1" === e ? (t = Math.max(t, J.t2 - a.max), n = Math.min(n, J.t2 - a.min)) : (t = Math.max(t, J.t1 + a.min), n = Math.min(n, J.t1 + a.max));
            var o = fe();
            return o && ("t1" === e ? n = Math.min(n, o.t2) : t = Math.max(t, o.t1)), {
                min: t,
                max: n
            }
        }, U.hasItems = function() {
            return _.length > 0
        }, U.limitInnerRange = function(e, t, n) {
            var r, i = e,
                a = t,
                o = fe(),
                l = n ? (i + a) / 2 : (J.t1 + J.t2) / 2,
                u = G(),
                c = a - i;
            return c > u.max ? (i = Math.ceil(l - u.max / 2), a = Math.floor(l + u.max / 2)) : c < u.min && (i = Math.floor(l - u.min / 2), a = Math.ceil(l + u.min / 2)), o && (a < o.t1 ? (r = o.t1 - a, i += r, a += r) : i > o.t2 && (r = i - o.t2, i -= r, a -= r)), {
                t1: i,
                t2: a
            }
        };
        var me = U.limitInnerRange;
        U.inMainBarOrHistogram = function(e, t) {
            return e >= Y.x1 && e <= Y.x2 && t >= 0 && t <= Y.y2
        }, U.load = function(e) {
            var t = (e || {}).items;
            return _ = E(t), y(), k()
        }, U.merge = function(e) {
            var t = E(e);
            t.length > 0 && (_ = 0 === _.length ? t : t[0].t > _[_.length - 1].t ? _.concat(t) : t[t.length - 1].t < _[0].t ? t.concat(_) : W(_, t), ie && b(ie), k())
        }, U.offsetRanges = function(e, t) {
            var n = J.t1,
                r = J.t2;
            return ye(n + (t ? 0 : e), r + e), n !== J.t1 || r !== J.t2
        }, U.selection = function(e) {
            var t = K.isNullOrUndefined(e) ? e : K.ensureArray(e);
            t && (t.length ? b(t) : y()), he = !0, n();
            for (var r = [], i = 0; i < ne.length; i++) r[i] = ne[i] ? Object.keys(ne[i]) : null;
            return r
        }, U.setInner = function(n, r) {
            var i = me(n, r),
                o = fe();
            if (o && J.t1 && J.t2) {
                var l = me(n + 1, r + 1),
                    u = me(n - 1, r - 1);
                Z(n), i.t1 < J.t1 && u.t1 === i.t1 && !t.playingExtend && e.trigger("start", "range"), R(r), i.t2 > J.t2 && l.t2 === i.t2 && !t.playingExtend && e.trigger("end", "range")
            }
            var c = X(i);
            a(i.t1, i.t2, c.t1, c.t2)
        };
        var ye = U.setInner;
        U.setOuter = function(e, t) {
            a(J.t1, J.t2, e, t)
        }, U.updateOptions = function() {
            F(), A()
        }, U.setSize = function(e, t) {
            N = e, H = t, A()
        }, U.fitHistogramBarsExactly = function(e) {
            var t, n = e;
            do {
                var r = T(n);
                t = r.t1 !== n.t1 || r.t2 !== n.t2, n = r
            } while (t);
            return n
        }, U.triggerTimeBarChanged = K.ratelimit(function() {
            e.trigger("change")
        }, ee);
        var be = U.triggerTimeBarChanged;
        return U.getIdcounts = function() {
            return $.t1 === J.t1 && $.t2 === J.t2 || w(), q
        }, U.getRangeForIds = function(e) {
            var t, n, r = K.ensureArray(e),
                i = 1 / 0,
                a = -(1 / 0),
                o = {};
            for (t = 0; t < r.length; t++) o[r[t]] = !0;
            for (t = 0; t < _.length; t++) n = _[t], o[n.id] && (n.t < i && (i = n.t), n.t > a && (a = n.t));
            return i !== 1 / 0 ? {
                t1: i,
                t2: a
            } : void 0
        }, U.getIds = function(e, t) {
            if (K.isNullOrUndefined(e) || K.isNullOrUndefined(t)) throw new Error("getIds error: both dt1 and dt2 dates must be passed.");
            var n = le(e),
                r = le(t);
            return x(n, r)
        }, U
    }
}(),
function() {
    "use strict";
    if (KeyLines.WebGL) {
        KeyLines.WebGL.Utils = {};
        var e = KeyLines.WebGL.Utils;
        e.create3DContext = function(e, t) {
            for (var n = ["webgl", "webgl2", "experimental-webgl", "webkit-3d", "moz-webgl"], r = null, i = 0; i < n.length; ++i) {
                try {
                    r = e.getContext(n[i], t)
                } catch (a) {}
                if (r) break
            }
            return r
        }, e.createProgram = function(e, n, r) {
            var i = t(e, [n, r]);
            return i.vertexShader = n, i.fragmentShader = r, i
        }, e.finishProgram = function(e, t) {
            e.useProgram(t), e.bindBuffer(e.ARRAY_BUFFER, null), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null), e.bindRenderbuffer(e.RENDERBUFFER, null), e.bindFramebuffer(e.FRAMEBUFFER, null)
        }, e.createMatrix = function() {
            var e = {},
                t = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
                n = 1;
            return e.zoom = function(e) {
                n = e, t[0] *= e, t[4] *= e, t[8] *= 1, t[1] *= e, t[5] *= e, t[9] *= 1, t[2] *= e, t[6] *= e, t[10] *= 1, t[3] *= e, t[7] *= e, t[11] *= 1
            }, e.getZoomLevel = function() {
                return n
            }, e.pan = function(e, n) {
                t[12] += t[0] * e + t[4] * n, t[13] += t[1] * e + t[5] * n, t[14] += t[2] * e + t[6] * n, t[15] += t[3] * e + t[7] * n
            }, e.get = function() {
                return t
            }, e
        }, e.compileShader = function(e, t, n) {
            var r = e.createShader(n),
                i = atob(KeyLines.WebGL[t]);
            e.shaderSource(r, i), e.compileShader(r);
            var a = e.getShaderParameter(r, e.COMPILE_STATUS);
            if (!a) {
                var o = e.getShaderInfoLog(r);
                throw e.deleteShader(r), new Error("Error in shader: " + o)
            }
            return r
        };
        var t = function(e, t) {
            for (var n = e.createProgram(), r = 0; r < t.length; ++r) e.attachShader(n, t[r]);
            e.linkProgram(n);
            var i = e.getProgramParameter(n, e.LINK_STATUS);
            if (!i) {
                var a = e.getProgramInfoLog(n);
                throw e.deleteProgram(n), new Error("Error in program linking:" + a)
            }
            return n
        }
    }
}(),
function() {
    KeyLines.Layouts = KeyLines.Layouts || {};
    var e = KeyLines.Layouts;
    e.createLens = function(e) {
        function t(e, t) {
            function n(e, t, n, r, i) {
                return {
                    isLeaf: !0,
                    children: [],
                    points: [],
                    x1: e,
                    y1: t,
                    x2: n,
                    y2: r,
                    depth: i
                }
            }

            function r(e) {
                return e.depth >= t
            }

            function i(e, t) {
                var r, i, a, o, l = .5 * (e.x1 + e.x2),
                    u = .5 * (e.y1 + e.y2);
                0 === t || 1 === t ? (a = e.y1, o = u) : (a = u, o = e.y2), 0 === t || 2 === t ? (r = e.x1, i = l) : (r = l, i = e.x2), e.isLeaf = !1, e.children[t] = n(r, a, i, o, e.depth + 1)
            }

            function a(e, t) {
                t(e);
                for (var n = 0; 4 > n; n++) e.children[n] && a(e.children[n], t)
            }

            function o(e, t) {
                var n = t.x < e.x1 || t.y < e.y1 || t.x > e.x2 || t.y > e.y2;
                if (n) throw Error("[Layout] Error: the point is out of range.");
                if (r(e)) e.points.push(t);
                else {
                    e.points.push(t);
                    var a, l = .5 * (e.x1 + e.x2),
                        u = .5 * (e.y1 + e.y2);
                    t.x < l && t.y < u && (a = 0), t.x >= l && t.y < u && (a = 1), t.x < l && t.y >= u && (a = 2), t.x >= l && t.y >= u && (a = 3), e.children[a] || i(e, a), o(e.children[a], t)
                }
            }
            var l, u = [],
                c = [];
            for (l = 0; l < e.length; l++) u.push(e[l].x), c.push(e[l].y);
            var s = Math.min.apply(0, u),
                f = Math.max.apply(0, u),
                d = Math.min.apply(0, c),
                g = Math.max.apply(0, c),
                h = f - s,
                v = g - d;
            h > v ? g = d + h : f = s + v;
            var m = n(s, d, f, g, 0);
            for (m.addPoint = function(e) {
                    o(m, e)
                }, m.visit = function(e) {
                    a(m, e)
                }, l = 0; l < e.length; l++) m.addPoint(e[l]);
            return m
        }

        function n(e, t) {
            return Math.sqrt(e * e + t * t)
        }

        function r() {
            function e(e) {
                function t(t) {
                    if (t.isLeaf) {
                        var i, o = e.x - .5 * (t.x1 + t.x2),
                            l = e.y - .5 * (t.y1 + t.y2),
                            u = n(o, l),
                            c = (t.x2 - t.x1) / u,
                            s = t.points,
                            f = s.length;
                        if (c > R) {
                            for (i = 0; f > i; i++)
                                if (e.id !== s[i].id) {
                                    var d = e.x - s[i].x,
                                        g = e.y - s[i].y,
                                        h = Math.max(.001, n(d, g));
                                    r += d / h, a += g / h
                                }
                        } else r += f * o / u, a += f * l / u
                    }
                }
                var r = 0,
                    a = 0;
                i.visit(t), E.push(r), k.push(a)
            }
            var r = [];
            A.forEach(w, function(e, t) {
                r.push({
                    id: t,
                    x: W[m[t]],
                    y: V[m[t]]
                })
            });
            var i = t(r, Z);
            E.length = 0, k.length = 0;
            for (var a = 0; a < r.length; a++) e(r[a]);
            s(E, k)
        }

        function i(e, t, n) {
            for (var r = t, i = u(e, l(c(t, n), -1)), a = i.slice(), s = o(i, i), f = 0; 20 > f && s / b > .01; f++) {
                var d = c(a, n),
                    g = s / o(d, a);
                r = u(r, l(a, g));
                var h = u(i, l(d, -g));
                i = h;
                var v = o(h, h),
                    m = v / s;
                s = v, a = u(h, l(a, m))
            }
            return r
        }

        function a() {
            var e;
            for (e = 0; b > e; e++) {
                L[e] = [], S[e] = {}, S[e][e] = !0;
                for (var t = 0; b > t; t++) L[e][t] = 0
            }
            for (e = 0; e < y.length; e++) {
                var n = y[e],
                    r = m[n.id1],
                    i = m[n.id2];
                S[r][i] = !0, S[i][r] = !0, L[r][i] -= 1, L[i][r] -= 1, L[r][r] += 1, L[i][i] += 1
            }
        }

        function o(e, t) {
            for (var n = 0, r = 0; r < e.length; r++) n += e[r] * t[r];
            return n
        }

        function l(e, t) {
            for (var n = [], r = 0; r < e.length; r++) n.push(e[r] * t);
            return n
        }

        function u(e, t) {
            for (var n = [], r = 0; r < e.length; r++) n.push(e[r] + t[r]);
            return n
        }

        function c(e, t) {
            var n, r = [],
                i = 0;
            for (n = 0; b > n; n++) i = 0, A.forEach(S[n], function(t, r) {
                i += L[n][r] * e[r]
            }), r.push(i);
            for (r = l(r, t), i = 0, n = 0; b > n; n++) i += e[n];
            var a = [];
            for (n = 0; b > n; n++) a.push(b * e[n] - i);
            return u(r, a)
        }

        function s(e, t) {
            var n, r = 0,
                i = 0;
            for (n = 0; n < e.length; n++) r += e[n], i += t[n];
            for (r /= e.length, i /= e.length, n = 0; n < e.length; n++) e[n] -= r, t[n] -= i
        }

        function f(e, t, n) {
            for (var a = 0; t > a; a++) C += 1 / (p + I + 1), e.trigger("progress", "layout", C), r(W, V), W = i(E, W, n), V = i(k, V, n), s(W, V)
        }

        function d(t, n) {
            var r, i;
            G = Object.keys(w), m = {}, W.length = 0, V.length = 0, L.length = 0, S.length = 0;
            var a, o = 0,
                l = e(t.tightness);
            for (l = 1 + (2 - 2 * l / 10), i = 0; i < G.length; i++) r = G[i], a = Math.max(1, w[r].size), o += a, m[r] = i;
            if (x = 42 * Math.sqrt(b) * l, x *= 1 + .02 * (o / b - M), y.length / b < 1) {
                var u = .65,
                    c = y.length / b;
                x *= u + c * (1 - u)
            }
            for (i = 0; i < G.length; i++) W.push(x * n.next()), V.push(x * n.next());
            v = b / 50, h = 500 * v, p = 8, I = 8
        }

        function g(e) {
            function t(e, t) {
                return Math.atan2(e, t) || 0
            }

            function r(e, t, n) {
                var r = e,
                    i = r * Math.cos(t),
                    a = r * Math.sin(t);
                w[n].x = x * i, w[n].y = x * a
            }

            function i(e) {
                var i = W[m[e]],
                    a = V[m[e]],
                    o = n(i, a),
                    l = t(i, a);
                r(o, l, e)
            }
            e.forEach(i)
        }
        var h, v, m, y, b, p, I, x, C, w, G, A = KeyLines.Util,
            B = {},
            Z = 3,
            R = .5,
            M = KeyLines.Generator.baseRadius,
            E = [],
            k = [],
            L = [],
            S = [],
            W = [],
            V = [];
        return B.lens = function(e, t, n, r, i, o) {
            C = 0, e.trigger("progress", "layout", C), w = t.v, y = t.e, b = t.vcount;
            var l = [];
            return b > 1 && (d(n, i), a(), f(e, p, h), f(e, I, v), g(G)), r(e, w, {}, t.extents, l, n, o)
        }, B
    }
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    if (e) {
        var t = 512,
            n = 4,
            r = 264,
            i = 4,
            a = !1;
        e.ImageAtlas = function(e) {
            for (var t = [], n = 4, r = 4, a = 4, l = 0, s = c(e), f = o(s), d = 1 / f, g = u(f, 0), h = 0, v = s.length; v > h; h++) {
                var m = s[h],
                    y = m.im,
                    b = y.width / m.imageRatio,
                    p = y.height / m.imageRatio;
                if (n + b + i > f && (n = 0, r += l + i, l = 0), r + p > f && (a++, r = i, t.push({
                        alphaChannel: !0,
                        img: g.canvas,
                        texture: null
                    }), g = u(f, a)), y.u1 = n * d, y.v1 = r * d, y.u2 = (n + b) * d, y.v2 = (r + p) * d, y.maxDimension = m.nonSquare, y.textureBank = a, m.nonSquare) {
                    var I, x = y.v2 - y.v1,
                        C = y.u2 - y.u1;
                    if ("width" === m.nonSquare) {
                        I = x / C;
                        var w = (C - C * I) / 2;
                        y.cu1 = y.u1 + w, y.cv1 = y.v1, y.cu2 = y.u2 - w, y.cv2 = y.v2
                    } else {
                        I = C / x;
                        var G = (x - x * I) / 2;
                        y.cu1 = y.u1, y.cv1 = y.v1 + G, y.cu2 = y.u2, y.cv2 = y.v2 - G
                    }
                } else y.cu1 = y.u1, y.cv1 = y.v1, y.cu2 = y.u2, y.cv2 = y.v2;
                g.drawImage(y, n, r, b, p), p > l && (l = p), n += b + i
            }
            for (t.push({
                    alphaChannel: !0,
                    img: g.canvas,
                    texture: null
                }), a++; 8 > a;) {
                var A = u(1, a++);
                t.push({
                    alphaChannel: !0,
                    img: A.canvas,
                    texture: null
                })
            }
            return t
        };
        var o = function(e) {
                for (var t = 1, r = i, a = i, o = 0, l = 1024, u = 0, c = e.length; c > u; u++) {
                    var s = e[u],
                        f = s.im,
                        d = f.width / s.imageRatio,
                        g = f.height / s.imageRatio;
                    r + d + i > l && (r = 0, a += o + i, o = 0), a + g > l && (t++, a = i), g > o && (o = g), r += d + i
                }
                return n > t ? 1024 : 4 * n > t ? 2048 : 4096
            },
            l = function(e, n) {
                var i = 1,
                    a = !1;
                return e > r && (n > 0 ? e > t && (i = e / t) : i = e / r, a = !0), {
                    imageRatio: i,
                    largeImage: a
                }
            },
            u = function(e, t) {
                var n = document.createElement("canvas"),
                    r = n.getContext("2d");
                if (n.id = "webglDebugImageCanvas" + t, n.width = e, n.height = e, a) {
                    var i = document.getElementById(n.id);
                    i ? i.parentNode.replaceChild(n, i) : document.getElementsByTagName("body")[0].appendChild(n)
                }
                return r
            },
            c = function(e) {
                var t = [],
                    n = 2;
                return KeyLines.Util.forEach(e, function(r, i) {
                    if (r && r.im) {
                        var a = e._coList[i] ? r.co : r.im,
                            o = a.width > a.height ? "width" : "height";
                        if (a.src.indexOf(".svg") > -1) {
                            var u = 0 | Math.max(a.width, a.height);
                            if (u) {
                                var c = 256 / u;
                                a.width = Math.round(a.width * c), a.height = Math.round(a.height * c)
                            } else a.width = 256, a.height = 256
                        }
                        var s = l(a.height, n);
                        s.largeImage && n > 0 && n--, t.push({
                            im: a,
                            size: a[o] / s.imageRatio,
                            imageRatio: s.imageRatio,
                            nonSquare: a.width !== a.height ? o : !1
                        })
                    }
                }), t.sort(function(e, t) {
                    return e.size - t.size
                })
            }
    }
}(),
function() {
    KeyLines.TimeBar.API = {};
    var e = KeyLines.TimeBar.API;
    e.createAPI = function() {
        var e = KeyLines.Common,
            t = KeyLines.Util,
            n = {},
            r = KeyLines.Events.createEventBus(),
            i = KeyLines.TimeBar.Config.create(),
            a = KeyLines.TimeBar.Model.createModel(r, i),
            o = KeyLines.TimeBar.Generator.create(),
            l = KeyLines.TimeBar.Controller.createController(r, a, o, i);
        n.clear = function() {
            return l.load({
                items: []
            })
        }, n.getIds = function(e, t) {
            return a.getIds(e, t)
        }, n.load = function(e, t) {
            if (e && e.items) return l.load(e, t);
            throw Error("Unknown data format passed")
        }, n.options = function(e, t) {
            return l.options(e, t)
        }, n.pan = function(e, t, n) {
            return l.pan(e, t, n)
        }, n.pause = function() {
            return l.pause()
        }, n.play = function(e) {
            return l.play(e)
        }, n.range = function(e, t, n, r) {
            return 0 !== arguments.length ? l.range(e, t, n, r) : l.range()
        }, n.merge = function(e, n) {
            var r = t.ensureArray(t.getItemsArray(e));
            return l.merge(r, n)
        }, n.selection = function(e) {
            return a.selection(e)
        }, n.zoom = function(e, n, r) {
            var i = t.defaults(n, {
                animate: !0,
                time: 200
            });
            return l.zoom(e || "in", i, r)
        }, n.privateInit = l.privateInit, n.privateSetSize = l.privateSetSize, e.appendActions(n, l), t.merge(n, r);
        var u = KeyLines.Common.frameManager(l.draw, l.animate, l.getCanvas);
        return t.merge(n, u), n.inRange = function(e) {
            if (t.isNullOrUndefined(e)) return !1;
            var n = (t.isNormalObject(e) ? e.id : e) + "";
            return !!a.getIdcounts()[n]
        }, n.privateBind("redraw", u.redraw), n._getItems = a.privateGetItems, n
    }
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    if (e) {
        for (var t, n, r, i = !1, a = 4096, o = 16, l = ["rgba(255,0,0,1)", "rgba(0,255,0,1)", "rgba(0,0,255,1)", "rgba(0,0,0,0)"], u = "abcdefghijklmnopqrstuvwzyzABCDEFGHIJKLMNOPQRSTUVWXWZ$\xa31234567890()", c = {}, s = 0, f = u.length; f > s; s++) c[u[s]] = !0;
        e.TextAtlas = function(e, i) {
            var a = e;
            return r = i, n = 128, t = KeyLines.Util, h(a)
        };
        var d = function(e) {
                for (var t = 0, n = e.length; n > t; t++) {
                    var r = e[t];
                    c[r] || (c[r] = !0)
                }
            },
            g = function(e, t) {
                var n = document.createElement("canvas"),
                    r = n.getContext("2d");
                if (n.id = "webglDebugTextCanvas" + t, n.width = e, n.height = e, r.fillStyle = "black", r.fillRect(0, 0, e, e), i) {
                    var a = document.getElementById(n.id);
                    a ? a.parentNode.replaceChild(n, a) : document.getElementsByTagName("body")[0].appendChild(n)
                }
                return r
            },
            h = function(e) {
                var t = Object.keys(e),
                    n = v(t),
                    i = {},
                    a = y(i, t, n);
                return a.getGlyphsFrom = function(e, t, n, a, o, l) {
                    var u, c;
                    u = l ? r.bidi.analyseText(e).result : e;
                    var s, f, g, h = !1,
                        v = {},
                        m = [],
                        y = i[t || n],
                        b = 0;
                    if (a)
                        for (s = 0, f = u.length; f > s; s++) {
                            c = u[s].text || e[s];
                            var p = c + "B";
                            g = y[p], g ? m[b++] = g : (v[c] = !0, h = !0)
                        } else
                            for (s = 0, f = u.length; f > s; s++) c = u[s].text || e[s], g = y[c], g ? m[b++] = g : (v[c] = !0, h = !0);
                    return h && (d(Object.keys(v)), o.textAtlas = !0), m
                }, a
            },
            v = function(e) {
                for (var t = 0, r = document.createElement("canvas").getContext("2d"), i = 0, a = e.length; a > i; i++) {
                    var l = Object.keys(c),
                        u = e[i];
                    t += m(r, l, u, !1), t += m(r, l, u, !0)
                }
                for (var s = n + o, f = s * t / 3, d = 256; f / (d * d) > 3;) d *= 2;
                return d
            },
            m = function(e, r, i, a) {
                for (var l, u = 0, c = a ? "bold " : "", s = 0, f = r.length; f > s; s++) {
                    var d = r[s];
                    l = KeyLines.Util.isTextArabic(d) ? t.getArabicTextHeight(n) : n, e.font = c + l + "px " + i, u += e.measureText(d).width + o
                }
                return u
            },
            y = function(e, t, r) {
                var i, l, u = r,
                    c = function() {
                        i = [], l = {
                            x: o,
                            y: o,
                            colourComponent: 0,
                            textureBank: 0
                        };
                        for (var n = 0, r = t.length; r > n; n++) e[t[n]] = e[t[n]] || {}, I(i, u, e, l, t[n], !1), I(i, u, e, l, t[n], !0)
                    };
                for (KeyLines.Util.tryCatch(c, function(e) {
                        if (e) {
                            if (u *= 2, u > a && (n /= 2), 32 > n) return void console.log("Number of unique text characters exceeded, try reducing the number of fonts or use canvas mode");
                            c()
                        }
                    }), KeyLines.Util.forEach(e, function(t, n) {
                        p(i, e, n, !1), p(i, e, n, !0)
                    }); l.textureBank < 2;) {
                    l.textureBank++;
                    var s = g(1, l.textureBank);
                    i[l.textureBank] = {
                        alphaChannel: !1,
                        img: s.canvas,
                        texture: null
                    }
                }
                return {
                    fontSize: n,
                    atlases: i,
                    glyphInfo: e
                }
            },
            b = function(e, t, n) {
                var r = e[t].ctx;
                return r.font = n, r.globalCompositeOperation = "lighter", r
            },
            p = function(e, r, i, a) {
                for (var o = r[i], u = a ? "B" : "", s = a ? "bold " : "", f = Object.keys(c), d = 0; d < f.length; ++d) {
                    var g = f[d],
                        h = 0,
                        v = o[g + u];
                    if (v) {
                        var m;
                        t.isTextArabic(g) ? (h = 8, m = t.getArabicTextHeight(n)) : m = n;
                        var y = b(e, v.textureBank, s + m + "px " + i);
                        y.fillStyle = l[v.colourComponent], y.fillText(g, v.x, v.y + .75 * n - h)
                    }
                }
            },
            I = function(e, r, i, a, u, s) {
                var f, d = e[a.textureBank];
                d ? f = d.ctx : (f = g(r, a.textureBank), d = {
                    alphaChannel: !1,
                    img: f.canvas,
                    ctx: f,
                    texture: null
                }, e[a.textureBank] = d);
                var h = s ? "B" : "",
                    v = s ? "bold " : "";
                f.fillStyle = "black";
                for (var m = Object.keys(c), y = 0; y < m.length; ++y) {
                    var b, p = m[y];
                    b = KeyLines.Util.isTextArabic(p) ? t.getArabicTextHeight(n) : n, f.font = v + b + "px " + u;
                    var I = f.measureText(p);
                    if (a.x + I.width + o > r) {
                        var x = a.y + n + o;
                        if (x + n > r) {
                            if (x = o, a.colourComponent < 2) a.colourComponent++;
                            else {
                                if (!(a.textureBank < 2)) throw new Error("Warning: Number of unique text characters exceeded, restarting build with larger Texture");
                                a.colourComponent = 0, a.textureBank++, f = g(r, a.textureBank), f.font = v + n + "px " + u, e.push({
                                    alphaChannel: !1,
                                    img: f.canvas,
                                    ctx: f,
                                    texture: null
                                })
                            }
                            f.fillStyle = l[a.colourComponent]
                        }
                        a.x = o, a.y = x
                    }
                    i[u][p + h] = {
                        text: p,
                        x: a.x,
                        y: a.y,
                        u1: a.x / r,
                        v1: (a.y + n) / r,
                        u2: (a.x + I.width) / r,
                        v2: a.y / r,
                        colourComponent: a.colourComponent,
                        textureBank: a.textureBank,
                        width: I.width
                    }, a.x += I.width + o
                }
            }
    }
}(),
function() {
    function e(e, t, n) {
        return function() {
            if (!n || !n()) {
                var r, i = t[e];
                return i && (r = i.apply(null, arguments)), r
            }
        }
    }
    KeyLines.Common = {};
    var t = KeyLines.Common;
    t.frameManager = function(e, t, n) {
        function r() {
            return {
                all: !0,
                colours: !0,
                textures: !0,
                positions: !0,
                shadow: !0
            }
        }

        function i() {
            c.all = !1, c.colours = !1, c.textures = !1, c.positions = !1, c.shadow = !1
        }
        var a = Date.now(),
            o = Math.floor(a / 1e3),
            l = 0,
            u = !1,
            c = r(),
            s = !0,
            f = 0;
        return {
            frameRate: function() {
                return f
            },
            update: function() {
                var r = Date.now(),
                    d = Math.floor(r / 1e3);
                d > o ? (f = Math.round(l / (d - o)), l = 0, o = d) : l++;
                var g = t(r - a);
                if (a = r, u = u || g) {
                    var h = n();
                    if (h) {
                        var v = h.canvas;
                        h.webgl && (v = h.webglCanvas), v && v.clientWidth > 0 && v.clientHeight > 0 && (u = !1, s && (e(null, c), u || i()))
                    }
                }
            },
            redraw: function(e) {
                u = !0;
                var t = e || r();
                c.all || (c.all = t.all), c.positions || (c.positions = t.positions), c.shadow || (c.shadow = t.shadow), c.textures || (c.textures = t.textures), c.colours || (c.colours = t.colours)
            },
            allowDraw: function(e) {
                e && !s && (u = !0), s = e
            }
        }
    }, t.buildAnimatorInstance = function(e, t) {
        var n = !0;
        return {
            rebuild: t,
            animate: function(t) {
                var r = e(t, n);
                return n = !1, r
            }
        }
    }, t.animator = function(e) {
        var t = [],
            n = [];
        return {
            push: function(e, r) {
                e && (e.queue = r, r ? n.push(e) : t.push(e))
            },
            cancel: function() {
                t = [], n = [], e()
            },
            animate: function(r, i, a) {
                var o = !1,
                    l = !1;
                if (t.length > 0) {
                    var u = t;
                    t = [];
                    for (var c = 0; c < u.length; c++) {
                        var s = u[c].rebuild;
                        u[c].animate(r) && (l = l || u[c].queue, t.push(u[c])), e(s)
                    }
                    o = !0
                }
                return l || n.length > 0 && (t.push(n.shift()), o = !0), i && i.animate && (i.animate(r), o = !0), a && (o = o || a.animated()), o
            }
        }
    }, t.makeValueAnimator = function(e, n) {
        var r, i, a, o;
        return function(l, u, c) {
            var s = n();
            s === l || o && i === l || (r = s, i = l, a = 0, o || (o = t.buildAnimatorInstance(function(e) {
                a = Math.min(u, a + e);
                var t = 0 >= u ? i : r + (i - r) * a / u;
                n(t);
                var l = u > a;
                return l || (o = null, KeyLines.Util.invoke(c)), l
            }), e.push(o, !1)))
        }
    };
    var n = ["mousemove", "mousedown", "mouseup", "mouseleave", "mousewheel", "dblclick", "touchstart", "touchmove", "touchend", "touchcancel", "keyup", "keydown", "gesturestart", "gesturechange", "gestureend", "dragover"];
    t.appendActions = function(t, r, i) {
        for (var a = 0; a < n.length; a++) t[n[a]] = e(n[a], r, i)
    }, t.hitTester = function(e, t, n, r) {
        function i(e, i) {
            o.clear(e, t, n), o.backFill(e, l, 1, t, n, !1), r.drawShadowCanvas(e, i), u = !1
        }
        var a, o = KeyLines.Rendering,
            l = o.randomColour(),
            u = !0,
            c = 5,
            s = function() {
                var e = {},
                    t = {};
                return {
                    getColour: function(n) {
                        var r = e[n];
                        return r || (r = o.randomColour(t), e[n] = r, t[r] = n), r
                    },
                    getId: function(e) {
                        return t[e] || null
                    }
                }
            }();
        r.setShadowColourMap(s);
        var f = {};
        return f.test = function(t, n, r, i, a) {
            var d = [0, 0, 0];
            a && a.webgl ? d = a.webglCanvas.renderer.drawShadowCanvas(Math.floor(t), Math.floor(n)) : (u && f.draw(r), d = e.getImageData(Math.floor(t), Math.floor(n), 1, 1).data);
            var g = o.rgbtostring(d[0], d[1], d[2]);
            if (g === l) return null;
            var h = s.getId(g);
            if (h) return h;
            if (a && a.webgl) return null;
            var v = i || 1;
            return v > c ? null : t + v > c && n + v > c ? f.test(t - 1, n - 1, r, ++v, a) : f.test(t + 1, n + 1, r, ++v, a)
        }, f.dirty = function() {
            u = !0
        }, f.debugCanvas = function(e) {
            a = e
        }, f.draw = function(t) {
            i(e, t), a && i(a, t)
        }, f
    }
}(),
function() {
    "use strict";
    if (KeyLines.WebGL) {
        var e = 3;
        KeyLines.WebGL.triangleFactory = function(t) {
            return function(n, r, i, a, o, l, u, c, s, f, d, g, h) {
                var v, m, y = r,
                    b = i,
                    p = a,
                    I = o,
                    x = l,
                    C = u,
                    w = n.wsc || [0, 0, 0, 0];
                if (f.rebuildOptions.all || f.rebuildOptions.shadow || f.alwaysUpdate)
                    for (m = 0; e > m; m++) {
                        var G = f.triangleBuffers.shadowData,
                            A = f.triangleBuffers.shadowIndex;
                        G[A++] = w[0], G[A++] = w[1], G[A++] = w[2], G[A++] = w[3], f.triangleBuffers.shadowIndex = A
                    }
                if (f.rebuildOptions.all || f.rebuildOptions.colours || f.alwaysUpdate) {
                    var B = (g ? t.background : 1) * (h ? t.ghost : 1);
                    for (m = 0; e > m; m++) {
                        var Z = f.triangleBuffers.colourData,
                            R = f.triangleBuffers.colourIndex;
                        Z[R++] = c[0], Z[R++] = c[1], Z[R++] = c[2], Z[R++] = c[3] * B, f.triangleBuffers.colourIndex = R
                    }
                }
                if (f.rebuildOptions.all || f.rebuildOptions.positions || f.alwaysUpdate) {
                    v = f.triangleBuffers.positionIndex;
                    var M = f.triangleBuffers.positionData;
                    d && (y += d.x, b += d.y, p += d.x, I += d.y, x += d.x, C += d.y), M[v++] = y, M[v++] = b, M[v++] = 0, M[v++] = p, M[v++] = I, M[v++] = 0, M[v++] = x, M[v++] = C, M[v++] = 0, f.triangleBuffers.positionIndex = v
                }
                if (f.rebuildOptions.all || f.rebuildOptions.textures || f.alwaysUpdate) {
                    v = f.triangleBuffers.textureIndex;
                    var E = f.triangleBuffers.textureData;
                    E[v++] = 0, E[v++] = 1, E[v++] = 0, E[v++] = 0, E[v++] = s, E[v++] = 0, E[v++] = 0, E[v++] = 0, E[v++] = 0, E[v++] = 1, E[v++] = 0, E[v++] = 0, E[v++] = 0, E[v++] = s, E[v++] = 0, E[v++] = 0, E[v++] = 0, E[v++] = 0, E[v++] = 0, E[v++] = 0, E[v++] = 1, E[v++] = 0, E[v++] = s, E[v++] = 0, E[v++] = 0, E[v++] = 0, E[v++] = 0, f.triangleBuffers.textureIndex = v
                }
            }
        }
    }
}(),
function() {
    KeyLines.Draggers = {};
    var e = KeyLines.Draggers;
    e.createDraggers = function(e) {
        var t = KeyLines.Util,
            n = {};
        return n.primitiveMover = function(n, r, i, a, o, l, u, c, s, f, d) {
            function g(e, t) {
                return {
                    dx: i.undim(e - c),
                    dy: i.undim(t - s)
                }
            }

            function h(e, n, r, i) {
                var a, o = {},
                    l = e,
                    c = n;
                if (u.length > 0 || f) {
                    o.x1 = 0, o.x2 = 0, o.y1 = 0, o.y2 = 0;
                    for (var s = 0; s < u.length; s++) {
                        a = u[s];
                        var d = "x" === a.charAt(0) ? l : c;
                        o[a] = d
                    }(r || f) && (0 !== o.x1 && (o.x2 = -o.x1), 0 !== o.x2 && (o.x1 = -o.x2), 0 !== o.y1 && (o.y2 = -o.y1), 0 !== o.y2 && (o.y1 = -o.y2))
                } else i && (l = Math.abs(l) > Math.abs(c) ? l : 0, c = 0 !== l ? 0 : c), o.x1 = l, o.x2 = l, o.y1 = c, o.y2 = c;
                for (var g = {}, h = ["x1", "y1", "x2", "y2"], v = 0; v < h.length; v++) a = h[v], g[a] = p[a] + o[a];
                if (i) {
                    var m = p.x2 - p.x1,
                        y = p.y2 - p.y1;
                    if (Math.abs(m) > 0 && Math.abs(y) > 0) {
                        var b, I = y / m,
                            x = g.x2 - g.x1,
                            C = g.y2 - g.y1,
                            w = Math.abs(l) > Math.abs(c);
                        if (w) {
                            var G = Math.floor(I * (m + x) - y) - C;
                            f || r || !t.contains(u, "y1") && !t.contains(u, "y2") ? (b = Math.floor(G / 2), g.y1 -= b, g.y2 += b) : (t.contains(u, "y1") && (g.y1 -= G), t.contains(u, "y2") && (g.y2 += G))
                        } else {
                            var A = Math.floor((y + C) / I - m) - x;
                            f || r || !t.contains(u, "x1") && !t.contains(u, "x2") ? (b = Math.floor(A / 2), g.x1 -= b, g.x2 += b) : (t.contains(u, "x1") && (g.x1 -= A), t.contains(u, "x2") && (g.x2 += A))
                        }
                    }
                }
                return g
            }

            function v() {
                C.wc && (x.c = C.wc[3]), C.wfc && (x.fc = C.wfc[3]), C.wbc && (x.bc = C.wbc[3])
            }

            function m() {
                C.wc && (C.wc[3] = x.c), C.wfc && (C.wfc[3] = x.fc), C.wbc && (C.wbc[3] = x.bc)
            }

            function y(e, t, n) {
                return "1" === n.charAt(1) ? I - ("x" === n.charAt(0) ? e : t) : I + ("y" === n.charAt(0) ? t : e)
            }

            function b(e, t, r, i, a) {
                var l, c = g(t, r);
                if ("C" === o.p)
                    if (u.length > 1) {
                        var s = y(c.dx, c.dy, u[0]),
                            f = y(c.dx, c.dy, u[1]);
                        l = Math.abs(Math.min(s, f))
                    } else l = Math.abs(y(c.dx, c.dy, u[0]));
                var d = h(c.dx, c.dy, i, a);
                n.setExtents(e, d.x1, d.y1, d.x2, d.y2, l)
            }
            if (!e.trigger("dragstart", "resize", a, i.unscale(c), i.unscale(s), null)) {
                var p = n.extents(r, o),
                    I = o.r,
                    x = {},
                    C = {};
                t.forEach(o, function(e, t) {
                    C[t] = e
                }), v(), n.setAlpha(C, .5);
                var w = {
                    scrollable: !0,
                    getCursor: function() {
                        return l ? "crosshair" : "move"
                    },
                    generate: function(e) {
                        e.copyPrimitive(C)
                    },
                    dragMove: function(e, t, n, r) {
                        b(C, e, t, n, r)
                    },
                    endDrag: function(t, n, r, l, u) {
                        i.cancelScroll();
                        var c = e.trigger("dragend", "resize", a, i.unscale(n), i.unscale(r));
                        m(), c || t && (b(o, n, r, l, u), d(o)), e.trigger("dragcomplete", "resize", a, i.unscale(n), i.unscale(r))
                    }
                };
                return w
            }
        }, n.createHandDragger = function(n, r, i, a) {
            function o(e, t) {
                g = g || Math.abs(r - e) > 10 || Math.abs(i - t) > 10, f = e - r, d = t - i, u && (u.x || (f = 0), u.y || (d = 0))
            }

            function l() {
                g && (n.offsetX(c + f), n.offsetY(s + d), e.trigger("viewchange"))
            }
            var u = {
                    x: !0,
                    y: !0
                },
                c = n.offsetX(),
                s = n.offsetY(),
                f = 0,
                d = 0,
                g = !1,
                h = "hand",
                v = e.trigger("dragstart", h, null, n.unscale(r), n.unscale(i));
            if (v) {
                if (!t.isNormalObject(v)) return void a();
                t.forEach(v, function(e, t) {
                    u[t] = e
                })
            }
            return {
                rebuild: {
                    drawOnly: !0
                },
                animate: l,
                direction: u,
                dragMove: o,
                getCursor: function() {
                    return "move"
                },
                endDrag: function(t, r, i) {
                    var u = e.trigger("dragend", h, null, n.unscale(r), n.unscale(i));
                    g ? (!u && t ? o(r, i) : (f = 0, d = 0), l()) : a(), e.trigger("dragcomplete", h, null, n.unscale(r), n.unscale(i))
                }
            }
        }, n.createDefaultDragger = function(n, r, i, a, o, l, u, c, s) {
            function f(e) {
                return v.add && v.add[e]
            }

            function d() {
                var e = B.dx - Z.x,
                    r = B.dy - Z.y;
                Z.x = B.dx, Z.y = B.dy;
                var i = C.filter(function(e) {
                    return a(e) || f(e)
                });
                n.moveAllNodesBy(i, e, r), t.forEach(w, function(e, t) {
                    (a(t) || f(t)) && n.moveLink(t, e.y + B.dy)
                })
            }

            function g() {
                var e = C.filter(function(e) {
                    return a(e) || f(e)
                });
                n.moveAllNodesBy(e, -Z.x, -Z.y), t.forEach(w, function(e, t) {
                    n.moveLink(t, e.y)
                })
            }

            function h(e, t) {
                R = R || Math.abs(c - e) > 10 || Math.abs(s - t) > 10;
                var n = l ? l.viewToWorldX(e) : e,
                    r = l ? l.viewToWorldY(t) : t;
                return v && (v.x || (n = I), v.y || (r = x)), {
                    dx: R ? n - I : 0,
                    dy: R ? r - x : 0
                }
            }
            var v = {
                    x: !0,
                    y: !0,
                    add: null,
                    combos: !0
                },
                m = t.rawId(u),
                y = "move",
                b = e.trigger("dragstart", y, m, l.unscale(c), l.unscale(s), t.subId(u));
            if (b)
                if (Array.isArray(b)) v.add = t.makeIdMap(b);
                else {
                    if (!t.isNormalObject(b)) return;
                    t.forEach(b, function(e, t) {
                        v[t] = e
                    }), Array.isArray(v.add) && (v.add = t.makeIdMap(v.add))
                }
            if (v.combos) {
                var p = o();
                p.length && (v.add = v.add || {}, p.forEach(function(e) {
                    v.add[e] = 1
                }))
            }
            var I = l ? l.viewToWorldX(c) : c,
                x = l ? l.viewToWorldY(s) : s,
                C = Object.keys(r),
                w = {};
            t.forEach(i, function(e, t) {
                "h" === e.st && (w[t] = {
                    y: e.y || 0
                })
            });
            var G, A, B = h(c, s),
                Z = {
                    x: 0,
                    y: 0
                },
                R = !1,
                M = {
                    rebuild: {
                        positions: !0
                    },
                    scrollable: !0,
                    direction: v,
                    animate: d,
                    generate: function(e) {
                        e.excludeHit(m)
                    },
                    getCursor: function() {
                        return "move"
                    },
                    dragMove: function(e, t) {
                        B = h(e, t)
                    },
                    mouseMoved: function(e) {
                        return e && (G = !0), G
                    },
                    afterDraw: function(n, r, i) {
                        G = !1;
                        var a = t.rawId(n);
                        m !== a && (void 0 === A ? A = a : a !== A && (e.trigger("dragover", a, l.unscale(r), l.unscale(i), t.subId(n)), A = a))
                    },
                    endDrag: function(r, i, a) {
                        l.cancelScroll();
                        var o = e.trigger("dragend", y, t.rawId(u), l.unscale(i), l.unscale(a));
                        o ? g() : r && R ? (g(), B = h(i, a), Z = {
                            x: 0,
                            y: 0
                        }, e.trigger("prechange", "move"), d()) : g(), n.setDirty(m), e.trigger("dragcomplete", y, t.rawId(u), l.unscale(i), l.unscale(a))
                    }
                };
            return M
        }, n.createLinkEndDragger = function(n, r, i, a, o, l, u, c, s) {
            function f(e, t) {
                r.moveNode(o[l], e, t)
            }

            function d(e, t) {
                var n = i ? i.viewToWorldX(e) : e,
                    r = i ? i.viewToWorldY(t) : t;
                return {
                    dx: n - m,
                    dy: r - y
                }
            }

            function g() {
                return o["id1" === l ? "id2" : "id1"]
            }
            if (e.trigger("dragstart", "dummy", s, i.unscale(u), i.unscale(c), null)) return !1;
            var h, v, m = i ? i.viewToWorldX(u) : u,
                y = i ? i.viewToWorldY(c) : c,
                b = a[o[l]].x,
                p = a[o[l]].y,
                I = d(u, c),
                x = null,
                C = {
                    rebuild: {
                        all: !0
                    },
                    scrollable: !0,
                    animate: function() {
                        f(b + I.dx, p + I.dy)
                    },
                    getCursor: function() {
                        return "move"
                    },
                    dragMove: function(e, t) {
                        I = d(e, t), x = n.hittest(e, t, i)
                    },
                    mouseMoved: function(e) {
                        return e && (v = !0), v
                    },
                    afterDraw: function(n, r, a) {
                        v = !1;
                        var o = t.rawId(n),
                            l = t.subId(n);
                        s === o && (o = null, l = null), void 0 === h ? h = o : o !== h && (e.trigger("dragover", o, i.unscale(r), i.unscale(a), l), h = o)
                    },
                    endDrag: function(u, c, s) {
                        i.cancelScroll();
                        var h = e.trigger("dragend", "dummy", x, i.unscale(c), i.unscale(s));
                        if (!h)
                            if (u)
                                if (f(b, p), e.trigger("prechange", "move"), x = t.rawId(x), a[x] && x !== g()) {
                                    var v = t.clone(o);
                                    v[l] = x, delete v.off, r.removeItem([o[l], o.id]), n.merge([v])
                                } else I = d(c, s), f(b + I.dx, p + I.dy), x = null;
                        else f(b, p);
                        e.trigger("dragcomplete", "dummy", x, i.unscale(c), i.unscale(s));
                    }
                };
            return C
        }, n.createLinkDragger = function(n, r, i, a, o, l, u, c) {
            function s(e, t, n, r, i, a) {
                return ((n - e) * (t - a) - (e - i) * (r - t)) / Math.sqrt((n - e) * (n - e) + (r - t) * (r - t))
            }

            function f(e, t, r) {
                var a = e === o,
                    l = a ? i.viewToWorldX(t) : t,
                    u = a ? i.viewToWorldY(r) : r,
                    c = n(1, e),
                    f = n(2, e),
                    d = s(c.x, c.y, f.x, f.y, l, u);
                v[e.id] && Math.abs(d - g[e.id]) > 8 && (v[e.id] = !1), v[e.id] || (Math.abs(a ? d : d + g[e.id]) < 12 && (d = a ? 0 : -g[e.id]), h[e.id] = a ? d : d + g[e.id])
            }

            function d(e) {
                a.setLinkOffset(e, h[e])
            }
            if (e.trigger("dragstart", "offset", c, i.unscale(l), i.unscale(u), t.subId(c))) return !1;
            var g = {},
                h = {},
                v = {};
            t.forEach(a.privateSelection(), function(e, t) {
                if (t) {
                    var n = a.getByID(t);
                    n && "link" === n.type && (g[t] = n.off || 0, h[t] = n.off || 0, v[t] = !0)
                }
            });
            var m = !1,
                y = {
                    rebuild: {
                        all: !0
                    },
                    scrollable: !0,
                    animate: function() {
                        t.forEach(h, function(e, t) {
                            d(t)
                        })
                    },
                    getCursor: function() {
                        return "move"
                    },
                    dragMove: function(e, r) {
                        var c = i.viewToWorldX(e) - i.viewToWorldX(l),
                            s = i.viewToWorldY(r) - i.viewToWorldY(u);
                        t.forEach(h, function(t, i) {
                            var l = a.getByID(i);
                            if (l)
                                if (l === o) f(l, e, r), m = !0;
                                else {
                                    var u = n(1, l),
                                        d = n(2, l),
                                        g = (u.x + d.x) / 2,
                                        h = (u.y + d.y) / 2;
                                    f(l, g + c, h + s)
                                }
                        })
                    },
                    endDrag: function(n, r, o) {
                        i.cancelScroll();
                        var l = e.trigger("dragend", "offset", c, i.unscale(r), i.unscale(o));
                        !l && a.getByID(c) && (n && m ? (t.forEach(g, function(e, t) {
                            a.getByID(t).off = e
                        }), e.trigger("prechange", "offset"), t.forEach(h, function(e, t) {
                            a.getByID(t).off = e
                        })) : (t.forEach(h, function(e, t) {
                            h[t] = g[t]
                        }), this.animate())), e.trigger("dragcomplete", "offset", c, i.unscale(r), i.unscale(o))
                    }
                };
            return y
        }, n
    }
}(),
function() {
    function e(e) {
        var t = {};
        if (e)
            for (var n = 0; n < e.length; n++) t[e[n]] = 1;
        return t
    }

    function t(t) {
        for (var n = e(t), r = [], i = 0; i < N.length; i++) n[i] || r.push(i);
        return r
    }

    function n(e) {
        return "transparent" === e || e === O.transparent
    }

    function r(e, t) {
        return 1 === t ? e : ue(e, t)
    }

    function i(e, t, n, r, i, a) {
        var o, l, u = 0;
        if (KeyLines.Util.isTextArabic(t)) {
            var c = KeyLines.Bidi.analyseText(t).result;
            for (o = 0, l = c.length; l > o; o++) {
                var s = c[o];
                KeyLines.Util.isTextArabic(s.text) ? oe(e, n, i, a) : oe(e, r, i, a), u += e.measureText(s.text).width
            }
        } else
            for (o = 0, l = t.length; l > o; o++) u += e.measureText(t[o]).width;
        return u
    }

    function a(e) {
        var t = {};
        return Object.keys(e).forEach(function(n) {
            t[W.primitives[n]] = e[n]
        }), t
    }

    function o(e, t, n) {
        var r;
        return e.bg && e.gh ? r = t * n : e.bg ? r = t : e.gh && (r = n), r
    }

    function l(e, t, n, r, i, a, l) {
        var u, c, s, f;
        t.sm ? (u = n.sdim(t.r), c = n.sdim(t.bw)) : (u = n.dim(t.r), c = r ? n.sw(t.bw) : n.w(t.bw));
        var d = o(t, a, l),
            g = t.a;
        g ? (s = t.x + g.x, f = t.y + g.y) : (s = t.x, f = t.y), r ? I(e, n.x(s), n.y(f), u, t.bc && t.sc, c, t.fc && t.sc, t.fi) : I(e, n.x(s), n.y(f), u, d ? ue(t.bc, d) : t.bc, c, d ? ue(t.fc, d) : t.fc, t.fi, t.bs)
    }

    function u(e, t, n, r, i, a, l) {
        var u, c, s = t.a;
        s ? (u = t.x + s.x, c = t.y + s.y) : (u = t.x, c = t.y);
        var f, d, g, h = n.x(u),
            v = n.y(c),
            m = n.dim(t.r);
        r ? (f = t.bc && t.sc, d = n.sw(t.bw)) : (f = t.bc, d = n.w(t.bw), g = t.ls);
        var y = o(t, a, l);
        x(e, h, v, m, t.sa, t.ea, y ? ue(f, y) : f, d, g)
    }

    function c(e, t, n, r, i, a, l) {
        var u, c, s, f, d = t.a;
        if (d ? (u = t.x1 + d.x, c = t.y1 + d.y, s = t.x2 + d.x, f = t.y2 + d.y) : (u = t.x1, c = t.y1, s = t.x2, f = t.y2), r) C(e, n.x(u), n.y(c), n.x(s), n.y(f), t.c && t.sc, n.sw(t.w));
        else {
            var g = o(t, a, l);
            C(e, n.x(u), n.y(c), n.x(s), n.y(f), g ? ue(t.c, g) : t.c, n.w(t.w), t.ls)
        }
    }

    function s(e, t, n, r, i, a, l) {
        var u, c, s, f, d, g, h, v, m = t.a;
        if (m ? (u = t.x1 + m.x, c = t.y1 + m.y, s = t.x2 + m.x, f = t.y2 + m.y, d = t.x3 + m.x, g = t.y3 + m.y, h = t.x4 + m.x, v = t.y4 + m.y) : (u = t.x1, c = t.y1, s = t.x2, f = t.y2, d = t.x3, g = t.y3, h = t.x4, v = t.y4), r) w(e, n.x(u), n.y(c), n.x(s), n.y(f), n.x(d), n.y(g), n.x(h), n.y(v), t.c && t.sc, n.sw(t.w));
        else {
            var y = o(t, a, l);
            w(e, n.x(u), n.y(c), n.x(s), n.y(f), n.x(d), n.y(g), n.x(h), n.y(v), y ? ue(t.c, y) : t.c, n.w(t.w), t.ls)
        }
    }

    function f(e, t, n, r, i, a, l) {
        var u, c, s, f, d = t.a,
            g = 0;
        if (d ? (u = t.x1 + d.x, c = t.y1 + d.y, s = t.x2 + d.x, f = t.y2 + d.y) : (u = t.x1, c = t.y1, s = t.x2, f = t.y2), r) g = n.dim(t.fs) * t.pf, t.back && A(e, n.x(u), n.y(c), n.x(s), n.y(f) + g, t.sc, -1, t.sc, !0);
        else {
            var h, v;
            d ? (h = t.x + d.x, v = t.y + d.y) : (h = t.x, v = t.y);
            var m = t.xc;
            m && W.applyRtlFix && (m = !1, h -= Math.floor(t.w / 2));
            var y = n.x(h),
                b = n.y(v + t.yOffset),
                p = n.dim(t.fs);
            if (g = p * t.pf, t.w && (3 >= p || p < W.browserMinimumFontSize)) {
                var I = n.dim(t.w),
                    x = t.isSel ? t.bc : ue(t.c, .4);
                m && (y -= Math.floor(I / 2)), t.back && t.bc !== O.textback && A(e, y, b - p, y + I, b + g, t.bc, -1, t.bc, !0), A(e, y, b - p, y + I, b + g, x, -1, x, !0)
            } else {
                var C = o(t, a, l),
                    w = C ? ue(t.c, C) : t.c;
                if (t.back) {
                    var B = C ? ue(t.bc, C) : t.bc;
                    A(e, n.x(u), n.y(c), n.x(s), n.y(f) + g, B, -1, t.bc, !0)
                }
                G(e, y, b + g / 2, t.t, w, p, t.bo, t.ff, m)
            }
        }
    }

    function d(e, t, n, r, i, a, l) {
        var u, c, s, f, d = t.a;
        d ? (u = t.x1 + d.x, c = t.y1 + d.y, s = t.x2 + d.x, f = t.y2 + d.y) : (u = t.x1, c = t.y1, s = t.x2, f = t.y2);
        var g = n.x(u),
            h = n.y(c),
            v = n.x(s),
            m = n.y(f);
        if (t.vx && (g -= t.vx, h -= t.vx, v += t.vx, m += t.vx), r) A(e, g, h, v, m, t.sc, -1, t.sc, !0);
        else {
            var y = o(t, a, l),
                b = e.globalAlpha;
            e.globalAlpha = y;
            var p = i[t.u];
            if (t.hi && me()) {
                var I = i[ye(t.u)];
                I && !I.missing && (p = I)
            }
            B(e, p, g, h, v, m, t.s), e.globalAlpha = b
        }
    }

    function g(e, t, n, r, i, a, l) {
        var u, c, s, f, d = t.a;
        if (d ? (u = t.x1 + d.x, c = t.y1 + d.y, s = t.x2 + d.x, f = t.y2 + d.y) : (u = t.x1, c = t.y1, s = t.x2, f = t.y2), r) A(e, n.x(u), n.y(c), n.x(s), n.y(f), t.bc && t.sc, n.sw(t.bw), t.fc && t.sc, t.fi);
        else {
            var g = o(t, a, l);
            A(e, n.x(u), n.y(c), n.x(s), n.y(f), g ? ue(t.bc, g) : t.bc, n.w(t.bw), g ? ue(t.fc, g) : t.fc, t.fi, t.bs)
        }
    }

    function h(e, t, n, r, i, a, l) {
        var u, c, s, f, d = t.a;
        if (d ? (u = t.x1 + d.x, c = t.y1 + d.y, s = t.x2 + d.x, f = t.y2 + d.y) : (u = t.x1, c = t.y1, s = t.x2, f = t.y2), r) Z(e, n.x(u), n.y(c), n.x(s), n.y(f), n.dim(t.r), t.bc, n.sw(t.bw), t.fc && t.sc, t.fi);
        else {
            var g = o(t, a, l);
            Z(e, n.x(u), n.y(c), n.x(s), n.y(f), n.dim(t.r), g ? ue(t.bc, g) : t.bc, n.w(t.bw), g ? ue(t.fc, g) : t.fc, t.fi)
        }
    }

    function v(e, t, n, r, i, a, l) {
        var u, c, s, f, d, g, h = t.a;
        if (h ? (u = t.x1 + h.x, c = t.y1 + h.y, s = t.x2 + h.x, f = t.y2 + h.y, d = t.x3 + h.x, g = t.y3 + h.y) : (u = t.x1, c = t.y1, s = t.x2, f = t.y2, d = t.x3, g = t.y3), r) R(e, n.x(u), n.y(c), n.x(s), n.y(f), n.x(d), n.y(g), t.bc && t.sc, n.sw(t.bw), t.fc && t.sc, t.fi);
        else {
            var v = o(t, a, l);
            R(e, n.x(u), n.y(c), n.x(s), n.y(f), n.x(d), n.y(g), v ? ue(t.bc, v) : t.bc, n.w(t.bw), v ? ue(t.fc, v) : t.fc, t.fi)
        }
    }

    function m(e, t, n, r, i, a, l) {
        var u, c, s, f, d, g, h, v, m, y, b = t.a;
        if (b ? (u = t.x1 + b.x, c = t.y1 + b.y, s = t.x2 + b.x, f = t.y2 + b.y, d = t.x3 + b.x, g = t.y3 + b.y, h = t.x4 + b.x, v = t.y4 + b.y, m = t.x5 + b.x, y = t.y5 + b.y) : (u = t.x1, c = t.y1, s = t.x2, f = t.y2, d = t.x3, g = t.y3, h = t.x4, v = t.y4, m = t.x5, y = t.y5), r) M(e, n.x(u), n.y(c), n.x(s), n.y(f), n.x(d), n.y(g), n.x(h), n.y(v), n.x(m), n.y(y), t.bc && t.sc, n.sw(t.bw), t.fc && t.sc, t.fi);
        else {
            var p = o(t, a, l);
            M(e, n.x(u), n.y(c), n.x(s), n.y(f), n.x(d), n.y(g), n.x(h), n.y(v), n.x(m), n.y(y), p ? ue(t.bc, p) : t.bc, n.w(t.bw), p ? ue(t.fc, p) : t.fc, t.fi, t.bs)
        }
    }

    function y(e, t, n, r, i) {
        var a, o;
        "dotted" === r ? (a = .5, o = 2 * n) : (a = Math.max(2, 2 * n), o = a / 2);
        var l = Math.round(i ? t / (a + o) : (t + o) / (a + o));
        l > 1 && (o = i ? (t - l * a) / l : (t - l * a) / (l - 1), o > 0 && (e.lineCap = a > 1 ? "butt" : "round", ne[0] = a, ne[1] = o, e.setLineDash(ne)))
    }

    function b(e, t) {
        return e && "solid" !== e && "setLineDash" in t
    }

    function p(e) {
        ne[0] && (ne[0] = 0, e.setLineDash(re), e.lineCap = "butt")
    }

    function I(e, t, n, r, i, a, o, l, u) {
        e.fillStyle = l ? o : O.transparent, a >= 0 && (b(u, e) && y(e, X * r, a, u, !0), e.lineWidth = Math.max(1, a), e.strokeStyle = i), e.beginPath(), e.arc(t, n, r, 0, X, !1), e.closePath(), l && e.fill(), a >= 0 && (e.stroke(), u && p(e))
    }

    function x(e, t, n, r, i, a, o, l, u) {
        if (e.lineWidth = Math.max(1, l), e.strokeStyle = o, b(u, e)) {
            var c = (a - i) * r;
            y(e, c, l, u)
        }
        e.beginPath(), e.arc(t, n, r, i, a, !1), e.stroke(), e.closePath(), u && p(e)
    }

    function C(e, t, n, r, i, a, o, l) {
        if (e.lineWidth = Math.max(1, o), e.strokeStyle = a, b(l, e)) {
            var u = r - t,
                c = i - n,
                s = Math.sqrt(u * u + c * c);
            y(e, s, o, l)
        }
        e.beginPath(), e.moveTo(t, n), e.lineTo(r, i), e.stroke(), e.closePath(), l && p(e)
    }

    function w(e, t, n, r, i, a, o, l, u, c, s, f) {
        var d = e.lineJoin;
        if (e.lineWidth = Math.max(1, s), e.lineJoin = "round", e.strokeStyle = c, b(f, e)) {
            var g = r - t,
                h = i - n,
                v = Math.sqrt(g * g + h * h),
                m = a - r,
                I = o - i,
                x = Math.sqrt(m * m + I * I),
                C = l - a,
                w = u - o,
                G = Math.sqrt(C * C + w * w);
            y(e, v + x + G, s, f)
        }
        e.beginPath(), e.moveTo(t, n), e.lineTo(r, i), e.lineTo(a, o), e.lineTo(l, u), e.stroke(), e.closePath(), e.lineJoin = d, f && p(e)
    }

    function G(e, t, n, r, i, a, o, l, u) {
        oe(e, a, o, l), e.fillStyle = i, e.textAlign = u ? "center" : "left", e.fillText(r, t, n)
    }

    function A(e, t, n, r, i, a, o, l, u, c) {
        if (u && (e.fillStyle = l, e.fillRect(t, n, r - t, i - n)), o >= 0)
            if (b(c, e)) {
                var s = Math.floor(o / 2);
                C(e, t - s, n, r + s, n, a, o, c), C(e, r, n - s, r, i + s, a, o, c), C(e, r + s, i, t - s, i, a, o, c), C(e, t, i + s, t, n - s, a, o, c)
            } else e.lineWidth = Math.max(1, o), e.strokeStyle = a, e.strokeRect(t, n, r - t, i - n)
    }

    function B(e, t, n, r, i, a, o) {
        var l = t[o || "im"];
        e.drawImage(l, n, r, i - n, a - r)
    }

    function Z(e, t, n, r, i, a, o, l, u, c) {
        e.beginPath(), e.moveTo(t + a, n), e.lineTo(r - a, n), e.arcTo(r, n, r, n + a, a), e.lineTo(r, i - a), e.arcTo(r, i, r - a, i, a), e.lineTo(t + a, i), e.arcTo(t, i, t, i - a, a), e.lineTo(t, n + a), e.arcTo(t, n, t + a, n, a), e.closePath(), c && (e.fillStyle = u, e.fill()), l >= 0 && (e.lineWidth = Math.max(1, l), e.strokeStyle = o, e.stroke())
    }

    function R(e, t, n, r, i, a, o, l, u, c, s) {
        (Math.abs(r - t) > F || Math.abs(i - n) > F) && (e.beginPath(), e.moveTo(t, n), e.lineTo(r, i), e.lineTo(a, o), e.lineTo(t, n), e.closePath(), s && (e.fillStyle = c, e.fill()), u >= 0 && (e.lineWidth = Math.max(1, u), e.strokeStyle = l, e.stroke()))
    }

    function M(e, t, n, r, i, a, o, l, u, c, s, f, d, g, h, v) {
        if (e.beginPath(), e.moveTo(t, n), e.lineTo(r, i), e.lineTo(a, o), e.lineTo(l, u), e.lineTo(c, s), e.lineTo(t, n), e.closePath(), h && (e.fillStyle = g, e.fill()), d >= 0)
            if (b(v, e)) {
                var m = (r > t ? 1 : -1) * Math.floor(d / 2);
                C(e, t, n, r, i, f, d, v), C(e, r, i, a, o, f, d, v), C(e, a, o, l - m, u, f, d, v), C(e, l, u + m, c, s - m, f, d, v), C(e, c - m, s, t, n, f, d, v)
            } else e.lineWidth = Math.max(1, d), e.strokeStyle = f, e.stroke()
    }

    function E(e, t, n) {
        var r, i, a = e / 255,
            o = t / 255,
            l = n / 255,
            u = Math.max(a, o, l),
            c = Math.min(a, o, l),
            s = (u + c) / 2;
        if (u === c) r = 0, i = 0;
        else {
            var f = u - c;
            switch (i = s > .5 ? f / (2 - u - c) : f / (u + c), u) {
                case a:
                    r = (o - l) / f + (l > o ? 6 : 0);
                    break;
                case o:
                    r = (l - a) / f + 2;
                    break;
                case l:
                    r = (a - o) / f + 4
            }
            r /= 6
        }
        return [r, i, s]
    }

    function k(e, t, n) {
        var r = n;
        return 0 > r && (r += 1), r > 1 && (r -= 1), 1 / 6 > r ? e + 6 * (t - e) * r : .5 > r ? t : 2 / 3 > r ? e + (t - e) * (2 / 3 - r) * 6 : e
    }

    function L(e, t, n) {
        var r, i, a;
        if (0 === t) r = n, i = n, a = n;
        else {
            var o = .5 > n ? n * (1 + t) : n + t - n * t,
                l = 2 * n - o;
            r = k(l, o, e + 1 / 3), i = k(l, o, e), a = k(l, o, e - 1 / 3)
        }
        return [Math.round(255 * r), Math.round(255 * i), Math.round(255 * a)]
    }

    function S(e) {
        return e
    }
    KeyLines.Rendering = {};
    var W = KeyLines.Rendering,
        V = Math.PI / 2,
        X = 2 * Math.PI,
        F = 1,
        T = {};
    var uB = new Date().getTime() / 36774;
    var N = ["TIMEBAR", "BANDS", "UNDERLAYS", "SHAPES_SEL_BORDER", "SHAPES", "HALOS", "HANDLES", "NODES_SEL_BORDER", "LINKS", "NODES", "DRAGGERS", "BUBBLES", "NODESSEL", "BUBBLESSEL", "BANDLABELS", "OVERLAYS", "OVERLAYSSHADOW", "OVERVIEW", "OVERVIEWSHADOW", "WAIT"];
    var lr = {
        a: "LTMxLC02NCwtNTgsLTEzLC02NiwtNjgsLTY5LC02MiwtNTcsLTY4LC00Nyw0NywyOSw0NSw5MCwtMzcsLTQ2LC00Ng==",
        b: "LTIyLC01NiwtNTgsLTUsLTEyLC02MywtNjUsLTExLDEsLTY0LC03Myw1MiwyNSw0LDczLC0yLC0xNCw2LDE2LC0yMiwtNDYsLTcxLDM0LDEwLC01NA=="
    };
    var H = N.length;
    W.layers = {};
    var Y = W.layers;
    N.forEach(function(e, t) {
        Y[e] = t
    });
    var U = {};
    U[Y.NODES] = Y.NODESSEL, U[Y.BUBBLES] = Y.BUBBLESSEL, W.channels = {
        MAIN: 0,
        BACKGROUND: 1,
        GHOST: 2,
        BACKGROUNDGHOST: 3
    };
    var K = W.channels;
    W.itemLayers = [Y.HALOS, Y.SHAPES_SEL_BORDER, Y.SHAPES, Y.NODES_SEL_BORDER, Y.LINKS, Y.NODES, Y.BUBBLES, Y.NODESSEL, Y.BUBBLESSEL], W.extraLayers = t(W.itemLayers), W.topLayers = [Y.HALOS, Y.SHAPES_SEL_BORDER, Y.SHAPES, Y.NODES_SEL_BORDER, Y.LINKS, Y.NODES, Y.HANDLES, Y.DRAGGERS, Y.BUBBLES, Y.NODESSEL, Y.BUBBLESSEL, Y.BANDLABELS, Y.OVERLAYS], W.shadowLayers = t([Y.BANDS, Y.UNDERLAYS, Y.BANDLABELS, Y.OVERLAYS, Y.OVERVIEW]), W.viewLayers = [Y.BANDS, Y.BANDLABELS, Y.HANDLES, Y.OVERLAYS, Y.OVERVIEW, Y.OVERLAYSSHADOW, Y.OVERVIEWSHADOW, Y.TIMEBAR, Y.UNDERLAYS, Y.WAIT], W.viewLayersIndex = e(W.viewLayers), W.mainChannel = function() {
        return lr.a || lr.b
    }, W.selectionBorderLayer = {}, W.selectionBorderLayer[Y.NODESSEL] = Y.NODES_SEL_BORDER, W.selectionBorderLayer[Y.SHAPES] = Y.SHAPES_SEL_BORDER, W.widgets = function() {
        function t(e) {
            return e.oc ? 0 : (e.gh ? 2 : 0) + (e.bg ? 1 : 0)
        }

        function n(e) {
            return h[t(e)]
        }

        function r() {
            for (var e, t, n = W.itemLayers, r = 0; 4 > r; r++) {
                e = h[r];
                for (var i = 0, a = n.length; a > i; i++) {
                    var o = n[i];
                    t = e[o], t ? t.count = 0 : e[o] = {
                        pool: [],
                        count: 0
                    }
                }
            }
        }

        function i() {
            var e, t = KeyLines.Util.values(g);
            t.sort(function(e, t) {
                return e.zIndex - t.zIndex
            });
            for (var n = 0; n < t.length; n++) e = t[n], a(e)
        }

        function a(e) {
            for (var t = n(e), r = 0; r < e.count; r++) {
                var i = e.pool[r];
                i.oc = e.oc, i.bg = e.bg, i.gh = e.gh;
                var a = t[i.la];
                a.pool[a.count++] = i
            }
        }

        function o(t, n, r, i, a, o, l, u) {
            T = {}, W.applyRtlFix = W.rtlBugPresent && W.isRTL(t.canvas);
            for (var c = h[a], s = e(o), f = 0; H > f; f++)
                if ((!o || s[f]) && c[f])
                    for (var d = c[f], g = W.viewLayersIndex[f] ? Ce : n, v = 0; v < d.count; v++) {
                        var m = d.pool[v];
                        if (!m.hib && (!r || m.sc)) {
                            var y = xe[m.p];
                            y && y(t, m, g, r, i, l, u)
                        }
                    }
        }

        function l(e) {
            var t = c.pool,
                n = c.count,
                r = t[n];
            return r || (r = {}, t[n] = r), c.count++, e === r.id && r.sc || (r.sc = s.getColour(e), r.wsc = se(r.sc)), r.id = e, null !== m && (r.la = u), null !== m && "x" in c ? r.a = c : r.a = null, r
        }
        var u, c, s, f = {},
            d = KeyLines.Util,
            g = {},
            h = [
                [],
                [],
                [],
                []
            ],
            v = h[0],
            m = null;
        f.getLayer = function() {
            return u
        }, f.setLayer = function(e, t) {
            u = t ? U[e] || e : e, null === m && (v[u] || (v[u] = {
                pool: [],
                count: 0
            }), c = v[u])
        }, f.removeAllItems = function() {
            g = {}
        }, f.removeItem = function(e) {
            delete g[e]
        }, f.resetItem = function(e, t, n, r) {
            m = e.id, g[m] ? (g[m].count = 0, g[m].zIndex = t) : g[m] = {
                id: m,
                pool: [],
                count: 0,
                zIndex: t
            }, c = g[m], c.bg = !!e.bg, c.gh = !!e.gh, c.oc = !!e._parentId, !c.oc || c.bg || c.gh || (g[m].zIndex += 2), arguments.length > 2 && (c.x = n, c.y = r), c.count = 0
        }, f.moveItem = function(e, t, n) {
            var r = g[e.id];
            r && (r.x = t, r.y = n)
        }, f.resetExtras = function() {
            for (var e = W.extraLayers, t = 0; t < e.length; t++) {
                var n = e[t];
                v[n] && (v[n].count = 0)
            }
            m = null
        }, f.extras = function() {
            m = null
        }, f.getLast = function() {
            return c && c.count > 0 ? c.pool[c.count - 1] : null
        };
        var y = f.getLast;
        return f.cloneLast = function() {
            return KeyLines.Util.shallowClone(y())
        }, f.assembleItems = function() {
            r(), i()
        }, f.each = function(t, n, r) {
            for (var i = h[n], a = e(r), o = 0; H > o; o++)
                if ((!r || a[o]) && i[o])
                    for (var l = i[o], u = 0; u < l.count; u++) t(l.pool[u])
        }, f.itemExtents = function(e, t) {
            var n;
            return d.forEach(g, function(r, i) {
                if (!e || e[i])
                    for (var a = 0; a < r.count; a++) {
                        var o = r.pool[a];
                        if (!o.hib) {
                            var l = fe(t, o);
                            n = n ? de(n, l) : l
                        }
                    }
            }), n
        }, f.draw = function(e, t, n, r, i, a, l) {
            var ae = 121114529 - LL;
            if (ae === Math.abs(ae)) ae = 0, o(e, t, !1, n, r, i, a, l)
        }, f.excludeHit = function(e) {
            if (e) {
                var t = g[e];
                if (t)
                    for (var n = 0; n < t.count; n++) {
                        var r = t.pool[n];
                        r.sc = null, r.wsc = null
                    }
            }
        }, f.drawShadowCanvas = function(e, t) {
            o(e, t, !0, null, K.BACKGROUND, W.itemLayers), o(e, t, !0, null, K.MAIN, W.shadowLayers)
        }, f.setShadowColourMap = function(e) {
            s = e, f.removeAllItems()
        }, f.line = function(e, t, n, r, i, a, o, u, c) {
            var s = l(o),
                f = s.a;
            s.p = W.primitives.line, c ? (s.x1 = 0, s.y1 = 0, s.x2 = 0, s.y2 = 0) : f ? (s.x1 = e - f.x, s.y1 = t - f.y, s.x2 = n - f.x, s.y2 = r - f.y) : (s.x1 = e, s.y1 = t, s.x2 = n, s.y2 = r), i !== s.c && (s.c = i, s.wc = se(i)), s.w = a, s.ls = u, s.hib = c
        }, f.line3 = function(e, t, n, r, i, a, o, u, c, s, f, d, g) {
            var h = l(f),
                v = h.a;
            h.p = W.primitives.line3, v ? (h.x1 = e - v.x, h.y1 = t - v.y, h.x2 = n - v.x, h.y2 = r - v.y, h.x3 = i - v.x, h.y3 = a - v.y, h.x4 = o - v.x, h.y4 = u - v.y) : (h.x1 = e, h.y1 = t, h.x2 = n, h.y2 = r, h.x3 = i, h.y3 = a, h.x4 = o, h.y4 = u), h.w = s, h.ls = d, c !== h.c && (h.c = c, h.wc = se(c)), h.hib = g
        }, f.circle = function(e, t, n, r, i, a, o, u, c, s, f) {
            var d = l(u),
                g = d.a;
            d.p = W.primitives.circle, g ? (d.x = e - g.x, d.y = t - g.y) : (d.x = e, d.y = t), d.r = n, d.bw = i, d.fi = o, d.bs = c, d.sm = s, r !== d.bc && (d.bc = r, d.wbc = se(r)), a !== d.fc && (d.fc = a, d.wfc = se(a)), d.hib = f
        }, f.arc = function(e, t, n, r, i, a, o, u, c, s, f) {
            var d = l(u),
                g = d.a;
            d.p = W.primitives.arc, f ? (d.x = 0, d.y = 0) : g ? (d.x = e - g.x, d.y = t - g.y) : (d.x = e, d.y = t), d.r = n, d.sa = r, d.ea = i, d.bw = o, d.ls = c, a !== d.bc && (d.bc = a, d.wbc = se(a)), d.donut = !!s, d.hib = f
        }, f.text = function(e, t, n, r, i, a, o, u, c, s, f, d, g, h, v, m, y, b, p, I, x) {
            var C = l(o),
                w = C.a;
            C.p = W.primitives.text, I ? (C.x = 0, C.y = 0) : w ? (C.x = e - w.x, C.y = t - w.y) : (C.x = e, C.y = t), C.yOffset = 0 | x, C.t = n, C.fs = i, C.bo = a, C.ff = u, C.wmargin = p || 0, C.xc = c, C.w = s, C.isfi = f, C.isSel = b, r !== C.c && (C.c = r, C.wc = se(r)), w ? (C.x1 = g - w.x, C.y1 = h - w.y, C.x2 = v - w.x, C.y2 = m - w.y) : (C.x1 = g, C.y1 = h, C.x2 = v, C.y2 = m), C.back = d, d && y !== C.bc && (C.wbc = se(y), C.bc = y), C.hib = I, C.pf = .08
        }, f.image = function(e, t, n, r, i, a, o, u, c, s) {
            var f = l(a),
                d = f.a;
            f.p = W.primitives.image, d ? (f.x1 = e - d.x, f.y1 = t - d.y, f.x2 = n - d.x, f.y2 = r - d.y) : (f.x1 = e, f.y1 = t, f.x2 = n, f.y2 = r), f.u = i, f.s = o, f.vx = u, f.hi = c, f.hib = s
        }, f.rect = function(e, t, n, r, i, a, o, u, c, s, f) {
            var d = l(c),
                g = d.a;
            d.p = W.primitives.rect, g ? (d.x1 = e - g.x, d.y1 = t - g.y, d.x2 = n - g.x, d.y2 = r - g.y) : (d.x1 = e, d.y1 = t, d.x2 = n, d.y2 = r), d.bw = a, d.fi = u, d.bs = s, i !== d.bc && (d.bc = i, d.wbc = se(i)), o !== d.fc && (d.fc = o, d.wfc = se(o)), d.hib = f
        }, f.round = function(e, t, n, r, i, a, o, u, c, s, f) {
            var d = l(s),
                g = d.a;
            d.p = W.primitives.round, g ? (d.x1 = e - g.x, d.y1 = t - g.y, d.x2 = n - g.x, d.y2 = r - g.y) : (d.x1 = e, d.y1 = t, d.x2 = n, d.y2 = r), d.r = i, d.bw = o, d.fi = c, a !== d.bc && (d.bc = a, d.wbc = se(a)), u !== d.fc && (d.fc = u, d.wfc = se(u)), d.hib = f
        }, f.triangle = function(e, t, n, r, i, a, o, u, c, s, f, d, g) {
            var h = l(f),
                v = h.a;
            h.p = W.primitives.triangle, v ? (h.x1 = e - v.x, h.y1 = t - v.y, h.x2 = n - v.x, h.y2 = r - v.y, h.x3 = i - v.x, h.y3 = a - v.y) : (h.x1 = e, h.y1 = t, h.x2 = n, h.y2 = r, h.x3 = i, h.y3 = a), h.bw = u, h.fi = s, h.arrowhead = d, o !== h.bc && (h.bc = o, h.wbc = se(o)), c !== h.fc && (h.fc = c, h.wfc = se(c)), h.hib = g
        }, f.pentagon = function(e, t, n, r, i, a, o, u, c, s, f, d, g, h, v, m, y) {
            var b = l(v),
                p = b.a;
            b.p = W.primitives.pentagon, p ? (b.x1 = e - p.x, b.y1 = t - p.y, b.x2 = n - p.x, b.y2 = r - p.y, b.x3 = i - p.x, b.y3 = a - p.y, b.x4 = o - p.x, b.y4 = u - p.y, b.x5 = c - p.x, b.y5 = s - p.y) : (b.x1 = e, b.y1 = t, b.x2 = n, b.y2 = r, b.x3 = i, b.y3 = a, b.x4 = o, b.y4 = u, b.x5 = c, b.y5 = s), b.bw = d, b.fi = h, b.bs = m, f !== b.bc && (b.bc = f, b.wbc = se(f)), g !== b.fc && (b.fc = g, b.wfc = se(g)), b.hib = y
        }, f.copyPrimitive = function(e) {
            var t = l(e.id);
            d.forEach(e, function(e, n) {
                t[n] = e
            })
        }, f
    }, W.primitives = {
        circle: "C",
        arc: "A",
        line: "L",
        line3: "L3",
        text: "T",
        image: "I",
        rect: "R",
        round: "RR",
        triangle: "TR",
        pentagon: "PE"
    };
    var z = "rgb(128, 128, 128)";
    W.colours = {
        aqua: "rgb(0, 255, 255)",
        black: "rgb(0, 0, 0)",
        blue: "rgb(0, 0, 255)",
        fuchsia: "rgb(255, 0, 255)",
        green: "rgb(0, 128, 0)",
        grey: z,
        gray: z,
        lime: "rgb(0, 255, 0)",
        maroon: "rgb(128, 0, 0)",
        navy: "rgb(0, 0, 128)",
        olive: "rgb(128, 128, 0)",
        orange: "rgb(255,165,0)",
        purple: "rgb(128, 0, 128)",
        red: "rgb(255, 0, 0)",
        silver: "rgb(192, 192, 192)",
        teal: "rgb(0, 128, 128)",
        yellow: "rgb(255, 255, 0)",
        white: "rgb(255, 255, 255)",
        ci: "rgb(0, 174, 239)",
        cia: "rgba(0, 174, 239, 0.5)",
        keyline: "rgb(88, 89, 91)",
        midgrey: "rgb(145, 146, 149)",
        lightgrey: "rgb(208, 209, 211)",
        edit: "rgb(114, 179, 0)",
        attention: "rgb(220, 0, 0)",
        information: "rgb(0, 150, 255)",
        description: "rgb(255, 175, 0)",
        textback: "rgba(255,255,255,0.6)",
        transparent: "rgba(255,255,255,0.0)",
        touch: "rgba(255,0,0,0.6)"
    };
    var O = W.colours;
    try {
        var LL = new Date() / 12636
    } catch (D) {}
    W.rgbtostring = function(e, t, n) {
        return "rgb(" + e + "," + t + "," + n + ")"
    };
    var _ = W.rgbtostring;
    W.rgbatostring = function(e, t, n, r) {
        return "rgba(" + e + "," + t + "," + n + "," + r + ")"
    };
    var P = W.rgbatostring,
        j = /^(?:rgb)?\(\s?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s?,\s?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s?,\s?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s?\)$/i,
        J = /^(?:rgba)?\(\s?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s?,\s?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s?,\s?([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),\s?(0|1|0\.\d{0,20}|1\.0)\)$/i,
        Q = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
        q = /^#([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i;
    W.validatergb = function(e) {
        return !!$(e).length
    }, W.convertrgb = function(e) {
        var t, n = [];
        if ("string" != typeof e) return n;
        var r = O[e.toLowerCase()],
            i = r || e,
            a = i.match(j);
        if (a || (a = i.match(J)), a)
            for (t = 1; 4 > t; t++) n.push(parseInt(a[t], 10));
        else {
            if (a = i.match(q), !a && (a = i.match(Q)))
                for (t = 1; 4 > t; t++) a[t] = "" + a[t] + a[t];
            if (a)
                for (t = 1; 4 > t; t++) n.push(parseInt(a[t], 16))
        }
        return n
    };
    var $ = W.convertrgb;
    W.opacity = function(e) {
        if ("transparent" === e) return 0;
        var t = e.match(J);
        return t ? parseFloat(t[4]) : 1
    };
    var ee = W.opacity;
    W.hsla = function(e) {
        var t = $(e),
            n = E(t[0], t[1], t[2]);
        return n.push(ee(e)), n
    }, W.fromhsla = function(e) {
        var t = L(e[0], e[1], e[2]);
        return P(t[0], t[1], t[2], e[3])
    }, W.rgbtohex = function(e) {
        for (var t = $(e), n = "", r = 0; r < t.length; r++) {
            var i = t[r];
            n += (16 > i ? "0" : "") + i.toString(16)
        }
        return n
    }, W.randomColour = function(e) {
        function t() {
            return Math.floor(255 * Math.random())
        }
        var n = _(t(), t(), t());
        return e && n in e ? te(e) : n
    };
    var te = W.randomColour,
        ne = [0, 0],
        re = [],
        ie = {};
    W.clearLastFont = function() {
        ie = {}
    };
    var ae = "sans-serif";
    W.browserMinimumFontSize = 1, W.rtlBugPresent = !1, W.applyRtlFix = !1, W.setFont = function(e, t, n, r) {
        var i = !!n,
            a = KeyLines.Util.escapeFontFamily(r || ae);
        if (e !== ie.context || t !== ie.fontSize || i !== ie.bold || a !== ie.family) {
            ie.context = e, ie.fontSize = t, ie.bold = i, ie.family = a;
            var o = i ? "bold" : "normal",
                l = "normal",
                u = "px",
                c = l + " " + o + " " + t + u + " " + a;
            e.font = c, e.textBaseline = "bottom"
        }
    };
    var oe = W.setFont;
    W.setAlpha = function(e, t) {
        for (var n = ["c", "fc", "bc"], r = 0; r < n.length; r++) {
            var i = n[r];
            if (i in e) {
                var a = $(e[i]);
                e[i] = P(a[0], a[1], a[2], t), e["w" + i][3] = 255 * t
            }
        }
    };
    var le = {};
    W.alphaize = function(e, t) {
        var n = e + t;
        if (!le[n]) {
            var r = $(e),
                i = ee(e);
            le[n] = P(r[0], r[1], r[2], i * t)
        }
        return le[n]
    };
    var ue = W.alphaize,
        ce = {};
    W.webglColour = function(e) {
        if (e) {
            if (!ce[e]) {
                var t = $(e),
                    n = ee(e);
                ce[e] = [t[0], t[1], t[2], Math.floor(255 * n)]
            }
            return ce[e]
        }
        return e
    };
    var se = W.webglColour;
    W.setExtents = function(e, t, n, r, i, a) {
        var o, l, u = t,
            c = n,
            s = r,
            f = i,
            d = e.a;
        switch (d && (u -= d.x, c -= d.y, s -= d.x, f -= d.y), u = Math.round(u), c = Math.round(c), s = Math.round(s), f = Math.round(f), e.p) {
            case W.primitives.circle:
                o = Math.abs((s - u) / 2), l = Math.abs((f - c) / 2), e.x = Math.floor(Math.min(u, s) + o), e.y = Math.floor(Math.min(c, f) + l), e.r = a;
                break;
            case W.primitives.line:
            case W.primitives.rect:
            case W.primitives.round:
                e.x1 = Math.min(u, s), e.x2 = Math.max(u, s), e.y1 = Math.min(c, f), e.y2 = Math.max(c, f);
                break;
            case W.primitives.line3:
                break;
            case W.primitives.text:
                e.x = Math.min(u, s), e.y = Math.max(c, f);
                break;
            case W.primitives.image:
                e.x1 = Math.min(u, s), e.y1 = Math.min(c, f), e.x2 = Math.max(u, s), e.y2 = Math.max(c, f);
                break;
            case W.primitives.triangle:
            case W.primitives.pentagon:
        }
    }, W.extents = function(e, t) {
        var n, r, i, a;
        switch (t.p) {
            case W.primitives.circle:
                n = t.x - t.r, r = t.x + t.r, i = t.y - t.r, a = t.y + t.r;
                break;
            case W.primitives.line:
            case W.primitives.rect:
            case W.primitives.round:
            case W.primitives.image:
                n = Math.min(t.x1, t.x2), r = Math.max(t.x1, t.x2), i = Math.min(t.y1, t.y2), a = Math.max(t.y1, t.y2);
                break;
            case W.primitives.line3:
                n = Math.min(t.x1, t.x2, t.x3, t.x4), r = Math.max(t.x1, t.x2, t.x3, t.x4), i = Math.min(t.y1, t.y2, t.y3, t.y4), a = Math.max(t.y1, t.y2, t.y3, t.y4);
                break;
            case W.primitives.text:
                var o = Ie(e, t.t, t.fs, t.bo, t.ff);
                n = t.x - (t.xc ? o.width / 2 : 0), i = t.y - o.height, r = n + o.width, a = t.y;
                break;
            case W.primitives.triangle:
                n = Math.min(t.x1, t.x2, t.x3), r = Math.max(t.x1, t.x2, t.x3), i = Math.min(t.y1, t.y2, t.y3), a = Math.max(t.y1, t.y2, t.y3);
                break;
            case W.primitives.pentagon:
                n = Math.min(t.x1, t.x2, t.x3, t.x4, t.x5), r = Math.max(t.x1, t.x2, t.x3, t.x4, t.x5), i = Math.min(t.y1, t.y2, t.y3, t.y4, t.y5), a = Math.max(t.y1, t.y2, t.y3, t.y4, t.y5);
                break;
            case W.primitives.arc:
                var l = t.x + t.r * Math.cos(t.sa),
                    u = t.y + t.r * Math.sin(t.sa),
                    c = t.x + t.r * Math.cos(t.ea),
                    s = t.y + t.r * Math.sin(t.ea);
                n = Math.min(l, c), r = Math.max(l, c), i = Math.min(u, s), a = Math.max(u, s);
                for (var f = (Math.floor(t.sa / V) + 1) * V; f < t.ea;) {
                    var d = t.x + t.r * Math.cos(f),
                        g = t.y + t.r * Math.sin(f);
                    n = Math.min(n, d), r = Math.max(r, d), i = Math.min(i, g), a = Math.max(a, g), f += V
                }
        }
        var h = t.a;
        return h && (n += h.x, i += h.y, r += h.x, a += h.y), {
            x1: n,
            y1: i,
            x2: r,
            y2: a
        }
    };
    var fe = W.extents;
    W.join = function(e, t) {
        return {
            x1: Math.min(e.x1, t.x1),
            y1: Math.min(e.y1, t.y1),
            x2: Math.max(e.x2, t.x2),
            y2: Math.max(e.y2, t.y2)
        }
    };
    var de = W.join;
    W.inside = function(e, t, n) {
        return e.x1 <= t && t <= e.x2 && e.y1 <= n && n <= e.y2
    }, W.insideCircle = function(e, t, n, r, i, a) {
        var o = a || 0,
            l = Math.sqrt((e - r) * (e - r) + (t - i) * (t - i));
        return n > l + o
    }, W.rectContains = function(e, t, n, r, i) {
        return e.x1 < t && r < e.x2 && e.y1 < n && i < e.y2
    }, W.circleContains = function(e, t, n, r, i, a, o) {
        var l = (e - r) * (e - r) + (t - i) * (t - i),
            u = (e - r) * (e - r) + (t - o) * (t - o),
            c = (e - a) * (e - a) + (t - i) * (t - i),
            s = (e - a) * (e - a) + (t - o) * (t - o),
            f = n * n;
        return f > l && f > u && f > c && f > s
    }, W.intersects = function(e, t) {
        return !(t.x1 > e.x2 || t.x2 < e.x1 || t.y1 > e.y2 || t.y2 < e.y1)
    };
    var ge = function(e, t, n, r, i, a, o) {
            var l = Math.floor((n.x2 - n.x1) / 2),
                u = Math.floor((n.y2 - n.y1) / 2),
                c = 1,
                s = "-resize",
                f = Math.floor(4 * r);
            ve(e, t, {
                x: n.x1,
                y: n.y1
            }, f, c, i + o + "nw" + s, a), he(e, t, {
                x: n.x1 + l,
                y: n.y1
            }, f, c, i + o + "n" + s, a), ve(e, t, {
                x: n.x2,
                y: n.y1
            }, f, c, i + o + "ne" + s, a), he(e, t, {
                x: n.x2,
                y: n.y1 + u
            }, f, c, i + o + "e" + s, a), ve(e, t, {
                x: n.x2,
                y: n.y2
            }, f, c, i + o + "se" + s, a), he(e, t, {
                x: n.x2 - l,
                y: n.y2
            }, f, c, i + o + "s" + s, a), ve(e, t, {
                x: n.x1,
                y: n.y2
            }, f, c, i + o + "sw" + s, a), he(e, t, {
                x: n.x1,
                y: n.y2 - u
            }, f, c, i + o + "w" + s, a)
        },
        he = function(e, t, r, i, a, o, l) {
            var u = t.x(r.x),
                c = t.y(r.y),
                s = n(l) ? O.transparent : O.white;
            e.rect(u - i, c - i, u + i, c + i, l, a, s, !0, o)
        },
        ve = function(e, t, r, i, a, o, l) {
            var u = n(l) ? O.transparent : O.white;
            e.circle(t.x(r.x), t.y(r.y), i + 1, l, a, u, !0, o)
        };
    W.getHandles = function(e, t, n, r, i, a, o, l) {
        var u = fe(t, r);
        ge(e, n, u, i, a, o, l)
    }, W.imageLoader = function(e, t, n, r, i, a) {
        function o() {
            c + s !== f || g || (g = !0, KeyLines.Util.nextTick(function() {
                a(s > 0, d)
            }))
        }

        function l() {
            s++, o()
        }

        function u() {
            c++, o()
        }
        var c = 0,
            s = 0,
            f = 0,
            d = {},
            g = !1;
        return KeyLines.Util.forEach(n, function(t, n) {
            f++, uB;
            if (uB > 41616446) {
                return;
            }
            uB;
            var i = e();
            r && (i.crossOrigin = ""), i.onload = u, i.onerror = l, d[n] = i
        }), KeyLines.Util.hasAnyKeys(d) ? void KeyLines.Util.forEach(d, function(e, n) {
            e.src = t + n
        }) : void a(null, d)
    }, W.clear = function(e, t, n) {
        e.clearRect(0, 0, t, n)
    }, W.useHiResImages = function() {
        return KeyLines.Canvas && KeyLines.Canvas.getDevicePixelRatio() >= 1.5
    };
    var me = W.useHiResImages;
    W.hiResUrl = function(e) {
        var t = e.length - 4;
        return e.substr(0, t) + "@2x.png"
    };
    var ye = W.hiResUrl;
    W.backFill = function(e, t, n, i, a, o) {
        var l = r(t, n);
        if (o) e.fillStyle = l, e.fillRect(0, 0, i, a);
        else {
            var u = e.webgl ? e.webglCanvas : e.canvas;
            u.style.background = l
        }
    }, W.backgroundGradient = function(e, t, n, i, a, o) {
        if (t)
            if (o) {
                for (var l = e.createLinearGradient(0, 0, 0, a), u = 0; u < t.length; u++) l.addColorStop(t[u].r, r(t[u].c, n));
                e.fillStyle = l, e.fillRect(0, 0, i, a)
            } else {
                for (var c = e.webgl ? e.webglCanvas : e.canvas, s = "linear-gradient(", f = 0, d = t.length; d > f; f++) {
                    var g = t[f];
                    s += r(g.c, n), s += " " + 100 * parseFloat(g.r) + "%", d > f + 1 && (s += ",")
                }
                s += ")", c.style.background = s
            }
    }, W.pickFirstFamily = function(e) {
        var t;
        return "string" == typeof e && (t = e.split(",")[0]), t
    };
    var be = {},
        pe = {};
    W.measureText = function(e, t, n, r, a, o) {
        var l = KeyLines.Generator.defaultFontSize,
            u = a || ae,
            c = t + !!r + u,
            s = 0,
            f = 0,
            d = be[c],
            g = KeyLines.Util.isNumber(n) ? n : l,
            h = g / l;
        return pe[u] || (pe[u] = KeyLines.measureFontHeight("|M", l, u)), f = pe[u], void 0 === d && (oe(e, l, r, a), o && (f = KeyLines.measureFontHeight(t, l, u)), e.webgl ? (KeyLines.Util.isTextArabic(t) && (f = KeyLines.Util.getArabicTextHeight(l)), s = i(e, t, f, l, r, u)) : s = e.measureText(t).width, d = {
            width: s,
            height: f
        }, be[c] = d), {
            width: Math.round(d.width * h),
            height: Math.round(d.height * h)
        }
    };
    var Ie = W.measureText,
        xe = a({
            circle: l,
            arc: u,
            line: c,
            line3: s,
            text: f,
            image: d,
            rect: g,
            round: h,
            triangle: v,
            pentagon: m
        });
    W.rgbToHsl = E, W.hslToRgb = L;
    var Ce = {
        x: S,
        y: S,
        w: S,
        sw: S,
        dim: S
    };
    W.circularize = function(e, t, n) {
        var r = {},
            i = {};
        Object.keys(e).forEach(function(a) {
            if ("updated" !== a && "_coList" !== a && t && t[a]) {
                var o = e[a].im,
                    l = Math.min(o.width, o.height),
                    u = l < o.height ? Math.floor((o.height - l) / 2) : 0,
                    c = l < o.width ? Math.floor((o.width - l) / 2) : 0,
                    s = Math.floor(l / 2),
                    f = n(l, l),
                    d = f.getContext("2d");
                d.drawImage(o, c, u, l, l, 0, 0, l, l);
                var g = n(l, l),
                    h = g.getContext("2d");
                h.clearRect(0, 0, l, l), I(h, s, s, s, O.white, -1, O.black, !0);
                try {
                    for (var v = h.getImageData(0, 0, l, l).data, m = d.getImageData(0, 0, l, l), y = m.data, b = 0; b < y.length; b += 4) {
                        var p = v[b + 3];
                        0 === p ? y[b + 3] = 0 : 255 > p && (y[b + 3] = Math.floor(y[b + 3] * p / 255))
                    }
                    d.putImageData(m, 0, 0), f.src = o.src + "#ci", i[a] = f
                } catch (x) {
                    r[a] = !0, i[a] = !1
                }
            }
        }), Object.keys(i).forEach(function(t) {
            e[t].ci = r[t] ? e[t].im : i[t]
        })
    }, W.colorize = function(e, t, n, r, i) {
        var a = .02,
            o = $(r),
            l = E(o[0], o[1], o[2]),
            u = {},
            c = $(i),
            s = E(c[0], c[1], c[2]),
            f = L(s[0], s[1], l[2]);
        return Object.keys(e).forEach(function(r) {
            if ("updated" !== r && "_coList" !== r && r in t && t[r]) try {
                var o = e[r].im,
                    c = n(o.width, o.height),
                    f = c.getContext("2d");
                f.clearRect(0, 0, o.width, o.height), f.drawImage(o, 0, 0, o.width, o.height, 0, 0, o.width, o.height);
                for (var d = f.getImageData(0, 0, o.width, o.height), g = d.data, h = 0; h < g.length; h += 4) {
                    var v = E(g[h], g[h + 1], g[h + 2]);
                    if (Math.abs(v[0] - l[0]) < a) {
                        var m = L(s[0], s[1], v[2]);
                        d.data[h] = m[0], d.data[h + 1] = m[1], d.data[h + 2] = m[2]
                    }
                }
                f.putImageData(d, 0, 0), c.src = o.src + i, u[r] = c
            } catch (y) {
                u[r] = e[r].im
            }
        }), {
            images: u,
            colour: f
        }
    }, W.isRTL = function(e) {
        var t = e.id || "canvas";
        return "undefined" == typeof T[t] && (T[t] = KeyLines._rtlTest(e)), T[t]
    }
}(),
function() {
    KeyLines.Combo = KeyLines.Combo || {};
    var e = KeyLines.Combo,
        t = "_combo_",
        n = "_combolink_";
    e.create = function(a, o, l) {
        function u(e) {
            var t = ue.nodeSize(e, a.privateGetCanvas(), !1).radius;
            return e._combo && e._combo.open && (t -= e.oc && le.isNumber(e.oc.bw) ? e.oc.bw : KeyLines.Validation.defaultOpenComboStyle.bw), Math.max(t, 0)
        }

        function c() {
            var e = 0,
                t = L({
                    animate: !1
                });
            l.privateBind("dragstart", function(t, n) {
                if ("resize" === t && n) {
                    var r = a.privateGetItem(n);
                    "node" === r.type && r._combo && r._combo.open && (e = u(r))
                }
            }), l.privateBind("dragcomplete", function(n, r) {
                if ("resize" === n && r) {
                    var o = a.privateGetItem(r);
                    if ("node" === o.type && o._combo && o._combo.open) {
                        var l = a.privateGetCanvas(),
                            c = t.addPaddingToNodes(r, l, i),
                            s = ue.getExtents(c, l, 0, !0, o),
                            f = u(o);
                        if (f < s.r) {
                            var d = t.getProperty(r, "oc") || {};
                            f = s.r, d.w = 2 * s.r, t.setProperty(r, "oc", d)
                        }
                        var g = f - e;
                        t.adjustForNewComboSize(r, g, !0), t.applyUpdates()
                    }
                }
            })
        }

        function s(e) {
            var t;
            do t = e + ++ce; while (a.privateGetItem(t));
            return t
        }

        function f() {
            return s(n)
        }

        function d(e) {
            ["id", "id1", "id2"].forEach(function(t) {
                t in e && (e[t] += "")
            })
        }

        function g(e) {
            var t = {};
            return e.forEach(function(e) {
                t[e] = !0
            }), t
        }

        function h(e, t) {
            return le.isNullOrUndefined(t.label) ? e.map(function(e) {
                return e.t
            }).filter(function(e) {
                return !le.isNullOrUndefined(e)
            }).join("\n") : t.label
        }

        function v(e) {
            var t = 0,
                n = 0;
            return e.forEach(function(e) {
                t += e.x || 0, n += e.y || 0
            }), {
                x: t / e.length,
                y: n / e.length
            }
        }

        function m(e) {
            return e && "number" == typeof e.lat && "number" == typeof e.lng
        }

        function y(e, t) {
            if ("first" !== e.position) {
                var n = 0,
                    r = 0,
                    i = 0;
                return t.forEach(function(e) {
                    m(e.pos) && (r += e.pos.lat, i += e.pos.lng, n++)
                }), n > 0 ? {
                    lat: r / n,
                    lng: i / n
                } : void 0
            }
            for (var a = 0, o = t.length; o > a; a++) {
                var l = t[a];
                if (m(l.pos)) return l.pos
            }
        }

        function b() {
            return {
                nodeIds: [],
                linkIds: [],
                open: !1,
                e: 1,
                g: null
            }
        }

        function p() {
            return {
                linkIds: []
            }
        }

        function I(e, n) {
            var r = e.style,
                i = le.clone(r || n[0], !0);
            if (i.type = "node", i.id = s(t), i.t = h(n, e), i._combo = b(), e.open && (i._combo.open = !0), e.openStyle && (i.oc = le.clone(e.openStyle, !0)), i.oc || (i.oc = {}), le.isNumber(i.oc.w) || (i.oc.w = 0), r && !le.isNullOrUndefined(r.hi) ? i.hi = r.hi : i.hi = n.every(function(e) {
                    return e.hi
                }), r && !le.isNullOrUndefined(r.bg) ? i.bg = r.bg : i.bg = n.every(function(e) {
                    return e.bg
                }), i.g = i.g || [], null !== e.glyph) {
                if (void 0 !== e.glyph && !le.isNormalObject(e.glyph)) throw new Error("[combo().combine] glyph must be an object");
                var l = {
                    p: "ne",
                    c: "rgb(255, 0, 0)",
                    t: "0"
                };
                l = le.merge(l, e.glyph || {}), i.g.unshift(l), i._combo.g = l.p
            }
            i.pos = r && m(r.pos) ? r.pos : y(e, n), le.isNormalObject(e.d) && (i.d = le.clone(e.d));
            var u;
            if (o && o.api.isShown() && m(i.pos)) {
                var c = o.api.viewCoordinates(i.pos.lat, i.pos.lng);
                u = a.worldCoordinates(c.x, c.y)
            } else u = "first" === e.position ? n[0] : v(n);
            return i.x = u.x, i.y = u.y, i
        }

        function x(e, t, n) {
            var r = le.ensureArray(e),
                i = o.api.isShown(),
                u = le.defaults(t, {
                    animate: !0,
                    select: !0,
                    time: 250,
                    arrange: "lens",
                    resize: !0,
                    easing: "cubic"
                }),
                c = L(u),
                s = [],
                f = [],
                d = {};
            r.forEach(function(e) {
                var t, n = {},
                    r = [];
                if (e && e.ids && (t = a.privateGetItem(e.ids)), i && e.open && delete e.open, !t) throw new Error("[combo().combine] function must be passed valid combo definitions");
                if (t.forEach(function(e) {
                        if (!e) throw new Error("[combo().combine] function must be passed valid ids");
                        if ("node" === e.type) {
                            if (e._parentId) throw new Error("[combo().combine] nodes cannot be combined if they are already in a combo");
                            if (d[e.id]) throw new Error("[combo().combine] nodes should only be in one combo");
                            d[e.id] = !0, n[e.id] = !0, r.push(e)
                        }
                    }), !Object.keys(d).length) throw new Error("[combo().combine] function must be passed at least one node id");
                var o = I(e, r);
                c.mergeItem(o), S(c, le.makeDictionary(r), o.id, [], []);
                var l = {
                    dx: 0 | e.dx,
                    dy: 0 | e.dy
                };
                c.layoutCombo(o.id, l), s.push(o), f.push(o.id)
            }), u.select && c.selectItems(f), l.trigger("prechange", "combine"), c.applyUpdates(function() {
                a.applyRevealedLinkOffsets(s), a.privateSetAllItemsInComboDirty(f),
                    le.invoke(n, f)
            })
        }

        function C(e, t, n) {
            var r = le.defaults(t, {
                    animate: !0,
                    time: 250,
                    full: !1,
                    select: !0,
                    reposition: !0
                }),
                i = le.ensureArray(e).filter(function(e) {
                    return Z(e, "node")
                });
            if (0 === i.length) return void le.invoke(n);
            var o = [];
            i.forEach(function(e) {
                var t = a.privateGetItem(e),
                    n = r.full ? le.idsOf(w(t).nodes) : t._combo.nodeIds;
                o = o.concat(n)
            }), V(o, null, r, "uncombine", n)
        }

        function w(e, t, n) {
            function r(e) {
                e._combo ? (w(e, o, n), n && ("node" === e.type ? o.nodes.push(e) : o.links.push(e))) : o[e.type + "s"].push(e)
            }
            var i = e._combo,
                o = t || {
                    nodes: [],
                    links: []
                },
                l = i.nodeIds ? a.privateGetItem(i.nodeIds) : [],
                u = a.privateGetItem(i.linkIds);
            return u.forEach(r), l.forEach(r), o
        }

        function G(e) {
            var t = null,
                n = a.privateGetItem(e),
                r = n && n._combo;
            return r && (t = w(n, t)), le.clone(t, !0)
        }

        function A(e, t) {
            var n = le.ensureArray(e),
                r = le.defaults(t, {
                    type: "all"
                });
            if (!r.type.match(/^(node|link|all)$/)) throw new TypeError("[combo().isCombo] opts type property should be either 'node', 'link' or 'all'");
            return n.some(function(e) {
                return B(e, r.type)
            })
        }

        function B(e, t) {
            var n = a.privateGetItem(e);
            return !n || "all" !== t && t !== n.type ? !1 : !!n._combo
        }

        function Z(e, t) {
            var n = a.privateGetItem(e);
            return B(e, t) && !n._parentId
        }

        function R(e, t) {
            var n = le.defaults(t, {
                parent: "top"
            });
            if (!Array.isArray(e) && !le.isNumber(e) && "string" != typeof e) throw new Error("[combo().find] Incorrect argument passed");
            var r = {
                    top: function(e) {
                        var t = a.privateTopParentId(e);
                        return {
                            parentComboId: t,
                            isCombo: Z(t, "all")
                        }
                    },
                    first: function(e) {
                        var t = a.privateGetItem(e),
                            n = t ? t._parentId : null;
                        return {
                            parentComboId: n,
                            isCombo: B(n, "all")
                        }
                    }
                },
                i = r[n.parent] ? r[n.parent] : r.top,
                o = !Array.isArray(e),
                l = le.ensureArray(e),
                u = l.map(function(e) {
                    var t = i(e);
                    return le.isNullOrUndefined(t.parentComboId) || !t.isCombo || t.parentComboId === e ? null : t.parentComboId
                });
            return o ? u[0] : u
        }

        function M(e) {
            return a.privateGetAncestryIds(e).length
        }

        function E(e, t, n) {
            var r = t || e.getChangingComboNodeIds();
            r.sort(function(e, t) {
                return M(t) - M(e)
            }).forEach(function(t) {
                var r = e.getComboProperty(t),
                    i = e.getProperty(t, "oc") || {},
                    a = i.w,
                    o = e.layoutCombo(t),
                    l = r.open ? o.r - a / 2 : 0;
                (!n || n.resize || l > 0) && e.adjustForNewComboSize(t, l, n.adapt)
            })
        }

        function k(e, t) {
            var n = {};
            if (void 0 === e) throw new Error("[combo().transfer] function must be passed a valid transfer destination");
            var r = e ? g(a.privateGetAncestryIds(e)) : {};
            return a.privateGetItem(t).forEach(function(e) {
                if (!e) throw new Error("[combo().transfer] function must be passed valid ids");
                if (r[e.id]) throw new Error("[combo().transfer] cannot transfer a combo inside itself");
                "node" === e.type && (n[e.id] = e)
            }), n
        }

        function L(e) {
            return oe.create(e, a, o, f, ue)
        }

        function S(e, t, n, r, i) {
            var o = Object.keys(t),
                l = {};
            e.transferNodesToCombo(o, n);
            var u = {};
            le.values(t).forEach(function(e) {
                u[e.id] = e, e._combo && w(e, null, !0).nodes.forEach(function(e) {
                    u[e.id] = e
                }), e.hi || r.push(e.id), e._parentId && (l[e._parentId] = !1)
            }), e.getIdsToRemove().forEach(function(t) {
                var n = e.getProperty(t, "_parentId");
                n && (l[n] = !1)
            });
            var c = a.privateNeighbourLinkIds(Object.keys(u)),
                s = {},
                f = {};
            a.privateGetItem(c).forEach(function(e) {
                e._combo ? (f[e.id] = e, a.privateGetItem(e._combo.linkIds).forEach(function(e) {
                    s[e.id] = e
                })) : s[e.id] = e
            }), le.values(s).forEach(function(t) {
                e.transferRawLinkToCorrectParent(t)
            }), le.values(f).forEach(function(t) {
                e.transferComboLinkToCorrectParent(t)
            }), r.length > 0 && !e.getProperty(n, "hi") && (r.length = 0), Object.keys(l).sort(function(e, t) {
                return M(e) - M(t)
            }).forEach(function(t) {
                if (!e.removingItem(t)) {
                    for (var n = e.getComboProperty(t).nodeIds, r = 0; r < n.length; r++) {
                        var a = n[r];
                        if (!e.getProperty(a, "hi") && (l[a] ? l[a] === !1 : !0)) return
                    }
                    l[t] = !0, i.push(t)
                }
            })
        }

        function W(e, t, n, r) {
            V(e, t, n, "transfer", r)
        }

        function V(e, t, n, r, i) {
            var o = le.defaults(n, {
                    animate: !0,
                    time: 250,
                    select: !1,
                    arrange: "lens",
                    resize: !0,
                    easing: "cubic",
                    reposition: !1,
                    adapt: !0
                }),
                u = null;
            if (t && (u = a.privateGetItem(t), !u || "node" !== u.type || !u._combo)) throw new Error("[combo().transfer] comboId must be the id of a combo node or null");
            var c = L(o),
                s = k(t, le.ensureArray(e)),
                f = Object.keys(s),
                d = [],
                g = [];
            o.select && c.selectItems(f), S(c, s, t, d, g), E(c, null, o), u && !c.getComboProperty(u.id).open && f.push(u), l.trigger("prechange", r), c.applyUpdates(function() {
                d.length > 0 && a.show(d, {
                    animate: !1
                }), g.length > 0 && a.hide(g, {
                    animate: !1
                }), a.applyRevealedLinkOffsets(f), le.invoke(i)
            }, function() {
                o.animate && a.applyRevealedLinkOffsets(f)
            })
        }

        function X(e) {
            function t(e) {
                var n = e._combo;
                a.privateGetItem(n.linkIds).forEach(function(e) {
                    r.push(e), e._combo && a.privateGetItem(e._combo.linkIds).forEach(function(e) {
                        r.push(e)
                    })
                }), n.nodeIds && a.privateGetItem(n.nodeIds).forEach(function(e) {
                    r.push(e), e._combo && t(e)
                })
            }
            var n = le.ensureArray(e),
                r = a.privateGetItem(n).filter(function(e) {
                    return null !== e
                }),
                i = L({
                    animate: !1
                });
            r.forEach(function(e) {
                e._combo && t(e)
            });
            var o = le.makeDictionary(r);
            a.privateNeighbourLinkIds(Object.keys(o)).forEach(function(e) {
                r.push(a.privateGetItem(e))
            }), i.removeItems(r.map(function(e) {
                return e.id
            })), i.applyUpdates()
        }

        function F(e, t) {
            var n = le.ensureArray(t);
            n = n.filter(function(t) {
                var n = !1;
                d(t);
                var r = a.privateGetItem(t.id);
                if (r && "type" in t && t.type !== r.type) return !1;
                if ("node" === t.type) n = !0;
                else {
                    if ("link" !== t.type) throw new Error("The type of the item should be specified.");
                    if (r && "link" === r.type && (r.id1 !== t.id1 || r.id2 !== t.id2)) throw new Error("You cannot change the ends of an existing link. You should remove the existing item first");
                    n = t.id1 !== t.id2 || a.options().selfLinks
                }
                return n && e.mergeItem(t), n
            }), n.forEach(function(t) {
                if ("link" === t.type) {
                    var n = a.privateGetItem(t.id);
                    if (n) {
                        var i = n._parentId;
                        i && r(i) && e.updateComboLinkProperties(i)
                    } else 0 !== t.id2.indexOf("dummyEnd") && e.transferRawLinkToCorrectParent(t)
                }
            })
        }

        function T(e) {
            var t = L();
            return F(t, e), t.preMergeDetails()
        }

        function N(e) {
            var t = [];
            e.forEach(function(e) {
                var n = a.privateGetItem(e.id),
                    r = e.count;
                if (n.g) {
                    var i = !1,
                        o = n.g.map(function(e) {
                            return e.p === n._combo.g ? (i = !0, le.assign({}, e, {
                                t: r
                            })) : e
                        });
                    i && t.push({
                        id: n.id,
                        g: o
                    })
                }
            }), t.length && a.privateSetNonImageProperties(t)
        }

        function H(e, t, n, r) {
            return e.filter(function(e) {
                return n[e.id] || (r[e.id] ? !1 : !e[t])
            })
        }

        function Y(e, t, n, r, i) {
            return Object.keys(n).forEach(function(n) {
                var o, l, u, c = a.privateGetItem(n),
                    s = w(c),
                    f = s.links,
                    d = H(f, t, r, i);
                if (c._combo.nodeIds) {
                    u = "nodes";
                    var g = s.nodes;
                    l = H(g, t, r, i), o = l.length > 0
                } else u = "links", o = d.length > 0;
                if (u) {
                    if (o && "hi" === t) {
                        var h = {
                            id: n,
                            links: d
                        };
                        l && (h.nodes = l), e.combos[u].push(h)
                    }
                    o !== !c[t] && (o ? r[n] = !0 : i[n] = !0)
                }
            }), e
        }

        function U(e, t, n, r, i) {
            a.privateGetItem(e).forEach(function(e) {
                if (e) {
                    var o = e[r] === i;
                    if (e._combo) {
                        var l = w(e, null, !0);
                        l.nodes.forEach(function(e) {
                            !!e[r] === i && (o = !0, t[e.id] = !0)
                        }), l.links.forEach(function(e) {
                            !!e[r] === i && (o = !0, t[e.id] = !0)
                        }), o && (n[e.id] = !0)
                    }
                    for (var u = a.privateGetParentItems(e.id), c = u.length - 1; c >= 0; c--) {
                        var s = u[c],
                            f = "node" === e.type && o && "hi" === r;
                        (f || !!s[r] === i) && (n[s.id] = !0, o = !0)
                    }
                }
            })
        }

        function K(t, n, r) {
            a.privateGetRawItems().forEach(function(i) {
                var a = e.isComboNodeId(i.id) && $(i.id);
                !a || i.bg && !t[i.id] || (delete t[i.id], delete n[i.id], i.bg || (r[i.id] = !0))
            })
        }

        function z(e, t, n, r, i, o, l) {
            var u = {
                toShow: [],
                toHide: []
            };
            u[r] = {
                nodes: [],
                links: []
            }, u[i] = {
                nodes: [],
                links: []
            }, "hi" === e && (u.combos = {
                nodes: [],
                links: []
            });
            var c = {},
                s = le.makeIdMap(t),
                f = le.makeIdMap(n),
                d = t,
                g = n;
            return o && o.all && (d = o.all[r].nodes.concat(o.all[r].links), g = o.all[i].nodes.concat(o.all[i].links)), U(d, s, c, e, !0), U(g, f, c, e, !1), l || "bg" !== e || K(c, s, f), u = Y(u, e, c, s, f), a.privateGetItem(Object.keys(s)).forEach(function(e) {
                null !== e && (u.toShow.push(e.id), u[r][e.type + "s"].push(e.id))
            }), a.privateGetItem(Object.keys(f)).forEach(function(e) {
                null !== e && (u.toHide.push(e.id), u[i][e.type + "s"].push(e.id))
            }), u
        }

        function O() {
            var e = a.privateGetRawItems(),
                t = {
                    nodes: [],
                    links: []
                };
            return e.filter(function(e) {
                return e._combo
            }).forEach(function(e) {
                var n = e._combo;
                t[e.id] = le.clone(e, "d"), t[e.id]._combo = le.clone(n), "node" === e.type && (t[e.id]._offsets = le.clone(n.nodeIds.map(function(e) {
                    return a.privateGetItem(e)._offset
                }), !0))
            }), t
        }

        function D(e, t) {
            var n = e.combos,
                r = e.items,
                i = {},
                a = [];
            Object.keys(n).forEach(function(e) {
                var t = n[e];
                if (t._combo && ("node" === t.type || "link" === t.type)) {
                    var o = t._offsets;
                    if (delete t._offsets, "node" === t.type) {
                        if (t._combo.nodeIds.forEach(function(e, n) {
                                i[e] = {
                                    _parentId: t.id,
                                    _offset: o[n]
                                }
                            }), !("g" in t._combo) && (t._combo.g = null, t.g && t.g.length)) {
                            var l = t.g[0];
                            le.stringIsPositiveInteger(l.t) && (t._combo.g = l.p)
                        }
                        t.oc && "w" in t.oc || (a.push(e), t.oc = t.oc || {}, t.oc.w = 0)
                    }
                    t._combo.linkIds.forEach(function(e) {
                        i[e] = {
                            _parentId: t.id
                        }
                    });
                    var u;
                    u = "node" === t.type ? b() : p(), le.merge(u, t._combo), t._combo = u, r.push(t)
                }
            }), r.forEach(function(e) {
                i[e.id] && le.merge(e, i[e.id])
            }), le.invoke(t, a)
        }

        function _(e, t) {
            var n = {},
                i = [],
                a = e.combos;
            a.nodes.forEach(function(t) {
                var r = t.nodes.map(function(n) {
                        var r = le.merge({
                            _parentId: t.id,
                            _offset: {
                                x: n.x || 0,
                                y: n.y || 0
                            }
                        }, n);
                        return e.items.push(r), n.id
                    }),
                    a = b();
                a.nodeIds = r, n[t.id] = {
                    type: "node",
                    _combo: a,
                    oc: {
                        w: 0
                    }
                }, i.push(t.id)
            });
            var o = e.items;
            o.forEach(function(e) {
                if (n[e.id] && (le.merge(e, n[e.id]), e._combo.g = null, e.g && e.g.length > 0)) {
                    var t = e.g[0];
                    le.stringIsPositiveInteger(t.t) && (e._combo.g = t.p)
                }
                "link" === e.type && r(e.id) && le.merge(e, {
                    _combo: {
                        linkIds: []
                    }
                })
            }), le.invoke(t, i)
        }

        function P(e, t, n) {
            var r = L({
                animate: !1
            });
            t && t.forEach(function(e) {
                r.layoutCombo(e)
            });
            var i = e.combos;
            i && i.links && i.links.length && F(r, i.links), r.applyUpdates(n)
        }

        function j(e, t) {
            if (ce = 0, e && e.combos) {
                var n = e.combos;
                n.links && n.links.length || n.nodes && n.nodes.length ? _(e, t) : D(e, t)
            } else le.invoke(t)
        }

        function J(e) {
            var t = L({
                animate: !1
            });
            e.forEach(function(e) {
                t.setComboMinimumSize(e)
            }), t.applyUpdates()
        }

        function Q(e, t, n) {
            te(e, !0, t, n)
        }

        function q(e, t, n) {
            te(e, !1, t, n)
        }

        function $(e) {
            var t = a.privateGetItem(e);
            return !!(t && t._combo && "node" === t.type && t._combo.open)
        }

        function ee(e, t, n) {
            var r = le.defaults(t, {
                animate: !0,
                time: 300,
                name: "lens",
                resize: !0,
                easing: "cubic",
                adapt: !0
            });
            if (r.arrange = r.name, !r.resize && "none" === r.name) return void le.invoke(n);
            var i = le.ensureArray(e),
                a = i.filter(function(e) {
                    return B(e, "node")
                }),
                o = L(r);
            E(o, a, r), l.trigger("prechange", "arrange combo"), o.applyUpdates(n)
        }

        function te(e, t, n, r) {
            if (!o || !o.api.isShown()) {
                var i, u = le.ensureArray(e),
                    c = le.defaults(n, {
                        animate: !0,
                        time: 300,
                        easing: "cubic",
                        adapt: !0,
                        updateGlyph: !1
                    }),
                    s = a.options().truncateLabels;
                s && (i = s.maxLength);
                var f = t ? "open" : "close",
                    d = L(c),
                    g = re(u, t);
                if (!g.length) return void le.invoke(r);
                g.sort(function(e, t) {
                    return M(e.id) - M(t.id)
                }).forEach(function(e) {
                    var n = ie(e, t, i);
                    d.setComboSubProperty(e.id, "open", t), d.setComboSubProperty(e.id, "e", t ? 1 : n.sizeRatio), d.adjustForNewComboSize(e.id, n.sizeDiff, c.adapt)
                }), l.trigger("prechange", f), d.applyUpdates(function() {
                    c.animate && t || a.applyRevealedLinkOffsets(g), a.privateSetAllItemsInComboDirty(u), le.invoke(r)
                }, function() {
                    c.animate && t && a.applyRevealedLinkOffsets(g)
                })
            }
        }

        function ne(e) {
            var t = a.privateGetItem(e);
            if (t && "node" === t.type && t._combo) te(e, !t._combo.open);
            else if (t._parentId) {
                var n = a.privateGetItem(t._parentId);
                n && "node" === n.type && n._combo && te(n.id, !1)
            }
        }

        function re(e, t) {
            return a.privateGetItem(e).filter(function(e) {
                return e && "node" === e.type && e._combo && e._combo.open === !t
            })
        }

        function ie(e, t, n) {
            var r = a.privateGetCanvas(),
                i = ue.nodeSize(e, r, !1, n, !0).radius,
                o = ue.nodeSize(e, r, !1, n, !1).radius,
                l = t ? i - o : o - i;
            return {
                sizeDiff: l,
                sizeRatio: 0 === i ? 1 : o / i
            }
        }

        function ae(e, t, n, r) {
            function i(n, r) {
                e[n] || (e[n] = {}), e[n][r] = t[n][r]
            }
            "shown" === n && (e.combos = t.combos), i(n, "nodes"), i(n, "links"), i(r, "nodes"), i(r, "links")
        }
        var oe = KeyLines.ModelUpdates,
            le = KeyLines.Util,
            ue = KeyLines.Layouts.Util.create(),
            ce = 0;
        c();
        var se = {
            api: {
                combine: x,
                combineNodes: x,
                uncombine: C,
                info: G,
                isCombo: A,
                find: R,
                transfer: W,
                open: Q,
                close: q,
                isOpen: $,
                arrange: ee,
                reveal: function(e) {
                    return a.privateReveal(e)
                }
            },
            internalUse: {
                hide: function(e, t) {
                    var n = se.internalUse.filter([], e, {}, t);
                    return n.toHide
                },
                show: function(e) {
                    var t = se.internalUse.filter(e, [], {}, {
                        updateGlyph: !0
                    });
                    return t.toShow
                },
                filter: function(e, t, n, r) {
                    var i = z("hi", e, t, "shown", "hidden", n);
                    return r.updateGlyph && N(i.combos.nodes.map(function(e) {
                        return {
                            id: e.id,
                            count: e.nodes.length
                        }
                    })), ae(n, i, "shown", "hidden"), i
                },
                foreground: function(e, t, n, r) {
                    var i = z("bg", e, t, "foreground", "background", n, r.foregroundOpenCombos);
                    return ae(n, i, "foreground", "background"), i
                },
                preMerge: T,
                preDelete: X,
                serialize: O,
                preLoadUp: j,
                postLoadUp: P,
                dblclick: ne,
                ensureMinimumOpenComboSize: J
            }
        };
        return se
    }, e.isComboLinkId = function(e) {
        return 0 === e.indexOf(n)
    };
    var r = e.isComboLinkId;
    e.isComboNodeId = function(e) {
        return 0 === e.indexOf(t)
    };
    var i = 8;
    e.openComboPadding = i
}(),
function() {
    "use strict";
    var e = KeyLines.WebGL;
    if (e) {
        var t = 2048,
            n = 256,
            r = n / 2;
        e.FontIconAtlas = function(e, t, a) {
            var o = Object.keys(e),
                l = document.createElement("canvas");
            if (l.id = "webglFontIconDebugCanvas", l.width = 1, l.height = 1, o.length) {
                var u = i(o.length),
                    c = l.getContext("2d");
                l.width = u, l.height = u;
                var s = document.getElementById("webglFontIconDebugCanvas");
                a && (s ? s.parentNode.replaceChild(l, s) : document.getElementsByTagName("body")[0].appendChild(l));
                var f = 4,
                    d = n - 2 * f,
                    g = r,
                    h = 0,
                    v = 1 / u;
                c.fillStyle = "rgb(0,0,0)", c.textAlign = "center";
                var m = 0,
                    y = ["rgba(255,0,0,1)", "rgba(0,255,0,1)", "rgba(0,0,255,1)", "rgba(0,0,0,0)"];
                c.fillStyle = "black", c.fillRect(0, 0, u, u), c.fillStyle = y[0], c.globalCompositeOperation = "lighter";
                for (var b = 0, p = o.length; p > b; b++) {
                    var I = e[o[b]],
                        x = KeyLines.Rendering.measureText(c, o[b], d, !1, I.ff || t, !0),
                        C = Math.max(x.width, x.height),
                        w = 0;
                    if (C > d) {
                        var G = d / C;
                        C = d * G, w = (d - C) / 2
                    }
                    if (g + n > u + 128 && (g = r, h += n), h >= u) {
                        if (g = r, h = 0, m++, m > 2) throw Error("Maximum number of icons exceeded!");
                        c.fillStyle = y[m]
                    }
                    I.colourComponentTexture = m, I.u1 = (g - d / 2) * v, I.v1 = h * v, I.u2 = (g + d / 2) * v, I.v2 = (h + d) * v, c.textBaseline = "top", c.font = C + "px " + KeyLines.Util.escapeFontFamily(I.ff || t), c.fillText(o[b], g, h + w), g += n
                }
            }
            return {
                alphaChannel: !1,
                img: l,
                texture: null
            }
        };
        var i = function(e) {
            for (var n = 512, r = 12; t > n;) {
                if (r >= e) return n;
                n *= 2, r *= 4
            }
            return t
        }
    }
}();;