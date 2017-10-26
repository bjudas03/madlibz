console.log("main js linked");


  $('#edit-button').on('click', function(e) {
  	console.log("I'm in the button");
    e.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();

    $.ajax({
      url: url,
      method: 'PUT',
      data: data
    }).done(function(data) {
    	console.log(data, "--------------------------");
      window.location.href = '/madlibs/:id';
    });
  });


  $('.delete-btn').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');

    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function() {
      window.location.href = '/profile';
    });
  });

// function createInput() {
//    var createInput = document.createElement("INPUT");
//       createInput.setAttribute("type", "text");
//       createInput.setAttribute("placeholder", textBox);
//       newInput = "newInput"+id
//       createInput.setAttribute("id",newInput);
//       console.log(newInput);
//       document.getElementById('input-form').appendChild(createInput);
// }

function createButton() {
  var btn = document.createElement("button");
    var t = document.createTextNode("Submit");
    document.getElementById('madlib-input-form').appendChild(btn);
    btn.setAttribute("id", "submit");
    btn.appendChild(t);
    document.getElementById('submit').setAttribute("type", "submit");
    document.getElementById('submit').setAttribute("onClick", "submit");
}

function createFormInputs() {
  console.log("I'm in main.js")
    for (i = 0; i<10; i++) {
      var x = text.indexOf("<");
      var y = text.indexOf(">")
      var textBox = text.slice(x,y+1);
      var createInput = document.createElement("INPUT");
      createInput.setAttribute("type", "text");
      createInput.setAttribute("placeholder", textBox);
      newInput = "newInput"+id
      createInput.setAttribute("id",newInput);
      document.getElementById('madlib-input-form').appendChild(createInput);
      newText = text.replace(textBox, newInput);
      text = newText;
      id++
    };
    createButton();
  };

  function replaceText() {
    id = 0;
    newInput = 'newInput'
    for (i=0; i<10; i++) {
      newInput = "newInput" + id
      console.log("newInput is: " +newInput);
      console.log("id is :" + id);
      // console.log("newInput0.value is " +newInput0.value);
      // console.log("newInput"+id);
      // console.log(newInput + "*********");
      let repText = document.getElementById(newInput).value;
      console.log(repText);
      text = text.replace(newInput, repText);
      console.log(text);
      id++;
   }
 };