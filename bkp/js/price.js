$('#calcular').click(function (e) {
	e.preventDefault();
	var oper = $('#oper').val();

	calcular(oper);

	var capital = $('capital').val();
	var taxa = $('taxa').val();
	var parcelas = $('parcelas').val();
	var periodo = $('periodo').val();
	var periodok = $('periodok').val();


	function ValorK()
	{
		var k = document.calcform.periodok.value;
		var t = document.calcform.periodo.value;
		var res = parseFloat((k-t));
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

	function FVA()
	{
		var ind = parseFloat(ValorI()+1);
		var res = parseFloat(((Math.pow(ind,ValorN())-1)/(Math.pow(ind,ValorN())*ValorI())));
		return res;
	}

	function FVANMT()
	{
		var nt = parseFloat(ValorN()-ValorT());
		var ind = parseFloat(ValorI()+1);	
		var res = parseFloat(((Math.pow(ind,nt)-1)/(Math.pow(ind,nt)*ValorI())));
		return res;
	}

	function FVANMTMUM()
	{
		var nt = parseFloat((ValorN()-ValorT())+1);
		var ind = parseFloat(ValorI()+1);	
		var res = parseFloat(((Math.pow(ind,nt)-1)/(Math.pow(ind,nt)*ValorI())));
		return res;
	}

	function FVANMTMUMK()
	{
		var nt = parseFloat((ValorN()-ValorT())-ValorK());
		var ind = parseFloat(ValorI()+1);	
		var res = parseFloat(((Math.pow(ind,nt)-1)/(Math.pow(ind,nt)*ValorI())));
		return res;
	}

//Formulas Sistemas Price

function ValorParcela()
{
	var ind = parseFloat(1+ValorI());
	var res = parseFloat(ValorP()*(((Math.pow(ind,ValorN()))*ValorI())/((Math.pow(ind,ValorN()))-1))).toFixed(2);
	document.calcform.valorparcela.value = res;
	return res;
}

function SaldoDevedorT()
{
	var res = parseFloat(ValorParcela()*FVANMT()).toFixed(2);
	document.calcform.saldodevedort.value = res;
	return res;
}

function SaldoDevedorTmenosum()
{
	var res = parseFloat(ValorParcela()*FVANMTMUM()).toFixed(2);
	document.calcform.saldodevedort1.value = res;
	return res;
}

function JurosdeOrdemT()
{
	var res = parseFloat(ValorI()*SaldoDevedorTmenosum()).toFixed(2);
	document.calcform.jurosordemt.value = res;
	return res;
}

function PrimeiraAmortizacao()
{
	var res = (ValorParcela()-(ValorI()*ValorP())).toFixed(2);
	document.calcform.primeiraamortizacao.value = res;	
	return res;
}

function ValordaAmortizacaoemT()
{
	var ind = (ValorI()+1);
	var tempo = (ValorT()-1);
	var res = (PrimeiraAmortizacao()*(Math.pow(ind,tempo))).toFixed(2);
	document.calcform.amortizacaot.value = res;
	return res;
}

function TotalAmortizacao()
{
	var res = parseFloat((FVA()-FVANMT())*ValorParcela()).toFixed(2);
	document.calcform.amortizacaott.value = res;
	return res;	
}

function AmortizacaoEmTK()
{
	var res = parseFloat(ValorParcela()*(FVANMT()-FVANMTMUMK())).toFixed(2);	
	document.calcform.amortizacaott2.value = res;
	return res;
}

function JurosAcumulado()
{
	var res = parseFloat(((ValorT()-FVA())+FVANMT())*ValorParcela()).toFixed(2);
	document.calcform.jurosacum.value = res;
	return res;
}

function JurosAcumuladoEmTK()
{	
	var res = parseFloat((ValorParcela()*ValorK())-AmortizacaoEmTK()).toFixed(2);
	document.calcform.jurosacum2.value = res;
	return res;
}

function calcular(oper) 
{
	if (oper == "Price") 
	{
		ValorParcela();
		SaldoDevedorT();
		SaldoDevedorTmenosum();
		JurosdeOrdemT();
		PrimeiraAmortizacao();
		ValordaAmortizacaoemT();
		TotalAmortizacao();
		AmortizacaoEmTK();
		JurosAcumulado();
		JurosAcumuladoEmTK();
	}
}		

});