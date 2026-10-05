var fullName = document.getElementById('fullName');
var email = document.getElementById('email');
var phoneNumber = document.getElementById('phoneNumber');
var address = document.getElementById('address');
var notes = document.getElementById('notes');
var select = document.getElementById('select');
var contactPhotoInput = document.getElementById('contactPhotoInput');
var btnAdd = document.getElementById('btnAdd');
var btnUpdate = document.getElementById('btnUpdate');
var remove = document.getElementById('remove');
var add = document.getElementById('add');
var searchInput = document.getElementById('searchInput');
var modalElement = document.getElementById('addContactModal');
var contacts = []
var favorites = []
var emergency = []

if (localStorage.getItem('contactsContainer') !== null && localStorage.getItem('favoritesContainer') !== null && localStorage.getItem('emergencyContainer')) {
    var contacts = JSON.parse(localStorage.getItem('contactsContainer'))
    var favorites = JSON.parse(localStorage.getItem('favoritesContainer'))
    var emergency = JSON.parse(localStorage.getItem('emergencyContainer'))
    displayContact()
    displayFavorites()
    displayEmergency()

}

function addContact() {
    var contact = {
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        address: address.value,
        notes: notes.value,
        select: select.value,
        contactPhotoInput: contactPhotoInput.files[0] ? `img/${contactPhotoInput.files[0].name}` : 'img/avatar-2.jpg'
    }
    Swal.fire({
        title: "Added!",
        icon: "success",
        text: "Contact has been added successfully.",
        draggable: true
    });
    contacts.push(contact)
    localStorage.setItem('contactsContainer', JSON.stringify(contacts))
    displayContact()
    clearInputs()
    var modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
        modalInstance.hide();
    }
}

btnAdd.addEventListener('click', addContact)

function displayContact() {
    let cartona = ''
    let favCartona = ''
    for (let i = 0; i < contacts.length; i++) {



        cartona += `<div class="col-sm-12 col-lg-6 p-2">
    <div class="card p-3 rounded-4 border-0 bg-white shadow-sm h-100 justify-content-between">
        <div class="inner">
            <div class="d-flex">
                <div>
                    <img style="height: 60px; width: 60px;" class="rounded-4 me-3" src="${contacts[i].contactPhotoInput}" alt="">
                </div>
                <div class="d-flex flex-column">
                    <h3 class="fs-6 fw-bold pt-1">${contacts[i].fullName}</h3>
                    <div class="d-flex align-items-center">
                        <div class="icon-p p-1 gap-1 d-flex justify-content-center align-items-center rounded-2 me-2">
                            <i class="fa-solid fa-phone" style="color: rgb(21, 93, 252);"></i>
                        </div>
                        <span class="phone text-secondary">${contacts[i].phoneNumber}</span>
                    </div>
                </div>
            </div>

            <div class="mt-2 d-flex align-items-center">
                <span class="icon-p2 p-1 rounded-2 me-2"><i class="fa-solid fa-envelope" style="color: rgb(127, 34, 254);"></i></span>
                <span class="phone text-secondary">${contacts[i].email}</span>
            </div>

            <div class="mt-2 d-flex align-items-center">
                <span class="icon-p3 p-1 rounded-2 me-2"><i class="fa-solid fa-location-dot" style="color: rgb(0, 153, 102);"></i></span>
                <span class="phone text-secondary">${contacts[i].address}</span>
            </div>

            <div class="icon-p4 py-1 px-2 mt-2 rounded-2 d-inline-block">${contacts[i].select}</div>
        </div>

        <div class="footer d-flex align-items-center justify-content-between pt-3 mt-3 border-top">
            <div>
                <span class="icon-p5 rounded-2 p-2 me-2"><i class="fa-solid fa-phone" style="color: rgb(0, 153, 102);"></i></span>
                <span class="icon-p2 p-2 rounded-2"><i class="fa-solid fa-envelope" style="color: rgb(127, 34, 254);"></i></span>
            </div>
            <div>
            
                <button id='add'  type='button' onclick='addFav(${i})' class="icon-p7 p-2 border-0 yellow rounded-2 me-2"><i class="fa-regular fa-star" style="color: #9da5b2;"></i></button>
                <button onclick='addEme(${i})' class="icon-p7 p-2 border-0 red rounded-2 me-2"><i class="fa-regular fa-heart" style="color: #9da5b2;"></i></button>
                <button onclick='setUpdate(${i})' class="icon-p7 p-2 border-0 purgandy rounded-2 me-2"><i class="fa-solid fa-pen" style="color: #6a7282;"></i></button>
                <button onclick='deleteContact(${i})' class="icon-p7 p-2 border-0 trash rounded-2 me-2"><i class="fa-solid fa-trash" style="color: #6a7282;"></i></button>
            </div>
        </div>
    </div>
</div>`


        favCartona += `                                <div class="col-12">
                                    <div class="inner p-2 fav-all d-flex align-items-center justify-content-between">
                                        <div class="d-flex align-items-center">
                                            <img class="me-2 rounded-2" style="width: 40px; height: 40px; object-fit: cover;" src="${contacts[i].contactPhotoInput}"
                                                alt="human-photo">
                                            <div class="d-flex flex-column justify-content-center align-items-center">
                                                <h4 class="fav-h4 m-0">${contacts[i].fullName}</h4>
                                                <p class="fav-p m-0">${contacts[i].phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div class="">
                                          <button class="p-2 call rounded-2 border-0 p-0"> <i class="fa-solid fa-phone" style="color: #009966;"></i></button>  
                                        </div>
                                    </div>
                                </div>`

    }
    document.getElementById('demo').innerHTML = cartona;
    document.getElementById('total').innerHTML = contacts.length;
    document.getElementById('fav-total').innerHTML = favorites.length;
    document.getElementById('eme-total').innerHTML = emergency.length;

}


