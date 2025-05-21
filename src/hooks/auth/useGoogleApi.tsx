import React from 'react'
import axios from 'axios';
import { getCookie } from 'typescript-cookie';
import DeckModel from '../../models/DeckModel';
import {getAccessTokenFromCookie, toBase64} from '../../utils'


const  useGoogleApi = () => {


    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    /**
        * @deprecated 
    */
    const getAppFolder = async ()=> {
        const appFolder = import.meta.env.VITE_APP_FOLDER
        const accessToken = getAccessTokenFromCookie()
        return axios.get<any>(`${BASE_URL}folder?name=${appFolder}`, {
            headers: {
                token: `${accessToken}`,
                Accept: 'application/json',
            }
        })
    }

    /**
        * @deprecated 
    */
    const createAppFolder = async ()=> {
        const appFolder = import.meta.env.VITE_APP_FOLDER
        const accessToken = getAccessTokenFromCookie()
        return await axios.post(
            `${BASE_URL}folder`,
            {
                mimeType: 'application/vnd.google-apps.folder',
                name: appFolder
            },
            {
                headers: {
                    token: `${accessToken}`,
                    Accept: 'application/json',
                }
            }
        );
    }

    const addDeck = async (deckModel: DeckModel)=>{
        const deckFile = await createDeckFileIfNotExist()
        if(deckFile){
            const deckFileContentJson = await getDeckFileContent(deckFile.id);
            const deckFileList:DeckModel[] = deckFileContentJson?.data;
            deckFileList.push(deckModel)
            return await updateDeckFile(deckFile.id, deckFileList)
        }

    }

    const createDeckFileIfNotExist = async ()=>{
        const getDeckResponse = await getDeckFile()
        const getDecksList = getDeckResponse?.data?.files
        const isFolderExist: Boolean = getDecksList?.length > 0
        if(!isFolderExist){
            const emptyDeck: DeckModel[] = [];
           const postDeckResponse =  await postDeckFile(emptyDeck)
           return postDeckResponse.data
        } else{
            return getDecksList?.at()
        }
    }

    const postDeckFile = async (deckModel: DeckModel[])=>{
        const fileName = import.meta.env.VITE_APP_DATABASE_NAME
        const accessToken = getAccessTokenFromCookie()
        const content = JSON.stringify(deckModel)
        return await axios.post(
            `${BASE_URL}file`,
            {
                name: fileName,
                mimeType: "text/plain",
                content: content
            },
            {
                headers: {
                    token: `${accessToken}`,
                    Accept: 'application/json',
                }
            }
        );
    }

    const updateDeckFile = async (fileId: string, deckModel: DeckModel[])=>{
        const fileName = import.meta.env.VITE_APP_DATABASE_NAME
        const accessToken = getAccessTokenFromCookie()
        const content = JSON.stringify(deckModel)
        return await axios.put(
            `${BASE_URL}file?id=${fileId}`,
            {
                name: fileName,
                mimeType: "text/plain",
                content: content
            },
            {
                headers: {
                    token: `${accessToken}`,
                    Accept: 'application/json',
                }
            }
        );
    }

    const getDeckFile = async () => {
        const fileName = import.meta.env.VITE_APP_DATABASE_NAME
        const accessToken = getAccessTokenFromCookie()
        return await axios.get(
            `${BASE_URL}files?name=${fileName}`,
            {
                headers: {
                    token: `${accessToken}`,
                    Accept: 'application/json',
                }
            }
        );
    }

    const getDeckFileContent = async (fileId: string) => {
        const accessToken = getAccessTokenFromCookie()
        return await axios.get(
            `${BASE_URL}fileContent?id=${fileId}`,
            {
                headers: {
                    token: `${accessToken}`,
                    Accept: 'application/json',
                }
            }
        );
    }

    /**
        * @deprecated 
    */
    const uploadImage = async (folderId: string, file:File) => {
        const accessToken = getAccessTokenFromCookie()
        const content = await toBase64(file)
        return await axios.post(
            `${BASE_URL}image`,
            {
                name: file.name,
                mimeType: file.type,
                parent: folderId,
                content: content
            },
            {
                headers: {
                    token: `${accessToken}`,
                    Accept: 'application/json',
                }
            }
        );
    }

    /**
        * @deprecated 
    */
    const downloadImage = async (fileId: string) => {
        const accessToken = getAccessTokenFromCookie()
        return await axios.get(
            `${BASE_URL}image?fileId=${fileId}`,
            {
                headers: {
                    token: `${accessToken}`,
                    Accept: 'application/json',
                }
            }
        );
    }

    // const getAccessTokenFromCookie = ()=>{
    //     const encryptedAccessToken = getCookie(import.meta.env.VITE_AUTH_COOKIE)
    //     if(encryptedAccessToken){
    //         return encryptedAccessToken
    //     }
    //     return ""
    // }


    

  return {
    getAppFolder,
    uploadImage,
    createAppFolder,
    downloadImage,
    getDeckFile,
    postDeckFile,
    createDeckFileIfNotExist,
    addDeck,
    getDeckFileContent
  }
}

export default useGoogleApi