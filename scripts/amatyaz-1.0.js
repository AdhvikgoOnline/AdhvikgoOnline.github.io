/*
== Query string functions
Get the value of a query string parameter by name from a URL
getQS("q2", window.location);

Get the value of a query string parameter by name from a query string
getqueryVariable(window.location, "q2");
console.log(getQueryVariable('x'));

*/
// toastr settings 
toastr.options = { "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": true, "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300", "hideDuration": "1000", "timeOut": "3500", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut" };
const aifc = 'main'; const fromlink = /[`~!@#$%^&*()|+-=?;:'",.<>{}[]\/\s]/gi;

// on page load settings and functions for website / amatyaz
$(function () {
    var os = getMobileOperatingSystem();
    $('body').addClass(os);
    if (os == 'android') {
        $('#installpwa').trigger('click');
    }

    $('.loadpage').each(function () { loadPage($(this), this); });

});
// on page load settings and functions for website
$(function () {
});
// on page load settings and functions for amatyaz
$(function () {
});


// Link or Query String Manipulation Functions
function getQS(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return undefined;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getQueryVariable(query, variable) {
    //var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    toastr["error"](`Query variable ${variable} not found`);
}
// url parameters
var urlParams;
(window.onpopstate = function () {
    var match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();


// link click functions
$(document).off('click', 'a[data-f], button[data-f]').on('click', 'a[data-f], button[data-f]', function (e) {
    e.preventDefault(); 
    $t = $(this);
    var fid = $t.data('f').split('`')[0];
    $('.nav .nav-link').removeClass('active'); $(this).addClass('active'); $('#openforms a[data-f^=' + fid + ']').addClass('active');
    fid = fid.toString().paddingLeft("000000");
    if ($('#AC' + fid).html()) {
        let cntr = unstr($t.data("container"), aifc);
        $('article:not(:hidden)', cntr).addClass("d-none"); $('#AC' + fid).removeClass("d-none"); //$('main').scrollTop();
        $('input[autofocus]', '#AC' + fid).focus();
    } else {
        loadPage($t, this);
    }
    if (ismobile) $(".menutoggle, #btnverticalnav").trigger("click");
});
$('body').off('click', '.callmenud, .callmenu').on('click', '.callmenud, .callmenu', function() {
    subform(this, $(this).hasClass("showdialog"));
});
function subform(t, d) {
    var fid = ""; var frm;
    if(t.closest("article") != undefined) {
      frm = t.closest("article,dialog"); fid = frm.id.replace("AC", '');
    } 
    t.id = "sub" + Math.floor(Math.random() * 10000000000) + '_' + fid;
    
    let v = t.dataset.menu; 
    let s = unstr(t.dataset.style);
    if(v == undefined) return; 

    let f = "#aims" + v; 
    if(d) $(f).addClass('showdialog');
    let fnew = window["aims" + v];
    if(fnew != undefined)
    if(fnew.dataset != undefined)
        fnew.dataset.style = s;
    //$(f).data("style", s);
    let c = t.dataset.menuc;
    if(c != undefined) {
        $(f).data('menuc', c);
    }
    $(f).data("calledfrom", t.id);
    $(f).trigger('click');
}


// encode decode functions
function aicodeto(str, frmc, frmt, iscoding) { var sss = bootvar + str + '~' + unstr(iscoding) + unstr(frmt, "91") + frmc; return aiencode(sss); }
function aiencode(str) { return 'v' + btoa(encodeURIComponent(str)); };
function aidecode(str) { return decodeURIComponent(atob(str.substr(1))); };
// local storage and cookie functions
function fnjlocal(v, d, c, a) {
    var tvar = d;
    if (localStorage.getItem(v) != null) {
        tvar = JSON.parse(localStorage.getItem(v));
    } else {
        localStorage.setItem(v, JSON.stringify(tvar));
    }
    c(tvar);
}
function fnlocal(v, d, c, a) {
    var tvar = d;
    if (localStorage.getItem(v) != null) {
        tvar = localStorage.getItem(v);
    } else {
        localStorage.setItem(v, tvar);
    }
    c(tvar);
}

function clearall() {
    aiscke('cc', '0', 0);
    aiscke('aiui', '0', 0);
    aiscke('aiut', '0', 0);
    aiscke('aiur', '0', 0);
    aiscke('aiun', '0', 0);
    aiscke('sbd', '0', 0);
    aiscke('cl', '0', 0);
    localStorage.clear(); sessionStorage.clear();
    console.log("Data Cleared");
}

// get operating system function
/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "windowsphone";
    }

    if (/android/i.test(userAgent)) {
        return "android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
    }
    if (/windows nt/i.test(userAgent)) {
        return "windows";
    }
    return "other";
}


// Ajax Call Functions
/**
 * vt: object id or tag
 * vf: file name e.g. 1-o-login099001
 * vr: true
 * vm: menuid
 * 
 * */
function aifetchf(vt, vf, vr, vm, vsb, vsa, ve) {
    $.ajax({
        url: urlf, data: { f: vf, c: sessionstring, r: vr, m: vm, e: window.location.href }, dataType: "html", type: "post", success: function (data) {
            if (vsb != undefined) { if (typeof vsb == "function") vsb(data); }
            if (vt.length != 0) vt.prepend(data);
            if (vsa != undefined) { if (typeof vsa == "function") vsa(data); }
        }, error: function () {
            if (ve != undefined) { if (typeof ve == "function") ve(data); }
            toastr["error"]("Failure! May try again ...");
        }
    });
}
/**
 * vf: file name e.g. 1-o-login099001
 * vr: true
 * vm: menuid
 * vw: Content
 * 
 * */
function aifetchfs(vf, vr, vm, vw, vsb, ve) {
    $.ajax({
        url: urlfs, data: { f: vf, c: sessionidstring, r: vr, m: vm, w: vw, e: window.location.href }, dataType: "html", type: "post", success: function (data) {
            if (vsb != undefined) { if (typeof vsb == "function") vsb(data); }
        }, error: function () {
            if (ve != undefined) { if (typeof ve == "function") ve(data); }
            toastr["error"]("Failure! May try again ...");
        }
    });
}
/*
 * vt: template id
 * vf: "a=AppAccount&c=Account&p=UserId&m=s" 
 *     "a=AppAccount&c=Account&p=Verify&m=s"
 *        store in file pass form id only and also other basic parameters list here
 * vr: form action i.e. login, verify, insert update etc
 * vv: form serilized values 
 * vv1:
 * vv2:
 * vsb: function to be executed before success of ajax
 * vsa: function to be executed after success of ajax
 * ve: function to executed on error of ajax
 * 
 * */

function aifetchq(vt, vf, vr, vv, vv1, vv2, vsb, vsa, ve) {
    let odata = { f: vf, c: sessionidstring, r: vr, v: vv, e: window.location.href }; //, "v2": "", "m": "","length": "", "start": "", "search": "", "w": "", "dj": "","ap": ""};
    if(vv1.length > 0) odata.v1 = vv1;
    $.ajax({
        url: urlj, data: odata, type: "post", dataType: "json", success: function (data) {
            if (vsb != undefined) { if (typeof vsb == "function") vsb(data); }
            if (vt.length != 0) {
                var templ = $("#" + vt.data('template')).html();
                var info = Handlebars.compile(templ);
                Handlebars.registerHelper(hlpfunctions);
                vt.append(info(data));
                vt.data("dbrow", data);
                //$(vt.closest(".facts")).data("dbrow", data);
            }
            if (vsa != undefined) { if (typeof vsa == "function") vsa(data); }
        }, error: function () {
            if (ve != undefined) { if (typeof ve == "function") ve(data); }
            toastr["error"]("Failure! May try again ...");
        }
    });
}
// Screen Display functions
var elem = document.documentElement;
function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Share functions
$(document).off('click', '#share').on('click', '#share', function() {
    if (typeof navigator.share === 'undefined') {
        log("No share API available!");
    } else {
        navigator.share({
            title: document.title,
            url: window.location.href,
            text: ''
        })
    }
});

