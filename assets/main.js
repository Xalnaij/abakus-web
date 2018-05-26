var summe = 0;
var rechnen = 0;

$(document).ready(function() {
	$("#result").text(summe.toString());
});

$(".stange").on(
		'click',
		'.align-img-left',
		function() {
			// Einfrieren aller Events im Body
			$("body").addClass('freeze');
			var i = 0;

			// alle <img> auswählen bis ein element die klasse "align-img-right"
			// besitzt
			var info = $(this).nextUntil(".align-img-right");
			// wie viele elemente werden nach rechts geschoben
			var length = info.length;
			// hier hol ich mir die id des parents des parents vom angeklickten
			// elements aus dem HTML-DOM
			var type = $(this).parent().parent().attr('id');

			while (i <= length) {

				if (type === 'eins') {
					summe += 1;
				} else if (type === 'zehn') {
					summe += 10;
				} else if (type === 'hundert') {
					summe += 100;
				} else if (type === 'tausend') {
					summe += 1000;
				} else if (type === 'zehntausend') {
					summe += 10000;
				}

				i++;
			}

			/*
			 * Verschiebung nach rechts durch zuweisen von css klassen
			 */
			$(this).addClass("align-img-right").removeClass("align-img-left");
			$(this).nextUntil(".align-img-right").addClass("align-img-right")
					.removeClass("align-img-left");

			var count = $(this).parent().children('.align-img-right');
			console.log(count.length);
			console.log(length);

			// wird ausgelöst wenn alle aufeinmal verschoben werden
			if (length == 9) {
				// die elemente in als jquery objekte in variablen speichern um
				// im setTimeout auf sie zuzugreifen
				var element = $(this);
				// gleichzeitig alle element auf einer stange nach rechts
				// verschieben
				var elements = $(this).parent().children().addClass(
						"align-img-right").removeClass("align-img-left");
				setTimeout(function() {
					// nach 1,5 sekunden elemente wieder nach links verschieben
					// die css-transition dauert 1 sekunde, daher damit es
					// optisch angenehm aussieht 1,5s pause
					elements.parent().children().removeClass("align-img-right")
							.addClass("align-img-left");
					setTimeout(function() {
						// nach 1,5 sekunden wird das letzte element mit der
						// klasse "align-img-left" nach rechts geschoben
						element.parent().parent().prev().children(".stange")
								.children(".align-img-left:last").addClass(
										"align-img-right").removeClass(
										"align-img-left");
					}, 1500);
				}, 1500);
			}
			// wird ausgelöst wenn die reihe vervollständigt wurde
			else if (count.length == 10) {
				var element = $(this);
				setTimeout(function() {
					element.parent().children().removeClass("align-img-right")
							.addClass("align-img-left");
					setTimeout(function() {
						element.parent().parent().prev().children(".stange")
								.children(".align-img-left:last").addClass(
										"align-img-right").removeClass(
										"align-img-left");
					}, 1500);
				}, 1500);
			}

			$("#result").text(summe.toString());
		});
// warten bis die transition beendet ist, dann events wieder zulassen
$(".align-img-left").on(
		'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
		function() {
			$("body").removeClass('freeze');
		});

/*
 * Alles was hier gemacht wird ist gespiegelt zur oberen Anweisung, damit man
 * auch wieder element zurück schieben kann
 */
$(".stange").on(
		'click',
		'.align-img-right',
		function() {
			$("body").addClass('freeze');
			var i = 0;
			var info = $(this).prevUntil(".align-img-left");
			var length = info.length;
			var type = $(this).parent().parent().attr('id');

			while (i <= length) {

				if (type === 'eins') {
					summe -= 1;
				} else if (type === 'zehn') {
					summe -= 10;
				} else if (type === 'hundert') {
					summe -= 100;
				} else if (type === 'tausend') {
					summe -= 1000;
				} else if (type === 'zehntausend') {
					summe -= 10000;
				}

				i++;
			}

			/*
			 * Verschiebung nach links durch zuweisen von css klassen
			 */
			$(this).addClass("align-img-left").removeClass("align-img-right");
			$(this).prevUntil(".align-img-left").addClass("align-img-left")
					.removeClass("align-img-right");
			$("#result").text(summe.toString());
		});

$(".align-img-right").on(
		'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
		function() {
			$("body").removeClass('freeze');
		});

/*
 * Eingabe verarbeiten
 */

// Eingabe validieren
$("#optext").on('change', function() {
	
	//Eingabe lesen
	var recheneingabe = "";
	recheneingabe = $("#optext").val();
	recheneingabe = recheneingabe.trim();
	
	//Wenn plus
	if (recheneingabe.charAt(0) == "+") {
		rechnen = recheneingabe.substring(1, recheneingabe.length);
		if (summe + rechnen >= 100000) {
			$("#btrechne").prop('disabled', true).text("Fehler");
		} else {
			$("#btrechne").prop('disabled', false).text("Rechne");
		}
		$("#result").text(rechnen + " addieren");
		
	//Wenn minus
	} else if (recheneingabe.charAt(0) == "-") {
		rechnen = recheneingabe.substring(1, recheneingabe.length);
		if (summe - rechnen < 0) {
			$("#btrechne").prop('disabled', true).text("Fehler");
		} else {
			$("#btrechne").prop('disabled', false).text("Rechne");
		}
		$("#result").text(rechnen + " substrahieren");
	//Wenn weder noch
	}else{
		$("#btrechne").prop('disabled', true).text("Fehler");
	}

});
// Eingabe benutzen
$("#btrechne").on('click', function() {
	var einer=0;
	var zehner=0;
	var hunderter=0;
	var tausender=0;
	
if(rechnen.length==1){
		einer=rechnen;
	}else if(rechnen.length==2){
		zehner=rechnen.substring(0, 1);
		einer=rechnen.substring(1, 1);
	}else if(rechnen.length==3){
		hunderter=rechnen.substring(0, 1);
		zehner=rechnen.substring(1, 1);
		einer=rechnen.substring(2, 1);

	}else if(rechnen.length==4){
		einer=rechnen.substring(3, 1);
		zehner=rechnen.substring(2, 1);
		hunderter=rechnen.substring(1, 1);
		tausender=rechnen.substring(0, 1);
	}
	$("#result").text(" "+tausender+" "+hunderter.toString()+" "+zehner.toString()+" "+einer.toString()+" ");	
});

