import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs/promises';
import path from 'path';

// GET - List all posts with pagination and filtering
export const GET: APIRoute = async ({ url }) => {
  try {
    const searchParams = url.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const author = searchParams.get('author');
    const search = searchParams.get('search');

    // Get all posts
    let posts = await getCollection('posts');

    // Apply filters
    if (status) {
      posts = posts.filter(post => post.data.status === status);
    }
    if (category) {
      posts = posts.filter(post => post.data.category === category);
    }
    if (author) {
      posts = posts.filter(post => post.data.author === author);
    }
    if (search) {
      const searchTerm = search.toLowerCase();
      posts = posts.filter(post => 
        post.data.title.toLowerCase().includes(searchTerm) ||
        post.data.description.toLowerCase().includes(searchTerm) ||
        post.data.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Sort by publish date (newest first)
    posts.sort((a, b) => {
      const dateA = a.data.updateDate || a.data.publishDate;
      const dateB = b.data.updateDate || b.data.publishDate;
      return dateB.valueOf() - dateA.valueOf();
    });

    // Pagination
    const total = posts.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return new Response(JSON.stringify({
      success: true,
      data: {
        posts: paginatedPosts.map(post => ({
          id: post.id,
          slug: post.slug,
          ...post.data,
          // Convert dates to ISO strings for JSON serialization
          publishDate: post.data.publishDate.toISOString(),
          updateDate: post.data.updateDate?.toISOString(),
          scheduledDate: post.data.scheduledDate?.toISOString()
        })),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasNext: endIndex < total,
          hasPrev: page > 1
        }
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al obtener los posts'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

// POST - Create new post
export const POST: APIRoute = async ({ request }) => {
  try {
    // TODO: Add authentication check
    // if (!isAuthenticated(request)) {
    //   return new Response('Unauthorized', { status: 401 });
    // }

    const formData = await request.formData();
    
    // Extract form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string;
    const status = formData.get('status') as string || 'draft';
    const tags = (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [];
    
    // Validate required fields
    if (!title || !description || !content || !category || !author) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Campos requeridos faltantes'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    // Create post data
    const postData = {
      title,
      description,
      publishDate: new Date(),
      updateDate: new Date(),
      author,
      category,
      readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
      seoTitle: formData.get('seoTitle') as string || undefined,
      seoDescription: formData.get('seoDescription') as string || undefined,
      canonical: formData.get('canonical') as string || undefined,
      noindex: formData.get('noindex') === 'true',
      image: {
        src: './placeholder.jpg', // TODO: Handle image upload
        alt: formData.get('imageAlt') as string || title,
        caption: formData.get('imageCaption') as string || undefined
      },
      tags,
      status,
      scheduledDate: formData.get('scheduledDate') ? new Date(formData.get('scheduledDate') as string) : undefined,
      featured: formData.get('featured') === 'true',
      priority: parseInt(formData.get('priority') as string) || 5,
      warnings: (formData.get('warnings') as string)?.split('\n').filter(Boolean) || undefined
    };

    // Create frontmatter
    const frontmatter = `---
title: "${postData.title}"
description: "${postData.description}"
publishDate: ${postData.publishDate.toISOString()}
updateDate: ${postData.updateDate.toISOString()}
author: "${postData.author}"
category: "${postData.category}"
readingTime: ${postData.readingTime}
${postData.seoTitle ? `seoTitle: "${postData.seoTitle}"` : ''}
${postData.seoDescription ? `seoDescription: "${postData.seoDescription}"` : ''}
${postData.canonical ? `canonical: "${postData.canonical}"` : ''}
noindex: ${postData.noindex}
image:
  src: "${postData.image.src}"
  alt: "${postData.image.alt}"
  ${postData.image.caption ? `caption: "${postData.image.caption}"` : ''}
tags: [${postData.tags.map(tag => `"${tag}"`).join(', ')}]
status: "${postData.status}"
${postData.scheduledDate ? `scheduledDate: ${postData.scheduledDate.toISOString()}` : ''}
featured: ${postData.featured}
priority: ${postData.priority}
${postData.warnings ? `warnings:\n${postData.warnings.map(w => `  - "${w}"`).join('\n')}` : ''}
---

`;

    // Create full file content
    const fileContent = frontmatter + content;

    // Write file to content/posts directory
    const contentDir = path.join(process.cwd(), 'src', 'content', 'posts');
    const filePath = path.join(contentDir, `${slug}.mdx`);
    
    // Ensure directory exists
    await fs.mkdir(contentDir, { recursive: true });
    
    // Check if file already exists
    try {
      await fs.access(filePath);
      return new Response(JSON.stringify({
        success: false,
        error: 'Ya existe un post con este slug'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch {
      // File doesn't exist, continue
    }

    // Write the file
    await fs.writeFile(filePath, fileContent, 'utf-8');

    return new Response(JSON.stringify({
      success: true,
      data: {
        slug,
        message: 'Post creado exitosamente'
      }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al crear el post'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Utility function to check authentication (placeholder)
function isAuthenticated(request: Request): boolean {
  // TODO: Implement proper authentication
  // Check session, JWT token, etc.
  return true; // Placeholder
}