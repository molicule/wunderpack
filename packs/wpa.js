
jetpack.tabs.onReady(function(d) {
    var pped = $(d).find("#wunderpack").length;
    if (pped >0) {
        var button = $(d).find("#wunderpack_a").length;
        if (button >0) {
        } else {
            $(d).find("#wunderpack").append("<div id='wunderpack_a' class='wunderpackbutton'>wp-a</div>");
            $(d).find("#wunderpack_a").click(function() {
                jetpack.notifications.show("from wunderpack-let a");
            });
        }
    }
});
