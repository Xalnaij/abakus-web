var summe = 0;
var rechnen = 0;
var amrechnen = false;

$(document).ready(function() {
	$("#result").text(summe.toString());
});

$(".stange").on(
		'click',
		'.align-img-left',
		function() {
			// Einfrieren aller Events im Body
			einfrieren()
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
			if (amrechnen == false) {
				releasen();
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
			einfrieren()
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
			if (amrechnen == false) {
				releasen();
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

var resteiner = 0;
var restzehner = 0;
var resthunderter = 0;
var resttausender = 0;

// Eingabe benutzen
$("#btrechne")
		.on(
				'click',
				function() {
					einfrieren();
					amrechnen = true;

					einer = 0;
					zehner = 0;
					hunderter = 0;
					tausender = 0;
					zehntausender = 0;
					
					resteiner = 0;
					restzehner = 0;
					resthunderter = 0;
					resttausender = 0;
					
					zehnerueber = 0;
					hunderterueber = 0;
					tausenderueber = 0;
					zehntausenderueber = 0;
					
					var recheneingabe2 = $("#optext").val();
					rechnen = recheneingabe2.substring(1, recheneingabe2.length);
					var rechnen2 = parseInt(rechnen);
					var ziffern = rechnen.split("");
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


					
					if (recheneingabe2.charAt(0) == "+") {					
					weiterBeiEiner();
					summe += rechnen2;
					}else{
					weiterBeiEinerMinus();
					summe -= rechnen2;	
					}
					
					$("#result").text(summe.toString());
				});
// Rechen Schritte Plus

function weiterBeiEiner(){
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
		setTimeout(
				function() {
					ueberschlageiner();
					// Wenn Überschlag zu Hunderter
					if (hunderterueber == 1) {
						setTimeout(
								function() {
									ueberschlagzehner();
									// Wenn Überschlag zu
									// Tausender
									if (tausenderueber == 1) {
										setTimeout(
												function() {
													ueberschlaghunderter();
													// Wenn
													// Überschlag
													// zu
													// Zehntausender
													if (zehntausenderueber == 1) {
														setTimeout(
																function() {
																	ueberschlagtausender();
																	// Einer
																	// Fertig
																	setTimeout(
																			function() {
																				if (zehner == 0
																						&& resteiner == 0) {
																					if (hunderter == 0
																							&& restzehner == 0) {
																						if (tausender == 0
																								&& resthunderter == 0) {
																							if (zehntausender == 0
																									&& resttausender == 0) {
																								releasen();
																							} else {
																								weiterBeiZehntausender()
																							}
																						} else {
																							weiterBeiTausender()
																						}
																					} else {
																						weiterBeiHunderter()
																					}
																				} else {
																					weiterBeiZehner()
																				}
																			},
																			1500);
																},
																1500);
														// Wenn
														// kein
														// Überschlag
														// zu
														// Zehntausender
													} else {
														setTimeout(
																function() {
																	if (zehner == 0
																			&& resteiner == 0) {
																		if (hunderter == 0
																				&& restzehner == 0) {
																			if (tausender == 0
																					&& resthunderter == 0) {
																				if (zehntausender == 0
																						&& resttausender == 0) {
																					releasen();
																				} else {
																					weiterBeiZehntausender()
																				}
																			} else {
																				weiterBeiTausender()
																			}
																		} else {
																			weiterBeiHunderter()
																		}
																	} else {
																		weiterBeiZehner()
																	}
																},
																1500);
													}
												}, 1500);
										// Wenn kein Überschlag
										// zu Tausender
									} else {
										setTimeout(
												function() {
													if (zehner == 0
															&& resteiner == 0) {
														if (hunderter == 0
																&& restzehner == 0) {
															if (tausender == 0
																	&& resthunderter == 0) {
																if (zehntausender == 0
																		&& resttausender == 0) {
																	releasen();
																} else {
																	weiterBeiZehntausender()
																}
															} else {
																weiterBeiTausender()
															}
														} else {
															weiterBeiHunderter()
														}
													} else {
														weiterBeiZehner()
													}
												}, 1500);
									}
								}, 1500);
						// Wenn Überschlag zu Hunderter
					} else {
						setTimeout(
								function() {
									if (zehner == 0
											&& resteiner == 0) {
										if (hunderter == 0
												&& restzehner == 0) {
											if (tausender == 0
													&& resthunderter == 0) {
												if (zehntausender == 0
														&& resttausender == 0) {
													releasen();
												} else {
													weiterBeiZehntausender()
												}
											} else {
												weiterBeiTausender()
											}
										} else {
											weiterBeiHunderter()
										}
									} else {
										weiterBeiZehner()
									}
								}, 1500);
					}
				}, 1500);
		// Wenn kein Überschlag zu Zehner
	} else {
		setTimeout(function() {
			if (zehner == 0 && resteiner == 0) {
				if (hunderter == 0 && restzehner == 0) {
					if (tausender == 0 && resthunderter == 0) {
						if (zehntausender == 0
								&& resttausender == 0) {
							releasen();
						} else {
							weiterBeiZehntausender()
						}
					} else {
						weiterBeiTausender()
					}
				} else {
					weiterBeiHunderter()
				}
			} else {
				weiterBeiZehner()
			}
		}, 1500);
	}	
}

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
								if (hunderter == 0 && restzehner == 0) {
									if (tausender == 0 && resthunderter == 0) {
										if (zehntausender == 0
												&& resttausender == 0) {
											releasen();
										} else {
											weiterBeiZehntausender()
										}
									} else {
										weiterBeiTausender()
									}
								} else {
									weiterBeiHunderter()
								}
							}, 1500);
						}, 1500);
						// Wenn kein Überschlag zu Zehntausender
					} else {
						setTimeout(function() {
							if (hunderter == 0 && restzehner == 0) {
								if (tausender == 0 && resthunderter == 0) {
									if (zehntausender == 0
											&& resttausender == 0) {
										releasen();
									} else {
										weiterBeiZehntausender()
									}
								} else {
									weiterBeiTausender()
								}
							} else {
								weiterBeiHunderter()
							}
						}, 1500);
					}
				}, 1500);
				// Wenn kein Überschlag zu Tausender
			} else {
				setTimeout(function() {
					if (hunderter == 0 && restzehner == 0) {
						if (tausender == 0 && resthunderter == 0) {
							if (zehntausender == 0 && resttausender == 0) {
								releasen();
							} else {
								weiterBeiZehntausender()
							}
						} else {
							weiterBeiTausender()
						}
					} else {
						weiterBeiHunderter()
					}
				}, 1500);
			}
		}, 1500);
		// Wenn Überschlag zu Hunderter
	} else {
		setTimeout(function() {
			if (hunderter == 0 && restzehner == 0) {
				if (tausender == 0 && resthunderter == 0) {
					if (zehntausender == 0 && resttausender == 0) {
						releasen();
					} else {
						weiterBeiZehntausender()
					}
				} else {
					weiterBeiTausender()
				}
			} else {
				weiterBeiHunderter()
			}
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
						if (tausender == 0 && resthunderter == 0) {
							if (zehntausender == 0 && resttausender == 0) {
								releasen();
							} else {
								weiterBeiZehntausender()
							}
						} else {
							weiterBeiTausender()
						}
					}, 1500);
				}, 1500);
				// Wenn kein Überschlag zu Zehntausender
			} else {
				setTimeout(function() {
					if (tausender == 0 && resthunderter == 0) {
						if (zehntausender == 0 && resttausender == 0) {
							releasen();
						} else {
							weiterBeiZehntausender()
						}
					} else {
						weiterBeiTausender()
					}
				}, 1500);
			}
		}, 1500);
		// Wenn kein Überschlag zu Tausender
	} else {
		setTimeout(function() {
			if (tausender == 0 && resthunderter == 0) {
				if (zehntausender == 0 && resttausender == 0) {
					releasen();
				} else {
					weiterBeiZehntausender()
				}
			} else {
				weiterBeiTausender()
			}
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
				if (zehntausender == 0 && resttausender == 0) {
					releasen();
				} else {
					weiterBeiZehntausender()
				}
			}, 1500);
		}, 1500);
		// Wenn kein Überschlag zu Zehntausender
	} else {
		setTimeout(function() {
			if (zehntausender == 0 && resttausender == 0) {
				releasen();
			} else {
				weiterBeiZehntausender()
			}
		}, 1500);
	}
}

