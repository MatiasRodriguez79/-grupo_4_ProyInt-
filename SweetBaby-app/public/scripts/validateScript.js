function ValidarField(field, length) {
    if (field.value.length < length) {
        showAlert(field, length)
    }
    else {
        const x = document.getElementById(field.id)
        x.classList.remove("red-error"); 
        document.getElementById("Enviar-button").disabled = false;
    }
    return field.value.length >= length;
}

function ValidarField2(field, length) {
    if (ValidarField(field, length)) {
        if(document.getElementById("passwordRegister1").value != field.value){
            const x = document.getElementById(field.id)
            x.classList.add("red-error"); 
            Swal.fire ({              
                text: `Las contraseñas no coinciden`,
                icon: 'warning',
                width: '30%',
                padding: '1rem',
                timer: 7000
            }).then(result => {               
                field.focus();
                field.select();
                document.getElementById("Enviar-button").disabled = true;
            })
        } else {
            const x = document.getElementById(field.id)
            x.classList.remove("red-error"); 
            document.getElementById("Enviar-button").disabled = false;
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateFieldPassword(field, length){
    const pass = field.value;
    if(!validar_clave(pass)){
        Swal.fire ({              
            text: `La contraseña debe tener al menos  8 caractes, almenos 1 mayuscula, uno minuscula, números y algun caracter especial`,
            icon: 'warning',
            width: '30%',
            padding: '1rem',
            footer: '<span> Esta informacion sera validada al guardar </span> ',
            timer: 7000
        }).then(result => {
            document.getElementById("Enviar-button").disabled = true;
            field.focus();
            field.select();
        })
    } else {
        if(ValidarField(field, length)) {
            const x = document.getElementById(field.id)
            x.classList.remove("red-error"); 
            document.getElementById("Enviar-button").disabled = false;
        }        
    }
}


function validateFieldEmail(field) {
    const email = field.value;
    if(!validateEmail(email)){
        showAlert(field);
    } else {
        const x = document.getElementById(field.id)
        x.classList.remove("red-error"); 
        document.getElementById("Enviar-button").disabled = false;
    }
}

function validateFieldEmail2(field) {
    const email = field.value;
    if(!validateEmail(email)){
        showAlert(field);
    } else {
        if(document.getElementById("emailRegister1").value != email){
            const x = document.getElementById(field.id)
            x.classList.add("red-error"); 
            Swal.fire ({              
                text: `Los emails no coinciden`,
                icon: 'warning',
                width: '30%',
                padding: '1rem',
                timer: 7000
            }).then(result => {
                field.focus();
                field.select();
                document.getElementById("Enviar-button").disabled = true;
            })
        } else {
            const x = document.getElementById(field.id)
            x.classList.remove("red-error"); 
            document.getElementById("Enviar-button").disabled = false;
        }
    }
}

function showAlert(field, length) {
    const x = document.getElementById(field.id)
    x.classList.add("red-error");    
    document.getElementById("Enviar-button").disabled = true;
    if(length) {
        Swal.fire ({              
            text: `El campo ${field.placeholder} debe tener al menos ${length} caracteres`,
            icon: 'warning',
            width: '30%',
            padding: '1rem',
            footer: '<span> Esta informacion sera validada al guardar </span> ',
            timer: 7000
        }).then(result => {
            field.focus();
            field.select();
        })
    } else {
        Swal.fire ({              
            text: `El campo ${field.placeholder} debe ser válido`,
            icon: 'warning',
            width: '30%',
            padding: '1rem',
            footer: '<span> Esta informacion sera validada al guardar </span> ',
            timer: 7000
        }).then(result => {
            field.focus();
            field.select();
        })
    }
}

function fileValidation(){
    // alert ('estoy en validation')
    var fileInput = document.getElementById('avatar');
    var filePath = fileInput.value;
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        Swal.fire ({
             //title: 'Bienvenido Facherito',
             text: 'Seleccionar archivos unicamente con extensión .jpeg/.jpg/.png/.gif',
             icon: 'warning',
             width: '30%',
             padding: '1rem',
             backdrop: true,
             footer: '<span> Esta informacion sera validada al guardar </span> ',
             timer: 7000
             //background: '#b1bed6'
        })

        fileInput.value = '';
        return false;
    }
}


function validar_clave(contrasenna){
    // const re = /^(?=.*\d)(?=.*[a-z]).*[A-Z]\S{8,16}$/;
    const re1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+.-])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+.-]{8,19}$/;

    return re1.test(contrasenna);
}
