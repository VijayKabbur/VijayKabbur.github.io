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
