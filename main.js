let myAPI = fetch("https://jsonplaceholder.typicode.com/posts").then((result)=>{
    let myData = result.json();
    return myData
}).then((result)=>{
    let photos = [0 ,"01.jpg" ,"02.jpg" ,"03.jpg" ,"04.jpg" ,"05.jpg" ,"06.jpg" ,"07.jpg" ,"08.jpg" ,"09.jpg" ,"10.jpg" ]
    let container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);
    result.forEach(element => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.id=element.id;
        let cardHeader = document.createElement("h5");
        cardHeader.classList.add("card-header");
        cardHeader.innerText= element.userId;
        let userImg = document.createElement("img");
        userImg.src=`img/${photos[element.userId]}`;
        userImg.classList.add("rounded-circle");
        cardHeader.appendChild(userImg);
        card.appendChild(cardHeader);
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.innerText= element.title;
        cardBody.append(cardTitle);
        let cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.innerText=element.body;
        cardBody.appendChild(cardText);
        let button =document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.innerText="show comments";
        cardBody.appendChild(button);
        card.appendChild(cardBody);
        container.appendChild(card);
        
        
    });
    let buttons = document.querySelectorAll("button");
    buttons.forEach((btn)=>{
        btn.addEventListener("click" , (e)=>{
            if(e.target.parentElement.nextSibling){
                e.target.parentElement.nextSibling.remove();
            }
            else{
                let card = e.target.parentElement.parentElement;
            let footer = document.createElement("div");
            footer.classList.add("card-footer");
            footer.classList.add("text-muted");
            let link = `https://jsonplaceholder.typicode.com/posts/${card.id}/comments`
            let comments = fetch(link).then((result)=>{
                return result.json()
            }).then((result)=>{
                result.forEach(ele=>{
                    let comment = document.createElement("div");
                    comment.classList.add("comment");
                    let name =document.createElement("h5");
                    name.classList.add("name");
                    name.innerText=ele.name;
                    comment.appendChild(name);
                    let email = document.createElement("a");
                    email.classList.add("email");
                    email.innerText= ele.email;
                    comment.appendChild(email);
                    let commentBody = document.createElement("p");
                    commentBody.classList.add("comment-body");
                    commentBody.innerText= ele.body.replace(/[\r\n]/gm, '');
                    comment.appendChild(commentBody);
                    footer.appendChild(comment);
                    
                })
                card.appendChild(footer);
            });
            }
            
        })
    })
});