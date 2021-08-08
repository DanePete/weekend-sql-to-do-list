$(document).ready(onReady);

let inputString = '';
let inputArray = [];
let counter = 1; // This will be the amount to change by
let count = 10;   // This will be the current count at any given time
let countInterval = null;

function onReady() {
  $(document).on('click','#clear', bundle);
  $(document).on('click', '#key', createInput);
  $(document).on('click', '#equals', checkIfFieldHasValue);
  $(document).on('click', '#delete-all', deleteAll);
  $(document).on('click', '#delete', deleteIndividualRecord);
  // $(document).on('click', '#run-again', showPreviousCalc);

  getResults();
}

/**
 * Create Input
 * This function captures the users inputs and assigns them to a string
 */
function createInput() {
  inputString += $(this).data('key');
  inputArray.push($(this).data('key'));
  $("#input1").val(inputString);
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
  inputString = ''; // Sets our input string back to empty
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
    $('#results').find('tbody').empty();
    for (let i = 0; i < response.length; i++) {
        let todo = response[i];
        console.log(todo);
        $('#results tbody').append(`
            <tr data-id="${todo.id}" data-value="${todo.todo}">
                <td>${todo.todo}</td>
                <td>${todo.completed}</td>
                <td>${todo.notes}</td>
                <td>${todo.completed_date}</td>
                <td>${todo.date_added}</td>
                <td><button id="run-again" class="btn btn-warning">RUN AGAIN</button></td>
                <td><button id="delete" class="btn btn-danger">DELETE</button></td>
            </tr>
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
  let id = $(this).closest('tr').data('id');
  $.ajax({
    url: `/todo/${id}`,
    type: 'DELETE',
    success: function(result) {
      console.log('got here');
        getResults();
    }
  });
} 

/**
 * Clear Input
 * Clears the input..
 */
function clearInput() {
  inputString = '';
  $('#input1').val('');
}

/**
 * Convert calc value to string and add thousand markers
 * This function was yanked from the web.
 */
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

