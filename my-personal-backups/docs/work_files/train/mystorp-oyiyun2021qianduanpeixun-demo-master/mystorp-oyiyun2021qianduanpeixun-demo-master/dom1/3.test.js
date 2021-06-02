// TestCase: 包含鼠标、键盘事件
expect(run()).to.include.members(`mousedown
mouseup
mouseenter
mouseleave
mousemove
mouseover
mouseout
click
dblclick
contextmenu
touchstart
touchmove
touchend
touchcancel
dragstart
dragenter
dragleave
dragover
dragend
drop
drag
keyup
keydown`.split("\n"));
// TestCase: 包含表单事件
expect(run()).to.include.members(`change
input
submit
reset`.split("\n"));
// TestCase: 包含全局事件
expect(run()).to.include.members(`copy
cut
paste
fullscreenchange
readystatechange
visibilitychange
orientationchange
load
unload
resize
scroll
hashchange`.split("\n"));
// TestCase: 包含焦点事件
expect(run()).to.include.members(`focus
blur
focusin
focusout`.split("\n"));
// TestCase: 包含 xhr 事件
expect(run()).to.include.members(`abort
error
load
loadend
loadstart
progress
timeout`.split("\n"));