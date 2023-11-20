function calculaIMC(altura, peso) {
  return (peso / (altura ** 2)).toFixed(2)
}

function calculaFatorComorbidade(imc) {
  if(imc < 18.5) return 10
  if(18.5 < imc <= 24.9) return 1
  if(25 < imc < 29.9) return 6
  if(30 < imc < 34.9) return 10
  if(35 < imc < 39.9) return 20
  if(imc > 40) return 30
}

function calculaMelhorPlano() {
}
