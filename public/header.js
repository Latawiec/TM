
var headerRegion = function(p){

    var center;
    p.setup = function(){
        p.noStroke();
        p.smooth();

        var canvas = p.createCanvas(document.getElementById('HEADER').clientWidth, document.getElementById('HEADER').clientHeight);
        center = { x: p.width*6.0/7.0, y: p.height/2.0 };
    }

    
    p.draw = function(){
        p.clear();

        p.push();
        p.translate(center.x, center.y);
        //Orbits
        p.stroke([255, 255, 255]);
        p.noFill();
        p.ellipse(0, 0, 100, 100);
        p.ellipse(0, 0, 250, 250);
        p.ellipse(0, 0, 550, 550);
        p.ellipse(0, 0, 850, 850);

        //sun
        p.fill(255, 179, 17);
        p.noStroke();
        p.ellipse(0, 0, 40, 40);

        //Venus
        p.push();
        p.fill(255, 255, 255);
        p.noStroke();
        p.rotate(0.001*p.millis());
        p.translate(0, 50);
        p.ellipse(0, 0, 10, 10);
            //Moon
            p.stroke([255, 255, 255]);
            p.noFill();
            p.ellipse(0, 0, 40, 40);
            p.push();
            p.fill(255, 255, 255);
            p.noStroke();
            p.rotate(0.001*p.millis());
            p.translate(0, 20);
            p.ellipse(0, 0, 6, 6);
            p.pop();
        p.pop();

        //Mars
        p.push();
        p.fill(255, 255, 255);
        p.noStroke();
        p.rotate(0.0005*p.millis());
        p.translate(0, 125);
        p.ellipse(0, 0, 15, 15);
        p.pop();

        //Earth
        p.push();
        p.fill(255, 255, 255);
        p.noStroke();
        p.rotate(0.0003*p.millis());
        p.translate(0, 275);
        p.ellipse(0, 0, 12, 12);
            //Moon
            p.stroke([255, 255, 255]);
            p.noFill();
            p.ellipse(0, 0, 40, 40);
            p.push();
            p.fill(255, 255, 255);
            p.noStroke();
            p.rotate(0.001*p.millis());
            p.translate(0, 20);
            p.ellipse(0, 0, 6, 6);
            p.pop();
        p.pop();

        //The other planet.. i dont care anymore
        p.push();
        p.fill(255, 255, 255);
        p.noStroke();
        p.rotate(0.0001*p.millis());
        p.translate(0, 425);
        p.ellipse(0, 0, 25, 25);
            //Moon1
            p.stroke([255, 255, 255]);
            p.noFill();
            p.ellipse(0, 0, 100, 100);
            p.push();
            p.fill(255, 255, 255);
            p.noStroke();
            p.rotate(0.001*p.millis());
            p.translate(0, 50);
            p.ellipse(0, 0, 10, 10);
            p.pop();
        p.pop();

        p.pop();
    }
}

new p5(headerRegion, 'HEADER');