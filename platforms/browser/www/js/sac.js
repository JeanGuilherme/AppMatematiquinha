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
	
	function valorK()
	{
		return parseFloat(parseFloat(periodok)-parseFloat(periodo));
	}
	function ValorN()
	{
		return parseFloat(parcelas);
	}
	function ValorT()
	{
		return parseFloat(periodo);;
	}

	function ValorI()
	{
		return parseFloat(taxa/100);;
	}
	function ValorP()
	{
		return parseFloat(capital);;
	}
	function ValorA()
	{
		var res = parseFloat(ValorP()/ValorN());
		$('#SACvaloramortizacao').html(res.toFixed(2));
		return res;
	}
	function SaldoDevedorT()
	{
		var res = parseFloat((ValorN()-ValorT())*ValorA());
		$('#SACsaldodevedort').html(res.toFixed(2));
		return res;	
	}
	function SaldoDevedorTum()
	{
		var res = parseFloat(ValorA()*((ValorN()-ValorT())+1));
		$('#SACsaldodevedortum').html(res.toFixed(2));
		return res;	
	}
	function ValorDoJuros()
	{
		var res = parseFloat(ValorI()*SaldoDevedorTum());
		$('#SACparcelajurosordemt').html(res.toFixed(2));
		return res;
	}
	function ValorPrestacaoOrdemT()
	{
		var res = parseFloat(ValorA()*((ValorI()*((ValorN()-ValorT())+1))+1));
		$('#SACprestacaoordemt').html(res.toFixed(2));
		return res;		
	}
	function SomaAmortizacoesTK()
	{
		var res = parseFloat(valorK()*ValorA());
		$('#SACamortizacaotk').html(res.toFixed(2));
		return res;
	}
	function JurosAcumuladoEmT()
	{	
		var res = parseFloat((((((2*ValorN())-ValorT())+1)/2)*ValorT())*(ValorI()*ValorA()));
		$('#SACsomajurost').html(res.toFixed(2));
		return res;	
	}
	function JurosTK()
	{
		var res = parseFloat(((valorK()*((ValorN()-ValorT())-((valorK()-1)/2)))*ValorA())*ValorI());
		$('#SACsomajurostk').html(res.toFixed(2));
		return res;
	}
	function SomaPrestacoesA()
	{	
		var res = parseFloat(ValorA()*(ValorT()*((ValorI()*((((2*ValorN())-ValorT())+1)/2))+1)));
		$('#SACsomaprestacaoa').html(res.toFixed(2));
		return res;
	}
	function SomaPrestacoesTK()
	{
		var res = parseFloat(ValorA()*(valorK()*((ValorI()*((ValorN()-ValorT())-((valorK()-1)/2)))+1)));
		$('#SACsomaprestacaotk').html(res.toFixed(2));
		return res;
	}
	function Decrescimo()
	{
		var res = parseFloat(ValorI()*ValorA());
		$('#SACdecrescimo').html(res.toFixed(2));
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