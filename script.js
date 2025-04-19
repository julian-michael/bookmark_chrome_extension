document.addEventListener("DOMContentLoaded", function () {
    const scrollBox = document.getElementById('scrollBox');
    const leftButton = document.getElementById('goLeft');
    const rightButton = document.getElementById('goRight');

    leftButton.addEventListener("click", () => {
        scrollBox.scrollBy({ left: -150, behavior: 'smooth' });
    });

    rightButton.addEventListener("click", () => {
        scrollBox.scrollBy({ left: 150, behavior: 'smooth' });
    });
});
