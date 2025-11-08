/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */

// from admin js
var savedRange, isInFocus, aizoomsrc, aizoomobj, tsbd = '';
//var atrtl = { '--t5': '94%', '--t4': '86%', '--t3': '80%', '--t2': '70%', '--t1': '60%', '--t0': '50%', '--t9': '2%', '--tw': '0%', '--tb': '100%'};
//var atrtd = { '--t5': '8%', '--t4': '20%', '--t3': '30%', '--t2': '37%', '--t1': '44%', '--t0': '50%', '--t9': '100%', '--tw': '100%', '--tb': '0%'};
var queryoptions;
/*
function ready(callback) {
    // in case the document is already rendered
    if (document.readyState != 'loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function () { if (document.readyState == 'complete') callback(); });
}
*/

$(function () {
    wl = window.location.href.toLowerCase();
    //var ffac = wl.indexOf(divpanel) >= 0 || wl.indexOf("aimcode") >= 0 ? true : false;
    //var ffa = wl.indexOf(divpanel) >= 0 ? true : false;

    $(".menu").css("display", "block");
    $("#preloader").addClass("preloader-hide");
    var navbarHeight = $("header").height();
    var prevScrollpos = window.pageYOffset;

    //    fnlocal('AdminTheme', AdminTheme, function (t) { if (ffac) { $('body').removeClass('aithd9 aithl9').addClass(t); $(':root, ::before, ::after').css((t == 'aithl9' ? atrtl : atrtd)); } });
    //    fnlocal('SiteTheme', SiteTheme, function(t) {if(!ffac) { $('body').removeClass('aithd9 aithl9').addClass(t); $(':root, ::before, ::after').css((t == 'aithl9' ? atrtl : atrtd)); } });
    fnlocal('BaseColor', BaseColor, function (t) { $('body').addClass(t); });
    //fnlocal('navonn', (ismobile ? '' : 'onn'), function(t) { if(ffa) $('body,footer,nav').addClass(t);});

    /*
        $(document).off('click', 'a, button').on('click', 'a, button', function (e) {
            var $t = $(this); var href = unstr($t.attr('href')); 
            //if($t.closest('*').hasClass('custom')) {return;}
            if($t.prop('tagName') == "A" && href != "#" && href.indexOf('.html') < 0 && href != "") { return; }
            $c = $t.closest('article, dialog'); v = $t.val();
    
            // used for list toolbar buttons 
            
            if (!$t.hasClass('aicollapse')) $t.closest('nav.sidebar').removeClass('on');
            if($t.hasClass('showmenu')) $('nav').addClass('on');
            else if($t.data('html') != undefined ) {
            } else if($t.closest('reguser').length > 0) {
                if (window.location.href.toString().toLowerCase().indexOf(divpanel) <= 0) {
                    var fid = $(this).data('menu').split('`')[0];
                    if ($('#AC' + fid).html()) {
                        $('.aibcontent:not(:hidden)', cntr).addClass("d-none"); $('#AC' + fid).removeClass("d-none"); $('main').scrollTop();
                        $('input[autofocus]', '#AC' + fid).focus();
                    } else {
                        loadPage($(this));
                    }
                }
            } else if($t.closest('div').attr('id') == "dscolors") {
    //            if($t.closest('dialog').attr('id') == 'dscolors') {
                    var hlight = $('#dscolors a').map(function() { return $(this).text().trim(); }).get().join(" ");
                    $('body').removeClass(hlight).addClass($t.text());
    //            }
                //} else if(href.indexOf('.html') >0) {
                //    var lnk = href.replace('.html','');
                //    try {
                //        $.get(API1 + 'gethtml/m/' + lnk, function(d) {
                //            $('main').html(d);
                //            $(".get-location").length && "geolocation" in navigator ? $(".location-support").html('Your browser and device <strong class="green">support</strong> Geolocation.') : $(".location-support").html("Your browser and device <strong class='red'>support</strong> Geolocation.");
                //            window.scroll({top: 0,left: 0,behavior: 'smooth'});
                //        }); 
                //    } catch (e) {}
            } else 
            e.preventDefault(); 
        });
    */
    if ($('.reguser').length > 0)
        $('.reguser a:first').trigger('click').addClass('active');
    /*
        $('[data-theme-switch]').each(function(){ 
            $('i',$(this)).toggleClass('fa-moon fa-sun stext yellow');
            if($('body').hasClass('aithl9')) { 
                $("input", $(this)).prop("checked", ''); 
            } else { 
                $("input", $(this)).prop("checked", "checked");
            } 
        });
        $(document).off('click', '.get-location').on("click", '.get-location', function () {
            x = $('.location-coordinates');
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    x.html("Latitude: " + position.coords.latitude +
                    "<br>Longitude: " + position.coords.longitude);
                    //ifsrc = 'https://maps.google.com/?ie=UTF8&amp;ll=' + position.coords.latitude + ',' + position.coords.longitude + '&amp;t=h&amp;z=17&amp;output=embed';
                    //$('.location-map').attr('src', ifsrc);
                });
            } else {
                x.html("Geolocation is not supported by this browser.");
            }
        });
    */

    $('.themeswitch').each(function () {
        $('i', $(this)).toggleClass('fa-moon fa-sun stext yellow');
        if ($('body').hasClass('aithl9')) {
            $("input", $(this)).prop("checked", '');
        } else {
            $("input", $(this)).prop("checked", "checked");
        }
    });
    sharebuttons('fwmb');
    //$.ajax({
    //    url: urlj, data: { f: "pMS1vLWxvZ2luMDA5OTAwMQ==", c: sessionidstring, r: true, v: "", v2: "", m: 1, "f[searchcolumn]": "test" }, dataType: "html", type: "post", success: function (data) {
    //        //url: urlf, data: { f: aicodeto(datalq0, apf, apfr, apiscoding), c: sessionstring, r: (apr == undefined ? true : false) }, dataType: "html", type: "post", success: function (data) {
    //        $('body').append(data);
    //    }, error: function () {
    //        //if (ape != undefined) {
    //        //    if (typeof ape == "function")
    //        //        ape(data);
    //        //}
    //        toastr["error"]("Failure! May try again ...");
    //    }
    //});

});