function weiterBeiZehntausender() {
	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;
	// Zehntausender
	zehntausenderre();
	if (resttausender != 0) {
		tausenderrest();
	}
	setTimeout(function() {
		releasen();
	}, 1500);
}

//Rechen Schritte Minus

function weiterBeiEinerMinus(){
	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;

	// Einer
	if (einer != 0) {
		einerreminus();
	}
	// Wenn Überschlag zu Zehner
	if (zehnerueber == 1) {
		setTimeout(
				function() {
					ueberschlageinerminus();
					// Wenn Überschlag zu Hunderter
					if (hunderterueber == 1) {
						setTimeout(
								function() {
									ueberschlagzehnerminus();
									// Wenn Überschlag zu
									// Tausender
									if (tausenderueber == 1) {
										setTimeout(
												function() {
													ueberschlaghunderterminus();
													// Wenn
													// Überschlag
													// zu
													// Zehntausender
													if (zehntausenderueber == 1) {
														setTimeout(
																function() {
																	ueberschlagtausenderminus();
																	// Einer
																	// Fertig
																	setTimeout(
																			function() {
																				if (zehner == 0
																						&& resteiner == 0) {
																					if (hunderter == 0
																							&& restzehner == 0) {
																						if (tausender == 0
																								&& resthunderter == 0) {
																							if (zehntausender == 0
																									&& resttausender == 0) {
																								releasen();
																							} else {
																								weiterBeiZehntausenderMinus()
																							}
																						} else {
																							weiterBeiTausenderMinus()
																						}
																					} else {
																						weiterBeiHunderterMinus()
																					}
																				} else {
																					weiterBeiZehnerMinus()
																				}
																			},
																			1500);
																},
																1500);
														// Wenn
														// kein
														// Überschlag
														// zu
														// Zehntausender
													} else {
														setTimeout(
																function() {
																	if (zehner == 0
																			&& resteiner == 0) {
																		if (hunderter == 0
																				&& restzehner == 0) {
																			if (tausender == 0
																					&& resthunderter == 0) {
																				if (zehntausender == 0
																						&& resttausender == 0) {
																					releasen();
																				} else {
																					weiterBeiZehntausenderMinus()
																				}
																			} else {
																				weiterBeiTausenderMinus()
																			}
																		} else {
																			weiterBeiHunderterMinus()
																		}
																	} else {
																		weiterBeiZehnerMinus()
																	}
																},
																1500);
													}
												}, 1500);
										// Wenn kein Überschlag
										// zu Tausender
									} else {
										setTimeout(
												function() {
													if (zehner == 0
															&& resteiner == 0) {
														if (hunderter == 0
																&& restzehner == 0) {
															if (tausender == 0
																	&& resthunderter == 0) {
																if (zehntausender == 0
																		&& resttausender == 0) {
																	releasen();
																} else {
																	weiterBeiZehntausenderMinus()
																}
															} else {
																weiterBeiTausenderMinus()
															}
														} else {
															weiterBeiHunderterMinus()
														}
													} else {
														weiterBeiZehnerMinus()
													}
												}, 1500);
									}
								}, 1500);
						// Wenn Überschlag zu Hunderter
					} else {
						setTimeout(
								function() {
									if (zehner == 0
											&& resteiner == 0) {
										if (hunderter == 0
												&& restzehner == 0) {
											if (tausender == 0
													&& resthunderter == 0) {
												if (zehntausender == 0
														&& resttausender == 0) {
													releasen();
												} else {
													weiterBeiZehntausenderMinus()
												}
											} else {
												weiterBeiTausenderMinus()
											}
										} else {
											weiterBeiHunderterMinus()
										}
									} else {
										weiterBeiZehnerMinus()
									}
								}, 1500);
					}
				}, 1500);
		// Wenn kein Überschlag zu Zehner
	} else {
		setTimeout(function() {
			if (zehner == 0 && resteiner == 0) {
				if (hunderter == 0 && restzehner == 0) {
					if (tausender == 0 && resthunderter == 0) {
						if (zehntausender == 0
								&& resttausender == 0) {
							releasen();
						} else {
							weiterBeiZehntausenderMinus()
						}
					} else {
						weiterBeiTausenderMinus()
					}
				} else {
					weiterBeiHunderterMinus()
				}
			} else {
				weiterBeiZehnerMinus()
			}
		}, 1500);
	}	
}

