
const host = 'http://localhost:3000/';
const addButton = document.querySelector('#addButton');
const nameElem = document.querySelector('#name');
const cityElem = document.querySelector('#city');
const salaryElem = document.querySelector('#salary');
const tableBody = document.querySelector('#tableBody');

const saveButton = document.querySelector('#saveButton');
const editId = document.querySelector('#editId');
const editName = document.querySelector('#editname');
const editCity = document.querySelector('#editcity');
const editSalaryElem = document.querySelector('#editsalary');

var actualTr = null;

addButton.addEventListener('click', () => {
    const name = nameElem.value;
    const city = cityElem.value;
    const salary = salaryElem.value;
    addEmployee(name, city, salary);
});

getEmployees();

function getEmployees() {
    tableBody.innerHTML = "";
    let endpoint = "employees";
    let url = host + endpoint;
    fetch(url)
    .then(res => res.json())
    .then(res => {
        // console.log(res);
        renderEmployees(res);
    });
}

function renderEmployees(employees) {
    employees.forEach( employee => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCity = document.createElement('td');
        let tdSalary = document.createElement('td');

        let tdDelete = document.createElement('td');
        let delButton = document.createElement('button');

        delButton.classList.add("btn");
        delButton.classList.add("btn-primary");

        delButton.innerHTML = 'Törlés <i class="bi bi-trash"></i>';
        setEvent(delButton, employee.id);
        tdDelete.appendChild(delButton);

        //szekeztes
        let tdEdit = document.createElement('td');
        let editButton = document.createElement('button');

        editButton.classList.add("btn");
        editButton.classList.add("btn-primary");

        setEditButtonEvent(editButton, employee);
        editButton.textContent = "Szerkeztés";
        tdEdit.appendChild(editButton);

        tableBody.appendChild(tr);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdCity);
        tr.appendChild(tdSalary);
        tr.appendChild(tdDelete);
        tr.appendChild(tdEdit);
        tdId.textContent = employee.id;
        tdName.textContent = employee.name;
        tdCity.textContent = employee.city;
        tdSalary.textContent = employee.salary;
        console.log(employee.city);
    });
}

function setEvent(delButton, id) {
    // delButton.setAttribute('data-id', id);
    delButton.addEventListener('click', () => {
        // console.log(delButton.dataset.id);
        
        delEmplyoee(id);
        actualTr = delButton.parentElement.parentElement;
        actualTr.parentNode.removeChild(actualTr);
    });
}

function delEmplyoee(id) {

    let endpoint = "employees";
    let url = host + endpoint + '/' +id;
    //console.log(url2);
    fetch(url, {
        method: 'delete'
    });
}
 function setEditButtonEvent(editButton,employee){
    editButton.addEventListener( 'click' , () => {
        console.log(employee.name);
        editId.value = employee.id;
        editName.value = employee.name;
        editCity.value = employee.city;
        editSalaryElem.value = employee.salary;
        actualTr = editButton.parentElement.parentElement;
    });
}
saveButton.addEventListener('click',() => {
    console.log('Mentés');
    actualTr.childNodes[1].textContent = editName.value;
    actualTr.childNodes[2].textContent = editCity.value;
    actualTr.childNodes[3].textContent = editSalaryElem.value;

    updateEmployee();

    editId.value  = '';
    editName.value  = '';
    editCity.value  = '';
    editSalaryElem.value  = '';

});
    function updateEmployee(){
        let endpoint = 'employees';
        let url = host + endpoint + '/' + editId.value;
        fetch(url, {
            method: 'put',
            body: JSON.stringify({
                name:  editName.value,
                city:  editCity.value,
                salary:  editSalaryElem.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res =>{
            console.log(res);
        });
    }

    function addEmployee(name, city, salary) {
        let endpoint = "employees";
        let url = host + endpoint;
        fetch(url, {
            method: "post",
            body: JSON.stringify({
                name: name,
                city: city,
                salary: salary
            }),
            headers: {
                "Content-Type": "application/json"
            }
            })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        });
        getEmployees();
}
