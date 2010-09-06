$(document).ready(function() {
  bindActions();

  drawRules();
  drawWord();
});


/**
 * Bind events to actions
 */
function bindActions() {
  // Form submit handler for adding rules
  $('#add-rule').submit(function() {
    // Saving rule
    rule = {
      'read_state' : $('input[name=rule_read_state]').val(),
      'read_char' : $('input[name=rule_read_char]').val(),
      'write_state': $('input[name=rule_write_state]').val(),
      'write_char': $('input[name=rule_write_char]').val(),
      'direction' : $('select[name=rule_direction]').val(),
    };
    TuringMachine.addRule(rule);

    //refresh rules
    drawRules();
    return false;
  });

  // Execute step
  $('#step').click(function() {
    TuringMachine.step();
    drawWord();
  });
}


/**
 * Write rules to the #rules div
 */
function drawRules() {
  // clear table
  var table = $('<table><thead><tr><th>Input state</th><th>Input char</th><th>Output state</th><th>Output char</th><th>Direction</th></tr></thead><tbody/></table>');
  for (var index in TuringMachine.rules) {
    rule = TuringMachine.rules[index];
    var row = $('<tr><td>'+ rule.read_state +'</td><td>'+ rule.read_char +'</td><td>'+ rule.write_state +'</td><td>'+ rule.write_char +'</td><td>'+ rule.direction +'</td></tr>');
    table.find('thead').append(row);
  }
  $('#display-rules').html(table);
}


/**
 * Draw the word in the #steps div
 */
function drawWord() {
  var word = TuringMachine.word.substr(0, TuringMachine.position) +'<strong id="current_char">'+ TuringMachine.word[TuringMachine.position] +'</strong>'+ TuringMachine.word.substr(TuringMachine.position + 1, TuringMachine.word.length);
  $('#steps').html(word);
}

