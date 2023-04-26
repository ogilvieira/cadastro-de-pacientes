/**
 * Verifica se um CNS é válido
 *
 * @function
 * @param {string} cns
 * @return {boolean}
 */
export default (cns) => {
  if (typeof cns !== 'string') return false;
  cns = cns.replace(/[\s.-]*/gim, '');
  // Começando com '0','3','4','5','6' são inválidos
  if ( !cns || cns.length !== 15 || ['0','3','4','5','6'].includes(cns[0])){
    return false;
  }

  let soma, resto, digitoVerificador;

  // Teste para os que começam com '1' e '2'
  if( ['1', '2'].includes(cns[0]) ) {
    const pis = cns.substring(0,11);
    let resultado;
    
    soma = pis.split('').reduce((sum, current, index) => {
      return sum + Number(current * (15 - index))
    }, 0);

    resto = soma % 11;
    digitoVerificador = 11 - resto;
    if (digitoVerificador === 11){ digitoVerificador = 0; }

    if( digitoVerificador === 10 ) {
      soma += 2;
      resto = soma % 11;
      digitoVerificador = 11 - resto;
      resultado = `${pis}001${digitoVerificador}`
    } else {
      resultado = `${pis}000${digitoVerificador}`
    }

    return (cns === resultado);

  } else {
    // Teste para os que sobraram: '7', '8', '9'
    soma = cns.split('').reduce((sum, current, index) => {
      return sum + Number(current * (15 - index))
    }, 0);

    resto = soma % 11;

    return resto === 0;
  }

};
