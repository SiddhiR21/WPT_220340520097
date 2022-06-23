
// const express = require('express');
// const app = express();
// const cors = require('cors');
// app.use(cors());


// const bodyParser = require('body-parser');






// app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// //whether you want nested objects support  or not



// var result;

// app.post('/poc1', function (req, res) {
	
// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });


// app.get('/poc2', function (req, res) {
    
	
//         console.log("reading input " + req.query.xyz);
		
//     	var xyz ={ v1:37, v2:35};

// 		res.send(xyz);

// 		});




// app.listen(8081, function () {
//     console.log("server listening at port 8081...");
// });

const express = require('express');
const app = express();
const mysql = require('mysql2');

let dbparas = {
	host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'nasik',
	port:3306
};
const connection = mysql.createConnection(dbparas);

app.use(express.static("abc"));

app.get("/displayitem",(req,resp)=>{
    connection.query('select * from book',[],
    (error,rows)=>{
        //console.log(rows);
        resp.send(rows);
    });
    
});

app.listen(8081,function(){
    console.log("server listening to port 8081..")
});
app.get("/getdetail",(req,res)=>{
    let bookid=req.query.bookid;
    let output={status:false,book:{bookid:0,bookname:"",price:0}};
    connection.query('select * from book where bookid=?',[bookid],(error,rows)=>{
        if(erroer){
            console.log("error occured");
        }
        else{
            if(rows.length>0){
                output.status=true;
                output.book.bookname=rows[0].bookname;
                output.book.price=rows[0].price;
            }
            else{
                output.status=false;
                console.log("bookid is not there");
            }
}
    }),
        res.send(output);
    });

    app.get("/update",(req,res)=>{
        let bookid=req.query.bookid;
        let price=req.query.price;
        let output={status:false,book:{bookid:0,bookname:"",price:0}};
        connection.query('update book set price=? where bookid=?',[price,bookid],(err,rows)=>{
            if(err){
                console.log("errorpresent");

            }else{
                if(rows.affectedRows===0){
                    output.status=false;
                    console.log("bookid not");
                }else{
                    output.status=true;
                    console.log("update success");
                }
            }
            res.send(output);
        });

    });
// })