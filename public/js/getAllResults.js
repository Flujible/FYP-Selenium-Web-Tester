let compare = (a, b) => {
  if (a.timestamp < b.timestamp)
    return 1;
  if (a.timestamp > b.timestamp)
    return -1;
  return 0;
};


let updateTable = () => {
  $(document).ready(function() {
    if ($("table#indexResults").length) {
      $.ajax({
        type: "GET",
        url: "/api/results",
        dataType: "json",
        success: function (data) {
          data = data.sort(compare);
          let str = "";
          data.forEach(test => {
            let status;
            if (test.status === 'pending') {
              status = '<div class=loader>Loading...</div>';
            } else {
              status = test.status;
            }
            str += ([
              '</tr>',
              '<td class="key">',
              `<a href = /results/${test.key}>`,test.key,'</a>',
              '</td>',
              '<td class="status">',
              status,
              '</td>',
              '</tr>',
            ].join(''));
          });
          $("table#indexResults").html('<tr><th>Test ID</th><th>Result</th><tr>' + str);
        }
      });
    }
  });
};

updateTable();
setInterval(updateTable, 1000);
