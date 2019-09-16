window.onload = function() {
    $(".settings-back").click(function() {
        stg = $(".quick-settings");
        stg_back = $(".settings-back");
        if(stg_back.is(".opened-settings-back")){
            stg.toggleClass("opened-settings");
            stg_back.toggleClass("opened-settings-back");
            stg_back.toggleClass("closed-settings-back");
        }
    })
}
