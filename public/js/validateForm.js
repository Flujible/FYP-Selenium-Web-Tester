function validateForm() {

    $('p.error').remove();

    // Validate name
    let failed = false;
    let name = $("#name").val();
    if (name === "" || name === null) {
      $("div#nameRow").append("<p class='error'>Name field empty</p>");
      failed = true;
    }

    // Validate email
    let email = $("#email").val();
    if (email === ""  || email === null) {
      $("div#emailRow").append("<p class='error'>Email field empty</p>");
      failed = true;
    }

    // Validate msg
    let msg = $("#message").val();
    if (msg === ""  || msg === null) {
      $("div#messageRow").append("<p class='error'>Message field empty</p>");
      failed = true;
    }

    return !failed;
}
