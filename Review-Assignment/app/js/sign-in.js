var toSignIn = function(_dataUser) {

  var signInObject = {};
  var email = "darshana.s465@gmail.com";
  var password = "canguess";
  signInObject.signInContent = function() {
    $.get('/mustache/sign-in.mustache', function(template) {
      var info = Mustache.to_html(template);
      $('.main-content').html(info);
      $(".notify").css("display", 'none');     //to notify user does not exist
      toValidate();
    });
  }

  var toValidate = function() {              //to validate sign-in
    $("form[name = 'login']").validate({
      rules: {
        email: {
          required: true,
          email: true,
          validateEmail: true,
        },
        pass: {
          required: true,
          minlength: 6,
        }
      },
      messages: {
        email: "Please enter a valid email",
        pass: "Please enter a valid password of 6 characters or more",
      },
      submitHandler: function(form) {
        localforage.setItem('loggedIn', 'true', function() {
        });
        if($("#email-id").val() == email && $("#password").val() == password) {
          var stateObject = {content: "about"};
          history.pushState(stateObject, null, "/about");
          $(".notify").css("display", 'none');
          success();
        } else {
          $(".notify").css('display', 'block');
        }
      },
    });

    jQuery.validator.addMethod("validateEmail", function(value, element) {
      var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return (filter.test(value));
    });
  }

  var success = function() {
    var dashboard = new dashboardComponent(_dataUser);
    dashboard.addDashBoard();
    dashboard.addDashBoardHeader();
  }

  signInObject.addHeader = function() {
    $(".login-user").text("");
  }

  return signInObject;
}
