import { getCookie } from 'typescript-cookie';

export const UUID = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
};

export const getAccessTokenFromCookie = ()=>{
    const encryptedAccessToken = getCookie(import.meta.env.VITE_AUTH_COOKIE)
    if(encryptedAccessToken){
        return encryptedAccessToken
    }
    return ""
}

export const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

 