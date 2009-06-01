var name = "delicious_b";
var etxt = "";
etxt = etxt + "channeldata: '',\n";
etxt = etxt + "mygetpass: function() {\n";
etxt = etxt + "    var hostname = 'https://secure.delicious.com';\n";
etxt = etxt + "    var formSubmitURL = 'https://secure.delicious.com';\n";
etxt = etxt + "    var httprealm = null;\n";
etxt = etxt + "    var txt = \"\";\n";
etxt = etxt + "    var myLoginManager = Components.classes[\"@mozilla.org/login-manager;1\"]\n";
etxt = etxt + "                         .getService(Components.interfaces.nsILoginManager);\n";
etxt = etxt + "    var logins = myLoginManager.findLogins({}, hostname, formSubmitURL, httprealm);\n";
etxt = etxt + "    if (logins.length>1) {\n";
etxt = etxt + "      txt = logins[1].username + \"::\" + logins[1].password;\n";
etxt = etxt + "    }\n";
etxt = etxt + "    return txt;\n";
etxt = etxt + "},\n";
etxt = etxt + "init: function() {"+name+"_pack.channeldata = "+name+"_pack.mygetpass(); }";


jetpack.tabs.onReady(function(d) {
    var pped = $(d).find("#wunderpack").length;
    if (pped >0) {
        var button = $(d).find("#wppassbutton_b").length;
        if (button >0) {
        } else {
        var raw = this.raw;
        if (this.url.indexOf("about:blank") != -1) { return; }
            $(d).find("#wunderpack").append("<div id='wppassbutton_b' class='wunderpackbutton'>"+name+"</div>");
            var document = d;
            var magic = $(raw).attr("wunderpassMagic")
            var element = document.createElement("MyElement_b");
            element.setAttribute("magic", magic);
            element.setAttribute("app", name);
            element.setAttribute("action", etxt);
            document.documentElement.appendChild(element);

            $(d).find("#wppassbutton_b").click(function() {
                var evt = document.createEvent("Events");
                evt.initEvent("wunderpassChannel", true, false);
                element.dispatchEvent(evt);
                var channeldata = element.getAttribute("channeldata");
                send2delicious(channeldata);
                element.setAttribute("channeldata", "");
            });

            $(raw).trigger("wunderpacklist", [name]); 
        }
    }
});

function send2delicious(channeldata) {
    var userpasswd = channeldata.replace("::", ":");
    if (userpasswd.length <2) { return; }
    var durl = "https://"+userpasswd+"@api.del.icio.us/v1/posts/add";
    var  d = jetpack.tabs.focused.contentDocument;
    var purl = d.location.href;
    var title = d.title;
    var description = $(d).find("meta[name='description']").attr("content");
    if (title==undefined && description==undefined) { 
        description=purl;
    } else if(title==undefined) {
        // pass
    } else if (description==undefined) {
        description = title;
    } else {
        description = title + "\n" + description;
    }
    var tags = "wundermark";
    $.ajax({
        type: "GET",
        url: durl,
        data: "url="+escape(purl)+"&description="+escape(description)+"&tags="+tags,
        success: function(msg) {
            jetpack.notifications.show("added bookmark to delicious/" + userpasswd.split(":")[0]);
        }
    });
}
