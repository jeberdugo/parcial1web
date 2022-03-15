datos = new Promise(function(resolve, reject){
    const req = new XMLHttpRequest();
    req.open("get", "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json");
    req.onload = function(){
        if(req.status == 200){
            let productos = JSON.parse(req.response);
            resolve(productos);
            productos.forEach(element => {
                console.log(element);
            })
        }else{
            reject("No se encontraron productos");
        }
    };
    req.send();
})
