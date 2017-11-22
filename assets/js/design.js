// Global Variables
var counter = 0;
var curljs = document.createElement('script');
var datajs = document.createElement('script');
var color_counter = 0;
var stop;
var pause = false;
var timeoutId = null;

// browser sniffing, sorry
var IE = window.IE || Number(navigator.userAgent.replace(/.*MSIE (\d+)\.0.*/, "$1")) || null;
var RETINA = window.devicePixelRatio > 1;

// vertical aligning content on page
$(document).ready(function(){
    site.resize();

    $(window).resize(function(){
        site.resize();
    });
});

var site = {
    resize: function(){
        var new_margin = Math.ceil(($(window).height() - $('.container').height()) / 6);
        $('.container').css('margin-top', new_margin + 'px');
    }
};

// increments counter to move to next item
function increment() {
    counter++; 
}

// increments counter to move to next item
function decrement() {
    counter--; 
}

function resume() {
    if(color_counter == 0) {
        // pause ? turn() : stopTurnaround();
        pause = !pause;
    }
    // glyphicon glyphicon-play
    if(pause) {
        $('#resume span.glyphicon.glyphicon-pause').removeClass('glyphicon-pause').addClass('glyphicon-play');
    }
    if(!pause) {
        $('#resume span.glyphicon.glyphicon-play').removeClass('glyphicon-play').addClass('glyphicon-pause');
    }
}

function addPreviews() {

    for(var i = 0; i < data.length; i++){
        $('<button>')
            .attr('id', "data")
            .attr('name', i)
            .text(data[i].name)
            .appendTo('.multiple-items')
            .click(function(){
                stopTurnaround();
                // Hide and Show Things
                $(".container").css("width", "130vh");
                $(".container").css("text-align", "initial");
                $('h2').text("Turnaround");
                $('.row').show();
                $( "div" ).remove( "#widget" );

                console.log(this.name);
                // Reset items
                color_counter = 0;
                $("img.turntable-frame").attr("src", "../Highline Collective Turntables/" + data[this.name].pathway + data[this.name].style[color_counter].num + "/1.png");
                var name = document.getElementById("name");
                name.innerHTML = data[this.name].name;
                name.classList.toggle("SlideDown");

                var description = document.getElementById("description");
                description.innerHTML =data[this.name].description;

                counter = this.name;

                timeoutId = setTimeout(function(){
                     turn();
                 }, 150); 
            });
    }

}

addPreviews();

// ---------------------------
// --TO TURN AND NOT TO TURN--
// ---------------------------

// handles turnaround
var turn = function turnaround() {
    pause = false;
    // starting "num"
    var num = 1;
    // limit of how far it goes
    var len = 40;                                  
    stop = setInterval(function(){                           
        num = (num === len) ? 1 : num;                //reset if limit reached
        if(!pause) {
        $("img.turntable-frame").attr("src", "../Highline Collective Turntables/" + data[counter].pathway + data[counter].style[color_counter].num + "/"+ num + ".png");
        ++num; 
            if (num == len) {
                $("img.turntable-frame").attr("src", "../Highline Collective Turntables/" + data[counter].pathway + data[counter].style[color_counter].num + "/1.png");
                // stopTurnaround();
            }  
        }                             
    }, 150); 
}

//function to clear Interval and stop the turnaround when you click ahead
function stopTurnaround() {
    clearInterval(stop);
    stop =  null;
    pause = true;
}

// -------------------------
// --CLICKS AND KEYPRESSES--
// -------------------------

