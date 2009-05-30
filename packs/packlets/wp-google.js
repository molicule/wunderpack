
jetpack.tabs.onReady(function(d) {
    var url = d.location.href;
    if (url.indexOf("google.com") != -1) {
        var pped = $(d).find("#wunderpack").length;
        if (pped >0) {
            var button = $(d).find("#wpgooglebutton").length;
            if (button >0) {
            } else {
                $(d).find("#wunderpack").append("<div id='wpgooglebutton' class='wunderpackbutton'>wp-x</div>");
                $(d).find("#wpgooglebutton").click(function() {
                    jetpack.notifications.show("from wunderpacklet wp-google");
                });
            }
        }
    }
});
