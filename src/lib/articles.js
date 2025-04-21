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
