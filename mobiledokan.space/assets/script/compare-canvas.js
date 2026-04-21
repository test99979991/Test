// DOM Elements
const compareCanvas = document.getElementById("compareCanvas");
const toggleCompareCanvasBtn = document.getElementById("openCompareCanvas");
const compareNowLink = document.getElementById("compareNowLink");
const addToComparisonBtn = document.querySelectorAll(".addToComparisonBtn");
const compareCountValue = document.querySelectorAll(".compareCountValue");
const checkboxes = document.querySelectorAll(".compare-checkbox");

// Initialize compareList from localStorage
let compareList = JSON.parse(localStorage.getItem("compareList")) || [];

// Toggle Compare Canvas
if (toggleCompareCanvasBtn) {
    toggleCompareCanvasBtn.addEventListener("click", () => {
        compareCanvas.classList.toggle("active");
    });
}

const slugUpdate = () => {
    const compareList = JSON.parse(localStorage.getItem("compareList")) || [];

    document.querySelectorAll(".compare_url").forEach((link) => {
        const type = link.getAttribute("data-type") || "mobile";

        // Normalize type comparison
        const slugs = compareList
            .filter(
                (p) =>
                p.slug &&
                p.type &&
                p.type.toLowerCase() === type.toLowerCase(),
            )
            .map((p) => p.slug.trim())
            .filter(Boolean);

        const compareURL =
            slugs.length >= 2 ? `/compare-${type}/${slugs.join("-vs-")}` : "#";

        link.setAttribute("href", compareURL);
    });
};

document.body.addEventListener("change", function(event) {
    const checkbox = event.target.closest(".compare-checkbox");
    if (!checkbox) return; // exit if change is not from a compare checkbox

    const label = checkbox
        .closest(".custom-checkbox")
        .querySelector(".compare-label");
    const productID = label.getAttribute("data-product-id");

    let compareList = JSON.parse(localStorage.getItem("compareList")) || [];

    if (checkbox.checked) {
        // Check if product already exists
        const alreadyAdded = compareList.some((p) => p.id == productID);
        if (alreadyAdded) {
            alert("This product is already added.");
            checkbox.checked = true;
            return;
        }

        // Fetch full product from API
        fetch(`/api/v1/get-compare/product/${productID}`)
            .then((res) => res.json())
            .then((response) => {
                if (!response.status || !response.data) {
                    alert("Product not found.");
                    checkbox.checked = false;
                    return;
                }

                const product = response.data;

                // Limit by type: max 4 of the same type
                const sameTypeCount = compareList.filter(
                    (p) => p.type === product.type,
                ).length;
                if (sameTypeCount >= 4) {
                    alert(
                        "You can compare up to 4 products of the same type only.",
                    );
                    checkbox.checked = false;
                    return;
                }

                compareList.push(product);
                localStorage.setItem(
                    "compareList",
                    JSON.stringify(compareList),
                );

                compareCanvas.classList.add("active");
                label.textContent = "Remove from Compare";
                label.style.color = "#be0909";

                updateCompareUI();
                activateFirstAvailableTab(product.type);
            })
            .catch((error) => {
                console.error("Compare fetch error:", error);
                // alert("Error adding product to compare.");
                checkbox.checked = false;
            });
    } else {
        // Remove from localStorage by filtering out the product
        compareList = compareList.filter((p) => p.id != productID);
        localStorage.setItem("compareList", JSON.stringify(compareList));

        label.textContent = "Add to Compare";
        label.style.color = "#5b5b5b";

        if (compareList.length === 0) {
            compareCanvas.classList.remove("active");
        }

        updateCompareUI();
        activateFirstAvailableTab();
    }
});

function updateCompareCounter() {
    document.querySelectorAll(".compareCountValue").forEach((counter) => {
        const type = counter.getAttribute("data-type");
        const count = compareList.filter((p) => p.type === type).length;
        counter.textContent = count;
    });
}

