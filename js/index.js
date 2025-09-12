<<<<<<< HEAD
// SIGNUP FORM
function customerSignup(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin"); // re-enable spinner
    if (spinItem) spinItem.style.display = "inline-block";
    const getName = document.getElementById("Name").value.trim();
    const getEmail = document.getElementById("Email").value.trim();
    const getPassword = document.getElementById("Password").value.trim();
    const getConfirm = document.getElementById("ConfirmPassword").value.trim();
    // validation
    if (!getName || !getEmail || !getPassword || !getConfirm) {
        Swal.fire({
             icon: 'info', 
             text: 'All fields are required!', 
             confirmButtonColor: "#2d85de" 
            });
        if (spinItem) spinItem.style.display = "none";
=======

// THIS CODE IS BASE URL FOR SIGNUP AND LOGIN ETC FUNCTIONALITY IN BYC PLATFORM
const baseUrl = "http://localhost:3001/byc/api/";

// SIGNUP FORM
function signUp(event) {
    event.preventDefault();
    // spinner
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";
    // localStorage.setItem("signId", id);

    const getName = document.getElementById("name").value.trim();
    const getEmail = document.getElementById("email").value.trim();
    const getPassword = document.getElementById("password").value.trim();
    const getConfirm = document.getElementById("confirmPassword").value.trim();
    const getRole = document.getElementById("role") ? document.getElementById("role").value : "customer";

    // validation
    if (!getName || !getEmail || !getPassword || !getConfirm) {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#2d85de"
        });
        spinItem.style.display = "none";
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
        return;
    }
    if (getConfirm !== getPassword) {
        Swal.fire({
            icon: 'warning',
<<<<<<< HEAD
            text: "Passwords don't match",
            confirmButtonColor: "#2d85de"
        });
        if (spinItem) spinItem.style.display = "none";
        return;
    }
    // request body (backend probably doesn’t need confirmPassword)
    const signData = { 
        name: getName, 
        email: getEmail, 
        password: getPassword,
        confirmPassword: getConfirm 
    };
    const signMethod = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(signData)
    };
    const url = "http://localhost:3001/byc/api/register"; 
    fetch(url, signMethod)
        .then(res => res.json())
        .then(result => {
            console.log(result);

            if (result._id) {
                localStorage.setItem("customerRegId", result._id);
=======
            text: 'Passwords don\'t match',
            confirmButtonColor: "#2d85de"
        });
        spinItem.style.display = "none";
        return;
    }
    // request body (JSON instead of FormData)
    const signData = {
        name: getName,
        email: getEmail,
        password: getPassword,
        confirmPassword: getConfirm,
        role: getRole
    };
    const signMethod = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signData)
    };
    const url = "http://localhost:3001/byc/api/register";
    fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            localStorage.setItem("adminIdd", result._id);
            if (result._id) { // success (backend sends saved user)
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
                Swal.fire({
                    icon: 'success',
                    text: 'Registration successful!',
                    confirmButtonColor: "#2d85de"
                });
                setTimeout(() => {
<<<<<<< HEAD
                    if (result.role === "customer") {
                        location.href = "./login.html";
                    } else {
                        location.href = "http://127.0.0.1:5500/index.html";
=======
                    if (result.role === "admin") {
                        location.href = "./index.html";
                    } else {
                        location.href = "http://127.0.0.1:5506/index.html";
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
                    }
                }, 2000);
            } else {
                Swal.fire({
                    icon: 'info',
                    text: result.message || 'Registration failed',
                    confirmButtonColor: "#2d85de"
                });
<<<<<<< HEAD
                 spinItem.style.display = "none";
            }
        })
        .catch(err => {
            console.error("Error:", err);
            Swal.fire({
                icon: 'error',
                text: 'Something went wrong! Try again later',
=======
                spinItem.style.display = "none";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                text: 'Something went wrong!, try again later',
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
                confirmButtonColor: "#2d85de"
            });
            spinItem.style.display = "none";
        });
}

<<<<<<< HEAD


function customerLogIn(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";
    const getEmail = document.getElementById("loginEmail").value;
    const getPassword = document.getElementById("loginPassword").value;
=======
// LOGIN FORM
function logIn(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";
    const getEmail = document.getElementById("email").value;
    const getPassword = document.getElementById("password").value;
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
    
    // validation
    if (getEmail === "" || getPassword === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#2d85de"
        })
        spinItem.style.display = "none";
        return;
    }
    // request body (JSON instead of FormData)
    const signData = JSON.stringify({
        email: getEmail,
        password: getPassword
    });
    const signMethod = {
        method: 'POST',
        headers: { "Content-Type": "application/json" }, // :white_check_mark: tell backend it's JSON
        body: signData
    };
    const url = "http://localhost:3001/byc/api/login";
    fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log("Login result:", result);
