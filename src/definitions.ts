declare module '@capacitor/core' {
  interface PluginRegistry {
    GitHubFirebaseAuth: GitHubFirebaseAuthPlugin;
  }
}

export interface GitHubFirebaseAuthPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
  signIn(): Promise<SignInResult>;
  signOut(): Promise<void>;
}

export interface SignInResult {
  accessToken?: string;
}
