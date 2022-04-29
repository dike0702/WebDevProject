var stars = document.getElementsByClassName("star");
var clicked = false;
var reviewScore = 0;

for (let i = 0; i < stars.length; i++){
    clicked = true;
    for (let j = 0; j <= i; j++) {
        stars[j].style.color = "orange";
        // レビューのスコアをSQLに渡したい
        // userID = req.session.user.userID;
        // updateRate(userID, reviewScore);
        // const average = getRate(userID);
        // var elem = document.getElementById("starCount");
        // elem.innerHTML = average + " out of 5";
    }
    for (let j = i + 1; j < stars.length; j++) {
        stars[j].style.color = "gray";
    }
}
form.addEventListener()