if (window["btnShare"] != undefined) {
    btnShare.addEventListener("click", async () => {
        try {
            await navigator.share({ title: document.title, text: document.title, url: window.location.href });
            console.log("MDN shared successfully");
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    });
}


// String functions
String.prototype.paddingLeft = function (paddingValue) {
    return String(paddingValue + this).slice(-paddingValue.length);
}; //hours.toString().paddingLeft("00");


// Date time functions
function dhms(n) {
    str = n * 1000;
    return `${moment.duration(str).days()}<sub>d</sub> ${moment.duration(str).hours()}<sub>h</sub> ${moment.duration(str).minutes()}<sub>m</sub> ${moment.duration(str).seconds()}<sub>s</sub>`;
}
function dhms1(n) {
    str = n * 1000;
    return `${moment.duration(str).days()}d ${moment.duration(str).hours()}h ${moment.duration(str).minutes()}m ${moment.duration(str).seconds()}s`;
}
function ymd(str) { return str.toString().substr(6, 4) + '-' + str.toString().substr(3, 2) + '-' + str.toString().substr(0, 2); }
function ymdt(str) { return str.toString().substr(6, 4) + '-' + str.toString().substr(3, 2) + '-' + str.toString().substr(0, 2) + (str.toString().length > 10 ? 'T' + str.toString().substr(11) : ''); }
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

function agey(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
function ageym(birthday) {
    var m = moment(birthday, "YYYY-MM-DD");
    var years = moment().diff(m, 'years', false);
    var months = moment().diff(m.add(years, 'years'), 'months', false);
    alert(years + ' years, ' + months + ' months');
}
function dtChange(s) {
    var s1 = s.split(',');
    $(s1[3]).val(moment($(s1[0]).val()).add($(s1[1]).val(), $(s1[2]).val()).format('YYYY-MM-DDTHH:mm'));
}


// Number functions
function NumberToWords() {
    var units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    var teens = ["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"];
    var tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    var othersIndian = ["Thousand", "Lakh", "Crore"];
    var othersIntl = ["Thousand", "Million", "Billion", "Trillion"];
    var INDIAN_MODE = "indian";
    var INTERNATIONAL_MODE = "international";
    var currentMode = INDIAN_MODE;
    var getBelowHundred = function (n) {
        if (n >= 100) { return "greater than or equal to 100"; };
        if (n <= 10) { return units[n]; };
        if (n <= 20) { return teens[n - 10 - 1]; };
        var unit = Math.floor(n % 10);
        n /= 10;
        var ten = Math.floor(n % 10);
        var tenWord = (ten > 0 ? (tens[ten] + " ") : '');
        var unitWord = (unit > 0 ? units[unit] : '');
        return tenWord + unitWord;
    };
    var getBelowThousand = function (n) {
        if (n >= 1000) { return "greater than or equal to 1000"; };
        var word = getBelowHundred(Math.floor(n % 100));
        n = Math.floor(n / 100);
        var hun = Math.floor(n % 10);
        word = (hun > 0 ? (units[hun] + " Hundred ") : '') + word;
        return word;
    };
    return {
        numberToWords: function (n) {
            if (isNaN(n)) { return "Not a number"; };
            var word = '';
            var val;
            val = Math.floor(n % 1000);
            n = Math.floor(n / 1000);
            word = getBelowThousand(val);
            if (this.currentMode == INDIAN_MODE) {
                othersArr = othersIndian;
                divisor = 100;
                func = getBelowHundred;
            } else if (this.currentMode == INTERNATIONAL_MODE) {
                othersArr = othersIntl;
                divisor = 1000;
                func = getBelowThousand;
            } else { throw "Invalid mode - '" + this.currentMode + "'. Supported modes: " + INDIAN_MODE + "|" + INTERNATIONAL_MODE; };
            var i = 0;
            while (n > 0) {
                if (i == othersArr.length - 1) {
                    word = this.numberToWords(n) + " " + othersArr[i] + " " + word;
                    break;
                };
                val = Math.floor(n % divisor);
                n = Math.floor(n / divisor);
                if (val != 0) {
                    word = func(val) + " " + othersArr[i] + " " + word;
                };
                i++;
            };
            return word;
        },
        setMode: function (mode) {
            if (mode != INDIAN_MODE && mode != INTERNATIONAL_MODE) {
                throw "Invalid mode specified - '" + mode + "'. Supported modes: " + INDIAN_MODE + "|" + INTERNATIONAL_MODE;
            };
            this.currentMode = mode;
        }
    }
}

function indianwords(n) {
    var num2words = new NumberToWords();
    num2words.setMode("indian");
    var indian = num2words.numberToWords(n);
    return indian;
}

// Input and Textarea Functions
$(document).off('change', '.defaultvalue').on('change', '.defaultvalue', function (e) {
    e.preventDefault(); 
    $t = $(this); v = this.value;
    SetValue($t, v, false)
});
$(document).off('input', '.aicaps').on('input', '.aicaps', function () {
    let p = this.selectionStart; this.value = this.value.toUpperCase(); this.setSelectionRange(p, p);
});
$(document).on('input', 'input.allcaps', function () {
    let p = this.selectionStart; this.value = this.value.toUpperCase(); this.setSelectionRange(p, p);
});
$(document).on('input', 'input.initialcaps', function () {
    uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
    let p = this.selectionStart; this.value = uppercaseWords(this.value.toLowerCase()); this.setSelectionRange(p, p);
});
$(document).on('input', 'input.numbers', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});
function GeneralCall(f0) {
    var f1 = f0.slice(1);
    $("input.tdl, input.ddf, input.ddt, input.ddl, input.mddl, select", f0).each(function () { if ($(this).hasClass('ddf') || $(this).hasClass('ddt') || $(this).hasClass('ddl') || $(this).hasClass('mddl')) { selectkey(this); } else if ($(this).hasClass('tdl')) { selecttype(this); } });
    //$(".aieditor", f0).prepend("<div class='aitoolbar ais aipr clearfix'> <nav> <ul class='aimnavnav'> <li><a href='javascript:void(0)' tabindex='-1' data-command='bold'><i class='fa fa-bold'></i></a> <ul class='aimsubmenu'> <li><a href='javascript:void(0)' tabindex='-1' data-command='italic'><i class='fa fa-italic'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='underline'><i class='fa fa-underline'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='strikeThrough'><i class='fa fa-strikethrough'></i></a></li> </ul> </li> <li><a href='javascript:void(0)' tabindex='-1' data-command='justifyLeft'><i class='fa fa-align-left'></i></a> <ul class='aimsubmenu'> <li><a href='javascript:void(0)' tabindex='-1' data-command='justifyCenter'><i class='fa fa-align-center'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='justifyRight'><i class='fa fa-align-right'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='justifyFull'><i class='fa fa-align-justify'></i></a></li> </ul> </li> <li><a href='javascript:void(0)' tabindex='-1' data-command='indent'><i class='fa fa-indent'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='outdent'><i class='fa fa-outdent'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='insertUnorderedList'><i class='fa fa-list-ul'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='insertOrderedList'><i class='fa fa-list-ol'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='h1'>H1</a> <ul class='aimsubmenu'> <li><a href='javascript:void(0)' tabindex='-1' data-command='h2'>H2</a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='h3'>H3</a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='h4'>H4</a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='h5'>H5</a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='h6'>H6</a></li> </ul> </li> <li><a href='javascript:void(0)' tabindex='-1' data-command='table'>table</a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='createlink'><i class='fa fa-link'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='unlink'><i class='fa fa-unlink'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='insertimage'><i class='fa fa-image'></i></a></li> <li><a tabindex='-1' data-command='insertimg' id='1editort" + f1.replace('F00','') + "PFull'  data-id='#PP" + f1 + "' data-menu='099019`4002``000000001```0`1024px' data-parent='" + f1 + "' data-images='#t4002PFImages' class='opensubform' data-prefix='posid' data-folder='pos/' data-imagesize='0100011000' data-croparea='1.3333333333333333' data-thumbsize='100'><i class='fa fa-image'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='p'>P</a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='subscript'><i class='fa fa-subscript'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='superscript'><i class='fa fa-superscript'></i></a></li> <li><a href='javascript:void(0)' tabindex='-1' data-command='code'><i class='fas fa-code'></i></a></li> </ul> </nav> </div> ");
    $("input.combodate", f0).combodate();
    if($(".ckedit", f0).length > 0) {
        $(".ckedit", f0).each(function(i) {
            let ckid = this.id; let ckheight = this.height || 500; 
            CKEDITOR.replace(ckid, { height: ckheight, autoParagraph: false, allowedContent: true, entities: false, sourceAreaTabSize: 10 });
        });
    }

    if ($(".aieditor", f0).length > 0) {
        $(".aieditor", f0).prepend($('#tmpled1').html().replace(codeex, f0.slice(4)));
        $(".aieditor", f0).append('<div id="editor' + $(".aieditor textarea", f0).attr('id') + '" class="aiedit" contenteditable="true"><p>&nbsp;</p></div>');
    }
    if ($(".aieditor" + f0.replace('#F00', '')).length > 0) {
        $(".aieditor" + f0.replace('#F00', '')).prepend($('#tmpled1').html().replace(codeex, f0.slice(6)));
    }
}
function SetValue(obj, v, nr) {
    obj.value = v;
    if (nr != undefined)
        obj.setAttribute('value', v);
    // for (const label of obj.labels) {
    //     label.classList.add("fiactive1");
    // }
}
function SetToSelect($tobj, value) {
    if(value == '') value = '0';
    value = value == null || value == undefined ? '' : value;
    if ($tobj.data('select2Id') == undefined) dd = $('label[for=' + $tobj.attr('id') + ']').data();
    else dd = $('label[for=' + $tobj.data('select2Id') + ']').data();
    fd = $tobj.attr('id');
    var ctldata = $tobj.data();
    var ccond = dd.idcol + " IN (N'" + value.toString().replace(/,/g, "',N'") + "')";
    if(value == '') ccond = '';
    let prm = `do=${ctldata.param}&search[value]=&length=${ctldata.pgsize || 25}&start=0&cond=${ccond}`;
    if (dd.defaultdata != undefined) {
        $tobj.val(value); $tobj.trigger('change');
    } else if (unstr(dd.myquery).length > 0) {
        if ($tobj.hasClass('noselect2')) {
            $tobj.val(value);
        } else {
            aifetchq("", prm, $tobj.attr("id"), "", "", "", function (data) {
            //aifetchq(fd.slice(fd.length - 6), dd.myquery.replace(/_search_%'/g, "' AND a.id IN (N'" + value.toString().replace(/,/g, "',N'") + "')" || ''), function (data) {
                // create the option and append to Select2
                var dl = data.data1 == undefined ? 0 : data.data1.length;
                if (dl > 0) {
                    if ($tobj.hasClass('ddl')) {
                        $tobj.val(null); $tobj.trigger('change');
                        var option = new Option(data.data1[dl - 1].text, data.data1[dl - 1].id, true, true);
                        option.dataset = data.data1[dl - 1];
                        $tobj.append(option).trigger('change');
                        $tobj.trigger({ type: 'select2:select', params: { data: data.data1 } });
                    } else if ($tobj.hasClass('mddl')) {
                        $tobj.val([]); $tobj.trigger('change');
                        for (tt = 0; tt < dl; tt++) {
                            option = new Option(data.data1[tt].text, data.data1[tt].id, true, true);
                            option.dataset = data.data1[tt];
                            $tobj.append(option).trigger('change');
                            $tobj.trigger({ type: 'select2:select', params: { data: data.data1 } });
                        }
                    }
                    // manually trigger the `select2:select` event
                }
            });
        }
    } else {
        aifetchq("", prm, $tobj.attr("id"), "", "", "", function (data) {

//        $.ajax({
//            url: urlj, data: { l: aicodeto(datalq0, fd.slice(fd.length - 6)), f: dd, 'search[value]': '', 'length': pg, start: (0) * pg }, type: "post", dataType: "json", success: function (data) {
                // create the option and append to Select2
                var dl = data.data1 == undefined ? 0 : data.data1.length;
                if (dl > 0) {
                    if ($tobj.hasClass('ddl')) {
                        var option = new Option(data.data1[dl - 1].text, data.data1[dl - 1].id, true, true);
                        //option.dataset = data.data1[dl - 1];
                        $(option).data(data.data1[dl - 1]);
                        $tobj.append(option).trigger('change');
                        //$tobj.val(null); $tobj.trigger('change');
                        //$tobj.select2("trigger", "select", { data: data.data1[dl - 1] });
                    } else if ($tobj.hasClass('mddl')) {
                        $tobj.val([]).change(); $tobj.html(''); 
                        for (tt = 0; tt < dl; tt++) {
                            if (data.data1[tt].id != 0) {
                                //$tobj.select2("trigger", "select", { data: data.data1[dl - 1] });

                                option = new Option(data.data1[tt].text, data.data1[tt].id, true, true);
                                $(option).data(data.data1[tt]);
                                $tobj.append(option).trigger('change');;
                            }
                        }
                    }
                    // manually trigger the `select2:select` event
                    if(!$tobj.hasClass("noselect2"))
                        $tobj.select2('data', data.data1);
                    $tobj.data('sdata', data.data1);
                    $tobj.trigger({ type: 'select2:select', params: { data: data.data1 } }); //.trigger('select2:select');
                }
            //}
            //, error: function () {
            //    toastr["error"]("Failure! May try again ..."); bsuccess = false;
            //}
        });
    }
}
function SetToInput(frm, data, midid) {
    if (data.length <= 0) return; var frm1 = "#" + frm.attr("id").replace("F00", "AC");
    if (midid == '') midid = frm.attr('name').substr(3);
    var ed = 0;
    var dataObj = $.each(data, function (key, value) {
        var $tobj = $("[name$='" + midid + key + "']", frm1);
        oid = $tobj.attr('id');
        if (value == null)
            value = '';
        //if (value != '') $tobj.next('label').addClass('iactive1 iinactive')
        if (key.toString().indexOf('i') == 0 && key.toString().search('Image') >= 0) {
        //if (key.search('Image') >= 0) {
            //$did = $("#" + key.slice(1) + midid + "i");
            $did = $("#t" + midid + key.slice(1));
            if($did.length <= 0) return;
            $did1 = $('.images', $('[name$=' + midid + key.slice(1) + ']', frm1).closest('.dfile'));
            if ($did1.length <= 0) $did1 = $('.images', $('[name$=' + midid + key.slice(1) + ']', frm1).closest('div'));
            $did.html(''); $did1.html('');
            //tv = value.split(',');
            showuploaded(value, $did1, $did);
            //    for (ii = 0; ii < value.length; ii++) {
            //        var idiv = "<div class='aidc ais aifleft aibcontentimg'><img src='" + imagename(value[ii], '--100') + "' class='' style='width:100px;' /><div class='btn0 tiny dtr'><button type='button' class='zoomimg'><i class='fas fa-search-plus'></i></button><button type='button' class='airemoveimg'>x</button></div> </div>"
            //        $did.append(idiv); $did1.append(idiv);
            //    }
        }
        if($tobj.length <= 0) return;
        if ($tobj.hasClass('editor')) {
            $tobj.val(value); $('#' + $tobj.attr('id') + ' ~ [contenteditable=true]').html(value);
        }
        else if($tobj.hasClass("ckedit")) {
            CKEDITOR.instances[$tobj.attr('id')].setData(value);
        }
        else if ($tobj.attr('type') == 'radio')
            $tobj.attr('checked', false).filter('[value="' + value + '"]').attr('checked', true);
        else if ($tobj.attr('type') == 'checkbox') {
            let tvalue = value.split(','); ltvalue = tvalue.length; $tobj.attr('checked', false);
            for (i = 0; i < ltvalue; i++)
                $tobj.filter('[value="' + tvalue[i] + '"]').attr('checked', true);
        }
        else if ($tobj.attr('type') == 'date')
            $tobj.val(value.substr(0, 10));
        else if ($tobj.attr('type') == 'datetime' || $tobj.attr('type') == 'datetime-local')
            if ($tobj.hasClass('combodate'))
                $tobj.combodate('setValue', moment(value, 'DD-MM-YYYY HH:mm'));
            else
                $tobj.val(value); //$tobj.val(ymdt(value));
        else if (($tobj.hasClass('ddl') || $tobj.hasClass('mddl')) && $tobj.hasClass('noselect2')) {
            $tobj.val(value);
        }
        else if ($tobj.hasClass('ddl') || $tobj.hasClass('mddl')) {
            SetToSelect($tobj, value);
        }
        else if (key.indexOf('Country') > 0) {
            try {
                $tobj.attr('selected', false); $tobj.val(value);
                var sts = '<option>' + $tobj.find(':selected').data('states').replace(/,/g, '</option><option>') + '</option>';
                $('#' + $tobj.attr('id').replace('Country', 'State')).html('<option value="">-Select State-</option>').append(sts);
            } catch (ex) {

            }
        }
        else if (key.indexOf('State') > 0) {
            $tobj.attr('selected', false); $tobj.val(value);
        }
        else
            $tobj.val(value);
    });

    let casa = window['AF' + midid + 'SetToInput'];
    if (casa != undefined) { if (typeof casa == "function") casa(frm,data,midid); }

    $(".dfile.fixfile", "#F00" + midid).each(function(i) {
        $obj = $("input[type=file]", $(this));
        let imgfil = $obj.data("folder").replace("../", "");
        let imgnameend = `--${$obj.data("thumbsize")}.jpg?v=1.0`;
        if($("img", $(this)).length > 0)
            $("img", $(this)).attr("src", `${imgfil}/${$obj.data("imagename").replace(".jpg", imgnameend)}`)
        else {
            $(".images", $(this)).append(`<img src="${imgfil}/${$obj.data("imagename").replace(".jpg", imgnameend)}" class="object-fit-contain" width="${$obj.data("imagehw")}" height="${$obj.data("imagehw")}" />`);
        }
            
    });

}
function selectkey(ctl, frm) {
    dd = $(ctl).data(); cid = $(ctl).attr('id'); cnt = $(ctl).closest('.container');
    $('label[for=' + cid + ']').data(dd);
    var mul = unbool(dd.multiple);
    mn = $(ctl).data('menu') == undefined ? '' : 'data-menu="' + $(ctl).data('menu') + '"';
    af = $(ctl).attr('autofocus'); var clas = $(ctl).attr('class');
    //$(ctl).replaceWith('<select id="' + cid + '" name="' + cid + '" class="w3-input ' + (mul ? 'mddl' : 'ddl') + '"' + mn + ' ></select>').data(dd);
    if ($(ctl)[0].tagName != "SELECT") {
        $(ctl).replaceWith('<select id="' + cid + '" name="' + cid + '" class=" ' + clas + '"' + mn + ' ></select>')
        ctl = "#" + cid;
        $(ctl).data(dd); $(ctl).attr('autofocus', af);
    }
    if (unstr(dd.defaultdata).length > 0) {
        if (mul) {
            $('#' + cid).select2({ theme: "bootstrap-5", multiple: mul, data: eval(dd.defaultdata) }); return;
        } else {
            var dds = "";
            if (dd.defaultdata.indexOf('[') == 0) ddf = eval(dd.defaultdata);
            else ddf = dd.defaultdata.split(',');

            for (i = 0; i < ddf.length; i++) {
                if (ddf[i].id == undefined)
                    dds += "<option value='" + ddf[i].trim() + "' data-row='" + JSON.stringify(ddf[i]) + "' >" + ddf[i].trim() + "</option>";
                else
                    dds += "<option value='" + ddf[i].id.trim() + "' data-row='" + JSON.stringify(ddf[i]) + "' >" + ddf[i].text.trim() + "</option>";
            }
            $('#' + cid).append(dds);
        }
    } else if (unstr(dd.myquery).length > 0) {
        if ($(ctl).hasClass('noselect2')) {
            aifetchq(cid.slice(cid.length - 6), $(ctl).data('myquery'), function (data) {
                var dval = $(ctl).attr('value');
                var dl = 0; if (data.data1 != undefined) dl = data.data1.length;
                if (dl > 0) {
                    optn = "";
                    for (tt = 0; tt < dl; tt++) {
                        optn += '<option value="' + data.data1[tt].id + '"' + (data.data1[tt].id == dval ? ' selected ' : '') + " data-row='" + JSON.stringify(data.data1[tt]) + "' >" + data.data1[tt].text + '</option>';
                    }
                    $(ctl).append(optn);

                    if (unstr($(ctl).data('nochange')) != '')
                        $(ctl).val($(ctl).data('nochange'));
                    try { cnmcall = 'AF' + $(ctl).attr('name') + '($(ctl), data, optn);'; eval(cnmcall); } catch (e) { }
                }
            });
        } else {
            var pg = 25;
            $('#' + cid).select2({
                theme: "bootstrap-5", dropdownAutoWidth: 'true', multiple: mul, width: "resolve"
                , ajax: {
                    url: urlj, dataType: "json", type: "post"
                    , data: function (params) {
                        return { l: aicodeto(datalq0, cid.slice(cid.length - 6)), q: $(ctl).data('myquery').replace(/_search_/g, params.term || '') };
                        //'search[value]': params.term || '', 'length': pg, start: (params.page || 0) * pg };
                    }, processResults: function (data, params) {
                        params.page = params.page || 1; return {
                            results: data.data1, pagination: {
                                //more: (params.page * pg) < data.total
                            }
                        };
                    }, cache: false
                }
                , escapeMarkup: function (markup) { return markup; }
            });
        }
    } else {
        if ($(ctl).hasClass('noselect2')) {
            /*                        var ctldata = $(ctl).data(); //delete ctldata["select2"];
                        var vf = `do=${ctldata.param}&search[value]=${params.term || ''}&length=${ctldata.pgsize || 25}&start=${params.page || 0}`;
                        dta = { f: vf, c: sessionidstring, r: $(ctl).attr('id'), v: '', v1: '' };
*/
            var ctldata1 = $(ctl).data(); 
            var dcnd = unstr(ctldata1.cond);
            var vf1 = `do=${ctldata1.param}&length=100&cond=${dcnd}`;
            var dta1 = { f: vf1, c: sessionidstring, r: $(ctl).attr('id'), v: '', v1: ''};
            $.ajax({
                url: urlj
                    , data: dta1
                    //, data: { l: aicodeto(datalq0, cid.slice(cid.length - 6)), f: $(ctl).data(), 'search[value]': '', 'length': 999, start: (0) * 999 }
                    , delay: 250, type: "post", dataType: "json", success: function (data) {
                    // create the option and append to Select2
                    var dval = $(ctl).attr('value');
                    var dl = 0; if (data.data1 != undefined) dl = data.data1.length;
                    if (dl > 0) {
                        optn = "";
                        for (tt = 0; tt < dl; tt++) {
                            optn += '<option value="' + data.data1[tt].id + '"' + (data.data1[tt].id == dval ? ' selected ' : '') + " data-row='" + JSON.stringify(data.data1[tt]) + "' >" + data.data1[tt].text + '</option>';
                        }
                        $(ctl).append(optn);

                        if (unstr($(ctl).data('nochange')) != '')
                            $(ctl).val($(ctl).data('nochange'));
                    }
                    if (unstr(dd.callback) != '')
                        eval(dd.callback)
                    try { cnmcall = 'AF' + $(ctl).attr('name') + '($(ctl), data, optn);'; eval(cnmcall); } catch (e) { }
                }
                , error: function () {
                    toastr["error"]("Failure! May try again ..."); bsuccess = false;
                }
            });
        } else {
            var pg = 25;
            $('#' + cid).select2({
                theme: "bootstrap-5", dropdownAutoWidth: 'true', multiple: mul, width: "resolve"
                , ajax: {
                    url: urlj, dataType: "json", type: "post", delay: 250
                    , data: function (params) {
/*f: 
do=1-g-b003000Table&length=10&start=17&search[value]=
c: 
dc3BvcnRzcHJvZmlsZXNzfjo6MX4wfmZpYTMwMDV3bWUzY3NzamZvNGlkYW5qd34=
r: 
tb0000006
v: 
v1: */                  
                        var ctldata = $(ctl).data(); //delete ctldata["select2"];
                        var vf = `do=${ctldata.param}&search[value]=${params.term || ''}&length=${ctldata.pgsize || 25}&start=${params.page || 0}`;
                        if(unstr(ctldata.cond).length > 0) { vf += `&cond=${ctldata.cond}`; }
                        dta = { f: vf, c: sessionidstring, r: $(ctl).attr('id'), v: '', v1: '' };
                        return dta;
                    }, processResults: function (data, params) {
                        params.page = params.page || 1; return {
                            results: data.data1, pagination: {
                                more: (params.page * pg) < (data.data1.length <= 1 ? 0 : data.data1[0].rowcnt)
                            }
                        };
                    }, cache: true
                }
                , escapeMarkup: function (markup) { return markup; }
            });
        }
    }
}


// File Input And Upload Functions
$(document).off('change', '.inputfile input[type=file]').on('change', '.inputfile input[type=file]', function () { 
    const [file] = this.files; let img = window[$(this).data("img")];
    if(file) {
        img.src = URL.createObjectURL(file); 
        $("img", $(this).closest(".inputfile")).attr("src", URL.createObjectURL(file));
        // for(let t = 0; t < this.dataset.length; t++) img.dataset
        // img.dataset = this.dataset;
        $(img).data("filename", $(this).data("filename"));
        $(img).data("size", $(this).data("size"));
        $(img).data("folder", $(this).data("folder"));
    }
});

function drawCanvas(i, c, wd, a, d, nm, f) {
    c.className = wd;
    i.className = wd;
    c.width = i.width;
    c.height = i.height;
    let ctx = c.getContext("2d");
    ////ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(i, 0, 0, i.width, i.height);
    i.className = "d-none";
    uploadCanvasImage(a, d, c, nm, f);
    c.className = "d-none";
}

function uploadCanvasImage(apilink, d, canvas, nm, f) {
    canvas.toBlob(function (blob) {
        let formData = new FormData();
        formData.append('image', blob, nm);
        formData.append("id", d);
        fetch(`${apilink}/api/UFile`, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                f();
                //console.log('Upload successful:', data);
            })
            .catch(error => {
                //console.error('Upload error:', error);
            });
    }, 'image/jpeg', 0.82);
}