function deleteContact(x) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            contacts.splice(x, 1);
            favorites.splice(x, 1);
            emergency.splice(x, 1);
            localStorage.setItem('favoritesContainer', JSON.stringify(favorites));
            localStorage.setItem('contactsContainer', JSON.stringify(contacts));
            localStorage.setItem('emergencyContainer', JSON.stringify(emergency));
            displayContact()
            displayEmergency()
            displayFavorites()



            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }

    });
}
let x;
let mainBtn = document.getElementById('mainBtn');

function setUpdate(index) {
    x = index
    fullName.value = contacts[index].fullName
    email.value = contacts[index].email
    phoneNumber.value = contacts[index].phoneNumber
    select.value = contacts[index].select
    address.value = contacts[index].address
    notes.value = contacts[index].notes
    if (contactPhotoInput) {
        contactPhotoInput.value = ''
    }
    btnAdd.classList.add('d-none')
    btnUpdate.classList.remove('d-none')
    let myModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    myModal.show();
}

function updateContact() {
    let photoPath = "img/avatar-2.jpg";

    if (contactPhotoInput.files.length > 0) {
        photoPath = `img/${contactPhotoInput.files[0].name}`;
    }



    let contact = {
        fullName: fullName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        select: select.value,
        address: address.value,
        notes: notes.value,
        contactPhotoInput: photoPath
    }
    Swal.fire({
        title: "Updated!",
        icon: "success",
        text: "Contact has been Updated successfully.",
        draggable: true
    });
    contacts.splice(x, 1, contact)
    localStorage.setItem('contactsContainer', JSON.stringify(contacts))
    clearInputs()
    displayContact()
    let myModal = bootstrap.Modal.getOrCreateInstance(modalElement);
    myModal.hide();


}
btnUpdate.addEventListener('click', updateContact)

function clearInputs() {
    fullName.value = ''
    email.value = ''
    address.value = ''
    phoneNumber.value = ''
    select.value = ''
    notes.value = ''
    contactPhotoInput.value = ''
}

