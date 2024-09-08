import Possession from "./Possession.js";
export default class BienMateriel extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    
    try {
      this.type = type;
    }
    catch (e) {
      console.error(e);
    }
  }

  getValeur(date) {
    // On peut ajouter des traitements spécifiques ici si nécessaire
    return super.getValeur(date);
  }  
}
