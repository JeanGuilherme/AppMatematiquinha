var capital = "";
var taxa = "";
var parcelas = "";
var periodo = "";
var periodok = "";

$('#calcular').click(function (e) {
	e.preventDefault();
	var oper = $('#oper').val();
	capital = $('#capital').val();
	taxa = $('#taxa').val();
	parcelas = $('#parcelas').val();
	periodo = $('#periodo').val();
	periodok = $('#periodok').val();
	calcular(oper);

	function ValorK()
	{
		return parseFloat(periodok-periodo);
	}

	function ValorN()
	{
		return parseFloat(parcelas);
	}

	function ValorT()
	{
		return parseFloat(periodo);
	}

	function ValorI()
	{
		return parseFloat(taxa/100);
	}

	function ValorP()
	{
		return parseFloat(capital);
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


	function ValorParcela()
	{
		var ind = parseFloat(1+ValorI());
		var res = parseFloat(ValorP()*(((Math.pow(ind,ValorN()))*ValorI())/((Math.pow(ind,ValorN()))-1))).toFixed(2);
		$('#PRICEvalorparcela').html(res);
		return res;
	}

	function SaldoDevedorT()
	{
		var res = parseFloat(ValorParcela()*FVANMT()).toFixed(2);
		$('#PRICEsaldodevedort').html(res);
		return res;
	}

	function SaldoDevedorTmenosum()
	{
		var res = parseFloat(ValorParcela()*FVANMTMUM()).toFixed(2);
		$('#PRICEsaldodevedort1').html(res);
		return res;
	}

	function JurosdeOrdemT()
	{
		var res = parseFloat(ValorI()*SaldoDevedorTmenosum()).toFixed(2);
		$('#PRICEjurosordemt').html(res);
		return res;
	}

	function PrimeiraAmortizacao()
	{
		var res = (ValorParcela()-(ValorI()*ValorP())).toFixed(2);
		$('#PRICEprimeiraamortizacao').html(res);
		return res;
	}

	function ValordaAmortizacaoemT()
	{
		var ind = (ValorI()+1);
		var tempo = (ValorT()-1);
		var res = (PrimeiraAmortizacao()*(Math.pow(ind,tempo))).toFixed(2);
		$('#PRICEamortizacaot').html(res);
		return res;
	}

	function TotalAmortizacao()
	{
		var res = parseFloat((FVA()-FVANMT())*ValorParcela()).toFixed(2);
		$('#PRICEamortizacaott').html(res);
		return res;	
	}

	function AmortizacaoEmTK()
	{
		var res = parseFloat(ValorParcela()*(FVANMT()-FVANMTMUMK())).toFixed(2);	
		$('#PRICEamortizacaott2').html(res);
		return res;
	}

	function JurosAcumulado()
	{
		var res = parseFloat(((ValorT()-FVA())+FVANMT())*ValorParcela()).toFixed(2);
		$('#PRICEjurosacum').html(res);
		return res;
	}

	function JurosAcumuladoEmTK()
	{	
		var res = parseFloat((ValorParcela()*ValorK())-AmortizacaoEmTK()).toFixed(2);
		$('#PRICEjurosacum2').html(res);
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