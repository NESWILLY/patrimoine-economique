export default class Patrimoine {
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = [...possessions]; // [Possession, Possession, ...]
  }
  getValeur(date) {
    let result = 0;
    for (const item of this.possessions) {
      result += item.getValeur(date);
    }
    return result;
  }
  addPossession(possession) {
    const possessionExiste = this.possessions.find(p => p.libelle === possession.libelle);
    if (possessionExiste) {
      console.log(`La possession "${possession.libelle}" existe déjà.`);
    } else if (possession.possesseur !== this.possesseur) {
      console.log(`${possession.libelle} n'appartient pas à ${this.possesseur}`);
    } else {
      this.possessions.push(possession);
    }
  }

  removePossession(possession) {
    const possessionsAvant = this.possessions.length;
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
    if (this.possessions.length === possessionsAvant) {
      console.log(`La possession "${possession.libelle}" n'existe pas.`);
    }
  }
}