/*
$(document).off('click', 'a[data-menu], button[data-menu]').on('click', 'a[data-menu], button[data-menu]', function (e) {
    e.preventDefault();
    $t = $(this);
    var fid = $t.data('menu').split('`')[0];
    $('#openforms a, aside.l a, nav.sidebar a').removeClass('active'); $(this).addClass('active'); $('#openforms a[data-menu^=' + fid + ']').addClass('active');
    if ($('#AC' + fid).html()) {
        $('.aibcontent:not(:hidden)', cntr).addClass("d-none"); $('#AC' + fid).removeClass("d-none"); $('main').scrollTop();
        $('input[autofocus]', '#AC' + fid).focus();
    } else {
        loadPage($t);
    }
    if (ismobile && $('body').hasClass("on")) $("#wrapper input").trigger("click");
});
$(document).off('click', 'a[data-html], button[data-html]').on('click', 'a[data-html], button[data-html]', function (e) {
    e.preventDefault();
    $t = $(this);
    var fid = $t.data('menu').split('`')[0];
    $('#openforms a, aside.l a, nav.sidebar a').removeClass('active'); $(this).addClass('active'); $('#openforms a[data-menu^=' + fid + ']').addClass('active');
    if ($('#AC' + fid).html()) {
        $('.aibcontent:not(:hidden)', cntr).addClass("d-none"); $('#AC' + fid).removeClass("d-none"); $('main').scrollTop();
        $('input[autofocus]', '#AC' + fid).focus();
    } else {
        loadPage($t);
    }
});
*/
$(document).off('click', 'a.aicollapse, button.aicollapse').on('click', 'a.aicollapse, button.aicollapse', function (e) {
    e.preventDefault();
    $(this).toggleClass('open'); //$t.next('div').slideToggle();
});
//$(document).off('click', 'a.showdialog, button.showdialog').on('click', 'a.showdialog, button.showdialog', function (e) {
//    e.preventDefault();
//    $t = $(this);
//    var sel = '#' + $t.data('id'); sel = sel.replace("##", "#");
//    $(sel).removeClass('off animate__animated animate__fadeOutDownBig').addClass('onf animate__animated animate__fadeInUpBig');
//    $('.aioverlay').addClass('active');
//    $('footer').removeClass('on');
//});
$(document).off('click', 'a.aidclose, button.aidclose').on('click', 'a.aidclose, button.aidclose', function (e) {
    e.preventDefault();
    $t = $(this);
    $t.closest('.aicard').removeClass('onf');
    //$t.closest('.aicard').removeClass('onf animate__animated animate__fadeInUpBig').addClass('animate__animated animate__fadeOutDownBig');
    $('.aioverlay').removeClass('active');
    $('footer').addClass('on');
});
// $(document).off('click', 'a.back-to-top, button.back-to-top').on('click', 'a.back-to-top, button.back-to-top', function (e) {
//     e.preventDefault();
//     window.scroll({ top: 0, left: 0, behavior: 'smooth' });
// });
// $(document).off('click', 'a.themeswitch, button.themeswitch').on('click', 'a.themeswitch, button.themeswitch', function (e) {
//     e.preventDefault();
//     var checkBoxes = $("input", $(this)); checkBoxes.prop("checked", !checkBoxes.prop("checked"));
//     var r = $(':root, ::before, ::after');
//     var ffas = 'AdminTheme'; if (!ffac) ffas = "SiteTheme";
//     if (!checkBoxes.prop("checked")) {
//         $('body').removeClass('darken').addClass('lighten');
//         //r.css(atrtl);
//         //localStorage.setItem(ffas, 'aithl9');
//         $('.themeswitch').each(function () { $('i', $(this)).toggleClass('fa-moon fa-sun stext yellow'); $("input", $(this)).prop("checked", ''); })
//     }
//     else {
//         $('body').removeClass('lighten').addClass('darken');
//         //r.css(atrtd);
//         //localStorage.setItem(ffas, 'aithd9');
//         $('.themeswitch').each(function () { $('i', $(this)).toggleClass('fa-moon fa-sun stext yellow'); $("input", $(this)).prop("checked", "checked"); })
//     }
// });

