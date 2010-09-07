/**
 * User interface for the turing machine
 */

$(document).ready(function() {
  bindActions();
  drawRules();
  drawWord();
  drawState();
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
    drawState();
  });

  // Export rules button
  $('#export-rules').click(function() {
    var serialized_rules = JSON.stringify(TuringMachine.rules);
    var json_text = $('<textarea id="export-dialog" cols="100" rows="5">'+ serialized_rules  +'</textarea>');
    json_text.dialog({
      title: 'Rules | Copy and save them',
      modal: true,
      minWidth: 960,
    });
    $('#export-dialog').select();
  });

  // Import rules button
  $('#import-rules').click(function() {
    var form = $('<form><textarea name="import-rules-text" id="import-rules-text" cols="100" rows="5" /></form>');
    form.dialog({
      title: 'Rules | Paste the serialized rules',
      modal: true,
      minWidth: 960,
      buttons: {
        'Import': function() {
          TuringMachine.rules = JSON.parse($('#import-rules-text').val());
          drawRules();
          $(this).dialog("close");
        }
      }
    });
  });

  // Word change
  $('#steps').click(function() {
    var wordform = '<form><input type="textfield" value="'+ TuringMachine.word +'" id="word-change" /></form>';
    $('#steps').html('');
    $('#steps').after(wordform);
    $('#word-change').focus();
    $('#word-change').select();

    $('#word-change').keypress(function(event) {
      if (event.keyCode == '13') {
        event.preventDefault();
        TuringMachine.word = $('#word-change').val();
        TuringMachine.reset();
        drawWord();
        drawState();
        $('#word-change').remove();
      }
    });
  });
}


/**
 * Write rules to the #rules div
 */
function drawRules() {
  // clear table
  var table = $('<table><thead><tr><th>Current state</th><th>Tape symbol</th><th>Result state</th><th>Print symbol</th><th>Tape-motion</th></tr></thead><tbody/></table>');
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


/**
 * Draw the state in #state div
 */
function drawState() {
  var state = TuringMachine.state;
  $('#state').html('<strong>State:</strong> '+ state);
}