<<<<<<< HEAD
            if ( result.success && result.token && result._id) { // success (backend sends token)
                // Store the new token
                localStorage.setItem("customerLoginId", result._id);
                localStorage.setItem("customerToken", result.token);
                // Decode token to get current customer ID
                const currentCustomerId = localStorage.getItem("customerLoginId");
                // Get previously stored customer ID
                const prevCustomerId = localStorage.getItem("customerRegId");
                if (prevCustomerId  !== currentCustomerId) {
                    // Notify the user they are using a different account
                    Swal.fire({
                        icon: 'info',
                        text: 'You are logging in with a different customer account!',
=======
            if ( result.success) { // success (backend sends token)
                // Store the new token
                localStorage.setItem("adminIdd", result._id);
                localStorage.setItem("admintoken", result.token);
                // Decode token to get current admin ID
                const currentAdminId = getAdminIdFromToken(result.token);
                // Get previously stored admin ID
                const prevAdminId = localStorage.getItem("adminId");
                if (prevAdminId && prevAdminId !== currentAdminId) {
                    // Notify the user they are using a different account
                    Swal.fire({
                        icon: 'info',
                        text: 'You are logging in with a different admin account!',
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
                        confirmButtonColor: "#2d85de"
                    });
                setTimeout(() => {
                }, 1500);
<<<<<<< HEAD
                // Update stored customer ID to the current one
                localStorage.setItem("customerRegId", currentCustomerId);

                const loggedInUser = document.getElementById("loggedIn");
                const loggedOutUser = document.getElementById("loggedOut");
                if(loggedOutUser) loggedOutUser.style.display = "none";
                if(loggedInUser) loggedInUser.style.display = "inline-block";
                    
                } 
                Swal.fire({
                        icon: 'success',
                        text: 'Login successful!',
                        confirmButtonColor: "#2d85de"
                    });
                
                // redirect after a short delay
                setTimeout(() => {
                    location.href = "./index.html";
=======
                // Update stored admin ID to the current one
                localStorage.setItem("adminId", currentAdminId);
                // Continue login flow...
                 }
                Swal.fire({
                    icon: 'success',
                    text: 'Login successful!',
                    confirmButtonColor: "#2d85de"
                });
                // redirect after a short delay
                setTimeout(() => {
                    location.href = "dashboard.html";
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
                }, 1500);
                // saveAdminFromToken(result.token);
            } else {
                Swal.fire({
                    icon: 'info',
                    text: result.message || 'Login failed',
                    confirmButtonColor: "#2d85de"
                });
                spinItem.style.display = "none";
            }
        })
        .catch(error => {
            console.log('error', error);
            Swal.fire({
                icon: 'error',
                text: 'Email or password is incorrect. Please try again.',
                confirmButtonColor: "#2d85de"
            });
            spinItem.style.display = "none";
        });
}

<<<<<<< HEAD
//  function to handle the login/logout icon
function handleIconLog() {
    const loggedInUser = document.getElementById("loggedIn");   // hidden green-dot icon
    const loggedOutUser = document.getElementById("loggedOut"); // visible normal icon
    const customerId = localStorage.getItem("customerRegId");
    if (customerId) {
        // user is logged in
        if (loggedOutUser) loggedOutUser.style.display = "none";
        if (loggedInUser) loggedInUser.style.display = "inline-block";
    } else {
        // user is logged out
        if (loggedInUser) loggedInUser.style.display = "none";
        if (loggedOutUser) loggedOutUser.style.display = "inline-block";
    }
}




















// const BASE_URL = "http://127.0.0.1:3001/byc/api/products";
// Load SINGLE product
// async function loadSingleProduct(id) {
//   try {
//     const productId = localStorage.getItem("selectedProductId");
//     if (!productId) {
//       console.error("No product selected.");
//       return;
//     }
//     const response = await fetch(`${BASE_URL}/${productId}`);
//     if (!response.ok) throw new Error("Failed to fetch product");
//     const product = await response.json();
//     // Update UI
//     document.getElementById("prod-img").src = product.image || "./images/image17.png";
//     document.getElementById("prod-boxers-name").textContent = product.name || "No Name";
//     document.getElementById("prod-boxers-num").textContent = product.sku || product._id || "";
//     document.getElementById("prod-boxers-des").textContent = product.description || "No Description";
//     document.getElementById("prod-boxers-price").textContent = `₦${product.price || 0}`;
//     // Save product object for Wishlist use
//     document.getElementById("wishlist-btn").onclick = () => addToWishlist(product);
//   } catch (error) {
//     console.error("Error loading single product:", error);
//   }
// }

// async function loadSingleProduct(id) {
//   const productId = localStorage.getItem("selectedProductId");
//   const url = `http://127.0.0.1:3001/byc/api/products/${productId}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       document.getElementById("product-card").innerHTML =
//         "<p>:warning: Failed to load product.</p>";
//       return;
//     }
//     const product = await response.json();
//     if (product) {
//       // :white_check_mark: Fill UI
//       document.getElementById("prod-img").src = product.image || "./images/image17.png";
//       document.getElementById("prod-boxers-name").textContent = product.name || "No Name";
//       document.getElementById("prod-boxers-num").textContent = product.sku || product._id || "";
//       document.getElementById("prod-boxers-des").textContent = product.description || "No Description";
//       document.getElementById("prod-boxers-price").textContent = `₦${product.price || 0}`;
//       // :star: Handle Rating
//       const ratingContainer = document.getElementById("prod-boxers-rating");
//       const rating = product.rating || 0; // assuming API returns a number like 4.2
//       ratingContainer.innerHTML = "";
//       // Generate stars dynamically (max 5)
//       for (let i = 1; i <= 5; i++) {
//         if (i <= Math.floor(rating)) {
//           ratingContainer.innerHTML += `<span class="star"><i class="fa-solid fa-star fa-2xs" style="color: #FB8200; width: 14px;"></i></span>`;
//         } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
//           ratingContainer.innerHTML += `<span class="star"><i class="fa-solid fa-star-half-stroke fa-2xs" style="color: #FB8200; width: 14px;"></i></span>`;
//         } else {
//           ratingContainer.innerHTML += `<span class="star"><i class="fa-regular fa-star fa-2xs" style="color: #FB8200; width: 14px;"></i></span>`;
//         }
//       }
//       // Append rating number
//       ratingContainer.innerHTML += `<span class="rating ms-2">${rating.toFixed(2)}</span>`;
//     } else {
//       document.getElementById("product-card").innerHTML =
//         "<p>:x: Product not found.</p>";
//     }
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     document.getElementById("product-card").innerHTML =
//       "<p>:rotating_light: Error loading product.</p>";
//   }
// }
// // :heart: Wishlist function
// function addToWishlist(event) {
//   const productId = localStorage.getItem("selectedProductId");
//   if (!productId) return alert(":warning: No product selected");
//   let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//   if (!wishlist.includes(productId)) {
//     wishlist.push(productId);
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//     alert(":heart: Added to Wishlist");
//   } else {
//     alert(":warning: Already in Wishlist");
//   }
// }
// // Run on page load
// window.addEventListener("DOMContentLoaded", loadSingleProduct);

// async function loadSingleProduct() {
//   const productId = localStorage.getItem("selectedProductId");
//   const url = `http://127.0.0.1:3001/byc/api/products/${productId}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       document.getElementById("product-card").innerHTML =
//         "<p>:warning: Failed to load product.</p>";
//       return;
//     }
//     const product = await response.json();
//     if (product) {
//       // :white_check_mark: Fill UI
//       document.getElementById("prod-img").src = product.image || "./images/image17.png";
//       document.getElementById("prod-boxers-name").textContent = product.name || "No Name";
//       document.getElementById("prod-boxers-num").textContent = product.sku || product._id || "";
//       document.getElementById("prod-boxers-des").textContent = product.description || "No Description";
//       document.getElementById("prod-boxers-price").textContent = `₦${product.price || 0}`;
//       // :star: Handle Rating
//       const ratingContainer = document.getElementById("prod-boxers-rating");
//       const rating = product.rating || 0; // assuming API returns a number like 4.2
//       ratingContainer.innerHTML = "";
//       // Generate stars dynamically (max 5)
//       for (let i = 1; i <= 5; i++) {
//         if (i <= Math.floor(rating)) {
//           ratingContainer.innerHTML += `<span class="star"><i class="fa-solid fa-star fa-2xs" style="color: #FB8200; width: 14px;"></i></span>`;
//         } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
//           ratingContainer.innerHTML += `<span class="star"><i class="fa-solid fa-star-half-stroke fa-2xs" style="color: #FB8200; width: 14px;"></i></span>`;
//         } else {
//           ratingContainer.innerHTML += `<span class="star"><i class="fa-regular fa-star fa-2xs" style="color: #FB8200; width: 14px;"></i></span>`;
//         }
//       }
//       // Append rating number
//       ratingContainer.innerHTML += `<span class="rating ms-2">${rating.toFixed(2)}</span>`;
//     } else {
//       document.getElementById("product-card").innerHTML =
//         "<p>:x: Product not found.</p>";
//     }
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     document.getElementById("product-card").innerHTML =
//       "<p>:rotating_light: Error loading product.</p>";
//   }
// }
// // :heart: Wishlist function
// function addToWishlist(event) {
//   const productId = localStorage.getItem("selectedProductId");
//   if (!productId) return alert(":warning: No product selected");
//   let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
//   if (!wishlist.includes(productId)) {
//     wishlist.push(productId);
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//     alert(":heart: Added to Wishlist");
//   } else {
//     alert(":warning: Already in Wishlist");
//   }
// }
// // Run on page load
// window.addEventListener("DOMContentLoaded", loadSingleProduct);

// function getProduct() {
//     const container = document.getElementById("product-boxers");
//     // if (!container) {
//     //     console.error("Element with id 'product-boxers' not found");
//     //     return;
//     // }

//     const token = localStorage.getItem("key");
//     const dashItem = new Headers();
//     dashItem.append("Authorization", `Bearer ${token}`);

//     const catMethod = {
//         method: "GET",
//         headers: dashItem,
//     };

//     const url = "http://127.0.0.1:3001/byc/api/products";
//     // const url = `http://127.0.0.1:3001/byc/api/products/${id}`;
//     fetch(url, catMethod)
//         .then((response) => response.json())
//         .then((product) => {
//             console.log(product);

//             if (!product) {
//                 container.innerHTML = `<p>No product found</p>`;
//                 return;
//             }

//             // Fallbacks if some fields are missing
// //             const image =
// //                 product.image && product.image.trim() !== ""
// //                     ? product.image
// //                     : "./images/image 17.png";
// //             const name = product.name || "Unnamed Product";
// //             const productNumber = product.productNumber || "N/A";
// //             const description = product.description || "No description available";
// //             const price = product.price ? `₦${product.price}` : "Price not available";
// // // 
//             // Fill the UI with one product card
//             container.innerHTML = `
//                 <div class="card-aboutUs mb-3 mb-lg-0 w-100">
//                     <img src="${item.image}" class="img-fluid rounded-top" alt="${name}" style="max-width: 243px; max-height: 207px;">
//                     <div class="card-body ps-lg-2 ps-2 product-shadow">
//                         <h3 class="card-text pt-2">${name}</h3>
//                         <p class="text-p">${productNumber}</p>
//                         <p class="men-fash">${description}</p>
//                         <p class="mt-2 mt-lg-3 price">${price}</p>

//                         <!-- Buttons -->
//                         <div class="d-flex Wishlist-btn d-lg-none">
//                             <button class="btn d-flex ps-1 me-2 hidden-btn" 
//                                     style="width: 93px; height: 40px; border-radius: 5px; color: #BD3A3A; border: 1px solid #BD3A3A;">
//                                 <span><i class="far fa-heart me-2"></i></span>
//                                 <span style="font-size: 16px; font-weight: 600; font-family: 'Segoe UI', sans-serif;">Wishlist</span>
//                             </button>
//                             <button class="btn d-flex ps-1 pe-0 hidden-btn" 
//                                     style="width: 100px; height: 40px; border-radius: 5px; background-color: #BD3A3A; color: #FFFFFF; border: 1px solid #BD3A3A;">
//                                 <span><i class="fas fa-shopping-cart me-0"></i></span>
//                                 <span class="ps-2" style="font-size: 16px; font-weight: 600; font-family: 'Segoe UI', sans-serif;">Buy Now</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         })
//         .catch((error) => console.log("error", error));
// }
// window.onload = getProduct();


// function upDatePassword(event) {
//     event.preventDefault();

//     // const spinItem = document.querySelector(".spin2");
//     // spinItem.style.display = "inline-block";

//     const container = document.getElementById("product-card");
//     const prod-image = document.getElementById("prod-img");
//     const prod-boxers-Name = document.getElementById("prod-boxers-name");
//     const prod-boxers-num = document.getElementById("prod-boxers-num");
//     const prod-boxers-des = document.getElementById("prod-boxers-des");
//     const prod-boxers-price = document.getElementById("prod-boxers-price");
//     const prod-boxers-rating = document.getElementById("prod-boxers-rating");


//     if(updatePassEmail === "" || updatePassword === "" || confirmPassword === "") {
=======
// fucntion for handling login and signup token 

// Utility to decode JWT
function getAdminIdFromToken() {
    const token = localStorage.getItem("key");
    if (!token) return null;
    try {
        // JWT = header.payload.signature
        const payload = JSON.parse(atob(token.split('.')[1]));
        // const decoded = JSON.parse(atob(payload));
        return payload.id || payload._id || payload.adminId;
    } catch (e) {
        console.error("Failed to decode token:", e);
        return null;
    }
}
// function for previewing image from cloudinary 
function setaCatPrev(){
    const catImageInput = document.getElementById("imgprev");
    const catPreview = document.getElementById("category-cloud-prev");

    catImageInput.addEventListener("input", () => {
    const url = catImageInput.value.trim();
    if(url) {
    const secureUrl = url.startsWith("http://") ? url.replace("http://", "https://") : url;
    catPreview.src = secureUrl;
    catPreview.style.display = "block";
    } else {
    catPreview.style.display = "none";
    }
    });
}
 setaCatPrev();

// CATEGORY DASHBOARD STARTS HERE 

// // function for createcategory
function createCategory(event) {
    event.preventDefault();
    const catName = document.getElementById("catName").value;
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";

    // validation
    if (catName === "") {
        Swal.fire({
            icon: 'info',
            text: 'Input field cannot be empty!',
            confirmButtonColor: "#2d85de"
        })
        spinItem.style.display = "none";
        return;
    }
    if (catName.length < 3) {
        Swal.fire({
            icon: 'info',
            text: 'Input field must be at least 3 characters long!',
            confirmButtonColor: "#2d85de"
        })
        spinItem.style.display = "none";
        return;
    }
    else{
        const catData = JSON.stringify({
        name: catName
     });

    const catMethod = {
        method: 'POST',
        headers: { "Content-Type": "application/json" }, // :white_check_mark: tell backend it's JSON
        body: catData
    };
    const url = "http://localhost:3001/byc/document/api/categories";
    fetch(url, catMethod)
        .then(response => response.json())
        .then(result => {
            console.log("API Response:", result);
            if (result.success  === true || result.status === "success") { // success (backend sends saved user)
                Swal.fire({
                    icon: 'success',
                    text: result.message || 'Category created successfully!',
                    confirmButtonColor: "#2d85de"
                });
                setTimeout(() => {
                    location.reload();
                }, 2000) 
                totalCategory();
                totalProducts();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    text: result.message , //|| 'Failed to create category'
                    confirmButtonColor: "#2d85de"
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                text: 'Something went wrong. Please try again.',
                confirmButtonColor: "#2d85de"
            });
        })
        .finally(() => {
            spinItem.style.display = "none";
        });
    }
}

// function for get all categories 
function getAllCategory() {
    const scroll = document.querySelector(".scroll-object");
    const token = localStorage.getItem("key");
    const dashItem = new Headers();
    dashItem.append("Authorization", `Bearer ${token}`);
    const catMethod = {
        method: 'GET',
        headers: dashItem,
    };
    let data = [];
    const url = "http://localhost:3001/byc/document/api/categories";
    fetch(url, catMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            // If backend returns {success: true, data: [...]}
            // const categories =  result;
            // if (!categories || categories.length === 0) {
            //     scroll.innerHTML = `<p>No records found</p>`;
            //     return;
            // }
            if (result.length === 0) {
            scroll.innerHTML = `<p>No records found</p>`;
            return;
            }
            // Build all cards in one go
                else{
                    result.map((item) => {
                    data += `
                    <div class="search-card">
                        <p>Name</p>
                        <p>${item.name}</p>
                         <p>ID</p>
                        <p>${item._id}</p>
                        <div class="text-start">
                            <button class="update-button js-btn mx-lg-2 px-lg-5 mb-3 mx-0" onclick="updateCategory('${item._id}')">Update</button>
                            <button class="delete-button js-btn mx-lg-2 px-lg-5 mb-3 mx-0" onclick="deleteCategory('${item._id}')">Delete</button>
                        </div>
                    </div>
                    `
                    scroll.innerHTML = data;
                })
            }
        })
        .catch(error => console.error('Error:', error));
}

