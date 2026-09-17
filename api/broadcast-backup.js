const router = require('express').Router();
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const crypto = require('crypto')
var db = require('./db');
var nodemailer = require('nodemailer');
var https = require('https');
var request = require('request');

// get all events with pagination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/broadcast/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
    /* filename: (req, file, cb) => {
      cb(null, file.originalname)
    }, */
})
function getMonthFromString(mon) {

    var d = Date.parse(mon + "1, 2012");
    if (!isNaN(d)) {
        return new Date(d).getMonth() + 1;
    }
    return -1;
}
const upload = multer({ storage: storage });

router.route('/get_broadcast').get(function (req, res) {
    var where = 'where flag="1"';
    var orderby = '';
    var sort = '';
    var limit = '';
    if (req.query.term) {
        var term = req.query.term;

        if (where == '') {
            where += "WHERE ";
        } else {
            where += ' AND ';
        }
        if (term != '') {
            where += "message LIKE '%" + term + "%' OR group  LIKE '%" + term + "%' OR medium LIKE '%" + term + "%'"
        }
    }
    if (req.query.pageSize && req.query.pageIndex) {
        if (limit == '') {
            limit += " Limit ";
        }
        var pageSize = req.query.pageSize;
        var pageIndex = req.query.pageIndex;
        if (pageIndex != '') {
            limit += "  " + (pageIndex * pageSize) + ", " + pageSize + "";;
        }
    }

    if (req.query.sortBy && Array.isArray(req.query.sortBy)) {
        var sortBy = req.query.sortBy;
        var sortByobj = JSON.parse(sortBy)
        // console.log('sortBy', sortByobj.desc);
        if (sort == "") {
            sort += "ORDER BY " + sortByobj.id;
        }
        if (sortByobj.desc == true) {
            sort += " DESC";
        } else {
            sort += " ASC";
        }
    }
    var sqlTotal = "SELECT COUNT(id) as totalcount from broadcast_detail " + where + " " + sort + ";";
    var sql = "SELECT id,adminCode,module,message_template,imagepath,filepath,message,groupid,medium,status,flag,eventid,DATE_FORMAT(broadcast_date,'%d-%b-%Y %H:%i') as broadcast_date FROM `broadcast_detail` " + where + " " + sort + " " + limit + " ;";
    // exit;
    // console.log('sql', sql);
    db.query(sql, function (err, result) {
        if (err) return res.status(401).send({ error: err.message });
        if (result.length >= 0) {
            db.query(sqlTotal, function (err, sqlTotalResult) {
                // console.log('sqlTotalResult', sqlTotalResult[0]);
                const totalpage = Math.ceil(sqlTotalResult[0].totalcount / pageSize)
                return res.status(200).send({ success: 1, result: result, pageCount: totalpage });
            });

            // 
        } else {
            return res.status(200).send({ success: 0, result: [], pageCount: 1 });
        }
    });


});


router.route('/create_broadcast').post(upload.fields([{
    name: 'imagepath_file', maxCount: 1
}, {
    name: 'filepath_file', maxCount: 1
}]), function (req, res) {
    // console.log('request', req.body);
    // console.log("Request file ---", req.files.file[0].filename);

    var message = req.body.message;
    var groupid = req.body.groupid;
    var medium = req.body.medium;

    var module = req.body.module;

    var message_template = req.body.message_template;
    var eventid = req.body.eventid;

    var sql = " INSERT INTO broadcast_detail (message,groupid,medium,status,flag,module,message_template,eventid) VALUES ('" + message + "','" + groupid + "','" + medium + "','1','1','" + module + "','" + message_template + "','" + eventid + "')";
    db.query(sql, function (err, result) {
        if (err) return res.status(401).send({ error: err.message });
        // console.log('insertId', result.insertId);
        if (result.insertId) {
            
            var lastid = result.insertId;
            if (req.files.imagepath_file) {
                var broadcast_image = req.files.imagepath_file[0].filename;
                var sql1 = "UPDATE broadcast_detail SET imagepath='" + broadcast_image + "' WHERE id='" + lastid + "'"
                db.query(sql1, function (err1, result1) {
                    if (err1) return res.status(401).send({ error: err1.message });
                });
            }
            if (req.files.filepath_file) {
                var filepath_file = req.files.filepath_file[0].filename;
                var sql2 = "UPDATE broadcast_detail SET filepath='" + filepath_file + "' WHERE id='" + lastid + "'"
                db.query(sql2, function (err2, result2) {
                    if (err2) return res.status(401).send({ error: err2.message });
                });
            }

            send_broadcast(lastid);

            setTimeout(function () {
                return res.status(200).json({ success: '1' });
                }, 2000)
            
        } else {
            return res.status(401).json({ success: '0', error: 'Unbale to Add' });
        }
    });
});


