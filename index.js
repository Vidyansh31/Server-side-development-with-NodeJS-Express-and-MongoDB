var rect = require('./rectangle');

function solveRect(l,b)
{
    console.log("Solving for rectangle with l = " + l + ", b = " + b);

   rect(l,b,(err,rectangle) => {
       if (err) {
           console.log("Error: " + err.message);
       }
       else
       {
        console.log("Area of the rectangle of dimensions l = " + l + ", b = " + b+ "is " +rectangle.area(l,b));
        console.log("perimeter of the rectangle of dimensions l = " + l + ", b = " + b+ "is " +rectangle.perimeter(l,b));
       
       }
   });
    
   console.log("This statement after the call to rect()");
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-1,3);