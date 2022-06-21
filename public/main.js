document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)


async function updateEntry(){
    try {
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               name: document.getElementsByName('name')[0].value,
               clubLogo: document.getElementsByName('clubLogo')[0].value,
               fullName: document.getElementsByName('fullName')[0].value,
               nickName: document.getElementsByName('nickName')[0].value,
               homePitch: document.getElementsByName('homePitch')[0].value,
               location: document.getElementsByName('location')[0].value,
               rival: document.getElementsByName('rival')[0].value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err) {
        console.log(err)
    }
}
async function deleteEntry(){
    const input = document.getElementById('deleteInput')
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: input.value
             })
        })
        const data = await response.json()
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}