import express from "express";
import fs from "fs";
import uniqid from "uniqid";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const blogPostsFilePath = path.join(_dirname, "blogPosts.json")


const router = express.Router();

// 1. Get blog posts
router.get("/", async (req, res, next) => {
    try {

        const fileAsBuffer = fs.readFileSync(blogPostsFilePath);
        const fileAsString = fileAsBuffer.toString();
        const fileAsJSON = JSON.parse(fileAsString);

        res.send(fileAsJSON)
    
    } catch (error) {
        res.send(500).send({message: error.message})
    };
});


// 2. Get single blog posts
router.get("/:id", async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(blogPostsFilePath);
        const fileAsString = fileAsBuffer.toString();  
        const fileAsJSONArray = JSON.parse(fileAsString);

        const blogPost = fileAsJSONArray.find(
            (blogPost) => blogPost.id === req.params.id
            );
        if (!blogPost) {
            res
            .status(404)
            .send({ message: `blogPost with ${req.params.id} is not found!` })
        }
        res.send(blogPost);

    } catch (error) {
        res.send(500).send({messge: error.messge})
    }
    
});

// 3. create blog posts
router.post("/", async (req,res,next) => {
    try {
        const { category, title, cover, name,} = req.body
        
        const blogPost = {
            id:uniqid(),
            category,
            title,
            cover,
            readTime: {
                value: 2,
                unit: "minute"
            },
            author: {
                name,
                avatar: `https://ui-avatars.com/api/?name=${name}`},
                
                content:"HTML",
                createdAt: new Date(),
                updatedAt:new Date(),
            }
            
            const fileAsBuffer = fs.readFileSync(blogPostsFilePath);
            const fileAsString = fileAsBuffer.toString();
            const fileAsJSONArray = JSON.parse(fileAsString);
            
            fileAsJSONArray.push(blogPost);
            fs.writeFileSync(blogPostsFilePath, JSON.stringify(fileAsJSONArray))

            res.send(blogPost)
        } catch (error) {
            res.send(500).send({message: error.message})
        }
});

// 4. edit blog posts
router.put("/:id", async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
})




export default router;