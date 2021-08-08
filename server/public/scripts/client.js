$(document).ready(onReady);

function onReady() {
  $(document).on('click','#clear', checkIfFieldHasValue);
  $(document).on('click', '#delete-all', deleteAll);
  $(document).on('click', '#delete', deleteIndividualRecord);
  // $(document).on('click', '#run-again', showPreviousCalc);
  getResults();
}

/**
 * Check If Field Has Value
 * Simply checks if our input field has a value
 */
function checkIfFieldHasValue() {
  if($('#input1').val()) {
    bundle();
  } else {
    $('#alert-container').hide().prepend(`
    <div class="error alert alert-danger alert-dismissible fade show">
      <em>Please input an equation</em>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `).fadeIn();
  }
}

/**
 * Bundle
 * Preps and sends our data to the server
 */
function bundle() {
  let val = $("#input1").val();
  let val2 = $("#input1").val();

  var currentDate = new Date()
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  let newDate = day + "/" + month + "/" + year;

  $.ajax({
    method: 'POST',
    url: '/todo',
    data: {
      val: val, 
      val2: false,
      val3: val2,
      val4: newDate,
      val5: newDate
    }

    // ("todo", "completed", "notes", "completed_date", "date_added")
  }).then((response) => {
    console.log('POST /bundle', response);
  }).catch((error) => {
    console.log('failed', error);
    $('#alert-container').prepend(`
      <div class="error alert alert-danger alert-dismissible fade show">
        <em>Error: incorrect input value</em>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `);
  });
  $('#input1').val('');
  $('#input2').val('');
  getResults(); 
}

/**
 * Get Results
 * Returns the Calculated Data back from the server
 */
function getResults() {
  console.log('got here');
  $.ajax({
    type: 'GET',
    url: '/todo'
  }).then(function (response) {
    $('#results').empty();
    for (let i = 0; i < response.length; i++) {
        let todo = response[i];
        if(todo.completed) {
          let completed = "completed: " + todo.completed;
        }
        console.log(todo);
        $('#results').append(`
            <div class="card" data-id="${todo.id}" data-value="${todo.todo}">
              <div class="card-header">
                <h5 class="card-title">${todo.todo}</h5>
              </div>
              <div class="card-body">
                <p class="card-text">
                  ${todo.completed}<br/>
                  ${todo.notes}<br/>
                  ${todo.completed_date}<br/>
                  ${todo.date_added}<br/> 
                </p>
              </div>
              <div class="card-footer text-muted">
                <button id="run-again" class="btn btn-warning">COMPLETE</button>
                <button id="delete" class="btn btn-danger">DELETE</button>
              </div>
                <div class="trigger-container">

                </div>
            </div>
        `);
    }
  });
}



/**
 * Delete All
 * Deletes the entire array on the server side
 */
function deleteAll() {
  $.ajax({
    url: '/todo',
    type: 'DELETE',
    success: function(result) {
        // Do something with the result
        $('#result-value').text(0);
        $('#result-equation').text('');
        getResults();
    }
  });
} 

/**
 * Delete Individual Record
 * Sends the id of the record that the user selected to delete.
 */
function deleteIndividualRecord() {
  let id = $(this).parent().parent().data('id');
  console.log('our id', id);
  $.ajax({
    url: `/todo/${id}`,
    type: 'DELETE',
    success: function(result) {
      console.log('got here');
        getResults();
    }
  });
} 
