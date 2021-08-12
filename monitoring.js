(function() {

	if(Notification.permission != "granted"){
		Notification.requestPermission();
	}

	let qtdClassInitial = document.getElementsByClassName("listaDetalhada").length;

	let context,
		oscillator,
	  contextGain;

	function start(){
		context = new AudioContext();
		oscillator = context.createOscillator();
		contextGain = context.createGain();
	  
		oscillator.connect(contextGain);
		contextGain.gain.value = 6
		contextGain.connect(context.destination);	
		oscillator.start(0);
	}

	function stop(){
	  start();
	  contextGain.gain.exponentialRampToValueAtTime(
		0.00001, context.currentTime + 2
		)
	}

	function notifyMe() {
		var notification = new Notification('ATENÇÃO!!!', {
			body: 'Um novo chamado acabou de chegar na fila'
		});
		setTimeout(() => {
			notification.close()
		}, 5000);
	}

	function monitoring(){
		var qtdClassMonit = document.getElementsByClassName("listaDetalhada").length;
		if (qtdClassMonit > qtdClassInitial) {
			stop();
			notifyMe();
			qtdClassInitial = qtdClassMonit;
		} else {
			if (qtdClassMonit < qtdClassInitial) {
				qtdClassInitial = qtdClassMonit;
			}
		}
	}

	setInterval(monitoring, 5000); 

})();
