let heroes = [
    {
        "id": 1,
        "name": "Dragonfang",
        "age": 100,
        "planet": "Jupiter",
        "weapons": "Sword"
    },
    {
        "id": 2,
        "name": "Hawkeye" ,
        "age": 250,
        "planet": 'Mars',
        "weapons":"Hawkeye’s Bow" 
    },
    {
        "id": 3,
        "name": "Captain America",
        "age": 78,
        "planet": "Earth",
        "weapons": "Captain America' Shield"
    },
    {
        "id": 4,
        "name": "Winter Soldier",
        "age": 60,
        "planet": "Saturn",
        "weapons": "Winter Soldier’s Arm" 
    },
    {
        "id": 5,
        "name": "Black Panther",
        "age": 140,
        "planet": "Earth",
        "weapons": "Black Panther’s Claws/Suit"
    },
]
// console.log(heroes)
const http = require("http");
const url = require("url");
const server = http.createServer((req,res)=>{
    const path = url.parse(req.url,true)
    console.log(path)
    res.writeHead(200,{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type":"application/json"
        
    });
    console.log(req.method);
    if(path.pathname=="/" || path.pathname=="/heroes"){
        res.end(JSON.stringify(heroes))
    } else if(path.pathname == "/hero") {
        if(req.method == "OPTIONS"){
            res.end();
        } else if(req.method == "GET"){
            const id = path.query.id;

            const singleData = heroes.find((ele)=>{
                return ele.id == id
            })
            res.end(JSON.stringify(singleData));
        }
     
        else if(req.method == "POST"){
            let body = '';
            req.on('data',(data)=>{
                body+=data;
            });

            req.on('end',()=>{
                let hero = JSON.parse(body);
                heroes.push(hero);
                console.log(heroes)
                res.end(JSON.stringify({message: "Hero Added"}));
            }) 
        } else if(req.method == "PUT"){
            // product id 
            const id=path.query.id;

            // product data
            let body="";
            req.on('data',(data)=>{
                body+=data;
            })

            req.on('end',()=>{
                let hero=JSON.parse(body);
                heroes.forEach((ele)=>{
                    if(ele.id==id){
                        ele.name=hero.name;
                        ele.age=hero.age;
                        ele.planet=hero.planet;
                        ele.weapons=hero.weapons;
                    }
                })
                res.end(JSON.stringify({message:"hero updated"}));
            })
        }
        else if(req.method=="DELETE"){
            const id=path.query.id;
            heroes.forEach((ele,index)=>{
                if(ele.id==id){
                    heroes.splice(index,1);
                }
            })
            res.end(JSON.stringify({message:"hero deleted"}));
        } 
    }
    else {
        res.writeHead(404,{
            "Content-Type":"application/json"
        });
        res.end(JSON.stringify({message:"Not Found anything for this URL"}));}
    // res.end("I am up and running")
});

server.listen("3000","127.0.0.1",()=>{
    console.log("Server is running")
})