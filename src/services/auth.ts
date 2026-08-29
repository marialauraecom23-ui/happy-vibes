export type AuthCredentials={email:string;password:string};
export function validateCredentials(c:AuthCredentials){return c.email.includes('@')&&c.password.length>=6}
export function authRedirect(isAuthenticated:boolean){return isAuthenticated?'/':'/auth'}
