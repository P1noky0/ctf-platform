//Data
const challenges = [
    {
        title: "SQL Injection",
        category: "Web",
        difficulty: "Easy",
        points: 100,
        description: "Exploit a vulnerable login system to find the hidden flag.",
        flag: "CTF{sql_injection}",
        solved: false
    },
    {
        title: "Caesar Cipher",
        category: "Cryptography",
        difficulty: "Easy",
        points: 100,
        description: "Decrypt the encoded message and recover the flag.",
        flag: "CTF{caesar_cipher}",
        solved: false
    },
    {
        title: "Hidden Image",
        category: "Forensics",
        difficulty: "Easy",
        points: 150,
        description: "Investigate an image file and search for hidden information.",
        flag: "CTF{hidden_image}",
        solved: false
    }
];

export { challenges };