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

var dataicon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%99IDATx%DAc%F8O%00%18%95%5C%C0%8B%19F%0D%A0%A3%01KMb%FE%97%F9u%D3%C0%00%20%F8%8F%0F_%BEt%09%8C_%C5%C6%FE%7F%D8%DB%0B%E7%C30%C9%06%FC%90%95%FD%FF%5DA%E1%FF%8B%B44%D2%0D%F8hc%03%E7%7Fpt%FC%7Fo%FAt%12%5D%D0%D9%09%E7%3F%EC%EA%FA%FF*.%8E4%03%EE%CE%9B%07%E7%DF%9D%3F%FF%FF%7BOO%D2%0Cx0a%02%C2%05%40%D7%BCLJ%22%CD%80%F7%EE%EEp%FEG%5B%5B%B0%2BH2%E0%DE%8C%19%FF%BF%CB%CB%83%F1%F3%FC%7C%B08%006%1B%A0%2C%24%5EZr%00%00%00%00IEND%AEB%60%82";


jetpack.tabs.onReady(function(d) {
    var pped = $(d).find("#wunderpack").length;
    if (pped >0) {
        var button = $(d).find("#wppassbutton_b").length;
        if (button >0) {
        } else {
        var raw = this.raw;
        if (this.url.indexOf("about:blank") != -1) { return; }
            $(d).find("#wunderpack").append("<div id='wppassbutton_b' class='wunderpackbutton'><img src='"+dataicon+"'></div>");
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