router.route('/delete_broadcast').post(function (req, res) {
    var ids = req.body.ids;


    var sql = "delete from  broadcast_detail where id IN (" + ids + ")";
    db.query(sql, function (err, result) {
        if (err) return res.status(401).send({ error: err.message });
        // console.log("1 record deleted");
        return res.status(200).json({ success: '1' });
    });



});

router.route('/get_broadcast_module').get(function (req, res) {
   
   
    var sql = "SELECT module FROM `broadcast_module` group by module";
    db.query(sql, function (err, result) {
        if (err) return res.status(401).send({ error: err.message });
        // console.log("1 record deleted");
        return res.status(200).json({ success: '1', result: result });
    });



});

router.route('/get_broadcast_message_template').get(function (req, res) {
   
    var module = req.query.module;
    var sql = "SELECT * FROM `broadcast_module` where module='"+module+"'";
    db.query(sql, function (err, result) {
        if (err) return res.status(401).send({ error: err.message });
        // console.log("1 record deleted");
        return res.status(200).json({ success: '1', result: result });
    });



});

router.route('/update_broadcast').post(upload.fields([{
    name: 'imagepath_file', maxCount: 1
}, {
    name: 'filepath_file', maxCount: 1
}]), function (req, res) {

    var set = "";
    if (req.body.message != "") {
        var message = req.body.message;
        if (set == "") { set += " message ='" + message + "' " } else { set += ", message ='" + message + "' " }
    }

    if (req.body.groupid != "") {
        var groupid = req.body.groupid;
        if (set == "") { set += " groupid ='" + groupid + "' " } else { set += ", groupid ='" + groupid + "' " }
    }



    if (req.body.medium != "") {
        var medium = req.body.medium;
        if (set == "") { set += " medium ='" + medium + "' " } else { set += ", medium ='" + medium + "' " }
    }
   
  
    if (req.body.module) {
        var module = req.body.module;
        if (set == "") { set += " module ='" + module + "' " } else { set += ", module ='" + module + "' " }
    }

    if (req.body.message_template) {
        var message_template = req.body.message_template;
        if (set == "") { set += " message_template ='" + message_template + "' " } else { set += ", message_template ='" + message_template + "' " }
    }

    if (req.body.eventid) {
        var eventid = req.body.eventid;
        if (set == "") { set += " eventid ='" + eventid + "' " } else { set += ", eventid ='" + eventid + "' " }
    }

    if (req.files.imagepath_file) {
        var imagepath_file = req.files.imagepath_file[0].filename;
        if (set == "") { set += " imagepath ='" + imagepath_file + "' " } else { set += ", imagepath ='" + imagepath_file + "' " }
    }
    if (req.files.filepath_file) {
        var filepath_file = req.files.filepath_file[0].filename;
        if (set == "") { set += " filepath ='" + filepath_file + "' " } else { set += ", filepath ='" + filepath_file + "' " }

    }
    var id = req.body.id;
    var sql = " UPDATE broadcast_detail  SET " + set + " WHERE id='" + id + "'";
    db.query(sql, function (err, result) {
        if (err) return res.status(401).send({ error: err.message });
         send_broadcast(id);
        return res.status(200).json({ success: '1', response: result, sql: sql });
    });

});


