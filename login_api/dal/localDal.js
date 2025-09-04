import { promises as fs } from "fs";


export async function getLoginData(username, password) {
  const data = await fs.readFile("private/auth.json", "utf-8");
  const users = JSON.parse(data);

  const user = users.find(
    (u) => u.userName === username && u.password === password
  );

  if (!user) {
    throw new Error("Invalid username or password");
  }

  return user;
  }
   