// function to update category from the template
function updateCategory(id) {
  const getModal = document.getElementById("my-modal3");
  localStorage.setItem("catId", id);
  const catId = document.getElementById("updateId");
  const token = localStorage.getItem("key");
  const dashItem = new Headers();
  dashItem.append("Authorization", `Bearer ${token}`);
  const catMethod = {
    method: "GET",
    headers: dashItem,
  };
  const url = `http://localhost:3001/byc/document/api/categories/${id}`;
  fetch(url, catMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      // Adjust depending on your backend response structure
      if (result.category) {
        catId.setAttribute("value", result.category._id);
        // If you also want to prefill name field:
        document.getElementById("updateName").setAttribute("value", result.category.name);
      }
      getModal.style.display = "block";
    })
    .catch((error) => console.log("Error:", error));
}

// FUNCTION TO CLOSE CATEGORY MODAL
function closeCatModal() {
    const getModal = document.getElementById("my-modal3");
    getModal.style.display = "none";
}

// function to update category from the modal
function updateCategorymodel(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin2");
    spinItem.style.display = "inline-block";
    const getModal = document.getElementById("my-modal3");
    const getName = document.getElementById("updateName").value;
    const catIdInput = document.getElementById("updateId").value;
    if (getName === "" || catIdInput === "") {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#2d85de"
        });
        spinItem.style.display = "none";
        return;
    }
    const token = localStorage.getItem("key");
    // Send plain JSON instead of FormData for consistency with your backend
    const catData = JSON.stringify({ name: getName });
    fetch(`http://localhost:3001/byc/document/api/categories/${catIdInput}`, {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: catData
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if (result.success || result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: result.message || "Category updated successfully!",
                confirmButtonColor: "#2d85de"
            });
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            Swal.fire({
                icon: 'error',
                text: result.message || "Failed to update category",
                confirmButtonColor: "#2d85de"
            });
        }
    })
    .catch(error => console.error("Update error:", error))
    .finally(() => {
        spinItem.style.display = "none";
    });
}


