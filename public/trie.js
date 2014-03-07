Trie = function(){
  this.characters = {};
};

Trie.prototype.learn = function(word, i){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.
  i = i || 0;
  var char = word[i];
  if (this.characters[char]) {
    this.characters[char].learn(word, i+1);
  } else {
    if (i === word.length) {
      this.isWord = true;
    } else {
      this.characters[char] = new Trie();
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

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
  words = words || [];
  currentWord = currentWord || "";
  // _.each(this.characters, function(char){
  // this.characters.forEach(function(char){
  for (var char in this.characters) {
    // console.log("at line 43 char is " + char);
    currentWord += char;
    if (this.characters[char].isWord) {
      words.push(currentWord);
    }
    // console.log("char.characters = "+char.characters);
    // console.log("this = " + this);
    // console.log("char = " + char);
    if (this.characters[char].characters) {
      this.characters[char].getWords(words, currentWord);
    } else {
      currentWord = "";
    }
  // });
  };
  return words;
};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.

  // Be sure to consider what happens if the word is not in this Trie.
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
};