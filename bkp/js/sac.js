$('#calcular').click(function (e) {
	e.preventDefault();
	var oper = $('#oper').val();

	calcular(oper);

	var capital = $('capital').val();
	var taxa = $('taxa').val();
	var parcelas = $('parcelas').val();
	var periodo = $('periodo').val();
	var periodok = $('periodok').val();

	function valorK()
	{
		var k = document.calcform.periodok.value;
		var t = document.calcform.periodo.value;
		var first = parseFloat(periodok);
		var tempo = parseFloat(periodo);
		var res = parseFloat((first-tempo));
		return res;
	}
	function ValorN()
	{
		var parcelas = document.calcform.parcelas.value;
		var res = parseFloat(parcelas);
		return res;
	}

	function ValorT()
	{
		var periodo = document.calcform.periodo.value;
		var res = parseFloat(periodo);
		return res;
	}

	function ValorI()
	{
		var taxa = document.calcform.taxa.value;
		var res = parseFloat(taxa/100);
		return res;
	}

	function ValorP()
	{
		var capital = document.calcform.capital.value;
		var res = parseFloat(capital);
		return res;
	}

//Formulas
function ValorA()
{
	var res = parseFloat(ValorP()/ValorN());	
	document.calcform.valoramortizacao.value = res.toFixed(2);
	return res;
}

function SaldoDevedorT()
{
	var res = parseFloat((ValorN()-ValorT())*ValorA());
	document.calcform.SACsaldodevedort.value = res.toFixed(2);
	return res;	
}


function SaldoDevedorTum()
{
	var res = parseFloat(ValorA()*((ValorN()-ValorT())+1));
	document.calcform.saldodevedortum.value = res.toFixed(2);
	return res;	
}

function ValorDoJuros()
{
	var res = parseFloat(ValorI()*SaldoDevedorTum());
	document.calcform.parcelajurosordemt.value = res.toFixed(2);
	return res;
}

function ValorPrestacaoOrdemT()
{
	var res = parseFloat(ValorA()*((ValorI()*((ValorN()-ValorT())+1))+1));
	document.calcform.prestacaoordemt.value = res.toFixed(2);
	return res;		
}

function SomaAmortizacoesTK()
{
	var res = parseFloat(valorK()*ValorA());
	document.calcform.amortizacaotk.value = res.toFixed(2);
	return res;
}

function JurosAcumuladoEmT()
{	
	var res = parseFloat((((((2*ValorN())-ValorT())+1)/2)*ValorT())*(ValorI()*ValorA()));
	document.calcform.somajurost.value = res.toFixed(2);
	return res;	
}

function JurosTK()
{
	var res = parseFloat(((valorK()*((ValorN()-ValorT())-((valorK()-1)/2)))*ValorA())*ValorI());
	document.calcform.somajurostk.value = res.toFixed(2);
	return res;
}

function SomaPrestacoesA()
{	
	var res = parseFloat(ValorA()*(ValorT()*((ValorI()*((((2*ValorN())-ValorT())+1)/2))+1)));
	document.calcform.somaprestacaoa.value = res.toFixed(2);
	return res;
}

function SomaPrestacoesTK()
{
	var res = parseFloat(ValorA()*(valorK()*((ValorI()*((ValorN()-ValorT())-((valorK()-1)/2)))+1)));
	document.calcform.somaprestacaotk.value = res.toFixed(2);
	return res;
}

function Decrescimo()
{
	var res = parseFloat(ValorI()*ValorA()).toFixed(2);
	document.calcform.decrescimo.value = res;
	return res;	
}

function calcular(oper) 
{
	if (oper == "Sac") 
	{
		ValorA();
		SaldoDevedorT();
		SaldoDevedorTum();
		ValorDoJuros();
		ValorPrestacaoOrdemT();
		SomaAmortizacoesTK();
		JurosAcumuladoEmT();
		JurosTK();
		SomaPrestacoesA();
		SomaPrestacoesTK();
		Decrescimo();
	}	
}		

});