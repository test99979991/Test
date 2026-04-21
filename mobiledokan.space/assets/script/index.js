document.getElementById("resNavBtn").onclick = function() {
    activeResNav();
};
document.getElementById("resNavClose").onclick = function() {
    deActiveResNav();
};

const loadingSpinnerModal = document.getElementById("loading-modal");
const handelLoadingSpinner = (action) => {
    if (loadingSpinnerModal) {
        if (action === "open") {
            loadingSpinnerModal.style.display = "flex";
        } else {
            loadingSpinnerModal.style.display = "none";
        }
    }
};

function activeResNav() {
    var mainNav = document.getElementById("mainNav");
    mainNav.classList.add("active");
    var overlay22 = document.getElementById("overlay22");
    overlay22.classList.remove("d-none");
    var body22 = document.querySelector("body");
    body22.classList.add("overflow-hidden");
}

function deActiveResNav() {
    var mainNav = document.getElementById("mainNav");
    mainNav.classList.remove("active");
    var overlay22 = document.getElementById("overlay22");
    overlay22.classList.add("d-none");
    var body22 = document.querySelector("body");
    body22.classList.remove("overflow-hidden");
}

const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
    header.addEventListener("click", () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector("svg");

        // Toggle the clicked one
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.style.transform = "rotate(90deg)";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.style.transform = "rotate(-90deg)";
        }
    });
});

const searchProductInputs = document.querySelectorAll(".search-field");

searchProductInputs.forEach((input) => {
    const route = input.dataset.route;

    input.addEventListener("keyup", function(event) {
        const targetInput = event.target;
        const query = targetInput.value.trim();

        // Detect desktop or mobile
        const isMobile = targetInput.getAttribute("data") === "2";

        const desktopWrapper = document.getElementById("mainsuggesstion");
        const mobileWrapper = document.getElementById(
            "mobileversionmainsuggesstion"
        );
        const desktopList = document.getElementById("serchsuggesstion");
        const mobileList = document.getElementById("mobileversionsuggesstion");

        const typeSelect = isMobile ?
            document.getElementById("mobileversiontype") :
            document.getElementById("suggesstiontype");

        const type = typeSelect ? typeSelect.value : "mobile"; // fallback type

        const viewAllLink = document.querySelector(
            isMobile ?
            "#mobileversionmainsuggesstion .searchUrl" :
            "#mainsuggesstion .searchUrl"
        );

        if (query.length > 0 && route) {
            // Show suggestion wrappers
            if (desktopWrapper) desktopWrapper.style.display = "flex";
            if (mobileWrapper) mobileWrapper.style.display = "flex";

            // Build API URL (send both search + type)
            const fetchUrl = `${route}?search=${encodeURIComponent(
                query
            )}&type=${encodeURIComponent(type)}`;

            // Fetch search results
            fetch(fetchUrl)
                .then((res) => res.text())
                .then((html) => {
                    if (desktopList) desktopList.innerHTML = html;
                    if (mobileList) mobileList.innerHTML = html;

                    // Update "View All Results" link
                    const fullResultsUrl = `/${type}-price-list?search=${encodeURIComponent(
                        query
                    )}`;
                    if (viewAllLink) viewAllLink.href = fullResultsUrl;
                })
                .catch((err) => {
                    if (desktopList)
                        desktopList.innerHTML =
                        "<p>Error loading suggestions</p>";
                    if (mobileList)
                        mobileList.innerHTML =
                        "<p>Error loading suggestions</p>";
                    console.error("Search fetch error:", err);
                });
        } else {
            // Hide wrappers and clear lists
            if (desktopWrapper) desktopWrapper.style.display = "none";
            if (mobileWrapper) mobileWrapper.style.display = "none";
            if (desktopList) desktopList.innerHTML = "<p>No product found</p>";
            if (mobileList) mobileList.innerHTML = "<p>No product found</p>";
        }
    });

    // Handle form submission
    const form = input.closest("form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const query = input.value.trim();
            const isMobile = input.getAttribute("data") === "2";
            const typeSelect = isMobile ?
                document.getElementById("mobileversiontype") :
                document.getElementById("suggesstiontype");

            const type = typeSelect ? typeSelect.value : "mobile";
            if (!query) return;

            // Redirect to the type-based URL
            const targetUrl = `/${type}-price-list?search=${encodeURIComponent(
                query
            )}`;
            window.location.href = targetUrl;
        });
    }
});

const links = document.querySelectorAll(".main-navbar .nav-item .nav-link");
links.forEach((link) => {
    if (link.href === window.location.href) {
        link.classList.remove("text-dark");
        link.classList.add("active");
    } else {
        link.classList.remove("active");
        link.classList.add("text-dark");
    }
});

const header = document.querySelector("header");

let lastScroll = 0;
let headerActive = true;

window.addEventListener("scroll", () => {
    //   console.log(headerActive);
    const currentScroll = window.scrollY;
    if (currentScroll <= 80) {
        return;
    }

    if (
        currentScroll > lastScroll &&
        !header.classList.contains("scroll-down")
    ) {
        header.classList.add("scroll-down");
        headerActive = false;
    } else if (
        currentScroll < lastScroll &&
        header.classList.contains("scroll-down")
    ) {
        header.classList.remove("scroll-down");
        headerActive = true;
    }
    lastScroll = currentScroll;
});

const showError = (errorBox, message) => {
    // Bootstrap layout classes
    errorBox.className = "d-flex flex-column gap-2";
    errorBox.innerHTML = "";

    if (message && typeof message === "object") {
        // Loop each field in the object
        Object.values(message).forEach((errorArray) => {
            errorArray.forEach((errMsg) => {
                const div = document.createElement("div");
                div.className = "alert alert-danger";
                div.innerHTML = errMsg; // set text
                errorBox.appendChild(div);
            });
        });
    } else if (Array.isArray(message)) {
        // Handle simple array
        message.forEach((msg) => {
            const div = document.createElement("div");
            div.className = "alert alert-danger";
            div.innerHTML = msg;
            errorBox.appendChild(div);
        });
    } else {
        // Handle single string
        const div = document.createElement("div");
        div.className = "alert alert-danger";
        div.innerHTML = message;
        errorBox.appendChild(div);
    }
};

const seeMoreBtn = document.getElementById("des-see-more-btn");

const desBottom = document.getElementById("desBottom");
seeMoreBtn ? .addEventListener("click", function() {
    if (desBottom.classList.contains("des-active")) {
        desBottom.classList.remove("des-active");
        desBottom.style.maxHeight = desBottom.scrollHeight + "px";

        seeMoreBtn.innerHTML = "Read Less";
    } else {
        desBottom.classList.add("des-active");
        desBottom.style.maxHeight = "400px";
        seeMoreBtn.innerHTML = "Read More";
    }
});