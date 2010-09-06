/**
 * 
 */
var TuringMachine = TuringMachine || {
  /* Variables */
  'position' : 1,
  'state': 'q0',
  'word' : '>aB',
  'rules': [],
  'states': [],
  'halt': false, // error in the machine
};

TuringMachine.setWord = function(word) {
  this.word = word;
  return word;
}

TuringMachine.getWord = function() {
  return this.word;
};

/**
 * Adds a rule to the ruleset.
 *
 * The prototype of the rule:
 * {
 *   'read_state' : A state object (mostly char),
 *   'read_char' : The character that's under the head,
 *   'write_state': A state object (mostly char),
 *   'write_char': A character that's going to be written by the head,
 *   'direction' : One of the following: 'left', 'right', 'stay'
 * }
 */
TuringMachine.addRule = function(rule) {
  this.rules.push(rule);
};

TuringMachine.step = function() {
  var read_char = this.word[this.position];
  rule = TuringMachine.findRule(this.state, read_char);
  
  /** Executing rule **/
  if (rule) {
    // @todo make it nicer
    var word = this.word.substr(0, this.position) + rule.write_char + this.word.substr(this.position + 1, this.word.length);
    this.word = word;
  } else {
    TuringMachine.halt = true;
  }
};

/**
 * Finds the first rule object for a state and a char
 * If there is no such rule, it returns false
 */
TuringMachine.findRule = function(state, read_char) {
  for (var index in this.rules) {
    rule = this.rules[index];
    if (rule.read_state == state && rule.read_char == read_char) {
      return rule;
    }
  }

  return false;
};

console.log(TuringMachine.getWord());


TuringMachine.addRule({
  'read_state' : 'q0',
  'read_char' : 'a',
  'write_state' : 'q',
  'write_char' : 'b',
  'direction' : 'stay',
});

console.log(TuringMachine.getWord());
TuringMachine.step();
console.log(TuringMachine.getWord());
