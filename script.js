const url = 'http://localhost:3000/students'

window.onload = () => {
    loadStudents()
}

function loadStudents() {
    axios.get(`${url}/getAll`)
        .then(response => {
            var tbody = document.getElementById('table-info-students')
            tbody.innerHTML = ''
            response.data.forEach(element => {
                var row = tbody.insertRow()
                var id = row.insertCell()
                id.innerHTML = element.id
                var dni = row.insertCell()
                dni.innerHTML = element.dni
                var lastname = row.insertCell()
                lastname.innerHTML = element.lastName
                var firstName = row.insertCell()
                firstName.innerHTML = element.firstName
                var email = row.insertCell()
                email.innerHTML = element.email
                var gender = row.insertCell()
                gender.innerHTML = element.gender

                var student = {
                    'id': element.id,
                    'dni': element.dni,
                    'lastName': element.lastName,
                    'firstName': element.firstName,
                    'email': element.email,
                    'cohort': element.cohort,
                    'status': element.status,
                    'gender': element.gender,
                    'address': element.address,
                    'phone': element.phone
                }

                var eliminar = row.insertCell()
                eliminar.style.border = 0
                eliminar.style.backgroundColor = 'rgb(161, 0, 0)'
                var deleteButton = document.createElement('button')
                deleteButton.className = 'delete-button'
                deleteButton.addEventListener('click', () => deleteStudent(element.id))
                var i = document.createElement('i')
                i.className = 'fa fa-trash-o'
                deleteButton.appendChild(i)
                eliminar.appendChild(deleteButton)

                var view = row.insertCell()
                view.style.border = 0
                view.style.backgroundColor = 'rgb(11, 133, 0)'
                var viewButton = document.createElement('button')
                viewButton.className = 'view-button'
                viewButton.addEventListener('click', () => loadOneStudent(student))
                var i2 = document.createElement('i')
                i2.className = 'fa-solid fa-user'
                viewButton.appendChild(i2)
                view.appendChild(viewButton)
            })
            document.getElementById('cant-estudiantes').innerHTML = response.data.length
        })
        .catch(error => {
            console.log(Error(error))
            alert(error.message)
        })
}


function loadOneStudent(student) {
    document.getElementById('idMod').value = student.id
    document.getElementById('dniMod').value = student.dni
    document.getElementById('lastnameMod').value = student.lastName
    document.getElementById('firstnameMod').value = student.firstName
    document.getElementById('emailMod').value = student.email
    document.getElementById('cohortMod').value = student.cohort
    document.getElementById('genderMod').value = student.gender
    document.getElementById('statusMod').value = student.status
    document.getElementById('addressMod').value = student.address
    document.getElementById('phoneMod').value = student.phone

    mostrar('button-modificar-div', 'update-students-div')
}


function createStudent() {
    var json = {
        dni: document.getElementById('dni').value,
        lastName: document.getElementById('lastname').value,
        firstName: document.getElementById('firstname').value,
        email: document.getElementById('email').value,
        cohort: document.getElementById('cohort').value,
        gender: document.getElementById('gender').value,
        status: document.getElementById('status').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value
    }

    if (validateInputsCreate()) {
        axios.post(url, json)
            .then(() => {
                loadStudents()
                cleanInputsCreate()
                successAlert('create')
            })
            .catch(error => {
                console.log(Error(error))
                alert(error.message)
            })
    } else {
        alert('Error al agregar: Todos los campos son obligatorios!')
    }
}

function deleteStudent(id) {
    if (window.confirm('¿Está seguro que quiere eliminar al estudiante?')) {
        axios.post(`${url}/${id}/delete`)
            .then(() => {
                loadStudents()
                alert('Estudiante eliminado.')
            })
            .catch(error => {
                console.log(Error(error))
                alert(error.message)
            })
    }
}

