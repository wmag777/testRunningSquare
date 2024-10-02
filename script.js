$(document).ready(function() {
    const square = $('#square');
    const body = $('body');
    const avoidDistance = 100;
    let lastMouseX = 0;
    let lastMouseY = 0;

    function moveSquare(mouseX, mouseY) {
        const squareRect = square[0].getBoundingClientRect();
        const squareX = squareRect.left + squareRect.width / 2;
        const squareY = squareRect.top + squareRect.height / 2;

        const dx = mouseX - squareX;
        const dy = mouseY - squareY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < avoidDistance) {
            const angle = Math.atan2(dy, dx);
            const newX = squareX - Math.cos(angle) * avoidDistance;
            const newY = squareY - Math.sin(angle) * avoidDistance;

            const boundedX = Math.max(0, Math.min(newX, body.width() - squareRect.width));
            const boundedY = Math.max(0, Math.min(newY, body.height() - squareRect.height));

            square.css({
                left: boundedX + 'px',
                top: boundedY + 'px'
            });

            updateColor(boundedX, boundedY);
        }
    }

    function updateColor(x, y) {
        const windowWidth = body.width();
        const windowHeight = body.height();

        let color;
        if (x < windowWidth / 2 && y < windowHeight / 2) {
            color = '#ff0000'; // Red for top-left quadrant
        } else if (x >= windowWidth / 2 && y < windowHeight / 2) {
            color = '#00ff00'; // Green for top-right quadrant
        } else if (x < windowWidth / 2 && y >= windowHeight / 2) {
            color = '#0000ff'; // Blue for bottom-left quadrant
        } else {
            color = '#ffff00'; // Yellow for bottom-right quadrant
        }

        square.css('background-color', color);
    }

    $(document).mousemove(function(event) {
        const currentTime = new Date().getTime();
        if (currentTime - lastMoveTime > 16) { // Limit to ~60fps
            moveSquare(event.pageX, event.pageY);
            lastMouseX = event.pageX;
            lastMouseY = event.pageY;
            lastMoveTime = currentTime;
        }
    });

    // Initial positioning
    const initialX = Math.random() * (body.width() - 30);
    const initialY = Math.random() * (body.height() - 30);
    square.css({
        left: initialX + 'px',
        top: initialY + 'px'
    });
    updateColor(initialX, initialY);

    let lastMoveTime = 0;

    // Continuous movement even when mouse is not moving
    function continuousMovement() {
        moveSquare(lastMouseX, lastMouseY);
        requestAnimationFrame(continuousMovement);
    }

    continuousMovement();
});
