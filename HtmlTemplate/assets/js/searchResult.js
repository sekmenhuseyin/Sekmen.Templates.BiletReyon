$('.searchMobile').click(function () {
    $(this).next().toggle();
})
$('body').on('click', '.detailText', function () {
    $(this).parents('.flyItem').find('.detailRow').toggle();
});