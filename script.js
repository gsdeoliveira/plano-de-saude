function calculaIMC(altura, peso) {
  return (peso / (altura ** 2)).toFixed(2)
}

function calculaFatorComorbidade(imc) {
  if(imc < 18.5) return 10
  if(18.5 < imc && imc <= 24.9) return 1
  if(25 < imc && imc < 29.9) return 6
  if(30 < imc && imc < 34.9) return 10
  if(35 < imc && imc < 39.9) return 20
  if(imc > 40) return 30
}

function calculaPlanoA(idade, imc) {
  const basico = Number((100 + (idade * 10 * (imc / 10))).toFixed(2))
  const standard = Number(((150 + (idade * 15)) * (imc / 10)).toFixed(2))
  const premium = Number(((200 - (imc * 10) + (idade * 20)) * (imc / 10)).toFixed(2))
  return [basico, standard, premium]
}

function calculaPlanoB(comorbidade, imc) {
  const basico = Number((100 + (comorbidade * 10 * (imc / 10))).toFixed(2))
  const standard = Number(((150 + (comorbidade * 15)) * (imc / 10)).toFixed(2))
  const premium = Number(((200 - (imc * 10) + (comorbidade * 20)) * (imc / 10)).toFixed(2))
  return [basico, standard, premium]
}

function calculaMelhorPlano() {
  const altura = document.querySelector('#altura').value
  const peso = document.querySelector('#peso').value
  const idade = document.querySelector('#idade').value
  const cardIMC = document.querySelectorAll('.imc')
  const cardAltura = document.querySelectorAll('.altura')
  const cardPeso = document.querySelectorAll('.peso')
  const cardIdade = document.querySelectorAll('.idade')
  const cardPreco = document.querySelectorAll('.preco span')
  const planos = document.querySelectorAll('.plano')
  const tituloUm = document.querySelector('.titulo-um')
  const tituloDois = document.querySelector('.titulo-dois')
  const planosContainer = document.querySelector('.planos-container')

  const imc = calculaIMC(altura, peso)
  const comorbidade = calculaFatorComorbidade(imc)
  const planoA = calculaPlanoA(idade, imc)
  const planoB = calculaPlanoB(comorbidade, imc)

  const menorValorA = [...planoA].sort((a, b) => a - b)[0]
  const menorValorB = [...planoB].sort((a, b) => a - b)[0]
  const melhorPlano = menorValorA <= menorValorB ? 'A' : 'B'

  if(idade && altura && peso) {
    planosContainer.style.display = 'flex'
    planosContainer.scrollIntoView({ behavior: 'smooth' });
  }

  planos.forEach((plano) => {
    plano.setAttribute('data-melhor-plano', '')
  })

  cardIMC.forEach((card) => {
    card.innerHTML = imc
  })
  
  cardAltura.forEach((card) => {
    card.innerHTML = altura
  })
  
  cardPeso.forEach((card) => {
    card.innerHTML = peso
  })
  
  cardIdade.forEach((card) => {
    card.innerHTML = idade
  })
  
  cardPreco.forEach((card, index) => {
    card.innerHTML = planoA.concat(planoB)[index]
  })

  if(melhorPlano === 'A') {
    let index = -1

    planosContainer.style.flexDirection = 'column'
    tituloDois.innerHTML = 'Veja também: Plano B'

    for (let i = 0; i < planoA.length; i++) {
      if (planoA[i] === menorValorA) {
        index = i; 
        break;
      }
    }

    switch (index) {
      case 0:
        tituloUm.innerHTML = 'Seu melhor plano: A - Básico'
        break;
      case 1:
        tituloUm.innerHTML = 'Seu melhor plano: A - Standard'
        break;
      case 2:
        tituloUm.innerHTML = 'Seu melhor plano: A - Premium'
        break;
    }

    planos.forEach((plano, i) => {
      if(i === index) {
        plano.setAttribute('data-melhor-plano', 'true')
      }
    })
  }

  if(melhorPlano === 'B') {
    planosContainer.style.flexDirection = 'column-reverse'
    let index = -1

    tituloUm.innerHTML = 'Veja também: Plano A'
    
    for (let i = 0; i < planoB.length; i++) {
      if (planoB[i] === menorValorB) {
        index = i + 3; 
        break;
      }
    }
    
    switch (index) {
      case 3:
        tituloDois.innerHTML = 'Seu melhor plano: B - Básico'
        break;
      case 4:
        tituloDois.innerHTML = 'Seu melhor plano: B - Standard'
        break;
      case 5:
        tituloDois.innerHTML = 'Seu melhor plano: B - Premium'
        break;
    }
          
    planos.forEach((plano, i) => {
      if(i === index) {
        plano.setAttribute('data-melhor-plano', 'true')
      }
    })
  }
}
