const express=require('express');

const app=express();

//MIDDLEWARE
app.use(express.static('public'))


app.get('/',(req,res)=>{

    res.sendFile(__dirname+'/temp/index.html')
})



const port=3000;
app.listen(port,()=>console.log(`Sunucu ${port} portunda başlatıldı...`));