import express from "express";
import fs from "fs";
import uniqid from "uniqid";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

/*----------Validation----------*/
import { checkBlogPostSchema, checkValidationResult } from "./validation.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const blogPostsFilePath = path.join(_dirname, "blogPosts.json")


const router = express.Router();

// 1. Get blog posts
router.get("/", (req, res, next) => {
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
router.get("/:id", (req, res, next) => {
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
router.post("/", checkBlogPostSchema, checkValidationResult,  async (req,res,next) => {
    try {
        
        const blogPost = {
            id:uniqid(),
            ...req.body,
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
router.put("/:id", (req,res,next) => {
    try {
        const fileAsBuffer = fs.readFileSync(blogPostsFilePath);
        const fileAsString = fileAsBuffer.toString();
        let fileAsJSONArray = JSON.parse(fileAsString);

        const blogPostIndex = fileAsJSONArray.findIndex(
            (blogPost) => blogPost.id === req.params.id
        );
        if (blogPostIndex === -1) {
            res
            .status(404)
            .send({ message: `blogPost with ${req.params.id} is not found!` })
        }

        const previousBlogPostData = fileAsJSONArray[blogPostIndex];

        const changedBlogPost = {
            ...previousBlogPostData,
            ...req.body,
            updatedAt: new Date(),
            id: req.params.id
        }

        fileAsJSONArray[blogPostIndex] = changedBlogPost

        fs.writeFileSync(blogPostsFilePath, JSON.stringify(fileAsJSONArray));
        res.send(changedBlogPost);
        
    } catch (error) {
        res.send(500).send({message: error.message})   
    }
});

// 5. delete blog post
router.delete("/:id", (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(blogPostsFilePath);
        const fileAsString = fileAsBuffer.toString();
        let fileAsJSONArray = JSON.parse(fileAsString);

        const blogPost = fileAsJSONArray.find((blogPost) => blogPost.id === req.params.id);
        if(!blogPost) {
            res
              .status(400)
              .send({message: `blog post with ${req.params.id} is not found!`})
        }

        fileAsJSONArray = fileAsJSONArray.filter(
            (blogPost) => blogPost.id !== req.params.id
        );
        fs.writeFileSync(blogPostsFilePath, JSON.stringify(fileAsJSONArray));
        res.status(204).send();
        
    } catch (error) {
        res.send(500).send({message: error.message}) 
    }
});  

export default router;