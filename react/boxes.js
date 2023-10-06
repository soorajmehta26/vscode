function arrangeBoxes(userData) {
    const { boxes, design, boxPadding } = userData;
    const { w: containerWidth, h: containerHeight, margin } = design;
    const { h: marginH, v: marginV } = margin;
    
    
    let currentX = marginH;
    let currentY = marginV;
    let remainingWidth = containerWidth - 2*marginH;
    let remainingHeight = containerHeight - 2*marginV;
    let virtualBoxes=[];
    let index=0;
    for (const box of boxes) {
      let { w: boxWidth, h: boxHeight, rotate, angle } = box;
      
      if (rotate) {
        box.degree = angle;
        box.w = boxHeight;
        box.h = boxWidth;
        boxHeight=boxWidth;
        boxWidth=box.w;
      }
      
      if (boxWidth <= remainingWidth && boxHeight <= containerHeight - marginV-currentY) {
       
        box.x = currentX;
        box.y = currentY;
       
  
       
       
        remainingWidth -= (boxWidth + boxPadding);
        remainingHeight = Math.min(remainingHeight ,(containerHeight - marginV)-(currentY+boxHeight + boxPadding));
        currentX += (boxWidth + boxPadding);
        virtualBoxes.push(index);
      
      } 
      else if(boxWidth <= remainingWidth)
      {
       let newHeight=(containerHeight - marginV)-currentY;
       let scale=boxHeight/boxWidth;
       let newWidth=newHeight/scale;

       boxWidth=newWidth;
       boxHeight=newHeight;
       box.w=newWidth;
       box.h=newHeight;
       box.x = currentX;
       box.y = currentY;

       remainingWidth -= (boxWidth + boxPadding);
       remainingHeight = Math.min(remainingHeight ,(containerHeight - marginV)-(currentY+boxHeight + boxPadding));
       currentX += (boxWidth + boxPadding);
       virtualBoxes.push(index);
      }
      else if(boxWidth > remainingWidth && boxHeight > containerHeight - marginV-currentY)
      {
        let newHeight=(containerHeight - marginV)-currentY;
       let scale=boxHeight/boxWidth;
       let newWidth=newHeight/scale;
       if(newWidth <= remainingWidth)
       {
        boxWidth=newWidth;
       boxHeight=newHeight;
       box.w=newWidth;
       box.h=newHeight;
       box.x = currentX;
       box.y = currentY;

       remainingWidth -= (boxWidth + boxPadding);
       remainingHeight = Math.min(remainingHeight ,(containerHeight - marginV)-(currentY+boxHeight + boxPadding));
       currentX += (boxWidth + boxPadding);
       virtualBoxes.push(box);

       }
       else if(remainingHeight>0)
       {
        virtualBoxes=[];
        currentY=containerHeight - marginV-remainingHeight;
        currentX=marginH;
        let newHeight=(containerHeight - marginV)-currentY;
       let scale=boxHeight/boxWidth;
       let newWidth=newHeight/scale;

       boxWidth=newWidth;
       boxHeight=newHeight;
       box.w=newWidth;
       box.h=newHeight;
       box.x = currentX;
       box.y = currentY;

       remainingWidth -= (boxWidth + boxPadding);
       remainingHeight = Math.min(remainingHeight ,(containerHeight - marginV)-(currentY+boxHeight + boxPadding));
       currentX += (boxWidth + boxPadding);
       virtualBoxes.push(index);

       }
       else{
        remainingHeight=containerHeight;
        let virtualX=marginH;
        virtualBoxes.forEach(virtualbox => {
        boxes[virtualbox].x = virtualX;
        boxes[virtualbox].w= boxes[virtualbox].w/2;
        boxes[virtualbox].h= boxes[virtualbox].h/2;
        // If the box needs to be rotated, set the rotation angle.
       
        remainingWidth -= ( boxes[virtualbox].w + boxPadding);
        remainingHeight = Math.min(remainingHeight ,(containerHeight - marginV)-( boxes[virtualbox].y+ boxes[virtualbox].h + boxPadding));
        virtualX += ( boxes[virtualbox] + boxPadding);
         

       });
       virtualBoxes=[];
       currentY=containerHeight - marginV-remainingHeight;
        currentX=marginH;
        let newHeight=(containerHeight - marginV)-currentY;
       let scale=boxHeight/boxWidth;
       let newWidth=newHeight/scale;

       boxWidth=newWidth;
       boxHeight=newHeight;
       
       box.x = currentX;
       box.y = currentY;

       remainingWidth -= (boxWidth + boxPadding);
       remainingHeight = Math.min(remainingHeight ,(containerHeight - marginV)-(currentY+boxHeight + boxPadding));
       currentX += (boxWidth + boxPadding);
       virtualBoxes.push(index);

       }

      }
      else {
        
        currentY=containerHeight - marginV-remainingHeight;
        remainingWidth=containerWidth-2*marginH;
        if(containerHeight-marginV-currentY>0)
       {  
        virtualBoxes=[];
        
       
       
        currentX=marginH;
        let newHeight=(containerHeight - marginV)-currentY;
       let scale=boxHeight/boxWidth;
       let newWidth=newHeight/scale;

       boxWidth=newWidth;
       boxHeight=newHeight;
       box.w=newWidth;
       box.h=newHeight;
       box.x = currentX;
       box.y = currentY;

       remainingWidth -= (boxWidth + boxPadding);
       remainingHeight = Math.min(remainingHeight ,(containerHeight - marginV)-(currentY+boxHeight + boxPadding));
       currentX += (boxWidth + boxPadding);
       virtualBoxes.push(index);
       

       }
       else{
        remainingHeight=containerHeight;
        let virtualX=marginH;
       
        virtualBoxes.forEach(virtualbox => {
           
            boxes[virtualbox].x = virtualX;
            boxes[virtualbox].w= boxes[virtualbox].w/2;
            boxes[virtualbox].h= boxes[virtualbox].h/2;
       
       
        remainingWidth -= ( boxes[virtualbox].w + boxPadding);
        remainingHeight = Math.min(remainingHeight ,(containerHeight - marginV)-( boxes[virtualbox].y+ boxes[virtualbox].h + boxPadding));
        virtualX += ( boxes[virtualbox].w + boxPadding);
         

       });
       virtualBoxes=[];
       currentY=containerHeight - marginV-remainingHeight;
       currentX=marginH;
       let newHeight=(containerHeight - marginV)-currentY;
       let scale=boxHeight/boxWidth;
       let newWidth=newHeight/scale;

       boxWidth=newWidth;
       boxHeight=newHeight;
       box.w=newWidth;
       box.h=newHeight;
       box.x = currentX;
       box.y = currentY;

       remainingWidth -= (boxWidth + boxPadding);
       remainingHeight = Math.min(remainingHeight ,(containerHeight - marginV)-(currentY+boxHeight + boxPadding));
       currentX += (boxWidth + boxPadding);

       virtualBoxes.push(index);
       }
    }
    index++;
}
    return boxes;
  }
  
  const userData = {
    a: 3,
    b: 2,
    boxes:  [ {w: 20, h: 10, rotate:true, angle:90, color: "white"},   
    {w: 40, h: 50, rotate:false, angle:0, color: "green"},
    {w: 100, h: 25, rotate:false, angle:0, color: "blue"},
     {w: 80, h: 60, rotate:false, angle:0, color: "grey"},
     {w: 100, h: 50, rotate:false, angle:0, color: "red"},
      {w: 100, h: 30, rotate:false, angle:0, color: "pink"},
     {w: 100, h: 25, rotate:false, angle:0, color: "black"}],

    design: {
      w: 280,
      h: 100,
      margin: {
        h: 12,
        v: 0,
      },
    },
    boxPadding: 5,
  };
  
  const arrangedBoxes = arrangeBoxes(userData);
  console.log(arrangedBoxes);
  