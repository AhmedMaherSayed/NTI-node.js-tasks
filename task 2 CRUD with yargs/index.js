const yargs = require("yargs");
const user = require('./modules/user');
yargs.command({
    command: 'addUser',
    builder: {
        name: { demandOption: true },
        email: { demandOption: true },
        age: { demandOption: true },
        phone: { demandOption: true }
    },
    handler: (argv) => {
        user.addUser(argv)
    }
});
yargs.command({
    command: 'showAllUsers',
    handler: () => user.showAllUsers()
});
yargs.command({
    command: 'deleteAllUsers',
    handler: (argv) => user.deleteAllUsers(argv)
});
yargs.command({
    command: 'deleteOneUser',
    builder: { id: { demandOption: true } },
    handler: (argv) => user.deleteOneUser(argv)
});
yargs.command({
    command: 'editUser',
    builder: {
        id: { demandOption: true },
        name: { demandOption: true },
        email: { demandOption: true },
        phone: { demandOption: true },
        age: { demandOption: true }
    },
    handler: (argv) => user.editUser(argv)
});
yargs.argv;

