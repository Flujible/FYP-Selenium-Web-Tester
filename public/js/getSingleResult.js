$(document).ready(function(){
  if($('div#testResults').length) {
    $.ajax({
      type: "GET",
      url: "/api/results/" + $('div#testResults').data("testid"),
      dataType: "json",
      success: function (data) {
        $("div#testResults").append([
          '<pre>Assertions successful: ', data.data[0].testcase[0].$.assertions - 1, '</pre>',
          '<pre>Test cases skipped: ', data.data[0].$.skipped, '</pre>',
          '<pre>Test Failures: ', data.data[0].$.failures, '</pre>',
          '<pre>System errors: ', data.data[0].$.errors, '</pre>',
          '<pre>Time to run: ', data.data[0].$.time, ' seconds</pre>',
          '<pre>Time executed: ', data.data[0].$.timestamp, '</pre>',
        ].join(''));
      },
      error: console.error.bind(console)
    });
  }
});

$(document).ready(function(){
  if($('div#errorPageContainer').length) {
    $.ajax({
      type: "GET",
      url: "/api/results/" + $('div#errorPageContainer').data("testid"),
      dataType: "json",
      success: function (data) {
        if(data.data[0].$.errors > 0) {
          error = data.data[0]["system-err"][0].split("\n");
          $("div#errorPageContainer").append([
            '<div class="container">',
            '<h3>Errors</h3>',
            `<pre> ${error[1]} </pre>`,
            '</div>'
          ].join(""));
        }
        if(data.data[0].$.failures > 0) {
          $("div#errorPageContainer").append([
            '<div class="container">',
            '<h3>Errors</h3>',
            `<pre> Failed when ${data.data[0].testcase[0].failure[0].$.message} </pre>`,
            '</div>'
          ].join(""));
        }
      },
      error: console.error.bind(console)
    });
  }
});

$(document).ready(function(){
  if($('div#testSteps').length) {
    $.ajax({
      type: "GET",
      url: "/api/results/" + $('div#testResults').data("testid"),
      dataType: "json",
      success: function (data) {
        steps = JSON.parse(data.steps);
        $("div#testSteps").append([
          '<table id="resultSteps" class="table table-bordered table-striped">',
            '<thead>',
              '<th>ID or Class</th>',
              '<th>Element Identifier</th>',
              '<th>Action</th>',
              '<th>Value</th>',
            '</thead>',
            '<tbody>',
          ].join(''));
          if(steps.length > 1) {
            for (let i = 0; i < steps.length; i++) {
              $("table#resultSteps").append([
                  '<tr>',
                    '<td>',
                      steps[i].id,
                    '</td>',
                    '<td>',
                      steps[i].element,
                    '</td>',
                    '<td>',
                      steps[i].action,
                    '<td>',
                      steps[i].value,
                    '</td>',
                  '</tr>',
              ].join(''));
            }
          } else {
            $("table#resultSteps").append([
                '<tr>',
                  '<td>',
                    steps.id,
                  '</td>',
                  '<td>',
                    steps.element,
                  '</td>',
                  '<td>',
                    steps.action,
                  '<td>',
                    steps.value,
                  '</td>',
                '</tr>',
            ].join(''));
          }
          $("table#resultSteps").append('</tbody></table>');
      },
      error: console.error.bind(console)
    });
  }
});