// function updateCategorymodel(event) {
//     event.preventDefault();
//     spinItem = document.querySelector(".spin2");
//     spinItem.style.display = "inline-block";
//     const getModal = document.getElementById("my-modal3");
//     const getName = document.getElementById("updateName").value;
//     const catIdInput = document.getElementById("updateId").value;
//     if (getName === "" || catIdInput === "") {
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
//         Swal.fire({
//             icon: 'info',
//             text: 'All fields are required!',
//             confirmButtonColor: "#2D85DE"
//         })
//         spinItem.style.display = "none";
//         return;
//     }
<<<<<<< HEAD
//     if (confirmPassword !== updatePassword) {
//         Swal.fire({
//             icon: 'warning',
//             text: 'Passwords don\'t match',
=======
//     else {
//         const token = localStorage.getItem("key");
//         const dashItem = new Headers();
//         dashItem.append("Authorization", `Bearer ${token}`);
//         const myId = localStorage.getItem("catId");
//         const catData = new FormData();
//         catData.append("name", getName);
//         catData.append("category_id", myId);
//         const catMethod = {
//             method: 'PUT',
//             headers: dashItem,
//             body: catData
//         };
//         const url = `http://localhost:3001/byc/document/api/categories/${catIdInput}`;
//         fetch(url, catMethod)
//         .then(response => response.json())
//         .then(result => {
//             console.log(result)
//             if (result.status === "success") {
//                 getModal.style.display = "block";
//                 Swal.fire({
//                     icon: 'success',
//                     text: `${result.message}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 setTimeout(() => {
//                     location.reload();
//                 }, 4000)
//             }
//             else {
//                 Swal.fire({
//                     icon: 'info',
//                     text: `${result.status}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 spinItem.style.display = "none";
//             }
//         })
//         .catch(error => console.log('error', error));
//     }
// }

