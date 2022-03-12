document.addEventListener('DOMContentLoaded', function () {
	var btnSubmit = document.getElementById('btn-submit');
	var txtName = document.forms['employee-form']['name'];
	var txtSalary = document.forms['employee-form']['salary'];




	var url_string = window.location.href.toLowerCase();
	var url = new URL(url_string);
	var id = url.searchParams.get('id');
	var isEdit = false;
	if (id != undefined && id.length > 0) {
		isEdit = true;
		let xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = function () {
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
				var data = JSON.parse(xmlHttpRequest.responseText);
				txtName.value = data.name;
				txtSalary.value = data.salary;

			}
		};
		xmlHttpRequest.open(
			'get',
			'http://localhost:8088/api/employees/' + id,
			false
		);
		xmlHttpRequest.send();
	}


	btnSubmit.onclick = function () {
		var name = txtName.value;
		var salary = txtSalary.value;


		var dataToSend = {
			name: name,
			salary: salary,

		};



		var method = 'post';
		var url = 'http://localhost:8088/api/employees';
		var successStatus = 201;
		if (isEdit) {
			method = 'put';
			url = `${url}/${id}`;
			successStatus = 200;
		}

		var xmlHttpRequest = new XMLHttpRequest();

		xmlHttpRequest.onreadystatechange = function () {

			if (
				xmlHttpRequest.readyState == 4 &&
				xmlHttpRequest.status == successStatus
			) {
				alert('Create employee information success!');
				window.location.href = 'index.html';
			}
		};
		xmlHttpRequest.open(method, url, false);
		// sửa kiểu dữ liệu gửi lên có định dang json, phải đứng sau hàm open
		xmlHttpRequest.setRequestHeader('Content-Type', 'application/json');
		xmlHttpRequest.send(JSON.stringify(dataToSend)); // gửi dữ liệu ở định dạng json.
	};
});

