function drawLine(context, from, to, isAnimated) {
    context.beginPath();
    if (isAnimated) {
        var startX = from[0];
        var startY = from[1];
        var endX = to[0];
        var endY = to[1];
        var amount = 0;
        var intervalID = setInterval(function() {
            amount += 0.05;
            if (amount > 1) amount = 1;
            if (amount === 1) {
                clearInterval(intervalID);
            }
            context.moveTo(startX, startY);
            context.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount);
            context.stroke();
        }, 30);
    } else {
        context.beginPath();
        context.moveTo(from[0], from[1]);
        context.lineTo(to[0], to[1]);
        context.stroke();
    }
}

 function drawArc(context, cx, cy, r, from, to, isAnimated) {
    context.moveTo(cx + 15, 45);
    context.beginPath();
    if (isAnimated) {
        animate(context, cx, cy, r, 0, 0, 100, Math.PI * 2, Math.PI / 2);
    } else {
        context.arc(cx, cy, r, 0, (Math.PI/180)*360);
        context.stroke();
    }
}

function animate(context, cx, cy, r, current, currentPercent, endPercent, circ, quart) {
    context.beginPath();
    context.arc(cx, cy, r, -(quart), ((circ) * current) - quart, false);
    context.stroke();
    currentPercent++;
    if (currentPercent < endPercent) {
     requestAnimationFrame(function () {
         animate(context, cx, cy, r, currentPercent / 100, currentPercent, endPercent, circ, quart);
     });
    }
}

function prepareGallow() {
    var c = canvas.getContext('2d');
    c.lineWidth = 10;
    c.strokeStyle = 'white';
    c.font = 'bold 24px Arial, sans-serif';
    // draw base of the gallow
    drawLine(c, [20,190], [120,190], true);

}

function continueToHang(attemptsLeft) {
    var c = canvas.getContext('2d');
    c.lineWidth = 10;
    c.strokeStyle = 'white';
    c.font = 'bold 24px Arial, sans-serif';

    switch(attemptsLeft) {
        case 4:
            // draw the upright
            drawLine(c, [70,185], [70,10], true);
            break;
        case 3:
            // draw the arm of the gallows
            drawLine(c, [70,10], [200,10], true);
            break;
        case 2:
            c.lineWidth = 5;
            // draw rope
            drawLine(c, [190,15], [190,30], true);
            // draw head
            drawArc(c, 190, 45, 15, 0, 100, true);
            break;
        case 1:
            c.lineWidth = 5;
            // draw body
            drawLine(c, [190,60], [190,130], true);
            break;
        case 0:
            c.lineWidth = 5;
            // draw arms
            drawLine(c, [190,80], [160,90], true);
            drawLine(c, [190,80], [220,90], true);
            break;
        case -1:
            c.lineWidth = 5;
            // draw legs
            drawLine(c, [190,130], [175,170], false);
            drawLine(c, [190,130], [205,170], false);
            break;

    }
}