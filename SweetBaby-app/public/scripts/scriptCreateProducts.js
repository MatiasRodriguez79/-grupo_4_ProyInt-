    function fileValidation(){
       // alert ('estoy en validation')
        var fileInput = document.getElementById('imagen');
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

    function ValidarNameproduct(name) {        
        if (name.value.length < 6) {
            
            Swal.fire ({              
                text: 'El nombre debe tener al menos cinco letras',
                icon: 'warning',
                width: '30%',
                padding: '1rem',
                footer: '<span> Esta informacion sera validada al guardar </span> ',
                timer: 7000
               })
          name.focus();
          name.select();
        }
      }

      function ValidarDescriptionProduct(description) {        
        if (description.value.length < 21) {
        
          Swal.fire ({              
            text: 'La descripcion debe tener al menos veinte letras',
            icon: 'warning',
            width: '30%',
            padding: '1rem',
            footer: '<span> Esta informacion sera validada al guardar </span> ',
            timer: 7000
           })
          description.focus();
          description.select();
        }
      }


