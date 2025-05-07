const cl = console.log;

let todoform = document.getElementById('todoform')
let todoitemcontrol = document.getElementById('todoitem')
let addtodobtn = document.getElementById('addtodo')
let updatetodobtn = document.getElementById('updatetodo')
let todocontainer = document.getElementById('todocontainer')
let notodomsgp = document.getElementById('notodomsg')


const generateUuid = ()=>{
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };
  const showmsg = (msg, i) =>{
    Swal.fire({
        title : msg,
        icon : i,
        timer : 1000
    })
  }
let todoarr = localStorage.getItem('todoarr') ? JSON.parse(localStorage.getItem('todoarr')) : []
let notodomsg = () => {
    if(todoarr.length === 0){
        notodomsgp.classList.remove('d-none')
        todocontainer.classList.add('d-none')
    }else{
        notodomsgp.classList.add('d-none')
        todocontainer.classList.remove('d-none')
    }
}
notodomsg()
const createlis = (arr) =>{
    if(todoarr.length > 0){
    let result = ''
    arr.forEach(todo => {
        result+=`<li class="list-group-item d-flex justify-content-between" id="${todo.id}">
                      <strong>${todo.todoitem}</strong>
                        <div class="btns">
                            <i class="fas fa-edit fa-2x text-warning" onclick="onedit(this)"></i>
                            <i class="fas fa-trash fa-2x text-danger ml-2" onclick="onremove(this)"></i></div>
                    </li>`
    })
    todocontainer.innerHTML = result
}
}
createlis(todoarr)

const onedit = (e) => {
    let todoeditid = e.closest('li').id
    localStorage.setItem('todoeditid', todoeditid)
    let editobj = todoarr.find(t=> t.id == todoeditid)
    todoitem.value = editobj.todoitem
addtodobtn.classList.add('d-none')
updatetodobtn.classList.remove('d-none')
}
const ontodoupdate = () =>{
    let updateid = localStorage.getItem('todoeditid')
    let obj = {
        todoitem : todoitemcontrol.value,
        id : updateid
    }
    let updateindex = todoarr.findIndex(t => t.id == updateid)
    todoarr[updateindex] = obj
    localStorage.setItem('todoarr', JSON.stringify(todoarr))
    document.getElementById(updateid).firstElementChild.innerHTML = obj.todoitem 
    todoform.reset()
    addtodobtn.classList.remove('d-none')
updatetodobtn.classList.add('d-none')
showmsg('Todo Updated Successfully!', 'success')

}
const onremove = (e) =>{
let removeid = e.closest('li').id
let removeindex = todoarr.findIndex(t => t.id == removeid)
todoarr.splice(removeindex, 1)
localStorage.setItem('todoarr', JSON.stringify(todoarr))
document.getElementById(removeid).remove()
showmsg('Todo Removed Successfully!', 'success')
notodomsg()
}

const ontodosubmit = (e) => {
e.preventDefault()
let obj = {
    todoitem : todoitemcontrol.value,
id : generateUuid()
}
todoarr.unshift(obj)
localStorage.setItem('todoarr', JSON.stringify(todoarr))
todoform.reset()
let newli = document.createElement('li')
newli.className = `list-group-item d-flex justify-content-between`
newli.id = obj.id
newli.innerHTML = ` <strong>${obj.todoitem}</strong>
                        <div class="btns">
                            <i class="fas fa-edit fa-2x text-warning" onclick="onedit(this)"></i>
                            <i class="fas fa-trash fa-2x text-danger ml-2" onclick="onremove(this)"></i></div>`
                            todocontainer.prepend(newli)
                            notodomsg()
                            showmsg('Todo Added Successfully!', 'success')
}

updatetodobtn.addEventListener('click', ontodoupdate)
todoform.addEventListener('submit', ontodosubmit)

// Student CRUD

let stdform = document.getElementById('stdform')
let fullname = document.getElementById('fullname')
let contact = document.getElementById('contact')
let email = document.getElementById('email')
let addstdbtn = document.getElementById('addstdbtn')
let updatestdbtn = document.getElementById('updatestdbtn')
let stdcontainer = document.getElementById('stdcontainer')
let stdalert = document.getElementById('stdalert')
let stdtable = document.getElementById('stdtable')