function search() {
    let cartona = ''
    let text = searchInput.value
    for (let i = 0; i < contacts.length; i++) {

        if (contacts[i].fullName.toLowerCase().includes(text.toLowerCase())) {

            cartona += `<div class="col-sm-12 col-lg-6 p-2">
    <div class="card p-3 rounded-4 border-0 bg-white shadow-sm h-100 justify-content-between">
        <div class="inner">
            <div class="d-flex">
                <div>
                    <img style="height: 60px; width: 60px;" class="rounded-4 me-3" src="${contacts[i].contactPhotoInput}" alt="">
                </div>
                <div class="d-flex flex-column">
                    <h3 class="fs-6 fw-bold pt-1">${contacts[i].fullName}</h3>
                    <div class="d-flex align-items-center">
                        <div class="icon-p p-1 gap-1 d-flex justify-content-center align-items-center rounded-2 me-2">
                            <i class="fa-solid fa-phone" style="color: rgb(21, 93, 252);"></i>
                        </div>
                        <span class="phone text-secondary">${contacts[i].phoneNumber}</span>
                    </div>
                </div>
            </div>

            <div class="mt-2 d-flex align-items-center">
                <span class="icon-p2 p-1 rounded-2 me-2"><i class="fa-solid fa-envelope" style="color: rgb(127, 34, 254);"></i></span>
                <span class="phone text-secondary">${contacts[i].email}</span>
            </div>

            <div class="mt-2 d-flex align-items-center">
                <span class="icon-p3 p-1 rounded-2 me-2"><i class="fa-solid fa-location-dot" style="color: rgb(0, 153, 102);"></i></span>
                <span class="phone text-secondary">${contacts[i].address}</span>
            </div>

            <div class="icon-p4 py-1 px-2 mt-2 rounded-2 d-inline-block">${contacts[i].select}</div>
        </div>

        <div class="footer d-flex align-items-center justify-content-between pt-3 mt-3 border-top">
            <div>
                <span class="icon-p5 rounded-2 p-2 me-2"><i class="fa-solid fa-phone" style="color: rgb(0, 153, 102);"></i></span>
                <span class="icon-p2 p-2 rounded-2"><i class="fa-solid fa-envelope" style="color: rgb(127, 34, 254);"></i></span>
            </div>
            <div>
            
                <button  class="icon-p7 p-2 border-0 yellow rounded-2 me-2"><i class="fa-regular fa-star" style="color: #9da5b2; pointer-events: none"></i></button>
                <button class="icon-p7 p-2 border-0 red rounded-2 me-2"><i class="fa-regular fa-heart" style="color: #9da5b2;"></i></button>
                <button onclick='setUpdate(${i})' class="icon-p7 p-2 border-0 purgandy rounded-2 me-2"><i class="fa-solid fa-pen" style="color: #6a7282;"></i></button>
                <button onclick='deleteContact(${i})' class="icon-p7 p-2 border-0 trash rounded-2 me-2"><i class="fa-solid fa-trash" style="color: #6a7282;"></i></button>
            </div>
        </div>
    </div>
</div>`

        }
    }
    document.getElementById('demo').innerHTML = cartona;
}

searchInput.addEventListener('input', search)




function addFav(index) {
    let selectedcontact = contacts[index]



    let isExist = favorites.some(function (fav) {
        return fav.phoneNumber == selectedcontact.phoneNumber
    })



    if (!isExist) {
        favorites.push(selectedcontact)
        localStorage.setItem('favoritesContainer', JSON.stringify(favorites))
        displayFavorites()
        Swal.fire({
            title: "Added to Favorites!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false
        });
    }

}






function displayFavorites() {
    let favCartona = '';

    for (let i = 0; i < favorites.length; i++) {
        favCartona += `<div class="col-12">
            <div class="inner p-2 fav-all d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img class="me-2 rounded-2" style="width: 40px; height: 40px; object-fit: cover;" src="${favorites[i].contactPhotoInput}" alt="photo">
                    <div class="d-flex flex-column justify-content-center align-items-start">
                        <h4 class="fav-h4 m-0">${favorites[i].fullName}</h4>
                        <p class="fav-p m-0 text-muted">${favorites[i].phoneNumber}</p>
                    </div>
                </div>
                <div>
                    <button class="p-2 call rounded-2 border-0"><i class="fa-solid fa-phone" style="color: #009966;"></i></button>
                </div>
            </div>
        </div>`;
    }
    // add.classList.add('d-none')
    // remove.classList.remove('d-none')

    if (document.getElementById('fav')) document.getElementById('fav').innerHTML = favCartona;
}


function addEme(index) {

    let selectedcontact = contacts[index]

    let isExist = emergency.some(function (eme) {
        return eme.phoneNumber == selectedcontact.phoneNumber
    })


    if (!isExist) {
        emergency.push(selectedcontact)
        localStorage.setItem('emergencyContainer', JSON.stringify(emergency))
        displayContact()
        displayEmergency()
        Swal.fire({
            title: "Added to Emergency!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false
        });
    }

}


function displayEmergency() {
    var cartona = ''


    for (let i = 0; i < emergency.length; i++) {
        cartona += `<div class="col-12">
            <div class="inner p-2 fav-all d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img class="me-2 rounded-2" style="width: 40px; height: 40px; object-fit: cover;" src="${emergency[i].contactPhotoInput}" alt="photo">
                    <div class="d-flex flex-column justify-content-center align-items-start">
                        <h4 class="fav-h4 m-0">${emergency[i].fullName}</h4>
                        <p class="fav-p m-0 text-muted">${emergency[i].phoneNumber}</p>
                    </div>
                </div>
                <div>
                    <button class="p-2 call rounded-2 border-0"><i class="fa-solid fa-phone" style="color: #009966;"></i></button>
                </div>
            </div>
        </div>`

    }
    document.getElementById('eme-card').innerHTML = cartona
}