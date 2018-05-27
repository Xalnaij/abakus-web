var summe = 0;
var rechnen = 0;
var amrechnen=false;

$(document).ready(function() {
	$("#result").text(summe.toString());
});

$(".stange").on(
		'click',
		'.align-img-left',
		function() {
			// Einfrieren aller Events im Body
			$("body").addClass('freeze');
			$("#btrechne").prop('disabled', true).text("...");
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

			if (summe >= 100000) {
				summe -= 100000;
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

			// wird ausgelöst wenn alle auf einmal verschoben werden
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
			if(amrechnen==false){
			$("#btrechne").prop('disabled', false).text("Rechne");	
			$("body").removeClass('freeze');
			}
		});

/*
 * Alles was hier gemacht wird ist gespiegelt zur oberen Anweisung, damit man
 * auch wieder element zurück schieben kann
 */
$(".stange").on(
		'click',
		'.align-img-right',
		function() {
			$("#btrechne").prop('disabled', true).text("...");
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
			if(amrechnen==false){
				$("#btrechne").prop('disabled', false).text("Rechne");	
				$("body").removeClass('freeze');
				}
		});

/*
 * Eingabe verarbeiten
 */

// Eingabe validieren
$("#optext").on('change', function() {

	// Eingabe lesen
	var recheneingabe = "";
	recheneingabe = $("#optext").val();
	recheneingabe = recheneingabe.trim();

	// Wenn plus
	if (recheneingabe.charAt(0) == "+") {
		rechnen = recheneingabe.substring(1, recheneingabe.length);
		if (parseInt(summe) + parseInt(rechnen) >= 100000) {
			$("#btrechne").prop('disabled', true).text("Zu hoch");
		} else {
			$("#btrechne").prop('disabled', false).text("Rechne");
		}

		// Wenn minus
	} else if (recheneingabe.charAt(0) == "-") {
		rechnen = recheneingabe.substring(1, recheneingabe.length);
		if (summe - rechnen < 0) {
			$("#btrechne").prop('disabled', true).text("Zu niedrig");
		} else {
			$("#btrechne").prop('disabled', false).text("Rechne");
		}
		// Wenn weder noch
	} else {
		$("#btrechne").prop('disabled', true).text("Keine richtige Operation");
	}

});

var einer = 0;
var zehner = 0;
var hunderter = 0;
var tausender = 0;
var zehntausender = 0;

var zehnerueber = 0;
var hunderterueber = 0;
var tausenderueber = 0;
var zehntausenderueber = 0;

var resteiner = einer
var restzehner = einer
var resthunderter = einer
var resttausender = einer

// Eingabe benutzen
$("#btrechne").on('click', function() {
	$("#btrechne").prop('disabled', true).text("...");
	$("body").addClass('freeze');
	amrechnen=true;
	var ziffern = rechnen.split("");
	einer = 0;
	zehner = 0;
	hunderter = 0;
	tausender = 0;
	zehntausender = 0;
	var rechnen2 = parseInt(rechnen);

	// zerlegen
	if (rechnen.length == 1) {
		einer = ziffern[0];
	} else if (rechnen.length == 2) {
		zehner = ziffern[0];
		einer = ziffern[1];
	} else if (rechnen.length == 3) {
		hunderter = ziffern[0];
		zehner = ziffern[1];
		einer = ziffern[2];
	} else if (rechnen.length == 4) {
		tausender = ziffern[0];
		hunderter = ziffern[1];
		zehner = ziffern[2];
		einer = ziffern[3];
	} else if (rechnen.length == 5) {
		zehntausender = ziffern[0];
		tausender = ziffern[1];
		hunderter = ziffern[2];
		zehner = ziffern[3];
		einer = ziffern[4];
	}

	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;
	
	// Einer
	if (einer != 0) {
		einerre();
	}
	// Wenn Überschlag zu Zehner
	if (zehnerueber == 1) {
		setTimeout(function() {
			ueberschlageiner();
			// Wenn Überschlag zu Hunderter
			if (hunderterueber == 1) {
				setTimeout(function() {
					ueberschlagzehner();
					// Wenn Überschlag zu Tausender
					if (tausenderueber == 1) {
						setTimeout(function() {
							ueberschlaghunderter();
							// Wenn Überschlag zu Zehntausender
							if (zehntausenderueber == 1) {
								setTimeout(function() {
									ueberschlagtausender();
									// Einer Fertig
									setTimeout(function() {
										weiterBeiZehner()
									}, 1500);
								}, 1500);
								// Wenn kein Überschlag zu Zehntausender
							} else {
								setTimeout(function() {
									weiterBeiZehner()
								}, 1500);
							}
						}, 1500);
						// Wenn kein Überschlag zu Tausender
					} else {
						setTimeout(function() {
							weiterBeiZehner()
						}, 1500);
					}
				}, 1500);
				// Wenn Überschlag zu Hunderter
			} else {
				setTimeout(function() {
					weiterBeiZehner()
				}, 1500);
			}
		}, 1500);
		// Wenn kein Überschlag zu Zehner
	} else {
		setTimeout(function() {
			weiterBeiZehner()
		}, 1500);
	}

	summe += rechnen2;
	$("#result").text(summe.toString());
});
// Rechen Schritte

function weiterBeiZehner() {
	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;
	// Zehner
	if (zehner != 0) {
		zehnerre();
	}
	if (resteiner != 0) {
	einerrest();
	}
	// Wenn Überschlag zu Hunderter
	if (hunderterueber == 1) {
		setTimeout(function() {
			ueberschlagzehner();
			// Wenn Überschlag zu Tausender
			if (tausenderueber == 1) {
				setTimeout(function() {
					ueberschlaghunderter();
					// Wenn Überschlag zu Zehntausender
					if (zehntausenderueber == 1) {
						setTimeout(function() {
							ueberschlagtausender();
							// Einer Fertig
							setTimeout(function() {
								weiterBeiHunderter()
							}, 1500);
						}, 1500);
						// Wenn kein Überschlag zu Zehntausender
					} else {
						setTimeout(function() {
							weiterBeiHunderter()
						}, 1500);
					}
				}, 1500);
				// Wenn kein Überschlag zu Tausender
			} else {
				setTimeout(function() {
					weiterBeiHunderter()
				}, 1500);
			}
		}, 1500);
		// Wenn Überschlag zu Hunderter
	} else {
		setTimeout(function() {
			weiterBeiHunderter()
		}, 1500);
	}
}

function weiterBeiHunderter() {
	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;
	// Hunderter
	if (hunderter != 0) {
		hunderterre();
	}
	if (restzehner != 0) {
		zehnerrest();
		}
	// Wenn Überschlag zu Tausender
	if (tausenderueber == 1) {
		setTimeout(function() {
			ueberschlaghunderter();
			// Wenn Überschlag zu Zehntausender
			if (zehntausenderueber == 1) {
				setTimeout(function() {
					ueberschlagtausender();
					// Einer Fertig
					setTimeout(function() {
						weiterBeiTausender()
					}, 1500);
				}, 1500);
				// Wenn kein Überschlag zu Zehntausender
			} else {
				setTimeout(function() {
					weiterBeiTausender()
				}, 1500);
			}
		}, 1500);
		// Wenn kein Überschlag zu Tausender
	} else {
		setTimeout(function() {
			weiterBeiTausender()
		}, 1500);
	}
}

function weiterBeiTausender() {
	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;
	// Tausender
	if (tausender != 0) {
		tausenderre();
	}
	if (resthunderter != 0) {
		hunderterrest();
		}
	// Wenn Überschlag zu Zehntausender
	if (zehntausenderueber == 1) {
		setTimeout(function() {
			ueberschlagtausender();
			// Einer Fertig
			setTimeout(function() {
				weiterBeiZehntausender()
			}, 1500);
		}, 1500);
		// Wenn kein Überschlag zu Zehntausender
	} else {
		setTimeout(function() {
			weiterBeiZehntausender()
		}, 1500);
	}
}

function weiterBeiZehntausender() {
	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;
	// Zehntausender
	if (zehntausender != 0) {
		zehntausenderre();
	}
	if (resttausender != 0) {
		tausenderrest();
	}
	setTimeout(function() {
		$("#btrechne").prop('disabled', false).text("Rechne");
		$("body").removeClass('freeze');
		amrechnen=false;
	}, 1500);	
}

// Simple Rechnung
function einerre() {
	if ($("#eins").children(".stange").children(".align-img-left").length > einer) {
		for (var i = 0; i <= einer - 1; i++) {
			$("#eins").children(".stange").children(".align-img-left:last")
					.addClass("align-img-right").removeClass("align-img-left");
		}
	} else {
		zehnerueber = 1;
		resteiner = einer
				- $("#eins").children(".stange").children(".align-img-left").length;

		$("#eins").children(".stange").children(".align-img-left").addClass(
				"align-img-right").removeClass("align-img-left");
	}
}

function zehnerre() {
	if ($("#zehn").children(".stange").children(".align-img-left").length > zehner) {
		for (var i = 0; i <= zehner - 1; i++) {
			$("#zehn").children(".stange").children(".align-img-left:last")
					.addClass("align-img-right").removeClass("align-img-left");
		}
	} else {
		hunderterueber = 1;
		restzehner = zehner
				- $("#zehn").children(".stange").children(".align-img-left").length;

		$("#zehn").children(".stange").children(".align-img-left").addClass(
				"align-img-right").removeClass("align-img-left");
	}
}

function hunderterre() {
	if ($("#hundert").children(".stange").children(".align-img-left").length > hunderter) {
		for (var i = 0; i <= hunderter - 1; i++) {
			$("#hundert").children(".stange").children(".align-img-left:last")
					.addClass("align-img-right").removeClass("align-img-left");
		}
	} else {
		tausenderueber = 1;
		resthunderter = hunderter
				- $("#hundert").children(".stange").children(".align-img-left").length;

		$("#hundert").children(".stange").children(".align-img-left").addClass(
				"align-img-right").removeClass("align-img-left");
	}
}

function tausenderre() {
	if ($("#tausend").children(".stange").children(".align-img-left").length > tausender) {
		for (var i = 0; i <= tausender - 1; i++) {
			$("#tausend").children(".stange").children(".align-img-left:last")
					.addClass("align-img-right").removeClass("align-img-left");
		}
	} else {
		zehntausenderueber = 1;
		resttausender = tausender
				- $("#tausend").children(".stange").children(".align-img-left").length;

		$("#tausend").children(".stange").children(".align-img-left").addClass(
				"align-img-right").removeClass("align-img-left");
	}
}

function zehntausenderre() {
	if ($("#zehntausend").children(".stange").children(".align-img-left").length > zehntausender) {
		for (var i = 0; i <= zehntausender - 1; i++) {
			$("#zehntausend").children(".stange").children(
					".align-img-left:last").addClass("align-img-right")
					.removeClass("align-img-left");
		}
	} else {
		zehnerueber = 1;
		restzehntausender = zehntausender
				- $("#zehntausend").children(".stange").children(
						".align-img-left").length;

		$("#zehntausend").children(".stange").children(".align-img-left")
				.addClass("align-img-right").removeClass("align-img-left");
	}
}

function ueberschlageiner() {
	$("#zehn").children(".stange").children(".align-img-left:last").addClass(
			"align-img-right").removeClass("align-img-left");
	$("#eins").children(".stange").children(".align-img-right").addClass(
			"align-img-left").removeClass("align-img-right");

	if ($("#zehn").children(".stange").children(".align-img-left").length == 0) {
		hunderterueber = 1;
	}
}

function ueberschlagzehner() {
	$("#hundert").children(".stange").children(".align-img-left:last")
			.addClass("align-img-right").removeClass("align-img-left");
	$("#zehn").children(".stange").children(".align-img-right").addClass(
			"align-img-left").removeClass("align-img-right");
	if ($("#hundert").children(".stange").children(".align-img-left").length == 0) {
		tausenderueber = 1;
	}
}

function ueberschlaghunderter() {
	$("#tausend").children(".stange").children(".align-img-left:last")
			.addClass("align-img-right").removeClass("align-img-left");
	$("#hundert").children(".stange").children(".align-img-right").addClass(
			"align-img-left").removeClass("align-img-right");
	if ($("#tausend").children(".stange").children(".align-img-left").length == 0) {
		zehntausenderueber = 1;
	}
}

function ueberschlagtausender() {
	$("#zehntausend").children(".stange").children(".align-img-left:last")
			.addClass("align-img-right").removeClass("align-img-left");
	$("#tausend").children(".stange").children(".align-img-right").addClass(
			"align-img-left").removeClass("align-img-right");
}

function einerrest(){
	for (var i = 0; i <= resteiner - 1; i++) {
		$("#eins").children(".stange").children(".align-img-left:last")
				.addClass("align-img-right").removeClass("align-img-left");
	}	
}

function zehnerrest() {
		for (var i = 0; i <= restzehner - 1; i++) {
			$("#zehn").children(".stange").children(".align-img-left:last")
					.addClass("align-img-right").removeClass("align-img-left");
		}
}

function hunderterrest() {
		for (var i = 0; i <= resthunderter - 1; i++) {
			$("#hundert").children(".stange").children(".align-img-left:last")
					.addClass("align-img-right").removeClass("align-img-left");
		}
}

function tausenderrest() {
		for (var i = 0; i <= resttausender - 1; i++) {
			$("#tausend").children(".stange").children(".align-img-left:last")
					.addClass("align-img-right").removeClass("align-img-left");
		}
}
