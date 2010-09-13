/**
 * Author: Kornel Lugosi
 *
 * This is a library implements an abstract turing machine.
 */
var TuringMachine = TuringMachine || {
  'position' : 1, // Position of the reading head, internal, don't modify
  'state': 'q0', // current state
  'word' : '>aaaaaaaaaaaaB', // current word
  'rules': [],    // set of rules, use addRule()!
  'states': [],
  'halt': false, // error in the machine
  'last_executed_rule': -1,
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
 * @todo check for conflicting/stupid rules
 */
TuringMachine.addRule = function(rule) {
  this.rules.push(rule);
};


/**
 * Executes a turing machine step
 * It is possible that after the step, the machine got into a final or error state. The caller must check.
 * @return On successful stepping, it returns the rule, else false
 */
TuringMachine.step = function() {
  var read_char = this.word[this.position];
  rule = TuringMachine.findRule(this.state, read_char);

  /** Executing rule **/
  if (rule) {
    this.saveStep(rule);
    // @todo make it nicer
    var word = this.word.substr(0, this.position) + rule.write_char + this.word.substr(this.position + 1, this.word.length);
    this.word = word;
    this.state = rule.write_state;

    if (rule.direction == 'left') {
      this.position--;
    } else if(rule.direction == 'right') {
      // Add blank
      if (this.position == this.word.length-1) {
        this.word += 'B';
      }
      this.position++;
    }

    return rule;

  }

  TuringMachine.halt = true;
  return false;
};


/**
 * Saves the rules index to last_executed_rule
 */
TuringMachine.saveStep = function(rule) {
  index = this.rules.indexOf(rule);
  this.last_executed_rule = index;
}


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


/**
 * "Rerolls" the machine to a consistent starting state, without changing the input word
 */
TuringMachine.reset = function() {
  this.position = 1;
  this.state = 'q0';
}

