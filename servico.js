module.exports = class ServicoCalculoFatura {
    constructor(repo) {
      this.repo = repo;
    }
    calcularTotalApresentação(apre) {
      let total = 0;
      switch (this.repo.getPeca(apre).tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
           total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
          throw new Error(`Peça desconhecida: ${this.repo.getPeca(apre).tipo}`);
      }
      return total;
    }
    
    calcularCredito(apre) {
      let creditos = 0;
      creditos += Math.max(apre.audiencia - 30, 0);
      if (this.repo.getPeca(apre).tipo === "comedia") 
         creditos += Math.floor(apre.audiencia / 5);
      return creditos;
    }
    
    calcularTotalCreditos(apresentacoes) {
      let creditos = 0;
      for (let apre of apresentacoes) {
        creditos += this.calcularCredito(apre);
      }
      return creditos;
    }
    
    calcularTotalFatura(apresentacoes) {
      let totalFatura = 0;
      for (let apre of apresentacoes) {
        totalFatura += this.calcularTotalApresentação(apre);
      }
      return totalFatura;
    }
  }