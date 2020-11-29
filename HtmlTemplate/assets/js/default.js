$(document).ready(function () {
    $(".countInputArea .minus").on("click", function () {
        var inputVal = $(this).parent(".countInputArea").find(".countInput").val();
        if (inputVal > 0)
            $(this).parent(".countInputArea").find(".countInput").val(+inputVal - 1);
        countTotal();
    });
    $(".countInputArea .plus").on("click", function () {
        var inputVal = $(this).parent(".countInputArea").find(".countInput").val();
        $(this).parent(".countInputArea").find(".countInput").val(+inputVal + 1);
        countTotal();

    });
    $(".flyClass").on("change", function () {
        countTotal();

    });
    $(".passengerSelect").on("click", function () {
        $(".passengerArea").show();
    });

    $(".fly-date").datepicker({
        numberOfMonths: 2,
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

    $(".searchInput .input").focus(function () {
        $(".searchInput").removeClass("focus");
        $(this).parents(".searchInput").addClass("focus");
    });
    $(".searchInput").on("click", function () {
        $(this).find(".input").focus();
    });
    $("footer .footerMenu > div p.title").on("click", function () {
        $(this).next("ul").slideToggle();
        $(this).toggleClass("active");
    });
    $(".showMobileMenu").on("click", function () {
        $("body").addClass("activeMenu");
    });
    $(".closeMobileMenu").on("click", function () {
        $("body").removeClass("activeMenu");
    });
    $(".flyType li").click(function () {
        $(".flyType li").removeClass("active");
        $(this).addClass("active");
        var hasClass = $(this).hasClass("one");
        if (hasClass) {
            $(".dateTwo").hide();
            $(".dateTwo + .w-100").hide();
            $(".last-col").hide();
        }
        else {
            $(".dateTwo").show();
            $(".dateTwo + .w-100").show();
            $(".last-col").show();
        }
    });
    $(".flyType li:first").click();
    $("body").on("click", "footer .footerMenu > div p.title", function () {
        $(this).next("ul").slideToggle();
        $(this).toggleClass("active");
    });

    $("body").on("click", ".showMobileMenu", function () {
        $("body").addClass("activeMenu");
    });
    $("body").on("click", ".closeMobileMenu", function () {
        $("body").removeClass("activeMenu");
    });
    $(".companiesSlider").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: false,
        navText: ["<i class='fa fa-long-arrow-left' aria-hidden='true'></i>", "<i class='fa fa-long-arrow-right' aria-hidden='true'></i>"],

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
        mode: "vertical",
        minSlides: 7,
        responsive: true,
        moveSlides: 2,
        pager: false,
        prevSelector: ".bxPrev",
        nextSelector: ".bxNext",
        prevText: "<i class='fa fa-angle-left'></i>",
        nextText: "<i class='fa fa-angle-right'></i>",
        slideMargin: 33
    };
    var cfgMobile = {
        mode: "horizontal",
        minSlides: 4,
        moveSlides: 1,
        pager: false,
        controls: false,
        slideWidth: 210,
        slideMargin: 20
    };
    $(".mainOfferPc").bxSlider(cfgPc);
    $(".mainOfferMobile").bxSlider(cfgMobile);

    $("#first-place").focusout(function () {
        setTimeout(function () {
            if ($("#first-place-hidden").val() < 2) {
                $("#first-place").val("");
            }
        },
            500);
    });

    $("#second-place").focusout(function () {
        setTimeout(function () {
            if ($("#second-place-hidden").val() < 2) {
                $("#second-place").val("");
            }
        },
            500);
    });
    $(".passengerBtn").click(function () {
        $(".passengerArea").hide();
    });

    autoComplateInput("first-place");
    autoComplateInput("second-place");
    mouseOutClose(".passengerArea");
});
