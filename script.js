    const gerarNumeroAleatorio = (limite) => {
        return Math.floor(Math.random() * limite)
    }
    
    const gerarCorAleatorio = () => {
        return `rgb(${gerarNumeroAleatorio(254)}, ${gerarNumeroAleatorio(255)}, ${(gerarNumeroAleatorio(255))})`;
    }
     
    const guardarCorStorage = (cor, index) => {
        const colorPalette = {
            [`color-${index}`]: cor
        };
        const corStorage = JSON.parse(localStorage.getItem('colorPalette'));
        localStorage.setItem('colorPalette', JSON.stringify(Object.assign({}, corStorage, colorPalette)));
    }
    
    const buscarCorStorage = (index) => {
        const corRetornar = JSON.parse(localStorage.getItem('colorPalette'));
        return corRetornar[`color-${index}`];
    }
    const buscarBoardSize = () => {
        return JSON.parse(localStorage.getItem('boardSize'));
    }
    
    const resetarCorPixel = () => {
        const tamanho = buscarBoardSize();
        const lista = [];
        for (let index = 0; index < tamanho * tamanho; index += 1) {
            lista.push('white');
        }
        localStorage.setItem('pixelBoard', JSON.stringify(lista));
    }
    
    const guardarPixelBoard = (color, index) => {
        const pixelBoardStorage = JSON.parse(localStorage.getItem('pixelBoard'));
        pixelBoardStorage[index] = color;
        localStorage.setItem('pixelBoard', JSON.stringify(pixelBoardStorage));
    }
    
    const buscarPixelBoard = (index) => {
        const pixellocalStorage = JSON.parse(localStorage.getItem('pixelBoard'));
        return pixellocalStorage[index];
    }
    
    const resetarPixelBoard = () => {
        document.querySelector('#clear-board').addEventListener('click', () => {
            resetarCorPixel();
            Array.from(document.querySelectorAll('.pixel')).forEach((elemento, index) => {
                elemento.style.backgroundColor = buscarPixelBoard(index);
            })
        })
    }
    
    
    const botaoCorAleatorio = () => {
        document.querySelector('#button-random-color').addEventListener('click', () => {
            Array.from(document.querySelectorAll('.color')).forEach((elemento, index) => {
                const color = index === 0 ? buscarCorStorage(index) : gerarCorAleatorio();
                elemento.style.backgroundColor = color;
                guardarCorStorage(color, index);
            })
        })
    }
    
    const corPaletteInicial = () => {
        Array.from(document.querySelectorAll('.color')).forEach((elemento, index) => {
            elemento.style.backgroundColor = buscarCorStorage(index);
        })
    }
    const corPaletteSelecionada = () => {
        return document.querySelector('.selected').style.backgroundColor;
    }
    
    const adicionarSelected = () => {
        document.querySelector('.color').classList.add('selected');
    }
    
    const LimparSelected = () => {
        Array.from(document.querySelectorAll('.color')).forEach((elemento) => {
            elemento.classList.remove('selected');
        })
    };
    
    const selecionarCorPalette = () => {
        Array.from(document.querySelectorAll('.color')).forEach((elemento) => {
            elemento.addEventListener('click', (evento) => {
                LimparSelected();
                evento.target.classList.add('selected');
            })
        })
    }
    //const tamanhoPixelBoard = () => {
     //const tamanho = buscarBoardSize();
    //const tamanhoPixel = document.querySelector('#pixel-board');
    //tamanhoPixel.style.width = `${tamanho * 40}px`;
    //tamanhoPixel.style.heigth = `${tamanho * 40}px`;
    //}
    
    const criarDivPixel = () => {
        const tamanho = buscarBoardSize();
        //tamanhoPixelBoard(tamanho);
        for (let index = 0; index < tamanho * tamanho; index += 1) {
            let criarPixel = document.createElement('div');
            criarPixel.classList = 'pixel';
            criarPixel.style.backgroundColor = buscarPixelBoard(index);
            criarPixel.style.width = '40px';
            criarPixel.style.heigth = '40px';
            document.querySelector('#pixel-board').appendChild(criarPixel);
        }
    }

    const iniciarCorStorage = () => {
        if (!localStorage.getItem('colorPalette')) {
            localStorage.setItem('colorPalette', JSON.stringify({
                "color-0": 'black',
                "color-1": 'rgb(153, 153, 153)',
                "color-2": 'rgb(152, 152, 152)',
                "color-3": 'rgb(151, 151, 151)',
            }))
        }
        if (!localStorage.getItem('pixelBoard')) {
            localStorage.setItem('pixelBoard', JSON.stringify(Array(25).fill('white')));
        }
        if (!localStorage.getItem('boardSize')) {
            localStorage.setItem('boardSize', 5);
            criarDivPixel();
        } else {
            criarDivPixel();
        }
    }
    
    
    const selecionarPixel = () => {
        Array.from(document.querySelectorAll('.pixel')).forEach((elemento, index) => {
            elemento.addEventListener('click', (event) => {
                const color = corPaletteSelecionada();
                event.target.style.backgroundColor = color;
                guardarPixelBoard(color, index);
            })
        })
    
    }
    //exercicio 14
    
    const limiteBoardSize = (input) => {
        let number = input;
        if (input < 5) {
            number = 5;
        } else if (input > 50) {
            number = 50;
        }
        localStorage.setItem('boardSize', JSON.stringify(number));
        return number;
    };
    
    window.addEventListener("load", function (event) {
        iniciarCorStorage();
        selecionarCorPalette();
        botaoCorAleatorio();
        corPaletteInicial();
        adicionarSelected();
        selecionarPixel();
        resetarPixelBoard();
        limiteBoardSize();
    })
    
    
    //exercicio 13
    
    const boardSizeInput = document.createElement('input');
    boardSizeInput.id = 'board-size';
    boardSizeInput.type = 'number';
    boardSizeInput.min = '1';
    boardSizeInput.max = '50';
    //buttonContainer.appendChild(boardSizeInput);
    
    const generateBoardButton = document.createElement('button');
    generateBoardButton.id = 'generate-board';
    generateBoardButton.innerHTML = 'VQV';
    //buttonContainer.appendChild(generateBoardButton);
    
    const aumentarQuadrados = () => {
        const maisQuadrados = limiteBoardSize(document.querySelector('#board-size').value);
        for (let index = 0; index < maisQuadrados * maisQuadrados; index += 1) {
            const criarPixel = document.createElement('div');
            criarPixel.classList = 'pixel';
            criarPixel.style.backgroundColor = 'white';
            document.querySelector('#pixel-board').appendChild(criarPixel);
         }
    }
    
    //const tamanhoPixelBoard1 = (tamanhoDoPixel) => {
        //const localAlteracao = document.querySelector('#pixel-board');
       // const multiplicacaoLarguraAltura = limiteBoardSize(tamanhoDoPixel) * 40;
        //localAlteracao.style.heigth = `${multiplicacaoLarguraAltura}px`;
        //localAlteracao.style.width = `${multiplicacaoLarguraAltura}px`;
    //}
    
    document.querySelector('#generate-board').addEventListener('click', () => {
        const boardSizeValue = document.querySelector('#board-size').value;
        if (boardSizeValue === '' || boardSizeValue < 1) {
            alert('Board inválido!');
        }
        else {
            document.querySelector('#pixel-board').innerHTML = '',
             aumentarQuadrados();
            //limiteBoardSize(boardSizeValue);
            selecionarPixel();
        }
    })
    // exercicio 15    
    
    