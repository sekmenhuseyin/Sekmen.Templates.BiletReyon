$(document).ready(function () {
    $(".datepicker").datepicker();
    $("#scrollTop").click(function () {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});
function mouseOutClose(containerName) {
    $(document).mouseup(function (e) {
        var container = $(containerName);
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
}
function countTotal() {
    var classText = $(".flyClass option:selected").text();;
    let count = 0;
    $('.passengerArea .countInputArea .countInput').each(function (e) {
        count = count + Number($(this).val())
    })
    $('.passengerSelect .input').val(count + ' Yolcu, ' + classText);
}