// Function TO delete CATEGORY
function deleteCategory(id) {
    const spinItem = document.querySelector(".spin");
    Swal.fire({
        title: 'Are you sure?',
        text: "This action will permanently delete the category!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            spinItem.style.display = "inline-block";
            const token = localStorage.getItem("key");
            const headers = new Headers();
            headers.append("Authorization", `Bearer ${token}`);
            fetch(`http://localhost:3001/byc/document/api/categories/${id}`, {
                method: 'DELETE',
                headers
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.success === true || result.status === "success") {
                    Swal.fire({
                        icon: 'success',
                        text: result.message || 'Category deleted successfully!',
                        confirmButtonColor: "#2d85de"
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                    localStorage.removeItem("catId");
                } else {
                    Swal.fire({
                        icon: 'info',
                        text: result.message || 'Failed to delete category',
                        confirmButtonColor: "#2d85de"
                    });
                    spinItem.style.display = "none";
                }
            })
            .catch(error => {
                console.log('Error:', error);
                Swal.fire({
                    icon: 'error',
                    text: 'Something went wrong. Please try again.',
                    confirmButtonColor: "#2d85de"
                });
                spinItem.style.display = "none";
            });
        }
    });
}

// function to get all categories 
function totalCategory() {
    const countElement = document.getElementById("category");
    const token = localStorage.getItem("key");
    fetch("http://localhost:3001/byc/document/api/categories", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(result => {
        countElement.textContent = result.length;
    })
    .catch(err => console.error("Error fetching categories:", err));
}
// CATEGORY DASHBOARD ENDS HERE




// PRODUCT DASHBOARD STARTS HERE

// FUNCTION TO CREATE PRODUCTS 
function createProduct(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";
    const prodName = document.getElementById("product-name").value;
    const prodImageUrl = document.getElementById("product-image").value; // Cloud URL
    const prodPrice = document.getElementById("product-price").value;
    const prodDesc = document.getElementById("product-description").value;
    const prodNumber = document.getElementById("product-Number").value;
    const prodStock = document.getElementById("numberInStock").value;
    const prodCategoryId = document.getElementById("product-categoryId").value;
    // Simple validation
    if (!prodName || !prodImageUrl || !prodPrice || !prodDesc || !prodNumber || !prodStock || !prodCategoryId) {
        Swal.fire("Info", "All fields are required!", "info");
        spinItem.style.display = "none";
        return;
        

    }
    if (prodName.length < 3) {
        Swal.fire("Info", "Product Name Must be at least 3 characters long!", "info");
        return;
    }
    if(prodDesc.length < 5){
        Swal.fire("Info", "Product Description Must be at least 5 characters long!", "info");
        return;
    }
    if(prodNumber.length < 1 ){
        Swal.fire("Info", "Product Number Must be at least 3 characters long!", "info");
        return;
    }
    if(prodCategoryId.length < 15){
        Swal.fire("Info", "Please enter a valid Category ID! or Create New Category", "info");
        return;
    }
    if(prodImageUrl.length < 10){
        Swal.fire("Info", "Please enter a valid Cloudinary Image URL!", "info");
        return;
    }else{
        const prodData = JSON.stringify({
    name: prodName,
    image: prodImageUrl,
    price: prodPrice,
    description: prodDesc,
    productNumber: prodNumber,
    numberInStock: prodStock,
    categoryId: prodCategoryId
});
const prodMethod = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: prodData
};
const url = "http://localhost:3001/byc/api/products";
fetch(url, prodMethod)
    .then(async response => {
        // always parse JSON, even for error responses
        const result = await response.json();
        if (response.ok) return result; // HTTP 200-299
        throw result; // forward error JSON
    })
    .then(result => {
        Swal.fire({
            icon: 'success',
            text: result.message || 'Product created successfully!',
            confirmButtonColor: "#2d85de"
        });
        setTimeout(() => location.reload(), 2000);
        totalCategory();
        totalProducts();
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            text: error.message || 'Something went wrong. Please try again.',
            confirmButtonColor: "#2d85de"
        });
    })
    .finally(() => {
        spinItem.style.display = "none";
    });
    }

}

