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
                    location.href = "./login.html";
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
                localStorage.setItem("token", result.token);
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

// handles login icon 
function checkLoginStatus() {
   const customerLoginId = localStorage.getItem("customerLoginId");
   const loginIcon = document.getElementById("loggedIn");
   const logoutIcon = document.getElementById("loggedOut");
   if (customerLoginId) {
      loginIcon.style.display = "block";
      logoutIcon.style.display = "none";
   } else {
      loginIcon.style.display = "none";
      logoutIcon.style.display = "block";
   }
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
};
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


// ALL PRODUCTS API
function loadProducts(page = 1, limit = 25) {
    const table = document.getElementById("product-list");
    const pagination = document.getElementById("pagination");
    const token = localStorage.getItem("token"); // changed from key
    const dashItem = new Headers();
    dashItem.append("Authorization", `Bearer ${token}`);
    fetch("http://localhost:3001/byc/api/products", { method: 'GET', headers: dashItem })
        .then(response => response.json())
        .then(result => {
            if (!result || result.length === 0) {
                table.innerHTML = `<tr><td colspan="9" class="text-center">No records found</td></tr>`;
                pagination.innerHTML = "";
                return;
            }
            // sort by category order
            const order = ["MEN", "WOMEN", "KIDS"];
            result.sort((a, b) => {
                let ai = order.indexOf(a.category?.name?.toUpperCase());
                let bi = order.indexOf(b.category?.name?.toUpperCase());
                ai = ai === -1 ? 99 : ai;
                bi = bi === -1 ? 99 : bi;
                return ai - bi;
            });
            // pagination
            const totalItems = result.length;
            const totalPages = Math.ceil(totalItems / limit);
            const start = (page - 1) * limit;
            const end = start + limit;
            const currentItems = result.slice(start, end);
            // render products
            let data = "";
            currentItems.map(product => {
                data += `
                <div class="col card-camsole mb-4 pe-lg-0">
                    <div class="card fade-in-up h-100">
                        <img src="${product.image}" class="h-50">
                        <div class="card-body pt-3">
                            <h6 class="card-text mb-1">${product.name}</h6>
                            <p class="text-p">${product.productNumber}</p>
                            <p class="men-fash">${product.description.slice(0, 50)}</p>
                            <div class="mt-2 mt-lg-3 price">₦${product.price}</div>
                            <div class="rating mb-4 mt-4" style="color: #FB8200;">${product.rating}<strong class="ms-5 text-dark">4.05</strong></div>
                            <div class="d-flex Wishlist-btn mb-5">
                                <button class="btn d-flex ps-1 me-2 hidden-btn wishlist-btn" data-id="${product._id}" style="width: 93px; height: 40px; border-radius: 5px; color: #BD3A3A; border: 1px solid #BD3A3A; outline: none;">
                                    <span><i class="far fa-heart me-2"></i></span>
                                    <span style="font-size: 16px; font-weight: 600; font-family: 'Segoe UI', sans-serif;">Wishlist</span>
                                </button>
                                <button class="btn d-flex ps-1 pe-0 hidden-btn buy-now-btn" data-id="${product._id}" style="width: 100px; height: 40px; border-radius: 5px; background-color: #BD3A3A; color: #FFFFFF; border: 1px solid #BD3A3A; outline: none;">
                                    <span><i class="fas fa-shopping-cart"></i></span>
                                    <span class="ps-lg-0 ps-2" style="font-size: 16px; font-weight: 600; font-family: 'Segoe UI', sans-serif;">Buy Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            });
            table.innerHTML = data;
            // fade animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll(".fade-in-up").forEach(card => observer.observe(card));
            // Buy Now button
            document.querySelectorAll(".buy-now-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const productId = e.currentTarget.getAttribute("data-id");
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    if (!cart.includes(productId)) cart.push(productId);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    Swal.fire({
                        icon: 'success',
                        title: 'Added to Cart',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1200,
                        background: '#fff',
                        color: '#bd3a3a'
                    });
                    // optional: redirect
                    window.location.href = "./productDetail.html";
                });
            });
            // Wishlist button
            document.querySelectorAll(".wishlist-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const productId = e.currentTarget.getAttribute("data-id");
                    const customerId = localStorage.getItem("customerLoginId") || localStorage.getItem("token");
                    if (!customerId) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Not logged in',
                            text: 'You must be logged in to use wishlist.',
                            confirmButtonColor: '#bd3a3a'
                        });
                        return;
                    }
                    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
                    if (!wishlist.includes(productId)) {
                        wishlist.push(productId);
                        localStorage.setItem("wishlist", JSON.stringify(wishlist));
                        updateWishlistCount();
                        btn.querySelector("span:last-child").textContent = "Added";
                        btn.style.color = "#bd3a3a";
                        Swal.fire({
                            icon: 'success',
                            title: 'Added to Wishlist',
                            showConfirmButton: false,
                            timer: 1200,
                            toast: true,
                            position: 'top-end',
                            background: '#fff',
                            color: '#bd3a3a'
                        });
                    } else {
                        Swal.fire({
                            icon: 'info',
                            title: 'Already in Wishlist',
                            showConfirmButton: false,
                            timer: 1200,
                            toast: true,
                            position: 'top-end',
                            background: '#fff',
                            color: '#bd3a3a'
                        });
                    }
                });
            });
            // Recently Viewed - save on card click
            document.querySelectorAll(".card-camsole .card").forEach(card => {
                card.addEventListener("click", (e) => {
                    const productId = card.querySelector(".buy-now-btn, .wishlist-btn")?.getAttribute("data-id");
                    const productName = card.querySelector("h6").innerText;
                    const productImg = card.querySelector("img")?.src;
                    const productPrice = card.querySelector(".price")?.innerText;
                    if (!productId) return;
                    let recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
                    recentlyViewed = recentlyViewed.filter(p => p._id !== productId); // remove duplicates
                    recentlyViewed.unshift({
                        _id: productId,
                        name: productName,
                        image: productImg,
                        price: productPrice
                    });
                    recentlyViewed = recentlyViewed.slice(0, 10); // keep max 5
                    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
                });
            });
            // Pagination
            let buttons = "";
            buttons += `<button ${page === 1 ? "disabled" : ""}>&lt;</button>`;
            for (let i = 1; i <= totalPages; i++) {
                buttons += `<button class="${page === i ? "active" : ""}">${i}</button>`;
            }
            buttons += `<button  ${page === totalPages ? "disabled" : ""}>&gt;</button>`;
            pagination.innerHTML = buttons;
            pagination.querySelectorAll("button").forEach(btn => {
                btn.addEventListener("click", () => {
                    if (btn.innerText === "<") {
                        loadProducts(page - 1, limit);
                    } else if (btn.innerText === ">") {
                        loadProducts(page + 1, limit);
                    } else {
                        loadProducts(parseInt(btn.innerText), limit);
                    }
                });
            });
        })
        .catch(error => console.error("Error:", error));
}

// resuable fetchProducts api 
 function fetchProducts() {
      const token = localStorage.getItem("key");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      return fetch("http://localhost:3001/byc/api/products", { method: "GET", headers })
        .then(res => res.json())
        .catch(err => {
          console.error("Error fetching products:", err);
          return [];
        });
    }

// recentlyViewed FUNCTION
function loadRecentlyViewed(limit = 5) {
    const container = document.getElementById("recentlyViews");
    const viewMoreBtn = document.getElementById("viewMoreRecent");
    if (!container) return;
    let recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    if (recentlyViewed.length === 0) {
        container.innerHTML = `<p class="text-center">No recently viewed products.</p>`;
        viewMoreBtn.style.display = "none";
        return;
    }
    // Show only first 'limit' items
    const displayedItems = recentlyViewed.slice(0, limit);
    let html = "";
    displayedItems.forEach(product => {
        html += `
            <div class="col card-camsole mb-4 pe-lg-0">
                <div class="card  h-100">
                    <img src="${product.image}" class="image-fluid" class="image-fluid" style="width: 100%; height: 350px;object-fit: cover; " alt="${product.name}">
                    <div class="card-body pt-3">
                        <h6 class="card-text mb-1">${product.name}</h6>
                        <p class="text-p">${product.productNumber}</p>
                        <p class="men-fash">${product.description}</p>
                        <p class="mt-2 mt-lg-3 price">${product.price}</p>
                        <div class="rating mb-4 mt-4" style="color: #FB8200;">${product.rating}<strong class="ms-5 text-dark">4.05</strong></div>
                       
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    // Show "View More" if there are more than limit items
    if (recentlyViewed.length > limit) {
        viewMoreBtn.style.display = "inline-block";
    } else {
        viewMoreBtn.style.display = "none";
    }

}
// Event listener for "View More"
document.getElementById("viewMoreRecent").addEventListener("click", () => {
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    loadRecentlyViewed(recentlyViewed.length); // show all
});
// Initial load
document.addEventListener("DOMContentLoaded", () => {
    loadRecentlyViewed(5); // initially show only 5
});
// {.........
// Event listener for "View More"
document.getElementById("viewMoreRecent").addEventListener("click", () => {
    const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    loadRecentlyViewed(recentlyViewed.length); // show all
});
document.addEventListener("DOMContentLoaded", () => {
    loadRecentlyViewed(5); // show first 5 initially
});
document.addEventListener("DOMContentLoaded", () => {
    loadRecentlyViewed(5); // starts with 5, auto-expands if more
});

//...........}

// loads wishlist.html
function loadWishlist() {
  const container = document.getElementById("wishlist-list");
  if (!container) {
    console.warn("No #wishlist-list container found");
    return;
  }
  const token = localStorage.getItem("token");
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (wishlist.length === 0) {
    container.innerHTML = `<p class="text-center">Your wishlist is empty.</p>`;
    return;
  }
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  fetch("http://localhost:3001/byc/api/products", { method: "GET", headers })
    .then(res => res.json())
    .then(products => {
      const filtered = products.filter(p => wishlist.includes(p._id));
      console.log("Filtered products:", filtered);
      if (filtered.length === 0) {
        container.innerHTML = `<p class="text-center">No wishlist products found.</p>`;
        return;
      }
      let html = "";
      filtered.forEach(product => {
        const img = product.image || "placeholder.png";
        const name = product.name || "Unnamed Product";
        const desc = product.description ? product.description.slice(0, 50) : "No description";
        const price = product.price ? `₦${product.price}` : "Price not available";
        const rating = product.rating || "N/A";
        html += `
          <div class="card-camsole mb-4 pe-lg-0">
            <div class="card h-100 wishlist-height" >
              <img src="${product.image}" class="img-fluid" style="width: 100%; height: 350px;object-fit: cover; " alt="${name}">
              <div class="card-body pt-3">
                <h6 class="card-text mb-1">${name}</h6>
                <p class="text-p">${product.productNumber || ""}</p>
                <p class="men-fash">${desc}</p>
                <div class="mt-2 mt-lg-3 price">${price}</div>
                <div class="rating mb-4 mt-4" style="color: #FB8200;">
                  ${rating}<strong class="ms-5 text-dark">4.05</strong>
                </div>
                <div class="d-flex mb-4">
                  <button class="btn btn-danger remove-wishlist-btn me-2" data-id="${product._id}">
                    Remove
                  </button>
                  <button class="btn d-flex ps-1 pe-0 buy-now-btn" data-id="${product._id}"
                    style="width: 100px; height: 40px; border-radius: 5px; background-color: #BD3A3A; color: #FFFFFF; border: 1px solid #BD3A3A;">
                    <span><i class="fas fa-shopping-cart"></i></span>
                    <span class="ps-lg-1 ps-2" style="font-size: 16px; font-weight: 600;">Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
      // Remove button
      document.querySelectorAll(".remove-wishlist-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.getAttribute("data-id");
          let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          wishlist = wishlist.filter(item => item !== id);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
          loadWishlist();
          updateWishlistCount();
        });
      });
      // Buy Now button
      document.querySelectorAll(".buy-now-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const productId = e.currentTarget.getAttribute("data-id");
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(productId);
          localStorage.setItem("cart", JSON.stringify(cart));
          window.location.href = "cart.html";
        });
      });
    })
    .catch(err => {
      console.error("Error loading wishlist:", err);
      container.innerHTML = `<p class="text-center text-danger">Error loading wishlist</p>`;
    });
}

// FUNCTION FOR PRODUCT DETAILS 

function initProductDetails() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let currentIndex = parseInt(localStorage.getItem("currentProductIndex")) || 0;
  function loadProduct(index) {
    if (cart.length === 0) {
      document.getElementById("productItem").innerHTML = "<p>No products in cart</p>";
      return;
    }
    if (index < 0) index = 0;
    if (index >= cart.length) index = cart.length - 1;
    currentIndex = index;
    localStorage.setItem("currentProductIndex", currentIndex);
    const productId = cart[currentIndex];
    fetch(`http://localhost:3001/byc/api/products/${productId}`)
      .then(res => res.json())
      .then(product => {
        const p = product.product || product;
        const mainImage = Array.isArray(p.image) ? p.image[0] : p.image;
        document.getElementById("productItem").innerHTML = `
          <div class="row mt-4">
            <!-- Left side: main image + thumbnail carousel -->
            <div class="col-md-6 text-center">
              <div class="main-img mb-3">
                <img id="mainProductImg" src="${mainImage}" class="img-fluid rounded"
                     style="max-height: 350px; object-fit: contain;" alt="${p.name}">
              </div>
              <!-- Thumbnail carousel -->
              <div class="thumb-carousel-wrapper position-relative mt-3">
                <button class="thumb-prev btn btn-light position-absolute start-0 top-50 translate-middle-y" style="z-index:10;">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <div id="thumbCarousel" class="d-flex overflow-hidden" style="gap:10px; max-width:100%; scroll-behavior:smooth;">
                  ${cart.map((prodId, i) => `
                    <img src="${Array.isArray(p.image) ? p.image[0] : p.image}"
                         class="thumb-img rounded border ${i === currentIndex ? 'active-thumb' : ''}"
                         style="height:85px; width:70px; object-fit:cover; cursor:pointer; flex:0 0 auto;"
                         data-id="${prodId}">
                  `).join("")}
                </div>
                <button class="thumb-next btn btn-light position-absolute end-0 top-50 translate-middle-y" style="z-index:10;">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <!-- Right side: product info -->
            <div class="col-md-6">
              <div class="card-body">
                <h4 class="fw-bold">${p.name}</h4>
                <p class="fw-bold fs-5">${p.productNumber || "N/A"}</p>
                <p class="fs-6 my-4">${p.description || "No description available."}</p>
                <!-- Rating -->
                <div class="mb-3">
                  ${p.rating ? ":star:".repeat(Math.round(p.rating)) + ` (${p.rating})` : "No rating yet"}
                </div>
                <!-- Price -->
                <hr style="border: 1px solid #646262e4; background-color: #747373ff; box-shadow: #e7e6e63d 0px 3px 8px;">
                <div class="price fw-bold fs-4 mb-4">₦${p.price || "N/A"}.00</div>
                <!-- Sizes + Colors -->
                <div class="d-flex align-items-center available-size">
                  <div>
                    <label><strong>Available Size</strong></label>
                    <div id="sizeOptions" class="d-flex gap-2 mb-3 mt-3">
                      ${["S","M","L","XL"].map(s => `
                        <div class="size-option px-3 py-2 border rounded"
                             style="cursor:pointer;" data-size="${s}">${s}</div>
                      `).join("")}
                    </div>
                  </div>
                  <div class="ms-lg-5">
                    <label><strong>Available Colors</strong></label>
                    <div id="colorOptions" class="d-flex gap-2 mb-3 mt-4">
                      ${["black","blue","orange","yellow"].map(c => `
                        <div class="color-option border"
                             style="width:30px; height:30px; border-radius:50%; background:${c}; cursor:pointer;"
                             data-color="${c}"></div>
                      `).join("")}
                    </div>
                  </div>
                </div>
                <!-- Quantity + Wishlist -->
                <div class="d-flex my-3">
                  <div class="d-flex align-items-center mb-3">
                    <button class="bg-danger px-3 text-light" id="qtyMinus" style="border:none;height:44px;">-</button>
                    <input type="number" id="productQty" value="1" min="1"
                           class="form-control text-center mx-2" style="width:70px; border:none;">
                    <button class="bg-danger px-3 text-light" id="qtyPlus" style="border:none;height:44px;">+</button>
                  </div>
                  <button class="btn d-flex ps-4 ms-4"
                          onclick="addToWishlist('${p._id}')"
                          style="width:40%; height:44px; border-radius:5px; color:#BD3A3A; border:1px solid #BD3A3A; outline:none;">
                    <span><i class="far fa-heart me-2"></i></span>
                    <span style="font-size:16px; font-weight:600;">Wishlist</span>
                  </button>
                </div>
                <!-- Add to Cart -->
                <button class="btn d-flex ps-1 ps-lg-5 pe-0"
                        onclick="addToFinalCart('${p._id}')"
                        style="width:74%; height:40px; border-radius:5px; background-color:#BD3A3A; color:#FFFFFF; border:1px solid #BD3A3A; outline:none;">
                  <span><i class="fas fa-shopping-cart"></i></span>
                  <span class="ps-lg-4 ps-2" style="font-size:16px; font-weight:600;">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        `;
        // === Size selection ===
        document.querySelectorAll(".size-option").forEach(el => {
          el.addEventListener("click", () => {
            document.querySelectorAll(".size-option").forEach(s => {
              s.style.outline = "";
              s.style.boxShadow = "";
            });
            el.style.outline = "1.5px solid #bd3a3a";
            el.style.boxShadow = "0 0 1px #bd3a3a";
            localStorage.setItem("selectedSize", el.dataset.size);
          });
        });
        // === Color selection ===
        document.querySelectorAll(".color-option").forEach(el => {
          el.addEventListener("click", () => {
            document.querySelectorAll(".color-option").forEach(c => c.style.outline = "");
            el.style.outline = "2px solid grey";
            localStorage.setItem("selectedColor", el.dataset.color);
          });
        });
        // === Quantity controls ===
        let qtyInput = document.getElementById("productQty");
        document.getElementById("qtyPlus").addEventListener("click", () => {
          qtyInput.value = parseInt(qtyInput.value) + 1;
        });
        document.getElementById("qtyMinus").addEventListener("click", () => {
          let current = parseInt(qtyInput.value);
          if (current > 1) qtyInput.value = current - 1;
        });
        // === Carousel controls ===
        const thumbCarousel = document.getElementById("thumbCarousel");
        const prevBtn = document.querySelector(".thumb-prev");
        const nextBtn = document.querySelector(".thumb-next");
        prevBtn.addEventListener("click", () => {
          thumbCarousel.scrollBy({ left: -100, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
          thumbCarousel.scrollBy({ left: 100, behavior: "smooth" });
        });
        // Auto-scroll every 5s
        setInterval(() => {
          thumbCarousel.scrollBy({ left: 100, behavior: "smooth" });
        }, 5000);
        // Click thumbnail
        document.querySelectorAll(".thumb-img").forEach(img => {
          img.addEventListener("click", () => {
            document.querySelectorAll(".thumb-img").forEach(i => i.classList.remove("active-thumb"));
            img.classList.add("active-thumb");
            const prodId = img.dataset.id;
            loadProduct(cart.indexOf(prodId));
          });
        });
      })
      .catch(err => {
        console.error("Error loading product:", err);
        document.getElementById("productItem").innerHTML = "<p class='text-danger'>Error loading product</p>";
      });
  }
  // === Wishlist ===
  window.addToWishlist = function(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      Swal.fire({ icon:'success', title:'Product Added to Wishlist', toast:true, timer:1200, position:'top' });
    } else {
      Swal.fire({ icon:'info', title:'Product Already in Wishlist', toast:true, timer:1200, position:'top' });
    }
  };
  // === Add to Cart with validation ===
  window.addToFinalCart = function(productId) {
    const size = localStorage.getItem("selectedSize");
    const color = localStorage.getItem("selectedColor");
    const qty = parseInt(document.getElementById("productQty").value, 10);
    if (!size || !color) {
      Swal.fire({ icon:'info', title:'Please select size and color.', toast:true, timer:1200, position:'top' });
      return;
    }
    let finalCart = JSON.parse(localStorage.getItem("finalCart")) || [];
    let exists = finalCart.find(item =>
      item.id === productId && item.size === size && item.color === color
    );
    if (exists) {
      Swal.fire({ icon:'info', title:'Item Already in Cart', toast:true, timer:1200, position:'top' });
      return;
    }
    finalCart.push({ id: productId, size, color, quantity: qty });
    localStorage.setItem("finalCart", JSON.stringify(finalCart));
    updateCartCount();
    window.location.href = "./cart.html";
  };
  loadProduct(currentIndex);
}


    function addToFinalCart(productId) {
      const size = localStorage.getItem("selectedSize");
      const color = localStorage.getItem("selectedColor");
      const qty = document.getElementById("productQty").value;
      if (!size || !color) {
        Swal.fire({
            icon: 'info',
            title: 'Please select size and color before adding to cart.',
            showConfirmButton: false,
            timer: 1200,
            toast: true,
            position: 'top',
            background: '#fff',
            color: '#bd3a3a'
        });

        return;
      }
      let finalCart = JSON.parse(localStorage.getItem("finalCart")) || [];
      finalCart.push({ id: productId, size: size, color: color, quantity: parseInt(qty) });
      localStorage.setItem("finalCart", JSON.stringify(finalCart));
      Swal.fire({
            icon: 'success',
            title: 'Item Added to cart',
            showConfirmButton: false,
            timer: 1200,
            toast: true,
            position: 'top',
            background: '#fff',
            color: '#bd3a3a'
        });
        window.location.href = "./cart.html";
        return;
    }
    function updateCartCount() {
  let finalCart = JSON.parse(localStorage.getItem("finalCart")) || [];
  let count = finalCart.reduce((sum, item) => sum + item.quantity, 0);
  let cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) cartCountEl.textContent = count;
}


// function for button adding to cart 
document.querySelectorAll(".add-cart-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const productId = e.currentTarget.getAttribute("data-id");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.includes(productId)) {
      Swal.fire({
        icon: "warning",
        title: "Already in cart",
        text: "This product is already in your cart!",
        confirmButtonColor: "#d33"
      });
    } else {
      cart.push(productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount(); // :fire: update immediately
      Swal.fire({
        icon: "success",
        title: "Added to cart",
        text: "Product has been added to your cart.",
        confirmButtonColor: "#3085d6"
      });
    }
  });
});

// function for wishlist icon 
function updateWishlistCount() {
    const iconWrapper = document.getElementById("fa-heart");
    if (!iconWrapper) return;
    // check if badge already exists
    let badge = iconWrapper.querySelector(".wishlist-badge");
    if (!badge) {
        badge = document.createElement("span");
        badge.className = "wishlist-badge";
        iconWrapper.style.position = "relative"; // make wrapper relative
        iconWrapper.appendChild(badge);
    }
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let count = wishlist.length;
    if (count > 0) {
        badge.textContent = count;
        badge.style.display = "flex";
    } else {
        badge.style.display = "none";
    }
}





    // CART.HTML API FUNCTI0N -----
function loadCart() {
  let finalCart = JSON.parse(localStorage.getItem("finalCart")) || [];
  // Update cart count
  document.getElementById("cartLenght").textContent = finalCart.length;
  // Empty cart case
  if (finalCart.length === 0) {
    document.getElementById("check-items").innerHTML = "<p>Your cart is empty, Add items</p>";
    document.getElementById("subtotal-price").textContent = "₦0";
    document.getElementById("total-price").textContent = "₦0";
    return;
  }
  fetchProducts().then(allProducts => {
    let productsInCart = finalCart.map(item => {
      let product = allProducts.find(p => p._id === item.id);
      if (!product) return null;
      return {
        ...product,
        qty: item.quantity,
        size: item.size,
        color: item.color
      };
    }).filter(p => p);
    // === Render Cart Items ===
    let html = "";
    let subtotal = 0;
    productsInCart.forEach((p, i) => {
      let totalPrice = p.price * p.qty;
      subtotal += totalPrice;
      html += `
        <div class="row p-3 mb-5 align-items-center" style="border-top: 2px solid #f1eeee">
          <div class="col-md-2">
            <img src="${Array.isArray(p.image) ? p.image[0] : p.image}" class="img-fluid rounded" alt="${p.name}">
          </div>
          <div class="col-md-4 ms-3 me-lg-5 mt-3">
            <h5 class="fw-bolder">${p.name}</h5>
            <p class="mb-3 fw-bold">${p.productNumber || "N/A"}</p>
            <p class="mb-3">${p.description || ""}</p>
            <p class="mb-2"><strong>Size:</strong> ${p.size}</p>
            <p class="mb-2"><strong>Color:</strong> ${p.color}</p>
            <div class="d-flex gap-2 mt-2">
              <button class="btn d-flex ps-4 hidden-btn wishlist-btn" data-id="${p._id}"
                style="width: 153px; height: 40px; border-radius: 5px; color: #BD3A3A; border: 1px solid #BD3A3A; outline: none;">
                <i class="far fa-heart me-2"></i> Wishlist
              </button>
              <button class="btn d-flex text-light ps-4 ms-lg-3 hidden-btn remove-btn" data-id="${p._id}"
                style="width: 153px; height: 40px; border-radius: 5px; background-color: #BD3A3A; border: 1px solid #BD3A3A; outline: none;">
                <i class="fa-solid fa-trash me-2"></i> Remove
              </button>
            </div>
          </div>
          <div class="col-md-5 d-flex mt-3" style="border-left: 2px solid #F3F0F0;">
            <div class="text-center" style="border-right: 2px solid #F3F0F0;">
              <h6 class="fw-2">Quantity</h6>
              <div class="d-flex">
                <button class="py-1 px-2 text-light minus-btn" style="background-color: #BD3A3A; border: none;">-</button>
                <input type="number" class="form-control qty mx-2 text-center" value="${p.qty}" min="1"
                       data-id="${p._id}" style="width:70px;">
                <button class="py-1 px-2 text-light plus-btn" style="background-color: #BD3A3A; border: none;">+</button>
              </div>
            </div>
            <div class="text-lg-center ms-3 ms-lg-5">
              <h6 class="mb-1">Unit Price: ₦${p.price}</h6>
              <h2 class="fw-bold">₦${totalPrice}</h2>
            </div>
          </div>
        </div>
      `;
    });
    document.getElementById("check-items").innerHTML = html;
    document.getElementById("subtotal-price").textContent = "₦" + subtotal;
    document.getElementById("total-price").textContent = "₦" + subtotal;
    // === Attach Events ===
    attachCartEvents(productsInCart);
  });
}
// === Attach Events: Qty, Remove, Wishlist ===
function attachCartEvents(products) {
  document.querySelectorAll(".qty").forEach((input, i) => {
    const minusBtn = input.parentElement.querySelector(".minus-btn");
    const plusBtn = input.parentElement.querySelector(".plus-btn");
    minusBtn.addEventListener("click", () => {
      let val = parseInt(input.value) || 1;
      if (val > 1) {
        input.value = val - 1;
        updateQty(products[i]._id, input.value);
      }
    });
    plusBtn.addEventListener("click", () => {
      let val = parseInt(input.value) || 1;
      input.value = val + 1;
      updateQty(products[i]._id, input.value);
    });
    input.addEventListener("change", () => {
      updateQty(products[i]._id, input.value);
    });
  });
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", e => removeItem(e.currentTarget.dataset.id));
  });
  document.querySelectorAll(".wishlist-btn").forEach(btn => {
    btn.addEventListener("click", e => addToWishlist(e.currentTarget.dataset.id));
  });
}
// === Update Qty in finalCart ===
function updateQty(id, qty) {
  let finalCart = JSON.parse(localStorage.getItem("finalCart")) || [];
  finalCart = finalCart.map(item =>
    item.id === id ? { ...item, quantity: parseInt(qty) } : item
  );
  localStorage.setItem("finalCart", JSON.stringify(finalCart));
  loadCart();
}
// === Remove Item ===
function removeItem(id) {
  let finalCart = JSON.parse(localStorage.getItem("finalCart")) || [];
  finalCart = finalCart.filter(item => item.id !== id);
  localStorage.setItem("finalCart", JSON.stringify(finalCart));
  loadCart();
}
// === Add to Wishlist ===
function addToWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    Swal.fire({ icon:'success', title:'Added to Wishlist', toast:true, timer:1200, position:'top' });
  } else {
    Swal.fire({ icon:'info', title:'Already in Wishlist', toast:true, timer:1200, position:'top' });
  }
}




    // function loadCart() {
    //   let finalCart = JSON.parse(localStorage.getItem("finalCart")) || [];
    //   if (finalCart.length === 0) {
    //     document.getElementById("check-items").innerHTML = "<p>Your cart is empty, Add items</p>";
    //     return;
    //   }
    //   fetchProducts().then(allProducts => {
    //     // Map cart items with product details
    //     let productsInCart = finalCart.map(item => {
    //       let product = allProducts.find(p => p._id === item.id);
    //       return { ...product, qty: item.qty };
    //     }).filter(p => p._id); // remove undefined
    //     renderCheckCart(productsInCart);
    //   });
    // }
    //   // Quantity & Remove events
    // function attachCheckEvents(products) {
    //   // +/- quantity
    //   document.querySelectorAll(".qty").forEach((input, i) => {
    //     const minusBtn = input.parentElement.querySelector(".minus-btn");
    //     const plusBtn = input.parentElement.querySelector(".plus-btn");
    //     minusBtn.addEventListener("click", () => {
    //       let val = parseInt(input.value) || 1;
    //       if (val > 1) input.value = val - 1;
    //       updateQty(products[i]._id, input.value);
    //     });
    //     plusBtn.addEventListener("click", () => {
    //       let val = parseInt(input.value) || 1;
    //       input.value = val + 1;
    //       updateQty(products[i]._id, input.value);
    //     });
    //     input.addEventListener("change", () => {
    //       updateQty(products[i]._id, input.value);
    //     });
    //   });
    //   // Remove item
    //   document.querySelectorAll(".remove-btn").forEach(btn => {
    //     btn.addEventListener("click", e => {
    //       const id = e.currentTarget.getAttribute("data-id");
    //       removeItem(id);
    //     });
    //   });
    // }
    // function updateQty(id, qty) {
    //   let finalCart = JSON.parse(localStorage.getItem("finalCart")) || [];
    //   finalCart = finalCart.map(item => item.id === id ? { ...item, qty: parseInt(qty) } : item);
    //   localStorage.setItem("finalCart", JSON.stringify(finalCart));
    //   loadCheckCart(); // refresh totals
    // }
    // function removeItem(id) {
    //   let finalCart = JSON.parse(localStorage.getItem("finalCart")) || [];
    //   finalCart = finalCart.filter(item => item.id !== id);
    //   localStorage.setItem("finalCart", JSON.stringify(finalCart));
    //   loadCheckCart();
    // }

    // function renderCheckCart(products) {
    //   let html = "";
    //   let subtotal = 0;
    //   products.forEach((p, i) => {
    //     let totalPrice = p.price * p.qty;
    //     subtotal += totalPrice;
    //     html += `
    //         <div class="row  p-3 mb-5 align-items-cente" style="border-top: 2px solid #F1EEEE">
    //             <!-- Image -->
    //             <div class="col-md-2">
    //                 <img src="${p.image}" class="img-fluid rounded" alt="${p.name}">
    //             </div>
    //             <!-- Details -->
    //             <div class="col-md-4 ms-3 me-lg-5 mt-3">
    //                 <h5 class="fw-bolder">${p.name}</h5>
    //                 <p class="mb-3 fw-bold">${p.productNumber || "N/A"}</p>
    //                 <p class="mb-3">${p.description || ""}</p>
    //                 <div class="d-flex gap-2 mt-2">
    //                     <button class="btn d-flex  ps-4 hidden-btn wishlist-btn" data-id="${p._id}"  style="width: 153px; height: 40px; border-radius: 5px; color: #BD3A3A; border: 1px solid #BD3A3A; outline: none;">
    //                                 <span href="#">
    //                                     <i class="far fa-heart me-2"></i>
    //                                 </span>
    //                                 <span style="font-size: 16px; font-weight: 600; font-family: 'Segoe UI', sans-serif;">Wishlist</span>
    //                     </button>
    //                     <button class="btn d-flex text-light  ps-4 ms-lg-3 hidden-btn remove-btn" data-id="${p._id}"  style="width: 153px; height: 40px; border-radius: 5px; background-color: #BD3A3A; border: 1px solid #BD3A3A; outline: none;">
    //                                 <span href="#">
    //                                     <i class="fa-solid fa-trash me-2"></i>
    //                                 </span>
    //                                 <span style="font-size: 16px; font-weight: 600; font-family: 'Segoe UI', sans-serif;">Remove</span>
    //                     </button>
                       
    //                 </div>
    //             </div>
    //             <!-- Quantity & Prices -->
    //             <div class="col-md-5 d-flex mt-3" style = "border-left: 2px  solid #F3F0F0;">
    //                     <div class="text-center" style = " border-right: 2px  solid #F3F0F0;">
    //                         <h6 class="fw-2">Quantity</h6>
    //                         <div class = "d-flex">
    //                             <button  class="py-1 px-2 text-light plus-btn" style ="background-color: #BD3A3A; border: none;">+</button>
    //                             <input type="number" class="form-control qty mx-2 text-center" value="${p.qty}" min="1" data-id="${p._id}" style="width:70px;">
    //                             <button class="py-1 px-2 me-3 text-light minus-btn" style ="background-color: #BD3A3A; border: none;">-</button>
    //                         </div>
    //                     </div>
    //                     <div class="text-lg-center ms-3 ms-lg-5">
    //                         <h6 class="mb-1">Unit Price: ₦${p.price}</h6>
    //                         <h2 class="fw-bold">₦${totalPrice}</h2>
    //                     </div>
    //             </div>
    //         </div>
    //     `;
    //   });
    //   document.getElementById("check-items").innerHTML = html;
    //   document.getElementById("subtotal-price").textContent = "₦" + subtotal;
    //   document.getElementById("total-price").textContent = "₦" + subtotal;
    //   attachCheckEvents(products);
    // }
