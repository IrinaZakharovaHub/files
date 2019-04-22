function RepeatingFill(name, val) {
	  	//var prop = CommunicateEmbedded.getData(name) || '';
	  	var prop = localStorage.getItem(name) || '';
	  	var arr = [];
	  	if (prop !== '') {
	  		arr.push(prop);
	  	}
	  	arr.push(val);
	  	var newData = arr.join(' $ ');

	  	//CommunicateEmbedded.setData(name, newData);
	  	localStorage.setItem(name, newData);
	  	CommunicateEmbedded.fillQuestionary(name, newData);
}