async function send_broadcast(broadcastid){
    // var path1=path.join(__dirname , "uploads","broadcast");

    var path1="https://webapistaging.madrascricketclub.org/broadcast/";

    var sql = "SELECT module,eventid,message_template,message,medium,groupid,imagepath,filepath,event_name,event_image,DATE_FORMAT(event_date_from,'%d-%b-%Y') as event_date FROM `broadcast_detail` b inner join events e on b.eventid=e.id where b.id='" + broadcastid + "' ";
    db.query(sql, function (err, result) {
        if (err) return res.status(401).send({ error: err.message });
        var imagepath = result[0].imagepath;
        var filepath = result[0].filepath;
        var message = result[0].message;
        var groupid = result[0].groupid;
        var medium = result[0].medium;
        var module = result[0].module;
        var message_template = result[0].message_template;
        var eventid = result[0].eventid;
        var event_name = result[0].event_name;
        var event_image = result[0].event_image;
        var event_date = result[0].event_date;
        var condition = "";
        if (groupid) {

            if (groupid == "all") {
                condition = condition + "";
            }
            else
            condition = condition + " where " + groupid + "='1'";

            var sql = "SELECT a.member_code as member_code,first_name,mobile_no,email FROM members a left join `member_sports` b on a.member_code=b.member_code " + condition +"";
            db.query(sql, function (err, resultsports) {

                resultsports.forEach(function (element) {
                    console.log(element)
                    if(medium=="WA")
                    {

                        if(module=='Event' && message_template=='Launch')
                        broadcast_sendwhatsapp(broadcastid,event_name,element.member_code,element.mobile_no,element.email,message,path1+imagepath,imagepath,path1+filepath,filepath,'/dev/event/launch','');
                        
                        else if(module=='Event' && message_template=='Open')
                        broadcast_sendwhatsapp(broadcastid,event_name,element.member_code,element.mobile_no,element.email,message,path1+imagepath,imagepath,path1+filepath,filepath,'/dev/event/open','');
                        else if(module=='Event' && message_template=='Highlights')
                        broadcast_sendwhatsapp(broadcastid,event_name,element.member_code,element.mobile_no,element.email,message,path1+imagepath,imagepath,path1+filepath,filepath,'/dev/event/highlights',event_date);
                        // broadcast_sendwhatsapp(broadcastid,event_name,element.member_code,"9841200531","sowjanya@lokas.in",message,"https://webapistaging.madrascricketclub.org/eventsimg/"+event_image,event_image,path1+filepath,filepath,'/dev/event/highlights');

                    }
                    else if(medium=="EM")
                    {
                        
                         broadcast_sendemail(broadcastid,element.first_name,element.member_code,element.mobile_no,element.email,message,path1+imagepath,imagepath,path1+filepath,filepath);
                       // broadcast_sendemail(broadcastid,element.first_name,element.member_code,"9841200531","sowjanya@lokas.in",message,path1+imagepath,imagepath,path1+filepath,filepath);
                    }
                    
                });
            });

        }
        // return res.status(200).send({ success: 1, result: result });
    });
}