function weiterBeiZehnerMinus() {
	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;
	// Zehner
	if (zehner != 0) {
		zehnerreminus();
	}
	if (resteiner != 0) {
		einerrestminus();
	}
	// Wenn Überschlag zu Hunderter
	if (hunderterueber == 1) {
		setTimeout(function() {
			ueberschlagzehnerminus();
			// Wenn Überschlag zu Tausender
			if (tausenderueber == 1) {
				setTimeout(function() {
					ueberschlaghunderterminus();
					// Wenn Überschlag zu Zehntausender
					if (zehntausenderueber == 1) {
						setTimeout(function() {
							ueberschlagtausenderminus();
							// Einer Fertig
							setTimeout(function() {
								if (hunderter == 0 && restzehner == 0) {
									if (tausender == 0 && resthunderter == 0) {
										if (zehntausender == 0
												&& resttausender == 0) {
											releasen();
										} else {
											weiterBeiZehntausenderMinus()
										}
									} else {
										weiterBeiTausenderMinus()
									}
								} else {
									weiterBeiHunderterMinus()
								}
							}, 1500);
						}, 1500);
						// Wenn kein Überschlag zu Zehntausender
					} else {
						setTimeout(function() {
							if (hunderter == 0 && restzehner == 0) {
								if (tausender == 0 && resthunderter == 0) {
									if (zehntausender == 0
											&& resttausender == 0) {
										releasen();
									} else {
										weiterBeiZehntausenderMinus()
									}
								} else {
									weiterBeiTausenderMinus()
								}
							} else {
								weiterBeiHunderterMinus()
							}
						}, 1500);
					}
				}, 1500);
				// Wenn kein Überschlag zu Tausender
			} else {
				setTimeout(function() {
					if (hunderter == 0 && restzehner == 0) {
						if (tausender == 0 && resthunderter == 0) {
							if (zehntausender == 0 && resttausender == 0) {
								releasen();
							} else {
								weiterBeiZehntausenderMinus()
							}
						} else {
							weiterBeiTausenderMinus()
						}
					} else {
						weiterBeiHunderterMinus()
					}
				}, 1500);
			}
		}, 1500);
		// Wenn Überschlag zu Hunderter
	} else {
		setTimeout(function() {
			if (hunderter == 0 && restzehner == 0) {
				if (tausender == 0 && resthunderter == 0) {
					if (zehntausender == 0 && resttausender == 0) {
						releasen();
					} else {
						weiterBeiZehntausenderMinus()
					}
				} else {
					weiterBeiTausenderMinus()
				}
			} else {
				weiterBeiHunderterMinus()
			}
		}, 1500);
	}
}