$(document).off('click', 'a.aiclose, button.aiclose').on('click', 'a.aiclose, button.aiclose', function (e) {
    e.preventDefault();
    $(this).closest('nav,aside').removeClass('on');
});
$(document).off('click', 'a.regback, button.regback').on('click', 'a.regback, button.regback', function (e) {
    e.preventDefault();
    $('.reguser a.active').removeClass('active').prev('a').addClass('active').trigger('click');
});
$(document).off('click', 'a.regskip, button.regskip').on('click', 'a.regskip, button.regskip', function (e) {
    e.preventDefault();
    $c = $('.reguser a.active');
    $c.removeClass('active'); $c.next('a').addClass('active').trigger('click');
});
// Paste fix for contenteditable
/*editor start*/
$(document).off('click', 'a[data-command], button[data-command]').on('click', 'a[data-command], button[data-command]', function (e) {
    e.preventDefault();
    var command = $(this).data('command'); // for editor command
    var idoc = document; var idoc1;
    var $c = $(this).closest('.aieditor');
    if ($c.length == 0) {
        $i = $('iframe', $(this).closest(".neweditor"));
        $c = $i.contents().find('body');
        idoc1 = $i[0].contentWindow;
        idoc = $i[0].contentWindow || $i[0].contentDocument.defaultView;
        if (idoc.document) idoc = idoc.document;
    } else { }
    $('.editor:not(.aihide), .aiedit:not(.aihide)', $c).setfocus();
    //movetosavedrange();
    if (command == 'code') {
        if ($(this).hasClass('active')) {
            $('.aiedit', $c).html($('.editor', $c).val());
        } else {
            $('.editor', $c).val($('.aiedit', $c).html());
        }
        $i[0].contentDocument.cpath = cc;
        idoc1.showeditor($(this).hasClass('active'), cc);
        $('.editor, .aiedit', $c).toggleClass('aihide'); $(this).toggleClass('active');
    } else if (command == "formatcode") {
        $i = $('iframe', $(this).closest(".neweditor"));
        idoc1 = $i[0].contentWindow;
        //idoc1.beautifyeditor();
    } else if (' h1 h2 h3 h4 h5 h6 p table div section article '.indexOf(command) > 0) {
        idoc.execCommand('formatBlock', false, command);
    } else if (command == 'forecolor' || command == 'backcolor') {
        idoc.execCommand(command, false, $(this).data('value'));
    } else if (command == 'createlink' || command == 'insertimage') {
        url = prompt('Enter the link here: ', 'http:\/\/');
        idoc.execCommand(command, false, url);
    } else if (command == 'insertimg') {

    } else if (command == 'insertHTML') {
        idoc.execCommand(command, false, $('#tmplactbtn1').html());
    // } else if (command == "bold") {
    //     const strongElement = document.createElement("strong");
    //     const userSelection = window.getSelection();
    //     const selectedTextRange = userSelection.getRangeAt(0);
    //     selectedTextRange.surroundContents(strongElement);
    } else {
        idoc.execCommand(command, false, null);
    }
});

