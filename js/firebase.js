var firebaseConfig = {
    apiKey: "AIzaSyAkixkZ81kdi9XxZpIrJv2Jtf4oDVZFPUo",
    authDomain: "sbs-sound.firebaseapp.com",
    projectId: "sbs-sound",
    storageBucket: "sbs-sound.appspot.com",
    messagingSenderId: "197168045168",
    appId: "1:197168045168:web:8edb73c60742cb3d7be8b5",
    measurementId: "G-2MYNNL16QF"
  };
  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore();



  function createProductHTML(product) {
    return `
    <div class="col-lg-6 wow bounceInUp" >
        <div class="menu-item d-flex align-items-center">
            <img class="flex-shrink-0 img-fluid rounded-circle" src="${product.photo}" alt="">
            <div class="w-100 d-flex flex-column text-start ps-4">
                <div class="d-flex justify-content-between border-bottom border-primary pb-2 mb-2 product_info">
                    <h4>${product.materiel}</h4>
                    <h4 class="text-primary">${product.prix}DNT</h4>
                </div>
                <p class="mb-0">${product.description}</p>
                
            </div>
           
        </div>
         <a href="#" class="btn btn-primary px-4 py-2 rounded-pill" data-toggle="modal" data-target="#bookingModal">Book</a>
    </div>`;
}


function displayProducts() {
    db.collection("produit").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productHTML = createProductHTML(product);

            // Append the product to the corresponding tab
            if (product.type === 'Lumiere') {
                document.querySelector('#tab-8 .row').insertAdjacentHTML('beforeend', productHTML);
            } else if (product.type === 'Sono') {
                document.querySelector('#tab-7 .row').insertAdjacentHTML('beforeend', productHTML);
            } else {
                document.querySelector('#tab-9 .row').insertAdjacentHTML('beforeend', productHTML);
            }

            // Also add to All Products tab
            document.querySelector('#tab-6 .row').insertAdjacentHTML('beforeend', productHTML);
        });
    }).catch((error) => {
        console.error("Error getting documents: ", error);
    });
}

// Call displayProducts function after DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    displayProducts();
});