$(document).off('click', 'a.airemoveimg, button.airemoveimg').on('click', 'a.airemoveimg, button.airemoveimg', function (e) {
    e.preventDefault();
    $inpt = $("input:not(.uploadimage)", $(this).parents('.images').parents('div')[0]);
    i1 = $('.airemoveimg', $(this).closest('.images')).index($(this));
    ainpt = $inpt.val().split(','); ainpt.splice(i1, 1);
    vinpt = ainpt.join(',');
    $inpt.val(vinpt);
    $(this).closest('.aidc').remove();
});
$(document).off('change', '.uploadimage').on('change', '.uploadimage', function () {
    var $c = $(this).closest('.dfile'); $('.aispin', $c).toggleClass('aihide'); odata = $(this).data();
    var file;
    if (file = this.files[0]) {
        var formData = new FormData();
        var ffile = this.files[0];
        let uploadfiles = $(this).get(0);
        let uploadedfiles = uploadfiles.files;
        let luploadedfiles = uploadedfiles.length;
        for (let i = 1; i < luploadedfiles; i++) {
            formData.append(uploadedfiles[i].name, uploadedfiles[i]);
        }
        formData.append('file', ffile);
        formData.append('p', ffile.name);
        formData.append('fp', odata.folder);
        formData.append('fn', ffile.name);
        formData.append('f', ffile.name);
        formData.append('s', odata.imagesize);
        formData.append('fx', unstr(odata.imagename));
        formData.append('ac', unstr(odata.nid));
        formData.append('is', unstr(odata.imagesite));

        //let urlh = "https://azportfolio.co.in/HandlerImgAZ.ashx"
        $.ajax({
            type: 'post', url: urlh, data: formData, dataType: "json", success: function (data) {
                if (data != '') {
                    if(data.imagename != undefined) showuploaded(data, $('.images', $c), odata.thumbsize, odata.imagehw);
                    else showuploaded(JSON.stringify(data.data1), $('.images', $c), $(odata.imageno), odata.imagehw);
                } else { }
                $('.aispin', $c).toggleClass('aihide');
            }, processData: false, contentType: false, error: function () { $('.aispin', $c).toggleClass('aihide'); toastr["error"]("Whoops something went wrong!"); }
        });
    }
});
function showuploaded(d, w, t, hw) {
    var rstr = "", rids = "";
    if(hw == undefined) hw = t;
    if(d.imagename != undefined) {
        if(".png".indexOf(d.imageext) >= 0)
            fext = `${d.imageext}`;
        else
            fext = `--${t}${d.imageext}`;
        rstr += `<img src="${d.imagepath}${d.nid}/${d.imagename}${fext}?v=${Math.random()}" class="object-fit-contain" width="${hw}" height="${hw}" />`;
        w.html(rstr); 
        return rstr;
    }
    if(d.length > 0) d = (d.substr(0,1) == "'") ? JSON.parse(d.substr(1, d.length-2)) : JSON.parse(d); 
    dl = d.length;
    for (i = 0; i < dl; i++) {
        rids += "," + d[i].ImageId;
        if (".jpg,.gif,.jpeg,.png".indexOf(d[i].ImageFileType) >= 0)
            rstr += `<div class="position-relative aidc ais aifleft aibcontentimg"><img src="${imagename(d[i], "--100")}" class="object-fit-contain" width="100" height="100" /><div class="d-flex position-absolute top-0 end-0 aidf btn0 tiny dtr"><a href="${imagename(d[i], "--800")}" target="_blank" class="zoomimg btn btn-sm btn-outline-secondary border-0"><i translate="no">zoom_in</i></a><button type="button" class="airemoveimg btn btn-sm btn-outline-danger border-0"><i translate="no">close</i></button></div> </div>`;
        else
            rstr += `<div class="position-relative aidc ais aifleft aibcontentimg"><a target="_blank" href="${imagename(d[i], "")}"><img src="${BaseSite}aiassets/${d[i].ImageFileType.replace(".", "")}.svg"  class="object-fit-contain" width="100" height="100" /></a><div class="position-absolute top-0 end-0 btn0 tiny dtr"><button type="button" class="zoomimg btn btn-sm btn-outline-secondary border-0"><i translate="no">zoom_in</i></button><button type="button" class="airemoveimg btn btn-sm btn-outline-danger border-0"><i translate="no">close</i></button></div> </div>`;
    }
    $(t).val(($(t).val().length > 0) ? $(t).val() + rids : rids.substr(1)); w.append(rstr);
    return rstr;
}
function imagename(d, w) {
    return cc + "/u/" + d.ImageDir + d.ImageFileName.replace(d.ImageFileType, w + d.ImageFileType);
}

