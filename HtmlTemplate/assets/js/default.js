$('.ticketFilterArea .dateTwo').hide();
$('.ticketFilterArea .dateTwo + .w-100').hide();
$('.ticketFilterArea .last-col').hide();
$('.flyType li').click(function () {
    $('.flyType li').removeClass('active');
    $(this).addClass('active');
    var hasClass = $(this).hasClass('one');
    if (hasClass) {
        $('.dateTwo').hide();
        $('.dateTwo + .w-100').hide();
        $('.last-col').hide();
    }
    if (!hasClass) {
        $('.dateTwo').show();
        $('.dateTwo + .w-100').show();
        $('.last-col').show();
    }
});

$(document).ready(function () {
    $('.topFormArea').on('keyup keypress', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
    $('.countInputArea .minus').on('click', function () {
        var inputVal = $(this).parent('.countInputArea').find('.countInput').val();
        if (inputVal > 0)
            var inputValMinus = $(this).parent('.countInputArea').find('.countInput').val(+inputVal - 1);
        countTotal()
    });
    $('.countInputArea .plus').on('click', function () {
        var inputVal = $(this).parent('.countInputArea').find('.countInput').val();
        var inputValMinus = $(this).parent('.countInputArea').find('.countInput').val(+inputVal + 1);
        countTotal()

    });

    $('.flyClass').on('change', function () {
        countTotal()

    });
    function countTotal() {
        var classText = $(".flyClass option:selected").text();;
        let count = 0;
        $('.passengerArea .countInputArea .countInput').each(function (e) {
            count = count + Number($(this).val())
        })
        $('.passengerSelect .input').val(count + ' Yolcu, ' + classText)
    }

    $('.passengerSelect').on('click', function () {
        $('.passengerArea').show();
    });
    var showMonth = 2;
    if ($(window).width() < 768) {
        showMonth = 1
    }
    $(".fly-date").datepicker({
        numberOfMonths: showMonth,
    });

    $("#first-date").datepicker({
        minDate: new Date(),
        onClose: function (selectedDate) {
            $("#second-date").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#second-date").datepicker({
        onClose: function (selectedDate) {
            $("#first-date").datepicker("option", "maxDate", selectedDate);
        }
    });
    (function (factory) {
        if (typeof define === "function" && define.amd) {

            // AMD. Register as an anonymous module.
            define(["../widgets/datepicker"], factory);
        } else {

            // Browser globals
            factory(jQuery.datepicker);
        }
    }(function (datepicker) {

        datepicker.regional.tr = {
            closeText: "kapat",
            prevText: '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
            nextText: '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>',
            currentText: "bugün",
            monthNames: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
                "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
            monthNamesShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz",
                "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
            dayNames: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
            dayNamesShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
            dayNamesMin: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
            weekHeader: "Hf",
            dateFormat: "dd.mm.yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        datepicker.setDefaults(datepicker.regional.tr);

        return datepicker.regional.tr;

    }));
    autoComplateInput('first-place');
    autoComplateInput('second-place');

    function autoComplateInput(id) {
        new window.autoComplete({
            selector: '#' + id,
            minChars: 3,
            source: function (term, suggest) {
                term = term.toLocaleLowerCase('tr');
                $.getJSON('/API/SearchAirport/' + term, function (data) {


                    var suggestions = [];
                    for (i = 0; i < data.length; i++) {
                        var code = data[i].AirportCode === "SFQ" ? data[i].AirportCode = "GNY" : data[i].AirportCode;
                        if (~(code + ' ' + data[i].AirportName + ' ' + data[i].CityName).toLowerCase().indexOf(term)) suggestions.push(data[i]);
                    }
                    suggest(suggestions);
                });
            },
            renderItem: function (item, search) {
                var code = item.AirportCode === "SFQ" ? item.AirportCode = "GNY" : item.AirportCode;
                search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
                var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
                return `<div class="autocomplete-suggestion" data-code="${code},${item.IsCity}" data-langname="${item.AirportName}" data-lang="${item.CityName}" data-val="${search}"><span class="shortName">${code}</span> ${item.AirportName}, ${item.CityName}</div>`;
            },
            onSelect: function (e, term, item) {

                document.getElementById(id + "-hidden").value = item.getAttribute('data-code');
                document.getElementById(id).value = item.getAttribute('data-langname') + ' (' + item.getAttribute('data-lang') + ')';
            }
        });
    }
});

$('.searchInput .input').focus(function () {
    $('.searchInput').removeClass('focus');
    $(this).parents('.searchInput').addClass('focus');
});
$('.searchInput').on('click', function () {
    $(this).find('.input').focus();
});

mouseOutClose('.passengerArea');

function mouseOutClose(containerName) {
    $(document).mouseup(function (e) {
        var container = $(containerName);
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
}

$('body').on('click', 'footer .footerMenu > div p.title', function () {
    $(this).next('ul').slideToggle();
    $(this).toggleClass('active');
});

$('body').on('click', '.showMobileMenu', function () {
    $('body').addClass('activeMenu');
});
$('body').on('click', '.closeMobileMenu', function () {
    $('body').removeClass('activeMenu');
});
$(document).ready(function () {
    $('.companiesSlider').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-long-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'],

        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });

    var cfgPc = {
        mode: 'vertical',
        minSlides: 7,
        responsive: true,
        moveSlides: 2,
        pager: false,
        prevSelector: '.bxPrev',
        nextSelector: '.bxNext',
        prevText: '<i class="fa fa-angle-left"></i>',
        nextText: '<i class="fa fa-angle-right"></i>',
        slideMargin: 33
    };
    var cfgMobile = {
        mode: 'horizontal',
        minSlides: 4,
        moveSlides: 1,
        pager: false,
        controls: false,
        slideWidth: 210,
        slideMargin: 20
    };
    $('.mainOfferPc').bxSlider(cfgPc);
    $('.mainOfferMobile').bxSlider(cfgMobile);

    $("#first-place").focusout(function () {
        setTimeout(function () {
            if ($('#first-place-hidden').val() < 2) {
                $("#first-place").val('');
            }
        },
            500);
    });

    $("#second-place").focusout(function () {
        setTimeout(function () {
            if ($('#second-place-hidden').val() < 2) {
                $("#second-place").val('');
            }
        },
            500);
    });

    $('.searchBtn').on('click',
        function (e) {

            var f = $('#first-place-hidden').val();
            var s = $('#second-place-hidden').val();
            var d = $('#first-date').val();
            console.log(f.length, s.length)
            if (f.length < 2 || s.length < 2 || d.length < 2) {
                // e.preventDefault();

            } else {
                document.getElementById("mainSearch").submit();
            }
        });
});
$('.passengerBtn').click(function () {
    $('.passengerArea').hide();
});