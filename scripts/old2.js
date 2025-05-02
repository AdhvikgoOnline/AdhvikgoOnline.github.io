// $("[data-html]").each(function(i) {
//     var htmlid = "htmlcontent" + i;
//     var htmlurl = this.dataset.html;
//     this.id = htmlid;
// fetch(htmlurl, {
//   method: 'GET',
//   mode: 'cors',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-RapidAPI-Key': 'your-api-key'
//   }
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error(error));
//     $.get(htmlurl, function(d) {
//         $("#" + htmlid).html(d);
//     });
// });
        /*---------- 05. Scroll To Top ----------*/
    // progressAvtivation
    if($('.scroll-top').length > 0) {    
        var scrollTopbtn = document.querySelector('.scroll-top');
        var progressPath = document.querySelector('.scroll-top path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);	
        var offset = 50;
        var duration = 750;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(scrollTopbtn).addClass('show');
            } else {
                jQuery(scrollTopbtn).removeClass('show');
            }
        });				
        jQuery(scrollTopbtn).on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, 1);
            return false;
        })
    }

document.addEventListener("DOMContentLoaded", function(){
  if(!localStorage.getItem('cookieConsent')){
  if($("#cookie-consent-popup").length > 0) 
    document.getElementById("cookie-consent-popup").style.display = "block";
  }
  if($("#cookie-consent-accept").length > 0) {
  document.getElementById("cookie-consent-accept").addEventListener("click", function(){
    localStorage.setItem("cookieConsent", "true");
    document.getElementById("cookie-consent-popup").style.display = "none";
  });
  }
});

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    var swiper1 = new Swiper(".mySwiperLazy", {
        slidesPerView: "auto",
        spaceBetween: 30,
        lazy: true,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    var swipermulti = new Swiper(".SwiperMultiple", {
      slidesPerView: 1,
      spaceBetween: 10,
      pauseOnMouseEnter: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var swiperads = new Swiper(".slideads", {
      slidesPerView: 1,
      spaceBetween: 10,
      centeredSlides: true,
      pauseOnMouseEnter: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });


$(function() {
    //debugger;
    const haspager = $(".haspager");
    const curq2s = getQS("q2", window.location); 
    const curq2 = curq2s == undefined ? "" : "&q2=" +  curq2s;
    if(haspager.length > 0) {
        haspager.append($("#tmplaipgr0").html());
        let maxrows = $(".pginfo .maxrows", haspager).text();
        let start = $(".pginfo .start", haspager).text();
        let maxpages = $(".pginfo .maxpages", haspager).text();
        $(".total", haspager).html(`Page <span>${start}</span> of <span>${maxpages}</span> (Total Rows: <span>${maxrows}</span>)`);
        $(".prevpage", haspager).css("visibility", ($(".pginfo .prvpage", haspager).text() == "") ? "hidden" : "visible");
        $(".nextpage", haspager).css("visibility", ($(".pginfo .nxtpage", haspager).text() == "") ? "hidden" : "visible");
        $(".nextpage", haspager).click(function(e) {
            window.location = window.location.origin + window.location.pathname + "?q1=" + $(".pginfo .nxtpage", haspager).text() + curq2;
        });
        $(".prevpage", haspager).click(function(e) {
            window.location = window.location.origin + window.location.pathname + "?q1=" + $(".pginfo .prvpage", haspager).text() + curq2;
        });
    }
});


function owl1(o, p, n, s1, s2, s3, m, sp, ao, ai) {
    $(o).owlCarousel({
        stagePadding: sp,
        loop: true,
        margin: m, lazyLoad: true,
        animateOut: ao,
        animateIn: ai,
        responsiveClass: true, autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: s1
            }, 600: {
                items: s2
            }, 1000: {
                items: s3
            }
        }
    });
    $(n).click(function () {
        $(o).owlCarousel().trigger('next.owl.carousel');
    })
    $(p).click(function () {
        $(o).owlCarousel().trigger('prev.owl.carousel', [300]);
    })
}
function owl2(o, p, n, s1, s2, s3, m, sp, ao, ai) {
    $(o).owlCarousel({
        stagePadding: sp,
        loop: true,
        margin: m, lazyLoad: true, autoWidth: true,
        animateOut: ao,
        animateIn: ai,
        responsiveClass: true, autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: s1
            }, 600: {
                items: s2
            }, 1000: {
                items: s3
            }
        }
    });
    $(n).click(function () {
        $(o).owlCarousel().trigger('next.owl.carousel');
    })
    $(p).click(function () {
        $(o).owlCarousel().trigger('prev.owl.carousel', [300]);
    })
}

/*
// Plugin definition.
$.fn.myowl = function( options ) {
    // Iterate and reformat each matched element.
    return this.each(function() {
        var elem = $( this );
        var markup = elem.html();
        // Call our format function.
        markup = $.fn.hilight.format( markup );
        elem.html( markup );
    });
};
// Define our format function.
$.fn.hilight.format = function( txt ) {
    return "<strong>" + txt + "</strong>";
};
$.fn.myNewPlugin = function() {
    return this.each(function() {
        // Do something to each element here.
    });
};
*/

