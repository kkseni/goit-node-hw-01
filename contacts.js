const { Command } = require("commander");

const contactsPath = require("./db");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    // Отримання усіх контактів
    case "list":
      const allContacts = await contactsPath.list();
      console.table(allContacts);
      break;
    // Отримання контакту по "id"
    case "get":
      const oneContact = await contactsPath.get(id);
      console.log(oneContact);
      break;
    // Додавання нового контакту
    case "add":
      const newContact = await contactsPath.add({ name, email, phone });
      console.log(newContact);
      break;
    // Оновлення контакту
    case "update":
      const updateContact = await contactsPath.update(id, {
        name,
        email,
        phone,
      });
      console.log(updateContact);
      break;
    // Видалення контакту по "id"
    case "remove":
      const deleteContact = await contactsPath.remove(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
// invokeAction(options);
(async () => {
  await invokeAction(options);
})();
