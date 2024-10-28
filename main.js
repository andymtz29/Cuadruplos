const convertir = () => {
    const expresion = document.getElementById('expresion').value; 
    if (!expresion) {
        Swal.fire({
            title: 'Advertencia',
            text: 'Por favor, ingresa una expresión.',
            icon: 'warning'
        });
        return;
    }
    if (!/^[0-9+\-*/\s]+$/.test(expresion)) {
        Swal.fire({
            title: 'Error',
            text: 'La expresión solo puede contener números y operadores.',
            icon: 'error'
        });
        return;
    }

    let resultado = 0;
    let numeroActual = '';
    let operadorActual = '+';
    let pasos = [];

    for (let i = 0; i < expresion.length; i++) {
        const simbolo = expresion[i];

        if (!isNaN(simbolo) || simbolo === ' ') {
            numeroActual += simbolo; 
        } else {
            if (numeroActual.trim() !== '') {
                const num = Number(numeroActual.trim());
                const valorAnterior = resultado;

                if (operadorActual === '+') {
                    resultado += num;
                } else if (operadorActual === '-') {
                    resultado -= num;
                } else if (operadorActual === '*') {
                    resultado *= num;
                } else if (operadorActual === '/') {
                    resultado /= num;
                }

                pasos.push(`Resultado: ${valorAnterior} ${operadorActual} ${num} = ${resultado}`);
                numeroActual = ''; 
            }
            operadorActual = simbolo; 
        }
    }

    // Último número en la expresión
    if (numeroActual.trim() !== '') {
        const num = Number(numeroActual.trim());
        const valorAnterior = resultado;

        if (operadorActual === '+') {
            resultado += num;
        } else if (operadorActual === '-') {
            resultado -= num;
        } else if (operadorActual === '*') {
            resultado *= num;
        } else if (operadorActual === '/') {
            resultado /= num;
        }

        pasos.push(`Resultado: ${valorAnterior} ${operadorActual} ${num} = ${resultado}`);
    }

    Swal.fire({
        title: 'Desglose de la operación',
        html: `<b>Pasos:</b><br>${pasos.join('<br>')}<br><br><b>Resultado Final:</b> ${resultado}`,
        icon: 'success'
    });
}
