import toast from "react-hot-toast";
import supabase from "./supabase";

export const CreateArticle = async (article) => {
  const articleData = {
    title: article.title,
    content: article.content,
    featured_image: article.featuredImageUrl,
    published: article.published || false,
    author_id: article.authorId,
    tags: article.tags,
  };

  // insert to database

  const { data, error } = await supabase
    .from("articles")
    .insert(articleData)
    .select()
    .single();

  if (error) {
    console.error("Error creating Article", error);
    throw error;
  }

  console.log("Creating Article successfully");
};

export const getArticleByAuthor = async (
  authorId,
  { includeunPublished = false, limit = 10, offset = 0 }
) => {
  let query = supabase
    .from("articles")
    .select(`*, comments:comments(count)`)
    .eq("author_id", authorId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

    if(!includeunPublished){
      query = query.eq('published', true)
    }

    const { data, error, count } = await query 

    if(error) {
      throw error
    }

    return {
      articles : data,
      count
    }
};

 
export const deleteArticle = async (id) => {
  console.log('Attempting to delete article with ID:', id)

  // first delete all associated comments
  const { error: commentsError } = await supabase.from('comments').delete().eq('article_id', id);

  if(commentsError) {
    console.error('Error deleting comments:', commentsError)
    console.error('comments error details:', JSON.stringify(commentsError, null, 2))
  }else{
    console.log('Successfully deleted asssociated comments')
  }

  //Finally delete the article
  const { data, error } = await supabase.from('articles').delete().eq('id', id).select();
  
  if(error){
    console.error('Error deleting error:', error)
    console.error('deleting article error details', JSON.stringify(error, null, 2));
    throw error
  }else{
    toast.success('Successfully deleted Article')
    console.log('Successfully deleted Article with id:', id);
  }

  return data
}


export const getArticleById = async (id) =>{
  const { data, error } = await supabase
                        .from('articles')
                        .select(`*, comments(id,content, created_at,
                              user:user_id(id, username,avator_url)) `)
                        .eq('id', id)
                        .single();
  if(error) throw error
  return data

}

export const updateArticle = async (id, updates) => {
  console.log(`Attempting to update article with ID: ${id}`, updates);

  const { data, error } = await supabase
  .from('articles')
  .update({
    title: updates.title,
    content: updates.content,
    tags: updates.tags,
    featured_image: updates.featuredImageUrl,
    published : updates.published,
    updated_at: new Date()
  })
  .eq('id', id)
  .select()
  .single()

  if(error){
    console.error('Error updating article:', error)
        console.error('Update error details:', JSON.stringify(error, null, 2))
        throw error
  }
  console.log('Article updated successfully:', data)
  toast.success('Article updated successfully');
  return data
}