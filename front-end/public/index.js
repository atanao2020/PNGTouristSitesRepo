console.log("index.js is running")
const url = 'http://localhost:2020'

const something = axios.get('https://api.github.com/users/mapbox')
    .then(function(response) {
        console.log("first axios back")
        console.log(response.data)
		console.log(response.data.starred_url)
    })
    .catch(function(err){
        console.log(err)
    })

console.log(something)

//==========================================================Axios root route
axios.get('http://localhost:2020/')
    .then(function(response) {
        console.log("OUR API!")
        console.log(response.data)
    })
    .catch(function(err) {
        console.log(err)
    })


//========================================================= Submitting toursit site visit form to the database
function handleSubmitSite(event) {
    event.preventDefault()
    console.log(event.target)
    console.log("Submitting the Site form")
    
    console.log(this)
    var formData = new FormData(siteForm);
    console.log("form data")
    console.log(formData)
    
    axios.post('http://localhost:2020/sites', formData)
}
  
const siteForm = document.querySelector('#new-site-form')

siteForm.addEventListener('submit', function(event) {
    event.preventDefault()
    
    console.log(event)
    console.log("Submitting the Site form")
    
    var formData = new FormData(siteForm);
    console.log("form data")
    console.log(formData)
    
    axios.post('http://localhost:2020/sites', formData)
})
   
//=========================================================== Reterieve tourist sites in database using rendering
const renderAllRecords = function() {

    axios.get(`${url}/sites`)
        .then(function(res) {
            console.log(res.data)
            const recordsAttachPoint = document.querySelector('#tourist-sites')
            console.log(recordsAttachPoint)
            recordsAttachPoint.innerHTML = ""

            const mySites = res.data
            mySites.forEach(function(touristSite) {
                const newTr = document.createElement('tr')
                newTr.innerHTML = renderOneSite(touristSite)
                recordsAttachPoint.append(newTr)            
                })
        })
        .catch(function(err) {
            console.log(err)
        })

}
		

const renderOneSite = function(siteData) {
    const newHTML = `
    <div>
        <p text-align ="left"> <label> Province </label> ${siteData.province} </p>
        <p text-align ="left"> <label> Place </label> ${siteData.city} </p>
        <p text-align ="left"> <label> Tourist Site </label> ${siteData.place} </p>
        <p text-align ="left"> <img src =" ${siteData.image}" height ="200" width ="400"> </p>
        <hr>
    </div>
    `
    return newHTML
}

renderAllRecords()