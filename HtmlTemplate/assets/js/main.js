$(document).ready(function () {
    $(".datepicker").datepicker();

    $("#scrollTop").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

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

    var container = $(".passengerArea");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }

    $(".passengerBtn").click(function () {
        $(".passengerArea").hide();
    });

    $(".flyClass").on("change", function () {
        countTotal();
    });

    $(".passengerSelect").on("click", function () {
        $(".passengerArea").show();
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
});

function countTotal() {
    var classText = $(".flyClass option:selected").text();;
    let count = 0;
    $('.passengerArea .countInputArea .countInput').each(function(e) {
        count = count + Number($(this).val())
    });
    $('.passengerSelect .input').val(count + ' Yolcu, ' + classText);
}