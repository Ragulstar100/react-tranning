import { promises as fs } from "fs";


export async function getLoginData(username, password) {
  const data = await fs.readFile("private/auth.json", "utf-8");
  const users = JSON.parse(data);

  const user = users.find(
    (_user) => _user.userName === username && _user.password === password
  );
  
  if (!user) {
    throw new Error("Invalid username or password");
  }

  return user;
  }
   