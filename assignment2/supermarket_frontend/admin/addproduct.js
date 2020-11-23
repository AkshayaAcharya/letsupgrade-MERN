let errorCount;
function validateId(){
    let id=document.getElementById("id").value;
    let exp=new RegExp("^[0-9]+$");
    if(id==""){

        document.getElementById("idError").innerText
        ="Id should not be empty";
        return false;
    }
    if(!exp.test(id)){
        document.getElementById("idError").innerText
        ="Id always must be a number";
        return false;
    }
    document.getElementById("idError").innerText="";
    return true;
}
function validateName(){
    let name=document.getElementById("name").value;
    let exp=new RegExp("^[a-zA-Z]+$");
    if(name==""){

        document.getElementById("nameError").innerText
        ="Name should not be empty";
        return false;
    }
    if(!exp.test(name)){
        document.getElementById("nameError").innerText
        ="Name should not have a number";
        return false;
    }
    document.getElementById("nameError").innerText="";
    return true;
}
function validateDescription(){
    let description=document.getElementById("description").value;
    let exp=new RegExp("^[a-zA-Z!@#$&()-\‘./+,“' ]+$");
    if(description==""){

        document.getElementById("descError").innerText
        ="Description should not be empty";
        return false;
    }
    if(!exp.test(description)){
        document.getElementById("descError").innerText
        ="Description should not have a number";
        return false;
    }
    document.getElementById("descError").innerText="";
    return true;
}
function validatePrice(){
    let price=document.getElementById("price").value;
    let exp=new RegExp("^[0-9]+$");
    if(price==""){

        document.getElementById("priceError").innerText
        ="Price should not be empty";
        return false;
    }
    if(!exp.test(price)){
        document.getElementById("priceError").innerText
        ="Price always must be a number";
        return false;
    }
    document.getElementById("priceError").innerText="";
    return true;
}
function validateRating(){
    let rating=document.getElementById("rating").value;
    let exp=new RegExp("^[0-9]+$");
    if(rating==""){

        document.getElementById("ratingError").innerText
        ="Rating should not be empty";
        return false;
    }
    if(!exp.test(rating)){
        document.getElementById("ratingError").innerText
        ="Rating always must be a number";
        return false;
    }
    document.getElementById("ratingError").innerText="";
    return true;
}
function validateType(){
    let type=document.getElementById("type").value;
    let exp=new RegExp("^[a-zA-Z]+$");
    if(type==""){

        document.getElementById("typeError").innerText
        ="Type should not be empty";
        return false;
    }
    if(!exp.test(type)){
        document.getElementById("typeError").innerText
        ="Type should not have a number";
        return false;
    }
    document.getElementById("typeError").innerText="";
    return true;
}
function validateForm(){
    if(validateId()==false){
        errorCount++;
    }
    if(validateName()==false){
        errorCount++;
    }
    if(validateDescription()==false){
        errorCount++;
    }
    if(validatePrice()==false){
        errorCount++;
    }
    if(validateRating()==false){
        errorCount++;
    }
    if(validateType()==false){
        errorCount++;
    }

    if(errorCount == 0){
        console.log("Form good to go")
        createProduct();
    }
    errorCount = 0;
}
function createProduct(){

    let product={};

    product.id=document.getElementById("id").value;
    product.title=document.getElementById("name").value;
    product.description=document.getElementById("description").value;
    product.price=document.getElementById("price").value;
    product.rating=document.getElementById("rating").value;
    product.type=document.getElementById("type").value;

    console.log(JSON.stringify(product));

    fetch("http://localhost:3000/product",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product),
        
      
    })
    .then((response)=>response.json())
    .then((data)=>{
        
        document.getElementById("addform").reset();

        document.getElementById("message").innerHTML=
        `<p class="alert alert-success">${data.message} Successfully!!!</p>`;
    }).catch((err)=>{
        console.log(err);
    })    




}