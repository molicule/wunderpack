
jetpack.tabs.onReady(function(d) {
    var pped = $(d).find("#wunderpack").length;
    if (pped >0) {
        var button = $(d).find("#wunderpack_all").length;
        if (button >0) {
        } else {
            $(d).find("#wunderpack").append("<div id='wunderpack_all' class='wunderpackbutton'>wp-b</div>");
            $(d).find("#wunderpack_all").click(function() {
                jetpack.notifications.show("from wunderpacklet wp-all");
            });
        }
    }
});
