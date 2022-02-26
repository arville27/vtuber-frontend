const canvasContainer = $('.screensaver-container');
const canvas = $('#canvas')[0];

// Idle time in seconds
let idleTime = 5;

// Default action
init();

function init() {
    const ctx = canvas.getContext('2d');
    const logo = new Image();
    logo.src = '/assets/Logo.png';
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    const logoWidth = logo.width / 4;
    const logoHeight = logo.height / 4;

    $(window).on('resize', () => {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    });

    let x = 1;
    let y = 1;
    let xControl = 1;
    let yControl = 1;
    function redrawCanvas() {
        if (x <= 0) xControl = 1;
        else if (x >= window.innerWidth - logoWidth) xControl = -1;
        if (y <= 0) yControl = 1;
        else if (y >= window.innerHeight - logoHeight) yControl = -1;

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.drawImage(logo, x, y, logoWidth, logoHeight);

        x += xControl;
        y += yControl;
    }

    let interactionTimeout;
    let redrawInterval;
    let isActive = false;

    $(window).on('mousemove keyup click scroll', () => {
        clearTimeout(interactionTimeout);
        if (isActive) stopScreensaver();
        interactionTimeout = setTimeout(activateScreensaver, 1000 * idleTime);
    });

    function activateScreensaver() {
        canvasContainer.fadeIn(1000);
        redrawInterval = setInterval(redrawCanvas, 30);
        isActive = true;
    }

    function stopScreensaver() {
        canvasContainer.fadeOut(1000);
        clearInterval(redrawInterval);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        redrawInterval = null;
        isActive = false;
    }
}