// Select and Dropdown Functions
// Dynamic Div Functions
// Dynamic Table Functions
$(document).off('click', '.aitoolbar a:not([data-command]), .aitoolbar button:not([data-command])').on('click', '.aitoolbar a:not([data-command]), .aitoolbar button:not([data-command])', function (e) {
    e.preventDefault();
    $t = $(this); var dparent = $t.closest('.aitoolbar');
    if (dparent.length > 0) {
        cpg = eval($('.sstart', dparent).val()); var mpg = $('.sstart', dparent).attr('max');
    }
    if ($t.hasClass('srefresh')) {
        //setfilter($(this), $('form', $(this).closest("article,dialog")), false);
        setfilter($(this), $($(this).closest(".aitoolbar")), false);
        if (dparent.data("function") == undefined) {
            //loadtable($('#' + $(this).closest('table').attr('id')));
            loadtable($('#' + dparent.attr('id').replace('ct', 'tb')));
        } else {
            eval(dparent.data("function"));
        }
    } else if ($t.hasClass('sprev')) {
        $('.sstart', dparent).val((cpg - 1) <= 0 ? 1 : cpg - 1); reloadtable(dparent);
    } else if ($t.hasClass('snext')) {
        $('.sstart', dparent).val((cpg + 1) > mpg ? mpg : cpg + 1); reloadtable(dparent);
    } else if ($t.hasClass('sfirst')) {
        $('.sstart', dparent).val(1); reloadtable(dparent);
    } else if ($t.hasClass('slast')) {
        $('.sstart', dparent).val(mpg); reloadtable(dparent);
    } else if ($t.hasClass('sexcel')) {
        tableToExcel(dparent.attr('id').replace('ct', 'tb'), '');
    }
    e.stopImmediatePropagation();
    return false;
});
$(document).off('blur', '.ssearch, .sstart, .slength').on('blur', '.ssearch, .sstart, .slength', function () {
    var dparent = $(this).closest('.aitoolbar'); $('.srefresh', dparent).trigger('click');
});
$(document).off('change', '.slength').on('change', '.slength', function () {
    var dparent = $(this).closest('.aitoolbar'); $('.srefresh', dparent).trigger('click');
});
function reloadtable(dp) {
    if (dp.data("function") == undefined) {
        loadtable($('#' + dp.attr('id').replace('ct', 'tb')));
    } else {
        eval(dp.data("function"));
    }
}
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
    }
})()