$(function() {
    $.fn.myowl = function() {
        return this.each(function() {
            var ani = $(this);
            $('>div:last', ani).remove();
            var aniOut = (ani.data('animateout') == undefined ? false: ani.data('animateout'));
            var aniTime = (ani.data('autoplaytimeout') == undefined ? 5000: ani.data('autoplaytimeout'));
            var aniItem = (ani.data('items') == undefined ? '1,1,1': ani.data('items')).split(',');
            var aniSPad = (ani.data('stagepadding') == undefined ? '0': ani.data('stagepadding'));
            var aniMargin = (ani.data('margin') == undefined ? '0': ani.data('margin'));

            ani.owlCarousel({
                loop: true, lazyLoad: true, autoplayHoverPause: true, lazyLoadEager: 1, animateOut: aniOut, stagePadding: aniSPad, //margin: aniMargin,
                onInitialized: startProgressBar, onTranslate: resetProgressBar, onTranslated: startProgressBar,
                nav: true, dots: true, autoplay: true, autoplayTimeout: aniTime,
                responsive: {
                    0: {
                        items: aniItem[0], slideBy: aniItem[0]
                    }, 600: {
                        items: aniItem[1], slideBy: aniItem[1]
                    }, 1000: {
                        items: aniItem[2], slideBy: aniItem[2]
                    }
                },
                navText: ['<i class="fa fa-angle-left fa-2x"></i>', '<i class="fa fa-angle-right fa-2x"></i>'], //we will be using font awesome icon here
            });
            $('.owl-prev', ani).addClass('aidl'); $('.owl-next', ani).addClass('aidr');
            $('.owl-dots', ani).addClass('aidbm');
            var ani1, ani2, ani3, ani4, ani5;
            ani.on('translate.owl.carousel', function (event) {
                $('.owl-item .ani1', ani).removeClass('animated').hide();
                $('.owl-item .ani2', ani).removeClass('animated').hide();
                $('.owl-item .ani3', ani).removeClass('animated').hide();
                $('.owl-item .ani4', ani).removeClass('animated').hide();
                $('.owl-item .ani5', ani).removeClass('animated').hide();
            });
            ani.on('translated.owl.carousel', function (event) {
                $('.owl-item.active .ani1', ani).addClass('animated').show();
                $('.owl-item.active .ani2', ani).addClass('animated').show();
                $('.owl-item.active .ani3', ani).addClass('animated').show();
                $('.owl-item.active .ani4', ani).addClass('animated').show();
                $('.owl-item.active .ani5', ani).addClass('animated').show();
            });

            function startProgressBar() {
                $(".slide-progress").css({
                    width: "100%", transition: "width 5000ms"
                });
            }
            function resetProgressBar() {
                $(".slide-progress").css({
                    width: 0, transition: "width 0s"
                });
            }
        });
    }
    $('.carousel2:not(#yvideo)').myowl();
    /* section aos animation */
    //var aoseffects = 'fade,fade-up,fade-down,fade-left,fade-right,fade-up-right,fade-up-left,fade-down-right,fade-down-left,flip-up,flip-down,flip-left,flip-right,slide-up,slide-down,slide-left,slide-right,zoom-in,zoom-in-up,zoom-in-down,zoom-in-left,zoom-in-right,zoom-out,zoom-out-up,zoom-out-down,zoom-out-left,zoom-out-right'.split(',');
    var aoseffects = 'fade,fade-up,fade-left,fade-right,fade-up-right,fade-up-left,flip-up,flip-left,flip-right,slide-up,zoom-in,zoom-in-up,zoom-in-left,zoom-in-right'.split(',');

    $('.grids:not(.noani)').each(function(i) {
        $('>div', $(this)).attr('data-aos', (ismobile ? 'fade-up': aoseffects[Math.floor(Math.random() * aoseffects.length)])).each(function(i1) {
            $(this).attr('data-aos-delay', i1 * 50);
        });
    });
    if(typeof AOS != "undefined") {
        AOS.init({
            duration: 800, anchorPlacement: 'top-top'
        });
    }
});


/** Parallax
http://www.ianlunn.co.uk/plugins/jquery-parallax/
**************************************************************** **/
!function(n) {
    n.fn.parallax = function(n, t, e) {
        function o() {
            var o = jQuery(window).scrollTop(); r = e?function(n) {
                return n.outerHeight(!0)}:function(n) {
                return n.height()},
            i.each(function() {
                var e = jQuery(this), i = e.offset().top, h = r(e); if (!(o > i+h || i > o+window.height)) {
                    var l = Math.round((u-o)*t); e.css("backgroundPosition", n+" "+l+"px")}})}var r, u, i = jQuery(this); (arguments.length < 1 || null === n) && (n = "50%"), (arguments.length < 2 || null === t) && (t = .1), (arguments.length < 3 || null === e) && (e=!0), i.each(function() {
                u = i.offset().top,
                u < window.height && (u = 0)}), jQuery(window).bind("scroll",
            o).resize(o), o()}}(jQuery);

$(function() {
    $('.parallax').each(function() {
        $(this).parallax("50%", "0.6");
    });
});

function getchannel() {
    var pid = ""; var prevPageToken,
    nextPageToken;
    $.get("https://www.googleapis.com/youtube/v3/channels",
        {
            part: 'contentDetails',
            id: cid,
            key: gapi
        },
        function(d) {
            $.each(d.items, function(i, item) {
                pid = item.contentDetails.relatedPlaylists.uploads;
                getvideos(pid);
            });
        });
}
function getvideos(pid, pt) {
    var opts = {
        maxResults: ($('#yvideo').data("maxlist") == undefined ? 10: $('#yvideo').data('maxlist')),
        part: 'snippet',
        playlistId: pid,
        key: gapi
    };
    if (pt) opts.pageToken = pt;

    $.get("https://www.googleapis.com/youtube/v3/playlistItems", opts,
        function(d) {
            prevPageToken = d.prevPageToken;
            nextPageToken = d.nextPageToken;
            //console.log(d);
            d.moments = function() {
                return moment(this.snippet.publishedAt).format('DD MMM YY');
            }
            //d.moments = function() {
            //    return 10*10;
            //}
            var ycode = Mustache.render($("#tmplyoutube1").html(), d);
            $('#yvideo').html(ycode);
            window.bLazy.revalidate();
        });
}
$(function() {
    if ($('#yvideo').length > 0) getchannel();
});
