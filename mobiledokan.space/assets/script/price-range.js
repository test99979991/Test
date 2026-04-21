const rangeMin = document.querySelector(".range-min");
const rangeMax = document.querySelector(".range-max");
const inputMin = document.querySelector(".input-min");
const inputMax = document.querySelector(".input-max");
const progress = document.querySelector(".progress");
const priceGap = 1000;

// Function to update progress bar
const updateProgress = () => {
    if (!rangeMin || !rangeMax || !progress) return;

    const minVal = parseInt(rangeMin.value);
    const maxVal = parseInt(rangeMax.value);
    const rangeMinVal = parseInt(rangeMin.min);
    const rangeMaxVal = parseInt(rangeMax.max);

    const minPercent = ((minVal - rangeMinVal) / (rangeMaxVal - rangeMinVal)) * 100;
    const maxPercent = ((maxVal - rangeMinVal) / (rangeMaxVal - rangeMinVal)) * 100;

    progress.style.left = minPercent + "%";
    progress.style.right = (100 - maxPercent) + "%";
};

// Handle range slider input
if (rangeMin) {
    rangeMin.addEventListener("input", (e) => {
        const minVal = parseInt(rangeMin.value);
        const maxVal = parseInt(rangeMax.value);

        if (maxVal - minVal < priceGap) {
            rangeMin.value = maxVal - priceGap;
        }
        inputMin.value = rangeMin.value;
        updateProgress();
    });
}

if (rangeMax) {
    rangeMax.addEventListener("input", (e) => {
        const minVal = parseInt(rangeMin.value);
        const maxVal = parseInt(rangeMax.value);

        if (maxVal - minVal < priceGap) {
            rangeMax.value = minVal + priceGap;
        }
        inputMax.value = rangeMax.value;
        updateProgress();
    });
}

const sanitizeDigits = (value) => value.replace(/[^0-9]/g, "");
const enforceGap = (newValue, counterpartValue, isMinField) => {
    if (Number.isNaN(counterpartValue)) return newValue;
    if (isMinField && counterpartValue - newValue < priceGap) {
        return counterpartValue - priceGap;
    }
    if (!isMinField && newValue - counterpartValue < priceGap) {
        return counterpartValue + priceGap;
    }
    return newValue;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Handle text input changes without fighting the user while they type
if (inputMin) {
    inputMin.addEventListener("input", () => {
        const cleaned = sanitizeDigits(inputMin.value);
        inputMin.value = cleaned;
        if (!cleaned) return;

        const minLimit = parseInt(rangeMin.min, 10);
        const maxLimit = parseInt(rangeMax.max, 10);
        let minVal = clamp(parseInt(cleaned, 10), minLimit, maxLimit);
        const currentMax = parseInt(rangeMax.value, 10);
        minVal = clamp(enforceGap(minVal, currentMax, true), minLimit, currentMax - priceGap);

        rangeMin.value = minVal;
        updateProgress();
    });

    inputMin.addEventListener("change", () => {
        if (!inputMin.value) {
            inputMin.value = rangeMin.value = rangeMin.min;
        }
        const minLimit = parseInt(rangeMin.min, 10);
        let minVal = parseInt(inputMin.value, 10);
        if (Number.isNaN(minVal)) {
            minVal = minLimit;
        }
        const currentMax = parseInt(rangeMax.value, 10);
        minVal = clamp(enforceGap(minVal, currentMax, true), minLimit, currentMax - priceGap);
        inputMin.value = rangeMin.value = minVal;
        updateProgress();
    });
}

if (inputMax) {
    inputMax.addEventListener("input", () => {
        const cleaned = sanitizeDigits(inputMax.value);
        inputMax.value = cleaned;
        if (!cleaned) return;

        const minLimit = parseInt(rangeMin.min, 10);
        const maxLimit = parseInt(rangeMax.max, 10);
        let maxVal = clamp(parseInt(cleaned, 10), minLimit, maxLimit);
        const currentMin = parseInt(rangeMin.value, 10);
        maxVal = clamp(enforceGap(maxVal, currentMin, false), currentMin + priceGap, maxLimit);

        rangeMax.value = maxVal;
        updateProgress();
    });

    inputMax.addEventListener("change", () => {
        if (!inputMax.value) {
            inputMax.value = rangeMax.value = rangeMax.max;
        }
        const maxLimit = parseInt(rangeMax.max, 10);
        let maxVal = parseInt(inputMax.value, 10);
        if (Number.isNaN(maxVal)) {
            maxVal = maxLimit;
        }
        const currentMin = parseInt(rangeMin.value, 10);
        maxVal = clamp(enforceGap(maxVal, currentMin, false), currentMin + priceGap, maxLimit);
        inputMax.value = rangeMax.value = maxVal;
        updateProgress();
    });
}

// Trigger filter on change (when user stops dragging/typing)
let priceFilterTimeout;
const triggerPriceFilter = () => {
    clearTimeout(priceFilterTimeout);
    priceFilterTimeout = setTimeout(() => {
        if (typeof productFilter === 'function') {
            productFilter();
        }
    }, 800);
};

if (rangeMin) rangeMin.addEventListener("change", triggerPriceFilter);
if (rangeMax) rangeMax.addEventListener("change", triggerPriceFilter);
if (inputMin) inputMin.addEventListener("change", triggerPriceFilter);
if (inputMax) inputMax.addEventListener("change", triggerPriceFilter);

// Handle radio button price ranges
document.querySelectorAll('input[name="price_range"]').forEach((radio) => {
    radio.addEventListener("change", function() {
        const min = this.getAttribute("data-min");
        const max = this.getAttribute("data-max");

        if (rangeMin) rangeMin.value = min;
        if (rangeMax) rangeMax.value = max;
        if (inputMin) inputMin.value = min;
        if (inputMax) inputMax.value = max;

        updateProgress();
        if (typeof productFilter === 'function') {
            productFilter();
        }
    });
});

// Initialize progress bar on page load
if (progress) {
    updateProgress();
}