var tblcaption = "";
var hlpfunctions = {
    'actbtn': function () { if($('body').hasClass("noaction")) { return ""; } else { return new Handlebars.SafeString($("#tmplactbtn1").html()); } }
    , 'split': function (str, fmt) {
        var sstr = unstr(str).split(','); var ssstr = "";
        if (unstr(str).indexOf('.html') >= 0) fmt = fmt.replace('data-menu="{{this}}`````````"', 'data-html="{{this}}"');
        var regex = new RegExp(fmt, "g");
        for (i = 0; i < sstr.length; i++) ssstr += (sstr[i] == '' ? '' : fmt.replace(/{{this}}/g, sstr[i]).replace(/{{this1}}/g, btoa(sstr[i])));
        return new Handlebars.SafeString(ssstr);
    }
    , 'fromnow': function (str) {
        if (str == undefined) return ""; else
            return moment(str) == 'Invalid date' ? '' : moment(str).fromNow();
    }
    , 'duration': function(str) {
        if (str == undefined) return ""; 
        else return  new Handlebars.SafeString(dhms(str));
    }
    , 'dateFormat': function (str, fmt) { return moment(str) == 'Invalid date' ? '' : moment(str).format(fmt); }
    , 'cpath': function () { return cc + '/u/'; }
    , 'initl': function (str) { var inm = initl(str); return new Handlebars.SafeString(inm); }
    , 'color1': function (str) { return new Handlebars.SafeString('<span style="background-color:' + str + ';height:22px;">&nbsp;&nbsp;</span>'); }
    , 'html': function (str) { return new Handlebars.SafeString(str); }
    , 'select': function (selected, options) {
        return options.fn(this).replace(
            new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"');
    }
    //, 'tmpl': function (str) { var thtml = $('#' + str).html(); return new Handlebars.SafeString(thtml); }
    , 'print': function () { return new Handlebars.SafeString('<div class="alaction"><button type="button" value="print" title="Print"><i translate="no">print</i></button></div>') }
    , 'check': function () { return new Handlebars.SafeString('<div class="acheck"><label><input type="checkbox" class="chk"><i class="rccheck"></i><span></span></label></div>'); }
    , 'i1replace': function (d, f, t) {
        var r = '../img/logo192.png'; if (f != undefined) r = d + f.replace(t, '--100' + t); return r;
    }
    , 'i4replace': function (d, f, t) {
        var r = '../img/logo512.png'; if (f != undefined) r = d + f.replace(t, '--480' + t); return r;
    }
    , 'i8replace': function (d, f, t) {
        var r = '../img/logo512.png'; if (f != undefined) r = d + f.replace(t, '--800' + t); return r;
    }
    , 'i9replace': function (d, f, t) {
        var r = '../img/logo512.png'; if (f != undefined) r = d + f.replace(t, '--1920' + t); return r;
    }
    , 'leftPad': function (s, n, c) { return unstr(s).toString().paddingLeft(Array(n + 1).join('0')); }
    , 'hbd': function (s, n) { return new Handlebars.SafeString("<a href='sms:" + s + "?body=Happy Birthday - From " + ct + "'>SMS</a>"); }
    , 'image1': function (s, n, c) {
        var si = unstr(s);
        var pics_arr = si.split(',');
        var pics_str = "";
        $.each(pics_arr, function (index, el) {
            imgPath = this.trim();
            if (imgPath.length > 0)
                pics_str = pics_str + '<a href="' + imgPath + '" target="_blank"><i translate="no">image</i></a> ';
        });
        return new Handlebars.SafeString(pics_str);
    }
    , 'x': function (expression, options) {
        var result;

        // you can change the context, or merge it with options.data, options.hash
        var context = this;

        // yup, i use 'with' here to expose the context's properties as block variables
        // you don't need to do {{x 'this.age + 2'}}
        // but you can also do {{x 'age + 2'}}
        // HOWEVER including an UNINITIALIZED var in a expression will return undefined as the result.
        with (context) {
            result = (function () {
                try {
                    return eval(expression);
                } catch (e) {
                    console.warn('•Expression: {{x \'' + expression + '\'}}\n•JS-Error: ', e, '\n•Context: ', context);
                }
            }).call(context); // to make eval's lexical this=context
        }
        return result;
    }
    , 'xif': function (expression, options) {
        return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
    }
    , 'math': function (lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
            "+": lvalue + rvalue
            , "-": lvalue - rvalue
        }[operator];
    }
    , 'srno': function (lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
            "+": lvalue + rvalue
            , "-": lvalue - rvalue
        }[operator];
    }
    , 'columnvalue': function (str) {
        strval = "this." + str;
        var column1 = eval(strval);
        return column1;
    }
    , 'isEqual': function(value1, value2, options) {
        return value1 === value2;
    }
    //   , 'ifequal': function (arg1, arg2, options) { return (arg1 == arg2) ? options.fn(this) : options.inverse(this); }
};
//leftPad TypeId 2

