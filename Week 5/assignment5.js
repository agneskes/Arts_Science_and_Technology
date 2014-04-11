// Declare the form global for easy event listening access.
var form;
// Add a form to the DOM.
$(document).ready(function() {
  // Create the form.
  form = $('<form />', { action : 'save', method : 'POST' });

  // Create a div to hold the description.
  var description = $('<div />', { text : 'Save this' });

  // Create a field into which users can enter a name.
  var name = $('<input />', { name : 'name', placeholder: 'Name', type: 'text'
      });

  // Create a select from which the group can be chosen.
  var group = $('<select />', { name : "group" });
  for (var val in data.groups) {
      $('<option />', { value : val, text : data.groups[val] }).appendTo(group
          );
  };
  // Create a checkbox for all existing nodes so connections can be indicated.
  var check = $('<div />');
  for (var val in data.nodes) {
    $('<label />', { text : data.nodes[val].name }).appendTo(check);
    $('<input />', { type : 'checkbox', name : "relation", value : val }).
        appendTo(check);
    $('</br>').appendTo(check);
  };
  // Create the save button.
  var save = $('<input />', { type : 'submit', value : 'Save' });
  
  // Append all elements to the form, and inject the complete form into the
      DOM.
  form.append(description, name, group, check, save);
  $('body').append(form);
});

// Event listener for the form submit event.
$(function() {
  form.on('submit', function(e) {
    e.preventDefault();
    // Extract the data from the form.
    var formArray = $('form').serializeArray();

    // Create the new node based on the knowledge of the form array and add it
        to the data.
    var newNode = { "id" : data.nodes.length, "group" : formArray[1].value,
        "name" : formArray[0].value };
    data.nodes.push(newNode);

    // Remove the first two elements form the array, since those are no longer
        needed
    formArray.splice(0, 2);

    // Now iterate over the array, create the specified links, and add them to
        the data.
    for (var val in formArray) {
      var newLink = { "source" : newNode, "target" : data.nodes[parseInt
          (formArray[val].value)] };
      data.links.push(newLink);
    }
    // Update the FireBase data and on success rerender the SVG.
    FB.set(data);
  });
});