function weiterBeiHunderterMinus() {
	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;
	// Hunderter
	if (hunderter != 0) {
		hunderterreminus();
	}
	if (restzehner != 0) {
		zehnerrestminus();
	}
	// Wenn Überschlag zu Tausender
	if (tausenderueber == 1) {
		setTimeout(function() {
			ueberschlaghunderterminus();
			// Wenn Überschlag zu Zehntausender
			if (zehntausenderueber == 1) {
				setTimeout(function() {
					ueberschlagtausenderminus();
					// Einer Fertig
					setTimeout(function() {
						if (tausender == 0 && resthunderter == 0) {
							if (zehntausender == 0 && resttausender == 0) {
								releasen();
							} else {
								weiterBeiZehntausenderMinus()
							}
						} else {
							weiterBeiTausenderMinus()
						}
					}, 1500);
				}, 1500);
				// Wenn kein Überschlag zu Zehntausender
			} else {
				setTimeout(function() {
					if (tausender == 0 && resthunderter == 0) {
						if (zehntausender == 0 && resttausender == 0) {
							releasen();
						} else {
							weiterBeiZehntausenderMinus()
						}
					} else {
						weiterBeiTausenderMinus()
					}
				}, 1500);
			}
		}, 1500);
		// Wenn kein Überschlag zu Tausender
	} else {
		setTimeout(function() {
			if (tausender == 0 && resthunderter == 0) {
				if (zehntausender == 0 && resttausender == 0) {
					releasen();
				} else {
					weiterBeiZehntausenderMinus()
				}
			} else {
				weiterBeiTausenderMinus()
			}
		}, 1500);
	}
}

