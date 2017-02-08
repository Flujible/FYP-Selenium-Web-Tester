$(document).ready(function(){
  if($('table#showResults').length) {
    $.ajax({
      type: "GET",
      url: "/api/results/" + $('table#showResults').data("testid"),
      dataType: "json",
      success: function (data) {
        $("table#showResults").append([
          '<tr>',
            '<td>',
              data.guid,
            '</td>',
            '<td>',
            '<pre>Assertions successful: ', JSON.stringify(data.data[0].testcase[0].$.assertions, null, 4), '</pre>',
              '<pre>Skipped: ', JSON.stringify(data.data[0].$.skipped, null, 4), '</pre>',
              '<pre>Errors: ', JSON.stringify(data.data[0].$.errors, null, 4), '</pre>',
              '<pre>Failures: ', JSON.stringify(data.data[0].$.failures, null, 4), '</pre>',
              '<pre>Time to execute: ', JSON.stringify(data.data[0].$.time, null, 4), '</pre>',
              '<pre>Time executed: ', JSON.stringify(data.data[0].$.timestamp, null, 4), '</pre>',
            '</td>',
          '</tr>',
        ].join(''));
      },
      error: console.error.bind(console)
    });
  }
});