$(document).off('click', '.ai-tabs > button, .ai-tabs > a').on('click', '.ai-tabs > button, .ai-tabs > a', function (e) {
    e.preventDefault();
    alltabs($(this), e);
});
$(document).off('mouseenter', '.ai-tabshover button, .ai-tabshover a').on('mouseenter', '.ai-tabshover button, .ai-tabshover a', function (e) {
    e.preventDefault();
    alltabs($(this), e);
});
$(document).off('focusout', '.aiedit').on('focusout', '.aiedit', function () {
    $('.editor', $(this).closest('.aieditor')).val($(this).html());
});
$(document).off('focusout', '.editor').on('focusout', '.editor', function () {
    $('.aiedit', $(this).closest('.aieditor')).html($(this).val());
});
$(document).off('mouseup touchend keyup', '.aiedit').on("mouseup touchend keyup", '.aiedit', function (e) {
    e.preventDefault();
    if (window.getSelection().focusNode != null) {
        /*$('.divsel').removeClass('divsel');
        selectedElement = window.getSelection().focusNode.parentNode;
        //debugger;
        if (selectedElement.tagName == "DIV")
            $(selectedElement).addClass('divsel');
        else if (selectedElement.tagName == "TD")
            $(selectedElement).closest('table').addClass('divsel');
        else if (selectedElement.tagName == "LI")
            $(selectedElement).closest('ul').addClass('divsel');
        else
            $(selectedElement).closest('div').addClass('divsel');*/
    }
});
$(document).off('paste', '.aiedit').on('paste', '.aiedit', function (e) {
    e.preventDefault();

    if (window.clipboardData) {
        content = window.clipboardData.getData('Text');
        if (window.getSelection) {
            var selObj = window.getSelection();
            var selRange = selObj.getRangeAt(0);
            selRange.deleteContents();
            selRange.insertNode(document.createTextNode(content));
        }
    } else if (e.originalEvent.clipboardData) {
        content = (e.originalEvent || e).clipboardData.getData('text/plain');
        document.execCommand('insertText', false, content);
    }
});
$(document).off('blur', '.aiedit').on('blur', '.aiedit', function () {
    if (window.getSelection) { savedRange = window.getSelection().getRangeAt(0); }
    else if (document.selection) { savedRange = document.selection.createRange(); }
    $(this).data('cursor', savedRange);
});
$(document).off('focusin', 'input:not(:checkbox):not(:radio):not([type=file]), select, textarea').on('focusin', 'input:not(:checkbox):not(:radio):not([type=file]), select, textarea', function () {
    if (this.value == '')
        $("+label", $(this)).addClass("iactive1");
    //var $clbl = $('label', $(this).closest('div')); var vlbl = $clbl.text();
    //if ($(this).val() != vlbl && "" != $(this).val()) $clbl.addClass('iactive1').removeClass('iinactive');
    //if ("" === $(this).val()) $clbl.removeClass('iinactive iactive1');
    //if ($(this).hasClass('ddl') || $(this).hasClass('mddl')) $clbl.addClass('iinactive');
});
$(document).off('focusout', 'input:not(:checkbox):not(:radio):not([type=file]), select, textarea').on('focusout', 'input:not(:checkbox):not(:radio):not([type=file]), select, textarea', function () {
    if (this.value == '')
        $("+label", $(this)).removeClass("iactive1");

    //var $clbl = $('label', $(this).closest('div')); var vlbl = $clbl.text();
    //if ($(this).val() != vlbl && "" != $(this).val()) $clbl.addClass('iinactive');
    //if ("" === $(this).val()) $clbl.addClass('iinactive');
});
/* end Editor */
$(document).off('click', '.tocopy > *').on('click', '.tocopy > *', function (e) {
    e.preventDefault();
    var text1 = $(this)[0].outerHTML;
    copyTextToClipboard(text1);
});
$(document).off('click', '#takescreenshot').on('click', '#takescreenshot', function (e) {
    e.preventDefault();
    element000 = $("main")[0];
    html2canvas(element000, { dpi: 144, scale: 1 }).then(canvas => { console.log(canvas.toDataURL()); });
});
$(document).off('click', 'a[data-callback], button[data-callback]').on('click', 'a[data-callback], button[data-callback]', function (e) {
    var ddf = $(this).data();
    if (ddf.callback != undefined) {
        if (typeof ddf.callback == "function")
            ddf.callback(this, ddf);
    }
});
// aifetchu(called from form code, button data, form data, form input searilize querystring, after success callback function, after error callback function)
// aifetchq(called from form code, sql query, after success callback function, after error callback function)
// aifetchc(form code, called from form code, after success callback function, replace common, after error callback function)
/*
function aifetcha(apfr, appfr, apd, apf, apw, aps, ape, apiscoding) {
    var urlaj = unstr(apd.service).length > 0 ? urla + apd.service : urlj;

    $.ajax({
        url: urlaj, data: { l: aicodeto(datalu0, apfr, appfr, apiscoding), d: apd, f: apf, w: apw }, type: "post", dataType: "text", success: function (data) {
            if (aps != undefined) {
                if (typeof aps == "function")
                    aps(data);
            }
        }, error: function () {
            //if (ape != undefined) {
            //    if (typeof ape == "function")
            //        ape(data);
            //}
            toastr["error"]("Failure! May try again ...");
        }
    });
}

//aifetchu(fd.slice(fd.length - 6), { "value": "" }, { "insertupdate": "FormClose", "condition": "", "qtype": "g" }, "");
function aifetchu1(apfr, apd, apf, apw, aps, ape) {
    var urlaj = unstr(apd.service).length > 0 ? urla + apd.service : urlj;

    $.ajax({
        url: urlaj, data: { l: aicodeto(datalu0, apfr), d: apd, f: apf, w: apw }, type: "post", dataType: "text", success: function (data) {
            if (aps != undefined) {
                if (typeof aps == "function")
                    aps(data);
            }
        }, error: function () {
            //if (ape != undefined) {
            //    if (typeof ape == "function")
            //        ape(data);
            //}
            toastr["error"]("Failure! May try again ...");
        }
    });
}
*/
$(document).off("click", ".testdata").on("click", ".testdata", function (e) {
    e.preventDefault();
    var checkBoxes = $("input", $(this)); checkBoxes.prop("checked", !checkBoxes.prop("checked"));
    if (!checkBoxes.prop("checked")) tsbd = 'WebAPIt';
    tsbd = (!checkBoxes.prop("checked")) ? 'WebAPIt' : sbd;
    localStorage.setItem('td', tsbd);
    if (tsbd == "WebAPIt") { $('#tsbd').removeClass('green').addClass('red'); $('.testdata').each(function () { $("input", $(this)).prop("checked", ""); }); } else { $('#tsbd').removeClass('red').addClass('green'); $('.testdata').each(function () { $("input", $(this)).prop("checked", "checked"); }); }
});
//$(document).off("click", ".navonn").on("click", ".navonn", function (e) {
//    e.preventDefault();
//    $('body,footer,nav').toggleClass('onn');
//    localStorage.setItem('navonn', $('body').hasClass('onn') ? '' : 'onn');
//});
$(document).off('click', 'a.settings, button.settings').on('click', 'a.settings, button.settings', function (e) {
    e.preventDefault();
    $('aside.sidebar').toggleClass('on');
});
$(document).off('error', 'img').on('error', 'img', function () { $(this).attr('src', 'img/aim.png'); });
// on first focus (bubbles up to document), open the menu
$(document).on('focus', '.select2-selection.select2-selection--single', function (e) {
    $(this).closest(".select2-container").siblings('select:enabled').select2('open');
});
// steal focus during close - only capture once and stop propogation
$('select.select2').on('select2:closing', function (e) {
    $(e.target).data("select2").$selection.one('focus focusin', function (e) {
        e.stopPropagation();
    });
});