function renderCompareItems() {
    const savedList = JSON.parse(localStorage.getItem("compareList")) || [];

    // Get all compare containers with class .compare-canvas-list
    const compareContainers = document.querySelectorAll(".compare-canvas-list");

    compareContainers.forEach((container) => {
        const type = container.getAttribute("data-type");
        container.innerHTML = ""; // Clear existing items

        const filteredProducts = savedList.filter((p) => p.type === type);

        filteredProducts.forEach((product) => {
            const item = document.createElement("div");
            item.className = "compare-item";
            item.innerHTML = `
                <li class="mb-2">
                    <div class="d-flex justify-content-between align-items-start bg-white p-1 gap-2">
                        <div class="d-flex align-items-start">
                            <figure class="m-0 p-1" style="height: 60px;">
                                <img src="${
                                    product.thumbnail
                                }" class="img-fluid object-fit-cover" alt="${
                                    product.title
                                }">
                            </figure>
                            <div class="flex-grow-1 py-1">
                                <div class="text-muted lh-sm fs-7">${
                                    product.title
                                }</div>
                                <div class="d-flex justify-content-between pt-1">
                                    <div class="d-flex justify-content-between w-100">
                                        <div class="text-primary fw-medium my-1 small">৳ ${
                                            product.price_official ??
                                            product.price_unofficial ??
                                            product.expected_price ??
                                            "N/A"
                                        }</div>
                                        <div class="d-flex align-items-center gap-1">
                                            <span class="rounded-circle border border-secondary bg-success" style="width: 10px; height: 10px;"></span>
                                            <span class="fs-8 ctext-blue">Available</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-product-id="${
                            product.id
                        }" class="remove-compare-item" style="cursor:pointer;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 
                                    .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 
                                    8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 
                                    4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                    </div>
                </li>
            `;
            container.appendChild(item);
        });
    });

    // Bind remove buttons again after rendering
    document.querySelectorAll(".remove-compare-item").forEach((button) => {
        button.addEventListener("click", function() {
            const productID = this.getAttribute("data-product-id");
            let compareList =
                JSON.parse(localStorage.getItem("compareList")) || [];
            compareList = compareList.filter((p) => p.id != productID);
            localStorage.setItem("compareList", JSON.stringify(compareList));
            if (compareList.length === 0) {
                document
                    .querySelectorAll(".compare-canvas")
                    .forEach((c) => c.classList.remove("active"));
            }
            updateCompareUI();
        });
    });
}

const updateHomeUI = () => {
    const checkBoxes = document.querySelectorAll(".compare-checkbox");
    const savedList = JSON.parse(localStorage.getItem("compareList")) || [];

    checkBoxes.forEach((checkbox) => {
        const label = checkbox
            .closest(".custom-checkbox")
            .querySelector(".compare-label");
        const productID = label.getAttribute("data-product-id");

        const isInList = savedList.some((p) => p.id == productID);

        if (isInList) {
            checkbox.checked = true;
            label.textContent = "Remove from Compare";
            label.style.color = "#be0909";
        } else {
            checkbox.checked = false;
            label.textContent = "Add to Compare";
            label.style.color = "#5b5b5b";
        }
    });
    slugUpdate();
};

updateHomeUI();

// Toggle visibility of canvas buttons
function toggleCanvasButtons() {
    compareList = JSON.parse(localStorage.getItem("compareList")) || [];
    if (compareList.length > 1) {
        compareNowLink.classList.add("active");
    } else {
        compareNowLink.classList.remove("active");
    }

    addToComparisonBtn.forEach((btn) => {
        if (compareList.length === 4) {
            btn.classList.add("d-none");
        } else {
            btn.classList.remove("d-none");
        }
    });
}