//   CODE ENDS HERE 



// function to render checkout 
function renderCheckout(cart = []) {
  const cartContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal-price");
  const deliveryEl = document.getElementById("delivery-fee");
  const totalEl = document.getElementById("total-price");
  cartContainer.innerHTML = "";
  // Ensure subtotal is always a number
  let subtotal = 0;
  if (Array.isArray(cart) && cart.length > 0) {
    cart.forEach(product => {
      const price = Number(product.price) || 0;
      const qty = Number(product.quantity) || 0;
      subtotal += price * qty;
      const item = document.createElement("div");
      item.style.border = "1px solid #ddd";
      item.style.padding = "10px";
      item.style.marginBottom = "10px";
      item.style.display = "flex";
      item.style.gap = "15px";
      item.innerHTML = `
        <img src="${product.image || 'https://via.placeholder.com/80'}"
             alt="${product.name || 'Product'}" width="80" height="80" style="object-fit:cover;">
        <div>
          <h4>${product.name || "Unnamed Product"}</h4>
          <p>Product ID: ${product.id || product.productId || "N/A"}</p>
          <p>${product.description || "No description"}</p>
          <p>Price: $${price}</p>
          <p>Quantity: ${qty}</p>
          <button onclick="modifyCart('${product.id || product.productId}')">Modify Cart</button>
        </div>
      `;
      cartContainer.appendChild(item);
    });
  } else {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  }
  // Safe delivery fee
  const deliveryFee = subtotal > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;
  subtotalEl.textContent = `$${subtotal}`;
  deliveryEl.textContent = `$${deliveryFee}`;
  totalEl.textContent = `$${total}`;
  // This will never be null
  return {
    subtotal,
    deliveryFee,
    total,
    finalCart: cart
  };
}

