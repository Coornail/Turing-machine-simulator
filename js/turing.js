/**
 * 
 */
var TuringMachine = TuringMachine || {
  /* Variables */
  'position' : 1, // Position of the reading head, internal, don't modify
  'state': 'q0', // current state
  'word' : '>aB', // current word
  'rules': [],    // set of rules, use addRule()!
  'states': [], 
  'halt': false, // error in the machine
};


/**
 * Sets the currently reading word
 * Use only for initialization, or be careful!
 */
TuringMachine.setWord = function(word) {
  this.word = word;
  return word;
}

/**
 * @return current word
 */
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


/**
 * Executes a turing machine step
 * It is possible that after the step, the machine got into a final or error state. The caller must check.
 */
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

