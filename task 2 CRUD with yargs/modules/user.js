const userData = ['id', 'name', 'email', 'phone', 'age'];
const rowData = require('./jsonData');
const createUserObjectData = (data) => {
    const user = {}
    userData.forEach(h => {
        if (h == "id") 
        {
            user[h] = Date.now();
        }
        else 
        {
            user[h] = data[h];
        }
    });
    return user
}
class user {
    static addUser = (argv) => {
        const userRecord = createUserObjectData(argv);
        const data = rowData.readJsonData('users.json');
        data.push(userRecord);
        rowData.writeJsonData('users.json', data);

    }
    static showOneUser = (argv) => {
        const data = rowData.readJsonData('users.json');
        const singleUser = data.find(u => u.id == argv.id);
        if (!singleUser)
        {
         console.log("Doesn't exist");
        }
        else 
        {
            console.log(singleUser);
        }
    }
    static showAllUsers = () => {
        const data = rowData.readJsonData("users.json");
        data.forEach((user, i) => {
            console.log(`index:${i + 1} - name:${user.name} - user id:${user.id} - email:${user.email}`);
        })

    }
    static deleteOneUser = (argv) => {
        const data = rowData.readJsonData('users.json');
        data.forEach((el, i) => {
            if (el.id == argv.id) {
                data.splice(i, 1);
                rowData.writeJsonData('users.json', data);
            }
        })
    }
    static deleteAllUsers = (argv) => {
        const userRecord = createUserObjectData(argv);
        const data = rowData.readJsonData('users.json');
        data.splice(userRecord);
        rowData.writeJsonData('users.json', data);
    }
    static editUser = (argv) => {
        const userRecord = createUserObjectData(argv);
        const data = rowData.readJsonData('users.json');
        data.forEach((u, i) => {
            if (u.id == argv.id) 
            {
                data[i] = userRecord;
                return data[i];
            };
        })
        rowData.writeJsonData('users.json', data);

    }
}
module.exports = user;