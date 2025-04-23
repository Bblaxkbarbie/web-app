//Importing the hashing library bcrypt
import bcrypt from 'bcrypt';

const saltRounds = 10;

// Salt generation
bcrypt.genSalt(saltRounds, (err, salt) => {
if (err) {
    // Handle error
    console.log(err)
    return;
}
    
    const userPassword = '1234'; // Replace with the actual password

    //Password hashing
    bcrypt.hash(userPassword, salt, (err, hash) => {
        if (err) {
            // Handle error
            console.log(err)
            return;
        }

    // Hashing successful, 'hash' contains the hashed password
    console.log('Hashed password:', hash);
    });
});


