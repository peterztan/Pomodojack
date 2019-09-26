$(document).ready(function () {

    $("#registerBtn").on("click", function (e) {
      e.preventDefault();
  
      const userInfo = {
        id: $("#user_id").val().trim(),
        username: $("#user_name").val().trim(),
        password: $("#user_passw").val().trim()
      };
  
      console.log(userInfo);
  
  
      $.ajax({
        url: '/register',
        method: 'POST',
        data: userInfo
      })
        .then((userInfo) => {
          console.log(userInfo);
          location.replace(userInfo)
        })
        .catch(err => console.log(err));
    });
  });