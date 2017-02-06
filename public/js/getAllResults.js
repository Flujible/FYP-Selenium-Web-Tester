$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "api/results",
    dataType: "json",
    success: function (data) {
      data.forEach(test => {
        $("table#indexResults").append([
          '<tr>',
            '<td>',
            `<a href = /results/${test.key}>`,test.key,
            '</td>',
            '<td>',
              test.status,
            '</td>',
          '</tr>',
      ].join(''));
    });
    }
  });
});
