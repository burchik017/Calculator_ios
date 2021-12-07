let doc = document;

 let a = ''; // first number
 let b = ''; // second number
 let sign = ''; // operation mark
 let finish = false; // operation mark

 const digit = ['0','1','2','3','4','5','6','7','8','9','.'];
 const action = ['-','+','X','/'];

 //screen
 const out = doc.querySelector('.calc-screen span');

 function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
 };

 doc.querySelector('.ac').addEventListener('click' , clearAll)


 doc.querySelector('.buttons').addEventListener('click', function (e) {
     //нажата не кнопка
    if (!e.target.classList.contains('btn')) return;

    //нажата кнопка clearAll ac
    if (e.target.classList.contains('ac')) return;

    out.textContent = '';

    //получаю нажатую кнопку
    const key = e.target.textContent;

    //если нажата 0-9, (.)
    if (digit.includes(key)) {

        if (b === '' && sign === '') {
            // проверка на первый ноль
            if (a === '0' && key === '0' ) {
                a = '';
            }
            // проверка на точку и её повторение
            if (a === '' && key === '.' ) {
                a += '0';
            } else if (a !== '' && a.includes('.')) {
                let newA = a;
                if (key === '.' ) {
                    return out.textContent = a;
                }
                newA = a.split('.');
                newA = newA[0] + '.' + key;
            };
            //

            a+= key;
            out.textContent = a;

        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        } else {

            // проверка на точку и её повторение
            if (b === '' && key === '.' ) {
                b += '0';
            } else if (b !== '' && b.includes('.')) {
                let newB = b;
                if (key === '.' ) {
                    return out.textContent = b;
                };
                newB = b.split('.');
                newB = newB[0] + '.' + key;
            };
            //

            b += key;
            out.textContent = b;
        }
        if ( a !== '' && b !== '' && sign !== '') {
            if (key === '.') {
                b = '0';
                b += key;
                out.textContent = b;
            }
        }
        console.table(a, b, sign);

        return;
    };

    //если нажата "+/-" 
    if (key === '+/-') {
        if (a === '') {
            a = `0`;
            out.textContent = a;
        }
        if (a !== '' && b === '') {
            a = `${-a}`;
            out.textContent = a;
        } 
        if (b !== '') {
            b = `${-b}`;
            out.textContent = b;
        }
    };


    // если нажата клавиша + - / *
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.table(a, b , sign);
        return;
    }

    //если нажата =
    if (key === '=') {
        if (b === '') b = a;

        switch (sign) {
            case '+':
                a = (+a) + (+b);
                break;
            case '-':
                a = a - b;
                break;
            case 'X':
                a = a * b;
                break;
            case '/':
                if ((b === '0')) {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';

                    return;
                }
                a = a / b;
                break;
        }

        finish = true;
        out.textContent = a;

        console.log(a, b, sign);
    }

 });


// Color scheme
const switcherTheme = doc.querySelector('.switcher-theme');

function theme() {
	const toggleTheme = document.querySelector('.switcher-theme');
	toggleTheme.addEventListener('click', () => {
		if (document.documentElement.hasAttribute('data-theme')) {
			document.documentElement.removeAttribute('data-theme');
			localStorage.removeItem('theme');
            switcherTheme.textContent = "Light Mode 🌞";
		} else {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
            switcherTheme.textContent = "Dark Mode 🌙";
		}
	});
	if (localStorage.getItem('theme') !== null) {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
}
theme();