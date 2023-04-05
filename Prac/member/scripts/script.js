var users = (sessionStorage.getItem("users_changed") == null) ?
            [ ["qwe", "123" , "001" ], ["rty", "456", "002"], ["uio", "789", "003"] ]
            :
            sessionStorage.getItem("users_changed");
var ID, PW, NAME;

function logIn() {

    event.preventDefault();

    let id = document.getElementById("id");
    ID = id.value;
    let pw = document.getElementById("pw");
    PW = pw.value;

    for ( let i = 0 ; i < users.length ; i++ ) {
        if( ( users[i][0] === ID ) && ( users[i][1] === PW ) ) {
            change_display(i, id, pw);
            sessionStorage.setItem("NAME", users[index][2]);
        }
    }

}

function change_display(index, id, pw) {

    let logIn_btn = document.getElementById("logIn_btn");
    let logOut_btn = document.getElementById("logOut_btn");
    let info_title = document.getElementById("info_title");

    logIn_btn.style.display = "none";
    logOut_btn.style.display = "block";

    id.disabled = "disabled";
    pw.disabled = "disabled";
    pw.type = "text";
    pw.value = users[index][2];

    info_title.innerHTML = "이름";
    
}

function move_pw_chang() {

    sessionStorage.setItem("ID", ID);
    sessionStorage.setItem("PW", PW);

    location.href = "changePassword.html"

}

function change_pw() {

    let old_pw = document.getElementById("old_pw");
    let old_pw_value = old_pw.value;
    let new_pw = document.getElementById("new_pw");
    let new_pw_value = new_pw.value;

    if ( old_pw_value == sessionStorage.getItem("PW") ) {
        let id = sessionStorage.getItem("ID");
        let name = sessionStorage.getItem("NAME");

        for ( let i = 0 ; i < users.length ; i ++ ) {
            if ( id === users[i][0] && name === users[i][2] ) {
                users[i][1] = new_pw_value;
                sessionStorage.setItem("users_changed", users);
            } else alert("세션 스토리지(로그인 정보) 오류");
        }
    } else {
        alert("기존 비밀번호가 일치하지 않습니다.\n다시 입력해주세요.");
        old_pw_value = "";
        new_pw_value = "";
    }
}