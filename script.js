// const url = 'http://localhost:3000/students'
const url = ' https://5cf1-2800-2245-9080-5f9-6590-be67-313e-1a16.ngrok-free.app/student'

window.onload = () => {
    loadStudents()
}

// Hace arrastrable los PopUps con JQuery
$('#add-students-div').draggable()
$('#update-students-div').draggable()

// PROMESAS AXIOS
function loadStudents() {
    axios.get(`${url}/getAll`)
        .then(res => {
            var tbody = document.getElementById('table-info-students')
            tbody.innerHTML = ''
            res.data.forEach(element => {
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
            document.getElementById('cant-estudiantes').innerHTML = res.data.length
        })
        .catch(error => {
            console.log(Error(error))
            alert(error.message)
        })
}

function createStudent() {
    var json = {
        dni: $('#dni').val(),
        lastName: $('#lastname').val(),
        firstName: $('#firstname').val(),
        email: $('#email').val(),
        cohort: $('#cohort').val(),
        gender: $('#gender').val(),
        status: $('#status').val(),
        address: $('#address').val(),
        phone: $('#phone').val()
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
        if (isNaN(document.getElementById('cohort').value)) alert('Cohort es de tipo numérico')
        else alert('Error al agregar: Todos los campos son obligatorios!')

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
        id: id,
        dni: $('#dniMod').val(),
        lastName: $('#lastnameMod').val(),
        firstName: $('#firstnameMod').val(),
        email: $('#emailMod').val(),
        cohort: $('#cohortMod').val(),
        gender: $('#genderMod').val(),
        status: $('#statusMod').val(),
        address: $('#addressMod').val(),
        phone: $('#phoneMod').val()
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
        if (isNaN(document.getElementById('cohortMod').value)) alert('Cohort es de tipo numérico')
        else alert('Error al agregar: Todos los campos son obligatorios!')
    }
}

function loadOneStudent(student) {
    $('#idMod').val(student.id) 
    $('#dniMod').val(student.dni) 
    $('#lastnameMod').val(student.lastName) 
    $('#firstnameMod').val(student.firstName) 
    $('#emailMod').val(student.email) 
    $('#cohortMod').val(student.cohort) 
    $('#genderMod').val(student.gender) 
    $('#statusMod').val(student.status) 
    $('#addressMod').val(student.address) 
    $('#phoneMod').val(student.phone) 

    openPopUp('update-students-div')
}

// ABRIR Y CERRAR POPUPS
function closePopUp(divId) {
    document.getElementById(divId).style.display = 'none'
}

function openPopUp(divId) {
    div = document.getElementById(divId)
    div.style.display = 'block'
    div.style.left = '35%'
    div.style.top = '10%'
    if (divId == 'add-students-div') closePopUp('update-students-div')
    if (divId == 'update-students-div') closePopUp('add-students-div')
}

// ABRIR Y CERRAR DIV CON DATOS EN EL POPUP PARA MODIFICAR
function openMasDatos() {
    document.getElementById('mas-datos-div').style.display = 'block'
    document.getElementById('button-mas-datos').innerHTML = 'Menos datos'
    document.getElementById('button-mas-datos').addEventListener('click', () => closeMasDatos())
}

function closeMasDatos() {
    document.getElementById('mas-datos-div').style.display = 'none'
    document.getElementById('button-mas-datos').innerHTML = 'Más datos'
    document.getElementById('button-mas-datos').addEventListener('click', () => openMasDatos())
}

// ALERTAS SUCCESS AL CREAR O MODIFICAR CON EXITO
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

// LIMPIAR INPUTS
function cleanInputsCreate() {
    $('#id').val('')
    $('#dni').val('')
    $('#lastname').val('')
    $('#firstname').val('')
    $('#email').val('')
    $('#cohort').val('')
    $('#status').val('')
    $('#address').val('')
    $('#phone').val('')
    $('#gender').val('')
}

function cleanInputsUpdate() {
    $('#idMod').val('')
    $('#dniMod').val('')
    $('#lastnameMod').val('')
    $('#firstnameMod').val('')
    $('#emailMod').val('')
    $('#cohortMod').val('')
    $('#statusMod').val('')
    $('#addressMod').val('')
    $('#phoneMod').val('')
    $('#genderMod').val('')
}

// VALIDAR INPUTS
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
        document.getElementById('phone').value != '' &&
        !isNaN(document.getElementById('cohort').value)
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
        document.getElementById('phoneMod').value != '' &&
        !isNaN(document.getElementById('cohortMod').value)
    ) return true

    return false
}
