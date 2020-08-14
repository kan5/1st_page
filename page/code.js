// new version of JS
'use strict';
history();
// processing of input data
function addition() {
	'use strict';

	// taking values from fields
	let save = document.getElementById('saveAge').checked;
	let temp = document.getElementById('temp').value;
	let age = document.getElementById('age').value;
	let cough = document.getElementById('cough').value;
	let throat = document.getElementById('throat').value;


	if (save) {
		saveAge(age);
	} else {
		saveAge('');
	}


	document.getElementById('error').innerHTML = '<br>';

	let error = false;
	let probability = 0;

	if (age == '') {
		error = true;
		exceptionEmpty('age');
	} else if (!Boolean(Number(age))) {
			error = true;
			exceptionEmpty('age');
		}

	if (temp == '') {
		error = true;
		exceptionEmpty('temp');
	} else {
		for(let i = 0; i < temp.length; i++) {
			if (temp[i] == ',') {
				temp = temp.slice(0, i) + '.' +temp.slice(i+1, temp.length);
			}
		}
		if (!Boolean(Number(temp))) {
			error = true;
			exceptionEmpty('temp');
		}
	}

	if (throat == '') {
		error = true;
		exceptionEmpty('throat');
	}

	if (cough == '') {
		error = true;
		exceptionEmpty('cough');
	}

	if (error) return document.getElementById('result').innerHTML = '';


	if (temp<36) {
		error = true;
		document.getElementById('error').innerHTML = '*либо ты умер, либо еще раз измерь температуру';
		document.getElementById('result').innerHTML = '';
	} else if (temp>40) {
		probability += 90;
	} else if (temp>37) {
		probability += 55; 
	}
	
	if (cough == 'Сухой') {
		probability = probability + 30;
	} else if (cough == 'Влажный') {
		probability = probability + 25;
	} else if (cough == 'Нет') {
		null
	} else {
		error = true;
		exceptionEmpty('throat');
	}

	if (throat == 'Першит') {
		probability = probability + 9;
	} else if (throat == 'Раздирает') {
		probability = probability + 17;
	} else if (throat == 'Нет') {
		null
	} else {
		error = true;
		exceptionEmpty('throat');
	}

	if (age>57) {
		probability = probability * 1.6;
	} else if (age>47) {
		probability = probability * 1.3;
	}

	if (error) return;

	if (probability > 99) {
		probability = 99;
	} else if (probability == 0) {
		probability = 4;
	}

	let resultText = 'Вероятность заболевания: ' + probability + '%<br><br>';
	if (probability < 50) {
		resultText += 'Скоррее всего ты здоров.';
	} else if (probability < 75) {
		resultText += 'Симптомы уже есть, обратись к врачу!';
	} else {
		resultText += 'Вызывай скорую!!!<br>Номер: 103 или 112';
	}
	document.getElementById('result').innerHTML = resultText;
}

function exceptionEmpty(pole) {
	let a = document.getElementById('error').innerHTML;
	if (pole == 'age') {
		a = a + '*значение Возраста некорректно<br>';
	}
	if (pole == 'temp') {
		a = a + '*значение Температуры некорректно<br>';
	}
	if (pole == 'throat') {
		a = a + '*значение Боли в горле некорректно<br>';
	}
	if (pole == 'cough') {
		a = a + '*значение Наличия кашля некорректно<br>';
	}
	document.getElementById('error').innerHTML = a;
}


function ref() {
	document.getElementById('age').value = '';
	document.getElementById('temp').value = '';
	document.getElementById('throat').value = '';
	document.getElementById('cough').value = '';
}


function saveAge(val) {
	let is = (val != ''); 
	let save_data = {
	        age: val,
	        checked: is
	      }	
	let json = JSON.stringify(save_data);
	localStorage.setItem('save_data', json);
}


function history() {
	try {
		let retrievedObject = JSON.parse(localStorage.getItem('save_data'));
		document.getElementById('age').value = retrievedObject.age;
		document.getElementById('saveAge').checked = retrievedObject.checked;
	} catch (e) {
		null;
	}
}