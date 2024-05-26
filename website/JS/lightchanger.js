document.addEventListener('DOMContentLoaded', function () {
    const lightingRange = document.getElementById('lightingRange');
    lightingRange.addEventListener('input', function () {
        const lightingValue = lightingRange.value;
        const calculatedBrightness = 100 - lightingValue;
        const newBackgroundColor = `rgb(${calculatedBrightness}%, ${calculatedBrightness}%, ${calculatedBrightness}%)`;
        document.body.style.backgroundColor = newBackgroundColor;
    });
});
