import supabase from "./supabase";

export const signUp = async (email, password, username = "") => {
  let { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  console.log(data, error);

  if (data?.user) {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData?.session) {
      console.log(
        "No active session yet - profile will be created on first sign in"
      );
      return data;
    }

    const displayName = username || email.split("@")[0];

    //   create profile
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .insert({
        id: data.user.id,
        username: displayName,
        avator_url: null,
      })
      .select()
      .single();

    if (profileError) {
      console.error("Profile creation error", profileError);
    } else {
      console.log("Profile created Succesfully", profileData);
    }
  }

  return data;
};

export const signIn = async (email, password) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log('User info', data)

  if (error) throw error;

  // check if the user profile exist, create if it doesn't

  if (data?.user) {

    try {

      const profile = getUserProfile(data.user.id)
      console.log('Profile info', profile)

    }catch (profileError) {

      console.error("Error with profile during signin:", profileError)

    }

  }
};

export const getUserProfile = async (userID) => {

  const { data: sessionData } = await supabase.auth.getSession();

  // get user data
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userID)
    .single();

    if(error && error.code === 'PGRST116') {
      console.log(
        "No profile found, attempting to create one for user:",
        userID
      );

      const { data: userData } = await supabase.auth.getUser();
      
      // get the user email to drive username if needed

      const email = userData?.user.email;

      const defaultUsername = email
        ? email.split("@")[0]
        : `user_${Date.now()}`;

      //   create profile
      const { data: newProfile, error: profileError } = await supabase
        .from("users")
        .insert({
          id: userID,
          username: defaultUsername,
          avator_url: null,
        })
        .select()
        .single();

      if (profileError) {
        console.error("Profile creation error", profileError);
        throw profileError
      } else {
        console.log("Profile created Succesfully", newProfile);
      }

      return newProfile
    }

    if(error) {
      console.error('Error fetching profile:', error);
      throw error
    }

    console.log('Existing profile');

    return data;


};

export const onAuthChange = (callback) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null, event)
  })

  return () => data.subscription.unsubscribe();
  
}


// sign out
export const SignOut = async () => {
  await supabase.auth.signOut()
}