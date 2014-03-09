Trie = function(){
  this.characters = {};
};

Trie.prototype.learn = function(word, i){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.
  i = i || 0;
  var char = word[i];
  // if the next letter is already known, start over from there
  if (this.characters[char]) {
    this.characters[char].learn(word, i+1);
  } else {
    // if the next letter is not known, either...
    // ...it's the end of the word...
    if (i === word.length) {
        // ... and we just set isWord and stop recursion...
      this.isWord = true;
    } else {
    // ... or it's jut not created, so we create it...
      this.characters[char] = new Trie();
      // ... and start over from there
      this.characters[char].learn(word, i+1);
    }
  }
  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.
};

Trie.prototype.getWords = function(words, currentWord) {
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
  words = words || [];
  currentWord = currentWord || "";
  if (this.isWord) {
    words.push(currentWord);
  }
  for (var char in this.characters) {
    var newWord = currentWord + char;
    // if (this.characters[char].characters) {
      this.characters[char].getWords(words, newWord);
    // }
  }
  return words;
};

var tree = new Trie();
tree.learn("hi");
tree.learn("he");
tree.learn("hello");
tree.learn("awesome");
tree.learn("falcon");
tree.learn("rancor");
tree.learn("skywalker");

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.
  
  index = index || 0;
  var char = word[index];

  if (this.characters[char]) {
  return this.characters[char].find(word,index+1);
  } else if (index === word.length) {
    return this;
  } else { return false; }

  // Be sure to consider what happens if the word is not in this Trie.
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
  prefix = prefix.toLowerCase();
  var node = this.find(prefix);
  if (!node) {return [];}
  var tester = node.getWords([],prefix);
  console.log(node);
  console.log(tester);
  return node.getWords([],prefix);
};


