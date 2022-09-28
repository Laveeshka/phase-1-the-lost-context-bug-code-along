const messageConfig = {
    frontContent: "Happy Birthday, Odin One-Eye!",
    insideContent: "From Asgard to Nifelheim, you're the best all-father ever. \n\nLove,",
    closing: {
        Thor: "Admiration, respect, and love",
        Loki: "Your son"
    },
    signatories: ["Thor", "Loki"]
};

//SOLUTION 1: use a thisArg argument to the ForEach function as a second argument. This solution also works with other array processing methods
const printCardSol1 = function() {
    console.log(this.frontContent);
    console.log(this.insideContent);

    //console.log("Debug Before forEach: " + this);
    this.signatories.forEach(function(signatory) {
        //console.log("Debug Inside forEach: " + this); 
        const message = `${this.closing[signatory]}, ${signatory}`;
        console.log(message);
    }, this); //added a thisArg argument as a second argument
};

printCardSol1.call(messageConfig);

//SOLUTION 2: Invoke bind on the function expression in the forEach
const printCard2 = function () {
    console.log(this.frontContent);
    console.log(this.insideContent);
    const contextBoundForEachExpr = function (signatory) {
      const message = `${this.closing[signatory]}, ${signatory}`;
      console.log(message);
    }.bind(this);
  
    this.signatories.forEach(contextBoundForEachExpr);
  };
  
//SOLUTION 3: Use a closure to regain access to the lost context
const printCard3 = function () {
    console.log(this.frontContent);
    console.log(this.insideContent);
  
    const outerContext = this; //assign this to a variable and leverage function-level scope to gain access to the other context within the function expression inside the forEach
  
    this.signatories.forEach(function (signatory) {
      const message = `${outerContext.closing[signatory]}, ${signatory}`;
      console.log(message);
    });
  };

//SOLUTION 4: Use an arrow function expression to create a function without its own context
//Arrow functions are automatically bound to its parent's context and do NOT create a context of their own
//They absorb the context of their enclosing environment
const printCard4 = function () {
    console.log(this.frontContent);
    console.log(this.insideContent);
    this.signatories.forEach((signatory) =>
      console.log(`${this.closing[signatory]}, ${signatory}`)
    );
  };

//LOST CONTEXT
const printCard = function() {
    console.log(this.frontContent);
    console.log(this.insideContent);

    console.log("Debug Before forEach: " + this);
    this.signatories.forEach(function(signatory) {
        console.log("Debug Inside forEach: " + this); //global object (window/global) since  the function within the forEarch defaults to the global execution context as it was called without "anything to the left of the dot"
        const message = `${this.closing[signatory]}, ${signatory}`;
        console.log(message);
    });
};

printCard.call(messageConfig);