function forward(){
    var str = $('h2').text();

    if (str == "Turnaround") {
        stopTurnaround();
        // Hide and Show Things
        $('h2').text("Style Overview");
        $('.row').hide();
        $(".container").css("width", "100%");
        $(".container").css("text-align", "center");

        // Reset items
        color_counter = 0;
        var widget = document.createElement('div');
        var width = 100 / data[counter].style.length + "%";
        var height = "100%";
        if (data[counter].style.length >= 6)
        {
            width = 100 / (data[counter].style.length / 2 ) + "%";   
        }
        if (data[counter].style.length == 2) {
            width = 100 / (data[counter].style.length / .8) + "%";
        }
        if (data[counter].style.length == 1) {
            width = 100 / (data[counter].style.length / .3) + "%";
        }
        widget.className = 'widget'; 
        $( ".container" ).append( $( "<div>", {id: "widget"}) ); 

        // Append images
        for(var i = 0; i < data[counter].style.length; i++) { 
            $('#widget').prepend($('<img>',{id: "resize", src: "../Highline Collective Turntables/" + data[counter].pathway + data[counter].style[color_counter].num + "/1.png"}));
            $('#resize').css("width", width);
            color_counter++;
        }
    } 

    else {
        increment(); 
        if(counter === data.length) {
            window.location.href = "end.html";
        } 
        // Hide and Show Things
        $(".container").css("width", "130vh");
        $(".container").css("text-align", "initial");
        $('h2').text("Turnaround");
        $('.row').show();
        $( "div" ).remove( "#widget" );

        // Reset items
        color_counter = 0;
        $("img.turntable-frame").attr("src", "../Highline Collective Turntables/" + data[counter].pathway + data[counter].style[color_counter].num + "/1.png");
        var name = document.getElementById("name");
        name.innerHTML = data[counter].name;
        name.classList.toggle("SlideDown");

        var description = document.getElementById("description");
        description.innerHTML =data[counter].description;

        timeoutId = setTimeout(function(){
             turn();
         }, 150);
    }
};

function back(){
    var str = $('h2').text();

    if (str == "Turnaround") {
        stopTurnaround();

        if(counter == 0) {
            window.location.href = "index.html";
        } 
                decrement();
        // Hide and Show Things
        $('h2').text("Style Overview");
        $('.row').hide();
        $(".container").css("width", "100%");
        $(".container").css("text-align", "center");

        // Reset items
        color_counter = 0;
        var widget = document.createElement('div');
        var width = 100 / data[counter].style.length + "%";
        var height = "100%";
        if (data[counter].style.length >= 6)
        {
            width = 100 / (data[counter].style.length / 2 ) + "%";   
        }
        if (data[counter].style.length == 2) {
            width = 100 / (data[counter].style.length / .8) + "%";
        }
        if (data[counter].style.length == 1) {
            width = 100 / (data[counter].style.length / .3) + "%";
        }
        widget.className = 'widget'; 
        $( ".container" ).append( $( "<div>", {id: "widget"}) ); 

        // Append images
        for(var i = 0; i < data[counter].style.length; i++) { 
            $('#widget').prepend($('<img>',{id: "resize", src: "../Highline Collective Turntables/" + data[counter].pathway + data[counter].style[color_counter].num + "/1.png"}));
            $('#resize').css("width", width);
            color_counter++;
        }
    } 

    else {
        if(counter === data.length) {
            window.location.href = "end.html";
        } 
        // Hide and Show Things
        $(".container").css("width", "130vh");
        $(".container").css("text-align", "initial");
        $('h2').text("Turnaround");
        $('.row').show();
        $( "div" ).remove( "#widget" );

        // Reset items
        color_counter = 0;
        $("img.turntable-frame").attr("src", "../Highline Collective Turntables/" + data[counter].pathway + data[counter].style[color_counter].num + "/1.png");
        var name = document.getElementById("name");
        name.innerHTML = data[counter].name;
        name.classList.toggle("SlideDown");

        var description = document.getElementById("description");
        description.innerHTML =data[counter].description;

        timeoutId = setTimeout(function(){
             turn();
         }, 150);
    }
};

// $(window).keypress(function (e) {
//   if (e.keyCode === 32) {
//     e.preventDefault()
//     if(color_counter == 0) {
//         // pause ? turn() : stopTurnaround();
//         pause = !pause;
//     }
//   }
// });

// For the first initial item
turn();