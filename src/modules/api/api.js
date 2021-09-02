const XLSX = require('xlsx')
const path = require('path')

const mongo = require('mongodb')

const url = 'mongodb://localhost:27017/'

var mydb;

mongo.MongoClient.connect(url,{ useNewUrlParser: true ,useUnifiedTopology: true },function(err,client){
    if(err) throw err;
    mydb = client.db('testdb');
});
const mkdirp = require ('mkdirp')

module.exports={
    ///peux importer pluisieur fichier en une seul fois
    importXlsx: (req, res, next)=>{
        var dt = new Date();
        var t = dt.getFullYear()+'/'+(dt.getMonth()+1+'/'+dt.getDate());
        var collect = req.params.collection;
        var cc = path.join(__dirname + '/uploads/excel/'+collect+'/'+t);
        //create directory
        mkdirp(cc).then(
            ()=>{
                var xlfiles = [];
        Object.values(req.files).forEach(function(file){
            xlfiles.push(file);
        });
        ///fonction foreach avec promise async to sync
        function forEachPromise (items,fn){
            return items.reduce(function (promise, item) {
                return promise.then(function () {
                    return fn(item);
                });
            }, Promise.resolve());
        }
        forEachPromise(xlfiles, function(file){
            return new Promise((resolve, reject) => {
                process.nextTick(() => {
                    var hms = dt.getHours()+'h'+dt.getMinutes()+'m'+dt.getSeconds()+'s';
                    let file_path = cc+'/'+hms+' - '+file.name;
                    console.log(file.name.split('.')[1])
                    if(file.name.split('.')[1] == 'xlsx' || file.name.split('.')[1] == 'xls' || file.name.split('.')[1] == 'csv'){

                    // move file to directory
                    file.mv(file_path,function(err){
                        if(err) {
                            res.send({error:'Cant move file'})
                            return false;
                        }else{
                            var workbook = XLSX.readFile(file_path);
                            var sheet_name_list = workbook.SheetNames;
                            var code = Object.keys(workbook.Sheets)[0];

                            var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                            
                            if(collect == 'evmar'){
                                for(i=0;i<xlData.length;i++){
                                    xlData[i].DATES = ExcelDateToJSDate(xlData[i].DATES)
                                    xlData[i].THEMATIQUES = xlData[i].THEMATIQUES.trim()
                                }  
                            }   
                            mydb.collection(collect).insertMany(xlData, (err,result)=>
                            {
                                if (err){
                                    res.send({error:'Not saved to database'})
                                    return false;
                                } 
                                // console.log('saved to database')
                            })
                        }
                        console.log('File(s) uploaded : DONE...')
                        


                    });

                    }else{
                        console.log('File(s) not uploaded : ERROR...')
                    }
                    resolve();
                })
            });
        }).then(() => {
            console.log('done');
     
            res.send({success:true,n:xlfiles.length});
        });
            }
        )
    },
    getRecord: (req, res, next)=>{
        mydb.collection(req.params.collection).find().toArray(function(err, results) {
            res.json(results)
        })
    }
}