function updateCompareUI() {
    const savedList = JSON.parse(localStorage.getItem("compareList")) || [];
    const types = ["mobile", "tablet", "watch"]; // Extend if more types exist

    // Find types with products
    const typesWithProducts = types.filter((type) =>
        savedList.some((p) => p.type === type),
    );

    types.forEach((type) => {
        const tab = document.querySelector(`#tab-${type}`);
        const tabBtn = document.querySelector(`#tab-btn-${type}`);
        const listContainer = tab ? .querySelector(
            `.compare-canvas-list[data-type="${type}"]`,
        );
        const counter = document.querySelector(
            `.compareCountValue[data-type="${type}"]`,
        );
        const compareBtn = document.querySelector(
            `.compare_url[data-type="${type}"]`,
        );

        const filteredList = savedList.filter((p) => p.type === type);

        // Logic for showing/hiding tabs and tab buttons
        if (typesWithProducts.length > 0) {
            // Show only the tab(s) with products, hide others
            if (filteredList.length > 0) {
                tab ? .classList.remove("d-none");
                tabBtn ? .classList.remove("d-none");
            } else {
                tab ? .classList.add("d-none");
                tabBtn ? .classList.add("d-none");
            }
        } else {
            // No products at all: show only the first tab, hide others
            if (type === types[0]) {
                tab ? .classList.remove("d-none");
                tabBtn ? .classList.remove("d-none");
            } else {
                tab ? .classList.add("d-none");
                tabBtn ? .classList.add("d-none");
            }
        }

        // ...existing code for counter, compareBtn, rendering products...
        if (counter) counter.textContent = filteredList.length;

        if (compareBtn) {
            if (filteredList.length >= 2) {
                compareBtn.classList.add("active");
                const slugs = filteredList
                    .map((p) => p.slug.trim())
                    .filter(Boolean);
                compareBtn.setAttribute(
                    "href",
                    `/compare-${type}/${slugs.join("-vs-")}`,
                );
            } else {
                compareBtn.classList.remove("active");
                compareBtn.setAttribute("href", "#");
            }
        }

        if (listContainer) {
            listContainer.innerHTML = "";
            filteredList.forEach((product) => {
                const item = document.createElement("li");
                item.classList.add("mb-2");
                item.innerHTML = `
                    <div class="d-flex justify-content-between align-items-start bg-white p-1 gap-2">
                        <div class="d-flex align-items-start">
                            <figure class="m-0 p-1" style="height: 60px;">
                                <img src="${
                                    product.thumbnail
                                }" class="img-fluid object-fit-cover" alt="${
                                    product.title
                                }">
                            </figure>
                            <div class="flex-grow-1 py-1">
                                <div class="text-muted lh-sm fs-7">${
                                    product.title
                                }</div>
                                <div class="d-flex justify-content-between pt-1">
                                    <div class="text-primary fw-medium my-1 small">
                                        ৳ ${
                                            product.price_official ??
                                            product.price_unofficial ??
                                            product.expected_price ??
                                            "N/A"
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div data-product-id="${
                            product.id
                        }" class="remove-compare-item" style="cursor:pointer;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 
                                    .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 
                                    8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 
                                    4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </div>
                    </div>
                `;
                listContainer.appendChild(item);
            });
        }
    });

    rebindRemoveButtons();
    updateCheckboxUI();
}

function rebindRemoveButtons() {
    document.querySelectorAll(".remove-compare-item").forEach((btn) => {
        btn.onclick = () => {
            const id = btn.getAttribute("data-product-id");
            let list = JSON.parse(localStorage.getItem("compareList")) || [];
            // Find the type of the product being removed
            const removedProduct = list.find((p) => p.id == id);
            const removedType = removedProduct ? removedProduct.type : null;
            // Remove the product
            list = list.filter((p) => p.id != id);
            localStorage.setItem("compareList", JSON.stringify(list));
            updateCompareUI();

            // If there are no more products of this type, activate another tab
            if (removedType && !list.some((p) => p.type === removedType)) {
                // Find the next available type with products, or default to "mobile"
                const types = ["mobile", "tablet", "watch"];
                const nextType =
                    types.find((type) => list.some((p) => p.type === type)) ||
                    "mobile";
                activateFirstAvailableTab(nextType);
            }
        };
    });
}

