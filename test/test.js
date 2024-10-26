import bcrypt from 'bcrypt';


async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const hash2 = await bcrypt.compare("12345", hash);
        console.log(hash2);
    } catch (error) {
        console.error("Error hashing password:", error);
    }
}

hashPassword("12345");
