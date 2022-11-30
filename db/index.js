const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");
// Отримуємо абсолютний шлях
const contactsPath = path.join(__dirname, "contacts.json");

// Перезаписання файлу "contacts"
const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// Отримання усіх контактів
const list = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

// Отримання контакту по "id"
const get = async (id) => {
  const idContact = String(id);
  const contacts = await list();

  const result = contacts.find((item) => item.id === idContact);
  return result || null;
};

// Додавання нового контакту
const add = async ({ id, name, email, phone }) => {
  const contacts = await list();
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

// Оновлення контакту
const update = async (id, { name, email, phone }) => {
  const contacts = await list();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
};

// Видалення контакту по "id"
const remove = async (id) => {
  const contacts = await list();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = {
  list,
  get,
  add,
  update,
  remove,
};
