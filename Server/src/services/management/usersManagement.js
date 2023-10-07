import { getDataBase } from '../../database/database.js';

export async function createUser(userLogin, userPassword){
    return await getDataBase().execute(`INSERT INTO users (userLogin, userPassword) VALUES (?, ?);`,
    [userLogin, userPassword],
    function (err, results, fields) {
        console.log(err);
        console.log(results);
        console.log(fields);
    });
}

export async function getUsers() {
    const results =  await getDataBase().query(`SELECT userLogin FROM users;`);
    console.log(results);
    return results[0];
}