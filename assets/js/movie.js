const cl = console.log;

const mform = document.getElementById('mform')
const mtitle = document.getElementById('mtitle')
const murl = document.getElementById('murl')
const mdescription = document.getElementById('mdescription')
const mrating = document.getElementById('mrating')
const addmbtn = document.getElementById('addmbtn')
const updatembtn = document.getElementById('updatembtn')
const hideshow = [...document.querySelectorAll('.hideshow')]
const backdrop = document.getElementById('backdrop')
const moviemodel = document.getElementById('moviemodel')
const moviecontainer = document.getElementById('moviecontainer')


const onhideshow = () =>{
backdrop.classList.toggle('d-none')
moviemodel.classList.toggle('d-none')
}

const showmsg = (msg, i) =>{
    Swal.fire({
        title : msg,
        icon : i,
        timer : 1000
    })
  }
const generateUuid = ()=>{
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };
hideshow.forEach(h => h.addEventListener('click', onhideshow))
const ratingcolor = (n) =>{
    if(n <= 3){
        return 'bg-danger'
    }else if(n <= 4){
        return 'bg-warning'
    }else{
        return 'bg-primary'
    }
}

let moviearr = localStorage.getItem('moviearr') ? JSON.parse(localStorage.getItem('moviearr')) : []


const createcards = (arr) =>{
    if(arr.length > 0){
    let result = ''
    arr.forEach((m, i) => {
        result+=` <div class="col-md-4 mb-5" id="${m.id}">
<div class="m-card">
    <figure class="d-flex justify-content-between">
        <img src="${m.murl}" alt="">
        <div class="description">
            <p>${m.mdescription}</p>
        </div>
        <div class="buttons d-flex justify-content-between">
            <button class="btn btn-sm btn-outline-primary" onclick="onmedit(this)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" onclick="onmremove(this)">Remove</button>
        </div>
        <figcaption>
            <div class="row">
                <div class="col-md-10">
                    <p class="ml-2">${m.mtitle}</p>
               </div>
               <div class="col-md-2 ${ratingcolor(m.mrating)}"><small>${m.mrating}</small></div>
            </div>
        </figcaption>
    </figure>
</div>
        </div>`
    })
    moviecontainer.innerHTML = result
}
}
createcards(moviearr)

const onmedit = (e) => {
    let meditid = e.closest('.col-md-4').id
    localStorage.setItem('meditid', meditid)
    let editobj = moviearr.find(m=> m.id == meditid)
    backdrop.classList.remove('d-none')
    moviemodel.classList.remove('d-none') 
    mtitle.value = editobj.mtitle
    murl.value = editobj.murl
    mdescription.value = editobj.mdescription
    mrating.value = editobj.mrating

addmbtn.classList.add('d-none')
updatembtn.classList.remove('d-none')
}
const onmupdate = () =>{
    let updateid = localStorage.getItem('meditid')
    let obj = {
        mtitle : mtitle.value,
        murl : murl.value,
        mdescription : mdescription.value,
        mrating : mrating.value,
    id : updateid
    }
    let updateindex = moviearr.findIndex(s => s.id == updateid)
    moviearr[updateindex] = obj
    localStorage.setItem('moviearr', JSON.stringify(moviearr))
    let div = document.getElementById(updateid)
 div.querySelector('img').setAttribute('src', obj.murl)
 div.querySelector('.description p').innerHTML = obj.mdescription
 div.querySelector('figcaption .col-md-10').innerHTML = ` <p class="ml-2">${obj.mtitle}</p>
               </div>
               <div class="col-md-2 ${ratingcolor(obj.mrating)}"><small>${obj.mrating}</small>`

    mform.reset()
    addmbtn.classList.remove('d-none')
    updatembtn.classList.add('d-none')
showmsg('Movie Updated Successfully!', 'success')
backdrop.classList.add('d-none')
moviemodel.classList.add('d-none')     
}
const onmremove = (e) =>{
let removeid = e.closest('.col-md-4').id
cl(removeid)
let removeindex = moviearr.findIndex(t => t.id == removeid)
moviearr.splice(removeindex, 1)
localStorage.setItem('moviearr', JSON.stringify(moviearr))
document.getElementById(removeid).remove()
showmsg('Movie Removed Successfully!', 'success')
}

const onstdsubmit = (e) => {
e.preventDefault()
let obj = {
    mtitle : mtitle.value,
    murl : murl.value,
    mdescription : mdescription.value,
    mrating : mrating.value,
id : generateUuid()
}
moviearr.unshift(obj)
localStorage.setItem('moviearr', JSON.stringify(moviearr))
mform.reset()
let newdiv = document.createElement('div')
newdiv.id = obj.id
newdiv.className = 'col-md-4 mb-5'
newdiv.innerHTML = ` <div class="m-card">
    <figure class="d-flex justify-content-between">
        <img src="${obj.murl}" alt="">
        <div class="description">
            <p>${obj.mdescription}</p>
        </div>
        <div class="buttons d-flex justify-content-between">
            <button class="btn btn-sm btn-outline-primary" onclick="onmedit(this)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" onclick="onmremove(this)">Remove</button>
        </div>
        <figcaption>
            <div class="row">
                <div class="col-md-10">
                    <p class="ml-2">${obj.mtitle}</p>
               </div>
               <div class="col-md-2 ${ratingcolor(obj.mrating)}"><small>${obj.mrating}</small></div>
            </div>
        </figcaption>
    </figure>
</div>`
moviecontainer.prepend(newdiv)
                            showmsg('Movie Added Successfully!', 'success')
                            backdrop.classList.add('d-none')
                            moviemodel.classList.add('d-none')                      
}

updatembtn.addEventListener('click', onmupdate)
mform.addEventListener('submit', onstdsubmit)