function alltabs($t, $e) {
    $e.preventDefault();
    var $c = $t.closest('div'); var $a = $c.data('active'); var d = $c.data("tabs");
    var t = $t.index();
    $("button, a", $c).removeClass($a);
    $t.addClass($a);
    var $d = $("#" + d + " > div");
    $d.addClass("aihide");
    if ($t.closest('.w3-dropdown-content') != undefined) {
        var nn = $d.length / 2;
        $d.eq(t).removeClass("aihide");
        //$d.eq(t+nn).removeClass("aihide");
    }
    try {
        eval($c.data('callback') + '($c,$t,t,$d)');
    } catch (e) {

    }
}

/* Admin Start Javascript */

//editor setfocus function
(function ($) {
    $.fn.setfocus = function () {
        $(this).focus(); savedRange1 = $(this).data('cursor');
        if (savedRange1 != null) {
            if (window.getSelection) {
                var s = window.getSelection();
                if (s.rangeCount > 0)
                    s.removeAllRanges();
                s.addRange(savedRange1);
            }
            else if (document.createRange) { window.getSelection().addRange(savedRange1); }
            else if (document.selection) { savedRange1.select(); }
        }
        return this;
    };
}(jQuery));

function movetosavedrange() {
    if (savedRange != null) {
        if (window.getSelection)//non IE and there is already a selection
        {
            var s = window.getSelection();
            if (s.rangeCount > 0)
                s.removeAllRanges();
            s.addRange(savedRange);
        }
        else if (document.createRange)//non IE and no selection
        {
            window.getSelection().addRange(savedRange);
        }
        else if (document.selection)//IE
        {
            savedRange.select();
        }
    }
}
/*
function loadlistq1(obj, qry, s) {
    var ddf = obj.data(); cid = obj.attr("id");
    aifetchq(cid.slice(cid.length - 6), qry, function (data) {
        if (ddf.bcallback != undefined) {
            var fn = ddf.bcallback + "(data);"; eval(fn);
        }
        var templ = $("#" + obj.data('template')).html();
        if (s != undefined) templ += s;
        var info = Handlebars.compile(templ);
        Handlebars.registerHelper(hlpfunctions);
        obj.append(info(data));
        if (ddf.callback != undefined) {
            var fn = ddf.callback + "(data);"; eval(fn);
        }
    });
}
function loadlist(vt, vf, vr, vv, vv1, vv2, vs, ve) {
    var ddf = obj.data(); cid = obj.attr("id");
    //var prm = { l: aicodeto(datalq0, cid.slice(cid.length - 6)), f: ddf, 'search[value]': '', 'length': 9999, start: 0 };
    var prm = { f: vf, c: sessionidstring, r: vr, v: vv, v1: vv1 }
    $.ajax({
        url: urlj, data: prm, type: "post", dataType: "json", success: function (data) {
            if (data.data1 != "") {
                if (ddf.bcallback != undefined) {
                    var fn = ddf.bcallback + "(data);"; eval(fn);
                }
                var templ = $("#" + obj.data('template')).html();
                var info = Handlebars.compile(templ);
                Handlebars.registerHelper(hlpfunctions);
                obj.append(info(data));
                if (ddf.callback != undefined) {
                    var fn = ddf.callback + "(data);"; eval(fn);
                }
            }
        }
        , error: function () {
            toastr["error"]("Failure! May try again ..."); bsuccess = false;
        }
    });
}
*/


