function valorK()
{
	var k = document.calcform.periodok.value;
	var t = document.calcform.periodo.value;
	var first = parseFloat(k);
	var tempo = parseFloat(t);
	var res = parseFloat((first-tempo));
	return res;
}

function ValorAmortizacao()
{
	var parcelas = document.calcform.parcelas.value;
	var taxa = document.calcform.taxa.value;
	var capital = document.calcform.capital.value;
	var periodo = document.calcform.periodo.value;
	
	var dinheiro = parseFloat(capital);
	var tempo = parseFloat(parcelas);
	var amortizacao = parseFloat((dinheiro/tempo)).toFixed(2);	
	document.calcform.valoramortizacao.value = amortizacao;
	return amortizacao;
}

function SaldoDevedorT()
{
	var parcelas = document.calcform.parcelas.value;
	var periodo = document.calcform.periodo.value;
	var tempo = parseFloat(parcelas);
	var periodoatual = parseFloat(periodo);
	var amortizacao = ValorAmortizacao();
	
	var base = parseFloat((tempo-periodoatual));
	var res = parseFloat((amortizacao*base)).toFixed(2);
	document.calcform.saldodevedort.value = res;
	return res;	
}

function SaldoDevedorTum()
{
	var parcelas = document.calcform.parcelas.value;
	var periodo = document.calcform.periodo.value;
	var tempo = parseFloat(parcelas);
	var periodoatual = parseFloat(periodo);
	var amortizacao = ValorAmortizacao();
	
	var base = parseFloat((periodoatual+1));
	var segundo = parseFloat((tempo-base));
	var res = parseFloat((amortizacao*segundo)).toFixed(2);
	document.calcform.saldodevedortum.value = res;
	return res;	
}

function ValorDoJuros()
{
	var taxa = document.calcform.taxa.value;
	var i = parseFloat((taxa/100));
	var parcelas = SaldoDevedorTum();
	var res = parseFloat((i*parcelas)).toFixed(2);
	document.calcform.parcelajurosordemt.value = res;
	return res;
}

function ValorPrestacaoOrdemT()
{
	var taxa = document.calcform.taxa.value;
	var parcelas = document.calcform.parcelas.value;
	var periodo = document.calcform.periodo.value;
	
	var tempo = parseFloat(parcelas);
	var periodoatual = parseFloat(periodo);
	var i = parseFloat((taxa/100));
	var amortizacao = ValorAmortizacao();
	
	
	var base = parseFloat(tempo-periodoatual);
	var base2 = parseFloat(base+1);
	var base3 = parseFloat(base2*i);
	var base4 = parseFloat(base3+1);
	var res = parseFloat((amortizacao*base4)).toFixed(2);
	document.calcform.prestacaoordemt.value = res;
	return res;		
}

function SomaAmortizacoesTK()
{
	var periodok = document.calcform.periodok.value;
	var k = valorK();
	var parcela = ValorAmortizacao();
	var res = parseFloat((k*parcela)).toFixed(2);
	document.calcform.amortizacaotk.value = res;
	return res;
}

function JurosAcumuladoEmT()
{
	var taxa = document.calcform.taxa.value;
	var i = parseFloat((taxa/100));	
	var periodo = document.calcform.periodo.value;		
	var t = parseFloat(periodo);
	var parcelas = document.calcform.parcelas.value;		
	var n = parseFloat(parcelas);	
	var meio = parseFloat(2*n);
	var meio2 = parseFloat(meio-t);
	var meio3 = parseFloat(meio2+1);
	var meio4 = parseFloat(meio3/2);
	var parcela = ValorAmortizacao();
	var fist = parseFloat(i*parcela);
	var fist2 = parseFloat(fist*t);
	
	var res = parseFloat((fist2*meio4)).toFixed(2);
	document.calcform.somajurost.value = res;
	return res;	
}

function JurosTK()
{
	var taxa = document.calcform.taxa.value;
	var i = parseFloat((taxa/100));	
	var parcelas = document.calcform.parcelas.value;		
	var n = parseFloat((parcelas));
	var periodo = document.calcform.periodo.value;		
	var t = parseFloat((periodo));
	var a = ValorAmortizacao();
	var k = valorK();
	
	var comeco = parseFloat(((k-1)/2));
	var segundo = parseFloat(((n-t)-comeco));
	var terceiro = parseFloat((k*segundo));
	var res = parseFloat(((terceiro*a)*i)).toFixed(2);
	document.calcform.somajurostk.value = res;	
	
	return segundo;
}

function SomaPrestacoesA()
{
	var taxa = document.calcform.taxa.value;
	var i = parseFloat((taxa/100));	
	var parcelas = document.calcform.parcelas.value;		
	var n = parseFloat((parcelas));
	var periodo = document.calcform.periodo.value;		
	var t = parseFloat((periodo));
	var a = ValorAmortizacao();

	var primeiro = parseFloat((2*n));
	var segundo = parseFloat((t+1));
	var terceiro = parseFloat((primeiro-segundo));
	var quarto = parseFloat((terceiro/2));
	var quinto = parseFloat((i*quarto));
	var sexto = parseFloat((quinto+1));
	var res = parseFloat(((sexto*t)*a)).toFixed(2);
	document.calcform.somaprestacaoa.value = res;
	
}

function SomaPrestacoesTK()
{
	var tenta = JurosTK();
	var taxa = document.calcform.taxa.value;
	var i = parseFloat((taxa/100));	
	var parcelas = document.calcform.parcelas.value;		
	var n = parseFloat((parcelas));
	var periodo = document.calcform.periodo.value;		
	var t = parseFloat((periodo));
	var a = ValorAmortizacao();	
	var k = valorK();
	
	var primeiro = parseFloat((tenta*i));
	var segundo = parseFloat((primeiro+1));
	var terceiro = parseFloat((k*segundo));
	var res = parseFloat((a*terceiro)).toFixed(2);
	document.calcform.somaprestacaotk.value = res;
	
	return res;
}

function Decrescimo()
{
	var taxa = document.calcform.taxa.value;
	var i = parseFloat((taxa/100));		
	var a = ValorAmortizacao();	
	
	var res = parseFloat((i*a)).toFixed(2);
	document.calcform.decrescimo.value = res;
	return res;
	
}

function calcular(oper) 
{
	if (oper == "SAC") 
	{
		JurosTK();
		Decrescimo();
		SomaPrestacoesA();
		JurosAcumuladoEmT();
		SomaAmortizacoesTK();
		ValorAmortizacao();
		SaldoDevedorT();
		SaldoDevedorTum();
		ValorPrestacaoOrdemT();
		ValorDoJuros();
		SomaPrestacoesTK();
		
	}	
}		