function updateStudent(id) {
    var json = {
        id: document.getElementById('idMod').value,
        dni: document.getElementById('dniMod').value,
        lastName: document.getElementById('lastnameMod').value,
        firstName: document.getElementById('firstnameMod').value,
        email: document.getElementById('emailMod').value,
        cohort: document.getElementById('cohortMod').value,
        gender: document.getElementById('genderMod').value,
        status: document.getElementById('statusMod').value,
        address: document.getElementById('addressMod').value,
        phone: document.getElementById('phoneMod').value
    }

    if (validateInputsUpdate()) {
        axios.post(`${url}/${id}/update`, json)
            .then(() => {
                loadStudents()
                cleanInputsUpdate()
                successAlert('update')
            })
            .catch(error => {
                console.log(Error(error))
                alert(error.message)
            })
    } else {
        alert('Error al modificar: Todos los campos son obligatorios!')
    }
}

function mostrar(id, divId) {
    var div = document.getElementById(divId)
    div.style.display = 'block'
    var button = document.getElementById(id)
    button.addEventListener('click', () => esconder(id, divId))

    if (button.id != 'button-students-table') {
        button.style.margin = '0'
    }

    if (button.id == 'button-mas-datos') {
        button.innerHTML = 'Menos datos'
    }
}

function esconder(id, divId) {
    var div = document.getElementById(divId)
    div.style.display = 'none'
    var button = document.getElementById(id)
    button.addEventListener('click', () => mostrar(id, divId))

    if (button.id != 'button-students-table') {
        button.style.marginBottom = '25px'
    }

    if (button.id == 'button-mas-datos') {
        button.innerHTML = 'Más datos'
    }
}

function successAlert(type) {
    var div
    if (type == 'update') {
        div = document.getElementById('alert-success-update')
        div.style.display = 'block'
        setTimeout((div = document.getElementById('alert-success-update')) => {
            div.style.display = 'none'
        },
            3000)
    }
    if (type == 'create') {
        div = document.getElementById('alert-success-create')
        div.style.display = 'block'
        setTimeout((div = document.getElementById('alert-success-create')) => {
            div.style.display = 'none'
        },
            3000)
    }
}

function cleanInputsCreate() {
    document.querySelector('#dni').value = ''
    document.querySelector('#lastname').value = ''
    document.querySelector('#firstname').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#cohort').value = ''
    document.querySelector('#status').value = ''
    document.querySelector('#address').value = ''
    document.querySelector('#phone').value = ''
    document.querySelector('#gender').value = ''
}

function cleanInputsUpdate() {
    document.querySelector('#idMod').value = ''
    document.querySelector('#dniMod').value = ''
    document.querySelector('#lastnameMod').value = ''
    document.querySelector('#firstnameMod').value = ''
    document.querySelector('#emailMod').value = ''
    document.querySelector('#cohortMod').value = ''
    document.querySelector('#statusMod').value = ''
    document.querySelector('#addressMod').value = ''
    document.querySelector('#phoneMod').value = ''
    document.querySelector('#genderMod').value = ''
}

function validateInputsCreate() {
    if (
        document.getElementById('dni').value != '' &&
        document.getElementById('lastname').value != '' &&
        document.getElementById('firstname').value != '' &&
        document.getElementById('email').value != '' &&
        document.getElementById('cohort').value != '' &&
        document.getElementById('gender').value != '' &&
        document.getElementById('status').value != '' &&
        document.getElementById('address').value != '' &&
        document.getElementById('phone').value != ''
    ) return true

    return false
}

function validateInputsUpdate() {
    if (
        document.getElementById('idMod').value != '' &&
        document.getElementById('dniMod').value != '' &&
        document.getElementById('lastnameMod').value != '' &&
        document.getElementById('firstnameMod').value != '' &&
        document.getElementById('emailMod').value != '' &&
        document.getElementById('cohortMod').value != '' &&
        document.getElementById('genderMod').value != '' &&
        document.getElementById('statusMod').value != '' &&
        document.getElementById('addressMod').value != '' &&
        document.getElementById('phoneMod').value != ''
    ) return true

    return false
}