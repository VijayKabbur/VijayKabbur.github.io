function switch_sub_body(z){
    var sub_bodies = ["sub_body_00_menu", "sub_body_01_play_area"];
    for(let i=0; i < sub_bodies.length; i++){
        document.getElementById(sub_bodies[i]).style.display = "none";
    }
    z.forEach(y => {
        document.getElementById(sub_bodies[y]).style.display = "block";
    });
}

switch_sub_body([0]);

function lets_play(){
    switch_sub_body([1]);
}

function start_new_game(){
}

function back_to_menu(){
    switch_sub_body([0]);
}

function quit_game(){
    if(confirm("Are you sure you want to quit? \n\n My script might fail to close the tab though... \n(Browser security, blah blah)\n\n Why don't you just close the tab yourself, hm?\n")){
        window.close();
    }
}
