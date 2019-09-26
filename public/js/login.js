$(document).ready(function() {

  $("#loginBtn").on("click", function(e) {
    e.preventDefault();
    const userInfo = {
      username: $("#user_name").val().trim(),
      password: $("#user_pass").val().trim()
    };
    $.ajax({
      url: "/login",
      method: "POST",
      data: userInfo
    })
      .then((userInfo) => {
        location.replace(userInfo);
      })
      .catch(err => console.log(err));
  });
});