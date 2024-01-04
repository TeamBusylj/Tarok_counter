
function noDialogAnimations(newElement) {
    newElement.getOpenAnimation().dialog = [[[{
        "opacity": "0"
    }, {

        "opacity": "1"
    }], {
        "duration": 10,
        "easing": "cubic-bezier(.3,.5,0,1.3)"
    }]]
    newElement.getOpenAnimation().container = [[[{
        "opacity": "0"
    }, {

        "opacity": "1"
    }], {
        "duration": 10,
        "easing": "cubic-bezier(.3,.5,0,1.3)"
    }]]
    newElement.getOpenAnimation().content = [[[{
        "opacity": "0"
    }, {

        "opacity": "1"
    }], {
        "duration": 100,
        "easing": "cubic-bezier(.3,.5,0,1)",
        "fill": "forwards"
    }]]
    newElement.getCloseAnimation().dialog = [[[{

        "opacity": "1"
    }, {

        "opacity": "0"
    }], {
        "duration": 100,
        "easing": "cubic-bezier(.3,.5,0,1.0)"
    }]]
    newElement.getCloseAnimation().content = [[[{
        "opacity": "1"
    }, {

        "opacity": "0"
    }], {
        "duration": 100,
        "easing": "linear",
        "fill": "forwards"
    }]]
    newElement.getCloseAnimation().scrim = [[[{
        "opacity": "0.32"
    }, {
        "opacity": "0"
    }], {
        "duration": 50,
        "easing": "linear",
        "fill": "forwards"
    }]]
    newElement.getOpenAnimation().scrim = [[[{
        "opacity": "0"
    }, {
        "opacity": "0.32"
    }], {
        "duration": 50,
        "easing": "linear",
        "fill": "forwards"
    }]]
}
function dialogAnimations(newElement) {
    newElement.getOpenAnimation().container = [[[{
        "opacity": "0"
    }, {

        "opacity": "1"
    }], {
        "duration": 100,
        "easing": "cubic-bezier(.3,.5,0,1)",
        "fill": "forwards"
    }]]
    newElement.getCloseAnimation().container = [[[{
        "opacity": "1"
    }, {

        "opacity": "0"
    }], {
        "duration": 1000,
        "easing": "cubic-bezier(.3,.5,0,1)",
        "fill": "forwards"
    }]]
    newElement.getOpenAnimation().dialog = [[[{
        "transform": "scale(.5)",
        "opacity": "0"
    }, {
        "transform": "scale(1)",
        "opacity": "1"
    }], {
        "duration": 500,
        "easing": "cubic-bezier(.3,.5,0,1.3)"
    }]]
    newElement.getOpenAnimation().content = [[[{
        "transform": "scale(.5)",
        "overflow": "hidden",
        "opacity": "0"
    }, {
        "overflow": "scroll",
        "transform": "scale(1)",
        "opacity": "1"
    }], {
        "duration": 500,
        "easing": "cubic-bezier(.3,.5,0,1)",
        "fill": "forwards"
    }]]
    newElement.getCloseAnimation().dialog = [[[{
        "transform": "scale(1)",
        "opacity": "1"
    }, {
        "transform": "scale(.5)",
        "opacity": "0"
    }], {
        "duration": 500,
        "easing": "cubic-bezier(.3,.5,0,1.0)"
    }]]
    newElement.getCloseAnimation().content = [[[{
        "transform": "scale(1)"
    }, {
        "transform": "scale(.5)"
    }], {
        "duration": 500,
        "easing": "linear",
        "fill": "forwards"
    }]]
    newElement.getCloseAnimation().scrim = [[[{
        "opacity": ".32"
    }, {
        "opacity": "0"
    }], {
        "duration": 150,
        "easing": "linear",
        "fill": "forwards"
    }]]
    newElement.getOpenAnimation().scrim = [[[{
        "opacity": "0"
    }, {
        "opacity": "0.32"
    }], {
        "duration": 300,
        "easing": "linear",
        "fill": "forwards"
    }]]
}


function dlgFullscreen(dialog, dlga) {
    dialog.getOpenAnimation().content = [[[{

        "opacity": "0"
    }, {

        "opacity": "1"
    }], {
        "duration": 0,
        "easing": "cubic-bezier(.3, .5, 0, 1.3)",
        "fill": "forwards"
    }]]
    dialog.getOpenAnimation().dialog = [[[{
        "transform": "scale(.9)",
        "opacity": "0"
    }, {
        "transform": "scale(1)",
        "opacity": "1"
    }], {
        "duration": 300,
        "easing": "cubic-bezier(.3, .5, 0, 1.3)",
        "fill": "forwards"
    }]]
    dialog.getCloseAnimation().content = [[[{

        "opacity": "1"
    }, {

        "opacity": "0"
    }], {
        "duration": 0,
        "easing": "linear",
        "fill": "forwards"
    }]]
    dialog.getCloseAnimation().dialog = [[[{

        "opacity": "1"
    }, {

        "opacity": "0"
    }], {
        "duration": 0,
        "easing": "linear",
        "fill": "forwards"
    }]]
    if (!dlga) {
        document.getElementById("homeContainer").style.display = "none"

    }


}
