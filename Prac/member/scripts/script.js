var users = (sessionStorage.getItem("users_changed") == null) ?
    [["qwe", "123", "김", "001"], ["rty", "456", "이", "002"], ["uio", "789", "박", "003"]]
    :
    JSON.parse(sessionStorage.getItem("users_changed"));

function logIn() {

    event.preventDefault();

    let id = document.getElementById("id");
    let pw = document.getElementById("pw");

    for ( let i = 0 ; i < users.length ; i++ ) {
        if ( ( users[i][0] === id.value ) && ( users[i][1] === pw.value ) ) {
            change_display(i, id, pw);

            sessionStorage.setItem("ID", users[i][0]);
            sessionStorage.setItem("PW", users[i][1]);
            sessionStorage.setItem("NAME", users[i][2]);
            sessionStorage.setItem("TEL", users[i][3]);

            return;
        }
    }

    alert("일치하는 회원정보가 없습니다.");
    id.value = "";
    pw.value = "";

}

function change_display(index, id, pw) {

    let logIn_btn = document.getElementById("logIn_btn");
    let logOut_btn = document.getElementById("logOut_btn");
    let hide_info = document.getElementById("hide_info");
    let info_title = document.getElementById("info_title");
    let hide_tel = document.getElementById("hide_tel");
    

    logIn_btn.style.display = "none";
    logOut_btn.style.display = "block";
    hide_info.style.display = "block"

    id.disabled = "disabled";
    pw.disabled = "disabled";
    pw.type = "text";

    pw.value = users[index][2];
    hide_tel.value = users[index][3];
    info_title.innerHTML = "이름";


}

function move_change(obj) {

    if (obj.getAttribute("id") === "info_change")
        location.href = "changeInfo.html";
    else
        location.href = "changePassword.html";

}

function change_pw() {

    let old_pw = document.getElementById("old_pw");
    let new_pw = document.getElementById("new_pw");

    if ( old_pw.value === "" || new_pw.value === "" ) {
        alert("입력값이 없습니다.");
        return false;
    }
    else if ( old_pw.value === sessionStorage.getItem("PW") ) {
        let id = sessionStorage.getItem("ID");
        let name = sessionStorage.getItem("NAME");

        for ( let i = 0 ; i < users.length ; i++ ) {
            if ( id === users[i][0] && name === users[i][2] ) {
                users[i][1] = new_pw.value;
                sessionStorage.setItem("users_changed", JSON.stringify(users));
                return true;
            }
        }
        alert("세션 스토리지(로그인 정보) 오류");
        return false;
    } else {
        alert("기존 비밀번호가 일치하지 않습니다.\n다시 입력해주세요.");
        old_pw.value = "";
        new_pw.value = "";
        return false;
    }

}

function unlock_input() {
    let input_pw = document.getElementById("input_pw");
    let old_pw = sessionStorage.getItem("PW");

    let new_name = document.getElementById("new_name");
    let new_tel = document.getElementById("new_tel");

    if ( input_pw.value === old_pw ) {
        input_pw.disabled = true;
        new_name.disabled = false;
        new_tel.disabled = false;
        new_name.focus();
    } else {
        alert("비밀번호가 일치하지 않습니다.")
        input_pw.value = "";
    }

}

function change_info() {

    let old_name = sessionStorage.getItem("NAME");
    let new_name = document.getElementById("new_name");
    let old_tel = sessionStorage.getItem("TEL");
    let new_tel = document.getElementById("new_tel");

    if ( new_name.value === "" || new_tel.value === "" ) {
        alert("입력값이 없습니다.");
        return false;
    } else {
        for ( let i = 0 ; i < users.length ; i++ ) {
            if ( old_name === users[i][2] && old_tel === users[i][3] ) {
                users[i][2] = new_name.value;
                users[i][3] = new_tel.value;
                sessionStorage.setItem("users_changed", JSON.stringify(users));
                return true
            }
        }
    }

}