function sharebuttons(s) {
    var rstr = '<div class="sticky-sm-bottom"><ul class="nav nav-pills nav-fill">';
    var lnk = window.location.href;
    if (s.indexOf('f') >= 0) rstr += '<li class="nav-item"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=' + lnk + '" class="nav-link"><i class="fab fa-facebook-f"></i></a></li>';
    if (s.indexOf('t') >= 0) rstr += '<li class="nav-item"><a target="_blank" href="https://twitter.com/home?status=' + lnk + '" class="nav-link bg-blue"><i class="fab fa-twitter"></i></a></li>';
    if (s.indexOf('w') >= 0) rstr += '<li class="nav-item"><a target="_blank" href="https://api.whatsapp.com/send?text=' + lnk + '" class="nav-link bg-green"><i class="fab fa-whatsapp"></i></a></li>';
    if (s.indexOf('m') >= 0) rstr += '<li class="nav-item"><a target="_blank" href="sms:&body=' + lnk + '" class="nav-link bg-gray"><i class="fa fa-envelope-o"></i></a></li>';
    if (s.indexOf('s') >= 0) rstr += '<li class="nav-item"><a target="_blank" href="#" data-id="dsshare" class="nav-link bg-red"><i class="fa fa-share-alt"></i></a></li>';
    if (s.indexOf('b') >= 0) rstr += '<li class="nav-item"><a href="#" class="nav-link bg-gray back-to-top"><i class="fa fa-arrow-up"></i></a></li>';
    rstr += '</ul></div>';
    $('.sharebuttons').html(rstr);

/*
<a href="https://twitter.com/intent/tweet?text=%E0%A4%96%E0%A5%82%E0%A4%B7%E0%A4%96%E0%A4%AC%E0%A4%B0%21%20%E0%A4%86%E0%A4%B2%E0%A4%BE%20%E0%A4%B0%E0%A5%87%20%E0%A4%86%E0%A4%B2%E0%A4%BE...%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A5%8D%E0%A4%B8%E0%A5%82%E0%A4%A8%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A4%20%E0%A4%86%E0%A4%B2%E0%A4%BE...&amp;url=https://pudhari.news/maharashtra/pune/806211/good-news-monsoon-entered-in-maharashtra/ar" rel="external noopener nofollow" title="Twitter" target="_blank" class="twitter-share-btn " data-raw="https://twitter.com/intent/tweet?text={post_title}&amp;url={post_link}">
<a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://pudhari.news/maharashtra/pune/806211/good-news-monsoon-entered-in-maharashtra/ar&amp;title=%E0%A4%96%E0%A5%82%E0%A4%B7%E0%A4%96%E0%A4%AC%E0%A4%B0%21%20%E0%A4%86%E0%A4%B2%E0%A4%BE%20%E0%A4%B0%E0%A5%87%20%E0%A4%86%E0%A4%B2%E0%A4%BE...%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A5%8D%E0%A4%B8%E0%A5%82%E0%A4%A8%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A4%20%E0%A4%86%E0%A4%B2%E0%A4%BE..." rel="external noopener nofollow" title="LinkedIn" target="_blank" class="linkedin-share-btn " data-raw="https://www.linkedin.com/shareArticle?mini=true&amp;url={post_full_link}&amp;title={post_title}">
<a href="https://pinterest.com/pin/create/button/?url=https://pudhari.news/maharashtra/pune/806211/good-news-monsoon-entered-in-maharashtra/ar&amp;description=%E0%A4%96%E0%A5%82%E0%A4%B7%E0%A4%96%E0%A4%AC%E0%A4%B0%21%20%E0%A4%86%E0%A4%B2%E0%A4%BE%20%E0%A4%B0%E0%A5%87%20%E0%A4%86%E0%A4%B2%E0%A4%BE...%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A5%8D%E0%A4%B8%E0%A5%82%E0%A4%A8%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A4%20%E0%A4%86%E0%A4%B2%E0%A4%BE...&amp;media=https://d2n2y7fp2ncdvv.cloudfront.net/files/2024/05/29104759/Monsoon-File-Photo-1-1.jpg" rel="external noopener nofollow" title="Pinterest" target="_blank" class="pinterest-share-btn " data-raw="https://pinterest.com/pin/create/button/?url={post_link}&amp;description={post_title}&amp;media={post_img}">
<a href="https://api.whatsapp.com/send?text=%E0%A4%96%E0%A5%82%E0%A4%B7%E0%A4%96%E0%A4%AC%E0%A4%B0%21%20%E0%A4%86%E0%A4%B2%E0%A4%BE%20%E0%A4%B0%E0%A5%87%20%E0%A4%86%E0%A4%B2%E0%A4%BE...%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A5%8D%E0%A4%B8%E0%A5%82%E0%A4%A8%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A4%20%E0%A4%86%E0%A4%B2%E0%A4%BE...%20https://pudhari.news/maharashtra/pune/806211/good-news-monsoon-entered-in-maharashtra/ar" rel="external noopener nofollow" title="WhatsApp" target="_blank" class="whatsapp-share-btn " data-raw="https://api.whatsapp.com/send?text={post_title}%20{post_link}">
*/    
}


