const fs = require('fs').promises;
const filepath = './database.json';
const { readData, writeData } = require('../utils/file');




//route handler controller function
async function createUser(req, res) {
    try{
        const data = await readData();
        const lastUser = data.users[data.users.length -1];
        const nextId = lastUser ? lastUser.id + 1 : 1;

        const newUser = {
            id: nextId,
            username: req.body.username,
            first_name: req.body.first_name,
            email: req.body.email,
        }

        data.users.push(newUser);
        await writeData(data);

        res.send("User added successfully!");

    }catch(err){
    //res.send(500).send("Internet Server Error");

    }
}

//function for updating user
async function updateUser(req,res){
    try {
        const data = readData();
        const user = data.users.find(user => user.id === parseInt(req.params.id));

        if(user){
            user.username = req.body.username || user.username;
            user.first_name = req.body.first_name || user.first_name;
            user.email = req.body.email || user.email;

            await writeData(data);
        } else{
            res.status(404).send("User not found");
        }


    } catch (error) {
        res.status(500).json("Internal Server Error");
        }
    }



module.exports = {
    createUser,
    updateUser
}