// function for customer address shipping 
function registerCustomer(event) {
    event.preventDefault();
    const customer = {
        name: document.getElementById("custName").value.trim(),
        company: document.getElementById("custCompany").value.trim(),
        country: document.getElementById("custCountry").value.trim(),
        city: document.getElementById("custTown").value.trim(),
        address: document.getElementById("custaddress").value.trim(),
        state: document.getElementById("custState").value.trim(),
        phone: document.getElementById("custPhone").value.trim(),
        email: document.getElementById("custEmail").value,
  };
  if (!customer.name || !customer.phone || !customer.email || !customer.state || !customer.country || !customer.city || !customer.address) {
    Swal.fire("Missing Fields", "Please fill out all required fields","warning");
    return;
  }
  fetch("http://localhost:3001/byc/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer)
  })
    .then(res => res.json())
    .then(result => {
        console.log(result)
      if (result._id) {
        localStorage.setItem("customerId", result._id);
        // localStorage.setItem("productId", result._id);
        Swal.fire(
            "Success", 
            "Customer registered successfully, procceed to checkout!",
             "success");
      } else {
        Swal.fire("Error", "Email already registered", "error");
      }
    })
    .catch(err => {
      Swal.fire("Error", err.message, "error");
    });
}

// // FUNCTION FOR CHECKOUT SUBMIT 



// Place order
