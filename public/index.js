


console.log("ITS WORKING INDEX JS PAGE---");

const title=document.getElementById("title");
const topic=document.getElementById("topic");
const content=document.getElementById("content");


function formSubmit(event){
    
    event.preventDefault();
    console.log("PROPERLY SUBMITTED WITHOUT ERROR!");

    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==0) console.log("OBJECT CREATED BUT NOT OPENED    " + new Date().getMilliseconds());
        else if (xhr.readyState==1)console.log("REQUEST CREATED   OPENED    " + new Date().getMilliseconds());
        else if(xhr.readyState==2)console.log("REQUEST CREATED + REQUEST SENT HEADERS RECIEVED  "+ new Date().getMilliseconds())
   
 else if(xhr.readyState==3) console.log("DOWLOADING STARTED  "+new Date().getMilliseconds());   
    else{ 
        console.log("DONE ALL PROCESS  DOWNLOADED FILES AND RESPONSES  "+ new Date().getMilliseconds()); 

         const x= JSON.stringify( xhr.responseText) ;
        console.log(x);
       var node= document.createElement('p');
        var textnode=document.createTextNode(`${x}`);    
           node.appendChild(textnode);
           document.getElementById("box").appendChild(node);

         }
    }
    
     xhr.open("GET","http://localhost:3000/wikis/"+document.getElementById("title").value,true);
     xhr.send();
     
 }
