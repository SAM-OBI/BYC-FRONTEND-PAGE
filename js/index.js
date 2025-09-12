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
        return;
    }
    if (getConfirm !== getPassword) {
        Swal.fire({
            icon: 'warning',
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
                Swal.fire({
                    icon: 'success',
                    text: 'Registration successful!',
                    confirmButtonColor: "#2d85de"
                });
                setTimeout(() => {
                    if (result.role === "customer") {
                        location.href = "./login.html";
                    } else {
                        location.href = "http://127.0.0.1:5500/index.html";
                    }
                }, 2000);
            } else {
                Swal.fire({
                    icon: 'info',
                    text: result.message || 'Registration failed',
                    confirmButtonColor: "#2d85de"
                });
                 spinItem.style.display = "none";
            }
        })
        .catch(err => {
            console.error("Error:", err);
            Swal.fire({
                icon: 'error',
                text: 'Something went wrong! Try again later',
                confirmButtonColor: "#2d85de"
            });
            spinItem.style.display = "none";
        });
}

//login function for customers
function customerLogIn(event) {
    event.preventDefault();
    const spinItem = document.querySelector(".spin");
    spinItem.style.display = "inline-block";
    const getEmail = document.getElementById("loginEmail").value;
    const getPassword = document.getElementById("loginPassword").value;
    
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
                        confirmButtonColor: "#2d85de"
                    });
                setTimeout(() => {
                }, 1500);
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
// indexedDB.html for sec1 
function startRotatingText() {
    const words = ['Men', 'Women', 'Kids', 'Yourself'];
    let index = 0;
    const display = document.getElementById('display');
    function rotate() {
        display.textContent = words[index];
        index = (index + 1) % words.length; // loop back
    }
    rotate(); // initialize immediately
    setInterval(rotate, 2000); // change every 2 seconds
}
// Call the function to start
startRotatingText();

//cta button sec1
function shopNow(event){
    event.preventDefault();
    location.href ="allProducts.html"
}


// section 2 function 
//function for men category index.js
function showCategoryWomen(event) {
    event.preventDefault(); // prevent page refresh
   const forwomen = document.getElementById("forWomen")
   const formen = document.getElementById("forMen")
   const forkids = document.getElementById("forkids")

   forwomen.style.display = "block";
   formen.style.display = "none";
   forkids.style.display = "none";

    // const navLinks = document.querySelectorAll('.sec4-tag');
    // navLinks.forEach(link => link.classList.remove('active'));
    // clickedLink.classList.add('active');
}


function showCategoryMen(event) {
    event.preventDefault(); // prevent page refresh
   const forwomen = document.getElementById("forWomen")
   const formen = document.getElementById("forMen")
   const forkids = document.getElementById("forkids")

   forwomen.style.display = "none";
   formen.style.display = "block";
   forkids.style.display = "none";
    // const navLinks = document.querySelectorAll('.sec4-tag');
    // navLinks.forEach(link => link.classList.remove('active'));
    // clickedLink.classList.add('active');
}


function showCategoryKids(event) {
    event.preventDefault(); // prevent page refresh
   const forwomen = document.getElementById("forWomen")
   const formen = document.getElementById("forMen")
   const forkids = document.getElementById("forkids")

   forwomen.style.display = "none";
   formen.style.display = "none";
   forkids.style.display = "block";

    // const navLinks = document.querySelectorAll('.sec4-tag');
    // navLinks.forEach(link => link.classList.remove('active'));
    // clickedLink.classList.add('active');
}
// Default tab on page load
// document.addEventListener("DOMContentLoaded", function() {
//     const defaultTab = document.querySelector('.sec4-tag'); // first tab
//     if (defaultTab) {
//         showCategory('forMen', defaultTab, new Event('click'));
//     }
// });

// function for logout session 
function HandlesLogout() {
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
//         Swal.fire({
//             icon: 'info',
//             text: 'All fields are required!',
//             confirmButtonColor: "#2D85DE"
//         })
//         spinItem.style.display = "none";
//         return;
//     }
//     if (confirmPassword !== updatePassword) {
//         Swal.fire({
//             icon: 'warning',
//             text: 'Passwords don\'t match',
//             confirmButtonColor: "#2D85DE"
//         })
//         spinItem.style.display = "none";
//         return;
//     }

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
//                     localStorage.clear();
//                     location.href = "index.html";
//                 }, 4000)
//             }
//             else {
//                 Swal.fire({
//                     icon: 'info',
//                     text: `${result.message}`,
//                     confirmButtonColor: "#2D85DE"
//                 })
//                 spinItem.style.display = "none";
//             }
//         })

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