function loadtable(tb, tbcnd) {
    if (tb == undefined) return;
    dd = tb.data(); ddf = $('#' + dd.showform).data();
    cid = dd.showform;
    let ttm = tb.attr('id').replace('tb', 'tm'); var ttc = tb.attr('id').replace('tb', 'ct'); var cdc = ttc.substr(3);
    if ($('#' + ttc).length == 0) {
        let tmpltools = $('#tmplaishown').html().replace("ct0aaaaaa", ttc).replace(codeex, cdc);
        $(tb).closest('.aishown').prepend(tmpltools);
    }
    const cbs1 = 'AF' + tb.attr('id') + 'before';
    //if (cbs1 != undefined) { if (typeof cbs1 == "function") cbs1(tb, ""); }
    try { cnmcall = 'AF' + tb.attr('id') + 'before(tb, "");'; eval(cnmcall); } catch (e) { }

    var hlppartials = {};

    if ($('#' + ttm).length == 0) {
        //var scr = '<script id="' + ttm + '" type="text/x-handlebars-template">{{#data1}}<tr>';
        let trtmpl = $("#tr" + ttm).length == 0 ? '<tr class="datarow" data-index="{{@index}}">' : $("#tr" + ttm).html(); 
        var scr = '<template id="' + ttm + '">{{#data1}}' + trtmpl;
        ttr = ""; ttr1 = "";
        $('thead th', tb).each(function (i) {
            sth = $(this).data('field'); scss = unstr($(this).attr('class')); scnt = $(this).data('content'); scss = (scnt == 'actbtn' ? "alaction btn-group " + scss : scss); sfmt = $(this).data('format'); stmpl = $(this).data('tmpl');
            if (sth != undefined) {
                if (sth.length > 5) {
                    if (sth.substr(0, 5) == 'split')
                        ttr += '<td class="' + scss + ' ' + sth + '">{{' + (sfmt == undefined ? '' : '') + sth + (sfmt == undefined ? '' : " '" + sfmt + "' ") + '}}</td>';
                    else
                        ttr += '<td class="' + scss + ' ' + sth + '">{{' + (sfmt == undefined ? '' : '>') + sth + '}}</td>';
                } else
                    ttr += '<td class="' + scss + ' ' + sth + '">{{' + (sfmt == undefined ? '' : '>') + sth + '}}</td>';
            } else {
                if (scnt != undefined) {
                    ttr += '<td class="' + scss + ' ' + sth + '">{{' + scnt + '}}</td>';
                }
            }
            if (sfmt != undefined) {
                if (sth.length > 5) if (sth.substr(0, 5) != 'split')
                    hlppartials[sth] = sfmt;
            } else if (stmpl != undefined) {
                ttr += '<td class="' + scss + ' ' + sth + '">' + $('#' + stmpl).html() + '</td>';
            }
        });
        if (ttr1 == '') ttr1 = '<td class="alaction"><div class="btn-group editaction">{{actbtn}}</div></td>'
        if($('body').hasClass("noaction")) {
            scr += ttr;
        } else if ($('body').hasClass("rightaction")) {
            $("thead tr:first", tb).append("<th>Action</th>");
            scr += ttr + ttr1;
        } else {
            $("thead tr:first", tb).prepend("<th>Action</th>");
            scr += ttr1 + ttr;
        }

        //        scr += ttr + '</tr>{{/data1}}</script>';
        scr += '</tr>{{/data1}}</template>';
        tb.closest('div').append(scr);
    }
    if(tbcnd != undefined) {
        let ttc = tb.attr('id').replace('tb0', 'ccond'); 
        SetValue(window[ttc], tbcnd, "noreset");
    }
    let prm = `${tb.data("param")}&length=${$('#' + ttc + ' .slength').val()}&start=${$('#' + ttc + ' .sstart').val() - 1}&search[value]=${$('#' + ttc + ' .ssearch').val()}&cond=${$('#' + ttc + ' .scond').val()}`;
    aifetchq("", prm , tb.attr("id"), "", "", "", function (data) {
        //    $.ajax({
        //        url: urlj, data: { l: aicodeto(datalq0, cid.slice(cid.length - 6)), f: ddf, length: $('#' + ttc + ' .slength').val(), start: $('#' + ttc + ' .sstart').val() - 1, 'search[value]': $('#' + ttc + ' .ssearch').val() }, type: "post", dataType: "json", success: function (data) {
        if (data.data1 == undefined || data.data1.toString().trim().length <= 0) { $('tbody', tb).html("<div>No Data!</div>"); return; }
        var template = $('#' + ttm).html(); var dt = data; //JSON.parse(d)
        var ss = eval($('#' + ttc + ' .sstart').val()); var sl = eval($('#' + ttc + ' .slength').val()); var sm = (((ss - 1) * sl) + sl);
        var mpg = Math.ceil(eval(dt.data1[0]["rowcnt"]) / sl);
        $('#' + ttc + ' .sstart').attr('max', mpg); //dt.maxpages);
        //$('#' + ttc + ' .slabel').text((((ss - 1) * sl) + 1) + '-' + (sm <= dt.total ? sm : dt.total) + " of " + dt.total);
        $('#' + ttc + ' .slabel').text((((ss - 1) * sl) + 1) + '-' + (sm <= dt.data1[0]["rowcnt"] ? sm : dt.data1[0]["rowcnt"]) + " of " + dt.data1[0]["rowcnt"]);
        template = template.replace(/{&gt;/g, '{>');
        var info = Handlebars.compile(template);
        Handlebars.registerHelper(hlpfunctions);
        Handlebars.registerPartial(hlppartials);
        if ($('tbody', tb).length > 0) $('tbody', tb).html(info(dt)); else $(tb).html(info(dt)); tb.closest('div').data('dbrow', dt);

        const cbs2 = 'AF' + tb.attr('id') + 'after';
        let casa = window[cbs2];
        if (casa != undefined) { if (typeof casa == "function") casa(tb, data); }
        // try { cnmcall = 'AF' + tb.attr('id') + 'after(tb, data);'; eval(cnmcall); } catch (e) { }
        $('[data-bs-toggle="tooltip"]', tb).tooltip();
    });
/*        , error: function () {
            toastr["error"]("Failure! May try again ..."); bsuccess = false;
        }
    });
*/
}
function loadlist1(obj, s) {
    var ddf = obj.data(); cid = obj.attr("id");
    var prm = { l: aicodeto(datalq0, cid.slice(cid.length - 6)), f: ddf, 'search[value]': '', 'length': 9999, start: 0 };
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

function setfilter($o, $f, r) {
    if (r == undefined) r = true;
    var dparent = $o.closest('.aitoolbar'); var tcond = ''; //$(".scond", $f).val();
    $('input,select', dparent).each(function () {
        var filter = unstr($(this).data('filter'));
        if (filter != '') {
            tcond += filter;
        }
    });
    //$f.data('condition', tcond);
    $(".scond", $f).val($(".scond", $f).data("cond") + tcond);
}

// Dynamic Form Functions
function aifun(f) { return f[0].id.replace('F01', 'AF').replace('F00', 'AF').replace('AC', 'AF').replace('dl', 'AF'); }
function isformvalid(i) { var myf = document.getElementById(i); if (!myf.checkValidity()) { var tmpSubmit = document.createElement('button'); myf.appendChild(tmpSubmit); tmpSubmit.click(); myf.removeChild(tmpSubmit); return false; } else { return true; } }
// 0-id, 1-parent id, 2-condition, 3-title, 4-html, 5-form number -- old one
// New- 0-id, 1-parent id, 2-condition, 3-head buttons, 4-foot buttons, 5=form view, 6-close on submit,7-width for modal
// Buttons : a-Add New, l-Show List Only, r-Refresh / Reload, d-Show Next, p-Previous Record, n-Next Record, e-Show Entry Form, m-Show List and Entry Form, 
// h-Show Hidden fields, t-Compress Form, z-Zoom Form full screen, q-Raise request or query, s-Share buttons, k-show tasks, c-Code editor, 
// w - Dark light theme switch, x - Close Form
var htmlformid = 0;
function loadPage(ch, thisctl) {
    ch.attr('disabled', 'disabled'); 
    //$('body').append('<div class="aipa8 loadingpage aiblue" style="padding:10px;position:fixed;top:0;left:50%;z-index:10;"><i translate="no">spin</i></div>');
    if (ch.attr('href') != undefined) return;
    var dd = ch.data();
    var pch = $("#" + dd.calledfrom);
    ch.removeData("calledfrom");
    var curparent = unstr(ch.closest('article, dialog, nav').attr('id'));
    //var curhparent = unstr(ch.closest('article, dialog, nav').data('chtml')).replace('.html', '');

    //var curhtml = unstr(dd.html).replace('.html', '');
    //if (curhtml.length > 0) {
    //    dd.menu = 'a' + htmlformid.toString().paddingLeft("00000") + '`````````';
    //    htmlformid++;
    //}
    if ("BUTTONA".indexOf(ch[0].tagName) < 0) dd.container = "#" + ch.attr('id');
    if (dd.f == undefined) {
        try { dd.f = $('#' + ch.closest('label').attr("for")).data('f').replace(/-/g, '`'); } catch (e) { dd.f = undefined; return; }
    }
    //cntr = (unstr(dd.container) == '') ? aifc : dd.container;
    // 0         1                            2      3                4         5          6           7              8                  9              10           
// "{{MenuId}}`1-{{FormDir}}-F{{FormCode}}`false`{{FCondition}}`{{BtnHead}}`{{BtnFoot}}`{{FView}}`{{CloseOnSubmit}}`{{ModalStyle}}`{{ModalClass}}`" id="aim{{MenuId}}">{{#if MIcon}}{{{MIcon}}}{{else}}<i translate="no">label</i>{{/if}}<span>{{MName}}</span></a>

    var amenu = dd.f.split('`');
    let cntr = unstr(dd.container, aifc);
    var fid = unstr(amenu[0]).toString().paddingLeft("000000");
    var pid = 'AC' + fid;
    //var shbtn = emstr(amenu[3], "dzamelwhtqkx") + (aiui == '10000000' ? 'c' : '');
    //if (curhtml.length > 0) shbtn = emstr(amenu[3], "rqkx") + (aiui == '10000000' ? 'c' : '');
    //var hbtn = fheadbutton(shbtn).replace('_0_', fid).replace('_0_', fid).replace('_0_', fid).replace('_1_', fid); // btoa((curhtml.length > 0 ? curhtml : fid)));
    //headbutton.forEach(function (v, i) { if (shbtn.substr(i, 1) == "1") { if (i == 8) v = v.replace("_0_", fid); else if (i == 6) v = v.replace('_0_', amenu[2]); hbtn += v; } });
    aifetchf("", amenu[1] + "`" + amenu[3] + '`' + amenu[4] + '`' + amenu[6], unbool(amenu[2]), amenu[0], function (data) {
        var htmf = "";
        if (!ch.hasClass("showdialog") && !pch.hasClass("showdialog")) {
            $('', cntr)
            $('article:not(:hidden)', cntr).addClass("d-none");
            $(cntr).append(data);
            if(amenu[6] == "19") {
                //$('.fentry', "#" + pid).addClass("offcanvas offcanvas-end ms-auto p-3 border").data({"bs-backdrop": "false", "bs-scroll": "true" }).css({top: "calc(var(--bs-navbar-top-height) + 70px)", margin:0, overflow:"auto", height: "calc(100vh - var(--bs-navbar-top-height) - 67px)", width: "calc(100vw - var(--bs-verticalnav-width))"});
            }
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
            if ($('#openforms a[data-f^=' + fid + ']').length <= 0) {
                //$('#openforms').append(ch[0].outerHTML); $('#openbadge').html($('#openforms button, #openforms a').length);
                //$('a span', '#openforms').removeClass('aihide');
            }
        } else {
            //htmf = "<div id='AC" + fid + "' data-pbutton='#" + ch.attr('id') + "' data-parent='AC" + amenu[1] + "' data-condition='" + amenu[2] + "' data-formview='" + (amenu[5] == '' ? '1' : amenu[5]) + "' data-submitmessage='" + (dd.submitmessage == undefined ? '' : dd.submitmessage) + "' data-closeonsubmit='" + amenu[6] + "' data-login='" + (dd.login == undefined ? '' : dd.login) + "'  data-aftersubmit='" + (dd.aftersubmit == undefined ? '' : dd.aftersubmit) + "' data-beforesubmit='" + (dd.beforesubmit == undefined ? '' : dd.beforesubmit) + "' class='aibcontent hdform aimodal " + (amenu[8] == '' ? '' : amenu[8]) + "' style='display:none;'><div style='width:" + (amenu[7] == '' ? '50%' : amenu[7]) + ";'><div class='aitoolbar aifhead ahaction aipr clearfix'> <div class='aimnavhead'> <button type='button' value='closeform' class='aihlarge' title='Close Form'>✕</button> <div class='bars barsh'> <div class='bar1'></div> <div class='bar2'></div> <div class='bar3'></div> </div> <a class='ailogo'>" + ch.text() + "</a> </div> <nav> <div class='aimnavright'> <ul class='aimnavnav aiform'> <li><span class='custom-buttons'></span></li>" + hbtn + "</ul> </div> </nav> </div> <div class='aibcontent-body'>" + htm + "</div></div></div>";
            //htmf = "<div id='AC" + fid + "' data-pbutton='#" + ch.attr('id') + "' data-parent='AC" + amenu[1] + "' data-condition='" + amenu[2] + "' data-formview='" + (amenu[5] == '' ? '0' : amenu[5]) + "' data-submitmessage='" + (dd.submitmessage == undefined ? '' : dd.submitmessage) + "' data-closeonsubmit='" + amenu[6] + "' data-login='" + (dd.login == undefined ? '' : dd.login) + "'  data-aftersubmit='" + (dd.aftersubmit == undefined ? '' : dd.aftersubmit) + "' data-beforesubmit='" + (dd.beforesubmit == undefined ? '' : dd.beforesubmit) + "' class='aibcontent hdform  animate__animated animate__fadeIn aimodal " + (amenu[8] == '' ? '' : amenu[8]) + "' style='display:none;'><div style='" + (ismobile ? 'width:100%;' : ';') + "width:" + (amenu[7] == '' ? '50%' : amenu[7]) + ";'><div class=''> <div class='aimnavhead'> <a class='ailogo'>" + ch.text() + "</a> </div> <div class='aimnavright'> <ul class='aimnavnav aiform'> <li><span class='custom-buttons'></span></li>" + hbtn + "</ul> </div> </div> <div class='aibcontent-body'>" + htm + "</div></div></div>";
            //htmf = "<dialog id='AC" + fid + "' data-pbutton='#" + ch.attr('id') + "' data-chtml='" + curhtml + "' data-parent='" + curparent + "' data-hparent='" + curhparent + "' data-condition=\"" + amenu[2] + "\" data-formview='" + (amenu[5] == '' ? '0' : amenu[5]) + "' data-submitmessage='" + (dd.submitmessage == undefined ? '' : dd.submitmessage) + "' data-closeonsubmit='" + amenu[6] + "' data-login='" + (dd.login == undefined ? '' : dd.login) + "'  data-aftersubmit='" + (dd.aftersubmit == undefined ? '' : dd.aftersubmit) + "' data-beforesubmit='" + (dd.beforesubmit == undefined ? '' : dd.beforesubmit) + "' class='aibcontent border borderf2 onf hdform animate__animated animate__slideInUp'><header class=''><div class='aidf1 aidf'><div class='h2 aidf1'>" + ch.html().replace('aihide', '') + "</div> <div class='btn0 aidfmenu'><span class='custom-buttons'></span>" + hbtn + " </span> </div></div></header> <div class='aibcontent-body'>" + htm + "</div></dialog>";
            let diwidth = unstr(amenu[8]);
            diwidth = diwidth || (ismobile ? 'min-width: 100vw;' : thisctl.dataset.style || 'min-width:60vw;');
            $('body').append("<dialog id='dl" + fid + "' class='offcanvas offcanvas-end ms-auto p-0 border' data-bs-scroll='true' data-bs-backdrop='false' style='top: var(--bs-navbar-top-height);margin:0;overflow:auto;height: calc(100vh - var(--bs-navbar-top-height));" + diwidth + "' data-bs-scroll='true' tabindex='-1'>" + data + "</dialog>");
//            $('body').append("<dialog class='onf hdform animate__animated animate__slideInRight' style='top:var(--top);margin-right:0;" + unstr(amenu[8]) + "'>" + data + "</dialog>");
            //$('.aioverlay').addClass('active');
            //$('footer').removeClass('on');
            //$('#' + pid).closest("dialog").removeClass('off').addClass('onf');
            //$('#' + pid).closest("dialog").removeClass("d-none");
            var myOffcanvas = document.getElementById('dl' + fid);
            var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
            bsOffcanvas.show();
        }
        $('.ftitle', '#' + pid).html(("BUTTONA".indexOf(ch[0].tagName) < 0)  ? ch.data("title") : ch.html());
        $("#" + pid).data('parent', "#" + ch.attr("id"));
        $("#" + pid).data('parent1', "#" + pch.attr("id"));
        //Parent Form
        p0f = "";
        pmf = $("#" + ch.attr("id")).closest(".datarow");
        pbf = $("#" + pch.attr("id")).closest(".datarow"); 
        p0fi = 0;
        if(pmf.length > 0) {
            p0f = pmf;
            p0fi = $("#" + ch.attr("id")).index(p0f);
        } else if(pbf.length > 0) {
            p0f = pbf;
            p0fi = $("#" + pch.attr("id")).index(p0f);
        }
        if(p0f.length > 0) {
            let p0data = window[`AF${fid}Parent`];
            if (p0data != undefined) { if (typeof p0data == "function") p0data(p0f); }
        }

        $("#" + pid + " header nav h4 sup").removeClass("position-absolute top-0 start-100 translate-middle");
        $("#" + pid + " header nav h4 span.d-none").removeClass("d-none");
        //var tt1 = $('#AC' + fid).data('condition');
        //if (tt1 != "") { $('#F00' + fid).data('condition', tt1 + ' AND (' + $('#F00' + fid).data('condition') + ')'); }

        GeneralCall('#F00' + fid);
        // if($(".dbl", "#AC" + fid).length > 0) {
        //     $(".dbl", "#AC" + fid)
        // }
        //$('.toremove, .c-remove', '#' + pid).remove();
        var mf = $('#' + pid);
        mf.data({'formview': amenu[6], 'closeonsubmit': amenu[7]});
        if(mf.data('formview') == "7") {
            $(".fentry", mf).addClass("offcanvas offcanvas-end");
        } else if (mf.data('formview') == "6") {
            $('.aientry, .aicontrollers', mf).addClass("d-none"); $("#AC" + fid).addClass("list");
        } else if (mf.data('formview') == "4") {
            $('.aishown', mf).addClass("d-none"); $("#AC" + fid).addClass("entry"); 
        } else if (mf.data('formview') == "1") {
            $('.aishown', mf).remove(); $("#AC" + fid).addClass("entry");
        } else { $("#AC" + fid).addClass("listentry"); }
        //$(':reset', '#AC' + fid).trigger('click');
        try { if (dd.afterload != undefined) eval(dd.afterload + '(mf);'); } catch (e) { console.log(e.stack); }
        ch.removeAttr('disabled');
        if(pch.length > 0) { 
            ch.removeClass('showdialog');
        }
        $('.loadingpage').remove();
        $('input[autofocus]', '#' + pid).focus();
    });
    if (aiui != '10000000') {
        $('.showhidden').remove();
    }
}

$(document).off('click', 'a.submit, button:submit').on('click', 'a.submit, button:submit', function (e) {
    $(this).addClass("active").attr("disabled", true);
    e.preventDefault();
    //debugger;
    const formData = new FormData(e.target.form);
    const asString = new URLSearchParams(formData).toString();
    //console.log(asString);

    var $t = $(this); var href = unstr($t.attr('href'));
    $f = $('#' + $t.attr('form')); ddsub = $t.data(); df = $f.data(); $c = $t.closest('article, dialog');
    if ($(':invalid', $f).length > 0) { $f[0].reportValidity(); $t.removeClass("active").attr("disabled", false); return; }
    //try { tinyMCE.triggerSave(); } catch (ex) { }
    //const cbs = aifun($f) + 'BeforeSubmit';
    //if (cbs != undefined) { if (typeof cbs == "function") cbs($f); }
    if($(".ckedit", $f).length > 0) {
        $(".ckedit", $f).each(function(i) {
            let ckid = this.id; 
            $("#" + ckid).val(CKEDITOR.instances[ckid].getData());
        });
    }
    //try { eval(aifun($f) + 'BeforeSubmit($f);'); } catch (e) { console.log(e.stack); }
    let casa = window[aifun($f) + 'BeforeSubmit'];
    if (casa != undefined) { if (typeof casa == "function") casa($f); }

    $('.nochange', $f).each(function () {
        $t1 = $(this); $t1.data('nochange', $t1.val());
    });
    if (ddsub.beforesubmit != undefined) {
        let ddbe = window[ddsub.beforesubmit];
        if (ddbe != undefined) { if (typeof ddbe == "function") ddbe($f); }
    }

     //{ eval(ddsub.beforesubmit + '($f);'); } } catch (e) { console.log(e.stack); }
    //var prm = { l: 'u' + cl, c: (df.mbd == undefined ? tsbd : df.mbd), d: ddsub, f: df, w: $f.serialize() };
    //var sname = unstr(ddsub.service).length > 0 ? 'aim.asmx/' + ddsub.service : API1 + 'getjson';
    var sname = unstr(ddsub.service);
    fd = $t.attr('form');
    if (this.dataset.param == undefined) {
        toastr["error"]("Failure! Parameters not set! Contact administrator ...");
        $t.removeClass("active").attr("disabled", false); 
        return;
    }
    //    aifetchu(fd.slice(fd.length - 6), ddsub, df, $f.serialize(), function (data) {
    aifetchq("", this.dataset.param, this.dataset.value, $f.serialize(), unstr(df.uparent), "", function (data) {
    //    toastr[d.status](d.message);
    //});

    //aifetchq("", fd.slice(fd.length - 6), ddsub, df, asString, function (data) {
        if (sname == 'ForgotPassword') { alert(data); $('button[value=closeform]', $c).trigger('click'); $t.removeClass("active").attr("disabled", false); return; }
        if (data.data0[0].status.toLowerCase() == "login required") { $('.nouser').trigger('click'); $t.removeClass("active").attr("disabled", false); return; }
        dt = data;  //JSON.parse(data);
        if (sname == 'CheckLogin') {
            udt = dt;
            fnlocal('MainsLo', fd.slice(fd.length - 6), function (t) { });
        }
        var successmsg = "";
        var dcont = $c.data();
        if (dcont.submitmessage == undefined) successmsg = dt.data0[0].message;
        else if (dcont.submitmessage.length > 0) successmsg = dcont.submitmessage;
        else successmsg = dt.data0[0].message;
        if (dcont.submitmessage != '0') {
            if (successmsg == 'Row/s Added/Updated Successfully.') { try { successmsg = dt.data2[0].ar + ' rows ' + (dt.data1[0].wh != 0 ? 'added' : 'updated') + ' successfully.'; } catch (e) { } }
            if (data != '0') { toastr["success"](successmsg); } else { toastr["error"]("Failure! May try again ..."); }
        }
        bsuccess = true;
        //try { eval(aifun($f) + 'AfterSubmit(dt);'); } catch (e) { console.log(e.stack); }
        
        let cbsa = window[aifun($f) + 'AfterSubmit'];
        if (cbsa != undefined) { if (typeof cbsa == "function") cbsa(dt); }
        
        if (dcont.aftersubmit != undefined) {
            let dcaf = window[dcont.aftersubmit];
            if (dcaf != undefined) { if (typeof dcaf == "function") dcaf(data); }
        }
        //try { if (dcont.aftersubmit != undefined) eval(dcont.aftersubmit + '(data);'); } catch (e) { console.log(e.stack); }

        if (dcont.closeonsubmit == "1") { $c.after("<p class='aigreen aipa32 aiacenter'>" + successmsg + "</p>"); $('button[value=closeform]', $c).trigger('click'); }
        if ($c.data('formview') == "6" || $c.data('formview') == "4") {
            $('button[value=showlist]', $c).trigger('click');
        }
        $('button.srefresh', $c).trigger('click');
        freset = ddsub.submitreset == undefined ? true : ddsub.submitreset ? true : false;
        if (freset) {
            if($(".ckedit", $f).length > 0) {
                $(".ckedit", $f).each(function(i) {
                    let ckid = this.id; 
                    $("#" + ckid).val('');
                    CKEDITOR.instances[ckid].setData('');
                });
            }
            $t.next(':reset').trigger('click');
            //$('[autofocus]', $f).focus();
        }
        if ($t.data('callback') != undefined) {
            eval($t.data('callback'));
        }
        let myOffcanvas = $(".fentry", $c);
        if(myOffcanvas.hasClass("offcanvas")) {
            $("button[data-bs-dismiss=offcanvas]").trigger('click');
        }
        $t.removeClass("active").attr("disabled", false);
    });
});
$(document).off('click', '.alaction button[value]').on('click', '.alaction button[value]', function (e) {
    e.preventDefault();
    var v = $(this).val(); let $t = $(this); let $c = $t.closest("article,dialog");
    let casa = window[aifun($c) + 'EDClick'];
    if (casa != undefined) { if (typeof casa == "function") casa($c, v); }
    if (v == "edit") {
        let myOffcanvas = $(".fentry", $c);
        if(myOffcanvas.hasClass("offcanvas")) {
            var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
            bsOffcanvas.show();
        }
        $l = $t.closest('table, .aimtable'); sf = '#' + $l.data('showform');
        if($l.closest('div').data('dbrow') == undefined) return;
        dt = $l.closest('div').data('dbrow').data1[$(this).index('#' + $l.attr('id') + ' button[value=edit]')];
        if ($c.data('formview') == "4" || $c.data('formview') == "6") {
            $('button[value=showentry]', $c).trigger('click');
        }
        SetToInput($(sf), dt, ''); $('[autofocus]', sf).focus();
        let casa = window[aifun($(sf)) + 'ViewClick'];
        if (casa != undefined) { if (typeof casa == "function") casa($(sf), dt); }
    } else if (v == "delete") {
        $l = $t.closest('table, .aimtable'); sf = '#' + $l.data('showform'); ddsub = $t.data();
        dt = $l.closest('div').data('dbrow').data1[$(this).index('#' + $l.attr('id') + " button[value='delete']")];
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                delete dt["rowcnt"]; fd = $l.data('showform');
                aifetchq("", this.closest("table").dataset.param.replace("Table", "Save"), this.dataset.value, jQuery.param(dt), "", "", function (data) {
                    if (data != '0') { toastr["success"](dt.data0.message); $('button.srefresh', $c).trigger('click'); } else { toastr["error"]("Failure! May try again ..."); }
                });
                Swal.fire(
                    'Deleted!',
                    'Record/s has been deleted.',
                    'success'
                )
            }
        });
    }
});
$(document).off("click", "button:reset").on("click", "button:reset", function (e) {
    e.preventDefault(); $t = $(this);
    this.form.reset();
    $f = $('#' + $t.attr('form')); $('.images', $f).html(''); $('.mddl', $f).each(function () { $(this).val([]); $(this).trigger('select2:select'); }); $('.ddl', $f).each(function () { $(this).val(''); $(this).trigger('select2:select'); });
    if($(".ckedit", $f).length > 0) {
        $(".ckedit", $f).each(function(i) {
            let ckid = this.id; 
            $("#" + ckid).val('');
            CKEDITOR.instances[ckid].setData('');
        });
    }
    let casa = window[aifun($f) + 'Reset'];
    if (casa != undefined) { if (typeof casa == "function") casa($f); }

    // const cbs = aifun($f) + 'Reset';
    // if (cbs != undefined) { if (typeof cbs == "function") cbs($f); }

    //try { eval(aifun($f) + 'Reset();'); } catch (e) { console.log(e.stack); }
    $('.aiedit', $f).html('');
    $('.nochange', $f).each(function () {
        $t1 = $(this); $t1.val($t1.data('nochange')); $t1.trigger('change');
    });
    $('[autofocus]', $f).focus(); //return false;
});
$(document).off("click", ".get-location").on("click", ".get-location", function (e) {
    e.preventDefault();
    x = $('.location-coordinates');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            x.html("Latitude: " + position.coords.latitude +
                "<br>Longitude: " + position.coords.longitude);
            //ifsrc = 'https://maps.google.com/?ie=UTF8&amp;ll=' + position.coords.latitude + ',' + position.coords.longitude + '&amp;t=h&amp;z=17&amp;output=embed';
            //$('.location-map').attr('src', ifsrc);
        });
    } else {
        x.html("Geolocation is not supported by this browser.");
    }
});
$(document).off("click", "article > header button, dialog > header button, button[value=addrecord]").on("click", "article > header button, dialog > header button, button[value=addrecord]", function (e) {
    e.preventDefault();
    var v = $(this).val();
    var $t = $(this); $c = $t.closest("dialog"); if($c.length <= 0) $c = $t.closest("article");
    if (v == "addrecord") {
        let cbsac1 = window[aifun($c) + 'New'];
        if (cbsac1 != undefined) { if (typeof cbsac1 == "function") cbsac1($c); }
        
        let myOffcanvas = $(".fentry", $c);
        if(myOffcanvas.hasClass("offcanvas")) {
            var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
            bsOffcanvas.show();
        }
        if (!$t.closest("article, dialog").hasClass("listentry")) {
            $t.closest("article,dialog").addClass("entry").removeClass("list");
            $('.aishown', $c).addClass("d-none");
             $('.aientry .aishown', $c).removeClass("d-none");
        }
        $t.closest('span').prev('.aicollapse.open').removeClass('open');
        $('.aientry, .aicontrollers', $c).removeClass("d-none");
        $(':reset', $c).trigger('click'); $('.aiedit', $c).html('');
        $('[autofocus]', $c).focus();
    } else if (v == "prevrecord") {
        eval($c.data('prev'));
    } else if (v == "nextrecord") {
        eval($c.data('next'));
    } else if (v == "closeform") {
        if ($t.closest('dialog').length > 0) {
            //$t.closest('dialog').removeClass('onf'); // animate__animated animate__fadeInUpBig').addClass('animate__animated animate__fadeOutDownBig');
            var myOffcanvas = $t.closest('dialog');
            //var myOffcanvas = document.getElementById($t.id);
            var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
            bsOffcanvas.hide();

            //$('.aioverlay').removeClass('active');
            //$('footer').addClass('on');
        }
        fd = $c.attr("id");
        //aifetcha(fd.slice(fd.length - 6), "", { "value": "" }, { "insertupdate": "FormClose", "condition": "", "qtype": "g" }, "", undefined, undefined, "7");

        var openlast = ($t.closest('article').length > 0);
        $c.remove();
        if (openlast) $('article:last', aifc).removeClass("d-none");

        let cbsac = window[aifun($c) + 'Close'];
        if (cbsac != undefined) { if (typeof cbsac == "function") cbsac(data); }

    } else if (v == "showhidden") {
        $t.closest('span').prev('.aicollapse.open').removeClass('open');
        if ($('.d-none', $c).length > 0) { $('.d-none', $c).addClass('d-none border-1').removeClass('d-none'); } else { $('.d-none', $c).removeClass('d-none border-1').addClass('d-none'); }
    } else if (v == "showentry") {
        $t.closest("article,dialog").addClass("entry").removeClass("list listentry");
        $f = $('#' + $t.attr('form'));
        $t.closest('span').prev('.aicollapse.open').removeClass('open');
        $('.aientry, .aicontrollers', $c).removeClass("d-none");
        $('.aishown', $c).addClass("d-none");
        $('.aientry .aishown', $c).removeClass("d-none");
        $('[autofocus]', $f).focus();
    } else if (v == "showlistentry") {
        $t.closest("article,dialog").addClass("listentry").removeClass("list entry");
        $t.closest('span').prev('.aicollapse.open').removeClass('open');
        $('.aientry, .aicontrollers, .aishown', $c).removeClass("d-none");
    } else if (v == "showlist") {
        $t.closest("article,dialog").addClass("list").removeClass("entry listentry");
        $t.closest('span').prev('.aicollapse.open').removeClass('open');
        $('.aientry, .aicontrollers', $c).addClass("d-none");
        $('.aishown', $c).removeClass("d-none")
    } else if (v == "print") {
        var ttt1 = $('#tmpl0' + dd.showelement).html();
        var hlppartials = {};
        var info1 = Handlebars.compile(ttt1);
        Handlebars.registerHelper(hlpfunctions);
        Handlebars.registerPartial(hlppartials);
        $('#pout' + dd.showelement).html(info1(data));
        $('#pout' + dd.showelement).prepend('<link rel="stylesheet" href="aiscripts/amatya.css"><link rel="stylesheet" href="' + cc + '/aimsite.css">');
        printJS({ printable: 'pout' + dd.showelement, type: 'html', documentTitle: dd.dtitle });
        //if($('tbody',tb).length > 0) $('tbody',tb).html(info(dt)); else $(tb).html(info(dt)); tb.closest('div').data('dbrow', dt);
        //window.print();

        //            w=window.open();
        //                var html = "<!DOCTYPE HTML>";
        //    html += '<html lang="en-us">';
        //    html += '<head><style></style><link rel="stylesheet" href="aiscripts/aimcss-f.css"><link rel="stylesheet" href="' + cc + '/sitecss.css"><script>function printDocument() { window.print(); } </script></head>';
        //    html += "<body>"+ $('#pout' + dd.showelement).html();
        //    html += "</body>";
        //    w.document.write(html);
        //    w.document.write('<script>window.addEventListener("load", function() { alert("PageLoaded"); }, false);</script>');
        //w.onload = function() { window.print(); };
        //w.print();
        //w.close();
    }
});

