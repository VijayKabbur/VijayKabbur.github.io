function switch_sub_body(z){
    var sub_bodies = ["sub_body_00_menu", "sub_body_01_play_area", "sub_body_02_options_menu", "sub_body_03_about_menu"];
    for(let i=0; i < sub_bodies.length; i++){
        document.getElementById(sub_bodies[i]).style.display = "none";
    }
    z.forEach(y => {
        document.getElementById(sub_bodies[y]).style.display = "block";
    });
}

function switch_to_fullscreen(){
    var body = document.getElementById("body");
    if(body.requestFullscreen){
        // body.requestFullscreen();
    }
    else if(body.webkitRequestFullscreen){ 
        body.webkitRequestFullscreen();
    }
}

function lets_play(){
    switch_sub_body([1]);
    switch_to_fullscreen();
}

function lets_customize(){
    switch_sub_body([2]);
    switch_to_fullscreen();
}

function lets_explore(){
    switch_sub_body([3]);
    switch_to_fullscreen();
}

function quit_game(){
    if(confirm("Are you sure you want to quit? \n\n My script might fail to close the tab though... \n(Browser security, blah blah)\n\n Why don't you just close the tab yourself, hm?\n")){
        window.close();
    }
}

function back_to_menu(){
    switch_sub_body([0]);
}

function start_new_game(){
}

function tap_col_1(){
    let originalBackgroundColor = document.getElementById("ps_pane_col_1").style.background;
    document.getElementById("ps_pane_col_1").style.background = "#444444";
    setTimeout(function(){
        document.getElementById("ps_pane_col_1").style.background = originalBackgroundColor;
    }, 70);
}

function tap_col_2(){
    let originalBackgroundColor = document.getElementById("ps_pane_col_2").style.background;
    document.getElementById("ps_pane_col_2").style.background = "#444444";
    setTimeout(function(){
        document.getElementById("ps_pane_col_2").style.background = originalBackgroundColor;
    }, 70);
}

function tap_col_3(){
    let originalBackgroundColor = document.getElementById("ps_pane_col_3").style.background;
    document.getElementById("ps_pane_col_3").style.background = "#444444";
    setTimeout(function(){
        document.getElementById("ps_pane_col_3").style.background = originalBackgroundColor;
    }, 70);
}

function tap_col_4(){
    let originalBackgroundColor = document.getElementById("ps_pane_col_4").style.background;
    document.getElementById("ps_pane_col_4").style.background = "#444444";
    setTimeout(function(){
        document.getElementById("ps_pane_col_4").style.background = originalBackgroundColor;
    }, 70);
}

document.addEventListener("keydown", keypress_col_n, false);

function keypress_col_n(e) {
    if(e.key == 'd' || e.key == 'D') {
        tap_col_1();
    }
    if(e.key == 'f' || e.key == 'F') {
        tap_col_2();
    }
    if(e.key == 'j' || e.key == 'J') {
        tap_col_3();
    }
    if(e.key == 'k' || e.key == 'K') {
        tap_col_4();
    }
}
