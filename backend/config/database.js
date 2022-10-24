const mongoos=require("mongoose");

const connectDatabase=()=>{
    mongoos.connect(process.env.DB_URI).then((data)=>{
            console.log(`Mongodb connected with server : ${data.connection.host}`);
        })
}

module.exports = connectDatabase;