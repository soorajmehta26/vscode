// To draw single rect
function drawRect(rect) {
  let color = new Color.random();
        const rPath = new Path.Rectangle({
                     point: [rect.x || 0, rect.y || 0],
                     size: [rect.width, rect.height],
                     strokeColor: color,
                     strokeWidth: 0.5,
                 });

}

// To Draw list of rects
function drawRects(rectsList = []) {
 let color = new Color.random()
 for(let inx = 0; inx < rectsList.length; inx++) {
     const { x, y, width, height, content } = rectsList[inx]

     const rPath = new Path.Rectangle({
                     point: [x, y],
                     size: [width, height],
                     strokeColor: color,
                     strokeWidth: 0.5,
                 });
 }
 
}

// To draw list of points
function drawOutline(pointsList = []) {

 const rPath = new Path(pointsList);
 rPath.strokeColor = 'blue'
 rPath.closed = true
}


// Above functions are to see visibly all problems input and expected outputs


// Problem 2. 
// Find bound of given points
const pointsList  =
[ [0, 0], [887, 0], [887, 500], [2158, 500], [2158, 1381], [0, 1381], [0, 0] ]
const rectangle = { x: 299, y: 409, width: 525, height: 724 }


// To see point list visibliy
drawOutline(pointsList,rectangle);
drawRect(rectangle);
scaled(pointsList);





// Write sudo code of your approach here

function scaled(pointsList = []) {
 const verticalLines=[];
 const horizontalLines=[];
 for(let i=0;i<pointsList.length-1;i++)
 {
     if(pointsList[i][0]===pointsList[i+1][0])
     {
         verticalLines.push({x:pointsList[i][0],y1:pointsList[i][1],y2:pointsList[i+1][1]});
     }
     else 
     {
         horizontalLines.push({y:pointsList[i][1],x1:pointsList[i][0],x2:pointsList[i+1][0]})

     }
 }
 
// Destructure properties from the 'rectangle' object
const { x, y, width, height } = rectangle;

// Calculate the minimum and maximum coordinates of the rectangle
const minX = x;
const maxX = x + width;
const minY = y;
const maxY = y + height;

// Initialize variables to track the nearest lines on each side of the rectangle
let topNearestline = 0;
let leftNearestline = 0;
let rightNearestline = 10000;
let bottomNearestline = 10000;

// Iterate through the 'linesList'
for (const line of horizontalLines) {
// Check if the line is above the top edge of the rectangle
let x1=Math.min(line.x1,line.x2);
let x2=Math.max(line.x1,line.x2);
if (line.y <= minY) {
 // Check if the line is within the horizontal bounds of the rectangle
 if (x2 >= minX && x1 <= maxX) {
   // Update 'topNearestline' to the maximum y-coordinate found
   topNearestline = Math.max(topNearestline, line.y);
 }
}
// Check if the line is below the bottom edge of the rectangle
if (line.y >= maxY) {
 // Check if the line is within the horizontal bounds of the rectangle
 if (x2 >= minX && x1 <= maxX) {
     // Update 'topNearestline' to the maximum y-coordinate found
     bottomNearestline = Math.min(bottomNearestline, line.y);
   }
}

}
for (const line of verticalLines) {
 // Check if the line is above the top edge of the rectangle
 let y1=Math.min(line.y1,line.y2);
 let y2=Math.max(line.y1,line.y2);
 // Check if the line is to the left of the left edge of the rectangle
if (line.x <= minX) {
 // Check if the line is within the vertical bounds of the rectangle
 if (y2 >= minY && y1 <= maxY) {
   // Update 'leftNearestline' to the maximum x-coordinate found
   leftNearestline = Math.max(leftNearestline, line.x);
 }
}
// Check if the line is to the right of the right edge of the rectangle
if (line.x >= maxX) {
 // Check if the line is within the vertical bounds of the rectangle
 if (y2 >= minY && y1 <= maxY) {
   // Update 'rightNearestline' to the minimum x-coordinate found
   rightNearestline = Math.min(rightNearestline, line.x);
 }
}
}

console.log(topNearestline,rightNearestline,bottomNearestline,leftNearestline);

// Calculate the minimum horizontal and vertical distances to the nearest lines
const horizontalMinDistance = Math.min(minX - leftNearestline, rightNearestline - maxX);
const verticalMinDistance = Math.min(minY - topNearestline, bottomNearestline - maxY);

console.log(horizontalMinDistance,verticalMinDistance);
// Calculate the aspect ratio of the rectangle
const ratio = width / height;

let newWidth = width;
let newHeight = height;
let newX = x;
let newY = y;
console.log("fasdf",(width + 2 * horizontalMinDistance) / ratio );
// Check if the width can be increased while maintaining the aspect ratio
if ((width + 2 * horizontalMinDistance) / ratio <= height + 2 * verticalMinDistance) {
newWidth = width + 2 * horizontalMinDistance;
newHeight = (width + 2 * horizontalMinDistance) / ratio;
newX = x - horizontalMinDistance;
newY = y - (newHeight - height) / 2;
} else {
 
// If not, increase the height while maintaining the aspect ratio
newWidth = (height + 2 * verticalMinDistance)*ratio;
newHeight = height + 2 * verticalMinDistance;
newY = y - verticalMinDistance;
newX = x - (newWidth - width) / 2;
}

// Create a new scaled rectangle object
const scaledRectangle = { x: newX, y: newY, width: newWidth, height: newHeight };

// Call the 'drawRect' function with the scaled rectangle

drawRect(scaledRectangle);
// Output the scaled rectangle information
console.log(scaledRectangle);





 
}
