const empForm = document.getElementById('EmployeeForm');
const empName = document.getElementById('name');
const empRole = document.getElementById('role');
const empStatus = document.getElementById('status');
const empSalary = document.getElementById('salary');
const empMessageName = document.querySelector('.name-message span');
const empMessageRole = document.querySelector('.role-message span');
const empMessageStatus = document.querySelector('.status-message span');
const empMessageSalary = document.querySelector('.salary-message span');
const employees = [];
const trashEmps = [];
const trashbtn = document.getElementById('show-trash');

const empTable = document.getElementById('employee-list');

empForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = empName.value.trim();
    const role = empRole.value.trim();
    const status = empStatus.value.trim();
    const salary = empSalary.value.trim();

    // Clear previous messages
    empMessageName.textContent = '';
    empMessageRole.textContent = '';
    empMessageStatus.textContent = '';
    document.querySelector('.message span').textContent = '';
    document.querySelector('.message').classList.remove('success');

    let isValid = true;

    // Name validation
    if (name === '') {
        empMessageName.textContent = 'Name is required';
        empMessageName.classList.add('error');
        isValid = false;
    } else if (name.length < 3) {
        empMessageName.textContent = 'Name must be at least 3 characters long';
        empMessageName.classList.add('error');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        empMessageName.textContent = 'Name must contain only letters and spaces';
        empMessageName.classList.add('error');
        isValid = false;
    }

    // Role validation
    if (role === '') {
        empMessageRole.textContent = 'Role is required';
        empMessageRole.classList.add('error');
        isValid = false;
    } else if (role.length < 3) {
        empMessageRole.textContent = 'Role must be at least 3 characters long';
        empMessageRole.classList.add('error');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(role)) {
        empMessageRole.textContent = 'Role must contain only letters and spaces';
        empMessageRole.classList.add('error');
        isValid = false;
    }

    // Status validation
    if (status === '') {
        empMessageStatus.textContent = 'Status is required';
        empMessageStatus.classList.add('error');
        isValid = false;
    }
    // Salary validation
    if (salary === '') {
        empMessageSalary.textContent = 'Salary is required';
        empMessageSalary.classList.add('error');
        isValid = false;

    }
    else if (isNaN(salary)) {
        empMessageSalary.textContent = 'Salary must be a number';
        empMessageSalary.classList.add('error');
        isValid = false;

    }
    
    else if ( salary <= 0) {
        empMessageSalary.textContent = 'Salary must be a positive number';
        empMessageSalary.classList.add('error');
        isValid = false;
    }

    // Success
    if (isValid) {
        empMessageName.classList.remove('error');
        empMessageRole.classList.remove('error');
        empMessageStatus.classList.remove('error');
        document.querySelector('.message span').textContent = 'Employee added successfully!';
        document.querySelector('.message').classList.add('success');
        employees.push({
            name: name,
            role: role,
            salary: salary,
            bonus: 0,
            status: status
        });

        // Clear form
        empForm.reset();


        displayEmployees();


        setTimeout(() => {
            document.querySelector('.message span').textContent = '';
            document.querySelector('.message').classList.remove('success');
        }, 5000);



    }


});


