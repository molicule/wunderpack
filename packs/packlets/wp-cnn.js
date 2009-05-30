jetpack.tabs.onReady(function(d) {
    var url = d.location.href;
    if (url.indexOf("cnn.com") != -1) {
        var pped = $(d).find("#wunderpack").length;
        if (pped >0) {
            var button = $(d).find("#wpcnnbutton").length;
            if (button >0) {
            } else {
                $(d).find("#wunderpack").append("<div id='wpcnnbutton' class='wunderpackbutton'>wp-x</div>");
                $(d).find("#wpcnnbutton").click(function() {
                    jetpack.notifications.show("from wunderpacklet wp-cnn");
                });
            }
        }
    }
});
