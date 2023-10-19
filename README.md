Demo - https://test-task-seven-ecru.vercel.app/

## Getting Started
Follow these steps to get your project up and running:
1. Install project dependencies
```bash
nvm use
```

```bash
npm install
```

2. Create an environment file (.env.local) in the root directory of your project. This file should contain any environment-specific configuration, such as API keys or database connection strings. You can copy it from ```.env.local.example```
```bash
touch .env
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing
To run test 
```bash
npm run test
```
## Generated users
1. username : ```user1```
   password: ```123456```
2. username : ```user2```
   password: ```123456```
3. username : ```user3```
   password: ```123456```
4. username : ```user4```
   password:  ```123456```
5. username : ```user5```
   password: ```123456```
## The structure of code
![image](https://github.com/Illia-Trishchenko/test_task/assets/103423011/af6291d3-362f-4cb8-92d4-6fe1594d80aa)

## Authentication flow
User Login:
 1. When a user logs in, their credentials are verified against the stored data. If the credentials are valid, the server generates a JWT.
 2. The JWT contains data (in my case id and username) about the user.
 3. The server sets the JWT as an HTTP-only cookie in the response. The JWT is now stored securely in the user's browser cookies.
 4. On the server, each incoming request is verified by checking the JWT's signature. If the JWT is valid, the request is processed. Otherwise, the user is denied access.

User Logout:
 1. When a user logs out, the server invalidates the JWT by setting an expiration time.
 2. On the client side, clear cookies.
 