// function to get all PRODUCTS 
function getAllProducts() {
    const scroll = document.querySelector(".scroll-object");
    const token = localStorage.getItem("key");
    const dashItem = new Headers();
    dashItem.append("Authorization", `Bearer ${token}`);
    const catMethod = {
        method: 'GET',
        headers: dashItem,
    };
    let data = [];
    const url = "http://localhost:3001/byc/api/products";
    fetch(url, catMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            // If backend returns {success: true, data: [...]}
            // const categories =  result;
            // if (!categories || categories.length === 0) {
            //     scroll.innerHTML = `<p>No records found</p>`;
            //     return;
            // }
            if (result.length === 0) {
            scroll.innerHTML = `<p>No records found</p>`;
            return;
            }
            // Build all cards in one go
                else{
                    result.map((item) => {
                    data += `
                    <div class="search-card border border-danger">
                        <hr>
                        <p class="font-weight-bold text-danger">Product Name</p>
                        <p>${item.name}</p>
                        
                        <p class="font-weight-bold text-danger">Product Image</p>
                        <p>${item.image}</p>
                        
                        <p class="font-weight-bold text-danger">Product price</p>
                        <p>${item.price}</p>
                        
                        <p class="font-weight-bold text-danger">description</p>
                        <p>${item.description}</p>
                        
                        <p class="font-weight-bold text-danger">Product Number</p>
                        <p>${item.productNumber}</p>
                        
                        <p class="font-weight-bold text-danger">Number In Stock</p>
                        <p>${item.numberInStock}</p>
                        
                        <p class="font-weight-bold text-danger">Product ID</p>
                        <p>${item._id}</p>
                        
                         <p class="font-weight-bold text-danger">Category ID</p>
                        <p>${item.category._id}</p> 
                        
                        <p class="font-weight-bold text-danger">Category Name</p>
                        <p>${item.category.name}</p>
                        <hr>
                        <div class="text-start text-lg-center">
                            <button class="update-button js-btn mx-lg-2 px-lg-5 mb-3 mx-0" onclick="updateProduct('${item._id}')">Update</button>
                            <button class="delete-button js-btn mx-lg-2 px-lg-5 mx-0" onclick="deleteProduct('${item._id}')">Delete</button>
                        </div>
                    </div>
                    `
                    scroll.innerHTML = data;
                })
            }
        })
        .catch(error => console.error('Error:', error));
}

// function to update product from the template
function updateProduct(id) {
  const getModal = document.getElementById("my-modal3");
  localStorage.setItem("productId", id);
  const token = localStorage.getItem("key");
  const dashItem = new Headers();
  dashItem.append("Authorization", `Bearer ${token}`);
  const prodMethod = {
    method: "GET",
    headers: dashItem,
  };
  fetch(`http://localhost:3001/byc/api/products/${id}`, prodMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (!result.product) {
        console.error("No product in response!");
        return;
      }
      const product = result.product;
      // Prefill inputs
    //   document.getElementById("product-id").value = product._id;
      document.getElementById("productUpdate-name").value = product.name;
      document.getElementById("productUpdate-image").value = product.image;
      document.getElementById("productUpdate-price").value = product.price;
      document.getElementById("productUpdate-description").value = product.description;
      document.getElementById("productUpdate-Number").value = product.productNumber;
      document.getElementById("Update-numberInStock").value = product.numberInStock;
      // Category
      if (product.category) {
        document.getElementById("category-Name").value = product.category.name;
        document.getElementById("category-Id").value = product.category._id;
      }
      // Show modal
      getModal.style.display = "block";
    })
    .catch((error) => console.error("Error:", error));
}

// function to delete a product
function deleteProduct(id) {
    const spinItem = document.querySelector(".spin");
    Swal.fire({
        title: 'Are you sure?',
        text: "This action will permanently delete the product!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            spinItem.style.display = "inline-block";
            const token = localStorage.getItem("key");
            const headers = new Headers();
            headers.append("Authorization", `Bearer ${token}`);
            fetch(`http://localhost:3001/byc/api/products/${id}`, {
                method: 'DELETE',
                headers
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.success === true || result.status === "success") {
                    Swal.fire({
                        icon: 'success',
                        text: result.message || 'Product deleted successfully!',
                        confirmButtonColor: "#2d85de"
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                    localStorage.removeItem("productId");
                } else {
                    Swal.fire({
                        icon: 'info',
                        text: result.message || 'Failed to delete category',
                        confirmButtonColor: "#2d85de"
                    });
                    spinItem.style.display = "none";
                }
            })
            .catch(error => {
                console.log('Error:', error);
                Swal.fire({
                    icon: 'error',
                    text: 'Something went wrong. Please try again.',
                    confirmButtonColor: "#2d85de"
                });
                spinItem.style.display = "none";
            });
        }
    });
}