function aiLazy(cobj) {
    var width = $(window).width();
    var height = $(window).height();
    if ((width >= 1280) && (height >= 1024)) {
        $('img:not(.b-loaded)', cobj).each(function () { $(this).attr('src', $(this).data('src')); $(this).addClass('b-loaded'); });
    } else {
        $('img:not(.b-loaded)', cobj).each(function () { $(this).attr('src', $(this).data('small') == undefined ? $(this).data('src') : $(this).data('small')); $(this).addClass('b-loaded'); });
    }
}

function showimg(p, s) {
    var si = s.split(',');
    var ri = "";
    for (i = 0; i < si.length; i++) {
        ri += '<div class="aioh"><img class="aiw100 b-lazy aie2" src="' + p + 'u/' + si[i] + '" data-src="' + p + 'u/' + si[i].replace('--100.', '--480.') + '"></div>';
    }
    return ri;
}

function showimg1(p, s) {
    var si = s;
    var ri = "";
    for (i = 0; i < si.length; i++) {
        ri += '<div class="aioh"><img class="aiw100 b-lazy aie2" src="' + p + '/u/' + si[i].ImageDir + si[i].ImageFileName.replace(si[i].ImageFileType, '--100' + si[i].ImageFileType) + '" data-src="' + p + '/u/' + si[i].ImageDir + si[i].ImageFileName.replace(si[i].ImageFileType, '--480' + si[i].ImageFileType) + '"></div>';
    }
    return ri;
}
function showimg2(p, s, h) {
    var si = s;
    var ri = "";
    for (i = 0; i < si.length; i++) {
        //ri += '<div class="aioh"><img class="aiw100 b-lazy aie2" src="' + p + '/u/' + si[i].ImageDir + si[i].ImageFileName.replace(si[i].ImageFileType, '--100' + si[i].ImageFileType) + '" data-src="' + p + '/u/' + si[i].ImageDir + si[i].ImageFileName.replace(si[i].ImageFileType, '--480' + si[i].ImageFileType) + '"></div>';
        ri += '<figure class="aioh"><div><img src="' + p + '/u/' + si[i].ImageDir + si[i].ImageFileName.replace(si[i].ImageFileType, '--100' + si[i].ImageFileType) + '" data-src="' + p + '/u/' + si[i].ImageDir + si[i].ImageFileName.replace(si[i].ImageFileType, '--480' + si[i].ImageFileType) + '" class="b-lazy ai-object aie2"> </div><figcaption><div class="h5">' + h + '</div></figcaption></figure>'
    }
    return ri;
}
function initl(nm) { var matches = nm.match(/\b(\w)/g); var acronym = matches.join(''); return '<span class="aibadgein  aith3 aipa8 air8">' + acronym + '</span>'; }

