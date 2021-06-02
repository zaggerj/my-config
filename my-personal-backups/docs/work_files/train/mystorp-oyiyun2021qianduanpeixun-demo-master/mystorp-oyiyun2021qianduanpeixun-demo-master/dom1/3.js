function run() {
    return [
        "mousedown mouseup mouseenter mouseleave mousemove mouseover mouseout click dblclick contextmenu touchstart touchmove touchend touchcancel dragstart dragenter dragleave dragover dragend drop drag keyup keydown",
        "change input submit reset",
        "copy cut paste fullscreenchange readystatechange visibilitychange orientationchange load unload resize scroll hashchange",
        "focus blur focusin focusout",
        "abort error load loadend loadstart progress timeout"
    ].join(" ").split(" ");
}