function updateCheckboxUI() {
    const savedList = JSON.parse(localStorage.getItem("compareList")) || [];

    /* ---------- EXISTING CHECKBOX LOGIC (UNCHANGED) ---------- */
    document.querySelectorAll(".compare-checkbox").forEach((checkbox) => {
        const label = checkbox
            .closest(".custom-checkbox")
            .querySelector(".compare-label");
        const productID = label.getAttribute("data-product-id");

        const isInList = savedList.some((p) => p.id == productID);

        checkbox.checked = isInList;
        label.textContent = isInList ? "Remove from Compare" : "Add to Compare";
        label.style.color = isInList ? "#be0909" : "#5b5b5b";
    });

    /* ---------- NEW: COMPARE BUTTON UI ---------- */
    document.querySelectorAll(".compare-btn").forEach((btn) => {
        const productID = btn.getAttribute("data-product-id");
        const isInList = savedList.some((p) => p.id == productID);

        const textEl = btn.querySelector(".compare-text");
        const iconEl = btn.querySelector(".compare-icon");

        if (isInList) {
            btn.classList.add("compare-selected");
            if (!textEl) return
            textEl.textContent = "Selected";
            textEl.style.color = "red";
            iconEl.style.color = "red";

            // check icon
            iconEl.setAttribute("viewBox", "0 0 448 512");
            iconEl.innerHTML = `
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
            `;
        } else {
            btn.classList.remove("compare-selected");
            if (!textEl) return

            textEl.textContent = "Compare";
            textEl.style.color = "";
            iconEl.style.color = "";

            // plus icon
            iconEl.setAttribute("viewBox", "0 0 448 512");
            iconEl.innerHTML = `
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"></path>
            `;
        }
    });
}

// Initialize on load
updateCompareUI();
(function() {
    const savedList = JSON.parse(localStorage.getItem("compareList")) || [];
    const types = ["mobile", "tablet", "watch"];
    const availableType =
        types.find((type) => savedList.some((p) => p.type === type)) ||
        "mobile";
    activateFirstAvailableTab(availableType);
})();

addToComparisonBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = btn.nextElementSibling;

        if (modal && modal.classList.contains("compareSearchModal")) {
            modal.classList.remove("d-none");
        }
    });
});

const compareCanvasSearch = document.querySelectorAll(".compareCanvasSearch");

