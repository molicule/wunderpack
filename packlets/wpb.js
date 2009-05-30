
jetpack.tabs.onReady(function(d) {
    var pped = $(d).find("#wunderpack").length;
    if (pped >0) {
        var button = $(d).find("#wunderpack_b").length;
        if (button >0) {
        } else {
            $(d).find("#wunderpack").append("<div id='wunderpack_b' class='wunderpackbutton'>wp-b</div>");
            $(d).find("#wunderpack_b").click(function() {
                jetpack.notifications.show("from wunderpack-let b");
            });
        }
    }
});