let stdarr = localStorage.getItem('stdarr') ? JSON.parse(localStorage.getItem('stdarr')) : []
let nostdmsg = () => {
    if(stdarr.length === 0){
        stdalert.classList.remove('d-none')
        stdtable.classList.add('d-none')
    }else{
        stdalert.classList.add('d-none')
        stdtable.classList.remove('d-none')
    }
}
nostdmsg()

const createtrs = (arr) =>{
    if(stdarr.length > 0){
    let result = ''
    arr.forEach((std, i) => {
        result+=` <tr id="${std.id}">
                            <td>${i + 1}</td>       
                            <td>${std.fullname}</td>
                            <td>${std.contact}</td>
                            <td>${std.email}</td>
                            <td>  <i class="fas fa-edit fa-2x text-warning" onclick="onstdedit(this)"></i></td>
                            <td><i class="fas fa-trash fa-2x text-danger ml-2" onclick="onstdremove(this)"></i></td>
                        </tr>`
    })
    stdcontainer.innerHTML = result
}
}
createtrs(stdarr)

const onstdedit = (e) => {
    let stdeditid = e.closest('tr').id
    localStorage.setItem('stdeditid', stdeditid)
    let editobj = stdarr.find(s=> s.id == stdeditid)
    fullname.value = editobj.fullname
    contact.value = editobj.contact
    email.value = editobj.email

addstdbtn.classList.add('d-none')
updatestdbtn.classList.remove('d-none')
}
const onstdupdate = () =>{
    let updateid = localStorage.getItem('stdeditid')
    let obj = {
        fullname : fullname.value,
        contact : contact.value,
        email : email.value,
    id : updateid
    }
    let updateindex = stdarr.findIndex(s => s.id == updateid)
    stdarr[updateindex] = obj
    localStorage.setItem('stdarr', JSON.stringify(stdarr))
    let tr = document.getElementById(updateid)
   let tds =[...tr.querySelectorAll('td')]
   tds[1].innerHTML = obj.fullname
   tds[2].innerHTML = obj.contact
   tds[3].innerHTML = obj.email
    stdform.reset()
    addstdbtn.classList.remove('d-none')
    updatestdbtn.classList.add('d-none')
showmsg('Student Updated Successfully!', 'success')

}
const onstdremove = (e) =>{
let removeid = e.closest('tr').id
cl(removeid)
let removeindex = stdarr.findIndex(t => t.id == removeid)
stdarr.splice(removeindex, 1)
localStorage.setItem('stdarr', JSON.stringify(stdarr))
document.getElementById(removeid).remove()
showmsg('Student Removed Successfully!', 'success')
nostdmsg()
let alltrs = [...document.querySelectorAll('#todocontainer tr')]
alltrs.forEach((tr, i) => {
tr.firstElementChild.innerHTML = i + 1
})
}

const onstdsubmit = (e) => {
e.preventDefault()
let obj = {
    fullname : fullname.value,
    contact : contact.value,
    email : email.value,
id : generateUuid()
}
stdarr.unshift(obj)
localStorage.setItem('stdarr', JSON.stringify(stdarr))
stdform.reset()
let newtr = document.createElement('tr')
newtr.id = obj.id
newtr.innerHTML = ` <td>${stdarr.length}</td>
                            <td>${obj.fullname}</td>
                            <td>${obj.contact}</td>
                            <td>${obj.email}</td>
                            <td>  <i class="fas fa-edit fa-2x text-warning" onclick="onstdedit(this)"></i></td>
                            <td><i class="fas fa-trash fa-2x text-danger ml-2" onclick="onstdremove(this)"></i></td>`
                            stdcontainer.append(newtr)
                            nostdmsg()
                            showmsg('Student Added Successfully!', 'success')
}

updatestdbtn.addEventListener('click', onstdupdate)
stdform.addEventListener('submit', onstdsubmit)
