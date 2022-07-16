/// projeto

/// declaração de variaveis ///

const rAltura = document.getElementById("rAltura") as HTMLInputElement;
const rComprimento = document.getElementById("rComprimento") as HTMLInputElement;
const rLargura = document.getElementById("rLargura") as HTMLInputElement;


const TempStart = document.getElementById("tempinit") as HTMLInputElement;
const TempEnd = document.getElementById("tempend") as HTMLInputElement;

const calcular = document.getElementById("calcular") as HTMLButtonElement;

const resultado = document.getElementById("resultado") as HTMLElement;
const select  = document.getElementById("select") as HTMLSelectElement;


//calculando valor volumetrico retangulo

calcular.addEventListener("click", () => {
  try {
    const comprimento = Number(rComprimento.value);
    const largura = Number(rLargura.value);
    const altura = Number(rAltura.value);
    const temperaturaInicial = Number(TempStart.value);
    const temperaturaFinal = Number(TempEnd.value);
    const materialid = Number(select.value);
     
    const material : number = materias[materialid].coeficiente;

     
    if (isNaN(comprimento) == true || !comprimento) {
      throw new TypeError("não são aceitos valos do tipo String");
    }

    if (isNaN(largura) == true || !largura) {
      throw new TypeError("não são aceitos valos do tipo String");
    }

    if (isNaN(altura) == true || !altura) {
      throw new TypeError("não são aceitos valos do tipo String");
    }

    if (isNaN(temperaturaInicial) == true || !temperaturaInicial) {
      throw new TypeError("não são aceitos valos do tipo String");
    }

    if (isNaN(temperaturaFinal) == true || !temperaturaFinal) {
      throw new TypeError("não são aceitos valos do tipo String");
    }

    if (comprimento <= 0 || largura <= 0 || altura <= 0) {
      throw new TypeError("não são aceitos valos negativos");
    }
    

    const areaRetangulo : number = calculoAreRetangulo(comprimento, largura, altura);

    const volumeInicial = areaRetangulo


    const dilacao = calculandoDilacao(
      volumeInicial,
      temperaturaInicial,
      temperaturaFinal,
      material
    );
    

    return resultado.innerHTML = `
    <p> A dilatação volumétrica do cubo será de ${dilacao?.toFixed(2)} mc³ </p>
    <p>
      <strong>ΔV</strong> = V0.γ.Δθ<br>
      <strong>ΔV</strong> = ${volumeInicial}.${material}.10^-6.${temperaturaInicial - temperaturaFinal}<br>
      <strong>ΔV</strong> = ${volumeInicial}.10^-6<br>
      <strong>ΔV</strong> = ${dilacao?.toFixed(2)} mc³<br>
    </p>
     <p>O resultado é: </p>
      <h1 class="resulh1">${dilacao?.toFixed(2)} mc³</h1>
    `;

  } catch (error: unknown) {
    if (error instanceof TypeError) {
      error.stack;
      return resultado.innerHTML = `<p> ${error.message} </p>`
    }
  }

});
 
//material 
interface IMaterial {
  material : string;
  coeficiente : number;
}

const materias : IMaterial[] = [
  {
    material: "Aço",
    coeficiente: 11,
  },
  {
    material: "aluminio",
    coeficiente: 22,
  },
  {
    material: "cobre",
    coeficiente: 17,
  },
  {
    material: "Concreto",
    coeficiente: 12,
  },
  {
    material: "Ouro",
    coeficiente: 15,
  }

]

//calculo de aréa do retangulo
function calculoAreRetangulo(
  comprimento: number,
  largura: number,
  altura: number
) {
  return comprimento * largura * altura;
}

//calcullando dilação de um corpo
function calculandoDilacao(
  volumeInicial: number,
  temperaturaInicial: number,
  temperaturaFinal: number,
  material: number
) {
  try {
    let variçãotemperatura: number = temperaturaInicial - temperaturaFinal;
    let deltaVolume: number = volumeInicial * material * variçãotemperatura;
    let exponencial: number = Math.pow(10, -6);
    let resultado: number = deltaVolume * exponencial;
    return resultado;
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      error.stack;
      throw error.message;
    }
  }
}

/*
ΔV = V0.γ.Δθ
ΔV = 1000.15.10-6.30
ΔV = 1000.15.30.10-6
ΔV = 450000.10-6
ΔV = 0,45cm3 
*/