router.route('/sent_broadcast_tomemeber').get(function (req, res) {


    var broadcastid = req.query.broadcastid;

    // var path1=path.join(__dirname , "uploads","broadcast");
    var path1="https://webapistaging.madrascricketclub.org/broadcast/";

    var sql = "SELECT * FROM broadcast_detail WHERE id='" + broadcastid + "' ";
    db.query(sql, function (err, result) {
        if (err) return res.status(401).send({ error: err.message });
        var imagepath = result[0].imagepath;
        var filepath = result[0].filepath;
        var message = result[0].message;
        var groupid = result[0].groupid;
        var medium = result[0].medium;
        var condition = "";
        if (groupid) {

            if (groupid == "all") {
                condition = condition + "";
            }
            else
                condition = condition + " where " + groupid + "='1'";

            var sql = "SELECT a.member_code as member_code,first_name,mobile_no,email FROM members a left join `member_sports` b on a.member_code=b.member_code " + condition +" ";
            db.query(sql, function (err, resultsports) {

                resultsports.forEach(function (element) {
                    console.log(element)
                    if(medium=="WA")
                    {
                        broadcast_sendwhatsapp(broadcastid,element.first_name,element.member_code,"9841200531","sowjanya@lokas.in",message,path1+imagepath,imagepath,path1+filepath,filepath,'/dev/event/launch','');
                    }
                    else if(medium=="EM")
                    {
                        
                        // broadcast_sendemail(broadcastid,element.first_name,element.member_code,element.mobile_no,element.email,element.message,element.imagepath,element.imagepath,element.filepath,element.filepath);
                        broadcast_sendemail(broadcastid,element.first_name,element.member_code,"9841200531","sowjanya@lokas.in",message,path1+imagepath,imagepath,path1+filepath,filepath);
                    }
                    
                });
            });

        }
         return res.status(200).send({ success: 1, result: result });
    });


});


function broadcast_sendemail(id,name, member_code, number,email,message,imageurl,imagename,fileurl,filename){

    const data = JSON.stringify({
        'number': number,
        'name': name,
        'code':member_code,
        'id':id,
        'email':email,
        'message':message,
        'imageurl':imageurl,
        'imagename':imagename,
        'fileurl':fileurl,
        'filename':filename


        });

        const options = {
            url: 'https://7bh2kfhirc.execute-api.ap-northeast-1.amazonaws.com/dev/broadcast-email',
            json: true,
            body: {
                'number': number,
                'name': name,
                'code':member_code,
                'id':id,
                'email':email,
                'message':message,
                'imageurl':imageurl,
                'imagename':imagename,
                'fileurl':fileurl,
                'filename':filename
            }
        };
        
        request.post(options, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Status: ${res.statusCode}`);
            console.log(body);
        });
    
    
    }
function broadcast_sendwhatsapp(id,name, member_code, number,email,message,imageurl,imagename,fileurl,filename,whattype,event_date){

    const data = JSON.stringify({
        'number': number,
        'name': name,
        'member_code':member_code,
        'id':id,
        'email':email,
        'message':message,
        'imageurl':imageurl,
        'imagename':imagename,
        'fileurl':fileurl,
        'filename':filename,
        'edate':event_date



        })
    
    const options = {
      hostname:'7bh2kfhirc.execute-api.ap-northeast-1.amazonaws.com',
      port:443, 
    //   path: '/dev/broadcast-whatsapp',
    path: whattype,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': data.length,
        },
      
    }
    
    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`)
    
      res.on('data', (d) => {
        process.stdout.write(d)
    console.log('BODY: ' + d);
      })
    
    })
    
    req.on('error', (error) => {
      console.error(error)
    })
    
    req.write(data)
    req.end()
    
    
    
    }
    
    

router.route('/select_member_sports').get(function (req, res) {


    var billiards = req.query.billiards;
    var badminton = req.query.badminton;

    var cricket = req.query.cricket;
    var hockey = req.query.hockey;

    var squash = req.query.squash;
    var tennis = req.query.tennis;

    var swimming = req.query.swimming;
    var condition = "";

    if (billiards == "1")
        condition = condition + " AND billiards='1'"

    if (badminton == "1")
        condition = condition + " AND badminton='1'"

    if (cricket == "1")
        condition = condition + " AND cricket='1'"
    if (hockey == "1")
        condition = condition + " AND hockey='1'"
    if (squash == "1")
        condition = condition + " AND squash='1'"
    if (tennis == "1")
        condition = condition + " AND tennis='1'"
    if (swimming == "1")
        condition = condition + " AND swimming='1'"



    var sql = "SELECT * FROM members a,`member_sports` b where a.member_code=b.member_code " + condition;
    db.query(sql, function (err, result) {
        if (err) return res.status(401).send({ error: err.message });

        return res.status(200).send({ success: 1, result: result });
    });


});

module.exports = router;