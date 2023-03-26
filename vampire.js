class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numOfVampires ++;
    }

    return numOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
      return false;
    }

    return true;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisVampNum = this.numberOfVampiresFromOriginal;
    let otherVampNum = vampire.numberOfVampiresFromOriginal;
    let thisVamp = this;
    let otherVamp = vampire;

    while (thisVampNum > otherVampNum) { // moves "up" (by decreasing number) and making current Vampire its creator until same level is reached
      thisVamp = thisVamp.creator;
      thisVampNum --;
    }

    while (thisVampNum < otherVampNum) { // moves "up" (by decreasing number) and making other Vampire its creator until same level is reached
      otherVamp = otherVamp.creator;
      otherVampNum --;
    }

    while (thisVamp !== otherVamp) { // once numbers are the same, each vampire becomes their creators until the names are the same
      thisVamp = thisVamp.creator;
      otherVamp = otherVamp.creator;
    }

    return thisVamp; // once they are the same, return either Vamp
  }
}

module.exports = Vampire;

