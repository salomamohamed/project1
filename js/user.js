const readDataFromStorage = () => {
    let data
    try{
        data = JSON.parse(localStorage.getItem('users'))
        if(!Array.isArray(data)) throw new Error('data isn\'t array')
    }
    catch(exp){
        data=[]
    }
    return data
}
const setDataToStorage = (myData) => {
    if(!Array.isArray(myData)) myData=[]
    myData = JSON.stringify(myData)
    localStorage.setItem('users', myData)
}
const content= document.querySelector("#content")
const addUser = document.querySelector('#addUser')
const single = document.querySelector("#single")
//
const transaction = document.querySelector("#transaction")

const userMainHeads = [
    {name:"id",dataStore:"value",  default: Date.now(), isDefault:true},
    {name:"username", dataStore:"value",default:null, isDefault:false},
    {name:"address", dataStore:"value",default:null, isDefault:false},
    {name:"phone", dataStore:"value",default:null, isDefault:false},
    {name:"accNum", dataStore:"value",default:null, isDefault:false},
   
    {name:"intialbalance", dataStore:"value",default:null, isDefault:false},
    
  

]
if(addUser){
    addUser.addEventListener("submit", function(e){
        e.preventDefault()
        const usersData=readDataFromStorage()
        let cust = {}
        userMainHeads.forEach(head => {
            // console.log(head.name)
            if(head.isDefault) cust[head.name]= usersData.length==0?5000:usersData[usersData.length-1].id+1;
            else 
            cust[head.name]=this.elements[head.name][head.dataStore]
        }
        );
        usersData.push(cust)
        this.reset()
        setDataToStorage(usersData)
        window.location.replace("index.html")
    })
}
const createMyOwnElement = (element, parent, classes="", textContent="",attributes=[])=>{
    const el = document.createElement(element)
    parent.appendChild(el)
    if(classes!="") el.classList = classes
    if(textContent!="") el.textContent = textContent
    attributes.forEach(attribute=>{
        el.setAttribute(attribute.attName, attribute.attrVal)
    })
    return el
}
drawItems = () =>{
    content.innerHTML=""
    const usersData=readDataFromStorage()
    if(usersData.length==0){
        const tr = createMyOwnElement('tr',content, "alert alert-danger text-center")
        createMyOwnElement('td', tr,"", "No Users Yet", [{attName:"colspan", attrVal:6}] )
    }
    else{
     usersData.forEach((user, i)=>{
      const tr = createMyOwnElement('tr',content)
      userMainHeads.forEach( head=> createMyOwnElement('td', tr,"",user[head.name]) )
      const td = createMyOwnElement('td',tr)
      const delBtn = createMyOwnElement('button', td, "btn btn-danger mx-3", "delete")
      delBtn.addEventListener('click', ()=> deleteUser(usersData, user.id))
      const editBtn = createMyOwnElement('button', td, "btn btn-warning mx-3", "Edit")
      editBtn.addEventListener('click', (e)=> edit(i))
      const showBtn = createMyOwnElement('button', td, "btn btn-primary mx-3", "Show")
      showBtn.addEventListener("click", (e)=> show(user))
      //
      const addBtn=createMyOwnElement('button', td, "btn btn-warning mx-3", "Add/withdraw")
      addBtn.addEventListener('click', (e)=>add (user))


    })    
    }
}
if(content) drawItems()
deleteUser= (usersData, id) =>{
   // console.log(id)
    newData = usersData.filter(u=> u.id != id)
    setDataToStorage(newData)
     drawItems()
}
show=(user)=>{
localStorage.setItem("user", JSON.stringify(user))
window.location.replace("single.html")
}
edit=( index)=>{
    localStorage.setItem('editIndex', index)
    window.location.replace("edit.html")
}
//
add=(user)=>{
    localStorage.setItem("user", JSON.stringify(user))
    window.location.replace("transaction.html")

}

if(single){
    try
    {
        let user = JSON.parse(localStorage.getItem("user"))
        if(!user) throw new Error()
    const tr = createMyOwnElement('tr',single)
    userMainHeads.forEach( head=> createMyOwnElement('td', tr,"",user[head.name]) )
    const td = createMyOwnElement('td',tr)
    const delBtn = createMyOwnElement('button', td, "btn btn-danger mx-3", "delete")
    delBtn.addEventListener('click', ()=> deleteUser(usersData, user.id))
    const editBtn = createMyOwnElement('button', td, "btn btn-warning mx-3", "Edit")
    editBtn.addEventListener('click', (e)=> edit(user))
    const showBtn = createMyOwnElement('button', td, "btn btn-primary mx-3", "Show")
    showBtn.addEventListener("click", (e)=> show(user))
    }
    catch(e){
        const tr = createMyOwnElement('tr',single, "alert alert-danger text-center")
        createMyOwnElement('td', tr,"", "No Users Yet", [{attName:"colspan", attrVal:6}] )      
    }
}
const editForm= document.querySelector("#editForm")
if(editForm){
    const usersData=readDataFromStorage()
    let id = localStorage.getItem('editIndex')
    let user = usersData[id]
    userMainHeads.forEach(head => {
     editForm.elements[head.name][head.dataStore]=user[head.name]
    }); 
    editForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        userMainHeads.forEach(head => {
            if(!head.isDefault) 
            usersData[id][head.name]=editForm.elements[head.name][head.dataStore]
        });
        console.log(usersData)
       setDataToStorage(usersData)
       window.location.replace("index.html")
    })  
}
//////////////
if(transaction){
    
        try
        {
            let user = JSON.parse(localStorage.getItem("user"))
            if(!user) throw new Error()
        const tr = createMyOwnElement('tr',transaction)
        userMainHeads.forEach( head=> createMyOwnElement('td', tr,"",user[head.name]) )
        const td = createMyOwnElement('td',tr)
        const transBtn = createMyOwnElement('button', td, "btn btn-danger mx-3", "Add/withdraw")
    
        transBtn.addEventListener('click', ()=> show( user))
       
        }
        catch(e){
            const tr = createMyOwnElement('tr',transaction, "alert alert-danger text-center")
            createMyOwnElement('td', tr,"", "No Users Yet", [{attName:"colspan", attrVal:6}] )      
        }
    }
