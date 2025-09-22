import client from './supabase';

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Return user UUID
  return data.user?.id;
};

export const signUpUser = async (email: string, password: string, username: string) => {
  // 1️⃣ Create the user in Supabase Auth
  const { data: authData, error: authError } = await client.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  // 2️⃣ Insert the user's profile using their auth UUID
  const { data: profileData, error: profileError } = await client
    .from("profiles")
    .upsert({
      id: authData.user?.id,   // Auth UUID
      username: username,
      email: authData.user?.email,
    });

  if (profileError) throw profileError;

  return { authData, profileData };
};

export const logoutUser = async () => {
  const { error } = await client.auth.signOut();
  if (error) throw error;
};
