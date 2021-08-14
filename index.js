var rect = require('./rectangle');

function solveRect(l,b)
{
    console.log("Solving for rectangle with l = " + l + ", b = " + b);

    if (l <= 0 || b <= 0)
    {
        console.log("Rectangle dimensions must be greater than zero");
    }
    else
    {
        console.log("Area of the rectangle is "+rect.area(l,b));
        console.log("perimeter of the rectangle is "+rect.perimeter(l,b));
    }
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-1,3);