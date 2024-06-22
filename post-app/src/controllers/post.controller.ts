import { Request, Response } from 'express';
import Post from '../models/post';
import { ValidateBody } from '../decorators/request.validator';
import { CreatePostSchema } from '../validation/verify-jwt.schema';


class PostController {

    @ValidateBody(CreatePostSchema)
    public async createPost(req: Request, res: Response): Promise<void> {
        const { text } = req.body;
        const userId = (req as any).userId; // userId attached from middleware

        console.log({
            text,
            userId,
        });
        try {
            const newPost = await Post.create({ userId, text });
            res.status(201).json({ message: 'Post created successfully', post: newPost });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    public async listPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await Post.findAll();
            res.status(200).json({ posts });
        } catch (error) {
            console.error('Error listing posts:', error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

}

export default new PostController();