// watchtime web component
customElements.get('watch-time') || customElements.define(
    "watch-time", 
    class extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({mode: "open"});
            this.div = document.createElement("div");
            shadowRoot.appendChild(this.div);
        }
        start() {
            this.pause(); this.workcron = setInterval(() => { this.timer(); }, 1000);
        }
        pause() { clearInterval(this.workcron); }
        timer() {
            this.start1 = this.getAttribute("start") || localStorage.getItem("StartDate");
            this.stop1 = this.getAttribute("stop");
            this.format = this.getAttribute("format") || "1";
            if(this.start1 == undefined) {
                this.div.innerHTML = ``;
                return;
            } else  {
                if(this.start1 != undefined) {
                    this.startTime = new Date(this.start1);
                    this.currentTime = new Date();
                    this.timeLap = this.currentTime - this.startTime;
                    this.days = Math.floor(this.timeLap / (1000 * 60 * 60 * 24));
                    this.hours = Math.floor((this.timeLap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    this.minutes = Math.floor((this.timeLap % (1000 * 60 * 60)) / (1000 * 60));
                    this.seconds = Math.floor((this.timeLap % (1000 * 60)) / 1000);
                    this.checkcounter = false;
                }
            }
            this.seconds++;
            if (this.seconds == 60) { this.seconds = 0; this.minutes++; }
            if (this.minutes == 60) { this.minutes = 0; this.hours++; }
            if(this.format == "1")
                this.div.innerText = `${this.hours.toString().paddingLeft("00")}:${this.minutes.toString().paddingLeft("00")}:${this.seconds.toString().paddingLeft("00")}`;
            else if(this.format == "2") 
                this.div.innerHTML = `${this.hours}<sub>h</sub> ${this.minutes}<sub>m</sub> ${this.seconds}<sub>s</sub>`;
        }
        connectedCallback() {
            this.workcron;
            this.start();
        }
    }
);
//curTimer.innerHTML = `<watch-time start="2024-11-13T11:11:48"></watch-time>`;
/*********** set session uid */
function setsession1(u, f) {
    $.ajax({
        type: "POST",
        url: 'aidt.asmx/setsession1', data: { 'u': u },  
        success: f
    });
}
var keepSessionAlive = false;
var keepSessionAliveUrl = null;

function SetupSessionUpdater(actionUrl) {
keepSessionAliveUrl = actionUrl;
var container = $("body");
container.mousemove(function () { keepSessionAlive = true; });
container.keydown(function () { keepSessionAlive = true; });
CheckToKeepSessionAlive();
}

function CheckToKeepSessionAlive() {
setTimeout("KeepSessionAlive()", 1000); // 5 * 60 * 1000);
}

function KeepSessionAlive() {
if (!keepSessionAlive && keepSessionAliveUrl != null) {
    $.ajax({
        type: "POST",
        url: keepSessionAliveUrl, 
        success: function () { keepSessionAlive = false; }
    });
}
CheckToKeepSessionAlive();
}
$(function () {
//SetupSessionUpdater('aidt.asmx/whoislive');
});
