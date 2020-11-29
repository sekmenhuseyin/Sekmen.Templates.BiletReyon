$(document).ready(function () {
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
function countTotal() {
    var classText = $(".flyClass option:selected").text();;
    let count = 0;
    $('.passengerArea .countInputArea .countInput').each(function (e) {
        count = count + Number($(this).val())
    })
    $('.passengerSelect .input').val(count + ' Yolcu, ' + classText);
}