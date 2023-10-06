// To draw single rect
function drawRect(rect) {
    const rPath = new Path.Rectangle({
                 point: [rect.x || 0, rect.y || 0],
                 size: [rect.width, rect.height],
                 strokeColor: 'red',
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
                 strokeColor: 'red',
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


// Problem 1. 
// Find outline of given list of rectangles.
const rectsList = [
    { x: 55, y: 0, width: 456, height: 92 },
    { x: 550, y: 0, width: 565, height: 92 },
    { x: 0, y: 228, width: 565, height: 92 },
    { x: 70, y: 342, width: 569, height: 92 },
    { x: 155, y: 456, width: 650, height: 92 },
    ]
    

// To see rects list visibliy
//drawRects(rectsList)
//APPROACH
//1. Find the top most left most rectangle.
//2. start moving from top left corner to right  till we reach the other end of the side.
//3. Now find the right nearest rectangle whose x+width is greater than current x coordinate and its y coordinate should be minimum  . 
//4. Now Move down till the y coordinate of next rectangle and then move right till we reach x+width of the rectangle and repeat the steps 3 and 4.
//5. if there is no more right rectangle move downwards till we reach the bottom side of our current rectangle.
//6. Now find the bottom nearest rectangle whose y+height greater than current y coordinate and its x+width should be maximum.
//7. Now move left from our current point till we reach x+width of next rectangle and move downwards till we reach y+height of the next rectangle and repeat steps 6 and 7.
//8. If there is no more bottom rectangle move left till we reach the right end of the current side of our current rectangle.
//9. Now find the left nearest rectangle whose x coordinate is less than current x coordinate and its y+height should e maximum.
//10.Now move upwards from our current point till we reach y+height of the next rectangle and move left till we reach x coordinate of next rectangle and repeat steps 9 and 10.
//11.If there is no more left rectangle move upwards till we reach the top side of the current rectangle.
//12.Now find the nearest rectangle whose y coordinate should be less than current y coordinate and its x coordinate should be minimum.
//13.Now move rightwards from our current point till we reach x coordinate of the next rectangle and move upwards till we reach y coordinate of next rectangle and repeat steps 12 and 13.
//14.If there is no more top rectangle we are done.

// Write sudo code of your approach here

const outline=[];

const rectanglePoints=[];
for(const rect of rectsList)
{
 rectanglePoints.push([[rect.x,rect.y],[rect.x+rect.width,rect.y],[rect.x+rect.width,rect.y+rect.height],[rect.x,rect.y+rect.height]]);
    
}

getOutline(rectsList);



function findTopLeftRectangle(rectangles) {
    if (rectangles.length === 0) {
        return null; // Return null if the array is empty
    }

    let topLeftRectangle = rectangles[0]; // Initialize with the first rectangle

    for (let i = 1; i < rectangles.length; i++) {
        if (rectangles[i].y < topLeftRectangle.y) {
            topLeftRectangle = rectangles[i];
        }
    }

    return topLeftRectangle;
}

function findRight(x,y,currentRect)
{   let rectangle={x:100000,y:100000};
    for(const rect of rectsList)
    {
        if(rect.x===currentRect.x && rect.y===currentRect.y) continue;
        else if(rect.x+rect.width>x &&rect.x+rect.width>currentRect.x && rect.y<rectangle.y )
        {
            
                rectangle=rect;
            
        }
    }
    if(rectangle.x===100000 && rectangle.y===100000) return false;
    return rectangle;
}

function findBottom(x,y,currentRect)
{  
    let rectangle={x:-1,y:100000,width:0,height:0};
    for(const rect of rectsList)
    {
        if(rect.x===currentRect.x && rect.y===currentRect.y) continue;
        if(rect.y+rect.height>y && rect.x+rect.width>=rectangle.x+rectangle.width )
        {
            
           
                rectangle=rect;
            
        }
    }
    if(rectangle.x===-1 && rectangle.y===100000) return false;
    return rectangle;
}

function findLeft(x,y,currentRect)
{   let rectangle={x:-1,y:-1};
    for(const rect of rectsList)
    {
        if(rect.x===currentRect.x && rect.y===currentRect.y) continue;
        if(rect.x<x && rect.y+rect.height>=rectangle.y)
        {
           
                rectangle=rect;
            
        }
    }
    if(rectangle.x===-1 && rectangle.y===-1) return false;
    return rectangle;
}

function findUp(x,y,currentRect)
{   let rectangle={x:100000,y:-1};
    for(const rect of rectsList)
    {
        if(rect.x===currentRect.x && rect.y===currentRect.y) continue;
        if(rect.y<y && rect.x<=rectangle.x )
        {
            
                rectangle=rect;
            
        }
    }
    if(rectangle.x===100000 && rectangle.y===-1) return false;
    return rectangle;
}

function getOutline(rectsList = []) {
// write your logic here
// this function should recturn a list of points which should be outline of 
// given rectangles

const topLeftRectangle = findTopLeftRectangle(rectsList);
let currentX=topLeftRectangle.x;
let currentY=topLeftRectangle.y;
let currentRect=topLeftRectangle;
outline.push([currentX,currentY]);
outline.push([currentX+currentRect.width,currentY]);
currentX=currentX+currentRect.width;
currentY=currentY+currentRect.height;

//Traverse right
while(true)
{   
    nextRect=findRight(currentX,currentY,currentRect);
    console.log(nextRect)
   
    if(!nextRect) 
    {
        currentX=currentX;
        currentY=currentY+currentRect.height;
        outline.push([currentX,currentY]);
        break;
    }
    outline.push([currentX,nextRect.y]);
    outline.push([nextRect.x+nextRect.width,nextRect.y]);
    currentX=nextRect.x+nextRect.width;
    currentY=nextRect.y;
    currentRect=nextRect;
}


//Traverse bottom
while(true)
{  
    nextRect=findBottom(currentX,currentY,currentRect);
    
    if(!nextRect) 
    {
        currentX=currentRect.x;
        currentY=currentY;
        outline.push([currentX,currentY]);
        break;
    }
    outline.push([nextRect.x+nextRect.width,currentY]);
    outline.push([nextRect.x+nextRect.width,nextRect.y+nextRect.height]);
    currentX=nextRect.x+nextRect.width;
    currentY=nextRect.y+nextRect.height;
    currentRect=nextRect;
}


//Traverse Left
while(true)
{   
    nextRect=findLeft(currentX,currentY,currentRect);
    if(!nextRect) 
    {
        currentX=currentX;
        currentY=currentRect.y;
        outline.push([currentX,currentY]);
        break;
    }
    outline.push([currentX,nextRect.y+nextRect.height]);
    outline.push([nextRect.x,nextRect.y+nextRect.height]);
    currentX=nextRect.x;
    currentY=nextRect.y+nextRect.height;
    currentRect=nextRect;
}


//Traverse Up
while(true)
{   
    nextRect=findUp(currentX,currentY,currentRect);
    
    if(!nextRect) 
    {
       
        break;
    }
    outline.push([nextRect.x,currentY]);
    outline.push([nextRect.x,nextRect.y]);
    currentX=nextRect.x;
    currentY=nextRect.y;
    currentRect=nextRect;
}

console.log(outline);
//drawOutline(outline);


}
