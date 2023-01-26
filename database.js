const fs = require('fs');
const crypto = require('crypto');

const dbFile = "./chat.db";
const exist = fs.existsSync(dbFile);
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

let db;

sqlite.open({
    filename: dbFile,
    driver: sqlite3.Database
}).then(async dBase=>{
    db = dBase;
    try{
        if(!exist){
            await db.run(
                `CREATE TABLE user(
                    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    login TEXT,
                    password TEXT
                );`
            );
            await db.run(
                `INSERT INTO user(login,password) VALUES ('admin', 'admin'),
                                                         ('JavaScript', 'banana'),
                                                         ('RoboCode', 'password1');`
            );
    
            await db.run(
                `CREATE TABLE message(
                    msg_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    content TEXT,
                    author INTEGER,
                    FOREIGN KEY (author) REFERENCES user(user_id)
                );`
            );
        } else{
            console.log(await db.all('SELECT * FROM user;'));
        }

    }catch(dbError){
        console.log(dbError);
    }
});
module.exports = {
    isUserExist: async (login)=>{
        const candidate = await db.all('SELECT * FROM user WHERE login=?',[login]);
        return !!candidate.length;
    }, 
    addUser: async (user)=>{
        await db.run(
            `INSERT INTO user(login, password) VALUES (?, ?)`, [user.login, user.password]
        );
    },
    getAuthToken: async (user)=>{
        const candidate = await db.all('SELECT * FROM user WHERE login=?',[user.login]);
        if(!candidate.length){
            throw 'Invalid login!';
        }

        if(candidate[0].password !== user.password){
            throw 'Wrong password!';
        }

        return candidate[0].user_id+"."+candidate[0].login+"."+crypto.randomBytes(20).toString("hex");
    }
}