trashbtn.addEventListener('click', function () {
    if (trashEmps.length > 0) {
        const trashTable = document.getElementById('trash-list');
        trashTable.innerHTML = ''; // Clear previous entries
        trashEmps.forEach((emp, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${emp.name}</td>
                <td>${emp.role}</td>
                <td>${emp.salary}</td>
                <td>${emp.status}</td>
                <td>
                    <div class="d-flex action">
                        <a class="btn-primary btn" onClick="restoreEmployee(${index})"><i
    class="fa-solid fa-undo"></i></a>
                        <a class="btn btn-danger" onClick="permanentlyDeleteEmployee(${index})"><i
    class="fa-solid fa-trash"></i></a>
                    </div>
                </td>       
            `;
            trashTable.appendChild(row);
        });
        document.getElementById('trash-modal').style.display = 'block'; // Show the
        // trash modal
    } else {
        alert('No employees in trash');
    }
});


// Close buttons for both modals
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.getElementById('trash-modal').style.display = 'none';
        document.getElementById('bonus-modal').style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    const trashModal = document.getElementById('trash-modal');
    const bonusModal = document.getElementById('bonus-modal');

    if (event.target === trashModal) {
        trashModal.style.display = 'none';
    }

    if (event.target === bonusModal) {
        bonusModal.style.display = 'none';
    }
});

function displayEmployees() {
    // Update employee table
    empTable.innerHTML = '';
    employees.forEach((emp, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${index + 1}</td>
                <td>${emp.name}</td>
                <td>${emp.role}</td>
                <td>${emp.salary}</td>
                <td>${emp.bonus}</td>
                <td><span style="background-color:${setBackgroundColor(emp.status)};padding:0px 10px; border-radius:20px">${emp.status}</span></td>
                <td> <div class="d-flex action">
                                 <a class="btn-primary btn  " onClick = editEmployee(${index}) ><i class="fa-solid fa-pen-to-square"></i></a>
                                <a class="btn btn-danger "   onClick=deleteEmployee(${index})   ><i class="fa-solid fa-trash"></i></a>
                                <a class="btn btn-primary "   onClick=setBonus(${index})   ><i class="fa-solid fa-add"></i></a>
                               </div></td>
            `;
        empTable.appendChild(row);
        console.log(`Employee ${index + 1}: ${emp.name}, Role: ${emp.role}, Status: ${emp.status}`);

    });
}
function deleteEmployee(index) {
    console.log(`Deleting employee at index: ${index} from employees array of length ${employees.length}`);

    if (index >= 0 && index < employees.length) {
        console.log(`Employee to delete: ${employees[index].name}`);
        const [deletedEmp] = employees.splice(index, 1);
        trashEmps.push(deletedEmp);
        displayEmployees();
        console.log(`Employee deleted successfully. Current employees count: ${employees.length}`);
    } else {
        console.error('Invalid employee index');
    }
}

function editEmployee(index) {
    if (index >= 0 && index < employees.length) {
        const emp = employees[index];
        emp.name = prompt("Edit Name", emp.name) || emp.name;
        emp.role = prompt("Edit Role", emp.role) || emp.role;

        displayEmployees();
    } else {
        console.error('Invalid employee index for editing');
    }
}

function setBonus(index) {
    if (index >= 0 && index < employees.length){
        const emp = employees[index];
        document.getElementById('bonus-modal').style.display = 'block';

        document.getElementById('bonus-amount').value = emp.bonus || 0;
        document.getElementById('bonus-form').addEventListener('submit', function (){
            event.preventDefault();
            const bonusAmount = document.getElementById('bonus-amount').value;
            if (bonusAmount && !isNaN(bonusAmount) && bonusAmount >= 0 ){
                emp.bonus = emp.salary * ( parseFloat( bonusAmount) / 100);
                
                document.getElementById('bonus-modal').style.display = 'none';
                displayEmployees();
                console.log(`Bonus of ${emp.bonus} applied to ${emp.name}`);
            }
        })


    }
}

function restoreEmployee(index) {
    if (index >= 0 && index < trashEmps.length) {
        const [restoredEmp] = trashEmps.splice(index, 1);
        employees.push(restoredEmp);
        document.getElementById('trash-modal').style.display = 'none';

        displayEmployees();

        console.log(`Employee restored: ${restoredEmp.name}`);
    } else {
        console.error('Invalid employee index for restoration');
    }
}


function permanentlyDeleteEmployee(index) {
    if (index >= 0 && index < trashEmps.length) {
        trashEmps.splice(index, 1);
        const trashTable = document.getElementById('trash-list');
        trashTable.innerHTML = ''; // Clear previous entries            
        trashEmps.forEach((emp, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${emp.name}</td>
                <td>${emp.role}</td>
                <td>${emp.salary}</td>
                <td><span style="background-color:${setBackgroundColor(emp.status)};padding:0px 10px; border-radius:20px">${emp.status}</span></td>
                <td>
                    <div class="d-flex action">
                        <a class="btn-primary btn" onClick="restoreEmployee(${index})"><i
                        class="fa-solid fa-undo"></i></a>
                        <a class="btn btn-danger" onClick="permanentlyDeleteEmployee(${index})"><i
                        class="fa-solid fa-trash"></i></a>
                    </div>
                </td>
            `;
            trashTable.appendChild(row);
        });
        console.log(`Employee permanently deleted. Current trash count: ${trashEmps.length}`);
    } else {
        console.error('Invalid employee index for permanent deletion');
    }
}

function setBackgroundColor(status) {
    switch (status.toLowerCase()) {
        case 'active':
            return 'green';
        case 'on leave':
            return 'red';
        case 'terminated':
            return 'yellow';
        default:
            return 'gray'; // Default color for unknown status
    }
}