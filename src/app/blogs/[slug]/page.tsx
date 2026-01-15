import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import he from 'he';
import Link from 'next/link';
import React from 'react';
import AnimatedButton from "../../components/AnimatedButton";


interface Post {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
    }[];
  };
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/posts?slug=${slug}&_embed`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_WP_USERNAME}:${process.env.NEXT_PUBLIC_WP_APPLICATION_PASSWORD}`).toString('base64'),
      },
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    if (!response.ok) {
      console.error(`Failed to fetch post for slug: ${slug}, status: ${response.status}, body:`, await response.text());
      return null;
    }
    const posts = await response.json();
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error in getPost:', error);
    return null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<Post[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/posts?_embed`, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_WP_USERNAME}:${process.env.NEXT_PUBLIC_WP_APPLICATION_PASSWORD}`).toString('base64'),
      },
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    if (!response.ok) {
      console.error(`Failed to fetch related posts, status: ${response.status}, body:`, await response.text());
      return [];
    }
    const allPosts: Post[] = await response.json();
    const related = allPosts.filter(p => p.slug !== currentSlug).slice(0, 3);
    return related;
  } catch (error) {
    console.error('Error in getRelatedPosts:', error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/posts`,
    {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_WP_USERNAME}:${process.env.NEXT_PUBLIC_WP_APPLICATION_PASSWORD}`).toString('base64'),
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch posts for generateStaticParams, status: ${response.status}, body:`, await response.text());
      return [];
    }
    const posts: Post[] = await response.json();
   
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  const relatedPosts = await getRelatedPosts(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const decodedTitle = post.title.rendered ? he.decode(post.title.rendered) : '';
  const decodedContent = post.content.rendered ? he.decode(post.content.rendered) : '';

  return (
    <>
      <Header />

      <section className="other-section pt-14 lg:pt-24 pb-1 lg:pb-20 overflow-hidden relative mt-[50px]">
        <div className="max-w-[1200px] px-6 w-full mx-auto relative">
          <div className='max-w-6xl mx-auto text-center'>
            <h1 className="text-3xl lg:text-4xl font-semibold mb-8">{decodedTitle}</h1>

            <div className='site-card2 my-8 p-0-card'>
              <Image 
                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/blog1.jpg'}
                alt={decodedTitle}
                width={800}
                height={400}
                className="mx-auto rounded-3xl"
              />
            </div>
            <div 
              className="mb-6 max-w-3xl mx-auto blog-content blog-details" 
              dangerouslySetInnerHTML={{ __html: decodedContent }}
            />

          </div>


        </div>
      </section >
      <section className="pt-7 lg:pt-20 pb-14 lg:pb-20 overflow-hidden relative">
        <div className="max-w-[1460px] px-6 w-full mx-auto relative">
          <h4 className='text-2xl lg:text-4xl font-medium text-center'>Related Insights</h4>

          <div className='mt-10 lg:mt-15'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-x-8 gap-y-14'>
              {relatedPosts.map((relatedPost) => {
                const featuredImage = relatedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                if (!featuredImage) {
                  console.warn(`Featured image not found for related post: "${relatedPost.title.rendered}"`);
                }
                return (
                  <div key={relatedPost.id} className="site-card blog-card rounded-2xl bg-white">
                    <Image 
                      src={featuredImage || '/blog1.jpg'}
                      alt="blog img" 
                      width={400} 
                      height={250} 
                      className='w-full rounded-xl aspect-[2/1.2] object-cover' 
                    />
                    <div className='p-5 pt-3'>
                      <span className='text-sm opacity-70 fw-200'>{new Date(relatedPost.date).toLocaleDateString()}</span>
                      <h2 className="text-xl font-semibold my-3 line-clamp-2 min-h-[50px]">
                        <Link href={`/blogs/${relatedPost.slug}`}>{relatedPost.title.rendered}</Link>
                      </h2>
                      {/* <div 
                        className="opacity-70 line-clamp-4 text-sm" 
                        dangerouslySetInnerHTML={{ __html: relatedPost.content.rendered }}
                      /> */}
                     <AnimatedButton href={`/blogs/${relatedPost.slug}`} label="Read More" className="w-fit transparent-btn2 transparent-btn3 mt-6" />

                    </div>
                  </div>
                )
              })}
            </div>



          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}