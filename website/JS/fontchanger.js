document.addEventListener('DOMContentLoaded', function () {
    const fontSelector = document.getElementById('fontSelector');
    fontSelector.addEventListener('change', function () {
        const selectedFont = fontSelector.value;
        document.body.style.fontFamily = selectedFont;
    });
});
