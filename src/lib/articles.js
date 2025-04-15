import supabase from "./supabase";

const CreateArticle = async (article) => {
  const articleData = {
    title: article.title,
    content: article.content,
    featured_image: article.featuredImageURL,
    published: article.published || false,
    author_id: article.authorID,
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
