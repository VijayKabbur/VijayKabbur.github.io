var notes_per_second = 5;
var note_spawn_interval = 1000 / notes_per_second;
var note_speed = 12;
var note_animation_interval = 0.001;
var buffer_difference = 50;


var game_session;
var is_game_paused = false;
var is_game_over = false;
var note_id = 1;
var current_note_id = 1;
var latest_note_id = 0;
var combo = 0;


var sub_bodies = ["sub_body_00_menu", "sub_body_01_play_mode_menu", "sub_body_02_options_menu", "sub_body_03_about_menu", "sub_body_04_play_area"];
var current_menu = "sub_body_00_menu";


function switch_sub_body(z){
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
        body.requestFullscreen();
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


document.addEventListener("keydown", keypress_col_n, false);

function keypress_col_n(e) {
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
    if(current_menu === "sub_body_01_play_mode_menu"){
        if(e.key == 'e' || e.key == 'E') {
            lets_play_already();
        }
    }
    if(e.key == 'b' || e.key == 'B') {
        switch_sub_body([0]);
    }
    if(e.key == 'r' || e.key == 'R') {
        if(current_menu === "sub_body_04_play_area"){
            init_game();
            lets_play_already();
        }
        else{
            window.location.reload();
        }
    }
    if(e.key == 'd' || e.key == 'D') {
        tap_col(1);
    }
    if(e.key == 'f' || e.key == 'F') {
        tap_col(2);
    }
    if(e.key == 'j' || e.key == 'J') {
        tap_col(3);
    }
    if(e.key == 'k' || e.key == 'K') {
        tap_col(4);
    }
}


function lets_play_already(){
    switch_sub_body([4]);

    let pa_01z_countdown = document.getElementById("pa_01z_countdown");

    pa_01z_countdown.innerHTML = "Ready?";
    pa_01z_countdown.style.color = "#FFFFFF";

    setTimeout(function(){
        pa_01z_countdown.innerHTML = "3";
        pa_01z_countdown.style.color = "#FF8888";
    }, 1000);

    setTimeout(function(){
        pa_01z_countdown.innerHTML = "2";
        pa_01z_countdown.style.color = "#00CCFF";
    }, 2000);

    setTimeout(function(){
        pa_01z_countdown.innerHTML = "1";
        pa_01z_countdown.style.color = "#8888FF";
    }, 3000);

    setTimeout(function(){
        pa_01z_countdown.innerHTML = "Play!";
        pa_01z_countdown.style.color = "#FFFF33";
        start_new_game();
    }, 4000);

    setTimeout(function(){
        pa_01z_countdown.style.display = "none";
    }, 4700);
}


function init_game(){
    is_game_paused = false;
    is_game_over = false;
    note_id = 1;
    current_note_id = 1;
    combo = 0;
    document.getElementById("pa_01c_combo").innerHTML = combo;
    for(let i = 1; i <= latest_note_id; i++){
        let note = document.getElementById("note_" + i);
        if(note != null) note.parentElement.removeChild(note);
    }
}


function start_new_game(){
    init_game();
    game_session = setInterval(function(){
        spawn_note();
    },note_spawn_interval);
}


function tap_col(n){
    //let originalBackgroundColor = document.getElementById("ps_pane_col_" + n).style.background;

    document.getElementById("ps_pane_col_" + n).style.background = "#444444";
    setTimeout(function(){
        document.getElementById("ps_pane_col_" + n).style.background = "#000000";  //= originalBackgroundColor;
    }, 70);

    tap_note();
}


function tap_note(){
    let note = document.getElementById("note_" + current_note_id);
    if(note == null){
        return;
    }

    let pane_bottom = document.getElementById("ps_02_pane").getBoundingClientRect().bottom;
    let current_height = note.getBoundingClientRect().bottom;
    let precision = Math.abs(pane_bottom - current_height);
    console.log(precision);

    if(precision <= buffer_difference){
        note.parentElement.removeChild(note);
        current_note_id += 1;
        combo += 1;
        document.getElementById("pa_01c_combo").innerHTML = combo;
    }
}


function game_over(){
    is_game_over = true;
    clearInterval(game_session);
    let pa_01z_countdown = document.getElementById("pa_01z_countdown");
    pa_01z_countdown.innerHTML = "Game Over!";
    pa_01z_countdown.style.color = "#FF4444";
    pa_01z_countdown.style.display = "block";
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function spawn_note(){
    if(is_game_over) return;

    random_column = Math.floor(Math.random() * 4) + 1;

    let note = document.createElement("div");
    note.className = (random_column === 1 || random_column === 4) ? 'note_type_2' : 'note_type_1';
    note.id = "note_" + note_id;
    note.style.top = document.getElementById("ps_02_pane").getBoundingClientRect().top;
    note.style.width = getComputedStyle(document.getElementById("ps_pane_col_" + random_column)).width;
    document.getElementById("ps_pane_col_" + random_column).prepend(note);

    latest_note_id += 1;
    
    move_note(note_id);

    note_id += 1;
}


async function move_note(id){
    let note = document.getElementById("note_" + id);
    if(note == null){
        return;
    }

    let note_depth = document.getElementById("ps_02_pane").getBoundingClientRect().top;
    let pane_bottom = document.getElementById("ps_02_pane").getBoundingClientRect().bottom + buffer_difference;

    let current_height = note.getBoundingClientRect().top;

    while((current_height <= pane_bottom)){
        if(note == null) break;
        note.style.top = note_depth + 'px';
        await sleep(note_animation_interval);
        if(is_game_paused == false) note_depth += note_speed;
        current_height = note.getBoundingClientRect().top;
    }

    if(note != null){
        note.parentElement.removeChild(note);
        is_game_paused = true;
        game_over();
    }
}