function weiterBeiTausenderMinus() {
	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;
	// Tausender
	if (tausender != 0) {
		tausenderreminus();
	}
	if (resthunderter != 0) {
		hunderterrestminus();
	}
	// Wenn Überschlag zu Zehntausender
	if (zehntausenderueber == 1) {
		setTimeout(function() {
			ueberschlagtausenderminus();
			// Einer Fertig
			setTimeout(function() {
				if (zehntausender == 0 && resttausender == 0) {
					releasen();
				} else {
					weiterBeiZehntausenderMinus()
				}
			}, 1500);
		}, 1500);
		// Wenn kein Überschlag zu Zehntausender
	} else {
		setTimeout(function() {
			if (zehntausender == 0 && resttausender == 0) {
				releasen();
			} else {
				weiterBeiZehntausenderMinus()
			}
		}, 1500);
	}
}

function weiterBeiZehntausenderMinus() {
	zehnerueber = 0;
	hunderterueber = 0;
	tausenderueber = 0;
	zehntausenderueber = 0;
	// Zehntausender
	zehntausenderreminus();
	if (resttausender != 0) {
		tausenderrestminus();
	}
	setTimeout(function() {
		releasen();
	}, 1500);
}


// Simple Rechnungen Plus
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

function einerrest() {
	for (var i = 0; i <= resteiner - 1; i++) {
		$("#eins").children(".stange").children(".align-img-left:last")
				.addClass("align-img-right").removeClass("align-img-left");
	}
	resteiner = 0;
}

function zehnerrest() {
	for (var i = 0; i <= restzehner - 1; i++) {
		$("#zehn").children(".stange").children(".align-img-left:last")
				.addClass("align-img-right").removeClass("align-img-left");
	}
	restzehner = 0;
}

function hunderterrest() {
	for (var i = 0; i <= resthunderter - 1; i++) {
		$("#hundert").children(".stange").children(".align-img-left:last")
				.addClass("align-img-right").removeClass("align-img-left");
	}
	resthunderter = 0;
}

function tausenderrest() {
	for (var i = 0; i <= resttausender - 1; i++) {
		$("#tausend").children(".stange").children(".align-img-left:last")
				.addClass("align-img-right").removeClass("align-img-left");
	}
	resttausender = 0;
}

//Simple Rechnungen Minus
function einerreminus() {
	if ($("#eins").children(".stange").children(".align-img-right").length > einer-1) {
		for (var i = 0; i <= einer - 1; i++) {
			$("#eins").children(".stange").children(".align-img-right:first")
					.addClass("align-img-left").removeClass("align-img-right");
		}
	} else {
		zehnerueber = 1;
		resteiner += einer
				- $("#eins").children(".stange").children(".align-img-right").length;

		$("#eins").children(".stange").children(".align-img-right").addClass(
				"align-img-left").removeClass("align-img-right");
	}
}

function zehnerreminus() {
	if ($("#zehn").children(".stange").children(".align-img-right").length > zehner-1) {
		for (var i = 0; i <= zehner - 1; i++) {
			$("#zehn").children(".stange").children(".align-img-right:first")
					.addClass("align-img-left").removeClass("align-img-right");
		}
	} else {
		hunderterueber = 1;
		restzehner += zehner
				- $("#zehn").children(".stange").children(".align-img-right").length;

		$("#zehn").children(".stange").children(".align-img-right").addClass(
				"align-img-left").removeClass("align-img-right");
	}
}

function hunderterreminus() {
	if ($("#hundert").children(".stange").children(".align-img-right").length > hunderter-1) {
		for (var i = 0; i <= hunderter - 1; i++) {
			$("#hundert").children(".stange").children(".align-img-right:first")
					.addClass("align-img-left").removeClass("align-img-right");
		}
	} else {
		tausenderueber = 1;
		resthunderter += hunderter
				- $("#hundert").children(".stange").children(".align-img-right").length;

		$("#hundert").children(".stange").children(".align-img-right").addClass(
				"align-img-left").removeClass("align-img-right");
	}
}