// function to update product from the modal
async function updateProductModel(event) {
  event.preventDefault();
  const spinItem = document.querySelector(".spin2");
  spinItem.style.display = "inline-block";
  const productIdStored = localStorage.getItem("productId");
  const productId = document.getElementById("product-ID").value  = productIdStored;
  const prodUpdateName = document.getElementById("productUpdate-name").value;
  const prodUpdateImage = document.getElementById("productUpdate-image").value;
  const prodUpdatePrice = document.getElementById("productUpdate-price").value;
  const prodUpdateDescription = document.getElementById("productUpdate-description").value;
  const prodUpdateNumber = document.getElementById("productUpdate-Number").value;
  const prodUpdateInStock = document.getElementById("Update-numberInStock").value;
  const prodCatId = document.getElementById("category-Id").value;
  const prodCatName = document.getElementById("category-Name").value;

  const token = localStorage.getItem("key");
  const prodData = {
    name: prodUpdateName,
    image: prodUpdateImage,
    price: prodUpdatePrice,
    description: prodUpdateDescription,
    productNumber: prodUpdateNumber,
    numberInStock: prodUpdateInStock,
    categoryId: prodCatId,
  };
  try {
    const response = await fetch(`http://localhost:3001/byc/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prodData),
    });
    // :white_check_mark: Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Server did not return JSON. Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    if (result.success) {
      Swal.fire({
        icon: "success",
        text: result.message || "Product updated successfully!",
        confirmButtonColor: "#2d85de",
      });
      setTimeout(() => location.reload(), 2000);
    } else {
      Swal.fire({
        icon: "error",
        text: result.message || "Failed to update product",
        confirmButtonColor: "#2d85de",
      });
    }
  } catch (error) {
    console.error("Update error:", error);
    Swal.fire({
      icon: "error",
      text: `Update failed: ${error.message}`,
      confirmButtonColor: "#2d85de",
    });
  } finally {
    spinItem.style.display = "none";
  }
}
// FUNCTION TO CLOSE PRODUCT MODAL
function closeCatModal() {
    const getModal = document.getElementById("my-modal3");
    getModal.style.display = "none";
}




// Function TO GET TOTAL PRODUCTS
function totalProducts() {
    const totalProd = document.getElementById("totalprod");
    const token = localStorage.getItem("key");
    fetch("http://localhost:3001/byc/api/products", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(result => {
        totalProd.textContent = result.length;
    })
    .catch(err => console.error("Error fetching products:", err));
}

// PRODUCT DASHBOARD ENDS HERE

// ADMIN DASHBOARD STARTS HERE
function updateAdmin(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";
    const updateName = document.getElementById("updateName").value;
    const updateEmail = document.getElementById("updateEmail").value;
    const token = localStorage.getItem("key");
    const adminId = localStorage.getItem("adminIdd"); 
    if (!updateName || !updateEmail) {
        Swal.fire({
            icon: 'info',
            text: 'All fields are required!',
            confirmButtonColor: "#2d85de"
        });
        spinItem.style.display = "none";
        return;
    }
    const updateData = { name: updateName, email: updateEmail };
    fetch(`http://localhost:3001/byc/api/register/${adminId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if (result.success || result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: result.message || 'Profile updated successfully!',
                confirmButtonColor: "#2d85de"
            });
            setTimeout(() => location.reload(), 2000);
        } else {
            Swal.fire({
                icon: 'error',
                text: result.message || 'Failed to update profile.',
                confirmButtonColor: "#2d85de"
            });
        }
    })
    .catch(error => {
        console.error('Update error:', error);
        Swal.fire({
            icon: 'error',
            text: 'Something went wrong. Please try again.',
            confirmButtonColor: "#2d85de"
        });
    })
    .finally(() => {
        spinItem.style.display = "none";
    });
}

