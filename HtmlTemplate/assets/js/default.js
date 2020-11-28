$(document).ready(function () {
    $('.countInputArea .minus').on('click', function () {
        var inputVal = $(this).parent('.countInputArea').find('.countInput').val();
        if (inputVal > 0)
            var inputValMinus = $(this).parent('.countInputArea').find('.countInput').val(+inputVal - 1);
    });
    $('.countInputArea .plus').on('click', function () {
        var inputVal = $(this).parent('.countInputArea').find('.countInput').val();
        var inputValMinus = $(this).parent('.countInputArea').find('.countInput').val(+inputVal + 1);

    });

    $('.passengerSelect').on('click', function () {
        $('.passengerArea').show();
    });

    $(".fly-date").datepicker({
        numberOfMonths: 2,
    });
    $('.searchInput .input').focus(function () {
        $('.searchInput').removeClass('focus');
        $(this).parents('.searchInput').addClass('focus');
    });
    $('.searchInput').on('click', function () {
        $(this).find('.input').focus();
    });
    $('footer .footerMenu > div p.title').on('click', function () {
        $(this).next('ul').slideToggle();
        $(this).toggleClass('active');
    });
    $('.showMobileMenu').on('click', function () {
        $('body').addClass('activeMenu');
    });
    $('.closeMobileMenu').on('click', function () {
        $('body').removeClass('activeMenu');
    });
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
function autoComplateInput(id) {
    new window.autoComplete({
        selector: '#' + id,
        minChars: 2,
        source: function (term, suggest) {
            term = term.toLowerCase();
            //////////////////////////////////////////////////////////////////////////////////////////////
            //{"AirportCode":"SAW","Name":"Sabiha Gokcen","CityName":"Istanbul, Türkiye","isCity":false}//
            //////////////////////////////////////////////////////////////////////////////////////////////
            var choices = window.airportList;
            var suggestions = [];
            for (i = 0; i < choices.length; i++)
                if (~(choices[i].AirportCode + ' ' + choices[i].Name + ' ' + choices[i].CityName).toLowerCase().indexOf(term)) suggestions.push(choices[i]);
            suggest(suggestions);
        },
        renderItem: function (item, search) {
            search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;');
            var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
            return `<div class="autocomplete-suggestion" data-code="${item.AirportCode},${item.isCity}" data-langname="${item.Name}" data-lang="${item.CityName}" data-val="${search}"><span class="shortName">${item.AirportCode}</span> ${item.Name},${item.CityName}</div>`;
        },
        onSelect: function (e, term, item) {
            //console.log(`Item "${item.getAttribute('data-langname')} (${item.getAttribute('data-lang')})" selected by ${e.type == 'keydown' ? 'pressing enter' : 'mouse click'}.`);
            document.getElementById(id + "-hidden").value = item.getAttribute('data-code');
            document.getElementById(id).value = item.getAttribute('data-langname') + ' (' + item.getAttribute('data-lang') + ')';
        }
    });
}