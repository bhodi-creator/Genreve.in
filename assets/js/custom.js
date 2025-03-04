function slider() {
    const e = $(".main-slider");
    let t = $(".nav-slider"),
        n = new TimelineLite();
    return {
        isDemoSlide: function () {
            return e.hasClass("demo-3");
        },
        initSlider: function () {
            let t = e.find(".slide-item"),
                n = e.find(".dsn-slider-content > .content-slider"),
                i = this,
                o = [];
            t.each(function (e) {
                let t = $(this);
                t.attr("data-dsn-id", e);
                let s = $(this).find(".slide-content");
                s.attr("data-dsn-id", e), 0 === e && s.addClass("dsn-active dsn-active-cat"), n.append(s);
                let a = s.find(".title a");
                i.isDemoSlide() || o.push(i.nextSlide(a.text(), s.find(".metas").html(), $(this).find(".image-bg").clone())), dsnGrid.convertTextLine(a, a), (t = s = a = null);
            }),
                i.isDemoSlide() || (o.push(o.shift()), $(".box-next > .swiper-wrapper").append(o)),
                (o = i = n = t = null);
        },
        swiperObject: function (t, n = !0) {
            return new Swiper(".main-slider .slide-inner", {
                speed: 1500,
                grabCursor: !0,
                allowTouchMove: !0,
                direction: n ? "vertical" : "horizontal",
                slidesPerView: t ? "auto" : 1,
                centeredSlides: t,
                slideToClickedSlide: t,
                loop: e.hasClass("has-loop"),
                pagination: {
                    el: ".main-slider .dsn-controls .dsn-numbers span:not(.full-number)",
                    type: "custom",
                    clickable: !0,
                    renderCustom: function (e, t, n) {
                        return (
                            $(".main-slider .dsn-controls .dsn-numbers span.full-number").html(dsnGrid.numberText(n)),
                            TweenLite.to(".main-slider .dsn-controls .dsn-progress .dsn-progress-indicator", 1, { height: (t / n) * 100 + "%" }),
                            dsnGrid.numberText(t)
                        );
                    },
                },
                spaceBetween: 50,
                on: {
                    init: function () {
                        this.autoplay.stop(),
                            e.find('[data-dsn="video"] video').each(function () {
                                this.pause();
                            });
                    },
                    imagesReady: function () {
                        let e = $(this.slides[this.activeIndex]).find('[data-dsn="video"] video');
                        e.length && e.get(0).play(), (e = null);
                    },
                },
            });
        },
        progress: function (e, t = !0) {
            e.on("progress", function () {
                let e = this;
                for (let n = 0; n < e.slides.length; n++) {
                    let i = e.slides[n].progress,
                        o = 0.5 * (t ? e.height : e.width),
                        s = i * o,
                        a = t ? "Y" : "X";
                    (e.slides[n].querySelector(".image-bg").style.transform = "translate" + a + "(" + s + "px) skew" + a + "(" + s / 50 + "deg)"), (s = a = o = i = null);
                }
                e = null;
            });
        },
        touchStart: function (e) {
            e.on("touchStart", function () {
                $(this.slides).css("transition", "");
            });
        },
        setTransition: function (e) {
            e.on("setTransition", function (e) {
                $(this.slides)
                    .find(".image-bg")
                    .css("transition", e - 100 + "ms  ");
            });
        },
        slideChange: function (t) {
            let i = this;
            t.on("slideChange", function () {
                let o = e.find(".dsn-slider-content .dsn-active"),
                    s = o.data("dsn-id"),
                    a = $(t.slides[t.activeIndex]),
                    l = a.data("dsn-id");
                if (s === l) return;
                e.find('[data-dsn="video"] video').each(function () {
                    this.pause();
                });
                let r = $(this.slides[this.activeIndex]).find('[data-dsn="video"] video');
                r.length && r.get(0).play();
                let d = o.find(".dsn-chars-wrapper");
                o.removeClass("dsn-active-cat");
                let c = e.find('.dsn-slider-content [data-dsn-id="' + l + '"]'),
                    u = c.find(".dsn-chars-wrapper"),
                    f = s > l;
                n.progress(1),
                    (n = new TimelineLite()).staggerFromTo(d, 0.3, i.showText().title, i.hideText(f).title, 0.05, 0, function () {
                        e.find(".dsn-slider-content .slide-content").removeClass("dsn-active").removeClass("dsn-active-cat"), c.addClass("dsn-active"), c.addClass("dsn-active-cat");
                    }),
                    n.staggerFromTo(dsnGrid.randomObjectArray(u, 0.8), 0.8, i.hideText(!f).title, i.showText().title, 0.05, "-=.1"),
                    (o = s = a = l = r = d = u = f = null);
            });
        },
        showText: function () {
            return { title: { autoAlpha: 1, y: "0%", scale: 1, rotation: 0, ease: Back.easeOut.config(4), yoyo: !0 }, subtitle: { autoAlpha: 1, y: "0%", ease: Elastic.easeOut } };
        },
        hideText: function (e) {
            return { title: { autoAlpha: 0, y: e ? "20%" : "-20%", rotation: 8, ease: Back.easeIn.config(4), yoyo: !0 }, subtitle: { autoAlpha: 0, y: e ? "50%" : "-50%", ease: Elastic.easeOut } };
        },
        nextSlide: function (e, t, n) {
            return (
                ' <div class="swiper-slide">\n                    <div class="d-flex a-item-center h-100">\n                        <div class="content-box-next">\n                            <span>Next</span>\n                            <h3 class="title-next">' +
                e +
                '</h3>\n                            <div class="metas">\n' +
                t +
                '                            </div>\n                        </div>\n                        <div class="img-box-next p-relative h-100 overflow-hidden">\n' +
                n.addClass("p-absolute").removeClass("hidden").get(0).outerHTML +
                '                            <div class="arrow v-middle">\n                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"\n                                     x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve" class="">\n                            <g>\n                                <g>\n                                    <g>\n                                        <path\n                                                d="M508.875,248.458l-160-160c-4.167-4.167-10.917-4.167-15.083,0c-4.167,4.167-4.167,10.917,0,15.083l141.792,141.792    H10.667C4.771,245.333,0,250.104,0,256s4.771,10.667,10.667,10.667h464.917L333.792,408.458c-4.167,4.167-4.167,10.917,0,15.083    c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125l160-160C513.042,259.375,513.042,252.625,508.875,248.458z    "\n                                                data-original="#000000" class="active-path" data-old_color="#000000"\n                                                fill="#FFFFFF"/>\n                                    </g>\n                                </g>\n                            </g>\n                        </svg>\n                            </div>\n                        </div>\n                    </div>\n                </div>'
            );
        },
        run: function () {
            if (e.length <= 0) return;
            let i = e.hasClass("has-horizontal");
            this.initSlider();
            let o = this.swiperObject(this.isDemoSlide(), !i);
            if ((this.isDemoSlide() || (this.progress(o, !i), this.touchStart(o), this.setTransition(o)), this.slideChange(o), this.isDemoSlide() && !e.hasClass("has-loop") && o.slideTo(1), t.length <= 0 || this.isDemoSlide()))
                return void (o = null);
            let s = new Swiper(".nav-slider", { speed: 1500, centeredSlides: !0, touchRatio: 0.2, slideToClickedSlide: !0, direction: i ? "horizontal" : "vertical", resistanceRatio: 0.65, spaceBetween: 10, loop: e.hasClass("has-loop") });
            (o.controller.control = s),
                (s.controller.control = o),
                this.progress(s, !i),
                this.setTransition(s),
                t.on("click", function () {
                    n.isActive() || (s.slides.length === s.activeIndex + 1 ? o.slideTo(0) : o.slideNext());
                }),
                (t = null);
        },
    };
}
function data_overlay() {
    $("[data-overlay-color]").each(function (e) {
        var t = $(this),
            n = dsnGrid.removeAttr(t, "data-overlay-color");
        t.addClass("dsn-overlay-" + e), $("body").append("<style>.dsn-overlay-" + e + "[data-overlay]:before{background: " + n + ";}</style>");
    });
}
function background() {
    $(".cover-bg, section , [data-image-src]").each(function () {
        var e = $(this).attr("data-image-src");
        void 0 !== e && !1 !== e && $(this).css("background-image", "url(" + e + ")");
    });
}
function initMap() {
    toggleButton();
    let e = $(".map-custom");
    if (!e.length) return void (e = null);
    if (!$("#map_api").length) {
        let e = "AIzaSyA5bpEs3xlB8vhxNFErwoo3MXR64uavf6Y",
            t = document.createElement("script");
        (t.type = "text/javascript"), (t.id = "map_api"), (t.src = "https://maps.googleapis.com/maps/api/js?key=" + e), document.body.appendChild(t), (e = t = null);
    }
    setTimeout(function () {
        try {
            let t = e.data("dsn-lat"),
                n = e.data("dsn-len"),
                i = e.data("dsn-zoom"),
                o = new google.maps.LatLng(t, n),
                s = new google.maps.Map(e.get(0), {
                    center: { lat: t, lng: n },
                    mapTypeControl: !1,
                    scrollwheel: !1,
                    draggable: !0,
                    streetViewControl: !1,
                    navigationControl: !1,
                    zoom: i,
                    styles: [
                        { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }, { lightness: 17 }] },
                        { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 20 }] },
                        { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#ffffff" }, { lightness: 17 }] },
                        { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }] },
                        { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 18 }] },
                        { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#ffffff" }, { lightness: 16 }] },
                        { featureType: "poi", elementType: "geometry", stylers: [{ color: "#f5f5f5" }, { lightness: 21 }] },
                        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#dedede" }, { lightness: 21 }] },
                        { elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }] },
                        { elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }] },
                        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                        { featureType: "transit", elementType: "geometry", stylers: [{ color: "#f2f2f2" }, { lightness: 19 }] },
                        { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#fefefe" }, { lightness: 20 }] },
                        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }] },
                    ],
                });
            google.maps.event.addDomListener(window, "resize", function () {
                let e = s.getCenter();
                google.maps.event.trigger(s, "resize"), s.setCenter(e), (e = null);
            }),
                new google.maps.Marker({ position: o, animation: google.maps.Animation.BOUNCE, icon: "assets/img/map-marker.png", title: "ASL", map: s }),
                (t = n = i = o = null);
        } catch (e) {
            console.log(e);
        }
    }, 500);
}
function toggleButton() {
    $(".image-head-contact").each(function () {
        let e = new TimelineLite({ paused: !0 });
        e.to($(this).find(".box-overlay"), 0.5, { autoAlpha: 0 }),
            e.staggerTo($(this).find(".contact-info-item"), 0.8, { y: 20, autoAlpha: 0, ease: Back.easeInOut.config(4) }, 0.3, 0),
            e.to($(this).find(".box-text"), 0.5, { autoAlpha: 0 }, "-=0.5"),
            e.reverse(),
            $(this).find('input[type="checkbox"]').off("change"),
            $(this)
                .find('input[type="checkbox"]')
                .on("change", function () {
                    e.reversed(!e.reversed());
                });
    });
}
function services_tab(e) {
    e && $(".services-about .link-click").off("click"),
        $(".services-about").each(function () {
            let e = $(this);
            e.on("click", ".link-click", function () {
                $(this).addClass("active").siblings().removeClass("active"),
                    e
                        .find("#" + $(this).attr("id") + "-content")
                        .fadeIn(1e3)
                        .siblings()
                        .hide();
            });
        });
}
function contactValidator() {
    var e = $("#contact-form");
    e < 1 ||
        (e.validator(),
        e.on("submit", function (t) {
            if (!t.isDefaultPrevented()) {
                return (
                    $.ajax({
                        type: "POST",
                        url: "contact.php",
                        data: $(this).serialize(),
                        success: function (t) {
                            var n = "alert-" + t.type,
                                i = t.message,
                                o = '<div class="alert ' + n + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + i + "</div>";
                            n && i && (e.find(".messages").html(o), e[0].reset()),
                                setTimeout(function () {
                                    e.find(".messages").html("");
                                }, 3e3);
                        },
                        error: function (e) {
                            console.log(e);
                        },
                    }),
                    !1
                );
            }
        }));
}
!(function (e) {
    "use strict";
    function t(t) {
        e("[data-dsn-bg]").each(function () {
            let t = dsnGrid.getData(this, "bg"),
                n = dsnGrid.getData(this, "color");
            t && e(this).css("background-color", t), t && (e(this).css("color", n), e(this).addClass("section-dsn-color")), (t = null);
        }),
            d.start(),
            c.allInt(),
            slider().run(),
            e(".gallery-portfolio").each(function () {
                let t = e(this);
                t.justifiedGallery({ rowHeight: 300, margins: 15 });
                let n = t.parents(".work-masonry").find(".filterings-t");
                n.length &&
                    (n.find("button").off("click"),
                    n.find("button").on("click", function () {
                        e(this).addClass("active").siblings().removeClass("active");
                        let n = e(this).data("filter");
                        t.justifiedGallery({
                            filter: function (t, i, o) {
                                return e(t).is(n) ? TweenLite.to(t, 0.6, { scale: 1, ease: Back.easeOut.config(1.2), delay: 0.1 * i }) : TweenLite.to(t, 0.1, { scale: 0, ease: Back.easeIn.config(1.2) }), e(t).is(n);
                            },
                        }),
                            (n = null);
                    })),
                    (n = null);
            }),
            s(),
            (function () {
                let t = {
                    delegate: "a:not(.effect-ajax)",
                    type: "image",
                    closeOnContentClick: !1,
                    closeBtnInside: !1,
                    mainClass: "mfp-with-zoom",
                    gallery: { enabled: !0 },
                    zoom: {
                        enabled: !0,
                        duration: 400,
                        easing: "cubic-bezier(0.36, 0, 0.66, -0.56)",
                        opener: function (e) {
                            return e.find("img");
                        },
                    },
                    callbacks: {
                        open: function () {
                            e("html").css({ margin: 0 });
                        },
                        close: function () {},
                    },
                };
                e(".gallery-portfolio").each(function () {
                    e(this).magnificPopup(t);
                }),
                    e(".has-popup .pop-up").length && (t.delegate = "a.pop-up");
                e(".has-popup").magnificPopup(t);
            })(),
            e("a.vid").YouTubePopUp(),
            i().ajaxLoad(),
            data_overlay(),
            background(),
            initMap(),
            n(t),
            (function () {
                const t = e(".button-loadmore");
                if (!t.length) return;
                t.off("click"),
                    t.on("click", function () {
                        let o = e(this).attr("data-page"),
                            l = e(this).attr("data-layout"),
                            r = t.find(".dsn-load-progress-ajax"),
                            d = t.find(".progress-text.progress-load-more"),
                            u = t.find(".progress-text.progress-no-more"),
                            f = d.text();
                        e(this).attr("data-page", parseInt(o, 10) + 1),
                            e
                                .ajax({
                                    url: "ajax/" + l + "-" + o + ".html",
                                    beforeSend: function () {
                                        t.addClass("dsn-loading");
                                    },
                                    success: function (o) {
                                        (o = e(o).filter(".work-item-box")),
                                            TweenLite.fromTo(o, 1, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.7) }),
                                            t.prev().append(o),
                                            t.removeClass("dsn-loading"),
                                            r.css("width", 0),
                                            t.find(".progress-text.progress-load-more").text(f),
                                            u.hide(),
                                            setTimeout(function () {
                                                c.parallaxImg(), n(!0), i().ajaxLoad(), s(), a(!0);
                                            }, 100);
                                    },
                                    error: function (e) {
                                        t.removeClass("dsn-loading"), r.css("width", 0), d.text(f), u.hide(), t.off("click"), d.hide(), u.show();
                                    },
                                    xhrFields: {
                                        onprogress: function (e) {
                                            if (e.lengthComputable) {
                                                let t = (e.loaded / e.total) * 100;
                                                r.css("width", t + "%"), d.text(t + "%");
                                            }
                                        },
                                    },
                                })
                                .done(function () {
                                    o = l = r = d = u = f = null;
                                });
                    });
            })(),
            u.run(),
            a(t),
            (function (t) {
                let n = e(".accordion__question");
                if (!n.length) return void (n = null);
                t && n.off("click");
                n.on("click", function () {
                    let t = e(this).next();
                    e(".accordion__answer").not(t).slideUp(400), e(".accordion__question").not(this).removeClass("expanded"), e(this).toggleClass("expanded"), t.slideToggle(400), (t = null);
                });
            })(t),
            services_tab(t),
            contactValidator(),
            e(".embed-3d-dimensions").on("click", function (t) {
                e(this).toggleClass("active-3d-dimensions");
            }),
            e('[data-dsn-cutter="html"]').each(function () {
                dsnGrid.getData(this, "cutter"), dsnGrid.cutterHtml(this);
            }),
            e("[data-dsn-position]").each(function () {
                "IMG" === this.nodeName ? e(this).css("object-position", dsnGrid.getData(this, "position", "center")) : e(this).css("background-position", dsnGrid.getData(this, "position", "center"));
            }),
            setTimeout(function () {
                e('a[href="#"]').on("click", function (e) {
                    e.preventDefault();
                }),
                    e('[href*="#"]:not([href="#"])').on("click", function (t) {
                        t.preventDefault();
                        let n = e(e(this).attr("href"));
                        if (!n.length) return (n = null), !1;
                        dsnGrid.scrollTop(n.get(0).offsetTop, 1, -100), (n = null);
                    }),
                    window.location.hash.length && (l.scrollTop(0), dsnGrid.scrollTop(window.location.hash, 1, -100)),
                    c.dsnScrollTop(),
                    t ? f && (f.t1.kill(), f.t2.kill(), e(".site-header").css({ paddingTop: "", paddingBottom: "", backgroundColor: "", top: "" }), (f = o())) : (f = o());
            }, 500);
    }
    function n(t) {
        let n,
            i = e(".filterings"),
            o = e(".filters-content");
        t && i.off("click"),
            i.on("click", function () {
                (n = new TimelineLite()).set(o, { y: "0%" }),
                    n.to(o, 1, { autoAlpha: 1 }),
                    n.staggerFromTo(o.find("button"), 0.4, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: Back.easeOut.config(1.7) }, 0.1),
                    dsnGrid.scrollTop(".work-inner", 1);
            }),
            t && o.find("> .close-wind").off("click"),
            o.find("> .close-wind").on("click", function () {
                n.reverse(),
                    n.call(function () {
                        n = null;
                    });
            }),
            t && o.find("button").off("click"),
            o.find("button").on("click", function () {
                e(this).siblings().removeClass("active"), TweenMax.to(this, 0.5, { css: { className: "+=active" }, ease: Back.easeOut.config(1.7) }), e(".projects-list").isotope({ filter: e(this).attr("data-filter") });
            }),
            e(".projects-list , .our-work")
                .find("video")
                .each(function () {
                    this.pause();
                    let n = e(this);
                    t && n.off("mouseenter").off("mouseleave"),
                        n
                            .parents(".work-item")
                            .on("mouseenter", function () {
                                e(this).find("video").get(0).play();
                            })
                            .on("mouseleave", function () {
                                e(this).find("video").get(0).pause();
                            }),
                        (n = null);
                });
    }
    function i() {
        let n,
            i,
            o = "main.main-root",
            s = '[data-dsn-ajax="img"]',
            a = new TimelineLite();
        return {
            mainRoot: e(o),
            ajaxClick: e("a.effect-ajax "),
            effectAjax: function (e) {
                if (e) r.addClass("dsn-ajax-effect");
                else {
                    if (!1 !== e) return r.hasClass("dsn-ajax-effect");
                    r.removeClass("dsn-ajax-effect");
                }
            },
            setTitle: function (t) {
                let n = t.match(/<title[^>]*>(.+)<\/title>/);
                n && e("head title").html(n[1]), (n = null);
            },
            setBodyClass: function (e) {
                let t = e.match(/<body[^>]*class="(.+)">/);
                t && r.attr("class", t[1]), (t = null);
            },
            ajaxNormal: function () {
                let t = e('<div class="dsn-ajax-loader dsn-ajax-normal"></div>');
                r.append(t), a.to(t, 0.5, { scaleY: 1, ease: Circ.easeIn }, 0), (t = null);
            },
            ajaxSlider: function (t) {
                let n = t.parents(".slide-content"),
                    i = n.data("dsn-id"),
                    o = e('.main-slider .slide-item[data-dsn-id="' + i + '"] .cover-bg').first(),
                    s = n.find(".title");
                o.removeClass("hidden"), this.dsnCreateElement(o, e(".bg-container"), s, s.find("a"));
            },
            ajaxNextProject: function (e) {
                let t = e.parents(".next-project"),
                    n = t.find(".img-next-box"),
                    i = t.find(".title");
                t.addClass("dsn-active"), this.dsnCreateElement(n, t, i, i.find("a")), (t = n = i = null);
            },
            ajaxWork: function (e) {
                let t = e.parents(".work-item"),
                    i = t.find(".img-next-box"),
                    o = t.find("h4").addClass("dsn-cutter");
                o.addClass("fw-600"), i.addClass("before-z-index"), t.addClass("dsn-active"), this.dsnCreateElement(i, t, o, o.find("a")), a.to(n.find("img"), 1, { height: "100%", top: "0%", y: "0" }), (t = i = o = null);
            },
            addElement: function (e, t, n) {
                if (void 0 === t || t.length <= 0) return;
                (void 0 === n || n.length <= 0) && (n = t);
                let i = t.clone(),
                    o = n[0].getBoundingClientRect();
                return void 0 === o && (o = { left: 0, top: 0 }), i.css({ position: "absolute", display: "block", transform: "", transition: "", objectFit: "cover" }), i.css(dsnGrid.getBoundingClientRect(n[0])), e.append(i), i;
            },
            dsnCreateElement: function (t, o, s, l) {
                let d = e('<div class="dsn-ajax-loader"></div>');
                d.css("background-color", r.css("background-color")),
                    (n = this.addElement(d, t, o)),
                    (i = this.addElement(d, s, l)).hasClass("dsn-cutter") && dsnGrid.convertTextLine(i),
                    i && (i.css("width", "max-content"), i.css("z-index", 2)),
                    n && n.css("z-index", 1),
                    r.append(d),
                    a.to(d, 1, { autoAlpha: 1, ease: Power4.easeInOut });
            },
            completeElement: function (t) {
                let o = e(s),
                    l = e('[data-dsn-ajax="title"]');
                if (!o.length && !l.length) {
                    let e = { value: "0%" };
                    return void a.to(e, 1, {
                        value: "100%",
                        onUpdate: function () {
                            t.css("clip-path", "inset(0% 0% " + e.value + " 0%)");
                        },
                        onComplete: function () {
                            e = null;
                        },
                        ease: Circ.easeIn,
                    });
                }
                let r = (o = o.first()).offset();
                if (
                    (void 0 === r && (r = { top: 0, left: 0 }),
                    n.length && a.to(n, 0.8, { top: r.top, left: r.left, width: o.width(), height: o.height(), objectFit: "cover", borderRadius: 0 }),
                    i.length &&
                        ((l = l.first()),
                        void 0 === (r = l.offset()) && (r = { top: 0, left: 0 }),
                        a.to(i, 0.8, { top: r.top, left: r.left }, "-=0.8"),
                        a.to(i, 0.8, { css: { className: "+=" + l.attr("class") } }, "-=0.8"),
                        l.parents(".v-middle-horizontal").length ? i.css("width", "max-content") : i.css("width", l.width()),
                        l.find(".dsn-chars-wrapper").length))
                ) {
                    let e = l.find(".dsn-chars-wrapper").css("transform").split(/[()]/)[1];
                    e && (e = e.split(",")[5]), e && a.staggerTo(dsnGrid.randomObjectArray(i.find(".dsn-chars-wrapper"), 0.5), 0.6, { force3D: !0, y: e, ease: Back.easeOut.config(1.7) }, 0.04, "-=0.8");
                }
                let d = { value: "0%" };
                a.to(d, 0.5, {
                    value: "100%",
                    onUpdate: function () {
                        t.css("clip-path", "inset(0% 0% " + d.value + " 0%)");
                    },
                    onComplete: function () {
                        d = null;
                    },
                    ease: Circ.easeIn,
                });
            },
            animateAjaxStart: function (e, t) {
                (a = new TimelineMax()),
                    "slider" === e ? this.ajaxSlider(t) : "next" === e ? this.ajaxNextProject(t) : "work" === e ? this.ajaxWork(t) : this.ajaxNormal(),
                    d.locked(),
                    a.call(function () {
                        dsnGrid.scrollTop(0, 0.01);
                    });
            },
            animateAjaxEnd: function (n) {
                this.setTitle(n),
                    this.setBodyClass(n),
                    this.mainRoot.html(e(n).filter(o).html()),
                    t(!0),
                    setTimeout(
                        function () {
                            let t = e(".dsn-ajax-loader");
                            t.hasClass("dsn-ajax-normal") ? a.to(t, 1, { scaleY: 0 }) : this.completeElement(t),
                                a.call(
                                    function () {
                                        t.remove(), this.effectAjax(!1), (a = s = o = null);
                                    }.bind(this)
                                );
                        }.bind(this),
                        100
                    );
            },
            backAnimate: function (t) {
                if (!t) return;
                let n = this;
                e.ajax({
                    url: t,
                    dataType: "html",
                    beforeSend: n.animateAjaxStart.bind(n),
                    success: function (e) {
                        a.call(n.animateAjaxEnd.bind(n, e), null, null, "+=0.2");
                    },
                    error: function (e) {
                        window.location = t;
                    },
                });
            },
            ajaxLoad: function () {
                if (!r.hasClass("dsn-ajax")) return;
                let t = this;
                this.ajaxClick.off("click"),
                    this.ajaxClick.on("click", function (n) {
                        n.preventDefault();
                        let i = e(this),
                            o = i.attr("href"),
                            s = i.data("dsn-ajax");
                        o.indexOf("#") >= 0 || void 0 === o
                            ? (i = o = s = null)
                            : t.effectAjax() ||
                              (t.effectAjax(!0),
                              e.ajax({
                                  url: o,
                                  dataType: "html",
                                  beforeSend: t.animateAjaxStart.bind(t, s, i),
                                  success: function (e) {
                                      try {
                                          history.pushState(null, "", o), a.call(t.animateAjaxEnd.bind(t, e), null, null, "+=0.2");
                                      } catch (e) {
                                          window.location = o;
                                      }
                                  },
                                  error: function (e) {
                                      window.location = o;
                                  },
                              }));
                    });
            },
        };
    }
    function o() {
        e(".site-header").removeClass("header-stickytop");
        let t = 0;
        var n = e(".wrapper").offset(),
            i = e(".header-single-post .containers").offset(),
            o = e(".post-full-content").offset(),
            s = 0;
        void 0 !== i ? (n = i) : n.top <= 70 && (n = o);
        var a = new TimelineMax({ paused: !0 }),
            r = new TimelineMax({ paused: !0 });
        return (
            a.to(".header-top .header-container, .site-header ", 0.5, { backgroundColor: "#000", paddingTop: 15, paddingBottom: 15 }),
            a.reverse(),
            r.to(".header-top .header-container,  .site-header , .dsn-multi-lang", 0.5, { top: -70 }),
            r.reverse(),
            d.getListener(function (e) {
                t = "scroll" === e.type ? l.scrollTop() : e.offset.y;
                let i = 70;
                void 0 !== n && (i = n.top - 100), t > i ? (a.play(), s < t ? r.play() : r.reverse()) : a.reverse(), (s = t);
            }),
            { t1: a, t2: r }
        );
    }
    function s() {
        e(".zoom-gallery").magnificPopup({
            delegate: "a:not(.effect-ajax)",
            type: "image",
            closeOnContentClick: !1,
            closeBtnInside: !1,
            mainClass: "mfp-with-zoom mfp-img-mobile",
            image: {
                verticalFit: !0,
                titleSrc: function (e) {
                    return e.el.attr("title") + ' &middot; <a class="image-source-link" href="' + e.el.attr("data-source") + '" target="_blank">image source</a>';
                },
            },
            gallery: { enabled: !0 },
            zoom: {
                enabled: !0,
                duration: 300,
                opener: function (e) {
                    return e.find("img");
                },
            },
        });
    }
    function a(t) {
        function n() {
            dsnGrid.elementHover(i, "a:not(> img):not(.vid) , .dsn-button-sidebar,  button , .mfp-container", "cursor-scale-full"),
                dsnGrid.elementHover(i, ".c-hidden", "no-scale"),
                dsnGrid.elementHover(i, ".has-popup a , .work-item-box a:not(.effect-ajax)", "cursor-scale-half cursor-open"),
                dsnGrid.elementHover(i, '[data-cursor="close"]', "cursor-scale-full cursor-close"),
                dsnGrid.elementHover(i, "a.link-pop ", "cursor-scale-full cursor-view"),
                dsnGrid.elementHover(i, ".proj-slider-image > .slick-list ,.our-work .slick-slider > .slick-list, .slider-project-swiper .swiper-wrapper ", "cursor-scale-half  cursor-next cursor-prev"),
                dsnGrid.elementHover(i, ".main-slider:not(.has-horizontal) .slide-item", ),
                
               
                dsnGrid.elementHover(i, ".our-work .work-item a ", "no-drag"),
                dsnGrid.moveIcon(".img-box-parallax", ".title-popup");
        }
        let i = e(".cursor");
        return dsnGrid.isMobile() || !r.hasClass("dsn-cursor-effect")
            ? (i.length && (i.css("display", "none"), r.removeClass("dsn-cursor-effect")), void (i = null))
            : !0 === t
            ? (i.attr("class", "cursor"), void n())
            : (dsnGrid.mouseMove(i), void n());
    }
    const l = e(window),
        r = e("body");
    !(function () {
        let t = e(".preloader"),
            n = t.find(".percent"),
            i = t.find(".title .text-fill"),
            o = { value: 0 },
            s = t.find(".preloader-bar"),
            a = s.find(".preloader-progress"),
            r = dsnGrid.pageLoad(0, 100, 1e3, function (e) {
                n.text(e), (o.value = e), i.css("clip-path", "inset(" + (100 - e) + "% 0% 0% 0%)"), a.css("width", e + "%");
            });
        l.on("load", function () {
            clearInterval(r),
                new TimelineLite()
                    .to(o, 1, {
                        value: 100,
                        onUpdate: function () {
                            n.text(o.value.toFixed(0)), i.css("clip-path", "inset(" + (100 - o.value) + "% 0% 0% 0%)"), a.css("width", o.value + "%");
                        },
                    })
                    .set(a, { backgroundColor: "#090909" })
                    .to(s, 0.5, { height: "100%" })
                    .to(
                        o,
                        0.4,
                        {
                            value: 0,
                            onUpdate: function () {
                                i.css("clip-path", "inset(" + (100 - o.value) + "% 0% 0% 0%)");
                            },
                        },
                        "-=0.4"
                    )
                    .to(
                        o,
                        0.8,
                        {
                            value: 100,
                            onUpdate: function () {
                                t.css("clip-path", "inset(" + o.value + "% 0% 0% 0%)");
                            },
                            ease: Power2.easeInOut,
                        },
                        "+=0.1"
                    )
                    .call(function () {
                        t.remove(), (r = t = n = i = o = s = a = null);
                    });
        });
    })();
    const d = (function () {
            const t = window.Scrollbar;
            var n = document.querySelector("#dsn-scrollbar");
            return {
                isScroller: function (e) {
                    e && (n = document.querySelector("#dsn-scrollbar"));
                    let t = !r.hasClass("dsn-effect-scroll") || dsnGrid.isMobile() || null === n;
                    return t && e && r.addClass("dsn-mobile"), !t;
                },
                locked: function () {
                    if ((r.addClass("locked-scroll"), this.isScroller())) {
                        let e = this.getScrollbar();
                        void 0 !== e && e.destroy(), (e = null);
                    }
                },
                getScrollbar: function (e) {
                    return void 0 === e ? t.get(n) : t.get(document.querySelector(e));
                },
                getListener: function (e, t = !0) {
                    if (void 0 === e) return;
                    let n = this;
                    n.isScroller() ? n.getScrollbar().addListener(e) : t && l.on("scroll", e), (n = null);
                },
                scrollNavigate: function () {
                    let t = e(".wrapper").offset();
                    (t = t ? t.top : 0),
                        e(".scroll-top , .scroll-to-top").on("click", function () {
                            dsnGrid.scrollTop(0, 2);
                        }),
                        e(".scroll-d").on("click", function () {
                            dsnGrid.scrollTop(t, 2, -1 * e(".scrollmagic-pin-spacer").height() - 200 || -200);
                        });
                },
                start: function () {
                    r.removeClass("locked-scroll"), dsnGrid.scrollTop(0, 1), this.isScroller(!0) && t.init(n, { damping: 0.05 });
                },
            };
        })(),
        c = (function () {
            let t = new ScrollMagic.Controller(),
                n = [];
            return {
                clearControl: function () {
                    t.destroy(!0), (t = new ScrollMagic.Controller());
                    for (let e of n) e.destroy(!0), (e = null);
                    n = [];
                },
                allInt: function () {
                    this.clearControl(),
                        this.headerProject(),
                        this.nextProject(),
                        this.changeColor(),
                        this.headerPages(),
                        this.animateFade(),
                        this.animateSkills(),
                        this.animateNumbers(),
                        this.sectionWork(),
                        this.parallaxImg(),
                        this.parallaxImgHover(),
                        this.moveSection(),
                        d.scrollNavigate(),
                        d.getListener(function () {
                            for (let e of n) e.refresh();
                        });
                },
                headerPages: function () {
                    let i = '[data-dsn-header="parallax"]';
                    if (e(i).length <= 0) return !1;
                    let o = e("#dsn-hero-parallax-img"),
                        s = e("#dsn-hero-parallax-title"),
                        a = e(i).find('a[target="_blank"] , .scroll-d'),
                        l = new TimelineLite();
                    o.length > 0 && l.to(o, 1, { y: "30%", scale: 1 }, 0),
                        s.length > 0 && l.to(s, 0.8, { force3D: !0, y: "100%", autoAlpha: 0, scale: o.hasClass("header-scale-hero") ? 0.9 : o.hasClass("header-no-scale-hero") ? 1 : 1.08 }, 0),
                        a.length > 0 && l.to(a, 0.8, { force3D: !0, y: 60, autoAlpha: 0 }, 0);
                    let r = dsnGrid.tweenMaxParallax(d, t).addParrlax({ id: i, triggerHook: 0, tween: l }),
                        c = o.find("video");
                    c.length
                        ? (r.on("enter", function () {
                              c.length && c.get(0).play();
                          }),
                          r.on("leave", function () {
                              c.length && c.get(0).pause();
                          }),
                          e(i)
                              .find(".icon-sound")
                              .on("click", function (t) {
                                  t.stopPropagation(),
                                      e(this).hasClass("sound-no-mute")
                                          ? ((c.get(0).muted = !0), TweenMax.to(e(this).find("svg"), 0.8, { x: 4 }), TweenMax.staggerTo(e(this).find(".wave-line"), 0.8, { autoAlpha: 0 }, 0.2))
                                          : ((c.get(0).muted = !1), TweenMax.to(e(this).find("svg"), 0.8, { x: 0 }), TweenMax.staggerTo(e(this).find(".wave-line"), 0.8, { autoAlpha: 1 }, 0.2)),
                                      e(this).toggleClass("sound-no-mute");
                              }))
                        : (c = null),
                        r && n.push(r),
                        (i = l = r = null);
                },
                parallaxImgHover: function () {
                    let t = e('[data-dsn="parallax"]');
                    t.length <= 0 || dsnGrid.isMobile()
                        ? (t = null)
                        : t.each(function () {
                              let t = e(this),
                                  n = dsnGrid.removeAttr(t, "data-dsn"),
                                  i = dsnGrid.getData(t, "speed", 0.5),
                                  o = dsnGrid.getData(t, "move", 20);
                              dsnGrid.parallaxMoveElement(t, o, i, t.find(".dsn-parallax-rev").get(0), t.hasClass("image-zoom")), (t = n = i = o = null);
                          });
                },
                headerProject: function () {
                    let i = '[data-dsn-header="project"]';
                    if (e(i).length <= 0 || e(i).hasClass("dsn-end-animate")) return (i = null), !1;
                    let o = e("#dsn-hero-parallax-img"),
                        s = e("#dsn-hero-title"),
                        a = e("#dsn-hero-description"),
                        l = e("#dsn-hero-desc-items"),
                        r = l.find(".descrption-item"),
                        c = e(i).find(".scroll-d img"),
                        u = new TimelineLite();
                    o.length > 0 && !dsnGrid.isMobile() && u.to(o, 2, { width: "40%", left: "60%" }),
                        s.length &&
                            (dsnGrid.convertTextLine(s.find(".title")),
                            a.length && TweenLite.set(s.find(".dsn-chars-wrapper , .metas"), { y: "+=" + a.height() }),
                            l.length && TweenLite.set(s.find(".dsn-chars-wrapper , .metas"), { y: "+=" + (l.height() - 30) }),
                            u.to(s.find(".metas"), 1, { force3D: !0, y: "0", ease: Back.easeOut.config(1.7) }, 0),
                            u.staggerTo(dsnGrid.randomObjectArray(s.find(".dsn-chars-wrapper"), 0.8), 1.5, { force3D: !0, y: "0", ease: Back.easeOut.config(1.7) }, 0.1, 0)),
                        a.length && u.fromTo(a, 0.8, { y: "15%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1 }),
                        l.length && u.fromTo(l, 0.3, { y: "15%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1 }),
                        r.length && u.staggerFromTo(r, 1, { y: "15%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1 }, 0.2);
                    let f = dsnGrid.tweenMaxParallax(d, t).addParrlax({ id: i, triggerHook: 0, duration: 2100, tween: u, _fixed: !0 });
                    c.length &&
                        f.on("progress", function (t) {
                            TweenLite.to(e('[data-dsn-header="project"]').find(".scroll-d img"), 0.3, { rotation: 500 * t.progress });
                        }),
                        f && n.push(f),
                        (i = c = c = u = f = o = r = l = a = s = null);
                },
                nextProject: function () {
                    let i = e('[data-dsn-footer="project"]');
                    if (!i.length) return !1;
                    let o = e("#dsn-footer-title"),
                        s = i.find(".img-box-shadow"),
                        a = new TimelineLite();
                    if (s.length) {
                        let e = { value: "20%" };
                        a.to(
                            e,
                            2,
                            {
                                value: "75%",
                                onUpdate: function () {
                                    s.css("background-image", "linear-gradient(to left, #000 " + e.value + ", rgba(0, 0, 0, 0.26) 100%)");
                                },
                            },
                            0
                        );
                    }
                    o.length &&
                        (dsnGrid.convertTextLine(o),
                        TweenLite.set(o.find(".dsn-chars-wrapper"), { y: 50, autoAlpha: 0 }),
                        a.staggerTo(dsnGrid.randomObjectArray(o.find(".dsn-chars-wrapper"), 0.8), 1, { force3D: !0, y: "0", autoAlpha: 1, ease: Back.easeOut.config(1.7) }, 0.1, 0));
                    let l = dsnGrid.tweenMaxParallax(d, t).addParrlax({ id: i, triggerHook: 0.7, duration: i.height() + 33, tween: a });
                    l && n.push(l), (a = l = o = null);
                },
                animateFade: function () {
                    let t = e('[data-dsn-animate="section"]');
                    dsnGrid.getData(t, "animate"),
                        t.each(function () {
                            let t = new ScrollMagic.Controller(),
                                n = new TimelineLite({ paused: !0 }),
                                i = e(this),
                                o = i.find(".dsn-up"),
                                s = i.find(".dsn-text");
                            i.addClass("transform-3d overflow-hidden"),
                                i.hasClass("dsn-animate") && n.fromTo(this, 1, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }),
                                s.length &&
                                    s.each(function () {
                                        dsnGrid.convertTextLine(this, this),
                                            e(this).addClass("overflow-hidden"),
                                            n.staggerFromTo(
                                                e(this).find(".dsn-word-wrapper"),
                                                0.6,
                                                { willChange: "transform", transformOrigin: "0 100%", x: 8, y: 13, rotation: 20, opacity: 0 },
                                                { x: 0, y: 0, rotation: 0, opacity: 1, ease: Back.easeOut.config(2) },
                                                0.1
                                            );
                                    }),
                                o.length && n.staggerFromTo(o, 0.8, { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: i.hasClass("dsn-animate") ? 0.5 : 0, ease: Back.easeOut.config(1.7) }, 0.2, 0),
                                (n._totalDuration = 1),
                                dsnGrid.tweenMaxParallax(d, t).addParrlax({ id: this, reverse: !1, triggerHook: 0.5, duration: 0, tween: n }),
                                (t = n = i = o = s = null);
                        }),
                        (t = null);
                },
                animateSkills: function () {
                    let t = e(".skills-personal");
                    t.each(function () {
                        let t = new ScrollMagic.Controller(),
                            n = new TimelineLite({ paused: !0 }),
                            i = e(this).find(".skills-item .fill");
                        i.length &&
                            (i.each(function (t) {
                                let i = e(this);
                                n.to(
                                    i,
                                    1,
                                    {
                                        width: i.data("width"),
                                        ease: Power0.easeNone,
                                        onUpdate: function () {
                                            i.find(".number").text(((i.width() / i.parent().width()) * 100).toFixed(0) + "%");
                                        },
                                        onComplete: function () {
                                            i = null;
                                        },
                                    },
                                    0.2 * t
                                );
                            }),
                            (n._totalDuration = 1)),
                            dsnGrid.tweenMaxParallax(d, t).addParrlax({ id: this, reverse: !1, triggerHook: 0.5, duration: 0, tween: n }),
                            (t = n = null);
                    }),
                        (t = null);
                },
                animateNumbers: function () {
                    let t = e(".have-dsn-animate-number");
                    t.each(function () {
                        let t = e(this).find(".has-animate-number");
                        if (!t.length) return void (t = null);
                        let n = new TimelineLite({ paused: !0 });
                        t.each(function (t) {
                            let i = e(this),
                                o = { value: 0 };
                            n.to(
                                o,
                                4,
                                {
                                    value: i.text(),
                                    ease: Back.easeOut.config(1.2),
                                    onUpdate: function () {
                                        i.text(dsnGrid.numberText(o.value.toFixed(0)));
                                    },
                                    onComplete: function () {
                                        i = o = null;
                                    },
                                },
                                0.2 * t
                            );
                        }),
                            (n._totalDuration = 1),
                            dsnGrid.tweenMaxParallax(d, new ScrollMagic.Controller()).addParrlax({ id: this, reverse: !1, triggerHook: 0.5, duration: 0, tween: n }),
                            (n = null);
                    }),
                        (t = null);
                },
                sectionWork: function () {
                    let i = e('.work-container[data-dsn-animate="work"]'),
                        o = i.find(".d-block"),
                        s = o.find(".work-item");
                    if (o.length) {
                        let a = l.width() / 2.5;
                        dsnGrid.isMobile() && l.width() < 768 && l.width() >= 576 ? (a = l.width() / 1.5) : dsnGrid.isMobile() && l.width() < 576 && (a = l.width() / 1.15),
                            s.each(function () {
                                e(this).css({ width: a, float: "left", minHeight: 1 });
                            }),
                            o.css("width", a * s.length),
                            (a = null);
                        let r = dsnGrid
                            .tweenMaxParallax(d, t)
                            .addParrlax({
                                id: i,
                                triggerHook: 0,
                                _fixed: !0,
                                duration: 350 * s.length,
                                refreshParallax: !0,
                                tween: TweenLite.to(o, 0.5, { force3D: !0, x: -1 * (s.last().offset().left - 1.5 * s.last().width()), ease: Linear.easeNone }),
                            });
                        r && n.push(r), (r = null);
                    }
                    i = o = s = null;
                },
                parallaxImg: function () {
                    let i = Linear.easeNone,
                        o = 0.01;
                    e('[data-dsn-grid="move-up"]').each(function (s) {
                        let a = e(this);
                        a.attr("data-dsn-grid", "moveUp");
                        let l = a.find("img:not(.hidden) , video"),
                            r = dsnGrid.getData(this, "triggerhook", 1),
                            c = dsnGrid.getData(this, "duration", "200%"),
                            u = dsnGrid.getData(this, "top");
                        if (l.length > 0) {
                            u && l.css("top", u);
                            let e,
                                s = dsnGrid.getData(l, "y", l.hasClass("has-opposite-direction") ? "-20%" : "30%"),
                                f = { y: s, skewX: 0, ease: i, scale: 1 };
                            l.hasClass("has-top-bottom") ? (e = TweenMax.to(l, o, f)) : ((f.scale = dsnGrid.getData(l, "scale", 1.1)), (e = TweenMax.to(l, o, f))), l.css("perspective", a.width() > 1e3 ? 1e3 : a.width());
                            let h = dsnGrid.tweenMaxParallax(d, t).addParrlax({ id: this, triggerHook: r, duration: c, tween: e });
                            h && n.push(h), (h = e = s = c = r = l = a = f = null);
                        }
                    }),
                        (i = o = null);
                },
                dsnScrollTop: function () {
                    let i = e(".wrapper");
                    if (!i.length || !e(".scroll-to-top").length) return void (i = null);
                    TweenLite.to(".scroll-to-top", 1, { right: -100, autoAlpha: 0 }), TweenLite.to(".stories-sticky-footer", 1, { autoAlpha: 0 });
                    let o = dsnGrid
                        .tweenMaxParallax(d, t)
                        .addParrlax({ id: i, triggerHook: 0.5, duration: i.height() - 0.5 * l.height() + (e(".next-project").outerHeight() || 0), tween: TweenLite.to(".scroll-to-top > img", 0.3, { rotation: i.height() / 2 }) });
                    o.on("progress", function (t) {
                        e(".scroll-to-top .box-numper span").text((100 * t.progress).toFixed(0) + "%");
                    }),
                        o.on("enter", function (e) {
                            TweenLite.to(".scroll-to-top", 1, { right: 20, autoAlpha: 1 }), TweenLite.to(".stories-sticky-footer", 1, { autoAlpha: 1 });
                        }),
                        o.on("leave", function (e) {
                            TweenLite.to(".scroll-to-top", 1, { right: -100, autoAlpha: 0 }), TweenLite.to(".stories-sticky-footer", 1, { autoAlpha: 0 });
                        }),
                        o && n.push(o),
                        (o = i = null);
                },
                moveSection: function () {
                    let i = e('[data-dsn-grid="move-section"]'),
                        o = Linear.easeNone,
                        s = 0.01;
                    i.each(function () {
                        let i = e(this);
                        if ((i.removeAttr("data-dsn-grid"), i.addClass("dsn-move-section"), "tablet" === i.data("dsn-responsive") && l.width() < 992)) return;
                        let a = dsnGrid.getData(i, "move", -100),
                            r = dsnGrid.getData(i, "triggerhook", 1),
                            c = dsnGrid.getData(i, "opacity", i.css("opacity")),
                            u = dsnGrid.getData(i, "duration", "150%"),
                            f = dsnGrid.tweenMaxParallax(d, t).addParrlax({ id: this, triggerHook: r, duration: u, tween: TweenMax.to(i, s, { y: a, autoAlpha: c, ease: o }) });
                        n.push(f), (i = a = r = c = u = null);
                    }),
                        (i = o = s = null);
                },
                changeColor: function () {
                    e('[data-dsn="color"]').each(function () {
                        let i = dsnGrid.getData(this, "duration", e(this).outerHeight() + 50),
                            o = new ScrollMagic.Scene({ triggerElement: this, triggerHook: 0.05, duration: i }).addTo(t);
                        o.on("enter", function () {
                            r.toggleClass("v-light");
                        }),
                            o.on("leave", function () {
                                r.toggleClass("v-light");
                            }),
                            o && n.push(o);
                    });
                },
            };
        })(),
        u = (function () {
            let t = [],
                n = [];
            return {
                destory: function () {
                    for (let e of n) e.slick("unslick"), (e = null);
                    for (let e of t) e.destroy(), (e = null);
                    (t = []), (n = []);
                },
                bySwiper: function (n, i) {
                    dsnGrid.convertToJQuery(n).each(function () {
                        let n = new Swiper(e(this).find(".swiper-container"), {
                            slidesPerView: "auto",
                            spaceBetween: 80,
                            allowTouchMove: !0,
                            grabCursor: !0,
                            resistanceRatio: 0.65,
                            watchSlidesProgress: !0,
                            slidesPerViewFit: !1,
                            roundLengths: "false",
                            speed: 1e3,
                            navigation: { nextEl: e(this).find('[data-cursor="next"]'), prevEl: e(this).find('[data-cursor="prev"]') },
                            pagination: { el: ".swiper-pagination", clickable: !0 },
                        });
                        t.push(n), (n = i = null);
                    });
                },
                bySlick: function (t, i) {
                    dsnGrid.convertToJQuery(t).each(function () {
                        (i = e.extend(
                            !0,
                            { speed: 700, prevArrow: '<div data-cursor="prev"></div>', nextArrow: '<div data-cursor="next"></div>', responsive: [{ breakpoint: 992, settings: { dots: !e(this).hasClass("dsn-not-dot") } }] },
                            i || {}
                        )),
                            e(this).hasClass("dsn-is-not-fade") && (i.fade = !1);
                        let t = e(this).slick(i);
                        n.push(t), (t = i = null);
                    });
                },
                run: function () {
                    this.destory(),
                        this.bySwiper(".slider-project-swiper"),
                        this.bySlick(".proj-slider-image"),
                        this.bySlick('[data-dsn-col="3"]:not(.dsn-not-dot) .slick-slider', {
                            infinite: !0,
                            slidesToShow: 3,
                            responsive: [
                                { breakpoint: 768, settings: { slidesToShow: 2 } },
                                { breakpoint: 500, settings: { slidesToShow: 1 } },
                            ],
                        }),
                        this.bySlick('[data-dsn-col="3"].dsn-not-dot .slick-slider', {
                            infinite: !0,
                            autoplay: !0,
                            autoplaySpeed: 2e3,
                            slidesToShow: 3,
                            responsive: [
                                { breakpoint: 768, settings: { slidesToShow: 2, dots: !1 } },
                                { breakpoint: 500, settings: { slidesToShow: 1, dots: !1 } },
                            ],
                        }),
                        this.bySlick(".testimonials-main-content", {
                            slidesToShow: 1,
                            asNavFor: ".testimonials-nav",
                            loop: !0,
                            autoplay: !1,
                            centerMode: !0,
                            infinite: !0,
                            speed: 700,
                            adaptiveHeight: !0,
                            fade: !0,
                            cssEase: "cubic-bezier(.9, .03, .41, .49)",
                            nextArrow: '<i class="fas fa-angle-right"></i>',
                            prevArrow: '<i class="fas fa-angle-left"></i>',
                        }),
                        this.bySlick(".testimonials-nav", {
                            slidesToShow: 3,
                            asNavFor: ".testimonials-main-content",
                            vertical: !0,
                            focusOnSelect: !0,
                            loop: !0,
                            autoplay: !1,
                            arrows: !1,
                            centerMode: !0,
                            responsive: [
                                { breakpoint: 768, settings: { vertical: !1, centerMode: !1, dots: !1 } },
                                { breakpoint: 576, settings: { slidesToShow: 2, vertical: !1, centerMode: !1 } },
                                { breakpoint: 400, settings: { slidesToShow: 2, vertical: !0, centerMode: !1 } },
                            ],
                        }),
                        this.bySlick(".testimonials-slider", { ariableWidth: !0, slidesToShow: 3, slidesToScroll: 1, infinite: !1 }),
                        this.bySlick('[data-dsn-col="1"] .slick-slider', { infinite: !0, slidesToShow: 1 }),
                        this.bySlick('[data-dsn-col="2"] .slick-slider', { infinite: !0, slidesToShow: 2, arrows: !1, responsive: [{ breakpoint: 800, settings: { slidesToShow: 1, slidesToScroll: 1 } }] }),
                        this.bySlick('[data-dsn-col="5"] .slick-slider', {
                            autoplay: !0,
                            infinite: !0,
                            slidesToShow: 5,
                            arrows: !1,
                            responsive: [
                                { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 3 } },
                                { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                            ],
                        });
                },
            };
        })();
    var f;
    l.on("load", function () {
        (function () {
            const t = e(".site-header");
            return {
                lineActive: function () {
                    let e = t.find("ul.extend-container > li.dsn-active");
                    e.length && this.setLine(e.offset().left), (e = null);
                },
                lineMove: function () {
                    let n = this;
                    t.find("ul.extend-container > li").off("mouseenter"),
                        t.find("ul.extend-container > li").on("mouseenter", function () {
                            if (r.hasClass("hamburger-menu")) return;
                            let t = e(this),
                                i = t.find(" > ul");
                            i.length ? n.setLine(i.offset().left, 65, i.width(), t.offset().left) : n.setLine(e(this).offset().left), (t = null), (i = null);
                        }),
                        t.find("ul.extend-container").off("mouseleave"),
                        t.find("ul.extend-container").on("mouseleave", function () {
                            n.lineActive();
                        });
                },
                setLine: function (t, n = 65, i = 25, o) {
                    TweenMax.to(".nav-border-bottom", 0.3, {
                        left: t,
                        top: n,
                        width: i,
                        onComplete: function () {
                            e(".nav-border-bottom").css({ left: o || t, width: 25 });
                        },
                    });
                },
                cutterText: function () {
                    let e = t.find(".menu-icon .text-menu");
                    if (e.length <= 0) return;
                    let n = e.find(".text-button"),
                        i = e.find(".text-open"),
                        o = e.find(".text-close");
                    dsnGrid.convertTextLine(n, n), dsnGrid.convertTextLine(i, i), dsnGrid.convertTextLine(o, o), (o = null), (i = null), (n = null), (e = null);
                },
                hamburgerOpen: function () {
                    const n = t.find(".menu-icon"),
                        i = t.find(".main-navigation");
                    let o = new TimelineMax({
                        paused: !0,
                        onReverseComplete: function () {
                            setTimeout(function () {
                                n.find(".icon-top , .icon-bottom").css("transform", "").css("display", ""), r.css("overflow", "");
                            }, 50);
                        },
                    });
                    var s = new TimelineMax();
                    let a = Power3.easeOut;
                    o.set(n.find(".icon-center"), { display: "none" }),
                        o.to(n.find(".icon-top"), 0.5, { width: 23, rotation: 45, top: 6, ease: a }),
                        o.to(n.find(".icon-bottom"), 0.5, { width: 23, rotation: -45, top: -5, ease: a }, 0),
                        o.to(n, 0.01, { css: { className: "+=nav-active" } }, 0),
                        o.to(r, 0.01, { overflow: "hidden" }, 0),
                        o.to(i, 0.5, { y: "0%", autoAlpha: 1, ease: a }, 0),
                        o.fromTo(i, 0.5, { y: "-100%", autoAlpha: 0 }, { y: "0%", autoAlpha: 1, ease: Expo.easeInOut }, 0),
                        o.staggerTo(i.find("ul.extend-container > li > a .dsn-title-menu"), 0.5, { autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.7) }, 0.1),
                        o.to(i.find("ul.extend-container > li > a .dsn-meta-menu"), 0.5, { autoAlpha: 1, ease: a }),
                        o.to(i.find(".container-content"), 1, { autoAlpha: 1 }, "-=1"),
                        o.reverse(),
                        i.find("ul.extend-container > li.dsn-drop-down").on("click", function (t) {
                            t.stopPropagation(),
                                s._totalDuration > 0 ||
                                    ((s = new TimelineMax({
                                        onReverseComplete: function () {
                                            s = new TimelineMax();
                                        },
                                    })).set(e(this).find("ul"), { display: "flex" }),
                                    s.staggerTo(i.find("ul.extend-container > li > a .dsn-title-menu"), 0.5, { y: -30, autoAlpha: 0, ease: Back.easeIn.config(1.7) }, 0.1),
                                    s.to(i.find("ul.extend-container > li > a .dsn-meta-menu"), 0.5, { autoAlpha: 0 }, 0.5),
                                    s.staggerFromTo(e(this).find("ul li"), 0.5, { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: Back.easeOut.config(1.7) }, 0.1));
                        }),
                        n.off("click"),
                        n.on("click", function () {
                            s.reverse(-1), o.reversed(!o.reversed()), (s = new TimelineMax());
                        });
                    let l = e(".dsn-back-menu");
                    l.off("click"),
                        l.on("click", function () {
                            s.reverse();
                        }),
                        (l = null);
                },
                init: function () {
                    if (!t.length) return;
                    let e = this;
                    this.cutterText(),
                        l.width() > 991 && r.hasClass("classic-menu") && (t.find("ul.extend-container > li").off("mouseenter"), t.find("ul.extend-container").off("mouseleave"), e.lineMove(), setTimeout(e.lineActive.bind(e), 500)),
                        e.hamburgerOpen();
                },
            };
        })().init(),
            dsnGrid.removeWhiteSpace(".site-header ul.extend-container li > a"),
            l.on("popstate", function (e) {
                if (window.location.hash.length) return l.scrollTop(0), void dsnGrid.scrollTop(window.location.hash, 1, -100);
                document.location.href.indexOf("#") > -1 ||
                    setTimeout(function () {
                        i().backAnimate(document.location);
                    }, 100);
            }),
            t(),
            e(".day-night").on("click", function () {
                r.toggleClass("v-light");
            });
    });
})(jQuery);