function tausenderreminus() {
	if ($("#tausend").children(".stange").children(".align-img-right").length > tausender-1) {
		for (var i = 0; i <= tausender - 1; i++) {
			$("#tausend").children(".stange").children(".align-img-right:first")
					.addClass("align-img-left").removeClass("align-img-right");
		}
	} else {
		zehntausenderueber += 1;
		resttausender += tausender
				- $("#tausend").children(".stange").children(".align-img-right").length;

		$("#tausend").children(".stange").children(".align-img-right").addClass(
				"align-img-left").removeClass("align-img-right");
	}
}

function zehntausenderreminus() {
	if ($("#zehntausend").children(".stange").children(".align-img-right").length > zehntausender) {
		for (var i = 0; i <= zehntausender - 1; i++) {
			$("#zehntausend").children(".stange").children(
					".align-img-right:first").addClass("align-img-left")
					.removeClass("align-img-right");
		}
	} else {
		zehnerueber = 1;
		restzehntausender = zehntausender
				- $("#zehntausend").children(".stange").children(
						".align-img-right").length;

		$("#zehntausend").children(".stange").children(".align-img-right")
				.addClass("align-img-left").removeClass("align-img-right");
	}
}

function ueberschlageinerminus() {
	if ($("#zehn").children(".stange").children(".align-img-right").length == 0) {
		restzehner += 1;
	}else{
		$("#zehn").children(".stange").children(".align-img-right:first")
		.addClass("align-img-left").removeClass("align-img-right");		
	}
	$("#eins").children(".stange").children(".align-img-left").addClass(
			"align-img-right").removeClass("align-img-left");

	if ($("#zehn").children(".stange").children(".align-img-right").length == 0) {
		hunderterueber = 1;
	}
}

function ueberschlagzehnerminus() {
	if ($("#hundert").children(".stange").children(".align-img-right").length == 0) {
		resthunderter += 1;
	}else{
		$("#hundert").children(".stange").children(".align-img-right:first")
		.addClass("align-img-left").removeClass("align-img-right");		
	}

	$("#zehn").children(".stange").children(".align-img-left").addClass(
			"align-img-right").removeClass("align-img-left");
	if ($("#hundert").children(".stange").children(".align-img-right").length == 0) {
		tausenderueber = 1;
	}
}

function ueberschlaghunderterminus() {
	if ($("#tausend").children(".stange").children(".align-img-right").length == 0) {
		resttausender += 1;
	}else{
		$("#tausend").children(".stange").children(".align-img-right:first")
		.addClass("align-img-left").removeClass("align-img-right");		
	}
	$("#hundert").children(".stange").children(".align-img-left").addClass(
			"align-img-right").removeClass("align-img-left");
	if ($("#tausend").children(".stange").children(".align-img-right").length == 0) {
		zehntausenderueber = 1;
	}
}

function ueberschlagtausenderminus() {
	$("#zehntausend").children(".stange").children(".align-img-right:first")
			.addClass("align-img-left").removeClass("align-img-right");
	$("#tausend").children(".stange").children(".align-img-left").addClass(
			"align-img-right").removeClass("align-img-left");
}

function einerrestminus() {
	for (var i = 0; i <= resteiner-1; i++) {
		$("#eins").children(".stange").children(".align-img-right:first")
				.addClass("align-img-left").removeClass("align-img-right");


	}
	resteiner = 0;
}

function zehnerrestminus() {
	for (var i = 0; i <= restzehner-1; i++) {
		$("#zehn").children(".stange").children(".align-img-right:first")
				.addClass("align-img-left").removeClass("align-img-right");



	}
	restzehner = 0;
}

function hunderterrestminus() {
	for (var i = 0; i <= resthunderter-1; i++) {
		$("#hundert").children(".stange").children(".align-img-right:first")
				.addClass("align-img-left").removeClass("align-img-right");



	}
	resthunderter = 0;
}

function tausenderrestminus() {
	for (var i = 0; i <= resttausender-1; i++) {
		$("#tausend").children(".stange").children(".align-img-right:first")
				.addClass("align-img-left").removeClass("align-img-right");


	}
	resttausender = 0;
}






function releasen() {
	$("#btrechne").prop('disabled', false).text("Rechne");
	$("body").removeClass('freeze');
	amrechnen = false;
}

function einfrieren() {
	$("#btrechne").prop('disabled', true).text("...");
	$("body").addClass('freeze');
}