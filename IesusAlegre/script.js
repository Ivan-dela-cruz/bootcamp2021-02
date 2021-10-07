import data from './dataModel.json' assert { type: "json" };
    
    if(localStorage.getItem('dataJson') == null){
        localStorage.setItem('dataJson', JSON.stringify(data));
    }

    let dataFromDB = JSON.parse(localStorage.getItem('dataJson'));
    
    let tabla = document.getElementById('dataTable');
    let tableBody = tabla.getElementsByTagName('tbody')[0];

    const loadTable = (source) => {
        tableBody.innerHTML = "";
        source.forEach((element, index) => {
            let row = document.createElement('tr');
            let updBtn = document.createElement('button');
            let delBtn = document.createElement('button');
            delBtn.setAttribute('id', `delete`);
            updBtn.setAttribute('id', 'update');
            delBtn.setAttribute('record-id', index);
            updBtn.setAttribute('record-id', index);
            delBtn.innerHTML = "Eliminar"
            updBtn.innerHTML = "Actualizar"
            for (const property in element) {
                let cell = document.createElement('td');
                cell.innerHTML = element[property];
                row.appendChild(cell);
            }
            let cellActions = row.insertCell();
            cellActions.appendChild(updBtn);
            cellActions.appendChild(delBtn);
            tableBody.appendChild(row);
        })
    }

    loadTable(dataFromDB);
    const form = document.querySelector('#myForm');

    function dataFromForm() {
        const name = document.getElementById('name');
        const age = document.getElementById('age');
        const job = document.getElementById('job');
        const salary = document.getElementById('salary');
        return {name: name.value, age: age.value, job: job.value, salary: salary.value};
    }

    function clearForm() {
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('job').value = '';
        document.getElementById('salary').value = '';
    }

    const create = (data) => {
        dataFromDB.push(data);
        localStorage.setItem('dataJson', JSON.stringify(dataFromDB));
        clearForm();
    }

    const erase = (index) => {
        dataFromDB.splice(index,1);
        localStorage.setItem('dataJson', JSON.stringify(dataFromDB));
    }

    document.querySelector('#createBtn').addEventListener('click', (e) => {
        e.preventDefault();
        create(dataFromForm());
        loadTable(dataFromDB);
    });

    tabla.addEventListener('click', function(e){
        let event = e.target;
        let record = event.getAttribute('record-id');
        let action = event.getAttribute('id')
        if(event.nodeName === 'BUTTON'){
            if(action === 'delete'){
                erase(record);
            }else if (action === 'update'){
                console.log(dataFromDB[record]);
            }
        };
        loadTable(dataFromDB);
    })