// update password 
function upDatePassword(event) {
  event.preventDefault();
  const spinItem = document.querySelector(".spin2");
  spinItem.style.display = "inline-block";
  const updatePassEmail = document.getElementById("updatePassEmail").value;
  const updatePassword = document.getElementById("updatePassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const token = localStorage.getItem("key");
  const adminId = localStorage.getItem("adminIdd");
  if (!updatePassEmail || !updatePassword || !confirmPassword) {
    Swal.fire({ icon: 'info', text: 'All fields are required!', confirmButtonColor: "#2d85de" });
    spinItem.style.display = "none";
    return;
  }
  if (updatePassword !== confirmPassword) {
    Swal.fire({ 
        icon: 'warning', 
        text: "Passwords don't match", 
        confirmButtonColor: "#2d85de" 
    });
    spinItem.style.display = "none";
    return;
  }
  
  const updateData = {
    currentEmail: updatePassEmail,
    newPassword: updatePassword,
    confirmPassword: confirmPassword
  };
  fetch(`http://localhost:3001/byc/api/login/${adminId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updateData)
  })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      if (result.success || result.success === true) {
            Swal.fire({ 
                icon: 'success', 
                text: result.message, 
                confirmButtonColor: "#2d85de" 
            });
            setTimeout(() => {
            localStorage.clear();
            location.href = "index.html";
            }, 2000);
        } else {
                Swal.fire({ 
                    icon: 'error', 
                    text: result.message || 'current email or password is incorrect', 
                    confirmButtonColor: "#de2d97ff" 
                });
                 setTimeout(() => {
                 }, 2000);
            }
    })
    .catch(err => {
      console.error('Update error:', err);
      Swal.fire({
            icon: 'error', 
            text: 'Server error. Please try again.', 
            confirmButtonColor: "#2d85de" 
      });
    })
    .finally(() => spinItem.style.display = "none");
}

function goToLoginPage(event){
    event.preventDefault();
    location.href = "./index.html";

}

// function upDateAdmin(event) {
//     event.preventDefault();

//     const spinItem = document.querySelector(".spin");
//     spinItem.style.display = "inline-block";

//     const updateName = document.getElementById("updateName").value;
//     const updateEmail = document.getElementById("updateEmail").value;
//     const token = localStorage.getItem("key");

//     // validation
//     if(updateName === "" || updateEmail === "") {
//         Swal.fire({
//             icon: 'info',
//             text: 'All fields are required!',
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
//             confirmButtonColor: "#2D85DE"
//         })
//         spinItem.style.display = "none";
//         return;
//     }
<<<<<<< HEAD

//     else {
//         const token = localStorage.getItem("key");
//         const dashItem = new Headers();
//         dashItem.append("Authorization", `Bearer ${token}`);
//         const updateData = new FormData();
//         updateData.append("email", updatePassEmail);
//         updateData.append("password", updatePassword);
//         updateData.append("password_confirmation", confirmPassword);

//         const updateMethod = {
//             method: 'POST',
//             headers: dashItem,
//             body: updateData
//         };
//         const url = "http://127.0.0.1:3001/byc/api/products";
=======
//     else {
//         const updateData = {
//         name: updateName,
//         email: updateEmail
//         };
//         const updateMethod = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(updateData)
//         };

//         // calling the API
//         const url = `http://localhost:3001/byc/api/register/${key}`;
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
//         fetch(url, updateMethod)
//         .then(response => response.json())
//         .then(result => {
//             console.log(result)
//             if (result.status === "success") {
//                 Swal.fire({
//                     icon: 'success',
//                     text: `${result.message}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 setTimeout(() => {
<<<<<<< HEAD
//                     localStorage.clear();
//                     location.href = "index.html";
//                 }, 4000)
//             }
//             else {
//                 Swal.fire({
//                     icon: 'info',
=======
//                     location.reload();
//                 }, 3000)
//             }
//             else {
//                 Swal.fire({
//                     icon: 'error',
>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
//                     text: `${result.message}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 spinItem.style.display = "none";
//             }
//         })
<<<<<<< HEAD

//     }
// }


// function getProducts(id) {
//     // const container = document.getElementById(product-card);
//     const container = document.getElementById('product-card');

//     const token = localStorage.getItem("key");
//     const dashItem = new Headers();
//     dashItem.append("Authorization", `Bearer ${token}`);
//     const catMethod = {
//         method: 'GET',
//         headers: dashItem,
//     };
//     let data = [];
//     const url = `http://127.0.0.1:3001/byc/api/products/${id}`;
//     fetch(url, catMethod)
//     .then(response => response.json())
//     .then(result => {
//         console.log(result)
//         if (result.length === 0) {
//             container.innerHTML = `<p>No records found</p>`;
//             return;
//         }
//         else {
//             result.map((item) => {
//                  data += `
//                    <div class="card-aboutUs">
//                       <div id="card-aboutUs">
//                         <img src="${item.image}" alt="" id="prod-img">
//                         <div id="prod-boxers">
//                             <p id="prod-boxers-name">${item.name}</p>
//                             <p id="prod-boxers-num">${item.productNumber}</p>
//                             <p id="prod-boxers-des">${item.description}</p>
//                             <p id="prod-boxers-price">${item.price}</p>
//                             <p id="prod-boxers-num">${item.productNumber}</p>
//                       </div>
                      
//                     </div>
//                 `
//                 container.innerHTML = data;
//             })
//         }
//     })
//     .catch(error => console.log('error', error));
// }


// function deleteCategory(id) {
//     // const getModal = document.getElementById("my-modal3");
//     // localStorage.setItem("catId", id);
//     const token = localStorage.getItem("key");
//     const dashItem = new Headers();
//     dashItem.append("Authorization", `Bearer ${token}`);
//     const catMethod = {
//         method: 'GET',
//         headers: dashItem,
//     };
//     const url = `${baseUrl}/delete_category/${id}`;
//     fetch(url, catMethod)
//         .then(response => response.json())
//         .then(result => {
//         console.log(result)
//         if (result.status === "success") {
//         Swal.fire({
//             icon: 'success',
//             text: `${result.message}`,
//             confirmButtonColor: "#2D85DE"
//         })
//         setTimeout(() => {
//             location.reload();
//         }, 4000)
//          }
//          else {
//                 Swal.fire({
//                     icon: 'info',
//                     text: `${result.status}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 spinItem.style.display = "none";
//          }

//     })
//     .catch(error => console.log('error', error));
// }


// async function loadProducts() {
//   try {
//     // Replace this URL with your actual API endpoint
//     const response = await fetch('localhost:3001/byc/api/products');
//     if (!response.ok) throw new Error('Failed to fetch products');
//     const products = await response.json();
//     const container = document.getElementById('product-container');
//     container.innerHTML = ''; // Clear existing content
//     products.forEach(product => {
//       // Create product card (customize according to your UI)
//       const productCard = document.createElement('div');
//       productCard.classList.add('product-card'); // add your CSS class
//       productCard.innerHTML = `
//         <img src="${product.image}" alt="${product.name}" class="product-image"/>
//         <h3 class="product-name">${product.name}</h3>
//         <p class="product-price">$${product.price}</p>
//         <p class="product-description">${product.description}</p>
//       `;
//       container.appendChild(productCard);
//     });
//   } catch (error) {
//     console.error('Error loading products:', error);
//     document.getElementById('product-container').innerHTML = '<p>Failed to load products.</p>';
//   }
// }
// // Call function on page load
// window.addEventListener('DOMContentLoaded', loadProducts);
=======
//         .catch(error => console.log('error', error));
//         spinItem.style.display = "none";
//     }

// }


//  LOGOUT FUNCTION
function logout() {
        Swal.fire({
            showCancelButton: true,
            confirmButtonText: 'Yes, Sure',
            cancelButtonText: 'No, Cancel',
            confirmButtonColor: "#2D85DE",
            cancelButtonColor: "#d33",
        })
        .then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                // localStorage.removeItem("key");
                Swal.fire({
                    icon: 'success',
                    text: 'You have successfully logged out',
                    confirmButtonColor: "#2D85DE",
                })
                setTimeout(() => {
                    location.href = "index.html";
                }, 2000);
            }
            else if (result.isDismissed) {
                Swal.fire({
                    icon: 'info',
                    text: 'You cancelled the logout',
                    confirmButtonColor: "#2D85DE",
                })
                 setTimeout(() => {
                    location.href = "dashboard.html";
                }, 1000);
            }
        })
}








>>>>>>> b4f7524bc04383ba2e0fa30e4e7a23e08acc32c3
