# BACKEND

### IMPORTANT

Just for future this is here:

If need to extend Express --> Request interface

# CONTENT:

create file: types>express>index.d.ts

declare module 'express-serve-static-core' {
interface Request {
userOrSomethingElse?: YourCustomTypeHere;
}
}

# tsconfig

{
"compilerOptions": {
"typeRoots": ["./types"]
}
}

typeRoots path depends on your folder structure and where tsconfig
and types folder is

Example: This project type folder is on root/shared/types and tsconfig on root/modules/auth-server/