compareCanvasSearch.forEach((input) => {
    input.addEventListener("input", async function(event) {
        const value = event.target.value.trim().toLowerCase();
        const type = input.getAttribute("data-type");
        const listId = type + "SearchList";
        const resultBox = document.getElementById(listId);

        if (!resultBox) return;

        if (value.length === 0) {
            resultBox.classList.add("d-none");
            resultBox.innerHTML = "";
            return;
        }

        resultBox.classList.remove("d-none");

        try {
            const res = await fetch(
                `/api/v1/suggestion?compare_suggestion=1&take=5&type=${type}&search=${encodeURIComponent(
                    value,
                )}`,
            );
            const html = await res.text();

            resultBox.innerHTML = html;

            // Rebind product item click from suggestion
            resultBox.querySelectorAll(".modalProductItem").forEach((item) => {
                item.addEventListener("click", () => {
                    compareList =
                        JSON.parse(localStorage.getItem("compareList")) || [];

                    const productId = item.getAttribute("data-product-id");
                    if (!productId) return;
                    // console.log(productId)
                    // Fetch full product from API
                    fetch(`/api/v1/get-compare/product/${productId}`)
                        .then((res) => res.json())
                        .then((response) => {
                            if (!response.status || !response.data) {
                                alert("Product not found.");
                                return;
                            }

                            const product = response.data;
                            // console.log(product)
                            const sameTypeCount = compareList.filter(
                                (p) => p.type === product.type,
                            ).length;
                            if (sameTypeCount >= 4) {
                                alert(
                                    "You can compare up to 4 products of the same type.",
                                );
                                return;
                            }

                            if (compareList.some((p) => p.id == product.id)) {
                                alert("This product is already added.");
                                return;
                            }

                            compareList.push(product);
                            localStorage.setItem(
                                "compareList",
                                JSON.stringify(compareList),
                            );
                            updateCompareUI();
                        })
                        .catch(() => {
                            alert("Error fetching product.");
                        });
                });
            });
        } catch (error) {
            console.error("Search fetch error", error);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const modalProductItem = document.querySelectorAll(".modalProductItem");
    modalProductItem.forEach((item) => {
        item.addEventListener("click", () => {
            const productId = item.getAttribute("data-product-id");
            compareList = JSON.parse(localStorage.getItem("compareList")) || [];
            if (!compareCanvas.classList.contains("active")) {
                compareCanvas.classList.add("active");
            }
            const alreadyAdded = compareList.some((p) => p.id == productId);
            if (alreadyAdded) {
                alert("This product is already added.");
                return;
            }

            // Fetch full product from API
            fetch(`/api/v1/get-compare/product/${productId}`)
                .then((res) => res.json())
                .then((response) => {
                    if (!response.status || !response.data) {
                        alert("Product not found.");
                        return;
                    }

                    const product = response.data;

                    // Limit by type: max 4 of the same type
                    const sameTypeCount = compareList.filter(
                        (p) => p.type === product.type,
                    ).length;
                    if (sameTypeCount >= 4) {
                        alert(
                            "You can compare up to 4 products of the same type only.",
                        );
                        return;
                    }

                    compareList.push(product);
                    localStorage.setItem(
                        "compareList",
                        JSON.stringify(compareList),
                    );
                    item.classList.add("active");

                    updateCompareUI();
                });
        });
    });
});

function activateFirstAvailableTab(type = null) {
    const types = ["mobile", "tablet", "watch", "laptop", "camera"];
    let savedList = JSON.parse(localStorage.getItem("compareList")) || [];

    // Find all tabs and tab buttons
    const tabBtns = types
        .map((t) => document.getElementById(`tab-btn-${t}`))
        .filter(Boolean);
    const tabs = types
        .map((t) => document.getElementById(`tab-${t}`))
        .filter(Boolean);

    // Helper to clear all active/show classes
    function clearActiveShow() {
        tabBtns.forEach((btn) => {
            btn.classList.remove("active", "show");
            const navLink = btn.querySelector(".nav-link");
            if (navLink) navLink.classList.remove("active");
        });
        tabs.forEach((tab) => {
            tab.classList.remove("active", "show");
        });
    }

    // If a type is provided and has products, activate its tab
    if (type && savedList.some((p) => p.type === type)) {
        clearActiveShow();
        const btn = document.getElementById(`tab-btn-${type}`);
        const tab = document.getElementById(`tab-${type}`);
        if (btn && tab) {
            btn.classList.add("active", "show");
            tab.classList.add("active", "show");
            const navLink = btn.querySelector(".nav-link");
            if (navLink) navLink.classList.add("active");
        }
        return;
    }

    // Find first type with products
    const availableType = types.find((t) =>
        savedList.some((p) => p.type === t),
    );
    if (availableType) {
        clearActiveShow();
        const btn = document.getElementById(`tab-btn-${availableType}`);
        const tab = document.getElementById(`tab-${availableType}`);
        if (btn && tab) {
            btn.classList.add("active", "show");
            tab.classList.add("active", "show");
            const navLink = btn.querySelector(".nav-link");
            if (navLink) navLink.classList.add("active");
        }
    } else {
        // If only one tab exists, keep it active even if empty
        const visibleTabs = tabs.filter(
            (tab) => !tab.classList.contains("d-none"),
        );
        if (visibleTabs.length === 1) {
            clearActiveShow();
            visibleTabs[0].classList.add("active", "show");
            const btn = document.getElementById(
                `tab-btn-${visibleTabs[0].getAttribute("data-type")}`,
            );
            if (btn) {
                btn.classList.add("active", "show");
                const navLink = btn.querySelector(".nav-link");
                if (navLink) navLink.classList.add("active");
            }
        } else {
            clearActiveShow();
        }
    }
}