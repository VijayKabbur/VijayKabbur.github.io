var current_menu = "sub_body_00_menu";

function switch_sub_body(z){
    var sub_bodies = ["sub_body_00_menu", "sub_body_01_play_area", "sub_body_02_options_menu", "sub_body_03_about_menu"];
    for(let i=0; i < sub_bodies.length; i++){
        document.getElementById(sub_bodies[i]).style.display = "none";
    }
    z.forEach(y => {
        document.getElementById(sub_bodies[y]).style.display = "block";
        current_menu = sub_bodies[y];
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
    if(e.key == 's' || e.key == 'S') {
        //For Testing
        spawn_note();
    }
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
    if(current_menu === "sub_body_00_menu"){
        if(e.key == 'p' || e.key == 'P') {
            lets_play();
        }
        if(e.key == 'o' || e.key == 'O') {
            lets_customize();
        }
        if(e.key == 'a' || e.key == 'A') {
            lets_explore();
        }
        if(e.key == 'q' || e.key == 'Q') {
            quit_game();
        }
    }
    if(e.key == 'b' || e.key == 'B') {
        switch_sub_body([0]);
    }
    if(e.key == 'r' || e.key == 'R') {
        window.location.reload();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var note_id = 1;

function spawn_note(){
    random_column = Math.floor(Math.random() * 4) + 1;
if(note_id == 1){
    let note = document.createElement("div");
    note.className = 'note_1';
    note.id = "note_" + note_id++;
    document.getElementById("ps_pane_col_" + random_column).append(note);
}
    move_note(1);
}

async function move_note(id){
    let margin_top = 1;
    let pane_bottom = document.getElementById("ps_02_pane").getBoundingClientRect().bottom;
    let current_height = document.getElementById("note_" + id).getBoundingClientRect().top;

    while(current_height <= pane_bottom){
        document.getElementById("note_" + id).style.marginTop = (margin_top++) + '%';
        // document.getElementById("note_" + id).style.top = (margin_top++) + 'px';
        current_height = document.getElementById("note_" + id).getBoundingClientRect().top;
        await sleep(1);
    }
}
