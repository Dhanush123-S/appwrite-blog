import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint('https://fra.cloud.appwrite.io/v1')
        .setProject('683dbc8a003a172ac028');
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                '683dbe22003a914d7a14',
                '683dbea9003125fda542',
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                '683dbe22003a914d7a14',
                '683dbea9003125fda542',
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
               '683dbe22003a914d7a14',
                '683dbea9003125fda542',
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
               '683dbe22003a914d7a14',
                '683dbea9003125fda542',
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                '683dbe22003a914d7a14',
                '683dbea9003125fda542',
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
             const uploadedFile = await this.bucket.createFile(
                '683dc057000e24e3ddd9',
                ID.unique(),
                file
            );
            return uploadedFile;
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return null
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                '683dc057000e24e3ddd9',
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            '683dc057000e24e3ddd9',
            fileId
        )
    }
}


const service = new Service()
export default service