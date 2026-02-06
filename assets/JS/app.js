
let cl = console.log;

let studentForm = document.getElementById('studentForm')
let tableBody = document.getElementById('tableBody')
let btnAddStudent = document.getElementById('btnAddStudent')
let btnUpdateStudent = document.getElementById('btnUpdateStudent')
let fname = document.getElementById('fname')
let lname = document.getElementById('lname')
let email = document.getElementById('email')
let contact = document.getElementById('contact')

function snackbar(msg){
    Swal.fire({
    title : msg,
    icon : `success`,
    timer : 3000

})
}

const stdArr = [
  {
    
    fname: "may",
    lname: "Doe",
    email: "May@gmail.com",
    contact: "9876543210",
    stdid: "a1b2c3d4-1a2b-4c5d-9e10-111213141516"
  },
  {
    fname: "Shivraj",
    lname: "Pathade",
    email: "snehal.patil@gmail.com",
    contact: "9123456780",
    stdid: "b2c3d4e5-2b3c-4d6e-8f11-212223242526"
  },
  {
    
    fname: "june",
    lname: "Doe",
    email: "june@gmail.com",
    contact: "9988776655",
    stdid: "c3d4e5f6-3c4d-4e7f-9a12-313233343536"
  },
  {
    
    fname: "rohit",
    lname: "sharma",
    email: "Rohit@gmail.com",
    contact: "9012345678",
    stdid: "d4e5f6a7-4d5e-4f8a-bc13-414243444546"
  }
];


//Crete data table using the template literal show the array objects into the data
function createTable(arr){
    let result = ``

    arr.forEach((ele, i) => {
        result += `<tr id="${ele.stdid}">
                                    <td>${i + 1}</td>
                                    <td>${ele.fname} ${ele.lname}</td>
                                    <td>${ele.email}</td>
                                    <td>${ele.contact}</td>
                                    <td><i onclick="onEdit(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i></td>
                                    <td><i onclick="onRemove(this)" class="fa-solid fa-trash-can fa-2x text-danger"></i></td>
                    </tr>
        `
    })
    tableBody.innerHTML = result;
}

//carate unid
const uuid = () => {
  return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
    /[xy]/g,
    character => {
      const random = (Math.random() * 16) | 0
      const value = character === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    }
  )
}

//Now Add new student into the array and create the new UI
function onbtnAddStudent(eve){
    eve.preventDefault()
    let stdobj = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        contact: contact.value,
        stdid: uuid()
    }
    studentForm.reset();
    stdArr.push(stdobj)
    cl(stdArr)
    
    let tr = document.createElement('tr')
    tr.id = stdobj.stdid;

    tr.innerHTML = `
                                    <td>${stdArr.length}</td>
                                    <td>${stdobj.fname} ${stdobj.lname}</td>
                                    <td>${stdobj.email}</td>
                                    <td>${stdobj.contact}</td>
                                    <td><i onclick="onEdit(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i></td>
                                    <td><i onclick="onRemove(this)" class="fa-solid fa-trash-can fa-2x text-danger"></i></td>
    `
    tableBody.append(tr)
    
    snackbar(`New Student ${stdobj.fname} ${stdobj.lname} is Added Successfully !!!`,)
}

/// Now functionality of remove

function onRemove(eve){
    let REMOVE_ID = eve.closest('tr').id;
    let getconfirm = confirm("Are you shure do you want to remove this student!!!") 
    if(getconfirm){
        //remove in database means array
        let getindex = stdArr.findIndex(i => i.stdid === REMOVE_ID)
        let std = stdArr.splice(getindex, 1)
        //remove on ui
        eve.closest('tr').remove()

        //now set sr no

        let alltds = [...document.querySelectorAll('#tableBody tr td:first-child')]
        alltds.forEach((td, i) => td.innerText = i + 1)

        snackbar(`The Student ${std[0].fname} ${std[0].lname} is Removed Successsfully !!!`)
    }
}

///Now functionality for the edit icon pach the data into the form

let EDIT_ID
function onEdit(eve){
    EDIT_ID = eve.closest('tr').id;
    let EDIT_OBJ = stdArr.find((arr) => arr.stdid === EDIT_ID)
    fname.value = EDIT_OBJ.fname
    lname.value = EDIT_OBJ.lname
    email.value = EDIT_OBJ.email
    contact.value = EDIT_OBJ.contact

    btnAddStudent.classList.add('d-none')
    btnUpdateStudent.classList.remove('d-none');
}

///Update the data into the array as well ass UI
function onbtnSubmitStudent(eve){
    let UPDATED_OBJ = {
    fname : fname.value,
    lname : lname.value,
    email : email.value,
    contact : contact.value,
    stdid: EDIT_ID
    }
    studentForm.reset();
    let getindex = stdArr.findIndex((i) => i.stdid === EDIT_ID)
    let str = stdArr[getindex] = UPDATED_OBJ;
    
    let tr = [...document.getElementById(EDIT_ID).children]
    tr[1].innerText = `${UPDATED_OBJ.fname} ${UPDATED_OBJ.lname}`
    tr[2].innerText = UPDATED_OBJ.email
    tr[3].innerText = UPDATED_OBJ.contact

    btnAddStudent.classList.remove('d-none')
    btnUpdateStudent.classList.add('d-none');

    snackbar(` The Student ${UPDATED_OBJ.fname} ${UPDATED_OBJ.lname} is Updated Successfully !!!`)
}

createTable(stdArr);
studentForm.addEventListener('submit', onbtnAddStudent)
btnUpdateStudent.addEventListener('click', onbtnSubmitStudent)

























