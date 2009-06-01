var name = "delicious_a";

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
etxt = etxt + "    if (logins.length>0) {\n";
etxt = etxt + "      txt = logins[0].username + \"::\" + logins[0].password;\n";
etxt = etxt + "    }\n";
etxt = etxt + "    return txt;\n";
etxt = etxt + "},\n";
etxt = etxt + "init: function() {"+name+"_pack.channeldata = "+name+"_pack.mygetpass(); }";

var dataicon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%B1IDATx%DAc%F8O%00%18%95%5C%C0%8B%19F%0D%18%16%06%00%C1%7F%7C%F8%F2%A5Kx1%D1%06%5C%3Bt%E8%FF%7Bg%E7%FF_%B4%B5%FF%7FSP%F8%FF%CE%C3%834%03%5E%A4%A6%FE%7FR%5B%0B%E7%83%0C%BB%3Fe%0Ay%5E%B8%B1c%C7%FF%D7%D1%D1%FF%1Fvw%13o%C0%AD%D5%AB%FF%7F%B4%B6%FE%FFCR%12l%FB%EB%A8(%D2%0C%F8dj%FA%FFA_%1F%9C%FF%268%F8%FF%C3%AE.%E2%0D%F8%A6%AC%FC%FF%CE%C2%85%60%F6%CDM%9B%FE%FF%14%12%FA%FF%A8%AD%8Dx%03%9ETW%FF%FF)%2C%FC%FF%A3%9D%DD%FF%F7nn%FF%1F%D7%D7%FF%7F%91%9E%FE%1F%00%1C\'%9F%C6%EB%E3b%20%00%00%00%00IEND%AEB%60%82";


jetpack.tabs.onReady(function(d) {
    var pped = $(d).find("#wunderpack").length;
    if (pped >0) {
        var button = $(d).find("#wppassbutton_a").length;
        if (button >0) {
        } else {
        var raw = this.raw;
        if (this.url.indexOf("about:blank") != -1) { return; }
            $(d).find("#wunderpack").append("<div id='wppassbutton_a' class='wunderpackbutton'><img src='"+dataicon+"'></div>");
            var document = d;
            var magic = $(raw).attr("wunderpassMagic")
            var element = document.createElement("MyElement_a");
            element.setAttribute("magic", magic);
            element.setAttribute("app", name);
            element.setAttribute("action", etxt);
            document.documentElement.appendChild(element);

            $(d).find("#wppassbutton_a").click(function() {
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

