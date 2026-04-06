import { createClient } from './supabase';

const client = createClient();

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
  // Create the user in Supabase Auth.
  // We pass 'username' in options.data so the DB trigger can extract it 
  // from NEW.raw_user_meta_data.
  const { data: authData, error: authError } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
    },
  });

  if (authError) throw authError;

  // No need to manually insert into "profiles" anymore.
  // The database trigger 'on_auth_user_created' handles this automatically.

  return { authData };
};

export const logoutUser = async () => {
  const { error } = await client.auth.signOut();
  if (error) throw error;
};
