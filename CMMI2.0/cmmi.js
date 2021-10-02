/* 
	https://codepen.io/noyiri/pen/zeoRwB
	https://www.w3schools.com/css/css_grid.asp
	https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout#grid_tracks
	https://jsfiddle.net/C6LPY/2/
	https://nnattawat.github.io/flip/
	https://consulting.itgonline.com/cmmi-consulting/cmmi-v2/
*/ 

var correctCards = 0;
var terms = [
	{
		id: '1',
		term: 'Execução',
	},
	{ id: '11',		term: 'Garantia de Qualidade' },
	{ id: '111',	term: 'Garantia de Qualidade do Processo' },
	{
		id: '112',
		term: 'Desenvolvimento e Gestão de Requisitos',
		goal: 'Esclarecer os requisitos, assegurar entendimento comum pelas partes interessadas e alinhar os requisitos, planos e produtos de trabalho.'
	},
	{ id: '113',	term: 'Revisão por Par' },
	{ id: '114',	term: 'Verificação e Validação' },
	{ id: '12',		term: 'Engenharia e Desenvolvimento de Produto' },
	{ id: '121',	term: 'Solução Técnica' },
	{ id: '122',	term: 'Integração de Produto' },
	{ id: '13',		term: 'Seleção e Gestão de Fornecedores' },
	{ id: '131', 	term: 'Gestão de Contrato de Fornecedor' },
	
	{ id: '2',		term: 'Gestão' },
	{ id: '21',		term: 'Planejamento e Gestão de Trabalho' },
	{ id: '211',	term: 'Monitorar e Controlar' },
	{ id: '212',	term: 'Planejamento' },
	{ id: '213',	term: 'Estimativa' },
	{ id: '22',		term: 'Gestão de Resiliência dos Negócios' },
	{ id: '221',	term: 'Gestão de Riscos e Oportunidades' },
	{ id: '23', 	term: 'Gestão da Força de Trabalho' },
	{ id: '231', 	term: 'Treinamento Organizacional' },
	
	{ id: '3',		term: 'Habilitação' },
	{ id: '31',		term: 'Suporte à Implementação' },
	{ id: '311',	term: 'Gestão de Configuração' },
	{ id: '312',	term: 'Análise Causal e Resolução' },
	{ id: '313', 	term: 'Análise de Decisão e Resolução' },
	
	{ id: '4',		term: 'Melhoria' },
	{ id: '41',		term: 'Sustentação e Hábito de Persistência' },
	{ id: '411',	term: 'Governança' },
	{ id: '412',	term: 'Infraestrutura de Implementação' },
	{ id: '42', 	term: 'Melhoria do Desempenho' },
	{ id: '421',	term: 'Gestão de Desempenho e Medição' },
	{ id: '422', 	term: 'Gestão de Processos' },
	{ id: '423',	term: 'Desenvolvimento de Ativos de Processos' },
];
$(init);

function init() {

	// Hide the success message
	$('#successMessage').hide();
	$('#successMessage').css({
		left: '580px',
		top: '250px',
		width: 0,
		height: 0
	});

	// Reset the game
	correctCards = 0;
	$('#cardPile').html('');
	$('#cardSlots').html('');

	$('<div>' + "Categoria" + '</div>').appendTo('#cardSlots').css({
		'background-color': 'black',
		'color': 'white',
	})
	$('<div>' + "Área de Capacidade" + '</div>').appendTo('#cardSlots').css({
		'background-color': 'black',
		'color': 'white',
	})
	$('<div>' + "Área de Prática" + '</div>').appendTo('#cardSlots').css({
		'background-color': 'black',
		'color': 'white',
	})
	// Create the pile of shuffled cards
	for (var i = 0; i < terms.length; i++) {
		console.log()
		$('<div>' + terms[i].term + '</div>').data('id', terms[i].id).attr('id', 'card' + terms[i].id).appendTo('#cardPile').draggable({
			stack: '#cardPile div',
			cursor: 'move',
			revert: true,
		});
		$('<div>' + "<br />" + '</div>').data('id', terms[i].id).appendTo('#cardSlots').droppable({
			accept: '#cardPile div',
			hoverClass: 'hovered',
			drop: handleCardDrop
		}).addClass('item' + terms[i].id);
	}
	// shuffle
	$(function () {
		var parent = $("#cardPile");
		var divs = parent.children();
		while (divs.length) {
			parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
		}
	});	
}

function handleCardDrop(event, ui) {
	var slotNumber = $(this).data('id');
	var cardNumber = ui.draggable.data('id');

	slotNumberDigits = slotNumber.length;
	cardNumberDigits = cardNumber.length;

	if (slotNumberDigits >= 3 && cardNumberDigits >= 3) {
		slotNumber = Math.floor(slotNumber/10) * 10
		cardNumber = Math.floor(cardNumber/10) * 10
	}

	// If the card was dropped to the correct slot,
	// change the card colour, position it directly
	// on top of the slot, and prevent it being dragged
	// again
	if (slotNumber == cardNumber) {
		$(this).html($(ui.draggable).text());
		// $(ui.draggable).copyCSS(this, null, ['background']);  // copy everything except top and left
		$(this).css('color', ui.draggable.css('color'));
		$(this).css('font-size', ui.draggable.css('font-size'));
		$(this).css('text-shadow', ui.draggable.css('text-shadow'));
		$(this).css('text-align', ui.draggable.css('text-align'));
		ui.draggable.css('display', 'none');
		correctCards++;
	}

	// If all the cards have been placed correctly then display a message
	// and reset the cards for another go

	if (correctCards == terms.length) {
		$('#successMessage').show();
		$('#successMessage').animate({
			left: '380px',
			top: '200px',
			width: '400px',
			height: '100px',
			opacity: 1
		});
	}

}
