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
});