$('#calcular').click(function (e) {
var oper = $('#oper').val();
if (oper == "Price") {
	$("#priceModal").trigger('click');
}
if (oper == "Sac") {
	$("#sacModal").trigger('click');
}
});