/* to include  $('.reguser a:first') */
function AFOnRegLoad(dt) {
    $('.reguser a.active').removeClass('active').next('a').addClass('active').trigger('click');
}
function AFOnRegLoad1(dt) {

    $.post("aim.asmx/sendmailg", { t: "jms0074u@gmail.com", s: "Registration", ms: dt, tm: "registeremail" }, function (data) {
        if (window.location.href.toString().toLowerCase().indexOf(divpanel) <= 0)
            $('main').remove();
    });
    tload = confirm('You are successfully Registered ... Start Another New Registration ... ?');
    if (tload) {
        if (window.location.href.toString().toLowerCase().indexOf(divpanel) <= 0) {
            location.reload();
        }
    } else { }
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        toastr["success"]('Fallback: Copying text command was ' + msg);
    } catch (err) {
        toastr["failure"]('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        toastr["success"]('Async: Copying to clipboard was successful!');
    }, function (err) {
        toastr["failure"]('Async: Could not copy text: ', err);
    });
}

/* Admin End Javascript */

// Code to handle install prompt on desktop

var defPrompt;
window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    defPrompt = e;
    $('#installpwa').removeClass("d-none");
    $('#btnInstallpwa').click(function () {
        defPrompt.prompt();
        defPrompt.userChoice.then(function (cr) {
            if (cr.outcome === "accepted") {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            defPrompt = null;
        });
    });
    return false;
});

/*
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
const node = document.querySelector(element);

node.classList.add(`${prefix}animated`, animationName);

// When the animation ends, we clean the classes and resolve the Promise
function handleAnimationEnd(event) {
    event.stopPropagation();
    node.classList.remove(`${prefix}animated`, animationName);
resolve('Animation ended');
}

node.addEventListener('animationend', handleAnimationEnd, {once: true});
});
*/
jQuery.cachedScript = function (url, options) {

    // Allow user to set any option except for dataType, cache, and url
    options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
    });

    // Use $.ajax() since it is more flexible than $.getScript
    // Return the jqXHR object so we can chain callbacks
    return jQuery.ajax(options);
};



function toggleDropdown(e) {
  const _e = $(e.target), _d = $(e.target).closest('.dropdown'),
    _m = $('.dropdown-menu', _d)
  setTimeout(
    function () {
      const shouldOpen = e.type !== 'click' && _d.is(':hover');
      _m.toggleClass('show', shouldOpen);
      _d.toggleClass('show', shouldOpen);
      $('[data-bs-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
      _m.attr("data-bs-popper", shouldOpen ? _e.attr("data-bs-display") : "");
    },
    e.type === 'mouseleave' ? 100 : 0
  )
}

$('body').off('mouseenter mouseleave', '.dropdown').off('click', '.dropdown-menu a')
  .on('mouseenter mouseleave', '.dropdown', toggleDropdown)
  .on('click', '.dropdown-menu a', toggleDropdown);

// const rootElement = document.body;
// const tagTree = getTagTree(rootElement);
// console.log(tagTree);
function getTagTree(element) {
  const tree = {
    tagName: element.tagName.toLowerCase(),
    children: []
  };

  for (const child of element.children) {
    tree.children.push(getTagTree(child));
  }

  return tree;
}

